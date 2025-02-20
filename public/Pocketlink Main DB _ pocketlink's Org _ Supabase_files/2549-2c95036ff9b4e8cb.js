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
      (e._sentryDebugIds[t] = '12a31d83-e67d-4831-8ec3-a811489bb027'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-12a31d83-e67d-4831-8ec3-a811489bb027'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2549],
    {
      30320: function (e, t, n) {
        'use strict';
        n.d(t, {
          S: function () {
            return s;
          },
          V: function () {
            return i;
          },
        });
        var r = n(28894),
          a = n(52525),
          o = n(17329);
        async function s() {
          let { error: e, data: t } =
            await a.I8.mfa.getAuthenticatorAssuranceLevel();
          if (e) throw e;
          return t;
        }
        let i = function () {
          let { enabled: e = !0, ...t } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (0, r.a)(o.c.aaLevel(), () => s(), { staleTime: 18e5, ...t });
        };
      },
      78596: function (e, t, n) {
        'use strict';
        n.d(t, {
          U: function () {
            return r;
          },
        });
        let r = {
          orgSubscription: (e) => ['organizations', e, 'subscription'],
          orgPlans: (e) => ['organizations', e, 'plans'],
          addons: (e) => ['projects', e, 'addons'],
        };
      },
      69951: function (e, t, n) {
        'use strict';
        n.d(t, {
          Gl: function () {
            return d;
          },
          Tt: function () {
            return c;
          },
        });
        var r = n(198),
          a = n(28894),
          o = n(6464),
          s = n(90817),
          i = n(78596);
        async function l(e, t) {
          let { orgSlug: n } = e;
          if (!n) throw Error('orgSlug is required');
          let { error: r, data: a } = await (0, o.U2)(
            '/platform/organizations/{slug}/billing/subscription',
            { params: { path: { slug: n } }, signal: t }
          );
          return (r && (0, o.S3)(r), a);
        }
        let d = function (e) {
            let { orgSlug: t } = e,
              { enabled: n = !0, ...o } =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              d = (0, s.Xo)(r.KA.BILLING_READ, 'stripe.subscriptions');
            return (0, a.a)(
              i.U.orgSubscription(t),
              (e) => {
                let { signal: n } = e;
                return l({ orgSlug: t }, n);
              },
              { enabled: n && d && void 0 !== t, ...o }
            );
          },
          c = (e) => {
            let { data: t } = d({ orgSlug: e });
            return (null == t ? void 0 : t.plan.id) === 'enterprise';
          };
      },
      90817: function (e, t, n) {
        'use strict';
        n.d(t, {
          CD: function () {
            return y;
          },
          G8: function () {
            return m;
          },
          N4: function () {
            return v;
          },
          Rc: function () {
            return x;
          },
          Xo: function () {
            return g;
          },
        });
        var r = n(12436),
          a = n(53660),
          o = n.n(a),
          s = n(89572),
          i = n(62715),
          l = n(37756),
          d = n(75541),
          c = n(62432),
          u = n(80108);
        let f = (e) =>
          '^'.concat(e.replace('.', '\\.').replace('%', '.*'), '$');
        function p(e, t) {
          return (
            !e
              .filter((e) => e.restrictive)
              .some((e) => {
                let { condition: n } = e;
                return null === n || o().apply(n, t);
              }) &&
            e
              .filter((e) => !e.restrictive)
              .some((e) => {
                let { condition: n } = e;
                return null === n || o().apply(n, t);
              })
          );
        }
        function m(e, t, n, r, a, o) {
          if (!e || !Array.isArray(e)) return !1;
          if (o) {
            let s = e.filter((e) => {
              var r;
              return (
                e.organization_slug === a &&
                e.actions.some((e) => (t ? t.match(f(e)) : null)) &&
                e.resources.some((e) => n.match(f(e))) &&
                (null === (r = e.project_refs) || void 0 === r
                  ? void 0
                  : r.includes(o))
              );
            });
            if (s.length > 0) return p(s, { resource_name: n, ...r });
          }
          return p(
            e
              .filter((e) => !e.project_refs || 0 === e.project_refs.length)
              .filter(
                (e) =>
                  e.organization_slug === a &&
                  e.actions.some((e) => (t ? t.match(f(e)) : null)) &&
                  e.resources.some((e) => n.match(f(e)))
              ),
            { resource_name: n, ...r }
          );
        }
        function x(e, t) {
          let n =
            !(arguments.length > 2) || void 0 === arguments[2] || arguments[2];
          return h(e, t, void 0, n);
        }
        function h(e, t, n) {
          let r =
              !(arguments.length > 3) ||
              void 0 === arguments[3] ||
              arguments[3],
            a = (0, i.j)({ enabled: void 0 === e && r }),
            o = void 0 === e ? a.data : e,
            s = (0, d.l)({ enabled: void 0 === t && r }),
            l = void 0 === t ? s : { slug: t },
            u = null == l ? void 0 : l.slug,
            f = (0, c.Vm)({ enabled: void 0 === n && r }),
            p =
              void 0 === n || (null == f ? void 0 : f.parent_project_ref)
                ? f
                : { ref: n, parent_project_ref: void 0 };
          return {
            permissions: o,
            organizationSlug: u,
            projectRef: (null == p ? void 0 : p.parent_project_ref)
              ? p.parent_project_ref
              : null == p
                ? void 0
                : p.ref,
            isLoading: a.isLoading,
          };
        }
        function g(e, t, n, a, o) {
          return (function (e, t, n, a) {
            let o = (0, r.nu)(),
              {
                organizationSlug: s,
                projectRef: i,
                permissions: d,
              } = null != a ? a : {},
              {
                permissions: c,
                organizationSlug: u,
                projectRef: f,
              } = h(d, s, i, o);
            return !!o && (!l.Qy || m(c, e, t, n, u, f));
          })(e, t, n, {
            organizationSlug: a,
            projectRef: void 0,
            permissions: o,
          });
        }
        function v() {
          let e = (0, r.nu)(),
            { isFetched: t } = (0, i.j)({ enabled: e }),
            { isFetched: n } = (0, s.tl)({ enabled: e }),
            { ref: a } = (0, r.UO)(),
            { isFetched: o } = (0, u.ix)({ ref: a }, { enabled: !!a && e });
          return !l.Qy || (a ? e && t && n && o : e && t && n);
        }
        function y(e, t, n, a) {
          let o = (0, r.nu)(),
            {
              organizationSlug: s,
              projectRef: i,
              permissions: d,
            } = null != a ? a : {},
            {
              permissions: c,
              organizationSlug: u,
              projectRef: f,
              isLoading: p,
            } = h(d, s, i, o);
          return o
            ? l.Qy
              ? { isLoading: p, can: m(c, e, t, n, u, f) }
              : { isLoading: !1, can: !0 }
            : { isLoading: !1, can: !1 };
        }
      },
      88971: function (e, t, n) {
        'use strict';
        n.d(t, {
          Ml: function () {
            return f;
          },
          d2: function () {
            return u;
          },
          gY: function () {
            return p;
          },
        });
        var r = n(97458),
          a = n(52983),
          o = n(80108),
          s = n(37756),
          i = n(619),
          l = n(24561),
          d = n(96226);
        let c = (0, a.createContext)({ project: void 0, isLoading: !0 }),
          u = () => (0, a.useContext)(c),
          f = (e) => {
            let { projectRef: t, children: n } = e,
              { data: s, isLoading: u } = (0, o.ix)({ ref: t }),
              f = (0, a.useMemo)(() => ({ project: s, isLoading: u }), [s, u]);
            return (0, r.jsx)(c.Provider, {
              value: f,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'ProjectContextProvider',
              'data-sentry-source-file': 'ProjectContext.tsx',
              children: (0, r.jsx)(
                d.UU,
                {
                  'data-sentry-element': 'TableEditorStateContextProvider',
                  'data-sentry-source-file': 'ProjectContext.tsx',
                  children: (0, r.jsx)(
                    i.L,
                    {
                      'data-sentry-element':
                        'DatabaseSelectorStateContextProvider',
                      'data-sentry-source-file': 'ProjectContext.tsx',
                      children: (0, r.jsx)(
                        l.a9,
                        {
                          'data-sentry-element':
                            'RoleImpersonationStateContextProvider',
                          'data-sentry-source-file': 'ProjectContext.tsx',
                          children: n,
                        },
                        'role-impersonation-state-'.concat(t)
                      ),
                    },
                    'database-selector-state-'.concat(t)
                  ),
                },
                'table-editor-state-'.concat(t)
              ),
            });
          },
          p = () => {
            let { project: e } = u();
            return (null == e ? void 0 : e.status) === s.S.ACTIVE_HEALTHY;
          };
      },
      359: function (e, t, n) {
        'use strict';
        n.d(t, {
          u: function () {
            return l;
          },
        });
        var r = n(97458),
          a = n(52983),
          o = n(40577),
          s = n(90839),
          i = n(65092);
        let l = (0, a.forwardRef)((e, t) => {
          let { ...n } = e;
          return (0, r.jsxs)(o.u, {
            children: [
              (0, r.jsx)(o.aJ, {
                asChild: !0,
                children: (0, r.jsx)(s.z, {
                  ref: t,
                  ...n,
                  className: (0, i.cn)(n.className, 'pointer-events-auto'),
                  children: n.children,
                }),
              }),
              void 0 !== n.tooltip.content.text &&
                (0, r.jsx)(o._v, {
                  ...n.tooltip.content,
                  children: n.tooltip.content.text,
                }),
            ],
          });
        });
        l.displayName = 'ButtonTooltip';
      },
      18186: function (e, t, n) {
        'use strict';
        var r = n(97458),
          a = n(32190),
          o = n(52983),
          s = n(65092),
          i = n(67923),
          l = n(73565),
          d = n(90839);
        function c(e) {
          let t = (0, r.jsxs)('div', {
            className: (0, s.cn)(
              'bg-surface-100',
              'rounded-md border ',
              e.noHideOverflow ? '' : 'overflow-hidden',
              e.noMargin ? '' : 'mb-4 md:mb-8',
              e.className
            ),
            children: [
              e.title &&
                (0, r.jsx)('div', {
                  className: (0, s.cn)(
                    'bg-surface-100 border-b border-default flex items-center px-4 md:px-6 py-4',
                    e.titleClasses
                  ),
                  children: e.title,
                }),
              e.children,
              e.footer &&
                (0, r.jsx)('div', {
                  className: 'bg-surface-100 border-t border-default',
                  children: (0, r.jsx)('div', {
                    className: 'flex h-12 items-center px-4 md:px-6',
                    children: e.footer,
                  }),
                }),
            ],
          });
          return !1 === e.wrapWithLoading
            ? t
            : (0, r.jsx)(i.Z, {
                active: !!e.loading,
                'data-sentry-element': 'Loading',
                'data-sentry-component': 'Panel',
                'data-sentry-source-file': 'Panel.tsx',
                children: t,
              });
        }
        let u = (0, o.forwardRef)((e, t) => {
          let {
            className: n,
            title: o,
            description: i,
            href: c,
            buttonText: u,
            layout: f = 'horizontal',
            badgeLabel: p,
            ...m
          } = e;
          return (0, r.jsxs)('div', {
            ref: t,
            ...m,
            className: (0, s.cn)(
              'relative px-4 md:px-6 py-5 bg-studio flex flex-col lg:flex-row lg:justify-between gap-6 overflow-hidden lg:items-center',
              'vertical' === f && '!flex-col !items-start gap-y-2',
              n
            ),
            children: [
              (0, r.jsx)('div', {
                className: 'absolute inset-0 -mt-[5px]',
                style: {
                  backgroundImage:
                    '\n                linear-gradient(to right, hsl(var(--background-200)/1) 0%, hsl(var(--background-200)/1) 30%, hsl(var(--background-200)/0) 100%),\n                linear-gradient(to right, hsl(var(--border-default)/0.33) 1px, transparent 1px),\n                linear-gradient(to bottom, hsl(var(--border-default)/0.33) 1px, transparent 1px)\n              ',
                  backgroundSize: '100% 100%, 15px 15px, 15px 15px',
                  backgroundPosition: '0 0, 0 0, 0 0',
                },
              }),
              (0, r.jsxs)('div', {
                className: 'relative flex flex-col gap-y-2',
                children: [
                  (0, r.jsxs)('div', {
                    className: 'flex flex-row items-center -space-x-px',
                    children: [
                      (0, r.jsxs)(l.C, {
                        variant: 'default',
                        className:
                          'rounded-r-none pr-2 flex-shrink-0 gap-1.5 border-dashed bg-opacity-0 bg-surface-400 text-foreground-lighter',
                        children: [
                          (0, r.jsx)(a.Z, { size: 16, strokeWidth: 1.2 }),
                          (0, r.jsx)('span', {
                            className: 'text-foreground-lighter',
                            children: null != p ? p : 'Upcoming change',
                          }),
                        ],
                      }),
                      (0, r.jsx)(l.C, {
                        variant: 'default',
                        className:
                          'rounded-l-none flex-shrink-0 gap-1.5 bg-opacity-0 bg-surface-400 text-foreground-lighter border-l-0',
                        children: (0, r.jsx)('span', {
                          className: 'text-foreground text-xs',
                          children: o,
                        }),
                      }),
                    ],
                  }),
                  i &&
                    (0, r.jsx)('div', {
                      className:
                        'text-foreground-light text-sm flex flex-col gap-0',
                      children: (0, r.jsx)('div', {
                        className:
                          'prose text-xs max-w-none [&_p]:mt-2 [&_p]:mb-0',
                        children: i,
                      }),
                    }),
                ],
              }),
              c &&
                (0, r.jsx)(d.z, {
                  size: 'tiny',
                  type: 'default',
                  className: 'text-xs',
                  asChild: !0,
                  children: (0, r.jsx)('a', {
                    href: c,
                    target: '_blank',
                    rel: 'noreferrer noopener',
                    children: null != u ? u : 'Read the accouncement',
                  }),
                }),
            ],
          });
        });
        ((u.displayName = 'PanelNotice'),
          (c.Content = function (e) {
            let { children: t, className: n } = e;
            return (0, r.jsx)('div', {
              className: (0, s.cn)('px-4 md:px-6 py-4', n),
              'data-sentry-component': 'Content',
              'data-sentry-source-file': 'Panel.tsx',
              children: t,
            });
          }),
          (c.Notice = u),
          (t.Z = c));
      },
      58326: function (e, t, n) {
        'use strict';
        n.d(t, {
          Q: function () {
            return f;
          },
        });
        var r = n(97458),
          a = n(32691),
          o = n(52983),
          s = n(34549),
          i = n(62715),
          l = n(30320),
          d = n(88651),
          c = n(37756),
          u = n(77025);
        function f(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { useHighestAAL: !0 };
          if (!c.Qy) return e;
          let n = (n) => {
            let c = (0, a.useRouter)(),
              { isLoading: u, session: f } = (0, d.aC)(),
              { isLoading: p, data: m } = (0, l.V)({
                onError(e) {
                  s.Am.error(
                    'Failed to fetch authenticator assurance level: '.concat(
                      e.message,
                      '. Try refreshing your browser, or reach out to us via a support ticket if the issue persists'
                    )
                  );
                },
              });
            (0, i.j)({
              onError(e) {
                s.Am.error(
                  'Failed to fetch permissions: '.concat(
                    e.message,
                    '. Try refreshing your browser, or reach out to us via a support ticket if the issue persists'
                  )
                );
              },
            });
            let x = !!f,
              h = !u && !p;
            return (
              (0, o.useEffect)(() => {
                let e =
                  !t.useHighestAAL ||
                  (null == m ? void 0 : m.currentLevel) ===
                    (null == m ? void 0 : m.nextLevel);
                if (h && (!x || !e)) {
                  let e = new URLSearchParams(location.search),
                    t = location.pathname;
                  ((t = t.replace('/dashboard', '')),
                    e.set('returnTo', t),
                    c.push('/sign-in?'.concat(e.toString())));
                }
              }, [f, u, c, m, h, x]),
              (0, r.jsx)(e, {
                ...n,
                'data-sentry-element': 'InnerComponent',
                'data-sentry-component': 'WithAuthHOC',
                'data-sentry-source-file': 'withAuth.tsx',
              })
            );
          };
          return (
            (n.displayName = 'withAuth('.concat(e.displayName, ')')),
            (0, u.l)(e) && (n.getLayout = e.getLayout),
            n
          );
        }
      },
      619: function (e, t, n) {
        'use strict';
        n.d(t, {
          L: function () {
            return c;
          },
          TF: function () {
            return u;
          },
        });
        var r = n(97458),
          a = n(52983),
          o = n(28622),
          s = n(34653),
          i = n(12436);
        function l() {
          let e = (0, o.sj)({
            selectedDatabaseId: void 0,
            setSelectedDatabaseId: (t) => {
              e.selectedDatabaseId = t;
            },
          });
          return e;
        }
        let d = (0, a.createContext)(l()),
          c = (e) => {
            let { children: t } = e,
              n = (0, i.hS)(l);
            return (0, r.jsx)(d.Provider, {
              value: n,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'DatabaseSelectorStateContextProvider',
              'data-sentry-source-file': 'database-selector.tsx',
              children: t,
            });
          };
        function u(e) {
          let t = (0, a.useContext)(d);
          return (0, s.R)(t, e);
        }
      },
      24561: function (e, t, n) {
        'use strict';
        n.d(t, {
          Gm: function () {
            return x;
          },
          a9: function () {
            return u;
          },
          fN: function () {
            return f;
          },
          gv: function () {
            return m;
          },
          z6: function () {
            return p;
          },
        });
        var r = n(97458),
          a = n(52983),
          o = n(28622),
          s = n(34653),
          i = n(12436),
          l = n(72048);
        function d() {
          let e = (0, o.sj)({
            role: void 0,
            setRole: (t) => {
              e.role = t;
            },
          });
          return e;
        }
        let c = (0, a.createContext)(d()),
          u = (e) => {
            let { children: t } = e,
              n = (0, i.hS)(d);
            return (0, r.jsx)(c.Provider, {
              value: n,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'RoleImpersonationStateContextProvider',
              'data-sentry-source-file': 'role-impersonation-state.tsx',
              children: t,
            });
          };
        function f(e) {
          let t = (0, a.useContext)(c);
          return (0, s.R)(t, e);
        }
        function p() {
          let e = (0, a.useContext)(c);
          return (0, a.useCallback)(() => (0, o.CO)(e).role, [e]);
        }
        function m(e) {
          let t = (0, a.useContext)(c),
            n = (0, l.Z)(e);
          (0, a.useEffect)(
            () =>
              (0, o.Ld)(t, () => {
                n.current((0, o.CO)(t).role);
              }),
            [t]
          );
        }
        function x(e) {
          return (null == e ? void 0 : e.type) === 'postgrest';
        }
      },
      96226: function (e, t, n) {
        'use strict';
        n.d(t, {
          Re: function () {
            return i;
          },
          UU: function () {
            return c;
          },
          _2: function () {
            return u;
          },
        });
        var r = n(97458),
          a = n(52983),
          o = n(28622),
          s = n(34653);
        let i = 100,
          l = () => {
            let e = (0, o.sj)({
              enforceExactCount: !1,
              setEnforceExactCount: (t) => {
                e.enforceExactCount = t;
              },
              page: 1,
              setPage: (t) => {
                e.page = t;
              },
              rowsPerPage: i,
              setRowsPerPage: (t) => {
                e.rowsPerPage = t;
              },
              ui: { open: 'none' },
              get sidePanel() {
                return 'side-panel' === e.ui.open ? e.ui.sidePanel : void 0;
              },
              get confirmationDialog() {
                return 'confirmation-dialog' === e.ui.open
                  ? e.ui.confirmationDialog
                  : void 0;
              },
              closeSidePanel: () => {
                e.ui = { open: 'none' };
              },
              closeConfirmationDialog: () => {
                e.ui = { open: 'none' };
              },
              onAddSchema: () => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'schema', mode: 'new' },
                };
              },
              onAddTable: () => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'table', mode: 'new' },
                };
              },
              onEditTable: () => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'table', mode: 'edit' },
                };
              },
              onDuplicateTable: () => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'table', mode: 'duplicate' },
                };
              },
              onDeleteTable: () => {
                e.ui = {
                  open: 'confirmation-dialog',
                  confirmationDialog: {
                    type: 'table',
                    isDeleteWithCascade: !1,
                  },
                };
              },
              onAddColumn: () => {
                e.ui = { open: 'side-panel', sidePanel: { type: 'column' } };
              },
              onEditColumn: (t) => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'column', column: t },
                };
              },
              onDeleteColumn: (t) => {
                e.ui = {
                  open: 'confirmation-dialog',
                  confirmationDialog: {
                    type: 'column',
                    column: t,
                    isDeleteWithCascade: !1,
                  },
                };
              },
              onAddRow: () => {
                e.ui = { open: 'side-panel', sidePanel: { type: 'row' } };
              },
              onEditRow: (t) => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'row', row: t },
                };
              },
              onDeleteRows: function (t) {
                let n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : { numRows: 0, allRowsSelected: !1, callback: () => {} },
                  { numRows: r, allRowsSelected: a, callback: o } = n;
                e.ui = {
                  open: 'confirmation-dialog',
                  confirmationDialog: {
                    type: 'row',
                    rows: t,
                    numRows: r,
                    allRowsSelected: a,
                    callback: o,
                  },
                };
              },
              onExpandJSONEditor: (t) => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'json', jsonValue: t },
                };
              },
              onExpandTextEditor: (t, n) => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'cell', value: { column: t, row: n } },
                };
              },
              onEditForeignKeyColumnValue: (t) => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'foreign-row-selector', foreignKey: t },
                };
              },
              onImportData: () => {
                e.ui = {
                  open: 'side-panel',
                  sidePanel: { type: 'csv-import' },
                };
              },
              toggleConfirmationIsWithCascade: (t) => {
                'confirmation-dialog' === e.ui.open &&
                  ('column' === e.ui.confirmationDialog.type ||
                    'table' === e.ui.confirmationDialog.type) &&
                  (e.ui.confirmationDialog.isDeleteWithCascade =
                    null != t
                      ? t
                      : !e.ui.confirmationDialog.isDeleteWithCascade);
              },
            });
            return e;
          },
          d = (0, a.createContext)(l()),
          c = (e) => {
            let { children: t } = e,
              n = (0, a.useRef)(l()).current;
            return (0, r.jsx)(d.Provider, {
              value: n,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'TableEditorStateContextProvider',
              'data-sentry-source-file': 'table-editor.tsx',
              children: t,
            });
          },
          u = (e) => {
            let t = (0, a.useContext)(d);
            return (0, s.R)(t, e);
          };
      },
      33526: function (e, t, n) {
        'use strict';
        n.d(t, {
          J: function () {
            return p;
          },
        });
        var r = n(97458),
          a = n(31706),
          o = n(52983),
          s = n(10947),
          i = n(65092);
        let l = {
            note: 'default',
            tip: 'default',
            caution: 'warning',
            danger: 'destructive',
            deprecation: 'warning',
            default: 'default',
            warning: 'warning',
            destructive: 'destructive',
          },
          d = () =>
            (0, r.jsx)('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 21 20',
              className: 'w-6 h-6',
              fill: 'currentColor',
              'data-sentry-element': 'svg',
              'data-sentry-component': 'InfoIcon',
              'data-sentry-source-file': 'admonition.tsx',
              children: (0, r.jsx)('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M0.625 9.8252C0.625 4.44043 4.99023 0.0751953 10.375 0.0751953C15.7598 0.0751953 20.125 4.44043 20.125 9.8252C20.125 15.21 15.7598 19.5752 10.375 19.5752C4.99023 19.5752 0.625 15.21 0.625 9.8252ZM9.3584 4.38135C9.45117 4.28857 9.55518 4.20996 9.66699 4.14648C9.88086 4.02539 10.1245 3.96045 10.375 3.96045C10.5845 3.96045 10.7896 4.00586 10.9766 4.09229C11.1294 4.1626 11.2705 4.26025 11.3916 4.38135C11.6611 4.65088 11.8125 5.0166 11.8125 5.39795C11.8125 5.5249 11.7959 5.6499 11.7637 5.77002C11.6987 6.01172 11.5718 6.23438 11.3916 6.41455C11.1221 6.68408 10.7563 6.83545 10.375 6.83545C9.99365 6.83545 9.62793 6.68408 9.3584 6.41455C9.08887 6.14502 8.9375 5.7793 8.9375 5.39795C8.9375 5.29492 8.94873 5.19287 8.97021 5.09375C9.02783 4.82568 9.16162 4.57812 9.3584 4.38135ZM10.375 15.6899C10.0933 15.6899 9.82275 15.5781 9.62354 15.3789C9.42432 15.1797 9.3125 14.9092 9.3125 14.6274V9.31494C9.3125 9.0332 9.42432 8.7627 9.62354 8.56348C9.82275 8.36426 10.0933 8.25244 10.375 8.25244C10.6567 8.25244 10.9272 8.36426 11.1265 8.56348C11.3257 8.7627 11.4375 9.0332 11.4375 9.31494V14.6274C11.4375 14.7944 11.3979 14.9575 11.3242 15.104C11.2739 15.2046 11.2075 15.2979 11.1265 15.3789C10.9272 15.5781 10.6567 15.6899 10.375 15.6899Z',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'admonition.tsx',
              }),
            }),
          c = () =>
            (0, r.jsx)('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 22 20',
              className: 'w-6 h-6',
              fill: 'currentColor',
              'data-sentry-element': 'svg',
              'data-sentry-component': 'WarningIcon',
              'data-sentry-source-file': 'admonition.tsx',
              children: (0, r.jsx)('path', {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M8.15137 1.95117C9.30615 -0.0488281 12.1943 -0.0488281 13.3481 1.95117L20.7031 14.6992C21.8574 16.6992 20.4131 19.1992 18.104 19.1992H3.39502C1.08594 19.1992 -0.356933 16.6992 0.797364 14.6992L8.15137 1.95117ZM11.7666 16.0083C11.4971 16.2778 11.1313 16.4292 10.75 16.4292C10.3687 16.4292 10.0029 16.2778 9.7334 16.0083C9.46387 15.7388 9.3125 15.373 9.3125 14.9917C9.3125 14.9307 9.31641 14.8706 9.32373 14.811C9.33545 14.7197 9.35547 14.6304 9.38379 14.5439L9.41406 14.4609C9.48584 14.2803 9.59375 14.1147 9.7334 13.9751C10.0029 13.7056 10.3687 13.5542 10.75 13.5542C11.1313 13.5542 11.4971 13.7056 11.7666 13.9751C12.0361 14.2446 12.1875 14.6104 12.1875 14.9917C12.1875 15.373 12.0361 15.7388 11.7666 16.0083ZM10.75 4.69971C11.0317 4.69971 11.3022 4.81152 11.5015 5.01074C11.7007 5.20996 11.8125 5.48047 11.8125 5.76221V11.0747C11.8125 11.3564 11.7007 11.627 11.5015 11.8262C11.3022 12.0254 11.0317 12.1372 10.75 12.1372C10.4683 12.1372 10.1978 12.0254 9.99854 11.8262C9.79932 11.627 9.6875 11.3564 9.6875 11.0747V5.76221C9.6875 5.48047 9.79932 5.20996 9.99854 5.01074C10.1978 4.81152 10.4683 4.69971 10.75 4.69971Z',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'admonition.tsx',
              }),
            }),
          u = (0, a.j)('', {
            variants: {
              type: {
                default: '[&>svg]:bg-foreground-muted',
                warning: '',
                destructive: '',
              },
            },
          }),
          f = (0, a.j)('', {
            variants: {
              type: {
                default: 'bg-surface-200/25 border border-default',
                warning: 'bg-alternative border border-default',
                destructive: 'bg-alternative border border-default',
              },
            },
          }),
          p = (0, o.forwardRef)((e, t) => {
            var n, a, o, p, m, x, h, g;
            let {
                type: v = 'note',
                variant: y,
                showIcon: b = !0,
                label: j,
                title: w,
                description: C,
                children: N,
                ..._
              } = e,
              P = y ? l[y] : l[v];
            return (0, r.jsxs)(s.bZ, {
              ref: t,
              variant: P,
              ..._,
              className: (0, i.cn)(
                'mb-2',
                '[&_a]:underline',
                u({ type: P }),
                f({ type: P }),
                _.className
              ),
              children: [
                (b && 'warning' === P) || 'destructive' === P
                  ? (0, r.jsx)(c, {})
                  : b
                    ? (0, r.jsx)(d, {})
                    : null,
                j || w
                  ? (0, r.jsxs)(r.Fragment, {
                      children: [
                        (0, r.jsx)(s.Cd, {
                          ...(null === (n = _.childProps) || void 0 === n
                            ? void 0
                            : n.title),
                          className: (0, i.cn)(
                            'text mt-0.5 flex gap-3 text-sm [&_p]:mb-1.5 [&_p]:mt-0',
                            !j && 'flex-col',
                            null === (o = _.childProps) || void 0 === o
                              ? void 0
                              : null === (a = o.title) || void 0 === a
                                ? void 0
                                : a.className
                          ),
                          children: j || w,
                        }),
                        C &&
                          (0, r.jsx)(s.X, {
                            className:
                              null === (m = _.childProps) || void 0 === m
                                ? void 0
                                : null === (p = m.description) || void 0 === p
                                  ? void 0
                                  : p.className,
                            children: C,
                          }),
                        N &&
                          (0, r.jsx)(s.X, {
                            ...(null === (x = _.childProps) || void 0 === x
                              ? void 0
                              : x.description),
                            className: (0, i.cn)(
                              '[&_p]:mb-1.5 [&_p]:mt-0',
                              null === (g = _.childProps) || void 0 === g
                                ? void 0
                                : null === (h = g.description) || void 0 === h
                                  ? void 0
                                  : h.className
                            ),
                            children: N,
                          }),
                      ],
                    })
                  : (0, r.jsx)('div', {
                      className:
                        'text mt [&_p]:mb-1.5 [&_p]:mt-0 mt-0.5 [&_p:last-child]:mb-0',
                      children: N,
                    }),
              ],
            });
          });
      },
      51571: function (e, t, n) {
        'use strict';
        var r = n(97458),
          a = n(52983),
          o = n(68249),
          s = n(51487),
          i = n(16720),
          l = n(46112),
          d = n(25843),
          c = n(65092),
          u = n(90839),
          f = n(11499),
          p = n(58596);
        function m(e) {
          let {
              autoComplete: t,
              autoFocus: n,
              className: m,
              inputClassName: x,
              iconContainerClassName: h,
              copy: g,
              defaultValue: v,
              descriptionText: y,
              disabled: b,
              error: j,
              icon: w,
              id: C = '',
              name: N = '',
              inputRef: _,
              label: P,
              afterLabel: R,
              beforeLabel: k,
              labelOptional: z,
              layout: Z,
              onChange: L,
              onBlur: I,
              onCopy: S,
              placeholder: D,
              type: E = 'text',
              value: T,
              style: A,
              reveal: F = !1,
              actions: V,
              size: O = 'medium',
              borderless: U = !1,
              validation: W,
              ...B
            } = e,
            [M, G] = (0, a.useState)('Copy'),
            [Y, H] = (0, a.useState)(!0),
            Q = (0, d.Z)('input'),
            {
              formContextOnChange: J,
              values: X,
              errors: $,
              handleBlur: q,
              touched: K,
              fieldLevelValidation: ee,
            } = (0, f.G)();
          (X && !T && (T = X[C || N]),
            j || ($ && !j && (j = $[C || N]), (j = K && K[C] ? j : void 0)),
            (0, a.useEffect)(() => {
              W && ee(C, W(T));
            }, []));
          let et = ['peer/input', Q.base];
          return (
            j && et.push(Q.variants.error),
            j || et.push(Q.variants.standard),
            O && et.push(Q.size[O]),
            w && et.push(Q.with_icon),
            b && et.push(Q.disabled),
            x && et.push(x),
            (0, r.jsx)(o.l, {
              label: P,
              afterLabel: R,
              beforeLabel: k,
              labelOptional: z,
              layout: Z,
              id: C,
              error: j,
              descriptionText: y,
              style: A,
              size: O,
              className: m,
              'data-sentry-element': 'FormLayout',
              'data-sentry-component': 'Input',
              'data-sentry-source-file': 'Input.tsx',
              children: (0, r.jsxs)('div', {
                className: Q.container,
                children: [
                  (0, r.jsx)('input', {
                    'data-size': O,
                    autoComplete: t,
                    autoFocus: n,
                    defaultValue: v,
                    disabled: b,
                    id: C,
                    name: N,
                    onChange: function (e) {
                      (L && L(e), J && J(e), W && ee(C, W(e.target.value)));
                    },
                    onBlur: function (e) {
                      (q &&
                        setTimeout(() => {
                          q(e);
                        }, 100),
                        I && I(e));
                    },
                    onCopy: S,
                    placeholder: D,
                    ref: _,
                    type: E,
                    value: F && Y ? l.aA : T,
                    className: (0, c.cn)(et, 'tiny' === O && 'pl-8'),
                    ...B,
                  }),
                  w && (0, r.jsx)(i.Z, { size: O, icon: w, className: h }),
                  g || j || V
                    ? (0, r.jsxs)('div', {
                        className: Q.actions_container,
                        children: [
                          j && (0, r.jsx)(s.Z, { size: O }),
                          g && !(F && Y)
                            ? (0, r.jsx)(u.z, {
                                size: 'tiny',
                                type: 'default',
                                icon: (0, r.jsx)(p.Z, {}),
                                onClick: () => {
                                  var e, t;
                                  return (
                                    (e = T),
                                    void (
                                      null ===
                                        (t =
                                          navigator.clipboard.writeText(e)) ||
                                      void 0 === t ||
                                      t.then(
                                        function () {
                                          (G('Copied'),
                                            setTimeout(function () {
                                              G('Copy');
                                            }, 3e3),
                                            null == S || S());
                                        },
                                        function () {
                                          G('Failed to copy');
                                        }
                                      )
                                    )
                                  );
                                },
                                children: M,
                              })
                            : null,
                          F && Y
                            ? (0, r.jsx)(u.z, {
                                size: 'tiny',
                                type: 'default',
                                onClick: function () {
                                  H(!1);
                                },
                                children: 'Reveal',
                              })
                            : null,
                          V && V,
                        ],
                      })
                    : null,
                ],
              }),
            })
          );
        }
        ((m.TextArea = function (e) {
          let {
              className: t,
              textAreaClassName: n,
              descriptionText: i,
              disabled: l,
              error: c,
              icon: m,
              id: x = '',
              name: h = '',
              label: g,
              afterLabel: v,
              beforeLabel: y,
              labelOptional: b,
              layout: j,
              onChange: w,
              onBlur: C,
              placeholder: N,
              value: _,
              style: P,
              rows: R = 4,
              limit: k,
              size: z,
              borderless: Z = !1,
              validation: L,
              copy: I = !1,
              onCopy: S,
              actions: D,
              ...E
            } = e,
            [T, A] = (0, a.useState)(0),
            [F, V] = (0, a.useState)('Copy'),
            {
              formContextOnChange: O,
              values: U,
              errors: W,
              handleBlur: B,
              touched: M,
              fieldLevelValidation: G,
            } = (0, f.G)();
          (U && !_ && (_ = U[x || h]),
            c ||
              (W && !c && (c = W[x || h]), (c = M && M[x || h] ? c : void 0)),
            (0, a.useEffect)(() => {
              L && G(x, L(_));
            }, []));
          let Y = (0, d.Z)('input'),
            H = [Y.base];
          return (
            c && H.push(Y.variants.error),
            c || H.push(Y.variants.standard),
            m && H.push(Y.with_icon),
            z && H.push(Y.size[z]),
            l && H.push(Y.disabled),
            n && H.push(n),
            (0, r.jsx)(o.l, {
              className: t,
              label: g,
              afterLabel: v,
              beforeLabel: y,
              labelOptional: b,
              layout: j,
              id: x,
              error: c,
              descriptionText: i,
              style: P,
              size: z,
              'data-sentry-element': 'FormLayout',
              'data-sentry-component': 'TextArea',
              'data-sentry-source-file': 'Input.tsx',
              children: (0, r.jsxs)('div', {
                className: Y.container,
                children: [
                  (0, r.jsx)('textarea', {
                    disabled: l,
                    id: x,
                    name: h,
                    rows: R,
                    cols: 100,
                    placeholder: N,
                    onChange: function (e) {
                      (A(e.target.value.length),
                        w && w(e),
                        O && O(e),
                        L && G(x, L(e.target.value)));
                    },
                    onBlur: function (e) {
                      (B &&
                        setTimeout(() => {
                          B(e);
                        }, 100),
                        C && C(e));
                    },
                    onCopy: S,
                    value: _,
                    className: H.join(' '),
                    maxLength: k,
                    ...E,
                  }),
                  I || c || D
                    ? (0, r.jsx)('div', {
                        className: Y.textarea_actions_container,
                        children: (0, r.jsxs)('div', {
                          className: Y.textarea_actions_container_items,
                          children: [
                            c && (0, r.jsx)(s.Z, { size: z }),
                            I &&
                              (0, r.jsx)(u.z, {
                                size: 'tiny',
                                type: 'default',
                                onClick: () =>
                                  (function (e) {
                                    navigator.clipboard.writeText(e).then(
                                      function () {
                                        (V('Copied'),
                                          setTimeout(function () {
                                            V('Copy');
                                          }, 3e3),
                                          null == S || S());
                                      },
                                      function () {
                                        V('Failed to copy');
                                      }
                                    );
                                  })(_),
                                icon: (0, r.jsx)(p.Z, {}),
                                children: F,
                              }),
                            D && D,
                          ],
                        }),
                      })
                    : null,
                ],
              }),
            })
          );
        }),
          (t.Z = m));
      },
      67923: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return s;
          },
        });
        var r = n(97458);
        n(52983);
        var a = n(5295),
          o = n(25843);
        function s(e) {
          let { children: t, active: n } = e,
            s = (0, o.Z)('loading'),
            i = [s.base],
            l = [s.content.base];
          n && l.push(s.content.active);
          let d = [s.spinner];
          return (0, r.jsxs)('div', {
            className: i.join(' '),
            'data-sentry-component': 'Loading',
            'data-sentry-source-file': 'Loading.tsx',
            children: [
              (0, r.jsx)('div', { className: l.join(' '), children: t }),
              n && (0, r.jsx)(a.Z, { size: 24, className: d.join(' ') }),
            ],
          });
        }
      },
      4526: function (e, t, n) {
        'use strict';
        var r = n(97458),
          a = n(11958);
        n(52983);
        var o = n(98686),
          s = n(25843);
        function i(e) {
          let {
              align: t = 'center',
              ariaLabel: n,
              arrow: o = !1,
              children: i,
              className: l,
              defaultOpen: d = !1,
              modal: c,
              onOpenChange: u,
              open: f,
              overlay: p,
              side: m = 'bottom',
              sideOffset: x = 6,
              style: h,
              header: g,
              footer: v,
              size: y = 'content',
              disabled: b,
              'data-testid': j,
            } = e,
            w = (0, s.Z)('popover'),
            C = [w.content, w.size[y]];
          return (
            l && C.push(l),
            (0, r.jsxs)(a.fC, {
              defaultOpen: d,
              modal: c,
              onOpenChange: u,
              open: f,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'Popover',
              'data-sentry-source-file': 'Popover.tsx',
              children: [
                (0, r.jsx)(a.xz, {
                  disabled: b,
                  className: w.trigger,
                  'aria-label': n,
                  'data-testid': j,
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'Popover.tsx',
                  children: i,
                }),
                (0, r.jsx)(a.h_, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'Popover.tsx',
                  children: (0, r.jsxs)(a.VY, {
                    sideOffset: x,
                    side: m,
                    align: t,
                    className: C.join(' '),
                    style: h,
                    'data-sentry-element': 'unknown',
                    'data-sentry-source-file': 'Popover.tsx',
                    children: [
                      o && (0, r.jsx)(a.Eh, { offset: 10 }),
                      g &&
                        (0, r.jsx)('div', { className: w.header, children: g }),
                      p,
                      v &&
                        (0, r.jsx)('div', { className: w.footer, children: v }),
                    ],
                  }),
                }),
              ],
            })
          );
        }
        ((i.Separator = function () {
          let e = (0, s.Z)('popover');
          return (0, r.jsx)('div', {
            className: e.separator,
            'data-sentry-component': 'Separator',
            'data-sentry-source-file': 'Popover.tsx',
          });
        }),
          (i.Close = function () {
            let e = (0, s.Z)('popover');
            return (0, r.jsx)(a.x8, {
              className: e.close,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'Close',
              'data-sentry-source-file': 'Popover.tsx',
              children: (0, r.jsx)(o.Z, {
                size: 14,
                strokeWidth: 2,
                'data-sentry-element': 'X',
                'data-sentry-source-file': 'Popover.tsx',
              }),
            });
          }),
          (t.Z = i));
      },
      51e3: function (e, t, n) {
        'use strict';
        n.d(t, {
          Fw: function () {
            return s;
          },
          wy: function () {
            return o;
          },
          zF: function () {
            return a;
          },
        });
        var r = n(99517);
        let a = r.fC,
          o = r.wy,
          s = r.Fw;
      },
      14500: function (e, t, n) {
        'use strict';
        n.d(t, {
          $F: function () {
            return u;
          },
          AW: function () {
            return v;
          },
          Ju: function () {
            return w;
          },
          Ph: function () {
            return m;
          },
          Qk: function () {
            return f;
          },
          TG: function () {
            return g;
          },
          VD: function () {
            return C;
          },
          Xi: function () {
            return y;
          },
          _x: function () {
            return x;
          },
          bO: function () {
            return b;
          },
          cq: function () {
            return p;
          },
          h_: function () {
            return c;
          },
          kt: function () {
            return h;
          },
          qB: function () {
            return j;
          },
        });
        var r = n(97458),
          a = n(44809),
          o = n(91587),
          s = n(62507),
          i = n(17432),
          l = n(52983),
          d = n(65092);
        let c = (e) =>
            (0, r.jsx)(a.fC, {
              modal: !1,
              ...e,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'DropdownMenu',
              'data-sentry-source-file': 'dropdown-menu.tsx',
            }),
          u = a.xz,
          f = a.ZA,
          p = a.Uv,
          m = a.Tr,
          x = a.Ee,
          h = l.forwardRef((e, t) => {
            let { className: n, inset: s, children: i, ...l } = e;
            return (0, r.jsxs)(a.fF, {
              ref: t,
              className: (0, d.cn)(
                'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-overlay-hover data-[state=open]:bg-overlay-hover data-[state=open]:text-strong',
                s && 'pl-8',
                n
              ),
              ...l,
              children: [i, (0, r.jsx)(o.Z, { className: 'h-4 w-4 !ml-auto' })],
            });
          });
        h.displayName = a.fF.displayName;
        let g = l.forwardRef((e, t) => {
          let { className: n, ...o } = e;
          return (0, r.jsx)(a.tu, {
            ref: t,
            className: (0, d.cn)(
              'z-50 min-w-[8rem] overflow-hidden rounded-md border border-overlay bg-overlay p-1 text-foreground-light shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              n
            ),
            ...o,
          });
        });
        g.displayName = a.tu.displayName;
        let v = l.forwardRef((e, t) => {
          let { className: n, sideOffset: o = 4, ...s } = e;
          return (0, r.jsx)(a.Uv, {
            children: (0, r.jsx)(a.VY, {
              ref: t,
              sideOffset: o,
              className: (0, d.cn)(
                'z-50 min-w-[8rem] overflow-hidden rounded-md border border-overlay bg-overlay p-1 text-foreground-light  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64',
                n
              ),
              ...s,
            }),
          });
        });
        v.displayName = a.VY.displayName;
        let y = l.forwardRef((e, t) => {
          let { className: n, inset: o, ...s } = e;
          return (0, r.jsx)(a.ck, {
            ref: t,
            className: (0, d.cn)(
              'relative flex select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors focus:bg-overlay-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer',
              o && 'pl-8',
              n
            ),
            ...s,
          });
        });
        y.displayName = a.ck.displayName;
        let b = l.forwardRef((e, t) => {
          let { className: n, children: o, checked: i, ...l } = e;
          return (0, r.jsxs)(a.oC, {
            ref: t,
            className: (0, d.cn)(
              'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-xs outline-none transition-colors focus:bg-overlay-hover focus:text-strong data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              n
            ),
            checked: i,
            ...l,
            children: [
              (0, r.jsx)('span', {
                className:
                  'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                children: (0, r.jsx)(a.wU, {
                  children: (0, r.jsx)(s.Z, { className: 'h-4 w-4' }),
                }),
              }),
              o,
            ],
          });
        });
        b.displayName = a.oC.displayName;
        let j = l.forwardRef((e, t) => {
          let { className: n, children: o, ...s } = e;
          return (0, r.jsxs)(a.Rk, {
            ref: t,
            className: (0, d.cn)(
              'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-xs outline-none transition-colors focus:bg-overlay-hover focus:text-strong data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              n
            ),
            ...s,
            children: [
              (0, r.jsx)('span', {
                className:
                  'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                children: (0, r.jsx)(a.wU, {
                  children: (0, r.jsx)(i.Z, {
                    className: 'h-2 w-2 fill-current',
                  }),
                }),
              }),
              o,
            ],
          });
        });
        j.displayName = a.Rk.displayName;
        let w = l.forwardRef((e, t) => {
          let { className: n, inset: o, ...s } = e;
          return (0, r.jsx)(a.__, {
            ref: t,
            className: (0, d.cn)(
              'px-2 py-1.5 text-xs text-foreground-light',
              o && 'pl-8',
              n
            ),
            ...s,
          });
        });
        w.displayName = a.__.displayName;
        let C = l.forwardRef((e, t) => {
          let { className: n, ...o } = e;
          return (0, r.jsx)(a.Z0, {
            ref: t,
            className: (0, d.cn)('-mx-1 my-1 h-px bg-border-overlay', n),
            ...o,
          });
        });
        C.displayName = a.Z0.displayName;
      },
      36155: function (e, t, n) {
        'use strict';
        n.d(t, {
          _: function () {
            return d;
          },
        });
        var r = n(97458),
          a = n(7538),
          o = n(31706),
          s = n(52983),
          i = n(65092);
        let l = (0, o.j)(
            'text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          ),
          d = s.forwardRef((e, t) => {
            let { className: n, ...o } = e;
            return (0, r.jsx)(a.f, {
              ref: t,
              className: (0, i.cn)(l(), n),
              ...o,
            });
          });
        d.displayName = a.f.displayName;
      },
      42026: function (e, t, n) {
        'use strict';
        n.d(t, {
          Fm: function () {
            return f;
          },
          J2: function () {
            return d;
          },
          xo: function () {
            return c;
          },
          yk: function () {
            return u;
          },
        });
        var r = n(97458),
          a = n(11958),
          o = n(52983),
          s = n(65092),
          i = n(19574),
          l = n.n(i);
        let d = a.fC,
          c = a.xz;
        a.ee;
        let u = o.forwardRef((e, t) => {
          let {
              className: n,
              align: i = 'center',
              sideOffset: d = 4,
              portal: c = !1,
              sameWidthAsTrigger: u = !1,
              ...f
            } = e,
            p = c ? a.h_ : o.Fragment;
          return (0, r.jsx)(p, {
            children: (0, r.jsx)(a.VY, {
              ref: t,
              align: i,
              sideOffset: d,
              className: (0, s.cn)(
                u ? l()['popover-trigger-width'] : '',
                'z-50 w-72 rounded-md border border-overlay bg-overlay p-4 text-popover-foreground  outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                n
              ),
              ...f,
            }),
          });
        });
        u.displayName = 'PopoverContent';
        let f = o.forwardRef((e, t) => {
          let { className: n, children: a, ...o } = e;
          return (0, r.jsx)('div', {
            ref: t,
            ...o,
            className: (0, s.cn)('w-full h-px bg-border-overlay', n),
          });
        });
        f.displayName = 'PopoverSeparator';
      },
      22714: function (e, t, n) {
        'use strict';
        n.d(t, {
          Bw: function () {
            return y;
          },
          DI: function () {
            return p;
          },
          Ph: function () {
            return f;
          },
          Ql: function () {
            return j;
          },
          U$: function () {
            return w;
          },
          i4: function () {
            return h;
          },
          ki: function () {
            return m;
          },
          n5: function () {
            return b;
          },
        });
        var r = n(97458),
          a = n(21117),
          o = n(98601),
          s = n(37393),
          i = n(62507),
          l = n(52983),
          d = n(31706),
          c = n(46112),
          u = n(65092);
        let f = a.fC,
          p = a.ZA,
          m = l.forwardRef((e, t) => {
            let { placeholder: n, ...o } = e;
            return (0, r.jsx)(a.B4, {
              placeholder:
                'string' == typeof n ? (0, r.jsx)('span', { children: n }) : n,
              ...o,
              ref: t,
            });
          });
        m.displayName = a.B4.displayName;
        let x = (0, d.j)('', {
            variants: { size: { ...c.Ld } },
            defaultVariants: { size: c.Rc },
          }),
          h = l.forwardRef((e, t) => {
            let { className: n, children: s, size: i, ...l } = e;
            return (0, r.jsxs)(a.xz, {
              ref: t,
              className: (0, u.cn)(
                'flex w-full items-center justify-between rounded-md border border-strong border-stronger bg-alternative dark:bg-muted bg-selection text-xs ring-offset-background-control data-[placeholder]:text-foreground-lighter focus:outline-none ring-border-control focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                'data-[state=open]:bg-selection data-[state=open]:border-stronger',
                'gap-2',
                x({ size: i }),
                n
              ),
              ...l,
              children: [
                s,
                (0, r.jsx)(a.JO, {
                  asChild: !0,
                  children: (0, r.jsx)(o.Z, {
                    className: 'h-4 w-4 text-foreground-lighter',
                    strokeWidth: 1.5,
                  }),
                }),
              ],
            });
          });
        h.displayName = a.xz.displayName;
        let g = l.forwardRef((e, t) => {
          let { className: n, ...o } = e;
          return (0, r.jsx)(a.u_, {
            ref: t,
            className: (0, u.cn)(
              'flex cursor-default items-center justify-center py-1 text-foreground-muted',
              n
            ),
            ...o,
            children: (0, r.jsx)(s.Z, { className: 'h-4 w-4' }),
          });
        });
        g.displayName = a.u_.displayName;
        let v = l.forwardRef((e, t) => {
          let { className: n, ...s } = e;
          return (0, r.jsx)(a.$G, {
            ref: t,
            className: (0, u.cn)(
              'flex cursor-default items-center justify-center py-1 text-foreground-muted',
              n
            ),
            ...s,
            children: (0, r.jsx)(o.Z, { className: 'h-4 w-4' }),
          });
        });
        v.displayName = a.$G.displayName;
        let y = l.forwardRef((e, t) => {
          let { className: n, children: o, position: s = 'popper', ...i } = e;
          return (0, r.jsx)(a.h_, {
            children: (0, r.jsxs)(a.VY, {
              ref: t,
              className: (0, u.cn)(
                'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-overlay text-foreground  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                'popper' === s &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                n
              ),
              position: s,
              ...i,
              children: [
                (0, r.jsx)(g, {}),
                (0, r.jsx)(a.l_, {
                  className: (0, u.cn)(
                    'p-1',
                    'popper' === s &&
                      'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                  ),
                  children: o,
                }),
                (0, r.jsx)(v, {}),
              ],
            }),
          });
        });
        y.displayName = a.VY.displayName;
        let b = l.forwardRef((e, t) => {
          let { className: n, ...o } = e;
          return (0, r.jsx)(a.__, {
            ref: t,
            className: (0, u.cn)(
              'py-1.5 pl-8 pr-2 text-xs text-foreground-lighter/75 uppercase tracking-wider font-mono',
              n
            ),
            ...o,
          });
        });
        b.displayName = a.__.displayName;
        let j = l.forwardRef((e, t) => {
          let { className: n, children: o, ...s } = e;
          return (0, r.jsxs)(a.ck, {
            ref: t,
            className: (0, u.cn)(
              'group',
              'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-overlay-hover text-foreground-light focus:text-foreground data-[state=checked]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              n
            ),
            ...s,
            children: [
              (0, r.jsx)('span', {
                className:
                  'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                children: (0, r.jsx)(a.wU, {
                  className:
                    'h-3.5 w-3.5 bg-foreground rounded-full flex justify-center items-center',
                  children: (0, r.jsx)(i.Z, {
                    className: 'h-2 w-2 text-background-overlay',
                    strokeWidth: 6,
                  }),
                }),
              }),
              (0, r.jsx)(a.eT, {
                children:
                  'string' == typeof o
                    ? (0, r.jsx)('span', { children: o })
                    : o,
              }),
            ],
          });
        });
        j.displayName = a.ck.displayName;
        let w = l.forwardRef((e, t) => {
          let { className: n, ...o } = e;
          return (0, r.jsx)(a.Z0, {
            ref: t,
            className: (0, u.cn)('-mx-1 my-1 h-px bg-border-overlay', n),
            ...o,
          });
        });
        w.displayName = a.Z0.displayName;
      },
      51487: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return i;
          },
        });
        var r = n(97458);
        n(52983);
        var a = n(25843),
          o = n(44735);
        let s = { tiny: 14, small: 16, medium: 20, large: 24, xlarge: 32 };
        function i(e) {
          let { style: t, size: n = 'medium' } = e,
            i = (0, a.Z)('inputErrorIcon');
          return (0, r.jsx)('div', {
            className: i.base,
            style: t,
            'data-sentry-component': 'InputErrorIcon',
            'data-sentry-source-file': 'InputErrorIcon.tsx',
            children: (0, r.jsx)(o.Z, {
              size: s[n],
              strokeWidth: 2,
              'data-sentry-element': 'AlertCircle',
              'data-sentry-source-file': 'InputErrorIcon.tsx',
            }),
          });
        }
      },
      16720: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return s;
          },
        });
        var r = n(97458);
        n(52983);
        var a = n(25843),
          o = n(65092);
        function s(e) {
          let { icon: t, className: n, size: s } = e,
            i = (0, a.Z)('inputIconContainer');
          return (0, r.jsx)('div', {
            className: (0, o.cn)(i.base, i.size[s], n),
            'data-sentry-component': 'InputIconContainer',
            'data-sentry-source-file': 'InputIconContainer.tsx',
            children: t,
          });
        }
      },
      19574: function (e) {
        e.exports = {
          'popover-trigger-width': 'popover_popover-trigger-width__O8y9q',
        };
      },
    },
  ]));
