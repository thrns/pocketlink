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
      n = new e.Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = '91e80d0a-a562-441e-b1e1-a1baa667bfdd'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-91e80d0a-a562-441e-b1e1-a1baa667bfdd'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3587],
    {
      41341: function (e, n, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/functions',
          function () {
            return s(55202);
          },
        ]);
      },
      55202: function (e, n, s) {
        'use strict';
        s.r(n);
        var t = s(97458),
          l = s(12436),
          d = s(36210),
          a = s(90839),
          r = s(72595),
          c = s(6834),
          i = s(95767),
          h = s(57006),
          o = s(5529),
          u = s(63621),
          f = s(7429);
        let j = () => {
          let { ref: e } = (0, l.UO)(),
            {
              data: n,
              error: s,
              isLoading: c,
              isError: i,
              isSuccess: j,
            } = (0, f.I)({ projectRef: e }),
            x = (null != n ? n : []).length > 0;
          return (0, t.jsx)(t.Fragment, {
            children: (0, t.jsxs)('div', {
              className: 'py-6',
              children: [
                c && (0, t.jsx)(u.A, {}),
                i &&
                  (0, t.jsx)(o.Z, {
                    error: s,
                    subject: 'Failed to retrieve edge functions',
                  }),
                j &&
                  (0, t.jsx)(t.Fragment, {
                    children: x
                      ? (0, t.jsxs)('div', {
                          className: 'py-6 space-y-4',
                          children: [
                            (0, t.jsxs)('div', {
                              className: 'flex justify-between items-center',
                              children: [
                                (0, t.jsx)('span', {
                                  className: 'text-sm text-foreground-lighter',
                                  children: ''
                                    .concat(n.length, ' function')
                                    .concat(
                                      n.length > 1 ? 's' : '',
                                      ' deployed'
                                    ),
                                }),
                                (0, t.jsxs)(d.Vq, {
                                  children: [
                                    (0, t.jsx)(d.hg, {
                                      asChild: !0,
                                      children: (0, t.jsx)(a.z, {
                                        type: 'primary',
                                        children: 'Deploy a new function',
                                      }),
                                    }),
                                    (0, t.jsx)(d.cZ, {
                                      size: 'large',
                                      children: (0, t.jsx)(d.VO, {
                                        padding: 'small',
                                        children: (0, t.jsx)(r.ds, {}),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsx)(h.Z, {
                              head: (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)(h.Z.th, { children: 'Name' }),
                                  (0, t.jsx)(h.Z.th, { children: 'URL' }),
                                  (0, t.jsx)(h.Z.th, {
                                    className: 'hidden 2xl:table-cell',
                                    children: 'Created',
                                  }),
                                  (0, t.jsx)(h.Z.th, {
                                    className: 'lg:table-cell',
                                    children: 'Last updated',
                                  }),
                                  (0, t.jsx)(h.Z.th, {
                                    className: 'lg:table-cell',
                                    children: 'Deployments',
                                  }),
                                ],
                              }),
                              body: (0, t.jsx)(t.Fragment, {
                                children:
                                  n.length > 0 &&
                                  n.map((e) =>
                                    (0, t.jsx)(r.vI, { function: e }, e.id)
                                  ),
                              }),
                            }),
                          ],
                        })
                      : (0, t.jsx)(r.Zv, {}),
                  }),
              ],
            }),
          });
        };
        ((j.getLayout = (e) =>
          (0, t.jsx)(i.Z, { children: (0, t.jsx)(c.Z, { children: e }) })),
          (n.default = j));
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          2549, 1379, 272, 3861, 2728, 245, 5767, 3242, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 41341));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
