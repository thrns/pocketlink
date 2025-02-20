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
      (e._sentryDebugIds[t] = '3554c879-b731-404a-9e7a-47db9053b2d3'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-3554c879-b731-404a-9e7a-47db9053b2d3'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1456, 3491],
    {
      8660: function (e) {
        e.exports = function (e, t, n, r) {
          for (var i = -1, o = null == e ? 0 : e.length; ++i < o; ) {
            var c = e[i];
            t(r, c, n(c), e);
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
          c = n(55589);
        e.exports = function (e, t) {
          return function (n, a) {
            var u = c(n) ? r : i,
              l = t ? t() : {};
            return u(n, e, o(a, 2), l);
          };
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
          c = n(55589),
          a = n(30568),
          u = n(91052),
          l = n(32840),
          s = n(50922),
          d = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          if (null == e) return !0;
          if (
            a(e) &&
            (c(e) ||
              'string' == typeof e ||
              'function' == typeof e.splice ||
              u(e) ||
              s(e) ||
              o(e))
          )
            return !e.length;
          var t = i(e);
          if ('[object Map]' == t || '[object Set]' == t) return !e.size;
          if (l(e)) return !r(e).length;
          for (var n in e) if (d.call(e, n)) return !1;
          return !0;
        };
      },
      50497: function (e, t, n) {
        'use strict';
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
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Blocks', [
          [
            'rect',
            {
              width: '7',
              height: '7',
              x: '14',
              y: '3',
              rx: '1',
              key: '6d4xhi',
            },
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
        'use strict';
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
      58296: function (e, t, n) {
        'use strict';
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
        'use strict';
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
        'use strict';
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
      70717: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z0: function () {
            return C;
          },
          av: function () {
            return y;
          },
          ck: function () {
            return _;
          },
          rS: function () {
            return S;
          },
          v2: function () {
            return k;
          },
        });
        var r,
          i = n(52983),
          o = n(14517),
          c = n(73656);
        function a() {
          return (a =
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
        function u(e, t) {
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
        var d = function (e) {
            return i.createElement(
              l.Provider,
              { value: e.refTracker },
              e.children
            );
          },
          f =
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
                  'production' === c.env.NODE ||
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
              f
                .emit(0)
                .emit(t, { event: n.nativeEvent || n, props: r, position: i }));
          },
          h = function () {
            f.emit(0);
          };
        function y(e) {
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
              h();
            },
          };
        }
        var m = function () {};
        function b(e) {
          return 'function' == typeof e;
        }
        function g(e) {
          return 'string' == typeof e;
        }
        function w(e, t) {
          return i.Children.map(
            i.Children.toArray(e).filter(Boolean),
            function (e) {
              return (0, i.cloneElement)(e, t);
            }
          );
        }
        function x(e, t) {
          return b(e) ? e(t) : e;
        }
        function E(e, t) {
          return b(t) ? a({}, e, t(e)) : a({}, e, t);
        }
        var k = function (e) {
            var t,
              n,
              r,
              c,
              l,
              s = e.id,
              p = e.theme,
              h = e.style,
              y = e.className,
              b = e.children,
              x = e.animation,
              k = void 0 === x ? 'scale' : x,
              _ = e.onHidden,
              C = void 0 === _ ? m : _,
              S = e.onShown,
              T = void 0 === S ? m : S,
              L = u(e, [
                'id',
                'theme',
                'style',
                'className',
                'children',
                'animation',
                'onHidden',
                'onShown',
              ]),
              M = (0, i.useReducer)(E, {
                x: 0,
                y: 0,
                visible: !1,
                triggerEvent: {},
                propsFromTrigger: null,
                willLeave: !1,
              }),
              R = M[0],
              O = M[1],
              D = (0, i.useRef)(null),
              P = (0, i.useRef)(!1),
              N =
                ((t = R.visible),
                (n = (0, i.useRef)()),
                (0, i.useEffect)(
                  function () {
                    n.current = t;
                  },
                  [t]
                ),
                n.current),
              Z = v(),
              H = (0, i.useState)(function () {
                return (function () {
                  var e,
                    t,
                    n,
                    r,
                    i = new Map(),
                    o = !1;
                  function c() {
                    r[e].node.focus();
                  }
                  function a() {
                    return -1 !== e || (u(), !1);
                  }
                  function u() {
                    (e + 1 < r.length ? e++ : e + 1 === r.length && (e = 0),
                      o && l(),
                      c());
                  }
                  function l() {
                    if (a() && !n) {
                      var u = i.get(t),
                        l = u.isRoot,
                        s = u.items,
                        d = u.focusedIndex,
                        f = u.parentNode;
                      (t.classList.remove('react-contexify__submenu--is-open'),
                        (r = s),
                        (t = f),
                        l && ((n = !0), i.clear()),
                        o || ((e = d), c()));
                    }
                  }
                  return {
                    init: function (t) {
                      ((r = t), (e = -1), (n = !0));
                    },
                    moveDown: u,
                    moveUp: function () {
                      (-1 === e || 0 === e
                        ? (e = r.length - 1)
                        : e - 1 < r.length && e--,
                        o && l(),
                        c());
                    },
                    openSubmenu: function () {
                      if (a() && e >= 0 && r[e].isSubmenu) {
                        var u = Array.from(r[e].submenuRefTracker.values()),
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
                          u.length > 0 ? ((e = 0), (r = u)) : (o = !0),
                          (n = !1),
                          c(),
                          !0
                        );
                      }
                      return !1;
                    },
                    closeSubmenu: l,
                  };
                })();
              })[0];
            function j(e) {
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
                c = o.x,
                a = o.y;
              setTimeout(function () {
                O({
                  visible: !0,
                  willLeave: !1,
                  x: c,
                  y: a,
                  triggerEvent: n,
                  propsFromTrigger: r,
                });
              }, 0);
            }
            function F(e) {
              (void 0 === e ||
                (2 !== e.button && !0 !== e.ctrlKey) ||
                'contextmenu' === e.type) &&
                (k && (g(k) || ('exit' in k && k.exit))
                  ? O(function (e) {
                      return { willLeave: e.visible };
                    })
                  : O(function (e) {
                      return { visible: !e.visible && e.visible };
                    }));
            }
            ((0, i.useEffect)(
              function () {
                return (
                  (P.current = !0),
                  f.on(s, j).on(0, F),
                  function () {
                    f.off(s, j).off(0, F);
                  }
                );
              },
              [s]
            ),
              (0, i.useEffect)(
                function () {
                  P.current && R.visible !== N && (R.visible ? T() : C());
                },
                [R.visible, C, T]
              ),
              (0, i.useEffect)(
                function () {
                  R.visible ? H.init(Array.from(Z.values())) : Z.clear();
                },
                [R.visible, H, Z]
              ),
              (0, i.useEffect)(
                function () {
                  if (R.visible) {
                    var e = window,
                      t = e.innerWidth,
                      n = e.innerHeight,
                      r = D.current,
                      i = r.offsetWidth,
                      o = r.offsetHeight,
                      c = R.x,
                      a = R.y;
                    (c + i > t && (c -= c + i - t),
                      a + o > n && (a -= a + o - n),
                      O({ x: c, y: a }));
                  }
                },
                [R.visible]
              ),
              (0, i.useEffect)(
                function () {
                  function e(e) {
                    switch ((e.preventDefault(), e.key)) {
                      case 'Enter':
                        H.openSubmenu() || F();
                        break;
                      case 'Escape':
                        F();
                        break;
                      case 'ArrowUp':
                        H.moveUp();
                        break;
                      case 'ArrowDown':
                        H.moveDown();
                        break;
                      case 'ArrowRight':
                        H.openSubmenu();
                        break;
                      case 'ArrowLeft':
                        H.closeSubmenu();
                    }
                  }
                  return (
                    R.visible &&
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
                [R.visible, H]
              ));
            var I = R.visible,
              A = R.triggerEvent,
              z = R.propsFromTrigger,
              V = R.x,
              W = R.y,
              U = R.willLeave,
              B = (0, o.default)(
                'react-contexify',
                y,
                (((l = {})['react-contexify__theme--' + p] = p), l),
                k
                  ? g(k)
                    ? (0, o.default)(
                        (((r = {})['react-contexify__will-enter--' + k] =
                          k && I && !U),
                        (r[
                          'react-contexify__will-leave--' +
                            k +
                            " react-contexify__will-leave--'disabled'"
                        ] = k && I && U),
                        r)
                      )
                    : 'enter' in k && 'exit' in k
                      ? (0, o.default)(
                          (((c = {})[
                            'react-contexify__will-enter--' + k.enter
                          ] = k.enter && I && !U),
                          (c[
                            'react-contexify__will-leave--' +
                              k.exit +
                              " react-contexify__will-leave--'disabled'"
                          ] = k.exit && I && U),
                          c)
                        )
                      : null
                  : null
              ),
              q = a({}, h, { left: V, top: W, opacity: 1 });
            return i.createElement(
              d,
              { refTracker: Z },
              I &&
                i.createElement(
                  'div',
                  Object.assign({}, L, {
                    className: B,
                    onAnimationEnd: function () {
                      R.willLeave &&
                        R.visible &&
                        O({ visible: !1, willLeave: !1 });
                    },
                    style: q,
                    ref: D,
                    role: 'menu',
                  }),
                  w(b, { propsFromTrigger: z, triggerEvent: A })
                )
            );
          },
          _ = function (e) {
            var t,
              n = e.children,
              r = e.className,
              c = e.style,
              a = e.triggerEvent,
              l = e.data,
              d = e.propsFromTrigger,
              f = e.onClick,
              v = void 0 === f ? m : f,
              p = e.disabled,
              h = e.hidden,
              y = u(e, [
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
              b = s(),
              g = { data: l, triggerEvent: a, props: d },
              w = x(void 0 !== p && p, g);
            if (x(void 0 !== h && h, g)) return null;
            var E = (0, o.default)(
              'react-contexify__item',
              r,
              (((t = {})['react-contexify__item--disabled'] = w), t)
            );
            return i.createElement(
              'div',
              Object.assign({}, y, {
                className: E,
                style: c,
                onClick: function (e) {
                  ((g.event = e), w ? e.stopPropagation() : v(g));
                },
                onKeyDown: function (e) {
                  'Enter' === e.key && ((g.event = e), v(g));
                },
                ref: function (e) {
                  e && !w && b.set(e, { node: e, isSubmenu: !1 });
                },
                tabIndex: -1,
                role: 'menuitem',
                'aria-disabled': w,
              }),
              i.createElement(
                'div',
                { className: 'react-contexify__item__content' },
                n
              )
            );
          };
        function C() {
          return i.createElement('div', {
            className: 'react-contexify__separator',
          });
        }
        var S = function (e) {
          var t,
            n = e.arrow,
            r = e.children,
            c = e.disabled,
            l = e.hidden,
            f = e.label,
            p = e.className,
            h = e.triggerEvent,
            y = e.propsFromTrigger,
            m = e.style,
            b = u(e, [
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
            g = s(),
            E = v(),
            k = (0, i.useRef)(null),
            _ = (0, i.useState)({ left: '100%', top: 0, bottom: 'initial' }),
            C = _[0],
            S = _[1],
            T = { triggerEvent: h, props: y },
            L = x(void 0 !== c && c, T),
            M = x(void 0 !== l && l, T);
          if (
            ((0, i.useEffect)(function () {
              if (k.current) {
                var e = window,
                  t = e.innerWidth,
                  n = e.innerHeight,
                  r = k.current.getBoundingClientRect(),
                  i = {};
                (r.right < t
                  ? ((i.left = '100%'), (i.right = void 0))
                  : ((i.right = '100%'), (i.left = void 0)),
                  r.bottom > n
                    ? ((i.bottom = 0), (i.top = 'initial'))
                    : (i.bottom = 'initial'),
                  S(i));
              }
            }, []),
            M)
          )
            return null;
          var R = (0, o.default)(
              'react-contexify__item',
              p,
              (((t = {})['react-contexify__item--disabled'] = L), t)
            ),
            O = a({}, m, C);
          return i.createElement(
            d,
            { refTracker: E },
            i.createElement(
              'div',
              Object.assign({}, b, {
                className: R,
                ref: function (e) {
                  e &&
                    !L &&
                    g.set(e, { node: e, isSubmenu: !0, submenuRefTracker: E });
                },
                tabIndex: -1,
                role: 'menuitem',
                'aria-haspopup': !0,
                'aria-disabled': L,
              }),
              i.createElement(
                'div',
                {
                  className: 'react-contexify__item__content',
                  onClick: function (e) {
                    e.stopPropagation();
                  },
                },
                f,
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
                  ref: k,
                  style: O,
                },
                w(r, { propsFromTrigger: y, triggerEvent: h })
              )
            )
          );
        };
      },
      36696: function (e, t, n) {
        'use strict';
        let r;
        n.d(t, {
          VY: function () {
            return D;
          },
          fC: function () {
            return M;
          },
          h_: function () {
            return O;
          },
          xz: function () {
            return R;
          },
        });
        var i = n(83573),
          o = n(52983),
          c = n(12527),
          a = n(95831),
          u = n(29650),
          l = n(61031),
          s = n(40292),
          d = n(45409),
          f = n(96501),
          v = n(36986),
          p = n(94259);
        let h = 'HoverCard',
          [y, m] = (0, a.b)(h, [s.D7]),
          b = (0, s.D7)(),
          [g, w] = y(h),
          x = (0, o.forwardRef)((e, t) => {
            let { __scopeHoverCard: n, ...r } = e,
              a = w('HoverCardTrigger', n),
              u = b(n);
            return (0, o.createElement)(
              s.ee,
              (0, i.Z)({ asChild: !0 }, u),
              (0, o.createElement)(
                v.WV.a,
                (0, i.Z)({ 'data-state': a.open ? 'open' : 'closed' }, r, {
                  ref: t,
                  onPointerEnter: (0, c.M)(e.onPointerEnter, L(a.onOpen)),
                  onPointerLeave: (0, c.M)(e.onPointerLeave, L(a.onClose)),
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
          [k, _] = y(E, { forceMount: void 0 }),
          C = 'HoverCardContent',
          S = (0, o.forwardRef)((e, t) => {
            let n = _(C, e.__scopeHoverCard),
              { forceMount: r = n.forceMount, ...a } = e,
              u = w(C, e.__scopeHoverCard);
            return (0, o.createElement)(
              f.z,
              { present: r || u.open },
              (0, o.createElement)(
                T,
                (0, i.Z)({ 'data-state': u.open ? 'open' : 'closed' }, a, {
                  onPointerEnter: (0, c.M)(e.onPointerEnter, L(u.onOpen)),
                  onPointerLeave: (0, c.M)(e.onPointerLeave, L(u.onClose)),
                  ref: t,
                })
              )
            );
          }),
          T = (0, o.forwardRef)((e, t) => {
            let {
                __scopeHoverCard: n,
                onEscapeKeyDown: a,
                onPointerDownOutside: u,
                onFocusOutside: d,
                onInteractOutside: f,
                ...v
              } = e,
              h = w(C, n),
              y = b(n),
              m = (0, o.useRef)(null),
              g = (0, l.e)(t, m),
              [x, E] = (0, o.useState)(!1);
            return (
              (0, o.useEffect)(() => {
                if (x) {
                  let e = document.body;
                  return (
                    (r = e.style.userSelect || e.style.webkitUserSelect),
                    (e.style.userSelect = 'none'),
                    (e.style.webkitUserSelect = 'none'),
                    () => {
                      ((e.style.userSelect = r),
                        (e.style.webkitUserSelect = r));
                    }
                  );
                }
              }, [x]),
              (0, o.useEffect)(() => {
                if (m.current) {
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
              (0, o.useEffect)(() => {
                m.current &&
                  (function (e) {
                    let t = [],
                      n = document.createTreeWalker(
                        e,
                        NodeFilter.SHOW_ELEMENT,
                        {
                          acceptNode: (e) =>
                            e.tabIndex >= 0
                              ? NodeFilter.FILTER_ACCEPT
                              : NodeFilter.FILTER_SKIP,
                        }
                      );
                    for (; n.nextNode(); ) t.push(n.currentNode);
                    return t;
                  })(m.current).forEach((e) =>
                    e.setAttribute('tabindex', '-1')
                  );
              }),
              (0, o.createElement)(
                p.XB,
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
                (0, o.createElement)(
                  s.VY,
                  (0, i.Z)({}, y, v, {
                    onPointerDown: (0, c.M)(v.onPointerDown, (e) => {
                      (e.currentTarget.contains(e.target) && E(!0),
                        (h.hasSelectionRef.current = !1),
                        (h.isPointerDownOnContentRef.current = !0));
                    }),
                    ref: g,
                    style: {
                      ...v.style,
                      userSelect: x ? 'text' : void 0,
                      WebkitUserSelect: x ? 'text' : void 0,
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
        function L(e) {
          return (t) => ('touch' === t.pointerType ? void 0 : e());
        }
        let M = (e) => {
            let {
                __scopeHoverCard: t,
                children: n,
                open: r,
                defaultOpen: i,
                onOpenChange: c,
                openDelay: a = 700,
                closeDelay: l = 300,
              } = e,
              d = b(t),
              f = (0, o.useRef)(0),
              v = (0, o.useRef)(0),
              p = (0, o.useRef)(!1),
              h = (0, o.useRef)(!1),
              [y = !1, m] = (0, u.T)({ prop: r, defaultProp: i, onChange: c }),
              w = (0, o.useCallback)(() => {
                (clearTimeout(v.current),
                  (f.current = window.setTimeout(() => m(!0), a)));
              }, [a, m]),
              x = (0, o.useCallback)(() => {
                (clearTimeout(f.current),
                  p.current ||
                    h.current ||
                    (v.current = window.setTimeout(() => m(!1), l)));
              }, [l, m]),
              E = (0, o.useCallback)(() => m(!1), [m]);
            return (
              (0, o.useEffect)(
                () => () => {
                  (clearTimeout(f.current), clearTimeout(v.current));
                },
                []
              ),
              (0, o.createElement)(
                g,
                {
                  scope: t,
                  open: y,
                  onOpenChange: m,
                  onOpen: w,
                  onClose: x,
                  onDismiss: E,
                  hasSelectionRef: p,
                  isPointerDownOnContentRef: h,
                },
                (0, o.createElement)(s.fC, d, n)
              )
            );
          },
          R = x,
          O = (e) => {
            let {
                __scopeHoverCard: t,
                forceMount: n,
                children: r,
                container: i,
              } = e,
              c = w(E, t);
            return (0, o.createElement)(
              k,
              { scope: t, forceMount: n },
              (0, o.createElement)(
                f.z,
                { present: n || c.open },
                (0, o.createElement)(d.h, { asChild: !0, container: i }, r)
              )
            );
          },
          D = S;
      },
      56384: function (e, t, n) {
        'use strict';
        n.d(t, {
          bU: function () {
            return E;
          },
          fC: function () {
            return x;
          },
        });
        var r = n(83573),
          i = n(52983),
          o = n(12527),
          c = n(61031),
          a = n(95831),
          u = n(29650),
          l = n(87178),
          s = n(56807),
          d = n(36986);
        let f = 'Switch',
          [v, p] = (0, a.b)(f),
          [h, y] = v(f),
          m = (0, i.forwardRef)((e, t) => {
            let {
                __scopeSwitch: n,
                name: a,
                checked: l,
                defaultChecked: s,
                required: f,
                disabled: v,
                value: p = 'on',
                onCheckedChange: y,
                ...m
              } = e,
              [b, x] = (0, i.useState)(null),
              E = (0, c.e)(t, (e) => x(e)),
              k = (0, i.useRef)(!1),
              _ = !b || !!b.closest('form'),
              [C = !1, S] = (0, u.T)({ prop: l, defaultProp: s, onChange: y });
            return (0, i.createElement)(
              h,
              { scope: n, checked: C, disabled: v },
              (0, i.createElement)(
                d.WV.button,
                (0, r.Z)(
                  {
                    type: 'button',
                    role: 'switch',
                    'aria-checked': C,
                    'aria-required': f,
                    'data-state': w(C),
                    'data-disabled': v ? '' : void 0,
                    disabled: v,
                    value: p,
                  },
                  m,
                  {
                    ref: E,
                    onClick: (0, o.M)(e.onClick, (e) => {
                      (S((e) => !e),
                        _ &&
                          ((k.current = e.isPropagationStopped()),
                          k.current || e.stopPropagation()));
                    }),
                  }
                )
              ),
              _ &&
                (0, i.createElement)(g, {
                  control: b,
                  bubbles: !k.current,
                  name: a,
                  value: p,
                  checked: C,
                  required: f,
                  disabled: v,
                  style: { transform: 'translateX(-100%)' },
                })
            );
          }),
          b = (0, i.forwardRef)((e, t) => {
            let { __scopeSwitch: n, ...o } = e,
              c = y('SwitchThumb', n);
            return (0, i.createElement)(
              d.WV.span,
              (0, r.Z)(
                {
                  'data-state': w(c.checked),
                  'data-disabled': c.disabled ? '' : void 0,
                },
                o,
                { ref: t }
              )
            );
          }),
          g = (e) => {
            let { control: t, checked: n, bubbles: o = !0, ...c } = e,
              a = (0, i.useRef)(null),
              u = (0, l.D)(n),
              d = (0, s.t)(t);
            return (
              (0, i.useEffect)(() => {
                let e = a.current,
                  t = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'checked'
                  ).set;
                if (u !== n && t) {
                  let r = new Event('click', { bubbles: o });
                  (t.call(e, n), e.dispatchEvent(r));
                }
              }, [u, n, o]),
              (0, i.createElement)(
                'input',
                (0, r.Z)(
                  { type: 'checkbox', 'aria-hidden': !0, defaultChecked: n },
                  c,
                  {
                    tabIndex: -1,
                    ref: a,
                    style: {
                      ...e.style,
                      ...d,
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
        function w(e) {
          return e ? 'checked' : 'unchecked';
        }
        let x = m,
          E = b;
      },
    },
  ]));
