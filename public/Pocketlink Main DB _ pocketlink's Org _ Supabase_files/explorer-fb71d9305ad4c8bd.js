(!(function () {
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
      (e._sentryDebugIds[t] = '719b3040-ce8b-455c-9924-16a85693a165'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-719b3040-ce8b-455c-9924-16a85693a165'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6526],
    {
      20912: function (e, t, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/logs/explorer',
          function () {
            return s(62651);
          },
        ]);
      },
      34273: function (e, t, s) {
        'use strict';
        s.d(t, {
          _: function () {
            return i;
          },
        });
        var n = s(28894),
          a = s(6464),
          r = s(80023);
        async function l(e, t) {
          let { ref: s, sql: n } = e;
          if (!n) throw Error('SQL must be provided');
          let { data: r, error: l } = await (0, a.U2)(
            '/platform/projects/{ref}/analytics/warehouse/query',
            { params: { path: { ref: s }, query: { bq_sql: n } }, signal: t }
          );
          return (l && (0, a.S3)(l), r);
        }
        let i = function (e) {
          let { ref: t, sql: s } = e,
            { enabled: a, ...i } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, n.a)(
            r.d.warehouseQuery(t, s),
            (e) => {
              let { signal: n } = e;
              return l({ ref: t, sql: s }, n);
            },
            {
              enabled: a,
              staleTime: 1 / 0,
              cacheTime: 9e5,
              refetchOnMount: !1,
              refetchInterval: !1,
              ...i,
            }
          );
        };
      },
      24976: function (e, t, s) {
        'use strict';
        var n = s(97458),
          a = s(83145),
          r = s.n(a),
          l = s(75541),
          i = s(42155),
          o = s(90839),
          c = s(89831);
        t.Z = (e) => {
          let { show: t, setShowUpgradePrompt: s } = e,
            a = (0, l.l)();
          return (0, n.jsxs)(i.Z, {
            hideFooter: !0,
            visible: t,
            closable: !0,
            size: 'medium',
            header: 'Log retention',
            onCancel: () => s(!1),
            'data-sentry-element': 'Modal',
            'data-sentry-component': 'UpgradePrompt',
            'data-sentry-source-file': 'UpgradePrompt.tsx',
            children: [
              (0, n.jsx)(i.Z.Content, {
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'UpgradePrompt.tsx',
                children: (0, n.jsxs)('div', {
                  className: 'space-y-4',
                  children: [
                    (0, n.jsx)('p', {
                      className: 'text-sm',
                      children:
                        'Logs can be retained up to a duration of 3 months depending on the plan that your project is on.',
                    }),
                    (0, n.jsxs)('div', {
                      className: 'border-control bg-surface-300 rounded border',
                      children: [
                        (0, n.jsxs)('div', {
                          className: 'flex items-center px-4 pt-2 pb-1',
                          children: [
                            (0, n.jsx)('p', {
                              className:
                                'text-foreground-light w-[40%] text-sm',
                              children: 'Plan',
                            }),
                            (0, n.jsx)('p', {
                              className:
                                'text-foreground-light w-[60%] text-sm',
                              children: 'Retention duration',
                            }),
                          ],
                        }),
                        (0, n.jsxs)('div', {
                          className: 'py-1',
                          children: [
                            (0, n.jsxs)('div', {
                              className: 'flex items-center px-4 py-1',
                              children: [
                                (0, n.jsx)('p', {
                                  className: 'w-[40%] text-sm',
                                  children: 'Free',
                                }),
                                (0, n.jsx)('p', {
                                  className: 'w-[60%] text-sm',
                                  children: c.fg.FREE.text,
                                }),
                              ],
                            }),
                            (0, n.jsxs)('div', {
                              className: 'flex items-center px-4 py-1',
                              children: [
                                (0, n.jsx)('p', {
                                  className: 'w-[40%] text-sm',
                                  children: 'Pro',
                                }),
                                (0, n.jsx)('p', {
                                  className: 'w-[60%] text-sm',
                                  children: c.fg.PRO.text,
                                }),
                              ],
                            }),
                            (0, n.jsxs)('div', {
                              className: 'flex items-center px-4 py-1',
                              children: [
                                (0, n.jsx)('p', {
                                  className: 'w-[40%] text-sm',
                                  children: 'Team',
                                }),
                                (0, n.jsx)('p', {
                                  className: 'w-[60%] text-sm',
                                  children: c.fg.TEAM.text,
                                }),
                              ],
                            }),
                            (0, n.jsxs)('div', {
                              className: 'flex items-center px-4 py-1',
                              children: [
                                (0, n.jsx)('p', {
                                  className: 'w-[40%] text-sm',
                                  children: 'Enterprise',
                                }),
                                (0, n.jsx)('p', {
                                  className: 'w-[60%] text-sm',
                                  children: c.fg.ENTERPRISE.text,
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
              (0, n.jsx)(i.Z.Separator, {
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'UpgradePrompt.tsx',
              }),
              (0, n.jsxs)(i.Z.Content, {
                className: 'flex justify-end gap-3',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'UpgradePrompt.tsx',
                children: [
                  (0, n.jsx)(o.z, {
                    type: 'default',
                    onClick: () => s(!1),
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'UpgradePrompt.tsx',
                    children: 'Close',
                  }),
                  (0, n.jsx)(o.z, {
                    asChild: !0,
                    size: 'tiny',
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'UpgradePrompt.tsx',
                    children: (0, n.jsx)(r(), {
                      href: '/org/'.concat(
                        null == a ? void 0 : a.slug,
                        '/billing?panel=subscriptionPlan&source=logsRetentionUpgradePrompt'
                      ),
                      'data-sentry-element': 'Link',
                      'data-sentry-source-file': 'UpgradePrompt.tsx',
                      children: 'Upgrade',
                    }),
                  }),
                ],
              }),
            ],
          });
        };
      },
      18226: function (e, t, s) {
        'use strict';
        var n = s(28894),
          a = s(52983),
          r = s(12436),
          l = s(89831),
          i = s(90876),
          o = s(6464);
        t.Z = function (e) {
          var t;
          let s =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            c =
              !(arguments.length > 2) ||
              void 0 === arguments[2] ||
              arguments[2],
            d = (0, l.PJ)(l.up),
            [u, m] = (0, a.useState)({
              sql: (null == s ? void 0 : s.sql) || '',
              project: e,
              iso_timestamp_start: s.iso_timestamp_start
                ? s.iso_timestamp_start
                : d.calcFrom(),
              iso_timestamp_end: s.iso_timestamp_end
                ? s.iso_timestamp_end
                : d.calcTo(),
            }),
            p = c && void 0 !== e && !!u.sql,
            h = (0, i.HJ)(u.sql || ''),
            x = (0, i.Ir)(u.sql || ''),
            {
              data: f,
              error: y,
              isLoading: g,
              isRefetching: j,
              refetch: v,
            } = (0, n.a)(
              ['projects', e, 'logs', u],
              async (t) => {
                let { signal: s } = t,
                  { data: n, error: a } = await (0, o.U2)(
                    '/platform/projects/{ref}/analytics/endpoints/logs.all',
                    { params: { path: { ref: e }, query: u }, signal: s }
                  );
                if (a) throw a;
                return n;
              },
              { enabled: p, refetchOnWindowFocus: !1 }
            ),
            b = y ? y.message : null;
          return (
            !b &&
              (null == f ? void 0 : f.error) &&
              (b = null == f ? void 0 : f.error),
            r.Qy &&
              (h &&
                (b = {
                  message:
                    'The parser does not yet support WITH and subquery statements.',
                  docs: 'https://supabase.com/docs/guides/platform/advanced-log-filtering#the-with-keyword-and-subqueries-are-not-supported',
                }),
              x &&
                (b = {
                  message:
                    'BigQuery does not support ILIKE. Use REGEXP_CONTAINS instead.',
                  docs: 'https://supabase.com/docs/guides/platform/advanced-log-filtering#the-ilike-and-similar-to-keywords-are-not-supported',
                })),
            {
              params: u,
              isLoading: (p && g) || j,
              logData:
                null !== (t = null == f ? void 0 : f.result) && void 0 !== t
                  ? t
                  : [],
              error: b,
              changeQuery: function () {
                let e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : '';
                m((t) => ({ ...t, sql: e }));
              },
              runQuery: () => v(),
              setParams: m,
            }
          );
        };
      },
      38850: function (e, t, s) {
        'use strict';
        s.d(t, {
          _: function () {
            return i;
          },
        });
        var n = s(90876),
          a = s(69951),
          r = s(52983),
          l = s(75541);
        let i = (e) => {
          var t;
          let s = (0, l.l)(),
            { data: i } = (0, a.Gl)({ orgSlug: null == s ? void 0 : s.slug }),
            [o, c] = (0, r.useState)(!1),
            d = (0, n.dP)(
              e,
              null == i
                ? void 0
                : null === (t = i.plan) || void 0 === t
                  ? void 0
                  : t.id
            );
          return (
            (0, r.useEffect)(() => {
              d && c(!0);
            }, [e]),
            {
              showUpgradePrompt: o,
              setShowUpgradePrompt: c,
              shouldShowUpgradePrompt: d,
            }
          );
        };
      },
      62651: function (e, t, s) {
        'use strict';
        (s.r(t),
          s.d(t, {
            LogsExplorerPage: function () {
              return ei;
            },
            default: function () {
              return eo;
            },
          }));
        var n = s(97458),
          a = s(39303),
          r = s(28977),
          l = s.n(r),
          i = s(32691),
          o = s(52983),
          c = s(34549),
          d = s(12436),
          u = s(89429),
          m = s(42155),
          p = s(19540),
          h = s(51571),
          x = s(90839),
          f = s(23382),
          y = s(89831),
          g = s(90876),
          j = s(83145),
          v = s.n(j),
          b = s(57006),
          _ = s(71147),
          w = s(21786),
          N = s(45536),
          S = s(98601),
          C = s(98686),
          q = s(11757),
          P = s(4839),
          E = s(62507),
          k = s(57304),
          Z = s(51477),
          T = s(14500),
          L = s(73565),
          R = s(4526),
          z = s(10611),
          I = s(12472),
          A = s(95526),
          O = s(40577),
          F = s(2216);
        function Q(e) {
          let { name: t, desc: s } = e;
          return (0, n.jsxs)('div', {
            className: 'grid gap-1',
            'data-sentry-component': 'DropdownMenuItemContent',
            'data-sentry-source-file': 'LogsQueryPanel.tsx',
            children: [
              (0, n.jsx)('div', {
                className: 'font-mono font-bold',
                children: t,
              }),
              s &&
                (0, n.jsx)('div', {
                  className: 'text-foreground-light',
                  children: s,
                }),
            ],
          });
        }
        let U = (e) => {
          let { field: t } = e,
            [s, a] = (0, o.useState)(!1);
          return (0, n.jsxs)(b.Z.tr, {
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'Field',
            'data-sentry-source-file': 'LogsQueryPanel.tsx',
            children: [
              (0, n.jsxs)(b.Z.td, {
                className:
                  'font-mono text-xs !p-2 cursor-pointer text-foreground transition flex items-center space-x-2',
                onClick: () =>
                  (0, N.vQ)(t.path, () => {
                    (a(!0), setTimeout(() => a(!1), 3e3));
                  }),
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'LogsQueryPanel.tsx',
                children: [
                  (0, n.jsx)('span', { children: t.path }),
                  s
                    ? (0, n.jsxs)(O.u, {
                        children: [
                          (0, n.jsx)(O.aJ, {
                            children: (0, n.jsx)(E.Z, {
                              size: 14,
                              strokeWidth: 3,
                              className: 'text-brand',
                            }),
                          }),
                          (0, n.jsx)(O._v, {
                            side: 'bottom',
                            children: 'Copied',
                          }),
                        ],
                      })
                    : (0, n.jsxs)(O.u, {
                        children: [
                          (0, n.jsx)(O.aJ, {
                            children: (0, n.jsx)(k.Z, {
                              size: 14,
                              strokeWidth: 1.5,
                            }),
                          }),
                          (0, n.jsx)(O._v, {
                            side: 'bottom',
                            children: 'Copy value',
                          }),
                        ],
                      }),
                ],
              }),
              (0, n.jsx)(b.Z.td, {
                className: 'font-mono text-xs !p-2',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'LogsQueryPanel.tsx',
                children: t.type,
              }),
            ],
          });
        };
        var D = (e) => {
            let {
                templates: t = [],
                warehouseTemplates: s = [],
                defaultFrom: a,
                defaultTo: r,
                warnings: l,
                warehouseCollections: i,
                dataSource: c,
                onSelectTemplate: u,
                onSelectWarehouseTemplate: m,
                onSelectSource: p,
                onDateChange: h,
                onDataSourceChange: f,
              } = e,
              [g, j] = (0, o.useState)(!1),
              {
                projectAuthAll: N,
                projectStorageAll: E,
                projectEdgeFunctionAll: k,
              } = (0, _.N)([
                'project_auth:all',
                'project_storage:all',
                'project_edge_function:all',
              ]),
              O = (0, w.P)('warehouse'),
              D = Object.entries(y.U_)
                .filter((e) => {
                  let [t] = e;
                  return 'AUTH' === t
                    ? N
                    : 'STORAGE' === t
                      ? E
                      : 'FN_EDGE' === t
                        ? k
                        : 'PG_CRON' !== t && 'WAREHOUSE' !== t;
                })
                .map((e) => {
                  let [, t] = e;
                  return t;
                });
            return (0, n.jsx)('div', {
              className: 'border-b bg-surface-100',
              'data-sentry-component': 'LogsQueryPanel',
              'data-sentry-source-file': 'LogsQueryPanel.tsx',
              children: (0, n.jsx)('div', {
                className:
                  'flex w-full items-center justify-between px-4 md:px-5 py-2 overflow-x-scroll no-scrollbar',
                children: (0, n.jsxs)('div', {
                  className:
                    'flex w-full flex-row items-center justify-between gap-x-4',
                  children: [
                    (0, n.jsxs)('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        O &&
                          (0, n.jsxs)(T.h_, {
                            children: [
                              (0, n.jsx)(T.$F, {
                                asChild: !0,
                                children: (0, n.jsxs)(x.z, {
                                  type: 'default',
                                  iconRight: (0, n.jsx)(S.Z, {}),
                                  children: [
                                    'Data source',
                                    ' ',
                                    (0, n.jsx)('span', {
                                      className: 'ml-2 font-mono opacity-50',
                                      children:
                                        'warehouse' === c
                                          ? 'collections'
                                          : 'logs',
                                    }),
                                  ],
                                }),
                              }),
                              (0, n.jsxs)(T.AW, {
                                side: 'bottom',
                                align: 'start',
                                children: [
                                  (0, n.jsx)(T.Xi, {
                                    onClick: () => f('logs'),
                                    children: (0, n.jsx)(Q, {
                                      name: 'Logs',
                                      desc: 'Logs for all Supabase products',
                                    }),
                                  }),
                                  (0, n.jsx)(T.Xi, {
                                    onClick: () => f('warehouse'),
                                    children: (0, n.jsx)(Q, {
                                      name: (0, n.jsxs)('span', {
                                        children: [
                                          'Collections ',
                                          (0, n.jsx)(L.C, {
                                            variant: 'warning',
                                            children: 'NEW',
                                          }),
                                        ],
                                      }),
                                      desc: 'Query your collections',
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        'warehouse' === c &&
                          (0, n.jsxs)(T.h_, {
                            children: [
                              (0, n.jsx)(T.$F, {
                                asChild: !0,
                                children: (0, n.jsx)(x.z, {
                                  type: 'default',
                                  iconRight: (0, n.jsx)(S.Z, {}),
                                  children: 'Templates',
                                }),
                              }),
                              (0, n.jsxs)(T.AW, {
                                className: 'max-h-96 overflow-auto',
                                side: 'bottom',
                                align: 'start',
                                children: [
                                  s.map((e) =>
                                    (0, n.jsx)(
                                      T.Xi,
                                      {
                                        onClick: () => m(e),
                                        children: (0, n.jsx)(Q, {
                                          name: e.name,
                                          desc: e.description,
                                        }),
                                      },
                                      e.name
                                    )
                                  ),
                                  0 === i.length &&
                                    (0, n.jsx)(T.Xi, {
                                      className:
                                        'bg-transparent cursor-default',
                                      children: (0, n.jsx)(Q, {
                                        name: 'No collections found',
                                        desc: 'You can create collections in the left sidebar.',
                                      }),
                                    }),
                                ],
                              }),
                            ],
                          }),
                        'logs' === c &&
                          (0, n.jsxs)(T.h_, {
                            children: [
                              (0, n.jsx)(T.$F, {
                                asChild: !0,
                                children: (0, n.jsx)(x.z, {
                                  type: 'default',
                                  iconRight: (0, n.jsx)(S.Z, {}),
                                  children: 'Insert source',
                                }),
                              }),
                              (0, n.jsx)(T.AW, {
                                side: 'bottom',
                                align: 'start',
                                className: 'max-h-[70vh] overflow-auto',
                                children:
                                  'logs' === c &&
                                  D.sort((e, t) => e.localeCompare(t)).map(
                                    (e) =>
                                      (0, n.jsx)(
                                        T.Xi,
                                        {
                                          onClick: () => p(e),
                                          children: (0, n.jsx)(Q, {
                                            name: e,
                                            desc: y.tZ[e],
                                          }),
                                        },
                                        e
                                      )
                                  ),
                              }),
                            ],
                          }),
                        'logs' === c &&
                          d.Qy &&
                          (0, n.jsxs)(T.h_, {
                            children: [
                              (0, n.jsx)(T.$F, {
                                asChild: !0,
                                children: (0, n.jsx)(x.z, {
                                  type: 'default',
                                  iconRight: (0, n.jsx)(S.Z, {}),
                                  children: 'Templates',
                                }),
                              }),
                              (0, n.jsx)(T.AW, {
                                side: 'bottom',
                                align: 'start',
                                children: t
                                  .sort((e, t) =>
                                    e.label.localeCompare(t.label)
                                  )
                                  .map((e) =>
                                    (0, n.jsx)(
                                      T.Xi,
                                      {
                                        onClick: () => u(e),
                                        children: (0, n.jsx)('p', {
                                          children: e.label,
                                        }),
                                      },
                                      e.label
                                    )
                                  ),
                              }),
                            ],
                          }),
                        'logs' === c &&
                          (0, n.jsx)(F.Z, {
                            to: r,
                            from: a,
                            onChange: h,
                            helpers: y.up,
                          }),
                        (0, n.jsx)('div', {
                          className: 'overflow-hidden',
                          children: (0, n.jsx)('div', {
                            className: ' transition-all duration-300 '.concat(
                              l.length > 0
                                ? 'opacity-100'
                                : 'invisible h-0 w-0 opacity-0'
                            ),
                            children: (0, n.jsx)(R.Z, {
                              overlay: (0, n.jsx)(z.b, {
                                variant: 'warning',
                                title: '',
                                children: (0, n.jsx)('div', {
                                  className: 'flex flex-col gap-3',
                                  children: l.map((e, t) =>
                                    (0, n.jsxs)(
                                      'p',
                                      {
                                        children: [
                                          e.text,
                                          ' ',
                                          e.link &&
                                            (0, n.jsx)(v(), {
                                              href: e.link,
                                              children: e.linkText || 'View',
                                            }),
                                        ],
                                      },
                                      t
                                    )
                                  ),
                                }),
                              }),
                              'data-sentry-element': 'Popover',
                              'data-sentry-source-file': 'LogsQueryPanel.tsx',
                              children: (0, n.jsxs)(L.C, {
                                variant: 'warning',
                                'data-sentry-element': 'Badge',
                                'data-sentry-source-file': 'LogsQueryPanel.tsx',
                                children: [
                                  l.length,
                                  ' ',
                                  l.length > 1 ? 'warnings' : 'warning',
                                ],
                              }),
                            }),
                          }),
                        }),
                      ],
                    }),
                    'logs' === c &&
                      (0, n.jsxs)(I.ZP, {
                        size: 'large',
                        header: (0, n.jsxs)('div', {
                          className:
                            'flex flex-row justify-between items-center',
                          children: [
                            (0, n.jsx)('h3', { children: 'Field Reference' }),
                            (0, n.jsx)(x.z, {
                              type: 'text',
                              className: 'px-1',
                              onClick: () => j(!1),
                              icon: (0, n.jsx)(C.Z, {}),
                            }),
                          ],
                        }),
                        visible: g,
                        cancelText: 'Close',
                        onCancel: () => j(!1),
                        hideFooter: !0,
                        triggerElement: (0, n.jsx)(x.z, {
                          asChild: !0,
                          type: 'text',
                          onClick: () => j(!0),
                          icon: (0, n.jsx)(q.Z, {}),
                          className: 'px-2',
                          children: (0, n.jsx)('span', {
                            children: 'Field Reference',
                          }),
                        }),
                        children: [
                          (0, n.jsx)(I.ZP.Content, {
                            children: (0, n.jsx)('div', {
                              className: 'pt-4 pb-2 space-y-1',
                              children: (0, n.jsxs)('p', {
                                className: 'text-sm',
                                children: [
                                  'The following table shows all the available paths that can be queried from each respective source. Do note that to access nested keys, you would need to perform the necessary',
                                  ' ',
                                  (0, n.jsxs)(v(), {
                                    href: 'https://supabase.com/docs/guides/platform/logs#unnesting-arrays',
                                    target: '_blank',
                                    rel: 'noreferrer',
                                    className: 'text-brand',
                                    children: [
                                      'unnesting joins',
                                      (0, n.jsx)(P.Z, {
                                        size: '14',
                                        className:
                                          'ml-1 inline -translate-y-[2px]',
                                        strokeWidth: 1.5,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          }),
                          (0, n.jsx)(I.ZP.Separator, {}),
                          (0, n.jsx)(A.Z, {
                            scrollable: !0,
                            size: 'small',
                            type: 'underlined',
                            defaultActiveId: 'edge_logs',
                            listClassNames: 'px-2',
                            children: Z._S.schemas.map((e) =>
                              (0, n.jsx)(
                                A.Z.Panel,
                                {
                                  id: e.reference,
                                  label: e.name,
                                  className: 'px-4 pb-4',
                                  children: (0, n.jsx)(b.Z, {
                                    head: [
                                      (0, n.jsx)(
                                        b.Z.th,
                                        {
                                          className: 'text-xs !p-2',
                                          children: 'Path',
                                        },
                                        'path'
                                      ),
                                      (0, n.jsx)(
                                        b.Z.th,
                                        {
                                          className: 'text-xs !p-2',
                                          children: 'Type',
                                        },
                                        'type'
                                      ),
                                    ],
                                    body: e.fields
                                      .sort((e, t) => e.path - t.path)
                                      .map((e) =>
                                        (0, n.jsx)(U, { field: e }, e.path)
                                      ),
                                  }),
                                },
                                e.reference
                              )
                            ),
                          }),
                        ],
                      }),
                  ],
                }),
              }),
            });
          },
          W = s(93540),
          $ = s(24976),
          X = s(35185),
          M = s(5186),
          G = s(9596),
          H = s(88658),
          J = s(72725),
          V = s(34273),
          B = s(41555),
          Y = s(52521),
          K = s(69951),
          ee = s(18226),
          et = s(75541),
          es = s(38850),
          en = s(37756),
          ea = s(81514),
          er = s(95767);
        let el = d.Qy
            ? 'select\n  cast(timestamp as datetime) as timestamp,\n  event_message, metadata \nfrom edge_logs \nlimit 5'
            : 'select\n  timestamp, event_message, metadata\n  from edge_logs limit 5',
          ei = () => {
            (0, g.Q9)();
            let e = (0, i.useRouter)(),
              { profile: t } = (0, ea.Un)(),
              {
                ref: s,
                q: r,
                ite: d,
                its: j,
                queryId: v,
                source: b,
              } = (0, a.UO)(),
              _ = (0, et.l)(),
              [w, S] = (0, o.useState)((0, N.k$)()),
              [C, q] = (0, o.useState)((0, N.k$)()),
              [P, E] = (0, o.useState)(el),
              [k, Z] = (0, o.useState)(
                '-- Fetch the last 10 logs in the last 7 days \nselect id, timestamp, event_message from `COLLECTION_NAME` \nwhere timestamp > timestamp_sub(current_timestamp(), interval 7 day) \norder by timestamp desc limit 10'
              ),
              [T, L] = (0, o.useState)(!1),
              [R, z] = (0, o.useState)([]),
              [I, A] = (0, o.useState)(b || 'logs'),
              [O, F] = (0, o.useState)(null),
              [Q, U] = (0, f._)(
                'project-content-'.concat(s, '-recent-log-sql'),
                []
              ),
              { data: X } = (0, B.I)({ projectRef: s, type: 'log_sql' }),
              er = null == X ? void 0 : X.content.find((e) => e.id === v),
              { data: ei } = (0, K.Gl)({
                orgSlug: null == _ ? void 0 : _.slug,
              }),
              {
                params: eo,
                logData: ec,
                error: ed,
                isLoading: eu,
                changeQuery: em,
                runQuery: ep,
                setParams: eh,
              } = (0, ee.Z)(
                s,
                {
                  iso_timestamp_start: j || void 0,
                  iso_timestamp_end: d || void 0,
                },
                'logs' === I
              ),
              {
                refetch: ex,
                data: ef,
                isFetching: ey,
                error: eg,
              } = (0, V._)({ ref: s, sql: k }, { enabled: !1 }),
              ej = 'warehouse' === I ? (null == ef ? void 0 : ef.result) : ec,
              ev = eu || ey,
              { data: eb } = (0, J.O)({ projectRef: s }),
              { mutate: e_, isLoading: ew } = (0, Y.R)({
                onError: (e) => {
                  (console.error(e),
                    L(!1),
                    v
                      ? c.Am.error('Failed to update query: '.concat(e.message))
                      : c.Am.error('Failed to save query: '.concat(e.message)));
                },
                onSuccess: (e, t) => {
                  (L(!1),
                    v
                      ? c.Am.success(
                          'Updated "'.concat(t.payload.name, '" log query')
                        )
                      : c.Am.success(
                          'Saved "'.concat(t.payload.name, '" log query')
                        ));
                },
              }),
              eN = (e) => {
                U([
                  ...Q,
                  {
                    schema_version: '1',
                    favorite: !1,
                    sql: '',
                    content_id: '',
                    ...e,
                  },
                ]);
              },
              { showUpgradePrompt: eS, setShowUpgradePrompt: eC } = (0, es._)(
                eo.iso_timestamp_start
              ),
              eq = (t) => {
                (E(t.searchString),
                  em(t.searchString),
                  S((0, N.k$)()),
                  e.push({
                    pathname: e.pathname,
                    query: { ...e.query, q: t.searchString },
                  }),
                  eN({ sql: t.searchString }));
              },
              eP = (t) => {
                let s = ('string' == typeof t && t) || P;
                if ((t && 'string' == typeof t && E(t), 'warehouse' === I)) {
                  if (!(null == eb ? void 0 : eb.length)) {
                    c.Am.error('You do not have any collections yet.');
                    return;
                  }
                  let t = null == eb ? void 0 : eb.map((e) => e.name);
                  if (!(null == t ? void 0 : t.find((e) => k.includes(e)))) {
                    c.Am.error('Please specify a collection name in the query');
                    return;
                  }
                  return Object.values(y.ae).find((e) => k.includes(e))
                    ? c.Am.error('Cannot query logs tables from current query.')
                    : (ex(),
                      e.push({
                        pathname: e.pathname,
                        query: { ...e.query, q: s },
                      }));
                }
                (em(s),
                  ep(),
                  e.push({ pathname: e.pathname, query: { ...e.query, q: s } }),
                  eN({ sql: s }));
              },
              eE = async (n, a) => {
                let { setSubmitting: r } = a;
                if (!s) return console.error('Project ref is required');
                if (!t) return console.error('Profile is required');
                r(!0);
                let l = (0, N.k$)();
                e_(
                  {
                    projectRef: s,
                    payload: {
                      id: l,
                      name: n.name,
                      description: n.description || '',
                      type: 'log_sql',
                      content: {
                        content_id: w,
                        sql: P,
                        schema_version: '1',
                        favorite: !1,
                      },
                      owner_id: t.id,
                      visibility: 'user',
                    },
                  },
                  {
                    onSuccess: () =>
                      e.push(
                        '/project/'
                          .concat(s, '/logs/explorer?queryId=')
                          .concat(l)
                      ),
                  }
                );
              };
            return (
              (0, o.useEffect)(() => {
                eg && c.Am.error(eg.message);
              }, [eg]),
              (0, o.useEffect)(() => {
                r && (eq({ mode: 'custom', searchString: r }), Z(r));
              }, [r]),
              (0, o.useEffect)(() => {
                let e = [],
                  t = eo.iso_timestamp_start
                    ? l()(eo.iso_timestamp_start)
                    : l()(),
                  s = eo.iso_timestamp_end ? l()(eo.iso_timestamp_end) : l()(),
                  n = Math.abs(t.diff(s, 'days'));
                (P &&
                  !P.includes('limit') &&
                  n > y.$K &&
                  e.push({
                    text: 'When querying large date ranges, include a LIMIT clause.',
                  }),
                  z(e));
              }, [P, eo.iso_timestamp_start, eo.iso_timestamp_end]),
              (0, o.useEffect)(() => {
                if (j) {
                  var e;
                  (0, g.dP)(
                    j,
                    null == ei
                      ? void 0
                      : null === (e = ei.plan) || void 0 === e
                        ? void 0
                        : e.id
                  ) && eC(!eS);
                }
              }, [j, ei]),
              (0, n.jsxs)('div', {
                className: 'w-full h-full mx-auto',
                'data-sentry-component': 'LogsExplorerPage',
                'data-sentry-source-file': 'index.tsx',
                children: [
                  (0, n.jsxs)(u.pO, {
                    className: 'w-full h-full max-h-screen',
                    direction: 'vertical',
                    autoSaveId: en.dA.LOG_EXPLORER_SPLIT_SIZE,
                    'data-sentry-element': 'ResizablePanelGroup',
                    'data-sentry-source-file': 'index.tsx',
                    children: [
                      (0, n.jsxs)(u.ee, {
                        collapsible: !0,
                        minSize: 5,
                        'data-sentry-element': 'ResizablePanel',
                        'data-sentry-source-file': 'index.tsx',
                        children: [
                          (0, n.jsx)(D, {
                            defaultFrom: eo.iso_timestamp_start || '',
                            defaultTo: eo.iso_timestamp_end || '',
                            onDateChange: (t) => {
                              var s;
                              let { to: n, from: a } = t;
                              (0, g.dP)(
                                a,
                                null == ei
                                  ? void 0
                                  : null === (s = ei.plan) || void 0 === s
                                    ? void 0
                                    : s.id
                              )
                                ? eC(!eS)
                                : (eh((e) => ({
                                    ...e,
                                    iso_timestamp_start: a || '',
                                    iso_timestamp_end: n || '',
                                  })),
                                  e.push({
                                    pathname: e.pathname,
                                    query: {
                                      ...e.query,
                                      its: a || '',
                                      ite: n || '',
                                    },
                                  }));
                            },
                            onSelectSource: (e) => {
                              if ('warehouse' === I) return q((0, N.k$)());
                              (E((t) => {
                                let s = t.indexOf('from');
                                return -1 === s
                                  ? ''.concat(t).concat(e)
                                  : ''
                                      .concat(t.substring(0, s + 4), ' ')
                                      .concat(e, ' ')
                                      .concat(t.substring(s + 5));
                              }),
                                S((0, N.k$)()));
                            },
                            templates: y.xN.filter((e) => 'custom' === e.mode),
                            warehouseCollections: eb || [],
                            onSelectTemplate: eq,
                            warehouseTemplates: (eb || []).flatMap((e) => [
                              {
                                query:
                                  'select count(*) as event_count from `'.concat(
                                    e.name,
                                    '`\nwhere timestamp > timestamp_sub(current_timestamp(), interval 1 day)'
                                  ),
                                name: ''.concat(e.name, ' - Daily Event Count'),
                                description:
                                  'Count events in the last 24 hours from '.concat(
                                    e.name,
                                    ' collection'
                                  ),
                              },
                              {
                                query:
                                  'select id, timestamp, event_message from `'.concat(
                                    e.name,
                                    "`\n        where timestamp > timestamp_sub(current_timestamp(), interval 1 day) \n        and event_message like '%YOUR_TEXT_HERE%'\n        order by timestamp desc limit 10"
                                  ),
                                name: ''.concat(e.name, ' - Filter by text'),
                                description:
                                  'Select last 10 events from '.concat(
                                    e.name,
                                    ' collection'
                                  ),
                              },
                            ]),
                            onSelectWarehouseTemplate: (e) => {
                              (Z(e.query), q((0, N.k$)()));
                            },
                            warnings: R,
                            dataSource: I,
                            onDataSourceChange: (t) => {
                              (A(t),
                                e.push({
                                  pathname: e.pathname,
                                  query: { ...e.query, source: t },
                                }));
                            },
                            'data-sentry-element': 'LogsQueryPanel',
                            'data-sentry-source-file': 'index.tsx',
                          }),
                          (0, n.jsx)(H.Z, {
                            active: ev,
                            'data-sentry-element': 'ShimmerLine',
                            'data-sentry-source-file': 'index.tsx',
                          }),
                          'warehouse' === I
                            ? (0, n.jsx)(M.Z, {
                                id: C,
                                language: 'pgsql',
                                defaultValue: k,
                                onInputChange: (e) => Z(e || ''),
                                actions: {
                                  runQuery: { enabled: !0, callback: eP },
                                },
                              })
                            : (0, n.jsx)(M.Z, {
                                id: w,
                                language: 'pgsql',
                                defaultValue: P,
                                onInputChange: (e) => E(e || ''),
                                actions: {
                                  runQuery: { enabled: !0, callback: eP },
                                },
                              }),
                        ],
                      }),
                      (0, n.jsx)(u.Dp, {
                        withHandle: !0,
                        'data-sentry-element': 'ResizableHandle',
                        'data-sentry-source-file': 'index.tsx',
                      }),
                      (0, n.jsx)(u.ee, {
                        collapsible: !0,
                        minSize: 5,
                        className: 'overflow-auto',
                        'data-sentry-element': 'ResizablePanel',
                        'data-sentry-source-file': 'index.tsx',
                        children: (0, n.jsxs)(G.Z, {
                          active: ev,
                          'data-sentry-element': 'LoadingOpacity',
                          'data-sentry-source-file': 'index.tsx',
                          children: [
                            (0, n.jsx)(W.Z, {
                              isSaving: ew,
                              showHistogramToggle: !1,
                              onRun: eP,
                              onSave: function () {
                                if (!s)
                                  return console.error(
                                    'Project ref is required'
                                  );
                                if (v && er) {
                                  e_({
                                    projectRef: s,
                                    payload: {
                                      ...er,
                                      content: { ...er.content, sql: P },
                                    },
                                  });
                                  return;
                                }
                                L(!T);
                              },
                              hasEditorValue: !!P,
                              data: ej,
                              error: ed,
                              projectRef: s,
                              onSelectedLogChange: F,
                              selectedLog: O,
                              'data-sentry-element': 'LogTable',
                              'data-sentry-source-file': 'index.tsx',
                            }),
                            (0, n.jsx)('div', {
                              className: 'flex flex-row justify-end mt-2',
                              children: (0, n.jsx)($.Z, {
                                show: eS,
                                setShowUpgradePrompt: eC,
                                'data-sentry-element': 'UpgradePrompt',
                                'data-sentry-source-file': 'index.tsx',
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, n.jsx)(m.Z, {
                    size: 'medium',
                    onCancel: () => L(!T),
                    header: 'Save log query',
                    visible: T,
                    hideFooter: !0,
                    'data-sentry-element': 'Modal',
                    'data-sentry-source-file': 'index.tsx',
                    children: (0, n.jsx)(p.Z, {
                      initialValues: { name: '', desdcription: '' },
                      onSubmit: eE,
                      'data-sentry-element': 'Form',
                      'data-sentry-source-file': 'index.tsx',
                      children: () =>
                        (0, n.jsxs)(n.Fragment, {
                          children: [
                            (0, n.jsxs)(m.Z.Content, {
                              className: 'space-y-6',
                              children: [
                                (0, n.jsx)(h.Z, {
                                  layout: 'horizontal',
                                  label: 'Name',
                                  id: 'name',
                                }),
                                (0, n.jsx)('div', {
                                  className: 'text-area-text-sm',
                                  children: (0, n.jsx)(h.Z.TextArea, {
                                    layout: 'horizontal',
                                    labelOptional: 'Optional',
                                    label: 'Description',
                                    id: 'description',
                                    rows: 2,
                                  }),
                                }),
                              ],
                            }),
                            (0, n.jsx)(m.Z.Separator, {}),
                            (0, n.jsxs)(m.Z.Content, {
                              className: 'flex items-center justify-end gap-2',
                              children: [
                                (0, n.jsx)(x.z, {
                                  size: 'tiny',
                                  type: 'default',
                                  onClick: () => L(!T),
                                  children: 'Cancel',
                                }),
                                (0, n.jsx)(x.z, {
                                  size: 'tiny',
                                  loading: ew,
                                  disabled: ew,
                                  htmlType: 'submit',
                                  children: 'Save',
                                }),
                              ],
                            }),
                          ],
                        }),
                    }),
                  }),
                ],
              })
            );
          };
        ei.getLayout = (e) =>
          (0, n.jsx)(er.Z, { children: (0, n.jsx)(X.Z, { children: e }) });
        var eo = ei;
      },
      95526: function (e, t, s) {
        'use strict';
        var n = s(97458),
          a = s(77317),
          r = s(52983),
          l = s(25843);
        let i = (e) => {
          var t, s, i;
          let {
              defaultActiveId: o,
              activeId: c,
              type: d = 'pills',
              size: u = 'tiny',
              block: m,
              onChange: p,
              onClick: h,
              scrollable: x,
              wrappable: f,
              addOnBefore: y,
              addOnAfter: g,
              listClassNames: j,
              baseClassNames: v,
              refs: b,
              children: _,
            } = e,
            w = r.Children.toArray(_),
            [N, S] = (0, r.useState)(
              null !== (i = null != c ? c : o) && void 0 !== i
                ? i
                : null == w
                  ? void 0
                  : null === (s = w[0]) || void 0 === s
                    ? void 0
                    : null === (t = s.props) || void 0 === t
                      ? void 0
                      : t.id
            );
          (0, r.useMemo)(() => {
            c && c !== N && S(c);
          }, [c]);
          let C = (0, l.Z)('tabs');
          function q(e) {
            (null == h || h(e), e !== N && (null == p || p(e), S(e)));
          }
          let P = [C[d].list];
          return (
            x && P.push(C.scrollable),
            f && P.push(C.wrappable),
            j && P.push(j),
            (0, n.jsxs)(a.fC, {
              value: N,
              className: [C.base, v].join(' '),
              ref: null == b ? void 0 : b.base,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'Tabs',
              'data-sentry-source-file': 'Tabs.tsx',
              children: [
                (0, n.jsxs)(a.aV, {
                  className: P.join(' '),
                  ref: null == b ? void 0 : b.list,
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'Tabs.tsx',
                  children: [
                    y,
                    w.map((e) => {
                      let t = N === e.props.id,
                        s = [C[d].base, C.size[u]];
                      return (
                        t ? s.push(C[d].active) : s.push(C[d].inactive),
                        m && s.push(C.block),
                        (0, n.jsxs)(
                          a.xz,
                          {
                            onKeyDown: (t) => {
                              'Enter' === t.key &&
                                (t.preventDefault(), q(e.props.id));
                            },
                            onClick: () => q(e.props.id),
                            value: e.props.id,
                            className: s.join(' '),
                            children: [
                              e.props.icon,
                              (0, n.jsx)('span', { children: e.props.label }),
                              e.props.iconRight,
                            ],
                          },
                          ''.concat(e.props.id, '-tab-button')
                        )
                      );
                    }),
                    g,
                  ],
                }),
                w,
              ],
            })
          );
        };
        ((i.Panel = (e) => {
          let { children: t, id: s, className: r } = e,
            i = (0, l.Z)('tabs');
          return (0, n.jsx)(a.VY, {
            value: s,
            className: [i.content, r].join(' '),
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'Panel',
            'data-sentry-source-file': 'Tabs.tsx',
            children: t,
          });
        }),
          (t.Z = i));
      },
      23382: function (e, t, s) {
        'use strict';
        s.d(t, {
          Nr: function () {
            return r;
          },
          _: function () {
            return u;
          },
        });
        var n = s(52983);
        function a(e, t) {
          window.dispatchEvent(
            new StorageEvent('storage', { key: e, newValue: t })
          );
        }
        function r(e, t) {
          let [s, a] = n.useState(e);
          return (
            n.useEffect(() => {
              let s = setTimeout(() => {
                a(e);
              }, t);
              return () => {
                clearTimeout(s);
              };
            }, [e, t]),
            s
          );
        }
        let l = (e, t) => {
            let s = JSON.stringify(t);
            (window.localStorage.setItem(e, s), a(e, s));
          },
          i = (e) => {
            (window.localStorage.removeItem(e), a(e, null));
          },
          o = (e) => window.localStorage.getItem(e),
          c = (e) => (
            window.addEventListener('storage', e),
            () => window.removeEventListener('storage', e)
          ),
          d = () => {
            throw Error('useLocalStorage is a client-only hook');
          };
        function u(e, t) {
          let s = n.useSyncExternalStore(c, () => o(e), d),
            a = n.useCallback(
              (t) => {
                try {
                  let n = 'function' == typeof t ? t(JSON.parse(s)) : t;
                  null == n ? i(e) : l(e, n);
                } catch (e) {
                  console.warn(e);
                }
              },
              [e, s]
            );
          return (
            n.useEffect(() => {
              null === o(e) && void 0 !== t && l(e, t);
            }, [e, t]),
            [s ? JSON.parse(s) : t, a]
          );
        }
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          182, 2549, 1379, 272, 3861, 2728, 245, 5767, 876, 5185, 6457, 9774,
          2888, 179,
        ],
        function () {
          return e((e.s = 20912));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
