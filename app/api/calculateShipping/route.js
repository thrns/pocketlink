import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, address, storeId } = body;

    if (!items || !items.length) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = await createSupabaseClient();

    // Calculate total weight and dimension metrics
    const totalWeight = items.reduce((sum, item) => {
      const weight = item.weight || 0;
      return sum + weight * item.quantity;
    }, 0);

    // Default shipping rates
    let shippingRate = 0;
    let estimatedDays = '3-5';
    let availableMethods = [];

    // Get store shipping settings if store ID is provided
    if (storeId) {
      const { data: storeData, error } = await supabase
        .from('stores')
        .select('shipping_settings')
        .eq('id', storeId)
        .single();

      if (!error && storeData?.shipping_settings) {
        const settings = storeData.shipping_settings;

        // Apply shipping rules based on address and cart
        if (
          settings.free_shipping_threshold &&
          calculateSubtotal(items) >= settings.free_shipping_threshold
        ) {
          // Free shipping for orders above threshold
          shippingRate = 0;
          estimatedDays = settings.free_shipping_days || '3-5';
          availableMethods.push({
            id: 'free',
            name: 'Free Shipping',
            price: 0,
            estimated_days: estimatedDays,
          });
        } else {
          // Apply zone-based shipping if available
          const zone = determineShippingZone(address, settings.shipping_zones);

          if (zone) {
            // Calculate based on weight brackets if available
            if (zone.weight_brackets && zone.weight_brackets.length) {
              for (const bracket of zone.weight_brackets) {
                if (totalWeight <= bracket.max_weight) {
                  shippingRate = bracket.rate;
                  estimatedDays =
                    bracket.estimated_days || zone.estimated_days || '3-5';
                  break;
                }
              }
            } else {
              // Use flat rate
              shippingRate = zone.flat_rate || 0;
              estimatedDays = zone.estimated_days || '3-5';
            }

            // Add available methods for this zone
            if (zone.methods && zone.methods.length) {
              availableMethods = zone.methods.map((method) => ({
                id: method.id,
                name: method.name,
                price: method.price,
                estimated_days: method.estimated_days,
              }));
            }
          } else {
            // Use default shipping rate
            shippingRate = settings.default_rate || 5.99;
            estimatedDays = settings.default_days || '3-5';

            availableMethods.push({
              id: 'standard',
              name: 'Standard Shipping',
              price: shippingRate,
              estimated_days: estimatedDays,
            });
          }
        }
      } else {
        // Use default shipping methods if no store settings found
        shippingRate = 5.99;

        availableMethods = [
          {
            id: 'standard',
            name: 'Standard Shipping',
            price: 5.99,
            estimated_days: '3-5',
          },
          {
            id: 'express',
            name: 'Express Shipping',
            price: 15.99,
            estimated_days: '1-2',
          },
        ];
      }
    } else {
      // Use default shipping methods if no store ID provided
      availableMethods = [
        {
          id: 'standard',
          name: 'Standard Shipping',
          price: 5.99,
          estimated_days: '3-5',
        },
        {
          id: 'express',
          name: 'Express Shipping',
          price: 15.99,
          estimated_days: '1-2',
        },
      ];
    }

    // Return calculated shipping data
    return NextResponse.json({
      shipping_options: availableMethods,
      default_rate: shippingRate,
      estimated_days: estimatedDays,
    });
  } catch (error) {
    console.error('Error calculating shipping:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping rates' },
      { status: 500 }
    );
  }
}

// Helper function to calculate subtotal
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Helper function to determine shipping zone based on address
function determineShippingZone(address, zones) {
  if (!zones || !zones.length) return null;

  // Try to match by country, state and postal code patterns
  for (const zone of zones) {
    // Check if country matches
    if (zone.countries && zone.countries.includes(address.country)) {
      // Check states if specified
      if (zone.states && zone.states.length) {
        if (!zone.states.includes(address.state)) {
          continue;
        }
      }

      // Check postal code patterns if specified
      if (zone.postal_codes && zone.postal_codes.length) {
        const postalMatches = zone.postal_codes.some((pattern) => {
          // Convert pattern to regex
          try {
            // Handle wildcards and ranges
            const regexPattern = pattern
              .replace(/\*/g, '.*') // Convert * to .*
              .replace(/(\d+)-(\d+)/g, '($1|$2)'); // Convert ranges

            const regex = new RegExp(`^${regexPattern}$`);
            return regex.test(address.postalCode);
          } catch (e) {
            return false;
          }
        });

        if (!postalMatches) {
          continue;
        }
      }

      // All criteria match, return this zone
      return zone;
    }
  }

  return null;
}
