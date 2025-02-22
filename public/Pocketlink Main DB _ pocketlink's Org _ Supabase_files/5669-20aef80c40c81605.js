!(function () {
  try {
    var e =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
              ? self
              : {},
      t = new e.Error().stack;
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = 'b78ce9f5-e425-405c-adaa-1f2f3b6d5ba5'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-b78ce9f5-e425-405c-adaa-1f2f3b6d5ba5'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5669],
  {
    19346: function (e, t, s) {
      var n, a;
      (s.d(t, {
        N: function () {
          return i;
        },
        l: function () {
          return n;
        },
      }),
        ((a = n || (n = {})).ERROR = 'ERROR'),
        (a.WARN = 'WARN'),
        (a.INFO = 'INFO'));
      let i = [
        {
          id: 'ERROR',
          label: 'Errors',
          description:
            'You should consider these issues urgent and fix them as soon as you can.',
          descriptionShort: 'Require immediate attention',
        },
        {
          id: 'WARN',
          label: 'Warnings',
          description:
            'You should try and read through these issues and fix them if necessary.',
          descriptionShort: 'To resolve only if necessary',
        },
        {
          id: 'INFO',
          label: 'Info',
          description:
            'You should read through these suggestions and consider implementing them.',
          descriptionShort: 'For consideration to implement',
        },
      ];
    },
    67628: function (e, t, s) {
      s.d(t, {
        Q: function () {
          return l;
        },
      });
      var n = s(97458),
        a = s(94059),
        i = s(73565),
        r = s(55228),
        l = (e) => {
          let { page: t, menu: s } = e;
          return (0, n.jsx)('div', {
            className: 'flex flex-col space-y-8 overflow-y-auto',
            'data-sentry-component': 'ProductMenu',
            'data-sentry-source-file': 'ProductMenu.tsx',
            children: (0, n.jsx)(a.ZP, {
              type: 'pills',
              'data-sentry-element': 'Menu',
              'data-sentry-source-file': 'ProductMenu.tsx',
              children: s.map((e, l) =>
                (0, n.jsxs)(
                  'div',
                  {
                    children: [
                      (0, n.jsx)('div', {
                        className: 'my-6 space-y-8',
                        children: (0, n.jsxs)('div', {
                          className: 'mx-3',
                          children: [
                            (0, n.jsx)(a.ZP.Group, {
                              title: e.title
                                ? (0, n.jsxs)('div', {
                                    className:
                                      'flex flex-col space-y-2 uppercase font-mono',
                                    children: [
                                      (0, n.jsx)('span', { children: e.title }),
                                      e.isPreview &&
                                        (0, n.jsx)(i.C, {
                                          variant: 'warning',
                                          children: 'Not production ready',
                                        }),
                                    ],
                                  })
                                : null,
                            }),
                            (0, n.jsx)('div', {
                              children: e.items.map((e) => {
                                let s = e.pages
                                  ? e.pages.includes(null != t ? t : '')
                                  : t === e.key;
                                return (0, n.jsx)(
                                  r.Z,
                                  {
                                    url: e.url,
                                    name: e.name,
                                    icon: e.icon,
                                    rightIcon: e.rightIcon,
                                    isActive: s,
                                    isExternal: e.isExternal,
                                    target: e.isExternal ? '_blank' : '_self',
                                    label: e.label,
                                  },
                                  e.key
                                );
                              }),
                            }),
                          ],
                        }),
                      }),
                      l !== s.length - 1 &&
                        (0, n.jsx)('div', {
                          className: 'h-px w-full bg-border-overlay',
                        }),
                    ],
                  },
                  e.key || e.title
                )
              ),
            }),
          });
        };
    },
    60689: function (e, t, s) {
      var n = s(97458),
        a = s(67910),
        i = s(37173),
        r = s(92240),
        l = s(65092),
        o = s(40577),
        d = s(19346),
        c = s(63621),
        u = s(32691);
      t.Z = (e) => {
        let {
            currentTab: t,
            setCurrentTab: s,
            setSelectedLint: m,
            isLoading: x,
            activeLints: p,
          } = e,
          h = (0, u.useRouter)(),
          f = p.filter((e) => 'WARN' === e.level).length,
          g = p.filter((e) => 'ERROR' === e.level).length,
          y = p.filter((e) => 'INFO' === e.level).length,
          j = (e) => {
            let { tab: t } = e,
              s = 0,
              a = '';
            return (
              t.id === d.l.ERROR && ((s = g), (a = 'errors')),
              t.id === d.l.WARN && ((s = f), (a = 'warnings')),
              t.id === d.l.INFO && ((s = y), (a = 'suggestions')),
              (0, n.jsx)('span', {
                className:
                  'text-xs text-foreground-muted group-text-foreground-lighter group-data-[state=active]:text-foreground-lighter transition',
                'data-sentry-component': 'LintCountLabel',
                'data-sentry-source-file': 'LintPageTabs.tsx',
                children: x
                  ? (0, n.jsx)(c.Z, { className: 'w-20 pt-1' })
                  : (0, n.jsxs)(n.Fragment, { children: [s, ' ', a] }),
              })
            );
          };
        return (0, n.jsx)(r.mQ, {
          defaultValue: t,
          onValueChange: (e) => {
            (s(e), m(null));
            let { sort: t, search: n, ...a } = h.query;
            h.push({ ...h, query: { ...a, preset: e, id: null } });
          },
          'data-sentry-element': 'Tabs_Shadcn_',
          'data-sentry-component': 'LintPageTabs',
          'data-sentry-source-file': 'LintPageTabs.tsx',
          children: (0, n.jsx)(r.dr, {
            className: (0, l.cn)('flex gap-0 border-0 items-end z-10 relative'),
            'data-sentry-element': 'TabsList_Shadcn_',
            'data-sentry-source-file': 'LintPageTabs.tsx',
            children: d.N.map((e) =>
              (0, n.jsxs)(
                r.SP,
                {
                  value: e.id,
                  className: (0, l.cn)(
                    'group relative',
                    'px-6 py-3 border-b-0 flex flex-col items-start !shadow-none border-default border-t',
                    'even:border-x last:border-r even:!border-x-strong last:!border-r-strong',
                    e.id === t ? '!bg-surface-200' : '!bg-surface-200/[33%]',
                    '!bg-surface-100',
                    'data-[state=active]:!bg-surface-200',
                    'text-foreground-light',
                    'transition'
                  ),
                  children: [
                    e.id === t &&
                      (0, n.jsx)('div', {
                        className:
                          'absolute top-0 left-0 w-full h-[1px] bg-foreground',
                      }),
                    (0, n.jsxs)('div', {
                      className: 'flex items-center gap-x-2',
                      children: [
                        (0, n.jsx)('span', {
                          className:
                            e.id === d.l.ERROR
                              ? 'text-destructive-600'
                              : e.id === d.l.WARN
                                ? 'text-warning-600'
                                : 'text-brand-500',
                          children: (0, n.jsx)(a.Z, {
                            size: 14,
                            fill: 'currentColor',
                            strokeWidth: 0,
                          }),
                        }),
                        (0, n.jsx)('span', {
                          className: '',
                          children: e.label,
                        }),
                        (0, n.jsxs)(o.u, {
                          children: [
                            (0, n.jsx)(o.aJ, {
                              asChild: !0,
                              children: (0, n.jsx)(i.Z, {
                                className:
                                  'transition text-foreground-muted w-3 h-3 data-[state=delayed-open]:text-foreground-light',
                              }),
                            }),
                            (0, n.jsx)(o._v, {
                              side: 'top',
                              children: e.description,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, n.jsx)(j, { tab: e }),
                  ],
                },
                e.id
              )
            ),
          }),
        });
      };
    },
    23662: function (e, t, s) {
      s.d(t, {
        EV: function () {
          return y;
        },
        Fs: function () {
          return b;
        },
        U5: function () {
          return v;
        },
        YL: function () {
          return N;
        },
        j9: function () {
          return j;
        },
        qy: function () {
          return k;
        },
      });
      var n = s(97458),
        a = s(70840),
        i = s(11024),
        r = s(97224),
        l = s(61379),
        o = s(39130),
        d = s(86204),
        c = s(73981),
        u = s(69436),
        m = s(80096),
        x = s(83145),
        p = s.n(x),
        h = s(19346),
        f = s(90839),
        g = s(73565);
      let y = [
          {
            name: 'unindexed_foreign_keys',
            title: 'Unindexed foreign keys',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/database/indexes?schema=')
                .concat(null == s ? void 0 : s.schema);
            },
            linkText: 'Create an index',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0001_unindexed_foreign_keys',
          },
          {
            name: 'auth_users_exposed',
            title: 'Exposed Auth Users',
            icon: (0, n.jsx)(i.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1.5,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/editor');
            },
            linkText: 'View table',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0002_auth_users_exposed',
          },
          {
            name: 'auth_rls_initplan',
            title: 'Auth RLS Initialization Plan',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/auth/policies');
            },
            linkText: 'View policies',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0003_auth_rls_initplan',
          },
          {
            name: 'no_primary_key',
            title: 'No Primary Key',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/editor');
            },
            linkText: 'View table',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0004_no_primary_key',
          },
          {
            name: 'unused_index',
            title: 'Unused Index',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/database/indexes?schema=')
                .concat(null == s ? void 0 : s.schema, '&table=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View index',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0005_unused_index',
          },
          {
            name: 'multiple_permissive_policies',
            title: 'Multiple Permissive Policies',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/auth/policies?schema=')
                .concat(null == s ? void 0 : s.schema, '&search=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View policies',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0006_multiple_permissive_policies',
          },
          {
            name: 'policy_exists_rls_disabled',
            title: 'Policy Exists RLS Disabled',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/auth/policies?schema=')
                .concat(null == s ? void 0 : s.schema, '&search=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View policies',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0007_policy_exists_rls_disabled',
          },
          {
            name: 'rls_enabled_no_policy',
            title: 'RLS Enabled No Policy',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/auth/policies?schema=')
                .concat(null == s ? void 0 : s.schema, '&search=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View table',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0008_rls_enabled_no_policy',
          },
          {
            name: 'duplicate_index',
            title: 'Duplicate Index',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/database/indexes?schema=')
                .concat(null == s ? void 0 : s.schema, '&table=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View index',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0009_duplicate_index',
          },
          {
            name: 'security_definer_view',
            title: 'Security Definer View',
            icon: (0, n.jsx)(r.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1.5,
            }),
            link: () =>
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0010_security_definer_view',
            linkText: 'View docs',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0010_security_definer_view',
          },
          {
            name: 'function_search_path_mutable',
            title: 'Function Search Path Mutable',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/database/functions?schema=')
                .concat(null == s ? void 0 : s.schema, '&search=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View functions',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0011_function_search_path_mutable',
          },
          {
            name: 'rls_disabled_in_public',
            title: 'RLS Disabled in Public',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/auth/policies?schema=')
                .concat(null == s ? void 0 : s.schema, '&search=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View policies',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0013_rls_disabled_in_public',
          },
          {
            name: 'extension_in_public',
            title: 'Extension in Public',
            icon: (0, n.jsx)(l.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t, metadata: s } = e;
              return '/project/'
                .concat(t, '/database/extensions?filter=')
                .concat(null == s ? void 0 : s.name);
            },
            linkText: 'View extension',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0014_extension_in_public',
          },
          {
            name: 'auth_otp_long_expiry',
            title: 'Auth OTP Long Expiry',
            icon: (0, n.jsx)(o.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/auth/providers');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/going-into-prod#security',
          },
          {
            name: 'auth_otp_short_length',
            title: 'Auth OTP Short Length',
            icon: (0, n.jsx)(d.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/auth/providers');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/going-into-prod#security',
          },
          {
            name: 'rls_references_user_metadata',
            title: 'RLS references user metadata',
            icon: (0, n.jsx)(c.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/auth/policies');
            },
            linkText: 'View policies',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?queryGroups=lint&lint=0015_rls_references_user_metadata',
          },
          {
            name: 'materialized_view_in_api',
            title: 'Materialized View in API',
            icon: (0, n.jsx)(r.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1.5,
            }),
            link: () =>
              'https://supabase.com/docs/guides/database/database-advisors?lint=0016_materialized_view_in_api',
            linkText: 'View docs',
            docsLink:
              'https://supabase.com/docs/guides/database/database-advisors?lint=0016_materialized_view_in_api',
          },
          {
            name: 'foreign_table_in_api',
            title: 'Foreign Table in API',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1.5,
            }),
            link: () =>
              'https://supabase.com/docs/guides/database/database-linter?lint=0017_foreign_table_in_api',
            linkText: 'View docs',
            docsLink:
              'https://supabase.com/docs/guides/database/database-linter?lint=0017_foreign_table_in_api',
          },
          {
            name: 'unsupported_reg_types',
            title: 'Unsupported reg types',
            icon: (0, n.jsx)(a.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1.5,
            }),
            link: () =>
              'https://supabase.com/docs/guides/database/database-advisors?lint=0018_unsupported_reg_types&queryGroups=lint',
            linkText: 'View docs',
            docsLink:
              'https://supabase.com/docs/guides/database/database-advisors?lint=0018_unsupported_reg_types&queryGroups=lint',
          },
          {
            name: 'ssl_not_enforced',
            title: 'SSL not enforced',
            icon: (0, n.jsx)(d.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/settings/database');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/ssl-enforcement',
          },
          {
            name: 'network_restrictions_not_set',
            title: 'No network restrictions',
            icon: (0, n.jsx)(d.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/settings/database');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/network-restrictions',
          },
          {
            name: 'pitr_not_enabled',
            title: 'PITR not enabled',
            icon: (0, n.jsx)(d.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/database/backups/pitr');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/backups#point-in-time-recovery',
          },
          {
            name: 'password_requirements_min_length',
            title: 'Minimum password length not set or inadequate',
            icon: (0, n.jsx)(d.Z, {
              className: 'text-foreground-muted',
              size: 15,
              strokeWidth: 1,
            }),
            link: (e) => {
              let { projectRef: t } = e;
              return '/project/'.concat(t, '/settings/auth');
            },
            linkText: 'View settings',
            docsLink:
              'https://supabase.com/docs/guides/platform/going-into-prod#security',
          },
        ],
        j = (e) => {
          let { title: t, projectRef: s, metadata: a } = e,
            i = y.find((e) => e.name === t);
          if (!i) return null;
          let r = i.link({ projectRef: s, metadata: a }),
            l = i.linkText;
          return (0, n.jsx)(f.z, {
            asChild: !0,
            type: 'default',
            'data-sentry-element': 'Button',
            'data-sentry-component': 'LintCTA',
            'data-sentry-source-file': 'Linter.utils.tsx',
            children: (0, n.jsx)(p(), {
              href: r,
              target: '_blank',
              rel: 'noreferrer',
              className: 'no-underline',
              'data-sentry-element': 'Link',
              'data-sentry-source-file': 'Linter.utils.tsx',
              children: l,
            }),
          });
        },
        b = (e) => {
          let { type: t } = e;
          switch (t) {
            case 'table':
              return (0, n.jsx)(a.Z, {
                className: 'text-foreground-muted',
                size: 15,
                strokeWidth: 1,
              });
            case 'view':
              return (0, n.jsx)(r.Z, {
                className: 'text-foreground-muted',
                size: 15,
                strokeWidth: 1.5,
              });
            case 'auth':
              return (0, n.jsx)(i.Z, {
                className: 'text-foreground-muted',
                size: 15,
                strokeWidth: 1.5,
              });
            default:
              return (0, n.jsx)(u.Z, {
                className: 'text-foreground-muted',
                size: 15,
                strokeWidth: 1.5,
              });
          }
        },
        v = (e) => {
          var t;
          let { metadata: s } = e;
          return null !==
            (t =
              s &&
              (s.entity ||
                (s.schema &&
                  s.name &&
                  ''.concat(s.schema, '.').concat(s.name)))) && void 0 !== t
            ? t
            : void 0;
        },
        k = (e) => {
          let { category: t } = e;
          return (0, n.jsx)(g.C, {
            variant: 'SECURITY' === t ? 'destructive' : 'warning',
            className: 'capitalize',
            'data-sentry-element': 'Badge',
            'data-sentry-component': 'LintCategoryBadge',
            'data-sentry-source-file': 'Linter.utils.tsx',
            children: t.toLowerCase(),
          });
        },
        N = (e) => {
          let { level: t } = e,
            s = t === h.l.ERROR ? 'errors' : 'warnings';
          return (0, n.jsxs)('div', {
            className:
              'absolute top-28 px-6 flex flex-col items-center justify-center w-full gap-y-2',
            'data-sentry-component': 'NoIssuesFound',
            'data-sentry-source-file': 'Linter.utils.tsx',
            children: [
              (0, n.jsx)(m.Z, {
                className: 'text-foreground-muted',
                strokeWidth: 1,
                'data-sentry-element': 'TextSearch',
                'data-sentry-source-file': 'Linter.utils.tsx',
              }),
              (0, n.jsxs)('div', {
                className: 'text-center',
                children: [
                  (0, n.jsxs)('p', {
                    className: 'text-foreground',
                    children: ['No ', s, ' detected'],
                  }),
                  (0, n.jsxs)('p', {
                    className: 'text-foreground-light',
                    children: [
                      'Congrats! There are no ',
                      s,
                      ' detected for this database',
                    ],
                  }),
                ],
              }),
            ],
          });
        };
    },
    28143: function (e, t, s) {
      var n = s(97458),
        a = s(98686),
        i = s(4839),
        r = s(83145),
        l = s.n(r),
        o = s(52983),
        d = s(44914),
        c = s(87831),
        u = s(12436),
        m = s(23662),
        x = s(32691),
        p = s(86186),
        h = s(65092),
        f = s(89429),
        g = s(90839),
        y = s(92240),
        j = s(77060),
        b = s(89129);
      t.Z = (e) => {
        var t, s, r;
        let {
            isLoading: v,
            filteredLints: k,
            selectedLint: N,
            setSelectedLint: _,
            currentTab: w,
          } = e,
          L = (0, o.useRef)(null),
          { ref: C } = (0, u.UO)(),
          R = (0, x.useRouter)(),
          { setAiAssistantPanel: z } = (0, p.WZ)(),
          [T, P] = (0, o.useState)('details'),
          Z = [
            {
              id: 'name',
              name: 'Issue type',
              description: void 0,
              minWidth: 240,
              value: (e) => {
                var t, s;
                return (0, n.jsxs)('div', {
                  className: 'flex items-center gap-1.5',
                  children: [
                    (0, n.jsx)('span', {
                      className: 'shrink-0',
                      children:
                        null === (t = m.EV.find((t) => e.name === t.name)) ||
                        void 0 === t
                          ? void 0
                          : t.icon,
                    }),
                    (0, n.jsx)('h3', {
                      className: 'text-xs',
                      children:
                        null === (s = m.EV.find((t) => e.name === t.name)) ||
                        void 0 === s
                          ? void 0
                          : s.title,
                    }),
                  ],
                });
              },
            },
            {
              id: 'metadata.name',
              name: 'Entity/item',
              description: void 0,
              minWidth: 230,
              value: (e) => {
                var t;
                return (0, n.jsxs)('div', {
                  className: 'flex items-center gap-1 text-xs',
                  children: [
                    (0, n.jsx)('span', {
                      className: 'shrink-0',
                      children: (0, n.jsx)(m.Fs, {
                        type:
                          null === (t = e.metadata) || void 0 === t
                            ? void 0
                            : t.type,
                      }),
                    }),
                    (0, n.jsx)(m.U5, { metadata: e.metadata }),
                  ],
                });
              },
            },
            {
              id: 'description',
              name: 'Description',
              description: void 0,
              minWidth: 400,
              value: (e) =>
                (0, n.jsx)(c.D, {
                  className: 'text-xs',
                  children: e.description,
                }),
            },
          ].map((e) => {
            var t;
            return {
              key: e.id,
              name: e.name,
              resizable: !0,
              minWidth: null !== (t = e.minWidth) && void 0 !== t ? t : 120,
              headerCellClass: 'first:pl-6 cursor-pointer',
              renderHeaderCell: () =>
                (0, n.jsx)('div', {
                  className:
                    'flex items-center justify-between font-mono  text-xs w-full',
                  children: (0, n.jsxs)('div', {
                    className: 'flex items-center gap-x-2',
                    children: [
                      (0, n.jsx)('p', {
                        className: '!text-foreground',
                        children: e.name,
                      }),
                      e.description &&
                        (0, n.jsx)('p', {
                          className: 'text-foreground-lighter',
                          children: e.description,
                        }),
                    ],
                  }),
                }),
              renderCell: (t) => {
                let s = e.value(t.row);
                return (0, n.jsx)('div', {
                  className: (0, h.cn)(
                    'w-full flex flex-col justify-center font-mono text-xs',
                    'number' == typeof s ? 'text-right' : ''
                  ),
                  children: (0, n.jsx)('span', { children: s }),
                });
              },
            };
          });
        return (0, n.jsxs)(f.pO, {
          direction: 'horizontal',
          className: 'relative flex flex-grow bg-alternative min-h-0',
          autoSaveId: 'linter-layout-v1',
          'data-sentry-element': 'ResizablePanelGroup',
          'data-sentry-component': 'LinterDataGrid',
          'data-sentry-source-file': 'LinterDataGrid.tsx',
          children: [
            (0, n.jsx)(f.ee, {
              defaultSize: 1,
              'data-sentry-element': 'ResizablePanel',
              'data-sentry-source-file': 'LinterDataGrid.tsx',
              children: (0, n.jsx)(d.ZP, {
                ref: L,
                style: { height: '100%' },
                className: (0, h.cn)('flex-1 flex-grow h-full'),
                rowHeight: 44,
                headerRowHeight: 36,
                columns: Z,
                rows: null != k ? k : [],
                rowClass: (e) => {
                  let t = e.cache_key === (null == N ? void 0 : N.cache_key);
                  return [
                    ''.concat(
                      t ? 'bg-surface-300 dark:bg-surface-300' : 'bg-200',
                      ' cursor-pointer'
                    ),
                    ''.concat(
                      t
                        ? '[&>div:first-child]:border-l-4 border-l-secondary [&>div]:border-l-foreground'
                        : ''
                    ),
                    '[&>.rdg-cell]:border-box [&>.rdg-cell]:outline-none [&>.rdg-cell]:shadow-none',
                    '[&>.rdg-cell:first-child>div]:ml-4',
                  ].join(' ');
                },
                renderers: {
                  renderRow: (e, t) =>
                    (0, n.jsx)(
                      d.X2,
                      {
                        ...t,
                        onClick: () => {
                          if ('number' == typeof e && e >= 0) {
                            var s;
                            (_(t.row),
                              null === (s = L.current) ||
                                void 0 === s ||
                                s.scrollToCell({ idx: 0, rowIdx: e }));
                            let { id: n, ...a } = R.query;
                            R.push({
                              ...R,
                              query: { ...a, id: t.row.cache_key },
                            });
                          }
                        },
                      },
                      t.row.cache_key
                    ),
                  noRowsFallback: v
                    ? (0, n.jsx)('div', {
                        className: 'absolute top-14 px-6 w-full',
                        children: (0, n.jsx)(b.A, {}),
                      })
                    : (0, n.jsx)(m.YL, { level: w }),
                },
                'data-sentry-element': 'DataGrid',
                'data-sentry-source-file': 'LinterDataGrid.tsx',
              }),
            }),
            null !== N &&
              (0, n.jsxs)(n.Fragment, {
                children: [
                  (0, n.jsx)(f.Dp, { withHandle: !0 }),
                  (0, n.jsxs)(f.ee, {
                    defaultSize: 30,
                    maxSize: 45,
                    minSize: 30,
                    className: 'bg-studio border-t',
                    children: [
                      (0, n.jsx)(g.z, {
                        type: 'text',
                        className: 'absolute top-3 right-3 px-1',
                        icon: (0, n.jsx)(a.Z, {}),
                        onClick: function () {
                          _(null);
                          let { id: e, ...t } = R.query;
                          R.push({ query: t });
                        },
                      }),
                      (0, n.jsxs)(y.mQ, {
                        value: T,
                        className: 'flex flex-col h-full',
                        onValueChange: (e) => {
                          P(e);
                        },
                        children: [
                          (0, n.jsx)(y.dr, {
                            className: 'px-5 flex gap-x-4 min-h-[46px]',
                            children: (0, n.jsx)(y.SP, {
                              value: 'details',
                              className:
                                'px-0 pb-0 h-full text-xs  data-[state=active]:bg-transparent !shadow-none',
                              children: 'Overview',
                            }),
                          }),
                          (0, n.jsx)(y.nU, {
                            value: 'details',
                            className:
                              'mt-0 flex-grow min-h-0 overflow-y-auto prose',
                            children:
                              N &&
                              (0, n.jsxs)('div', {
                                className: 'py-4 px-5',
                                children: [
                                  (0, n.jsxs)('div', {
                                    className: 'flex items-center gap-2 py-2',
                                    children: [
                                      (0, n.jsx)('h3', {
                                        className: 'text-sm m-0',
                                        children:
                                          null ===
                                            (t = m.EV.find(
                                              (e) => e.name === N.name
                                            )) || void 0 === t
                                            ? void 0
                                            : t.title,
                                      }),
                                      (0, n.jsx)(m.qy, {
                                        category: N.categories[0],
                                      }),
                                    ],
                                  }),
                                  (0, n.jsxs)('div', {
                                    className:
                                      'flex items-center gap-2 text-sm mt-4',
                                    children: [
                                      (0, n.jsx)('span', {
                                        children: 'Entity',
                                      }),
                                      (0, n.jsxs)('div', {
                                        className:
                                          'flex items-center gap-1 px-2 py-0.5 bg-surface-200 border rounded-lg ',
                                        children: [
                                          (0, n.jsx)(m.Fs, {
                                            type:
                                              null === (s = N.metadata) ||
                                              void 0 === s
                                                ? void 0
                                                : s.type,
                                          }),
                                          (0, n.jsx)(m.U5, {
                                            metadata: N.metadata,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, n.jsxs)('div', {
                                    className: 'grid',
                                    children: [
                                      (0, n.jsxs)('div', {
                                        children: [
                                          (0, n.jsx)('h3', {
                                            className: 'text-sm',
                                            children: 'Issue',
                                          }),
                                          (0, n.jsx)(c.D, {
                                            className: 'leading-6 text-sm',
                                            children: N.detail.replace(
                                              /\\`/g,
                                              '`'
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        children: [
                                          (0, n.jsx)('h3', {
                                            className: 'text-sm',
                                            children: 'Description',
                                          }),
                                          (0, n.jsx)(c.D, {
                                            className: 'text-sm',
                                            children: N.description.replace(
                                              /\\`/g,
                                              '`'
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        className: 'grid gap-2',
                                        children: [
                                          (0, n.jsx)('h3', {
                                            className: 'text-sm',
                                            children: 'Resolve',
                                          }),
                                          (0, n.jsxs)('div', {
                                            className:
                                              'flex items-center gap-2',
                                            children: [
                                              (0, n.jsx)(g.z, {
                                                icon: (0, n.jsx)(j.c, {
                                                  className: 'scale-75 w-3 h-3',
                                                }),
                                                onClick: () => {
                                                  var e, t, s, n;
                                                  z({
                                                    open: !0,
                                                    initialInput:
                                                      'Summarize the issue and suggest fixes: '
                                                        .concat(
                                                          null ===
                                                            (e = m.EV.find(
                                                              (e) =>
                                                                e.name ===
                                                                N.name
                                                            )) || void 0 === e
                                                            ? void 0
                                                            : e.title,
                                                          '\n                                \nEntity: '
                                                        )
                                                        .concat(
                                                          null !==
                                                            (s =
                                                              N.metadata &&
                                                              (N.metadata
                                                                .entity ||
                                                                (N.metadata
                                                                  .schema &&
                                                                  N.metadata
                                                                    .name &&
                                                                  ''
                                                                    .concat(
                                                                      N.metadata
                                                                        .schema,
                                                                      '.'
                                                                    )
                                                                    .concat(
                                                                      N.metadata
                                                                        .name
                                                                    )))) &&
                                                            void 0 !== s
                                                            ? s
                                                            : '',
                                                          '\n                                \nSchema: '
                                                        )
                                                        .concat(
                                                          null !==
                                                            (n =
                                                              null ===
                                                                (t =
                                                                  N.metadata) ||
                                                              void 0 === t
                                                                ? void 0
                                                                : t.schema) &&
                                                            void 0 !== n
                                                            ? n
                                                            : '',
                                                          '\n                                \nIssue: '
                                                        )
                                                        .concat(
                                                          N.detail.replace(
                                                            /\\`/g,
                                                            '`'
                                                          ),
                                                          '\n                                \nDescription: '
                                                        )
                                                        .concat(
                                                          N.description.replace(
                                                            /\\`/g,
                                                            '`'
                                                          ),
                                                          '\n'
                                                        ),
                                                  });
                                                },
                                                children: 'Ask Assistant',
                                              }),
                                              (0, n.jsx)(m.j9, {
                                                title: N.name,
                                                projectRef: C,
                                                metadata: N.metadata,
                                              }),
                                              (0, n.jsx)(g.z, {
                                                asChild: !0,
                                                type: 'text',
                                                children: (0, n.jsx)(l(), {
                                                  href:
                                                    (null ===
                                                      (r = m.EV.find(
                                                        (e) => e.name === N.name
                                                      )) || void 0 === r
                                                      ? void 0
                                                      : r.docsLink) ||
                                                    'https://supabase.com/docs/guides/database/database-linter',
                                                  target: '_blank',
                                                  rel: 'noreferrer',
                                                  className: 'no-underline',
                                                  children: (0, n.jsxs)(
                                                    'span',
                                                    {
                                                      className:
                                                        'flex items-center gap-2',
                                                      children: [
                                                        'Learn more ',
                                                        (0, n.jsx)(i.Z, {
                                                          size: 14,
                                                        }),
                                                      ],
                                                    }
                                                  ),
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          ],
        });
      };
    },
    18812: function (e, t, s) {
      var n = s(97458),
        a = s(12436),
        i = s(19346),
        r = s(71410),
        l = s(96060),
        o = s(5211),
        d = s(90839);
      t.Z = (e) => {
        let {
            filterOptions: t,
            activeLints: s,
            filteredLints: c,
            currentTab: u,
            filters: m,
            isLoading: x,
            setFilters: p,
            onClickRefresh: h,
          } = e,
          { ref: f } = (0, a.UO)(),
          g = (e, t) => {
            let s = [...m],
              n = s.findIndex((t) => t.level === e);
            -1 !== n && ((s[n] = { ...s[n], filters: t }), p(s));
          };
        return (0, n.jsxs)('div', {
          className:
            'px-6 py-2 -mt-px flex bg-surface-200 items-center justify-between border-t',
          'data-sentry-component': 'LinterFilters',
          'data-sentry-source-file': 'LinterFilters.tsx',
          children: [
            i.N.map((e) => {
              var a;
              return (0, n.jsx)(
                'div',
                {
                  className: e.id === u ? '' : 'hidden',
                  children: (0, n.jsx)(l.E, {
                    name: 'Filter',
                    className: 'w-52',
                    options: t,
                    disabled: 0 === s.filter((t) => t.level === e.id).length,
                    labelKey: 'name',
                    valueKey: 'value',
                    activeOptions:
                      (null === (a = m.find((t) => t.level === e.id)) ||
                      void 0 === a
                        ? void 0
                        : a.filters) || [],
                    onSaveFilters: (t) => g(e.id, t),
                  }),
                },
                e.id
              );
            }),
            (0, n.jsxs)('div', {
              className: 'flex items-center gap-x-2',
              children: [
                (0, n.jsx)(d.z, {
                  size: 'tiny',
                  type: 'default',
                  disabled: x,
                  onClick: h,
                  icon: (0, n.jsx)(o.Z, {
                    className: 'text-foreground-light '.concat(
                      x ? 'animate-spin' : ''
                    ),
                  }),
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'LinterFilters.tsx',
                  children: 'Refresh',
                }),
                (0, n.jsx)(r.z, {
                  align: 'end',
                  results: c,
                  fileName: 'Supabase Performance Security Lints ('.concat(
                    f,
                    ')'
                  ),
                  'data-sentry-element': 'DownloadResultsButton',
                  'data-sentry-source-file': 'LinterFilters.tsx',
                }),
              ],
            }),
          ],
        });
      };
    },
    23711: function (e, t, s) {
      var n = s(97458),
        a = s(65092),
        i = s(90839),
        r = s(49996);
      t.Z = (e) => {
        let {
          isLoading: t,
          isRefetching: s,
          refetch: l,
          hideDbInspectCTA: o,
        } = e;
        return (0, n.jsxs)('div', {
          className: 'px-6 py-6 flex gap-x-4 border-t ',
          'data-sentry-component': 'LinterPageFooter',
          'data-sentry-source-file': 'LinterPageFooter.tsx',
          children: [
            (0, n.jsxs)('div', {
              className: (0, a.cn)(
                o ? 'w-[35%]' : 'w-[33%]',
                'flex flex-col gap-y-1 text-sm'
              ),
              children: [
                (0, n.jsx)('p', { children: 'Reset suggestions' }),
                (0, n.jsx)('p', {
                  className: 'text-xs text-foreground-light',
                  children:
                    'Consider resetting the analysis making any changes',
                }),
                (0, n.jsx)(i.z, {
                  type: 'default',
                  className: '!mt-3 w-min',
                  disabled: t || s,
                  loading: t || s,
                  onClick: () => l(),
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'LinterPageFooter.tsx',
                  children: 'Rerun linter',
                }),
              ],
            }),
            (0, n.jsxs)('div', {
              className: (0, a.cn)(
                o ? 'w-[35%]' : 'w-[33%]',
                'flex flex-col gap-y-1 text-sm'
              ),
              children: [
                (0, n.jsx)('p', {
                  children: 'How are these suggestions generated?',
                }),
                (0, n.jsx)('div', {
                  className: 'prose text-xs',
                  children: (0, n.jsxs)('p', {
                    children: [
                      (0, n.jsx)('span', {
                        children: 'These suggestions use ',
                      }),
                      (0, n.jsx)('a', {
                        href: 'https://github.com/supabase/splinter',
                        target: '',
                        rel: '',
                        children: 'splinter (Supabase Postgres LINTER)',
                      }),
                      '.',
                    ],
                  }),
                }),
              ],
            }),
            !o &&
              (0, n.jsxs)('div', {
                className: 'w-[33%] flex flex-col gap-y-1 text-sm',
                children: [
                  (0, n.jsx)('p', {
                    children: 'Inspect your database for potential issues',
                  }),
                  (0, n.jsx)(r.U, {
                    className: 'text-xs',
                    content:
                      'The Supabase CLI comes with a range of tools to help inspect your Postgres instances for potential issues. [Learn more here](https://supabase.com/docs/guides/database/inspect).',
                  }),
                ],
              }),
          ],
        });
      };
    },
    42509: function (e, t, s) {
      s.d(t, {
        Z: function () {
          return c;
        },
      });
      var n = s(97458),
        a = s(32691),
        i = s(67628),
        r = s(62432),
        l = s(58326),
        o = s(60245);
      let d = (e) => {
        var t;
        let s =
          null !== (t = null == e ? void 0 : e.ref) && void 0 !== t
            ? t
            : 'default';
        return [
          {
            title: 'Advisors',
            items: [
              {
                name: 'Security Advisor',
                key: 'security',
                url: '/project/'.concat(s, '/advisors/security'),
                items: [],
              },
              {
                name: 'Performance Advisor',
                key: 'performance',
                url: '/project/'.concat(s, '/advisors/performance'),
                items: [],
              },
              {
                name: 'Query Performance',
                key: 'query-performance',
                url: '/project/'.concat(s, '/advisors/query-performance'),
                items: [],
              },
            ],
          },
        ];
      };
      var c = (0, l.Q)((e) => {
        let { children: t } = e,
          s = (0, r.Vm)(),
          l = (0, a.useRouter)().pathname.split('/')[4];
        return (0, n.jsx)(o.Z, {
          isLoading: !1,
          product: 'Advisors',
          productMenu: (0, n.jsx)(i.Q, { page: l, menu: d(s) }),
          'data-sentry-element': 'ProjectLayout',
          'data-sentry-component': 'AdvisorsLayout',
          'data-sentry-source-file': 'AdvisorsLayout.tsx',
          children: t,
        });
      });
    },
    71410: function (e, t, s) {
      s.d(t, {
        z: function () {
          return p;
        },
      });
      var n = s(97458),
        a = s(98601),
        i = s(29790),
        r = s(57304),
        l = s(81307),
        o = s(52983),
        d = s(84012),
        c = s(34549),
        u = s(45536),
        m = s(14500),
        x = s(90839);
      let p = (e) => {
        let {
            type: t = 'default',
            align: s = 'start',
            results: p,
            fileName: h,
            onCopyAsMarkdown: f,
            onCopyAsJSON: g,
          } = e,
          y = (0, o.useRef)(null),
          j = p.map((e) => {
            let t = { ...e };
            return (
              Object.keys(e).forEach((s) => {
                'object' == typeof e[s] && (t[s] = JSON.stringify(e[s]));
              }),
              t
            );
          }),
          b = (0, o.useMemo)(() => {
            if (p) {
              let e = Array.from(p)[0];
              if (e) return Object.keys(e);
            }
          }, [p]);
        return (0, n.jsxs)(n.Fragment, {
          children: [
            (0, n.jsxs)(m.h_, {
              'data-sentry-element': 'DropdownMenu',
              'data-sentry-source-file': 'DownloadResultsButton.tsx',
              children: [
                (0, n.jsx)(m.$F, {
                  asChild: !0,
                  'data-sentry-element': 'DropdownMenuTrigger',
                  'data-sentry-source-file': 'DownloadResultsButton.tsx',
                  children: (0, n.jsx)(x.z, {
                    type: t,
                    iconRight: (0, n.jsx)(a.Z, {}),
                    disabled: 0 === p.length,
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'DownloadResultsButton.tsx',
                    children: 'Export',
                  }),
                }),
                (0, n.jsxs)(m.AW, {
                  align: s,
                  className: 'w-44',
                  'data-sentry-element': 'DropdownMenuContent',
                  'data-sentry-source-file': 'DownloadResultsButton.tsx',
                  children: [
                    (0, n.jsxs)(m.Xi, {
                      className: 'gap-x-2',
                      onClick: () => {
                        var e;
                        (null === (e = y.current) ||
                          void 0 === e ||
                          e.link.click(),
                          c.Am.success('Downloading results as CSV'));
                      },
                      'data-sentry-element': 'DropdownMenuItem',
                      'data-sentry-source-file': 'DownloadResultsButton.tsx',
                      children: [
                        (0, n.jsx)(i.Z, {
                          size: 14,
                          'data-sentry-element': 'Download',
                          'data-sentry-source-file':
                            'DownloadResultsButton.tsx',
                        }),
                        (0, n.jsx)('p', { children: 'Download CSV' }),
                      ],
                    }),
                    (0, n.jsxs)(m.Xi, {
                      onClick: () => {
                        if (navigator) {
                          0 == j.length && (0, c.Am)('Results are empty');
                          let e = Object.keys(j[0]),
                            t = j.map((t) => {
                              let s = [];
                              return (e.forEach((e) => s.push(t[e])), s);
                            }),
                            s = [e].concat(t),
                            n = (0, l.x)(s);
                          (0, u.vQ)(n, () => {
                            (c.Am.success('Copied results to clipboard'),
                              null == f || f());
                          });
                        }
                      },
                      className: 'gap-x-2',
                      'data-sentry-element': 'DropdownMenuItem',
                      'data-sentry-source-file': 'DownloadResultsButton.tsx',
                      children: [
                        (0, n.jsx)(r.Z, {
                          size: 14,
                          'data-sentry-element': 'Clipboard',
                          'data-sentry-source-file':
                            'DownloadResultsButton.tsx',
                        }),
                        (0, n.jsx)('p', { children: 'Copy as markdown' }),
                      ],
                    }),
                    (0, n.jsxs)(m.Xi, {
                      onClick: () => {
                        if (navigator) {
                          if (0 === p.length)
                            return (0, c.Am)('Results are empty');
                          (0, u.vQ)(JSON.stringify(p, null, 2), () => {
                            (c.Am.success('Copied results to clipboard'),
                              null == g || g());
                          });
                        }
                      },
                      className: 'gap-x-2',
                      'data-sentry-element': 'DropdownMenuItem',
                      'data-sentry-source-file': 'DownloadResultsButton.tsx',
                      children: [
                        (0, n.jsx)(r.Z, {
                          size: 14,
                          'data-sentry-element': 'Clipboard',
                          'data-sentry-source-file':
                            'DownloadResultsButton.tsx',
                        }),
                        (0, n.jsx)('p', { children: 'Copy as JSON' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, n.jsx)(d.CSVLink, {
              ref: y,
              className: 'hidden',
              headers: b,
              data: j,
              filename: ''.concat(h, '.csv'),
              'data-sentry-element': 'CSVLink',
              'data-sentry-source-file': 'DownloadResultsButton.tsx',
            }),
          ],
        });
      };
    },
    96060: function (e, t, s) {
      s.d(t, {
        E: function () {
          return u;
        },
      });
      var n = s(97458),
        a = s(52983),
        i = s(42026),
        r = s(90839),
        l = s(65092),
        o = s(64890),
        d = s(61893),
        c = s(36155);
      let u = (e) => {
        let {
            title: t,
            options: s = [],
            activeOptions: u = [],
            valueKey: m,
            labelKey: x,
            iconKey: p = 'icon',
            name: h = 'default',
            variant: f = 'rectangular',
            buttonType: g,
            disabled: y,
            labelClass: j,
            className: b,
            maxHeightClass: v = 'h-[205px]',
            clearButtonText: k = 'Clear',
            onSaveFilters: N,
          } = e,
          [_, w] = (0, a.useState)(!1),
          [L, C] = (0, a.useState)([]),
          R = u.map((e) => {
            let t = s.find((t) => t[m] === e);
            return t && t[x] ? t[x] : '';
          });
        return (
          (0, a.useEffect)(() => {
            !_ && u.length > 0 && C(u);
          }, [_, u]),
          (0, n.jsxs)(i.J2, {
            open: _,
            onOpenChange: w,
            'data-sentry-element': 'Popover_Shadcn_',
            'data-sentry-component': 'FilterPopover',
            'data-sentry-source-file': 'FilterPopover.tsx',
            children: [
              (0, n.jsx)(i.xo, {
                asChild: !0,
                'data-sentry-element': 'PopoverTrigger_Shadcn_',
                'data-sentry-source-file': 'FilterPopover.tsx',
                children: (0, n.jsx)(r.z, {
                  asChild: !0,
                  disabled: y,
                  type: null != g ? g : u.length > 0 ? 'default' : 'dashed',
                  onClick: () => w(!1),
                  className: 'rounded' === f ? 'rounded-full' : '',
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'FilterPopover.tsx',
                  children: (0, n.jsxs)('div', {
                    children: [
                      (0, n.jsx)('span', { children: h }),
                      u.length > 0 &&
                        (0, n.jsx)('span', {
                          className: 'mr-1',
                          children: ':',
                        }),
                      u.length >= 3
                        ? (0, n.jsxs)('span', {
                            children: [R[0], ' and ', u.length - 1, ' others'],
                          })
                        : u.length > 0
                          ? (0, n.jsx)('span', { children: R.join(', ') })
                          : null,
                    ],
                  }),
                }),
              }),
              (0, n.jsxs)(i.yk, {
                className: (0, l.cn)('p-0 w-44', b),
                align: 'start',
                'data-sentry-element': 'PopoverContent_Shadcn_',
                'data-sentry-source-file': 'FilterPopover.tsx',
                children: [
                  (0, n.jsx)('div', {
                    className:
                      'border-b border-overlay bg-surface-200 rounded-t pb-1 px-3',
                    children: (0, n.jsx)('span', {
                      className: 'text-xs text-foreground-light',
                      children:
                        null != t ? t : 'Select '.concat(h.toLowerCase()),
                    }),
                  }),
                  (0, n.jsx)(o.x, {
                    className: s.length > 7 ? v : '',
                    'data-sentry-element': 'ScrollArea',
                    'data-sentry-source-file': 'FilterPopover.tsx',
                    children: (0, n.jsx)('div', {
                      className: 'p-3 flex flex-col gap-y-2',
                      children: s.map((e) => {
                        let t = e[m],
                          s = p ? e[p] : void 0;
                        return (0, n.jsxs)(
                          'div',
                          {
                            className: 'flex items-center gap-x-2',
                            children: [
                              (0, n.jsx)(d.X, {
                                id: t,
                                checked: L.includes(t),
                                onCheckedChange: () => {
                                  L.includes(t)
                                    ? C(L.filter((e) => e !== t))
                                    : C(L.concat(t));
                                },
                              }),
                              (0, n.jsxs)(c._, {
                                htmlFor: e[m],
                                className: (0, l.cn)(
                                  'flex items-center gap-x-2 text-xs',
                                  j
                                ),
                                children: [
                                  s &&
                                    (0, n.jsx)('img', {
                                      src: s,
                                      alt: e[x],
                                      className: (0, l.cn)(
                                        'w-4 h-4',
                                        e.iconClass
                                      ),
                                    }),
                                  (0, n.jsx)('span', { children: e[x] }),
                                ],
                              }),
                            ],
                          },
                          t
                        );
                      }),
                    }),
                  }),
                  (0, n.jsxs)('div', {
                    className:
                      'flex items-center justify-end gap-2 border-t border-overlay bg-surface-200 py-2 px-3',
                    children: [
                      (0, n.jsx)(r.z, {
                        size: 'tiny',
                        type: 'default',
                        onClick: () => {
                          (N([]), C([]), w(!1));
                        },
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'FilterPopover.tsx',
                        children: k,
                      }),
                      (0, n.jsx)(r.z, {
                        type: 'primary',
                        onClick: () => {
                          let e = s.map((e) => e[m]);
                          (N(L.sort((t, s) => e.indexOf(t) - e.indexOf(s))),
                            w(!1));
                        },
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'FilterPopover.tsx',
                        children: 'Save',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      };
    },
    24083: function (e, t, s) {
      s.d(t, {
        p: function () {
          return r;
        },
      });
      var n = s(97458),
        a = s(65092),
        i = s(67096);
      let r = (e) => {
        let {
          title: t,
          description: s,
          docsUrl: r,
          actions: l,
          className: o,
        } = e;
        return (0, n.jsxs)('div', {
          className: (0, a.cn)(
            'w-full mb-6 flex flex-col sm:flex-row md:items-center justify-between gap-4 '.concat(
              o
            )
          ),
          'data-sentry-component': 'FormHeader',
          'data-sentry-source-file': 'FormHeader.tsx',
          children: [
            (0, n.jsxs)('div', {
              className: 'space-y-1',
              children: [
                (0, n.jsx)('h3', {
                  className: 'text-foreground text-xl prose',
                  children: t,
                }),
                s &&
                  (0, n.jsx)('div', {
                    className: 'prose text-sm max-w-full',
                    children: s,
                  }),
              ],
            }),
            (0, n.jsxs)('div', {
              className: 'flex flex-col sm:flex-row md:items-center gap-x-2',
              children: [void 0 !== r && (0, n.jsx)(i.G, { href: r }), l],
            }),
          ],
        });
      };
    },
    55228: function (e, t, s) {
      var n = s(97458),
        a = s(83145),
        i = s.n(a),
        r = s(94059),
        l = s(73565),
        o = s(90839);
      t.Z = (e) => {
        let {
            name: t = '',
            isActive: s,
            isExternal: a,
            icon: d,
            rightIcon: c,
            url: u = '',
            target: m = '_self',
            onClick: x,
            textClassName: p = '',
            hoverText: h = '',
            label: f,
          } = e,
          g = (0, n.jsx)(r.ZP.Item, {
            icon: d,
            rounded: !0,
            active: s,
            onClick: x,
            children: (0, n.jsxs)('div', {
              className: 'flex w-full items-center justify-between gap-1',
              children: [
                (0, n.jsxs)('div', {
                  title: h || ('string' == typeof t ? t : ''),
                  className: 'flex items-center gap-2 truncate w-full ' + p,
                  children: [
                    (0, n.jsxs)('span', {
                      className: 'truncate',
                      children: [t, ' '],
                    }),
                    void 0 !== f &&
                      (0, n.jsx)(l.C, {
                        variant: 'warning',
                        className: 'py-0 px-1.5 capitalize',
                        children: f,
                      }),
                  ],
                }),
                c && (0, n.jsx)('div', { children: c }),
              ],
            }),
          });
        return u
          ? a
            ? (0, n.jsx)(o.z, {
                asChild: !0,
                block: !0,
                className: '!justify-start',
                type: 'text',
                size: 'small',
                icon: d,
                children: (0, n.jsx)(i(), {
                  href: u,
                  target: '_blank',
                  rel: 'noreferrer',
                  children: t,
                }),
              })
            : (0, n.jsx)(i(), {
                href: u,
                className: 'block',
                target: m,
                children: g,
              })
          : g;
      };
    },
    27246: function (e, t, s) {
      s.d(t, {
        O: function () {
          return i;
        },
      });
      var n = s(97458),
        a = s(65092);
      let i = (e) => {
        let { loading: t } = e;
        return (0, n.jsx)('div', {
          className: 'relative overflow-hidden w-full h-px bg-border m-auto',
          'data-sentry-component': 'LoadingLine',
          'data-sentry-source-file': 'LoadingLine.tsx',
          children: (0, n.jsx)('span', {
            className: (0, a.cn)(
              'absolute w-[80px] h-px ml-auto mr-auto left-0 right-0 text-center block top-0',
              'transition-all',
              'line-loading-bg-light dark:line-loading-bg',
              t && 'animate-line-loading-slower opacity-100',
              t ? 'opacity-100' : 'opacity-0'
            ),
          }),
        });
      };
    },
    94059: function (e, t, s) {
      s.d(t, {
        ZP: function () {
          return m;
        },
      });
      var n = s(97458),
        a = s(52983),
        i = s(25843),
        r = s(65092);
      function l(e) {
        let { children: t, className: s, tag: a = 'div', style: i } = e;
        return (0, n.jsx)(''.concat(a), {
          style: i,
          'data-sentry-element': 'CustomTag',
          'data-sentry-component': 'Typography',
          'data-sentry-source-file': 'Typography.tsx',
          children: t,
        });
      }
      ((l.Title = function (e) {
        let { className: t, level: s = 1, children: a, style: i } = e;
        return (0, n.jsx)('h'.concat(s), {
          style: i,
          'data-sentry-element': 'CustomTag',
          'data-sentry-component': 'Title',
          'data-sentry-source-file': 'Title.tsx',
          children: a,
        });
      }),
        (l.Text = function (e) {
          let {
            className: t,
            children: s,
            style: a,
            type: i,
            disabled: r,
            mark: l,
            code: o,
            keyboard: d,
            underline: c,
            strikethrough: u,
            strong: m,
            small: x,
          } = e;
          return o
            ? (0, n.jsx)('code', { style: a, children: s })
            : l
              ? (0, n.jsx)('mark', { style: a, children: s })
              : d
                ? (0, n.jsx)('kbd', { style: a, children: s })
                : m
                  ? (0, n.jsx)('strong', { style: a, children: s })
                  : (0, n.jsx)('span', {
                      style: a,
                      'data-sentry-component': 'Text',
                      'data-sentry-source-file': 'Text.tsx',
                      children: s,
                    });
        }),
        (l.Link = function (e) {
          let {
            children: t,
            target: s = '_blank',
            href: a,
            className: i,
            onClick: r,
            style: l,
          } = e;
          return (0, n.jsx)('a', {
            onClick: r,
            href: a,
            target: s,
            rel: 'noopener noreferrer',
            style: l,
            'data-sentry-component': 'Link',
            'data-sentry-source-file': 'Link.tsx',
            children: t,
          });
        }));
      let o = (0, a.createContext)({ type: 'text' }),
        d = (e) => {
          let { type: t } = e;
          return (0, n.jsx)(o.Provider, {
            value: { type: t },
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'MenuContextProvider',
            'data-sentry-source-file': 'MenuContext.tsx',
            children: e.children,
          });
        },
        c = () => {
          let e = (0, a.useContext)(o);
          if (void 0 === e)
            throw Error(
              'MenuContext must be used within a MenuContextProvider.'
            );
          return e;
        };
      function u(e) {
        let {
          children: t,
          className: s,
          ulClassName: a,
          style: i,
          type: r = 'text',
        } = e;
        return (0, n.jsx)('nav', {
          role: 'menu',
          'aria-label': 'Sidebar',
          'aria-orientation': 'vertical',
          'aria-labelledby': 'options-menu',
          className: s,
          style: i,
          'data-sentry-component': 'Menu',
          'data-sentry-source-file': 'Menu.tsx',
          children: (0, n.jsx)(d, {
            type: r,
            'data-sentry-element': 'MenuContextProvider',
            'data-sentry-source-file': 'Menu.tsx',
            children: (0, n.jsx)('ul', { className: a, children: t }),
          }),
        });
      }
      ((u.Item = function (e) {
        let {
            children: t,
            icon: s,
            active: a,
            rounded: l,
            onClick: o,
            doNotCloseOverlay: d = !1,
            showActiveBar: u = !1,
            style: m,
          } = e,
          x = (0, i.Z)('menu'),
          { type: p } = c(),
          h = [x.item.base];
        (h.push(x.item.variants[p].base),
          a
            ? h.push(x.item.variants[p].active)
            : h.push(x.item.variants[p].normal));
        let f = [x.item.content.base];
        a ? f.push(x.item.content.active) : f.push(x.item.content.normal);
        let g = [x.item.icon.base];
        return (
          a ? g.push(x.item.icon.active) : g.push(x.item.icon.normal),
          (0, n.jsxs)('li', {
            role: 'menuitem',
            className: (0, r.cn)('outline-none', h),
            style: m,
            onClick: o,
            'aria-current': a ? 'page' : void 0,
            'data-sentry-component': 'Item',
            'data-sentry-source-file': 'Menu.tsx',
            children: [
              s &&
                (0, n.jsx)('div', {
                  className: ''.concat(g.join(' '), ' min-w-fit'),
                  children: s,
                }),
              (0, n.jsx)('span', { className: f.join(' '), children: t }),
            ],
          })
        );
      }),
        (u.Group = function (e) {
          let { children: t, icon: s, title: a } = e,
            r = (0, i.Z)('menu'),
            { type: l } = c();
          return (0, n.jsxs)('div', {
            className: [r.group.base, r.group.variants[l]].join(' '),
            'data-sentry-component': 'Group',
            'data-sentry-source-file': 'Menu.tsx',
            children: [
              s && (0, n.jsx)('span', { className: r.group.icon, children: s }),
              (0, n.jsx)('span', { className: r.group.content, children: a }),
              t,
            ],
          });
        }),
        (u.Misc = function (e) {
          let { children: t } = e;
          return (0, n.jsx)('div', {
            'data-sentry-component': 'Misc',
            'data-sentry-source-file': 'Menu.tsx',
            children: (0, n.jsx)(l.Text, {
              'data-sentry-element': 'unknown',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, n.jsx)('span', { children: t }),
            }),
          });
        }));
      var m = u;
    },
  },
]);
