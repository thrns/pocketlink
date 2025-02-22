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
      n = new e.Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = 'bbea5a45-4328-4990-983e-1ae17d531d40'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-bbea5a45-4328-4990-983e-1ae17d531d40'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7027],
  {
    45862: function (e, n, t) {
      t.d(n, {
        l5: function () {
          return eh.Z;
        },
        mM: function () {
          return eC;
        },
      });
      var i = t(97458),
        a = t(198),
        o = t(36457),
        r = t(26969),
        l = t.n(r),
        s = t(86474),
        c = t.n(s),
        d = t(32691),
        u = t(34549),
        m = t(12436),
        f = t(62095),
        h = t(27850),
        p = t(88971),
        x = t(67096),
        g = t(89199),
        v = t(79790),
        y = t(91209),
        b = t(90817),
        j = t(72048),
        w = t(53114),
        S = t(96444),
        N = t(56844),
        D = t(24561),
        C = t(96226),
        A = t(74828),
        R = t(11024),
        E = t(61379),
        _ = t(37722),
        k = t(83145),
        L = t.n(k),
        z = t(52983),
        Z = t(98495),
        T = t(99359),
        I = t(26233),
        F = t(359),
        q = t(92259),
        M = t(52417),
        O = t(1575),
        V = t(44353),
        W = t(41135),
        U = t(71147),
        Q = t(40577),
        G = t(90839),
        P = t(65092),
        K = t(42026),
        J = t(32472),
        H = t(32002),
        X = t(96273),
        Y = t(28894),
        B = t(25878),
        $ = t(7324);
      let ee = (e) => {
        let { id: n } = e;
        if (!n) throw Error('id is required');
        return "\n    with table_info as (\n      select \n        n.nspname::text as schema,\n        c.relname::text as name,\n        to_regclass(concat('\"', n.nspname, '\".\"', c.relname, '\"')) as regclass\n      from pg_class c\n      join pg_namespace n on n.oid = c.relnamespace\n      where c.oid = "
          .concat(
            n,
            '\n    )\n    select pg_get_viewdef(t.regclass, true) as definition\n    from table_info t\n  '
          )
          .trim();
      };
      async function en(e, n) {
        let { projectRef: t, connectionString: i, id: a } = e,
          o = ee({ id: a }),
          { result: r } = await (0, B.R)(
            {
              projectRef: t,
              connectionString: i,
              sql: o,
              queryKey: ['view-definition', a],
            },
            n
          );
        return r[0].definition.trim();
      }
      let et = function (e) {
        let { projectRef: n, connectionString: t, id: i } = e,
          { enabled: a = !0, ...o } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, Y.a)(
          $.A.viewDefinition(n, i),
          (e) => {
            let { signal: a } = e;
            return en({ projectRef: n, connectionString: t, id: i }, a);
          },
          { enabled: a && void 0 !== n && void 0 !== i && !isNaN(i), ...o }
        );
      };
      var ei = t(66802),
        ea = t(64890),
        eo = t(35808),
        er = t(3190);
      function el(e) {
        let {
            table: n,
            isAutofixViewSecurityModalOpen: t,
            setIsAutofixViewSecurityModalOpen: a,
          } = e,
          { project: r } = (0, p.d2)(),
          l = (0, o.NL)(),
          s = et({
            id: null == n ? void 0 : n.id,
            projectRef: null == r ? void 0 : r.ref,
            connectionString: null == r ? void 0 : r.connectionString,
          }),
          { mutate: c } = (0, ei.r)({
            onSuccess: async () => {
              (u.Am.success('View security changed successfully'),
                a(!1),
                await l.invalidateQueries(
                  er.X.lint(null == r ? void 0 : r.ref)
                ));
            },
            onError: (e) => {
              u.Am.error('Failed to autofix view security: '.concat(e.message));
            },
          });
        return (0, i.jsxs)(H.Z, {
          visible: t,
          size: 'xlarge',
          title: 'Confirm autofixing view security',
          confirmLabel: 'Confirm',
          onCancel: () => a(!1),
          onConfirm: () => {
            !(function () {
              let e = '\n	ALTER VIEW "'
                .concat(n.schema, '"."')
                .concat(n.name, '" SET (security_invoker = on);\n	');
              c({
                projectRef: null == r ? void 0 : r.ref,
                connectionString: null == r ? void 0 : r.connectionString,
                sql: e,
              });
            })();
          },
          'data-sentry-element': 'ConfirmationModal',
          'data-sentry-component': 'ViewEntityAutofixSecurityModal',
          'data-sentry-source-file': 'ViewEntityAutofixSecurityModal.tsx',
          children: [
            (0, i.jsxs)('p', {
              className: 'text-sm text-foreground-light',
              children: [
                'Setting ',
                (0, i.jsx)('code', { children: 'security_invoker=on' }),
                ' ensures the View runs with the permissions of the querying user, reducing the risk of unintended data exposure.',
              ],
            }),
            (0, i.jsxs)('div', {
              className: 'flex items-center gap-8 mt-8',
              children: [
                (0, i.jsxs)('div', {
                  className: ' border rounded-md w-1/2',
                  children: [
                    (0, i.jsx)('div', {
                      className: 'p-4 bg-200 font-mono text-sm font-semibold',
                      children: 'Existing query',
                    }),
                    (0, i.jsx)(ea.x, {
                      className: 'h-[225px] px-4 py-2',
                      'data-sentry-element': 'ScrollArea',
                      'data-sentry-source-file':
                        'ViewEntityAutofixSecurityModal.tsx',
                      children:
                        s.data &&
                        (0, i.jsx)(eo.c, {
                          children: 'create view '
                            .concat(n.schema, '.')
                            .concat(n.name, ' as\n ')
                            .concat(s.data),
                        }),
                    }),
                  ],
                }),
                (0, i.jsxs)('div', {
                  className: ' border rounded-md w-1/2',
                  children: [
                    (0, i.jsx)('div', {
                      className: 'p-4 bg-200 font-mono text-sm font-semibold',
                      children: 'Updated query',
                    }),
                    (0, i.jsx)(ea.x, {
                      className: 'h-[225px] px-4 py-2',
                      'data-sentry-element': 'ScrollArea',
                      'data-sentry-source-file':
                        'ViewEntityAutofixSecurityModal.tsx',
                      children:
                        s.data &&
                        (0, i.jsx)(eo.c, {
                          children: 'create view '
                            .concat(n.schema, '.')
                            .concat(
                              n.name,
                              ' with (security_invoker = on) as\n '
                            )
                            .concat(s.data),
                        }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var es = (e) => {
          var n;
          let { table: t } = e,
            { ref: o } = (0, m.UO)(),
            { project: r } = (0, p.d2)(),
            { data: l = [] } = (0, V.U)({
              projectRef: null == r ? void 0 : r.ref,
            }),
            s = (0, g.N3)(t),
            c = (0, g.GV)(t),
            d = (0, g.Du)(t),
            f = (0, g.z_)(t),
            h = (0, U.N)('realtime:all'),
            x = S.s.includes(t.schema),
            { mutate: v } = (0, W.V)({
              onError: (e) => {
                u.Am.error('Failed to toggle RLS: '.concat(e.message));
              },
              onSettled: () => {
                ev();
              },
            }),
            [y, j] = (0, z.useState)(!1),
            [w, N] = (0, z.useState)(!1),
            [D, C] = (0, z.useState)(!1),
            [k, Y] = (0, z.useState)(!1),
            { selectedRows: B } = (0, Z.Qq)(),
            $ = 0 === B.size,
            ee = null == r ? void 0 : r.ref,
            { data: en } = (0, q.r)({
              projectRef: null == r ? void 0 : r.ref,
              connectionString: null == r ? void 0 : r.connectionString,
            }),
            et = (null != en ? en : []).filter(
              (e) => e.schema === t.schema && e.table === t.name
            ),
            { data: ei } = (0, M.z)({
              projectRef: null == r ? void 0 : r.ref,
              connectionString: null == r ? void 0 : r.connectionString,
            }),
            ea = (null != ei ? ei : []).find(
              (e) => 'supabase_realtime' === e.name
            ),
            eo =
              null !== (n = null == ea ? void 0 : ea.tables) && void 0 !== n
                ? n
                : [],
            er = eo.some((e) => e.id === (null == t ? void 0 : t.id)),
            { mutate: es, isLoading: ec } = (0, O.u)({
              onSuccess: () => {
                N(!1);
              },
              onError: (e) => {
                u.Am.error(
                  'Failed to toggle realtime for '
                    .concat(t.name, ': ')
                    .concat(e.message)
                );
              },
            }),
            ed = (0, b.Xo)(a.KA.TENANT_SQL_ADMIN_WRITE, 'tables'),
            eu = (0, b.Xo)(a.KA.TENANT_SQL_ADMIN_WRITE, 'columns'),
            em = 'public' === t.schema,
            { hasLint: ef, matchingLint: eh } = (0, T.R)(
              t.name,
              'security_definer_view',
              ['ERROR', 'WARN'],
              l,
              t.schema
            ),
            { hasLint: ep, matchingLint: ex } = (0, T.R)(
              t.name,
              'materialized_view_in_api',
              ['ERROR', 'WARN'],
              l,
              t.schema
            ),
            eg = async () => {
              if (!r) return console.error('Project is required');
              if (!ea)
                return console.error('Unable to find realtime publication');
              let e = eo.some((e) => e.id == t.id)
                ? eo
                    .filter((e) => e.id != t.id)
                    .map((e) => ''.concat(e.schema, '.').concat(e.name))
                : [''.concat(t.schema, '.').concat(t.name)].concat(
                    eo.map((e) => ''.concat(e.schema, '.').concat(e.name))
                  );
              es({
                projectRef: null == r ? void 0 : r.ref,
                connectionString: null == r ? void 0 : r.connectionString,
                id: ea.id,
                tables: e,
              });
            },
            ev = () => {
              C(!1);
            },
            ey = async () => {
              let e = { id: t.id, rls_enabled: !(s && t.rls_enabled) };
              v({
                projectRef: null == r ? void 0 : r.ref,
                connectionString: null == r ? void 0 : r.connectionString,
                id: e.id,
                schema: t.schema,
                payload: e,
              });
            };
          return (0, i.jsxs)(i.Fragment, {
            children: [
              $ &&
                (0, i.jsxs)('div', {
                  className: 'flex items-center gap-x-2',
                  children: [
                    !ed &&
                      !eu &&
                      (0, i.jsxs)(Q.u, {
                        children: [
                          (0, i.jsx)(Q.aJ, {
                            asChild: !0,
                            children: (0, i.jsx)('div', {
                              className:
                                'border border-strong rounded bg-overlay-hover px-3 py-1 text-xs',
                              children: 'Viewing as read-only',
                            }),
                          }),
                          (0, i.jsx)(Q._v, {
                            side: 'bottom',
                            children:
                              "You need additional permissions to manage your project's data",
                          }),
                        ],
                      }),
                    s && !x
                      ? t.rls_enabled
                        ? (0, i.jsx)(i.Fragment, {
                            children:
                              et.length < 1 && !x
                                ? (0, i.jsx)(F.u, {
                                    asChild: !0,
                                    type: 'default',
                                    className: 'group',
                                    icon: (0, i.jsx)(A.Z, {
                                      strokeWidth: 1.5,
                                      className: 'text-foreground-muted',
                                    }),
                                    tooltip: {
                                      content: {
                                        side: 'bottom',
                                        className: 'w-[280px]',
                                        text: 'RLS is enabled for this table, but no policies are set. Select queries may return 0 results.',
                                      },
                                    },
                                    children: (0, i.jsx)(L(), {
                                      passHref: !0,
                                      href: '/project/'
                                        .concat(ee, '/auth/policies?search=')
                                        .concat(t.id, '&schema=')
                                        .concat(t.schema),
                                      children: 'Add RLS policy',
                                    }),
                                  })
                                : (0, i.jsx)(G.z, {
                                    asChild: !0,
                                    type:
                                      et.length < 1 && !x
                                        ? 'warning'
                                        : 'default',
                                    className: 'group',
                                    icon:
                                      x || et.length > 0
                                        ? (0, i.jsx)('div', {
                                            className: (0, P.cn)(
                                              'flex items-center justify-center rounded-full bg-border-stronger h-[16px]',
                                              et.length > 9
                                                ? ' px-1'
                                                : 'w-[16px]',
                                              ''
                                            ),
                                            children: (0, i.jsx)('span', {
                                              className:
                                                'text-[11px] text-foreground font-mono text-center',
                                              children: et.length,
                                            }),
                                          })
                                        : (0, i.jsx)(A.Z, { strokeWidth: 1.5 }),
                                    children: (0, i.jsxs)(L(), {
                                      passHref: !0,
                                      href: '/project/'
                                        .concat(ee, '/auth/policies?search=')
                                        .concat(t.id, '&schema=')
                                        .concat(t.schema),
                                      children: [
                                        'Auth ',
                                        et.length > 1 ? 'policies' : 'policy',
                                      ],
                                    }),
                                  }),
                          })
                        : (0, i.jsxs)(K.J2, {
                            open: y,
                            onOpenChange: () => j(!y),
                            modal: !1,
                            children: [
                              (0, i.jsx)(K.xo, {
                                asChild: !0,
                                children: (0, i.jsx)(G.z, {
                                  type: 'warning',
                                  icon: (0, i.jsx)(R.Z, { strokeWidth: 1.5 }),
                                  children: 'RLS disabled',
                                }),
                              }),
                              (0, i.jsxs)(K.yk, {
                                className: 'min-w-[395px] text-sm',
                                align: 'end',
                                children: [
                                  (0, i.jsxs)('h3', {
                                    className: 'flex items-center gap-2',
                                    children: [
                                      (0, i.jsx)(R.Z, { size: 16 }),
                                      ' Row Level Security (RLS)',
                                    ],
                                  }),
                                  (0, i.jsxs)('div', {
                                    className:
                                      'grid gap-2 mt-4 text-foreground-light text-sm',
                                    children: [
                                      (0, i.jsx)('p', {
                                        children:
                                          'You can restrict and control who can read, write and update data in this table using Row Level Security.',
                                      }),
                                      (0, i.jsx)('p', {
                                        children:
                                          'With RLS enabled, anonymous users will not be able to read/write data in the table.',
                                      }),
                                      !x &&
                                        (0, i.jsx)('div', {
                                          className: 'mt-2',
                                          children: (0, i.jsx)(G.z, {
                                            type: 'default',
                                            onClick: () => C(!D),
                                            children:
                                              'Enable RLS for this table',
                                          }),
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                      : null,
                    d &&
                      ef &&
                      (0, i.jsxs)(K.J2, {
                        open: y,
                        onOpenChange: () => j(!y),
                        modal: !1,
                        children: [
                          (0, i.jsx)(K.xo, {
                            asChild: !0,
                            children: (0, i.jsx)(G.z, {
                              type: 'warning',
                              icon: (0, i.jsx)(E.Z, { strokeWidth: 1.5 }),
                              children: 'Security Definer view',
                            }),
                          }),
                          (0, i.jsxs)(K.yk, {
                            className: 'min-w-[395px] text-sm',
                            align: 'end',
                            children: [
                              (0, i.jsxs)('h3', {
                                className: 'flex items-center gap-2',
                                children: [
                                  (0, i.jsx)(E.Z, { size: 16 }),
                                  ' Secure your View',
                                ],
                              }),
                              (0, i.jsxs)('div', {
                                className:
                                  'grid gap-2 mt-4 text-foreground-light text-sm',
                                children: [
                                  (0, i.jsx)('p', {
                                    children:
                                      "This view is defined with the Security Definer property, giving it permissions of the view's creator (Postgres), rather than the permissions of the querying user.",
                                  }),
                                  (0, i.jsx)('p', {
                                    children:
                                      "Since this view is in the public schema, it is accessible via your project's APIs.",
                                  }),
                                  (0, i.jsxs)('div', {
                                    className: 'mt-2 flex items-center gap-2',
                                    children: [
                                      (0, i.jsx)(G.z, {
                                        type: 'secondary',
                                        onClick: () => {
                                          Y(!0);
                                        },
                                        children: 'Autofix',
                                      }),
                                      (0, i.jsx)(G.z, {
                                        type: 'default',
                                        asChild: !0,
                                        children: (0, i.jsx)(L(), {
                                          target: '_blank',
                                          href: '/project/'
                                            .concat(
                                              o,
                                              '/advisors/security?preset='
                                            )
                                            .concat(
                                              null == eh ? void 0 : eh.level,
                                              '&id='
                                            )
                                            .concat(
                                              null == eh ? void 0 : eh.cache_key
                                            ),
                                          children: 'Learn more',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    f &&
                      ep &&
                      (0, i.jsxs)(K.J2, {
                        open: y,
                        onOpenChange: () => j(!y),
                        modal: !1,
                        children: [
                          (0, i.jsx)(K.xo, {
                            asChild: !0,
                            children: (0, i.jsx)(G.z, {
                              type: 'warning',
                              icon: (0, i.jsx)(E.Z, { strokeWidth: 1.5 }),
                              children: 'Security Definer view',
                            }),
                          }),
                          (0, i.jsxs)(K.yk, {
                            className: 'min-w-[395px] text-sm',
                            align: 'end',
                            children: [
                              (0, i.jsxs)('h3', {
                                className: 'flex items-center gap-2',
                                children: [
                                  (0, i.jsx)(E.Z, { size: 16 }),
                                  ' Secure your View',
                                ],
                              }),
                              (0, i.jsxs)('div', {
                                className:
                                  'grid gap-2 mt-4 text-foreground-light text-sm',
                                children: [
                                  (0, i.jsx)('p', {
                                    children:
                                      "This view is defined with the Security Definer property, giving it permissions of the view's creator (Postgres), rather than the permissions of the querying user.",
                                  }),
                                  (0, i.jsx)('p', {
                                    children:
                                      "Since this view is in the public schema, it is accessible via your project's APIs.",
                                  }),
                                  (0, i.jsx)('div', {
                                    className: 'mt-2',
                                    children: (0, i.jsx)(G.z, {
                                      type: 'default',
                                      asChild: !0,
                                      children: (0, i.jsx)(L(), {
                                        target: '_blank',
                                        href: '/project/'
                                          .concat(
                                            o,
                                            '/advisors/security?preset='
                                          )
                                          .concat(
                                            null == ex ? void 0 : ex.level,
                                            '&id='
                                          )
                                          .concat(
                                            null == ex ? void 0 : ex.cache_key
                                          ),
                                        children: 'Learn more',
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    c &&
                      'public' === t.schema &&
                      (0, i.jsxs)(K.J2, {
                        open: y,
                        onOpenChange: () => j(!y),
                        modal: !1,
                        children: [
                          (0, i.jsx)(K.xo, {
                            asChild: !0,
                            children: (0, i.jsx)(G.z, {
                              type: 'warning',
                              icon: (0, i.jsx)(E.Z, { strokeWidth: 1.5 }),
                              children:
                                "Foreign table is accessible via your project's APIs",
                            }),
                          }),
                          (0, i.jsxs)(K.yk, {
                            className: 'min-w-[395px] text-sm',
                            align: 'end',
                            children: [
                              (0, i.jsxs)('h3', {
                                className: 'flex items-center gap-2',
                                children: [
                                  (0, i.jsx)(E.Z, { size: 16 }),
                                  ' Secure Foreign table',
                                ],
                              }),
                              (0, i.jsxs)('div', {
                                className:
                                  'grid gap-2 mt-4 text-foreground-light text-sm',
                                children: [
                                  (0, i.jsx)('p', {
                                    children:
                                      'Foreign tables do not enforce RLS. Move them to a private schema not exposed to Postgrest or disable Postgrest.',
                                  }),
                                  (0, i.jsx)('div', {
                                    className: 'mt-2',
                                    children: (0, i.jsx)(G.z, {
                                      type: 'default',
                                      asChild: !0,
                                      children: (0, i.jsx)(L(), {
                                        target: '_blank',
                                        href: 'https://supabase.com/docs/guides/database/extensions/wrappers/overview#security',
                                        children: 'Learn more',
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    (0, i.jsx)(X.Q, { serviceRoleLabel: 'postgres' }),
                    s &&
                      h &&
                      (0, i.jsxs)(G.z, {
                        type: 'default',
                        icon: (0, i.jsx)(_.Z, {
                          strokeWidth: 1.5,
                          className: er
                            ? 'text-brand'
                            : 'text-foreground-muted',
                        }),
                        onClick: () => N(!0),
                        children: ['Realtime ', er ? 'on' : 'off'],
                      }),
                    em && (0, i.jsx)(I.Z, { section: ['entities', t.name] }),
                  ],
                }),
              (0, i.jsx)(H.Z, {
                visible: w,
                loading: ec,
                title: ''
                  .concat(er ? 'Disable' : 'Enable', ' realtime for ')
                  .concat(t.name),
                confirmLabel: ''.concat(er ? 'Disable' : 'Enable', ' realtime'),
                confirmLabelLoading: ''.concat(
                  er ? 'Disabling' : 'Enabling',
                  ' realtime'
                ),
                onCancel: () => N(!1),
                onConfirm: () => eg(),
                'data-sentry-element': 'ConfirmationModal',
                'data-sentry-source-file': 'GridHeaderActions.tsx',
                children: (0, i.jsxs)('div', {
                  className: 'space-y-2',
                  children: [
                    (0, i.jsxs)('p', {
                      className: 'text-sm',
                      children: [
                        'Once realtime has been ',
                        er ? 'disabled' : 'enabled',
                        ', the table will',
                        ' ',
                        er ? 'no longer ' : '',
                        'broadcast any changes to authorized subscribers.',
                      ],
                    }),
                    !er &&
                      (0, i.jsxs)('p', {
                        className: 'text-sm',
                        children: [
                          'You may also select which events to broadcast to subscribers on the',
                          ' ',
                          (0, i.jsx)(L(), {
                            href: '/project/'.concat(
                              o,
                              '/database/publications'
                            ),
                            className: 'text-brand',
                            children: 'database publications',
                          }),
                          ' ',
                          'settings.',
                        ],
                      }),
                  ],
                }),
              }),
              (0, i.jsx)(el, {
                table: t,
                isAutofixViewSecurityModalOpen: k,
                setIsAutofixViewSecurityModalOpen: Y,
                'data-sentry-element': 'ViewEntityAutofixSecurityModal',
                'data-sentry-source-file': 'GridHeaderActions.tsx',
              }),
              s &&
                (0, i.jsx)(J.Z, {
                  danger: t.rls_enabled,
                  visible: D,
                  title: 'Confirm to enable Row Level Security',
                  description:
                    'Are you sure you want to enable Row Level Security for this table?',
                  buttonLabel: 'Enable RLS',
                  buttonLoadingLabel: 'Updating',
                  onSelectCancel: ev,
                  onSelectConfirm: ey,
                }),
            ],
          });
        },
        ec = t(31472),
        ed = t(13064),
        eu = t(44735),
        em = (e) => {
          let { id: n } = e;
          return (0, i.jsx)('div', {
            className: 'flex items-center justify-center h-full',
            'data-sentry-component': 'NotFoundState',
            'data-sentry-source-file': 'NotFoundState.tsx',
            children: (0, i.jsx)('div', {
              className: 'w-[400px]',
              children: (0, i.jsx)(ed.Z, {
                icon: (0, i.jsx)(eu.Z, { strokeWidth: 2 }),
                title: 'Unable to find your table with ID '.concat(n),
                'data-sentry-element': 'InformationBox',
                'data-sentry-source-file': 'NotFoundState.tsx',
              }),
            }),
          });
        },
        ef = t(42533),
        eh = t(67333),
        ep = t(85229),
        ex = t(98809),
        eg = t(99968),
        ev = t(63621),
        ey = t(87882);
      let eb = (e) => {
        let { id: n } = e;
        return '\n    '
          .concat(
            ey.k,
            '\n\n    with table_info as (\n      select \n        n.nspname::text as schema,\n        c.relname::text as name\n      from pg_class c\n      join pg_namespace n on n.oid = c.relnamespace\n      where c.oid = '
          )
          .concat(
            n,
            "\n    )\n    select pg_temp.pg_get_tabledef (\n      t.schema,\n      t.name,\n      false,\n      'FKEYS_INTERNAL',\n      'INCLUDE_TRIGGERS'\n    ) as definition\n    from table_info t;\n  "
          )
          .trim();
      };
      async function ej(e, n) {
        let { projectRef: t, connectionString: i, id: a } = e;
        if (!a) throw Error('id is required');
        let o = eb({ id: a }),
          { result: r } = await (0, B.R)(
            {
              projectRef: t,
              connectionString: i,
              sql: o,
              queryKey: ['table-definition', a],
            },
            n
          );
        return r[0].definition.trim();
      }
      let ew = function (e) {
        let { projectRef: n, connectionString: t, id: i } = e,
          { enabled: a = !0, ...o } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, Y.a)(
          $.A.tableDefinition(n, i),
          (e) => {
            let { signal: a } = e;
            return ej({ projectRef: n, connectionString: t, id: i }, a);
          },
          { enabled: a && void 0 !== n && void 0 !== i && !isNaN(i), ...o }
        );
      };
      var eS = t(37462),
        eN = t(45536),
        eD = (e) => {
          let { entity: n } = e,
            { ref: t } = (0, m.UO)(),
            a = (0, z.useRef)(null),
            o = (0, z.useRef)(null),
            { resolvedTheme: r } = (0, ex.F)(),
            { project: l } = (0, p.d2)(),
            s = et(
              {
                id: null == n ? void 0 : n.id,
                projectRef: null == l ? void 0 : l.ref,
                connectionString: null == l ? void 0 : l.connectionString,
              },
              { enabled: (0, g.D1)(n) }
            ),
            c = ew(
              {
                id: null == n ? void 0 : n.id,
                projectRef: null == l ? void 0 : l.ref,
                connectionString: null == l ? void 0 : l.connectionString,
              },
              { enabled: (0, g.N3)(n) }
            ),
            { data: d, isLoading: u } = (0, g.D1)(n) ? s : c,
            f = (0, g.Du)(n)
              ? 'create view '.concat(n.schema, '.').concat(n.name, ' as\n')
              : (0, g.z_)(n)
                ? 'create materialized view '
                    .concat(n.schema, '.')
                    .concat(n.name, ' as\n')
                : '',
            h = (0, z.useMemo)(() => (d ? (0, eS._)(f + d) : void 0), [d]),
            x = async (e, n) => {
              ((a.current = e),
                (o.current = n),
                e.changeViewZones((e) => {
                  e.addZone({
                    afterLineNumber: 0,
                    heightInPx: 4,
                    domNode: document.createElement('div'),
                  });
                }),
                await (0, eN.Vs)(500),
                null == e || e.focus());
            };
          return u
            ? (0, i.jsxs)('div', {
                className: 'h-full grid',
                children: [
                  (0, i.jsx)('div', {
                    className: 'p-4',
                    children: (0, i.jsx)(ev.A, {}),
                  }),
                  (0, i.jsx)('div', {
                    className: 'mt-auto',
                    children: (0, i.jsx)(eg.Z, {}),
                  }),
                ],
              })
            : (0, i.jsxs)(i.Fragment, {
                children: [
                  (0, i.jsxs)('div', {
                    className:
                      'flex-grow overflow-y-auto border-t border-muted relative',
                    children: [
                      (0, i.jsx)(G.z, {
                        asChild: !0,
                        type: 'default',
                        className: 'absolute top-2 right-5 z-10',
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'TableDefinition.tsx',
                        children: (0, i.jsx)(L(), {
                          href: '/project/'
                            .concat(t, '/sql/new?content=')
                            .concat(encodeURIComponent(null != h ? h : '')),
                          'data-sentry-element': 'Link',
                          'data-sentry-source-file': 'TableDefinition.tsx',
                          children: 'Open in SQL Editor',
                        }),
                      }),
                      (0, i.jsx)(ep.default, {
                        className: 'monaco-editor',
                        theme: (null == r ? void 0 : r.includes('dark'))
                          ? 'vs-dark'
                          : 'vs',
                        onMount: x,
                        defaultLanguage: 'pgsql',
                        value: h,
                        path: '',
                        options: {
                          domReadOnly: !0,
                          readOnly: !0,
                          tabSize: 2,
                          fontSize: 13,
                          minimap: { enabled: !1 },
                          wordWrap: 'on',
                          fixedOverflowWidgets: !0,
                        },
                        'data-sentry-element': 'Editor',
                        'data-sentry-source-file': 'TableDefinition.tsx',
                      }),
                    ],
                  }),
                  (0, i.jsx)(eg.Z, {
                    'data-sentry-element': 'Footer',
                    'data-sentry-source-file': 'TableDefinition.tsx',
                  }),
                ],
              });
        },
        eC = (e) => {
          var n, t;
          let {
              theme: r = 'dark',
              isLoadingSelectedTable: s = !1,
              selectedTable: A,
            } = e,
            R = (0, d.useRouter)(),
            { ref: E, id: _ } = (0, m.UO)(),
            { project: k } = (0, p.d2)(),
            L = (0, C._2)(),
            z = (0, D.z6)(),
            [{ view: Z = 'data' }] = (0, w.x)(),
            T = (0, b.Xo)(a.KA.TENANT_SQL_ADMIN_WRITE, 'tables'),
            I = (0, b.Xo)(a.KA.TENANT_SQL_ADMIN_WRITE, 'columns'),
            F = !T && !I,
            q = (0, o.NL)(),
            { mutate: M } = (0, y.Gz)({
              async onMutate(e) {
                let {
                    projectRef: n,
                    table: t,
                    configuration: i,
                    payload: a,
                  } = e,
                  o = new Set(Object.keys(i.identifiers)),
                  r = v.s.tableRows(n, { table: { id: t.id } });
                await q.cancelQueries(r);
                let l = q.getQueriesData(r);
                return (
                  q.setQueriesData(r, (e) => {
                    var n;
                    return {
                      rows:
                        null !==
                          (n =
                            null == e
                              ? void 0
                              : e.rows.map((e) =>
                                  Object.entries(e)
                                    .filter((e) => {
                                      let [n] = e;
                                      return o.has(n);
                                    })
                                    .every((e) => {
                                      let [n, t] = e;
                                      return t === i.identifiers[n];
                                    })
                                    ? { ...e, ...a }
                                    : e
                                )) && void 0 !== n
                          ? n
                          : [],
                    };
                  }),
                  { previousRowsQueries: l }
                );
              },
              onError(e, n, t) {
                let { previousRowsQueries: i } = t;
                (i.forEach((e) => {
                  let [n, t] = e;
                  (t && q.setQueriesData(n, t), q.invalidateQueries(n));
                }),
                  K(e));
              },
            }),
            O = (0, j.Z)(
              null !== (n = null == A ? void 0 : A.columns) && void 0 !== n
                ? n
                : N.Z6
            );
          if (s) return (0, i.jsx)(ec.h, {});
          if (c()(A)) return (0, i.jsx)(em, { id: Number(_) });
          let V = (0, g.Du)(A) || (0, g.z_)(A),
            W = (0, g.N3)(A),
            U = S.s.includes(
              null !== (t = null == A ? void 0 : A.schema) && void 0 !== t
                ? t
                : ''
            ),
            Q = W && !U,
            G = (0, h.NK)(A),
            P = ''.concat(A.schema, '_').concat(A.name),
            K = (e) => {
              var n, t;
              u.Am.error(
                null !==
                  (t =
                    null !== (n = null == e ? void 0 : e.details) &&
                    void 0 !== n
                      ? n
                      : null == e
                        ? void 0
                        : e.message) && void 0 !== t
                  ? t
                  : e
              );
            };
          return (0, i.jsxs)(i.Fragment, {
            children: [
              (0, i.jsx)(
                f.z,
                {
                  theme: r,
                  gridProps: { height: '100%' },
                  projectRef: E,
                  editable: !F && Q,
                  schema: A.schema,
                  table: G,
                  headerActions: (0, i.jsx)(es, {
                    table: A,
                    canEditViaTableEditor: Q,
                  }),
                  onAddColumn: L.onAddColumn,
                  onEditColumn: (e) => {
                    let n = l()(O.current, { name: e });
                    n
                      ? L.onEditColumn(n)
                      : u.Am.error(
                          'Unable to find column '
                            .concat(e, ' in ')
                            .concat(null == A ? void 0 : A.name)
                        );
                  },
                  onDeleteColumn: (e) => {
                    var n;
                    let t = l()(
                      null !== (n = O.current) && void 0 !== n ? n : [],
                      { name: e }
                    );
                    t
                      ? L.onDeleteColumn(t)
                      : u.Am.error(
                          'Unable to find column '
                            .concat(e, ' in ')
                            .concat(null == A ? void 0 : A.name)
                        );
                  },
                  onAddRow: L.onAddRow,
                  updateTableRow: (e, n) => {
                    var t;
                    if (!k) return;
                    let a =
                        null === (t = A.columns) || void 0 === t
                          ? void 0
                          : t
                              .filter((e) => {
                                var n;
                                return (
                                  (null !==
                                    (n = null == e ? void 0 : e.enums) &&
                                  void 0 !== n
                                    ? n
                                    : []
                                  ).length > 0 &&
                                  'array' === e.data_type.toLowerCase()
                                );
                              })
                              .map((e) => e.name),
                      o = {};
                    if (
                      ((0, g.N3)(A) &&
                        A.primary_keys.forEach((n) => {
                          let t = A.columns.find((e) => e.name === n.name);
                          o[n.name] =
                            (null == t ? void 0 : t.format) === 'bytea'
                              ? (0, ef.D4)(e[n.name])
                              : e[n.name];
                        }),
                      0 === Object.keys(o).length)
                    )
                      return (0, u.Am)(
                        'Unable to update row as table has no primary keys',
                        {
                          description: (0, i.jsxs)('div', {
                            children: [
                              (0, i.jsx)('p', {
                                className: 'text-sm text-foreground-light',
                                children:
                                  'Add a primary key column to your table first to serve as a unique identifier for each row before updating or deleting the row.',
                              }),
                              (0, i.jsx)('div', {
                                className: 'mt-3',
                                children: (0, i.jsx)(x.G, {
                                  href: 'https://supabase.com/docs/guides/database/tables#primary-keys',
                                }),
                              }),
                            ],
                          }),
                        }
                      );
                    M({
                      projectRef: k.ref,
                      connectionString: k.connectionString,
                      table: A,
                      configuration: { identifiers: o },
                      payload: n,
                      enumArrayColumns: a,
                      impersonatedRole: z(),
                    });
                  },
                  onEditRow: L.onEditRow,
                  onImportData: L.onImportData,
                  onError: K,
                  onExpandJSONEditor: (e, n) => {
                    L.onExpandJSONEditor({
                      column: e,
                      row: n,
                      value: JSON.stringify(n[e]) || '',
                    });
                  },
                  onExpandTextEditor: (e, n) => {
                    L.onExpandTextEditor(e, n);
                  },
                  onEditForeignKeyColumnValue: L.onEditForeignKeyColumnValue,
                  showCustomChildren: (V || W) && 'definition' === Z,
                  customHeader:
                    (V || W) && 'definition' === Z
                      ? (0, i.jsxs)('div', {
                          className: 'flex items-center space-x-2',
                          children: [
                            (0, i.jsxs)('p', {
                              children: [
                                'SQL Definition of ',
                                (0, i.jsx)('code', {
                                  className: 'text-sm',
                                  children: A.name,
                                }),
                                ' ',
                              ],
                            }),
                            (0, i.jsx)('p', {
                              className: 'text-foreground-light text-sm',
                              children: '(Read only)',
                            }),
                          ],
                        })
                      : null,
                  'data-sentry-element': 'SupabaseGrid',
                  'data-sentry-source-file': 'TableGridEditor.tsx',
                  children: (V || W) && (0, i.jsx)(eD, { entity: A }),
                },
                P
              ),
              (0, i.jsx)(eh.Z, {
                editable: !F && Q,
                selectedTable: (0, g.N3)(A) ? A : void 0,
                onTableCreated: (e) => {
                  R.push('/project/'.concat(E, '/editor/').concat(e.id));
                },
                'data-sentry-element': 'SidePanelEditor',
                'data-sentry-source-file': 'TableGridEditor.tsx',
              }),
            ],
          });
        };
      t(46908);
    },
    92259: function (e, n, t) {
      t.d(n, {
        r: function () {
          return c;
        },
      });
      var i = t(28894),
        a = t(6464),
        o = t(62432),
        r = t(37756),
        l = t(98775);
      async function s(e, n, t) {
        let { projectRef: i, connectionString: o, schema: r } = e;
        if (!i) throw Error('projectRef is required');
        let l = new Headers(t);
        o && l.set('x-connection-encrypted', o);
        let { data: s, error: c } = await (0, a.U2)(
          '/platform/pg-meta/{ref}/policies',
          {
            params: {
              header: { 'x-connection-encrypted': o },
              path: { ref: i },
              query: { included_schemas: r || '', excluded_schemas: '' },
            },
            headers: l,
            signal: n,
          }
        );
        return (c && (0, a.S3)(c), s);
      }
      let c = function (e) {
        let { projectRef: n, connectionString: t, schema: a } = e,
          { enabled: c = !0, ...d } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          u = (0, o.Vm)(),
          m = (null == u ? void 0 : u.status) === r.S.ACTIVE_HEALTHY;
        return (0, i.a)(
          l.R.list(n, a),
          (e) => {
            let { signal: i } = e;
            return s({ projectRef: n, connectionString: t, schema: a }, i);
          },
          { enabled: c && void 0 !== n && m, ...d }
        );
      };
    },
    50936: function (e, n, t) {
      t.d(n, {
        Z: function () {
          return F;
        },
      });
      var i = t(97458),
        a = t(4839),
        o = t(83145),
        r = t.n(o),
        l = t(34549),
        s = t(27850),
        c = t(88971),
        d = t(62423),
        u = t(36457),
        m = t(64618),
        f = t(65051),
        h = t(25878),
        p = t(99492),
        x = t(24561),
        g = t(79790),
        v = t(62175);
      async function y(e) {
        let {
            projectRef: n,
            connectionString: t,
            table: i,
            filters: a,
            impersonatedRole: o,
          } = e,
          r = (0, p.Jh)(
            (function (e) {
              var n;
              let { table: t, filters: i } = e,
                a = new f.A()
                  .from(
                    t.name,
                    null !== (n = t.schema) && void 0 !== n ? n : void 0
                  )
                  .delete();
              return (
                i
                  .filter((e) => e.value && '' !== e.value)
                  .forEach((e) => {
                    let n = (0, v.q)(t, e);
                    a = a.filter(e.column, e.operator, n);
                  }),
                a.toSql()
              );
            })({ table: i, filters: a }),
            { projectRef: n, role: o }
          ),
          { result: l } = await (0, h.R)({
            projectRef: n,
            connectionString: t,
            sql: r,
            isRoleImpersonationEnabled: (0, x.Gm)(o),
          });
        return l;
      }
      let b = function () {
        let {
            onSuccess: e,
            onError: n,
            ...t
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          i = (0, u.NL)();
        return (0, m.D)((e) => y(e), {
          async onSuccess(n, t, a) {
            let { projectRef: o, table: r } = t;
            (await i.invalidateQueries(g.s.tableRowsAndCount(o, r.id)),
              await (null == e ? void 0 : e(n, t, a)));
          },
          async onError(e, t, i) {
            void 0 === n
              ? l.Am.error(
                  'Failed to delete all table rows: '.concat(e.message)
                )
              : n(e, t, i);
          },
          ...t,
        });
      };
      var j = t(49996),
        w = t(67096);
      async function S(e) {
        let {
            projectRef: n,
            connectionString: t,
            table: i,
            rows: a,
            impersonatedRole: o,
          } = e,
          r = (0, p.Jh)(
            (function (e) {
              var n;
              let { table: t, rows: i } = e,
                { primaryKeys: a, error: o } = (0, v.h)({ table: t });
              if (o) throw o;
              let r = new f.A()
                .from(
                  t.name,
                  null !== (n = t.schema) && void 0 !== n ? n : void 0
                )
                .delete();
              return (
                null == a ||
                  a.forEach((e) => {
                    let n = i.map((n) => n[e]);
                    r = r.filter(e, 'in', n);
                  }),
                r.toSql()
              );
            })({ table: i, rows: a }),
            { projectRef: n, role: o }
          ),
          { result: l } = await (0, h.R)({
            projectRef: n,
            connectionString: t,
            sql: r,
            isRoleImpersonationEnabled: (0, x.Gm)(o),
          });
        return l;
      }
      let N = function () {
        let {
            onSuccess: e,
            onError: n,
            ...t
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          a = (0, u.NL)();
        return (0, m.D)((e) => S(e), {
          async onSuccess(n, t, i) {
            let { projectRef: o, table: r } = t;
            (await a.invalidateQueries(g.s.tableRowsAndCount(o, r.id)),
              await (null == e ? void 0 : e(n, t, i)));
          },
          async onError(e, t, a) {
            if (void 0 === n) {
              let { table: n, rows: a } = t,
                o = e.message.includes('Please add a primary key column'),
                r = e.message.includes('violates foreign key constraint'),
                s = a.length > 1;
              if (r) {
                let t = n.name,
                  a = e.message.split('on table ')[2].replaceAll('"', ''),
                  o = e.message
                    .split('foreign key constraint')[1]
                    .split('on table')[0]
                    .replaceAll('"', ''),
                  r = s
                    ? 'Unable to delete rows as one of them is currently referenced by a foreign key constraint from the table `'.concat(
                        a,
                        '`.'
                      )
                    : 'Unable to delete row as it is currently referenced by a foreign key constraint from the table `'.concat(
                        a,
                        '`.'
                      ),
                  c = 'Set an on delete behavior on the foreign key relation `'
                    .concat(o, '` in the `')
                    .concat(
                      a,
                      '` table to automatically respond when row(s) are being deleted in the `'
                    )
                    .concat(t, '` table.');
                (0, l.Am)(r, {
                  description: (0, i.jsx)(j.U, {
                    content: c,
                    className: '[&>p]:m-0',
                  }),
                  action: (0, i.jsx)('div', {
                    className: 'w-full flex gap-x-2 !mx-0 mt-3',
                    children: (0, i.jsx)(w.G, {
                      href: 'https://supabase.com/docs/guides/database/postgres/cascade-deletes',
                    }),
                  }),
                });
              } else
                o
                  ? (0, l.Am)(
                      'Unable to delete row(s) as table has no primary keys',
                      {
                        description: (0, i.jsxs)('div', {
                          children: [
                            (0, i.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'Add a primary key column to your table first to serve as a unique identifier for each row before updating or deleting the row.',
                            }),
                            (0, i.jsx)('div', {
                              className: 'mt-3',
                              children: (0, i.jsx)(w.G, {
                                href: 'https://supabase.com/docs/guides/database/tables#primary-keys',
                              }),
                            }),
                          ],
                        }),
                      }
                    )
                  : l.Am.error(
                      'Failed to delete table row: '.concat(e.message)
                    );
            } else n(e, t, a);
          },
          ...t,
        });
      };
      async function D(e) {
        let { projectRef: n, connectionString: t, table: i } = e,
          a = (function (e) {
            var n;
            let { table: t } = e;
            return new f.A()
              .from(
                t.name,
                null !== (n = t.schema) && void 0 !== n ? n : void 0
              )
              .truncate()
              .toSql();
          })({ table: i }),
          { result: o } = await (0, h.R)({
            projectRef: n,
            connectionString: t,
            sql: a,
          });
        return o;
      }
      let C = function () {
        let {
            onSuccess: e,
            onError: n,
            ...t
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          i = (0, u.NL)();
        return (0, m.D)((e) => D(e), {
          async onSuccess(n, t, a) {
            let { projectRef: o, table: r } = t;
            (await i.invalidateQueries(g.s.tableRowsAndCount(o, r.id)),
              await (null == e ? void 0 : e(n, t, a)));
          },
          async onError(e, t, i) {
            void 0 === n
              ? l.Am.error('Failed to truncate table row: '.concat(e.message))
              : n(e, t, i);
          },
          ...t,
        });
      };
      var A = t(73167),
        R = t(79581),
        E = t(17319),
        _ = t(53114),
        k = t(56844),
        L = t(96226),
        z = t(10046),
        Z = t(10947),
        T = t(90839),
        I = t(32002),
        F = (e) => {
          var n, t, o, u, m, f, h, p, g;
          let { selectedTable: v, onAfterDeleteTable: y = k.ZT } = e,
            { project: j } = (0, c.d2)(),
            w = (0, L._2)(),
            { selectedSchema: S } = (0, E.B)(),
            [{ filter: D }, F] = (0, _.x)({ arrayKeys: ['filter', 'sort'] }),
            q = (0, s.Yb)(D),
            M = (0, R.AF)({
              projectRef: null == j ? void 0 : j.ref,
              connectionString: null == j ? void 0 : j.connectionString,
            }),
            O = (e) => {
              F((n) => {
                var t, i;
                let a =
                    null !== (t = null == n ? void 0 : n.filter) && void 0 !== t
                      ? t
                      : [],
                  o =
                    null !== (i = null == n ? void 0 : n.sort) && void 0 !== i
                      ? i
                      : [];
                return {
                  ...n,
                  filter: a.filter((n) => {
                    let [t] = n.split(':');
                    if (t !== e) return n;
                  }),
                  sort: o.filter((n) => {
                    let [t] = n.split(':');
                    if (t !== e) return n;
                  }),
                };
              });
            },
            { mutate: V } = (0, d.v)({
              onSuccess: () => {
                var e;
                if (
                  (null === (e = w.confirmationDialog) || void 0 === e
                    ? void 0
                    : e.type) !== 'column'
                )
                  return;
                let n = w.confirmationDialog.column;
                (O(n.name),
                  l.Am.success(
                    'Successfully deleted column "'.concat(n.name, '"')
                  ));
              },
              onError: (e) => {
                var n;
                if (
                  (null === (n = w.confirmationDialog) || void 0 === n
                    ? void 0
                    : n.type) !== 'column'
                )
                  return;
                let t = w.confirmationDialog.column;
                l.Am.error(
                  'Failed to delete '.concat(t.name, ': ').concat(e.message)
                );
              },
              onSettled: () => {
                w.closeConfirmationDialog();
              },
            }),
            { mutate: W } = (0, A.H)({
              onSuccess: async () => {
                (y(await M(S)),
                  l.Am.success(
                    'Successfully deleted table "'.concat(
                      null == v ? void 0 : v.name,
                      '"'
                    )
                  ));
              },
              onError: (e) => {
                l.Am.error(
                  'Failed to delete '
                    .concat(null == v ? void 0 : v.name, ': ')
                    .concat(e.message)
                );
              },
              onSettled: () => {
                w.closeConfirmationDialog();
              },
            }),
            { mutate: U } = N({
              onSuccess: () => {
                var e, n, t;
                ((null === (e = w.confirmationDialog) || void 0 === e
                  ? void 0
                  : e.type) === 'row' &&
                  (null === (n = (t = w.confirmationDialog).callback) ||
                    void 0 === n ||
                    n.call(t)),
                  l.Am.success('Successfully deleted selected row(s)'));
              },
              onSettled: () => {
                w.closeConfirmationDialog();
              },
            }),
            { mutate: Q } = b({
              onSuccess: () => {
                var e, n, t;
                ((null === (e = w.confirmationDialog) || void 0 === e
                  ? void 0
                  : e.type) === 'row' &&
                  (null === (n = (t = w.confirmationDialog).callback) ||
                    void 0 === n ||
                    n.call(t)),
                  l.Am.success('Successfully deleted selected rows'));
              },
              onError: (e) => {
                l.Am.error('Failed to delete rows: '.concat(e.message));
              },
              onSettled: () => {
                w.closeConfirmationDialog();
              },
            }),
            { mutate: G } = C({
              onSuccess: () => {
                var e, n, t;
                ((null === (e = w.confirmationDialog) || void 0 === e
                  ? void 0
                  : e.type) === 'row' &&
                  (null === (n = (t = w.confirmationDialog).callback) ||
                    void 0 === n ||
                    n.call(t)),
                  l.Am.success('Successfully deleted all rows from table'));
              },
              onError: (e) => {
                l.Am.error('Failed to delete rows: '.concat(e.message));
              },
              onSettled: () => {
                w.closeConfirmationDialog();
              },
            }),
            P =
              (null === (n = w.confirmationDialog) || void 0 === n
                ? void 0
                : n.type) === 'row' && w.confirmationDialog.allRowsSelected,
            K =
              (null === (t = w.confirmationDialog) || void 0 === t
                ? void 0
                : t.type) === 'row'
                ? w.confirmationDialog.allRowsSelected
                  ? null !== (g = w.confirmationDialog.numRows) && void 0 !== g
                    ? g
                    : 0
                  : w.confirmationDialog.rows.length
                : 0,
            J =
              ((null === (o = w.confirmationDialog) || void 0 === o
                ? void 0
                : o.type) === 'column' ||
                (null === (u = w.confirmationDialog) || void 0 === u
                  ? void 0
                  : u.type) === 'table') &&
              w.confirmationDialog.isDeleteWithCascade,
            H = async () => {
              var e;
              if (
                (null === (e = w.confirmationDialog) || void 0 === e
                  ? void 0
                  : e.type) !== 'column' ||
                void 0 === j
              )
                return;
              let n = w.confirmationDialog.column;
              void 0 !== n &&
                V({
                  id: n.id,
                  cascade: J,
                  projectRef: j.ref,
                  connectionString: null == j ? void 0 : j.connectionString,
                  table: v,
                });
            },
            X = async () => {
              var e;
              (null === (e = w.confirmationDialog) || void 0 === e
                ? void 0
                : e.type) === 'table' &&
                void 0 !== v &&
                W({
                  projectRef: null == j ? void 0 : j.ref,
                  connectionString: null == j ? void 0 : j.connectionString,
                  schema: v.schema,
                  id: v.id,
                  cascade: J,
                });
            },
            Y = (0, x.z6)(),
            B = async () => {
              var e;
              if (!j) return console.error('Project ref is required');
              if (!v) return console.error('Selected table required');
              if (
                (null === (e = w.confirmationDialog) || void 0 === e
                  ? void 0
                  : e.type) !== 'row'
              )
                return;
              let n = w.confirmationDialog.rows;
              if (w.confirmationDialog.allRowsSelected) {
                if (0 === q.length) {
                  if (void 0 !== Y())
                    return (
                      w.closeConfirmationDialog(),
                      l.Am.error(
                        'Table truncation is not supported when impersonating a role'
                      )
                    );
                  G({
                    projectRef: j.ref,
                    connectionString: j.connectionString,
                    table: v,
                  });
                } else
                  Q({
                    projectRef: j.ref,
                    connectionString: j.connectionString,
                    table: v,
                    filters: q,
                    impersonatedRole: Y(),
                  });
              } else
                U({
                  projectRef: j.ref,
                  connectionString: j.connectionString,
                  table: v,
                  rows: n,
                  impersonatedRole: Y(),
                });
            };
          return (0, i.jsxs)(i.Fragment, {
            children: [
              (0, i.jsx)(I.Z, {
                variant: 'destructive',
                size: 'small',
                visible:
                  (null === (m = w.confirmationDialog) || void 0 === m
                    ? void 0
                    : m.type) === 'column',
                title: 'Confirm deletion of column "'.concat(
                  (null === (f = w.confirmationDialog) || void 0 === f
                    ? void 0
                    : f.type) === 'column' && w.confirmationDialog.column.name,
                  '"'
                ),
                confirmLabel: 'Delete',
                confirmLabelLoading: 'Deleting',
                onCancel: () => {
                  w.closeConfirmationDialog();
                },
                onConfirm: H,
                'data-sentry-element': 'ConfirmationModal',
                'data-sentry-source-file': 'DeleteConfirmationDialogs.tsx',
                children: (0, i.jsxs)('div', {
                  className: 'space-y-4',
                  children: [
                    (0, i.jsx)('p', {
                      className: 'text-sm text-foreground-light',
                      children:
                        'Are you sure you want to delete the selected column? This action cannot be undone.',
                    }),
                    (0, i.jsx)(z.Z, {
                      label: 'Drop column with cascade?',
                      description:
                        'Deletes the column and its dependent objects',
                      checked: J,
                      onChange: () => w.toggleConfirmationIsWithCascade(),
                      'data-sentry-element': 'Checkbox',
                      'data-sentry-source-file':
                        'DeleteConfirmationDialogs.tsx',
                    }),
                    J &&
                      (0, i.jsxs)(Z.bZ, {
                        variant: 'warning',
                        title:
                          'Warning: Dropping with cascade may result in unintended consequences',
                        children: [
                          (0, i.jsx)(Z.Cd, {
                            children:
                              'All dependent objects will be removed, as will any objects that depend on them, recursively.',
                          }),
                          (0, i.jsx)(Z.X, {
                            children: (0, i.jsx)(T.z, {
                              asChild: !0,
                              size: 'tiny',
                              type: 'default',
                              icon: (0, i.jsx)(a.Z, {}),
                              children: (0, i.jsx)(r(), {
                                href: 'https://www.postgresql.org/docs/current/ddl-depend.html',
                                target: '_blank',
                                rel: 'noreferrer',
                                children: 'About dependency tracking',
                              }),
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              (0, i.jsx)(I.Z, {
                variant: 'destructive',
                size: 'small',
                visible:
                  (null === (h = w.confirmationDialog) || void 0 === h
                    ? void 0
                    : h.type) === 'table',
                title: (0, i.jsx)('span', {
                  className: 'break-words',
                  children: 'Confirm deletion of table "'.concat(
                    null == v ? void 0 : v.name,
                    '"'
                  ),
                }),
                confirmLabel: 'Delete',
                confirmLabelLoading: 'Deleting',
                onCancel: () => {
                  w.closeConfirmationDialog();
                },
                onConfirm: X,
                'data-sentry-element': 'ConfirmationModal',
                'data-sentry-source-file': 'DeleteConfirmationDialogs.tsx',
                children: (0, i.jsxs)('div', {
                  className: 'space-y-4',
                  children: [
                    (0, i.jsx)('p', {
                      className: 'text-sm text-foreground-light',
                      children:
                        'Are you sure you want to delete the selected table? This action cannot be undone.',
                    }),
                    (0, i.jsx)(z.Z, {
                      label: 'Drop table with cascade?',
                      description:
                        'Deletes the table and its dependent objects',
                      checked: J,
                      onChange: () => w.toggleConfirmationIsWithCascade(!J),
                      'data-sentry-element': 'Checkbox',
                      'data-sentry-source-file':
                        'DeleteConfirmationDialogs.tsx',
                    }),
                    J &&
                      (0, i.jsxs)(Z.bZ, {
                        variant: 'warning',
                        children: [
                          (0, i.jsx)(Z.Cd, {
                            children:
                              'Warning: Dropping with cascade may result in unintended consequences',
                          }),
                          (0, i.jsx)(Z.X, {
                            children:
                              'All dependent objects will be removed, as will any objects that depend on them, recursively.',
                          }),
                          (0, i.jsx)(Z.X, {
                            className: 'mt-4',
                            children: (0, i.jsx)(T.z, {
                              asChild: !0,
                              size: 'tiny',
                              type: 'default',
                              icon: (0, i.jsx)(a.Z, {}),
                              children: (0, i.jsx)(r(), {
                                href: 'https://www.postgresql.org/docs/current/ddl-depend.html',
                                target: '_blank',
                                rel: 'noreferrer',
                                children: 'About dependency tracking',
                              }),
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              (0, i.jsx)(I.Z, {
                variant: 'destructive',
                size: 'small',
                visible:
                  (null === (p = w.confirmationDialog) || void 0 === p
                    ? void 0
                    : p.type) === 'row',
                title: (0, i.jsxs)('p', {
                  className: 'break-words',
                  children: [
                    (0, i.jsx)('span', {
                      children: 'Confirm to delete the selected row',
                    }),
                    (0, i.jsx)('span', { children: K > 1 && 's' }),
                  ],
                }),
                confirmLabel: 'Delete',
                confirmLabelLoading: 'Deleting',
                onCancel: () => w.closeConfirmationDialog(),
                onConfirm: () => B(),
                'data-sentry-element': 'ConfirmationModal',
                'data-sentry-source-file': 'DeleteConfirmationDialogs.tsx',
                children: (0, i.jsx)('div', {
                  className: 'space-y-4',
                  children: (0, i.jsxs)('p', {
                    className: 'text-sm text-foreground-light',
                    children: [
                      (0, i.jsx)('span', {
                        children: 'Are you sure you want to delete ',
                      }),
                      (0, i.jsxs)('span', {
                        children: [P ? 'all' : 'the selected', ' '],
                      }),
                      (0, i.jsx)('span', {
                        children: K > 1 && ''.concat(K, ' '),
                      }),
                      (0, i.jsx)('span', { children: 'row' }),
                      (0, i.jsx)('span', { children: K > 1 && 's' }),
                      (0, i.jsx)('span', {
                        children: '? This action cannot be undone.',
                      }),
                    ],
                  }),
                }),
              }),
            ],
          });
        };
    },
    32472: function (e, n, t) {
      var i = t(97458),
        a = t(52983),
        o = t(42155),
        r = t(19540),
        l = t(90839);
      n.Z = (e) => {
        let {
          visible: n = !1,
          danger: t = !1,
          title: s = '',
          description: c = '',
          size: d = 'small',
          buttonLabel: u = '',
          buttonLoadingLabel: m = '',
          onSelectCancel: f = () => {},
          onSelectConfirm: h = () => {},
        } = e;
        (0, a.useEffect)(() => {
          n && x(!1);
        }, [n]);
        let [p, x] = (0, a.useState)(!1),
          g = () => {
            (x(!0), h());
          };
        return (0, i.jsx)(o.Z, {
          header: s,
          visible: n,
          title: s,
          description: c,
          size: d,
          hideFooter: !0,
          onCancel: f,
          'data-sentry-element': 'Modal',
          'data-sentry-component': 'ConfirmModal',
          'data-sentry-source-file': 'ConfirmDialog.tsx',
          children: (0, i.jsx)(r.Z, {
            initialValues: {},
            validateOnBlur: !0,
            onSubmit: () => g(),
            validate: () => [],
            'data-sentry-element': 'Form',
            'data-sentry-source-file': 'ConfirmDialog.tsx',
            children: () =>
              (0, i.jsx)(i.Fragment, {
                children: (0, i.jsx)(o.Z.Content, {
                  children: (0, i.jsxs)('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      (0, i.jsx)(l.z, {
                        block: !0,
                        htmlType: 'button',
                        type: 'default',
                        onClick: f,
                        disabled: p,
                        children: 'Cancel',
                      }),
                      (0, i.jsx)(l.z, {
                        htmlType: 'submit',
                        block: !0,
                        type: t ? 'danger' : 'primary',
                        disabled: p,
                        loading: p,
                        children: m && p ? m : u || 'Confirm',
                      }),
                    ],
                  }),
                }),
              }),
          }),
        });
      };
    },
  },
]);
