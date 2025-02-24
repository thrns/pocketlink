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
      (e._sentryDebugIds[t] = '1a80e91e-29ed-4f31-8154-8991e1ee9563'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-1a80e91e-29ed-4f31-8154-8991e1ee9563'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6374],
    {
      79682: function (e, t, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/advisors/security',
          function () {
            return s(89773);
          },
        ]);
      },
      89773: function (e, t, s) {
        'use strict';
        s.r(t);
        var n = s(97458),
          i = s(52983),
          r = s(12436),
          l = s(60689),
          a = s(19346),
          d = s(23662),
          u = s(28143),
          c = s(18812),
          f = s(23711),
          o = s(42509),
          y = s(24083),
          m = s(44353),
          v = s(62432),
          L = s(27246),
          b = s(95767);
        let g = () => {
          var e;
          let t = (0, v.Vm)(),
            { ref: s, preset: o, id: b } = (0, r.UO)(),
            [g, x] = (0, i.useState)([
              { level: a.l.ERROR, filters: [] },
              { level: a.l.WARN, filters: [] },
              { level: a.l.INFO, filters: [] },
            ]),
            [p, _] = (0, i.useState)(null != o ? o : a.l.ERROR),
            [h, j] = (0, i.useState)(null),
            {
              data: w,
              isLoading: E,
              isRefetching: R,
              refetch: N,
            } = (0, m.U)({ projectRef: null == t ? void 0 : t.ref }),
            T = (null != w ? w : []).filter((e) =>
              e.categories.includes('SECURITY')
            ),
            I =
              (null === (e = g.find((e) => e.level === p)) || void 0 === e
                ? void 0
                : e.filters) || [],
            O = T.filter((e) => e.level === p).filter((e) =>
              I.length > 0 ? I.includes(e.name) : e
            ),
            k = d.EV.filter((e) =>
              T.some((t) => t.name === e.name && t.level === p)
            ).map((e) => ({ name: e.title, value: e.name }));
          return (
            (0, i.useEffect)(() => {
              var e;
              b &&
                j(
                  null !== (e = T.find((e) => e.cache_key === b)) &&
                    void 0 !== e
                    ? e
                    : null
                );
            }, [b, T]),
            (0, n.jsxs)('div', {
              className: 'h-full flex flex-col',
              'data-sentry-component': 'ProjectLints',
              'data-sentry-source-file': 'security.tsx',
              children: [
                (0, n.jsx)(y.p, {
                  className: 'py-4 px-6 !mb-0',
                  title: 'Security Advisor',
                  docsUrl:
                    'https://supabase.com/docs/guides/database/database-linter',
                  'data-sentry-element': 'FormHeader',
                  'data-sentry-source-file': 'security.tsx',
                }),
                (0, n.jsx)(l.Z, {
                  activeLints: T,
                  isLoading: E,
                  currentTab: p,
                  setCurrentTab: _,
                  setSelectedLint: j,
                  'data-sentry-element': 'LintPageTabs',
                  'data-sentry-source-file': 'security.tsx',
                }),
                (0, n.jsx)(c.Z, {
                  filterOptions: k,
                  filteredLints: O,
                  activeLints: T,
                  currentTab: p,
                  filters: g,
                  isLoading: E || R,
                  setFilters: x,
                  onClickRefresh: N,
                  'data-sentry-element': 'LinterFilters',
                  'data-sentry-source-file': 'security.tsx',
                }),
                (0, n.jsx)(L.O, {
                  loading: R,
                  'data-sentry-element': 'LoadingLine',
                  'data-sentry-source-file': 'security.tsx',
                }),
                (0, n.jsx)(u.Z, {
                  filteredLints: O,
                  currentTab: p,
                  selectedLint: h,
                  setSelectedLint: j,
                  isLoading: E,
                  'data-sentry-element': 'LinterDataGrid',
                  'data-sentry-source-file': 'security.tsx',
                }),
                (0, n.jsx)(f.Z, {
                  hideDbInspectCTA: !0,
                  isLoading: E,
                  isRefetching: R,
                  refetch: N,
                  'data-sentry-element': 'LinterPageFooter',
                  'data-sentry-source-file': 'security.tsx',
                }),
              ],
            })
          );
        };
        ((g.getLayout = (e) =>
          (0, n.jsx)(b.Z, {
            children: (0, n.jsx)(o.Z, { title: 'Linter', children: e }),
          })),
          (t.default = g));
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 3491, 4851,
          2549, 1379, 272, 3861, 2728, 245, 5767, 5669, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 79682));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
