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
      (e._sentryDebugIds[t] = '5151e357-05ce-4f20-a6d2-a12e81cb230b'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-5151e357-05ce-4f20-a6d2-a12e81cb230b'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5185],
  {
    72725: function (e, t, n) {
      n.d(t, {
        O: function () {
          return o;
        },
      });
      var s = n(28894),
        r = n(6464),
        a = n(80023);
      async function l(e, t) {
        let { projectRef: n } = e;
        if (!n) throw Error('projectRef is required');
        let { data: s, error: a } = await (0, r.U2)(
          '/platform/projects/{ref}/analytics/warehouse/collections',
          { params: { path: { ref: n } }, signal: t }
        );
        return (a && (0, r.S3)(a), s);
      }
      let o = function (e) {
        let { projectRef: t } = e,
          { enabled: n } =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { enabled: !0 };
        return (0, s.a)(
          a.d.warehouseCollections(t),
          (e) => {
            let { signal: n } = e;
            return l({ projectRef: t }, n);
          },
          { enabled: n && !!t }
        );
      };
    },
    29456: function (e, t, n) {
      n.d(t, {
        z: function () {
          return c;
        },
      });
      var s = n(36457),
        r = n(64618),
        a = n(34549),
        l = n(6464),
        o = n(84437);
      async function i(e, t) {
        let { projectRef: n, ids: s } = e,
          { data: r, error: a } = await (0, l.IV)(
            '/platform/projects/{ref}/content',
            {
              headers: { Version: '2' },
              params: { path: { ref: n }, query: { ids: s } },
              signal: t,
            }
          );
        return (a && (0, l.S3)(a), r.map((e) => e.id));
      }
      let c = function () {
        let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          l = (0, s.NL)();
        return (0, r.D)((e) => i(e), {
          async onSuccess(t, n, s) {
            let { projectRef: r } = n;
            (await l.invalidateQueries(o.$.allContentLists(r)),
              await (null == e ? void 0 : e(t, n, s)));
          },
          async onError(e, n, s) {
            void 0 === t
              ? a.Am.error('Failed to delete contents: '.concat(e.message))
              : t(e, n, s);
          },
          ...n,
        });
      };
    },
    41555: function (e, t, n) {
      n.d(t, {
        I: function () {
          return o;
        },
      });
      var s = n(28894),
        r = n(6464),
        a = n(84437);
      async function l(e, t) {
        let { projectRef: n, type: s, name: a, limit: l = 10 } = e;
        if (void 0 === n) throw Error('projectRef is required for getContent');
        let { data: o, error: i } = await (0, r.U2)(
          '/platform/projects/{ref}/content',
          {
            params: {
              path: { ref: n },
              query: { type: s, name: a, limit: l.toString() },
            },
            signal: t,
          }
        );
        return (i && (0, r.S3)(i), { cursor: o.cursor, content: o.data });
      }
      let o = function (e) {
        let { projectRef: t, type: n, name: r, limit: o } = e,
          { enabled: i = !0, ...c } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, s.a)(
          a.$.list(t, { type: n, name: r, limit: o }),
          (e) => {
            let { signal: s } = e;
            return l({ projectRef: t, type: n, name: r, limit: o }, s);
          },
          { enabled: i && void 0 !== t, ...c }
        );
      };
    },
    74243: function (e, t, n) {
      n.d(t, {
        a: function () {
          return a;
        },
      });
      var s = n(69951),
        r = n(75541);
      function a() {
        let e = (0, r.l)(),
          {
            data: t,
            isLoading: n,
            isSuccess: a,
          } = (0, s.Gl)({ orgSlug: null == e ? void 0 : e.slug });
        return n
          ? {
              plan: null,
              usageBillingEnabled: null,
              isLoading: n,
              isSuccess: !1,
            }
          : {
              plan: null == t ? void 0 : t.plan,
              usageBillingEnabled: null == t ? void 0 : t.usage_billing_enabled,
              isLoading: n,
              isSuccess: a,
            };
      }
    },
    89296: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, n(98266).Z)('Database', [
        ['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3', key: 'msslwz' }],
        ['path', { d: 'M3 5V19A9 3 0 0 0 21 19V5', key: '1wlel7' }],
        ['path', { d: 'M3 12A9 3 0 0 0 21 12', key: 'mv7ke4' }],
      ]);
    },
    49296: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, n(98266).Z)('Ellipsis', [
        ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
        ['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
        ['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
      ]);
    },
    22702: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, n(98266).Z)('FilePlus', [
        [
          'path',
          {
            d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
            key: '1rqfz7',
          },
        ],
        ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
        ['path', { d: 'M9 15h6', key: 'cctwl0' }],
        ['path', { d: 'M12 18v-6', key: '17g6i2' }],
      ]);
    },
    9743: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return b;
        },
      });
      var s = n(97458),
        r = n(32691),
        a = n(52983),
        l = n(34549),
        o = n(12436),
        i = n(29456),
        c = n(52521),
        d = n(14500),
        u = n(32002),
        m = n(42155),
        x = n(19540),
        h = n(51571),
        p = n(90839);
      let y = (e) => {
        let { visible: t, onCancel: n, onSubmit: r, initialValues: a } = e;
        return (0, s.jsx)(m.Z, {
          visible: t,
          onCancel: n,
          hideFooter: !0,
          header: 'Update saved query',
          size: 'medium',
          'data-sentry-element': 'Modal',
          'data-sentry-component': 'UpdateSavedQueryModal',
          'data-sentry-source-file': 'Logs.UpdateSavedQueryModal.tsx',
          children: (0, s.jsx)(x.Z, {
            onReset: n,
            validateOnBlur: !0,
            initialValues: a,
            validate: function (e) {
              let t = {};
              return (e.name || (t.name = 'Required'), t);
            },
            onSubmit: r,
            'data-sentry-element': 'Form',
            'data-sentry-source-file': 'Logs.UpdateSavedQueryModal.tsx',
            children: (e) => {
              let { isSubmitting: t } = e;
              return (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsx)(m.Z.Content, {
                    children: (0, s.jsx)(h.Z, {
                      label: 'Name',
                      id: 'name',
                      name: 'name',
                    }),
                  }),
                  (0, s.jsx)(m.Z.Content, {
                    children: (0, s.jsx)(h.Z.TextArea, {
                      label: 'Description',
                      id: 'description',
                      placeholder: 'Describe query',
                      size: 'medium',
                      textAreaClassName: 'resize-none',
                    }),
                  }),
                  (0, s.jsx)(m.Z.Separator, {}),
                  (0, s.jsxs)(m.Z.Content, {
                    className: 'flex items-center justify-end gap-2',
                    children: [
                      (0, s.jsx)(p.z, {
                        htmlType: 'reset',
                        type: 'default',
                        onClick: n,
                        disabled: t,
                        children: 'Cancel',
                      }),
                      (0, s.jsx)(p.z, {
                        htmlType: 'submit',
                        loading: t,
                        disabled: t,
                        children: 'Save query',
                      }),
                    ],
                  }),
                ],
              });
            },
          }),
        });
      };
      var f = n(3977),
        g = n(74304),
        j = n(1846),
        v = n(21972),
        b = (e) => {
          let { item: t } = e,
            n = (0, r.useRouter)(),
            { ref: m } = (0, o.UO)(),
            [x, h] = (0, a.useState)(!1),
            [p, b] = (0, a.useState)(!1),
            { mutate: C } = (0, i.z)({
              onSuccess: () => {
                (h(!1), l.Am.success('Successfully deleted query'));
              },
              onError: (e) => {
                l.Am.error('Failed to delete saved query: '.concat(e.message));
              },
            }),
            { mutate: S } = (0, c.R)({
              onSuccess: () => {
                (b(!1), l.Am.success('Successfully updated query'));
              },
              onError: (e) => {
                l.Am.error('Failed to update query: '.concat(e.message));
              },
            }),
            w = async () => {
              if (!m || 'string' != typeof m)
                return console.error('Invalid project reference');
              C({ projectRef: m, ids: [t.id] });
            },
            N = async (e) => {
              let { name: n, description: s } = e;
              if (!m || 'string' != typeof m)
                return console.error('Invalid project reference');
              S({
                projectRef: m,
                payload: {
                  ...t,
                  name: n,
                  description: s || void 0,
                  type: 'log_sql',
                  visibility: 'user',
                },
              });
            },
            k = n.query.queryId === t.id;
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(v.k, {
                label: t.name,
                icon: (0, s.jsx)(j.vu, { size: '15' }),
                href: '/project/'
                  .concat(m, '/logs/explorer?queryId=')
                  .concat(encodeURIComponent(t.id), '&q=')
                  .concat(encodeURIComponent(t.content.sql)),
                isActive: k,
                dropdownItems: (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsxs)(d.Xi, {
                      onClick: () => b(!0),
                      children: [
                        (0, s.jsx)(f.Z, { size: 14, className: 'mr-2' }),
                        'Edit query',
                      ],
                    }),
                    (0, s.jsx)(d.VD, {}),
                    (0, s.jsxs)(d.Xi, {
                      onClick: () => {
                        h(!0);
                      },
                      children: [
                        (0, s.jsx)(g.Z, { size: 14, className: 'mr-2' }),
                        'Delete query',
                      ],
                    }),
                  ],
                }),
                'data-sentry-element': 'LogsSidebarItem',
                'data-sentry-source-file': 'Logs.SavedQueriesItem.tsx',
              }),
              (0, s.jsx)(u.Z, {
                variant: 'destructive',
                visible: x,
                confirmLabel: 'Delete query',
                title: 'Confirm to delete saved query',
                onCancel: () => {
                  h(!1);
                },
                onConfirm: w,
                'data-sentry-element': 'ConfirmationModal',
                'data-sentry-source-file': 'Logs.SavedQueriesItem.tsx',
                children: (0, s.jsxs)('p', {
                  className: 'text-sm text-foreground-light',
                  children: ['Are you sure you want to delete ', t.name, '?'],
                }),
              }),
              (0, s.jsx)(y, {
                visible: p,
                initialValues: { name: t.name, description: t.description },
                onCancel: () => {
                  b(!1);
                },
                onSubmit: (e) => {
                  N(e);
                },
                'data-sentry-element': 'UpdateSavedQueryModal',
                'data-sentry-source-file': 'Logs.SavedQueriesItem.tsx',
              }),
            ],
          });
        };
    },
    21972: function (e, t, n) {
      n.d(t, {
        k: function () {
          return d;
        },
      });
      var s = n(97458),
        r = n(49296),
        a = n(83145),
        l = n.n(a),
        o = n(65092),
        i = n(14500),
        c = n(90839);
      function d(e) {
        let {
          label: t,
          icon: n,
          dropdownItems: a,
          href: d,
          isActive: u,
          onClick: m,
        } = e;
        return (0, s.jsxs)('div', {
          className: (0, o.cn)(
            { 'bg-foreground-lighter/10': u },
            'relative flex [&:has([data-state=open])]:bg-foreground-lighter/10 [&:has([data-state=open])]:text-foreground text-foreground bg-foreground-lighter/10 transition-all text-foreground-light group'
          ),
          'data-sentry-component': 'LogsSidebarItem',
          'data-sentry-source-file': 'SidebarItem.tsx',
          children: [
            (0, s.jsxs)(l(), {
              onClick: m,
              href: d,
              className:
                'h-7 flex-1 text-sm px-4 flex items-center gap-2 truncate',
              'data-sentry-element': 'Link',
              'data-sentry-source-file': 'SidebarItem.tsx',
              children: [
                (0, s.jsx)('span', { children: n }),
                (0, s.jsx)('span', { className: 'truncate', children: t }),
              ],
            }),
            a &&
              (0, s.jsxs)(i.h_, {
                children: [
                  (0, s.jsx)(i.$F, {
                    asChild: !0,
                    onClick: (e) => {
                      e.preventDefault();
                    },
                    children: (0, s.jsx)(c.z, {
                      type: 'text',
                      title: 'Actions',
                      className:
                        'space-x-0 h-7 px-1.5 opacity-0 group-opacity-100 !bg-transparent data-[state=open]:opacity-100',
                      icon: (0, s.jsx)(r.Z, { size: 14 }),
                      children: (0, s.jsx)('div', {
                        className: 'sr-only',
                        children: 'Actions',
                      }),
                    }),
                  }),
                  (0, s.jsx)(i.AW, {
                    className: 'w-48',
                    align: 'end',
                    children: a,
                  }),
                ],
              }),
          ],
        });
      }
    },
    35185: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return ed;
        },
      });
      var s = n(97458),
        r = n(198),
        a = n(61767),
        l = n(90817),
        o = n(58326),
        i = n(60245),
        c = n(12436),
        d = n(32691),
        u = n(34549),
        m = n(36457),
        x = n(64618),
        h = n(6464),
        p = n(80023);
      async function y(e) {
        let { projectRef: t, name: n, retention_days: s } = e,
          { data: r, error: a } = await (0, h.v_)(
            '/platform/projects/{ref}/analytics/warehouse/collections',
            {
              params: { path: { ref: t } },
              body: { name: n, retention_days: s },
            }
          );
        return (a && (0, h.S3)(a), r);
      }
      let f = function () {
        let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          s = (0, m.NL)();
        return (0, x.D)(
          (e) => {
            var t;
            let n =
              null ===
                (t = s.getQueryData(p.d.warehouseCollections(e.projectRef))) ||
              void 0 === t
                ? void 0
                : t.map((e) => e.name);
            if (null == n ? void 0 : n.includes(e.name))
              throw Error(
                'Collection with the name '.concat(e.name, ' already exists')
              );
            return y(e);
          },
          {
            async onSuccess(t, n, r) {
              let { projectRef: a } = n;
              (await s.invalidateQueries(p.d.warehouseCollections(a)),
                await (null == e ? void 0 : e(t, n, r)));
            },
            async onError(e, n, s) {
              void 0 === t
                ? u.Am.error('Failed to create collection: '.concat(e.message))
                : t(e, n, s);
            },
            ...n,
          }
        );
      };
      var g = n(42155),
        j = n(78751),
        v = n(86848),
        b = n(5394),
        C = n(49142),
        S = n(56740),
        w = n(90839),
        N = n(78366),
        k = n(74243),
        L = n(33526),
        M = n(75541);
      let F = (e) => {
          let {
              initialValues: t,
              onSubmit: n,
              isLoading: r,
              onCancelClick: a,
            } = e,
            { plan: l, isLoading: o } = (0, k.a)(),
            i = (0, d.useRouter)(),
            c = (0, M.l)(),
            u = o ? 1 : (null == l ? void 0 : l.id) === 'free' ? 3 : 90,
            m = b.z.object({
              name: b.z.string().min(1),
              retention_days: b.z.coerce
                .number()
                .min(1)
                .max(u)
                .multipleOf(1)
                .positive()
                .int(),
            }),
            x = (0, v.cI)({
              resolver: (0, j.F)(m),
              defaultValues: {
                name: (null == t ? void 0 : t.name) || '',
                retention_days: (null == t ? void 0 : t.retention_days) || u,
              },
            }),
            h = x.handleSubmit(n),
            p = (e) => (1 === e ? '1 day' : ''.concat(e, ' days')),
            y = (e) =>
              !e || e < 1
                ? (0, s.jsxs)(s.Fragment, {
                    children: ['Your plan allows for a maximum of ', p(u), '.'],
                  })
                : (0, s.jsxs)(s.Fragment, {
                    children: [
                      'Your logs will be removed after ',
                      p(e),
                      '. ',
                      (0, s.jsx)('br', {}),
                      'Your plan allows for a maximum of ',
                      p(u),
                      '.',
                    ],
                  });
          return (0, s.jsx)(C.l0, {
            ...x,
            'data-sentry-element': 'Form_Shadcn_',
            'data-sentry-component': 'CollectionForm',
            'data-sentry-source-file': 'CollectionForm.tsx',
            children: (0, s.jsxs)('form', {
              onSubmit: h,
              children: [
                (0, s.jsxs)(g.Z.Content, {
                  className: 'space-y-3',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CollectionForm.tsx',
                  children: [
                    (0, s.jsx)(C.Wi, {
                      control: x.control,
                      name: 'name',
                      render: (e) => {
                        let { field: t } = e;
                        return (0, s.jsx)(N.E, {
                          label: 'Collection name',
                          layout: 'horizontal',
                          children: (0, s.jsx)(C.NI, {
                            children: (0, s.jsx)(S.I, {
                              autoFocus: !0,
                              placeholder: 'Events',
                              ...t,
                            }),
                          }),
                        });
                      },
                      'data-sentry-element': 'FormField_Shadcn_',
                      'data-sentry-source-file': 'CollectionForm.tsx',
                    }),
                    (0, s.jsx)(C.Wi, {
                      control: x.control,
                      name: 'retention_days',
                      render: (e) => {
                        let { field: t } = e;
                        return (0, s.jsx)(N.E, {
                          label: 'Retention',
                          layout: 'horizontal',
                          description: y(Number(t.value)),
                          children: (0, s.jsx)(C.NI, {
                            children: (0, s.jsxs)('div', {
                              className: 'relative flex items-center gap-2',
                              children: [
                                (0, s.jsx)(S.I, { type: 'number', ...t }),
                                (0, s.jsx)('span', {
                                  className:
                                    'absolute right-3 text-foreground-lighter text-sm pointer-events-none',
                                  children: 'days',
                                }),
                              ],
                            }),
                          }),
                        });
                      },
                      'data-sentry-element': 'FormField_Shadcn_',
                      'data-sentry-source-file': 'CollectionForm.tsx',
                    }),
                  ],
                }),
                (null == l ? void 0 : l.id) === 'free' &&
                  (0, s.jsxs)(s.Fragment, {
                    children: [
                      (0, s.jsx)(g.Z.Separator, {}),
                      (0, s.jsx)(L.J, {
                        className: 'border-none bg-transparent',
                        type: 'default',
                        title: 'Upgrade your plan to increase retention',
                        description: (0, s.jsxs)('div', {
                          children: [
                            'Upgrade to the pro plan to increase retention to 90 days.',
                            (0, s.jsx)(w.z, {
                              className: 'mt-2',
                              type: 'primary',
                              onClick: () =>
                                i.push(
                                  '/org/'.concat(
                                    null == c ? void 0 : c.slug,
                                    '/billing?panel=subscriptionPlan&source=dataWarehouseIncreaseRetention'
                                  )
                                ),
                              children: 'Upgrade plan',
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                (0, s.jsx)(C.zG, {
                  'data-sentry-element': 'FormMessage_Shadcn_',
                  'data-sentry-source-file': 'CollectionForm.tsx',
                }),
                (0, s.jsxs)(g.Z.Content, {
                  className:
                    'py-4 border-t flex items-center justify-end gap-2',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'CollectionForm.tsx',
                  children: [
                    (0, s.jsx)(w.z, {
                      size: 'tiny',
                      type: 'default',
                      onClick: a,
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'CollectionForm.tsx',
                      children: 'Cancel',
                    }),
                    (0, s.jsx)(w.z, {
                      size: 'tiny',
                      loading: r,
                      disabled: r,
                      htmlType: 'submit',
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'CollectionForm.tsx',
                      children: 'Create collection',
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        I = (e) => {
          let { open: t, onOpenChange: n } = e,
            r = (0, d.useRouter)(),
            { ref: a } = (0, c.UO)(),
            { mutate: l, isLoading: o } = f({
              onSuccess: (e) => {
                (n(!1),
                  u.Am.success('Collection created successfully'),
                  r.push(
                    '/project/'.concat(a, '/logs/collections/').concat(e.token)
                  ));
              },
              onError: (e) => {
                u.Am.error(e.message);
              },
            });
          return (0, s.jsx)(g.Z, {
            size: 'medium',
            onCancel: () => n(!1),
            header: 'Create collection',
            visible: t,
            hideFooter: !0,
            'data-sentry-element': 'Modal',
            'data-sentry-component': 'CreateWarehouseCollectionModal',
            'data-sentry-source-file': 'CreateWarehouseCollection.tsx',
            children: (0, s.jsx)(F, {
              onCancelClick: () => n(!1),
              isLoading: o,
              onSubmit: (e) => {
                a &&
                  l({
                    projectRef: a,
                    name: e.name,
                    retention_days: e.retention_days,
                  });
              },
              'data-sentry-element': 'CollectionForm',
              'data-sentry-source-file': 'CreateWarehouseCollection.tsx',
            }),
          });
        };
      var _ = n(89296),
        V = n(3977),
        A = n(74304),
        Z = n(52983);
      async function z(e) {
        let { projectRef: t, collectionToken: n } = e,
          { data: s, error: r } = await (0, h.IV)(
            '/platform/projects/{ref}/analytics/warehouse/collections/{token}',
            { params: { path: { ref: t, token: n } } }
          );
        return (r && (0, h.S3)(r), s);
      }
      let R = function () {
        let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          s = (0, m.NL)();
        return (0, x.D)((e) => z(e), {
          async onSuccess(t, n, r) {
            let { projectRef: a } = n;
            (await s.invalidateQueries(p.d.warehouseCollections(a)),
              await (null == e ? void 0 : e(t, n, r)));
          },
          async onError(e, n, s) {
            void 0 === t
              ? u.Am.error('Failed to delete collection: '.concat(e.message))
              : t(e, n, s);
          },
          ...n,
        });
      };
      async function q(e, t) {
        let { projectRef: n, collectionToken: s } = e,
          { data: r, error: a } = await (0, h.r$)(
            '/platform/projects/{ref}/analytics/warehouse/collections/{token}',
            { params: { path: { ref: n, token: s } }, body: t }
          );
        return (a && (0, h.S3)(a), r);
      }
      let D = function () {
        let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          s = (0, m.NL)();
        return (0, x.D)(
          (e) =>
            q(
              { projectRef: e.projectRef, collectionToken: e.collectionToken },
              { name: e.name, retention_days: e.retention_days }
            ),
          {
            async onSuccess(t, n, r) {
              let { projectRef: a } = n;
              (await s.invalidateQueries(p.d.warehouseCollections(a)),
                await (null == e ? void 0 : e(t, n, r)));
            },
            async onError(e, n, s) {
              void 0 === t
                ? u.Am.error('Failed to update collection: '.concat(e.message))
                : t(e, n, s);
            },
            ...n,
          }
        );
      };
      var E = n(40577),
        T = n(14500),
        U = n(32002),
        O = n(21972);
      let P = (e) => {
        let { item: t } = e,
          n = (0, d.useRouter)(),
          { ref: a, collectionToken: o } = (0, c.UO)(),
          i = a || 'default',
          [m, x] = (0, Z.useState)(!1),
          [h, p] = (0, Z.useState)(!1),
          y = (0, l.Xo)(r.KA.ANALYTICS_WRITE, 'logflare'),
          f = D({
            onSuccess: () => {
              (u.Am.success('Collection updated successfully'), x(!1));
            },
          }),
          j = R({
            onSuccess: () => {
              (t.token === o && n.push('/project/'.concat(i, '/logs/explorer')),
                p(!1),
                u.Am.success('Collection deleted successfully'));
            },
          }),
          v = f.isLoading || j.isLoading;
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(O.k, {
              isActive: t.token === o,
              label: t.name,
              icon: (0, s.jsx)(_.Z, {
                size: '14',
                className: 'text-foreground-light',
              }),
              href: '/project/'.concat(i, '/logs/collections/').concat(t.token),
              dropdownItems: (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsxs)(E.u, {
                    children: [
                      (0, s.jsx)(E.aJ, {
                        asChild: !0,
                        children: (0, s.jsxs)(T.Xi, {
                          disabled: !y,
                          onClick: (e) => {
                            (e.preventDefault(), x(!0));
                          },
                          children: [
                            (0, s.jsx)(V.Z, { className: 'mr-2', size: 14 }),
                            (0, s.jsx)('div', {
                              children: 'Update collection',
                            }),
                          ],
                        }),
                      }),
                      !y &&
                        (0, s.jsx)(E._v, {
                          side: 'right',
                          children:
                            'You need additional permissions to update collections',
                        }),
                    ],
                  }),
                  (0, s.jsx)(T.VD, {}),
                  (0, s.jsxs)(E.u, {
                    children: [
                      (0, s.jsx)(E.aJ, {
                        asChild: !0,
                        children: (0, s.jsxs)(T.Xi, {
                          disabled: !y,
                          onClick: (e) => {
                            (e.preventDefault(), p(!0));
                          },
                          children: [
                            (0, s.jsx)(A.Z, { className: 'mr-2', size: 14 }),
                            (0, s.jsx)('div', {
                              children: 'Delete collection',
                            }),
                          ],
                        }),
                      }),
                      !y &&
                        (0, s.jsx)(E._v, {
                          side: 'right',
                          children:
                            'You need additional permissions to delete collections',
                        }),
                    ],
                  }),
                ],
              }),
              'data-sentry-element': 'LogsSidebarItem',
              'data-sentry-source-file': 'WarehouseMenuItem.tsx',
            }),
            (0, s.jsx)(g.Z, {
              size: 'medium',
              visible: m,
              onCancel: () => x(!1),
              hideFooter: !0,
              header: 'Update collection "'.concat(t.name, '"'),
              'data-sentry-element': 'Modal',
              'data-sentry-source-file': 'WarehouseMenuItem.tsx',
              children: (0, s.jsx)(F, {
                onCancelClick: () => x(!1),
                isLoading: v,
                initialValues: {
                  name: t.name,
                  retention_days: t.retention_days,
                },
                onSubmit: (e) => {
                  let { name: n, retention_days: s } = e;
                  f.mutate({
                    projectRef: i,
                    collectionToken: t.token,
                    name: n,
                    retention_days: s,
                  });
                },
                'data-sentry-element': 'CollectionForm',
                'data-sentry-source-file': 'WarehouseMenuItem.tsx',
              }),
            }),
            (0, s.jsx)(U.Z, {
              variant: 'destructive',
              visible: h,
              onCancel: () => p(!1),
              confirmLabel: 'Delete collection',
              title: 'Delete collection "'.concat(t.name, '"'),
              size: 'small',
              onConfirm: () => {
                j.mutate({ projectRef: i, collectionToken: t.token });
              },
              'data-sentry-element': 'ConfirmationModal',
              'data-sentry-source-file': 'WarehouseMenuItem.tsx',
              children: (0, s.jsxs)('p', {
                className: 'text-sm text-foreground-light',
                children: [
                  'All data in this collection will be deleted.',
                  (0, s.jsx)('br', {}),
                  (0, s.jsx)('div', {
                    className: 'mt-2',
                    children: 'This action cannot be undone.',
                  }),
                ],
              }),
            }),
          ],
        });
      };
      var Q = n(9743),
        W = n(72725),
        B = n(28894);
      async function Y(e, t) {
        let { projectRef: n } = e;
        if (!n) throw Error('projectRef is required');
        let { data: s, error: r } = await (0, h.U2)(
          '/platform/projects/{ref}/analytics/warehouse/tenant',
          { params: { path: { ref: n } }, signal: t }
        );
        return (r && (0, h.S3)(r), s);
      }
      let X = function (e) {
        let { projectRef: t } = e,
          { enabled: n = !0, ...s } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, B.a)(
          p.d.warehouseTenant(t),
          (e) => {
            let { signal: n } = e;
            return Y({ projectRef: t }, n);
          },
          {
            enabled: n && !!t,
            staleTime: 1 / 0,
            cacheTime: 72e5,
            refetchOnMount: !1,
            refetchInterval: !1,
            ...s,
          }
        );
      };
      var H = n(41555),
        $ = n(71147),
        J = n(21786),
        G = n(91587),
        K = n(36950),
        ee = n(22702),
        et = n(83145),
        en = n.n(et),
        es = n(51e3),
        er = n(11221),
        ea = n(52114),
        el = n(89129);
      let eo = (e) => {
        let { className: t } = e;
        return (0, s.jsx)('svg', {
          stroke: 'currentColor',
          fill: 'currentColor',
          strokeWidth: '0',
          viewBox: '0 0 24 24',
          height: '15px',
          width: '15px',
          className: t,
          xmlns: 'http://www.w3.org/2000/svg',
          'data-sentry-element': 'svg',
          'data-sentry-component': 'SupaIcon',
          'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
          children: (0, s.jsx)('path', {
            d: 'M10.9997 2.59833V13.9694H3.90013C3.23055 13.9694 2.83063 13.1846 3.25654 12.6326L10.9997 2.59833ZM12.9997 8.03061V2.33296C12.9997 0.521514 10.7034 -0.291434 9.58194 1.16185L1.67316 11.4108C0.246185 13.26 1.54768 15.9694 3.90013 15.9694H10.9997V21.6671C10.9997 23.4785 13.296 24.2915 14.4175 22.8382L22.3262 12.5892C23.7532 10.74 22.4517 8.03061 20.0993 8.03061H12.9997ZM12.9997 10.0306H20.0993C20.7688 10.0306 21.1688 10.8155 20.7429 11.3674L12.9997 21.4017V10.0306Z',
            'data-sentry-element': 'path',
            'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
          }),
        });
      };
      function ei(e) {
        let { children: t, title: n, defaultOpen: r } = e;
        return (0, s.jsxs)(es.zF, {
          defaultOpen: r,
          'data-sentry-element': 'Collapsible_Shadcn_',
          'data-sentry-component': 'SidebarCollapsible',
          'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
          children: [
            (0, s.jsxs)(es.wy, {
              className:
                'flex items-center gap-x-2 px-4 [&[data-state=open]>svg]:!rotate-90 pb-2',
              'data-sentry-element': 'CollapsibleTrigger_Shadcn_',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
              children: [
                (0, s.jsx)(G.Z, {
                  size: 16,
                  className:
                    'text-foreground-light transition-transform duration-200',
                  'data-sentry-element': 'ChevronRight',
                  'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                }),
                (0, s.jsx)('span', {
                  className:
                    'text-foreground-light font-mono text-sm uppercase',
                  children: n,
                }),
              ],
            }),
            (0, s.jsx)(es.Fw, {
              'data-sentry-element': 'CollapsibleContent_Shadcn_',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
              children: t,
            }),
          ],
        });
      }
      function ec() {
        var e;
        let [t, n] = (0, Z.useState)(''),
          [a, o] = (0, Z.useState)(!1),
          i = (0, l.Xo)(r.KA.ANALYTICS_WRITE, 'logflare'),
          u = (0, d.useRouter)(),
          { ref: m } = (0, c.UO)(),
          { data: x } = X({ projectRef: m }),
          {
            projectAuthAll: h,
            projectStorageAll: p,
            realtimeAll: y,
          } = (0, $.N)([
            'project_storage:all',
            'project_auth:all',
            'realtime:all',
          ]),
          f = (0, J.P)('warehouse'),
          { data: g, isLoading: j } = (0, W.O)(
            { projectRef: m },
            { enabled: c.Qy && f && !!x }
          ),
          { data: v, isLoading: b } = (0, H.I)({
            projectRef: m,
            type: 'log_sql',
          }),
          C = [
            ...(null !== (e = null == v ? void 0 : v.content) && void 0 !== e
              ? e
              : []),
          ]
            .filter((e) => 'log_sql' === e.type)
            .sort((e, t) => e.name.localeCompare(t.name));
        function S(e) {
          return u.asPath.includes(e);
        }
        let N = [
            {
              name: 'API Gateway',
              key: 'edge-logs',
              url: '/project/'.concat(m, '/logs/edge-logs'),
              items: [],
            },
            {
              name: 'Postgres',
              key: 'postgres-logs',
              url: '/project/'.concat(m, '/logs/postgres-logs'),
              items: [],
            },
            {
              name: 'PostgREST',
              key: 'postgrest-logs',
              url: '/project/'.concat(m, '/logs/postgrest-logs'),
              items: [],
            },
            c.Qy
              ? {
                  name: 'Pooler',
                  key: 'pooler-logs',
                  url: '/project/'.concat(m, '/logs/pooler-logs'),
                  items: [],
                }
              : null,
            ,
            h
              ? {
                  name: 'Auth',
                  key: 'auth-logs',
                  url: '/project/'.concat(m, '/logs/auth-logs'),
                  items: [],
                }
              : null,
            p
              ? {
                  name: 'Storage',
                  key: 'storage-logs',
                  url: '/project/'.concat(m, '/logs/storage-logs'),
                  items: [],
                }
              : null,
            y
              ? {
                  name: 'Realtime',
                  key: 'realtime-logs',
                  url: '/project/'.concat(m, '/logs/realtime-logs'),
                  items: [],
                }
              : null,
            {
              name: 'Edge Functions',
              key: 'edge-functions-logs',
              url: '/project/'.concat(m, '/logs/edge-functions-logs'),
              items: [],
            },
            {
              name: 'Cron',
              key: 'pg_cron',
              url: '/project/'.concat(m, '/logs/pgcron-logs'),
              items: [],
            },
          ].filter((e) =>
            null == e ? void 0 : e.name.toLowerCase().includes(t.toLowerCase())
          ),
          k =
            null == g
              ? void 0
              : g.filter((e) => e.name.toLowerCase().includes(t.toLowerCase()));
        return (0, s.jsxs)('div', {
          className: 'pb-12 relative',
          'data-sentry-component': 'LogsSidebarMenuV2',
          'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
          children: [
            (0, s.jsxs)('div', {
              className:
                'flex gap-2 p-4 items-center sticky top-0 bg-background-200 z-[1]',
              children: [
                (0, s.jsx)(ea.nM, {
                  className: 'w-full p-0 gap-0',
                  'data-sentry-element': 'InnerSideBarFilters',
                  'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                  children: (0, s.jsx)(ea.nn, {
                    name: 'search-collections',
                    placeholder: 'Search collections...',
                    'aria-labelledby': 'Search collections',
                    value: t,
                    onChange: (e) => n(e.target.value),
                    'data-sentry-element': 'InnerSideBarFilterSearchInput',
                    'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                  }),
                }),
                (0, s.jsxs)(T.h_, {
                  'data-sentry-element': 'DropdownMenu',
                  'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                  children: [
                    (0, s.jsx)(T.$F, {
                      asChild: !0,
                      'data-sentry-element': 'DropdownMenuTrigger',
                      'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                      children: (0, s.jsx)(w.z, {
                        type: 'default',
                        icon: (0, s.jsx)(K.Z, { className: 'text-foreground' }),
                        className: 'w-[26px]',
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                      }),
                    }),
                    (0, s.jsxs)(T.AW, {
                      align: 'end',
                      className: 'w-48',
                      'data-sentry-element': 'DropdownMenuContent',
                      'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                      children: [
                        (0, s.jsx)(T.Xi, {
                          className: 'gap-x-2',
                          asChild: !0,
                          'data-sentry-element': 'DropdownMenuItem',
                          'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                          children: (0, s.jsxs)(en(), {
                            href: '/project/'.concat(m, '/logs/explorer'),
                            'data-sentry-element': 'Link',
                            'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                            children: [
                              (0, s.jsx)(ee.Z, {
                                size: 14,
                                'data-sentry-element': 'FilePlus',
                                'data-sentry-source-file':
                                  'LogsSidebarMenuV2.tsx',
                              }),
                              'Create query',
                            ],
                          }),
                        }),
                        f &&
                          (0, s.jsxs)(E.u, {
                            children: [
                              (0, s.jsx)(E.aJ, {
                                asChild: !0,
                                children: (0, s.jsx)(T.Xi, {
                                  className: 'gap-x-2',
                                  asChild: !0,
                                  children: (0, s.jsxs)('button', {
                                    onClick: () => o(!0),
                                    className:
                                      'w-full flex items-center text-xs px-2 py-1',
                                    disabled: !i,
                                    children: [
                                      (0, s.jsx)(K.Z, { size: 14 }),
                                      'Create collection',
                                    ],
                                  }),
                                }),
                              }),
                              !i &&
                                (0, s.jsx)(E._v, {
                                  children:
                                    'You need additional permissions to create a collection',
                                }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)(I, {
                  open: a,
                  onOpenChange: o,
                  'data-sentry-element': 'CreateWarehouseCollectionModal',
                  'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                }),
              ],
            }),
            (0, s.jsx)('div', {
              className: 'px-2',
              children: (0, s.jsx)(ea.DS, {
                title: 'Templates',
                isActive: S('/project/'.concat(m, '/logs/explorer/templates')),
                href: '/project/'.concat(m, '/logs/explorer/templates'),
                'data-sentry-element': 'InnerSideMenuItem',
                'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
                children: 'Templates',
              }),
            }),
            (0, s.jsx)(er.Z, {
              className: 'my-4',
              'data-sentry-element': 'Separator',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
            }),
            (0, s.jsxs)(ei, {
              title: 'Collections',
              defaultOpen: !0,
              'data-sentry-element': 'SidebarCollapsible',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
              children: [
                N.map((e) => {
                  var t, n, r;
                  return (0, s.jsx)(
                    O.k,
                    {
                      isActive: S(
                        null !== (t = null == e ? void 0 : e.url) &&
                          void 0 !== t
                          ? t
                          : ''
                      ),
                      href:
                        null !== (n = null == e ? void 0 : e.url) &&
                        void 0 !== n
                          ? n
                          : '',
                      icon: (0, s.jsx)(eo, {
                        className: 'text-foreground-light',
                      }),
                      label:
                        null !== (r = null == e ? void 0 : e.name) &&
                        void 0 !== r
                          ? r
                          : '',
                    },
                    null == e ? void 0 : e.key
                  );
                }),
                j && f
                  ? (0, s.jsx)('div', {
                      className: 'p-4',
                      children: (0, s.jsx)(el.A, {}),
                    })
                  : (null == k ? void 0 : k.length)
                    ? (0, s.jsx)('div', {
                        children: k.map((e) =>
                          (0, s.jsx)(P, { item: e }, e.token)
                        ),
                      })
                    : null,
              ],
            }),
            (0, s.jsx)(er.Z, {
              className: 'my-4',
              'data-sentry-element': 'Separator',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
            }),
            (0, s.jsxs)(ei, {
              title: 'Queries',
              defaultOpen: !0,
              'data-sentry-element': 'SidebarCollapsible',
              'data-sentry-source-file': 'LogsSidebarMenuV2.tsx',
              children: [
                b &&
                  (0, s.jsx)('div', {
                    className: 'p-4',
                    children: (0, s.jsx)(el.A, {}),
                  }),
                0 === C.length &&
                  (0, s.jsx)(ea.Cf, {
                    className: 'mx-4',
                    title: 'No queries created yet',
                    description:
                      'Create and save your queries to use them in the explorer',
                    actions: (0, s.jsx)(w.z, {
                      asChild: !0,
                      type: 'default',
                      children: (0, s.jsx)(en(), {
                        href: '/project/'.concat(m, '/logs/explorer'),
                        children: 'Create query',
                      }),
                    }),
                  }),
                C.map((e) => (0, s.jsx)(Q.Z, { item: e }, e.id)),
              ],
            }),
          ],
        });
      }
      var ed = (0, o.Q)((e) => {
        let { title: t, children: n } = e,
          { isLoading: o, can: c } = (0, l.CD)(r.KA.ANALYTICS_READ, 'logflare');
        return o
          ? (0, s.jsx)(i.Z, { isLoading: !0 })
          : o || c
            ? (0, s.jsx)(i.Z, {
                title: t,
                product: 'Logs & Analytics',
                productMenu: (0, s.jsx)(ec, {}),
                'data-sentry-element': 'ProjectLayout',
                'data-sentry-component': 'LogsLayout',
                'data-sentry-source-file': 'LogsLayout.tsx',
                children: n,
              })
            : (0, s.jsx)(i.Z, {
                children: (0, s.jsx)(a.Z, {
                  isFullPage: !0,
                  resourceText: "access your project's logs",
                }),
              });
      });
    },
    61767: function (e, t, n) {
      var s = n(97458),
        r = n(44735);
      t.Z = (e) => {
        let { resourceText: t, isFullPage: n = !1 } = e,
          a = () =>
            (0, s.jsx)('div', {
              className:
                'block w-full rounded border border-opacity-20 py-4 px-6 border-overlay bg-surface-200',
              'data-sentry-component': 'NoPermissionMessage',
              'data-sentry-source-file': 'NoPermission.tsx',
              children: (0, s.jsxs)('div', {
                className: 'flex space-x-3',
                children: [
                  (0, s.jsx)('div', {
                    className: 'mt-1',
                    children: (0, s.jsx)(r.Z, {
                      size: 20,
                      'data-sentry-element': 'AlertCircle',
                      'data-sentry-source-file': 'NoPermission.tsx',
                    }),
                  }),
                  (0, s.jsx)('div', {
                    className: 'flex w-full items-center justify-between',
                    children: (0, s.jsxs)('div', {
                      className: 'space-y-1',
                      children: [
                        (0, s.jsxs)('p', {
                          className: 'text-sm',
                          children: ['You need additional permissions to ', t],
                        }),
                        (0, s.jsx)('div', {
                          children: (0, s.jsx)('p', {
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
        return n
          ? (0, s.jsx)('div', {
              className: 'flex h-full items-center justify-center',
              children: (0, s.jsx)('div', {
                className: 'w-[550px]',
                children: (0, s.jsx)(a, {}),
              }),
            })
          : (0, s.jsx)(a, {});
      };
    },
    19540: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return i;
        },
      });
      var s = n(97458),
        r = n(52983),
        a = n(68985),
        l = n(11499);
      function o(e, t) {
        if (!t.error) return (delete e[t.key], e);
        if (t) return { ...e, [t.key]: t.error };
        throw Error();
      }
      function i(e) {
        let { validate: t, ...n } = e,
          [i, c] = (0, r.useReducer)(o, null),
          d = (0, a.TA)({
            validateOnBlur: !0,
            ...n,
            validationSchema: n.validationSchema,
            initialValues: n.initialValues,
            onSubmit: n.onSubmit,
            validate:
              t ||
              function () {
                return i;
              },
          });
        return (0, s.jsx)('form', {
          id: n.id,
          name: n.name,
          onSubmit: d.handleSubmit,
          className: n.className,
          style: n.style,
          method: 'POST',
          'data-sentry-component': 'Form',
          'data-sentry-source-file': 'Form.tsx',
          children: (0, s.jsx)(l.o, {
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
            children: n.children({
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
  },
]);
