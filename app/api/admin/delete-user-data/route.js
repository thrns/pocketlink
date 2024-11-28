import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { realDb } from '@/Clients/FireUserNameDb';
import { ref, remove } from 'firebase/database';

function getAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

const TABLES = [
  'user_profiles',
  'discounts_data',
  'checkout_users',
  'customer_data',
  'audience_data',
  'user_addresses',
  'checkout_sessions',
  'campaigns',
  'orders',
  'sales_bot_data',
  'analytics_sessions',
  'order_status_history',
  'analytics_visitors',
  'analytics_events',
  'stores',
  'analytics_heatmap_events',
  'analytics_daily_metrics',
  'billing_info',
  'forms_data',
  'analytics_link_performance',
  'analytics_device_distribution',
  'deleted',
  'items_data',
  'auth_sessions',
  'email_templates',
  'user_data',
  'user_merchants',
  'billing_addresses',
  'download_logs',
  'claim_data',
  'calendar_data',
  'email-server',
  'products_data',
  'payment_gateway_data',
  'billing_details',
  'subscriptions',
  'emails',
  'product_reviews',
  'product_likes',
  'review_votes',
  'email_list',
  'drafts',
];

const BUCKETS = ['items_data_storage', 'avatars', 'forms', 'products'];

// Some tables store the username under a different column name
const USER_FIELD_BY_TABLE = {
  analytics_sessions: 'tenant_username',
  analytics_visitors: 'tenant_username',
  analytics_events: 'tenant_username',
  analytics_device_distribution: 'tenant_username',
  analytics_heatmap_events: 'tenant_username',
  analytics_daily_metrics: 'tenant_username',
  analytics_link_performance: 'tenant_username',
  analytics_geo_cities: 'tenant_username',
  analytics_geo_countries: 'tenant_username',
  analytics_referrers: 'tenant_username',
};

export async function POST(req) {
  try {
    const { username, userId } = await req.json();
    if (!username || !userId) {
      return NextResponse.json({ error: 'username required' }, { status: 400 });
    }

    const supabase = getAdmin();

    // Delete rows from tables
    const tableResults = await Promise.allSettled(
      TABLES.map(async (table) => {
        try {
          const userField = USER_FIELD_BY_TABLE[table] || 'username';
          const { error, count } = await supabase
            .from(table)
            .delete({ count: 'estimated' })
            .eq(userField, username);
          if (error) throw error;
          return {
            scope: 'table',
            name: table,
            success: true,
            count: count ?? null,
          };
        } catch (e) {
          return {
            scope: 'table',
            name: table,
            success: false,
            error: e.message,
          };
        }
      })
    );

    // Delete files from buckets (best-effort)
    async function purgeBucket(bucket) {
      try {
        // Potential base folders to search under for this username
        const bases = [`${username}`, `${userId}/`];

        const files = new Set();

        // Heuristic recursive lister (best-effort)
        async function listRecursive(prefix) {
          const normalized = prefix.endsWith('/')
            ? prefix.slice(0, -1)
            : prefix;
          const { data, error } = await supabase.storage
            .from(bucket)
            .list(normalized, {
              limit: 1000,
              sortBy: { column: 'name', order: 'asc' },
            });
          if (error) return; // ignore and continue
          for (const entry of data || []) {
            const childPath = `${normalized}/${entry.name}`.replace(/^\//, '');
            // crude folder vs file check: presence of a dot suggests a file
            if (entry.name.includes('.')) {
              files.add(childPath);
            } else {
              // May be a folder; descend
              await listRecursive(childPath);
              // Also attempt to delete the folder index files, if any
              files.add(childPath); // in case objects were directly named as folder
            }
          }
        }

        for (const base of bases) {
          await listRecursive(base);
        }

        // Fallback: scan root for any items containing username
        if (files.size === 0) {
          const { data } = await supabase.storage
            .from(bucket)
            .list('', { limit: 1000 });
          for (const entry of data || []) {
            if (entry.name?.includes(username)) files.add(entry.name);
          }
        }

        if (files.size === 0)
          return { scope: 'bucket', name: bucket, success: true, count: 0 };

        const paths = Array.from(files).filter(Boolean);
        const { error: delErr } = await supabase.storage
          .from(bucket)
          .remove(paths);
        if (delErr) throw delErr;
        return {
          scope: 'bucket',
          name: bucket,
          success: true,
          count: paths.length,
        };
      } catch (e) {
        return {
          scope: 'bucket',
          name: bucket,
          success: false,
          error: e.message,
        };
      }
    }

    const bucketResults = await Promise.allSettled(BUCKETS.map(purgeBucket));

    // Delete from Firebase RTDB: firstLetter/username
    let firebaseResult = { scope: 'firebase', path: null, success: false };
    try {
      const first = username[0]?.toLowerCase() || '';
      const path = `usernames/${first}/${username}`;
      await remove(ref(realDb, path));
      firebaseResult = { scope: 'firebase', path, success: true };
    } catch (e) {
      firebaseResult = {
        scope: 'firebase',
        path: 'unknown',
        success: false,
        error: e.message,
      };
    }

    const normalize = (p) => (p.status === 'fulfilled' ? p.value : p.reason);
    return NextResponse.json({
      tables: tableResults.map(normalize),
      buckets: bucketResults.map(normalize),
      firebase: firebaseResult,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
