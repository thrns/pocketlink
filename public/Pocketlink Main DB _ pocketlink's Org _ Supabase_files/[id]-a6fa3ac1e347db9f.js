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
      (e._sentryDebugIds[t] = '95120e80-ab30-41a2-87e2-30af5b038dcb'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-95120e80-ab30-41a2-87e2-30af5b038dcb'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6377],
    {
      12832: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return o;
          },
        });
        var r = n(97335),
          a = n.n(r),
          s = function () {
            return (s =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var a in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
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
          l = (function () {
            function e(e) {
              ((this.config = e),
                (this.debounceSingleton = null),
                (this.debounceCache = {}));
            }
            return (
              (e.prototype._createDebouncedFunction = function () {
                var e,
                  t,
                  n = a()(
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
                        var n, r, a, s, i = [], l = 0;
                        l < arguments.length;
                        l++
                      )
                        i[l] = arguments[l];
                      t && t();
                      var o =
                          ((n = e.apply(void 0, i)),
                          (r = null),
                          (a = null),
                          (s = new Promise(function (e, t) {
                            ((r = e), (a = t));
                          })),
                          n &&
                            n.then(
                              function (e) {
                                r && r(e);
                              },
                              function (e) {
                                a && a(e);
                              }
                            ),
                          {
                            promise: s,
                            resolve: function (e) {
                              r && r(e);
                            },
                            reject: function (e) {
                              a && a(e);
                            },
                            cancel: function () {
                              ((r = null), (a = null));
                            },
                          }),
                        c = o.promise;
                      return ((t = o.cancel), c);
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
          o = function (e, t, n) {
            var r = new l({ func: e, wait: t, options: s({}, i, n) });
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
            a = void 0,
            s = void 0,
            i = [];
          return function () {
            var o,
              c = 'function' == typeof t ? t() : t,
              d = new Date().getTime(),
              u = !r || d - r > c;
            r = d;
            for (var f = arguments.length, h = Array(f), m = 0; m < f; m++)
              h[m] = arguments[m];
            if (u && n.leading)
              return n.accumulate
                ? Promise.resolve(e.call(this, [h])).then(function (e) {
                    return e[0];
                  })
                : Promise.resolve(e.call.apply(e, [this].concat(h)));
            if (
              (a
                ? clearTimeout(s)
                : (((o = {}).promise = new Promise(function (e, t) {
                    ((o.resolve = e), (o.reject = t));
                  })),
                  (a = o)),
              i.push(h),
              (s = setTimeout(l.bind(this), c)),
              n.accumulate)
            ) {
              var p = i.length - 1;
              return a.promise.then(function (e) {
                return e[p];
              });
            }
            return a.promise;
          };
          function l() {
            var t = a;
            (clearTimeout(s),
              Promise.resolve(
                n.accumulate ? e.call(this, i) : e.apply(this, i[i.length - 1])
              ).then(t.resolve, t.reject),
              (i = []),
              (a = null));
          }
        };
      },
      93906: function (e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push([
          '/project/[ref]/sql/[id]',
          function () {
            return n(69444);
          },
        ]);
      },
      61803: function (e, t, n) {
        'use strict';
        var r, a;
        n.d(t, {
          EE: function () {
            return r;
          },
          FK: function () {
            return i;
          },
          Ki: function () {
            return l;
          },
          ZE: function () {
            return s;
          },
        });
        let s = {
            TICK: 'hsl(var(--background-overlay-hover))',
            AXIS: 'hsl(var(--background-overlay-hover))',
            GREEN_1: 'hsl(var(--brand-default))',
            GREEN_2: 'hsl(var(--brand-500))',
            RED_1: 'hsl(var(--destructive-default))',
            RED_2: 'hsl(var(--destructive-500))',
          },
          i = (e) =>
            e.map((e) => {
              var t;
              let n = null !== (t = { slate: 11 }[e]) && void 0 !== t ? t : 9;
              return {
                lighter: 'var(--colors-'.concat(e).concat(n - 1, ')'),
                base: 'var(--colors-'.concat(e).concat(n, ')'),
                darker: 'var(--colors-'.concat(e).concat(n + 1, ')'),
              };
            }),
          l = ['brand', 'slate', 'blue', 'yellow', 'indigo'];
        (((a = r || (r = {})).FULL = 'MMM D, YYYY, hh:mma'),
          (a.DATE_ONLY = 'MMM D, YYYY'));
      },
      32875: function (e, t, n) {
        'use strict';
        n.d(t, {
          R: function () {
            return c;
          },
        });
        var r = n(49437),
          a = n(28894),
          s = n(7324),
          i = n(25878);
        let l = r.Z.functions.list();
        async function o(e, t, n) {
          let { projectRef: r, connectionString: a } = e,
            s = new Headers(n),
            { result: o } = await (0, i.R)(
              {
                projectRef: r,
                connectionString: a,
                sql: l.sql,
                queryKey: ['database-functions'],
              },
              t,
              s
            );
          return o;
        }
        let c = function (e) {
          let { projectRef: t, connectionString: n } = e,
            { enabled: r = !0, ...i } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            s.A.databaseFunctions(t),
            (e) => {
              let { signal: r } = e;
              return o({ projectRef: t, connectionString: n }, r);
            },
            { enabled: r && void 0 !== t, ...i }
          );
        };
      },
      20084: function (e, t, n) {
        'use strict';
        n.d(t, {
          u$: function () {
            return c;
          },
        });
        var r = n(28894),
          a = n(25878),
          s = n(87882),
          i = n(7324);
        let l = (e) => {
          let { schemas: t, limit: n = 100 } = e;
          return '\n'
            .concat(
              s.k,
              "\n\nwith records as (\n  select\n    c.oid::int8 as \"id\",\n    case c.relkind\n      when 'r' then pg_temp.pg_get_tabledef(\n        concat(nc.nspname),\n        concat(c.relname),\n        false,\n        'FKEYS_INTERNAL',\n        'NO_TRIGGERS'\n      )\n      when 'v' then concat(\n        'create view ', concat(nc.nspname, '.', c.relname), ' as',\n        pg_get_viewdef(concat(nc.nspname, '.', c.relname), true)\n      )\n      when 'm' then concat(\n        'create materialized view ', concat(nc.nspname, '.', c.relname), ' as',\n        pg_get_viewdef(concat(nc.nspname, '.', c.relname), true)\n      )\n      when 'f' then concat('create foreign table ', nc.nspname, '.', c.relname, ' ( ... )')\n      when 'p' then pg_temp.pg_get_tabledef(\n        concat(nc.nspname),\n        concat(c.relname),\n        false,\n        'FKEYS_INTERNAL',\n        'NO_TRIGGERS'\n      )\n    end as \"sql\"\n  from\n    pg_namespace nc\n    join pg_class c on nc.oid = c.relnamespace\n  where\n    c.relkind in ('r', 'v', 'm', 'f', 'p')\n    and not pg_is_other_temp_schema(nc.oid)\n    and (\n      pg_has_role(c.relowner, 'USAGE')\n      or has_table_privilege(\n        c.oid,\n        'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'\n      )\n      or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')\n    )\n    and nc.nspname IN ("
            )
            .concat(
              t.map((e) => "'".concat(e, "'")).join(', '),
              ')\n  order by c.relname asc\n  limit '
            )
            .concat(
              n,
              "\n  offset 0\n)\nselect\n  jsonb_build_object(\n    'definitions', coalesce(jsonb_agg(\n      jsonb_build_object(\n        'id', r.id,\n        'sql', r.sql\n      )\n    ), '[]'::jsonb)\n  ) \"data\"\nfrom records r;\n  "
            )
            .trim();
        };
        async function o(e, t) {
          let { projectRef: n, connectionString: r, schemas: s, limit: i } = e,
            o = l({ schemas: s, limit: i }),
            { result: c } = await (0, a.R)(
              {
                projectRef: n,
                connectionString: r,
                sql: o,
                queryKey: ['entity-definitions', s],
              },
              t
            );
          return c[0].data.definitions;
        }
        let c = function (e) {
          let { projectRef: t, connectionString: n, schemas: a, limit: s } = e,
            { enabled: l = !0, ...c } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, r.a)(
            i.A.entityDefinitions(t, a),
            (e) => {
              let { signal: r } = e;
              return o(
                { projectRef: t, connectionString: n, schemas: a, limit: s },
                r
              );
            },
            { enabled: l && void 0 !== t && a.length > 0, ...c }
          );
        };
      },
      92563: function (e, t, n) {
        'use strict';
        n.d(t, {
          Kz: function () {
            return o;
          },
        });
        var r = n(28894),
          a = n(25878),
          s = n(7324);
        let i = (e) => {
          let { table: t, schema: n } = e,
            r = [];
          (t && r.push("tablename = '".concat(t, "'")),
            n && r.push("schemaname = '".concat(n, "'")));
          let a = r.length > 0 ? 'WHERE '.concat(r.join(' AND ')) : '';
          return "\n  \n  SELECT\n    tbl.schemaname,\n    tbl.tablename,\n    tbl.quoted_name,\n    tbl.is_table,\n    json_agg(a) as columns\n  FROM\n    (\n      SELECT\n        n.nspname as schemaname,\n        c.relname as tablename,\n        (quote_ident(n.nspname) || '.' || quote_ident(c.relname)) as quoted_name,\n        true as is_table\n      FROM\n        pg_catalog.pg_class c\n        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n      WHERE\n        c.relkind = 'r'\n        AND n.nspname not in ('information_schema', 'pg_catalog', 'pg_toast')\n        AND n.nspname not like 'pg_temp_%'\n        AND n.nspname not like 'pg_toast_temp_%'\n        AND has_schema_privilege(n.oid, 'USAGE') = true\n        AND has_table_privilege(quote_ident(n.nspname) || '.' || quote_ident(c.relname), 'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER') = true\n      union all\n      SELECT\n        n.nspname as schemaname,\n        c.relname as tablename,\n        (quote_ident(n.nspname) || '.' || quote_ident(c.relname)) as quoted_name,\n        false as is_table\n      FROM\n        pg_catalog.pg_class c\n        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n      WHERE\n        c.relkind in ('v', 'm')\n        AND n.nspname not in ('information_schema', 'pg_catalog', 'pg_toast')\n        AND n.nspname not like 'pg_temp_%'\n        AND n.nspname not like 'pg_toast_temp_%'\n        AND has_schema_privilege(n.oid, 'USAGE') = true\n        AND has_table_privilege(quote_ident(n.nspname) || '.' || quote_ident(c.relname), 'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER') = true\n    ) as tbl\n    LEFT JOIN (\n      SELECT\n        attrelid,\n        attname,\n        format_type(atttypid, atttypmod) as data_type,\n        attnum,\n        attisdropped\n      FROM\n        pg_attribute\n    ) as a ON (\n      a.attrelid = tbl.quoted_name::regclass\n      AND a.attnum > 0\n      AND NOT a.attisdropped\n      AND has_column_privilege(tbl.quoted_name, a.attname, 'SELECT, INSERT, UPDATE, REFERENCES')\n    )\n  "
            .concat(
              a,
              '\n  GROUP BY schemaname, tablename, quoted_name, is_table;\n'
            )
            .trim();
        };
        async function l(e, t) {
          let { projectRef: n, connectionString: r, table: s, schema: l } = e,
            o = i({ table: s, schema: l }),
            { result: c } = await (0, a.R)(
              {
                projectRef: n,
                connectionString: r,
                sql: o,
                queryKey: ['table-columns', l, s],
              },
              t
            );
          return c;
        }
        let o = function (e) {
          let { projectRef: t, connectionString: n, schema: a, table: i } = e,
            { enabled: o = !0, ...c } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, r.a)(
            s.A.tableColumns(t, a, i),
            (e) => {
              let { signal: r } = e;
              return l(
                { projectRef: t, connectionString: n, schema: a, table: i },
                r
              );
            },
            { enabled: o && void 0 !== t, ...c }
          );
        };
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
      94791: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('Minus', [
          ['path', { d: 'M5 12h14', key: '1ays0h' }],
        ]);
      },
      36958: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return r;
          },
        });
        let r = (0, n(98266).Z)('RefreshCcw', [
          [
            'path',
            {
              d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8',
              key: '14sxne',
            },
          ],
          ['path', { d: 'M3 3v5h5', key: '1xhq8a' }],
          [
            'path',
            {
              d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16',
              key: '1hlbsb',
            },
          ],
          ['path', { d: 'M16 16h5v5', key: 'ccwih5' }],
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
      5315: function (e, t, n) {
        'use strict';
        var r = n(97458),
          a = n(52983),
          s = n(28977),
          i = n.n(s),
          l = n(72309),
          o = n(71557),
          c = n(35495),
          d = n(97875),
          u = n(21706),
          f = n(98178),
          h = n(3276),
          m = n(98715),
          p = n(61803),
          y = n(30812),
          x = n(5699),
          g = n(54234);
        t.Z = (e) => {
          var t, n, s;
          let {
              data: v,
              yAxisKey: b,
              xAxisKey: j,
              format: w,
              customDateFormat: N = p.EE.FULL,
              title: _,
              highlightedValue: C,
              highlightedLabel: S,
              displayDateInUtc: k,
              minimalHeader: E,
              valuePrecision: R,
              className: L = '',
              size: A = 'normal',
              emptyStateMessage: D,
              onBarClick: T,
              showLegend: I = !1,
              xAxisIsDate: M = !0,
              XAxisProps: O,
              YAxisProps: U,
              showGrid: P = !1,
            } = e,
            { Container: F } = (0, x.D3)(A),
            [z, Z] = (0, a.useState)(null),
            q = O || { interval: v.length - 2, angle: 0, tick: !1 },
            K = U || {
              tickFormatter: (e) => (0, x.V2)(e, R),
              tick: !1,
              width: 0,
            },
            Q = (e) => (k ? i()(e).utc() : i()(e)),
            B = (function () {
              if (!M) {
                var e;
                return z
                  ? null === (e = v[z]) || void 0 === e
                    ? void 0
                    : e[j]
                  : S;
              }
              return (
                (null !== z && v && void 0 !== v[z] && Q(v[z][j]).format(N)) ||
                S
              );
            })(),
            V =
              null !== z
                ? null === (t = v[z]) || void 0 === t
                  ? void 0
                  : t[b]
                : C;
          return 0 === v.length
            ? (0, r.jsx)(g.Z, {
                message: D,
                description: 'It may take up to 24 hours for data to refresh',
                size: A,
                className: L,
                attribute: _,
                format: w,
              })
            : (0, r.jsxs)('div', {
                className: ['flex flex-col gap-y-3', L].join(' '),
                'data-sentry-component': 'BarChart',
                'data-sentry-source-file': 'BarChart.tsx',
                children: [
                  (0, r.jsx)(y.Z, {
                    title: _,
                    format: w,
                    customDateFormat: N,
                    highlightedValue:
                      'number' == typeof V ? (0, x.V2)(V, R) : V,
                    highlightedLabel: B,
                    minimalHeader: E,
                    'data-sentry-element': 'ChartHeader',
                    'data-sentry-source-file': 'BarChart.tsx',
                  }),
                  (0, r.jsx)(F, {
                    'data-sentry-element': 'Container',
                    'data-sentry-source-file': 'BarChart.tsx',
                    children: (0, r.jsxs)(l.v, {
                      data: v,
                      className: 'overflow-visible',
                      onMouseMove: (e) => {
                        e.activeTooltipIndex !== z && Z(e.activeTooltipIndex);
                      },
                      onMouseLeave: () => Z(null),
                      onClick: (e) => {
                        var t, n;
                        let r =
                          null == e
                            ? void 0
                            : null === (n = e.activePayload) || void 0 === n
                              ? void 0
                              : null === (t = n[0]) || void 0 === t
                                ? void 0
                                : t.payload;
                        T && T(r, e);
                      },
                      'data-sentry-element': 'RechartBarChart',
                      'data-sentry-source-file': 'BarChart.tsx',
                      children: [
                        I && (0, r.jsx)(o.D, {}),
                        P && (0, r.jsx)(c.q, { stroke: p.ZE.AXIS }),
                        (0, a.createElement)(d.B, {
                          ...K,
                          axisLine: { stroke: p.ZE.AXIS },
                          tickLine: { stroke: p.ZE.AXIS },
                          key: b,
                          'data-sentry-element': 'YAxis',
                          'data-sentry-source-file': 'BarChart.tsx',
                        }),
                        (0, a.createElement)(u.K, {
                          ...q,
                          axisLine: { stroke: p.ZE.AXIS },
                          tickLine: { stroke: p.ZE.AXIS },
                          key: j,
                          'data-sentry-element': 'XAxis',
                          'data-sentry-source-file': 'BarChart.tsx',
                        }),
                        (0, r.jsx)(f.u, {
                          content: () => null,
                          'data-sentry-element': 'Tooltip',
                          'data-sentry-source-file': 'BarChart.tsx',
                        }),
                        (0, r.jsx)(h.$, {
                          dataKey: b,
                          fill: p.ZE.GREEN_1,
                          animationDuration: 300,
                          maxBarSize: 48,
                          'data-sentry-element': 'Bar',
                          'data-sentry-source-file': 'BarChart.tsx',
                          children:
                            null == v
                              ? void 0
                              : v.map((e, t) =>
                                  (0, r.jsx)(
                                    m.b,
                                    {
                                      className:
                                        'transition-all duration-300 '.concat(
                                          T ? 'cursor-pointer' : ''
                                        ),
                                      fill:
                                        z === t || null === z
                                          ? p.ZE.GREEN_1
                                          : p.ZE.GREEN_2,
                                      enableBackground: 12,
                                    },
                                    'cell-'.concat(t)
                                  )
                                ),
                        }),
                      ],
                    }),
                  }),
                  v &&
                    (0, r.jsxs)('div', {
                      className:
                        'text-foreground-lighter -mt-9 flex items-center justify-between text-xs',
                      children: [
                        (0, r.jsx)('span', {
                          children: M ? Q(v[0][j]).format(N) : v[0][j],
                        }),
                        (0, r.jsx)('span', {
                          children: M
                            ? Q(
                                null ===
                                  (n =
                                    v[(null == v ? void 0 : v.length) - 1]) ||
                                  void 0 === n
                                  ? void 0
                                  : n[j]
                              ).format(N)
                            : null ===
                                  (s =
                                    v[(null == v ? void 0 : v.length) - 1]) ||
                                void 0 === s
                              ? void 0
                              : s[j],
                        }),
                      ],
                    }),
                ],
              });
        };
      },
      30812: function (e, t, n) {
        'use strict';
        var r = n(97458);
        t.Z = (e) => {
          let {
              format: t,
              highlightedValue: n,
              highlightedLabel: a,
              title: s,
              minimalHeader: i = !1,
            } = e,
            l = (0, r.jsx)('h3', {
              className:
                'text-foreground-lighter ' + (i ? 'text-xs' : 'text-sm'),
              children: s,
            }),
            o = (0, r.jsxs)('h5', {
              className: 'text-foreground text-xl  '.concat(
                i ? 'text-base' : 'text-2xl'
              ),
              children: [
                void 0 !== n && String(n),
                'seconds' === t ? ' ' : '',
                (0, r.jsx)('span', {
                  className: 'text-lg',
                  children: 'function' == typeof t ? t(n) : t,
                }),
              ],
            }),
            c = (0, r.jsx)('h5', {
              className: 'text-foreground-lighter text-xs',
              children: a,
            });
          return i
            ? (0, r.jsxs)('div', {
                className: 'flex flex-row items-center gap-x-4',
                style: { minHeight: '1.8rem' },
                children: [
                  s && l,
                  (0, r.jsxs)('div', {
                    className: 'flex flex-row items-baseline gap-x-2',
                    children: [void 0 !== n && o, c],
                  }),
                ],
              })
            : (0, r.jsxs)('div', {
                className: 'h-16',
                'data-sentry-component': 'ChartHeader',
                'data-sentry-source-file': 'ChartHeader.tsx',
                children: [s && l, void 0 !== n && o, c],
              });
        };
      },
      5699: function (e, t, n) {
        'use strict';
        n.d(t, {
          Bh: function () {
            return h;
          },
          D3: function () {
            return p;
          },
          Hx: function () {
            return m;
          },
          V2: function () {
            return u;
          },
          ww: function () {
            return y;
          },
        });
        var r = n(97458),
          a = n(28977),
          s = n.n(a),
          i = n(13516),
          l = n.n(i),
          o = n(52983),
          c = n(59301),
          d = n(61803);
        s().extend(l());
        let u = function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 2;
            return f(e) ? h(e, t) : e.toLocaleString();
          },
          f = (e) => String(e).includes('.'),
          h = (e, t) => {
            if (!f(e)) return e.toLocaleString() + '.' + '0'.repeat(t);
            {
              let [n, r] = String(e).split('.');
              return Number(n).toLocaleString() + '.' + r.slice(0, t);
            }
          },
          m = function (e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : d.EE.FULL,
              n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return n ? s().utc(e).format(t) : s()(e).format(t);
          },
          p = function () {
            let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 'normal',
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : { tiny: 76, small: 96, normal: 160, large: 280 },
              n = t[e];
            return {
              Container: (0, o.useMemo)(
                () => (e) => {
                  let { children: t } = e;
                  return (0, r.jsx)(c.h, {
                    height: n,
                    minHeight: n,
                    width: '100%',
                    children: t,
                  });
                },
                [e]
              ),
              minHeight: n,
            };
          },
          y = (e) => {
            let {
                data: t,
                xAxisKey: n,
                yAxisKey: r,
                stackKey: a,
                variant: s = 'values',
              } = e,
              i = (0, o.useMemo)(
                () =>
                  t
                    ? Object.entries(
                        t.reduce((e, t) => {
                          let s = t[n],
                            i = t[r],
                            l = t[a];
                          return (e[s] || (e[s] = {}), (e[s][l] = i), e);
                        }, {})
                      ).map((e) => {
                        let [t, r] = e;
                        return {
                          ...r,
                          [n]: Number.isNaN(Number(t)) ? t : Number(t),
                        };
                      })
                    : [],
                [JSON.stringify(t)]
              ),
              l = (0, o.useMemo)(
                () =>
                  Object.keys(i[0] || {})
                    .filter((e) => e !== n && e !== r)
                    .sort(),
                [JSON.stringify(i[0] || {})]
              ),
              c = (0, o.useMemo)(() => {
                if ('percentages' === s)
                  return i.map((e) => {
                    let t = Object.entries(e),
                      n = t
                        .filter((e) => {
                          let [t, n] = e;
                          return l.includes(t);
                        })
                        .reduce((e, t) => {
                          let [n, r] = t;
                          return e + r;
                        }, 0);
                    return t.reduce((e, t) => {
                      let [r, a] = t;
                      return l.includes(r)
                        ? { ...e, [r]: 0 !== a ? a / n : 0 }
                        : { ...e, [r]: a };
                    }, {});
                  });
              }, [JSON.stringify(i)]);
            return { dataKeys: l, stackedData: i, percentagesStackedData: c };
          };
      },
      54234: function (e, t, n) {
        'use strict';
        var r = n(97458),
          a = n(67297),
          s = n(65092),
          i = n(30812),
          l = n(5699);
        t.Z = (e) => {
          let {
              attribute: t,
              message: n = 'No data to show',
              description: o,
              format: c,
              className: d = '',
              size: u,
            } = e,
            { minHeight: f } = (0, l.D3)(u);
          return (0, r.jsxs)('div', {
            'data-sentry-component': 'NoDataPlaceholder',
            'data-sentry-source-file': 'NoDataPlaceholder.tsx',
            children: [
              void 0 !== t &&
                (0, r.jsx)(i.Z, { title: t, format: c, highlightedValue: 0 }),
              (0, r.jsxs)('div', {
                className: (0, s.cn)(
                  'border-control flex flex-grow w-full flex-col items-center justify-center space-y-2 border border-dashed text-center',
                  d
                ),
                style: { minHeight: f + 20 },
                children: [
                  (0, r.jsx)(a.Z, {
                    size: 20,
                    className: 'text-border-stronger',
                    'data-sentry-element': 'BarChart2',
                    'data-sentry-source-file': 'NoDataPlaceholder.tsx',
                  }),
                  (0, r.jsxs)('div', {
                    className: 'px-1',
                    children: [
                      (0, r.jsx)('p', {
                        className: 'text-foreground-light text-xs',
                        children: n,
                      }),
                      o &&
                        (0, r.jsx)('p', {
                          className: 'text-foreground-lighter text-xs',
                          children: o,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
      },
      71410: function (e, t, n) {
        'use strict';
        n.d(t, {
          z: function () {
            return m;
          },
        });
        var r = n(97458),
          a = n(98601),
          s = n(29790),
          i = n(57304),
          l = n(81307),
          o = n(52983),
          c = n(84012),
          d = n(34549),
          u = n(45536),
          f = n(14500),
          h = n(90839);
        let m = (e) => {
          let {
              type: t = 'default',
              align: n = 'start',
              results: m,
              fileName: p,
              onCopyAsMarkdown: y,
              onCopyAsJSON: x,
            } = e,
            g = (0, o.useRef)(null),
            v = m.map((e) => {
              let t = { ...e };
              return (
                Object.keys(e).forEach((n) => {
                  'object' == typeof e[n] && (t[n] = JSON.stringify(e[n]));
                }),
                t
              );
            }),
            b = (0, o.useMemo)(() => {
              if (m) {
                let e = Array.from(m)[0];
                if (e) return Object.keys(e);
              }
            }, [m]);
          return (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsxs)(f.h_, {
                'data-sentry-element': 'DropdownMenu',
                'data-sentry-source-file': 'DownloadResultsButton.tsx',
                children: [
                  (0, r.jsx)(f.$F, {
                    asChild: !0,
                    'data-sentry-element': 'DropdownMenuTrigger',
                    'data-sentry-source-file': 'DownloadResultsButton.tsx',
                    children: (0, r.jsx)(h.z, {
                      type: t,
                      iconRight: (0, r.jsx)(a.Z, {}),
                      disabled: 0 === m.length,
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'DownloadResultsButton.tsx',
                      children: 'Export',
                    }),
                  }),
                  (0, r.jsxs)(f.AW, {
                    align: n,
                    className: 'w-44',
                    'data-sentry-element': 'DropdownMenuContent',
                    'data-sentry-source-file': 'DownloadResultsButton.tsx',
                    children: [
                      (0, r.jsxs)(f.Xi, {
                        className: 'gap-x-2',
                        onClick: () => {
                          var e;
                          (null === (e = g.current) ||
                            void 0 === e ||
                            e.link.click(),
                            d.Am.success('Downloading results as CSV'));
                        },
                        'data-sentry-element': 'DropdownMenuItem',
                        'data-sentry-source-file': 'DownloadResultsButton.tsx',
                        children: [
                          (0, r.jsx)(s.Z, {
                            size: 14,
                            'data-sentry-element': 'Download',
                            'data-sentry-source-file':
                              'DownloadResultsButton.tsx',
                          }),
                          (0, r.jsx)('p', { children: 'Download CSV' }),
                        ],
                      }),
                      (0, r.jsxs)(f.Xi, {
                        onClick: () => {
                          if (navigator) {
                            0 == v.length && (0, d.Am)('Results are empty');
                            let e = Object.keys(v[0]),
                              t = v.map((t) => {
                                let n = [];
                                return (e.forEach((e) => n.push(t[e])), n);
                              }),
                              n = [e].concat(t),
                              r = (0, l.x)(n);
                            (0, u.vQ)(r, () => {
                              (d.Am.success('Copied results to clipboard'),
                                null == y || y());
                            });
                          }
                        },
                        className: 'gap-x-2',
                        'data-sentry-element': 'DropdownMenuItem',
                        'data-sentry-source-file': 'DownloadResultsButton.tsx',
                        children: [
                          (0, r.jsx)(i.Z, {
                            size: 14,
                            'data-sentry-element': 'Clipboard',
                            'data-sentry-source-file':
                              'DownloadResultsButton.tsx',
                          }),
                          (0, r.jsx)('p', { children: 'Copy as markdown' }),
                        ],
                      }),
                      (0, r.jsxs)(f.Xi, {
                        onClick: () => {
                          if (navigator) {
                            if (0 === m.length)
                              return (0, d.Am)('Results are empty');
                            (0, u.vQ)(JSON.stringify(m, null, 2), () => {
                              (d.Am.success('Copied results to clipboard'),
                                null == x || x());
                            });
                          }
                        },
                        className: 'gap-x-2',
                        'data-sentry-element': 'DropdownMenuItem',
                        'data-sentry-source-file': 'DownloadResultsButton.tsx',
                        children: [
                          (0, r.jsx)(i.Z, {
                            size: 14,
                            'data-sentry-element': 'Clipboard',
                            'data-sentry-source-file':
                              'DownloadResultsButton.tsx',
                          }),
                          (0, r.jsx)('p', { children: 'Copy as JSON' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, r.jsx)(c.CSVLink, {
                ref: g,
                className: 'hidden',
                headers: b,
                data: v,
                filename: ''.concat(p, '.csv'),
                'data-sentry-element': 'CSVLink',
                'data-sentry-source-file': 'DownloadResultsButton.tsx',
              }),
            ],
          });
        };
      },
      69444: function (e, t, n) {
        'use strict';
        (n.r(t),
          n.d(t, {
            default: function () {
              return ta;
            },
          }));
        var r = n(97458),
          a = n(32691),
          s = n(52983),
          i = n(34243),
          l = n(36457),
          o = n(42019),
          c = n(59171),
          d = n(16402),
          u = n(52675),
          f = n(33342),
          h = n(37393),
          m = n(34583),
          p = n.n(m),
          y = n(34549),
          x = n(12436),
          g = n(30457),
          v = n(17212),
          b = n(92797),
          j = n(20084),
          w = n(6464),
          N = n(3190),
          _ = n(2343),
          C = n(66802),
          S = n(69951),
          k = n(82288),
          E = n(18293),
          R = n(87313),
          L = n(75541),
          A = n(62432),
          D = n(37756),
          T = n(37462),
          I = n(45536),
          M = n(81514),
          O = n(99492),
          U = n(86186),
          P = n(619),
          F = n(24561),
          z = n(49825),
          Z = n(89429),
          q = n(65092),
          K = n(40577),
          Q = n(14500),
          B = n(90839),
          V = n(45437),
          G = n(51571);
        let W = (e) => {
          let {
            value: t,
            onChange: n,
            onSubmit: a,
            onAccept: i,
            onReject: l,
            isDiffVisible: o,
            isLoading: c = !1,
          } = e;
          (0, I.fV)();
          let d = (0, s.useCallback)((e) => {
              setTimeout(() => {
                null == e || e.focus();
              }, 0);
            }, []),
            u = () => {
              t.trim() && !c && a(t);
            };
          return (0, r.jsxs)('div', {
            className:
              'overflow-hidden rounded-md p-0 bg-popover border border-foreground/20 focus-within:border-foreground/30  text-sm max-w-xl',
            'data-sentry-component': 'AskAIWidget',
            'data-sentry-source-file': 'AskAIWidget.tsx',
            children: [
              (0, r.jsx)(G.Z, {
                inputRef: d,
                size: 'xlarge',
                inputClassName:
                  'bg-transparent border-none shadow-none gap-4 text-xs focus-visible:outline-none focus-visible:ring-0 py-2 pl-3',
                placeholder: o
                  ? 'Make an edit...'
                  : 'Edit SQL via the Assistant...',
                autoFocus: !0,
                value: t,
                onChange: (e) => n(e.target.value),
                onKeyDown: (e) => {
                  'Enter' !== e.key || e.metaKey || e.ctrlKey || u();
                },
                disabled: c,
                'data-sentry-element': 'Input',
                'data-sentry-source-file': 'AskAIWidget.tsx',
              }),
              o &&
                (0, r.jsxs)('div', {
                  className: 'flex justify-start p-0 border-t',
                  children: [
                    (0, r.jsxs)(B.z, {
                      type: 'text',
                      onClick: i,
                      className:
                        'text-xs h-auto py-1 rounded-none px-3 border-r-border',
                      disabled: c,
                      children: [
                        'Accept ',
                        (0, r.jsx)('span', {
                          className: 'text-xs text-foreground-light',
                          children: '⌘ + Enter',
                        }),
                      ],
                    }),
                    (0, r.jsxs)(B.z, {
                      onClick: l,
                      type: 'text',
                      className:
                        'text-xs h-auto py-1 rounded-none px-3 border-r-border',
                      disabled: c,
                      children: [
                        'Reject ',
                        (0, r.jsx)('span', {
                          className: 'text-xs text-foreground-light',
                          children: 'Esc',
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          });
        };
        var H = n(97008),
          X = n(63730),
          Y = (e) => {
            let {
                children: t,
                editor: n,
                id: r,
                beforeLineNumber: a,
                afterLineNumber: i = 0,
                heightInLines: l = 1,
              } = e,
              o = null != a ? a : i,
              c = ''.concat(r, '-').concat(o.toString()),
              d = (0, s.useMemo)(() => document.createElement('div'), []),
              u = 'getModifiedEditor' in n ? n.getModifiedEditor() : n;
            return (
              (0, s.useEffect)(() => {
                let e;
                let t = 0,
                  n = 0,
                  s = {
                    getId: () => r,
                    getDomNode: () => d,
                    getPosition: () => null,
                  },
                  o = () => {
                    let e = u.getLayoutInfo();
                    e &&
                      ((d.style.left = ''.concat(e.contentLeft, 'px')),
                      (d.style.top = ''.concat(t, 'px')),
                      (d.style.width = ''.concat(
                        e.width - e.contentLeft,
                        'px'
                      )),
                      (d.style.height = ''.concat(n, 'px')));
                  };
                return (
                  u.changeViewZones((r) => {
                    ((e = r.addZone({
                      afterLineNumber: null != a ? a : i,
                      heightInLines: l,
                      domNode: document.createElement('div'),
                      onDomNodeTop: (e) => {
                        ((t = e), o());
                      },
                      onComputedHeight: (e) => {
                        ((n = e), o());
                      },
                    })),
                      u.addOverlayWidget(s));
                  }),
                  () => {
                    u.changeViewZones((t) => {
                      (t.removeZone(e), u.removeOverlayWidget(s));
                    });
                  }
                );
              }, [u, r, a, i, l, d]),
              (0, X.createPortal)(t, d, c)
            );
          },
          J = n(11221),
          $ = n(32002);
        let ee = (e) => {
          let {
            visible: t,
            hasDestructiveOperations: n,
            hasUpdateWithoutWhere: a,
            onCancel: s,
            onConfirm: i,
          } = e;
          return (0, r.jsxs)($.Z, {
            visible: t,
            size: 'large',
            title: 'Potential issue'.concat(
              n && a ? 's' : '',
              ' detected with your query'
            ),
            confirmLabel: 'Run this query',
            variant: 'warning',
            alert: {
              base: { variant: 'warning' },
              title:
                n && a
                  ? 'The following potential issues have been detected:'
                  : 'The following potential issue has been detected:',
              description:
                'Ensure that these are intentional before executing this query',
            },
            onCancel: s,
            onConfirm: i,
            'data-sentry-element': 'ConfirmationModal',
            'data-sentry-component': 'RunQueryWarningModal',
            'data-sentry-source-file': 'RunQueryWarningModal.tsx',
            children: [
              (0, r.jsx)('div', {
                className: 'text-sm',
                children: (0, r.jsxs)('ul', {
                  className: 'border rounded-md grid bg-surface-200',
                  children: [
                    n &&
                      (0, r.jsxs)('li', {
                        className: 'grid pt-3 pb-2 px-4',
                        children: [
                          (0, r.jsx)('span', {
                            className: 'font-bold',
                            children: 'Query has destructive operation',
                          }),
                          (0, r.jsx)('span', {
                            className: 'text-foreground-lighter',
                            children:
                              'Make sure you are not accidentally removing something important.',
                          }),
                        ],
                      }),
                    n && a && (0, r.jsx)(J.Z, {}),
                    a &&
                      (0, r.jsxs)('li', {
                        className: 'grid pt-2 pb-3 px-4 gap-1',
                        children: [
                          (0, r.jsx)('span', {
                            className: 'font-bold',
                            children:
                              'Query uses update without a where clause',
                          }),
                          (0, r.jsxs)('span', {
                            className: 'text-foreground-lighter',
                            children: [
                              'Without a ',
                              (0, r.jsx)('code', {
                                className: 'text-xs',
                                children: 'where',
                              }),
                              ' clause, this could update all rows in the table.',
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              (0, r.jsx)('p', {
                className: 'mt-4 text-sm text-foreground-light',
                children:
                  'Please confirm that you would like to execute this query.',
              }),
            ],
          });
        };
        var et = n(44840),
          en = n(22851),
          er = n(76689),
          ea = n(88971),
          es = n(51497);
        function ei(e) {
          return e.replace(/^\"/, '').replace(/\"$/, '').replace(/\"\"/, '"');
        }
        function el(e) {
          return e != e.toLowerCase() ? '"'.concat(e, '"') : e;
        }
        var eo = n(32875),
          ec = n(28894),
          ed = n(25878),
          eu = n(7324);
        let ef = () => '\nSELECT word FROM pg_get_keywords();\n'.trim();
        async function eh(e, t) {
          let { projectRef: n, connectionString: r } = e,
            a = ef(),
            { result: s } = await (0, ed.R)(
              {
                projectRef: n,
                connectionString: r,
                sql: a,
                queryKey: ['keywords'],
              },
              t
            );
          return s.map((e) => e.word.toLocaleLowerCase());
        }
        let em = function (e) {
          let { projectRef: t, connectionString: n } = e,
            { enabled: r = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, ec.a)(
            eu.A.keywords(t),
            (e) => {
              let { signal: r } = e;
              return eh({ projectRef: t, connectionString: n }, r);
            },
            { enabled: r && void 0 !== t, ...a }
          );
        };
        var ep = n(58015),
          ey = n(92563),
          ex = n(92261);
        let eg = (e, t) => {
          let { project: n } = (0, ea.d2)(),
            r = (0, z.B0)(),
            [a] = (0, ex.l)(D.dA.SQL_EDITOR_INTELLISENSE, !0),
            { data: i, isSuccess: l } = em(
              {
                projectRef: null == n ? void 0 : n.ref,
                connectionString: null == n ? void 0 : n.connectionString,
              },
              { enabled: a }
            ),
            { data: o, isSuccess: c } = (0, eo.R)(
              {
                projectRef: null == n ? void 0 : n.ref,
                connectionString: null == n ? void 0 : n.connectionString,
              },
              { enabled: a }
            ),
            { data: d, isSuccess: u } = (0, ep.Q1)(
              {
                projectRef: null == n ? void 0 : n.ref,
                connectionString: null == n ? void 0 : n.connectionString,
              },
              { enabled: a }
            ),
            { data: f, isSuccess: h } = (0, ey.Kz)(
              {
                projectRef: null == n ? void 0 : n.ref,
                connectionString: null == n ? void 0 : n.connectionString,
              },
              { enabled: a }
            ),
            m = (0, s.useRef)(null),
            p = a && h && u && l && c;
          (p &&
            (null === m.current && (m.current = {}),
            (m.current.tableColumns = f),
            (m.current.schemas = d),
            (m.current.keywords = i),
            (m.current.functions = o)),
            (0, s.useEffect)(() => {
              if (t) {
                let n = t.languages.registerDocumentFormattingEditProvider(
                  'pgsql',
                  {
                    async provideDocumentFormattingEdits(t) {
                      let n = t.getValue(),
                        a = (0, T._)(n);
                      return (
                        e && r.setSql(e, a),
                        [{ range: t.getFullModelRange(), text: a }]
                      );
                    },
                  }
                );
                return () => n.dispose();
              }
            }, [t]),
            (0, s.useEffect)(() => {
              let e = null,
                n = null;
              return (
                p &&
                  t &&
                  p &&
                  ((e = t.languages.registerCompletionItemProvider('pgsql', {
                    triggerCharacters: [' ', '.', '"'],
                    provideCompletionItems: function (e, n, r) {
                      try {
                        let a = new es.Z(e, n.column - 2, n.lineNumber - 1);
                        if ('"' === r.triggerCharacter)
                          return (function (e, t, n) {
                            let r = [];
                            if (!n.isFowardDQuote()) return { suggestions: r };
                            if ((n.next(), n.isNextPeriod())) {
                              let a = n.readIdent(),
                                s = !1;
                              a.match(/^\".*?\"$/) && ((s = !0), (a = ei(a)));
                              let i = t.current.tableColumns.find(
                                (e) =>
                                  (s && e.tablename === a) ||
                                  (!s &&
                                    e.tablename.toLocaleLowerCase() ==
                                      a.toLocaleLowerCase())
                              );
                              if (!i) return { suggestions: r };
                              i.columns.forEach((t) => {
                                r.push({
                                  label: t.attname,
                                  kind: e.languages.CompletionItemKind.Property,
                                  detail: t.data_type,
                                  insertText: t.attname,
                                });
                              });
                            } else
                              t.current.tableColumns.forEach((t) => {
                                r.push({
                                  label: t.tablename,
                                  kind: e.languages.CompletionItemKind.Class,
                                  insertText: t.tablename,
                                });
                              });
                            return { suggestions: r };
                          })(t, m, a);
                        if ('.' === r.triggerCharacter)
                          return (function (e, t, n) {
                            let r = [],
                              a = n.readIdents(3).map((e) => {
                                let t = !1;
                                return (
                                  e.match(/^\".*?\"$/) &&
                                    ((t = !0), (e = ei(e))),
                                  { isQuoted: t, name: e }
                                );
                              }),
                              s = 0,
                              i = t.current.schemas.find((e) => {
                                var t, n;
                                let r = a && a.length > s ? a[s] : {};
                                return (
                                  (r.isQuoted && e.name === r.name) ||
                                  (!r.isQuoted &&
                                    (null === (t = e.name) || void 0 === t
                                      ? void 0
                                      : t.toLocaleLowerCase()) ==
                                      (null === (n = r.name) || void 0 === n
                                        ? void 0
                                        : n.toLocaleLowerCase()))
                                );
                              });
                            if (
                              (i
                                ? s++
                                : (i = t.current.schemas.find(
                                    (e) => 'public' == e.name
                                  )),
                              a.length == s)
                            )
                              return (
                                t.current.tableColumns.forEach((t) => {
                                  t.schemaname == i.name &&
                                    r.push({
                                      label: t.tablename,
                                      kind: e.languages.CompletionItemKind
                                        .Class,
                                      detail:
                                        'public' !== t.schemaname
                                          ? t.schemaname
                                          : null,
                                      insertText: el(t.tablename),
                                    });
                                }),
                                { suggestions: r }
                              );
                            let l = t.current.tableColumns.find((e) => {
                              var t, n;
                              let r = a && a.length > s ? a[s] : {};
                              return (
                                (e.schemaname == i.name &&
                                  r.isQuoted &&
                                  e.tablename === r.name) ||
                                (!r.isQuoted &&
                                  (null === (t = e.tablename) || void 0 === t
                                    ? void 0
                                    : t.toLocaleLowerCase()) ==
                                    (null === (n = r.name) || void 0 === n
                                      ? void 0
                                      : n.toLocaleLowerCase()))
                              );
                            });
                            return (
                              l &&
                                l.columns.forEach((t) => {
                                  r.push({
                                    label: t.attname,
                                    kind: e.languages.CompletionItemKind
                                      .Property,
                                    detail: t.data_type,
                                    insertText: el(t.attname),
                                  });
                                }),
                              { suggestions: r }
                            );
                          })(t, m, a);
                        return (function (e, t) {
                          var n, r, a, s;
                          let i = [];
                          return (
                            (null === (n = t.current.keywords) || void 0 === n
                              ? void 0
                              : n.length) > 0 &&
                              t.current.keywords.forEach((t) => {
                                i.push({
                                  label: t,
                                  kind: e.languages.CompletionItemKind.Keyword,
                                  insertText: t,
                                });
                              }),
                            (null === (r = t.current.schemas) || void 0 === r
                              ? void 0
                              : r.length) > 0 &&
                              t.current.schemas.forEach((t) => {
                                i.push({
                                  label: t.name,
                                  kind: e.languages.CompletionItemKind.Keyword,
                                  insertText: t.name,
                                });
                              }),
                            (null === (a = t.current.tableColumns) ||
                            void 0 === a
                              ? void 0
                              : a.length) > 0 &&
                              t.current.tableColumns.forEach((t) => {
                                let n =
                                  'public' == t.schemaname
                                    ? t.tablename
                                    : t.schemaname + '.' + t.tablename;
                                (i.push({
                                  label: t.tablename,
                                  detail:
                                    'public' !== t.schemaname
                                      ? t.schemaname
                                      : null,
                                  kind: t.is_table
                                    ? e.languages.CompletionItemKind.Class
                                    : e.languages.CompletionItemKind.Interface,
                                  insertText: el(n),
                                }),
                                  t.columns.forEach((n) => {
                                    if (!n) return;
                                    let r = i.find(
                                      (t) =>
                                        t.label ===
                                          (null == n ? void 0 : n.attname) &&
                                        t.kind ===
                                          e.languages.CompletionItemKind
                                            .Field &&
                                        t.detail ===
                                          (null == n ? void 0 : n.data_type)
                                    );
                                    r
                                      ? (r.tables.push(t.tablename),
                                        r.tables.sort(),
                                        (r.documentation = r.tables.join(', ')))
                                      : i.push({
                                          label: n.attname,
                                          kind: e.languages.CompletionItemKind
                                            .Field,
                                          detail: n.data_type,
                                          documentation: t.tablename,
                                          tables: [t.tablename],
                                          insertText: el(n.attname),
                                        });
                                  }));
                              }),
                            (null === (s = t.current.functions) || void 0 === s
                              ? void 0
                              : s.length) > 0 &&
                              t.current.functions.forEach((t) => {
                                i.push({
                                  label: t.name,
                                  kind: e.languages.CompletionItemKind.Function,
                                  detail: t.return_type,
                                  insertText: t.name,
                                });
                              }),
                            { suggestions: i }
                          );
                        })(t, m);
                      } catch (e) {
                        return { suggestions: [] };
                      }
                    },
                  })),
                  (n = t.languages.registerSignatureHelpProvider('pgsql', {
                    signatureHelpTriggerCharacters: ['(', ','],
                    provideSignatureHelp: function (e, t) {
                      let n = new es.Z(e, t.column - 2, t.lineNumber - 1),
                        r = n.readArguments();
                      if (r < 0) return null;
                      let a = n.readIdent();
                      if (!a || a.match(/^\".*?\"$/)) return null;
                      let s = m.current.functions.find(
                        (e) =>
                          e.name.toLocaleLowerCase() === a.toLocaleLowerCase()
                      );
                      if (!s || !s.args || s.args.length < r) return null;
                      let i = Math.min(r, s.args.length - 1),
                        l = [];
                      return (
                        l.push({
                          label: ''
                            .concat(s.name, '(')
                            .concat(s.argument_types, ')'),
                          parameters: s.args.map((e) => ({ label: e.name })),
                        }),
                        {
                          value: {
                            signatures: l,
                            activeSignature: 0,
                            activeParameter: i,
                          },
                          dispose: () => {},
                        }
                      );
                    },
                  }))),
                () => {
                  (null == e || e.dispose(), null == n || n.dispose());
                }
              );
            }, [p, t]));
        };
        var ev = n(71410),
          eb = n(52521),
          ej = n(92240),
          ew = n(28977),
          eN = n.n(ew),
          e_ = n(54944),
          eC = n(98686),
          eS = n(359),
          ek = n(5315),
          eE = n(54234),
          eR = n(21786),
          eL = n(83145),
          eA = n.n(eL),
          eD = n(73565),
          eT = n(36155),
          eI = n(22714),
          eM = n(61893),
          eO = n(33526);
        let eU = (e, t) => {
            var n;
            return (
              null == e
                ? void 0
                : null === (n = e.rows) || void 0 === n
                  ? void 0
                  : n.length
            )
              ? e.rows.reduce((e, n) => {
                  let r = e[e.length - 1] || {};
                  return [
                    ...e,
                    { ...n, [t.yKey]: (r[t.yKey] || 0) + n[t.yKey] },
                  ];
                }, [])
              : [];
          },
          eP = ['number', 'string', 'date'],
          eF = (e) => {
            let { results: t = { rows: [] }, config: n, onConfigChange: a } = e,
              { ref: i } = (0, x.UO)(),
              l = (0, eR.P)('reportsV2'),
              [o, c] = (0, ex.l)(D.dA.SQL_EDITOR_SQL_BLOCK_ACKNOWLEDGED(i), !1),
              d = (0, s.useMemo)(
                () =>
                  Object.keys(t.rows[0] || {}).filter((e) => {
                    let n = typeof t.rows[0][e];
                    return eP.includes(n);
                  }),
                [t]
              ),
              u = (0, s.useMemo)(
                () =>
                  t.rows[0]
                    ? Object.keys(t.rows[0]).filter((e) => {
                        let n = t.rows[0][e];
                        return 'number' == typeof n || !isNaN(Number(n));
                      })
                    : [],
                [t]
              ),
              f = n.xKey && n.yKey,
              h = (0, s.useMemo)(() => {
                var e, r;
                if (!f) return !1;
                let a = typeof (null === (e = t.rows[0]) || void 0 === e
                    ? void 0
                    : e[n.xKey]),
                  s = typeof (null === (r = t.rows[0]) || void 0 === r
                    ? void 0
                    : r[n.yKey]);
                return 'number' === a && 'number' === s;
              }, [f, t.rows, n.xKey, n.yKey]),
              m = (0, s.useMemo)(() => eU(t, n), [t, n]),
              p = n.cumulative ? m : t.rows;
            if (!d.length)
              return (0, r.jsx)('div', {
                className: 'p-2',
                children: (0, r.jsx)(eE.Z, {
                  size: 'normal',
                  description:
                    'Execute a query and configure the chart options.',
                }),
              });
            let y = ((e) => {
              var t;
              let n =
                (null == p
                  ? void 0
                  : null === (t = p[0]) || void 0 === t
                    ? void 0
                    : t[e]) || '';
              return 'number' == typeof n
                ? 'number'
                : eN()(n).isValid()
                  ? 'date'
                  : 'string';
            })(n.xKey);
            return (0, r.jsxs)(Z.pO, {
              direction: 'horizontal',
              className: 'flex-grow h-full',
              'data-sentry-element': 'ResizablePanelGroup',
              'data-sentry-component': 'ChartConfig',
              'data-sentry-source-file': 'ChartConfig.tsx',
              children: [
                (0, r.jsx)(Z.ee, {
                  className: 'p-4 h-full',
                  defaultSize: 75,
                  'data-sentry-element': 'ResizablePanel',
                  'data-sentry-source-file': 'ChartConfig.tsx',
                  children: (0, r.jsx)(
                    () =>
                      f
                        ? 'bar' === n.type
                          ? (0, r.jsx)(ek.Z, {
                              showLegend: !0,
                              size: 'normal',
                              xAxisIsDate: 'date' === y,
                              data: p,
                              xAxisKey: n.xKey,
                              yAxisKey: n.yKey,
                              showGrid: n.showGrid,
                              XAxisProps: {
                                angle: 0,
                                interval: 'preserveStart',
                                hide: !n.showLabels,
                                tickFormatter: (e) => {
                                  let t = p[+e][n.xKey];
                                  return 'date' === y
                                    ? eN()(t).format('MMM D YYYY HH:mm')
                                    : t;
                                },
                              },
                              YAxisProps: {
                                tickFormatter: (e) => e.toLocaleString(),
                                hide: !n.showLabels,
                                domain: [0, 'dataMax'],
                              },
                            })
                          : void 0
                        : (0, r.jsx)(Z.ee, {
                            className: 'p-4 h-full',
                            defaultSize: 75,
                            children: (0, r.jsx)(eE.Z, {
                              size: 'normal',
                              title: 'Configure your chart',
                              description:
                                'Select your X and Y axis in the chart options panel',
                            }),
                          }),
                    {
                      'data-sentry-element': 'ChartPanel',
                      'data-sentry-source-file': 'ChartConfig.tsx',
                    }
                  ),
                }),
                (0, r.jsx)(Z.Dp, {
                  withHandle: !0,
                  'data-sentry-element': 'ResizableHandle',
                  'data-sentry-source-file': 'ChartConfig.tsx',
                }),
                (0, r.jsxs)(Z.ee, {
                  defaultSize: 25,
                  minSize: 15,
                  className: 'px-3 py-3 space-y-4 !overflow-y-auto',
                  'data-sentry-element': 'ResizablePanel',
                  'data-sentry-source-file': 'ChartConfig.tsx',
                  children: [
                    (0, r.jsxs)('div', {
                      className: 'flex justify-between items-center h-5',
                      children: [
                        (0, r.jsx)('h2', {
                          className: 'text-sm text-foreground-lighter',
                          children: 'Chart options',
                        }),
                        n.xKey &&
                          n.yKey &&
                          (0, r.jsx)(eS.u, {
                            type: 'text',
                            size: 'tiny',
                            onClick: () => {
                              let e = n.xKey,
                                t = n.yKey;
                              a({ ...n, xKey: t, yKey: e });
                            },
                            disabled: !h,
                            icon: (0, r.jsx)(e_.Z, {
                              size: '15',
                              className: 'text-foreground-lighter',
                            }),
                            tooltip: {
                              content: {
                                side: 'bottom',
                                className: 'w-64 text-center',
                                text: h
                                  ? 'Swap X and Y axis'
                                  : 'Unable to swap X and Y axis - both axes need to numerical values',
                              },
                            },
                            children: 'Flip',
                          }),
                      ],
                    }),
                    l &&
                      !o &&
                      (0, r.jsxs)(eO.J, {
                        showIcon: !1,
                        type: 'tip',
                        className: 'p-2 relative group',
                        children: [
                          (0, r.jsxs)(K.u, {
                            children: [
                              (0, r.jsx)(K.aJ, {
                                onClick: () => c(!0),
                                className:
                                  'absolute top-3 right-3 opacity-0 group-opacity-100 transition-opacity',
                                children: (0, r.jsx)(eC.Z, {
                                  size: 14,
                                  className: 'text-foreground-light',
                                }),
                              }),
                              (0, r.jsx)(K._v, {
                                side: 'bottom',
                                children: 'Dismiss',
                              }),
                            ],
                          }),
                          (0, r.jsxs)('div', {
                            className: 'flex items-center gap-x-2',
                            children: [
                              (0, r.jsx)(eD.C, {
                                variant: 'success',
                                className: 'text-xs rounded px-1',
                                children: 'NEW',
                              }),
                              (0, r.jsx)('p', {
                                className: 'text-xs',
                                children: 'Add this chart to custom reports',
                              }),
                            ],
                          }),
                          (0, r.jsx)('p', {
                            className: 'text-xs text-foreground-light mt-1',
                            children:
                              'SQL snippets can now be added and saved to your custom reports. Try it out now!',
                          }),
                          (0, r.jsx)(B.z, {
                            asChild: !0,
                            size: 'tiny',
                            type: 'default',
                            className: 'mt-2',
                            children: (0, r.jsx)(eA(), {
                              href: '/project/'.concat(i, '/reports'),
                              children: 'Head to Reports',
                            }),
                          }),
                        ],
                      }),
                    (0, r.jsxs)('div', {
                      children: [
                        (0, r.jsx)(eT._, {
                          className: 'text-xs text-foreground-light',
                          'data-sentry-element': 'Label_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: 'X Axis',
                        }),
                        (0, r.jsxs)(eI.Ph, {
                          value: n.xKey,
                          onValueChange: (e) => {
                            a({ ...n, xKey: e });
                          },
                          'data-sentry-element': 'Select_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: [
                            (0, r.jsx)(eI.i4, {
                              'data-sentry-element': 'SelectTrigger_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                              children: n.xKey || 'Select X Axis',
                            }),
                            (0, r.jsx)(eI.Bw, {
                              'data-sentry-element': 'SelectContent_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                              children: (0, r.jsx)(eI.DI, {
                                'data-sentry-element': 'SelectGroup_Shadcn_',
                                'data-sentry-source-file': 'ChartConfig.tsx',
                                children: d.map((e) =>
                                  (0, r.jsx)(
                                    eI.Ql,
                                    { value: e, children: e },
                                    e
                                  )
                                ),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)('div', {
                      children: [
                        (0, r.jsx)(eT._, {
                          className: 'text-xs text-foreground-light',
                          'data-sentry-element': 'Label_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: 'Y Axis',
                        }),
                        (0, r.jsxs)(eI.Ph, {
                          value: n.yKey,
                          onValueChange: (e) => {
                            a({ ...n, yKey: e });
                          },
                          'data-sentry-element': 'Select_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: [
                            (0, r.jsx)(eI.i4, {
                              'data-sentry-element': 'SelectTrigger_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                              children: n.yKey || 'Select Y Axis',
                            }),
                            (0, r.jsx)(eI.Bw, {
                              'data-sentry-element': 'SelectContent_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                              children: (0, r.jsx)(eI.DI, {
                                'data-sentry-element': 'SelectGroup_Shadcn_',
                                'data-sentry-source-file': 'ChartConfig.tsx',
                                children: u.map((e) =>
                                  (0, r.jsx)(
                                    eI.Ql,
                                    { value: e, children: e },
                                    e
                                  )
                                ),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)('div', {
                      className:
                        '*:flex *:gap-2 *:items-center grid gap-2 *:text-foreground-light *:p-1.5 *:pl-0',
                      children: [
                        (0, r.jsxs)(eT._, {
                          className: '',
                          htmlFor: 'cumulative',
                          'data-sentry-element': 'Label_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: [
                            (0, r.jsx)(eM.X, {
                              id: 'cumulative',
                              name: 'cumulative',
                              checked: n.cumulative,
                              onClick: () =>
                                a({ ...n, cumulative: !n.cumulative }),
                              'data-sentry-element': 'Checkbox_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                            }),
                            'Cumulative',
                          ],
                        }),
                        (0, r.jsxs)(eT._, {
                          htmlFor: 'showLabels',
                          'data-sentry-element': 'Label_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: [
                            (0, r.jsx)(eM.X, {
                              id: 'showLabels',
                              name: 'showLabels',
                              checked: n.showLabels,
                              onClick: () =>
                                a({ ...n, showLabels: !n.showLabels }),
                              'data-sentry-element': 'Checkbox_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                            }),
                            'Show labels',
                          ],
                        }),
                        (0, r.jsxs)(eT._, {
                          htmlFor: 'showGrid',
                          'data-sentry-element': 'Label_Shadcn_',
                          'data-sentry-source-file': 'ChartConfig.tsx',
                          children: [
                            (0, r.jsx)(eM.X, {
                              id: 'showGrid',
                              name: 'showGrid',
                              checked: n.showGrid,
                              onClick: () => a({ ...n, showGrid: !n.showGrid }),
                              'data-sentry-element': 'Checkbox_Shadcn_',
                              'data-sentry-source-file': 'ChartConfig.tsx',
                            }),
                            'Show grid',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          };
        var ez = n(68846),
          eZ = n(98266);
        let eq = (0, eZ.Z)('Keyboard', [
          ['path', { d: 'M10 8h.01', key: '1r9ogq' }],
          ['path', { d: 'M12 12h.01', key: '1mp3jc' }],
          ['path', { d: 'M14 8h.01', key: '1primd' }],
          ['path', { d: 'M16 12h.01', key: '1l6xoz' }],
          ['path', { d: 'M18 8h.01', key: 'emo2bl' }],
          ['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
          ['path', { d: 'M7 16h10', key: 'wp8him' }],
          ['path', { d: 'M8 12h.01', key: 'czm47f' }],
          [
            'rect',
            {
              width: '20',
              height: '16',
              x: '2',
              y: '4',
              rx: '2',
              key: '18n3k1',
            },
          ],
        ]);
        var eK = n(62507),
          eQ = n(34216),
          eB = n(3323);
        let eV = (0, eZ.Z)('CornerDownLeft', [
          ['polyline', { points: '9 10 4 15 9 20', key: 'r3jprv' }],
          ['path', { d: 'M20 4v7a4 4 0 0 1-4 4H4', key: '6o5b7l' }],
        ]);
        var eG = n(96273),
          eW = n(1724),
          eH = n(36958),
          eX = n(44735),
          eY = n(18810),
          eJ = (e) => {
            let { id: t } = e,
              { profile: n } = (0, M.Un)(),
              a = (0, z.B0)().snippets[t],
              s =
                (null == n ? void 0 : n.id) ===
                (null == a ? void 0 : a.snippet.owner_id);
            return (0, r.jsx)(r.Fragment, {
              children: s ? null : (0, r.jsx)(eD.C, { children: 'Read-only' }),
            });
          },
          e$ = (e) => {
            let { id: t } = e,
              { profile: n } = (0, M.Un)(),
              a = (0, z.B0)(),
              i = a.savingStates[t],
              l = (0, eY.D9)(i),
              [o, c] = (0, s.useState)(!1),
              d = a.snippets[t],
              f =
                (null == n ? void 0 : n.id) ===
                (null == d ? void 0 : d.snippet.owner_id);
            return (
              (0, s.useEffect)(() => {
                let e = !1;
                return (
                  'UPDATING' === l &&
                    'IDLE' === i &&
                    (c(!0),
                    setTimeout(() => {
                      e || c(!1);
                    }, 5e3)),
                  () => {
                    e = !0;
                  }
                );
              }, [i]),
              (0, r.jsx)(r.Fragment, {
                children: (0, r.jsxs)('div', {
                  className: 'mx-2 flex items-center gap-2',
                  children: [
                    f &&
                      'UPDATING_FAILED' === i &&
                      (0, r.jsx)(B.z, {
                        type: 'text',
                        size: 'tiny',
                        icon: (0, r.jsx)(eH.Z, {
                          className: 'text-gray-1100',
                          strokeWidth: 2,
                        }),
                        onClick: () => a.addNeedsSaving(t),
                        children: 'Retry',
                      }),
                    o
                      ? (0, r.jsxs)(K.u, {
                          children: [
                            (0, r.jsx)(K.aJ, {
                              children: (0, r.jsx)(eK.Z, {
                                className: 'text-brand',
                                size: 14,
                                strokeWidth: 3,
                              }),
                            }),
                            (0, r.jsx)(K._v, {
                              side: 'bottom',
                              children: 'All changes saved',
                            }),
                          ],
                        })
                      : 'UPDATING' === i
                        ? (0, r.jsxs)(K.u, {
                            children: [
                              (0, r.jsx)(K.aJ, {
                                children: (0, r.jsx)(u.Z, {
                                  className: 'animate-spin',
                                  size: 14,
                                  strokeWidth: 2,
                                }),
                              }),
                              (0, r.jsx)(K._v, {
                                children: 'Saving changes...',
                              }),
                            ],
                          })
                        : 'UPDATING_FAILED' === i
                          ? f
                            ? (0, r.jsxs)(K.u, {
                                children: [
                                  (0, r.jsx)(K.aJ, {
                                    children: (0, r.jsx)(eX.Z, {
                                      className: 'text-red-900',
                                      size: 14,
                                      strokeWidth: 2,
                                    }),
                                  }),
                                  (0, r.jsx)(K._v, {
                                    children: 'Failed to save changes',
                                  }),
                                ],
                              })
                            : (0, r.jsx)(eJ, { id: t })
                          : null,
                  ],
                }),
              })
            );
          },
          e0 = (e) => {
            let {
                id: t,
                isExecuting: n = !1,
                isDisabled: a = !1,
                hasSelection: s,
                prettifyQuery: i,
                executeQuery: l,
              } = e,
              o = (0, I.fV)(),
              { ref: c } = (0, x.UO)(),
              d = (0, z.B0)();
            (0, L.l)();
            let { mutate: h } = (0, k.a)(),
              [m] = (0, ex.l)(D.dA.SQL_EDITOR_AI_OPEN, !0),
              [p, g] = (0, ex.l)(D.dA.SQL_EDITOR_INTELLISENSE, !0),
              [v, b] = (0, ex.l)(D.dA.SQL_EDITOR_LAST_SELECTED_DB(c), ''),
              j = d.snippets[t],
              w = void 0 !== j && j.snippet.favorite,
              N = () => {
                (g(!p),
                  y.Am.success(
                    'Successfully '
                      .concat(p ? 'disabled' : 'enabled', ' intellisense. ')
                      .concat(
                        p
                          ? 'Please refresh your browser for changes to take place.'
                          : ''
                      )
                  ));
              },
              _ = () => d.addFavorite(t),
              C = () => d.removeFavorite(t);
            return (0, r.jsxs)('div', {
              className: 'inline-flex items-center justify-end gap-x-2',
              'data-sentry-component': 'UtilityActions',
              'data-sentry-source-file': 'UtilityActions.tsx',
              children: [
                D.Qy && (0, r.jsx)(e$, { id: t }),
                (0, r.jsxs)(Q.h_, {
                  'data-sentry-element': 'DropdownMenu',
                  'data-sentry-source-file': 'UtilityActions.tsx',
                  children: [
                    (0, r.jsx)(Q.$F, {
                      asChild: !0,
                      'data-sentry-element': 'DropdownMenuTrigger',
                      'data-sentry-source-file': 'UtilityActions.tsx',
                      children: (0, r.jsx)(B.z, {
                        type: 'default',
                        className: (0, q.cn)(
                          'px-1',
                          m ? 'block 2xl:hidden' : 'hidden'
                        ),
                        icon: (0, r.jsx)(ez.Z, {
                          className: 'text-foreground-light',
                        }),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'UtilityActions.tsx',
                      }),
                    }),
                    (0, r.jsxs)(Q.AW, {
                      className: 'w-48',
                      'data-sentry-element': 'DropdownMenuContent',
                      'data-sentry-source-file': 'UtilityActions.tsx',
                      children: [
                        (0, r.jsxs)(Q.Xi, {
                          className: 'justify-between',
                          onClick: N,
                          'data-sentry-element': 'DropdownMenuItem',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: [
                            (0, r.jsxs)('span', {
                              className: 'flex items-center gap-x-2',
                              children: [
                                (0, r.jsx)(eq, {
                                  size: 14,
                                  className: 'text-foreground-light',
                                  'data-sentry-element': 'Keyboard',
                                  'data-sentry-source-file':
                                    'UtilityActions.tsx',
                                }),
                                'Intellisense enabled',
                              ],
                            }),
                            p &&
                              (0, r.jsx)(eK.Z, {
                                className: 'text-brand',
                                size: 16,
                              }),
                          ],
                        }),
                        (0, r.jsx)(Q.VD, {
                          'data-sentry-element': 'DropdownMenuSeparator',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                        }),
                        (0, r.jsxs)(Q.Xi, {
                          className: 'gap-x-2',
                          onClick: () => {
                            w ? C() : _();
                          },
                          'data-sentry-element': 'DropdownMenuItem',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: [
                            (0, r.jsx)(eQ.Z, {
                              size: 14,
                              strokeWidth: 2,
                              className: w
                                ? 'fill-brand stroke-none'
                                : 'fill-none stroke-foreground-light',
                              'data-sentry-element': 'Heart',
                              'data-sentry-source-file': 'UtilityActions.tsx',
                            }),
                            w ? 'Remove from' : 'Add to',
                            ' favorites',
                          ],
                        }),
                        (0, r.jsxs)(Q.Xi, {
                          className: 'gap-x-2',
                          onClick: i,
                          'data-sentry-element': 'DropdownMenuItem',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: [
                            (0, r.jsx)(eB.Z, {
                              size: 14,
                              strokeWidth: 2,
                              className: 'text-foreground-light',
                              'data-sentry-element': 'AlignLeft',
                              'data-sentry-source-file': 'UtilityActions.tsx',
                            }),
                            'Prettify SQL',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className: (0, q.cn)(
                    'items-center gap-x-2',
                    m ? 'hidden 2xl:flex' : 'flex'
                  ),
                  children: [
                    (0, r.jsxs)(Q.h_, {
                      'data-sentry-element': 'DropdownMenu',
                      'data-sentry-source-file': 'UtilityActions.tsx',
                      children: [
                        (0, r.jsx)(Q.$F, {
                          asChild: !0,
                          'data-sentry-element': 'DropdownMenuTrigger',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: (0, r.jsx)(B.z, {
                            type: 'text',
                            className: 'px-1',
                            icon: (0, r.jsx)(eq, {
                              className: 'text-foreground-light',
                            }),
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'UtilityActions.tsx',
                          }),
                        }),
                        (0, r.jsx)(Q.AW, {
                          className: 'w-48',
                          'data-sentry-element': 'DropdownMenuContent',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: (0, r.jsxs)(Q.Xi, {
                            className: 'justify-between',
                            onClick: N,
                            'data-sentry-element': 'DropdownMenuItem',
                            'data-sentry-source-file': 'UtilityActions.tsx',
                            children: [
                              'Intellisense enabled',
                              p &&
                                (0, r.jsx)(eK.Z, {
                                  className: 'text-brand',
                                  size: 16,
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    D.Qy &&
                      (0, r.jsxs)(K.u, {
                        children: [
                          (0, r.jsx)(K.aJ, {
                            asChild: !0,
                            children: w
                              ? (0, r.jsx)(B.z, {
                                  type: 'text',
                                  size: 'tiny',
                                  onClick: C,
                                  className: 'px-1',
                                  icon: (0, r.jsx)(eQ.Z, {
                                    className: 'fill-brand stroke-none',
                                  }),
                                })
                              : (0, r.jsx)(B.z, {
                                  type: 'text',
                                  size: 'tiny',
                                  onClick: _,
                                  className: 'px-1',
                                  icon: (0, r.jsx)(eQ.Z, {
                                    className:
                                      'fill-none stroke-foreground-light',
                                  }),
                                }),
                          }),
                          (0, r.jsxs)(K._v, {
                            side: 'bottom',
                            children: [
                              w ? 'Remove from' : 'Add to',
                              ' favorites',
                            ],
                          }),
                        ],
                      }),
                    (0, r.jsxs)(K.u, {
                      'data-sentry-element': 'Tooltip',
                      'data-sentry-source-file': 'UtilityActions.tsx',
                      children: [
                        (0, r.jsx)(K.aJ, {
                          asChild: !0,
                          'data-sentry-element': 'TooltipTrigger',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: (0, r.jsx)(B.z, {
                            type: 'text',
                            onClick: i,
                            className: 'px-1',
                            icon: (0, r.jsx)(eB.Z, {
                              strokeWidth: 2,
                              className: 'text-foreground-light',
                            }),
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'UtilityActions.tsx',
                          }),
                        }),
                        (0, r.jsx)(K._v, {
                          side: 'bottom',
                          'data-sentry-element': 'TooltipContent',
                          'data-sentry-source-file': 'UtilityActions.tsx',
                          children: 'Prettify SQL',
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)('div', {
                  className: 'flex items-center justify-between gap-x-2',
                  children: (0, r.jsxs)('div', {
                    className: 'flex items-center',
                    children: [
                      (0, r.jsx)(eW.Z, {
                        selectedDatabaseId: 0 === v.length ? void 0 : v,
                        variant: 'connected-on-right',
                        onSelectId: (e) => {
                          (d.resetResult(t), b(e));
                        },
                        'data-sentry-element': 'DatabaseSelector',
                        'data-sentry-source-file': 'UtilityActions.tsx',
                      }),
                      (0, r.jsx)(eG.Q, {
                        serviceRoleLabel: 'postgres',
                        variant: 'connected-on-both',
                        'data-sentry-element': 'RoleImpersonationPopover',
                        'data-sentry-source-file': 'UtilityActions.tsx',
                      }),
                      (0, r.jsx)(B.z, {
                        onClick: l,
                        disabled: a || n,
                        type: 'primary',
                        size: 'tiny',
                        iconRight: n
                          ? (0, r.jsx)(u.Z, {
                              className: 'animate-spin',
                              size: 10,
                              strokeWidth: 1.5,
                            })
                          : (0, r.jsxs)('div', {
                              className: 'flex items-center space-x-1',
                              children: [
                                'macos' === o
                                  ? (0, r.jsx)(f.Z, {
                                      size: 10,
                                      strokeWidth: 1.5,
                                    })
                                  : (0, r.jsx)('p', {
                                      className:
                                        'text-xs text-foreground-light',
                                      children: 'CTRL',
                                    }),
                                (0, r.jsx)(eV, { size: 10, strokeWidth: 1.5 }),
                              ],
                            }),
                        className: 'rounded-l-none min-w-[82px]',
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'UtilityActions.tsx',
                        children: s ? 'Run selected' : 'Run',
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
          e1 = n(4839),
          e2 = n(77060),
          e4 = n(8959),
          e3 = (e) => {
            var t, n, a, s, i, l, o, c, d;
            let {
                id: f,
                isExecuting: h,
                isDisabled: m,
                isDebugging: p,
                onDebug: y,
              } = e,
              { ref: g } = (0, x.UO)(),
              v = (0, P.TF)(),
              b = (0, L.l)(),
              j = (0, z.B0)(),
              w = null === (t = j.results[f]) || void 0 === t ? void 0 : t[0],
              { data: N } = (0, S.Gl)({ orgSlug: null == b ? void 0 : b.slug }),
              _ = (0, V.$w)(N),
              C =
                (null == w
                  ? void 0
                  : null === (a = w.error) || void 0 === a
                    ? void 0
                    : null === (n = a.message) || void 0 === n
                      ? void 0
                      : n.includes(
                          'canceling statement due to statement timeout'
                        )) ||
                (null == w
                  ? void 0
                  : null === (i = w.error) || void 0 === i
                    ? void 0
                    : null === (s = i.message) || void 0 === s
                      ? void 0
                      : s.includes('upstream request timeout'));
            if (h)
              return (0, r.jsxs)('div', {
                className:
                  'flex items-center gap-x-4 px-6 py-4 bg-table-header-light [[data-theme*=dark]_&]:bg-table-header-dark',
                children: [
                  (0, r.jsx)(u.Z, { size: 14, className: 'animate-spin' }),
                  (0, r.jsx)('p', {
                    className: 'm-0 border-0 font-mono text-sm',
                    children: 'Running...',
                  }),
                ],
              });
            if (null == w ? void 0 : w.error) {
              let e = (
                  null !==
                    (d =
                      null === (o = w.error) || void 0 === o
                        ? void 0
                        : null === (l = o.formattedError) || void 0 === l
                          ? void 0
                          : l.split('\n')) && void 0 !== d
                    ? d
                    : []
                ).filter((e) => e.length > 0),
                t =
                  v.selectedDatabaseId !== g &&
                  w.error.message.includes('in a read-only transaction'),
                n = w.error.message.includes(
                  'Query is too large to be run via the SQL Editor'
                );
              return (0, r.jsx)('div', {
                className:
                  'bg-table-header-light [[data-theme*=dark]_&]:bg-table-header-dark overflow-y-auto',
                children: (0, r.jsxs)('div', {
                  className:
                    'flex flex-row justify-between items-start py-4 px-6 gap-x-4',
                  children: [
                    C
                      ? (0, r.jsxs)('div', {
                          className: 'flex flex-col gap-y-1',
                          children: [
                            (0, r.jsx)('p', {
                              className: 'font-mono text-sm',
                              children:
                                'SQL query ran into an upstream timeout',
                            }),
                            (0, r.jsxs)('p', {
                              className:
                                'font-mono text-sm text-foreground-light',
                              children: [
                                'You can either',
                                ' ',
                                (0, r.jsx)('a', {
                                  target: '_blank',
                                  rel: 'noreferrer',
                                  className:
                                    'underline transition text-foreground',
                                  href: 'https://supabase.com/docs/guides/platform/performance#examining-query-performance',
                                  children: 'optimize your query',
                                }),
                                ', or',
                                ' ',
                                (0, r.jsx)('a', {
                                  target: '_blank',
                                  rel: 'noreferrer',
                                  className:
                                    'underline transition text-foreground',
                                  href: 'https://supabase.com/docs/guides/database/timeouts',
                                  children: 'increase the statement timeout',
                                }),
                                '.',
                              ],
                            }),
                          ],
                        })
                      : (0, r.jsxs)('div', {
                          className: 'flex flex-col gap-y-1',
                          children: [
                            e.length > 0
                              ? e.map((e, t) =>
                                  (0, r.jsx)(
                                    'pre',
                                    {
                                      className: 'font-mono text-sm text-wrap',
                                      children: e,
                                    },
                                    'error-'.concat(t)
                                  )
                                )
                              : (0, r.jsxs)('p', {
                                  className: 'font-mono text-sm tracking-tight',
                                  children: [
                                    'Error: ',
                                    null === (c = w.error) || void 0 === c
                                      ? void 0
                                      : c.message,
                                  ],
                                }),
                            w.autoLimit &&
                              (0, r.jsxs)('p', {
                                className: 'text-sm text-foreground-light',
                                children: [
                                  'Note: A limit of ',
                                  w.autoLimit,
                                  ' was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.',
                                ],
                              }),
                            t &&
                              (0, r.jsx)('p', {
                                className: 'text-sm text-foreground-light',
                                children:
                                  'Note: Read replicas are for read only queries. Run write queries on the primary database instead.',
                              }),
                            n &&
                              (0, r.jsxs)('p', {
                                className:
                                  'text-sm text-foreground-light flex items-center gap-x-1',
                                children: [
                                  'Run this query by',
                                  ' ',
                                  (0, r.jsxs)(eA(), {
                                    target: '_blank',
                                    rel: 'noreferrer',
                                    href: '/project/'.concat(
                                      g,
                                      '/settings/database'
                                    ),
                                    className:
                                      'underline transition text-foreground flex items-center gap-x-1',
                                    children: [
                                      'connecting to your database directly',
                                      (0, r.jsx)(e1.Z, { size: 12 }),
                                    ],
                                  }),
                                  '.',
                                ],
                              }),
                          ],
                        }),
                    (0, r.jsxs)('div', {
                      className: 'flex items-center gap-x-2',
                      children: [
                        t &&
                          (0, r.jsx)(B.z, {
                            className: 'py-2',
                            type: 'default',
                            onClick: () => {
                              (v.setSelectedDatabaseId(g), j.resetResult(f));
                            },
                            children: 'Switch to primary database',
                          }),
                        !_ &&
                          (0, r.jsx)(B.z, {
                            icon: (0, r.jsx)(e2.c, {
                              className: 'scale-75 w-3 h-3',
                              loading: p,
                            }),
                            disabled: !!m || p,
                            onClick: y,
                            children: 'Debug with Supabase AI',
                          }),
                      ],
                    }),
                  ],
                }),
              });
            }
            return w
              ? w.rows.length <= 0
                ? (0, r.jsx)('div', {
                    className:
                      'bg-table-header-light [[data-theme*=dark]_&]:bg-table-header-dark overflow-y-auto',
                    children: (0, r.jsx)('p', {
                      className: 'm-0 border-0 px-6 py-4 font-mono text-sm',
                      children: 'Success. No rows returned',
                    }),
                  })
                : (0, r.jsx)(e4.Z, {
                    rows: w.rows,
                    'data-sentry-element': 'Results',
                    'data-sentry-component': 'UtilityTabResults',
                    'data-sentry-source-file': 'UtilityTabResults.tsx',
                  })
              : (0, r.jsx)('div', {
                  className:
                    'bg-table-header-light [[data-theme*=dark]_&]:bg-table-header-dark overflow-y-auto',
                  children: (0, r.jsxs)('p', {
                    className:
                      'm-0 border-0 px-4 py-4 text-sm text-foreground-light',
                    children: [
                      'Click ',
                      (0, r.jsx)('code', { children: 'Run' }),
                      ' to execute your query.',
                    ],
                  }),
                });
          };
        let e8 = {
          type: 'bar',
          cumulative: !1,
          xKey: '',
          yKey: '',
          showLabels: !1,
          showGrid: !1,
        };
        var e9 = (e) => {
          var t, n, a;
          let {
              id: s,
              isExecuting: i,
              isDebugging: l,
              isDisabled: o,
              hasSelection: c,
              prettifyQuery: d,
              executeQuery: u,
              onDebug: f,
            } = e,
            { ref: h } = (0, x.UO)(),
            m = (0, z.B0)(),
            p =
              null === (t = m.snippets[s]) || void 0 === t ? void 0 : t.snippet,
            g = null === (n = m.results[s]) || void 0 === n ? void 0 : n[0],
            { mutate: v } = (0, eb.R)({
              invalidateQueriesOnSuccess: !1,
              onMutate: async (e) => {
                let { payload: t } = e;
                if ('sql' !== t.type || !('chart' in t.content)) return;
                let n = {
                  ...p,
                  content: { ...p.content, chart: t.content.chart },
                };
                m.updateSnippet({ id: s, snippet: n });
              },
              onError: async (e, t, n) => {
                y.Am.error('Failed to update chart. Please try again.');
              },
            }),
            b =
              p &&
              'sql' === p.type &&
              (null === (a = p.content) || void 0 === a ? void 0 : a.chart)
                ? p.content.chart
                : e8;
          return (0, r.jsxs)(ej.mQ, {
            defaultValue: 'results',
            className: 'w-full h-full flex flex-col',
            'data-sentry-element': 'Tabs_Shadcn_',
            'data-sentry-component': 'UtilityPanel',
            'data-sentry-source-file': 'UtilityPanel.tsx',
            children: [
              (0, r.jsxs)(ej.dr, {
                className:
                  'flex justify-between gap-2 px-4 overflow-x-auto min-h-[42px]',
                'data-sentry-element': 'TabsList_Shadcn_',
                'data-sentry-source-file': 'UtilityPanel.tsx',
                children: [
                  (0, r.jsxs)('div', {
                    className: 'flex items-center gap-4',
                    children: [
                      (0, r.jsx)(ej.SP, {
                        className: 'py-3 text-xs',
                        value: 'results',
                        'data-sentry-element': 'TabsTrigger_Shadcn_',
                        'data-sentry-source-file': 'UtilityPanel.tsx',
                        children: (0, r.jsx)('span', {
                          className: 'translate-y-[1px]',
                          children: 'Results',
                        }),
                      }),
                      (0, r.jsx)(ej.SP, {
                        className: 'py-3 text-xs',
                        value: 'chart',
                        'data-sentry-element': 'TabsTrigger_Shadcn_',
                        'data-sentry-source-file': 'UtilityPanel.tsx',
                        children: (0, r.jsx)('span', {
                          className: 'translate-y-[1px]',
                          children: 'Chart',
                        }),
                      }),
                      (null == g ? void 0 : g.rows) &&
                        (0, r.jsx)(ev.z, {
                          type: 'text',
                          results: g.rows,
                          fileName: 'Supabase Snippet '.concat(p.name),
                        }),
                    ],
                  }),
                  (0, r.jsx)(e0, {
                    id: s,
                    isExecuting: i,
                    isDisabled: o,
                    hasSelection: c,
                    prettifyQuery: d,
                    executeQuery: u,
                    'data-sentry-element': 'UtilityActions',
                    'data-sentry-source-file': 'UtilityPanel.tsx',
                  }),
                ],
              }),
              (0, r.jsx)(ej.nU, {
                asChild: !0,
                value: 'results',
                className: 'mt-0 flex-grow',
                'data-sentry-element': 'TabsContent_Shadcn_',
                'data-sentry-source-file': 'UtilityPanel.tsx',
                children: (0, r.jsx)(e3, {
                  id: s,
                  isExecuting: i,
                  isDisabled: o,
                  onDebug: f,
                  isDebugging: l,
                  'data-sentry-element': 'UtilityTabResults',
                  'data-sentry-source-file': 'UtilityPanel.tsx',
                }),
              }),
              (0, r.jsx)(ej.nU, {
                asChild: !0,
                value: 'chart',
                className: 'mt-0 flex-grow',
                'data-sentry-element': 'TabsContent_Shadcn_',
                'data-sentry-source-file': 'UtilityPanel.tsx',
                children: (0, r.jsx)(eF, {
                  results: g,
                  config: b,
                  onConfigChange: function (e) {
                    h &&
                      (null == p ? void 0 : p.id) &&
                      v({
                        projectRef: h,
                        payload: {
                          ...p,
                          id: p.id,
                          description: p.description || '',
                          project_id: p.project_id || 0,
                          content: { ...p.content, content_id: s, chart: e },
                        },
                      });
                  },
                  'data-sentry-element': 'ChartConfig',
                  'data-sentry-source-file': 'UtilityPanel.tsx',
                }),
              }),
            ],
          });
        };
        let e5 = p()(() => n.e(7025).then(n.bind(n, 84)), {
            loadableGenerated: { webpack: () => [84] },
            ssr: !1,
          }),
          e7 = p()(
            () =>
              Promise.resolve()
                .then(n.bind(n, 85229))
                .then((e) => {
                  let { DiffEditor: t } = e;
                  return t;
                }),
            { loadableGenerated: { webpack: () => [85229] }, ssr: !1 }
          ),
          e6 = () => {
            var e, t, n;
            let i = (0, I.fV)(),
              m = (0, a.useRouter)(),
              { ref: p, id: G } = (0, x.UO)(),
              X = (0, L.l)(),
              { profile: J } = (0, M.Un)(),
              $ = (0, l.NL)(),
              ea = (0, A.Vm)(),
              es = (0, L.l)(),
              ei = (0, U.WZ)(),
              el = (0, z.B0)(),
              eo = (0, F.z6)(),
              ec = (0, P.TF)(),
              ed = (0, E.C)(),
              [eu] = (0, R.l)(null == ea ? void 0 : ea.ref),
              ef = ed || !D.Qy,
              {
                sourceSqlDiff: eh,
                setSourceSqlDiff: em,
                selectedDiffType: ep,
                setSelectedDiffType: ey,
                pendingTitle: ex,
                setIsAcceptDiffLoading: ev,
                isDiffOpen: eb,
                defaultSqlDiff: ej,
                closeDiff: ew,
              } = (0, H.Yx)(),
              {
                promptState: eN,
                setPromptState: e_,
                promptInput: eC,
                setPromptInput: eS,
                resetPrompt: ek,
              } = (0, H.iM)(),
              eE = (0, s.useRef)(null),
              eR = (0, s.useRef)(null),
              eL = (0, s.useRef)(null),
              [eA, eD] = (0, s.useState)(!1),
              [eT, eI] = (0, s.useState)([]),
              [eM, eO] = (0, s.useState)(!1),
              [eU, eP] = (0, s.useState)(!1),
              [eF, ez] = (0, s.useState)(!1),
              [eZ, eq] = (0, s.useState)(!1),
              [eK, eQ] = (0, s.useState)(!1),
              eB = (0, s.useMemo)(() => (0, I.k$)(), [G]),
              eV = G && 'new' !== G ? G : eB,
              eG = el.limit,
              eW =
                null === (e = el.results[eV]) || void 0 === e ? void 0 : e[0],
              eH = !(
                eV in el.snippets && void 0 !== el.snippets[eV].snippet.content
              ),
              eX = 'new' !== G && eH;
            eg(eV, eR.current);
            let { data: eY } = (0, S.Gl)({
                orgSlug: null == es ? void 0 : es.slug,
              }),
              eJ = (0, V.$w)(eY),
              { data: e$, isSuccess: e0 } = (0, _.bN)({ projectRef: p }),
              { data: e1, refetch: e2 } = (0, j.u$)(
                {
                  schemas: eu,
                  projectRef: null == ea ? void 0 : ea.ref,
                  connectionString: null == ea ? void 0 : ea.connectionString,
                },
                { enabled: ef }
              ),
              e4 = ef
                ? null == e1
                  ? void 0
                  : e1.map((e) => e.sql.trim())
                : void 0,
              { mutateAsync: e3 } = (0, b.g)(),
              { mutate: e8 } = (0, k.a)(),
              { mutate: e6, isLoading: te } = (0, C.r)({
                onSuccess(e, t) {
                  (eV && el.addResult(eV, e.result, t.autoLimit),
                    e2(),
                    $.invalidateQueries(N.X.lint(p)));
                },
                onError(e, t) {
                  if (eV) {
                    if (e.position && eR.current) {
                      var n, r, a;
                      let t = eE.current,
                        s = eR.current,
                        i =
                          eA &&
                          null !==
                            (r =
                              null == t
                                ? void 0
                                : null === (n = t.getSelection()) ||
                                    void 0 === n
                                  ? void 0
                                  : n.startLineNumber) &&
                          void 0 !== r
                            ? r
                            : 0,
                        l =
                          null !== (a = e.formattedError) && void 0 !== a
                            ? a
                            : '',
                        o = l.slice(l.indexOf('LINE')),
                        c =
                          i + Number(o.slice(0, o.indexOf(':')).split(' ')[1]);
                      if (!isNaN(c)) {
                        let e =
                          null == t
                            ? void 0
                            : t.deltaDecorations(
                                [],
                                [
                                  {
                                    range: new s.Range(c, 1, c, 20),
                                    options: {
                                      isWholeLine: !0,
                                      inlineClassName: 'bg-warning-400',
                                    },
                                  },
                                ]
                              );
                        e && (null == t || t.revealLineInCenter(c), eI(e));
                      }
                    }
                    el.addResultError(eV, e, t.autoLimit);
                  }
                },
              }),
              tt = (0, s.useCallback)(
                async (e, t) => {
                  try {
                    let { title: n } = await e3({ sql: t });
                    el.renameSnippet({ id: e, name: n });
                  } catch (e) {}
                },
                [e3, el]
              ),
              tn = (0, s.useCallback)(async () => {
                if (eb) return;
                let e = (0, z.pB)().snippets[eV];
                if (eE.current && ea) {
                  var t, n, r, a, s, i;
                  let l = eE.current,
                    o = l.getSelection(),
                    c = o
                      ? null === (t = l.getModel()) || void 0 === t
                        ? void 0
                        : t.getValueInRange(o)
                      : void 0,
                    d = e
                      ? null !==
                          (i =
                            c ||
                            (null === (n = eE.current) || void 0 === n
                              ? void 0
                              : n.getValue())) && void 0 !== i
                        ? i
                        : null === (r = e.snippet.content) || void 0 === r
                          ? void 0
                          : r.sql
                      : c ||
                        (null === (a = eE.current) || void 0 === a
                          ? void 0
                          : a.getValue()),
                    u = (0, T._)(d),
                    f =
                      null == eE
                        ? void 0
                        : null === (s = eE.current) || void 0 === s
                          ? void 0
                          : s.getModel();
                  eE.current &&
                    f &&
                    (eE.current.executeEdits('apply-prettify-edit', [
                      { text: u, range: f.getFullModelRange() },
                    ]),
                    el.setSql(eV, u));
                }
              }, [eV, eb, ea, el]),
              tr = (0, s.useCallback)(
                async function () {
                  let e =
                    arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0];
                  if (eb) return;
                  let t = (0, z.pB)().snippets[eV];
                  if (null !== eE.current && !te && void 0 !== ea) {
                    var n, r, a, s, i, l, o;
                    let c = eE.current,
                      d = c.getSelection(),
                      u = d
                        ? null === (n = c.getModel()) || void 0 === n
                          ? void 0
                          : n.getValueInRange(d)
                        : void 0,
                      f = t
                        ? null !==
                            (l =
                              u ||
                              (null === (r = eE.current) || void 0 === r
                                ? void 0
                                : r.getValue())) && void 0 !== l
                          ? l
                          : null === (a = t.snippet.content) || void 0 === a
                            ? void 0
                            : a.sql
                        : u ||
                          (null === (s = eE.current) || void 0 === s
                            ? void 0
                            : s.getValue()),
                      h = !1,
                      m = (0, er.mw)(f);
                    !e && m && (eP(!0), ez(!0), (h = !0));
                    let x = (0, er.tA)(f);
                    if ((!e && x && (eP(!0), eq(!0), (h = !0)), h)) return;
                    (eJ ||
                      (null == t ? void 0 : t.snippet.name) !== et.$C ||
                      tt(eV, f),
                      eT.length > 0 &&
                        (null == c || c.deltaDecorations(eT, []), eI([])));
                    let v = eo(),
                      b =
                        null == e$
                          ? void 0
                          : null ===
                                (i = e$.find(
                                  (e) => e.identifier === ec.selectedDatabaseId
                                )) || void 0 === i
                            ? void 0
                            : i.connectionString;
                    if (D.Qy && !b)
                      return y.Am.error(
                        'Unable to run query: Connection string is missing'
                      );
                    let { appendAutoLimit: j } = (0, er.c6)(f, eG),
                      w = (0, er.se)(f, eG);
                    (e6({
                      projectRef: ea.ref,
                      connectionString: b,
                      sql: (0, O.Jh)(w, { projectRef: ea.ref, role: v }),
                      autoLimit: j ? eG : void 0,
                      isRoleImpersonationEnabled: (0, F.Gm)(v),
                      contextualInvalidation: !0,
                      handleError: (e) => {
                        throw e;
                      },
                    }),
                      e8({
                        action: g.b.SQL_EDITOR_QUERY_RUN_BUTTON_CLICKED,
                        groups: {
                          project: null != p ? p : 'Unknown',
                          organization:
                            null !== (o = null == X ? void 0 : X.slug) &&
                            void 0 !== o
                              ? o
                              : 'Unknown',
                        },
                      }));
                  }
                },
                [eb, eV, te, ea, eJ, e6, eo, tt, ec.selectedDatabaseId, e$, eG]
              ),
              ta = (0, s.useCallback)(
                async (e, t) => {
                  if (!p) return console.error('Project ref is required');
                  if (!J) return console.error('Profile is required');
                  if (!ea) return console.error('Project is required');
                  try {
                    let n = (0, er.wI)({
                      id: (0, I.k$)(),
                      name: t,
                      sql: e,
                      owner_id: J.id,
                      project_id: ea.id,
                    });
                    (el.addSnippet({ projectRef: p, snippet: n }),
                      el.addNeedsSaving(n.id),
                      m.push('/project/'.concat(p, '/sql/').concat(n.id)));
                  } catch (e) {
                    y.Am.error(
                      'Failed to create new query: '.concat(e.message)
                    );
                  }
                },
                [
                  null == J ? void 0 : J.id,
                  null == ea ? void 0 : ea.id,
                  p,
                  m,
                  el,
                ]
              ),
              ts = (0, s.useCallback)(async () => {
                var e, t, n;
                try {
                  let r = el.snippets[eV],
                    a =
                      null === (e = el.results[eV]) || void 0 === e
                        ? void 0
                        : e[0];
                  ei.setAiAssistantPanel({
                    open: !0,
                    sqlSnippets: [
                      (null !==
                        (n =
                          null === (t = r.snippet.content) || void 0 === t
                            ? void 0
                            : t.sql) && void 0 !== n
                        ? n
                        : ''
                      )
                        .replace(et.eg, '')
                        .trim(),
                    ],
                    initialInput:
                      'Help me to debug the attached sql snippet which gives the following error: \n\n'.concat(
                        a.error.message
                      ),
                  });
                } catch (e) {
                  e &&
                    'object' == typeof e &&
                    'message' in e &&
                    'string' == typeof e.message &&
                    y.Am.error(
                      'Sorry, the assistant failed to debug your query! Please try again with a different one.'
                    );
                }
              }, [e4, eV, el.results, el.snippets]),
              ti = (0, s.useCallback)(async () => {
                try {
                  var e;
                  if ((ev(!0), !eh || !eE.current || !eL.current)) return;
                  let t = eE.current.getModel(),
                    n = eL.current.getModel();
                  if (!t || !n) return;
                  let r = n.modified.getValue();
                  if (ep === en.U.NewSnippet) {
                    let { title: e } = await e3({ sql: r });
                    await ta(r, e);
                  } else
                    (eE.current.executeEdits('apply-ai-edit', [
                      { text: r, range: t.getFullModelRange() },
                    ]),
                      ex && el.renameSnippet({ id: eV, name: ex }));
                  (e8({
                    action: g.b.ASSISTANT_SQL_DIFF_HANDLER_EVALUATED,
                    properties: { handlerAccepted: !0 },
                    groups: {
                      project: null != p ? p : 'Unknown',
                      organization:
                        null !== (e = null == X ? void 0 : X.slug) &&
                        void 0 !== e
                          ? e
                          : 'Unknown',
                    },
                  }),
                    ey(en.U.Modification),
                    ek(),
                    ew());
                } finally {
                  ev(!1);
                }
              }, [eh, ep, ta, e3, m, eV, ex, el]),
              tl = (0, s.useCallback)(() => {
                var e;
                (e8({
                  action: g.b.ASSISTANT_SQL_DIFF_HANDLER_EVALUATED,
                  properties: { handlerAccepted: !1 },
                  groups: {
                    project: null != p ? p : 'Unknown',
                    organization:
                      null !== (e = null == X ? void 0 : X.slug) && void 0 !== e
                        ? e
                        : 'Unknown',
                  },
                }),
                  ek(),
                  ew());
              }, [ew, ek, e8]),
              {
                complete: to,
                completion: tc,
                isLoading: td,
              } = (0, o.GO)({
                api: ''.concat(D.GW, '/api/ai/sql/complete'),
                body: {
                  projectRef: null == ea ? void 0 : ea.ref,
                  connectionString: null == ea ? void 0 : ea.connectionString,
                  includeSchemaMetadata: ef,
                },
                onResponse: (e) => {
                  if (!e.ok) throw Error('Failed to generate completion');
                },
                onError: (e) => {
                  y.Am.error('Failed to generate SQL: '.concat(e.message));
                },
              }),
              tu = async (e, t) => {
                try {
                  var n;
                  e_((e) => ({
                    ...e,
                    selection: t.selection,
                    beforeSelection: t.beforeSelection,
                    afterSelection: t.afterSelection,
                  }));
                  let r = await (0, w.oT)();
                  await to(e, {
                    headers: {
                      Authorization:
                        null !== (n = r.get('Authorization')) && void 0 !== n
                          ? n
                          : '',
                    },
                    body: {
                      completionMetadata: {
                        textBeforeCursor: t.beforeSelection,
                        textAfterCursor: t.afterSelection,
                        language: 'pgsql',
                        prompt: e,
                        selection: t.selection,
                      },
                    },
                  });
                } catch (e) {
                  e_((e) => ({ ...e, isLoading: !1 }));
                }
              };
            return (
              (0, s.useEffect)(() => {
                eV && (ew(), e_((e) => ({ ...e, isOpen: !1 })));
              }, [ew, eV]),
              (0, s.useEffect)(() => {
                let e = (e) => {
                  if (eb || eN.isOpen)
                    switch (e.key) {
                      case 'Enter':
                        ('macos' === i ? e.metaKey : e.ctrlKey) &&
                          eb &&
                          (ti(), ek());
                        return;
                      case 'Escape':
                        var t;
                        (eb && tl(),
                          ek(),
                          null === (t = eE.current) ||
                            void 0 === t ||
                            t.focus());
                        return;
                    }
                };
                return (
                  window.addEventListener('keydown', e),
                  () => window.removeEventListener('keydown', e)
                );
              }, [i, eb, eN.isOpen, ti, tl, ek]),
              (0, s.useEffect)(() => {
                if (eb) {
                  let e = eL.current,
                    t = null == e ? void 0 : e.getModel();
                  if (t && t.original && t.modified) {
                    (t.original.setValue(ej.original),
                      t.modified.setValue(ej.modified));
                    let n = e.getModifiedEditor(),
                      r = eN.startLineNumber;
                    n.revealLineInCenter(r);
                  }
                }
              }, [ep, eh]),
              (0, s.useEffect)(() => {
                if (e0) {
                  let e = e$.find((e) => e.identifier === p);
                  ec.setSelectedDatabaseId(null == e ? void 0 : e.identifier);
                }
              }, [e0, e$, p]),
              (0, s.useEffect)(() => {
                if (void 0 !== el.diffContent) {
                  var e, t, n, r, a;
                  let { diffType: s, sql: i } = el.diffContent,
                    l =
                      null === (e = eE.current) || void 0 === e
                        ? void 0
                        : e.getModel();
                  l &&
                    (0 ===
                    (null !==
                      (n =
                        null === (t = eE.current) || void 0 === t
                          ? void 0
                          : t.getValue()) && void 0 !== n
                      ? n
                      : ''
                    ).length
                      ? null === (r = eE.current) ||
                        void 0 === r ||
                        r.executeEdits('apply-ai-message', [
                          { text: ''.concat(i), range: l.getFullModelRange() },
                        ])
                      : (em({
                          original:
                            (null === (a = eE.current) || void 0 === a
                              ? void 0
                              : a.getValue()) || '',
                          modified: i,
                        }),
                        ey(s)));
                }
              }, [el.diffContent]),
              (0, s.useEffect)(() => {
                if (!tc) return;
                let e = eN.beforeSelection + eN.selection + eN.afterSelection,
                  t = eN.beforeSelection + tc + eN.afterSelection;
                td &&
                  (em({ original: e, modified: (0, T._)(t) }),
                  ey(en.U.Modification),
                  e_((e) => ({ ...e, isLoading: !1 })));
              }, [tc, eN.beforeSelection, eN.selection, eN.afterSelection, td]),
              (0, s.useEffect)(() => {
                if (eb) {
                  if (eL.current && eM) return (eQ(!0), () => eQ(!1));
                } else (eO(!1), eQ(!1));
              }, [eb, eM]),
              (0, r.jsxs)(r.Fragment, {
                children: [
                  (0, r.jsx)(ee, {
                    visible: eU,
                    hasDestructiveOperations: eF,
                    hasUpdateWithoutWhere: eZ,
                    onCancel: () => {
                      (eP(!1),
                        ez(!1),
                        eq(!1),
                        setTimeout(() => {
                          var e;
                          return null === (e = eE.current) || void 0 === e
                            ? void 0
                            : e.focus();
                        }, 100));
                    },
                    onConfirm: () => {
                      (eP(!1), tr(!0));
                    },
                    'data-sentry-element': 'RunQueryWarningModal',
                    'data-sentry-source-file': 'SQLEditor.tsx',
                  }),
                  (0, r.jsx)(Z.pO, {
                    className: 'flex h-full',
                    direction: 'horizontal',
                    autoSaveId: D.dA.SQL_EDITOR_AI_PANEL_SPLIT_SIZE,
                    'data-sentry-element': 'ResizablePanelGroup',
                    'data-sentry-source-file': 'SQLEditor.tsx',
                    children: (0, r.jsx)(Z.ee, {
                      minSize: 30,
                      'data-sentry-element': 'ResizablePanel',
                      'data-sentry-source-file': 'SQLEditor.tsx',
                      children: (0, r.jsxs)(Z.pO, {
                        className: 'relative',
                        direction: 'vertical',
                        autoSaveId: D.dA.SQL_EDITOR_SPLIT_SIZE,
                        'data-sentry-element': 'ResizablePanelGroup',
                        'data-sentry-source-file': 'SQLEditor.tsx',
                        children: [
                          (0, r.jsx)(Z.ee, {
                            maxSize: 70,
                            'data-sentry-element': 'ResizablePanel',
                            'data-sentry-source-file': 'SQLEditor.tsx',
                            children: (0, r.jsx)('div', {
                              className:
                                'flex-grow overflow-y-auto border-b h-full',
                              children: eX
                                ? (0, r.jsx)('div', {
                                    className:
                                      'flex h-full w-full items-center justify-center',
                                    children: (0, r.jsx)(u.Z, {
                                      className: 'animate-spin text-brand',
                                    }),
                                  })
                                : (0, r.jsxs)(r.Fragment, {
                                    children: [
                                      eb &&
                                        (0, r.jsxs)('div', {
                                          className: 'w-full h-full',
                                          children: [
                                            (0, r.jsx)(e7, {
                                              theme: 'supabase',
                                              language: 'pgsql',
                                              original: ej.original,
                                              modified: ej.modified,
                                              onMount: (e) => {
                                                ((eL.current = e), eO(!0));
                                              },
                                              options: {
                                                fontSize: 13,
                                                renderSideBySide: !1,
                                                minimap: { enabled: !1 },
                                                wordWrap: 'on',
                                                lineNumbers: 'on',
                                                folding: !1,
                                                padding: { top: 4 },
                                                lineNumbersMinChars: 3,
                                              },
                                            }),
                                            eK &&
                                              (0, r.jsx)(Y, {
                                                editor: eL.current,
                                                id: 'ask-ai-diff',
                                                heightInLines: 3,
                                                afterLineNumber: 0,
                                                beforeLineNumber: Math.max(
                                                  0,
                                                  eN.startLineNumber - 1
                                                ),
                                                children: (0, r.jsx)(W, {
                                                  onSubmit: (e) => {
                                                    tu(e, {
                                                      beforeSelection:
                                                        eN.beforeSelection,
                                                      selection:
                                                        eN.selection ||
                                                        ej.modified,
                                                      afterSelection:
                                                        eN.afterSelection,
                                                    });
                                                  },
                                                  value: eC,
                                                  onChange: eS,
                                                  onAccept: ti,
                                                  onReject: tl,
                                                  isDiffVisible: !0,
                                                  isLoading: td,
                                                }),
                                              }),
                                          ],
                                        }),
                                      (0, r.jsxs)(
                                        'div',
                                        {
                                          className: 'w-full h-full relative',
                                          children: [
                                            (0, r.jsx)(e5, {
                                              autoFocus: !0,
                                              id: eV,
                                              className: (0, q.cn)(
                                                eb && 'hidden'
                                              ),
                                              editorRef: eE,
                                              monacoRef: eR,
                                              executeQuery: tr,
                                              onHasSelection: eD,
                                              onPrompt: (e) => {
                                                let {
                                                  selection: t,
                                                  beforeSelection: n,
                                                  afterSelection: r,
                                                  startLineNumber: a,
                                                  endLineNumber: s,
                                                } = e;
                                                e_((e) => ({
                                                  ...e,
                                                  isOpen: !0,
                                                  selection: t,
                                                  beforeSelection: n,
                                                  afterSelection: r,
                                                  startLineNumber: a,
                                                  endLineNumber: s,
                                                }));
                                              },
                                            }),
                                            eE.current &&
                                              eN.isOpen &&
                                              !eb &&
                                              (0, r.jsx)(Y, {
                                                editor: eE.current,
                                                id: 'ask-ai',
                                                afterLineNumber:
                                                  eN.endLineNumber,
                                                beforeLineNumber: Math.max(
                                                  0,
                                                  eN.startLineNumber - 1
                                                ),
                                                heightInLines: 2,
                                                children: (0, r.jsx)(W, {
                                                  value: eC,
                                                  onChange: eS,
                                                  onSubmit: (e) => {
                                                    tu(e, {
                                                      beforeSelection:
                                                        eN.beforeSelection,
                                                      selection: eN.selection,
                                                      afterSelection:
                                                        eN.afterSelection,
                                                    });
                                                  },
                                                  isDiffVisible: !1,
                                                  isLoading: td,
                                                }),
                                              }),
                                            (0, r.jsx)(c.M, {
                                              children:
                                                !eN.isOpen &&
                                                !(null === (t = eE.current) ||
                                                void 0 === t
                                                  ? void 0
                                                  : t.getValue()) &&
                                                (0, r.jsxs)(d.E.p, {
                                                  initial: { y: 5, opacity: 0 },
                                                  animate: { y: 0, opacity: 1 },
                                                  exit: { y: 5, opacity: 0 },
                                                  className:
                                                    'text-foreground-lighter absolute bottom-4 left-4 z-10 font-mono text-xs flex items-center gap-1',
                                                  children: [
                                                    'Hit ',
                                                    'macos' === i
                                                      ? (0, r.jsx)(f.Z, {
                                                          size: 12,
                                                        })
                                                      : 'CTRL+',
                                                    'K to edit with the Assistant',
                                                  ],
                                                }),
                                            }),
                                          ],
                                        },
                                        eV
                                      ),
                                    ],
                                  }),
                            }),
                          }),
                          (0, r.jsx)(Z.Dp, {
                            withHandle: !0,
                            'data-sentry-element': 'ResizableHandle',
                            'data-sentry-source-file': 'SQLEditor.tsx',
                          }),
                          (0, r.jsx)(Z.ee, {
                            maxSize: 70,
                            'data-sentry-element': 'ResizablePanel',
                            'data-sentry-source-file': 'SQLEditor.tsx',
                            children: eX
                              ? (0, r.jsx)('div', {
                                  className:
                                    'flex h-full w-full items-center justify-center',
                                  children: (0, r.jsx)(u.Z, {
                                    className: 'animate-spin text-brand',
                                  }),
                                })
                              : (0, r.jsx)(e9, {
                                  id: eV,
                                  isExecuting: te,
                                  isDisabled: eb,
                                  hasSelection: eA,
                                  prettifyQuery: tn,
                                  executeQuery: tr,
                                  onDebug: ts,
                                }),
                          }),
                          (0, r.jsx)(Z.ee, {
                            maxSize: 10,
                            minSize: 10,
                            className: 'max-h-9',
                            'data-sentry-element': 'ResizablePanel',
                            'data-sentry-source-file': 'SQLEditor.tsx',
                            children:
                              (null == eW ? void 0 : eW.rows) !== void 0 &&
                              !te &&
                              (0, r.jsxs)(v.x, {
                                className:
                                  'flex items-center justify-between gap-2',
                                children: [
                                  (0, r.jsxs)(K.u, {
                                    children: [
                                      (0, r.jsx)(K.aJ, {
                                        children: (0, r.jsxs)('p', {
                                          className: 'text-xs',
                                          children: [
                                            (0, r.jsxs)('span', {
                                              className: 'text-foreground',
                                              children: [
                                                eW.rows.length,
                                                ' row',
                                                eW.rows.length > 1 ? 's' : '',
                                              ],
                                            }),
                                            (0, r.jsx)('span', {
                                              className:
                                                'text-foreground-lighter ml-1',
                                              children:
                                                void 0 !== eW.autoLimit &&
                                                ' (Limited to only '.concat(
                                                  eW.autoLimit,
                                                  ' rows)'
                                                ),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, r.jsx)(K._v, {
                                        className: 'max-w-xs',
                                        children: (0, r.jsxs)('p', {
                                          className: 'flex flex-col gap-y-1',
                                          children: [
                                            (0, r.jsx)('span', {
                                              children:
                                                'Results are automatically limited to preserve browser performance, in particular if your query returns an exceptionally large number of rows.',
                                            }),
                                            (0, r.jsx)('span', {
                                              className:
                                                'text-foreground-light',
                                              children:
                                                'You may change or remove this limit from the dropdown on the right',
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  }),
                                  void 0 !== eW.autoLimit &&
                                    (0, r.jsxs)(Q.h_, {
                                      children: [
                                        (0, r.jsx)(Q.$F, {
                                          asChild: !0,
                                          children: (0, r.jsxs)(B.z, {
                                            type: 'default',
                                            iconRight: (0, r.jsx)(h.Z, {
                                              size: 14,
                                            }),
                                            children: [
                                              'Limit results to:',
                                              ' ',
                                              null ===
                                                (n = et.Tu.find(
                                                  (e) => e.value === el.limit
                                                )) || void 0 === n
                                                ? void 0
                                                : n.label,
                                            ],
                                          }),
                                        }),
                                        (0, r.jsx)(Q.AW, {
                                          className: 'w-40',
                                          align: 'end',
                                          children: (0, r.jsx)(Q._x, {
                                            value: el.limit.toString(),
                                            onValueChange: (e) =>
                                              el.setLimit(Number(e)),
                                            children: et.Tu.map((e) =>
                                              (0, r.jsx)(
                                                Q.qB,
                                                {
                                                  value: e.value.toString(),
                                                  children: e.label,
                                                },
                                                e.label
                                              )
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              })
            );
          };
        var te = n(5294),
          tt = n(71484),
          tn = n(95767);
        let tr = () => {
          let e = (0, a.useRouter)(),
            { id: t, ref: n, content: l, skip: o } = (0, i.U)(),
            c = (0, U.WZ)(),
            d = (0, z.B0)(),
            u = (0, z.Fy)(n),
            { data: f } = (0, tt.N)(
              { projectRef: n, id: t },
              {
                retry: !1,
                enabled: !!('new' !== t && 'function' == typeof d.addSnippet),
              }
            );
          return (
            (0, s.useEffect)(() => {
              n && f && d.setSnippet(n, f);
            }, [n, f]),
            (0, s.useEffect)(() => {
              'new' === t &&
                'true' !== o &&
                void 0 !== c.dashboardHistory.sql &&
                void 0 === l &&
                void 0 !== u.find((e) => e.id === c.dashboardHistory.sql) &&
                e.push(
                  '/project/'.concat(n, '/sql/').concat(c.dashboardHistory.sql)
                );
            }, [t, u, l]),
            (0, r.jsx)('div', {
              className: 'flex-1 overflow-auto',
              'data-sentry-component': 'SqlEditor',
              'data-sentry-source-file': '[id].tsx',
              children: (0, r.jsx)(e6, {
                'data-sentry-element': 'SQLEditor',
                'data-sentry-source-file': '[id].tsx',
              }),
            })
          );
        };
        tr.getLayout = (e) =>
          (0, r.jsx)(tn.Z, {
            children: (0, r.jsx)(te.Z, { title: 'SQL', children: e }),
          });
        var ta = tr;
      },
      62210: function (e, t, n) {
        'use strict';
        n.d(t, {
          r: function () {
            return d;
          },
        });
        var r = n(97458),
          a = n(56384),
          s = n(31706),
          i = n(52983),
          l = n(65092);
        let o = (0, s.j)(
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
          c = (0, s.j)(
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
          d = i.forwardRef((e, t) => {
            let { className: n, size: s, ...i } = e;
            return (0, r.jsx)(a.fC, {
              className: (0, l.cn)(o({ size: s }), n),
              ...i,
              ref: t,
              children: (0, r.jsx)(a.bU, {
                className: (0, l.cn)(c({ size: s })),
              }),
            });
          });
        d.displayName = a.fC.displayName;
      },
      84012: function (e, t, n) {
        e.exports = n(84736);
      },
      26914: function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r,
          a = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ((r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r));
              }
            }
            return function (t, n, r) {
              return (n && e(t.prototype, n), r && e(t, r), t);
            };
          })(),
          s = (r = n(52983)) && r.__esModule ? r : { default: r },
          i = n(47413),
          l = n(58984),
          o = (function (e) {
            function t(e) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw TypeError('Cannot call a class as a function');
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return t && ('object' == typeof t || 'function' == typeof t)
                  ? t
                  : e;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return ((n.state = {}), n);
            }
            return (
              (function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw TypeError(
                    'Super expression must either be null or a function, not ' +
                      typeof t
                  );
                ((e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t)));
              })(t, e),
              a(t, [
                {
                  key: 'buildURI',
                  value: function () {
                    return i.buildURI.apply(void 0, arguments);
                  },
                },
                {
                  key: 'componentDidMount',
                  value: function () {
                    var e = this.props,
                      t = e.data,
                      n = e.headers,
                      r = e.separator,
                      a = e.enclosingCharacter,
                      s = e.uFEFF,
                      i = e.target,
                      l = e.specs,
                      o = e.replace;
                    this.state.page = window.open(
                      this.buildURI(t, s, n, r, a),
                      i,
                      l,
                      o
                    );
                  },
                },
                {
                  key: 'getWindow',
                  value: function () {
                    return this.state.page;
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    return null;
                  },
                },
              ]),
              t
            );
          })(s.default.Component);
        ((o.defaultProps = Object.assign(l.defaultProps, { target: '_blank' })),
          (o.propTypes = l.propTypes),
          (t.default = o));
      },
      37989: function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r,
          a =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ((r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r));
              }
            }
            return function (t, n, r) {
              return (n && e(t.prototype, n), r && e(t, r), t);
            };
          })(),
          i = (r = n(52983)) && r.__esModule ? r : { default: r },
          l = n(47413),
          o = n(58984),
          c = (function (e) {
            function t(e) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw TypeError('Cannot call a class as a function');
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return t && ('object' == typeof t || 'function' == typeof t)
                  ? t
                  : e;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
              return ((n.buildURI = n.buildURI.bind(n)), n);
            }
            return (
              (function (e, t) {
                if ('function' != typeof t && null !== t)
                  throw TypeError(
                    'Super expression must either be null or a function, not ' +
                      typeof t
                  );
                ((e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t)));
              })(t, e),
              s(t, [
                {
                  key: 'buildURI',
                  value: function () {
                    return l.buildURI.apply(void 0, arguments);
                  },
                },
                {
                  key: 'handleLegacy',
                  value: function (e) {
                    var t =
                      arguments.length > 1 &&
                      void 0 !== arguments[1] &&
                      arguments[1];
                    if (window.navigator.msSaveOrOpenBlob) {
                      e.preventDefault();
                      var n = this.props,
                        r = n.data,
                        a = n.headers,
                        s = n.separator,
                        i = n.filename,
                        o = n.enclosingCharacter,
                        c = n.uFEFF,
                        d = t && 'function' == typeof r ? r() : r,
                        u = new Blob([
                          c ? '\uFEFF' : '',
                          (0, l.toCSV)(d, a, s, o),
                        ]);
                      return (window.navigator.msSaveBlob(u, i), !1);
                    }
                  },
                },
                {
                  key: 'handleAsyncClick',
                  value: function (e) {
                    var t = this;
                    this.props.onClick(e, function (n) {
                      if (!1 === n) {
                        e.preventDefault();
                        return;
                      }
                      t.handleLegacy(e, !0);
                    });
                  },
                },
                {
                  key: 'handleSyncClick',
                  value: function (e) {
                    if (!1 === this.props.onClick(e)) {
                      e.preventDefault();
                      return;
                    }
                    this.handleLegacy(e);
                  },
                },
                {
                  key: 'handleClick',
                  value: function () {
                    var e = this;
                    return function (t) {
                      if ('function' == typeof e.props.onClick)
                        return e.props.asyncOnClick
                          ? e.handleAsyncClick(t)
                          : e.handleSyncClick(t);
                      e.handleLegacy(t);
                    };
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var e = this,
                      t = this.props,
                      n = t.data,
                      r = t.headers,
                      s = t.separator,
                      l = t.filename,
                      o = t.uFEFF,
                      c = t.children,
                      d = (t.onClick, t.asyncOnClick, t.enclosingCharacter),
                      u = (function (e, t) {
                        var n = {};
                        for (var r in e)
                          !(t.indexOf(r) >= 0) &&
                            Object.prototype.hasOwnProperty.call(e, r) &&
                            (n[r] = e[r]);
                        return n;
                      })(t, [
                        'data',
                        'headers',
                        'separator',
                        'filename',
                        'uFEFF',
                        'children',
                        'onClick',
                        'asyncOnClick',
                        'enclosingCharacter',
                      ]),
                      f =
                        'undefined' == typeof window
                          ? ''
                          : this.buildURI(n, o, r, s, d);
                    return i.default.createElement(
                      'a',
                      a({ download: l }, u, {
                        ref: function (t) {
                          return (e.link = t);
                        },
                        target: '_self',
                        href: f,
                        onClick: this.handleClick(),
                      }),
                      c
                    );
                  },
                },
              ]),
              t
            );
          })(i.default.Component);
        ((c.defaultProps = o.defaultProps),
          (c.propTypes = o.propTypes),
          (t.default = c));
      },
      47413: function (e, t) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              };
        function r(e) {
          if (!Array.isArray(e)) return Array.from(e);
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n;
        }
        var a = (t.isSafari = function () {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          }),
          s = (t.isJsons = function (e) {
            return (
              Array.isArray(e) &&
              e.every(function (e) {
                return (
                  (void 0 === e ? 'undefined' : n(e)) === 'object' &&
                  !(e instanceof Array)
                );
              })
            );
          }),
          i = (t.isArrays = function (e) {
            return (
              Array.isArray(e) &&
              e.every(function (e) {
                return Array.isArray(e);
              })
            );
          }),
          l = (t.jsonsHeaders = function (e) {
            return Array.from(
              e
                .map(function (e) {
                  return Object.keys(e);
                })
                .reduce(function (e, t) {
                  return new Set([].concat(r(e), r(t)));
                }, [])
            );
          }),
          o = (t.jsons2arrays = function (e, t) {
            var n = (t = t || l(e)),
              a = t;
            return (
              s(t) &&
                ((n = t.map(function (e) {
                  return e.label;
                })),
                (a = t.map(function (e) {
                  return e.key;
                }))),
              [n].concat(
                r(
                  e.map(function (e) {
                    return a.map(function (t) {
                      return c(t, e);
                    });
                  })
                )
              )
            );
          }),
          c = (t.getHeaderValue = function (e, t) {
            var n = e
              .replace(/\[([^\]]+)]/g, '.$1')
              .split('.')
              .reduce(function (e, t, n, r) {
                var a = e[t];
                if (null != a) return a;
                r.splice(1);
              }, t);
            return void 0 === n ? (e in t ? t[e] : '') : n;
          }),
          d = (t.elementOrEmpty = function (e) {
            return null == e ? '' : e;
          }),
          u = (t.joiner = function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : ',',
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : '"';
            return e
              .filter(function (e) {
                return e;
              })
              .map(function (e) {
                return e
                  .map(function (e) {
                    return d(e);
                  })
                  .map(function (e) {
                    return '' + n + e + n;
                  })
                  .join(t);
              })
              .join('\n');
          }),
          f = (t.arrays2csv = function (e, t, n, a) {
            return u(t ? [t].concat(r(e)) : e, n, a);
          }),
          h = (t.jsons2csv = function (e, t, n, r) {
            return u(o(e, t), n, r);
          }),
          m = (t.string2csv = function (e, t, n, r) {
            return t ? t.join(n) + '\n' + e : e.replace(/"/g, '""');
          }),
          p = (t.toCSV = function (e, t, n, r) {
            if (s(e)) return h(e, t, n, r);
            if (i(e)) return f(e, t, n, r);
            if ('string' == typeof e) return m(e, t, n);
            throw TypeError(
              'Data should be a "String", "Array of arrays" OR "Array of objects" '
            );
          });
        t.buildURI = function (e, t, n, r, s) {
          var i = p(e, n, r, s),
            l = a() ? 'application/csv' : 'text/csv',
            o = new Blob([t ? '\uFEFF' : '', i], { type: l }),
            c = 'data:' + l + ';charset=utf-8,' + (t ? '\uFEFF' : '') + i,
            d = window.URL || window.webkitURL;
          return void 0 === d.createObjectURL ? c : d.createObjectURL(o);
        };
      },
      84736: function (e, t, n) {
        'use strict';
        t.CSVLink = void 0;
        var r = s(n(26914)),
          a = s(n(37989));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (r.default, (t.CSVLink = a.default));
      },
      58984: function (e, t, n) {
        'use strict';
        (Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.PropsNotForwarded = t.defaultProps = t.propTypes = void 0),
          (r = n(52983)) && r.__esModule);
        var r,
          a = n(7862);
        ((t.propTypes = {
          data: (0, a.oneOfType)([a.string, a.array, a.func]).isRequired,
          headers: a.array,
          target: a.string,
          separator: a.string,
          filename: a.string,
          uFEFF: a.bool,
          onClick: a.func,
          asyncOnClick: a.bool,
          enclosingCharacter: a.string,
        }),
          (t.defaultProps = {
            separator: ',',
            filename: 'generatedBy_react-csv.csv',
            uFEFF: !0,
            asyncOnClick: !1,
            enclosingCharacter: '"',
          }),
          (t.PropsNotForwarded = ['data', 'headers']));
      },
      56384: function (e, t, n) {
        'use strict';
        n.d(t, {
          bU: function () {
            return w;
          },
          fC: function () {
            return j;
          },
        });
        var r = n(83573),
          a = n(52983),
          s = n(12527),
          i = n(61031),
          l = n(95831),
          o = n(29650),
          c = n(87178),
          d = n(56807),
          u = n(36986);
        let f = 'Switch',
          [h, m] = (0, l.b)(f),
          [p, y] = h(f),
          x = (0, a.forwardRef)((e, t) => {
            let {
                __scopeSwitch: n,
                name: l,
                checked: c,
                defaultChecked: d,
                required: f,
                disabled: h,
                value: m = 'on',
                onCheckedChange: y,
                ...x
              } = e,
              [g, j] = (0, a.useState)(null),
              w = (0, i.e)(t, (e) => j(e)),
              N = (0, a.useRef)(!1),
              _ = !g || !!g.closest('form'),
              [C = !1, S] = (0, o.T)({ prop: c, defaultProp: d, onChange: y });
            return (0, a.createElement)(
              p,
              { scope: n, checked: C, disabled: h },
              (0, a.createElement)(
                u.WV.button,
                (0, r.Z)(
                  {
                    type: 'button',
                    role: 'switch',
                    'aria-checked': C,
                    'aria-required': f,
                    'data-state': b(C),
                    'data-disabled': h ? '' : void 0,
                    disabled: h,
                    value: m,
                  },
                  x,
                  {
                    ref: w,
                    onClick: (0, s.M)(e.onClick, (e) => {
                      (S((e) => !e),
                        _ &&
                          ((N.current = e.isPropagationStopped()),
                          N.current || e.stopPropagation()));
                    }),
                  }
                )
              ),
              _ &&
                (0, a.createElement)(v, {
                  control: g,
                  bubbles: !N.current,
                  name: l,
                  value: m,
                  checked: C,
                  required: f,
                  disabled: h,
                  style: { transform: 'translateX(-100%)' },
                })
            );
          }),
          g = (0, a.forwardRef)((e, t) => {
            let { __scopeSwitch: n, ...s } = e,
              i = y('SwitchThumb', n);
            return (0, a.createElement)(
              u.WV.span,
              (0, r.Z)(
                {
                  'data-state': b(i.checked),
                  'data-disabled': i.disabled ? '' : void 0,
                },
                s,
                { ref: t }
              )
            );
          }),
          v = (e) => {
            let { control: t, checked: n, bubbles: s = !0, ...i } = e,
              l = (0, a.useRef)(null),
              o = (0, c.D)(n),
              u = (0, d.t)(t);
            return (
              (0, a.useEffect)(() => {
                let e = l.current,
                  t = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    'checked'
                  ).set;
                if (o !== n && t) {
                  let r = new Event('click', { bubbles: s });
                  (t.call(e, n), e.dispatchEvent(r));
                }
              }, [o, n, s]),
              (0, a.createElement)(
                'input',
                (0, r.Z)(
                  { type: 'checkbox', 'aria-hidden': !0, defaultChecked: n },
                  i,
                  {
                    tabIndex: -1,
                    ref: l,
                    style: {
                      ...e.style,
                      ...u,
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
        function b(e) {
          return e ? 'checked' : 'unchecked';
        }
        let j = x,
          w = g;
      },
    },
    function (e) {
      (e.O(
        0,
        [
          6665, 7623, 588, 305, 6402, 1864, 8703, 1018, 4975, 4376, 9621, 3954,
          659, 9911, 3760, 4637, 8069, 9344, 9192, 6739, 3302, 4197, 8985, 3491,
          5518, 5538, 4556, 2549, 1379, 272, 3861, 2728, 245, 5767, 876, 5433,
          9903, 3443, 6273, 5294, 9774, 2888, 179,
        ],
        function () {
          return e((e.s = 93906));
        }
      ),
        (_N_E = e.O()));
    },
  ]));
