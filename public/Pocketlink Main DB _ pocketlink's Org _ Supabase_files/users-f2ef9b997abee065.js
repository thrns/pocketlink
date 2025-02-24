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
      (e._sentryDebugIds[t] = '7bca0ff0-0754-41d9-bfa8-e79b7d7a383b'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-7bca0ff0-0754-41d9-bfa8-e79b7d7a383b'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [347],
    {
      12832: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return c;
          },
        });
        var r = n(97335),
          s = n.n(r),
          a = function () {
            return (a =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var s in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e;
              }).apply(this, arguments);
          },
          i = {
            key: function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return null;
            },
            onlyResolvesLast: !0,
          },
          o = (function () {
            function e(e) {
              ((this.config = e),
                (this.debounceSingleton = null),
                (this.debounceCache = {}));
            }
            return (
              (e.prototype._createDebouncedFunction = function () {
                var e,
                  t,
                  n = s()(
                    this.config.func,
                    this.config.wait,
                    this.config.options
                  );
                return (
                  this.config.options.onlyResolvesLast &&
                    ((e = n),
                    (t = null),
                    (n = function () {
                      for (
                        var n, r, s, a, i = [], o = 0;
                        o < arguments.length;
                        o++
                      )
                        i[o] = arguments[o];
                      t && t();
                      var c =
                          ((n = e.apply(void 0, i)),
                          (r = null),
                          (s = null),
                          (a = new Promise(function (e, t) {
                            ((r = e), (s = t));
                          })),
                          n &&
                            n.then(
                              function (e) {
                                r && r(e);
                              },
                              function (e) {
                                s && s(e);
                              }
                            ),
                          {
                            promise: a,
                            resolve: function (e) {
                              r && r(e);
                            },
                            reject: function (e) {
                              s && s(e);
                            },
                            cancel: function () {
                              ((r = null), (s = null));
                            },
                          }),
                        l = c.promise;
                      return ((t = c.cancel), l);
                    })),
                  { func: n }
                );
              }),
              (e.prototype.getDebouncedFunction = function (e) {
                var t,
                  n = (t = this.config.options).key.apply(t, e);
                return null == n
                  ? (this.debounceSingleton ||
                      (this.debounceSingleton =
                        this._createDebouncedFunction()),
                    this.debounceSingleton)
                  : (this.debounceCache[n] ||
                      (this.debounceCache[n] = this._createDebouncedFunction()),
                    this.debounceCache[n]);
              }),
              e
            );
          })(),
          c = function (e, t, n) {
            var r = new o({ func: e, wait: t, options: a({}, i, n) });
            return function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return r.getDebouncedFunction(e).func.apply(void 0, e);
            };
          };
      },
      97335: function (e) {
        'use strict';
        e.exports = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            r = void 0,
            s = void 0,
            a = void 0,
            i = [];
          return function () {
            var c,
              l = 'function' == typeof t ? t() : t,
              u = new Date().getTime(),
              d = !r || u - r > l;
            r = u;
            for (var p = arguments.length, h = Array(p), f = 0; f < p; f++)
              h[f] = arguments[f];
            if (d && n.leading)
              return n.accumulate
                ? Promise.resolve(e.call(this, [h])).then(function (e) {
                    return e[0];
                  })
                : Promise.resolve(e.call.apply(e, [this].concat(h)));
            if (
              (s
                ? clearTimeout(a)
                : (((c = {}).promise = new Promise(function (e, t) {
                    ((c.resolve = e), (c.reject = t));
                  })),
                  (s = c)),
              i.push(h),
              (a = setTimeout(o.bind(this), l)),
              n.accumulate)
            ) {
              var m = i.length - 1;
              return s.promise.then(function (e) {
                return e[m];
              });
            }
            return s.promise;
          };
          function o() {
            var t = s;
            (clearTimeout(a),
              Promise.resolve(
                n.accumulate ? e.call(this, i) : e.apply(this, i[i.length - 1])
              ).then(t.resolve, t.reject),
              (i = []),
              (s = null));
          }
        };
      },
      19615: function (e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/auth/users',
          function () {
            return n(34620);
          },
        ]);
      },
      67628: function (e, t, n) {
        'use strict';
        n.d(t, {
          Q: function () {
            return o;
          },
        });
        var r = n(97458),
          s = n(94059),
          a = n(73565),
          i = n(55228),
          o = (e) => {
            let { page: t, menu: n } = e;
            return (0, r.jsx)('div', {
              className: 'flex flex-col space-y-8 overflow-y-auto',
              'data-sentry-component': 'ProductMenu',
              'data-sentry-source-file': 'ProductMenu.tsx',
              children: (0, r.jsx)(s.ZP, {
                type: 'pills',
                'data-sentry-element': 'Menu',
                'data-sentry-source-file': 'ProductMenu.tsx',
                children: n.map((e, o) =>
                  (0, r.jsxs)(
                    'div',
                    {
                      children: [
                        (0, r.jsx)('div', {
                          className: 'my-6 space-y-8',
                          children: (0, r.jsxs)('div', {
                            className: 'mx-3',
                            children: [
                              (0, r.jsx)(s.ZP.Group, {
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
                                  let n = e.pages
                                    ? e.pages.includes(null != t ? t : '')
                                    : t === e.key;
                                  return (0, r.jsx)(
                                    i.Z,
                                    {
                                      url: e.url,
                                      name: e.name,
                                      icon: e.icon,
                                      rightIcon: e.rightIcon,
                                      isActive: n,
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
                        o !== n.length - 1 &&
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
      90829: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ArrowDownWideNarrow', [
          ['path', { d: 'm3 16 4 4 4-4', key: '1co6wj' }],
          ['path', { d: 'M7 20V4', key: '1yoxec' }],
          ['path', { d: 'M11 4h10', key: '1w87gc' }],
          ['path', { d: 'M11 8h7', key: 'djye34' }],
          ['path', { d: 'M11 12h4', key: 'q8tih4' }],
        ]);
      },
      68297: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ArrowUpNarrowWide', [
          ['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
          ['path', { d: 'M7 4v16', key: '1glfcx' }],
          ['path', { d: 'M11 12h4', key: 'q8tih4' }],
          ['path', { d: 'M11 16h7', key: 'uosisv' }],
          ['path', { d: 'M11 20h10', key: 'jvxblo' }],
        ]);
      },
      38273: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('ArrowUp', [
          ['path', { d: 'm5 12 7-7 7 7', key: 'hav0vg' }],
          ['path', { d: 'M12 19V5', key: 'x0mq9r' }],
        ]);
      },
      99847: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Ban', [
          ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
          ['path', { d: 'm4.9 4.9 14.2 14.2', key: '1m5liu' }],
        ]);
      },
      11024: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Lock', [
          [
            'rect',
            {
              width: '18',
              height: '11',
              x: '3',
              y: '11',
              rx: '2',
              ry: '2',
              key: '1w4ew1',
            },
          ],
          ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
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
      14346: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('UserPlus', [
          [
            'path',
            { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' },
          ],
          ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
          ['line', { x1: '19', x2: '19', y1: '8', y2: '14', key: '1bvyxn' }],
          ['line', { x1: '22', x2: '16', y1: '11', y2: '11', key: '1shjgl' }],
        ]);
      },
      29285: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Users', [
          [
            'path',
            { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', key: '1yyitq' },
          ],
          ['circle', { cx: '9', cy: '7', r: '4', key: 'nufk8' }],
          ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87', key: 'kshegd' }],
          ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '1da9ce' }],
        ]);
      },
      7539: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return v;
          },
        });
        var r = n(97458),
          s = n(12436),
          a = n(32691),
          i = n(99163),
          o = n(67628),
          c = n(72909),
          l = n(58326),
          u = n(83145),
          d = n.n(u),
          p = n(10947),
          h = n(90839),
          f = n(60245),
          m = n(37756);
        let y = (e) => [
            {
              title: 'Manage',
              items: [
                {
                  name: 'Users',
                  key: 'users',
                  url: '/project/'.concat(e, '/auth/users'),
                  items: [],
                },
              ],
            },
            {
              title: 'Configuration',
              items: [
                {
                  name: 'Policies',
                  key: 'policies',
                  url: '/project/'.concat(e, '/auth/policies'),
                  items: [],
                },
                ...(m.Qy
                  ? [
                      {
                        name: 'Sign In / Up',
                        key: 'sign-in-up',
                        pages: ['providers', 'third-party'],
                        url: '/project/'.concat(e, '/auth/providers'),
                        items: [],
                      },
                      {
                        name: 'Sessions',
                        key: 'sessions',
                        url: '/project/'.concat(e, '/auth/sessions'),
                        items: [],
                      },
                      {
                        name: 'Rate Limits',
                        key: 'rate-limits',
                        url: '/project/'.concat(e, '/auth/rate-limits'),
                        items: [],
                      },
                      {
                        name: 'Emails',
                        key: 'emails',
                        pages: ['templates', 'smtp'],
                        url: '/project/'.concat(e, '/auth/templates'),
                        items: [],
                      },
                      {
                        name: 'Multi-Factor',
                        key: 'mfa',
                        url: '/project/'.concat(e, '/auth/mfa'),
                        items: [],
                      },
                      {
                        name: 'URL Configuration',
                        key: 'url-configuration',
                        url: '/project/'.concat(e, '/auth/url-configuration'),
                        items: [],
                      },
                      {
                        name: 'Attack Protection',
                        key: 'protection',
                        url: '/project/'.concat(e, '/auth/protection'),
                        items: [],
                      },
                      {
                        name: 'Auth Hooks',
                        key: 'hooks',
                        url: '/project/'.concat(e, '/auth/hooks'),
                        items: [],
                        label: 'BETA',
                      },
                      {
                        name: 'Advanced',
                        key: 'advanced',
                        url: '/project/'.concat(e, '/auth/advanced'),
                        items: [],
                      },
                    ]
                  : []),
              ],
            },
          ],
          x = () => {
            let { ref: e = 'default' } = (0, s.UO)(),
              t = (0, i.ar)();
            (0, c.kM)({ projectRef: e });
            let n = (0, a.useRouter)().pathname.split('/')[4];
            return (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(o.Q, {
                  page: n,
                  menu: y(e),
                  'data-sentry-element': 'ProductMenu',
                  'data-sentry-source-file': 'AuthLayout.tsx',
                }),
                t &&
                  (0, r.jsx)('div', {
                    className: 'px-3',
                    children: (0, r.jsxs)(p.bZ, {
                      children: [
                        (0, r.jsx)(p.Cd, {
                          className: 'text-sm',
                          children: 'Column Privileges has been shifted',
                        }),
                        (0, r.jsxs)(p.X, {
                          className: 'text-xs',
                          children: [
                            (0, r.jsx)('p', {
                              className: 'mb-2',
                              children:
                                'It can now be found in the menu under the database section.',
                            }),
                            (0, r.jsx)(h.z, {
                              asChild: !0,
                              type: 'default',
                              size: 'tiny',
                              children: (0, r.jsx)(d(), {
                                href: '/project/'.concat(
                                  e,
                                  '/database/column-privileges'
                                ),
                                children: 'Head over to Database',
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
              ],
            });
          };
        var v = (0, l.Q)((e) => {
          let { title: t, children: n } = e;
          return (0, r.jsx)(f.Z, {
            title: t || 'Authentication',
            product: 'Authentication',
            productMenu: (0, r.jsx)(x, {}),
            isBlocking: !1,
            'data-sentry-element': 'ProjectLayout',
            'data-sentry-component': 'AuthLayout',
            'data-sentry-source-file': 'AuthLayout.tsx',
            children: n,
          });
        });
      },
      55228: function (e, t, n) {
        'use strict';
        var r = n(97458),
          s = n(83145),
          a = n.n(s),
          i = n(94059),
          o = n(73565),
          c = n(90839);
        t.Z = (e) => {
          let {
              name: t = '',
              isActive: n,
              isExternal: s,
              icon: l,
              rightIcon: u,
              url: d = '',
              target: p = '_self',
              onClick: h,
              textClassName: f = '',
              hoverText: m = '',
              label: y,
            } = e,
            x = (0, r.jsx)(i.ZP.Item, {
              icon: l,
              rounded: !0,
              active: n,
              onClick: h,
              children: (0, r.jsxs)('div', {
                className: 'flex w-full items-center justify-between gap-1',
                children: [
                  (0, r.jsxs)('div', {
                    title: m || ('string' == typeof t ? t : ''),
                    className: 'flex items-center gap-2 truncate w-full ' + f,
                    children: [
                      (0, r.jsxs)('span', {
                        className: 'truncate',
                        children: [t, ' '],
                      }),
                      void 0 !== y &&
                        (0, r.jsx)(o.C, {
                          variant: 'warning',
                          className: 'py-0 px-1.5 capitalize',
                          children: y,
                        }),
                    ],
                  }),
                  u && (0, r.jsx)('div', { children: u }),
                ],
              }),
            });
          return d
            ? s
              ? (0, r.jsx)(c.z, {
                  asChild: !0,
                  block: !0,
                  className: '!justify-start',
                  type: 'text',
                  size: 'small',
                  icon: l,
                  children: (0, r.jsx)(a(), {
                    href: d,
                    target: '_blank',
                    rel: 'noreferrer',
                    children: t,
                  }),
                })
              : (0, r.jsx)(a(), {
                  href: d,
                  className: 'block',
                  target: p,
                  children: x,
                })
            : x;
        };
      },
      34620: function (e, t, n) {
        'use strict';
        n.r(t);
        var r = n(97458),
          s = n(57798),
          a = n(7539),
          i = n(95767);
        let o = () =>
          (0, r.jsx)(s.r, {
            'data-sentry-element': 'UsersV2',
            'data-sentry-component': 'UsersPage',
            'data-sentry-source-file': 'users.tsx',
          });
        ((o.getLayout = (e) =>
          (0, r.jsx)(i.Z, {
            children: (0, r.jsx)(a.Z, { title: 'Auth', children: e }),
          })),
          (t.default = o));
      },
      85682: function (e, t, n) {
        'use strict';
        n.d(t, {
          I: function () {
            return d;
          },
        });
        var r = n(97458),
          s = n(58596),
          a = n(52983),
          i = n(65092),
          o = n(56740),
          c = n(90839),
          l = n(25843);
        function u(e) {
          let { icon: t, className: n } = e;
          return (0, r.jsx)('div', {
            className: (0, i.cn)(
              'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground-light',
              n
            ),
            'data-sentry-component': 'InputIconContainer',
            'data-sentry-source-file': 'InputIconContainer.tsx',
            children: t,
          });
        }
        let d = (0, a.forwardRef)((e, t) => {
          let {
              copy: n,
              icon: d,
              reveal: p = !1,
              actions: h,
              onCopy: f,
              iconContainerClassName: m,
              containerClassName: y,
              ...x
            } = e,
            [v, g] = (0, a.useState)('Copy'),
            [j, b] = (0, a.useState)(!0),
            k = (0, l.Z)('input'),
            w = [];
          return (
            d && w.push(k.with_icon),
            (0, r.jsxs)('div', {
              className: (0, i.cn)('relative', y),
              children: [
                (0, r.jsx)(o.I, {
                  ref: t,
                  ...x,
                  onCopy: f,
                  value: p && j ? '**** **** **** ****' : x.value,
                  className: (0, i.cn)(...w, x.className),
                }),
                d && (0, r.jsx)(u, { icon: d, className: m }),
                n || h
                  ? (0, r.jsxs)('div', {
                      className: k.actions_container,
                      children: [
                        n && !(p && j)
                          ? (0, r.jsx)(c.z, {
                              size: 'tiny',
                              type: 'default',
                              icon: (0, r.jsx)(s.Z, {
                                size: 16,
                                className: 'text-foreground-muted',
                              }),
                              onClick: () => {
                                var e, t;
                                return (
                                  (e = x.value),
                                  void (
                                    null ===
                                      (t = navigator.clipboard.writeText(e)) ||
                                    void 0 === t ||
                                    t.then(
                                      function () {
                                        (g('Copied'),
                                          setTimeout(function () {
                                            g('Copy');
                                          }, 3e3),
                                          null == f || f());
                                      },
                                      function () {
                                        g('Failed to copy');
                                      }
                                    )
                                  )
                                );
                              },
                              children: v,
                            })
                          : null,
                        p && j
                          ? (0, r.jsx)(c.z, {
                              size: 'tiny',
                              type: 'default',
                              onClick: function () {
                                b(!1);
                              },
                              children: 'Reveal',
                            })
                          : null,
                        h && h,
                      ],
                    })
                  : null,
              ],
            })
          );
        });
      },
      54354: function (e, t, n) {
        'use strict';
        n.d(t, {
          c: function () {
            return g;
          },
          w: function () {
            return y;
          },
        });
        var r = n(97458),
          s = n(52983),
          a = n(40577),
          i = n(65092),
          o = n(28977),
          c = n.n(o),
          l = n(60192),
          u = n.n(l),
          d = n(13516),
          p = n.n(d),
          h = n(57304);
        (c().extend(u()), c().extend(p()));
        let f = (e) =>
            c()
              .unix(Number(e) / 1e3 / 1e3)
              .toISOString(),
          m = (e) => {
            let t = 16 === String(e).length;
            return !Number.isNaN(Number(e)) && t;
          },
          y = (e) => {
            let { utcTimestamp: t, format: n } = e,
              r = m(t) ? f(t) : t;
            return c().utc(r).local().format(n);
          },
          x = (e) => {
            let { utcTimestamp: t, format: n } = e,
              r = m(t) ? f(t) : t;
            return c().utc(r).format(n);
          },
          v = (e) => {
            let { utcTimestamp: t } = e,
              n = m(t) ? f(t) : t;
            return c().utc(n).fromNow();
          },
          g = (e) => {
            let {
                utcTimestamp: t,
                className: n,
                displayAs: o = 'local',
                format: c = 'DD MMM  HH:mm:ss',
                labelFormat: l = 'DD MMM HH:mm:ss',
              } = e,
              u = y({ utcTimestamp: t, format: c }),
              d = x({ utcTimestamp: t, format: c }),
              p = v({ utcTimestamp: t }),
              [f, m] = (0, s.useState)('start'),
              g = (0, s.useRef)(null),
              j = Intl.DateTimeFormat().resolvedOptions().timeZone;
            (0, s.useEffect)(() => {
              let e = () => {
                if (g.current) {
                  let e = g.current.getBoundingClientRect(),
                    t = window.innerHeight;
                  m(e.top < t / 2 ? 'start' : 'end');
                }
              };
              return (
                e(),
                window.addEventListener('scroll', e),
                window.addEventListener('resize', e),
                () => {
                  (window.removeEventListener('scroll', e),
                    window.removeEventListener('resize', e));
                }
              );
            }, []);
            let b = (e) => {
              let { label: t, value: n } = e,
                [a, o] = (0, s.useState)(!1);
              return (0, r.jsxs)('span', {
                onPointerDown: (e) => {
                  e.stopPropagation();
                },
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
                onClick: (e) => {
                  (e.stopPropagation(),
                    e.preventDefault(),
                    navigator.clipboard.writeText(n),
                    o(!0),
                    setTimeout(() => {
                      o(!1);
                    }, 1e3));
                },
                className: (0, i.cn)(
                  'relative cursor-default grid grid-cols-2 gap-2 bg-surface-100 px-2 py-1 group',
                  { 'bg-surface-100': a }
                ),
                'data-sentry-component': 'TooltipRow',
                'data-sentry-source-file': 'index.tsx',
                children: [
                  (0, r.jsxs)('span', {
                    className: 'text-right truncate',
                    children: [t, ':'],
                  }),
                  (0, r.jsxs)('div', {
                    className: 'relative',
                    children: [
                      a &&
                        (0, r.jsx)('span', {
                          className:
                            'absolute inset-0 flex items-center text-brand-600 bg-surface-100',
                          children: 'Copied!',
                        }),
                      (0, r.jsxs)('span', {
                        className: 'flex items-center gap-x-2',
                        children: [
                          n,
                          (0, r.jsx)(h.Z, {
                            size: 12,
                            className: 'opacity-0 group-opacity-100 transition',
                            'data-sentry-element': 'Clipboard',
                            'data-sentry-source-file': 'index.tsx',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            };
            return (0, r.jsxs)(a.u, {
              'data-sentry-element': 'Tooltip',
              'data-sentry-component': 'TimestampInfo',
              'data-sentry-source-file': 'index.tsx',
              children: [
                (0, r.jsx)(a.aJ, {
                  asChild: !0,
                  ref: g,
                  className: 'text-xs '.concat(
                    n,
                    ' border-b border-transparent border-dashed border-foreground-light'
                  ),
                  'data-sentry-element': 'TooltipTrigger',
                  'data-sentry-source-file': 'index.tsx',
                  children: (0, r.jsx)('span', {
                    children:
                      'local' === o
                        ? y({ utcTimestamp: t, format: l })
                        : x({ utcTimestamp: t, format: l }),
                  }),
                }),
                (0, r.jsxs)(a._v, {
                  align: f,
                  side: 'right',
                  className: 'font-mono p-0 py-1',
                  'data-sentry-element': 'TooltipContent',
                  'data-sentry-source-file': 'index.tsx',
                  children: [
                    (0, r.jsx)(b, {
                      label: 'UTC',
                      value: d,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, r.jsx)(b, {
                      label: ''.concat(j),
                      value: u,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, r.jsx)(b, {
                      label: 'Relative',
                      value: p,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, r.jsx)(b, {
                      label: 'Timestamp',
                      value: String(t),
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                  ],
                }),
              ],
            });
          };
      },
      94059: function (e, t, n) {
        'use strict';
        n.d(t, {
          ZP: function () {
            return p;
          },
        });
        var r = n(97458),
          s = n(52983),
          a = n(25843),
          i = n(65092);
        function o(e) {
          let { children: t, className: n, tag: s = 'div', style: a } = e;
          return (0, r.jsx)(''.concat(s), {
            style: a,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Typography',
            'data-sentry-source-file': 'Typography.tsx',
            children: t,
          });
        }
        ((o.Title = function (e) {
          let { className: t, level: n = 1, children: s, style: a } = e;
          return (0, r.jsx)('h'.concat(n), {
            style: a,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Title',
            'data-sentry-source-file': 'Title.tsx',
            children: s,
          });
        }),
          (o.Text = function (e) {
            let {
              className: t,
              children: n,
              style: s,
              type: a,
              disabled: i,
              mark: o,
              code: c,
              keyboard: l,
              underline: u,
              strikethrough: d,
              strong: p,
              small: h,
            } = e;
            return c
              ? (0, r.jsx)('code', { style: s, children: n })
              : o
                ? (0, r.jsx)('mark', { style: s, children: n })
                : l
                  ? (0, r.jsx)('kbd', { style: s, children: n })
                  : p
                    ? (0, r.jsx)('strong', { style: s, children: n })
                    : (0, r.jsx)('span', {
                        style: s,
                        'data-sentry-component': 'Text',
                        'data-sentry-source-file': 'Text.tsx',
                        children: n,
                      });
          }),
          (o.Link = function (e) {
            let {
              children: t,
              target: n = '_blank',
              href: s,
              className: a,
              onClick: i,
              style: o,
            } = e;
            return (0, r.jsx)('a', {
              onClick: i,
              href: s,
              target: n,
              rel: 'noopener noreferrer',
              style: o,
              'data-sentry-component': 'Link',
              'data-sentry-source-file': 'Link.tsx',
              children: t,
            });
          }));
        let c = (0, s.createContext)({ type: 'text' }),
          l = (e) => {
            let { type: t } = e;
            return (0, r.jsx)(c.Provider, {
              value: { type: t },
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'MenuContextProvider',
              'data-sentry-source-file': 'MenuContext.tsx',
              children: e.children,
            });
          },
          u = () => {
            let e = (0, s.useContext)(c);
            if (void 0 === e)
              throw Error(
                'MenuContext must be used within a MenuContextProvider.'
              );
            return e;
          };
        function d(e) {
          let {
            children: t,
            className: n,
            ulClassName: s,
            style: a,
            type: i = 'text',
          } = e;
          return (0, r.jsx)('nav', {
            role: 'menu',
            'aria-label': 'Sidebar',
            'aria-orientation': 'vertical',
            'aria-labelledby': 'options-menu',
            className: n,
            style: a,
            'data-sentry-component': 'Menu',
            'data-sentry-source-file': 'Menu.tsx',
            children: (0, r.jsx)(l, {
              type: i,
              'data-sentry-element': 'MenuContextProvider',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, r.jsx)('ul', { className: s, children: t }),
            }),
          });
        }
        ((d.Item = function (e) {
          let {
              children: t,
              icon: n,
              active: s,
              rounded: o,
              onClick: c,
              doNotCloseOverlay: l = !1,
              showActiveBar: d = !1,
              style: p,
            } = e,
            h = (0, a.Z)('menu'),
            { type: f } = u(),
            m = [h.item.base];
          (m.push(h.item.variants[f].base),
            s
              ? m.push(h.item.variants[f].active)
              : m.push(h.item.variants[f].normal));
          let y = [h.item.content.base];
          s ? y.push(h.item.content.active) : y.push(h.item.content.normal);
          let x = [h.item.icon.base];
          return (
            s ? x.push(h.item.icon.active) : x.push(h.item.icon.normal),
            (0, r.jsxs)('li', {
              role: 'menuitem',
              className: (0, i.cn)('outline-none', m),
              style: p,
              onClick: c,
              'aria-current': s ? 'page' : void 0,
              'data-sentry-component': 'Item',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                n &&
                  (0, r.jsx)('div', {
                    className: ''.concat(x.join(' '), ' min-w-fit'),
                    children: n,
                  }),
                (0, r.jsx)('span', { className: y.join(' '), children: t }),
              ],
            })
          );
        }),
          (d.Group = function (e) {
            let { children: t, icon: n, title: s } = e,
              i = (0, a.Z)('menu'),
              { type: o } = u();
            return (0, r.jsxs)('div', {
              className: [i.group.base, i.group.variants[o]].join(' '),
              'data-sentry-component': 'Group',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                n &&
                  (0, r.jsx)('span', { className: i.group.icon, children: n }),
                (0, r.jsx)('span', { className: i.group.content, children: s }),
                t,
              ],
            });
          }),
          (d.Misc = function (e) {
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
        var p = d;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          5518, 2549, 1379, 272, 3861, 2728, 245, 5767, 876, 5433, 3443, 9774,
          2888, 179,
        ],
        function () {
          return e((e.s = 19615));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
