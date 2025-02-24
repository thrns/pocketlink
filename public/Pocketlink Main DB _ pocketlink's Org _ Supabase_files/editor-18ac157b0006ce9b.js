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
      (e._sentryDebugIds[t] = '036850d6-d88a-4a5a-bbf3-7adfdd14ceb5'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-036850d6-d88a-4a5a-bbf3-7adfdd14ceb5'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9578],
    {
      10063: function (e, t, n) {
        'use strict';
        var r = n(99415),
          i = {
            childContextTypes: !0,
            contextType: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            getDerivedStateFromError: !0,
            getDerivedStateFromProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0,
          },
          o = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0,
          },
          a = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0,
          },
          u = {};
        function c(e) {
          return r.isMemo(e) ? a : u[e.$$typeof] || i;
        }
        ((u[r.ForwardRef] = {
          $$typeof: !0,
          render: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
        }),
          (u[r.Memo] = a));
        var l = Object.defineProperty,
          s = Object.getOwnPropertyNames,
          f = Object.getOwnPropertySymbols,
          d = Object.getOwnPropertyDescriptor,
          v = Object.getPrototypeOf,
          p = Object.prototype;
        e.exports = function e(t, n, r) {
          if ('string' != typeof n) {
            if (p) {
              var i = v(n);
              i && i !== p && e(t, i, r);
            }
            var a = s(n);
            f && (a = a.concat(f(n)));
            for (var u = c(t), y = c(n), m = 0; m < a.length; ++m) {
              var h = a[m];
              if (!o[h] && !(r && r[h]) && !(y && y[h]) && !(u && u[h])) {
                var g = d(n, h);
                try {
                  l(t, h, g);
                } catch (e) {}
              }
            }
          }
          return t;
        };
      },
      8660: function (e) {
        e.exports = function (e, t, n, r) {
          for (var i = -1, o = null == e ? 0 : e.length; ++i < o; ) {
            var a = e[i];
            t(r, a, n(a), e);
          }
          return r;
        };
      },
      3792: function (e, t, n) {
        var r = n(61701);
        e.exports = function (e, t, n, i) {
          return (
            r(e, function (e, r, o) {
              t(i, e, n(e), o);
            }),
            i
          );
        };
      },
      32586: function (e) {
        var t = Object.prototype.hasOwnProperty;
        e.exports = function (e, n) {
          return null != e && t.call(e, n);
        };
      },
      17325: function (e, t, n) {
        var r = n(8660),
          i = n(3792),
          o = n(55833),
          a = n(55589);
        e.exports = function (e, t) {
          return function (n, u) {
            var c = a(n) ? r : i,
              l = t ? t() : {};
            return c(n, e, o(u, 2), l);
          };
        };
      },
      11286: function (e, t, n) {
        var r = n(77379),
          i = n(98132),
          o = n(96843),
          a = Math.ceil,
          u = Math.max;
        e.exports = function (e, t, n) {
          t = (n ? i(e, t, n) : void 0 === t) ? 1 : u(o(t), 0);
          var c = null == e ? 0 : e.length;
          if (!c || t < 1) return [];
          for (var l = 0, s = 0, f = Array(a(c / t)); l < c; )
            f[s++] = r(e, l, (l += t));
          return f;
        };
      },
      62923: function (e, t, n) {
        var r = n(22825);
        e.exports = function (e) {
          return (null == e ? 0 : e.length) ? r(e, 1) : [];
        };
      },
      45346: function (e, t, n) {
        var r = n(32586),
          i = n(13544);
        e.exports = function (e, t) {
          return null != e && i(e, t, r);
        };
      },
      29787: function (e, t, n) {
        var r = n(41351),
          i = n(87493),
          o = n(79312),
          a = n(55589),
          u = n(30568),
          c = n(91052),
          l = n(32840),
          s = n(50922),
          f = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          if (null == e) return !0;
          if (
            u(e) &&
            (a(e) ||
              'string' == typeof e ||
              'function' == typeof e.splice ||
              c(e) ||
              s(e) ||
              o(e))
          )
            return !e.length;
          var t = i(e);
          if ('[object Map]' == t || '[object Set]' == t) return !e.size;
          if (l(e)) return !r(e).length;
          for (var n in e) if (f.call(e, n)) return !1;
          return !0;
        };
      },
      35525: function (e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/editor',
          function () {
            return n(84918);
          },
        ]);
      },
      3323: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('AlignLeft', [
          ['line', { x1: '21', x2: '3', y1: '6', y2: '6', key: '1fp77t' }],
          ['line', { x1: '15', x2: '3', y1: '12', y2: '12', key: 'v6grx8' }],
          ['line', { x1: '17', x2: '3', y1: '18', y2: '18', key: '1awlsn' }],
        ]);
      },
      49296: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Ellipsis', [
          ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
          ['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
          ['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
        ]);
      },
      38536: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Hash', [
          ['line', { x1: '4', x2: '20', y1: '9', y2: '9', key: '4lhtct' }],
          ['line', { x1: '4', x2: '20', y1: '15', y2: '15', key: 'vyu0kd' }],
          ['line', { x1: '10', x2: '8', y1: '3', y2: '21', key: '1ggp8o' }],
          ['line', { x1: '16', x2: '14', y1: '3', y2: '21', key: 'weycgp' }],
        ]);
      },
      2433: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('House', [
          [
            'path',
            { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' },
          ],
          [
            'path',
            {
              d: 'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
              key: '1d0kgt',
            },
          ],
        ]);
      },
      93164: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ListPlus', [
          ['path', { d: 'M11 12H3', key: '51ecnj' }],
          ['path', { d: 'M16 6H3', key: '1wxfjs' }],
          ['path', { d: 'M16 18H3', key: '12xzn7' }],
          ['path', { d: 'M18 9v6', key: '1twb98' }],
          ['path', { d: 'M21 12h-6', key: 'bt1uis' }],
        ]);
      },
      41111: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('OctagonAlert', [
          ['path', { d: 'M12 16h.01', key: '1drbdi' }],
          ['path', { d: 'M12 8v4', key: '1got3b' }],
          [
            'path',
            {
              d: 'M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z',
              key: '1fd625',
            },
          ],
        ]);
      },
      34133: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Pen', [
          [
            'path',
            {
              d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
              key: '1a8usu',
            },
          ],
        ]);
      },
      39057: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Pointer', [
          ['path', { d: 'M22 14a8 8 0 0 1-8 8', key: '56vcr3' }],
          [
            'path',
            { d: 'M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2', key: '1agjmk' },
          ],
          [
            'path',
            { d: 'M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1', key: 'wdbh2u' },
          ],
          [
            'path',
            { d: 'M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10', key: '1ibuk9' },
          ],
          [
            'path',
            {
              d: 'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
              key: 'g6ys72',
            },
          ],
        ]);
      },
      5211: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('RefreshCw', [
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
      33319: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ShieldOff', [
          ['path', { d: 'm2 2 20 20', key: '1ooewy' }],
          [
            'path',
            {
              d: 'M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71',
              key: '1jlk70',
            },
          ],
          [
            'path',
            {
              d: 'M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264',
              key: '18rp1v',
            },
          ],
        ]);
      },
      97061: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ToggleRight', [
          [
            'rect',
            {
              width: '20',
              height: '12',
              x: '2',
              y: '6',
              rx: '6',
              ry: '6',
              key: 'f2vt7d',
            },
          ],
          ['circle', { cx: '16', cy: '12', r: '2', key: '4ma0v8' }],
        ]);
      },
      64050: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Type', [
          ['polyline', { points: '4 7 4 4 20 4 20 7', key: '1nosan' }],
          ['line', { x1: '9', x2: '15', y1: '20', y2: '20', key: 'swin9y' }],
          ['line', { x1: '12', x2: '12', y1: '4', y2: '20', key: '1tx1rr' }],
        ]);
      },
      84918: function (e, t, n) {
        'use strict';
        n.r(t);
        var r = n(97458),
          i = n(32691),
          o = n(12436),
          a = n(46908),
          u = n(67333),
          c = n(95767),
          l = n(63165);
        let s = () => {
          let { ref: e } = (0, o.UO)(),
            t = (0, i.useRouter)();
          return (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)(a.Z, {
                'data-sentry-element': 'EmptyState',
                'data-sentry-source-file': 'index.tsx',
              }),
              (0, r.jsx)(u.Z, {
                onTableCreated: (n) => {
                  t.push('/project/'.concat(e, '/editor/').concat(n.id));
                },
                'data-sentry-element': 'SidePanelEditor',
                'data-sentry-source-file': 'index.tsx',
              }),
            ],
          });
        };
        ((s.getLayout = (e) =>
          (0, r.jsx)(c.Z, { children: (0, r.jsx)(l.Z, { children: e }) })),
          (t.default = s));
      },
      70717: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z0: function () {
            return T;
          },
          av: function () {
            return m;
          },
          ck: function () {
            return _;
          },
          rS: function () {
            return M;
          },
          v2: function () {
            return E;
          },
        });
        var r,
          i = n(52983),
          o = n(14517),
          a = n(73656);
        function u() {
          return (u =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }).apply(this, arguments);
        }
        function c(e, t) {
          if (null == e) return {};
          var n,
            r,
            i = {},
            o = Object.keys(e);
          for (r = 0; r < o.length; r++)
            ((n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]));
          return i;
        }
        var l = (0, i.createContext)({});
        function s() {
          return (0, i.useContext)(l);
        }
        var f = function (e) {
            return i.createElement(
              l.Provider,
              { value: e.refTracker },
              e.children
            );
          },
          d =
            ((r = new Map()),
            {
              on: function (e, t) {
                var n;
                return (
                  r.has(e)
                    ? null == (n = r.get(e)) || n.add(t)
                    : r.set(e, new Set([t])),
                  this
                );
              },
              off: function (e, t) {
                return (t ? r.get(e).delete(t) : r.delete(e), this);
              },
              emit: function (e, t) {
                return (
                  'production' === a.env.NODE ||
                    r.has(e) ||
                    0 === e ||
                    console.error(
                      'It seems that the menu you are trying to display is not renderer or you have a menu id mismatch.',
                      'You used the menu id: ' + e
                    ),
                  r.has(e) &&
                    r.get(e).forEach(function (e) {
                      e(t);
                    }),
                  this
                );
              },
            });
        function v() {
          return (0, i.useRef)(new Map()).current;
        }
        var p = function (e) {
            var t = e.id,
              n = e.event,
              r = e.props,
              i = e.position;
            (n.preventDefault && n.preventDefault(),
              d
                .emit(0)
                .emit(t, { event: n.nativeEvent || n, props: r, position: i }));
          },
          y = function () {
            d.emit(0);
          };
        function m(e) {
          return {
            show: function (t, n) {
              p({
                id: (null == n ? void 0 : n.id) || (null == e ? void 0 : e.id),
                props:
                  (null == n ? void 0 : n.props) ||
                  (null == e ? void 0 : e.props),
                event: t,
                position: null == n ? void 0 : n.position,
              });
            },
            hideAll: function () {
              y();
            },
          };
        }
        var h = function () {};
        function g(e) {
          return 'function' == typeof e;
        }
        function x(e) {
          return 'string' == typeof e;
        }
        function b(e, t) {
          return i.Children.map(
            i.Children.toArray(e).filter(Boolean),
            function (e) {
              return (0, i.cloneElement)(e, t);
            }
          );
        }
        function w(e, t) {
          return g(e) ? e(t) : e;
        }
        function k(e, t) {
          return g(t) ? u({}, e, t(e)) : u({}, e, t);
        }
        var E = function (e) {
            var t,
              n,
              r,
              a,
              l,
              s = e.id,
              p = e.theme,
              y = e.style,
              m = e.className,
              g = e.children,
              w = e.animation,
              E = void 0 === w ? 'scale' : w,
              _ = e.onHidden,
              T = void 0 === _ ? h : _,
              M = e.onShown,
              Z = void 0 === M ? h : M,
              N = c(e, [
                'id',
                'theme',
                'style',
                'className',
                'children',
                'animation',
                'onHidden',
                'onShown',
              ]),
              L = (0, i.useReducer)(k, {
                x: 0,
                y: 0,
                visible: !1,
                triggerEvent: {},
                propsFromTrigger: null,
                willLeave: !1,
              }),
              O = L[0],
              j = L[1],
              P = (0, i.useRef)(null),
              S = (0, i.useRef)(!1),
              D =
                ((t = O.visible),
                (n = (0, i.useRef)()),
                (0, i.useEffect)(
                  function () {
                    n.current = t;
                  },
                  [t]
                ),
                n.current),
              R = v(),
              A = (0, i.useState)(function () {
                return (function () {
                  var e,
                    t,
                    n,
                    r,
                    i = new Map(),
                    o = !1;
                  function a() {
                    r[e].node.focus();
                  }
                  function u() {
                    return -1 !== e || (c(), !1);
                  }
                  function c() {
                    (e + 1 < r.length ? e++ : e + 1 === r.length && (e = 0),
                      o && l(),
                      a());
                  }
                  function l() {
                    if (u() && !n) {
                      var c = i.get(t),
                        l = c.isRoot,
                        s = c.items,
                        f = c.focusedIndex,
                        d = c.parentNode;
                      (t.classList.remove('react-contexify__submenu--is-open'),
                        (r = s),
                        (t = d),
                        l && ((n = !0), i.clear()),
                        o || ((e = f), a()));
                    }
                  }
                  return {
                    init: function (t) {
                      ((r = t), (e = -1), (n = !0));
                    },
                    moveDown: c,
                    moveUp: function () {
                      (-1 === e || 0 === e
                        ? (e = r.length - 1)
                        : e - 1 < r.length && e--,
                        o && l(),
                        a());
                    },
                    openSubmenu: function () {
                      if (u() && e >= 0 && r[e].isSubmenu) {
                        var c = Array.from(r[e].submenuRefTracker.values()),
                          l = r[e].node;
                        return (
                          i.set(l, {
                            isRoot: n,
                            focusedIndex: e,
                            parentNode: t || l,
                            items: r,
                          }),
                          l.classList.add('react-contexify__submenu--is-open'),
                          (t = l),
                          c.length > 0 ? ((e = 0), (r = c)) : (o = !0),
                          (n = !1),
                          a(),
                          !0
                        );
                      }
                      return !1;
                    },
                    closeSubmenu: l,
                  };
                })();
              })[0];
            function C(e) {
              var t,
                n = e.event,
                r = e.props,
                i = e.position;
              n.stopPropagation();
              var o =
                  i ||
                  ((t = { x: 0, y: 0 }),
                  'touchend' === n.type &&
                  n.changedTouches &&
                  n.changedTouches.length > 0
                    ? ((t.x = n.changedTouches[0].clientX),
                      (t.y = n.changedTouches[0].clientY))
                    : ((t.x = n.clientX), (t.y = n.clientY)),
                  (!t.x || t.x < 0) && (t.x = 0),
                  (!t.y || t.y < 0) && (t.y = 0),
                  t),
                a = o.x,
                u = o.y;
              setTimeout(function () {
                j({
                  visible: !0,
                  willLeave: !1,
                  x: a,
                  y: u,
                  triggerEvent: n,
                  propsFromTrigger: r,
                });
              }, 0);
            }
            function F(e) {
              (void 0 === e ||
                (2 !== e.button && !0 !== e.ctrlKey) ||
                'contextmenu' === e.type) &&
                (E && (x(E) || ('exit' in E && E.exit))
                  ? j(function (e) {
                      return { willLeave: e.visible };
                    })
                  : j(function (e) {
                      return { visible: !e.visible && e.visible };
                    }));
            }
            ((0, i.useEffect)(
              function () {
                return (
                  (S.current = !0),
                  d.on(s, C).on(0, F),
                  function () {
                    d.off(s, C).off(0, F);
                  }
                );
              },
              [s]
            ),
              (0, i.useEffect)(
                function () {
                  S.current && O.visible !== D && (O.visible ? Z() : T());
                },
                [O.visible, T, Z]
              ),
              (0, i.useEffect)(
                function () {
                  O.visible ? A.init(Array.from(R.values())) : R.clear();
                },
                [O.visible, A, R]
              ),
              (0, i.useEffect)(
                function () {
                  if (O.visible) {
                    var e = window,
                      t = e.innerWidth,
                      n = e.innerHeight,
                      r = P.current,
                      i = r.offsetWidth,
                      o = r.offsetHeight,
                      a = O.x,
                      u = O.y;
                    (a + i > t && (a -= a + i - t),
                      u + o > n && (u -= u + o - n),
                      j({ x: a, y: u }));
                  }
                },
                [O.visible]
              ),
              (0, i.useEffect)(
                function () {
                  function e(e) {
                    switch ((e.preventDefault(), e.key)) {
                      case 'Enter':
                        A.openSubmenu() || F();
                        break;
                      case 'Escape':
                        F();
                        break;
                      case 'ArrowUp':
                        A.moveUp();
                        break;
                      case 'ArrowDown':
                        A.moveDown();
                        break;
                      case 'ArrowRight':
                        A.openSubmenu();
                        break;
                      case 'ArrowLeft':
                        A.closeSubmenu();
                    }
                  }
                  return (
                    O.visible &&
                      (window.addEventListener('resize', F),
                      window.addEventListener('contextmenu', F),
                      window.addEventListener('click', F),
                      window.addEventListener('scroll', F),
                      window.addEventListener('keydown', e),
                      window.addEventListener('blur', F)),
                    function () {
                      (window.removeEventListener('resize', F),
                        window.removeEventListener('contextmenu', F),
                        window.removeEventListener('click', F),
                        window.removeEventListener('scroll', F),
                        window.removeEventListener('keydown', e),
                        window.removeEventListener('blur', F));
                    }
                  );
                },
                [O.visible, A]
              ));
            var H = O.visible,
              I = O.triggerEvent,
              $ = O.propsFromTrigger,
              z = O.x,
              V = O.y,
              W = O.willLeave,
              U = (0, o.default)(
                'react-contexify',
                m,
                (((l = {})['react-contexify__theme--' + p] = p), l),
                E
                  ? x(E)
                    ? (0, o.default)(
                        (((r = {})['react-contexify__will-enter--' + E] =
                          E && H && !W),
                        (r[
                          'react-contexify__will-leave--' +
                            E +
                            " react-contexify__will-leave--'disabled'"
                        ] = E && H && W),
                        r)
                      )
                    : 'enter' in E && 'exit' in E
                      ? (0, o.default)(
                          (((a = {})[
                            'react-contexify__will-enter--' + E.enter
                          ] = E.enter && H && !W),
                          (a[
                            'react-contexify__will-leave--' +
                              E.exit +
                              " react-contexify__will-leave--'disabled'"
                          ] = E.exit && H && W),
                          a)
                        )
                      : null
                  : null
              ),
              X = u({}, y, { left: z, top: V, opacity: 1 });
            return i.createElement(
              f,
              { refTracker: R },
              H &&
                i.createElement(
                  'div',
                  Object.assign({}, N, {
                    className: U,
                    onAnimationEnd: function () {
                      O.willLeave &&
                        O.visible &&
                        j({ visible: !1, willLeave: !1 });
                    },
                    style: X,
                    ref: P,
                    role: 'menu',
                  }),
                  b(g, { propsFromTrigger: $, triggerEvent: I })
                )
            );
          },
          _ = function (e) {
            var t,
              n = e.children,
              r = e.className,
              a = e.style,
              u = e.triggerEvent,
              l = e.data,
              f = e.propsFromTrigger,
              d = e.onClick,
              v = void 0 === d ? h : d,
              p = e.disabled,
              y = e.hidden,
              m = c(e, [
                'children',
                'className',
                'style',
                'triggerEvent',
                'data',
                'propsFromTrigger',
                'onClick',
                'disabled',
                'hidden',
              ]),
              g = s(),
              x = { data: l, triggerEvent: u, props: f },
              b = w(void 0 !== p && p, x);
            if (w(void 0 !== y && y, x)) return null;
            var k = (0, o.default)(
              'react-contexify__item',
              r,
              (((t = {})['react-contexify__item--disabled'] = b), t)
            );
            return i.createElement(
              'div',
              Object.assign({}, m, {
                className: k,
                style: a,
                onClick: function (e) {
                  ((x.event = e), b ? e.stopPropagation() : v(x));
                },
                onKeyDown: function (e) {
                  'Enter' === e.key && ((x.event = e), v(x));
                },
                ref: function (e) {
                  e && !b && g.set(e, { node: e, isSubmenu: !1 });
                },
                tabIndex: -1,
                role: 'menuitem',
                'aria-disabled': b,
              }),
              i.createElement(
                'div',
                { className: 'react-contexify__item__content' },
                n
              )
            );
          };
        function T() {
          return i.createElement('div', {
            className: 'react-contexify__separator',
          });
        }
        var M = function (e) {
          var t,
            n = e.arrow,
            r = e.children,
            a = e.disabled,
            l = e.hidden,
            d = e.label,
            p = e.className,
            y = e.triggerEvent,
            m = e.propsFromTrigger,
            h = e.style,
            g = c(e, [
              'arrow',
              'children',
              'disabled',
              'hidden',
              'label',
              'className',
              'triggerEvent',
              'propsFromTrigger',
              'style',
            ]),
            x = s(),
            k = v(),
            E = (0, i.useRef)(null),
            _ = (0, i.useState)({ left: '100%', top: 0, bottom: 'initial' }),
            T = _[0],
            M = _[1],
            Z = { triggerEvent: y, props: m },
            N = w(void 0 !== a && a, Z),
            L = w(void 0 !== l && l, Z);
          if (
            ((0, i.useEffect)(function () {
              if (E.current) {
                var e = window,
                  t = e.innerWidth,
                  n = e.innerHeight,
                  r = E.current.getBoundingClientRect(),
                  i = {};
                (r.right < t
                  ? ((i.left = '100%'), (i.right = void 0))
                  : ((i.right = '100%'), (i.left = void 0)),
                  r.bottom > n
                    ? ((i.bottom = 0), (i.top = 'initial'))
                    : (i.bottom = 'initial'),
                  M(i));
              }
            }, []),
            L)
          )
            return null;
          var O = (0, o.default)(
              'react-contexify__item',
              p,
              (((t = {})['react-contexify__item--disabled'] = N), t)
            ),
            j = u({}, h, T);
          return i.createElement(
            f,
            { refTracker: k },
            i.createElement(
              'div',
              Object.assign({}, g, {
                className: O,
                ref: function (e) {
                  e &&
                    !N &&
                    x.set(e, { node: e, isSubmenu: !0, submenuRefTracker: k });
                },
                tabIndex: -1,
                role: 'menuitem',
                'aria-haspopup': !0,
                'aria-disabled': N,
              }),
              i.createElement(
                'div',
                {
                  className: 'react-contexify__item__content',
                  onClick: function (e) {
                    e.stopPropagation();
                  },
                },
                d,
                i.createElement(
                  'span',
                  { className: 'react-contexify__submenu-arrow' },
                  void 0 === n ? '▶' : n
                )
              ),
              i.createElement(
                'div',
                {
                  className: 'react-contexify react-contexify__submenu',
                  ref: E,
                  style: j,
                },
                b(r, { propsFromTrigger: m, triggerEvent: y })
              )
            )
          );
        };
      },
      79161: function (e, t, n) {
        'use strict';
        n.d(t, {
          fC: function () {
            return x;
          },
          z$: function () {
            return b;
          },
        });
        var r = n(83573),
          i = n(52983),
          o = n(95831),
          a = n(36986);
        let u = 'Progress',
          [c, l] = (0, o.b)(u),
          [s, f] = c(u),
          d = (0, i.forwardRef)((e, t) => {
            let {
                __scopeProgress: n,
                value: o,
                max: u,
                getValueLabel: c = p,
                ...l
              } = e,
              f = h(u) ? u : 100,
              d = g(o, f) ? o : null,
              v = m(d) ? c(d, f) : void 0;
            return (0, i.createElement)(
              s,
              { scope: n, value: d, max: f },
              (0, i.createElement)(
                a.WV.div,
                (0, r.Z)(
                  {
                    'aria-valuemax': f,
                    'aria-valuemin': 0,
                    'aria-valuenow': m(d) ? d : void 0,
                    'aria-valuetext': v,
                    role: 'progressbar',
                    'data-state': y(d, f),
                    'data-value': null != d ? d : void 0,
                    'data-max': f,
                  },
                  l,
                  { ref: t }
                )
              )
            );
          });
        d.propTypes = {
          max(e, t, n) {
            let r = e[t],
              i = String(r);
            return r && !h(r)
              ? Error(
                  `Invalid prop \`max\` of value \`${i}\` supplied to \`${n}\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`
                )
              : null;
          },
          value(e, t, n) {
            let r = e[t],
              i = String(r),
              o = h(e.max) ? e.max : 100;
            return null == r || g(r, o)
              ? null
              : Error(`Invalid prop \`value\` of value \`${i}\` supplied to \`${n}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`);
          },
        };
        let v = (0, i.forwardRef)((e, t) => {
          var n;
          let { __scopeProgress: o, ...u } = e,
            c = f('ProgressIndicator', o);
          return (0, i.createElement)(
            a.WV.div,
            (0, r.Z)(
              {
                'data-state': y(c.value, c.max),
                'data-value':
                  null !== (n = c.value) && void 0 !== n ? n : void 0,
                'data-max': c.max,
              },
              u,
              { ref: t }
            )
          );
        });
        function p(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function y(e, t) {
          return null == e ? 'indeterminate' : e === t ? 'complete' : 'loading';
        }
        function m(e) {
          return 'number' == typeof e;
        }
        function h(e) {
          return m(e) && !isNaN(e) && e > 0;
        }
        function g(e, t) {
          return m(e) && !isNaN(e) && e <= t && e >= 0;
        }
        let x = d,
          b = v;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7186, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621,
          3954, 659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 3491,
          5538, 997, 6492, 2549, 1379, 272, 3861, 2728, 245, 5767, 9903, 5210,
          6724, 8997, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 35525));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
