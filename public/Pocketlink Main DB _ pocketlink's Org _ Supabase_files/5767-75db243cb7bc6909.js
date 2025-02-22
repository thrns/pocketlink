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
      (e._sentryDebugIds[t] = '2745a18a-cac6-44d1-a5f8-de08a5ee5d95'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-2745a18a-cac6-44d1-a5f8-de08a5ee5d95'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5767],
  {
    80023: function (e, t, n) {
      n.d(t, {
        d: function () {
          return a;
        },
      });
      let a = {
        warehouseQuery: (e, t) => ['projects', e, 'warehouse', 'query', t],
        warehouseTenant: (e) => ['projects', e, 'warehouse', 'tenant'],
        warehouseCollections: (e) => [
          'projects',
          e,
          'warehouse',
          'collections',
        ],
        warehouseCollectionsCreate: (e) => [
          'projects',
          e,
          'warehouse',
          'collections',
          'create',
        ],
        warehouseEndpoints: (e) => ['projects', e, 'warehouse', 'endpoints'],
        warehouseBackends: (e) => ['projects', e, 'warehouse', 'backends'],
        warehouseAccessTokens: (e) => [
          'projects',
          e,
          'warehouse',
          'access-tokens',
        ],
        functionsInvStats: (e, t) => {
          let { interval: n, functionId: a } = t;
          return [
            'projects',
            e,
            'functions-inv-stats',
            { interval: n, functionId: a },
          ];
        },
        functionsReqStats: (e, t) => {
          let { interval: n, functionId: a } = t;
          return [
            'projects',
            e,
            'functions-req-stats',
            { interval: n, functionId: a },
          ];
        },
        functionsResourceUsage: (e, t) => {
          let { interval: n, functionId: a } = t;
          return [
            'projects',
            e,
            'functions-resource-usage',
            { interval: n, functionId: a },
          ];
        },
        orgDailyComputeStats: (e, t) => {
          let { startDate: n, endDate: a, projectRef: s } = t;
          return [
            'organizations',
            e,
            'daily-stats-compute',
            { startDate: r(n), endDate: r(a), projectRef: s },
          ];
        },
        orgDailyStats: (e, t) => {
          let {
            metric: n,
            startDate: a,
            endDate: s,
            interval: o,
            projectRef: i,
          } = t;
          return [
            'organizations',
            e,
            'daily-stats',
            {
              metric: n,
              startDate: r(a),
              endDate: r(s),
              interval: o,
              projectRef: i,
            },
          ];
        },
        infraMonitoring: (e, t) => {
          let {
            attribute: n,
            startDate: a,
            endDate: r,
            interval: s,
            databaseIdentifier: o,
          } = t;
          return [
            'projects',
            e,
            'infra-monitoring',
            {
              attribute: n,
              startDate: a,
              endDate: r,
              interval: s,
              databaseIdentifier: o,
            },
          ];
        },
        usageApiCounts: (e, t) => ['projects', e, 'usage.api-counts', t],
        usageApiRequestsCount: (e) => [
          'projects',
          e,
          'usage.api-requests-count',
        ],
      };
      function r(e) {
        return e ? e.split('T')[0] : e;
      }
    },
    63186: function (e, t, n) {
      n.d(t, {
        G7: function () {
          return i;
        },
        O3: function () {
          return l;
        },
      });
      var a = n(28894),
        r = n(6464),
        s = n(80023);
      async function o(e, t) {
        let { projectRef: n } = e;
        if (!n) throw Error('projectRef is required');
        let { data: a, error: s } = await (0, r.U2)(
          '/platform/projects/{ref}/analytics/endpoints/usage.api-requests-count',
          { params: { path: { ref: n } }, signal: t }
        );
        return (s && (0, r.S3)(s), a);
      }
      let i = function (e) {
        let { projectRef: t } = e,
          { enabled: n = !0, ...r } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, a.a)(
          s.d.usageApiRequestsCount(t),
          (e) => {
            let { signal: n } = e;
            return o({ projectRef: t }, n);
          },
          { enabled: n && void 0 !== t, ...r }
        );
      };
      function l(e, t) {
        let { projectRef: n } = t;
        return e.fetchQuery(s.d.usageApiRequestsCount(n), (e) => {
          let { signal: t } = e;
          return o({ projectRef: n }, t);
        });
      }
    },
    77631: function (e, t, n) {
      n.d(t, {
        Ey: function () {
          return i;
        },
        OU: function () {
          return l;
        },
      });
      var a = n(28894),
        r = n(6464),
        s = n(80023);
      async function o(e, t) {
        let { projectRef: n, interval: a } = e;
        if (!n) throw Error('projectRef is required');
        if (!a) throw Error('interval is required');
        let { data: s, error: o } = await (0, r.U2)(
          '/platform/projects/{ref}/analytics/endpoints/usage.api-counts',
          { params: { path: { ref: n }, query: { interval: a } }, signal: t }
        );
        return (o && (0, r.S3)(o), s);
      }
      let i = function (e) {
        let { projectRef: t, interval: n } = e,
          { enabled: r = !0, ...i } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, a.a)(
          s.d.usageApiCounts(t, n),
          (e) => {
            let { signal: a } = e;
            return o({ projectRef: t, interval: n }, a);
          },
          { enabled: r && void 0 !== t && void 0 !== n, ...i }
        );
      };
      function l(e, t) {
        let { projectRef: n, interval: a } = t;
        return e.fetchQuery(s.d.usageApiCounts(n, a), (e) => {
          let { signal: t } = e;
          return o({ projectRef: n, interval: a }, t);
        });
      }
    },
    33940: function (e, t, n) {
      var a, r;
      (n.d(t, {
        l: function () {
          return a;
        },
      }),
        ((r = a || (a = {})).TABLE = 'r'),
        (r.VIEW = 'v'),
        (r.MATERIALIZED_VIEW = 'm'),
        (r.FOREIGN_TABLE = 'f'),
        (r.PARTITIONED_TABLE = 'p'));
    },
    83402: function (e, t, n) {
      n.d(t, {
        Hp: function () {
          return l;
        },
        rE: function () {
          return c;
        },
      });
      var a = n(90688),
        r = n(25878),
        s = n(33940),
        o = n(14520);
      async function i(e, t) {
        let {
            projectRef: n,
            connectionString: a,
            schemas: o = ['public'],
            search: i,
            limit: l = 100,
            page: c = 0,
            sort: d = 'alphabetical',
            filterTypes: u = Object.values(s.l),
          } = e,
          f =
            '\n    with records as (\n      select\n        c.oid::int8 as "id",\n        nc.nspname as "schema",\n        c.relname as "name",\n        c.relkind as "type",\n        case c.relkind\n          when \'r\' then 1\n          when \'v\' then 2\n          when \'m\' then 3\n          when \'f\' then 4\n          when \'p\' then 5\n        end as "type_sort",\n        obj_description(c.oid) as "comment",\n        count(*) over() as "count",\n        c.relrowsecurity as "rls_enabled"\n      from\n        pg_namespace nc\n        join pg_class c on nc.oid = c.relnamespace\n      where\n        c.relkind in ('
              .concat(
                u.map((e) => "'".concat(e, "'")).join(', '),
                ")\n        and not pg_is_other_temp_schema(nc.oid)\n        and (\n          pg_has_role(c.relowner, 'USAGE')\n          or has_table_privilege(\n            c.oid,\n            'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'\n          )\n          or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')\n        )\n        and nc.nspname in ("
              )
              .concat(
                o.map((e) => "'".concat(e, "'")),
                ')\n        '
              )
              .concat(
                i ? "and c.relname ilike '%".concat(i, "%'") : '',
                '\n      order by '
              )
              .concat(
                'alphabetical' === d
                  ? 'c.relname asc'
                  : '"type_sort" asc, c.relname asc',
                '\n      limit '
              )
              .concat(l, '\n      offset ')
              .concat(
                c * l,
                "\n    )\n    select\n      jsonb_build_object(\n        'entities', coalesce(jsonb_agg(\n          jsonb_build_object(\n            'id', r.id,\n            'schema', r.schema,\n            'name', r.name,\n            'type', r.type,\n            'comment', r.comment,\n            'rls_enabled', r.rls_enabled\n          )\n          order by "
              )
              .concat(
                'alphabetical' === d
                  ? 'r.name asc'
                  : 'r.type_sort asc, r.name asc',
                "\n        ), '[]'::jsonb),\n        'count', coalesce(min(r.count), 0)\n      ) \"data\"\n    from records r;\n  "
              ),
          { result: m } = await (0, r.R)(
            {
              projectRef: n,
              connectionString: a,
              sql: f,
              queryKey: ['entity-types', ...o, c],
            },
            t
          );
        return m[0];
      }
      let l = function (e) {
        let {
            projectRef: t,
            connectionString: n,
            schemas: r = ['public'],
            search: s,
            limit: l = 100,
            sort: c,
            filterTypes: d,
          } = e,
          { enabled: u = !0, ...f } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return (0, a.N)(
          o.C.list(t, {
            schemas: r,
            search: s,
            sort: c,
            limit: l,
            filterTypes: d,
          }),
          (e) => {
            let { signal: a, pageParam: o } = e;
            return i(
              {
                projectRef: t,
                connectionString: n,
                schemas: r,
                search: s,
                limit: l,
                page: o,
                sort: c,
                filterTypes: d,
              },
              a
            );
          },
          {
            enabled: u && void 0 !== t,
            getNextPageParam(e, t) {
              let n = t.length;
              if (!(n * l >= e.data.count)) return n;
            },
            ...f,
          }
        );
      };
      function c(e, t) {
        let {
          projectRef: n,
          connectionString: a,
          schemas: r = ['public'],
          search: s,
          limit: l = 100,
          sort: c,
          filterTypes: d,
        } = t;
        return e.prefetchInfiniteQuery(
          o.C.list(n, {
            schemas: r,
            search: s,
            sort: c,
            limit: l,
            filterTypes: d,
          }),
          (e) => {
            let { signal: t, pageParam: o } = e;
            return i(
              {
                projectRef: n,
                connectionString: a,
                schemas: r,
                search: s,
                limit: l,
                page: o,
                sort: c,
                filterTypes: d,
              },
              t
            );
          }
        );
      }
    },
    3190: function (e, t, n) {
      n.d(t, {
        X: function () {
          return a;
        },
      });
      let a = { lint: (e) => ['projects', e, 'lint'] };
    },
    44353: function (e, t, n) {
      n.d(t, {
        U: function () {
          return c;
        },
      });
      var a = n(28894),
        r = n(6464),
        s = n(62432),
        o = n(37756),
        i = n(3190);
      async function l(e, t) {
        let { projectRef: n } = e;
        if (!n) throw Error('Project ref is required');
        let { data: a, error: s } = await (0, r.U2)(
          '/platform/projects/{ref}/run-lints',
          { params: { path: { ref: n } }, signal: t }
        );
        return (s && (0, r.S3)(s), a);
      }
      let c = function (e) {
        let { projectRef: t } = e,
          { enabled: n = !0, ...r } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          c = (0, s.Vm)(),
          d = (null == c ? void 0 : c.status) === o.S.ACTIVE_HEALTHY;
        return (0, a.a)(
          i.X.lint(t),
          (e) => {
            let { signal: n } = e;
            return l({ projectRef: t }, n);
          },
          { enabled: n && void 0 !== t && d, ...r }
        );
      };
    },
    95767: function (e, t, n) {
      n.d(t, {
        Z: function () {
          return ef;
        },
      });
      var a = n(97458),
        r = n(12436),
        s = n(79398),
        o = n(96142),
        i = n(92933),
        l = n(77270),
        c = n(71042),
        d = n(83145),
        u = n.n(d),
        f = n(32691),
        m = n(52983),
        p = n(37756),
        x = n(86186),
        h = n(65092),
        g = n(90839),
        y = n(3503),
        j = n(34730),
        v = n(1846),
        b = n(86474),
        k = n.n(b),
        N = n(33342),
        w = n(26063),
        _ = n(65858),
        C = n(39293),
        E = n(98809),
        A = n(99163),
        D = n(31316),
        P = n(44353),
        R = n(50902),
        S = n(71147),
        I = n(92261),
        M = n(21786),
        z = n(88651),
        L = n(81514),
        O = n(83965),
        B = n(77060),
        T = n(11221),
        W = n(40577),
        Z = n(14500),
        F = n(67112),
        U = n(38788),
        V = n(88971),
        q = n(45536);
      let Q = (e) => {
        let { icon: t, label: n, shortcut: r, onClick: s } = e;
        return (
          (0, q.fV)(),
          (0, a.jsxs)('div', {
            className:
              'px-2 py-1 transition bg-surface-100 flex items-center justify-between rounded cursor-pointer',
            onClick: s,
            'data-sentry-component': 'CommandOption',
            'data-sentry-source-file': 'CommandOption.tsx',
            children: [
              (0, a.jsxs)('div', {
                className: 'flex items-center gap-x-2',
                children: [
                  t,
                  (0, a.jsx)('p', { className: 'text-sm', children: n }),
                ],
              }),
              (0, a.jsxs)('div', {
                className: (0, h.cn)(
                  'flex items-center gap-1',
                  'h-6 py-1.5 px-2 leading-none',
                  'bg-surface-100 text-foreground-lighter',
                  'border border-default rounded-md',
                  ' shadow-background-surface-100'
                ),
                children: [
                  (0, a.jsx)(N.Z, { size: 11.5, strokeWidth: 1.5 }),
                  (0, a.jsx)('p', {
                    className: 'text-xs font-mono',
                    children: r,
                  }),
                ],
              }),
            ],
          })
        );
      };
      var G = n(58296),
        X = n(26056),
        Y = n(28519),
        H = n(48579);
      let J = (e, t) => {
          let n = (null == t ? void 0 : t.status) === p.S.COMING_UP,
            r = '/project/'.concat(e);
          return [
            {
              key: 'editor',
              label: 'Table Editor',
              icon: (0, a.jsx)(v.dD, { size: ei, strokeWidth: el }),
              link: e && (n ? r : '/project/'.concat(e, '/editor')),
              linkElement: (0, a.jsx)(H.Y, { projectRef: e }),
            },
            {
              key: 'sql',
              label: 'SQL Editor',
              icon: (0, a.jsx)(v.vu, { size: ei, strokeWidth: el }),
              link: p.Qy
                ? e && (n ? r : '/project/'.concat(e, '/sql/new'))
                : '/project/'.concat(e, '/sql/1'),
            },
          ];
        },
        K = (e, t, n) => {
          var r, s, o, i;
          let l = (null == t ? void 0 : t.status) === p.S.ACTIVE_HEALTHY,
            c = (null == t ? void 0 : t.status) === p.S.COMING_UP,
            d = '/project/'.concat(e),
            u = null === (r = null == n ? void 0 : n.auth) || void 0 === r || r,
            f =
              null === (s = null == n ? void 0 : n.edgeFunctions) ||
              void 0 === s ||
              s,
            m =
              null === (o = null == n ? void 0 : n.storage) ||
              void 0 === o ||
              o,
            x =
              null === (i = null == n ? void 0 : n.realtime) ||
              void 0 === i ||
              i;
          return [
            {
              key: 'database',
              label: 'Database',
              icon: (0, a.jsx)(v.vo, { size: ei, strokeWidth: el }),
              link:
                e &&
                (c
                  ? d
                  : l
                    ? '/project/'.concat(e, '/database/schemas')
                    : '/project/'.concat(e, '/database/backups/scheduled')),
            },
            ...(u
              ? [
                  {
                    key: 'auth',
                    label: 'Authentication',
                    icon: (0, a.jsx)(v.gx, { size: ei, strokeWidth: el }),
                    link: e && (c ? d : '/project/'.concat(e, '/auth/users')),
                  },
                ]
              : []),
            ...(m
              ? [
                  {
                    key: 'storage',
                    label: 'Storage',
                    icon: (0, a.jsx)(v.Ke, { size: ei, strokeWidth: el }),
                    link:
                      e && (c ? d : '/project/'.concat(e, '/storage/buckets')),
                  },
                ]
              : []),
            ...(p.Qy && f
              ? [
                  {
                    key: 'functions',
                    label: 'Edge Functions',
                    icon: (0, a.jsx)(v.hL, { size: ei, strokeWidth: el }),
                    link: e && (c ? d : '/project/'.concat(e, '/functions')),
                  },
                ]
              : []),
            ...(x
              ? [
                  {
                    key: 'realtime',
                    label: 'Realtime',
                    icon: (0, a.jsx)(v.Z7, { size: ei, strokeWidth: el }),
                    link:
                      e &&
                      (c ? d : '/project/'.concat(e, '/realtime/inspector')),
                  },
                ]
              : []),
          ];
        },
        $ = (e, t) => {
          let n = (null == t ? void 0 : t.status) === p.S.COMING_UP,
            r = '/project/'.concat(e);
          return [
            {
              key: 'advisors',
              label: 'Advisors',
              icon: (0, a.jsx)(G.Z, { size: ei, strokeWidth: el }),
              link: e && (n ? r : '/project/'.concat(e, '/advisors/security')),
            },
            ...(p.Qy
              ? [
                  {
                    key: 'reports',
                    label: 'Reports',
                    icon: (0, a.jsx)(v.Aq, { size: ei, strokeWidth: el }),
                    link: e && (n ? r : '/project/'.concat(e, '/reports')),
                  },
                ]
              : []),
            {
              key: 'logs',
              label: 'Logs',
              icon: (0, a.jsx)(X.Z, { size: ei, strokeWidth: el }),
              link: e && (n ? r : '/project/'.concat(e, '/logs/explorer')),
            },
            {
              key: 'api',
              label: 'API Docs',
              icon: (0, a.jsx)(w.Z, { size: ei, strokeWidth: el }),
              link: e && (n ? r : '/project/'.concat(e, '/api')),
            },
            {
              key: 'integrations',
              label: 'Integrations',
              icon: (0, a.jsx)(Y.Z, { size: ei, strokeWidth: el }),
              link: e && (n ? r : '/project/'.concat(e, '/integrations')),
            },
          ];
        },
        ee = (e, t) => [
          ...(p.Qy
            ? [
                {
                  key: 'settings',
                  label: 'Project Settings',
                  icon: (0, a.jsx)(_.Z, { size: ei, strokeWidth: el }),
                  link: e && '/project/'.concat(e, '/settings/general'),
                },
              ]
            : []),
        ],
        et = (0, m.forwardRef)((e, t) => {
          let { icon: n, rightText: r, ...s } = e;
          return (0, a.jsxs)(g.z, {
            ref: t,
            type: 'text',
            size: 'tiny',
            ...s,
            className: (0, h.cn)(
              'h-10 [&>span]:relative [&>span]:items-center [&>span]:gap-3 [&>span]:flex [&>span]:w-full [&>span]:h-full p-0',
              s.className
            ),
            children: [
              (0, a.jsx)('div', {
                className: 'absolute left-2 text-foreground-lighter',
                children: n,
              }),
              (0, a.jsx)('span', {
                className: (0, h.cn)(
                  'absolute left-10 md:left-7 md:group-data-[state=expanded]:left-10',
                  'opacity-100 md:opacity-0 md:group-data-[state=expanded]:opacity-100',
                  'w-[10rem] text-sm flex flex-col items-center',
                  'transition-all'
                ),
                children: (0, a.jsx)('span', {
                  className: 'w-full text-left text-foreground-light truncate',
                  children: s.children,
                }),
              }),
              r &&
                (0, a.jsx)('div', {
                  className: (0, h.cn)(
                    'absolute right-2 flex items-center',
                    'opacity-100 md:opacity-0 transition-all',
                    'md:group-data-[state=expanded]:opacity-100 '
                  ),
                  children: r,
                }),
            ],
          });
        });
      et.displayName = 'NavigationIconButton';
      var en = n(71607),
        ea = n.n(en),
        er = n(73656);
      let es = (0, m.forwardRef)((e, t) => {
        let { route: n, isActive: r = !1, onClick: s = ea(), ...o } = e,
          i = (0, x.WZ)(),
          [l] = (0, I.l)(p.dA.EXPAND_NAVIGATION_PANEL, !0),
          c = 'test' !== er.env.NEXT_PUBLIC_NODE_ENV && l,
          d = (0, m.forwardRef)(function (e, t) {
            return n.linkElement && (0, m.isValidElement)(n.linkElement)
              ? (0, m.cloneElement)(n.linkElement, { ...e, ref: t })
              : (0, a.jsx)(u(), { ref: t, ...e });
          }),
          f = (0, a.jsxs)(d, {
            role: 'button',
            'aria-current': r,
            ref: t,
            href: n.link || '#',
            ...o,
            onClick: (e) => {
              (n.link || e.preventDefault(), s(e));
            },
            className: (0, h.cn)(
              [
                'relative',
                'h-10 w-full md:w-10 md:group-data-[state=expanded]:w-full',
                'transition-all duration-200',
                'flex items-center rounded',
                'group-data-[state=collapsed]:justify-center',
                'group-data-[state=expanded]:-space-x-2',
                'bg-surface-200',
                'group/item',
                ''.concat(r && '!bg-selection '),
              ],
              o.className
            ),
            children: [
              (0, a.jsx)('span', {
                id: 'icon-link',
                className: (0, h.cn)(
                  'absolute left-0 top-0 flex rounded items-center h-10 w-10 items-center justify-center text-foreground-lighter',
                  'group-hover/item:text-foreground-light',
                  r && '!text-foreground',
                  'transition-colors'
                ),
                ...o,
                children: n.icon,
              }),
              (0, a.jsx)('span', {
                'aria-hidden': i.navigationPanelOpen || void 0,
                className: (0, h.cn)(
                  'min-w-[128px] text-sm text-foreground-light',
                  'group-hover/item:text-foreground',
                  'group-aria-current/item:text-foreground',
                  'absolute left-10 md:left-7 md:group-data-[state=expanded]:left-12',
                  'opacity-100 md:opacity-0 md:group-data-[state=expanded]:opacity-100',
                  ''.concat(r && 'text-foreground text-foreground'),
                  'transition-all'
                ),
                children: n.label,
              }),
            ],
          });
        return c
          ? f
          : (0, a.jsxs)(W.u, {
              children: [
                (0, a.jsx)(W.aJ, { asChild: !0, children: f }),
                (0, a.jsx)(W._v, {
                  side: 'right',
                  children: (0, a.jsx)('span', { children: n.label }),
                }),
              ],
            });
      });
      es.displayName = 'NavigationIconLink';
      var eo = n(73656);
      let ei = 20,
        el = 1.5,
        ec = () => {
          let e = (0, f.useRouter)(),
            { profile: t } = (0, L.Un)(),
            { project: n } = (0, V.d2)(),
            { theme: s, setTheme: o } = (0, E.F)(),
            { ref: i } = (0, r.UO)(),
            c = (0, U.FX)(),
            d = (0, x.WZ)(),
            y = (0, z.QJ)(),
            j = (0, A.cg)(),
            [b, q] = (0, m.useState)(!1),
            [G, X] = (0, m.useState)(!1),
            [Y] = (0, I.l)(p.dA.EXPAND_NAVIGATION_PANEL, !0),
            H = 'test' !== eo.env.NEXT_PUBLIC_NODE_ENV && Y,
            {
              projectAuthAll: en,
              projectEdgeFunctionAll: ea,
              projectStorageAll: er,
              realtimeAll: ec,
            } = (0, S.N)([
              'project_auth:all',
              'project_edge_function:all',
              'project_storage:all',
              'realtime:all',
            ]),
            { data: ed } = (0, P.U)({ projectRef: null == n ? void 0 : n.ref }),
            eu = (null != ed ? ed : []).filter((e) =>
              e.categories.includes('SECURITY')
            ),
            ef = eu.filter((e) => 'ERROR' === e.level),
            em = e.pathname.split('/')[3],
            ep = J(i, n),
            ex = K(i, n, {
              auth: en,
              edgeFunctions: ea,
              storage: er,
              realtime: ec,
            }),
            eh = (0, M.P)('warehouse'),
            eg = $(i, n),
            ey = ee(i, n),
            ej = (e) => {
              d.setNavigationPanelOpen(
                !1,
                'icon-link' === e.target.id ||
                  ['svg', 'path'].includes(e.target.localName)
              );
            },
            ev = (0, a.jsxs)(O.zs, {
              openDelay: 10,
              children: [
                (0, a.jsx)(O.Yi, {
                  asChild: !0,
                  children: (0, a.jsx)(et, {
                    size: 'tiny',
                    type: 'text',
                    icon: (0, a.jsx)(N.Z, { size: ei, strokeWidth: el }),
                    children: 'Commands',
                  }),
                }),
                (0, a.jsxs)(O.bZ, {
                  side: 'right',
                  className: 'w-48 p-1 flex flex-col gap-y-1',
                  children: [
                    (0, a.jsx)(Q, {
                      icon: (0, a.jsx)('div', {
                        className: 'px-1',
                        children: (0, a.jsx)(l.Z, { size: 16 }),
                      }),
                      label: 'Search',
                      shortcut: 'K',
                      onClick: () => {
                        (c(!0), d.setNavigationPanelOpen(!1));
                      },
                    }),
                    (0, a.jsx)(Q, {
                      icon: (0, a.jsx)(B.c, {
                        className:
                          'scale-75 [&>div>div]:border-black dark:[&>div>div]:border-white',
                      }),
                      label: 'Assistant',
                      shortcut: 'I',
                      onClick: () => {
                        d.setAiAssistantPanel({
                          open: !d.aiAssistantPanel.open,
                        });
                      },
                    }),
                  ],
                }),
              ],
            }),
            eb = (0, a.jsx)(g.z, {
              block: !0,
              type: 'text',
              size: 'tiny',
              className: (0, h.cn)(
                'mt-3 h-10 [&>span]:relative [&>span]:flex [&>span]:w-full [&>span]:h-full p-0'
              ),
              children: (0, a.jsxs)('div', {
                className:
                  'relative w-full h-full flex items-center justify-center',
                children: [
                  (0, a.jsx)(D.m, {
                    alt: null == t ? void 0 : t.username,
                    src: null == t ? void 0 : t.profileImageUrl,
                    className: 'absolute left-1.5 w-6 h-6',
                  }),
                  (0, a.jsx)('span', {
                    className: (0, h.cn)(
                      'w-full md:w-[8rem] flex flex-col items-start text-sm truncate',
                      'absolute left-10 md:left-7 group-data-[state=expanded]:left-10',
                      'opacity-100 md:group-data-[state=collapsed]:opacity-0 md:group-data-[state=expanded]:opacity-100',
                      'transition-all'
                    ),
                    children:
                      t &&
                      p.Qy &&
                      (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)('span', {
                            title: t.username,
                            className:
                              'w-full text-left text-foreground truncate',
                            children: t.username,
                          }),
                          t.primary_email !== t.username &&
                            (0, a.jsx)('span', {
                              title: t.primary_email,
                              className:
                                'w-full text-left text-foreground-light text-xs truncate',
                              children: t.primary_email,
                            }),
                        ],
                      }),
                  }),
                ],
              }),
            });
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsxs)('ul', {
                className: 'flex flex-col gap-y-1 justify-start px-2 relative',
                children: [
                  (0, a.jsx)(es, {
                    isActive: k()(em) && !k()(e.query.ref),
                    route: {
                      key: 'HOME',
                      label: 'Home',
                      icon: (0, a.jsx)(v.SK, { size: ei, strokeWidth: el }),
                      link: '/project/'.concat(i),
                      linkElement: (0, a.jsx)(R.I, { projectRef: i }),
                    },
                    onClick: ej,
                    'data-sentry-element': 'NavigationIconLink',
                    'data-sentry-source-file': 'NavigationBar.tsx',
                  }),
                  (0, a.jsx)(T.Z, {
                    className: 'my-1 bg-border-muted',
                    'data-sentry-element': 'Separator',
                    'data-sentry-source-file': 'NavigationBar.tsx',
                  }),
                  ep.map((e) =>
                    (0, a.jsx)(
                      es,
                      { route: e, isActive: em === e.key, onClick: ej },
                      e.key
                    )
                  ),
                  (0, a.jsx)(T.Z, {
                    className: 'my-1 bg-border-muted',
                    'data-sentry-element': 'Separator',
                    'data-sentry-source-file': 'NavigationBar.tsx',
                  }),
                  ex.map((e) =>
                    (0, a.jsx)(
                      es,
                      { route: e, isActive: em === e.key, onClick: ej },
                      e.key
                    )
                  ),
                  (0, a.jsx)(T.Z, {
                    className: 'my-1 bg-border-muted',
                    'data-sentry-element': 'Separator',
                    'data-sentry-source-file': 'NavigationBar.tsx',
                  }),
                  eg.map((e) => {
                    if ('api' === e.key && j)
                      return (0, a.jsx)(
                        et,
                        {
                          onClick: () => {
                            (d.setShowProjectApiDocs(!0),
                              d.setNavigationPanelOpen(!1));
                          },
                          icon: (0, a.jsx)(w.Z, { size: ei, strokeWidth: el }),
                          children: 'Project API',
                        },
                        e.key
                      );
                    if ('advisors' === e.key)
                      return (0, a.jsxs)(
                        'div',
                        {
                          className: 'relative',
                          children: [
                            eu.length > 0 &&
                              (0, a.jsx)('div', {
                                className: (0, h.cn)(
                                  'absolute flex h-2 w-2 left-6 top-2 z-10 rounded-full',
                                  ef.length > 0
                                    ? 'bg-destructive-600'
                                    : 'bg-warning-600'
                                ),
                              }),
                            (0, a.jsx)(es, {
                              route: e,
                              isActive: em === e.key,
                              onClick: ej,
                            }),
                          ],
                        },
                        e.key
                      );
                    if ('logs' !== e.key)
                      return (0, a.jsx)(
                        es,
                        { route: e, isActive: em === e.key, onClick: ej },
                        e.key
                      );
                    {
                      let t = eh ? 'Logs & Analytics' : e.label,
                        n = { ...e, label: t };
                      return (0, a.jsx)(
                        es,
                        { route: n, isActive: em === n.key, onClick: ej },
                        n.key
                      );
                    }
                  }),
                ],
              }),
              (0, a.jsxs)('ul', {
                className: 'flex flex-col px-2 pb-4 md:pb-0 gap-y-1',
                children: [
                  ey.map((e) =>
                    (0, a.jsx)(
                      es,
                      { route: e, isActive: em === e.key, onClick: ej },
                      e.key
                    )
                  ),
                  p.Qy &&
                    (0, a.jsxs)(a.Fragment, {
                      children: [
                        !H &&
                          (0, a.jsxs)(W.u, {
                            children: [
                              (0, a.jsx)(W.aJ, { asChild: !0, children: ev }),
                              (0, a.jsx)(W._v, {
                                side: 'right',
                                children: (0, a.jsx)('span', {
                                  children: 'Commands',
                                }),
                              }),
                            ],
                          }),
                        H && ev,
                      ],
                    }),
                  (0, a.jsxs)(Z.h_, {
                    open: G,
                    onOpenChange: (e) => {
                      (X(e), !1 === e && d.setNavigationPanelOpen(!1));
                    },
                    'data-sentry-element': 'DropdownMenu',
                    'data-sentry-source-file': 'NavigationBar.tsx',
                    children: [
                      H
                        ? (0, a.jsx)(Z.$F, { asChild: !0, children: eb })
                        : (0, a.jsxs)(W.u, {
                            children: [
                              (0, a.jsx)(W.aJ, {
                                asChild: !0,
                                children: (0, a.jsx)(Z.$F, {
                                  asChild: !0,
                                  children: eb,
                                }),
                              }),
                              (0, a.jsx)(W._v, {
                                side: 'right',
                                children: (0, a.jsx)('span', {
                                  children: 'Account settings',
                                }),
                              }),
                            ],
                          }),
                      (0, a.jsxs)(Z.AW, {
                        side: 'top',
                        align: 'start',
                        'data-sentry-element': 'DropdownMenuContent',
                        'data-sentry-source-file': 'NavigationBar.tsx',
                        children: [
                          p.Qy &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)('div', {
                                  className:
                                    'px-2 py-1 flex flex-col gap-0 text-sm',
                                  children:
                                    t &&
                                    (0, a.jsxs)(a.Fragment, {
                                      children: [
                                        (0, a.jsx)('span', {
                                          title: t.username,
                                          className:
                                            'w-full text-left text-foreground truncate',
                                          children: t.username,
                                        }),
                                        t.primary_email !== t.username &&
                                          (0, a.jsx)('span', {
                                            title: t.primary_email,
                                            className:
                                              'w-full text-left text-foreground-light text-xs truncate',
                                            children: t.primary_email,
                                          }),
                                      ],
                                    }),
                                }),
                                (0, a.jsx)(Z.VD, {}),
                                (0, a.jsxs)(Z.Qk, {
                                  children: [
                                    (0, a.jsx)(Z.Xi, {
                                      className: 'flex gap-2',
                                      asChild: !0,
                                      children: (0, a.jsxs)(u(), {
                                        href: '/account/me',
                                        children: [
                                          (0, a.jsx)(_.Z, {
                                            size: 14,
                                            strokeWidth: 1.5,
                                            className:
                                              'text-foreground-lighter',
                                          }),
                                          'Account preferences',
                                        ],
                                      }),
                                    }),
                                    (0, a.jsxs)(Z.Xi, {
                                      className: 'flex gap-2',
                                      onClick: () =>
                                        d.setShowFeaturePreviewModal(!0),
                                      onSelect: () =>
                                        d.setShowFeaturePreviewModal(!0),
                                      children: [
                                        (0, a.jsx)(C.Z, {
                                          size: 14,
                                          strokeWidth: 1.5,
                                          className: 'text-foreground-lighter',
                                        }),
                                        'Feature previews',
                                      ],
                                    }),
                                    (0, a.jsx)(Z.VD, {}),
                                  ],
                                }),
                              ],
                            }),
                          (0, a.jsxs)(Z.Qk, {
                            'data-sentry-element': 'DropdownMenuGroup',
                            'data-sentry-source-file': 'NavigationBar.tsx',
                            children: [
                              (0, a.jsx)(Z.Ju, {
                                'data-sentry-element': 'DropdownMenuLabel',
                                'data-sentry-source-file': 'NavigationBar.tsx',
                                children: 'Theme',
                              }),
                              (0, a.jsx)(Z._x, {
                                value: s,
                                onValueChange: (e) => {
                                  o(e);
                                },
                                'data-sentry-element': 'DropdownMenuRadioGroup',
                                'data-sentry-source-file': 'NavigationBar.tsx',
                                children: F.J.map((e) =>
                                  (0, a.jsx)(
                                    Z.qB,
                                    { value: e.value, children: e.name },
                                    e.value
                                  )
                                ),
                              }),
                            ],
                          }),
                          p.Qy &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)(Z.VD, {}),
                                (0, a.jsx)(Z.Qk, {
                                  children: (0, a.jsx)(Z.Xi, {
                                    onSelect: async () => {
                                      (await y(), await e.push('/sign-in'));
                                    },
                                    children: 'Log out',
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
            ],
          });
        };
      var ed = () => {
          let e = (0, x.WZ)(),
            [t] = (0, I.l)(p.dA.EXPAND_NAVIGATION_PANEL, !0),
            n = 'test' !== eo.env.NEXT_PUBLIC_NODE_ENV && t;
          return (0, a.jsx)('div', {
            className: 'w-14 h-full hidden md:flex flex-col',
            'data-sentry-component': 'NavigationBar',
            'data-sentry-source-file': 'NavigationBar.tsx',
            children: (0, a.jsx)('nav', {
              'data-state': e.navigationPanelOpen ? 'expanded' : 'collapsed',
              className: (0, h.cn)(
                'group py-2 z-10 h-full w-[13rem] md:w-14 md:data-[state=expanded]:w-[13rem]',
                'border-r bg-dash-sidebar border-default data-[state=expanded]:',
                'transition-width duration-200',
                'hide-scrollbar flex flex-col justify-between overflow-y-auto'
              ),
              onMouseEnter: () => n && e.setNavigationPanelOpen(!0),
              onMouseLeave: () => n && e.setNavigationPanelOpen(!1),
              children: (0, a.jsx)(ec, {
                'data-sentry-element': 'NavContent',
                'data-sentry-source-file': 'NavigationBar.tsx',
              }),
            }),
          });
        },
        eu = () => {
          let e = (0, f.useRouter)(),
            [t, n] = (0, m.useState)(!1),
            { ref: s } = (0, r.UO)(),
            o = (0, x.WZ)();
          return (0, a.jsxs)('div', {
            className: 'h-14 w-full flex flex-row md:hidden',
            'data-sentry-component': 'MobileNavigationBar',
            'data-sentry-source-file': 'MobileNavigationBar.tsx',
            children: [
              (0, a.jsxs)('nav', {
                className: (0, h.cn)(
                  'group px-4 z-10 w-full h-14',
                  'border-b bg-dash-sidebar border-default ',
                  'transition-width duration-200',
                  'hide-scrollbar flex flex-row items-center justify-between overflow-x-auto'
                ),
                children: [
                  (0, a.jsx)(u(), {
                    href: p.Qy ? '/projects' : '/project/'.concat(s),
                    className:
                      'flex items-center h-[26px] w-[26px] min-w-[26px]',
                    onClick: (e) => {
                      o.setNavigationPanelOpen(
                        !1,
                        'icon-link' === e.target.id ||
                          ['svg', 'path'].includes(e.target.localName)
                      );
                    },
                    'data-sentry-element': 'Link',
                    'data-sentry-source-file': 'MobileNavigationBar.tsx',
                    children: (0, a.jsx)('img', {
                      alt: 'Supabase',
                      src: ''.concat(e.basePath, '/img/supabase-logo.svg'),
                      className:
                        'absolute h-[26px] w-[26px] cursor-pointer rounded',
                    }),
                  }),
                  (0, a.jsxs)('div', {
                    className: 'flex gap-2',
                    children: [
                      (0, a.jsx)(y.av, {
                        'data-sentry-element': 'CommandMenuTrigger',
                        'data-sentry-source-file': 'MobileNavigationBar.tsx',
                        children: (0, a.jsx)('button', {
                          className: (0, h.cn)(
                            'group',
                            'flex-grow h-[30px] rounded-md',
                            'p-2',
                            'flex items-center justify-between',
                            'bg-transparent border-none text-foreground-lighter',
                            'bg-opacity-100 border-strong text-foreground-light',
                            'focus-visible:!outline-4 focus-visible:outline-offset-1 focus-visible:outline-brand-600',
                            'transition'
                          ),
                          children: (0, a.jsx)('div', {
                            className: 'flex items-center space-x-2',
                            children: (0, a.jsx)(l.Z, {
                              size: 18,
                              strokeWidth: 2,
                              'data-sentry-element': 'Search',
                              'data-sentry-source-file':
                                'MobileNavigationBar.tsx',
                            }),
                          }),
                        }),
                      }),
                      (0, a.jsx)('button', {
                        title: 'Menu dropdown button',
                        className: (0, h.cn)(
                          (0, g.d)({ type: 'default' }),
                          'flex lg:hidden border-default bg-surface-100/75 text-foreground-light rounded-md min-w-[30px] w-[30px] h-[30px] data-[state=open]:bg-overlay-hover/30'
                        ),
                        onClick: () => n(!0),
                        children: (0, a.jsx)(c.Z, {
                          size: 18,
                          strokeWidth: 1,
                          'data-sentry-element': 'Menu',
                          'data-sentry-source-file': 'MobileNavigationBar.tsx',
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(j.Z, {
                open: t,
                onOpenChange: n,
                'data-sentry-element': 'MobileSheetNav',
                'data-sentry-source-file': 'MobileNavigationBar.tsx',
                children: (0, a.jsx)(ec, {
                  'data-sentry-element': 'NavContent',
                  'data-sentry-source-file': 'MobileNavigationBar.tsx',
                }),
              }),
            ],
          });
        },
        ef = (e) => {
          let { children: t, showProductMenu: n } = e,
            { ref: l } = (0, r.UO)();
          return (0, a.jsx)(a.Fragment, {
            children: (0, a.jsx)(V.Ml, {
              projectRef: l,
              'data-sentry-element': 'ProjectContextProvider',
              'data-sentry-source-file': 'DefaultLayout.tsx',
              children: (0, a.jsx)(o.EA, {
                'data-sentry-element': 'AppBannerContextProvider',
                'data-sentry-source-file': 'DefaultLayout.tsx',
                children: (0, a.jsxs)('div', {
                  className: 'flex flex-col h-screen w-screen',
                  children: [
                    (0, a.jsx)(s.l, {
                      'data-sentry-element': 'AppBannerWrapper',
                      'data-sentry-source-file': 'DefaultLayout.tsx',
                    }),
                    (0, a.jsxs)('div', {
                      className: 'flex-shrink-0',
                      children: [
                        (0, a.jsx)(eu, {
                          'data-sentry-element': 'MobileNavigationBar',
                          'data-sentry-source-file': 'DefaultLayout.tsx',
                        }),
                        (0, a.jsx)(i.N, {
                          showProductMenu: n,
                          'data-sentry-element': 'LayoutHeader',
                          'data-sentry-source-file': 'DefaultLayout.tsx',
                        }),
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'flex flex-1 w-full overflow-y-hidden',
                      children: [
                        (0, a.jsx)(ed, {
                          'data-sentry-element': 'NavigationBar',
                          'data-sentry-source-file': 'DefaultLayout.tsx',
                        }),
                        (0, a.jsx)('div', {
                          className: 'flex-grow h-full overflow-y-auto',
                          children: t,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          });
        };
    },
    31316: function (e, t, n) {
      n.d(t, {
        m: function () {
          return c;
        },
      });
      var a = n(97458),
        r = n(51650),
        s = n.n(r),
        o = n(52983),
        i = n(1846),
        l = n(65092);
      let c = (e) => {
        let { alt: t, src: n, placeholder: r, className: c } = e,
          [d, u] = (0, o.useState)(!1);
        return n && !d
          ? (0, a.jsx)(s(), {
              alt: null != t ? t : '',
              src: n,
              width: '24',
              height: '24',
              className: (0, l.cn)('bg-foreground rounded-full', c),
              onError: () => u(!0),
              'data-sentry-element': 'Image',
              'data-sentry-component': 'ProfileImage',
              'data-sentry-source-file': 'ProfileImage.tsx',
            })
          : null != r
            ? r
            : (0, a.jsx)('figure', {
                className: (0, l.cn)(
                  'bg-foreground rounded-full flex items-center justify-center',
                  c
                ),
                children: (0, a.jsx)(i.n5, {
                  size: 18,
                  strokeWidth: 1.5,
                  className: 'text-background',
                }),
              });
      };
    },
    29213: function (e, t, n) {
      var a = n(97458),
        r = n(83145),
        s = n.n(r),
        o = n(52983);
      let i = (0, o.forwardRef)(function (e, t) {
        let { prefetcher: n, children: r, ...i } = e,
          l = (0, o.useRef)(null),
          c = (0, o.useRef)(null);
        function d() {
          let e = Date.now();
          l.current && e - l.current >= 75 && n();
        }
        return (0, a.jsx)(s(), {
          ref: t,
          ...i,
          onMouseEnter: function () {
            ((l.current = Date.now()), (c.current = window.setTimeout(d, 75)));
          },
          onMouseLeave: function () {
            ((l.current = null),
              c.current && (clearTimeout(c.current), (c.current = null)));
          },
          children: r,
        });
      });
      t.Z = i;
    },
    48579: function (e, t, n) {
      n.d(t, {
        Y: function () {
          return m;
        },
      });
      var a = n(97458),
        r = n(36457),
        s = n(32691),
        o = n(52983),
        i = n(88971),
        l = n(58015),
        c = n(33940),
        d = n(83402),
        u = n(92261),
        f = n(29213);
      function m(e) {
        let { href: t, projectRef: n, children: m, ...p } = e,
          x = (function () {
            let e = (0, s.useRouter)(),
              t = (0, r.NL)(),
              { project: n } = (0, i.d2)(),
              [a] = (0, u._)('table-editor-sort', 'alphabetical');
            return (0, o.useCallback)(() => {
              n &&
                (e.prefetch('/project/'.concat(n.ref, '/editor')),
                (0, l.jc)(t, {
                  projectRef: n.ref,
                  connectionString: n.connectionString,
                }).catch(() => {}),
                (0, d.rE)(t, {
                  projectRef: null == n ? void 0 : n.ref,
                  connectionString: null == n ? void 0 : n.connectionString,
                  sort: a,
                  filterTypes: Object.values(c.l),
                }).catch(() => {}));
            }, [a, n, t, e]);
          })();
        return (0, a.jsx)(f.Z, {
          href: t || '/project/'.concat(n, '/editor'),
          prefetcher: x,
          ...p,
          'data-sentry-element': 'PrefetchableLink',
          'data-sentry-component': 'EditorIndexPageLink',
          'data-sentry-source-file': 'project.$ref.editor.tsx',
          children: m,
        });
      }
    },
    50902: function (e, t, n) {
      n.d(t, {
        I: function () {
          return u;
        },
      });
      var a = n(97458),
        r = n(36457),
        s = n(32691),
        o = n(52983),
        i = n(63186),
        l = n(77631),
        c = n(80108),
        d = n(29213);
      function u(e) {
        let { href: t, projectRef: n, children: u, ...f } = e,
          m = (function () {
            let e = (0, s.useRouter)(),
              t = (0, r.NL)();
            return (0, o.useCallback)(
              (n) => {
                let { projectRef: a } = n;
                (e.prefetch('/project/'.concat(a)),
                  (0, c.ft)(t, { ref: a }).catch(() => {}),
                  (0, i.O3)(t, { projectRef: a }).catch(() => {}),
                  (0, l.OU)(t, { projectRef: a, interval: 'hourly' }).catch(
                    () => {}
                  ));
              },
              [t, e]
            );
          })();
        return (0, a.jsx)(d.Z, {
          href: t || '/project/'.concat(n),
          prefetcher: () => m({ projectRef: n }),
          ...f,
          'data-sentry-element': 'PrefetchableLink',
          'data-sentry-component': 'ProjectIndexPageLink',
          'data-sentry-source-file': 'project.$ref.tsx',
          children: u,
        });
      }
    },
    3503: function (e, t, n) {
      n.d(t, {
        B_: function () {
          return y;
        },
        _f: function () {
          return k;
        },
        aG: function () {
          return g;
        },
        av: function () {
          return b;
        },
      });
      var a = n(97458),
        r = n(50497),
        s = n(71770),
        o = n(52983),
        i = n(9060),
        l = n(12436),
        c = n(22114),
        d = n(65092),
        u = n(47482),
        f = n(90839),
        m = n(36210),
        p = n(36406),
        x = n(53496),
        h = n(38788);
      function g(e) {
        let { className: t } = e,
          n = (0, p.Wo)(),
          s = (0, p.yg)();
        if (n)
          return (0, a.jsxs)('button', {
            className: (0, d.cn)(
              'p-2 bg-overlay flex items-center gap-2 text-xs text-foreground-muted',
              t
            ),
            onClick: s,
            'data-sentry-component': 'Breadcrumb',
            'data-sentry-source-file': 'CommandMenu.tsx',
            children: [
              (0, a.jsx)(r.Z, {
                width: 12,
                height: 12,
                'data-sentry-element': 'ArrowLeft',
                'data-sentry-source-file': 'CommandMenu.tsx',
              }),
              n.name,
            ],
          });
      }
      let y = (0, o.forwardRef)((e, t) => {
        let { children: n, className: r, ...s } = e;
        return (0, a.jsx)(u.mY, {
          ref: t,
          className: (0, d.cn)(
            'h-full w-full flex flex-col overflow-hidden',
            '[&_[cmdk-group]]:px-2 [&_[cmdk-group]]:!bg-transparent [&_[cmdk-group-heading]]:!bg-transparent [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-border-stronger [&_[cmdk-input]]:h-12',
            '[&_[cmdk-item]_svg]:h-5',
            '[&_[cmdk-item]_svg]:w-5',
            '[&_[cmdk-item]_svg]:stroke-1',
            '[&_[cmdk-input-wrapper]_svg]:h-5',
            '[&_[cmdk-input-wrapper]_svg]:w-5',
            '[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
            r
          ),
          ...s,
          children: n,
        });
      });
      function j(e) {
        let { resetErrorBoundary: t } = e;
        return (0, a.jsx)('div', {
          className: (0, d.cn)('min-h-64', 'flex items-center justify-center'),
          'data-sentry-component': 'CommandError',
          'data-sentry-source-file': 'CommandMenu.tsx',
          children: (0, a.jsxs)('div', {
            className: 'p-10 flex flex-col items-center gap-6 mt-4',
            children: [
              (0, a.jsx)(s.Z, {
                strokeWidth: 1.5,
                size: 40,
                'data-sentry-element': 'AlertTriangle',
                'data-sentry-source-file': 'CommandMenu.tsx',
              }),
              (0, a.jsx)('p', {
                className: 'text-lg text-center',
                children:
                  "Sorry, looks like we're having some issues with the command menu!",
              }),
              (0, a.jsx)('p', {
                className: 'text-sm text-center',
                children: 'Please try again in a bit.',
              }),
              (0, a.jsx)(f.z, {
                size: 'tiny',
                type: 'secondary',
                onClick: t,
                'data-sentry-element': 'Button',
                'data-sentry-source-file': 'CommandMenu.tsx',
                children: 'Try again?',
              }),
            ],
          }),
        });
      }
      function v(e) {
        let { children: t } = e,
          n = (0, p.EB)();
        return n
          ? (0, a.jsx)(n, {
              'data-sentry-element': 'PageComponent',
              'data-sentry-component': 'PageSwitch',
              'data-sentry-source-file': 'CommandMenu.tsx',
            })
          : (0, a.jsx)(y, {
              'data-sentry-element': 'CommandWrapper',
              'data-sentry-component': 'PageSwitch',
              'data-sentry-source-file': 'CommandMenu.tsx',
              children: t,
            });
      }
      function b(e) {
        let { children: t } = e,
          n = (0, h.Cc)(),
          a = (0, h.FX)(),
          r = o.Children.only(t);
        return r && (0, o.isValidElement)(r)
          ? (0, o.cloneElement)(r, {
              onClick: () => {
                var e, t;
                (a(!n),
                  null === (e = (t = r.props).onOpen) ||
                    void 0 === e ||
                    e.call(t, !n));
              },
              'aria-haspopup': 'dialog',
              'aria-expanded': n,
              'aria-controls': 'command-menu-dialog-content',
              className: (0, d.cn)(
                'h-10 px-4 py-2',
                'inline-flex items-center justify-center',
                'whitespace-nowrap',
                'rounded-md border border-input bg-background',
                'text-sm font-medium',
                'bg-accent text-accent-foreground',
                'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                'transition-colors',
                r.props.className
              ),
            })
          : null;
      }
      function k(e) {
        let { children: t, trigger: n } = e,
          r = (0, h.Cc)(),
          s = (0, h.FX)(),
          u = (0, l.Gc)('sm'),
          f = (0, h.Qd)(),
          g = (0, p.Wo)(),
          y = (0, p.yg)(),
          b = (0, x.a)(),
          k = (0, x.A)(),
          { ref: N } = (function (e) {
            let { toggleOpen: t } = e,
              {
                ref: n,
                handleTouchStart: a,
                handleTouchMove: r,
                handleTouchEnd: s,
              } = (0, c.Z)({ onClose: t }),
              i = (0, h.Gk)(),
              l = (0, o.useMemo)(
                () => ({
                  handleTouchStart: a,
                  handleTouchMove: r,
                  handleTouchEnd: s,
                }),
                [a, r, s]
              );
            return (
              (0, o.useEffect)(() => {
                i(l);
              }, [l]),
              { ref: n }
            );
          })({ toggleOpen: () => s(!r) });
        return (0, a.jsxs)(m.Vq, {
          open: r,
          onOpenChange: s,
          'data-sentry-element': 'Dialog',
          'data-sentry-component': 'CommandMenu',
          'data-sentry-source-file': 'CommandMenu.tsx',
          children: [
            n,
            (0, a.jsx)(m.cZ, {
              id: 'command-menu-dialog-content',
              hideClose: !0,
              forceMount: !0,
              ref: N,
              onOpenAutoFocus: (e) => u && e.preventDefault(),
              onInteractOutside: () => s(!1),
              onEscapeKeyDown: (e) => (
                e.preventDefault(),
                b ? k('') : g ? y() : s(!1)
              ),
              size: f,
              className: (0, d.cn)(
                'relative flex flex-col my-0 mx-auto rounded-t-lg overflow-hidden',
                'h-[85dvh] mt-[15vh] md:max-h-[500px] md:mt-0 left-0 bottom-0 md:bottom-auto',
                '!animate-in !slide-in-from-bottom-[85%] !duration-300',
                'data-[state=closed]:!animate-out data-[state=closed]:!slide-out-to-bottom',
                '!slide-in-from-left-[0%] :!slide-in-from-top-[0%]',
                '!slide-out-to-left-[0%] !slide-out-to-top-[0%]',
                'md:data-[state=open]:!slide-in-from-bottom-[0%] md:data-[state=closed]:!slide-out-to-bottom-[0%]',
                'md:data-[state=open]:!zoom-in-95 md:data-[state=closed]:!zoom-out-95'
              ),
              dialogOverlayProps: {
                className: (0, d.cn)(
                  'overflow-hidden flex data-closed:delay-100'
                ),
              },
              'data-sentry-element': 'DialogContent',
              'data-sentry-source-file': 'CommandMenu.tsx',
              children: (0, a.jsx)(i.SV, {
                FallbackComponent: j,
                'data-sentry-element': 'ErrorBoundary',
                'data-sentry-source-file': 'CommandMenu.tsx',
                children: (0, a.jsx)(v, {
                  'data-sentry-element': 'PageSwitch',
                  'data-sentry-source-file': 'CommandMenu.tsx',
                  children: t,
                }),
              }),
            }),
          ],
        });
      }
      y.displayName = u.mY.displayName;
    },
    83965: function (e, t, n) {
      n.d(t, {
        Yi: function () {
          return l;
        },
        bZ: function () {
          return c;
        },
        zs: function () {
          return i;
        },
      });
      var a = n(97458),
        r = n(36696),
        s = n(52983),
        o = n(65092);
      let i = r.fC,
        l = r.xz,
        c = s.forwardRef((e, t) => {
          let {
            className: n,
            align: s = 'center',
            animate: i = 'zoom-in',
            sideOffset: l = 4,
            ...c
          } = e;
          return (0, a.jsx)(r.h_, {
            children: (0, a.jsx)(r.VY, {
              ref: t,
              align: s,
              sideOffset: l,
              className: (0, o.cn)(
                'z-50 w-64 rounded-md border bg-overlay p-4 text-popover-foreground  outline-none',
                'zoom-in' === i
                  ? 'animate-in zoom-in-[99%]'
                  : 'animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
                n
              ),
              ...c,
            }),
          });
        });
      c.displayName = r.VY.displayName;
    },
    36406: function (e, t, n) {
      n.d(t, {
        EB: function () {
          return u;
        },
        Qy: function () {
          return x;
        },
        SL: function () {
          return f;
        },
        Wo: function () {
          return d;
        },
        yg: function () {
          return m;
        },
      });
      var a = n(85466),
        r = n.n(a),
        s = n(52983),
        o = n(34653),
        i = n(48736),
        l = n(49160),
        c = n(53496);
      let d = () => {
          let { pagesState: e } = (0, i.D)(),
            { commandPages: t, pageStack: n } = (0, o.R)(e),
            a = n.at(-1);
          return (0, s.useMemo)(
            () => (a && t[a] ? { ...t[a], name: a } : void 0),
            [t, a]
          );
        },
        u = () => {
          let e = d();
          if (e && (0, l.sG)(e)) return e.component;
        },
        f = () => {
          let { pagesState: e } = (0, i.D)(),
            t = (0, c.A)();
          return function (n) {
            let a =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            (e.appendPageStack(n), a || t(''));
          };
        },
        m = () => {
          let { pagesState: e } = (0, i.D)(),
            { popPageStack: t } = (0, o.R)(e);
          return t;
        },
        p = [],
        x = function (e, t) {
          let { deps: n = p, enabled: a = !0 } =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            { pagesState: l } = (0, i.D)(),
            { registerNewPage: c } = (0, o.R)(l),
            d = (0, s.useRef)(n),
            u = (0, s.useRef)(a),
            f = (0, s.useRef)();
          ((0, s.useMemo)(() => {
            if (!r()(d.current, n) || u.current !== a) {
              var s;
              (null === (s = f.current) || void 0 === s || s.call(f),
                (f.current = a ? c(e, t) : void 0),
                (d.current = n),
                (u.current = a));
            }
          }, [c, e, t, n, a]),
            (0, s.useEffect)(
              () => (
                (f.current = a ? c(e, t) : void 0),
                () => {
                  var e;
                  return null === (e = f.current) || void 0 === e
                    ? void 0
                    : e.call(f);
                }
              ),
              []
            ));
        };
    },
    53496: function (e, t, n) {
      n.d(t, {
        A: function () {
          return o;
        },
        a: function () {
          return s;
        },
      });
      var a = n(34653),
        r = n(48736);
      let s = () => {
          let { queryState: e } = (0, r.D)(),
            { query: t } = (0, a.R)(e);
          return t;
        },
        o = () => {
          let { queryState: e } = (0, r.D)(),
            { setQuery: t } = (0, a.R)(e);
          return t;
        };
    },
    67112: function (e, t, n) {
      n.d(t, {
        J: function () {
          return a;
        },
      });
      let a = [
        { name: 'Dark', value: 'dark' },
        { name: 'Light', value: 'light' },
        { name: 'Classic Dark', value: 'classic-dark' },
        { name: 'System', value: 'system' },
      ];
    },
  },
]);
