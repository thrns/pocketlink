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
      (e._sentryDebugIds[t] = '5c39470c-7706-4b7d-9578-1357275b06d1'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-5c39470c-7706-4b7d-9578-1357275b06d1'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2580],
    {
      72443: function (e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/editor/[id]',
          function () {
            return n(60698);
          },
        ]);
      },
      60698: function (e, t, n) {
        'use strict';
        n.r(t);
        var a = n(97458),
          r = n(98809),
          d = n(32691),
          s = n(39303),
          i = n(45862),
          c = n(50936),
          o = n(95767),
          l = n(88971),
          u = n(63165),
          f = n(39113);
        let b = () => {
          let e = (0, d.useRouter)(),
            { resolvedTheme: t } = (0, r.F)(),
            { id: n, ref: o } = (0, s.UO)(),
            u = n ? Number(n) : void 0,
            { project: b } = (0, l.d2)(),
            { data: h, isLoading: p } = (0, f.iB)({
              projectRef: null == b ? void 0 : b.ref,
              connectionString: null == b ? void 0 : b.connectionString,
              id: u,
            });
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)(i.mM, {
                isLoadingSelectedTable: p,
                selectedTable: h,
                theme: (null == t ? void 0 : t.includes('dark'))
                  ? 'dark'
                  : 'light',
                'data-sentry-element': 'TableGridEditor',
                'data-sentry-source-file': '[id].tsx',
              }),
              (0, a.jsx)(c.Z, {
                selectedTable: h,
                onAfterDeleteTable: (t) => {
                  t.length > 0
                    ? e.push('/project/'.concat(o, '/editor/').concat(t[0].id))
                    : e.push('/project/'.concat(o, '/editor'));
                },
                'data-sentry-element': 'DeleteConfirmationDialogs',
                'data-sentry-source-file': '[id].tsx',
              }),
            ],
          });
        };
        ((b.getLayout = (e) =>
          (0, a.jsx)(o.Z, { children: (0, a.jsx)(u.Z, { children: e }) })),
          (t.default = b));
      },
      62210: function (e, t, n) {
        'use strict';
        n.d(t, {
          r: function () {
            return l;
          },
        });
        var a = n(97458),
          r = n(56384),
          d = n(31706),
          s = n(52983),
          i = n(65092);
        let c = (0, d.j)(
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
          o = (0, d.j)(
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
          l = s.forwardRef((e, t) => {
            let { className: n, size: d, ...s } = e;
            return (0, a.jsx)(r.fC, {
              className: (0, i.cn)(c({ size: d }), n),
              ...s,
              ref: t,
              children: (0, a.jsx)(r.bU, {
                className: (0, i.cn)(o({ size: d })),
              }),
            });
          });
        l.displayName = r.fC.displayName;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7186, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621,
          3954, 659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985,
          5518, 5538, 997, 6492, 672, 1456, 2549, 1379, 272, 3861, 2728, 245,
          5767, 876, 5433, 9903, 5210, 3443, 6273, 6724, 7027, 8997, 9774, 2888,
          179,
        ],
        function () {
          return e((e.s = 72443));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
