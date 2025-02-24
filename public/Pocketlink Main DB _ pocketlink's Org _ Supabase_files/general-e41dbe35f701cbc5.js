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
      (e._sentryDebugIds[t] = '042b320c-a6dd-4bc8-a37d-1e49a162fc9f'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-042b320c-a6dd-4bc8-a37d-1e49a162fc9f'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2281],
    {
      62923: function (e, t, s) {
        var r = s(22825);
        e.exports = function (e) {
          return (null == e ? 0 : e.length) ? r(e, 1) : [];
        };
      },
      11177: function (e, t, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/settings/general',
          function () {
            return s(84114);
          },
        ]);
      },
      67628: function (e, t, s) {
        'use strict';
        s.d(t, {
          Q: function () {
            return o;
          },
        });
        var r = s(97458),
          n = s(94059),
          a = s(73565),
          i = s(55228),
          o = (e) => {
            let { page: t, menu: s } = e;
            return (0, r.jsx)('div', {
              className: 'flex flex-col space-y-8 overflow-y-auto',
              'data-sentry-component': 'ProductMenu',
              'data-sentry-source-file': 'ProductMenu.tsx',
              children: (0, r.jsx)(n.ZP, {
                type: 'pills',
                'data-sentry-element': 'Menu',
                'data-sentry-source-file': 'ProductMenu.tsx',
                children: s.map((e, o) =>
                  (0, r.jsxs)(
                    'div',
                    {
                      children: [
                        (0, r.jsx)('div', {
                          className: 'my-6 space-y-8',
                          children: (0, r.jsxs)('div', {
                            className: 'mx-3',
                            children: [
                              (0, r.jsx)(n.ZP.Group, {
                                title: e.title
                                  ? (0, r.jsxs)('div', {
                                      className:
                                        'flex flex-col space-y-2 uppercase font-mono',
                                      children: [
                                        (0, r.jsx)('span', {
                                          children: e.title,
                                        }),
                                        e.isPreview &&
                                          (0, r.jsx)(a.C, {
                                            variant: 'warning',
                                            children: 'Not production ready',
                                          }),
                                      ],
                                    })
                                  : null,
                              }),
                              (0, r.jsx)('div', {
                                children: e.items.map((e) => {
                                  let s = e.pages
                                    ? e.pages.includes(null != t ? t : '')
                                    : t === e.key;
                                  return (0, r.jsx)(
                                    i.Z,
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
                        o !== s.length - 1 &&
                          (0, r.jsx)('div', {
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
      12329: function (e, t, s) {
        'use strict';
        s.d(t, {
          s: function () {
            return o;
          },
        });
        var r = s(28894),
          n = s(6464),
          a = s(94315);
        async function i(e, t) {
          let { installationId: s } = e;
          if (!s) throw Error('installationId is required');
          let { data: r, error: a } = await (0, n.U2)(
            '/platform/vercel/redirect/{installation_id}',
            { params: { path: { installation_id: s } }, signal: t }
          );
          return (a && (0, n.S3)(a), r);
        }
        let o = function (e) {
          let { installationId: t } = e,
            { enabled: s = !0, ...n } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, r.a)(
            a.F.vercelRedirect(t),
            (e) => {
              let { signal: s } = e;
              return i({ installationId: t }, s);
            },
            { enabled: s && void 0 !== t, ...n }
          );
        };
      },
      30588: function (e, t, s) {
        'use strict';
        s.d(t, {
          D: function () {
            return o;
          },
        });
        var r = s(64618),
          n = s(34549),
          a = s(6464);
        async function i(e) {
          let { ref: t, identifier: s } = e,
            r = {};
          void 0 !== s && (r.database_identifier = s);
          let { data: n, error: i } = await (0, a.v_)(
            '/platform/projects/{ref}/restart',
            { params: { path: { ref: t } }, body: r }
          );
          return (i && (0, a.S3)(i), n);
        }
        let o = function () {
          let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, r.D)((e) => i(e), {
            async onSuccess(t, s, r) {
              await (null == e ? void 0 : e(t, s, r));
            },
            async onError(e, s, r) {
              void 0 === t
                ? n.Am.error('Failed to restart project: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
      },
      13510: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, s(98266).Z)('ArrowUpRight', [
          ['path', { d: 'M7 7h10v10', key: '1tivn9' }],
          ['path', { d: 'M7 17 17 7', key: '1vkiza' }],
        ]);
      },
      5211: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, s(98266).Z)('RefreshCw', [
          [
            'path',
            {
              d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
              key: 'v9h5vc',
            },
          ],
          ['path', { d: 'M21 3v5h-5', key: '1q7to0' }],
          [
            'path',
            {
              d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
              key: '3uifl3',
            },
          ],
          ['path', { d: 'M8 16H3v5', key: '1cv678' }],
        ]);
      },
      29285: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, s(98266).Z)('Users', [
          [
            'path',
            { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' },
          ],
          ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
          ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
          ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
        ]);
      },
      19697: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return j;
          },
        });
        var r = s(97458),
          n = s(32691),
          a = s(52983),
          i = s(12436),
          o = s(67628),
          l = s(71147),
          c = s(75541),
          d = s(62432),
          u = s(58326),
          m = s(21786),
          f = s(37756),
          x = s(60245),
          p = s(13510);
        let h = (e, t, s, n) => {
          var a, i, o, l;
          let c = (null == t ? void 0 : t.status) === f.S.COMING_UP,
            d = '/project/'.concat(e),
            u = null === (a = null == n ? void 0 : n.auth) || void 0 === a || a,
            m =
              null === (i = null == n ? void 0 : n.edgeFunctions) ||
              void 0 === i ||
              i,
            x =
              null === (o = null == n ? void 0 : n.storage) ||
              void 0 === o ||
              o,
            h =
              null !== (l = null == n ? void 0 : n.diskAndCompute) &&
              void 0 !== l &&
              l;
          return [
            {
              title: 'Project Settings',
              items: [
                {
                  name: 'General',
                  key: 'general',
                  url: '/project/'.concat(e, '/settings/general'),
                  items: [],
                },
                ...(f.Qy && h
                  ? [
                      {
                        name: 'Compute and Disk',
                        key: 'compute-and-disk',
                        url: '/project/'.concat(
                          e,
                          '/settings/compute-and-disk'
                        ),
                        items: [],
                      },
                    ]
                  : []),
                {
                  name: 'Infrastructure',
                  key: 'infrastructure',
                  url: c
                    ? d
                    : '/project/'.concat(e, '/settings/infrastructure'),
                  items: [],
                },
                ...(f.Qy
                  ? [
                      {
                        name: 'Integrations',
                        key: 'integrations',
                        url: '/project/'.concat(e, '/settings/integrations'),
                        items: [],
                      },
                      ...((null == n ? void 0 : n.newApiKeys)
                        ? [
                            {
                              name: 'API Keys',
                              key: 'api-keys',
                              url: '/project/'.concat(e, '/settings/api-keys'),
                              items: [],
                              label: 'NEW',
                            },
                          ]
                        : []),
                    ]
                  : []),
                {
                  name: 'Add Ons',
                  key: 'addons',
                  url: '/project/'.concat(e, '/settings/addons'),
                  items: [],
                },
                {
                  name: 'Vault',
                  key: 'vault',
                  url: c
                    ? d
                    : '/project/'.concat(e, '/integrations/vault/overview'),
                  items: [],
                  rightIcon: (0, r.jsx)(p.Z, {
                    strokeWidth: 1,
                    className: 'h-4 w-4',
                  }),
                  label: 'Alpha',
                },
              ],
            },
            {
              title: 'Configuration',
              items: [
                {
                  name: 'Database',
                  key: 'database',
                  url: c ? d : '/project/'.concat(e, '/settings/database'),
                  items: [],
                },
                {
                  name: 'Data API',
                  key: 'api',
                  url: c ? d : '/project/'.concat(e, '/settings/api'),
                  items: [],
                },
                ...(f.Qy && u
                  ? [
                      {
                        name: 'Authentication',
                        key: 'auth',
                        url: c ? d : '/project/'.concat(e, '/settings/auth'),
                        items: [],
                      },
                    ]
                  : []),
                ...(f.Qy && x
                  ? [
                      {
                        name: 'Storage',
                        key: 'storage',
                        url: '/project/'.concat(e, '/settings/storage'),
                        items: [],
                      },
                    ]
                  : []),
                ...(f.Qy && m
                  ? [
                      {
                        name: 'Edge Functions',
                        key: 'functions',
                        url: '/project/'.concat(e, '/settings/functions'),
                        items: [],
                      },
                    ]
                  : []),
                ...(f.Qy
                  ? [
                      {
                        name: 'Log Drains',
                        key: 'log-drains',
                        url: '/project/'.concat(e, '/settings/log-drains'),
                        items: [],
                      },
                    ]
                  : []),
              ],
            },
            {
              title: 'Billing',
              items: [
                {
                  name: 'Subscription',
                  key: 'subscription',
                  url: '/org/'.concat(null == s ? void 0 : s.slug, '/billing'),
                  items: [],
                },
                {
                  name: 'Usage',
                  key: 'usage',
                  url: '/org/'
                    .concat(null == s ? void 0 : s.slug, '/usage?projectRef=')
                    .concat(e),
                  items: [],
                },
              ],
            },
          ];
        };
        var j = (0, u.Q)((e) => {
          let { title: t, children: s } = e,
            u = (0, n.useRouter)(),
            { ref: p } = (0, i.UO)(),
            j = (0, d.Vm)(),
            y = (0, c.l)();
          (0, a.useEffect)(() => {
            f.Qy || u.push('/project/default');
          }, [u]);
          let v = u.pathname.includes('billing')
              ? u.pathname.split('/')[5]
              : u.pathname.split('/')[4],
            {
              projectAuthAll: g,
              projectEdgeFunctionAll: b,
              projectStorageAll: N,
              billingInvoices: w,
            } = (0, l.N)([
              'project_auth:all',
              'project_edge_function:all',
              'project_storage:all',
              'billing:invoices',
            ]),
            C = h(p, j, y, {
              auth: g,
              edgeFunctions: b,
              storage: N,
              invoices: w,
              diskAndCompute: (0, m.P)('diskAndComputeForm'),
              newApiKeys: (0, m.P)('newApiKeys'),
            });
          return (0, r.jsx)(x.Z, {
            isBlocking: !1,
            title: t || 'Settings',
            product: 'Settings',
            productMenu: (0, r.jsx)(o.Q, { page: v, menu: C }),
            'data-sentry-element': 'ProjectLayout',
            'data-sentry-component': 'SettingsLayout',
            'data-sentry-source-file': 'SettingsLayout.tsx',
            children: s,
          });
        });
      },
      78066: function (e, t, s) {
        'use strict';
        s.d(t, {
          CG: function () {
            return p;
          },
          FW: function () {
            return u;
          },
          I7: function () {
            return f;
          },
          Lc: function () {
            return j;
          },
          Wv: function () {
            return v;
          },
          _S: function () {
            return m;
          },
          g$: function () {
            return h;
          },
          gW: function () {
            return b;
          },
          jX: function () {
            return x;
          },
          q7: function () {
            return d;
          },
          s_: function () {
            return l;
          },
          tM: function () {
            return y;
          },
          tU: function () {
            return c;
          },
          ur: function () {
            return g;
          },
          y: function () {
            return o;
          },
        });
        var r = s(97458),
          n = s(52983),
          a = s(86186),
          i = s(65092);
        let o = 'mx-auto w-full max-w-[1200px]',
          l = 'px-4 md:px-6 lg:px-14 xl:px-24 2xl:px-28',
          c = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('header', {
              ...n,
              ref: t,
              className: (0, i.cn)('w-full', 'flex-col gap-3 py-6', s),
            });
          }),
          d = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('h1', {
              ref: t,
              ...n,
              className: (0, i.cn)('text-2xl', s),
            });
          }),
          u = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('span', {
              ref: t,
              ...n,
              className: (0, i.cn)('text-sm text-foreground-light', s),
            });
          }),
          m = n.forwardRef((e, t) => {
            let { className: s, bottomPadding: n, ...c } = e,
              { aiAssistantPanel: d } = (0, a.WZ)(),
              { open: u } = d;
            return (0, r.jsx)('div', {
              ref: t,
              ...c,
              className: (0, i.cn)(o, l, n && 'pb-16', u ? 'xl:px-6' : '', s),
            });
          }),
          f = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)('w-full h-px bg-border', s),
            });
          }),
          x = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)(
                'flex flex-col gap-3 py-6',
                'lg:grid md:grid-cols-12 lg:py-12',
                s
              ),
            });
          }),
          p = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)('flex flex-col gap-3', 'min-w-[420px]', s),
            });
          }),
          h = n.forwardRef((e, t) => {
            let { className: s, children: n, title: a, ...o } = e;
            return (0, r.jsxs)('div', {
              ref: t,
              ...o,
              className: (0, i.cn)('col-span-4 xl:col-span-5 prose text-sm', s),
              children: [a && (0, r.jsx)('h2', { children: a }), n],
            });
          }),
          j = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)(
                'col-span-8 xl:col-span-7',
                'flex flex-col gap-6',
                s
              ),
            });
          }),
          y = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)('flex flex-col gap-3 items-center', s),
            });
          }),
          v = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)('flex w-full items-center', s),
            });
          }),
          g = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)('flex flex-row gap-3', s),
            });
          }),
          b = n.forwardRef((e, t) => {
            let { className: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, i.cn)(o, l, 'my-8 flex flex-col gap-8', s),
            });
          });
        ((c.displayName = 'ScaffoldHeader'),
          (d.displayName = 'ScaffoldTitle'),
          (u.displayName = 'ScaffoldDescription'),
          (m.displayName = 'ScaffoldContainer'),
          (f.displayName = 'ScaffoldDivider'),
          (x.displayName = 'ScaffoldSection'),
          (p.displayName = 'ScaffoldColumn'),
          (h.displayName = 'ScaffoldSectionDetail'),
          (j.displayName = 'ScaffoldSectionContent'),
          (y.displayName = 'ScaffoldFilterAndContent'),
          (v.displayName = 'ScaffoldActionsContainer'),
          (g.displayName = 'ScaffoldActionsGroup'),
          (b.displayName = 'ScaffoldContainerLegacy'));
      },
      59461: function (e, t, s) {
        'use strict';
        s.d(t, {
          i: function () {
            return a;
          },
        });
        var r = s(97458),
          n = s(90839);
        let a = (e) => {
          let {
              form: t,
              hasChanges: s,
              handleReset: a,
              helper: i,
              disabled: o = !1,
              isSubmitting: l,
              submitText: c = 'Save',
            } = e,
            d = l || o || (!s && void 0 !== s);
          return (0, r.jsxs)('div', {
            className: [
              'flex w-full items-center gap-2',
              i ? 'justify-between' : 'justify-end',
            ].join(' '),
            'data-sentry-component': 'FormActions',
            'data-sentry-source-file': 'FormActions.tsx',
            children: [
              i &&
                (0, r.jsx)('span', {
                  className: 'text-sm text-foreground-lighter',
                  children: i,
                }),
              (0, r.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  (0, r.jsx)(n.z, {
                    disabled: d,
                    type: 'default',
                    htmlType: 'reset',
                    onClick: () => a(),
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'FormActions.tsx',
                    children: 'Cancel',
                  }),
                  (0, r.jsx)(n.z, {
                    form: t,
                    type: 'primary',
                    htmlType: 'submit',
                    disabled: d,
                    loading: l,
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'FormActions.tsx',
                    children: c,
                  }),
                ],
              }),
            ],
          });
        };
      },
      24083: function (e, t, s) {
        'use strict';
        s.d(t, {
          p: function () {
            return i;
          },
        });
        var r = s(97458),
          n = s(65092),
          a = s(67096);
        let i = (e) => {
          let {
            title: t,
            description: s,
            docsUrl: i,
            actions: o,
            className: l,
          } = e;
          return (0, r.jsxs)('div', {
            className: (0, n.cn)(
              'w-full mb-6 flex flex-col sm:flex-row md:items-center justify-between gap-4 '.concat(
                l
              )
            ),
            'data-sentry-component': 'FormHeader',
            'data-sentry-source-file': 'FormHeader.tsx',
            children: [
              (0, r.jsxs)('div', {
                className: 'space-y-1',
                children: [
                  (0, r.jsx)('h3', {
                    className: 'text-foreground text-xl prose',
                    children: t,
                  }),
                  s &&
                    (0, r.jsx)('div', {
                      className: 'prose text-sm max-w-full',
                      children: s,
                    }),
                ],
              }),
              (0, r.jsxs)('div', {
                className: 'flex flex-col sm:flex-row md:items-center gap-x-2',
                children: [void 0 !== i && (0, r.jsx)(a.G, { href: i }), o],
              }),
            ],
          });
        };
      },
      87696: function (e, t, s) {
        'use strict';
        s.d(t, {
          DO: function () {
            return c;
          },
          Tq: function () {
            return o;
          },
          by: function () {
            return i;
          },
          iL: function () {
            return l;
          },
          m9: function () {
            return d;
          },
        });
        var r = s(97458),
          n = s(52983),
          a = s(65092);
        let i = (e) => {
            let { children: t, header: s, footer: n } = e;
            return (0, r.jsxs)(o, {
              'data-sentry-element': 'FormPanelContainer',
              'data-sentry-component': 'FormPanel',
              'data-sentry-source-file': 'FormPanel.tsx',
              children: [
                s && (0, r.jsx)(l, { children: s }),
                (0, r.jsx)(c, {
                  className: 'divide-y',
                  'data-sentry-element': 'FormPanelContent',
                  'data-sentry-source-file': 'FormPanel.tsx',
                  children: t,
                }),
                n && (0, r.jsx)(d, { children: n }),
              ],
            });
          },
          o = (0, n.forwardRef)((e, t) => {
            let { children: s, ...n } = e;
            return (0, r.jsx)('div', {
              ref: t,
              ...n,
              className: (0, a.cn)(
                'bg-surface-100 border overflow-hidden rounded-md shadow max-w-full',
                n.className
              ),
              children: s,
            });
          });
        o.displayName = o.displayName;
        let l = (0, n.forwardRef)((e, t) => {
          let { children: s, ...n } = e;
          return (0, r.jsx)('div', {
            ref: t,
            ...n,
            className: (0, a.cn)(
              'border-default border-b px-8 py-4',
              n.className
            ),
            children: s,
          });
        });
        l.displayName = l.displayName;
        let c = (0, n.forwardRef)((e, t) => {
          let { children: s, ...n } = e;
          return (0, r.jsx)('div', {
            ref: t,
            ...n,
            className: (0, a.cn)(
              'divide-border flex flex-col gap-0',
              n.className
            ),
            children: s,
          });
        });
        c.displayName = c.displayName;
        let d = (0, n.forwardRef)((e, t) => {
          let { children: s, ...n } = e;
          return (0, r.jsx)('div', {
            ref: t,
            ...n,
            className: (0, a.cn)('border-t', n.className),
            children: s,
          });
        });
        d.displayName = d.displayName;
      },
      46993: function (e, t, s) {
        'use strict';
        s.d(t, {
          B4: function () {
            return l;
          },
          S0: function () {
            return i;
          },
          hj: function () {
            return a;
          },
        });
        var r = s(97458),
          n = s(52983);
        let a = (e) => {
            let {
              children: t,
              id: s,
              header: n,
              disabled: a,
              className: i,
            } = e;
            return (0, r.jsxs)('div', {
              id: s,
              className: [
                'grid grid-cols-12 gap-6 px-4 md:px-8 py-4 md:py-8',
                ''.concat(a ? ' opacity-30' : ' opacity-100'),
                ''.concat(i),
              ].join(' '),
              'data-sentry-component': 'FormSection',
              'data-sentry-source-file': 'FormSection.tsx',
              children: [n, t],
            });
          },
          i = (e) => {
            let { children: t, className: s = '', description: n } = e;
            return void 0 !== n
              ? (0, r.jsxs)('div', {
                  className:
                    'flex flex-col space-y-2 col-span-12 lg:col-span-5 '.concat(
                      s
                    ),
                  children: [
                    (0, r.jsx)('label', {
                      className: 'text-foreground text-sm',
                      children: t,
                    }),
                    n,
                  ],
                })
              : (0, r.jsx)('label', {
                  className:
                    'text-foreground col-span-12 text-sm lg:col-span-5 '.concat(
                      s
                    ),
                  children: t,
                });
          },
          o = () =>
            (0, r.jsxs)('div', {
              className: 'flex w-full flex-col gap-2',
              'data-sentry-component': 'Shimmer',
              'data-sentry-source-file': 'FormSection.tsx',
              children: [
                (0, r.jsx)('div', {
                  className: 'shimmering-loader h-2 w-1/3 rounded',
                }),
                (0, r.jsx)('div', {
                  className: 'flex flex-col justify-between space-y-2',
                  children: (0, r.jsx)('div', {
                    className: 'shimmering-loader h-[34px] w-2/3 rounded',
                  }),
                }),
              ],
            }),
          l = (e) => {
            let {
              children: t,
              loading: s = !0,
              fullWidth: a,
              className: i,
            } = e;
            return (0, r.jsx)('div', {
              className:
                '\n        relative col-span-12 flex flex-col gap-6 lg:col-span-7\n        '
                  .concat(a && '!col-span-12', '\n        ')
                  .concat(i, '\n      '),
              'data-sentry-component': 'FormSectionContent',
              'data-sentry-source-file': 'FormSection.tsx',
              children: s ? n.Children.map(t, () => (0, r.jsx)(o, {})) : t,
            });
          };
      },
      47365: function (e, t, s) {
        'use strict';
        s.d(t, {
          U: function () {
            return i;
          },
        });
        var r = s(97458),
          n = s(83145),
          a = s.n(n);
        let i = (e) => {
          let { href: t, children: s } = e,
            n =
              'underline transition underline-offset-2 decoration-foreground-lighter decoration-foreground text-foreground';
          return t.startsWith('http')
            ? (0, r.jsx)('a', {
                className: n,
                href: t,
                target: '_blank',
                rel: 'noreferrer noopener',
                children: s,
              })
            : (0, r.jsx)(a(), {
                className: n,
                href: t,
                'data-sentry-element': 'Link',
                'data-sentry-component': 'InlineLink',
                'data-sentry-source-file': 'InlineLink.tsx',
                children: s,
              });
        };
      },
      41321: function (e, t, s) {
        'use strict';
        s.d(t, {
          y: function () {
            return c;
          },
        });
        var r = s(97458),
          n = s(4839),
          a = s(12329),
          i = s(10947),
          o = s(90839),
          l = s(6146);
        let c = {
          'vercel-marketplace': 'Vercel Marketplace',
          'aws-marketplace': 'AWS Marketplace',
        };
        t.Z = function (e) {
          var t, s;
          let { partner: d, resource: u, cta: m } = e,
            f = void 0 !== m,
            {
              data: x,
              isLoading: p,
              isError: h,
            } = (0, a.s)(
              { installationId: null == m ? void 0 : m.installationId },
              { enabled: f }
            ),
            j =
              (null !== (t = null == x ? void 0 : x.url) && void 0 !== t
                ? t
                : '') +
              (null !== (s = null == m ? void 0 : m.path) && void 0 !== s
                ? s
                : '');
          return (0, r.jsxs)(i.bZ, {
            className:
              'flex flex-col items-center gap-y-2 border-0 rounded-none',
            'data-sentry-element': 'Alert_Shadcn_',
            'data-sentry-component': 'PartnerManagedResource',
            'data-sentry-source-file': 'PartnerManagedResource.tsx',
            children: [
              (0, r.jsx)(l.Z, {
                organization: { managed_by: d },
                showTooltip: !1,
                size: 'large',
                'data-sentry-element': 'PartnerIcon',
                'data-sentry-source-file': 'PartnerManagedResource.tsx',
              }),
              (0, r.jsxs)(i.Cd, {
                className: 'text-sm',
                'data-sentry-element': 'AlertTitle_Shadcn_',
                'data-sentry-source-file': 'PartnerManagedResource.tsx',
                children: [u, ' are managed by ', c[d], '.'],
              }),
              f &&
                (0, r.jsx)(o.z, {
                  asChild: !0,
                  type: 'default',
                  iconRight: (0, r.jsx)(n.Z, {}),
                  disabled: p || h,
                  children: (0, r.jsx)('a', {
                    href: j,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    children:
                      m.message || 'View '.concat(u, ' on ').concat(c[d]),
                  }),
                }),
            ],
          });
        };
      },
      55228: function (e, t, s) {
        'use strict';
        var r = s(97458),
          n = s(83145),
          a = s.n(n),
          i = s(94059),
          o = s(73565),
          l = s(90839);
        t.Z = (e) => {
          let {
              name: t = '',
              isActive: s,
              isExternal: n,
              icon: c,
              rightIcon: d,
              url: u = '',
              target: m = '_self',
              onClick: f,
              textClassName: x = '',
              hoverText: p = '',
              label: h,
            } = e,
            j = (0, r.jsx)(i.ZP.Item, {
              icon: c,
              rounded: !0,
              active: s,
              onClick: f,
              children: (0, r.jsxs)('div', {
                className: 'flex w-full items-center justify-between gap-1',
                children: [
                  (0, r.jsxs)('div', {
                    title: p || ('string' == typeof t ? t : ''),
                    className: 'flex items-center gap-2 truncate w-full ' + x,
                    children: [
                      (0, r.jsxs)('span', {
                        className: 'truncate',
                        children: [t, ' '],
                      }),
                      void 0 !== h &&
                        (0, r.jsx)(o.C, {
                          variant: 'warning',
                          className: 'py-0 px-1.5 capitalize',
                          children: h,
                        }),
                    ],
                  }),
                  d && (0, r.jsx)('div', { children: d }),
                ],
              }),
            });
          return u
            ? n
              ? (0, r.jsx)(l.z, {
                  asChild: !0,
                  block: !0,
                  className: '!justify-start',
                  type: 'text',
                  size: 'small',
                  icon: c,
                  children: (0, r.jsx)(a(), {
                    href: u,
                    target: '_blank',
                    rel: 'noreferrer',
                    children: t,
                  }),
                })
              : (0, r.jsx)(a(), {
                  href: u,
                  className: 'block',
                  target: m,
                  children: j,
                })
            : j;
        };
      },
      35336: function (e, t, s) {
        'use strict';
        var r = s(97458),
          n = s(198),
          a = s(83145),
          i = s.n(a),
          o = s(69951),
          l = s(90817),
          c = s(75541),
          d = s(62432),
          u = s(21786),
          m = s(65092),
          f = s(90839),
          x = s(359);
        t.Z = (e) => {
          var t, s, a;
          let {
              icon: p,
              primaryText: h,
              secondaryText: j,
              addon: y,
              buttonText: v,
              source: g = 'upgrade',
              disabled: b = !1,
            } = e,
            N = (0, d.Vm)(),
            w = (0, c.l)(),
            { data: C } = (0, o.Gl)({ orgSlug: null == w ? void 0 : w.slug }),
            k =
              null == C
                ? void 0
                : null === (t = C.plan) || void 0 === t
                  ? void 0
                  : t.id,
            S = (0, l.Xo)(n.KA.BILLING_WRITE, 'stripe.subscriptions'),
            P = (0, u.P)('disableProjectCreationAndUpdate');
          return (0, r.jsx)('div', {
            className: (0, m.cn)(
              'block w-full rounded border border-opacity-20 py-4 px-6',
              'border-overlay bg-surface-200'
            ),
            'data-sentry-component': 'UpgradeToPro',
            'data-sentry-source-file': 'UpgradeToPro.tsx',
            children: (0, r.jsxs)('div', {
              className: 'flex gap-x-3',
              children: [
                p && (0, r.jsx)('div', { className: 'mt-1', children: p }),
                (0, r.jsxs)('div', {
                  className:
                    'flex flex-col md:flex-row w-full md:items-center justify-between gap-4 md:gap-x-8 xl:gap-x-32',
                  children: [
                    (0, r.jsxs)('div', {
                      className: 'space-y-1',
                      children: [
                        (0, r.jsx)('p', { className: 'text-sm', children: h }),
                        (0, r.jsx)('div', {
                          children: (0, r.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children: j,
                          }),
                        }),
                      ],
                    }),
                    !S || P
                      ? (0, r.jsx)(x.u, {
                          disabled: !0,
                          type: 'primary',
                          tooltip: {
                            content: {
                              side: 'bottom',
                              text: P
                                ? 'Subscription changes are currently disabled, our engineers are working on a fix'
                                : S
                                  ? void 0
                                  : 'You need additional permissions to amend subscriptions',
                            },
                          },
                          children: 'Reset database password',
                        })
                      : (0, r.jsx)(f.z, {
                          asChild: !0,
                          type: 'primary',
                          disabled: !S || P || b,
                          children: (0, r.jsx)(i(), {
                            href:
                              'free' === k
                                ? '/org/'
                                    .concat(
                                      null !==
                                        (s = null == w ? void 0 : w.slug) &&
                                        void 0 !== s
                                        ? s
                                        : '_',
                                      '/billing?panel=subscriptionPlan&source='
                                    )
                                    .concat(g)
                                : '/project/'
                                    .concat(
                                      null !==
                                        (a = null == N ? void 0 : N.ref) &&
                                        void 0 !== a
                                        ? a
                                        : '_',
                                      '/settings/addons?panel='
                                    )
                                    .concat(y, '&source=')
                                    .concat(g),
                            children:
                              v ||
                              ('free' === k
                                ? 'Upgrade to Pro'
                                : 'Enable add on'),
                          }),
                        }),
                  ],
                }),
              ],
            }),
          });
        };
      },
      84114: function (e, t, s) {
        'use strict';
        (s.r(t),
          s.d(t, {
            default: function () {
              return tt;
            },
          }));
        var r = s(97458),
          n = s(45437),
          a = s(198),
          i = s(67297),
          o = s(83145),
          l = s.n(o),
          c = s(34549),
          d = s(88971),
          u = s(59461),
          m = s(87696),
          f = s(46993),
          x = s(18186),
          p = s(63621),
          h = s(36457),
          j = s(64618),
          y = s(6464),
          v = s(71207);
        async function g(e) {
          let { ref: t, name: s } = e,
            { data: r, error: n } = await (0, y.r$)(
              '/platform/projects/{ref}',
              { params: { path: { ref: t } }, body: { name: s } }
            );
          return (n && (0, y.S3)(n), r);
        }
        let b = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => g(e), {
            async onSuccess(t, s, n) {
              let { ref: a } = s;
              (await Promise.all([
                r.invalidateQueries(v.i.list()),
                r.invalidateQueries(v.i.detail(a)),
              ]),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error('Failed to update project: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
        var N = s(90817),
          w = s(75541),
          C = s(62432),
          k = s(10947),
          S = s(7756),
          P = s(19540),
          _ = s(51571),
          A = s(90839),
          D = s(98266);
        let T = (0, D.Z)('Pause', [
          [
            'rect',
            {
              x: '14',
              y: '4',
              width: '4',
              height: '16',
              rx: '1',
              key: 'zuxfzm',
            },
          ],
          [
            'rect',
            {
              x: '6',
              y: '4',
              width: '4',
              height: '16',
              rx: '1',
              key: '1okwgv',
            },
          ],
        ]);
        var Z = s(32691),
          L = s(52983),
          R = s(359);
        async function F(e) {
          let { ref: t } = e,
            { data: s, error: r } = await (0, y.v_)(
              '/platform/projects/{ref}/pause',
              { params: { path: { ref: t } } }
            );
          return (r && (0, y.S3)(r), s);
        }
        let z = function () {
          let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, j.D)((e) => F(e), {
            async onSuccess(t, s, r) {
              await (null == e ? void 0 : e(t, s, r));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error('Failed to pause project: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
        var E = s(63278),
          M = s(69951),
          B = s(37756),
          I = s(32002),
          O = () => {
            var e;
            let t = (0, Z.useRouter)(),
              s = (0, h.NL)(),
              { project: n } = (0, d.d2)(),
              i = (0, w.l)(),
              o = (0, d.gY)(),
              [l, u] = (0, L.useState)(!1),
              m =
                null !== (e = null == n ? void 0 : n.ref) && void 0 !== e
                  ? e
                  : '',
              f = (null == n ? void 0 : n.status) === B.S.INACTIVE,
              x = (0, N.Xo)(a.KA.INFRA_EXECUTE, 'queue_jobs.projects.pause'),
              { data: p } = (0, M.Gl)({ orgSlug: null == i ? void 0 : i.slug }),
              j = (null == p ? void 0 : p.plan.id) === 'free',
              { mutate: y, isLoading: v } = z({
                onSuccess: (e, r) => {
                  ((0, E.k7)(s, r.ref, B.S.PAUSING),
                    c.Am.success('Pausing project...'),
                    t.push('/project/'.concat(m)));
                },
              });
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(R.u, {
                  type: 'default',
                  icon: (0, r.jsx)(T, {}),
                  onClick: () => u(!0),
                  loading: v,
                  disabled: !j || void 0 === n || f || !x || !o,
                  tooltip: {
                    content: {
                      side: 'bottom',
                      text: f
                        ? 'Your project is already paused'
                        : x
                          ? o
                            ? j
                              ? void 0
                              : 'Projects on a paid plan will always be running'
                            : 'Unable to pause project as project is not active'
                          : 'You need additional permissions to pause this project',
                    },
                  },
                  'data-sentry-element': 'ButtonTooltip',
                  'data-sentry-source-file': 'PauseProjectButton.tsx',
                  children: 'Pause project',
                }),
                (0, r.jsx)(I.Z, {
                  variant: 'destructive',
                  visible: l,
                  loading: v,
                  title: 'Pause this project?',
                  confirmLabel: 'Pause project',
                  confirmLabelLoading: 'Pausing project',
                  onCancel: () => u(!1),
                  onConfirm: () => {
                    if (!x)
                      return c.Am.error(
                        'You do not have the required permissions to pause this project'
                      );
                    y({ ref: m });
                  },
                  'data-sentry-element': 'ConfirmationModal',
                  'data-sentry-source-file': 'PauseProjectButton.tsx',
                  children: (0, r.jsx)('p', {
                    className: 'text-foreground-light text-sm',
                    children:
                      'Are you sure you want to pause this project? It will not be accessible until you unpause it.',
                  }),
                }),
              ],
            });
          },
          V = s(98601),
          q = s(30588);
        async function U(e) {
          let {
              ref: t,
              region: s,
              services: r = ['postgresql'],
              source_notification_id: n,
            } = e,
            { data: a, error: i } = await (0, y.v_)(
              '/platform/projects/{ref}/restart-services',
              {
                params: { path: { ref: t } },
                body: {
                  restartRequest: {
                    region: s,
                    services: r,
                    source_notification_id: n,
                  },
                },
              }
            );
          return (i && (0, y.S3)(i), a);
        }
        let G = function () {
          let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, j.D)((e) => U(e), {
            async onSuccess(t, s, r) {
              await (null == e ? void 0 : e(t, s, r));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error('Failed to restart project: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
        var Y = s(21786),
          W = s(40577),
          X = s(65092),
          H = s(14500),
          Q = s(32472),
          K = () => {
            var e, t;
            let s = (0, Z.useRouter)(),
              n = (0, h.NL)(),
              { project: i } = (0, d.d2)(),
              o = (0, d.gY)(),
              [l, u] = (0, L.useState)(),
              m =
                null !== (e = null == i ? void 0 : i.ref) && void 0 !== e
                  ? e
                  : '',
              f =
                null !== (t = null == i ? void 0 : i.region) && void 0 !== t
                  ? t
                  : '',
              x = (0, Y.P)('disableProjectRestarts'),
              p = (0, N.Xo)(a.KA.INFRA_EXECUTE, 'reboot'),
              { mutate: j, isLoading: y } = (0, q.D)({
                onSuccess: () => {
                  k();
                },
                onError: (e) => {
                  C(e, 'project');
                },
              }),
              { mutate: v, isLoading: g } = G({
                onSuccess: () => {
                  k();
                },
                onError: (e) => {
                  C(e, 'database');
                },
              }),
              b = () => {
                if (!p)
                  return c.Am.error(
                    'You do not have the required permissions to restart this project'
                  );
                j({ ref: m });
              },
              w = async () => {
                if (!p)
                  return c.Am.error(
                    'You do not have the required permissions to restart this project'
                  );
                v({ ref: m, region: f, services: ['postgresql'] });
              },
              C = (e, t) => {
                (c.Am.error(
                  'Unable to restart '.concat(t, ': ').concat(e.message)
                ),
                  u(void 0));
              },
              k = () => {
                ((0, E.k7)(n, m, 'RESTARTING'),
                  c.Am.success('Restarting server...'),
                  s.push('/project/'.concat(m)),
                  u(void 0));
              };
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsxs)(W.u, {
                  'data-sentry-element': 'Tooltip',
                  'data-sentry-source-file': 'RestartServerButton.tsx',
                  children: [
                    (0, r.jsx)(W.aJ, {
                      asChild: !0,
                      'data-sentry-element': 'TooltipTrigger',
                      'data-sentry-source-file': 'RestartServerButton.tsx',
                      children: (0, r.jsxs)('div', {
                        className: 'flex items-center',
                        children: [
                          (0, r.jsx)(A.z, {
                            type: 'default',
                            className: (0, X.cn)(
                              'px-3 z-10',
                              p && o ? 'rounded-r-none' : ''
                            ),
                            disabled: void 0 === i || !p || !o || x,
                            onClick: () => u('project'),
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file':
                              'RestartServerButton.tsx',
                            children: 'Restart project',
                          }),
                          p &&
                            o &&
                            !x &&
                            (0, r.jsxs)(H.h_, {
                              children: [
                                (0, r.jsx)(H.$F, {
                                  asChild: !0,
                                  children: (0, r.jsx)(A.z, {
                                    type: 'default',
                                    className:
                                      'rounded-l-none px-[4px] py-[5px] -ml-[1px]',
                                    icon: (0, r.jsx)(V.Z, {}),
                                    disabled: !p,
                                  }),
                                }),
                                (0, r.jsx)(H.AW, {
                                  align: 'end',
                                  side: 'bottom',
                                  children: (0, r.jsx)(
                                    H.Xi,
                                    {
                                      disabled: y || g,
                                      onClick: () => {
                                        u('database');
                                      },
                                      children: (0, r.jsxs)('div', {
                                        className: 'space-y-1',
                                        children: [
                                          (0, r.jsx)('p', {
                                            className: 'block text-foreground',
                                            children: 'Fast database reboot',
                                          }),
                                          (0, r.jsx)('p', {
                                            className:
                                              'block text-foreground-light',
                                            children:
                                              'Restarts only the database - faster but may not be able to recover from all failure modes',
                                          }),
                                        ],
                                      }),
                                    },
                                    'database'
                                  ),
                                }),
                              ],
                            }),
                        ],
                      }),
                    }),
                    ((void 0 !== i && (!p || !o)) || x) &&
                      (0, r.jsx)(W._v, {
                        side: 'bottom',
                        children: x
                          ? 'Project restart is currently disabled'
                          : p
                            ? o
                              ? ''
                              : 'Unable to restart project as project is not active'
                            : 'You need additional permissions to restart this project',
                      }),
                  ],
                }),
                (0, r.jsx)(Q.Z, {
                  danger: !0,
                  visible: void 0 !== l,
                  title: 'Restart '.concat(l),
                  description: (0, r.jsxs)(r.Fragment, {
                    children: [
                      'Are you sure you want to restart the',
                      ' ',
                      (0, r.jsx)('span', {
                        className: 'text-foreground',
                        children: l,
                      }),
                      '? There will be a few minutes of downtime.',
                    ],
                  }),
                  buttonLabel: 'Restart',
                  buttonLoadingLabel: 'Restarting',
                  onSelectCancel: () => u(void 0),
                  onSelectConfirm: async () => {
                    'project' === l
                      ? await b()
                      : 'database' === l && (await w());
                  },
                  'data-sentry-element': 'ConfirmModal',
                  'data-sentry-source-file': 'RestartServerButton.tsx',
                }),
              ],
            });
          },
          J = () => {
            var e, t;
            let { project: s } = (0, d.d2)(),
              n = (0, w.l)(),
              o = (0, C.N$)(null == s ? void 0 : s.parent_project_ref),
              h = void 0 !== o,
              j = 'project-general-settings',
              y = {
                name:
                  null !== (e = null == s ? void 0 : s.name) && void 0 !== e
                    ? e
                    : '',
                ref:
                  null !== (t = null == s ? void 0 : s.ref) && void 0 !== t
                    ? t
                    : '',
              },
              v = (0, N.Xo)(a.KA.UPDATE, 'projects', {
                resource: { project_id: null == s ? void 0 : s.id },
              }),
              { mutate: g, isLoading: D } = b(),
              T = async (e, t) => {
                let { resetForm: r } = t;
                if (!(null == s ? void 0 : s.ref))
                  return console.error('Ref is required');
                g(
                  { ref: s.ref, name: e.name.trim() },
                  {
                    onSuccess: (e) => {
                      let { name: t } = e;
                      (r({ values: { name: t }, initialValues: { name: t } }),
                        c.Am.success('Successfully saved settings'));
                    },
                  }
                );
              };
            return (0, r.jsxs)('div', {
              'data-sentry-component': 'General',
              'data-sentry-source-file': 'General.tsx',
              children: [
                h &&
                  (0, r.jsxs)(k.bZ, {
                    variant: 'default',
                    className: 'mb-6',
                    children: [
                      (0, r.jsx)(S.aN, {}),
                      (0, r.jsx)(k.Cd, {
                        children:
                          'You are currently on a preview branch of your project',
                      }),
                      (0, r.jsxs)(k.X, {
                        children: [
                          "Certain settings are not available while you're on a preview branch. To adjust your project settings, you may return to your",
                          ' ',
                          (0, r.jsx)(l(), {
                            href: '/project/'.concat(
                              o.ref,
                              '/settings/general'
                            ),
                            className: 'text-brand',
                            children: 'main branch',
                          }),
                          '.',
                        ],
                      }),
                    ],
                  }),
                void 0 === s
                  ? (0, r.jsx)(p.A, {})
                  : (0, r.jsx)(P.Z, {
                      id: j,
                      initialValues: y,
                      onSubmit: T,
                      children: (e) => {
                        let { handleReset: t, values: s, initialValues: n } = e,
                          a = JSON.stringify(s) !== JSON.stringify(n);
                        return (0, r.jsx)(m.by, {
                          disabled: !v,
                          footer: (0, r.jsx)('div', {
                            className: 'flex py-4 px-8',
                            children: (0, r.jsx)(u.i, {
                              form: j,
                              isSubmitting: D,
                              hasChanges: a,
                              handleReset: t,
                              helper: v
                                ? void 0
                                : "You need additional permissions to manage this project's settings",
                            }),
                          }),
                          children: (0, r.jsx)(f.hj, {
                            header: (0, r.jsx)(f.S0, {
                              children: 'General settings',
                            }),
                            children: (0, r.jsxs)(f.B4, {
                              loading: !1,
                              children: [
                                (0, r.jsx)(_.Z, {
                                  id: 'name',
                                  size: 'small',
                                  label: 'Project name',
                                  disabled: h || !v,
                                }),
                                (0, r.jsx)(_.Z, {
                                  copy: !0,
                                  disabled: !0,
                                  id: 'ref',
                                  size: 'small',
                                  label: 'Project ID',
                                }),
                              ],
                            }),
                          }),
                        });
                      },
                    }),
                !h &&
                  (0, r.jsxs)(r.Fragment, {
                    children: [
                      (0, r.jsx)('div', {
                        className: 'mt-6',
                        id: 'restart-project',
                        children: (0, r.jsxs)(m.by, {
                          children: [
                            (0, r.jsx)('div', {
                              className: 'flex flex-col px-8 py-4',
                              children: (0, r.jsxs)('div', {
                                className: 'flex justify-between',
                                children: [
                                  (0, r.jsxs)('div', {
                                    children: [
                                      (0, r.jsx)('p', {
                                        className: 'text-sm',
                                        children: 'Restart project',
                                      }),
                                      (0, r.jsx)('div', {
                                        className: 'max-w-[420px]',
                                        children: (0, r.jsx)('p', {
                                          className:
                                            'text-sm text-foreground-light',
                                          children:
                                            'Your project will not be available for a few minutes.',
                                        }),
                                      }),
                                    ],
                                  }),
                                  (0, r.jsx)(K, {}),
                                ],
                              }),
                            }),
                            (0, r.jsxs)('div', {
                              className:
                                'flex w-full items-center justify-between px-8 py-4',
                              id: 'pause-project',
                              children: [
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsx)('p', {
                                      className: 'text-sm',
                                      children: 'Pause project',
                                    }),
                                    (0, r.jsx)('div', {
                                      className: 'max-w-[420px]',
                                      children: (0, r.jsx)('p', {
                                        className:
                                          'text-sm text-foreground-light',
                                        children:
                                          'Your project will not be accessible while it is paused.',
                                      }),
                                    }),
                                  ],
                                }),
                                (0, r.jsx)(O, {}),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, r.jsx)('div', {
                        className: 'mt-6',
                        children: (0, r.jsx)(x.Z, {
                          children: (0, r.jsx)(x.Z.Content, {
                            children: (0, r.jsxs)('div', {
                              className: 'flex justify-between',
                              children: [
                                (0, r.jsxs)('div', {
                                  className: 'flex space-x-4',
                                  children: [
                                    (0, r.jsx)(i.Z, { strokeWidth: 2 }),
                                    (0, r.jsxs)('div', {
                                      children: [
                                        (0, r.jsx)('p', {
                                          className: 'text-sm',
                                          children:
                                            'Project usage statistics have been moved',
                                        }),
                                        (0, r.jsx)('p', {
                                          className:
                                            'text-foreground-light text-sm',
                                          children:
                                            "You may view your project's usage under your organization's settings",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, r.jsx)('div', {
                                  children: (0, r.jsx)(A.z, {
                                    asChild: !0,
                                    type: 'default',
                                    children: (0, r.jsx)(l(), {
                                      href: '/org/'
                                        .concat(
                                          null == n ? void 0 : n.slug,
                                          '/usage?projectRef='
                                        )
                                        .concat(null == s ? void 0 : s.ref),
                                      children: 'View project usage',
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                      }),
                    ],
                  }),
              ],
            });
          },
          $ = s(44735),
          ee = s(12436),
          et = s(24083),
          es = s(35336),
          er = s(31485),
          en = s(79600),
          ea = s(67096);
        async function ei(e) {
          let { domain: t } = e,
            s = await fetch(
              'https://one.one.one.one/dns-query?name='.concat(
                t,
                '&type=CNAME'
              ),
              { method: 'GET', headers: { accept: 'application/dns-json' } }
            ),
            r = await s.json();
          if (void 0 === r.Answer)
            throw Error(
              'Your CNAME record for '.concat(
                t,
                " cannot be found - if you've just added the record, do check back in a bit."
              )
            );
          return r.Answer.some((e) => 5 === e.type);
        }
        let eo = function () {
          let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, j.D)((e) => ei(e), {
            async onSuccess(t, s, r) {
              await (null == e ? void 0 : e(t, s, r));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error('Failed to check CNAME record: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
        var el = s(29449);
        async function ec(e) {
          let { projectRef: t } = e,
            { data: s, error: r } = await (0, y.v_)(
              '/v1/projects/{ref}/custom-hostname/activate',
              { params: { path: { ref: t } } }
            );
          return (r && (0, y.S3)(r), s);
        }
        let ed = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => ec(e), {
            async onSuccess(t, s, n) {
              let { projectRef: a } = s;
              (await r.invalidateQueries(el.A.list(a)),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error(
                    'Failed to activate custom domain: '.concat(e.message)
                  )
                : t(e, s, r);
            },
            ...s,
          });
        };
        async function eu(e) {
          let { projectRef: t } = e,
            { data: s, error: r } = await (0, y.IV)(
              '/v1/projects/{ref}/custom-hostname',
              { params: { path: { ref: t } } }
            );
          return (r && (0, y.S3)(r), s);
        }
        let em = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => eu(e), {
            async onSuccess(t, s, n) {
              let { projectRef: a } = s;
              (r.setQueriesData(el.A.list(a), () => ({
                customDomain: null,
                status: '0_no_hostname_configured',
              })),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error(
                    'Failed to delete custom domain: '.concat(e.message)
                  )
                : t(e, s, r);
            },
            ...s,
          });
        };
        var ef = (e) => {
            var t;
            let { projectRef: s, customDomain: n } = e,
              [a, i] = (0, L.useState)(!1),
              { data: o } = (0, er.zR)({ projectRef: s }),
              { mutate: l, isLoading: d } = eo(),
              { mutate: u, isLoading: m } = ed({
                onSuccess: () => {
                  (c.Am.success('Successfully activated custom domain'), i(!1));
                },
              }),
              { mutate: f, isLoading: p } = em(),
              h =
                null == o
                  ? void 0
                  : null === (t = o.app_config) || void 0 === t
                    ? void 0
                    : t.endpoint,
              j = async () => {
                if (!s) return console.error('Project ref is required');
                l(
                  { domain: n.hostname },
                  { onSuccess: () => u({ projectRef: s }) }
                );
              },
              y = async () => {
                if (!s) return console.error('Project ref is required');
                f({ projectRef: s });
              };
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsxs)('div', {
                  className: 'flex flex-col items-start',
                  children: [
                    (0, r.jsxs)(x.Z.Content, {
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'CustomDomainActivate.tsx',
                      children: [
                        (0, r.jsxs)('div', {
                          className: 'flex flex-col gap-2',
                          children: [
                            (0, r.jsxs)('h4', {
                              className: 'text-foreground',
                              children: [
                                'Setup complete! Press activate to enable the custom domain',
                                ' ',
                                (0, r.jsx)('code', {
                                  className: 'text-sm',
                                  children: n.hostname,
                                }),
                                ' for this project.',
                              ],
                            }),
                            (0, r.jsx)('span', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'We recommend that you schedule a downtime window of 20 - 30 minutes for your application, as you will need to update any services that need to know about your custom domain (e.g client side code or OAuth providers)',
                            }),
                          ],
                        }),
                        (0, r.jsx)('div', {
                          className: 'mt-4',
                          children: (0, r.jsxs)(k.bZ, {
                            'data-sentry-element': 'Alert_Shadcn_',
                            'data-sentry-source-file':
                              'CustomDomainActivate.tsx',
                            children: [
                              (0, r.jsx)($.Z, {
                                className: 'text-foreground-light',
                                strokeWidth: 1.5,
                                'data-sentry-element': 'AlertCircle',
                                'data-sentry-source-file':
                                  'CustomDomainActivate.tsx',
                              }),
                              (0, r.jsx)(k.Cd, {
                                'data-sentry-element': 'AlertTitle_Shadcn_',
                                'data-sentry-source-file':
                                  'CustomDomainActivate.tsx',
                                children:
                                  'Remember to retain your CNAME record for service continuity after activation',
                              }),
                              (0, r.jsx)(k.X, {
                                'data-sentry-element':
                                  'AlertDescription_Shadcn_',
                                'data-sentry-source-file':
                                  'CustomDomainActivate.tsx',
                                children: (0, r.jsxs)('p', {
                                  className:
                                    'col-span-12 text-sm lg:col-span-7 leading-6',
                                  children: [
                                    'Your custom domain CNAME record for',
                                    ' ',
                                    (0, r.jsx)('code', {
                                      className: 'text-xs',
                                      children: n.hostname,
                                    }),
                                    'should resolve to',
                                    ' ',
                                    h
                                      ? (0, r.jsx)('code', {
                                          className: 'text-xs',
                                          children: h,
                                        })
                                      : "your project's API URL",
                                    ". If you're using Cloudflare as your DNS provider, disable the proxy option.",
                                  ],
                                }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, r.jsx)('div', {
                      className: 'w-full border-t border-muted',
                    }),
                    (0, r.jsx)(x.Z.Content, {
                      className: 'w-full',
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'CustomDomainActivate.tsx',
                      children: (0, r.jsxs)('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          (0, r.jsx)(ea.G, {
                            href: 'https://supabase.com/docs/guides/platform/custom-domains',
                            'data-sentry-element': 'DocsButton',
                            'data-sentry-source-file':
                              'CustomDomainActivate.tsx',
                          }),
                          (0, r.jsxs)('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              (0, r.jsx)(A.z, {
                                type: 'default',
                                className: 'self-end',
                                onClick: y,
                                loading: p,
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'CustomDomainActivate.tsx',
                                children: 'Cancel',
                              }),
                              (0, r.jsx)(A.z, {
                                icon: (0, r.jsx)('svg', {
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  fill: 'none',
                                  viewBox: '0 0 24 24',
                                  strokeWidth: 1,
                                  stroke: 'currentColor',
                                  className: 'w-4 h-4',
                                  children: (0, r.jsx)('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    d: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
                                  }),
                                }),
                                disabled: p,
                                onClick: () => i(!0),
                                className: 'self-end',
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'CustomDomainActivate.tsx',
                                children: 'Activate',
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, r.jsx)(I.Z, {
                  size: 'small',
                  loading: d || m,
                  visible: a,
                  title: (0, r.jsxs)(r.Fragment, {
                    children: [
                      'Are you sure you want to activate the custom domain',
                      ' ',
                      (0, r.jsx)('code', {
                        className: 'text-sm',
                        children: n.hostname,
                      }),
                      ' for the project?',
                    ],
                  }),
                  confirmLabel: 'Activate',
                  confirmLabelLoading: 'Activating',
                  onCancel: () => i(!1),
                  onConfirm: j,
                  'data-sentry-element': 'ConfirmationModal',
                  'data-sentry-source-file': 'CustomDomainActivate.tsx',
                  children: (0, r.jsxs)('p', {
                    className: 'text-sm',
                    children: [
                      'This will activate the custom domain ',
                      (0, r.jsx)('code', { children: n.hostname }),
                      ". Your project's Supabase domain will also remain active.",
                    ],
                  }),
                }),
              ],
            });
          },
          ex = s(74304),
          ep = (e) => {
            let { projectRef: t, customDomain: s } = e,
              [n, a] = (0, L.useState)(!1),
              { mutate: i } = em({
                onSuccess: () => {
                  (c.Am.success('Successfully deleted custom domain'), a(!1));
                },
              }),
              o = async () => {
                if (!t) return console.error('Project ref is required');
                i({ projectRef: t });
              };
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(x.Z.Content, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CustomDomainDelete.tsx',
                  children: (0, r.jsxs)('div', {
                    className: 'w-full space-y-2',
                    children: [
                      (0, r.jsx)('p', {
                        className: 'text-xs text-foreground-light',
                        children: 'Active custom domain:',
                      }),
                      (0, r.jsx)('div', {
                        className: 'flex items-center space-x-2',
                        children: (0, r.jsxs)('code', {
                          className: 'text-lg mx-0 flex items-center space-x-2',
                          children: [
                            (0, r.jsx)('div', {
                              className: 'h-2 w-2 rounded-full bg-brand',
                            }),
                            (0, r.jsx)('span', { children: s.hostname }),
                          ],
                        }),
                      }),
                      (0, r.jsx)('p', {
                        className: 'text-sm text-foreground-light',
                        children:
                          'Your custom domain is currently active and is serving traffic',
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)('div', {
                  className: 'w-full border-t border-muted',
                }),
                (0, r.jsx)(x.Z.Content, {
                  className: 'w-full',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CustomDomainDelete.tsx',
                  children: (0, r.jsxs)('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      (0, r.jsx)(ea.G, {
                        href: 'https://supabase.com/docs/guides/platform/custom-domains',
                        'data-sentry-element': 'DocsButton',
                        'data-sentry-source-file': 'CustomDomainDelete.tsx',
                      }),
                      (0, r.jsx)(A.z, {
                        type: 'danger',
                        icon: (0, r.jsx)(ex.Z, {}),
                        onClick: () => a(!0),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'CustomDomainDelete.tsx',
                        children: 'Delete Custom Domain',
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)(Q.Z, {
                  danger: !0,
                  visible: n,
                  title: (0, r.jsxs)('div', {
                    children: [
                      'Are you sure you want to delete the custom domain',
                      ' ',
                      (0, r.jsx)('code', {
                        className: 'text-sm',
                        children: s.hostname,
                      }),
                      ' for the project?',
                    ],
                  }),
                  description:
                    'Your custom domain will be deactivated. You will need to re-verify your domain if you want to use it again.',
                  buttonLabel: 'Delete',
                  buttonLoadingLabel: 'Deleting',
                  onSelectCancel: () => a(!1),
                  onSelectConfirm: o,
                  'data-sentry-element': 'ConfirmModal',
                  'data-sentry-source-file': 'CustomDomainDelete.tsx',
                }),
              ],
            });
          },
          eh = s(96056),
          ej = s(5211);
        async function ey(e) {
          let { projectRef: t } = e,
            { data: s, error: r } = await (0, y.v_)(
              '/v1/projects/{ref}/custom-hostname/reverify',
              { params: { path: { ref: t } } }
            );
          return (r && (0, y.S3)(r), s);
        }
        let ev = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => ey(e), {
            async onSuccess(t, s, n) {
              let { projectRef: a } = s;
              (await r.invalidateQueries(el.A.list(a)),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error(
                    'Failed to reverify custom domain: '.concat(e.message)
                  )
                : t(e, s, r);
            },
            ...s,
          });
        };
        var eg = (e) => {
            let { type: t, name: s, value: n } = e;
            return (0, r.jsxs)('div', {
              className: 'flex gap-4 items-center',
              'data-sentry-component': 'DNSRecord',
              'data-sentry-source-file': 'DNSRecord.tsx',
              children: [
                (0, r.jsx)('div', {
                  className: 'w-[50px]',
                  children: (0, r.jsx)('p', {
                    className: 'font-mono text-base',
                    children: t.toUpperCase(),
                  }),
                }),
                (0, r.jsx)(_.Z, {
                  readOnly: !0,
                  copy: !0,
                  disabled: !0,
                  className: 'input-mono flex-1',
                  value: s,
                  layout: 'vertical',
                  'data-sentry-element': 'Input',
                  'data-sentry-source-file': 'DNSRecord.tsx',
                }),
                (0, r.jsx)(_.Z, {
                  readOnly: !0,
                  copy: !0,
                  disabled: !0,
                  className: 'input-mono flex-1',
                  value: n,
                  layout: 'vertical',
                  'data-sentry-element': 'Input',
                  'data-sentry-source-file': 'DNSRecord.tsx',
                }),
              ],
            });
          },
          eb = s(52675);
        let eN = (e) => {
          let { display: t } = e;
          return '' !== t
            ? (0, r.jsxs)('div', {
                className: 'flex gap-4',
                children: [
                  (0, r.jsx)('div', {
                    className: 'w-[50px]',
                    children: (0, r.jsx)('p', {
                      className: 'text-foreground-light text-sm',
                      children: 'Type',
                    }),
                  }),
                  (0, r.jsx)('div', {
                    className:
                      'text-sm grid gap-2 md:grid md:grid-cols-12 md:gap-x-4 input-mono flex-1',
                    children: (0, r.jsx)('div', {
                      className:
                        'flex flex-row space-x-2 justify-between col-span-12',
                      children: (0, r.jsx)('label', {
                        className:
                          'block text-foreground-light text-sm break-all',
                        children: 'Name',
                      }),
                    }),
                  }),
                  (0, r.jsx)('div', {
                    className:
                      'text-sm grid gap-2 md:grid md:grid-cols-12 md:gap-x-4 input-mono flex-1',
                    children: (0, r.jsx)('div', {
                      className:
                        'flex flex-row space-x-2 justify-between col-span-12',
                      children: (0, r.jsx)('label', {
                        className:
                          'block text-foreground-light text-sm break-all',
                        children: 'Content',
                      }),
                    }),
                  }),
                ],
              })
            : (0, r.jsxs)('div', {
                className: 'flex items-center gap-2',
                'data-sentry-component': 'DNSTableHeaders',
                'data-sentry-source-file': 'DNSTableHeaders.tsx',
                children: [
                  (0, r.jsx)(eb.Z, {
                    size: 14,
                    className: 'animate-spin',
                    'data-sentry-element': 'Loader2',
                    'data-sentry-source-file': 'DNSTableHeaders.tsx',
                  }),
                  (0, r.jsx)('p', {
                    className: 'text-sm text-foreground-light',
                    children:
                      'Validating custom domain and TLS configuration...',
                  }),
                ],
              });
        };
        var ew = (e) => {
            var t, s, n, a, i, o, c, d;
            let { customDomain: u } = e,
              { ref: m } = (0, ee.UO)(),
              [f, p] = (0, L.useState)(!1),
              { data: h } = (0, er.zR)({ projectRef: m }),
              { mutate: j, isLoading: y } = ev({
                onSuccess: (e) => {
                  '2_initiated' === e.status && p(!0);
                },
              }),
              { mutate: v, isLoading: g } = em(),
              b =
                null === (t = u.ssl.validation_errors) || void 0 === t
                  ? void 0
                  : t.reduce(
                      (e, t) => e || t.message.includes('caa_error'),
                      !1
                    ),
              N =
                (null !== (a = u.ssl.txt_name) && void 0 !== a ? a : '') === '',
              w = () => {
                if (!m) return console.error('Project ref is required');
                j({ projectRef: m });
              };
            !(function (e, t) {
              let s = (0, L.useRef)(e);
              ((0, L.useEffect)(() => {
                s.current = e;
              }, [e]),
                (0, L.useEffect)(() => {
                  if (!1 === t) return;
                  let e = setInterval(() => {
                    s.current();
                  }, t);
                  return () => {
                    clearInterval(e);
                  };
                }, [t]));
            })(w, void 0 !== u.ssl.status && void 0 === u.ssl.txt_name && 5e3);
            let C = async () => {
              if (!m) return console.error('Project ref is required');
              v({ projectRef: m });
            };
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsxs)(x.Z.Content, {
                  className: 'space-y-6',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CustomDomainVerify.tsx',
                  children: [
                    (0, r.jsxs)('div', {
                      children: [
                        (0, r.jsxs)('h4', {
                          className: 'text-foreground mb-2',
                          children: [
                            'Configure TXT verification for your custom domain',
                            ' ',
                            (0, r.jsx)('code', {
                              className: 'text-sm',
                              children: u.hostname,
                            }),
                          ],
                        }),
                        (0, r.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children:
                            'Set the following TXT record(s) in your DNS provider, then click verify to confirm your control over the domain.',
                        }),
                        (0, r.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children:
                            'Records which have been successfully verified will be removed from this list below.',
                        }),
                        !N &&
                          (0, r.jsx)('div', {
                            className: 'mt-4 mb-2',
                            children: (0, r.jsxs)(k.bZ, {
                              variant: 'default',
                              children: [
                                f
                                  ? (0, r.jsx)($.Z, {
                                      className: 'text-foreground-light',
                                      strokeWidth: 1.5,
                                    })
                                  : (0, r.jsx)(eh.Z, {
                                      className: 'text-foreground-light',
                                      strokeWidth: 1.5,
                                    }),
                                (0, r.jsx)(k.Cd, {
                                  children: f
                                    ? 'Unable to verify records from DNS provider yet.'
                                    : 'Please note that it may take up to 24 hours for the DNS records to propagate.',
                                }),
                                (0, r.jsx)(k.X, {
                                  children: (0, r.jsxs)('div', {
                                    children: [
                                      f &&
                                        (0, r.jsx)('p', {
                                          children:
                                            'Please check again soon. Note that it may take up to 24 hours for changes in DNS records to propagate.',
                                        }),
                                      (0, r.jsxs)('p', {
                                        children: [
                                          'You may also visit',
                                          ' ',
                                          (0, r.jsx)(l(), {
                                            target: '_blank',
                                            rel: 'noreferrer',
                                            href: 'https://whatsmydns.net/#TXT/'.concat(
                                              u.hostname
                                            ),
                                            className: 'text-brand',
                                            children: 'here',
                                          }),
                                          ' ',
                                          'to check if your DNS has been propagated successfully before clicking verify.',
                                        ],
                                      }),
                                      f &&
                                        (0, r.jsx)('p', {
                                          className:
                                            'mt-1 text-foreground-lighter',
                                          children:
                                            'Some registrars will require you to remove the domain name when creating DNS records. As an example, to create a record for `foo.app.example.com`, you would need to create an entry for `foo.app`.',
                                        }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                    b &&
                      (0, r.jsxs)(k.bZ, {
                        children: [
                          (0, r.jsx)(S.aN, {}),
                          (0, r.jsx)(k.Cd, {
                            children:
                              'Certificate Authority Authentication (CAA) error',
                          }),
                          (0, r.jsxs)(k.X, {
                            children: [
                              'Please add a CAA record allowing "digicert.com" to issue certificates for',
                              ' ',
                              (0, r.jsx)('code', {
                                className: 'text-xs',
                                children: u.hostname,
                              }),
                              '. For example:',
                              ' ',
                              (0, r.jsx)('code', {
                                className: 'text-xs',
                                children: '0 issue "digicert.com"',
                              }),
                            ],
                          }),
                        ],
                      }),
                    'validation_timed_out' === u.ssl.status
                      ? (0, r.jsxs)(k.bZ, {
                          children: [
                            (0, r.jsx)(S.aN, {}),
                            (0, r.jsx)(k.Cd, {
                              children: 'Validation timed out',
                            }),
                            (0, r.jsx)(k.X, {
                              children:
                                'Please click "Verify" again to retry the validation of the records',
                            }),
                          ],
                        })
                      : (0, r.jsxs)('div', {
                          className: 'space-y-2',
                          children: [
                            (0, r.jsx)(eN, {
                              display:
                                null !== (i = u.ssl.txt_name) && void 0 !== i
                                  ? i
                                  : '',
                            }),
                            (null === (s = u.verification_errors) ||
                            void 0 === s
                              ? void 0
                              : s.includes(
                                  'custom hostname does not CNAME to this zone.'
                                )) &&
                              (0, r.jsx)(eg, {
                                type: 'CNAME',
                                name: u.hostname,
                                value:
                                  null !==
                                    (o =
                                      null == h
                                        ? void 0
                                        : null === (n = h.app_config) ||
                                            void 0 === n
                                          ? void 0
                                          : n.endpoint) && void 0 !== o
                                    ? o
                                    : 'Loading...',
                              }),
                            !N &&
                              'pending_validation' === u.ssl.status &&
                              (0, r.jsx)(eg, {
                                type: 'TXT',
                                name:
                                  null !== (c = u.ssl.txt_name) && void 0 !== c
                                    ? c
                                    : 'Loading...',
                                value:
                                  null !== (d = u.ssl.txt_value) && void 0 !== d
                                    ? d
                                    : 'Loading...',
                              }),
                            'pending_deployment' === u.ssl.status &&
                              (0, r.jsxs)('div', {
                                className:
                                  'flex items-center justify-center space-x-2 py-8',
                                children: [
                                  (0, r.jsx)($.Z, {
                                    size: 16,
                                    strokeWidth: 1.5,
                                  }),
                                  (0, r.jsx)('p', {
                                    className: 'text-sm text-foreground-light',
                                    children:
                                      'SSL certificate is being deployed. Please wait a few minutes and try again.',
                                  }),
                                ],
                              }),
                          ],
                        }),
                  ],
                }),
                (0, r.jsx)('div', { className: 'border-t border-muted' }),
                (0, r.jsx)(x.Z.Content, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CustomDomainVerify.tsx',
                  children: (0, r.jsxs)('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      (0, r.jsx)(ea.G, {
                        href: 'https://supabase.com/docs/guides/platform/custom-domains',
                        'data-sentry-element': 'DocsButton',
                        'data-sentry-source-file': 'CustomDomainVerify.tsx',
                      }),
                      (0, r.jsxs)('div', {
                        className: 'flex items-center space-x-2',
                        children: [
                          (0, r.jsx)(A.z, {
                            type: 'default',
                            onClick: C,
                            loading: g,
                            disabled: y || N,
                            className: 'self-end',
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'CustomDomainVerify.tsx',
                            children: 'Cancel',
                          }),
                          (0, r.jsx)(A.z, {
                            icon: (0, r.jsx)(ej.Z, {}),
                            onClick: w,
                            loading: !N && y,
                            disabled: g || y || N,
                            className: 'self-end',
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'CustomDomainVerify.tsx',
                            children: 'Verify',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
          eC = s(18648);
        async function ek(e) {
          let { projectRef: t, customDomain: s } = e,
            { data: r, error: n } = await (0, y.v_)(
              '/v1/projects/{ref}/custom-hostname/initialize',
              { params: { path: { ref: t } }, body: { custom_hostname: s } }
            );
          return (n && (0, y.S3)(n), r);
        }
        let eS = function () {
            let {
                onSuccess: e,
                onError: t,
                ...s
              } = arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
              r = (0, h.NL)();
            return (0, j.D)((e) => ek(e), {
              async onSuccess(t, s, n) {
                let { projectRef: a } = s;
                (await r.invalidateQueries(el.A.list(a)),
                  await (null == e ? void 0 : e(t, s, n)));
              },
              async onError(e, s, r) {
                void 0 === t
                  ? c.Am.error(
                      'Failed to create custom domain: '.concat(e.message)
                    )
                  : t(e, s, r);
              },
              ...s,
            });
          },
          eP = eC.object({
            domain: eC
              .string()
              .required('A value for your custom domain is required'),
          });
        var e_ = () => {
            var e;
            let { ref: t } = (0, ee.UO)(),
              { project: s } = (0, d.d2)(),
              { mutate: n, isLoading: i } = eo(),
              { mutate: o, isLoading: l } = eS(),
              { data: c } = (0, er.zR)({ projectRef: t }),
              x = 'custom-domains-form',
              p =
                null == c
                  ? void 0
                  : null === (e = c.app_config) || void 0 === e
                    ? void 0
                    : e.endpoint,
              h = (0, N.Xo)(a.KA.UPDATE, 'projects', {
                resource: { project_id: null == s ? void 0 : s.id },
              }),
              j = async (e) => {
                if (!t) return console.error('Project ref is required');
                n(
                  { domain: e.domain },
                  {
                    onSuccess: () => {
                      o({ projectRef: t, customDomain: e.domain });
                    },
                  }
                );
              };
            return (0, r.jsx)(P.Z, {
              id: x,
              initialValues: { domain: '' },
              validationSchema: eP,
              onSubmit: j,
              'data-sentry-element': 'Form',
              'data-sentry-component': 'CustomDomainsConfigureHostname',
              'data-sentry-source-file': 'CustomDomainsConfigureHostname.tsx',
              children: (e) => {
                let { handleReset: t, values: s, initialValues: n } = e,
                  a = JSON.stringify(s) !== JSON.stringify(n);
                return (0, r.jsx)(r.Fragment, {
                  children: (0, r.jsxs)(m.by, {
                    disabled: !h,
                    footer: (0, r.jsx)('div', {
                      className: 'flex py-4 px-8',
                      children: (0, r.jsx)(u.i, {
                        form: x,
                        isSubmitting: i || l,
                        submitText: 'Add',
                        hasChanges: a,
                        handleReset: t,
                        disabled: !1,
                        helper: h
                          ? (0, r.jsx)(ea.G, {
                              href: 'https://supabase.com/docs/guides/platform/custom-domains',
                            })
                          : "You need additional permissions to update your project's custom domain settings",
                      }),
                    }),
                    children: [
                      (0, r.jsx)(f.hj, {
                        header: (0, r.jsx)(f.S0, {
                          children: 'Add a custom domain',
                        }),
                        children: (0, r.jsx)(f.B4, {
                          loading: !1,
                          children: (0, r.jsx)(_.Z, {
                            id: 'domain',
                            disabled: !h || i || l,
                            className: 'w-full',
                            type: 'text',
                            name: 'domain',
                            placeholder: 'subdomain.example.com',
                          }),
                        }),
                      }),
                      (0, r.jsx)(f.hj, {
                        header: (0, r.jsx)(f.S0, {
                          children: 'Configure a CNAME record',
                        }),
                        children: (0, r.jsxs)('p', {
                          className:
                            'col-span-12 text-sm lg:col-span-7 leading-6',
                          children: [
                            'Set up a CNAME record for',
                            ' ',
                            s.domain
                              ? (0, r.jsx)('code', {
                                  className: 'text-xs',
                                  children: s.domain,
                                })
                              : 'your custom domain',
                            ' ',
                            'resolving to',
                            ' ',
                            p
                              ? (0, r.jsx)('code', {
                                  className: 'text-xs',
                                  children: p,
                                })
                              : "your project's API URL",
                            ' ',
                            "with as low a TTL as possible. If you're using Cloudflare as your DNS provider, disable the proxy option.",
                          ],
                        }),
                      }),
                    ],
                  }),
                });
              },
            });
          },
          eA = () =>
            (0, r.jsxs)('div', {
              className: 'grid grid-cols-12 gap-6 px-8 py-8',
              'data-sentry-component': 'CustomDomainsShimmerLoader',
              'data-sentry-source-file': 'CustomDomainsShimmerLoader.tsx',
              children: [
                (0, r.jsx)('div', {
                  className: 'col-span-12 lg:col-span-5',
                  children: (0, r.jsx)('div', {
                    className:
                      'h-6 w-1/3 bg-foreground-lighter rounded shimmering-loader',
                  }),
                }),
                (0, r.jsx)('div', {
                  className: 'col-span-12 lg:col-span-7',
                  children: (0, r.jsx)('div', {
                    className:
                      'h-[38px] w-full bg-foreground-lighter rounded shimmering-loader',
                  }),
                }),
              ],
            }),
          eD = () => {
            var e;
            let { ref: t } = (0, ee.UO)(),
              s = (0, w.l)(),
              n = (0, Y.P)('customDomainsDisabledDueToQuota'),
              { data: a } = (0, M.Gl)({ orgSlug: null == s ? void 0 : s.slug }),
              i =
                null == a
                  ? void 0
                  : null === (e = a.plan) || void 0 === e
                    ? void 0
                    : e.id,
              { isLoading: o } = (0, er.zR)({ projectRef: t }),
              {
                isLoading: c,
                isError: d,
                isSuccess: u,
                data: m,
              } = (0, en.z)(
                { projectRef: t },
                {
                  refetchInterval(e) {
                    var t;
                    return (
                      null != e &&
                      null !== (t = e.customDomain) &&
                      void 0 !== t &&
                      !!t.ssl.status &&
                      5e3
                    );
                  },
                }
              );
            return (0, r.jsxs)('section', {
              id: 'custom-domains',
              'data-sentry-component': 'CustomDomainConfig',
              'data-sentry-source-file': 'CustomDomainConfig.tsx',
              children: [
                (0, r.jsx)(et.p, {
                  title: 'Custom Domains',
                  description: 'Present a branded experience to your users',
                  'data-sentry-element': 'FormHeader',
                  'data-sentry-source-file': 'CustomDomainConfig.tsx',
                }),
                o || c
                  ? (0, r.jsx)(x.Z, {
                      children: (0, r.jsx)(x.Z.Content, {
                        className: 'space-y-6',
                        children: (0, r.jsx)(eA, {}),
                      }),
                    })
                  : d
                    ? (0, r.jsx)(x.Z, {
                        children: (0, r.jsx)(x.Z.Content, {
                          className: 'space-y-6',
                          children: (0, r.jsxs)('div', {
                            className:
                              'flex items-center justify-center space-x-2 py-8',
                            children: [
                              (0, r.jsx)($.Z, { size: 16, strokeWidth: 1.5 }),
                              (0, r.jsxs)('p', {
                                className: 'text-sm text-foreground-light',
                                children: [
                                  'Failed to retrieve custom domain configuration. Please try again later or',
                                  ' ',
                                  (0, r.jsx)(l(), {
                                    href: '/support/new?ref='.concat(
                                      t,
                                      '&category=sales'
                                    ),
                                    className: 'underline',
                                    children: 'contact support',
                                  }),
                                  '.',
                                ],
                              }),
                            ],
                          }),
                        }),
                      })
                    : (null == m ? void 0 : m.status) ===
                        '0_no_hostname_configured'
                      ? (0, r.jsx)(e_, {})
                      : (null == m ? void 0 : m.status) === '0_not_allowed'
                        ? (0, r.jsx)(es.Z, {
                            icon: (0, r.jsx)($.Z, {
                              size: 18,
                              strokeWidth: 1.5,
                            }),
                            primaryText: n
                              ? 'New custom domains are temporarily disabled'
                              : 'Custom domains are a Pro Plan add-on',
                            secondaryText: n
                              ? 'We are working with our upstream DNS provider before we are able to sign up new custom domains. Please check back in a few hours.'
                              : 'free' === i
                                ? 'To configure a custom domain for your project, please upgrade to the Pro Plan with the custom domains add-on selected'
                                : 'To configure a custom domain for your project, please enable the add-on',
                            addon: 'customDomain',
                            source: 'customDomain',
                            disabled: n,
                          })
                        : (0, r.jsx)(x.Z, {
                            children:
                              u &&
                              (0, r.jsxs)('div', {
                                className: 'flex flex-col',
                                children: [
                                  ('1_not_started' === m.status ||
                                    '2_initiated' === m.status ||
                                    '3_challenge_verified' === m.status) &&
                                    (0, r.jsx)(ew, {
                                      customDomain: m.customDomain,
                                    }),
                                  '4_origin_setup_completed' === m.status &&
                                    (0, r.jsx)(ef, {
                                      projectRef: t,
                                      customDomain: m.customDomain,
                                    }),
                                  '5_services_reconfigured' === m.status &&
                                    (0, r.jsx)(ep, {
                                      projectRef: t,
                                      customDomain: m.customDomain,
                                    }),
                                ],
                              }),
                          }),
              ],
            });
          },
          eT = s(29589),
          eZ = (e) => {
            let { type: t = 'danger' } = e,
              { project: s } = (0, d.d2)(),
              [n, i] = (0, L.useState)(!1),
              o = (0, N.Xo)(a.KA.UPDATE, 'projects', {
                resource: { project_id: null == s ? void 0 : s.id },
              });
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(R.u, {
                  type: t,
                  disabled: !o,
                  onClick: () => i(!0),
                  tooltip: {
                    content: {
                      side: 'bottom',
                      text: o
                        ? void 0
                        : 'You need additional permissions to delete this project',
                    },
                  },
                  'data-sentry-element': 'ButtonTooltip',
                  'data-sentry-source-file': 'DeleteProjectButton.tsx',
                  children: 'Delete project',
                }),
                (0, r.jsx)(eT.Z, {
                  visible: n,
                  onClose: () => i(!1),
                  'data-sentry-element': 'DeleteProjectModal',
                  'data-sentry-source-file': 'DeleteProjectButton.tsx',
                }),
              ],
            });
          },
          eL = s(41321),
          eR = () => {
            let e = (0, w.l)(),
              { project: t } = (0, d.d2)();
            return void 0 === t
              ? null
              : (0, r.jsxs)('section', {
                  id: 'delete-project',
                  'data-sentry-component': 'DeleteProjectPanel',
                  'data-sentry-source-file': 'DeleteProjectPanel.tsx',
                  children: [
                    (0, r.jsx)(et.p, {
                      title: 'Delete Project',
                      description: '',
                      'data-sentry-element': 'FormHeader',
                      'data-sentry-source-file': 'DeleteProjectPanel.tsx',
                    }),
                    (0, r.jsx)(x.Z, {
                      'data-sentry-element': 'Panel',
                      'data-sentry-source-file': 'DeleteProjectPanel.tsx',
                      children: (0, r.jsx)(x.Z.Content, {
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'DeleteProjectPanel.tsx',
                        children:
                          (null == e ? void 0 : e.managed_by) !==
                          'vercel-marketplace'
                            ? (0, r.jsxs)(k.bZ, {
                                variant: 'destructive',
                                children: [
                                  (0, r.jsx)(S.ku, {}),
                                  (0, r.jsx)(k.Cd, {
                                    children:
                                      'Deleting this project will also remove your database.',
                                  }),
                                  (0, r.jsx)(k.X, {
                                    children:
                                      'Make sure you have made a backup if you want to keep your data.',
                                  }),
                                  (0, r.jsx)('div', {
                                    className: 'mt-2',
                                    children: (0, r.jsx)(eZ, {}),
                                  }),
                                ],
                              })
                            : (0, r.jsx)(eL.Z, {
                                partner: 'vercel-marketplace',
                                resource: 'Projects',
                                cta: {
                                  installationId:
                                    null == e ? void 0 : e.partner_id,
                                  message:
                                    'Delete project in Vercel Marketplace',
                                },
                              }),
                      }),
                    }),
                  ],
                });
          },
          eF = s(5295),
          ez = s(34330),
          eE = s(87132),
          eM = s(29285),
          eB = s(89572),
          eI = s(37870);
        async function eO(e) {
          let { projectRef: t, targetOrganizationSlug: s } = e;
          if (!t) throw Error('projectRef is required');
          if (!s) throw Error('targetOrganizationSlug is required');
          let r = await (0, eI.v_)(
            ''.concat(B.T5, '/projects/').concat(t, '/transfer'),
            { target_organization_slug: s }
          );
          if (r.error) throw r.error;
          return r;
        }
        let eV = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => eO(e), {
            async onSuccess(t, s, n) {
              let { projectRef: a, targetOrganizationSlug: i } = s;
              (await Promise.all([
                r.invalidateQueries(v.i.projectTransferPreview(a, i)),
                r.invalidateQueries(v.i.detail(a)),
                r.invalidateQueries(v.i.list()),
              ]),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error('Failed to transfer project: '.concat(e.message))
                : t(e, s, r);
            },
            ...s,
          });
        };
        var eq = s(28894);
        async function eU(e, t) {
          let { projectRef: s, targetOrganizationSlug: r } = e;
          if (!s) throw Error('projectRef is required');
          if (!r) throw Error('targetOrganizationSlug is required');
          let n = await (0, eI.v_)(
            ''.concat(B.T5, '/projects/').concat(s, '/transfer/preview'),
            { target_organization_slug: r },
            { signal: t }
          );
          if (n.error) throw n.error;
          return n;
        }
        let eG = function (e) {
          let { projectRef: t, targetOrganizationSlug: s } = e,
            { enabled: r = !0, ...n } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, eq.a)(
            v.i.projectTransferPreview(t, s),
            (e) => {
              let { signal: r } = e;
              return eU({ projectRef: t, targetOrganizationSlug: s }, r);
            },
            {
              enabled: r && void 0 !== t && void 0 !== s,
              ...n,
              retry: (e, t) =>
                ('object' != typeof t ||
                  null === t ||
                  !('code' in t) ||
                  400 !== t.code) &&
                e < 3,
            }
          );
        };
        var eY = s(42155),
          eW = s(85818),
          eX = s(67923),
          eH = s(33526),
          eQ = () => {
            let e = (0, C.Vm)(),
              t = null == e ? void 0 : e.ref,
              s = null == e ? void 0 : e.organization_id,
              { data: n } = (0, eB.tl)(),
              i = (0, Y.P)('disableProjectTransfer'),
              o = (n || []).filter((e) => e.id !== s),
              [l, d] = (0, L.useState)(!1),
              [u, m] = (0, L.useState)(),
              {
                mutate: f,
                error: x,
                isLoading: p,
              } = eV({
                onSuccess: () => {
                  (c.Am.success(
                    'Successfully transferred project '.concat(
                      null == e ? void 0 : e.name,
                      '.'
                    )
                  ),
                    d(!1));
                },
              }),
              {
                data: h,
                error: j,
                isLoading: y,
                remove: v,
              } = eG(
                { projectRef: t, targetOrganizationSlug: u },
                { enabled: !p && l }
              );
            (0, L.useEffect)(() => {
              l ? m(void 0) : v();
            }, [l]);
            let g = (0, N.Xo)(a.KA.UPDATE, 'organizations'),
              b = () => {
                d(!l);
              };
            async function w() {
              void 0 !== e &&
                void 0 !== u &&
                f({ projectRef: t, targetOrganizationSlug: u });
            }
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(R.u, {
                  type: 'default',
                  onClick: b,
                  disabled: !g || i,
                  tooltip: {
                    content: {
                      side: 'bottom',
                      text: g
                        ? i
                          ? 'Project transfers are temporarily disabled, please try again later.'
                          : void 0
                        : 'You need additional permissions to transfer this project',
                    },
                  },
                  'data-sentry-element': 'ButtonTooltip',
                  'data-sentry-source-file': 'TransferProjectButton.tsx',
                  children: 'Transfer project',
                }),
                (0, r.jsxs)(eY.Z, {
                  onCancel: () => b(),
                  visible: l,
                  loading: p,
                  size: 'xlarge',
                  header: 'Transfer project '.concat(
                    null == e ? void 0 : e.name
                  ),
                  customFooter: (0, r.jsxs)('div', {
                    className: 'flex items-center space-x-2 justify-end',
                    children: [
                      (0, r.jsx)(A.z, {
                        type: 'default',
                        onClick: () => d(!1),
                        children: 'Cancel',
                      }),
                      (0, r.jsx)(A.z, {
                        onClick: () => w(),
                        disabled: !h || !h.valid || p || !u,
                        children: 'Transfer Project',
                      }),
                    ],
                  }),
                  'data-sentry-element': 'Modal',
                  'data-sentry-source-file': 'TransferProjectButton.tsx',
                  children: [
                    (0, r.jsxs)(eY.Z.Content, {
                      className: 'text-foreground-light',
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'TransferProjectButton.tsx',
                      children: [
                        (0, r.jsx)('p', {
                          className: 'text-sm',
                          children:
                            'To transfer projects, the owner must be a member of both the source and target organizations. Consider the following before transferring your project:',
                        }),
                        (0, r.jsxs)('ul', {
                          className: 'mt-4 space-y-5 text-sm',
                          children: [
                            (0, r.jsxs)('li', {
                              className: 'flex gap-4',
                              children: [
                                (0, r.jsx)('span', {
                                  className: 'shrink-0 mt-1',
                                  children: (0, r.jsx)(eF.Z, {
                                    'data-sentry-element': 'Loader',
                                    'data-sentry-source-file':
                                      'TransferProjectButton.tsx',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsx)('p', {
                                      className: 'font-bold',
                                      children: 'Possible downtime',
                                    }),
                                    (0, r.jsx)('p', {
                                      children:
                                        'There might be a short downtime when transferring projects from a paid to a free organization.',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsxs)('li', {
                              className: 'flex gap-4',
                              children: [
                                (0, r.jsx)('span', {
                                  className: 'shrink-0 mt-1',
                                  children: (0, r.jsx)(ez.Z, {
                                    'data-sentry-element': 'Shield',
                                    'data-sentry-source-file':
                                      'TransferProjectButton.tsx',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsx)('p', {
                                      className: 'font-bold',
                                      children: 'Permissions',
                                    }),
                                    (0, r.jsx)('p', {
                                      children:
                                        'Depending on your role in the target organization, your level of permissions may change after transfer.',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsxs)('li', {
                              className: 'flex gap-4',
                              children: [
                                (0, r.jsx)('span', {
                                  className: 'shrink-0 mt-1',
                                  children: (0, r.jsx)(eE.Z, {
                                    size: 24,
                                    className: 'flex-shrink-0',
                                    'data-sentry-element': 'Wrench',
                                    'data-sentry-source-file':
                                      'TransferProjectButton.tsx',
                                  }),
                                }),
                                (0, r.jsxs)('div', {
                                  children: [
                                    (0, r.jsx)('p', {
                                      className: 'font-bold',
                                      children: 'Features',
                                    }),
                                    (0, r.jsx)('p', {
                                      children:
                                        'Moving your project to an organization with a smaller subscription plan may result in the loss of certain features (i.e. image transformations).',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsx)(ea.G, {
                          abbrev: !1,
                          className: 'mt-6',
                          href: 'https://supabase.com/docs/guides/platform/project-transfer',
                          'data-sentry-element': 'DocsButton',
                          'data-sentry-source-file':
                            'TransferProjectButton.tsx',
                        }),
                      ],
                    }),
                    (0, r.jsx)(eY.Z.Separator, {
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'TransferProjectButton.tsx',
                    }),
                    (0, r.jsx)(eY.Z.Content, {
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'TransferProjectButton.tsx',
                      children:
                        o &&
                        (0, r.jsx)('div', {
                          className: 'space-y-2',
                          children:
                            0 === o.length
                              ? (0, r.jsxs)('div', {
                                  className:
                                    'flex items-center gap-3 bg-surface-200 p-3 text-sm rounded-md border',
                                  children: [
                                    (0, r.jsx)(S.sz, {}),
                                    ' You do not have any organizations you can transfer your project to.',
                                  ],
                                })
                              : (0, r.jsxs)(eW.Z, {
                                  label: 'Select Target Organization',
                                  layout: 'vertical',
                                  value: u,
                                  onChange: (e) => m(e),
                                  placeholder: 'Select Organization',
                                  children: [
                                    (0, r.jsx)(
                                      eW.Z.Option,
                                      {
                                        disabled: !0,
                                        label: 'Select Organization',
                                        value: '',
                                        children: 'Select Organization',
                                      },
                                      'no-results'
                                    ),
                                    o.map((e) =>
                                      (0, r.jsx)(
                                        eW.Z.Option,
                                        {
                                          label: e.name,
                                          value: e.slug,
                                          addOnBefore: () =>
                                            (0, r.jsx)(eM.Z, {}),
                                          children: e.name,
                                        },
                                        e.id
                                      )
                                    ),
                                  ],
                                }),
                        }),
                    }),
                    void 0 !== u &&
                      (0, r.jsx)(eX.Z, {
                        active: void 0 !== u && y,
                        children: (0, r.jsx)(eY.Z.Content, {
                          children: (0, r.jsxs)('div', {
                            className: 'space-y-2',
                            children: [
                              h &&
                                h.warnings.length > 0 &&
                                (0, r.jsx)(eH.J, {
                                  type: 'warning',
                                  title: 'Warnings for project transfer',
                                  className: 'mt-3',
                                  children: (0, r.jsx)('div', {
                                    className: 'space-y-1',
                                    children: h.warnings.map((e) =>
                                      (0, r.jsx)(
                                        'p',
                                        { children: e.message },
                                        e.key
                                      )
                                    ),
                                  }),
                                }),
                              h &&
                                h.errors.length > 0 &&
                                (0, r.jsxs)(eH.J, {
                                  type: 'danger',
                                  title: 'Project cannot be transferred',
                                  children: [
                                    (0, r.jsx)('div', {
                                      className: 'space-y-1',
                                      children: h.errors.map((e) =>
                                        (0, r.jsx)(
                                          'p',
                                          { children: e.message },
                                          e.key
                                        )
                                      ),
                                    }),
                                    h.members_exceeding_free_project_limit
                                      .length > 0 &&
                                      (0, r.jsxs)('div', {
                                        className: 'space-y-2',
                                        children: [
                                          (0, r.jsx)('p', {
                                            className:
                                              'text-sm text-foreground-light',
                                            children:
                                              'These members have reached their maximum limits for the number of active Free plan projects within organizations where they are an administrator or owner:',
                                          }),
                                          (0, r.jsx)('ul', {
                                            className:
                                              'pl-5 text-sm list-disc text-foreground-light',
                                            children: (
                                              h.members_exceeding_free_project_limit ||
                                              []
                                            ).map((e, t) =>
                                              (0, r.jsxs)(
                                                'li',
                                                {
                                                  children: [
                                                    e.name,
                                                    ' (Limit: ',
                                                    e.limit,
                                                    ' free projects)',
                                                  ],
                                                },
                                                'member-'.concat(t)
                                              )
                                            ),
                                          }),
                                          (0, r.jsx)('p', {
                                            className:
                                              'text-sm text-foreground-light',
                                            children:
                                              'These members will need to either delete, pause, or upgrade one or more of their projects before you can transfer this project.',
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              j &&
                                !x &&
                                (0, r.jsx)(eH.J, {
                                  type: 'danger',
                                  title: 'Project cannot be transferred',
                                  description: (0, r.jsx)(r.Fragment, {
                                    children: (0, r.jsx)('p', {
                                      children: j.message,
                                    }),
                                  }),
                                }),
                              x &&
                                (0, r.jsx)(eH.J, {
                                  type: 'danger',
                                  title: 'Project cannot be transferred',
                                  description: (0, r.jsx)(r.Fragment, {
                                    children: (0, r.jsx)('p', {
                                      children: x.message,
                                    }),
                                  }),
                                }),
                            ],
                          }),
                        }),
                      }),
                  ],
                }),
              ],
            });
          };
        let eK = (0, D.Z)('Truck', [
          [
            'path',
            {
              d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2',
              key: 'wrbu53',
            },
          ],
          ['path', { d: 'M15 18H9', key: '1lyqi6' }],
          [
            'path',
            {
              d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
              key: 'lysw3i',
            },
          ],
          ['circle', { cx: '17', cy: '18', r: '2', key: '332jqn' }],
          ['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
        ]);
        var eJ = () =>
            void 0 === (0, C.Vm)()
              ? (0, r.jsx)(r.Fragment, {})
              : (0, r.jsxs)('section', {
                  id: 'transfer-project',
                  'data-sentry-component': 'TransferProjectPanel',
                  'data-sentry-source-file': 'TransferProjectPanel.tsx',
                  children: [
                    (0, r.jsx)(et.p, {
                      title: 'Transfer Project',
                      description:
                        'Transfer your project to a different organization.',
                      'data-sentry-element': 'FormHeader',
                      'data-sentry-source-file': 'TransferProjectPanel.tsx',
                    }),
                    (0, r.jsx)(x.Z, {
                      'data-sentry-element': 'Panel',
                      'data-sentry-source-file': 'TransferProjectPanel.tsx',
                      children: (0, r.jsx)(x.Z.Content, {
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'TransferProjectPanel.tsx',
                        children: (0, r.jsxs)('div', {
                          className: 'flex justify-between items-center gap-8',
                          children: [
                            (0, r.jsxs)('div', {
                              className: 'flex space-x-4',
                              children: [
                                (0, r.jsx)(eK, {
                                  className: 'mt-1',
                                  'data-sentry-element': 'Truck',
                                  'data-sentry-source-file':
                                    'TransferProjectPanel.tsx',
                                }),
                                (0, r.jsxs)('div', {
                                  className: 'space-y-1 xl:max-w-lg',
                                  children: [
                                    (0, r.jsx)('p', {
                                      className: 'text-sm',
                                      children:
                                        'Transfer project to another organization',
                                    }),
                                    (0, r.jsx)('p', {
                                      className:
                                        'text-sm text-foreground-light',
                                      children:
                                        'To transfer projects, the owner must be a member of both the source and target organizations.',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, r.jsx)('div', {
                              children: (0, r.jsx)(eQ, {
                                'data-sentry-element': 'TransferProjectButton',
                                'data-sentry-source-file':
                                  'TransferProjectPanel.tsx',
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
          e$ = s(5529),
          e0 = s(47365),
          e1 = s(59141);
        async function e2(e) {
          let { projectRef: t, isSensitive: s } = e;
          if (!t) throw Error('projectRef is required');
          let { data: r, error: n } = await (0, y.r$)(
            '/platform/projects/{ref}/settings/sensitivity',
            { params: { path: { ref: t } }, body: { is_sensitive: s } }
          );
          return (n && (0, y.S3)(n), r);
        }
        let e4 = function () {
          let {
              onSuccess: e,
              onError: t,
              ...s
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = (0, h.NL)();
          return (0, j.D)((e) => e2(e), {
            async onSuccess(t, s, n) {
              let { projectRef: a } = s;
              (await r.invalidateQueries(e1.U.settingsV2(a)),
                await (null == e ? void 0 : e(t, s, n)));
            },
            async onError(e, s, r) {
              void 0 === t
                ? c.Am.error(
                    'Failed to update project compliance configuration: '.concat(
                      e.message
                    )
                  )
                : t(e, s, r);
            },
            ...s,
          });
        };
        var e5 = s(62210),
          e3 = () => {
            let { ref: e } = (0, ee.UO)(),
              { project: t } = (0, d.d2)(),
              [s, n] = (0, L.useState)(!1),
              i = (0, N.Xo)(a.KA.UPDATE, 'projects', {
                resource: { project_id: null == t ? void 0 : t.id },
              }),
              {
                data: o,
                error: l,
                isError: u,
                isLoading: x,
                isSuccess: p,
              } = (0, er.zR)({ projectRef: e }),
              h = (null == o ? void 0 : o.is_sensitive) || !1,
              { mutate: j, isLoading: y } = e4({
                onSuccess: () => {
                  c.Am.success(
                    'Successfully updated project compliance configuration'
                  );
                },
                onError: (e) => {
                  (n(h),
                    c.Am.error(
                      'Failed to update project compliance configuration: '.concat(
                        e.message
                      )
                    ));
                },
              }),
              v = async () => {
                if (!e) return console.error('Project ref is required');
                (n(!s), j({ projectRef: e, isSensitive: !s }));
              };
            return (
              (0, L.useEffect)(() => {
                x || n(h);
              }, [x]),
              (0, r.jsxs)('div', {
                id: 'compliance-configuration',
                'data-sentry-component': 'ComplianceConfig',
                'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                children: [
                  (0, r.jsxs)('div', {
                    className: 'flex items-center justify-between mb-6',
                    children: [
                      (0, r.jsx)(et.p, {
                        className: 'mb-0',
                        title: 'High Compliance Configuration',
                        description:
                          'For projects storing and processing sensitive data (HIPAA)',
                        'data-sentry-element': 'FormHeader',
                        'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                      }),
                      (0, r.jsx)(ea.G, {
                        href: 'https://supabase.com/docs/guides/platform/hipaa-projects',
                        'data-sentry-element': 'DocsButton',
                        'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                      }),
                    ],
                  }),
                  (0, r.jsx)(m.by, {
                    'data-sentry-element': 'FormPanel',
                    'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                    children: (0, r.jsx)(f.hj, {
                      header: (0, r.jsx)(f.S0, {
                        className: 'lg:col-span-9',
                        description: (0, r.jsxs)('p', {
                          className: 'text-sm text-foreground-light',
                          children: [
                            'Enable security warnings in the',
                            ' ',
                            (0, r.jsx)(e0.U, {
                              href: '/project/'.concat(e, '/advisors/security'),
                              children: 'Security Advisor',
                            }),
                            ' ',
                            'to enforce requirements for managing sensitive data',
                          ],
                        }),
                        children:
                          'Apply additional compliance controls to project',
                      }),
                      'data-sentry-element': 'FormSection',
                      'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                      children: (0, r.jsx)(f.B4, {
                        loading: !1,
                        className: 'lg:!col-span-3',
                        'data-sentry-element': 'FormSectionContent',
                        'data-sentry-source-file': 'ProjectComplianceMode.tsx',
                        children: (0, r.jsxs)('div', {
                          className:
                            'flex items-center justify-end mt-2.5 space-x-2',
                          children: [
                            (x || y) &&
                              (0, r.jsx)(eb.Z, {
                                className: 'animate-spin',
                                strokeWidth: 1.5,
                                size: 16,
                              }),
                            u &&
                              (0, r.jsx)(e$.Z, {
                                error: l,
                                subject: 'Failed to retrieve project settings',
                              }),
                            p &&
                              (0, r.jsxs)(W.u, {
                                children: [
                                  (0, r.jsx)(W.aJ, {
                                    asChild: !0,
                                    children: (0, r.jsx)('div', {
                                      children: (0, r.jsx)(e5.r, {
                                        size: 'large',
                                        checked: s,
                                        disabled: x || y || !i,
                                        onCheckedChange: v,
                                      }),
                                    }),
                                  }),
                                  !i &&
                                    (0, r.jsx)(W._v, {
                                      side: 'bottom',
                                      className: 'w-64 text-center',
                                      children:
                                        'You need additional permissions to update the compliance configuration for your project',
                                    }),
                                ],
                              }),
                          ],
                        }),
                      }),
                    }),
                  }),
                ],
              })
            );
          },
          e9 = s(95767),
          e6 = s(19697),
          e8 = s(78066),
          e7 = s(71147);
        let te = () => {
          let { project: e } = (0, d.d2)(),
            t = (0, w.l)(),
            s = !!(null == e ? void 0 : e.parent_project_ref),
            { projectsTransfer: a } = (0, e7.N)(['projects:transfer']),
            { data: i } = (0, M.Gl)({ orgSlug: null == t ? void 0 : t.slug }),
            o = (0, n.$w)(i);
          return (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)(e8._S, {
                'data-sentry-element': 'ScaffoldContainer',
                'data-sentry-source-file': 'general.tsx',
                children: (0, r.jsx)(e8.tU, {
                  'data-sentry-element': 'ScaffoldHeader',
                  'data-sentry-source-file': 'general.tsx',
                  children: (0, r.jsx)(e8.q7, {
                    'data-sentry-element': 'ScaffoldTitle',
                    'data-sentry-source-file': 'general.tsx',
                    children: 'Project Settings',
                  }),
                }),
              }),
              (0, r.jsxs)(e8._S, {
                className: 'flex flex-col gap-10',
                bottomPadding: !0,
                'data-sentry-element': 'ScaffoldContainer',
                'data-sentry-source-file': 'general.tsx',
                children: [
                  (0, r.jsx)(J, {
                    'data-sentry-element': 'General',
                    'data-sentry-source-file': 'general.tsx',
                  }),
                  s
                    ? null
                    : (0, r.jsxs)(r.Fragment, {
                        children: [
                          o && (0, r.jsx)(e3, {}),
                          (0, r.jsx)(eD, {}),
                          a && (0, r.jsx)(eJ, {}),
                          (0, r.jsx)(eR, {}),
                        ],
                      }),
                ],
              }),
            ],
          });
        };
        te.getLayout = (e) =>
          (0, r.jsx)(e9.Z, {
            children: (0, r.jsx)(e6.Z, { title: 'General', children: e }),
          });
        var tt = te;
      },
      32472: function (e, t, s) {
        'use strict';
        var r = s(97458),
          n = s(52983),
          a = s(42155),
          i = s(19540),
          o = s(90839);
        t.Z = (e) => {
          let {
            visible: t = !1,
            danger: s = !1,
            title: l = '',
            description: c = '',
            size: d = 'small',
            buttonLabel: u = '',
            buttonLoadingLabel: m = '',
            onSelectCancel: f = () => {},
            onSelectConfirm: x = () => {},
          } = e;
          (0, n.useEffect)(() => {
            t && h(!1);
          }, [t]);
          let [p, h] = (0, n.useState)(!1),
            j = () => {
              (h(!0), x());
            };
          return (0, r.jsx)(a.Z, {
            header: l,
            visible: t,
            title: l,
            description: c,
            size: d,
            hideFooter: !0,
            onCancel: f,
            'data-sentry-element': 'Modal',
            'data-sentry-component': 'ConfirmModal',
            'data-sentry-source-file': 'ConfirmDialog.tsx',
            children: (0, r.jsx)(i.Z, {
              initialValues: {},
              validateOnBlur: !0,
              onSubmit: () => j(),
              validate: () => [],
              'data-sentry-element': 'Form',
              'data-sentry-source-file': 'ConfirmDialog.tsx',
              children: () =>
                (0, r.jsx)(r.Fragment, {
                  children: (0, r.jsx)(a.Z.Content, {
                    children: (0, r.jsxs)('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        (0, r.jsx)(o.z, {
                          block: !0,
                          htmlType: 'button',
                          type: 'default',
                          onClick: f,
                          disabled: p,
                          children: 'Cancel',
                        }),
                        (0, r.jsx)(o.z, {
                          htmlType: 'submit',
                          block: !0,
                          type: s ? 'danger' : 'primary',
                          disabled: p,
                          loading: p,
                          children: m && p ? m : u || 'Confirm',
                        }),
                      ],
                    }),
                  }),
                }),
            }),
          });
        };
      },
      19540: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return l;
          },
        });
        var r = s(97458),
          n = s(52983),
          a = s(68985),
          i = s(11499);
        function o(e, t) {
          if (!t.error) return (delete e[t.key], e);
          if (t) return { ...e, [t.key]: t.error };
          throw Error();
        }
        function l(e) {
          let { validate: t, ...s } = e,
            [l, c] = (0, n.useReducer)(o, null),
            d = (0, a.TA)({
              validateOnBlur: !0,
              ...s,
              validationSchema: s.validationSchema,
              initialValues: s.initialValues,
              onSubmit: s.onSubmit,
              validate:
                t ||
                function () {
                  return l;
                },
            });
          return (0, r.jsx)('form', {
            id: s.id,
            name: s.name,
            onSubmit: d.handleSubmit,
            className: s.className,
            style: s.style,
            method: 'POST',
            'data-sentry-component': 'Form',
            'data-sentry-source-file': 'Form.tsx',
            children: (0, r.jsx)(i.o, {
              values: d.values,
              errors: d.errors,
              formContextOnChange: d.handleChange,
              handleBlur: d.handleBlur,
              touched: d.touched,
              fieldLevelValidation: function (e, t) {
                c({ key: e, error: t });
              },
              'data-sentry-element': 'FormContextProvider',
              'data-sentry-source-file': 'Form.tsx',
              children: s.children({
                errors: d.errors,
                touched: d.touched,
                isSubmitting: d.isSubmitting,
                isValidating: d.isValidating,
                submitCount: d.submitCount,
                initialValues: d.initialValues,
                values: d.values,
                handleReset: d.handleReset,
                resetForm: d.resetForm,
                setFieldValue: d.setFieldValue,
              }),
            }),
          });
        }
      },
      85818: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return j;
          },
        });
        var r = s(97458),
          n = s(44809),
          a = s(62923),
          i = s.n(a),
          o = s(52983),
          l = s(68249),
          c = s(51487),
          d = s(16720),
          u = s(25843),
          m = s(65092),
          f = s(11499);
        let x = (0, o.createContext)({ onChange: (e) => {}, selected: void 0 });
        var p = s(62507);
        function h(e) {
          let {
              children: t,
              className: s,
              buttonClassName: a,
              descriptionText: p,
              error: h,
              icon: j,
              id: y = '',
              name: v = '',
              label: g,
              labelOptional: b,
              layout: N,
              value: w,
              onChange: C,
              onFocus: k,
              onBlur: S,
              style: P,
              size: _ = 'medium',
              defaultValue: A,
              validation: D,
              disabled: T,
              optionsWidth: Z,
            } = e,
            [L, R] = (0, o.useState)(void 0),
            [F, z] = (0, o.useState)({}),
            E = (0, u.Z)('listbox'),
            M = (0, o.useRef)(null),
            {
              formContextOnChange: B,
              values: I,
              errors: O,
              handleBlur: V,
              touched: q,
              fieldLevelValidation: U,
            } = (0, f.G)();
          (I && !w && ((w = I[y || v]), (A = I[y || v])),
            h ||
              (O && !h && (h = O[y || v]), (h = q && q[y || v] ? h : void 0)),
            (0, o.useEffect)(() => {
              void 0 !== w && R(w);
            }, [w]),
            (0, o.useEffect)(() => {
              function e() {
                var e;
                document.documentElement.style.setProperty(
                  '--width-listbox',
                  ''.concat(
                    Z ||
                      (null === (e = M.current) || void 0 === e
                        ? void 0
                        : e.offsetWidth),
                    'px'
                  )
                );
              }
              return (
                window.addEventListener('resize', e),
                e(),
                () => window.removeEventListener('resize', e)
              );
            }, []),
            (0, o.useEffect)(() => {
              var e;
              let s = i()(t);
              function r(e) {
                return s.find((t) => t.props.value === e);
              }
              if (w) {
                R(w);
                let e = r(w);
                z((null == e ? void 0 : e.props) ? e.props : void 0);
                return;
              }
              if (L) {
                let e = r(L);
                z((null == e ? void 0 : e.props) ? e.props : void 0);
                return;
              }
              if (A) {
                R(A);
                let e = r(L);
                z((null == e ? void 0 : e.props) ? e.props : void 0);
                return;
              }
              z(null === (e = s[0]) || void 0 === e ? void 0 : e.props);
            }, [L]));
          let G = [E.container, E.base, a],
            Y = [E.addOnBefore];
          return (
            h && G.push(E.variants.error),
            h || G.push(E.variants.standard),
            j && Y.push(E.with_icon),
            _ && G.push(E.size[_]),
            T && G.push(E.disabled),
            (0, r.jsx)(l.l, {
              label: g,
              labelOptional: b,
              layout: N,
              id: y,
              error: h,
              descriptionText: p,
              className: s,
              style: P,
              size: _,
              'data-sentry-element': 'FormLayout',
              'data-sentry-component': 'Listbox',
              'data-sentry-source-file': 'Listbox2.tsx',
              children: (0, r.jsxs)(n.fC, {
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Listbox2.tsx',
                children: [
                  (0, r.jsx)(n.xz, {
                    asChild: !0,
                    disabled: T,
                    'data-sentry-element': 'unknown',
                    'data-sentry-source-file': 'Listbox2.tsx',
                    children: (0, r.jsxs)('button', {
                      'data-size': _,
                      ref: M,
                      className: (0, m.cn)(G),
                      onBlur: function (e) {
                        (V && V(e), S && S(e));
                      },
                      onFocus: k,
                      name: v,
                      id: y,
                      children: [
                        (0, r.jsxs)('span', {
                          className: (0, m.cn)(Y),
                          children: [
                            j && (0, r.jsx)(d.Z, { size: _, icon: j }),
                            (null == F ? void 0 : F.addOnBefore) &&
                              (0, r.jsx)(F.addOnBefore, {}),
                            (0, r.jsx)('span', {
                              className: E.label,
                              children: null == F ? void 0 : F.label,
                            }),
                          ],
                        }),
                        (0, r.jsx)('span', {
                          className: E.chevron_container,
                          children: (0, r.jsx)('svg', {
                            className: E.chevron,
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 20 20',
                            fill: 'currentColor',
                            'aria-hidden': 'true',
                            'data-sentry-element': 'svg',
                            'data-sentry-source-file': 'Listbox2.tsx',
                            children: (0, r.jsx)('path', {
                              fillRule: 'evenodd',
                              d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
                              clipRule: 'evenodd',
                              'data-sentry-element': 'path',
                              'data-sentry-source-file': 'Listbox2.tsx',
                            }),
                          }),
                        }),
                        h &&
                          (0, r.jsx)('div', {
                            className: E.actions_container,
                            children: h && (0, r.jsx)(c.Z, { size: _ }),
                          }),
                      ],
                    }),
                  }),
                  (0, r.jsx)(n.VY, {
                    sideOffset: 6,
                    loop: !0,
                    side: 'bottom',
                    align: 'center',
                    className: E.options_container,
                    'data-sentry-element': 'unknown',
                    'data-sentry-source-file': 'Listbox2.tsx',
                    children: (0, r.jsx)('div', {
                      children: (0, r.jsx)(x.Provider, {
                        value: {
                          onChange: function (e) {
                            (C && C(e), R(e));
                            let t = {};
                            ((t.target = {
                              type: 'select',
                              name: v,
                              id: y,
                              value: e,
                              checked: void 0,
                            }),
                              B && B(t),
                              D && U(y, D(e)));
                          },
                          selected: L,
                        },
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'Listbox2.tsx',
                        children: t,
                      }),
                    }),
                  }),
                ],
              }),
            })
          );
        }
        h.Option = function (e) {
          let {
              id: t,
              value: s,
              label: a,
              disabled: i = !1,
              children: o,
              className: l = '',
              addOnBefore: c,
            } = e,
            d = (0, u.Z)('listbox');
          return (0, r.jsx)(x.Consumer, {
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'SelectOption',
            'data-sentry-source-file': 'Listbox2.tsx',
            children: (e) => {
              let { onChange: a, selected: u } = e,
                f = u === s;
              return (0, r.jsxs)(
                n.ck,
                {
                  className: (0, m.cn)(
                    d.option,
                    f ? d.option_active : ' ',
                    i ? d.option_disabled : ' ',
                    l
                  ),
                  onSelect: () => (i ? {} : a(s)),
                  children: [
                    (0, r.jsxs)('div', {
                      className: d.option_inner,
                      children: [
                        c && c({ active: f, selected: u }),
                        (0, r.jsx)('span', {
                          children:
                            'function' == typeof o
                              ? o({ active: f, selected: u })
                              : o,
                        }),
                      ],
                    }),
                    f
                      ? (0, r.jsx)('span', {
                          className: (0, m.cn)(
                            d.option_check,
                            f ? d.option_check_active : ''
                          ),
                          children: (0, r.jsx)(p.Z, {
                            className: d.option_check_icon,
                            'aria-hidden': 'true',
                          }),
                        })
                      : null,
                  ],
                },
                t
              );
            },
          });
        };
        var j = h;
      },
      94059: function (e, t, s) {
        'use strict';
        s.d(t, {
          ZP: function () {
            return m;
          },
        });
        var r = s(97458),
          n = s(52983),
          a = s(25843),
          i = s(65092);
        function o(e) {
          let { children: t, className: s, tag: n = 'div', style: a } = e;
          return (0, r.jsx)(''.concat(n), {
            style: a,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Typography',
            'data-sentry-source-file': 'Typography.tsx',
            children: t,
          });
        }
        ((o.Title = function (e) {
          let { className: t, level: s = 1, children: n, style: a } = e;
          return (0, r.jsx)('h'.concat(s), {
            style: a,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Title',
            'data-sentry-source-file': 'Title.tsx',
            children: n,
          });
        }),
          (o.Text = function (e) {
            let {
              className: t,
              children: s,
              style: n,
              type: a,
              disabled: i,
              mark: o,
              code: l,
              keyboard: c,
              underline: d,
              strikethrough: u,
              strong: m,
              small: f,
            } = e;
            return l
              ? (0, r.jsx)('code', { style: n, children: s })
              : o
                ? (0, r.jsx)('mark', { style: n, children: s })
                : c
                  ? (0, r.jsx)('kbd', { style: n, children: s })
                  : m
                    ? (0, r.jsx)('strong', { style: n, children: s })
                    : (0, r.jsx)('span', {
                        style: n,
                        'data-sentry-component': 'Text',
                        'data-sentry-source-file': 'Text.tsx',
                        children: s,
                      });
          }),
          (o.Link = function (e) {
            let {
              children: t,
              target: s = '_blank',
              href: n,
              className: a,
              onClick: i,
              style: o,
            } = e;
            return (0, r.jsx)('a', {
              onClick: i,
              href: n,
              target: s,
              rel: 'noopener noreferrer',
              style: o,
              'data-sentry-component': 'Link',
              'data-sentry-source-file': 'Link.tsx',
              children: t,
            });
          }));
        let l = (0, n.createContext)({ type: 'text' }),
          c = (e) => {
            let { type: t } = e;
            return (0, r.jsx)(l.Provider, {
              value: { type: t },
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'MenuContextProvider',
              'data-sentry-source-file': 'MenuContext.tsx',
              children: e.children,
            });
          },
          d = () => {
            let e = (0, n.useContext)(l);
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
            ulClassName: n,
            style: a,
            type: i = 'text',
          } = e;
          return (0, r.jsx)('nav', {
            role: 'menu',
            'aria-label': 'Sidebar',
            'aria-orientation': 'vertical',
            'aria-labelledby': 'options-menu',
            className: s,
            style: a,
            'data-sentry-component': 'Menu',
            'data-sentry-source-file': 'Menu.tsx',
            children: (0, r.jsx)(c, {
              type: i,
              'data-sentry-element': 'MenuContextProvider',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, r.jsx)('ul', { className: n, children: t }),
            }),
          });
        }
        ((u.Item = function (e) {
          let {
              children: t,
              icon: s,
              active: n,
              rounded: o,
              onClick: l,
              doNotCloseOverlay: c = !1,
              showActiveBar: u = !1,
              style: m,
            } = e,
            f = (0, a.Z)('menu'),
            { type: x } = d(),
            p = [f.item.base];
          (p.push(f.item.variants[x].base),
            n
              ? p.push(f.item.variants[x].active)
              : p.push(f.item.variants[x].normal));
          let h = [f.item.content.base];
          n ? h.push(f.item.content.active) : h.push(f.item.content.normal);
          let j = [f.item.icon.base];
          return (
            n ? j.push(f.item.icon.active) : j.push(f.item.icon.normal),
            (0, r.jsxs)('li', {
              role: 'menuitem',
              className: (0, i.cn)('outline-none', p),
              style: m,
              onClick: l,
              'aria-current': n ? 'page' : void 0,
              'data-sentry-component': 'Item',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                s &&
                  (0, r.jsx)('div', {
                    className: ''.concat(j.join(' '), ' min-w-fit'),
                    children: s,
                  }),
                (0, r.jsx)('span', { className: h.join(' '), children: t }),
              ],
            })
          );
        }),
          (u.Group = function (e) {
            let { children: t, icon: s, title: n } = e,
              i = (0, a.Z)('menu'),
              { type: o } = d();
            return (0, r.jsxs)('div', {
              className: [i.group.base, i.group.variants[o]].join(' '),
              'data-sentry-component': 'Group',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                s &&
                  (0, r.jsx)('span', { className: i.group.icon, children: s }),
                (0, r.jsx)('span', { className: i.group.content, children: n }),
                t,
              ],
            });
          }),
          (u.Misc = function (e) {
            let { children: t } = e;
            return (0, r.jsx)('div', {
              'data-sentry-component': 'Misc',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, r.jsx)(o.Text, {
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Menu.tsx',
                children: (0, r.jsx)('span', { children: t }),
              }),
            });
          }));
        var m = u;
      },
      62210: function (e, t, s) {
        'use strict';
        s.d(t, {
          r: function () {
            return d;
          },
        });
        var r = s(97458),
          n = s(56384),
          a = s(31706),
          i = s(52983),
          o = s(65092);
        let l = (0, a.j)(
            'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand data-[state=checked]:bg-brand-600/90 data-[state=unchecked]:bg-control data-[state=unchecked]:bg-border',
            {
              variants: {
                size: {
                  small: 'h-[16px] w-[28px]',
                  medium: 'h-[20px] w-[34px]',
                  large: 'h-[24px] w-[44px]',
                },
              },
              defaultVariants: { size: 'medium' },
            }
          ),
          c = (0, a.j)(
            'pointer-events-none block rounded-full bg-foreground-lighter data-[state=checked]:bg-white shadow-lg ring-0 transition-transform',
            {
              variants: {
                size: {
                  small:
                    'h-[12px] w-[12px] data-[state=checked]:translate-x-[13px] data-[state=unchecked]:translate-x-[1px]',
                  medium:
                    'h-[16px] w-[16px] data-[state=checked]:translate-x-[15px] data-[state=unchecked]:translate-x-[1px]',
                  large:
                    'h-[18px] w-[18px] data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[3px]',
                },
              },
              defaultVariants: { size: 'medium' },
            }
          ),
          d = i.forwardRef((e, t) => {
            let { className: s, size: a, ...i } = e;
            return (0, r.jsx)(n.fC, {
              className: (0, o.cn)(l({ size: a }), s),
              ...i,
              ref: t,
              children: (0, r.jsx)(n.bU, {
                className: (0, o.cn)(c({ size: a })),
              }),
            });
          });
        d.displayName = n.fC.displayName;
      },
      56384: function (e, t, s) {
        'use strict';
        s.d(t, {
          bU: function () {
            return N;
          },
          fC: function () {
            return b;
          },
        });
        var r = s(83573),
          n = s(52983),
          a = s(12527),
          i = s(61031),
          o = s(95831),
          l = s(29650),
          c = s(87178),
          d = s(56807),
          u = s(36986);
        let m = 'Switch',
          [f, x] = (0, o.b)(m),
          [p, h] = f(m),
          j = (0, n.forwardRef)((e, t) => {
            let {
                __scopeSwitch: s,
                name: o,
                checked: c,
                defaultChecked: d,
                required: m,
                disabled: f,
                value: x = 'on',
                onCheckedChange: h,
                ...j
              } = e,
              [y, b] = (0, n.useState)(null),
              N = (0, i.e)(t, (e) => b(e)),
              w = (0, n.useRef)(!1),
              C = !y || !!y.closest('form'),
              [k = !1, S] = (0, l.T)({ prop: c, defaultProp: d, onChange: h });
            return (0, n.createElement)(
              p,
              { scope: s, checked: k, disabled: f },
              (0, n.createElement)(
                u.WV.button,
                (0, r.Z)(
                  {
                    type: 'button',
                    role: 'switch',
                    'aria-checked': k,
                    'aria-required': m,
                    'data-state': g(k),
                    'data-disabled': f ? '' : void 0,
                    disabled: f,
                    value: x,
                  },
                  j,
                  {
                    ref: N,
                    onClick: (0, a.M)(e.onClick, (e) => {
                      (S((e) => !e),
                        C &&
                          ((w.current = e.isPropagationStopped()),
                          w.current || e.stopPropagation()));
                    }),
                  }
                )
              ),
              C &&
                (0, n.createElement)(v, {
                  control: y,
                  bubbles: !w.current,
                  name: o,
                  value: x,
                  checked: k,
                  required: m,
                  disabled: f,
                  style: { transform: 'translateX(-100%)' },
                })
            );
          }),
          y = (0, n.forwardRef)((e, t) => {
            let { __scopeSwitch: s, ...a } = e,
              i = h('SwitchThumb', s);
            return (0, n.createElement)(
              u.WV.span,
              (0, r.Z)(
                {
                  'data-state': g(i.checked),
                  'data-disabled': i.disabled ? '' : void 0,
                },
                a,
                { ref: t }
              )
            );
          }),
          v = (e) => {
            let { control: t, checked: s, bubbles: a = !0, ...i } = e,
              o = (0, n.useRef)(null),
              l = (0, c.D)(s),
              u = (0, d.t)(t);
            return (
              (0, n.useEffect)(() => {
                let e = o.current,
                  t = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'checked'
                  ).set;
                if (l !== s && t) {
                  let r = new Event('click', { bubbles: a });
                  (t.call(e, s), e.dispatchEvent(r));
                }
              }, [l, s, a]),
              (0, n.createElement)(
                'input',
                (0, r.Z)(
                  { type: 'checkbox', 'aria-hidden': !0, defaultChecked: s },
                  i,
                  {
                    tabIndex: -1,
                    ref: o,
                    style: {
                      ...e.style,
                      ...u,
                      position: 'absolute',
                      pointerEvents: 'none',
                      opacity: 0,
                      margin: 0,
                    },
                  }
                )
              )
            );
          };
        function g(e) {
          return e ? 'checked' : 'unchecked';
        }
        let b = j,
          N = y;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          5518, 2549, 1379, 272, 3861, 2728, 245, 5767, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 11177));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
