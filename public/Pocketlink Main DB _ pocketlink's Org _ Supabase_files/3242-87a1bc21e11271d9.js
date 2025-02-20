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
      (e._sentryDebugIds[t] = '68c2aa45-dfeb-4bc7-85bc-143a80159567'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-68c2aa45-dfeb-4bc7-85bc-143a80159567'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3242],
  {
    72595: function (e, t, s) {
      s.d(t, {
        Hk: function () {
          return B;
        },
        vI: function () {
          return G;
        },
        Zv: function () {
          return en;
        },
        ds: function () {
          return es;
        },
      });
      var n = s(97458),
        a = s(198),
        l = s(28977),
        r = s.n(l),
        i = s(4839),
        o = s(21821),
        c = s(1707),
        d = s(38232),
        u = s(83145),
        m = s.n(u),
        x = s(32691),
        f = s(52983),
        h = s(34549),
        p = s(12436),
        j = s(359),
        v = s(59461),
        y = s(24083),
        g = s(87696),
        b = s(46993),
        N = s(31485),
        w = s(79600),
        F = s(88020),
        k = s(36457),
        E = s(64618),
        C = s(6464),
        S = s(23240);
      async function D(e) {
        let { projectRef: t, slug: s } = e;
        if (!t) throw Error('projectRef is required');
        let { data: n, error: a } = await (0, C.IV)(
          '/v1/projects/{ref}/functions/{function_slug}',
          { params: { path: { ref: t, function_slug: s } } }
        );
        return (a && (0, C.S3)(a), n);
      }
      let Z = function () {
        let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          n = (0, k.NL)();
        return (0, E.D)((e) => D(e), {
          async onSuccess(t, s, a) {
            let { projectRef: l } = s;
            (await n.invalidateQueries(S.f.list(l), { refetchType: 'all' }),
              await (null == e ? void 0 : e(t, s, a)));
          },
          async onError(e, s, n) {
            void 0 === t
              ? h.Am.error('Failed to delete edge function: '.concat(e.message))
              : t(e, s, n);
          },
          ...s,
        });
      };
      async function A(e) {
        let { projectRef: t, slug: s, payload: n } = e;
        if (!t) throw Error('projectRef is required');
        let { data: a, error: l } = await (0, C.r$)(
          '/v1/projects/{ref}/functions/{function_slug}',
          { params: { path: { ref: t, function_slug: s } }, body: n }
        );
        return (l && (0, C.S3)(l), a);
      }
      let _ = function () {
        let {
            onSuccess: e,
            onError: t,
            ...s
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          n = (0, k.NL)();
        return (0, E.D)((e) => A(e), {
          async onSuccess(t, s, a) {
            let { projectRef: l, slug: r } = s;
            (await Promise.all([
              n.invalidateQueries(S.f.detail(l, r)),
              n.invalidateQueries(S.f.list(l)),
            ]),
              await (null == e ? void 0 : e(t, s, a)));
          },
          async onError(e, s, n) {
            void 0 === t
              ? h.Am.error('Failed to update edge function: '.concat(e.message))
              : t(e, s, n);
          },
          ...s,
        });
      };
      var R = s(90817),
        T = s(19540),
        I = s(51571),
        L = s(30739),
        z = s(65092),
        Y = s(90839),
        P = s(10947),
        O = s(7756),
        M = s(42155),
        U = s(40929);
      let V = (e) => {
        let { selectedFunction: t, functionUrl: s, anonKey: a } = e;
        return {
          managementCommands: [
            {
              command: 'supabase functions deploy '.concat(
                null == t ? void 0 : t.slug
              ),
              description:
                'This will overwrite the deployed function with your new function',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' functions deploy',
                    ' ',
                    null == t ? void 0 : t.slug,
                  ],
                }),
              comment: 'Deploy a new version',
            },
            {
              command: 'supabase functions delete '.concat(
                null == t ? void 0 : t.slug
              ),
              description:
                'This will remove the function and all the logs associated with it',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' functions delete',
                    ' ',
                    null == t ? void 0 : t.slug,
                  ],
                }),
              comment: 'Delete the function',
            },
          ],
          secretCommands: [
            {
              command: 'supabase secrets list',
              description: 'This will list all the secrets for your project',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' secrets list',
                  ],
                }),
              comment: 'View all secrets',
            },
            {
              command: 'supabase secrets set NAME1=VALUE1 NAME2=VALUE2',
              description: 'This will set secrets for your project',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' secrets set NAME1=VALUE1 NAME2=VALUE2',
                  ],
                }),
              comment: 'Set secrets for your project',
            },
            {
              command: 'supabase secrets unset NAME1 NAME2 ',
              description: 'This will delete secrets for your project',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' secrets unset NAME1 NAME2',
                  ],
                }),
              comment: 'Unset secrets for your project',
            },
          ],
          invokeCommands: [
            {
              command: "curl -L -X POST '"
                .concat(s, "' -H 'Authorization: Bearer ")
                .concat(
                  null != a ? a : '[YOUR ANON KEY]',
                  '\' --data \'{"name":"Functions"}\''
                ),
              description: 'Invokes the hello function',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'curl',
                    }),
                    " -L -X POST '",
                    s,
                    "'",
                    ' ',
                    (null == t ? void 0 : t.verify_jwt)
                      ? "-H\n            'Authorization: Bearer [YOUR ANON KEY]' "
                      : '',
                    '--data \'{"name":"Functions"}\'',
                  ],
                }),
              comment: 'Invoke your function',
            },
          ],
        };
      };
      var B = () => {
          var e, t, s, l, u, k;
          let E = (0, x.useRouter)(),
            { ref: C, functionSlug: S } = (0, p.UO)(),
            [D, A] = (0, f.useState)(!1),
            [B, W] = (0, f.useState)(!1),
            { data: H } = (0, N.zR)({ projectRef: C }),
            { data: K } = (0, w.z)({ projectRef: C }),
            { data: X } = (0, F.J)({ projectRef: C, slug: S }),
            { mutate: q, isLoading: J } = _(),
            { mutate: G, isLoading: Q } = Z({
              onSuccess: () => {
                (h.Am.success(
                  'Successfully deleted "'.concat(
                    null == X ? void 0 : X.name,
                    '"'
                  )
                ),
                  E.push('/project/'.concat(C, '/functions')));
              },
            }),
            $ = 'edge-function-update-form',
            ee = (0, R.Xo)(a.KA.FUNCTIONS_WRITE, '*'),
            { anonKey: et } = (0, N.Pb)(H),
            es =
              null !== (l = null == et ? void 0 : et.api_key) && void 0 !== l
                ? l
                : '[YOUR ANON KEY]',
            en =
              null !==
                (u =
                  null == H
                    ? void 0
                    : null === (e = H.app_config) || void 0 === e
                      ? void 0
                      : e.protocol) && void 0 !== u
                ? u
                : 'https',
            ea =
              null !==
                (k =
                  null == H
                    ? void 0
                    : null === (t = H.app_config) || void 0 === t
                      ? void 0
                      : t.endpoint) && void 0 !== k
                ? k
                : '',
            el =
              (null == K
                ? void 0
                : null === (s = K.customDomain) || void 0 === s
                  ? void 0
                  : s.status) === 'active'
                ? 'https://'
                    .concat(K.customDomain.hostname, '/functions/v1/')
                    .concat(null == X ? void 0 : X.slug)
                : ''
                    .concat(en, '://')
                    .concat(ea, '/functions/v1/')
                    .concat(null == X ? void 0 : X.slug),
            {
              managementCommands: er,
              secretCommands: ei,
              invokeCommands: eo,
            } = V({ selectedFunction: X, functionUrl: el, anonKey: es }),
            ec = async (e, t) => {
              let { resetForm: s } = t;
              return C
                ? void 0 === X
                  ? console.error('No edge function selected')
                  : void q(
                      { projectRef: C, slug: X.slug, payload: e },
                      {
                        onSuccess: () => {
                          (s({ values: e, initialValues: e }),
                            h.Am.success('Successfully updated edge function'));
                        },
                      }
                    )
                : console.error('Project ref is required');
            },
            ed = async () =>
              C
                ? void 0 === X
                  ? console.error('No edge function selected')
                  : void G({ projectRef: C, slug: X.slug })
                : console.error('Project ref is required'),
            eu = (0, f.useMemo)(
              () =>
                (null == X ? void 0 : X.import_map) ||
                (null == X ? void 0 : X.import_map_path),
              [X]
            );
          return (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsxs)('div', {
                className: 'space-y-4 pb-16 pt-3',
                children: [
                  (0, n.jsx)(T.Z, {
                    id: $,
                    initialValues: {},
                    onSubmit: ec,
                    'data-sentry-element': 'Form',
                    'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                    children: (e) => {
                      var t, s, a;
                      let {
                          handleReset: l,
                          values: o,
                          initialValues: c,
                          resetForm: d,
                        } = e,
                        u = JSON.stringify(o) !== JSON.stringify(c);
                      return (
                        (0, f.useEffect)(() => {
                          if (void 0 !== X) {
                            let e = {
                              name: null == X ? void 0 : X.name,
                              verify_jwt: null == X ? void 0 : X.verify_jwt,
                            };
                            d({ values: e, initialValues: e });
                          }
                        }, [X]),
                        (0, n.jsx)(n.Fragment, {
                          children: (0, n.jsxs)(g.by, {
                            disabled: !ee,
                            footer: (0, n.jsx)('div', {
                              className: 'flex py-4 px-8',
                              children: (0, n.jsx)(v.i, {
                                form: $,
                                isSubmitting: J,
                                hasChanges: u,
                                handleReset: l,
                                helper: ee
                                  ? void 0
                                  : 'You need additional permissions to update this function',
                              }),
                            }),
                            children: [
                              (0, n.jsx)(b.hj, {
                                header: (0, n.jsx)(b.S0, {
                                  children: 'Function Details',
                                }),
                                children: (0, n.jsxs)(b.B4, {
                                  loading: void 0 === X,
                                  children: [
                                    (0, n.jsx)(I.Z, {
                                      id: 'name',
                                      name: 'name',
                                      label: 'Name',
                                      disabled: !ee,
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      id: 'slug',
                                      name: 'slug',
                                      label: 'Slug',
                                      value: null == X ? void 0 : X.slug,
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      copy: !0,
                                      label: 'Endpoint URL',
                                      value: el,
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      label: 'Region',
                                      value:
                                        'All functions are deployed globally',
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      label: 'Created at',
                                      value: r()(
                                        null !==
                                          (t =
                                            null == X
                                              ? void 0
                                              : X.created_at) && void 0 !== t
                                          ? t
                                          : 0
                                      ).format('dddd, MMMM D, YYYY h:mm A'),
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      label: 'Last updated at',
                                      value: r()(
                                        null !==
                                          (s =
                                            null == X
                                              ? void 0
                                              : X.updated_at) && void 0 !== s
                                          ? s
                                          : 0
                                      ).format('dddd, MMMM D, YYYY h:mm A'),
                                    }),
                                    (0, n.jsx)(I.Z, {
                                      disabled: !0,
                                      label: 'Deployments',
                                      value:
                                        null !==
                                          (a =
                                            null == X ? void 0 : X.version) &&
                                        void 0 !== a
                                          ? a
                                          : 0,
                                    }),
                                  ],
                                }),
                              }),
                              (0, n.jsx)(b.hj, {
                                header: (0, n.jsx)(b.S0, {
                                  children: 'Function Configuration',
                                }),
                                children: (0, n.jsxs)(b.B4, {
                                  loading: void 0 === X,
                                  children: [
                                    (0, n.jsx)(L.Z, {
                                      id: 'verify_jwt',
                                      name: 'verify_jwt',
                                      disabled: !ee,
                                      label: 'Enforce JWT Verification',
                                      descriptionText:
                                        'Require a valid JWT in the authorization header when invoking the function',
                                    }),
                                    (0, n.jsxs)('div', {
                                      className:
                                        'space-y-1 border rounded border-default bg-surface-200 px-4 py-4',
                                      children: [
                                        (0, n.jsx)('div', {
                                          className:
                                            'flex items-center space-x-2',
                                          children: (0, n.jsxs)('p', {
                                            className: 'text-sm',
                                            children: [
                                              'Import maps are',
                                              ' ',
                                              (0, n.jsx)('span', {
                                                className: (0, z.cn)(
                                                  eu
                                                    ? 'text-brand'
                                                    : 'text-amber-900'
                                                ),
                                                children: eu
                                                  ? 'used'
                                                  : 'not used',
                                              }),
                                              ' ',
                                              'for this function',
                                            ],
                                          }),
                                        }),
                                        (0, n.jsx)('p', {
                                          className:
                                            'text-sm text-foreground-light',
                                          children:
                                            'Import maps allow the use of bare specifiers in functions instead of explicit import URLs',
                                        }),
                                        (0, n.jsx)('div', {
                                          className: '!mt-4',
                                          children: (0, n.jsx)(Y.z, {
                                            asChild: !0,
                                            type: 'default',
                                            icon: (0, n.jsx)(i.Z, {
                                              strokeWidth: 1.5,
                                            }),
                                            children: (0, n.jsx)(m(), {
                                              href: 'https://supabase.com/docs/guides/functions/dependencies',
                                              target: '_blank',
                                              rel: 'noreferrer',
                                              children:
                                                'More about import maps',
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
                        })
                      );
                    },
                  }),
                  (0, n.jsxs)('div', {
                    className:
                      'space-y-6 rounded border bg-surface-100 px-6 py-4 drop- transition-all overflow-hidden',
                    style: { maxHeight: B ? 800 : 66 },
                    children: [
                      (0, n.jsxs)('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          (0, n.jsxs)('div', {
                            className: 'flex items-center space-x-3',
                            children: [
                              (0, n.jsx)('div', {
                                className:
                                  'flex h-8 w-8 items-center justify-center rounded border bg-foreground p-2 text-background',
                                children: (0, n.jsx)(o.Z, {
                                  size: 18,
                                  strokeWidth: 2,
                                  'data-sentry-element': 'Terminal',
                                  'data-sentry-source-file':
                                    'EdgeFunctionDetails.tsx',
                                }),
                              }),
                              (0, n.jsx)('h4', {
                                children: 'Command line access',
                              }),
                            ],
                          }),
                          (0, n.jsx)('div', {
                            className: 'cursor-pointer',
                            onClick: () => W(!B),
                            children: B
                              ? (0, n.jsx)(c.Z, { size: 14, strokeWidth: 1.5 })
                              : (0, n.jsx)(d.Z, { size: 14, strokeWidth: 1.5 }),
                          }),
                        ],
                      }),
                      (0, n.jsx)('h5', {
                        className: 'text-base',
                        children: 'Deployment management',
                      }),
                      (0, n.jsx)(U.Z, {
                        commands: er,
                        'data-sentry-element': 'CommandRender',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                      }),
                      (0, n.jsx)('h5', {
                        className: 'text-base',
                        children: 'Invoke ',
                      }),
                      (0, n.jsx)(U.Z, {
                        commands: eo,
                        'data-sentry-element': 'CommandRender',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                      }),
                      (0, n.jsx)('h5', {
                        className: 'text-base',
                        children: 'Secrets management',
                      }),
                      (0, n.jsx)(U.Z, {
                        commands: ei,
                        'data-sentry-element': 'CommandRender',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                      }),
                    ],
                  }),
                  (0, n.jsxs)('div', {
                    className: '!mt-8',
                    children: [
                      (0, n.jsx)(y.p, {
                        title: 'Delete Edge Function',
                        description: '',
                        'data-sentry-element': 'FormHeader',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                      }),
                      (0, n.jsxs)(P.bZ, {
                        variant: 'destructive',
                        'data-sentry-element': 'Alert_Shadcn_',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                        children: [
                          (0, n.jsx)(O.ku, {
                            'data-sentry-element': 'CriticalIcon',
                            'data-sentry-source-file':
                              'EdgeFunctionDetails.tsx',
                          }),
                          (0, n.jsx)(P.Cd, {
                            'data-sentry-element': 'AlertTitle_Shadcn_',
                            'data-sentry-source-file':
                              'EdgeFunctionDetails.tsx',
                            children:
                              'Once your function is deleted, it can no longer be restored',
                          }),
                          (0, n.jsx)(P.X, {
                            'data-sentry-element': 'AlertDescription_Shadcn_',
                            'data-sentry-source-file':
                              'EdgeFunctionDetails.tsx',
                            children:
                              'Make sure you have made a backup if you want to restore your edge function',
                          }),
                          (0, n.jsx)(P.X, {
                            className: 'mt-3',
                            'data-sentry-element': 'AlertDescription_Shadcn_',
                            'data-sentry-source-file':
                              'EdgeFunctionDetails.tsx',
                            children: (0, n.jsx)(j.u, {
                              type: 'danger',
                              disabled: !ee,
                              loading: (null == X ? void 0 : X.id) === void 0,
                              onClick: () => A(!0),
                              tooltip: {
                                content: {
                                  side: 'bottom',
                                  text: ee
                                    ? void 0
                                    : 'You need additional permissions to delete edge functions',
                                },
                              },
                              'data-sentry-element': 'ButtonTooltip',
                              'data-sentry-source-file':
                                'EdgeFunctionDetails.tsx',
                              children: 'Delete edge function',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, n.jsx)(M.Z, {
                size: 'small',
                alignFooter: 'right',
                header: (0, n.jsxs)('h3', {
                  children: ['Confirm to delete ', null == X ? void 0 : X.name],
                }),
                visible: D,
                loading: Q,
                onCancel: () => A(!1),
                onConfirm: ed,
                'data-sentry-element': 'Modal',
                'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                children: (0, n.jsx)(M.Z.Content, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                  children: (0, n.jsxs)(P.bZ, {
                    variant: 'warning',
                    'data-sentry-element': 'Alert_Shadcn_',
                    'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                    children: [
                      (0, n.jsx)(O.ku, {
                        'data-sentry-element': 'CriticalIcon',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                      }),
                      (0, n.jsx)(P.Cd, {
                        'data-sentry-element': 'AlertTitle_Shadcn_',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                        children: 'This action cannot be undone',
                      }),
                      (0, n.jsx)(P.X, {
                        'data-sentry-element': 'AlertDescription_Shadcn_',
                        'data-sentry-source-file': 'EdgeFunctionDetails.tsx',
                        children:
                          'Ensure that you have made a backup if you want to restore your edge function',
                      }),
                    ],
                  }),
                }),
              }),
            ],
          });
        },
        W = s(62507),
        H = s(57304),
        K = s(39303),
        X = s(88971),
        q = s(57006),
        J = s(40577),
        G = (e) => {
          var t;
          let { function: s } = e,
            a = (0, x.useRouter)(),
            { ref: l } = (0, K.UO)(),
            { project: i } = (0, X.d2)(),
            [o, c] = (0, f.useState)(!1),
            { data: d } = (0, w.z)({ projectRef: l }),
            u = null == i ? void 0 : i.restUrl,
            m = void 0 !== u ? new URL(u).hostname.split('.').pop() : 'co',
            h = 'https://'
              .concat(l, '.supabase.')
              .concat(m, '/functions/v1/')
              .concat(s.slug),
            p =
              (null == d
                ? void 0
                : null === (t = d.customDomain) || void 0 === t
                  ? void 0
                  : t.status) === 'active'
                ? 'https://'
                    .concat(d.customDomain.hostname, '/functions/v1/')
                    .concat(s.slug)
                : h;
          return (0, n.jsxs)(
            q.Z.tr,
            {
              onClick: () => {
                a.push('/project/'.concat(l, '/functions/').concat(s.slug));
              },
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'EdgeFunctionsListItem',
              'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
              children: [
                (0, n.jsx)(q.Z.td, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                  children: (0, n.jsx)('div', {
                    className: 'flex items-center gap-2',
                    children: (0, n.jsx)('p', {
                      className: 'text-sm text-foreground',
                      children: s.name,
                    }),
                  }),
                }),
                (0, n.jsx)(q.Z.td, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                  children: (0, n.jsxs)('div', {
                    className:
                      'text-xs text-foreground-light flex gap-2 items-center truncate',
                    children: [
                      (0, n.jsx)('p', {
                        className: 'font-mono truncate hidden md:inline',
                        children: p,
                      }),
                      (0, n.jsx)('button', {
                        type: 'button',
                        className:
                          'text-foreground-lighter text-foreground transition',
                        onClick: (e) => {
                          (e.stopPropagation(),
                            c(!0),
                            navigator.clipboard.writeText(p).then(),
                            setTimeout(function () {
                              c(!1);
                            }, 3e3));
                        },
                        children: o
                          ? (0, n.jsx)('div', {
                              className: 'text-brand',
                              children: (0, n.jsx)(W.Z, {
                                size: 14,
                                strokeWidth: 3,
                              }),
                            })
                          : (0, n.jsx)('div', {
                              className: 'relative',
                              children: (0, n.jsx)('div', {
                                className: 'block',
                                children: (0, n.jsx)(H.Z, {
                                  size: 14,
                                  strokeWidth: 1.5,
                                }),
                              }),
                            }),
                      }),
                    ],
                  }),
                }),
                (0, n.jsx)(q.Z.td, {
                  className: 'hidden 2xl:table-cell',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                  children: (0, n.jsx)('p', {
                    className: 'text-foreground-light',
                    children: r()(s.created_at).format('DD MMM, YYYY HH:mm'),
                  }),
                }),
                (0, n.jsx)(q.Z.td, {
                  className: 'lg:table-cell',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                  children: (0, n.jsxs)(J.u, {
                    'data-sentry-element': 'Tooltip',
                    'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                    children: [
                      (0, n.jsx)(J.aJ, {
                        'data-sentry-element': 'TooltipTrigger',
                        'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                        children: (0, n.jsx)('div', {
                          className: 'flex items-center space-x-2',
                          children: (0, n.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children: r()(s.updated_at).fromNow(),
                          }),
                        }),
                      }),
                      (0, n.jsxs)(J._v, {
                        side: 'bottom',
                        'data-sentry-element': 'TooltipContent',
                        'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                        children: [
                          'Last updated on ',
                          r()(s.updated_at).format('DD MMM, YYYY HH:mm'),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, n.jsx)(q.Z.td, {
                  className: 'lg:table-cell',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'EdgeFunctionsListItem.tsx',
                  children: (0, n.jsx)('p', {
                    className: 'text-foreground-light',
                    children: s.version,
                  }),
                }),
              ],
            },
            s.id
          );
        },
        Q = s(67096),
        $ = s(85047),
        ee = s(51e3);
      let et = (0, f.forwardRef)((e, t) => {
        var s, a, l, r, u, m;
        let { closable: h = !1, removeBorder: j = !1, ...v } = e,
          y = (0, x.useRouter)(),
          { ref: g } = (0, p.UO)(),
          [b, F] = (0, f.useState)(!h),
          { data: k } = (0, $.h)(),
          { data: E } = (0, N.zR)({ projectRef: g }),
          { data: C } = (0, w.z)({ projectRef: g }),
          { anonKey: S } = (0, N.Pb)(E),
          D =
            null !== (r = null == S ? void 0 : S.api_key) && void 0 !== r
              ? r
              : '[YOUR ANON KEY]',
          Z =
            null !==
              (u =
                null == E
                  ? void 0
                  : null === (s = E.app_config) || void 0 === s
                    ? void 0
                    : s.protocol) && void 0 !== u
              ? u
              : 'https',
          A =
            null !==
              (m =
                null == E
                  ? void 0
                  : null === (a = E.app_config) || void 0 === a
                    ? void 0
                    : a.endpoint) && void 0 !== m
              ? m
              : '',
          _ =
            (null == C
              ? void 0
              : null === (l = C.customDomain) || void 0 === l
                ? void 0
                : l.status) === 'active'
              ? 'https://'.concat(C.customDomain.hostname, '/functions/v1')
              : ''.concat(Z, '://').concat(A, '/functions/v1'),
          R = 'https://'.concat(A),
          T = R ? new URL(R).hostname.split('.').pop() : 'co',
          I = [
            {
              command: 'supabase functions new hello-world',
              description:
                ' creates a function stub at ./functions/hello-world/index.ts',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' functions new hello-world',
                  ],
                }),
              comment: 'Create a function',
            },
            {
              command:
                'supabase functions deploy hello-world --project-ref '.concat(
                  g
                ),
              description:
                'Deploys function at ./functions/hello-world/index.ts',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'supabase',
                    }),
                    ' functions deploy hello-world --project-ref ',
                    g,
                  ],
                }),
              comment: 'Deploy your function',
            },
            {
              command: "curl -L -X POST 'https://"
                .concat(g, '.supabase.')
                .concat(
                  T,
                  "/functions/v1/hello-world' -H 'Authorization: Bearer "
                )
                .concat(
                  null != D ? D : '[YOUR ANON KEY]',
                  '\' --data \'{"name":"Functions"}\''
                ),
              description: 'Invokes the hello-world function',
              jsx: () =>
                (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)('span', {
                      className: 'text-brand-600',
                      children: 'curl',
                    }),
                    " -L -X POST '",
                    _,
                    "/hello-world' -H 'Authorization: Bearer [YOUR ANON KEY]'",
                    ' ',
                    '--data \'{"name":"Functions"}\'',
                  ],
                }),
              comment: 'Invoke your function',
            },
          ];
        return (0, n.jsxs)(ee.zF, {
          ref: t,
          open: b,
          className: 'w-full',
          onOpenChange: () => F(!b),
          ...v,
          children: [
            (0, n.jsxs)(ee.wy, {
              className: 'flex w-full justify-between',
              disabled: !h,
              children: [
                (0, n.jsxs)('div', {
                  className: 'flex items-center gap-x-3',
                  children: [
                    (0, n.jsx)('div', {
                      className:
                        'flex items-center justify-center w-8 h-8 p-2 border rounded bg-alternative',
                      children: (0, n.jsx)(o.Z, { strokeWidth: 2 }),
                    }),
                    (0, n.jsx)('h4', {
                      children: 'Create your first Edge Function via the CLI',
                    }),
                  ],
                }),
                h &&
                  (0, n.jsx)('div', {
                    className: 'cursor-pointer',
                    onClick: () => F(!b),
                    children: b
                      ? (0, n.jsx)(c.Z, { size: 16, strokeWidth: 1.5 })
                      : (0, n.jsx)(d.Z, { size: 16, strokeWidth: 1.5 }),
                  }),
              ],
            }),
            (0, n.jsxs)(ee.Fw, {
              className:
                'w-full transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
              children: [
                (0, n.jsx)(U.Z, { commands: I, className: 'my-4' }),
                k && 0 === k.length
                  ? (0, n.jsxs)('div', {
                      className: 'px-8 py-4 space-y-3 border-t',
                      children: [
                        (0, n.jsxs)('div', {
                          children: [
                            (0, n.jsx)('p', {
                              className: 'text-sm text-foreground',
                              children:
                                'You may need to create an access token',
                            }),
                            (0, n.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'You can create a secure access token in your account section',
                            }),
                          ],
                        }),
                        (0, n.jsx)(Y.z, {
                          type: 'default',
                          onClick: () => y.push('/account/tokens'),
                          children: 'Access tokens',
                        }),
                      ],
                    })
                  : (0, n.jsxs)('div', {
                      className: 'py-4 space-y-3 border-t',
                      children: [
                        (0, n.jsxs)('div', {
                          children: [
                            (0, n.jsx)('h3', {
                              className: 'text-base text-foreground',
                              children: 'Need help?',
                            }),
                            (0, n.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'Read the documentation, or browse some sample code.',
                            }),
                          ],
                        }),
                        (0, n.jsxs)('div', {
                          className: 'flex gap-2',
                          children: [
                            (0, n.jsx)(Q.G, {
                              href: 'https://supabase.com/docs/guides/functions',
                            }),
                            (0, n.jsx)(Y.z, {
                              asChild: !0,
                              type: 'default',
                              icon: (0, n.jsx)(i.Z, {}),
                              children: (0, n.jsx)('a', {
                                target: '_blank',
                                rel: 'noreferrer',
                                href: 'https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions',
                                children: 'Examples',
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        });
      });
      et.displayName = 'TerminalInstructions';
      var es = et,
        en = () =>
          (0, n.jsx)(n.Fragment, {
            children: (0, n.jsxs)('div', {
              className: 'flex flex-col gap-8 w-full',
              children: [
                (0, n.jsxs)('div', {
                  className: 'flex flex-col gap-4',
                  children: [
                    (0, n.jsx)('p', {
                      className: 'max-w-lg text-base text-foreground',
                      children:
                        'Scalable functions to run your code with no server management.',
                    }),
                    (0, n.jsx)('p', {
                      className: 'max-w-lg text-sm text-foreground-light',
                      children:
                        'Edge Functions are server-side Typescript functions, distributed globally at the edge - close to your users. They can be used for listening to webhooks or integrating your Supabase project with third-parties.',
                    }),
                    (0, n.jsxs)('div', {
                      className: 'flex gap-x-2',
                      children: [
                        (0, n.jsx)(Q.G, {
                          href: 'https://supabase.com/docs/guides/functions',
                          'data-sentry-element': 'DocsButton',
                          'data-sentry-source-file': 'FunctionsEmptyState.tsx',
                        }),
                        (0, n.jsx)(Y.z, {
                          asChild: !0,
                          type: 'default',
                          icon: (0, n.jsx)(i.Z, {}),
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'FunctionsEmptyState.tsx',
                          children: (0, n.jsx)('a', {
                            target: '_blank',
                            rel: 'noreferrer',
                            href: 'https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions',
                            children: 'Examples',
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, n.jsx)('div', {
                  className:
                    'col-span-8 bg-surface-100 px-5 py-4 border rounded-md',
                  children: (0, n.jsx)(es, {
                    'data-sentry-element': 'TerminalInstructions',
                    'data-sentry-source-file': 'FunctionsEmptyState.tsx',
                  }),
                }),
              ],
            }),
          });
    },
    85047: function (e, t, s) {
      s.d(t, {
        h: function () {
          return i;
        },
      });
      var n = s(28894),
        a = s(6464),
        l = s(50737);
      async function r(e) {
        let { data: t, error: s } = await (0, a.U2)(
          '/platform/profile/access-tokens',
          { signal: e }
        );
        return (s && (0, a.S3)(s), t);
      }
      let i = function () {
        let { enabled: e = !0, ...t } =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return (0, n.a)(
          l.C.list(),
          (e) => {
            let { signal: t } = e;
            return r(t);
          },
          t
        );
      };
    },
    50737: function (e, t, s) {
      s.d(t, {
        C: function () {
          return n;
        },
      });
      let n = { list: () => ['access-tokens'] };
    },
    40929: function (e, t, s) {
      var n = s(97458),
        a = s(62507),
        l = s(57304),
        r = s(52983),
        i = s(65092);
      let o = (0, r.forwardRef)((e, t) => {
        let { commands: s, className: a } = e;
        return (0, n.jsx)('div', {
          ref: t,
          className: (0, i.cn)('space-y-4', a),
          children: s.map((e, t) =>
            (0, n.jsx)(c, { item: e }, 'command-'.concat(t))
          ),
        });
      });
      ((o.displayName = 'CommandRender'), (t.Z = o));
      let c = (e) => {
        let { item: t } = e,
          [s, i] = (0, r.useState)(!1);
        return (0, n.jsxs)('div', {
          className: 'space-y-1',
          'data-sentry-component': 'Command',
          'data-sentry-source-file': 'CommandRender.tsx',
          children: [
            (0, n.jsx)('span', {
              className: 'font-mono text-sm text-foreground-lighter',
              children: '> '.concat(t.comment),
            }),
            (0, n.jsx)('div', {
              className: 'flex items-center gap-2',
              children: (0, n.jsxs)('div', {
                className: 'flex gap-2 font-mono text-sm  text-foreground',
                children: [
                  (0, n.jsx)('span', {
                    className: 'text-foreground-lighter',
                    children: '$',
                  }),
                  (0, n.jsxs)('span', {
                    children: [
                      (0, n.jsxs)('span', {
                        children: [t.jsx ? t.jsx() : null, ' '],
                      }),
                      (0, n.jsx)('button', {
                        type: 'button',
                        className: 'text-foreground-lighter text-foreground',
                        onClick: () => {
                          var e;
                          ((e = t.command),
                            i(!0),
                            navigator.clipboard.writeText(e).then(),
                            setTimeout(function () {
                              i(!1);
                            }, 3e3));
                        },
                        children: s
                          ? (0, n.jsx)(a.Z, {
                              size: 14,
                              strokeWidth: 3,
                              className: 'text-brand',
                            })
                          : (0, n.jsx)(l.Z, { size: 14 }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      };
    },
    6834: function (e, t, s) {
      s.d(t, {
        Z: function () {
          return k;
        },
      });
      var n = s(97458),
        a = s(198),
        l = s(83145),
        r = s.n(l),
        i = s(52983),
        o = s(12436),
        c = s(99163),
        d = s(26233),
        u = s(67096),
        m = s(61767),
        x = s(88020),
        f = s(7429),
        h = s(90817),
        p = s(58326),
        j = s(10839),
        v = s(32691),
        y = s(34549),
        g = s(65092),
        b = s(90839),
        N = s(95526),
        w = (e) => {
          let { item: t } = e,
            s = (0, v.useRouter)(),
            a = s.pathname.split('/')[5],
            { ref: l } = s.query;
          return (0, n.jsxs)(N.Z, {
            defaultActiveId: '1',
            type: 'underlined',
            size: 'medium',
            baseClassNames: '!space-y-0',
            activeId: a || 'overview',
            onChange: (e) => {
              (null == t ? void 0 : t.slug) &&
                s.push(
                  '/project/'
                    .concat(l, '/functions/')
                    .concat(t.slug, '/')
                    .concat('overview' === e ? '' : e)
                );
            },
            'data-sentry-element': 'Tabs',
            'data-sentry-component': 'FunctionsNav',
            'data-sentry-source-file': 'FunctionsNav.tsx',
            children: [
              (0, n.jsx)(N.Z.Panel, {
                id: 'overview',
                label: 'Overview',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'FunctionsNav.tsx',
              }),
              (0, n.jsx)(N.Z.Panel, {
                id: 'invocations',
                label: 'Invocations',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'FunctionsNav.tsx',
              }),
              (0, n.jsx)(N.Z.Panel, {
                id: 'logs',
                label: 'Logs',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'FunctionsNav.tsx',
              }),
              (0, n.jsx)(N.Z.Panel, {
                id: 'details',
                label: 'Details',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'FunctionsNav.tsx',
              }),
            ],
          });
        },
        F = s(60245),
        k = (0, p.Q)((e) => {
          let { title: t, children: s } = e,
            l = (0, v.useRouter)(),
            { functionSlug: p, ref: N } = (0, o.UO)(),
            k = (0, c.cg)(),
            { data: E, isLoading: C } = (0, f.I)({ projectRef: N }),
            {
              data: S,
              error: D,
              isError: Z,
            } = (0, x.J)({ projectRef: N, slug: p }),
            A = (0, h.Xo)(a.KA.FUNCTIONS_READ, '*'),
            _ = (null == S ? void 0 : S.name) || '',
            R = (null != E ? E : []).length > 0;
          return ((0, i.useEffect)(() => {
            let e = !1;
            return (
              p &&
                Z &&
                404 === D.code &&
                !e &&
                ((0, y.Am)('Edge function cannot be found in your project'),
                l.push('/project/'.concat(N, '/functions'))),
              () => {
                e = !0;
              }
            );
          }, [Z]),
          A)
            ? (0, n.jsx)(F.Z, {
                isLoading: C,
                title: t || 'Edge Functions',
                product: 'Edge Functions',
                'data-sentry-element': 'ProjectLayout',
                'data-sentry-component': 'FunctionsLayout',
                'data-sentry-source-file': 'FunctionsLayout.tsx',
                children: R
                  ? (0, n.jsxs)('div', {
                      className: 'flex h-full flex-grow flex-col py-6',
                      children: [
                        (0, n.jsxs)('div', {
                          className: (0, g.cn)(
                            'mx-auto flex w-full flex-col transition-all',
                            '1xl:px-28 gap-4 px-5 lg:px-16 xl:px-24 2xl:px-32'
                          ),
                          children: [
                            (0, n.jsx)('div', {
                              className:
                                'item-center flex flex-col justify-between gap-y-4 xl:flex-row',
                              children: (0, n.jsxs)('div', {
                                className: 'flex items-center gap-3 w-full',
                                children: [
                                  (0, n.jsx)('div', {
                                    className: (0, g.cn)(
                                      'h-6 w-6 rounded border border-brand-600 bg-brand-300',
                                      'flex items-center justify-center text-brand'
                                    ),
                                    children: (0, n.jsx)(j.Z, {
                                      size: 14,
                                      strokeWidth: 3,
                                    }),
                                  }),
                                  (0, n.jsxs)('div', {
                                    className:
                                      'flex items-center justify-between w-full',
                                    children: [
                                      (0, n.jsxs)('div', {
                                        className:
                                          'flex items-center space-x-4',
                                        children: [
                                          (0, n.jsx)(r(), {
                                            href: '/project/'.concat(
                                              N,
                                              '/functions'
                                            ),
                                            children: (0, n.jsx)('h1', {
                                              className:
                                                'cursor-pointer text-2xl text-foreground transition-colors text-foreground-light',
                                              children: 'Edge Functions',
                                            }),
                                          }),
                                          _ &&
                                            (0, n.jsxs)('div', {
                                              className:
                                                'flex items-center space-x-4',
                                              children: [
                                                (0, n.jsx)('span', {
                                                  className:
                                                    'text-foreground-light',
                                                  children: (0, n.jsx)('svg', {
                                                    viewBox: '0 0 24 24',
                                                    width: '24',
                                                    height: '24',
                                                    stroke: 'currentColor',
                                                    strokeWidth: '1',
                                                    strokeLinecap: 'round',
                                                    strokeLinejoin: 'round',
                                                    fill: 'none',
                                                    shapeRendering:
                                                      'geometricPrecision',
                                                    children: (0, n.jsx)(
                                                      'path',
                                                      {
                                                        d: 'M16 3.549L7.12 20.600',
                                                      }
                                                    ),
                                                  }),
                                                }),
                                                (0, n.jsx)('h1', {
                                                  className:
                                                    'text-2xl text-foreground',
                                                  children: _,
                                                }),
                                              ],
                                            }),
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        className:
                                          'flex items-center space-x-2',
                                        children: [
                                          (0, n.jsx)(b.z, {
                                            asChild: !0,
                                            type: 'default',
                                            children: (0, n.jsx)(r(), {
                                              href: '/project/'.concat(
                                                N,
                                                '/settings/functions'
                                              ),
                                              children: 'Manage secrets',
                                            }),
                                          }),
                                          k &&
                                            (0, n.jsx)(d.Z, {
                                              section:
                                                void 0 !== p
                                                  ? ['edge-functions', p]
                                                  : ['edge-functions'],
                                            }),
                                          (0, n.jsx)(u.G, {
                                            href: 'https://supabase.com/docs/guides/functions',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            void 0 !== p && (0, n.jsx)(w, { item: S }),
                          ],
                        }),
                        (0, n.jsx)('div', {
                          className:
                            'mx-auto flex h-full w-full flex-grow flex-col transition-all 1xl:px-28 gap-4 px-5 lg:px-16 xl:px-24 2xl:px-32',
                          children: s,
                        }),
                      ],
                    })
                  : (0, n.jsx)(n.Fragment, {
                      children: (0, n.jsxs)('div', {
                        className:
                          'mx-auto max-w-full md:max-w-5xl py-12 md:py-20 px-4 md:px-5',
                        children: [
                          (0, n.jsx)('div', {
                            className:
                              'item-center flex flex-col justify-between gap-y-4 xl:flex-row',
                            children: (0, n.jsx)('div', {
                              className: 'flex items-center gap-3',
                              children: (0, n.jsx)('div', {
                                className: 'flex items-center space-x-4',
                                children: (0, n.jsx)('h1', {
                                  className: 'text-2xl text-foreground',
                                  children: 'Edge Functions',
                                }),
                              }),
                            }),
                          }),
                          s,
                        ],
                      }),
                    }),
              })
            : (0, n.jsx)(F.Z, {
                title: t || 'Edge Functions',
                product: 'Edge Functions',
                children: (0, n.jsx)(m.Z, {
                  isFullPage: !0,
                  resourceText: "access your project's edge functions",
                }),
              });
        });
    },
    26233: function (e, t, s) {
      var n = s(97458),
        a = s(10839),
        l = s(86186),
        r = s(90839);
      t.Z = (e) => {
        let { section: t } = e,
          s = (0, l.WZ)();
        return (0, n.jsx)(r.z, {
          size: 'tiny',
          type: 'default',
          onClick: () => {
            (t && s.setActiveDocsSection(t), s.setShowProjectApiDocs(!0));
          },
          icon: (0, n.jsx)(a.Z, {
            strokeWidth: 1.5,
            className: 'text-foreground-muted',
          }),
          'data-sentry-element': 'Button',
          'data-sentry-component': 'APIDocsButton',
          'data-sentry-source-file': 'APIDocsButton.tsx',
          children: 'API Docs',
        });
      };
    },
    59461: function (e, t, s) {
      s.d(t, {
        i: function () {
          return l;
        },
      });
      var n = s(97458),
        a = s(90839);
      let l = (e) => {
        let {
            form: t,
            hasChanges: s,
            handleReset: l,
            helper: r,
            disabled: i = !1,
            isSubmitting: o,
            submitText: c = 'Save',
          } = e,
          d = o || i || (!s && void 0 !== s);
        return (0, n.jsxs)('div', {
          className: [
            'flex w-full items-center gap-2',
            r ? 'justify-between' : 'justify-end',
          ].join(' '),
          'data-sentry-component': 'FormActions',
          'data-sentry-source-file': 'FormActions.tsx',
          children: [
            r &&
              (0, n.jsx)('span', {
                className: 'text-sm text-foreground-lighter',
                children: r,
              }),
            (0, n.jsxs)('div', {
              className: 'flex items-center gap-2',
              children: [
                (0, n.jsx)(a.z, {
                  disabled: d,
                  type: 'default',
                  htmlType: 'reset',
                  onClick: () => l(),
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'FormActions.tsx',
                  children: 'Cancel',
                }),
                (0, n.jsx)(a.z, {
                  form: t,
                  type: 'primary',
                  htmlType: 'submit',
                  disabled: d,
                  loading: o,
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'FormActions.tsx',
                  children: c,
                }),
              ],
            }),
          ],
        });
      };
    },
    24083: function (e, t, s) {
      s.d(t, {
        p: function () {
          return r;
        },
      });
      var n = s(97458),
        a = s(65092),
        l = s(67096);
      let r = (e) => {
        let {
          title: t,
          description: s,
          docsUrl: r,
          actions: i,
          className: o,
        } = e;
        return (0, n.jsxs)('div', {
          className: (0, a.cn)(
            'w-full mb-6 flex flex-col sm:flex-row md:items-center justify-between gap-4 '.concat(
              o
            )
          ),
          'data-sentry-component': 'FormHeader',
          'data-sentry-source-file': 'FormHeader.tsx',
          children: [
            (0, n.jsxs)('div', {
              className: 'space-y-1',
              children: [
                (0, n.jsx)('h3', {
                  className: 'text-foreground text-xl prose',
                  children: t,
                }),
                s &&
                  (0, n.jsx)('div', {
                    className: 'prose text-sm max-w-full',
                    children: s,
                  }),
              ],
            }),
            (0, n.jsxs)('div', {
              className: 'flex flex-col sm:flex-row md:items-center gap-x-2',
              children: [void 0 !== r && (0, n.jsx)(l.G, { href: r }), i],
            }),
          ],
        });
      };
    },
    87696: function (e, t, s) {
      s.d(t, {
        DO: function () {
          return c;
        },
        Tq: function () {
          return i;
        },
        by: function () {
          return r;
        },
        iL: function () {
          return o;
        },
        m9: function () {
          return d;
        },
      });
      var n = s(97458),
        a = s(52983),
        l = s(65092);
      let r = (e) => {
          let { children: t, header: s, footer: a } = e;
          return (0, n.jsxs)(i, {
            'data-sentry-element': 'FormPanelContainer',
            'data-sentry-component': 'FormPanel',
            'data-sentry-source-file': 'FormPanel.tsx',
            children: [
              s && (0, n.jsx)(o, { children: s }),
              (0, n.jsx)(c, {
                className: 'divide-y',
                'data-sentry-element': 'FormPanelContent',
                'data-sentry-source-file': 'FormPanel.tsx',
                children: t,
              }),
              a && (0, n.jsx)(d, { children: a }),
            ],
          });
        },
        i = (0, a.forwardRef)((e, t) => {
          let { children: s, ...a } = e;
          return (0, n.jsx)('div', {
            ref: t,
            ...a,
            className: (0, l.cn)(
              'bg-surface-100 border overflow-hidden rounded-md shadow max-w-full',
              a.className
            ),
            children: s,
          });
        });
      i.displayName = i.displayName;
      let o = (0, a.forwardRef)((e, t) => {
        let { children: s, ...a } = e;
        return (0, n.jsx)('div', {
          ref: t,
          ...a,
          className: (0, l.cn)(
            'border-default border-b px-8 py-4',
            a.className
          ),
          children: s,
        });
      });
      o.displayName = o.displayName;
      let c = (0, a.forwardRef)((e, t) => {
        let { children: s, ...a } = e;
        return (0, n.jsx)('div', {
          ref: t,
          ...a,
          className: (0, l.cn)(
            'divide-border flex flex-col gap-0',
            a.className
          ),
          children: s,
        });
      });
      c.displayName = c.displayName;
      let d = (0, a.forwardRef)((e, t) => {
        let { children: s, ...a } = e;
        return (0, n.jsx)('div', {
          ref: t,
          ...a,
          className: (0, l.cn)('border-t', a.className),
          children: s,
        });
      });
      d.displayName = d.displayName;
    },
    46993: function (e, t, s) {
      s.d(t, {
        B4: function () {
          return o;
        },
        S0: function () {
          return r;
        },
        hj: function () {
          return l;
        },
      });
      var n = s(97458),
        a = s(52983);
      let l = (e) => {
          let { children: t, id: s, header: a, disabled: l, className: r } = e;
          return (0, n.jsxs)('div', {
            id: s,
            className: [
              'grid grid-cols-12 gap-6 px-4 md:px-8 py-4 md:py-8',
              ''.concat(l ? ' opacity-30' : ' opacity-100'),
              ''.concat(r),
            ].join(' '),
            'data-sentry-component': 'FormSection',
            'data-sentry-source-file': 'FormSection.tsx',
            children: [a, t],
          });
        },
        r = (e) => {
          let { children: t, className: s = '', description: a } = e;
          return void 0 !== a
            ? (0, n.jsxs)('div', {
                className:
                  'flex flex-col space-y-2 col-span-12 lg:col-span-5 '.concat(
                    s
                  ),
                children: [
                  (0, n.jsx)('label', {
                    className: 'text-foreground text-sm',
                    children: t,
                  }),
                  a,
                ],
              })
            : (0, n.jsx)('label', {
                className:
                  'text-foreground col-span-12 text-sm lg:col-span-5 '.concat(
                    s
                  ),
                children: t,
              });
        },
        i = () =>
          (0, n.jsxs)('div', {
            className: 'flex w-full flex-col gap-2',
            'data-sentry-component': 'Shimmer',
            'data-sentry-source-file': 'FormSection.tsx',
            children: [
              (0, n.jsx)('div', {
                className: 'shimmering-loader h-2 w-1/3 rounded',
              }),
              (0, n.jsx)('div', {
                className: 'flex flex-col justify-between space-y-2',
                children: (0, n.jsx)('div', {
                  className: 'shimmering-loader h-[34px] w-2/3 rounded',
                }),
              }),
            ],
          }),
        o = (e) => {
          let { children: t, loading: s = !0, fullWidth: l, className: r } = e;
          return (0, n.jsx)('div', {
            className:
              '\n        relative col-span-12 flex flex-col gap-6 lg:col-span-7\n        '
                .concat(l && '!col-span-12', '\n        ')
                .concat(r, '\n      '),
            'data-sentry-component': 'FormSectionContent',
            'data-sentry-source-file': 'FormSection.tsx',
            children: s ? a.Children.map(t, () => (0, n.jsx)(i, {})) : t,
          });
        };
    },
    61767: function (e, t, s) {
      var n = s(97458),
        a = s(44735);
      t.Z = (e) => {
        let { resourceText: t, isFullPage: s = !1 } = e,
          l = () =>
            (0, n.jsx)('div', {
              className:
                'block w-full rounded border border-opacity-20 py-4 px-6 border-overlay bg-surface-200',
              'data-sentry-component': 'NoPermissionMessage',
              'data-sentry-source-file': 'NoPermission.tsx',
              children: (0, n.jsxs)('div', {
                className: 'flex space-x-3',
                children: [
                  (0, n.jsx)('div', {
                    className: 'mt-1',
                    children: (0, n.jsx)(a.Z, {
                      size: 20,
                      'data-sentry-element': 'AlertCircle',
                      'data-sentry-source-file': 'NoPermission.tsx',
                    }),
                  }),
                  (0, n.jsx)('div', {
                    className: 'flex w-full items-center justify-between',
                    children: (0, n.jsxs)('div', {
                      className: 'space-y-1',
                      children: [
                        (0, n.jsxs)('p', {
                          className: 'text-sm',
                          children: ['You need additional permissions to ', t],
                        }),
                        (0, n.jsx)('div', {
                          children: (0, n.jsx)('p', {
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
          ? (0, n.jsx)('div', {
              className: 'flex h-full items-center justify-center',
              children: (0, n.jsx)('div', {
                className: 'w-[550px]',
                children: (0, n.jsx)(l, {}),
              }),
            })
          : (0, n.jsx)(l, {});
      };
    },
    19540: function (e, t, s) {
      s.d(t, {
        Z: function () {
          return o;
        },
      });
      var n = s(97458),
        a = s(52983),
        l = s(68985),
        r = s(11499);
      function i(e, t) {
        if (!t.error) return (delete e[t.key], e);
        if (t) return { ...e, [t.key]: t.error };
        throw Error();
      }
      function o(e) {
        let { validate: t, ...s } = e,
          [o, c] = (0, a.useReducer)(i, null),
          d = (0, l.TA)({
            validateOnBlur: !0,
            ...s,
            validationSchema: s.validationSchema,
            initialValues: s.initialValues,
            onSubmit: s.onSubmit,
            validate:
              t ||
              function () {
                return o;
              },
          });
        return (0, n.jsx)('form', {
          id: s.id,
          name: s.name,
          onSubmit: d.handleSubmit,
          className: s.className,
          style: s.style,
          method: 'POST',
          'data-sentry-component': 'Form',
          'data-sentry-source-file': 'Form.tsx',
          children: (0, n.jsx)(r.o, {
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
            children: s.children({
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
    95526: function (e, t, s) {
      var n = s(97458),
        a = s(77317),
        l = s(52983),
        r = s(25843);
      let i = (e) => {
        var t, s, i;
        let {
            defaultActiveId: o,
            activeId: c,
            type: d = 'pills',
            size: u = 'tiny',
            block: m,
            onChange: x,
            onClick: f,
            scrollable: h,
            wrappable: p,
            addOnBefore: j,
            addOnAfter: v,
            listClassNames: y,
            baseClassNames: g,
            refs: b,
            children: N,
          } = e,
          w = l.Children.toArray(N),
          [F, k] = (0, l.useState)(
            null !== (i = null != c ? c : o) && void 0 !== i
              ? i
              : null == w
                ? void 0
                : null === (s = w[0]) || void 0 === s
                  ? void 0
                  : null === (t = s.props) || void 0 === t
                    ? void 0
                    : t.id
          );
        (0, l.useMemo)(() => {
          c && c !== F && k(c);
        }, [c]);
        let E = (0, r.Z)('tabs');
        function C(e) {
          (null == f || f(e), e !== F && (null == x || x(e), k(e)));
        }
        let S = [E[d].list];
        return (
          h && S.push(E.scrollable),
          p && S.push(E.wrappable),
          y && S.push(y),
          (0, n.jsxs)(a.fC, {
            value: F,
            className: [E.base, g].join(' '),
            ref: null == b ? void 0 : b.base,
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'Tabs',
            'data-sentry-source-file': 'Tabs.tsx',
            children: [
              (0, n.jsxs)(a.aV, {
                className: S.join(' '),
                ref: null == b ? void 0 : b.list,
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Tabs.tsx',
                children: [
                  j,
                  w.map((e) => {
                    let t = F === e.props.id,
                      s = [E[d].base, E.size[u]];
                    return (
                      t ? s.push(E[d].active) : s.push(E[d].inactive),
                      m && s.push(E.block),
                      (0, n.jsxs)(
                        a.xz,
                        {
                          onKeyDown: (t) => {
                            'Enter' === t.key &&
                              (t.preventDefault(), C(e.props.id));
                          },
                          onClick: () => C(e.props.id),
                          value: e.props.id,
                          className: s.join(' '),
                          children: [
                            e.props.icon,
                            (0, n.jsx)('span', { children: e.props.label }),
                            e.props.iconRight,
                          ],
                        },
                        ''.concat(e.props.id, '-tab-button')
                      )
                    );
                  }),
                  v,
                ],
              }),
              w,
            ],
          })
        );
      };
      ((i.Panel = (e) => {
        let { children: t, id: s, className: l } = e,
          i = (0, r.Z)('tabs');
        return (0, n.jsx)(a.VY, {
          value: s,
          className: [i.content, l].join(' '),
          'data-sentry-element': 'unknown',
          'data-sentry-component': 'Panel',
          'data-sentry-source-file': 'Tabs.tsx',
          children: t,
        });
      }),
        (t.Z = i));
    },
  },
]);
