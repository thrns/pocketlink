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
      (e._sentryDebugIds[t] = 'df00bb34-2df7-4bcd-9389-6ce0c652e571'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-df00bb34-2df7-4bcd-9389-6ce0c652e571'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7893],
    {
      29518: function (e, t, s) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/realtime/inspector',
          function () {
            return s(13901);
          },
        ]);
      },
      67628: function (e, t, s) {
        'use strict';
        s.d(t, {
          Q: function () {
            return i;
          },
        });
        var a = s(97458),
          n = s(94059),
          l = s(73565),
          r = s(55228),
          i = (e) => {
            let { page: t, menu: s } = e;
            return (0, a.jsx)('div', {
              className: 'flex flex-col space-y-8 overflow-y-auto',
              'data-sentry-component': 'ProductMenu',
              'data-sentry-source-file': 'ProductMenu.tsx',
              children: (0, a.jsx)(n.ZP, {
                type: 'pills',
                'data-sentry-element': 'Menu',
                'data-sentry-source-file': 'ProductMenu.tsx',
                children: s.map((e, i) =>
                  (0, a.jsxs)(
                    'div',
                    {
                      children: [
                        (0, a.jsx)('div', {
                          className: 'my-6 space-y-8',
                          children: (0, a.jsxs)('div', {
                            className: 'mx-3',
                            children: [
                              (0, a.jsx)(n.ZP.Group, {
                                title: e.title
                                  ? (0, a.jsxs)('div', {
                                      className:
                                        'flex flex-col space-y-2 uppercase font-mono',
                                      children: [
                                        (0, a.jsx)('span', {
                                          children: e.title,
                                        }),
                                        e.isPreview &&
                                          (0, a.jsx)(l.C, {
                                            variant: 'warning',
                                            children: 'Not production ready',
                                          }),
                                      ],
                                    })
                                  : null,
                              }),
                              (0, a.jsx)('div', {
                                children: e.items.map((e) => {
                                  let s = e.pages
                                    ? e.pages.includes(null != t ? t : '')
                                    : t === e.key;
                                  return (0, a.jsx)(
                                    r.Z,
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
                        i !== s.length - 1 &&
                          (0, a.jsx)('div', {
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
      54768: function (e, t, s) {
        'use strict';
        s.d(t, {
          Z: function () {
            return d;
          },
        });
        var a = s(97458),
          n = s(32691),
          l = s(67628),
          r = s(62432),
          i = s(58326),
          o = s(60245);
        let c = (e) => {
          var t;
          let s =
            null !== (t = null == e ? void 0 : e.ref) && void 0 !== t
              ? t
              : 'default';
          return [
            {
              title: 'Tools',
              items: [
                {
                  name: 'Inspector',
                  key: 'inspector',
                  url: '/project/'.concat(s, '/realtime/inspector'),
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
                  url: '/project/'.concat(s, '/realtime/policies'),
                  items: [],
                },
              ],
            },
          ];
        };
        var d = (0, i.Q)((e) => {
          let { title: t, children: s } = e,
            i = (0, r.Vm)(),
            d = (0, n.useRouter)().pathname.split('/')[4];
          return (0, a.jsx)(o.Z, {
            title: t,
            product: 'Realtime',
            productMenu: (0, a.jsx)(l.Q, { page: d, menu: c(i) }),
            'data-sentry-element': 'ProjectLayout',
            'data-sentry-component': 'RealtimeLayout',
            'data-sentry-source-file': 'RealtimeLayout.tsx',
            children: s,
          });
        });
      },
      61767: function (e, t, s) {
        'use strict';
        var a = s(97458),
          n = s(44735);
        t.Z = (e) => {
          let { resourceText: t, isFullPage: s = !1 } = e,
            l = () =>
              (0, a.jsx)('div', {
                className:
                  'block w-full rounded border border-opacity-20 py-4 px-6 border-overlay bg-surface-200',
                'data-sentry-component': 'NoPermissionMessage',
                'data-sentry-source-file': 'NoPermission.tsx',
                children: (0, a.jsxs)('div', {
                  className: 'flex space-x-3',
                  children: [
                    (0, a.jsx)('div', {
                      className: 'mt-1',
                      children: (0, a.jsx)(n.Z, {
                        size: 20,
                        'data-sentry-element': 'AlertCircle',
                        'data-sentry-source-file': 'NoPermission.tsx',
                      }),
                    }),
                    (0, a.jsx)('div', {
                      className: 'flex w-full items-center justify-between',
                      children: (0, a.jsxs)('div', {
                        className: 'space-y-1',
                        children: [
                          (0, a.jsxs)('p', {
                            className: 'text-sm',
                            children: [
                              'You need additional permissions to ',
                              t,
                            ],
                          }),
                          (0, a.jsx)('div', {
                            children: (0, a.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'Contact your organization owner or administrator for assistance.',
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              });
          return s
            ? (0, a.jsx)('div', {
                className: 'flex h-full items-center justify-center',
                children: (0, a.jsx)('div', {
                  className: 'w-[550px]',
                  children: (0, a.jsx)(l, {}),
                }),
              })
            : (0, a.jsx)(l, {});
        };
      },
      55228: function (e, t, s) {
        'use strict';
        var a = s(97458),
          n = s(83145),
          l = s.n(n),
          r = s(94059),
          i = s(73565),
          o = s(90839);
        t.Z = (e) => {
          let {
              name: t = '',
              isActive: s,
              isExternal: n,
              icon: c,
              rightIcon: d,
              url: x = '',
              target: m = '_self',
              onClick: u,
              textClassName: h = '',
              hoverText: p = '',
              label: f,
            } = e,
            g = (0, a.jsx)(r.ZP.Item, {
              icon: c,
              rounded: !0,
              active: s,
              onClick: u,
              children: (0, a.jsxs)('div', {
                className: 'flex w-full items-center justify-between gap-1',
                children: [
                  (0, a.jsxs)('div', {
                    title: p || ('string' == typeof t ? t : ''),
                    className: 'flex items-center gap-2 truncate w-full ' + h,
                    children: [
                      (0, a.jsxs)('span', {
                        className: 'truncate',
                        children: [t, ' '],
                      }),
                      void 0 !== f &&
                        (0, a.jsx)(i.C, {
                          variant: 'warning',
                          className: 'py-0 px-1.5 capitalize',
                          children: f,
                        }),
                    ],
                  }),
                  d && (0, a.jsx)('div', { children: d }),
                ],
              }),
            });
          return x
            ? n
              ? (0, a.jsx)(o.z, {
                  asChild: !0,
                  block: !0,
                  className: '!justify-start',
                  type: 'text',
                  size: 'small',
                  icon: c,
                  children: (0, a.jsx)(l(), {
                    href: x,
                    target: '_blank',
                    rel: 'noreferrer',
                    children: t,
                  }),
                })
              : (0, a.jsx)(l(), {
                  href: x,
                  className: 'block',
                  target: m,
                  children: g,
                })
            : g;
        };
      },
      66902: function (e, t, s) {
        'use strict';
        var a = s(97458),
          n = s(198),
          l = s(50416),
          r = s(62507),
          i = s(36950),
          o = s(52983),
          c = s(88971),
          d = s(58015),
          x = s(90817),
          m = s(90839),
          u = s(54135),
          h = s(10947),
          p = s(42026),
          f = s(47482),
          g = s(64890);
        t.Z = (e) => {
          let {
              className: t,
              disabled: s = !1,
              size: y = 'tiny',
              showError: j = !0,
              selectedSchemaName: v,
              supportSelectAll: b = !1,
              excludedSchemas: N = [],
              onSelectSchema: w,
              onSelectCreateSchema: C,
            } = e,
            [S, k] = (0, o.useState)(!1),
            M = (0, x.Xo)(n.KA.TENANT_SQL_ADMIN_WRITE, 'schemas'),
            { project: T } = (0, c.d2)(),
            {
              data: _,
              isLoading: R,
              isSuccess: z,
              isError: E,
              error: I,
              refetch: P,
            } = (0, d.Q1)({
              projectRef: null == T ? void 0 : T.ref,
              connectionString: null == T ? void 0 : T.connectionString,
            }),
            L = (_ || [])
              .filter((e) => !N.includes(e.name))
              .sort((e, t) => e.name.localeCompare(t.name));
          return (0, a.jsxs)('div', {
            className: t,
            'data-sentry-component': 'SchemaSelector',
            'data-sentry-source-file': 'SchemaSelector.tsx',
            children: [
              R &&
                (0, a.jsx)(
                  m.z,
                  {
                    type: 'default',
                    className: 'w-full [&>span]:w-full',
                    size: y,
                    disabled: !0,
                    children: (0, a.jsx)(u.O, {
                      className: 'w-full h-3 bg-foreground-muted',
                    }),
                  },
                  'schema-selector-skeleton'
                ),
              j &&
                E &&
                (0, a.jsxs)(h.bZ, {
                  variant: 'warning',
                  className: '!px-3 !py-3',
                  children: [
                    (0, a.jsx)(h.Cd, {
                      className: 'text-xs text-amber-900',
                      children: 'Failed to load schemas',
                    }),
                    (0, a.jsxs)(h.X, {
                      className: 'text-xs mb-2 break-words',
                      children: ['Error: ', null == I ? void 0 : I.message],
                    }),
                    (0, a.jsx)(m.z, {
                      type: 'default',
                      size: 'tiny',
                      onClick: () => P(),
                      children: 'Reload schemas',
                    }),
                  ],
                }),
              z &&
                (0, a.jsxs)(p.J2, {
                  open: S,
                  onOpenChange: k,
                  modal: !1,
                  children: [
                    (0, a.jsx)(p.xo, {
                      asChild: !0,
                      children: (0, a.jsx)(m.z, {
                        size: y,
                        disabled: s,
                        type: 'default',
                        'data-testid': 'schema-selector',
                        className: 'w-full [&>span]:w-full !pr-1 space-x-1',
                        iconRight: (0, a.jsx)(l.Z, {
                          className: 'text-foreground-muted',
                          strokeWidth: 2,
                          size: 14,
                        }),
                        children: v
                          ? (0, a.jsxs)('div', {
                              className: 'w-full flex gap-1',
                              children: [
                                (0, a.jsx)('p', {
                                  className: 'text-foreground-lighter',
                                  children: 'schema',
                                }),
                                (0, a.jsx)('p', {
                                  className: 'text-foreground',
                                  children: '*' === v ? 'All schemas' : v,
                                }),
                              ],
                            })
                          : (0, a.jsx)('div', {
                              className: 'w-full flex gap-1',
                              children: (0, a.jsx)('p', {
                                className: 'text-foreground-lighter',
                                children: 'Choose a schema…',
                              }),
                            }),
                      }),
                    }),
                    (0, a.jsx)(p.yk, {
                      className: 'p-0 min-w-[200px]',
                      side: 'bottom',
                      align: 'start',
                      sameWidthAsTrigger: !0,
                      children: (0, a.jsxs)(f.mY, {
                        children: [
                          (0, a.jsx)(f.sZ, { placeholder: 'Find schema...' }),
                          (0, a.jsxs)(f.e8, {
                            children: [
                              (0, a.jsx)(f.rb, {
                                children: 'No schemas found',
                              }),
                              (0, a.jsx)(f.fu, {
                                children: (0, a.jsxs)(g.x, {
                                  className:
                                    (L || []).length > 7 ? 'h-[210px]' : '',
                                  children: [
                                    b &&
                                      (0, a.jsxs)(
                                        f.di,
                                        {
                                          className:
                                            'cursor-pointer flex items-center justify-between space-x-2 w-full',
                                          onSelect: () => {
                                            (w('*'), k(!1));
                                          },
                                          onClick: () => {
                                            (w('*'), k(!1));
                                          },
                                          children: [
                                            (0, a.jsx)('span', {
                                              children: 'All schemas',
                                            }),
                                            '*' === v &&
                                              (0, a.jsx)(r.Z, {
                                                className: 'text-brand',
                                                strokeWidth: 2,
                                                size: 16,
                                              }),
                                          ],
                                        },
                                        'select-all'
                                      ),
                                    null == L
                                      ? void 0
                                      : L.map((e) =>
                                          (0, a.jsxs)(
                                            f.di,
                                            {
                                              className:
                                                'cursor-pointer flex items-center justify-between space-x-2 w-full',
                                              onSelect: () => {
                                                (w(e.name), k(!1));
                                              },
                                              onClick: () => {
                                                (w(e.name), k(!1));
                                              },
                                              children: [
                                                (0, a.jsx)('span', {
                                                  children: e.name,
                                                }),
                                                v === e.name &&
                                                  (0, a.jsx)(r.Z, {
                                                    className: 'text-brand',
                                                    strokeWidth: 2,
                                                    size: 16,
                                                  }),
                                              ],
                                            },
                                            e.id
                                          )
                                        ),
                                  ],
                                }),
                              }),
                              void 0 !== C &&
                                M &&
                                (0, a.jsxs)(a.Fragment, {
                                  children: [
                                    (0, a.jsx)(f.zz, {}),
                                    (0, a.jsx)(f.fu, {
                                      children: (0, a.jsxs)(f.di, {
                                        className:
                                          'cursor-pointer flex items-center gap-x-2 w-full',
                                        onSelect: () => {
                                          (C(), k(!1));
                                        },
                                        onClick: () => {
                                          (C(), k(!1));
                                        },
                                        children: [
                                          (0, a.jsx)(i.Z, { size: 12 }),
                                          'Create a new schema',
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
            ],
          });
        };
      },
      13901: function (e, t, s) {
        'use strict';
        (s.r(t),
          s.d(t, {
            InspectorPage: function () {
              return e5;
            },
            default: function () {
              return e3;
            },
          }));
        var a = s(97458),
          n = s(198),
          l = s(12436),
          r = s(52983),
          i = s(30457),
          o = s(82288),
          c = s(68769),
          d = s(77700),
          x = s(359),
          m = s(75541),
          u = s(78751),
          h = s(98601),
          p = s(86848),
          f = s(5394),
          g = s(67096),
          y = s(42026),
          j = s(90839),
          v = s(49142),
          b = s(56740),
          N = s(62210);
        let w = f.Ry({ channel: f.Z_(), isPrivate: f.O7() }),
          C = (e) => {
            let { config: t, onChangeConfig: s } = e,
              [n, c] = (0, r.useState)(!1),
              { ref: d } = (0, l.UO)(),
              x = (0, m.l)(),
              { mutate: f } = (0, o.a)(),
              C = (0, p.cI)({
                mode: 'onBlur',
                reValidateMode: 'onBlur',
                resolver: (0, u.F)(w),
                defaultValues: { channel: '', isPrivate: !1 },
              }),
              S = () => {
                var e;
                (c(!1),
                  f({
                    action: i.b.REALTIME_INSPECTOR_LISTEN_CHANNEL_CLICKED,
                    groups: {
                      project: null != d ? d : 'Unknown',
                      organization:
                        null !== (e = null == x ? void 0 : x.slug) &&
                        void 0 !== e
                          ? e
                          : 'Unknown',
                    },
                  }),
                  s({
                    ...t,
                    channelName: C.getValues('channel'),
                    isChannelPrivate: C.getValues('isPrivate'),
                    enabled: !0,
                  }));
              };
            return (0, a.jsxs)(y.J2, {
              open: n,
              onOpenChange: (e) => {
                (!0 === e && C.setValue('channel', t.channelName), c(e));
              },
              'data-sentry-element': 'Popover_Shadcn_',
              'data-sentry-component': 'ChooseChannelPopover',
              'data-sentry-source-file': 'index.tsx',
              children: [
                (0, a.jsx)(y.xo, {
                  asChild: !0,
                  'data-sentry-element': 'PopoverTrigger_Shadcn_',
                  'data-sentry-source-file': 'index.tsx',
                  children: (0, a.jsx)(j.z, {
                    className: 'rounded-r-none',
                    type: 'default',
                    size: 'tiny',
                    iconRight: (0, a.jsx)(h.Z, {}),
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'index.tsx',
                    children: (0, a.jsx)('p', {
                      className: 'max-w-[120px] truncate',
                      title: t.channelName.length > 0 ? t.channelName : '',
                      children:
                        t.channelName.length > 0
                          ? 'Channel: '.concat(t.channelName)
                          : 'Join a channel',
                    }),
                  }),
                }),
                (0, a.jsx)(y.yk, {
                  className: 'p-0 w-[320px]',
                  align: 'start',
                  'data-sentry-element': 'PopoverContent_Shadcn_',
                  'data-sentry-source-file': 'index.tsx',
                  children: (0, a.jsx)('div', {
                    className: 'p-4 flex flex-col text-sm',
                    children:
                      0 === t.channelName.length
                        ? (0, a.jsx)(a.Fragment, {
                            children: (0, a.jsx)(v.l0, {
                              ...C,
                              children: (0, a.jsxs)('form', {
                                id: 'realtime-channel',
                                onSubmit: C.handleSubmit(() => S()),
                                className: 'flex flex-col gap-y-4',
                                children: [
                                  (0, a.jsx)(v.Wi, {
                                    name: 'channel',
                                    control: C.control,
                                    render: (e) => {
                                      let { field: t } = e;
                                      return (0, a.jsxs)(v.xJ, {
                                        className: 'flex flex-col gap-y-2',
                                        children: [
                                          (0, a.jsxs)('div', {
                                            className: 'flex flex-col gap-y-1',
                                            children: [
                                              (0, a.jsx)('label', {
                                                className:
                                                  'text-foreground text-xs',
                                                children: 'Name of channel',
                                              }),
                                              (0, a.jsxs)('div', {
                                                className: 'flex flex-row',
                                                children: [
                                                  (0, a.jsx)(v.NI, {
                                                    children: (0, a.jsx)(b.I, {
                                                      ...t,
                                                      autoComplete: 'off',
                                                      className:
                                                        'rounded-r-none text-xs px-2.5 py-1 h-auto',
                                                      placeholder:
                                                        'Enter a channel name',
                                                    }),
                                                  }),
                                                  (0, a.jsx)(j.z, {
                                                    type: 'primary',
                                                    className: 'rounded-l-none',
                                                    disabled:
                                                      0 ===
                                                      C.getValues().channel
                                                        .length,
                                                    onClick: () => S(),
                                                    children:
                                                      'Listen to channel',
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)(v.pf, {
                                            className:
                                              'text-xs text-foreground-lighter',
                                            children: [
                                              'The channel you initialize with the Supabase Realtime client. Learn more in',
                                              ' ',
                                              (0, a.jsx)('a', {
                                                target: '_blank',
                                                rel: 'noreferrer',
                                                className:
                                                  'underline text-foreground transition',
                                                href: 'https://supabase.com/docs/guides/realtime/concepts#channels',
                                                children: 'our docs',
                                              }),
                                            ],
                                          }),
                                        ],
                                      });
                                    },
                                  }),
                                  (0, a.jsx)(
                                    v.Wi,
                                    {
                                      control: C.control,
                                      name: 'isPrivate',
                                      render: (e) => {
                                        let { field: t } = e;
                                        return (0, a.jsxs)(v.xJ, {
                                          className: '',
                                          children: [
                                            (0, a.jsxs)('div', {
                                              className:
                                                'flex flex-row items-center gap-x-2',
                                              children: [
                                                (0, a.jsx)(v.NI, {
                                                  children: (0, a.jsx)(N.r, {
                                                    checked: t.value,
                                                    onCheckedChange: t.onChange,
                                                    disabled: t.disabled,
                                                  }),
                                                }),
                                                (0, a.jsx)(v.lX, {
                                                  className: 'text-xs',
                                                  children:
                                                    'Is channel private?',
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)(v.pf, {
                                              className:
                                                'text-xs text-foreground-lighter mt-2',
                                              children:
                                                'If the channel is marked as private, it will use RLS policies to filter messages.',
                                            }),
                                          ],
                                        });
                                      },
                                    },
                                    'isPrivate'
                                  ),
                                  (0, a.jsx)(g.G, {
                                    abbrev: !1,
                                    className: 'w-min',
                                    href: 'https://supabase.com/docs/guides/realtime/authorization',
                                  }),
                                ],
                              }),
                            }),
                          })
                        : (0, a.jsxs)('div', {
                            className: 'space-y-2',
                            children: [
                              (0, a.jsxs)('div', {
                                className: 'flex items-center gap-x-2',
                                children: [
                                  (0, a.jsxs)('p', {
                                    className: 'text-foreground text-xs',
                                    children: [
                                      'Currently joined',
                                      ' ',
                                      (0, a.jsx)('span', {
                                        className: t.isChannelPrivate
                                          ? 'text-brand'
                                          : 'text-warning',
                                        children: t.isChannelPrivate
                                          ? 'private'
                                          : 'public',
                                      }),
                                      ' ',
                                      'channel:',
                                    ],
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'text-xs border border-scale-600  py-0.5 px-1 rounded-md bg-surface-200',
                                    children: t.channelName,
                                  }),
                                ],
                              }),
                              (0, a.jsx)('p', {
                                className:
                                  'text-xs text-foreground-lighter mt-2',
                                children:
                                  'If you leave this channel, all of the messages populated on this page will disappear',
                              }),
                              (0, a.jsx)(j.z, {
                                type: 'default',
                                onClick: () =>
                                  s({ ...t, channelName: '', enabled: !1 }),
                                children: 'Leave channel',
                              }),
                            ],
                          }),
                  }),
                }),
              ],
            });
          };
        var S = s(74828),
          k = s(83145),
          M = s.n(k),
          T = s(65092),
          _ = s(73565),
          R = s(25843);
        let z = (0, r.createContext)({ contextSize: 'small', className: '' });
        var E = function (e) {
          let {
              className: t,
              size: s,
              type: n = 'Mail',
              color: l,
              strokeWidth: r,
              fill: i,
              stroke: o,
              background: c,
              src: d,
              icon: x,
              ...m
            } = e,
            u = (0, R.Z)('icon');
          return (0, a.jsx)(z.Consumer, {
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'IconBase',
            'data-sentry-source-file': 'IconBase.tsx',
            children: (e) => {
              let { contextSize: n, className: h } = e,
                p = {
                  tiny: 14,
                  small: 18,
                  medium: 20,
                  large: 20,
                  xlarge: 24,
                  xxlarge: 30,
                  xxxlarge: 42,
                },
                f = p.large,
                g = 21;
              (n && (g = n ? ('string' == typeof n ? p[n] : n) : f),
                s && (g = s ? ('string' == typeof s ? p[s] : s) : f));
              let y = !l && !i && !o,
                j = ['sbui-icon', t];
              h && j.push(h);
              let v = d
                ? (0, a.jsx)('div', {
                    className: 'relative',
                    style: { width: g + 'px', height: g + 'px' },
                    children: (0, a.jsx)('svg', {
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 16 16',
                      color: y ? 'currentColor' : l,
                      fill: y ? 'none' : i || 'none',
                      stroke: y ? 'currentColor' : o,
                      className: (0, T.cn)(j),
                      width: '100%',
                      height: '100%',
                      strokeWidth: null != r ? r : void 0,
                      ...m,
                      children: d,
                    }),
                  })
                : (0, a.jsx)(x, {
                    color: y ? 'currentColor' : l,
                    stroke: y ? 'currentColor' : o,
                    className: (0, T.cn)(j),
                    strokeWidth: r,
                    size: g,
                    fill: y ? 'none' : i || 'none',
                    ...m,
                    'data-sentry-element': 'FeatherIcon',
                    'data-sentry-component': 'IconComponent',
                    'data-sentry-source-file': 'IconBase.tsx',
                  });
              return c
                ? (0, a.jsx)('div', { className: u.container, children: v })
                : v;
            },
          });
        };
        let I = () =>
          (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)('path', {
                stroke: 'currentColor',
                strokeLinejoin: 'round',
                strokeMiterlimit: 10,
                d: 'm23.149 23.499 3.424 7.83a.5.5 0 0 0 .942-.074l.74-2.868a.5.5 0 0 1 .364-.36l3.039-.756a.5.5 0 0 0 .08-.943l-7.93-3.487a.5.5 0 0 0-.66.658Z',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconPresence.tsx',
              }),
              (0, a.jsx)('path', {
                stroke: 'currentColor',
                strokeLinejoin: 'round',
                strokeMiterlimit: 10,
                d: 'M24.544 32.746h-5.623a3 3 0 0 1-3-3V18.5a3 3 0 0 1 3-3h11.247a3 3 0 0 1 3 3v5.623',
                opacity: 0.45,
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconPresence.tsx',
              }),
            ],
          });
        var P = function (e) {
            return (0, a.jsx)(E, {
              src: (0, a.jsx)(I, {}),
              viewBox: '12.5 12 24 24',
              ...e,
              'data-sentry-element': 'IconBase',
              'data-sentry-component': 'IconPresence',
              'data-sentry-source-file': 'IconPresence.tsx',
            });
          },
          L = s(30739);
        let Z = () =>
          (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)('path', {
                id: 'Ellipse 146',
                d: 'M17.3154 6.70312C18.6968 8.06227 19.5532 9.95249 19.5532 12.0426C19.5532 14.1326 18.6968 16.0229 17.3154 17.382M6.79102 6.70312C5.40966 8.06227 4.55322 9.95249 4.55322 12.0426C4.55322 14.1326 5.40966 16.0229 6.79102 17.382',
                stroke: 'currentColor',
                strokeMiterlimit: '10',
                strokeLinejoin: 'bevel',
                opacity: 0.45,
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconBroadcast.tsx',
              }),
              (0, a.jsx)('ellipse', {
                id: 'Ellipse 144',
                cx: '12.0532',
                cy: '12.0428',
                rx: '3.00928',
                ry: '3.00666',
                stroke: 'currentColor',
                strokeMiterlimit: '10',
                strokeLinejoin: 'bevel',
                'data-sentry-element': 'ellipse',
                'data-sentry-source-file': 'IconBroadcast.tsx',
              }),
              (0, a.jsx)('path', {
                id: 'Vector 96',
                d: 'M12.0747 15.0488L12.0747 23.9996',
                stroke: 'currentColor',
                strokeMiterlimit: '10',
                strokeLinejoin: 'bevel',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconBroadcast.tsx',
              }),
            ],
          });
        var D = function (e) {
          return (0, a.jsx)(E, {
            src: (0, a.jsx)(Z, {}),
            viewBox: '0 0 24 24',
            ...e,
            'data-sentry-element': 'IconBase',
            'data-sentry-component': 'IconBroadcast',
            'data-sentry-source-file': 'IconBroadcast.tsx',
          });
        };
        let A = () =>
          (0, a.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 25,
            height: 24,
            fill: 'none',
            'data-sentry-element': 'svg',
            'data-sentry-component': 'SvgComponent',
            'data-sentry-source-file': 'IconDatabaseChanges.tsx',
            children: [
              (0, a.jsx)('path', {
                stroke: 'currentColor',
                strokeLinecap: 'round',
                strokeLinejoin: 'bevel',
                strokeMiterlimit: 10,
                d: 'M20.307 12a7.807 7.807 0 0 1-7.807 7.808M4.693 12A7.807 7.807 0 0 1 12.5 4.193',
                opacity: 0.45,
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconDatabaseChanges.tsx',
              }),
              (0, a.jsx)('circle', {
                cx: 17.512,
                cy: 6.971,
                r: 3.723,
                stroke: 'currentColor',
                strokeLinejoin: 'bevel',
                strokeMiterlimit: 10,
                'data-sentry-element': 'circle',
                'data-sentry-source-file': 'IconDatabaseChanges.tsx',
              }),
              (0, a.jsx)('path', {
                stroke: 'currentColor',
                strokeLinejoin: 'bevel',
                strokeMiterlimit: 10,
                d: 'm10.11 13.287 2.137 3.703-2.138 3.703H5.833L3.695 16.99l2.138-3.703h4.276Z',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'IconDatabaseChanges.tsx',
              }),
            ],
          });
        var B = function (e) {
            return (0, a.jsx)(E, {
              src: (0, a.jsx)(A, {}),
              viewBox: '0 0 25 24',
              ...e,
              'data-sentry-element': 'IconBase',
              'data-sentry-component': 'IconDatabaseChanges',
              'data-sentry-source-file': 'IconDatabaseChanges.tsx',
            });
          },
          F = s(51571),
          O = s(32002),
          U = s(66902);
        let H = (e) => {
          let { value: t, onChange: s } = e;
          return (0, a.jsxs)('div', {
            className: 'flex flex-row gap-4 items-center',
            'data-sentry-component': 'FilterSchema',
            'data-sentry-source-file': 'FilterSchema.tsx',
            children: [
              (0, a.jsx)('p', {
                className: 'w-[60px] flex justify-end text-sm',
                children: 'WHERE',
              }),
              (0, a.jsx)(U.Z, {
                disabled: !0,
                supportSelectAll: !0,
                size: 'small',
                selectedSchemaName: t,
                onSelectSchema: s,
                className: 'rounded-l-none [&>button>span>div]:py-0 w-64',
                'data-sentry-element': 'SchemaSelector',
                'data-sentry-source-file': 'FilterSchema.tsx',
              }),
            ],
          });
        };
        var W = s(47482),
          J = s(10947),
          V = s(64890),
          G = s(88971),
          X = s(83402),
          K = s(77837),
          Y = s.n(K),
          Q = s(5295),
          $ = s(10839),
          q = s(62507),
          ee = (e) => {
            let {
                className: t,
                size: s = 'tiny',
                showError: n = !0,
                selectedSchemaName: l,
                selectedTableName: i,
                onSelectTable: o,
              } = e,
              [c, d] = (0, r.useState)(!1),
              [x, m] = (0, r.useState)(!1),
              { project: u } = (0, G.d2)(),
              [h, p] = (0, r.useState)(''),
              {
                data: f,
                isLoading: g,
                isSuccess: v,
                isError: b,
                error: N,
                refetch: w,
              } = (0, X.Hp)({
                projectRef: null == u ? void 0 : u.ref,
                search: h,
                connectionString: null == u ? void 0 : u.connectionString,
                schemas: [l],
              });
            ((0, r.useEffect)(() => {
              !x && v && m(!0);
            }, [x, v]),
              (0, r.useEffect)(() => {
                c || '' === h || p('');
              }, [c, h]));
            let C = Y()(p),
              S = (
                (null == f ? void 0 : f.pages[0].data.entities)
                  ? [...(null == f ? void 0 : f.pages[0].data.entities)]
                  : []
              ).sort((e, t) => (e.name > t.name ? 0 : -1));
            return (0, a.jsx)('div', {
              className: t,
              'data-sentry-component': 'TableSelector',
              'data-sentry-source-file': 'TableSelector.tsx',
              children: (0, a.jsxs)(y.J2, {
                open: c,
                onOpenChange: d,
                modal: !1,
                'data-sentry-element': 'Popover_Shadcn_',
                'data-sentry-source-file': 'TableSelector.tsx',
                children: [
                  (0, a.jsx)(y.xo, {
                    asChild: !0,
                    'data-sentry-element': 'PopoverTrigger_Shadcn_',
                    'data-sentry-source-file': 'TableSelector.tsx',
                    children: (0, a.jsx)(j.z, {
                      size: s,
                      type: 'outline',
                      disabled: g,
                      className: 'w-full [&>span]:w-full '.concat(
                        'small' === s ? 'py-1.5' : ''
                      ),
                      icon: g
                        ? (0, a.jsx)(Q.Z, {
                            className: 'animate-spin',
                            size: 12,
                          })
                        : null,
                      iconRight: (0, a.jsx)($.Z, {
                        className: 'text-foreground-light rotate-90',
                        strokeWidth: 2,
                        size: 12,
                      }),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'TableSelector.tsx',
                      children: x
                        ? (0, a.jsxs)('div', {
                            className: 'w-full flex space-x-3',
                            children: [
                              (0, a.jsx)('p', {
                                className: 'text-xs text-light',
                                children: 'table',
                              }),
                              (0, a.jsx)('p', {
                                className: 'text-xs',
                                children: '*' === i ? 'All tables' : i,
                              }),
                            ],
                          })
                        : (0, a.jsx)('p', {
                            className: 'flex text-xs text-light',
                            children: 'Loading tables...',
                          }),
                    }),
                  }),
                  (0, a.jsx)(y.yk, {
                    className: 'p-0 w-64',
                    side: 'bottom',
                    align: 'start',
                    'data-sentry-element': 'PopoverContent_Shadcn_',
                    'data-sentry-source-file': 'TableSelector.tsx',
                    children: (0, a.jsxs)(W.mY, {
                      'data-sentry-element': 'Command_Shadcn_',
                      'data-sentry-source-file': 'TableSelector.tsx',
                      children: [
                        (0, a.jsx)(W.sZ, {
                          placeholder: 'Find table...',
                          onValueChange: (e) => C(e),
                          'data-sentry-element': 'CommandInput_Shadcn_',
                          'data-sentry-source-file': 'TableSelector.tsx',
                        }),
                        (0, a.jsxs)(W.e8, {
                          'data-sentry-element': 'CommandList_Shadcn_',
                          'data-sentry-source-file': 'TableSelector.tsx',
                          children: [
                            g &&
                              (0, a.jsxs)('div', {
                                className:
                                  'flex items-center justify-center space-x-2 px-3 py-2',
                                children: [
                                  (0, a.jsx)(Q.Z, {
                                    className: 'animate-spin',
                                    size: 12,
                                  }),
                                  (0, a.jsx)('p', {
                                    className: 'flex text-xs text-light',
                                    children: 'Loading tables...',
                                  }),
                                ],
                              }),
                            n &&
                              b &&
                              (0, a.jsxs)(J.bZ, {
                                variant: 'warning',
                                className: '!px-3 !py-3 !border-0 rounded-none',
                                children: [
                                  (0, a.jsx)(J.Cd, {
                                    className: 'text-xs text-amber-900',
                                    children: 'Failed to load tables',
                                  }),
                                  (0, a.jsxs)(J.X, {
                                    className: 'text-xs mb-2',
                                    children: [
                                      'Error: ',
                                      null == N ? void 0 : N.message,
                                    ],
                                  }),
                                  (0, a.jsx)(j.z, {
                                    type: 'default',
                                    size: 'tiny',
                                    onClick: () => w(),
                                    children: 'Reload tables',
                                  }),
                                ],
                              }),
                            v &&
                              (0, a.jsx)(a.Fragment, {
                                children: (0, a.jsx)(W.fu, {
                                  forceMount: !0,
                                  children: (0, a.jsxs)(V.x, {
                                    className:
                                      (S || []).length > 7 ? 'h-[210px]' : '',
                                    children: [
                                      (0, a.jsx)(W.rb, {
                                        children: 'No tables found',
                                      }),
                                      !h &&
                                        (0, a.jsxs)(
                                          W.di,
                                          {
                                            className:
                                              'cursor-pointer flex items-center justify-between space-x-2 w-full',
                                            onSelect: () => {
                                              (o('*', void 0), d(!1));
                                            },
                                            onClick: () => {
                                              (o('*', void 0), d(!1));
                                            },
                                            children: [
                                              (0, a.jsx)('span', {
                                                children: 'All tables',
                                              }),
                                              '*' === l &&
                                                (0, a.jsx)(q.Z, {
                                                  className: 'text-brand',
                                                  strokeWidth: 2,
                                                }),
                                            ],
                                          },
                                          'all-tables'
                                        ),
                                      null == S
                                        ? void 0
                                        : S.map((e) =>
                                            (0, a.jsxs)(
                                              W.di,
                                              {
                                                className:
                                                  'cursor-pointer flex items-center justify-between space-x-2 w-full',
                                                onSelect: () => {
                                                  (o(e.name, e.id), d(!1));
                                                },
                                                onClick: () => {
                                                  (o(e.name, e.id), d(!1));
                                                },
                                                children: [
                                                  (0, a.jsx)('span', {
                                                    children: e.name,
                                                  }),
                                                  l === e.name &&
                                                    (0, a.jsx)(q.Z, {
                                                      className: 'text-brand',
                                                      strokeWidth: 2,
                                                    }),
                                                ],
                                              },
                                              e.id
                                            )
                                          ),
                                    ],
                                  }),
                                }),
                              }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            });
          };
        let et = (e) => {
            let { value: t, schema: s, onChange: n } = e;
            return (0, a.jsxs)('div', {
              className: 'flex flex-row gap-4 items-center',
              'data-sentry-component': 'FilterTable',
              'data-sentry-source-file': 'FilterTable.tsx',
              children: [
                (0, a.jsx)('p', {
                  className: 'w-[60px] flex justify-end text-sm',
                  children: 'AND',
                }),
                (0, a.jsx)(ee, {
                  selectedSchemaName: s,
                  selectedTableName: t,
                  onSelectTable: n,
                  className: 'w-64',
                  size: 'small',
                  'data-sentry-element': 'TableSelector',
                  'data-sentry-source-file': 'FilterTable.tsx',
                }),
              ],
            });
          },
          es = (e) => {
            let { config: t, onChangeConfig: s } = e,
              [n, c] = (0, r.useState)(!1),
              [d, x] = (0, r.useState)(!1),
              [u, h] = (0, r.useState)(t),
              { ref: p } = (0, l.UO)(),
              f = (0, m.l)(),
              { mutate: g } = (0, o.a)(),
              v = '*' !== t.table;
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsxs)(y.J2, {
                  open: n,
                  onOpenChange: (e) => {
                    (!0 === e && h(t), c(e));
                  },
                  'data-sentry-element': 'Popover_Shadcn_',
                  'data-sentry-source-file': 'index.tsx',
                  children: [
                    (0, a.jsx)(y.xo, {
                      asChild: !0,
                      'data-sentry-element': 'PopoverTrigger_Shadcn_',
                      'data-sentry-source-file': 'index.tsx',
                      children: (0, a.jsx)(j.z, {
                        icon: (0, a.jsx)(S.Z, { size: '16' }),
                        type: v ? 'primary' : 'dashed',
                        className: (0, T.cn)(
                          'rounded-full px-1.5 text-xs',
                          v ? '!py-0.5' : '!py-1'
                        ),
                        size: 'small',
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'index.tsx',
                        children: v
                          ? (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)('span', {
                                  className: 'mr-1',
                                  children: 'Filtered by ',
                                }),
                                (0, a.jsxs)(_.C, {
                                  variant: 'brand',
                                  children: ['table: ', t.table],
                                }),
                              ],
                            })
                          : (0, a.jsx)('span', {
                              className: 'mr-1',
                              children: 'Filter messages',
                            }),
                      }),
                    }),
                    (0, a.jsxs)(y.yk, {
                      className: 'p-0 w-[365px]',
                      align: 'start',
                      'data-sentry-element': 'PopoverContent_Shadcn_',
                      'data-sentry-source-file': 'index.tsx',
                      children: [
                        (0, a.jsx)('div', {
                          className:
                            'border-b border-overlay text-xs px-4 py-3 text-foreground',
                          children: 'Listen to event types',
                        }),
                        (0, a.jsxs)('div', {
                          className: 'py-3 px-4 border-b border-overlay',
                          children: [
                            (0, a.jsxs)('div', {
                              className:
                                'flex items-center justify-between gap-2',
                              children: [
                                (0, a.jsxs)('div', {
                                  className: 'flex gap-2.5 items-center',
                                  children: [
                                    (0, a.jsx)(P, {
                                      size: 'xlarge',
                                      className:
                                        'bg-foreground rounded text-background-muted',
                                      'data-sentry-element': 'IconPresence',
                                      'data-sentry-source-file': 'index.tsx',
                                    }),
                                    (0, a.jsx)('label', {
                                      htmlFor: 'toggle-presence',
                                      className: 'text-sm',
                                      children: 'Presence',
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(L.Z, {
                                  id: 'toggle-presence',
                                  size: 'tiny',
                                  checked: u.enablePresence,
                                  onChange: () =>
                                    h({
                                      ...u,
                                      enablePresence: !u.enablePresence,
                                    }),
                                  'data-sentry-element': 'Toggle',
                                  'data-sentry-source-file': 'index.tsx',
                                }),
                              ],
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-xs text-foreground-light pt-1',
                              children:
                                'Store and synchronize user state consistently across clients',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'py-3 px-4 border-b border-overlay',
                          children: [
                            (0, a.jsxs)('div', {
                              className: 'flex items-center justify-between',
                              children: [
                                (0, a.jsxs)('div', {
                                  className: 'flex gap-2.5 items-center',
                                  children: [
                                    (0, a.jsx)(D, {
                                      size: 'xlarge',
                                      className:
                                        'bg-foreground rounded text-background-muted',
                                      'data-sentry-element': 'IconBroadcast',
                                      'data-sentry-source-file': 'index.tsx',
                                    }),
                                    (0, a.jsx)('label', {
                                      htmlFor: 'toggle-broadcast',
                                      className: 'text-sm',
                                      children: 'Broadcast',
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(L.Z, {
                                  id: 'toggle-broadcast',
                                  size: 'tiny',
                                  checked: u.enableBroadcast,
                                  onChange: () =>
                                    h({
                                      ...u,
                                      enableBroadcast: !u.enableBroadcast,
                                    }),
                                  'data-sentry-element': 'Toggle',
                                  'data-sentry-source-file': 'index.tsx',
                                }),
                              ],
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-xs  text-foreground-light pt-1',
                              children:
                                'Send any data to any client subscribed to the same channel',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'py-3 px-4 border-b border-overlay',
                          children: [
                            (0, a.jsxs)('div', {
                              className: 'flex items-center justify-between',
                              children: [
                                (0, a.jsxs)('div', {
                                  className: 'flex gap-2.5 items-center',
                                  children: [
                                    (0, a.jsx)(B, {
                                      size: 'xlarge',
                                      className:
                                        'bg-foreground rounded text-background-muted',
                                      'data-sentry-element':
                                        'IconDatabaseChanges',
                                      'data-sentry-source-file': 'index.tsx',
                                    }),
                                    (0, a.jsx)('label', {
                                      htmlFor: 'toggle-db-changes',
                                      className: 'text-sm',
                                      children: 'Database changes',
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(L.Z, {
                                  id: 'toggle-db-changes',
                                  size: 'tiny',
                                  checked: u.enableDbChanges,
                                  onChange: () =>
                                    h({
                                      ...u,
                                      enableDbChanges: !u.enableDbChanges,
                                    }),
                                  'data-sentry-element': 'Toggle',
                                  'data-sentry-source-file': 'index.tsx',
                                }),
                              ],
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-xs text-foreground-light pt-1',
                              children:
                                'Listen for Database inserts, updates, deletes and more',
                            }),
                          ],
                        }),
                        u.enableDbChanges &&
                          (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsx)('div', {
                                className:
                                  'border-b border-overlay text-xs px-4 py-3 text-foreground',
                                children:
                                  'Filter messages from database changes',
                              }),
                              (0, a.jsxs)('div', {
                                className:
                                  'flex border-b border-overlay p-4 gap-y-2 flex-col',
                                children: [
                                  (0, a.jsx)(H, {
                                    value: u.schema,
                                    onChange: (e) =>
                                      h({ ...u, schema: e, table: '*' }),
                                  }),
                                  (0, a.jsx)(et, {
                                    value: u.table,
                                    schema: u.schema,
                                    onChange: (e) => h({ ...u, table: e }),
                                  }),
                                ],
                              }),
                              (0, a.jsxs)('div', {
                                className:
                                  'border-b border-overlay p-4 flex flex-col gap-2',
                                children: [
                                  (0, a.jsxs)('div', {
                                    className:
                                      'flex flex-row gap-4 items-center',
                                    children: [
                                      (0, a.jsx)('p', {
                                        className:
                                          'w-[60px] flex justify-end text-sm',
                                        children: 'AND',
                                      }),
                                      (0, a.jsx)(F.Z, {
                                        size: 'tiny',
                                        className: 'flex-grow',
                                        placeholder: 'body=eq.hey',
                                        value: u.filter,
                                        onChange: (e) =>
                                          h({ ...u, filter: e.target.value }),
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)('p', {
                                    className:
                                      'text-xs text-foreground-light pl-[80px]',
                                    children: [
                                      'Learn more about realtime filtering in',
                                      ' ',
                                      (0, a.jsx)(M(), {
                                        className: 'underline',
                                        target: '_blank',
                                        rel: 'noreferrer',
                                        href: 'https://supabase.com/docs/guides/realtime/postgres-changes#available-filters',
                                        children: 'our docs',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        (0, a.jsxs)('div', {
                          className: 'px-4 py-2 gap-2 flex justify-end',
                          children: [
                            (0, a.jsx)(j.z, {
                              type: 'default',
                              onClick: () => c(!1),
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'index.tsx',
                              children: 'Cancel',
                            }),
                            (0, a.jsx)(j.z, {
                              onClick: () => x(!0),
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'index.tsx',
                              children: 'Apply',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)(O.Z, {
                  title: 'Previously found messages will be lost',
                  variant: 'destructive',
                  confirmLabel: 'Confirm',
                  size: 'small',
                  visible: d,
                  onCancel: () => x(!1),
                  onConfirm: () => {
                    var e;
                    (g({
                      action: i.b.REALTIME_INSPECTOR_FILTERS_APPLIED,
                      groups: {
                        project: null != p ? p : 'Unknown',
                        organization:
                          null !== (e = null == f ? void 0 : f.slug) &&
                          void 0 !== e
                            ? e
                            : 'Unknown',
                      },
                    }),
                      s(u),
                      x(!1),
                      c(!1));
                  },
                  'data-sentry-element': 'ConfirmationModal',
                  'data-sentry-source-file': 'index.tsx',
                  children: (0, a.jsx)('p', {
                    className: 'text-sm text-foreground-light',
                    children:
                      'The realtime inspector will clear currently collected messages and start listening for new messages matching the updated filters.',
                  }),
                }),
              ],
            });
          };
        var ea = s(34549),
          en = s(96273),
          el = s(23035),
          er = s(31485),
          ei = s(37756),
          eo = s(99492),
          ec = s(24561);
        let ed = (e) => {
            let { config: t, onChangeConfig: s } = e,
              n = (0, ec.fN)(),
              { data: c } = (0, er.zR)({ projectRef: t.projectRef }),
              { anonKey: d, serviceKey: x } = (0, er.Pb)(c),
              { data: u } = (0, el.s)(
                { projectRef: t.projectRef },
                { enabled: ei.Qy }
              ),
              h = null == u ? void 0 : u.jwt_secret,
              { ref: p } = (0, l.UO)(),
              f = (0, m.l)(),
              { mutate: g } = (0, o.a)(),
              y = (0, r.useRef)(!1);
            return (
              (0, r.useEffect)(() => {
                if (y.current) {
                  var e;
                  g({
                    action: i.b.REALTIME_INSPECTOR_DATABASE_ROLE_UPDATED,
                    groups: {
                      project: null != p ? p : 'Unknown',
                      organization:
                        null !== (e = null == f ? void 0 : f.slug) &&
                        void 0 !== e
                          ? e
                          : 'Unknown',
                    },
                  });
                }
                y.current = !0;
              }, [n.role]),
              (0, r.useEffect)(() => {
                (async () => {
                  let e;
                  let a = null;
                  (void 0 !== t.projectRef &&
                  void 0 !== h &&
                  void 0 !== n.role &&
                  'postgrest' === n.role.type
                    ? ((e = null == d ? void 0 : d.api_key),
                      await (0, eo.Wn)(t.projectRef, h, n.role)
                        .then((e) => (a = e))
                        .catch((e) =>
                          ea.Am.error(
                            'Failed to get JWT for role: '.concat(e.message)
                          )
                        ))
                    : (e = null == x ? void 0 : x.api_key),
                    e && s({ ...t, token: e, bearer: a }));
                })();
              }, [n.role, d, x]),
              (0, a.jsx)(en.Q, {
                align: 'start',
                variant: 'connected-on-both',
                'data-sentry-element': 'RoleImpersonationPopover',
                'data-sentry-component': 'RealtimeTokensPopover',
                'data-sentry-source-file': 'index.tsx',
              })
            );
          },
          ex = (e) => {
            let { config: t, onChangeConfig: s } = e,
              { mutate: n } = (0, o.a)(),
              { ref: r } = (0, l.UO)(),
              u = (0, m.l)();
            return (0, a.jsxs)('div', {
              className: 'flex flex-row h-14 gap-2.5 items-center px-4',
              'data-sentry-component': 'Header',
              'data-sentry-source-file': 'Header.tsx',
              children: [
                (0, a.jsxs)('div', {
                  className: 'flex flex-row',
                  children: [
                    (0, a.jsx)(C, {
                      config: t,
                      onChangeConfig: s,
                      'data-sentry-element': 'ChooseChannelPopover',
                      'data-sentry-source-file': 'Header.tsx',
                    }),
                    (0, a.jsx)(ed, {
                      config: t,
                      onChangeConfig: s,
                      'data-sentry-element': 'RealtimeTokensPopover',
                      'data-sentry-source-file': 'Header.tsx',
                    }),
                    (0, a.jsx)(x.u, {
                      size: 'tiny',
                      type: t.enabled ? 'warning' : 'primary',
                      className: 'rounded-l-none border-l-0',
                      disabled: 0 === t.channelName.length,
                      icon: t.enabled
                        ? (0, a.jsx)(c.Z, { size: '16' })
                        : (0, a.jsx)(d.Z, { size: '16' }),
                      onClick: () => {
                        if ((s({ ...t, enabled: !t.enabled }), !t.enabled)) {
                          var e;
                          n({
                            action:
                              i.b.REALTIME_INSPECTOR_LISTEN_CHANNEL_CLICKED,
                            groups: {
                              project: null != r ? r : 'Unknown',
                              organization:
                                null !== (e = null == u ? void 0 : u.slug) &&
                                void 0 !== e
                                  ? e
                                  : 'Unknown',
                            },
                          });
                        }
                      },
                      tooltip: {
                        content: {
                          side: 'bottom',
                          text:
                            0 === t.channelName.length
                              ? 'You need to join a channel first'
                              : void 0,
                        },
                      },
                      'data-sentry-element': 'ButtonTooltip',
                      'data-sentry-source-file': 'Header.tsx',
                      children: t.enabled
                        ? 'Stop listening'
                        : 'Start listening',
                    }),
                  ],
                }),
                (0, a.jsx)(es, {
                  config: t,
                  onChangeConfig: s,
                  'data-sentry-element': 'RealtimeFilterPopover',
                  'data-sentry-source-file': 'Header.tsx',
                }),
              ],
            });
          };
        var em = s(85466),
          eu = s.n(em),
          eh = s(4839),
          ep = s(52675),
          ef = s(32190),
          eg = s(44914),
          ey = s(88658),
          ej = s(98686),
          ev = s(66318),
          eb = s(28977),
          eN = s.n(eb);
        let ew = (e) =>
            eN()
              .unix(Number(e) / 1e3)
              .toISOString(),
          eC = (e) => {
            let { children: t } = e;
            return (0, a.jsx)('div', {
              className: 'flex h-full w-full items-center gap-4',
              'data-sentry-component': 'RowLayout',
              'data-sentry-source-file': 'MessagesFormatters.tsx',
              children: t,
            });
          },
          eS = (e) => {
            let { value: t, hideCopy: s = !1 } = e;
            return (0, a.jsx)(ek, {
              label: 'Timestamp',
              value: ew(t),
              hideCopy: s,
              'data-sentry-element': 'SelectionDetailedRow',
              'data-sentry-component': 'SelectionDetailedTimestampRow',
              'data-sentry-source-file': 'MessagesFormatters.tsx',
            });
          },
          ek = (e) => {
            let { label: t, value: s, valueRender: n, hideCopy: l = !1 } = e;
            return (0, a.jsxs)('div', {
              className: 'grid grid-cols-12 group',
              'data-sentry-component': 'SelectionDetailedRow',
              'data-sentry-source-file': 'MessagesFormatters.tsx',
              children: [
                (0, a.jsx)('span', {
                  className:
                    'text-scale-900 text-sm col-span-4 whitespace-pre-wrap',
                  children: t,
                }),
                (0, a.jsx)('span', {
                  className:
                    'text-scale-1200 text-sm col-span-6 whitespace-pre-wrap break-all',
                  children: null != n ? n : s,
                }),
                !l &&
                  (0, a.jsx)(ev.Z, {
                    text: s,
                    className:
                      'group-opacity-100 opacity-0 my-auto transition col-span-2  h-4 w-4 px-0 py-0',
                    type: 'text',
                    title: 'Copy to clipboard',
                  }),
              ],
            });
          },
          eM = () =>
            (0, a.jsx)('div', {
              className:
                'h-px w-full bg-panel-border-interior-light [[data-theme*=dark]_&]:bg-panel-border-interior-dark',
              'data-sentry-component': 'LogsDivider',
              'data-sentry-source-file': 'SelectedRealtimeMessagePanel.tsx',
            }),
          eT = (e) => {
            let { log: t } = e;
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsxs)('div', {
                  className: 'px-8',
                  children: [
                    (0, a.jsx)('span', {
                      className: 'col-span-4 text-sm text-scale-900',
                      children: 'Message',
                    }),
                    (0, a.jsx)('p', {
                      className:
                        'text-wrap mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-scale-1200',
                      children: t.message,
                    }),
                  ],
                }),
                (0, a.jsx)(eM, {
                  'data-sentry-element': 'LogsDivider',
                  'data-sentry-source-file': 'SelectedRealtimeMessagePanel.tsx',
                }),
                (0, a.jsx)('div', {
                  className: 'px-8 space-y-2',
                  children: (0, a.jsx)(eS, {
                    hideCopy: !0,
                    value: t.timestamp,
                    'data-sentry-element': 'SelectionDetailedTimestampRow',
                    'data-sentry-source-file':
                      'SelectedRealtimeMessagePanel.tsx',
                  }),
                }),
                (0, a.jsx)(eM, {
                  'data-sentry-element': 'LogsDivider',
                  'data-sentry-source-file': 'SelectedRealtimeMessagePanel.tsx',
                }),
                (0, a.jsxs)('div', {
                  className: 'px-8',
                  children: [
                    (0, a.jsx)('h3', {
                      className: 'mb-4 text-sm text-foreground-lighter',
                      children: 'Metadata',
                    }),
                    (0, a.jsx)('pre', {
                      className: 'syntax-highlight overflow-x-auto text-sm',
                      children: (0, a.jsx)('div', {
                        className: 'text-wrap',
                        dangerouslySetInnerHTML: {
                          __html: t.metadata
                            ? JSON.stringify(t.metadata, null, 2)
                                .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(
                                  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                                  function (e) {
                                    var t = 'number text-tomato-900';
                                    return (
                                      /^"/.test(e)
                                        ? (t = /:$/.test(e)
                                            ? 'key text-scale-1200'
                                            : 'string text-brand-600')
                                        : /true|false/.test(e)
                                          ? (t = 'boolean text-blue-900')
                                          : /null/.test(e) &&
                                            (t = 'null text-amber-1100'),
                                      '<span class="' + t + '">' + e + '</span>'
                                    );
                                  }
                                )
                                .split('\n')
                                .map((e) =>
                                  '<span class="line text-xs">'.concat(
                                    e,
                                    '</span>'
                                  )
                                )
                                .join('\n')
                            : '',
                        },
                      }),
                    }),
                  ],
                }),
              ],
            });
          };
        var e_ = (e) => {
            let { log: t, onClose: s } = e,
              n = (0, r.useMemo)(() => JSON.stringify(t, null, 2), [t]),
              { ref: c } = (0, l.UO)(),
              d = (0, m.l)(),
              { mutate: x } = (0, o.a)();
            return (0, a.jsxs)('div', {
              className: (0, T.cn)(
                'relative flex h-full flex-grow flex-col border-l border-t-2 overflow-y-scroll bg-200'
              ),
              'data-sentry-component': 'MessageSelection',
              'data-sentry-source-file': 'MessageSelection.tsx',
              children: [
                (0, a.jsx)('div', {
                  className: (0, T.cn)(
                    'absolute flex h-full w-full flex-col items-center justify-center gap-2 bg-200 text-center opacity-0 transition-all',
                    t ? 'z-0 opacity-0' : 'z-10 opacity-100'
                  ),
                  children: (0, a.jsxs)('div', {
                    className: (0, T.cn)(
                      'flex w-full max-w-sm scale-95 flex-col items-center justify-center gap-6 text-center opacity-0 transition-all delay-300 duration-500',
                      t
                        ? 'mt-0 scale-95 opacity-0'
                        : 'mt-8 scale-100 opacity-100'
                    ),
                    children: [
                      (0, a.jsxs)('div', {
                        className:
                          'relative flex h-4 w-32 items-center rounded border border-default px-2',
                        children: [
                          (0, a.jsx)('div', {
                            className:
                              'h-0.5 w-2/3 rounded-full bg-overlay-hover',
                          }),
                          (0, a.jsx)('div', {
                            className: 'absolute right-1 -bottom-4',
                            children: (0, a.jsx)('svg', {
                              xmlns: 'http://www.w3.org/2000/svg',
                              className: 'h-6 w-6',
                              fill: 'none',
                              viewBox: '0 0 24 24',
                              stroke: 'currentColor',
                              strokeWidth: '1',
                              'data-sentry-element': 'svg',
                              'data-sentry-source-file': 'MessageSelection.tsx',
                              children: (0, a.jsx)('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                d: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
                                'data-sentry-element': 'path',
                                'data-sentry-source-file':
                                  'MessageSelection.tsx',
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex flex-col gap-1',
                        children: [
                          (0, a.jsx)('h3', {
                            className: 'text-sm text-foreground',
                            children: 'Select a message',
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-xs text-foreground-lighter',
                            children:
                              'Click on a message on the left to view details.',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, a.jsxs)('div', {
                  className: 'relative h-px flex-grow',
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'pt-4 flex flex-col gap-4',
                      children: [
                        (0, a.jsxs)('div', {
                          className:
                            'px-4 flex flex-row justify-between items-center',
                          children: [
                            (0, a.jsx)('div', {
                              className: 'transition',
                              children: (0, a.jsx)(ev.Z, {
                                text: n,
                                type: 'default',
                                title: 'Copy log to clipboard',
                                onClick: () => {
                                  var e;
                                  x({
                                    action:
                                      i.b
                                        .REALTIME_INSPECTOR_COPY_MESSAGE_CLICKED,
                                    groups: {
                                      project: null != c ? c : 'Unknown',
                                      organization:
                                        null !==
                                          (e = null == d ? void 0 : d.slug) &&
                                        void 0 !== e
                                          ? e
                                          : 'Unknown',
                                    },
                                  });
                                },
                                'data-sentry-element': 'CopyButton',
                                'data-sentry-source-file':
                                  'MessageSelection.tsx',
                              }),
                            }),
                            (0, a.jsx)(j.z, {
                              type: 'text',
                              className:
                                'cursor-pointer transition text-scale-1200 h-8 w-8 px-0 py-0 flex items-center justify-center',
                              onClick: s,
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'MessageSelection.tsx',
                              children: (0, a.jsx)(ej.Z, {
                                size: 14,
                                strokeWidth: 2,
                                className: 'text-scale-900',
                                'data-sentry-element': 'X',
                                'data-sentry-source-file':
                                  'MessageSelection.tsx',
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsx)('div', {
                          className: 'h-px w-full bg-scale-600 rounded',
                        }),
                      ],
                    }),
                    (0, a.jsx)('div', {
                      className: 'flex flex-col space-y-6 py-4',
                      children: t && (0, a.jsx)(eT, { log: t }),
                    }),
                  ],
                }),
              ],
            });
          },
          eR = () =>
            (0, a.jsxs)('div', {
              className:
                'border bg-studio border-border rounded-md justify-start items-center flex flex-col w-10/12 relative',
              'data-sentry-component': 'NoChannelEmptyState',
              'data-sentry-source-file': 'NoChannelEmptyState.tsx',
              children: [
                (0, a.jsx)('div', {
                  className:
                    'w-full px-5 py-4 items-center gap-4 inline-flex border-b rounded-t-md',
                  children: (0, a.jsxs)('div', {
                    className: 'grow flex-col flex gap-y-1',
                    children: [
                      (0, a.jsx)('p', {
                        className: 'text-foreground',
                        children:
                          'Join a channel to start listening to messages',
                      }),
                      (0, a.jsx)('p', {
                        className: 'text-foreground-lighter text-xs',
                        children:
                          'Channels are the building blocks of realtime where clients can bi-directionally send and receive messages in.',
                      }),
                    ],
                  }),
                }),
                (0, a.jsxs)('div', {
                  className: (0, T.cn)(
                    'w-full px-5 py-4 items-center gap-4 inline-flex'
                  ),
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'grow flex-col flex',
                      children: [
                        (0, a.jsx)('p', {
                          className: 'text-foreground',
                          children: 'Not sure what to do?',
                        }),
                        (0, a.jsx)('p', {
                          className: 'text-foreground-lighter text-xs',
                          children: 'Browse our documentation',
                        }),
                      ],
                    }),
                    (0, a.jsx)(g.G, {
                      href: 'https://supabase.com/docs/guides/realtime',
                      'data-sentry-element': 'DocsButton',
                      'data-sentry-source-file': 'NoChannelEmptyState.tsx',
                    }),
                  ],
                }),
              ],
            }),
          ez = s(71770);
        let eE = {
            PRESENCE: (0, a.jsx)(P, { size: 'xlarge' }),
            BROADCAST: (0, a.jsx)(D, { size: 'xlarge' }),
            POSTGRES: (0, a.jsx)(B, { size: 'xlarge' }),
            SYSTEM: (0, a.jsx)(ez.Z, { size: '20', strokeWidth: 1 }),
          },
          eI = [
            {
              name: 'timestamp-with-truncated-text',
              key: 'main-column',
              renderCell: (e) => {
                let t = e.row.message;
                return (0, a.jsxs)(eC, {
                  children: [
                    (0, a.jsx)('div', {
                      className: (0, T.cn)(
                        'flex justify-center items-center min-w-[24px]',
                        eP(e.row) ? 'text-warning-600' : 'text-green-900'
                      ),
                      children: eE[t],
                    }),
                    (0, a.jsx)('span', {
                      className: (0, T.cn)(
                        'font-mono',
                        eP(e.row) ? '!text-warning-600' : ''
                      ),
                      children: new Date(e.row.timestamp).toISOString(),
                    }),
                    (0, a.jsx)('span', {
                      className: (0, T.cn)(
                        'truncate font-mono',
                        eP(e.row) ? '!text-warning-600' : ''
                      ),
                      children: JSON.stringify(e.row.metadata),
                    }),
                  ],
                });
              },
            },
          ],
          eP = (e) => {
            var t;
            return (
              'SYSTEM' === e.message &&
              (null === (t = e.metadata) || void 0 === t
                ? void 0
                : t.status) === 'error'
            );
          },
          eL = (e) => {
            let { enabled: t, hasChannelSet: s, showSendMessage: n } = e,
              { ref: r } = (0, l.UO)();
            return (0, a.jsx)('div', {
              className: 'w-full max-w-md flex items-center flex-col',
              'data-sentry-component': 'NoResultAlert',
              'data-sentry-source-file': 'MessagesTable.tsx',
              children: s
                ? (0, a.jsxs)(a.Fragment, {
                    children: [
                      t &&
                        (0, a.jsx)('p', {
                          className: 'text-foreground',
                          children: 'No Realtime messages found',
                        }),
                      (0, a.jsx)('p', {
                        className: 'text-foreground-lighter',
                        children: 'Realtime message logs will be shown here',
                      }),
                      (0, a.jsxs)('div', {
                        className:
                          'mt-4 border bg-surface-100 border-border rounded-md justify-start items-center flex flex-col w-full',
                        children: [
                          (0, a.jsxs)('div', {
                            className:
                              'w-full px-5 py-4 items-center gap-4 inline-flex border-b',
                            children: [
                              (0, a.jsx)(D, {
                                size: 'xlarge',
                                className:
                                  'text-background bg-foreground rounded w-6',
                              }),
                              (0, a.jsxs)('div', {
                                className: 'grow flex-col flex',
                                children: [
                                  (0, a.jsx)('p', {
                                    className: 'text-foreground',
                                    children: 'Create a Broadcast message',
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'text-foreground-lighter text-xs',
                                    children: 'Send a message in the channel',
                                  }),
                                ],
                              }),
                              (0, a.jsx)(j.z, {
                                type: 'default',
                                onClick: n,
                                children: 'Broadcast a message',
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className:
                              'w-full px-5 py-4 items-center gap-4 inline-flex border-b',
                            children: [
                              (0, a.jsx)(P, {
                                size: 'xlarge',
                                className:
                                  'text-background bg-foreground rounded w-6',
                              }),
                              (0, a.jsxs)('div', {
                                className: 'grow flex-col flex',
                                children: [
                                  (0, a.jsx)('p', {
                                    className: 'text-foreground',
                                    children: 'Join from another browser tab',
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'text-foreground-lighter text-xs',
                                    children:
                                      'Send messages between multiple clients',
                                  }),
                                ],
                              }),
                              (0, a.jsx)(M(), {
                                href: '/project/'.concat(
                                  r,
                                  '/realtime/inspector'
                                ),
                                target: '_blank',
                                rel: 'noreferrer',
                                children: (0, a.jsx)(j.z, {
                                  type: 'default',
                                  iconRight: (0, a.jsx)(eh.Z, {}),
                                  children: 'Open inspector',
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className:
                              'w-full px-5 py-4 items-center gap-4 inline-flex border-b',
                            children: [
                              (0, a.jsx)(B, {
                                size: 'xlarge',
                                className:
                                  'text-background bg-foreground rounded w-6',
                              }),
                              (0, a.jsxs)('div', {
                                className: 'grow flex-col flex',
                                children: [
                                  (0, a.jsx)('p', {
                                    className: 'text-foreground',
                                    children: 'Listen to a table for changes',
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'text-foreground-lighter text-xs',
                                    children:
                                      'Tables must have realtime enabled',
                                  }),
                                ],
                              }),
                              (0, a.jsx)(M(), {
                                href: '/project/'.concat(
                                  r,
                                  '/database/publications'
                                ),
                                target: '_blank',
                                rel: 'noreferrer',
                                children: (0, a.jsx)(j.z, {
                                  type: 'default',
                                  iconRight: (0, a.jsx)(eh.Z, {}),
                                  children: 'Publications settings',
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className:
                              'w-full px-5 py-4 items-center gap-4 inline-flex rounded-b-md bg-studio',
                            children: [
                              (0, a.jsxs)('div', {
                                className: 'grow flex-col flex',
                                children: [
                                  (0, a.jsx)('p', {
                                    className: 'text-foreground',
                                    children: 'Not sure what to do?',
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'text-foreground-lighter text-xs',
                                    children: 'Browse our documentation',
                                  }),
                                ],
                              }),
                              (0, a.jsx)(g.G, {
                                href: 'https://supabase.com/docs/guides/realtime',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, a.jsx)(eR, {}),
            });
          };
        var eZ = (e) => {
            let {
                enabled: t,
                hasChannelSet: s,
                data: n = [],
                showSendMessage: c,
              } = e,
              [d, x] = (0, r.useState)(null),
              u = JSON.stringify(n),
              { ref: h } = (0, l.UO)(),
              p = (0, m.l)(),
              { mutate: f } = (0, o.a)();
            return ((0, r.useEffect)(() => {
              n &&
                (n.find((e) => e.id === (null == d ? void 0 : d.id)) ||
                  x(null));
            }, [u]),
            n)
              ? (0, a.jsx)(a.Fragment, {
                  children: (0, a.jsxs)('section', {
                    className: 'flex w-full flex-col',
                    style: { maxHeight: 'calc(100vh - 42px - 3rem)' },
                    children: [
                      (0, a.jsx)(ey.Z, {
                        active: t,
                        'data-sentry-element': 'ShimmerLine',
                        'data-sentry-source-file': 'MessagesTable.tsx',
                      }),
                      (0, a.jsxs)('div', {
                        className: (0, T.cn)(
                          'flex h-full flex-row',
                          t ? 'border-brand-400' : null
                        ),
                        children: [
                          (0, a.jsxs)('div', {
                            className: 'flex flex-grow flex-col',
                            children: [
                              t &&
                                (0, a.jsxs)('div', {
                                  className:
                                    'w-full h-9 px-4 bg-surface-100 border-b items-center inline-flex justify-between text-foreground-light',
                                  children: [
                                    (0, a.jsxs)('div', {
                                      className: 'inline-flex gap-2.5 text-xs',
                                      children: [
                                        (0, a.jsx)(ep.Z, {
                                          size: '16',
                                          className: 'animate-spin',
                                        }),
                                        (0, a.jsx)('div', {
                                          children: 'Listening',
                                        }),
                                        (0, a.jsx)('div', { children: '•' }),
                                        (0, a.jsx)('div', {
                                          children:
                                            n.length > 0
                                              ? n.length >= 100
                                                ? 'Found a large number of messages, showing only the latest 100...'
                                                : 'Found '.concat(
                                                    n.length,
                                                    ' messages...'
                                                  )
                                              : 'No message found yet...',
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(j.z, {
                                      type: 'default',
                                      onClick: c,
                                      icon: (0, a.jsx)(ef.Z, {
                                        strokeWidth: 1.5,
                                      }),
                                      children: (0, a.jsx)('span', {
                                        children: 'Broadcast a message',
                                      }),
                                    }),
                                  ],
                                }),
                              (0, a.jsx)(eg.ZP, {
                                className:
                                  'data-grid--simple-logs h-full border-b-0',
                                rowHeight: 40,
                                headerRowHeight: 0,
                                columns: eI,
                                rowClass: (e) =>
                                  (0, T.cn)([
                                    'font-mono tracking-tight',
                                    eu()(e, d)
                                      ? 'bg-scale-800 rdg-row--focused'
                                      : 'bg-200 bg-scale-300 cursor-pointer',
                                    eP(e) && '!bg-warning-300',
                                  ]),
                                rows: n,
                                rowKeyGetter: (e) => e.id,
                                renderers: {
                                  renderRow(e, t) {
                                    let { row: s } = t;
                                    return (0, a.jsx)(
                                      eg.X2,
                                      {
                                        ...t,
                                        isRowSelected: !1,
                                        selectedCellIdx: void 0,
                                        onClick: () => {
                                          var e;
                                          (f({
                                            action:
                                              i.b
                                                .REALTIME_INSPECTOR_MESSAGE_CLICKED,
                                            groups: {
                                              project:
                                                null != h ? h : 'Unknown',
                                              organization:
                                                null !==
                                                  (e =
                                                    null == p
                                                      ? void 0
                                                      : p.slug) && void 0 !== e
                                                  ? e
                                                  : 'Unknown',
                                            },
                                          }),
                                            x(s));
                                        },
                                      },
                                      e
                                    );
                                  },
                                  noRowsFallback: (0, a.jsx)('div', {
                                    className:
                                      'mx-auto flex h-full w-full items-center justify-center space-y-12 py-4 transition-all delay-200 duration-500',
                                    children: (0, a.jsx)(eL, {
                                      enabled: t,
                                      hasChannelSet: s,
                                      showSendMessage: c,
                                    }),
                                  }),
                                },
                                'data-sentry-element': 'DataGrid',
                                'data-sentry-source-file': 'MessagesTable.tsx',
                              }),
                            ],
                          }),
                          (0, a.jsx)('div', {
                            className: 'flex w-1/2 flex-col',
                            children: (0, a.jsx)(e_, {
                              onClose: () => x(null),
                              log: d,
                              'data-sentry-element': 'MessageSelection',
                              'data-sentry-source-file': 'MessagesTable.tsx',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                })
              : null;
          },
          eD = s(5186),
          eA = s(45536),
          eB = s(42155);
        let eF = {
            message: 'Test message',
            payload: '{ "message": "Hello World" }',
          },
          eO = (e) => {
            let { visible: t, onSelectCancel: s, onSelectConfirm: n } = e,
              [l, i] = (0, r.useState)(),
              [o, c] = (0, r.useState)(eF);
            return (
              (0, r.useEffect)(() => {
                t && (i(void 0), c(eF));
              }, [t]),
              (0, a.jsx)(eB.Z, {
                size: 'medium',
                alignFooter: 'right',
                header: 'Broadcast a message to all clients',
                visible: t,
                loading: !1,
                onCancel: s,
                onConfirm: () => {
                  let e = (0, eA.dW)(o.payload);
                  void 0 === e
                    ? i('Please provide a valid JSON')
                    : n({ ...o, payload: e });
                },
                'data-sentry-element': 'Modal',
                'data-sentry-component': 'SendMessageModal',
                'data-sentry-source-file': 'SendMessageModal.tsx',
                children: (0, a.jsxs)(eB.Z.Content, {
                  className: 'flex flex-col gap-y-4',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'SendMessageModal.tsx',
                  children: [
                    (0, a.jsx)(F.Z, {
                      label: 'Message name',
                      size: 'small',
                      className: 'flex-grow',
                      value: o.message,
                      onChange: (e) => c({ ...o, message: e.target.value }),
                      'data-sentry-element': 'Input',
                      'data-sentry-source-file': 'SendMessageModal.tsx',
                    }),
                    (0, a.jsxs)('div', {
                      className: 'flex flex-col gap-y-2',
                      children: [
                        (0, a.jsx)('p', {
                          className: 'text-sm text-scale-1100',
                          children: 'Message payload',
                        }),
                        (0, a.jsx)(eD.Z, {
                          id: 'message-payload',
                          language: 'json',
                          className:
                            '!mb-0 h-32 overflow-hidden rounded border',
                          onInputChange: (e) =>
                            c({ ...o, payload: null != e ? e : '{}' }),
                          options: { wordWrap: 'off', contextmenu: !1 },
                          value: o.payload,
                          'data-sentry-element': 'CodeEditor',
                          'data-sentry-source-file': 'SendMessageModal.tsx',
                        }),
                        void 0 !== l &&
                          (0, a.jsx)('p', {
                            className: 'text-sm text-red-900',
                            children: l,
                          }),
                      ],
                    }),
                  ],
                }),
              })
            );
          };
        var eU = s(57402),
          eH = s(96205),
          eW = s(88469),
          eJ = s.n(eW),
          eV = s(71635),
          eG = s.n(eV),
          eX = s(89022),
          eK = s.n(eX),
          eY = s(56844);
        function eQ(e, t) {
          return 'clear' === t.type
            ? eY.Z6
            : eK()(
                eG()(
                  [
                    {
                      id: (0, eA.k$)(),
                      timestamp: new Date().getTime(),
                      message: t.payload.messageType,
                      metadata: t.payload.metadata,
                    },
                    ...e,
                  ],
                  (e) => -e.timestamp
                ),
                100
              );
        }
        let e$ = (e, t) => {
            var s, a, n;
            let {
                enabled: l,
                channelName: i,
                projectRef: o,
                logLevel: c,
                token: d,
                schema: x,
                table: m,
                isChannelPrivate: u,
                filter: h,
                bearer: p,
                enablePresence: f,
                enableDbChanges: g,
                enableBroadcast: y,
              } = e,
              { data: j } = (0, er.zR)({ projectRef: o }),
              v =
                null !==
                  (n =
                    null == j
                      ? void 0
                      : null === (s = j.app_config) || void 0 === s
                        ? void 0
                        : s.protocol) && void 0 !== n
                  ? n
                  : 'https',
              b =
                null == j
                  ? void 0
                  : null === (a = j.app_config) || void 0 === a
                    ? void 0
                    : a.endpoint,
              N = j
                ? ''.concat(v, '://').concat(b)
                : 'https://'.concat(o, '.supabase.co'),
              w = ''.concat(N, '/realtime/v1').replace(/^http/i, 'ws'),
              [C, S] = (0, r.useReducer)(eQ, []),
              k = (e, t) => {
                S({ type: 'add', payload: { messageType: e, metadata: t } });
              },
              [M, T] = (0, r.useState)(),
              [_, R] = (0, r.useState)(),
              z = (0, ec.fN)();
            return (
              (0, r.useEffect)(() => {
                if (!l) return;
                let e = eJ()(eH.fw, { params: { log_level: c } }),
                  t = {
                    headers: eH.SU.headers,
                    ...e,
                    params: { apikey: d, ...e.params },
                  },
                  s = new eU.VH(w, t);
                return (
                  p && s.setAuth(p),
                  T(s),
                  () => {
                    (s.disconnect(), T(void 0));
                  }
                );
              }, [l, p, N, c, d]),
              (0, r.useEffect)(() => {
                if (!M) return;
                S({ type: 'clear' });
                let s =
                  null == M
                    ? void 0
                    : M.channel(i, {
                        config: { broadcast: { self: !0 }, private: u },
                      });
                if (
                  (s.on('system', {}, (e) => {
                    k('SYSTEM', e);
                  }),
                  y &&
                    s.on('broadcast', { event: '*' }, (e) => k('BROADCAST', e)),
                  f &&
                    s.on('presence', { event: '*' }, (e) => {
                      k('PRESENCE', e);
                    }),
                  g)
                ) {
                  let e = { event: '*', schema: x, table: m, filter: void 0 };
                  ('' !== h && (e.filter = h),
                    s.on('postgres_changes', e, (e) => {
                      let t = performance.now() + performance.timeOrigin,
                        s = Date.parse(e.commit_timestamp);
                      k('POSTGRES', { ...e, latency: t - s });
                    }));
                }
                return (
                  s.subscribe(async (a) => {
                    if ('SUBSCRIBED' === a) {
                      var n;
                      let e =
                        null === (n = z.role) || void 0 === n ? void 0 : n.role;
                      f &&
                        s.send({
                          type: 'presence',
                          event: 'TRACK',
                          payload: {
                            name:
                              (void 0 === e
                                ? 'service_role_'
                                : 'anon' === e
                                  ? 'anon_role_'
                                  : 'authenticated' === e
                                    ? 'authenticated_role_'
                                    : 'user_name_') +
                              Math.floor(100 * Math.random()),
                            t: performance.now(),
                          },
                        });
                    } else
                      'CHANNEL_ERROR' === a &&
                        (ea.Am.error(
                          'Failed to connect to the channel '.concat(
                            i,
                            ': This may be due to restrictive RLS policies. Check your role and try again.'
                          )
                        ),
                        s.unsubscribe(),
                        R(void 0),
                        t({ ...e, channelName: '', enabled: !1 }));
                  }),
                  R(s),
                  () => {
                    (s.unsubscribe(), R(void 0));
                  }
                );
              }, [M, i, y, g, f, h, N, x, m]),
              {
                logData: C,
                sendMessage: (0, r.useCallback)(
                  async (e, t, s) => {
                    _
                      ? 'error' ===
                        (await _.send({
                          type: 'broadcast',
                          event: e,
                          payload: t,
                        }))
                        ? ea.Am.error('Failed to broadcast message')
                        : (ea.Am.success('Successfully broadcasted message'),
                          s())
                      : ea.Am.error(
                          'Failed to broadcast message: channel has not been set'
                        );
                  },
                  [_]
                ),
              }
            );
          },
          eq = () => {
            let { ref: e } = (0, l.UO)(),
              t = (0, m.l)(),
              [s, n] = (0, r.useState)(!1),
              [c, d] = (0, r.useState)({
                enabled: !1,
                projectRef: e,
                channelName: '',
                logLevel: 'info',
                token: '',
                schema: 'public',
                table: '*',
                isChannelPrivate: !1,
                filter: void 0,
                bearer: null,
                enablePresence: !0,
                enableDbChanges: !0,
                enableBroadcast: !0,
              }),
              { mutate: x } = (0, o.a)(),
              { logData: u, sendMessage: h } = e$(c, d);
            return (0, a.jsxs)('div', {
              className: 'flex flex-col grow h-full',
              'data-sentry-component': 'RealtimeInspector',
              'data-sentry-source-file': 'index.tsx',
              children: [
                (0, a.jsx)(ex, {
                  config: c,
                  onChangeConfig: d,
                  'data-sentry-element': 'Header',
                  'data-sentry-source-file': 'index.tsx',
                }),
                (0, a.jsx)('div', {
                  className: 'relative flex flex-col grow',
                  children: (0, a.jsx)('div', {
                    className: 'flex grow',
                    children: (0, a.jsx)(eZ, {
                      hasChannelSet: c.channelName.length > 0,
                      enabled: c.enabled,
                      data: u,
                      showSendMessage: () => n(!0),
                      'data-sentry-element': 'MessagesTable',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                  }),
                }),
                (0, a.jsx)(eO, {
                  visible: s,
                  onSelectCancel: () => n(!1),
                  onSelectConfirm: (s) => {
                    var a;
                    (x({
                      action: i.b.REALTIME_INSPECTOR_BROADCAST_SENT,
                      groups: {
                        project: null != e ? e : 'Unknown',
                        organization:
                          null !== (a = null == t ? void 0 : t.slug) &&
                          void 0 !== a
                            ? a
                            : 'Unknown',
                      },
                    }),
                      h(s.message, s.payload, () => n(!1)));
                  },
                  'data-sentry-element': 'SendMessageModal',
                  'data-sentry-source-file': 'index.tsx',
                }),
              ],
            });
          };
        var e0 = s(54768),
          e1 = s(95767),
          e2 = s(61767),
          e4 = s(90817);
        let e5 = () =>
          (0, e4.Xo)(n.KA.READ, 'service_api_keys')
            ? (0, a.jsx)(eq, {
                'data-sentry-element': 'RealtimeInspector',
                'data-sentry-component': 'InspectorPage',
                'data-sentry-source-file': 'inspector.tsx',
              })
            : (0, a.jsx)(e2.Z, {
                isFullPage: !0,
                resourceText: "access your project's realtime functionalities",
              });
        e5.getLayout = (e) =>
          (0, a.jsx)(e1.Z, {
            children: (0, a.jsx)(e0.Z, {
              title: 'Realtime Inspector',
              children: e,
            }),
          });
        var e3 = e5;
      },
      85682: function (e, t, s) {
        'use strict';
        s.d(t, {
          I: function () {
            return x;
          },
        });
        var a = s(97458),
          n = s(58596),
          l = s(52983),
          r = s(65092),
          i = s(56740),
          o = s(90839),
          c = s(25843);
        function d(e) {
          let { icon: t, className: s } = e;
          return (0, a.jsx)('div', {
            className: (0, r.cn)(
              'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground-light',
              s
            ),
            'data-sentry-component': 'InputIconContainer',
            'data-sentry-source-file': 'InputIconContainer.tsx',
            children: t,
          });
        }
        let x = (0, l.forwardRef)((e, t) => {
          let {
              copy: s,
              icon: x,
              reveal: m = !1,
              actions: u,
              onCopy: h,
              iconContainerClassName: p,
              containerClassName: f,
              ...g
            } = e,
            [y, j] = (0, l.useState)('Copy'),
            [v, b] = (0, l.useState)(!0),
            N = (0, c.Z)('input'),
            w = [];
          return (
            x && w.push(N.with_icon),
            (0, a.jsxs)('div', {
              className: (0, r.cn)('relative', f),
              children: [
                (0, a.jsx)(i.I, {
                  ref: t,
                  ...g,
                  onCopy: h,
                  value: m && v ? '**** **** **** ****' : g.value,
                  className: (0, r.cn)(...w, g.className),
                }),
                x && (0, a.jsx)(d, { icon: x, className: p }),
                s || u
                  ? (0, a.jsxs)('div', {
                      className: N.actions_container,
                      children: [
                        s && !(m && v)
                          ? (0, a.jsx)(o.z, {
                              size: 'tiny',
                              type: 'default',
                              icon: (0, a.jsx)(n.Z, {
                                size: 16,
                                className: 'text-foreground-muted',
                              }),
                              onClick: () => {
                                var e, t;
                                return (
                                  (e = g.value),
                                  void (
                                    null ===
                                      (t = navigator.clipboard.writeText(e)) ||
                                    void 0 === t ||
                                    t.then(
                                      function () {
                                        (j('Copied'),
                                          setTimeout(function () {
                                            j('Copy');
                                          }, 3e3),
                                          null == h || h());
                                      },
                                      function () {
                                        j('Failed to copy');
                                      }
                                    )
                                  )
                                );
                              },
                              children: y,
                            })
                          : null,
                        m && v
                          ? (0, a.jsx)(o.z, {
                              size: 'tiny',
                              type: 'default',
                              onClick: function () {
                                b(!1);
                              },
                              children: 'Reveal',
                            })
                          : null,
                        u && u,
                      ],
                    })
                  : null,
              ],
            })
          );
        });
      },
      54354: function (e, t, s) {
        'use strict';
        s.d(t, {
          c: function () {
            return j;
          },
          w: function () {
            return f;
          },
        });
        var a = s(97458),
          n = s(52983),
          l = s(40577),
          r = s(65092),
          i = s(28977),
          o = s.n(i),
          c = s(60192),
          d = s.n(c),
          x = s(13516),
          m = s.n(x),
          u = s(57304);
        (o().extend(d()), o().extend(m()));
        let h = (e) =>
            o()
              .unix(Number(e) / 1e3 / 1e3)
              .toISOString(),
          p = (e) => {
            let t = 16 === String(e).length;
            return !Number.isNaN(Number(e)) && t;
          },
          f = (e) => {
            let { utcTimestamp: t, format: s } = e,
              a = p(t) ? h(t) : t;
            return o().utc(a).local().format(s);
          },
          g = (e) => {
            let { utcTimestamp: t, format: s } = e,
              a = p(t) ? h(t) : t;
            return o().utc(a).format(s);
          },
          y = (e) => {
            let { utcTimestamp: t } = e,
              s = p(t) ? h(t) : t;
            return o().utc(s).fromNow();
          },
          j = (e) => {
            let {
                utcTimestamp: t,
                className: s,
                displayAs: i = 'local',
                format: o = 'DD MMM  HH:mm:ss',
                labelFormat: c = 'DD MMM HH:mm:ss',
              } = e,
              d = f({ utcTimestamp: t, format: o }),
              x = g({ utcTimestamp: t, format: o }),
              m = y({ utcTimestamp: t }),
              [h, p] = (0, n.useState)('start'),
              j = (0, n.useRef)(null),
              v = Intl.DateTimeFormat().resolvedOptions().timeZone;
            (0, n.useEffect)(() => {
              let e = () => {
                if (j.current) {
                  let e = j.current.getBoundingClientRect(),
                    t = window.innerHeight;
                  p(e.top < t / 2 ? 'start' : 'end');
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
              let { label: t, value: s } = e,
                [l, i] = (0, n.useState)(!1);
              return (0, a.jsxs)('span', {
                onPointerDown: (e) => {
                  e.stopPropagation();
                },
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
                onClick: (e) => {
                  (e.stopPropagation(),
                    e.preventDefault(),
                    navigator.clipboard.writeText(s),
                    i(!0),
                    setTimeout(() => {
                      i(!1);
                    }, 1e3));
                },
                className: (0, r.cn)(
                  'relative cursor-default grid grid-cols-2 gap-2 bg-surface-100 px-2 py-1 group',
                  { 'bg-surface-100': l }
                ),
                'data-sentry-component': 'TooltipRow',
                'data-sentry-source-file': 'index.tsx',
                children: [
                  (0, a.jsxs)('span', {
                    className: 'text-right truncate',
                    children: [t, ':'],
                  }),
                  (0, a.jsxs)('div', {
                    className: 'relative',
                    children: [
                      l &&
                        (0, a.jsx)('span', {
                          className:
                            'absolute inset-0 flex items-center text-brand-600 bg-surface-100',
                          children: 'Copied!',
                        }),
                      (0, a.jsxs)('span', {
                        className: 'flex items-center gap-x-2',
                        children: [
                          s,
                          (0, a.jsx)(u.Z, {
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
            return (0, a.jsxs)(l.u, {
              'data-sentry-element': 'Tooltip',
              'data-sentry-component': 'TimestampInfo',
              'data-sentry-source-file': 'index.tsx',
              children: [
                (0, a.jsx)(l.aJ, {
                  asChild: !0,
                  ref: j,
                  className: 'text-xs '.concat(
                    s,
                    ' border-b border-transparent border-dashed border-foreground-light'
                  ),
                  'data-sentry-element': 'TooltipTrigger',
                  'data-sentry-source-file': 'index.tsx',
                  children: (0, a.jsx)('span', {
                    children:
                      'local' === i
                        ? f({ utcTimestamp: t, format: c })
                        : g({ utcTimestamp: t, format: c }),
                  }),
                }),
                (0, a.jsxs)(l._v, {
                  align: h,
                  side: 'right',
                  className: 'font-mono p-0 py-1',
                  'data-sentry-element': 'TooltipContent',
                  'data-sentry-source-file': 'index.tsx',
                  children: [
                    (0, a.jsx)(b, {
                      label: 'UTC',
                      value: x,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, a.jsx)(b, {
                      label: ''.concat(v),
                      value: d,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, a.jsx)(b, {
                      label: 'Relative',
                      value: m,
                      'data-sentry-element': 'TooltipRow',
                      'data-sentry-source-file': 'index.tsx',
                    }),
                    (0, a.jsx)(b, {
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
      94059: function (e, t, s) {
        'use strict';
        s.d(t, {
          ZP: function () {
            return m;
          },
        });
        var a = s(97458),
          n = s(52983),
          l = s(25843),
          r = s(65092);
        function i(e) {
          let { children: t, className: s, tag: n = 'div', style: l } = e;
          return (0, a.jsx)(''.concat(n), {
            style: l,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Typography',
            'data-sentry-source-file': 'Typography.tsx',
            children: t,
          });
        }
        ((i.Title = function (e) {
          let { className: t, level: s = 1, children: n, style: l } = e;
          return (0, a.jsx)('h'.concat(s), {
            style: l,
            'data-sentry-element': 'CustomTag',
            'data-sentry-component': 'Title',
            'data-sentry-source-file': 'Title.tsx',
            children: n,
          });
        }),
          (i.Text = function (e) {
            let {
              className: t,
              children: s,
              style: n,
              type: l,
              disabled: r,
              mark: i,
              code: o,
              keyboard: c,
              underline: d,
              strikethrough: x,
              strong: m,
              small: u,
            } = e;
            return o
              ? (0, a.jsx)('code', { style: n, children: s })
              : i
                ? (0, a.jsx)('mark', { style: n, children: s })
                : c
                  ? (0, a.jsx)('kbd', { style: n, children: s })
                  : m
                    ? (0, a.jsx)('strong', { style: n, children: s })
                    : (0, a.jsx)('span', {
                        style: n,
                        'data-sentry-component': 'Text',
                        'data-sentry-source-file': 'Text.tsx',
                        children: s,
                      });
          }),
          (i.Link = function (e) {
            let {
              children: t,
              target: s = '_blank',
              href: n,
              className: l,
              onClick: r,
              style: i,
            } = e;
            return (0, a.jsx)('a', {
              onClick: r,
              href: n,
              target: s,
              rel: 'noopener noreferrer',
              style: i,
              'data-sentry-component': 'Link',
              'data-sentry-source-file': 'Link.tsx',
              children: t,
            });
          }));
        let o = (0, n.createContext)({ type: 'text' }),
          c = (e) => {
            let { type: t } = e;
            return (0, a.jsx)(o.Provider, {
              value: { type: t },
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'MenuContextProvider',
              'data-sentry-source-file': 'MenuContext.tsx',
              children: e.children,
            });
          },
          d = () => {
            let e = (0, n.useContext)(o);
            if (void 0 === e)
              throw Error(
                'MenuContext must be used within a MenuContextProvider.'
              );
            return e;
          };
        function x(e) {
          let {
            children: t,
            className: s,
            ulClassName: n,
            style: l,
            type: r = 'text',
          } = e;
          return (0, a.jsx)('nav', {
            role: 'menu',
            'aria-label': 'Sidebar',
            'aria-orientation': 'vertical',
            'aria-labelledby': 'options-menu',
            className: s,
            style: l,
            'data-sentry-component': 'Menu',
            'data-sentry-source-file': 'Menu.tsx',
            children: (0, a.jsx)(c, {
              type: r,
              'data-sentry-element': 'MenuContextProvider',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, a.jsx)('ul', { className: n, children: t }),
            }),
          });
        }
        ((x.Item = function (e) {
          let {
              children: t,
              icon: s,
              active: n,
              rounded: i,
              onClick: o,
              doNotCloseOverlay: c = !1,
              showActiveBar: x = !1,
              style: m,
            } = e,
            u = (0, l.Z)('menu'),
            { type: h } = d(),
            p = [u.item.base];
          (p.push(u.item.variants[h].base),
            n
              ? p.push(u.item.variants[h].active)
              : p.push(u.item.variants[h].normal));
          let f = [u.item.content.base];
          n ? f.push(u.item.content.active) : f.push(u.item.content.normal);
          let g = [u.item.icon.base];
          return (
            n ? g.push(u.item.icon.active) : g.push(u.item.icon.normal),
            (0, a.jsxs)('li', {
              role: 'menuitem',
              className: (0, r.cn)('outline-none', p),
              style: m,
              onClick: o,
              'aria-current': n ? 'page' : void 0,
              'data-sentry-component': 'Item',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                s &&
                  (0, a.jsx)('div', {
                    className: ''.concat(g.join(' '), ' min-w-fit'),
                    children: s,
                  }),
                (0, a.jsx)('span', { className: f.join(' '), children: t }),
              ],
            })
          );
        }),
          (x.Group = function (e) {
            let { children: t, icon: s, title: n } = e,
              r = (0, l.Z)('menu'),
              { type: i } = d();
            return (0, a.jsxs)('div', {
              className: [r.group.base, r.group.variants[i]].join(' '),
              'data-sentry-component': 'Group',
              'data-sentry-source-file': 'Menu.tsx',
              children: [
                s &&
                  (0, a.jsx)('span', { className: r.group.icon, children: s }),
                (0, a.jsx)('span', { className: r.group.content, children: n }),
                t,
              ],
            });
          }),
          (x.Misc = function (e) {
            let { children: t } = e;
            return (0, a.jsx)('div', {
              'data-sentry-component': 'Misc',
              'data-sentry-source-file': 'Menu.tsx',
              children: (0, a.jsx)(i.Text, {
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Menu.tsx',
                children: (0, a.jsx)('span', { children: t }),
              }),
            });
          }));
        var m = x;
      },
      62210: function (e, t, s) {
        'use strict';
        s.d(t, {
          r: function () {
            return d;
          },
        });
        var a = s(97458),
          n = s(56384),
          l = s(31706),
          r = s(52983),
          i = s(65092);
        let o = (0, l.j)(
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
          c = (0, l.j)(
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
          d = r.forwardRef((e, t) => {
            let { className: s, size: l, ...r } = e;
            return (0, a.jsx)(n.fC, {
              className: (0, i.cn)(o({ size: l }), s),
              ...r,
              ref: t,
              children: (0, a.jsx)(n.bU, {
                className: (0, i.cn)(c({ size: l })),
              }),
            });
          });
        d.displayName = n.fC.displayName;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          5518, 9552, 2549, 1379, 272, 3861, 2728, 245, 5767, 876, 5433, 3443,
          6273, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 29518));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
