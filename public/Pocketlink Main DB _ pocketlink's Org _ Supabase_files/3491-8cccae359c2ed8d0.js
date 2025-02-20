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
      (e._sentryDebugIds[t] = '02c9cc6b-90c7-4b94-acdc-4875132ee5e4'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-02c9cc6b-90c7-4b94-acdc-4875132ee5e4'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3491],
  {
    50497: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('ArrowLeft', [
        ['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
        ['path', { d: 'M19 12H5', key: 'x3x0zl' }],
      ]);
    },
    28519: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('Blocks', [
        [
          'rect',
          { width: '7', height: '7', x: '14', y: '3', rx: '1', key: '6d4xhi' },
        ],
        [
          'path',
          {
            d: 'M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3',
            key: '1fpvtg',
          },
        ],
      ]);
    },
    33342: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('Command', [
        [
          'path',
          {
            d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3',
            key: '11bfej',
          },
        ],
      ]);
    },
    58296: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('Lightbulb', [
        [
          'path',
          {
            d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
            key: '1gvzjb',
          },
        ],
        ['path', { d: 'M9 18h6', key: 'x1upvd' }],
        ['path', { d: 'M10 22h4', key: 'ceow96' }],
      ]);
    },
    26056: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('List', [
        ['line', { x1: '8', x2: '21', y1: '6', y2: '6', key: '7ey8pc' }],
        ['line', { x1: '8', x2: '21', y1: '12', y2: '12', key: 'rjfblc' }],
        ['line', { x1: '8', x2: '21', y1: '18', y2: '18', key: 'c3b1m8' }],
        ['line', { x1: '3', x2: '3.01', y1: '6', y2: '6', key: '1g7gq3' }],
        ['line', { x1: '3', x2: '3.01', y1: '12', y2: '12', key: '1pjlvk' }],
        ['line', { x1: '3', x2: '3.01', y1: '18', y2: '18', key: '28t2mc' }],
      ]);
    },
    71042: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      let r = (0, n(98266).Z)('Menu', [
        ['line', { x1: '4', x2: '20', y1: '12', y2: '12', key: '1e0a9i' }],
        ['line', { x1: '4', x2: '20', y1: '6', y2: '6', key: '1owob3' }],
        ['line', { x1: '4', x2: '20', y1: '18', y2: '18', key: 'yk5zj1' }],
      ]);
    },
    36696: function (e, t, n) {
      let r;
      n.d(t, {
        VY: function () {
          return T;
        },
        fC: function () {
          return O;
        },
        h_: function () {
          return S;
        },
        xz: function () {
          return R;
        },
      });
      var o = n(83573),
        i = n(52983),
        c = n(12527),
        a = n(95831),
        u = n(29650),
        l = n(61031),
        s = n(40292),
        d = n(45409),
        f = n(96501),
        p = n(36986),
        y = n(94259);
      let h = 'HoverCard',
        [v, x] = (0, a.b)(h, [s.D7]),
        b = (0, s.D7)(),
        [w, C] = v(h),
        m = (0, i.forwardRef)((e, t) => {
          let { __scopeHoverCard: n, ...r } = e,
            a = C('HoverCardTrigger', n),
            u = b(n);
          return (0, i.createElement)(
            s.ee,
            (0, o.Z)({ asChild: !0 }, u),
            (0, i.createElement)(
              p.WV.a,
              (0, o.Z)({ 'data-state': a.open ? 'open' : 'closed' }, r, {
                ref: t,
                onPointerEnter: (0, c.M)(e.onPointerEnter, P(a.onOpen)),
                onPointerLeave: (0, c.M)(e.onPointerLeave, P(a.onClose)),
                onFocus: (0, c.M)(e.onFocus, a.onOpen),
                onBlur: (0, c.M)(e.onBlur, a.onClose),
                onTouchStart: (0, c.M)(e.onTouchStart, (e) =>
                  e.preventDefault()
                ),
              })
            )
          );
        }),
        E = 'HoverCardPortal',
        [k, g] = v(E, { forceMount: void 0 }),
        D = 'HoverCardContent',
        _ = (0, i.forwardRef)((e, t) => {
          let n = g(D, e.__scopeHoverCard),
            { forceMount: r = n.forceMount, ...a } = e,
            u = C(D, e.__scopeHoverCard);
          return (0, i.createElement)(
            f.z,
            { present: r || u.open },
            (0, i.createElement)(
              M,
              (0, o.Z)({ 'data-state': u.open ? 'open' : 'closed' }, a, {
                onPointerEnter: (0, c.M)(e.onPointerEnter, P(u.onOpen)),
                onPointerLeave: (0, c.M)(e.onPointerLeave, P(u.onClose)),
                ref: t,
              })
            )
          );
        }),
        M = (0, i.forwardRef)((e, t) => {
          let {
              __scopeHoverCard: n,
              onEscapeKeyDown: a,
              onPointerDownOutside: u,
              onFocusOutside: d,
              onInteractOutside: f,
              ...p
            } = e,
            h = C(D, n),
            v = b(n),
            x = (0, i.useRef)(null),
            w = (0, l.e)(t, x),
            [m, E] = (0, i.useState)(!1);
          return (
            (0, i.useEffect)(() => {
              if (m) {
                let e = document.body;
                return (
                  (r = e.style.userSelect || e.style.webkitUserSelect),
                  (e.style.userSelect = 'none'),
                  (e.style.webkitUserSelect = 'none'),
                  () => {
                    ((e.style.userSelect = r), (e.style.webkitUserSelect = r));
                  }
                );
              }
            }, [m]),
            (0, i.useEffect)(() => {
              if (x.current) {
                let e = () => {
                  (E(!1),
                    (h.isPointerDownOnContentRef.current = !1),
                    setTimeout(() => {
                      var e;
                      (null === (e = document.getSelection()) || void 0 === e
                        ? void 0
                        : e.toString()) !== '' &&
                        (h.hasSelectionRef.current = !0);
                    }));
                };
                return (
                  document.addEventListener('pointerup', e),
                  () => {
                    (document.removeEventListener('pointerup', e),
                      (h.hasSelectionRef.current = !1),
                      (h.isPointerDownOnContentRef.current = !1));
                  }
                );
              }
            }, [h.isPointerDownOnContentRef, h.hasSelectionRef]),
            (0, i.useEffect)(() => {
              x.current &&
                (function (e) {
                  let t = [],
                    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                      acceptNode: (e) =>
                        e.tabIndex >= 0
                          ? NodeFilter.FILTER_ACCEPT
                          : NodeFilter.FILTER_SKIP,
                    });
                  for (; n.nextNode(); ) t.push(n.currentNode);
                  return t;
                })(x.current).forEach((e) => e.setAttribute('tabindex', '-1'));
            }),
            (0, i.createElement)(
              y.XB,
              {
                asChild: !0,
                disableOutsidePointerEvents: !1,
                onInteractOutside: f,
                onEscapeKeyDown: a,
                onPointerDownOutside: u,
                onFocusOutside: (0, c.M)(d, (e) => {
                  e.preventDefault();
                }),
                onDismiss: h.onDismiss,
              },
              (0, i.createElement)(
                s.VY,
                (0, o.Z)({}, v, p, {
                  onPointerDown: (0, c.M)(p.onPointerDown, (e) => {
                    (e.currentTarget.contains(e.target) && E(!0),
                      (h.hasSelectionRef.current = !1),
                      (h.isPointerDownOnContentRef.current = !0));
                  }),
                  ref: w,
                  style: {
                    ...p.style,
                    userSelect: m ? 'text' : void 0,
                    WebkitUserSelect: m ? 'text' : void 0,
                    '--radix-hover-card-content-transform-origin':
                      'var(--radix-popper-transform-origin)',
                    '--radix-hover-card-content-available-width':
                      'var(--radix-popper-available-width)',
                    '--radix-hover-card-content-available-height':
                      'var(--radix-popper-available-height)',
                    '--radix-hover-card-trigger-width':
                      'var(--radix-popper-anchor-width)',
                    '--radix-hover-card-trigger-height':
                      'var(--radix-popper-anchor-height)',
                  },
                })
              )
            )
          );
        });
      function P(e) {
        return (t) => ('touch' === t.pointerType ? void 0 : e());
      }
      let O = (e) => {
          let {
              __scopeHoverCard: t,
              children: n,
              open: r,
              defaultOpen: o,
              onOpenChange: c,
              openDelay: a = 700,
              closeDelay: l = 300,
            } = e,
            d = b(t),
            f = (0, i.useRef)(0),
            p = (0, i.useRef)(0),
            y = (0, i.useRef)(!1),
            h = (0, i.useRef)(!1),
            [v = !1, x] = (0, u.T)({ prop: r, defaultProp: o, onChange: c }),
            C = (0, i.useCallback)(() => {
              (clearTimeout(p.current),
                (f.current = window.setTimeout(() => x(!0), a)));
            }, [a, x]),
            m = (0, i.useCallback)(() => {
              (clearTimeout(f.current),
                y.current ||
                  h.current ||
                  (p.current = window.setTimeout(() => x(!1), l)));
            }, [l, x]),
            E = (0, i.useCallback)(() => x(!1), [x]);
          return (
            (0, i.useEffect)(
              () => () => {
                (clearTimeout(f.current), clearTimeout(p.current));
              },
              []
            ),
            (0, i.createElement)(
              w,
              {
                scope: t,
                open: v,
                onOpenChange: x,
                onOpen: C,
                onClose: m,
                onDismiss: E,
                hasSelectionRef: y,
                isPointerDownOnContentRef: h,
              },
              (0, i.createElement)(s.fC, d, n)
            )
          );
        },
        R = m,
        S = (e) => {
          let {
              __scopeHoverCard: t,
              forceMount: n,
              children: r,
              container: o,
            } = e,
            c = C(E, t);
          return (0, i.createElement)(
            k,
            { scope: t, forceMount: n },
            (0, i.createElement)(
              f.z,
              { present: n || c.open },
              (0, i.createElement)(d.h, { asChild: !0, container: o }, r)
            )
          );
        },
        T = _;
    },
  },
]);
