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
      (e._sentryDebugIds[t] = 'ba1028e9-4c32-4141-bfc6-a384c45e9dbe'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-ba1028e9-4c32-4141-bfc6-a384c45e9dbe'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3861],
    {
      45213: function (e, t, n) {
        var s = {
          './androidkotlin/supabasekt/content': [92872, 8703, 2872],
          './astro/supabasejs/content': [36747, 8703, 6747],
          './drizzle/content': [18317, 8703, 8317],
          './exporeactnative/supabasejs/content': [60399, 8703, 399],
          './flutter/supabaseflutter/content': [89457, 8703, 9457],
          './ionicangular/supabasejs/content': [83818, 8703, 3818],
          './ionicreact/supabasejs/content': [8226, 8703, 8226],
          './nextjs/app/supabasejs/content': [97105, 8703, 7105],
          './nextjs/pages/supabasejs/content': [48701, 8703, 8701],
          './nuxt/supabasejs/content': [40323, 8703, 323],
          './prisma/content': [38410, 8703, 8410],
          './react/create-react-app/supabasejs/content': [21262, 8703, 1262],
          './react/vite/supabasejs/content': [57695, 8703, 7695],
          './refine/supabasejs/content': [34081, 8703, 4081],
          './remix/supabasejs/content': [17911, 8703, 7911],
          './solidjs/supabasejs/content': [66980, 8703, 6980],
          './sveltekit/supabasejs/content': [19890, 8703, 9890],
          './swift/supabaseswift/content': [61029, 8703, 1029],
          './vuejs/supabasejs/content': [35221, 8703, 5221],
        };
        function a(e) {
          if (!n.o(s, e))
            return Promise.resolve().then(function () {
              var t = Error("Cannot find module '" + e + "'");
              throw ((t.code = 'MODULE_NOT_FOUND'), t);
            });
          var t = s[e],
            a = t[0];
          return Promise.all(t.slice(1).map(n.e)).then(function () {
            return n(a);
          });
        }
        ((a.keys = function () {
          return Object.keys(s);
        }),
          (a.id = 45213),
          (e.exports = a));
      },
      92933: function (e, t, n) {
        'use strict';
        n.d(t, {
          N: function () {
            return tT;
          },
        });
        var s = n(97458),
          a = n(83145),
          r = n.n(a),
          o = n(32691),
          i = n(52983),
          l = n(12436),
          c = n(198),
          d = n(14306),
          u = n(4839),
          x = n(62213),
          p = n(98601),
          m = n(30457),
          h = n(45437),
          f = n(5529),
          g = n(1724),
          j = n(63621),
          y = n(98502),
          v = n(2343),
          b = n(9108),
          N = n(82288),
          w = n(75541),
          k = n(45536),
          S = n(619),
          _ = n(65092),
          C = n(36210),
          P = n(22714),
          D = n(49935),
          z = n(11221),
          F = n(51e3),
          L = n(33526);
        let E = [
            {
              id: 'uri',
              label: 'URI',
              contentType: 'input',
              lang: 'bash',
              fileTitle: void 0,
            },
            {
              id: 'psql',
              label: 'PSQL',
              contentType: 'code',
              lang: 'bash',
              fileTitle: void 0,
            },
            {
              id: 'golang',
              label: 'Golang',
              contentType: 'code',
              lang: 'go',
              fileTitle: '.env',
            },
            {
              id: 'jdbc',
              label: 'JDBC',
              contentType: 'input',
              lang: 'bash',
              fileTitle: void 0,
            },
            {
              id: 'dotnet',
              label: '.NET',
              contentType: 'code',
              lang: 'csharp',
              fileTitle: 'appsettings.json',
            },
            {
              id: 'nodejs',
              label: 'Node.js',
              contentType: 'code',
              lang: 'js',
              fileTitle: '.env',
            },
            {
              id: 'php',
              label: 'PHP',
              contentType: 'code',
              lang: 'php',
              fileTitle: '.env',
            },
            {
              id: 'python',
              label: 'Python',
              contentType: 'code',
              lang: 'python',
              fileTitle: '.env',
            },
            {
              id: 'sqlalchemy',
              label: 'SQLAlchemy',
              contentType: 'code',
              lang: 'python',
              fileTitle: '.env',
            },
          ],
          A = {
            host: { key: 'host', description: 'The hostname of your database' },
            port: {
              key: 'port',
              description: 'Port number for the connection',
            },
            database: { key: 'database', description: 'Default database name' },
            user: { key: 'user', description: 'Database user' },
            pool_mode: {
              key: 'pool_mode',
              description: 'Connection pooling behavior',
            },
          },
          I = [
            {
              key: 'nextjs',
              label: 'Next.js',
              icon: 'nextjs',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/nextjs',
              children: [
                {
                  key: 'app',
                  label: 'App Router',
                  icon: '',
                  children: [
                    {
                      key: 'supabasejs',
                      label: 'supabase-js',
                      icon: 'supabase',
                      children: [],
                    },
                  ],
                },
                {
                  key: 'pages',
                  label: 'Pages Router',
                  icon: '',
                  children: [
                    {
                      key: 'supabasejs',
                      label: 'Supabase-js',
                      children: [],
                      icon: 'supabase',
                    },
                  ],
                },
              ],
            },
            {
              key: 'remix',
              label: 'Remix',
              icon: 'remix',
              guideLink:
                'https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=remix&environment=remix-loader',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'react',
              label: 'React',
              icon: 'react',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/reactjs',
              children: [
                {
                  key: 'create-react-app',
                  label: 'Create React App',
                  icon: 'react',
                  children: [
                    {
                      key: 'supabasejs',
                      label: 'supabase-js',
                      icon: 'supabase',
                      children: [],
                    },
                  ],
                },
                {
                  key: 'vite',
                  label: 'Vite',
                  icon: 'vite',
                  children: [
                    {
                      key: 'supabasejs',
                      label: 'Supabase-js',
                      children: [],
                      icon: 'supabase',
                    },
                  ],
                },
              ],
            },
            {
              key: 'nuxt',
              label: 'Nuxt',
              icon: 'nuxt',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'vuejs',
              label: 'Vue.JS',
              icon: 'vuejs',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/vue',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'sveltekit',
              label: 'SvelteKit',
              icon: 'sveltekit',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'solidjs',
              label: 'Solid.js',
              icon: 'solidjs',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/solidjs',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'astro',
              label: 'Astro',
              icon: 'astro',
              guideLink: 'https://docs.astro.build/en/guides/backend/supabase/',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'refine',
              label: 'refine',
              icon: 'refine',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/quickstarts/refine',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
          ],
          T = [
            {
              key: 'exporeactnative',
              label: 'Expo React Native',
              icon: 'expo',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'flutter',
              label: 'Flutter',
              icon: 'flutter',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-flutter',
              children: [
                {
                  key: 'supabaseflutter',
                  label: 'supabase-flutter',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'ionicreact',
              label: 'Ionic React',
              icon: 'react',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-react',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'swift',
              label: 'Swift',
              icon: 'swift',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-swift',
              children: [
                {
                  key: 'supabaseswift',
                  label: 'supabase-swift',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'androidkotlin',
              label: 'Android Kotlin',
              icon: 'kotlin',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-kotlin',
              children: [
                {
                  key: 'supabasekt',
                  label: 'supabase-kt',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
            {
              key: 'ionicangular',
              label: 'Ionic Angular',
              icon: 'ionic-angular',
              guideLink:
                'https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-angular',
              children: [
                {
                  key: 'supabasejs',
                  label: 'Supabase-js',
                  children: [],
                  icon: 'supabase',
                },
              ],
            },
          ],
          Z = [
            {
              key: 'prisma',
              label: 'Prisma',
              icon: 'prisma',
              guideLink: 'https://supabase.com/partners/integrations/prisma',
              children: [],
            },
            {
              key: 'drizzle',
              label: 'Drizzle',
              icon: 'drizzle',
              guideLink:
                'https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle',
              children: [],
            },
          ],
          R = [
            { key: 'direct', label: 'Connection String', obj: [] },
            { key: 'frameworks', label: 'App Frameworks', obj: I },
            { key: 'mobiles', label: 'Mobile Frameworks', obj: T },
            { key: 'orms', label: 'ORMs', obj: Z },
          ];
        var O = n(98686),
          B = n(21693),
          U = n(91587),
          q = n(18186),
          W = n(90839),
          M = n(7756),
          V = n(62507),
          H = n(58596);
        let Y = (e) => {
          let { parameters: t } = e,
            [n, a] = (0, i.useState)(!1),
            [r, o] = (0, i.useState)({});
          return (0, s.jsxs)(F.zF, {
            open: n,
            onOpenChange: a,
            className: 'group -space-y-px',
            'data-sentry-element': 'Collapsible_Shadcn_',
            'data-sentry-component': 'ConnectionParameters',
            'data-sentry-source-file': 'ConnectionParameters.tsx',
            children: [
              (0, s.jsx)(F.wy, {
                asChild: !0,
                className:
                  'w-full justify-start rounded-t-none !last:rounded-b group-data-[state=open]:rounded-b-none border-light px-3',
                'data-sentry-element': 'CollapsibleTrigger_Shadcn_',
                'data-sentry-source-file': 'ConnectionParameters.tsx',
                children: (0, s.jsx)(W.z, {
                  type: 'default',
                  size: 'tiny',
                  className: 'text-foreground-lighter !bg-dash-sidebar',
                  icon: (0, s.jsx)(U.Z, {
                    className: (0, _.cn)(
                      'text-foreground-muted transition-transform',
                      n ? 'rotate-90' : ''
                    ),
                  }),
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'ConnectionParameters.tsx',
                  children: 'View parameters',
                }),
              }),
              (0, s.jsxs)(F.Fw, {
                className: 'bg-dash-sidebar rounded-b border font-mono text-sm',
                'data-sentry-element': 'CollapsibleContent_Shadcn_',
                'data-sentry-source-file': 'ConnectionParameters.tsx',
                children: [
                  (0, s.jsx)('div', {
                    className: 'px-4 py-2',
                    children: t.map((e) =>
                      (0, s.jsx)(
                        'div',
                        {
                          className: 'py-0.5 group/param',
                          children: (0, s.jsxs)('div', {
                            className: 'text-xs flex items-center',
                            children: [
                              (0, s.jsxs)('span', {
                                className: 'text-foreground-lighter',
                                children: [e.key, ': '],
                              }),
                              (0, s.jsx)('span', {
                                className: 'ml-1 text-foreground',
                                children: e.value,
                              }),
                              (0, s.jsx)('button', {
                                onClick: () => {
                                  (0, k.vQ)(e.value, () => {
                                    (o((t) => ({ ...t, [e.key]: !0 })),
                                      setTimeout(() => {
                                        o((t) => ({ ...t, [e.key]: !1 }));
                                      }, 1e3));
                                  });
                                },
                                className: (0, _.cn)(
                                  'text-foreground-lighter',
                                  'ml-2 opacity-0 group-hover/param:opacity-100',
                                  'text-foreground rounded-sm p-1',
                                  r[e.key] && 'opacity-100',
                                  'transition-all'
                                ),
                                children: r[e.key]
                                  ? (0, s.jsx)(V.Z, {
                                      size: 12,
                                      strokeWidth: 1.5,
                                    })
                                  : (0, s.jsx)(H.Z, {
                                      size: 12,
                                      strokeWidth: 1.5,
                                    }),
                              }),
                            ],
                          }),
                        },
                        e.key
                      )
                    ),
                  }),
                  (0, s.jsx)(z.Z, {
                    'data-sentry-element': 'Separator',
                    'data-sentry-source-file': 'ConnectionParameters.tsx',
                  }),
                  (0, s.jsx)('div', {
                    className:
                      'text-foreground-muted text-xs px-4 py-1 font-sans',
                    children:
                      'For security reasons, your database password is never shown.',
                  }),
                ],
              }),
            ],
          });
        };
        var G = n(59171),
          Q = n(16402),
          J = n(1846);
        let K = (e) => {
            let { x: t, y1: n, y2: a, isActive: r } = e;
            return (0, s.jsx)(G.M, {
              'data-sentry-element': 'AnimatePresence',
              'data-sentry-component': 'FlowingLine',
              'data-sentry-source-file': 'PoolerIcons.tsx',
              children:
                r &&
                (0, s.jsxs)('svg', {
                  width: 2,
                  height: a - n + 6,
                  viewBox: '0 0 '.concat(2, ' ').concat(a - n + 6),
                  style: { position: 'absolute', left: t - 1, top: n - 3 },
                  children: [
                    (0, s.jsx)(Q.E.line, {
                      x1: '1',
                      y1: '3',
                      x2: '1',
                      y2: a - n + 3,
                      stroke: 'hsl(var(--foreground-default) / 0.6)',
                      strokeWidth: 1,
                      strokeLinecap: 'round',
                      initial: { pathLength: 0, opacity: 0 },
                      animate: { pathLength: 1, opacity: 1 },
                      exit: { pathLength: 0, opacity: 0 },
                      transition: { duration: 0.2 },
                    }),
                    (0, s.jsx)('defs', {
                      children: (0, s.jsxs)(Q.E.linearGradient, {
                        id: 'lineGradient-'
                          .concat(t, '-')
                          .concat(n, '-')
                          .concat(a),
                        gradientUnits: 'userSpaceOnUse',
                        x1: '2',
                        y1: '-20',
                        x2: '2',
                        y2: a - n + 26,
                        animate: { y1: [-20, a - n + 26], y2: [0, a - n + 46] },
                        transition: {
                          duration: 1,
                          repeat: 1 / 0,
                          ease: 'linear',
                          repeatDelay: 0,
                        },
                        children: [
                          (0, s.jsx)('stop', {
                            offset: '0',
                            stopColor: 'hsl(var(--foreground-default) / 0.6)',
                            stopOpacity: '0',
                          }),
                          (0, s.jsx)('stop', {
                            offset: '0.8',
                            stopColor: 'hsl(var(--foreground-default))',
                          }),
                          (0, s.jsx)('stop', {
                            offset: '1',
                            stopColor: 'hsl(var(--foreground-default) / 0.6)',
                            stopOpacity: '0',
                          }),
                        ],
                      }),
                    }),
                    (0, s.jsx)(Q.E.line, {
                      x1: '2',
                      y1: '3',
                      x2: '2',
                      y2: a - n + 3,
                      stroke: 'url(#lineGradient-'
                        .concat(t, '-')
                        .concat(n, '-')
                        .concat(a, ')'),
                      strokeWidth: 1,
                      strokeLinecap: 'round',
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: { duration: 0.2 },
                    }),
                  ],
                }),
            });
          },
          X = (e) => {
            let { isActive: t } = e;
            return (0, s.jsx)(Q.E.rect, {
              width: es,
              height: 3,
              className: (0, _.cn)(
                'fill-background-surface-200 stroke-border-stronger stroke-[1]',
                t && 'stroke-foreground/40'
              ),
              x: en,
              y: ee,
              rx: '1.5',
              animate: { boxShadow: t ? '0 0 8px #86efac' : '0 0 0px #86efac' },
              transition: { duration: 0.2 },
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'TopRect',
              'data-sentry-source-file': 'PoolerIcons.tsx',
            });
          },
          $ = (e) => {
            let { isActive: t } = e;
            return (0, s.jsxs)('g', {
              'data-sentry-element': 'g',
              'data-sentry-component': 'BottomRect',
              'data-sentry-source-file': 'PoolerIcons.tsx',
              children: [
                (0, s.jsx)(Q.E.rect, {
                  width: es,
                  height: 32,
                  className: (0, _.cn)(
                    'stroke-border fill-background-surface-100 stroke-[1] transition-all',
                    t && 'fill-background-surface-100 stroke-border-stronger',
                    'flex items-center justify-center'
                  ),
                  x: en,
                  y: et,
                  rx: '4',
                  animate: {
                    fill: t ? '#2563eb' : '#1e40af',
                    stroke: '#93c5fd',
                    boxShadow: t ? '0 0 8px #93c5fd' : '0 0 0px #93c5fd',
                  },
                  transition: { duration: 0.2 },
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'PoolerIcons.tsx',
                }),
                (0, s.jsx)(J.vo, {
                  size: 21,
                  className: (0, _.cn)(
                    'w-4 h-4 text-foreground-lighter transition-all',
                    t && 'text-foreground'
                  ),
                  x: en + es / 6,
                  y: et + 5.5,
                  strokeWidth: 1,
                  'data-sentry-element': 'Database',
                  'data-sentry-source-file': 'PoolerIcons.tsx',
                }),
              ],
            });
          },
          ee = 30.72,
          et = 61.44,
          en = 8.16,
          es = 32.160000000000004,
          ea = () => {
            let [e, t] = (0, i.useState)([!1, !1, !1]),
              [n, a] = (0, i.useState)([!1, !1, !1]),
              [r, o] = (0, i.useState)(!1);
            return (
              (0, i.useEffect)(() => {
                o(n.some(Boolean));
              }, [n]),
              (0, i.useEffect)(() => {
                let e = (e) => {
                  (t((t) => {
                    let n = [...t];
                    return ((n[e] = !1), n);
                  }),
                    a((t) => {
                      let n = [...t];
                      return ((n[e] = !1), n);
                    }),
                    setTimeout(() => {
                      t((t) => {
                        let n = [...t];
                        return ((n[e] = !0), n);
                      });
                    }, 0),
                    setTimeout(() => {
                      a((t) => {
                        let n = [...t];
                        return ((n[e] = !0), n);
                      });
                    }, 400),
                    setTimeout(() => {
                      (t((t) => {
                        let n = [...t];
                        return ((n[e] = !1), n);
                      }),
                        a((t) => {
                          let n = [...t];
                          return ((n[e] = !1), n);
                        }));
                    }, 1e3));
                };
                (setTimeout(() => e(0), 0),
                  setTimeout(() => e(1), 200),
                  setTimeout(() => e(2), 400));
                let n = [0, 1, 2].map((t) =>
                  setInterval(() => e(t), 3e3 + 200 * t)
                );
                return () => n.forEach(clearInterval);
              }, []),
              (0, s.jsxs)('div', {
                style: { position: 'relative', width: 48, height: 96 },
                'data-sentry-component': 'TransactionIcon',
                'data-sentry-source-file': 'PoolerIcons.tsx',
                children: [
                  (0, s.jsxs)('svg', {
                    width: 48,
                    height: 96,
                    viewBox: '0 0 '.concat(48, ' ').concat(96),
                    'data-sentry-element': 'svg',
                    'data-sentry-source-file': 'PoolerIcons.tsx',
                    children: [
                      [0, 1, 2].map((t) =>
                        (0, s.jsx)(
                          i.Fragment,
                          {
                            children: (0, s.jsx)(G.M, {
                              children:
                                e[t] &&
                                (0, s.jsx)(Q.E.circle, {
                                  cx: 12 + 12 * t,
                                  cy: 12.48,
                                  r: 2.64,
                                  className: 'fill-foreground',
                                  initial: {
                                    scale: 0,
                                    x: [-8, -5, -2][t],
                                    y: -10,
                                  },
                                  animate: { scale: 1, x: 0, y: 0 },
                                  exit: { scale: 0, x: [8, 5, 2][t], y: -10 },
                                  transition: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                  },
                                }),
                            }),
                          },
                          t
                        )
                      ),
                      (0, s.jsx)(X, {
                        isActive: r,
                        'data-sentry-element': 'TopRect',
                        'data-sentry-source-file': 'PoolerIcons.tsx',
                      }),
                      (0, s.jsx)($, {
                        isActive: !0,
                        'data-sentry-element': 'BottomRect',
                        'data-sentry-source-file': 'PoolerIcons.tsx',
                      }),
                    ],
                  }),
                  [0, 1, 2].map((e) =>
                    (0, s.jsx)(
                      K,
                      {
                        x: 12 + 12 * e,
                        y1: 17.28,
                        y2: 26.880000000000003,
                        isActive: n[e],
                      },
                      e
                    )
                  ),
                  (0, s.jsx)(K, {
                    x: 18,
                    y1: 38.400000000000006,
                    y2: 56.64,
                    isActive: !0,
                    'data-sentry-element': 'FlowingLine',
                    'data-sentry-source-file': 'PoolerIcons.tsx',
                  }),
                  (0, s.jsx)(K, {
                    x: 30,
                    y1: 38.400000000000006,
                    y2: 56.64,
                    isActive: !0,
                    'data-sentry-element': 'FlowingLine',
                    'data-sentry-source-file': 'PoolerIcons.tsx',
                  }),
                ],
              })
            );
          },
          er = () => {
            let [e, t] = (0, i.useState)([!1, !1, !1]),
              [n, a] = (0, i.useState)([!1, !1, !1]);
            return (
              (0, i.useEffect)(() => {
                let e = (e) => {
                  (t((t) => {
                    let n = [...t];
                    return ((n[e] = !0), n);
                  }),
                    a((t) => {
                      let n = [...t];
                      return ((n[e] = !0), n);
                    }),
                    setTimeout(() => {
                      (t((t) => {
                        let n = [...t];
                        return ((n[e] = !1), n);
                      }),
                        a((t) => {
                          let n = [...t];
                          return ((n[e] = !1), n);
                        }));
                    }, 2500));
                };
                (setTimeout(() => e(0), 100),
                  setTimeout(() => e(1), 1500),
                  setTimeout(() => e(2), 3e3));
                let n = [0, 1, 2].map((t) =>
                  setInterval(() => e(t), 3e3 * Math.random() + 8e3)
                );
                return () => n.forEach(clearInterval);
              }, []),
              (0, s.jsxs)('div', {
                style: { position: 'relative', width: 48, height: 96 },
                'data-sentry-component': 'DirectConnectionIcon',
                'data-sentry-source-file': 'PoolerIcons.tsx',
                children: [
                  (0, s.jsxs)('svg', {
                    width: 48,
                    height: 96,
                    viewBox: '0 0 '.concat(48, ' ').concat(96),
                    'data-sentry-element': 'svg',
                    'data-sentry-source-file': 'PoolerIcons.tsx',
                    children: [
                      [0, 1, 2].map((t) =>
                        (0, s.jsx)(
                          i.Fragment,
                          {
                            children: (0, s.jsx)(G.M, {
                              children:
                                e[t] &&
                                (0, s.jsx)(Q.E.circle, {
                                  cx: 12 + 12 * t,
                                  cy: 12.48,
                                  r: 2.64,
                                  className: 'fill-foreground',
                                  initial: {
                                    scale: 0,
                                    x: [-8, -5, -2][t],
                                    y: -10,
                                  },
                                  animate: { scale: 1, x: 0, y: 0 },
                                  exit: { scale: 0, x: [8, 5, 2][t], y: -10 },
                                  transition: {
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                  },
                                }),
                            }),
                          },
                          t
                        )
                      ),
                      (0, s.jsx)($, {
                        isActive: n.some((e) => e),
                        'data-sentry-element': 'BottomRect',
                        'data-sentry-source-file': 'PoolerIcons.tsx',
                      }),
                    ],
                  }),
                  [0, 1, 2].map((e) =>
                    (0, s.jsx)(
                      K,
                      { x: 12 + 12 * e, y1: 17.28, y2: 56.64, isActive: n[e] },
                      e
                    )
                  ),
                ],
              })
            );
          },
          eo = (e) => {
            let { className: t, active: n } = e;
            return (0, s.jsxs)('div', {
              className: (0, _.cn)('relative inline-flex', t),
              'data-sentry-component': 'IPv4StatusIcon',
              'data-sentry-source-file': 'ConnectionPanel.tsx',
              children: [
                (0, s.jsx)('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  fill: 'none',
                  viewBox: '0 0 24 24',
                  'stroke-width': '1',
                  stroke: 'currentColor',
                  className: 'size-6 stroke-foreground-lighter',
                  'data-sentry-element': 'svg',
                  'data-sentry-source-file': 'ConnectionPanel.tsx',
                  children: (0, s.jsx)('path', {
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    d: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
                    'data-sentry-element': 'path',
                    'data-sentry-source-file': 'ConnectionPanel.tsx',
                  }),
                }),
                n
                  ? (0, s.jsx)('div', {
                      className:
                        'absolute -right-1.5 -top-1.5 bg-brand-500 rounded w-4 h-4 flex items-center justify-center',
                      children: (0, s.jsx)('svg', {
                        width: '10',
                        height: '10',
                        viewBox: '0 0 10 10',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: (0, s.jsx)('path', {
                          d: 'M8.33325 2.5L3.74992 7.08333L1.66659 5',
                          stroke: 'white',
                          strokeWidth: '2',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                        }),
                      }),
                    })
                  : (0, s.jsx)('div', {
                      className:
                        'absolute -right-1.5 -top-1.5 bg-destructive rounded w-4 h-4 flex items-center justify-center',
                      children: (0, s.jsx)(O.Z, {
                        size: 10,
                        strokeWidth: 4,
                        className: 'text-white rounded-full',
                      }),
                    }),
              ],
            });
          },
          ei = (e) => {
            let { title: t } = e;
            return (0, s.jsx)('div', {
              className:
                'flex items-center justify-between px-4 py-1 bg-surface-100/50 border border-b-0 border-surface rounded-t',
              'data-sentry-component': 'CodeBlockFileHeader',
              'data-sentry-source-file': 'ConnectionPanel.tsx',
              children: (0, s.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  (0, s.jsx)(B.Z, {
                    size: 12,
                    className: 'text-foreground-muted',
                    strokeWidth: 1.5,
                    'data-sentry-element': 'FileCode',
                    'data-sentry-source-file': 'ConnectionPanel.tsx',
                  }),
                  (0, s.jsx)('span', {
                    className: 'text-xs text-foreground-light',
                    children: t,
                  }),
                ],
              }),
            });
          },
          el = (e) => {
            var t, n;
            let {
                type: a = 'direct',
                title: o,
                description: i,
                connectionString: c,
                ipv4Status: d,
                notice: u,
                parameters: x = [],
                lang: p = 'bash',
                fileTitle: m,
                onCopyCallback: h,
              } = e,
              { ref: f } = (0, l.UO)(),
              g = (0, S.TF)(),
              { data: j } = (0, y.Y)({ projectRef: f }),
              v =
                null == j
                  ? void 0
                  : j.find((e) => e.identifier === g.selectedDatabaseId),
              b = (null == v ? void 0 : v.pool_mode) === 'session';
            return (0, s.jsxs)('div', {
              className:
                'flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-20 w-full',
              'data-sentry-component': 'ConnectionPanel',
              'data-sentry-source-file': 'ConnectionPanel.tsx',
              children: [
                (0, s.jsxs)('div', {
                  className: 'flex flex-col',
                  children: [
                    (0, s.jsx)('h1', {
                      className: 'text-sm mb-2',
                      children: o,
                    }),
                    (0, s.jsx)('p', {
                      className: 'text-sm text-foreground-light mb-4',
                      children: i,
                    }),
                    (0, s.jsxs)('div', {
                      className: 'flex flex-col -space-y-px',
                      children: [
                        m && (0, s.jsx)(ei, { title: m }),
                        'transaction' === a && b
                          ? (0, s.jsx)(L.J, {
                              showIcon: !1,
                              type: 'default',
                              className: '[&>h5]:text-xs [&>div]:text-xs',
                              title:
                                'Transaction pooler is unavailable as pool mode is set to Session',
                              description:
                                "If you'd like to use transaction mode, update your pool mode to Transaction for the connection pooler in your project's Database Settings.",
                              children: (0, s.jsx)(W.z, {
                                asChild: !0,
                                type: 'default',
                                className: 'mt-2',
                                children: (0, s.jsx)(r(), {
                                  href: '/project/'.concat(
                                    f,
                                    '/settings/database#connection-pooler'
                                  ),
                                  className:
                                    'text-xs text-light text-foreground',
                                  children: 'Database Settings',
                                }),
                              }),
                            })
                          : (0, s.jsxs)(s.Fragment, {
                              children: [
                                'session' === a &&
                                  b &&
                                  (0, s.jsx)(q.Z.Notice, {
                                    layout: 'vertical',
                                    className: 'border rounded mb-2',
                                    title:
                                      'Deprecating Session Mode on Port 6543',
                                    description:
                                      'Please use port 5432 for Session Mode as Supavisor will be deprecating Session Mode on port 6543 on February 28, 2025.',
                                    href: 'https://github.com/orgs/supabase/discussions/32755',
                                    buttonText: 'Read the announcement',
                                  }),
                                (0, s.jsx)(D.d, {
                                  wrapperClassName: (0, _.cn)(
                                    '[&_pre]:rounded-b-none [&_pre]:px-4 [&_pre]:py-3',
                                    m && '[&_pre]:rounded-t-none'
                                  ),
                                  language: p,
                                  value: c,
                                  className:
                                    '[&_code]:text-[12px] [&_code]:text-foreground',
                                  hideLineNumbers: !0,
                                  onCopyCallback: h,
                                }),
                                u &&
                                  (0, s.jsx)('div', {
                                    className:
                                      'border px-4 py-1 w-full justify-start rounded-t-none !last:rounded-b group-data-[state=open]:rounded-b-none border-light',
                                    children:
                                      null == u
                                        ? void 0
                                        : u.map((e) =>
                                            (0, s.jsx)(
                                              'p',
                                              {
                                                className:
                                                  'text-xs text-foreground-lighter',
                                                children: e,
                                              },
                                              e
                                            )
                                          ),
                                  }),
                                x.length > 0 &&
                                  (0, s.jsx)(Y, { parameters: x }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)('div', {
                  className: 'flex flex-col items-end',
                  children: (0, s.jsxs)('div', {
                    className: 'flex flex-col -space-y-px w-full',
                    children: [
                      'session' !== a &&
                        (0, s.jsxs)(s.Fragment, {
                          children: [
                            (0, s.jsxs)('div', {
                              className:
                                'relative border border-muted px-5 flex items-center gap-3 py-3 first:rounded-t last:rounded-b h-[58px]',
                              children: [
                                (0, s.jsx)('div', {
                                  className: 'absolute top-2 left-2.5',
                                  children:
                                    'transaction' === a
                                      ? (0, s.jsx)(ea, {})
                                      : (0, s.jsx)(er, {}),
                                }),
                                (0, s.jsx)('div', {
                                  className: 'flex flex-col pl-[52px]',
                                  children: (0, s.jsx)('span', {
                                    className: 'text-xs text-foreground',
                                    children:
                                      'transaction' === a
                                        ? 'Suitable for a large number of connected clients'
                                        : 'Suitable for long-lived, persistent connections',
                                  }),
                                }),
                              ],
                            }),
                            (0, s.jsx)('div', {
                              className:
                                'border border-muted px-5 flex items-center gap-3 py-3 first:rounded-t last:rounded-b h-[58px]',
                              children: (0, s.jsx)('div', {
                                className: 'flex flex-col pl-[52px]',
                                children: (0, s.jsx)('span', {
                                  className: 'text-xs text-foreground',
                                  children:
                                    'transaction' === a
                                      ? 'Pre-warmed connection pool to Postgres'
                                      : 'Each client has a dedicated connection to Postgres',
                                }),
                              }),
                            }),
                          ],
                        }),
                      (0, s.jsxs)('div', {
                        className:
                          'border border-muted px-5 flex gap-7 items-center py-3 first:rounded-t last:rounded-b',
                        children: [
                          (0, s.jsx)('div', {
                            className: 'flex items-center gap-2',
                            children: (0, s.jsx)(eo, {
                              active: 'success' === d.type,
                              'data-sentry-element': 'IPv4StatusIcon',
                              'data-sentry-source-file': 'ConnectionPanel.tsx',
                            }),
                          }),
                          (0, s.jsxs)('div', {
                            className: 'flex flex-col',
                            children: [
                              (0, s.jsx)('span', {
                                className: 'text-xs text-foreground',
                                children: d.title,
                              }),
                              d.description &&
                                (0, s.jsx)('span', {
                                  className: 'text-xs text-foreground-lighter',
                                  children: d.description,
                                }),
                              'error' === d.type &&
                                (0, s.jsx)('span', {
                                  className: 'text-xs text-foreground-lighter',
                                  children:
                                    'Use Session Pooler if on a IPv4 network or purchase IPv4 addon',
                                }),
                              d.link &&
                                (0, s.jsx)('div', {
                                  className: 'mt-2',
                                  children: (0, s.jsx)(W.z, {
                                    asChild: !0,
                                    type: 'default',
                                    size: 'tiny',
                                    children: (0, s.jsx)(r(), {
                                      href: d.link.url,
                                      className:
                                        'text-xs text-light text-foreground',
                                      children: d.link.text,
                                    }),
                                  }),
                                }),
                            ],
                          }),
                        ],
                      }),
                      'session' === a &&
                        (0, s.jsxs)('div', {
                          className:
                            'border border-muted px-5 flex gap-7 items-center py-3 first:rounded-t last:rounded-b bg-alternative/50',
                          children: [
                            (0, s.jsx)('div', {
                              className:
                                'flex w-6 h-6 rounded items-center justify-center gap-2 flex-shrink-0 bg-surface-100',
                              children: (0, s.jsx)(M.aN, {}),
                            }),
                            (0, s.jsxs)('div', {
                              className: 'flex flex-col',
                              children: [
                                (0, s.jsx)('span', {
                                  className: 'text-xs text-foreground',
                                  children: 'Only use on a IPv4 network',
                                }),
                                (0, s.jsx)('span', {
                                  className: 'text-xs text-foreground-lighter',
                                  children:
                                    'Use Direct Connection if connecting via an IPv6 network',
                                }),
                              ],
                            }),
                          ],
                        }),
                      'error' === d.type &&
                        (0, s.jsxs)(F.zF, {
                          className: 'group -space-y-px',
                          children: [
                            (0, s.jsx)(F.wy, {
                              asChild: !0,
                              className:
                                'group/collapse w-full justify-start rounded-t-none !last:rounded-b group-data-[state=open]:rounded-b-none border-muted',
                              children: (0, s.jsx)(W.z, {
                                type: 'default',
                                size: 'tiny',
                                className:
                                  'text-foreground-lighter !bg-dash-sidebar',
                                icon: (0, s.jsx)(U.Z, {
                                  className: (0, _.cn)(
                                    'group-data-[state=open]/collapse:rotate-90 text-foreground-muted transition-transform'
                                  ),
                                }),
                                children: 'Some platforms are IPv4-only:',
                              }),
                            }),
                            (0, s.jsx)(F.Fw, {
                              className:
                                'bg-dash-sidebar rounded-b border px-3 py-2',
                              children: (0, s.jsxs)('div', {
                                className: 'flex flex-col gap-2',
                                children: [
                                  (0, s.jsx)('p', {
                                    className:
                                      'text-xs text-foreground-light max-w-xs',
                                    children:
                                      'A few major platforms are IPv4-only and may not work with a Direct Connection:',
                                  }),
                                  (0, s.jsxs)('div', {
                                    className: 'flex gap-4',
                                    children: [
                                      (0, s.jsx)('div', {
                                        className: 'text-foreground text-xs',
                                        children: 'Vercel',
                                      }),
                                      (0, s.jsx)('div', {
                                        className: 'text-foreground text-xs',
                                        children: 'GitHub Actions',
                                      }),
                                      (0, s.jsx)('div', {
                                        className: 'text-foreground text-xs',
                                        children: 'Render',
                                      }),
                                      (0, s.jsx)('div', {
                                        className: 'text-foreground text-xs',
                                        children: 'Retool',
                                      }),
                                    ],
                                  }),
                                  (0, s.jsxs)('p', {
                                    className:
                                      'text-xs text-foreground-lighter max-w-xs',
                                    children: [
                                      'If you wish to use a Direct Connection with these, please purchase',
                                      ' ',
                                      (0, s.jsx)(r(), {
                                        href:
                                          null !==
                                            (n =
                                              null === (t = d.link) ||
                                              void 0 === t
                                                ? void 0
                                                : t.url) && void 0 !== n
                                            ? n
                                            : '/',
                                        className:
                                          'text-xs text-light text-foreground',
                                        children: 'IPv4 support',
                                      }),
                                      '.',
                                    ],
                                  }),
                                  (0, s.jsxs)('p', {
                                    className:
                                      'text-xs text-foreground-lighter max-w-xs',
                                    children: [
                                      'You may also use the',
                                      ' ',
                                      (0, s.jsx)('span', {
                                        className: 'text-foreground-light',
                                        children: 'Session Pooler',
                                      }),
                                      ' or',
                                      ' ',
                                      (0, s.jsx)('span', {
                                        className: 'text-foreground-light',
                                        children: 'Transaction Pooler',
                                      }),
                                      ' if you are on a IPv4 network.',
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
              ],
            });
          },
          ec = (e, t, n) => {
            let s = t.connectionString.includes('options=reference'),
              { projectRef: a } = n,
              r = '[YOUR-PASSWORD]',
              o = e.db_user,
              i = e.db_port,
              l = e.db_host,
              c = e.db_name,
              d = t.db_user,
              u = t.db_port,
              x = t.db_host,
              p = t.db_name,
              m = s
                ? 'psql "postgresql://'
                    .concat(o, ':')
                    .concat(r, '@')
                    .concat(l, ':')
                    .concat(i, '/')
                    .concat(c, '"')
                : 'psql -h '
                    .concat(l, ' -p ')
                    .concat(i, ' -d ')
                    .concat(c, ' -U ')
                    .concat(o),
              h = 'postgresql://'
                .concat(o, ':')
                .concat(r, '@')
                .concat(l, ':')
                .concat(i, '/')
                .concat(c),
              f = 'DATABASE_URL='.concat(h),
              g = 'jdbc:postgresql://'
                .concat(l, ':')
                .concat(i, '/')
                .concat(c, '?user=')
                .concat(o, '&password=')
                .concat(r),
              j = '{\n  "ConnectionStrings": {\n    "DefaultConnection": "Host='
                .concat(l, ';Database=')
                .concat(c, ';Username=')
                .concat(o, ';Password=')
                .concat(
                  r,
                  ';SSL Mode=Require;Trust Server Certificate=true"\n  }\n}'
                ),
              y =
                '{\n  "ConnectionStrings": {\n    "DefaultConnection": "User Id='
                  .concat(d, ';Password=')
                  .concat(r, ';Server=')
                  .concat(x, ';Port=')
                  .concat(u, ';Database=')
                  .concat(p)
                  .concat(
                    s ? ";Options='reference=".concat(a, "'") : '',
                    '"\n  }\n}'
                  ),
              v = s
                ? 'psql "postgresql://'
                    .concat(d, ':')
                    .concat(r, '@')
                    .concat(x, ':')
                    .concat(u, '/')
                    .concat(p, '?options=reference%3D')
                    .concat(a, '"')
                : 'psql -h '
                    .concat(x, ' -p ')
                    .concat(u, ' -d ')
                    .concat(p, ' -U ')
                    .concat(d),
              b = t.connectionString,
              N = 'DATABASE_URL='.concat(t.connectionString),
              w = 'user='
                .concat(d, ' \npassword=')
                .concat(r, ' \nhost=')
                .concat(x, '\nport=')
                .concat(u, '\ndbname=')
                .concat(p)
                .concat(s ? 'options=reference='.concat(a) : ''),
              k = 'jdbc:postgresql://'
                .concat(x, ':')
                .concat(u, '/')
                .concat(p, '?user=')
                .concat(d)
                .concat(
                  s ? '&options=reference%3D'.concat(a) : '',
                  '&password='
                )
                .concat(r),
              S = 'user='
                .concat(o, ' \npassword=')
                .concat(r, ' \nhost=')
                .concat(l, ' \nport=')
                .concat(i, ' \ndbname=')
                .concat(c),
              _ = 'user='
                .concat(d, ' \npassword=')
                .concat(r, ' \nhost=')
                .concat(x, ' \nport=')
                .concat(u, ' \ndbname=')
                .concat(p);
            return {
              direct: {
                psql: m,
                uri: h,
                golang: f,
                jdbc: g,
                dotnet: j,
                nodejs: 'DATABASE_URL='.concat(h),
                php: f,
                python: f,
                sqlalchemy: S,
              },
              pooler: {
                psql: v,
                uri: b,
                golang: w,
                jdbc: k,
                dotnet: y,
                nodejs: N,
                php: w,
                python: w,
                sqlalchemy: _,
              },
            };
          };
        var ed = {
          nodejs: {
            installCommands: ['npm install postgres'],
            files: [
              {
                name: 'db.js',
                content:
                  "import postgres from 'postgres'\n\nconst connectionString = process.env.DATABASE_URL\nconst sql = postgres(connectionString)\n\nexport default sql",
              },
            ],
          },
          golang: {
            installCommands: ['go get github.com/jackc/pgx/v5'],
            files: [
              {
                name: 'main.go',
                content:
                  'package main\n\nimport (\n	"context"\n	"log"\n	"os"\n	"github.com/jackc/pgx/v5"\n)\n\nfunc main() {\n	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))\n	if err != nil {\n		log.Fatalf("Failed to connect to the database: %v", err)\n	}\n	defer conn.Close(context.Background())\n\n	// Example query to test connection\n	var version string\n	if err := conn.QueryRow(context.Background(), "SELECT version()").Scan(&version); err != nil {\n		log.Fatalf("Query failed: %v", err)\n	}\n\n	log.Println("Connected to:", version)\n}',
              },
            ],
          },
          dotnet: {
            installCommands: [
              'dotnet add package Microsoft.Extensions.Configuration.Json --version YOUR_DOTNET_VERSION',
            ],
            postInstallCommands: [
              'dotnet add package Microsoft.Extensions.Configuration.Json --version YOUR_DOTNET_VERSION',
            ],
          },
          python: {
            installCommands: ['pip install python-dotenv psycopg2'],
            files: [
              {
                name: 'main.py',
                content:
                  'import psycopg2\nfrom dotenv import load_dotenv\nimport os\n\n# Load environment variables from .env\nload_dotenv()\n\n# Fetch variables\nUSER = os.getenv("user")\nPASSWORD = os.getenv("password")\nHOST = os.getenv("host")\nPORT = os.getenv("port")\nDBNAME = os.getenv("dbname")\n\n# Connect to the database\ntry:\n    connection = psycopg2.connect(\n        user=USER,\n        password=PASSWORD,\n        host=HOST,\n        port=PORT,\n        dbname=DBNAME\n    )\n    print("Connection successful!")\n    \n    # Create a cursor to execute SQL queries\n    cursor = connection.cursor()\n    \n    # Example query\n    cursor.execute("SELECT NOW();")\n    result = cursor.fetchone()\n    print("Current Time:", result)\n\n    # Close the cursor and connection\n    cursor.close()\n    connection.close()\n    print("Connection closed.")\n\nexcept Exception as e:\n    print(f"Failed to connect: {e}")',
              },
            ],
          },
          sqlalchemy: {
            installCommands: ['pip install python-dotenv sqlalchemy psycopg2'],
            files: [
              {
                name: 'main.py',
                content:
                  'from sqlalchemy import create_engine\n# from sqlalchemy.pool import NullPool\nfrom dotenv import load_dotenv\nimport os\n\n# Load environment variables from .env\nload_dotenv()\n\n# Fetch variables\nUSER = os.getenv("user")\nPASSWORD = os.getenv("password")\nHOST = os.getenv("host")\nPORT = os.getenv("port")\nDBNAME = os.getenv("dbname")\n\n# Construct the SQLAlchemy connection string\nDATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"\n\n# Create the SQLAlchemy engine\nengine = create_engine(DATABASE_URL)\n# If using Transaction Pooler or Session Pooler, we want to ensure we disable SQLAlchemy client side pooling -\n# https://docs.sqlalchemy.org/en/20/core/pooling.html#switching-pool-implementations\n# engine = create_engine(DATABASE_URL, poolclass=NullPool)\n\n# Test the connection\ntry:\n    with engine.connect() as connection:\n        print("Connection successful!")\nexcept Exception as e:\n    print(f"Failed to connect: {e}")',
              },
            ],
          },
        };
        let eu = (e) => {
            let { number: t, children: n, ...a } = e;
            return (0, s.jsxs)('div', {
              ...a,
              className: (0, _.cn)('flex items-center gap-2', a.className),
              'data-sentry-component': 'StepLabel',
              'data-sentry-source-file': 'DatabaseConnectionString.tsx',
              children: [
                (0, s.jsx)('div', {
                  className:
                    'flex font-mono text-xs items-center justify-center w-6 h-6 border border-strong rounded-md bg-surface-100',
                  children: t,
                }),
                (0, s.jsx)('span', { children: n }),
              ],
            });
          },
          ex = () => {
            var e, t, n, a, r, o, c, d, u, x, I, T, Z;
            let { ref: R } = (0, l.UO)(),
              O = (0, w.l)(),
              B = (0, S.TF)(),
              [U, q] = (0, i.useState)('uri'),
              {
                data: W,
                error: M,
                isLoading: V,
                isError: H,
                isSuccess: Y,
              } = (0, y.Y)({ projectRef: R }),
              G =
                null == W
                  ? void 0
                  : W.find((e) => e.identifier === B.selectedDatabaseId),
              {
                data: Q,
                error: J,
                isLoading: K,
                isError: X,
                isSuccess: $,
              } = (0, v.bN)({ projectRef: R }),
              ee = (null != Q ? Q : []).find(
                (e) => e.identifier === B.selectedDatabaseId
              ),
              { data: et } = (0, b.F)({ projectRef: R }),
              { ipv4: en } = (0, h.OP)(
                null !== (a = null == et ? void 0 : et.selected_addons) &&
                  void 0 !== a
                  ? a
                  : []
              ),
              { mutate: es } = (0, N.a)(),
              ea = (0, k.Ff)(
                ee || { db_user: '', db_host: '', db_port: '', db_name: '' },
                ['db_host', 'db_name', 'db_port', 'db_user', 'inserted_at']
              ),
              er = (e, t) => {
                var n, s, a;
                let r = E.find((t) => t.id === e),
                  o =
                    null !== (n = null == r ? void 0 : r.label) && void 0 !== n
                      ? n
                      : 'Unknown',
                  i =
                    null !== (s = null == r ? void 0 : r.lang) && void 0 !== s
                      ? s
                      : 'Unknown';
                es({
                  action: m.b.CONNECTION_STRING_COPIED,
                  properties: {
                    connectionType: o,
                    lang: i,
                    connectionMethod: t,
                  },
                  groups: {
                    project: null != R ? R : 'Unknown',
                    organization:
                      null !== (a = null == O ? void 0 : O.slug) && void 0 !== a
                        ? a
                        : 'Unknown',
                  },
                });
              },
              eo =
                Y && void 0 !== G
                  ? ec(ea, G, { projectRef: R })
                  : {
                      direct: {
                        uri: '',
                        psql: '',
                        golang: '',
                        jdbc: '',
                        dotnet: '',
                        nodejs: '',
                        php: '',
                        python: '',
                        sqlalchemy: '',
                      },
                      pooler: {
                        uri: '',
                        psql: '',
                        golang: '',
                        jdbc: '',
                        dotnet: '',
                        nodejs: '',
                        php: '',
                        python: '',
                        sqlalchemy: '',
                      },
                    },
              ex =
                null !==
                  (r =
                    null === (e = E.find((e) => e.id === U)) || void 0 === e
                      ? void 0
                      : e.lang) && void 0 !== r
                  ? r
                  : 'bash',
              ep =
                null !==
                  (o =
                    null === (t = E.find((e) => e.id === U)) || void 0 === t
                      ? void 0
                      : t.contentType) && void 0 !== o
                  ? o
                  : 'input',
              em = ed[U],
              eh = null == em ? void 0 : em.files,
              ef = null == em ? void 0 : em.installCommands,
              eg = null == em ? void 0 : em.postInstallCommands,
              ej = eh || ef,
              ey =
                null === (n = E.find((e) => e.id === U)) || void 0 === n
                  ? void 0
                  : n.fileTitle,
              ev = 0;
            return (0, s.jsxs)('div', {
              className: 'flex flex-col',
              'data-sentry-component': 'DatabaseConnectionString',
              'data-sentry-source-file': 'DatabaseConnectionString.tsx',
              children: [
                (0, s.jsxs)('div', {
                  className: (0, _.cn)(
                    'flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3',
                    C.gZ
                  ),
                  children: [
                    (0, s.jsxs)('div', {
                      className: 'flex',
                      children: [
                        (0, s.jsx)('span', {
                          className:
                            'flex items-center text-foreground-lighter px-3 rounded-lg rounded-r-none text-xs border border-button border-r-0',
                          children: 'Type',
                        }),
                        (0, s.jsxs)(P.Ph, {
                          value: U,
                          onValueChange: (e) => q(e),
                          'data-sentry-element': 'Select_Shadcn_',
                          'data-sentry-source-file':
                            'DatabaseConnectionString.tsx',
                          children: [
                            (0, s.jsx)(P.i4, {
                              size: 'small',
                              className: 'w-auto rounded-l-none',
                              'data-sentry-element': 'SelectTrigger_Shadcn_',
                              'data-sentry-source-file':
                                'DatabaseConnectionString.tsx',
                              children: (0, s.jsx)(P.ki, {
                                'data-sentry-element': 'SelectValue_Shadcn_',
                                'data-sentry-source-file':
                                  'DatabaseConnectionString.tsx',
                              }),
                            }),
                            (0, s.jsx)(P.Bw, {
                              'data-sentry-element': 'SelectContent_Shadcn_',
                              'data-sentry-source-file':
                                'DatabaseConnectionString.tsx',
                              children: E.map((e) =>
                                (0, s.jsx)(
                                  P.Ql,
                                  { value: e.id, children: e.label },
                                  e.id
                                )
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsx)(g.Z, {
                      buttonProps: { size: 'small' },
                      'data-sentry-element': 'DatabaseSelector',
                      'data-sentry-source-file': 'DatabaseConnectionString.tsx',
                    }),
                  ],
                }),
                (V || K) &&
                  (0, s.jsx)('div', {
                    className: 'p-7',
                    children: (0, s.jsx)(j.Z, { className: 'h-8 w-full' }),
                  }),
                (H || X) &&
                  (0, s.jsx)('div', {
                    className: 'p-7',
                    children: (0, s.jsx)(f.Z, {
                      error: M || J,
                      subject: 'Failed to retrieve database settings',
                    }),
                  }),
                Y &&
                  $ &&
                  (0, s.jsxs)('div', {
                    className: 'flex flex-col divide-y divide-border',
                    children: [
                      ej &&
                        (0, s.jsxs)('div', {
                          className:
                            'grid grid-cols-2 gap-x-20 w-full px-4 md:px-7 py-8',
                          children: [
                            (0, s.jsxs)('div', {
                              children: [
                                (0, s.jsx)(eu, {
                                  number: ++ev,
                                  className: 'mb-4',
                                  children: 'Install the following',
                                }),
                                null == ef
                                  ? void 0
                                  : ef.map((e, t) =>
                                      (0, s.jsx)(
                                        D.d,
                                        {
                                          className:
                                            '[&_code]:text-[12px] [&_code]:text-foreground',
                                          value: e,
                                          hideLineNumbers: !0,
                                          language: 'bash',
                                          children: e,
                                        },
                                        t
                                      )
                                    ),
                              ],
                            }),
                            eh &&
                              (null == eh ? void 0 : eh.length) > 0 &&
                              (0, s.jsxs)('div', {
                                children: [
                                  (0, s.jsx)(eu, {
                                    number: ++ev,
                                    className: 'mb-4',
                                    children: 'Add file to project',
                                  }),
                                  null == eh
                                    ? void 0
                                    : eh.map((e, t) =>
                                        (0, s.jsxs)(
                                          'div',
                                          {
                                            children: [
                                              (0, s.jsx)(ei, { title: e.name }),
                                              (0, s.jsx)(D.d, {
                                                wrapperClassName:
                                                  '[&_pre]:max-h-40 [&_pre]:px-4 [&_pre]:py-3 [&_pre]:rounded-t-none',
                                                value: e.content,
                                                hideLineNumbers: !0,
                                                language: ex,
                                                className:
                                                  '[&_code]:text-[12px] [&_code]:text-foreground',
                                              }),
                                            ],
                                          },
                                          t
                                        )
                                      ),
                                ],
                              }),
                          ],
                        }),
                      (0, s.jsxs)('div', {
                        children: [
                          ej &&
                            (0, s.jsx)('div', {
                              className: 'px-4 md:px-7 pt-8',
                              children: (0, s.jsx)(eu, {
                                number: ++ev,
                                children: 'Choose type of connection',
                              }),
                            }),
                          (0, s.jsxs)('div', {
                            className:
                              'divide-y divide-border-muted [&>div]:px-4 [&>div]:md:px-7 [&>div]:py-8',
                            children: [
                              (0, s.jsx)(el, {
                                contentType: ep,
                                lang: ex,
                                type: 'direct',
                                title: 'Direct connection',
                                fileTitle: ey,
                                description:
                                  'Ideal for applications with persistent, long-lived connections, such as those running on virtual machines or long-standing containers.',
                                connectionString: eo.direct[U],
                                ipv4Status: {
                                  type: en ? 'success' : 'error',
                                  title: en
                                    ? 'IPv4 compatible'
                                    : 'Not IPv4 compatible',
                                  description:
                                    en &&
                                    'Connections are IPv4 proxied with IPv4 addon.',
                                  link: en
                                    ? {
                                        text: 'IPv4 settings',
                                        url: '/project/'.concat(
                                          R,
                                          '/settings/addons?panel=ipv4'
                                        ),
                                      }
                                    : {
                                        text: 'IPv4 addon',
                                        url: '/project/'.concat(
                                          R,
                                          '/settings/addons?panel=ipv4'
                                        ),
                                      },
                                },
                                parameters: [
                                  { ...A.host, value: ea.db_host },
                                  { ...A.port, value: ea.db_port },
                                  { ...A.database, value: ea.db_name },
                                  { ...A.user, value: ea.db_user },
                                ],
                                onCopyCallback: () => er(U, 'direct'),
                              }),
                              (0, s.jsx)(el, {
                                contentType: ep,
                                lang: ex,
                                type: 'transaction',
                                title: 'Transaction pooler',
                                fileTitle: ey,
                                description:
                                  'Ideal for stateless applications like serverless functions where each interaction with Postgres is brief and isolated.',
                                connectionString: eo.pooler[U],
                                ipv4Status: {
                                  type: 'success',
                                  title: 'IPv4 compatible',
                                  description:
                                    'Transaction pooler connections are IPv4 proxied for free.',
                                },
                                notice: ['Does not support PREPARE statements'],
                                parameters: [
                                  {
                                    ...A.host,
                                    value:
                                      null !==
                                        (c = null == G ? void 0 : G.db_host) &&
                                      void 0 !== c
                                        ? c
                                        : '',
                                  },
                                  {
                                    ...A.port,
                                    value:
                                      null !==
                                        (d =
                                          null == G
                                            ? void 0
                                            : G.db_port.toString()) &&
                                      void 0 !== d
                                        ? d
                                        : '6543',
                                  },
                                  {
                                    ...A.database,
                                    value:
                                      null !==
                                        (u = null == G ? void 0 : G.db_name) &&
                                      void 0 !== u
                                        ? u
                                        : '',
                                  },
                                  {
                                    ...A.user,
                                    value:
                                      null !==
                                        (x = null == G ? void 0 : G.db_user) &&
                                      void 0 !== x
                                        ? x
                                        : '',
                                  },
                                  { ...A.pool_mode, value: 'transaction' },
                                ],
                                onCopyCallback: () =>
                                  er(U, 'transaction_pooler'),
                              }),
                              en &&
                                (0, s.jsx)(L.J, {
                                  type: 'warning',
                                  title:
                                    'Highly recommended to not use Session Pooler',
                                  className:
                                    '[&>div]:gap-0 px-8 [&>svg]:left-7 border-0 border-b rounded-none border-border-muted !py-4 mb-0',
                                  children: (0, s.jsx)('p', {
                                    className:
                                      'text-sm text-foreground-lighter !mb-0',
                                    children:
                                      'If you are using Session Pooler, we recommend switching to Direct Connection.',
                                  }),
                                }),
                              (0, s.jsx)(el, {
                                contentType: ep,
                                lang: ex,
                                type: 'session',
                                title: 'Session pooler',
                                fileTitle: ey,
                                description:
                                  'Only recommended as an alternative to Direct Connection, when connecting via an IPv4 network.',
                                connectionString: eo.pooler[U].replace(
                                  '6543',
                                  '5432'
                                ),
                                ipv4Status: {
                                  type: 'success',
                                  title: 'IPv4 compatible',
                                  description:
                                    'Session pooler connections are IPv4 proxied for free.',
                                },
                                parameters: [
                                  {
                                    ...A.host,
                                    value:
                                      null !==
                                        (I = null == G ? void 0 : G.db_host) &&
                                      void 0 !== I
                                        ? I
                                        : '',
                                  },
                                  { ...A.port, value: '5432' },
                                  {
                                    ...A.database,
                                    value:
                                      null !==
                                        (T = null == G ? void 0 : G.db_name) &&
                                      void 0 !== T
                                        ? T
                                        : '',
                                  },
                                  {
                                    ...A.user,
                                    value:
                                      null !==
                                        (Z = null == G ? void 0 : G.db_user) &&
                                      void 0 !== Z
                                        ? Z
                                        : '',
                                  },
                                  { ...A.pool_mode, value: 'session' },
                                ],
                                onCopyCallback: () => er(U, 'session_pooler'),
                              }),
                            ],
                          }),
                        ],
                      }),
                      eg &&
                        (0, s.jsx)('div', {
                          className:
                            'grid grid-cols-2 gap-20 w-full px-4 md:px-7 py-10',
                          children: (0, s.jsxs)('div', {
                            children: [
                              (0, s.jsx)(eu, {
                                number: ++ev,
                                className: 'mb-4',
                                children:
                                  'Add the configuration package to read the settings',
                              }),
                              null == eg
                                ? void 0
                                : eg.map((e, t) =>
                                    (0, s.jsx)(
                                      D.d,
                                      {
                                        className: 'text-sm',
                                        value: e,
                                        hideLineNumbers: !0,
                                        language: 'bash',
                                        children: e,
                                      },
                                      t
                                    )
                                  ),
                            ],
                          }),
                        }),
                    ],
                  }),
                'python' === U &&
                  (0, s.jsxs)(s.Fragment, {
                    children: [
                      (0, s.jsx)(z.Z, {}),
                      (0, s.jsxs)(F.zF, {
                        className: 'px-8 pt-5',
                        children: [
                          (0, s.jsx)(F.wy, {
                            className:
                              'group [&[data-state=open]>div>svg]:!-rotate-180',
                            children: (0, s.jsxs)('div', {
                              className: 'flex items-center gap-x-2 w-full',
                              children: [
                                (0, s.jsx)('p', {
                                  className:
                                    'text-xs text-foreground-light group-text-foreground transition',
                                  children: 'Connecting to SQL Alchemy',
                                }),
                                (0, s.jsx)(p.Z, {
                                  className:
                                    'transition-transform duration-200',
                                  strokeWidth: 1.5,
                                  size: 14,
                                }),
                              ],
                            }),
                          }),
                          (0, s.jsx)(F.Fw, {
                            className: 'my-2',
                            children: (0, s.jsxs)('div', {
                              className:
                                'text-foreground-light text-xs grid gap-2',
                              children: [
                                (0, s.jsxs)('p', {
                                  children: [
                                    'Please use ',
                                    (0, s.jsx)('code', {
                                      children: 'postgresql://',
                                    }),
                                    ' instead of ',
                                    (0, s.jsx)('code', {
                                      children: 'postgres://',
                                    }),
                                    ' as your dialect when connecting via SQLAlchemy.',
                                  ],
                                }),
                                (0, s.jsxs)('p', {
                                  children: [
                                    'Example:',
                                    (0, s.jsx)('code', {
                                      children:
                                        'create_engine("postgresql+psycopg2://...")',
                                    }),
                                  ],
                                }),
                                (0, s.jsx)('p', {
                                  className:
                                    'text-sm font-mono tracking-tight text-foreground-lighter',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            });
          };
        var ep = n(359),
          em = n(31485),
          eh = n(90817),
          ef = n(62432),
          eg = n(37756),
          ej = n(92240);
        let ey = (e) => {
          let {
              connectionObject: t,
              selectedParent: n,
              selectedChild: s,
              selectedGrandchild: a,
            } = e,
            r = t.find((e) => e.key === n);
          if (r) {
            let e = r.children.find((e) => e.key === s);
            return e
              ? e.children.find((e) => e.key === a)
                ? ''.concat(n, '/').concat(s, '/').concat(a)
                : ''.concat(n, '/').concat(s)
              : n;
          }
          return '';
        };
        var ev = n(69436),
          eb = n(42026),
          eN = n(47482),
          ew = n(98809),
          ek = n(51650),
          eS = n.n(ek);
        let e_ = (e) => {
          let { connection: t } = e,
            { resolvedTheme: n } = (0, ew.F)(),
            a = ['ionic-angular'].includes(t)
              ? 'icons/frameworks'
              : 'libraries';
          return (0, s.jsx)(eS(), {
            className: 'transition-all group-scale-110',
            src: ''
              .concat(eg.GW, '/img/')
              .concat(a, '/')
              .concat(t.toLowerCase())
              .concat(
                [
                  'expo',
                  'nextjs',
                  'prisma',
                  'drizzle',
                  'astro',
                  'remix',
                ].includes(t.toLowerCase()) &&
                  (null == n ? void 0 : n.includes('dark'))
                  ? '-dark'
                  : ''
              )
              .concat('icons/frameworks' === a ? '' : '-icon', '.svg'),
            alt: ''.concat(t, ' logo'),
            width: 14,
            height: 14,
            'data-sentry-element': 'Image',
            'data-sentry-component': 'ConnectionIcon',
            'data-sentry-source-file': 'ConnectionIcon.tsx',
          });
        };
        var eC = (e) => {
            let { state: t, updateState: n, label: a, items: r } = e,
              [o, l] = (0, i.useState)(!1),
              c = r.find((e) => e.key === t);
            return (0, s.jsxs)(eb.J2, {
              open: o,
              onOpenChange: l,
              modal: !1,
              'data-sentry-element': 'Popover_Shadcn_',
              'data-sentry-component': 'ConnectDropdown',
              'data-sentry-source-file': 'ConnectDropdown.tsx',
              children: [
                (0, s.jsxs)('div', {
                  className: 'flex ',
                  children: [
                    (0, s.jsx)('span', {
                      className:
                        'flex items-center text-foreground-lighter px-3 rounded-lg rounded-r-none text-xs border border-button border-r-0',
                      children: a,
                    }),
                    (0, s.jsx)(eb.xo, {
                      asChild: !0,
                      'data-sentry-element': 'PopoverTrigger_Shadcn_',
                      'data-sentry-source-file': 'ConnectDropdown.tsx',
                      children: (0, s.jsx)(W.z, {
                        size: 'small',
                        type: 'default',
                        className: 'gap-0 rounded-l-none',
                        iconRight: (0, s.jsx)(p.Z, { strokeWidth: 1.5 }),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'ConnectDropdown.tsx',
                        children: (0, s.jsxs)('div', {
                          className: 'flex items-center gap-2',
                          children: [
                            (null == c ? void 0 : c.icon)
                              ? (0, s.jsx)(e_, { connection: c.icon })
                              : (0, s.jsx)(ev.Z, { size: 12 }),
                            null == c ? void 0 : c.label,
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
                (0, s.jsx)(eb.yk, {
                  className: 'p-0 max-w-48',
                  side: 'bottom',
                  align: 'start',
                  'data-sentry-element': 'PopoverContent_Shadcn_',
                  'data-sentry-source-file': 'ConnectDropdown.tsx',
                  children: (0, s.jsxs)(eN.mY, {
                    'data-sentry-element': 'Command_Shadcn_',
                    'data-sentry-source-file': 'ConnectDropdown.tsx',
                    children: [
                      (0, s.jsx)(eN.sZ, {
                        placeholder: 'Search...',
                        'data-sentry-element': 'CommandInput_Shadcn_',
                        'data-sentry-source-file': 'ConnectDropdown.tsx',
                      }),
                      (0, s.jsxs)(eN.e8, {
                        'data-sentry-element': 'CommandList_Shadcn_',
                        'data-sentry-source-file': 'ConnectDropdown.tsx',
                        children: [
                          (0, s.jsx)(eN.rb, {
                            'data-sentry-element': 'CommandEmpty_Shadcn_',
                            'data-sentry-source-file': 'ConnectDropdown.tsx',
                            children: 'No results found.',
                          }),
                          (0, s.jsx)(eN.fu, {
                            'data-sentry-element': 'CommandGroup_Shadcn_',
                            'data-sentry-source-file': 'ConnectDropdown.tsx',
                            children: r.map((e) =>
                              (0, s.jsxs)(
                                eN.di,
                                {
                                  value: e.key,
                                  onSelect: () => {
                                    (n(e.key), l(!1), l(!1));
                                  },
                                  className: 'flex gap-2 items-center',
                                  children: [
                                    e.icon
                                      ? (0, s.jsx)(e_, { connection: e.icon })
                                      : (0, s.jsx)(ev.Z, { size: 12 }),
                                    e.label,
                                    (0, s.jsx)(V.Z, {
                                      size: 15,
                                      className: (0, _.cn)(
                                        'ml-auto  ',
                                        e.key === t
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      ),
                                    }),
                                  ],
                                },
                                e.key
                              )
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
          eP = n(34583),
          eD = n.n(eP);
        let ez = (0, i.forwardRef)((e, t) => {
          let { projectKeys: a, filePath: r, ...o } = e,
            { ref: c } = (0, l.UO)(),
            { data: d } = (0, em.zR)({ projectRef: c }),
            { data: u } = (0, y.Y)({ projectRef: c }),
            x = (0, k.Ff)(
              d || { db_user: '', db_host: '', db_port: '', db_name: '' },
              ['db_host', 'db_name', 'db_port', 'db_user', 'inserted_at']
            ),
            p =
              null == u ? void 0 : u.find((e) => 'PRIMARY' === e.database_type),
            m =
              void 0 !== p
                ? ec(x, p, { projectRef: c })
                : { direct: { uri: '' }, pooler: { uri: '' } },
            h = m.pooler,
            f = m.direct,
            g = h.uri,
            v = h.uri.replace('6543', '5432'),
            b = (0, i.useMemo)(
              () =>
                eD()(() => n(45213)('./'.concat(r, '/content')), {
                  loading: () =>
                    (0, s.jsx)('div', {
                      className: 'p-4 min-h-[331px]',
                      children: (0, s.jsx)(j.A, {}),
                    }),
                }),
              [r]
            );
          return (0, s.jsx)('div', {
            ref: t,
            ...o,
            className: (0, _.cn)('border rounded-lg', o.className),
            children: (0, s.jsx)(b, {
              projectKeys: a,
              filePath: r,
              connectionStringPooler: { transaction: g, session: v },
              connectionStringDirect: f.uri,
            }),
          });
        });
        ez.displayName = 'ConnectTabContent';
        var eF = () => {
            var e, t, n, a, r, o, p, m, h, f, g;
            let { ref: j } = (0, l.UO)(),
              y = (0, ef.Vm)(),
              v = (null == y ? void 0 : y.status) === eg.S.ACTIVE_HEALTHY,
              [b, N] = (0, x.v1)('showConnect', x.AE.withDefault(!1)),
              [w, k] = (0, i.useState)(I),
              [S, P] = (0, i.useState)(w[0].key),
              [D, z] = (0, i.useState)(
                null !==
                  (m =
                    null === (t = w.find((e) => e.key === S)) || void 0 === t
                      ? void 0
                      : null === (e = t.children[0]) || void 0 === e
                        ? void 0
                        : e.key) && void 0 !== m
                  ? m
                  : ''
              ),
              [F, L] = (0, i.useState)(
                (null === (r = w.find((e) => e.key === S)) || void 0 === r
                  ? void 0
                  : null === (a = r.children.find((e) => e.key === D)) ||
                      void 0 === a
                    ? void 0
                    : null === (n = a.children[0]) || void 0 === n
                      ? void 0
                      : n.key) || ''
              ),
              { data: E } = (0, em.zR)({ projectRef: j }),
              A = (0, eh.Xo)(c.KA.READ, 'service_api_keys'),
              O = (e) => {
                var t, n, s, a, r, o, i;
                (P(e),
                  z(
                    null !==
                      (o =
                        null === (n = w.find((t) => t.key === e)) ||
                        void 0 === n
                          ? void 0
                          : null === (t = n.children[0]) || void 0 === t
                            ? void 0
                            : t.key) && void 0 !== o
                      ? o
                      : ''
                  ),
                  L(
                    null !==
                      (i =
                        null === (r = w.find((t) => t.key === e)) ||
                        void 0 === r
                          ? void 0
                          : null === (a = r.children[0]) || void 0 === a
                            ? void 0
                            : null === (s = a.children[0]) || void 0 === s
                              ? void 0
                              : s.key) && void 0 !== i
                      ? i
                      : ''
                  ));
              },
              B = (e) => {
                z(e);
                let t = w.find((e) => e.key === S),
                  n = null == t ? void 0 : t.children.find((t) => t.key === e);
                n && n.children.length > 0 ? L(n.children[0].key) : L('');
              },
              U = (e) => {
                L(e);
              };
            function M(e) {
              var t, n;
              (P(e[0].key),
                (null === (t = e[0]) || void 0 === t
                  ? void 0
                  : t.children.length) > 0
                  ? (z(e[0].children[0].key),
                    (null === (n = e[0].children[0]) || void 0 === n
                      ? void 0
                      : n.children.length) > 0
                      ? L(e[0].children[0].children[0].key)
                      : L(''))
                  : (z(''), L('')));
            }
            let V = () => {
                let e = w.find((e) => e.key === S);
                return e && e.children.length > 0 ? e.children : [];
              },
              H = () => {
                let e = w.find((e) => e.key === S),
                  t = null == e ? void 0 : e.children.find((e) => e.key === D);
                return t && t.children.length > 0 ? t.children : [];
              },
              Y =
                null !==
                  (h =
                    null == E
                      ? void 0
                      : null === (o = E.app_config) || void 0 === o
                        ? void 0
                        : o.protocol) && void 0 !== h
                  ? h
                  : 'https',
              G =
                null !==
                  (f =
                    null == E
                      ? void 0
                      : null === (p = E.app_config) || void 0 === p
                        ? void 0
                        : p.endpoint) && void 0 !== f
                  ? f
                  : '',
              Q = A ? ''.concat(Y, '://').concat(null != G ? G : '-') : '',
              { anonKey: J } = A ? (0, em.Pb)(E) : { anonKey: null },
              K = {
                apiUrl: A ? Q : null,
                anonKey:
                  null !== (g = null == J ? void 0 : J.api_key) && void 0 !== g
                    ? g
                    : null,
              },
              X = ey({
                connectionObject: w,
                selectedParent: S,
                selectedChild: D,
                selectedGrandchild: F,
              });
            return v
              ? (0, s.jsxs)(C.Vq, {
                  open: b,
                  onOpenChange: (e) => N(e || null),
                  'data-sentry-element': 'Dialog',
                  'data-sentry-component': 'Connect',
                  'data-sentry-source-file': 'Connect.tsx',
                  children: [
                    (0, s.jsx)(C.hg, {
                      asChild: !0,
                      'data-sentry-element': 'DialogTrigger',
                      'data-sentry-source-file': 'Connect.tsx',
                      children: (0, s.jsx)(W.z, {
                        type: 'default',
                        className: 'rounded-full',
                        icon: (0, s.jsx)(d.Z, { className: 'rotate-90' }),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'Connect.tsx',
                        children: (0, s.jsx)('span', { children: 'Connect' }),
                      }),
                    }),
                    (0, s.jsxs)(C.cZ, {
                      className: (0, _.cn)('sm:max-w-5xl p-0'),
                      centered: !1,
                      'data-sentry-element': 'DialogContent',
                      'data-sentry-source-file': 'Connect.tsx',
                      children: [
                        (0, s.jsxs)(C.fK, {
                          className: C.gZ,
                          'data-sentry-element': 'DialogHeader',
                          'data-sentry-source-file': 'Connect.tsx',
                          children: [
                            (0, s.jsx)(C.$N, {
                              'data-sentry-element': 'DialogTitle',
                              'data-sentry-source-file': 'Connect.tsx',
                              children: 'Connect to your project',
                            }),
                            (0, s.jsx)(C.Be, {
                              'data-sentry-element': 'DialogDescription',
                              'data-sentry-source-file': 'Connect.tsx',
                              children:
                                'Get the connection strings and environment variables for your app',
                            }),
                          ],
                        }),
                        (0, s.jsxs)(ej.mQ, {
                          defaultValue: 'direct',
                          onValueChange: (e) => {
                            ('frameworks' === e && (k(I), M(I)),
                              'mobiles' === e && (k(T), M(T)),
                              'orms' === e && (k(Z), M(Z)));
                          },
                          'data-sentry-element': 'Tabs_Shadcn_',
                          'data-sentry-source-file': 'Connect.tsx',
                          children: [
                            (0, s.jsx)(ej.dr, {
                              className: (0, _.cn)(
                                'flex overflow-x-scroll gap-x-4',
                                C.gZ
                              ),
                              'data-sentry-element': 'TabsList_Shadcn_',
                              'data-sentry-source-file': 'Connect.tsx',
                              children: R.map((e) =>
                                (0, s.jsx)(
                                  ej.SP,
                                  {
                                    value: e.key,
                                    className: 'px-0',
                                    children: e.label,
                                  },
                                  e.key
                                )
                              ),
                            }),
                            R.map((e) => {
                              var t, n, a, r, o, i;
                              let l =
                                  ((null === (t = w.find((e) => e.key === S)) ||
                                  void 0 === t
                                    ? void 0
                                    : t.children.length) || 0) > 0,
                                c =
                                  ((null === (a = w.find((e) => e.key === S)) ||
                                  void 0 === a
                                    ? void 0
                                    : null ===
                                          (n = a.children.find(
                                            (e) => e.key === D
                                          )) || void 0 === n
                                      ? void 0
                                      : n.children.length) || 0) > 0;
                              return 'direct' === e.key
                                ? (0, s.jsx)(
                                    ej.nU,
                                    {
                                      value: 'direct',
                                      className: (0, _.cn)(
                                        '!mt-0',
                                        'p-0',
                                        'flex flex-col gap-6'
                                      ),
                                      children: (0, s.jsx)('div', {
                                        className: C.rR,
                                        children: (0, s.jsx)(ex, {}),
                                      }),
                                    },
                                    'direct'
                                  )
                                : (0, s.jsxs)(
                                    ej.nU,
                                    {
                                      value: e.key,
                                      className: (0, _.cn)(C.gZ, C.rR, '!mt-0'),
                                      children: [
                                        (0, s.jsxs)('div', {
                                          className:
                                            'flex flex-col md:flex-row gap-2 justify-between',
                                          children: [
                                            (0, s.jsxs)('div', {
                                              className:
                                                'flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3',
                                              children: [
                                                (0, s.jsx)(eC, {
                                                  state: S,
                                                  updateState: O,
                                                  label:
                                                    w === I || w === T
                                                      ? 'Framework'
                                                      : 'Tool',
                                                  items: w,
                                                }),
                                                S &&
                                                  l &&
                                                  (0, s.jsx)(eC, {
                                                    state: D,
                                                    updateState: B,
                                                    label: 'Using',
                                                    items: V(),
                                                  }),
                                                D &&
                                                  c &&
                                                  (0, s.jsx)(eC, {
                                                    state: F,
                                                    updateState: U,
                                                    label: 'With',
                                                    items: H(),
                                                  }),
                                              ],
                                            }),
                                            (null ===
                                              (r = w.find(
                                                (e) => e.key === S
                                              )) || void 0 === r
                                              ? void 0
                                              : r.guideLink) &&
                                              (0, s.jsx)(W.z, {
                                                asChild: !0,
                                                type: 'default',
                                                icon: (0, s.jsx)(u.Z, {
                                                  strokeWidth: 1.5,
                                                }),
                                                children: (0, s.jsxs)('a', {
                                                  target: '_blank',
                                                  rel: 'noreferrer',
                                                  href:
                                                    (null ===
                                                      (o = w.find(
                                                        (e) => e.key === S
                                                      )) || void 0 === o
                                                      ? void 0
                                                      : o.guideLink) || '',
                                                  children: [
                                                    null ===
                                                      (i = w.find(
                                                        (e) => e.key === S
                                                      )) || void 0 === i
                                                      ? void 0
                                                      : i.label,
                                                    ' guide',
                                                  ],
                                                }),
                                              }),
                                          ],
                                        }),
                                        (0, s.jsx)('p', {
                                          className:
                                            'text-xs text-foreground-lighter my-3',
                                          children:
                                            'Add the following files below to your application',
                                        }),
                                        (0, s.jsx)(ez, {
                                          projectKeys: K,
                                          filePath: X,
                                          className: 'rounded-b-none',
                                        }),
                                        (0, s.jsx)(q.Z.Notice, {
                                          className:
                                            'border border-t-0 rounded-lg rounded-t-none',
                                          title: 'New API keys coming 2025',
                                          description:
                                            '\n`anon` and `service_role` API keys will be changing to `publishable` and `secret` API keys.   \n',
                                          href: 'https://github.com/orgs/supabase/discussions/29260',
                                          buttonText: 'Read the announcement',
                                        }),
                                      ],
                                    },
                                    'content-'.concat(e.key)
                                  );
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : (0, s.jsx)(ep.u, {
                  disabled: !0,
                  type: 'default',
                  className: 'rounded-full',
                  icon: (0, s.jsx)(d.Z, { className: 'rotate-90' }),
                  tooltip: {
                    content: {
                      side: 'bottom',
                      text: 'Project is currently not active and cannot be connected',
                    },
                  },
                  children: 'Connect',
                });
          },
          eL = n(86186),
          eE = n(77060),
          eA = () => {
            let { setAiAssistantPanel: e, aiAssistantPanel: t } = (0, eL.WZ)();
            return (0, s.jsx)(W.z, {
              type: 'text',
              size: 'tiny',
              id: 'assistant-trigger',
              className: 'h-full w-full rounded-none',
              onClick: () => {
                e({ open: !t.open });
              },
              'data-sentry-element': 'Button',
              'data-sentry-component': 'AssistantButton',
              'data-sentry-source-file': 'AssistantButton.tsx',
              children: (0, s.jsx)(eE.c, {
                allowHoverEffect: !0,
                size: 20,
                'data-sentry-element': 'AiIconAnimation',
                'data-sentry-source-file': 'AssistantButton.tsx',
              }),
            });
          },
          eI = n(34330),
          eT = n(44735),
          eZ = n(50416),
          eR = n(78167),
          eO = n(52580),
          eB = n(14075),
          eU = n(73565),
          eq = n(64890),
          eW = n(36950),
          eM = n(63278),
          eV = n(71147);
        let eH = (e, t) => {
            if (!(Object.entries(t).length > 1)) return e;
            {
              let n = 'bucketId' in t,
                s = 'preset' in t;
              return e
                .split('/')
                .slice(0, n || s ? 5 : 4)
                .join('/');
            }
          },
          eY = (e) => {
            var t;
            let { project: n, setOpen: a } = e,
              i = (0, o.useRouter)(),
              { ref: c } = (0, l.UO)(),
              d = eH(i.route, i.query),
              u =
                null !== (t = null == d ? void 0 : d.replace('[ref]', n.ref)) &&
                void 0 !== t
                  ? t
                  : '/project/'.concat(n.ref);
            return (0, s.jsx)(
              eN.di,
              {
                value: ''.concat(n.name.replaceAll('"', ''), '-').concat(n.ref),
                className: 'cursor-pointer w-full',
                onSelect: () => {
                  (i.push(u), a(!1));
                },
                onClick: () => a(!1),
                'data-sentry-element': 'CommandItem_Shadcn_',
                'data-sentry-component': 'ProjectLink',
                'data-sentry-source-file': 'ProjectDropdown.tsx',
                children: (0, s.jsxs)(r(), {
                  href: u,
                  className: 'w-full flex items-center justify-between',
                  'data-sentry-element': 'Link',
                  'data-sentry-source-file': 'ProjectDropdown.tsx',
                  children: [
                    n.name,
                    n.ref === c && (0, s.jsx)(V.Z, { size: 16 }),
                  ],
                }),
              },
              n.ref
            );
          };
        var eG = (e) => {
          let { isNewNav: t = !1 } = e,
            n = (0, o.useRouter)(),
            { ref: a } = (0, l.UO)(),
            c = (0, ef.Vm)(),
            d = (0, w.l)(),
            { data: u, isLoading: x } = (0, eM.Sy)(),
            p = (0, eV.N)('projects:create'),
            m =
              (null == c ? void 0 : c.parentRef) !==
              (null == c ? void 0 : c.ref),
            h = t
              ? null == u
                ? void 0
                : u
                    .filter(
                      (e) => e.organization_id === (null == d ? void 0 : d.id)
                    )
                    .sort((e, t) => e.name.localeCompare(t.name))
              : null == u
                ? void 0
                : u.sort((e, t) => e.name.localeCompare(t.name)),
            f = m
              ? null == h
                ? void 0
                : h.find((e) => e.ref === (null == c ? void 0 : c.parentRef))
              : null == h
                ? void 0
                : h.find((e) => e.ref === a),
            [g, y] = (0, i.useState)(!1);
          return x || !f
            ? (0, s.jsx)(j.Z, { className: 'w-[90px]' })
            : eg.Qy
              ? (0, s.jsxs)(eb.J2, {
                  open: g,
                  onOpenChange: y,
                  modal: !1,
                  'data-sentry-element': 'Popover_Shadcn_',
                  'data-sentry-component': 'ProjectDropdown',
                  'data-sentry-source-file': 'ProjectDropdown.tsx',
                  children: [
                    (0, s.jsx)(eb.xo, {
                      asChild: !0,
                      'data-sentry-element': 'PopoverTrigger_Shadcn_',
                      'data-sentry-source-file': 'ProjectDropdown.tsx',
                      children: (0, s.jsx)(W.z, {
                        type: 'text',
                        className: 'pr-2',
                        iconRight: (0, s.jsx)(eZ.Z, {}),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'ProjectDropdown.tsx',
                        children: (0, s.jsx)('div', {
                          className: 'flex items-center space-x-2',
                          children: (0, s.jsx)('p', {
                            className: t ? 'text-sm' : 'text-xs',
                            children: null == f ? void 0 : f.name,
                          }),
                        }),
                      }),
                    }),
                    (0, s.jsx)(eb.yk, {
                      className: 'p-0',
                      side: 'bottom',
                      align: 'start',
                      'data-sentry-element': 'PopoverContent_Shadcn_',
                      'data-sentry-source-file': 'ProjectDropdown.tsx',
                      children: (0, s.jsxs)(eN.mY, {
                        'data-sentry-element': 'Command_Shadcn_',
                        'data-sentry-source-file': 'ProjectDropdown.tsx',
                        children: [
                          (0, s.jsx)(eN.sZ, {
                            placeholder: 'Find project...',
                            'data-sentry-element': 'CommandInput_Shadcn_',
                            'data-sentry-source-file': 'ProjectDropdown.tsx',
                          }),
                          (0, s.jsxs)(eN.e8, {
                            'data-sentry-element': 'CommandList_Shadcn_',
                            'data-sentry-source-file': 'ProjectDropdown.tsx',
                            children: [
                              (0, s.jsx)(eN.rb, {
                                'data-sentry-element': 'CommandEmpty_Shadcn_',
                                'data-sentry-source-file':
                                  'ProjectDropdown.tsx',
                                children: 'No projects found',
                              }),
                              (0, s.jsx)(eN.fu, {
                                'data-sentry-element': 'CommandGroup_Shadcn_',
                                'data-sentry-source-file':
                                  'ProjectDropdown.tsx',
                                children: (0, s.jsx)(eq.x, {
                                  className:
                                    (h || []).length > 7 ? 'h-[210px]' : '',
                                  'data-sentry-element': 'ScrollArea',
                                  'data-sentry-source-file':
                                    'ProjectDropdown.tsx',
                                  children:
                                    null == h
                                      ? void 0
                                      : h.map((e) =>
                                          (0, s.jsx)(
                                            eY,
                                            { project: e, setOpen: y },
                                            e.ref
                                          )
                                        ),
                                }),
                              }),
                              p &&
                                (0, s.jsxs)(s.Fragment, {
                                  children: [
                                    (0, s.jsx)(eN.zz, {}),
                                    (0, s.jsx)(eN.fu, {
                                      children: (0, s.jsx)(eN.di, {
                                        className: 'cursor-pointer w-full',
                                        onSelect: () => {
                                          (y(!1),
                                            n.push(
                                              '/new/'.concat(
                                                null == d ? void 0 : d.slug
                                              )
                                            ));
                                        },
                                        onClick: () => y(!1),
                                        children: (0, s.jsxs)(r(), {
                                          href: '/new/'.concat(
                                            null == d ? void 0 : d.slug
                                          ),
                                          onClick: () => {
                                            y(!1);
                                          },
                                          className:
                                            'w-full flex items-center gap-2',
                                          children: [
                                            (0, s.jsx)(eW.Z, {
                                              size: 14,
                                              strokeWidth: 1.5,
                                            }),
                                            (0, s.jsx)('p', {
                                              children: 'New project',
                                            }),
                                          ],
                                        }),
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
                })
              : (0, s.jsx)(W.z, {
                  type: 'text',
                  'data-sentry-element': 'Button',
                  'data-sentry-component': 'ProjectDropdown',
                  'data-sentry-source-file': 'ProjectDropdown.tsx',
                  children: (0, s.jsx)('span', {
                    className: t ? 'text-sm' : 'text-xs',
                    children: null == f ? void 0 : f.name,
                  }),
                });
        };
        let eQ = (e) => {
          var t;
          let { branch: n, isSelected: a, setOpen: i } = e,
            l = (0, o.useRouter)(),
            c = eH(l.route, l.query),
            d =
              null !==
                (t = null == c ? void 0 : c.replace('[ref]', n.project_ref)) &&
              void 0 !== t
                ? t
                : '/project/'.concat(n.project_ref);
          return (0, s.jsx)(r(), {
            passHref: !0,
            href: d,
            'data-sentry-element': 'Link',
            'data-sentry-component': 'BranchLink',
            'data-sentry-source-file': 'BranchDropdown.tsx',
            children: (0, s.jsxs)(eN.di, {
              value: n.name.replaceAll('"', ''),
              className:
                'cursor-pointer w-full flex items-center justify-between',
              onSelect: () => {
                (i(!1), l.push(d));
              },
              onClick: () => {
                i(!1);
              },
              'data-sentry-element': 'CommandItem_Shadcn_',
              'data-sentry-source-file': 'BranchDropdown.tsx',
              children: [
                (0, s.jsxs)('p', {
                  className: 'truncate w-60 flex items-center gap-1',
                  title: n.name,
                  children: [
                    n.is_default &&
                      (0, s.jsx)(eI.Z, {
                        size: 14,
                        className: 'text-amber-900',
                      }),
                    n.name,
                  ],
                }),
                a && (0, s.jsx)(V.Z, { size: 14, strokeWidth: 1.5 }),
              ],
            }),
          });
        };
        var eJ = (e) => {
            let { isNewNav: t = !1 } = e,
              n = (0, o.useRouter)(),
              { ref: a } = (0, l.UO)(),
              c = (0, ef.Vm)(),
              d = (null == c ? void 0 : c.parent_project_ref) !== void 0,
              u = void 0 !== c ? (d ? c.parent_project_ref : a) : void 0,
              {
                data: x,
                isLoading: p,
                isError: m,
                isSuccess: h,
              } = (0, eB.V)({ projectRef: u }),
              [f, g] = (0, i.useState)(!1),
              y = null == x ? void 0 : x.find((e) => e.project_ref === a),
              v = null == x ? void 0 : x.find((e) => e.is_default),
              b =
                null == x
                  ? void 0
                  : x
                      .filter((e) => !e.is_default)
                      .sort(
                        (e, t) =>
                          new Date(t.created_at).getTime() -
                          new Date(e.created_at).getTime()
                      ),
              N = v ? [v].concat(null != b ? b : []) : null != b ? b : [],
              w = 'https://github.com/orgs/supabase/discussions/18937';
            return (0, s.jsxs)(s.Fragment, {
              children: [
                p && (0, s.jsx)(j.Z, { className: 'w-[90px]' }),
                m &&
                  (0, s.jsxs)('div', {
                    className: 'flex items-center space-x-2 text-amber-900',
                    children: [
                      (0, s.jsx)(eT.Z, { size: 16, strokeWidth: 2 }),
                      (0, s.jsx)('p', {
                        className: 'text-sm',
                        children: 'Failed to load branches',
                      }),
                    ],
                  }),
                h &&
                  x.length > 0 &&
                  (0, s.jsx)('div', {
                    className: 'flex items-center px-2',
                    children: (0, s.jsxs)(eb.J2, {
                      open: f,
                      onOpenChange: g,
                      modal: !1,
                      children: [
                        (0, s.jsx)(eb.xo, {
                          asChild: !0,
                          children: (0, s.jsx)(W.z, {
                            type: 'text',
                            className: 'pr-2',
                            iconRight: (0, s.jsx)(eZ.Z, {}),
                            children: (0, s.jsxs)('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                (0, s.jsx)('p', {
                                  className: t ? 'text-sm' : 'text-xs',
                                  children: null == y ? void 0 : y.name,
                                }),
                                (null == y ? void 0 : y.is_default)
                                  ? (0, s.jsx)(eU.C, {
                                      variant: 'warning',
                                      children: 'Production',
                                    })
                                  : (0, s.jsx)(eU.C, {
                                      variant: 'brand',
                                      children: 'Preview Branch',
                                    }),
                              ],
                            }),
                          }),
                        }),
                        (0, s.jsx)(eb.yk, {
                          className: 'p-0',
                          side: 'bottom',
                          align: 'start',
                          children: (0, s.jsxs)(eN.mY, {
                            children: [
                              (0, s.jsx)(eN.sZ, {
                                placeholder: 'Find branch...',
                              }),
                              (0, s.jsxs)(eN.e8, {
                                children: [
                                  (0, s.jsx)(eN.rb, {
                                    children: 'No branches found',
                                  }),
                                  (0, s.jsx)(eN.fu, {
                                    children: (0, s.jsx)(eq.x, {
                                      className:
                                        'max-h-[210px] overflow-y-auto',
                                      children:
                                        null == N
                                          ? void 0
                                          : N.map((e) =>
                                              (0, s.jsx)(
                                                eQ,
                                                {
                                                  branch: e,
                                                  isSelected:
                                                    e.id ===
                                                    (null == y ? void 0 : y.id),
                                                  setOpen: g,
                                                },
                                                e.id
                                              )
                                            ),
                                    }),
                                  }),
                                  (0, s.jsx)(eN.zz, {}),
                                  (0, s.jsx)(eN.fu, {
                                    children: (0, s.jsx)(eN.di, {
                                      className: 'cursor-pointer w-full',
                                      onSelect: (e) => {
                                        (g(!1),
                                          n.push(
                                            '/project/'.concat(a, '/branches')
                                          ));
                                      },
                                      onClick: () => g(!1),
                                      children: (0, s.jsxs)(r(), {
                                        href: '/project/'.concat(
                                          a,
                                          '/branches'
                                        ),
                                        className:
                                          'w-full flex items-center gap-2',
                                        children: [
                                          (0, s.jsx)(eR.Z, {
                                            size: 14,
                                            strokeWidth: 1.5,
                                          }),
                                          (0, s.jsx)('p', {
                                            children: 'Manage branches',
                                          }),
                                        ],
                                      }),
                                    }),
                                  }),
                                  (0, s.jsx)(eN.zz, {}),
                                  (0, s.jsx)(eN.fu, {
                                    children: (0, s.jsx)(eN.di, {
                                      className: 'cursor-pointer w-full',
                                      onSelect: () => {
                                        var e, t;
                                        (g(!1),
                                          null === (t = window) ||
                                            void 0 === t ||
                                            null ===
                                              (e = t.open(w, '_blank')) ||
                                            void 0 === e ||
                                            e.focus());
                                      },
                                      onClick: () => g(!1),
                                      children: (0, s.jsxs)(r(), {
                                        href: w,
                                        target: '_blank',
                                        onClick: () => {
                                          g(!1);
                                        },
                                        className: 'w-full flex gap-2',
                                        children: [
                                          (0, s.jsx)(eO.Z, {
                                            size: 14,
                                            strokeWidth: 1,
                                            className: 'text-muted mt-0.5',
                                          }),
                                          (0, s.jsxs)('div', {
                                            children: [
                                              (0, s.jsx)('p', {
                                                children: 'Branching feedback',
                                              }),
                                              (0, s.jsx)('p', {
                                                className: 'text-lighter',
                                                children:
                                                  'Join Github Discussion',
                                              }),
                                            ],
                                          }),
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
                  }),
              ],
            });
          },
          eK = n(60025),
          eX = (e) => {
            let { isNewNav: t = !1 } = e,
              n = (0, eL.WZ)(),
              a = (0, ef.Vm)(),
              r = (0, eh.Xo)(c.KA.CREATE, 'preview_branches', {
                resource: { is_default: !0 },
              }),
              o = !r || (null == a ? void 0 : a.status) !== 'ACTIVE_HEALTHY';
            return (0, s.jsx)(ep.u, {
              disabled: o,
              type: t ? 'default' : 'text',
              icon: (0, s.jsx)(eK.Z, { strokeWidth: 1.5 }),
              onClick: () => n.setShowEnableBranchingModal(!0),
              tooltip: {
                content: {
                  side: 'bottom',
                  text:
                    (null == a ? void 0 : a.status) !== 'ACTIVE_HEALTHY'
                      ? 'Unpause your project to enable branching'
                      : r
                        ? void 0
                        : 'You need additional permissions to enable branching',
                },
              },
              'data-sentry-element': 'ButtonTooltip',
              'data-sentry-component': 'EnableBranchingButton',
              'data-sentry-source-file': 'EnableBranchingButton.tsx',
              children: 'Enable branching',
            });
          },
          e$ = n(89572),
          e0 = n(69951),
          e1 = n(6146),
          e2 = (e) => {
            let { isNewNav: t = !1 } = e,
              n = (0, o.useRouter)(),
              a = (0, w.l)(),
              { data: l, isLoading: c } = (0, e$.tl)(),
              d = (0, eV.N)('organizations:create'),
              u = null == a ? void 0 : a.slug,
              x = null == a ? void 0 : a.name,
              { data: p, isSuccess: m } = (0, e0.Gl)({ orgSlug: u }),
              [h, f] = (0, i.useState)(!1);
            return c
              ? (0, s.jsx)(j.Z, { className: 'w-[90px]' })
              : (0, s.jsx)('div', {
                  className: 'flex items-center',
                  'data-sentry-component': 'OrganizationDropdown',
                  'data-sentry-source-file': 'OrganizationDropdown.tsx',
                  children: (0, s.jsxs)(eb.J2, {
                    open: h,
                    onOpenChange: f,
                    modal: !1,
                    'data-sentry-element': 'Popover_Shadcn_',
                    'data-sentry-source-file': 'OrganizationDropdown.tsx',
                    children: [
                      (0, s.jsx)(eb.xo, {
                        asChild: !0,
                        'data-sentry-element': 'PopoverTrigger_Shadcn_',
                        'data-sentry-source-file': 'OrganizationDropdown.tsx',
                        children: (0, s.jsx)(W.z, {
                          type: 'text',
                          className: 'pr-2',
                          iconRight: (0, s.jsx)(eZ.Z, {}),
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'OrganizationDropdown.tsx',
                          children: (0, s.jsxs)('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              (0, s.jsx)('p', {
                                className: t ? 'text-sm' : 'text-xs',
                                children: x,
                              }),
                              m &&
                                (0, s.jsx)(eU.C, {
                                  variant: 'default',
                                  children: null == p ? void 0 : p.plan.name,
                                }),
                            ],
                          }),
                        }),
                      }),
                      (0, s.jsx)(eb.yk, {
                        className: 'p-0',
                        side: 'bottom',
                        align: 'start',
                        'data-sentry-element': 'PopoverContent_Shadcn_',
                        'data-sentry-source-file': 'OrganizationDropdown.tsx',
                        children: (0, s.jsxs)(eN.mY, {
                          'data-sentry-element': 'Command_Shadcn_',
                          'data-sentry-source-file': 'OrganizationDropdown.tsx',
                          children: [
                            (0, s.jsx)(eN.sZ, {
                              placeholder: 'Find organization...',
                              'data-sentry-element': 'CommandInput_Shadcn_',
                              'data-sentry-source-file':
                                'OrganizationDropdown.tsx',
                            }),
                            (0, s.jsxs)(eN.e8, {
                              'data-sentry-element': 'CommandList_Shadcn_',
                              'data-sentry-source-file':
                                'OrganizationDropdown.tsx',
                              children: [
                                (0, s.jsx)(eN.rb, {
                                  'data-sentry-element': 'CommandEmpty_Shadcn_',
                                  'data-sentry-source-file':
                                    'OrganizationDropdown.tsx',
                                  children: 'No organizations found',
                                }),
                                (0, s.jsx)(eN.fu, {
                                  'data-sentry-element': 'CommandGroup_Shadcn_',
                                  'data-sentry-source-file':
                                    'OrganizationDropdown.tsx',
                                  children: (0, s.jsx)(eq.x, {
                                    className:
                                      (l || []).length > 7 ? 'h-[210px]' : '',
                                    'data-sentry-element': 'ScrollArea',
                                    'data-sentry-source-file':
                                      'OrganizationDropdown.tsx',
                                    children:
                                      null == l
                                        ? void 0
                                        : l.map((e) => {
                                            let a = n.pathname.includes(
                                              '[slug]'
                                            )
                                              ? n.pathname.replace(
                                                  '[slug]',
                                                  e.slug
                                                )
                                              : t
                                                ? '/org/'.concat(e.slug)
                                                : '/org/'.concat(
                                                    e.slug,
                                                    '/general'
                                                  );
                                            return (0, s.jsx)(
                                              eN.di,
                                              {
                                                value: ''
                                                  .concat(
                                                    e.name.replaceAll('"', ''),
                                                    ' - '
                                                  )
                                                  .concat(e.slug),
                                                className:
                                                  'cursor-pointer w-full',
                                                onSelect: () => {
                                                  (f(!1), n.push(a));
                                                },
                                                onClick: () => f(!1),
                                                children: (0, s.jsxs)(r(), {
                                                  href: a,
                                                  className:
                                                    'w-full flex items-center justify-between',
                                                  children: [
                                                    (0, s.jsxs)('div', {
                                                      className:
                                                        'flex items-center gap-2',
                                                      children: [
                                                        (0, s.jsx)('span', {
                                                          children: e.name,
                                                        }),
                                                        (0, s.jsx)(e1.Z, {
                                                          organization: e,
                                                        }),
                                                      ],
                                                    }),
                                                    e.slug === u &&
                                                      (0, s.jsx)(V.Z, {
                                                        size: 16,
                                                      }),
                                                  ],
                                                }),
                                              },
                                              e.slug
                                            );
                                          }),
                                  }),
                                }),
                                d &&
                                  (0, s.jsxs)(s.Fragment, {
                                    children: [
                                      (0, s.jsx)(eN.zz, {}),
                                      (0, s.jsx)(eN.fu, {
                                        children: (0, s.jsx)(eN.di, {
                                          className: 'cursor-pointer w-full',
                                          onSelect: (e) => {
                                            (f(!1), n.push('/new'));
                                          },
                                          onClick: () => f(!1),
                                          children: (0, s.jsxs)(r(), {
                                            href: '/new',
                                            className:
                                              'flex items-center gap-2 w-full',
                                            children: [
                                              (0, s.jsx)(eW.Z, {
                                                size: 14,
                                                strokeWidth: 1.5,
                                              }),
                                              (0, s.jsx)('p', {
                                                children: 'New organization',
                                              }),
                                            ],
                                          }),
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
                });
          };
        let e4 = (e) =>
          e.length
            ? e
                .filter((e) => {
                  if (
                    !e.capped ||
                    !e.available_in_plan ||
                    e.unlimited ||
                    'DISK_IOPS_GP3' === e.metric
                  )
                    return !1;
                  let t = e.pricing_free_units || 0;
                  return e.usage > t;
                })
                .map((e) => e.metric)
            : [];
        var e3 = n(42764),
          e5 = (e) => {
            let { defaultValue: t } = e;
            return (0, s.jsx)(s.Fragment, {
              children: (null == t ? void 0 : t.length)
                ? t.map((e, t) =>
                    (0, s.jsxs)(
                      i.Fragment,
                      {
                        children: [
                          t > 0 &&
                            (0, s.jsx)('span', {
                              className:
                                'text-border-stronger dark:text-border-strong',
                              children: (0, s.jsx)('svg', {
                                viewBox: '0 0 24 24',
                                width: '16',
                                height: '16',
                                stroke: 'currentColor',
                                strokeWidth: '1',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                fill: 'none',
                                shapeRendering: 'geometricPrecision',
                                children: (0, s.jsx)('path', {
                                  d: 'M16 3.549L7.12 20.600',
                                }),
                              }),
                            }),
                          (0, s.jsx)('a', {
                            onClick: e.onClick || (() => {}),
                            className:
                              'text-gray-1100 block px-2 py-1 text-xs leading-5 focus:bg-gray-100 focus:text-gray-900 focus:outline-none '.concat(
                                e.onClick ? 'cursor-pointer text-white' : ''
                              ),
                            children: e.label,
                          }),
                        ],
                      },
                      e.key
                    )
                  )
                : null,
            });
          },
          e8 = n(28034),
          e6 = n(41846),
          e9 = n(86483),
          e7 = n(37205),
          te = n(34549),
          tt = n(92844),
          tn = n(36457),
          ts = n(64618),
          ta = n(6464);
        let tr = () => ['notifications'],
          to = (e) => ['notifications', e],
          ti = () => ['notifications', 'summary'];
        async function tl() {
          let { data: e, error: t } = await (0, ta.r$)(
            '/platform/notifications/archive-all',
            { headers: { Version: '2' } }
          );
          return (t && (0, ta.S3)(t), e);
        }
        let tc = function () {
          let {
              onSuccess: e,
              onError: t,
              ...n
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            s = (0, tn.NL)();
          return (0, ts.D)(() => tl(), {
            async onSuccess(t, n, a) {
              (await s.invalidateQueries(tr()),
                await (null == e ? void 0 : e(t, n, a)));
            },
            async onError(e, n, s) {
              void 0 === t
                ? te.Am.error(
                    'Failed to archive all notifications: '.concat(e.message)
                  )
                : t(e, n, s);
            },
            ...n,
          });
        };
        var td = n(90688);
        async function tu(e, t) {
          let { status: n, filters: s, page: a = 0, limit: r = 10 } = e,
            { data: o, error: i } = await (0, ta.U2)(
              '/platform/notifications',
              {
                params: {
                  query: {
                    offset: String(a * r),
                    limit: String(r),
                    ...(void 0 !== n ? { status: n } : { status: 'new,seen' }),
                    ...(s.priority.length > 0
                      ? { priority: s.priority.join(',') }
                      : {}),
                    ...(s.organizations.length > 0
                      ? { org_slug: s.organizations.join(',') }
                      : {}),
                    ...(s.projects.length > 0
                      ? { project_ref: s.projects.join(',') }
                      : {}),
                  },
                },
                headers: { Version: '2' },
                signal: t,
              }
            );
          return (i && (0, ta.S3)(i), o);
        }
        let tx = function (e) {
          let { status: t, filters: n, limit: s = 10 } = e,
            { enabled: a = !0, ...r } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, td.N)(
            to({ status: t, filters: n, limit: s }),
            (e) => {
              let { signal: a, pageParam: r } = e;
              return tu({ status: t, filters: n, limit: s, page: r }, a);
            },
            {
              enabled: a,
              getNextPageParam(e, t) {
                let n = t.length;
                if (!((null != e ? e : []).length < s)) return n;
              },
              ...r,
            }
          );
        };
        var tp = n(28894);
        async function tm(e) {
          let { data: t, error: n } = await (0, ta.U2)(
            '/platform/notifications/summary',
            { signal: e }
          );
          return (n && (0, ta.S3)(n), t);
        }
        let th = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (0, tp.a)(
            ti(),
            (e) => {
              let { signal: t } = e;
              return tm(t);
            },
            e
          );
        };
        async function tf(e) {
          let { ids: t, status: n } = e,
            { data: s, error: a } = await (0, ta.r$)(
              '/platform/notifications',
              {
                body: t.map((e) => ({ id: e, status: n })),
                headers: { Version: '2' },
              }
            );
          return (a && (0, ta.S3)(a), s);
        }
        let tg = function () {
          let {
              onSuccess: e,
              onError: t,
              ...n
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            s = (0, tn.NL)();
          return (0, ts.D)((e) => tf(e), {
            async onSuccess(t, n, a) {
              (await s.invalidateQueries(['notifications']),
                await (null == e ? void 0 : e(t, n, a)));
            },
            async onError(e, n, s) {
              void 0 === t
                ? te.Am.error(
                    'Failed to update notifications: '.concat(e.message)
                  )
                : t(e, n, s);
            },
            ...n,
          });
        };
        var tj = n(28622),
          ty = n(34653);
        let tv = (0, tj.sj)({
            filterStatuses: [],
            filterPriorities: [],
            filterOrganizations: [],
            filterProjects: [],
            get numFiltersApplied() {
              return [
                ...this.filterStatuses,
                ...this.filterPriorities,
                ...this.filterOrganizations,
                ...this.filterProjects,
              ].length;
            },
            setFilters: (e, t) => {
              switch (t) {
                case 'status':
                  tv.filterStatuses.includes(e)
                    ? (tv.filterStatuses = tv.filterStatuses.filter(
                        (t) => t !== e
                      ))
                    : (tv.filterStatuses = tv.filterStatuses.concat([e]));
                  break;
                case 'priority':
                  tv.filterPriorities.includes(e)
                    ? (tv.filterPriorities = tv.filterPriorities.filter(
                        (t) => t !== e
                      ))
                    : (tv.filterPriorities = tv.filterPriorities.concat([e]));
                  break;
                case 'organizations':
                  tv.filterOrganizations.includes(e)
                    ? (tv.filterOrganizations = tv.filterOrganizations.filter(
                        (t) => t !== e
                      ))
                    : (tv.filterOrganizations = tv.filterOrganizations.concat([
                        e,
                      ]));
                  break;
                case 'projects':
                  tv.filterProjects.includes(e)
                    ? (tv.filterProjects = tv.filterProjects.filter(
                        (t) => t !== e
                      ))
                    : (tv.filterProjects = tv.filterProjects.concat([e]));
              }
            },
            resetFilters: () => {
              ((tv.filterStatuses = []),
                (tv.filterPriorities = []),
                (tv.filterOrganizations = []),
                (tv.filterProjects = []));
            },
          }),
          tb = (e) => (0, ty.R)(tv, e);
        var tN = n(28977),
          tw = n.n(tN),
          tk = n(39877),
          tS = n(70999),
          t_ = n(49996),
          tC = (e) => {
            var t;
            let {
                index: n,
                listRef: a,
                item: o,
                setRowHeight: l,
                getProject: c,
                getOrganizationById: d,
                getOrganizationBySlug: x,
                onUpdateNotificationStatus: p,
                queueMarkRead: m,
              } = e,
              h = (0, i.useRef)(null),
              { ref: f, inView: g } = (0, tS.YD)(),
              { status: j, priority: y } = o,
              v = o.data,
              b = void 0 !== v.project_ref ? c(v.project_ref) : void 0,
              N =
                void 0 !== v.org_slug
                  ? x(v.org_slug)
                  : void 0 !== b
                    ? d(b.organization_id)
                    : void 0,
              w = tw()().diff(tw()(o.inserted_at), 'day'),
              k = tw()(o.inserted_at).fromNow(),
              S = tw()(o.inserted_at).format('MMM DD, YYYY'),
              C = (e) => {
                console.log('Action', e);
              };
            return (
              (0, i.useEffect)(() => {
                if (h.current) {
                  var e;
                  (null == a ||
                    null === (e = a.current) ||
                    void 0 === e ||
                    e.resetAfterIndex(0),
                    l(n, h.current.clientHeight));
                }
              }, [h]),
              (0, i.useEffect)(() => {
                g && 'new' === o.status && m(o.id);
              }, [g]),
              (0, s.jsxs)('div', {
                ref: h,
                className: (0, _.cn)(
                  'p-4 flex justify-between gap-x-3 group',
                  0 !== n ? 'border-t border-overlay' : '',
                  'new' === j ? 'bg-surface-100/50' : 'bg-background'
                ),
                'data-sentry-component': 'NotificationRow',
                'data-sentry-source-file': 'NotificationRow.tsx',
                children: [
                  (0, s.jsxs)('div', {
                    ref: f,
                    className: 'flex flex-col gap-y-2.5 w-full py-0.5',
                    children: [
                      (void 0 !== b || void 0 !== N) &&
                        (0, s.jsxs)('div', {
                          className: 'flex items-center max-w-[350px]',
                          children: [
                            void 0 !== N &&
                              (0, s.jsx)(r(), {
                                title: N.name,
                                href: '/org/'.concat(N.slug, '/general'),
                                className:
                                  'text-xs transition text-foreground-light text-foreground underline truncate',
                                children: N.name,
                              }),
                            void 0 !== N &&
                              void 0 !== b &&
                              (0, s.jsx)('span', {
                                className: 'text-foreground-lighter',
                                children: (0, s.jsx)('svg', {
                                  viewBox: '0 0 24 24',
                                  width: '16',
                                  height: '16',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  fill: 'none',
                                  shapeRendering: 'geometricPrecision',
                                  children: (0, s.jsx)('path', {
                                    d: 'M16 3.549L7.12 20.600',
                                  }),
                                }),
                              }),
                            void 0 !== b &&
                              (0, s.jsx)(r(), {
                                title: b.name,
                                href: '/project/'.concat(b.ref),
                                className:
                                  'text-xs transition text-foreground-light text-foreground underline truncate',
                                children: b.name,
                              }),
                          ],
                        }),
                      (0, s.jsx)('div', {
                        className: 'flex items-center gap-x-2',
                        children: (0, s.jsxs)('p', {
                          className: 'text-sm break-word',
                          children: [
                            v.title,
                            ' ',
                            (0, s.jsx)('span', {
                              className:
                                'ml-1 text-xs text-foreground-light capitalize-sentence',
                              children: w > 1 ? S : k,
                            }),
                          ],
                        }),
                      }),
                      void 0 !== v.message &&
                        (0, s.jsx)(t_.U, {
                          className: 'text-foreground-light text-xs',
                          content: v.message,
                        }),
                      (null !== (t = v.actions) && void 0 !== t ? t : [])
                        .length > 0 &&
                        (0, s.jsx)('div', {
                          className: 'flex items-center gap-x-2',
                          children: v.actions.map((e, t) => {
                            let n = ''.concat(o.id, '-action-').concat(t);
                            if (void 0 !== e.url) {
                              var a, i;
                              let t = e.url.includes('[ref]')
                                ? e.url.replace(
                                    '[ref]',
                                    null !== (a = null == b ? void 0 : b.ref) &&
                                      void 0 !== a
                                      ? a
                                      : '_'
                                  )
                                : e.url.includes('[slug]')
                                  ? e.url.replace(
                                      '[slug]',
                                      null !==
                                        (i = null == N ? void 0 : N.slug) &&
                                        void 0 !== i
                                        ? i
                                        : '_'
                                    )
                                  : e.url;
                              return (0, s.jsx)(
                                W.z,
                                {
                                  type: 'default',
                                  icon: (0, s.jsx)(u.Z, { strokeWidth: 1.5 }),
                                  asChild: !0,
                                  children: (0, s.jsx)(r(), {
                                    href: t,
                                    target: '_blank',
                                    rel: 'noreferrer',
                                    children: e.label,
                                  }),
                                },
                                n
                              );
                            }
                            return void 0 !== e.action_type
                              ? (0, s.jsx)(
                                  W.z,
                                  {
                                    type: 'default',
                                    onClick: () => C(e.action_type),
                                    children: e.label,
                                  },
                                  n
                                )
                              : null;
                          }),
                        }),
                    ],
                  }),
                  (0, s.jsxs)('div', {
                    className: 'flex flex-col items-center gap-y-2',
                    children: [
                      'Warning' === y &&
                        (0, s.jsx)(M.aN, { className: 'w-5 h-5' }),
                      'Critical' === y &&
                        (0, s.jsx)(M.ku, { className: 'w-5 h-5' }),
                      'archived' === o.status
                        ? (0, s.jsx)(ep.u, {
                            type: 'outline',
                            icon: (0, s.jsx)(tk.Z, {
                              size: 13,
                              strokeWidth: 2,
                              className: 'text-foreground-light',
                            }),
                            className:
                              'p-1.5 group-opacity-100 opacity-0 transition rounded-full',
                            onClick: () => p(o.id, 'seen'),
                            tooltip: {
                              content: { text: 'Unarchive', side: 'bottom' },
                            },
                          })
                        : (0, s.jsx)(ep.u, {
                            type: 'outline',
                            icon: (0, s.jsx)(e7.Z, {
                              size: 13,
                              strokeWidth: 2,
                              className: 'text-foreground-light',
                            }),
                            className:
                              'p-1.5 group-opacity-100 opacity-0 transition rounded-full',
                            onClick: () => p(o.id, 'archived'),
                            tooltip: {
                              content: { text: 'Archive', side: 'bottom' },
                            },
                          }),
                    ],
                  }),
                ],
              })
            );
          },
          tP = n(3558),
          tD = n(14458),
          tz = n(14500),
          tF = n(36155),
          tL = n(61893);
        let tE = (e) => {
          let { activeTab: t } = e,
            [n, a] = (0, i.useState)(!1),
            r = tb(),
            { data: o } = (0, e$.tl)(),
            { data: l } = (0, eM.Sy)();
          return (0, s.jsxs)(eb.J2, {
            modal: !0,
            open: n,
            onOpenChange: a,
            'data-sentry-element': 'Popover_Shadcn_',
            'data-sentry-component': 'NotificationsFilter',
            'data-sentry-source-file': 'NotificationsFilter.tsx',
            children: [
              (0, s.jsx)(eb.xo, {
                asChild: !0,
                'data-sentry-element': 'PopoverTrigger_Shadcn_',
                'data-sentry-source-file': 'NotificationsFilter.tsx',
                children: (0, s.jsx)(W.z, {
                  type: r.numFiltersApplied > 0 ? 'default' : 'text',
                  icon: (0, s.jsx)(tP.Z, { strokeWidth: 1 }),
                  className: 'px-1 h-[26px]',
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'NotificationsFilter.tsx',
                  children:
                    r.numFiltersApplied > 0 &&
                    ''
                      .concat(r.numFiltersApplied, ' filter')
                      .concat(r.numFiltersApplied > 1 ? 's' : '', ' applied'),
                }),
              }),
              (0, s.jsx)(eb.yk, {
                className: 'p-0 w-64',
                side: 'bottom',
                align: 'end',
                'data-sentry-element': 'PopoverContent_Shadcn_',
                'data-sentry-source-file': 'NotificationsFilter.tsx',
                children: (0, s.jsxs)(eN.mY, {
                  'data-sentry-element': 'Command_Shadcn_',
                  'data-sentry-source-file': 'NotificationsFilter.tsx',
                  children: [
                    (0, s.jsx)(eN.sZ, {
                      placeholder: 'Find filter...',
                      'data-sentry-element': 'CommandInput_Shadcn_',
                      'data-sentry-source-file': 'NotificationsFilter.tsx',
                    }),
                    (0, s.jsxs)(eN.e8, {
                      'data-sentry-element': 'CommandList_Shadcn_',
                      'data-sentry-source-file': 'NotificationsFilter.tsx',
                      children: [
                        (0, s.jsxs)(eq.x, {
                          className: 'max-h-[240px] py-1 overflow-y-auto',
                          'data-sentry-element': 'ScrollArea',
                          'data-sentry-source-file': 'NotificationsFilter.tsx',
                          children: [
                            (0, s.jsxs)(eN.fu, {
                              'data-sentry-element': 'CommandGroup_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                              children: [
                                (0, s.jsx)(tz.Ju, {
                                  'data-sentry-element': 'DropdownMenuLabel',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: 'Status',
                                }),
                                (0, s.jsx)(eN.di, {
                                  disabled: 'archived' === t,
                                  onSelect: () => {
                                    r.setFilters('unread', 'status');
                                  },
                                  'data-sentry-element': 'CommandItem_Shadcn_',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: (0, s.jsxs)(tF._, {
                                    htmlFor: 'unread',
                                    className: (0, _.cn)(
                                      'flex items-center gap-x-2 text-xs text-foreground-light transition-colors',
                                      r.filterStatuses.includes('unread') &&
                                        'text-foreground'
                                    ),
                                    'data-sentry-element': 'Label_Shadcn_',
                                    'data-sentry-source-file':
                                      'NotificationsFilter.tsx',
                                    children: [
                                      (0, s.jsx)(tL.X, {
                                        name: 'unread',
                                        checked:
                                          r.filterStatuses.includes('unread'),
                                        'data-sentry-element':
                                          'Checkbox_Shadcn_',
                                        'data-sentry-source-file':
                                          'NotificationsFilter.tsx',
                                      }),
                                      'Unread',
                                    ],
                                  }),
                                }),
                              ],
                            }),
                            (0, s.jsx)(eN.zz, {
                              'data-sentry-element': 'CommandSeparator_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                            }),
                            (0, s.jsxs)(eN.fu, {
                              'data-sentry-element': 'CommandGroup_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                              children: [
                                (0, s.jsx)(tz.Ju, {
                                  'data-sentry-element': 'DropdownMenuLabel',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: 'Priority',
                                }),
                                (0, s.jsx)(eN.di, {
                                  onSelect: () => {
                                    r.setFilters('Warning', 'priority');
                                  },
                                  className: 'flex items-center gap-x-2',
                                  'data-sentry-element': 'CommandItem_Shadcn_',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: (0, s.jsxs)(tF._, {
                                    htmlFor: 'warning',
                                    className: (0, _.cn)(
                                      'flex items-center gap-x-2 text-xs text-foreground-light transition-colors',
                                      r.filterPriorities.includes('Warning') &&
                                        'text-foreground'
                                    ),
                                    'data-sentry-element': 'Label_Shadcn_',
                                    'data-sentry-source-file':
                                      'NotificationsFilter.tsx',
                                    children: [
                                      (0, s.jsx)(tL.X, {
                                        name: 'warning',
                                        checked:
                                          r.filterPriorities.includes(
                                            'Warning'
                                          ),
                                        'data-sentry-element':
                                          'Checkbox_Shadcn_',
                                        'data-sentry-source-file':
                                          'NotificationsFilter.tsx',
                                      }),
                                      (0, s.jsx)(M.aN, {
                                        className: 'size-4',
                                        'data-sentry-element': 'WarningIcon',
                                        'data-sentry-source-file':
                                          'NotificationsFilter.tsx',
                                      }),
                                      'Warning',
                                    ],
                                  }),
                                }),
                                (0, s.jsx)(
                                  eN.di,
                                  {
                                    onSelect: () => {
                                      r.setFilters('Critical', 'priority');
                                    },
                                    'data-sentry-element':
                                      'CommandItem_Shadcn_',
                                    'data-sentry-source-file':
                                      'NotificationsFilter.tsx',
                                    children: (0, s.jsxs)(tF._, {
                                      htmlFor: 'critical',
                                      className: (0, _.cn)(
                                        'flex items-center gap-x-2 text-xs text-foreground-light transition-colors',
                                        r.filterPriorities.includes(
                                          'Critical'
                                        ) && 'text-foreground'
                                      ),
                                      'data-sentry-element': 'Label_Shadcn_',
                                      'data-sentry-source-file':
                                        'NotificationsFilter.tsx',
                                      children: [
                                        (0, s.jsx)(tL.X, {
                                          name: 'critical',
                                          checked:
                                            r.filterPriorities.includes(
                                              'Critical'
                                            ),
                                          'data-sentry-element':
                                            'Checkbox_Shadcn_',
                                          'data-sentry-source-file':
                                            'NotificationsFilter.tsx',
                                        }),
                                        (0, s.jsx)(M.ku, {
                                          className: 'size-4',
                                          'data-sentry-element': 'CriticalIcon',
                                          'data-sentry-source-file':
                                            'NotificationsFilter.tsx',
                                        }),
                                        'Critical',
                                      ],
                                    }),
                                  },
                                  'critical'
                                ),
                              ],
                            }),
                            (0, s.jsx)(eN.zz, {
                              'data-sentry-element': 'CommandSeparator_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                            }),
                            (0, s.jsxs)(eN.fu, {
                              'data-sentry-element': 'CommandGroup_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                              children: [
                                (0, s.jsx)(tz.Ju, {
                                  'data-sentry-element': 'DropdownMenuLabel',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: 'Organizations',
                                }),
                                (null != o ? o : []).map((e) =>
                                  (0, s.jsx)(
                                    eN.di,
                                    {
                                      value: e.name.replaceAll('"', ''),
                                      className: 'flex items-center gap-x-2',
                                      onSelect: () => {
                                        r.setFilters(e.slug, 'organizations');
                                      },
                                      children: (0, s.jsxs)(tF._, {
                                        htmlFor: ''.concat(e.slug),
                                        className: (0, _.cn)(
                                          'flex items-center gap-x-2 text-xs text-foreground-light transition-colors',
                                          r.filterOrganizations.includes(
                                            e.slug
                                          ) && 'text-foreground'
                                        ),
                                        children: [
                                          (0, s.jsx)(tL.X, {
                                            name: ''.concat(e.slug),
                                            checked:
                                              r.filterOrganizations.includes(
                                                e.slug
                                              ),
                                            className: '',
                                          }),
                                          e.name,
                                        ],
                                      }),
                                    },
                                    e.slug
                                  )
                                ),
                              ],
                            }),
                            (0, s.jsx)(eN.zz, {
                              'data-sentry-element': 'CommandSeparator_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                            }),
                            (0, s.jsxs)(eN.fu, {
                              'data-sentry-element': 'CommandGroup_Shadcn_',
                              'data-sentry-source-file':
                                'NotificationsFilter.tsx',
                              children: [
                                (0, s.jsx)(tz.Ju, {
                                  'data-sentry-element': 'DropdownMenuLabel',
                                  'data-sentry-source-file':
                                    'NotificationsFilter.tsx',
                                  children: 'Projects',
                                }),
                                (null != l ? l : []).map((e) =>
                                  (0, s.jsx)(
                                    eN.di,
                                    {
                                      className: 'flex items-center gap-x-2',
                                      onSelect: (t) => {
                                        r.setFilters(e.ref, 'projects');
                                      },
                                      children: (0, s.jsxs)(tF._, {
                                        htmlFor: ''.concat(e.ref),
                                        className: (0, _.cn)(
                                          'flex items-center gap-x-2 text-xs text-foreground-light transition-colors',
                                          r.filterProjects.includes(e.ref) &&
                                            'text-foreground'
                                        ),
                                        children: [
                                          (0, s.jsx)(tL.X, {
                                            name: ''.concat(e.ref),
                                            checked: r.filterProjects.includes(
                                              e.ref
                                            ),
                                            className: '',
                                          }),
                                          e.name,
                                        ],
                                      }),
                                    },
                                    e.ref
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsx)(eN.zz, {
                          'data-sentry-element': 'CommandSeparator_Shadcn_',
                          'data-sentry-source-file': 'NotificationsFilter.tsx',
                        }),
                        (0, s.jsx)(eN.fu, {
                          'data-sentry-element': 'CommandGroup',
                          'data-sentry-source-file': 'NotificationsFilter.tsx',
                          children: (0, s.jsxs)(eN.di, {
                            onSelect: () => r.resetFilters(),
                            className: 'flex gap-x-2 items-center',
                            'data-sentry-element': 'CommandItem_Shadcn_',
                            'data-sentry-source-file':
                              'NotificationsFilter.tsx',
                            children: [
                              (0, s.jsx)(tD.Z, {
                                className: 'text-foreground-muted',
                                size: 12,
                                strokeWidth: 1,
                                'data-sentry-element': 'RotateCcw',
                                'data-sentry-source-file':
                                  'NotificationsFilter.tsx',
                              }),
                              'Reset filters',
                            ],
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
        var tA = () => {
          var e, t, n;
          let [a, r] = (0, i.useState)(!1),
            [o, l] = (0, i.useState)('inbox'),
            c = tb(),
            d = (0, i.useRef)([]),
            u = (0, i.useRef)({}),
            { data: x } = (0, eM.Sy)(),
            { data: p } = (0, e$.tl)(),
            {
              data: m,
              error: h,
              isLoading: g,
              isError: y,
              isSuccess: v,
              hasNextPage: b,
              isFetchingNextPage: N,
              fetchNextPage: w,
            } = tx({
              status:
                'archived' === o
                  ? 'archived'
                  : c.filterStatuses.includes('unread')
                    ? 'new'
                    : void 0,
              filters: {
                priority: c.filterPriorities,
                organizations: c.filterOrganizations,
                projects: c.filterProjects,
              },
            }),
            { data: k } = th(),
            { mutate: S } = tg(),
            { mutate: C, isLoading: P } = tc({
              onSuccess: () =>
                te.Am.success('Successfully archived all notifications'),
            }),
            D = (0, i.useMemo)(() => {
              var e;
              return null !==
                (e = null == m ? void 0 : m.pages.flatMap((e) => e)) &&
                void 0 !== e
                ? e
                : [];
            }, [null == m ? void 0 : m.pages]),
            z =
              null !== (e = null == k ? void 0 : k.unread_count) &&
              void 0 !== e &&
              e,
            F = null == k ? void 0 : k.has_warning,
            L = null == k ? void 0 : k.has_critical,
            E = () => {
              d.current.length > 0 && S({ ids: d.current, status: 'seen' });
            };
          return (0, s.jsxs)(eb.J2, {
            modal: !1,
            open: a,
            onOpenChange: (e) => {
              (r(e), e || E());
            },
            'data-sentry-element': 'Popover_Shadcn_',
            'data-sentry-component': 'NotificationsPopoverV2',
            'data-sentry-source-file': 'NotificationsPopover.tsx',
            children: [
              (0, s.jsx)(eb.xo, {
                asChild: !0,
                'data-sentry-element': 'PopoverTrigger_Shadcn_',
                'data-sentry-source-file': 'NotificationsPopover.tsx',
                children: (0, s.jsx)(W.z, {
                  type: z ? 'outline' : 'text',
                  className: (0, _.cn)(
                    'h-[26px]',
                    'group',
                    z ? 'rounded-full px-1.5' : 'px-1',
                    L
                      ? 'border-destructive-500 border-destructive-600 bg-destructive-300'
                      : F
                        ? 'border-warning-500 border-warning-600 bg-warning-300'
                        : ''
                  ),
                  icon: L
                    ? (0, s.jsx)(M.ku, {
                        className:
                          'relative !w-3.5 !h-3.5 transition-all -mr-3.5 group--mr-1 z-10',
                      })
                    : F
                      ? (0, s.jsx)(M.aN, {
                          className:
                            'relative !w-3.5 !h-3.5 transition-all -mr-3.5 group--mr-1 z-10',
                        })
                      : z
                        ? (0, s.jsx)('div', {
                            className: (0, _.cn)(
                              'transition-all -mr-3 group--mr-1',
                              'z-10 h-4 flex items-center justify-center rounded-full bg-black dark:bg-white',
                              (null !==
                                (t = null == k ? void 0 : k.unread_count) &&
                              void 0 !== t
                                ? t
                                : 0) > 9
                                ? 'px-0.5 w-auto'
                                : 'w-4'
                            ),
                            children: (0, s.jsx)('p', {
                              className: 'text-xs text-background-alternative',
                              children: null == k ? void 0 : k.unread_count,
                            }),
                          })
                        : null,
                  iconRight: (0, s.jsx)(e9.Z, {
                    size: 18,
                    strokeWidth: 1.5,
                    className:
                      'transition group-text-foreground text-foreground-light',
                  }),
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'NotificationsPopover.tsx',
                }),
              }),
              (0, s.jsxs)(eb.yk, {
                className: 'p-0 w-screen md:w-[450px] overflow-hidden',
                side: 'bottom',
                align: 'end',
                'data-sentry-element': 'PopoverContent_Shadcn_',
                'data-sentry-source-file': 'NotificationsPopover.tsx',
                children: [
                  (0, s.jsxs)('div', {
                    className: 'px-4',
                    children: [
                      (0, s.jsx)('p', {
                        className: 'pt-4 pb-1 text-sm',
                        children: 'Notifications',
                      }),
                      (0, s.jsx)('div', {
                        className: 'flex items-center',
                        children: (0, s.jsx)(ej.mQ, {
                          className: 'w-full',
                          onValueChange: (e) => {
                            (l(e),
                              'archived' === e &&
                                c.filterStatuses.includes('unread') &&
                                c.setFilters('unread', 'status'));
                          },
                          value: o,
                          'data-sentry-element': 'Tabs_Shadcn_',
                          'data-sentry-source-file': 'NotificationsPopover.tsx',
                          children: (0, s.jsxs)('div', {
                            className: 'flex items-center',
                            children: [
                              (0, s.jsxs)(ej.dr, {
                                className: 'flex gap-5 grow border-none',
                                'data-sentry-element': 'TabsList_Shadcn_',
                                'data-sentry-source-file':
                                  'NotificationsPopover.tsx',
                                children: [
                                  (0, s.jsxs)(ej.SP, {
                                    id: 'inbox',
                                    value: 'inbox',
                                    className:
                                      'px-0 data-[state=active]:bg-transparent flex gap-2',
                                    'data-sentry-element':
                                      'TabsTrigger_Shadcn_',
                                    'data-sentry-source-file':
                                      'NotificationsPopover.tsx',
                                    children: [
                                      'Inbox',
                                      (0, s.jsx)('div', {
                                        className: (0, _.cn)(
                                          'flex items-center justify-center text-xs rounded-full bg-surface-300 h-4',
                                          (null !==
                                            (n =
                                              null == k
                                                ? void 0
                                                : k.unread_count) &&
                                          void 0 !== n
                                            ? n
                                            : 0) > 9
                                            ? 'px-0.5 w-auto'
                                            : 'w-4'
                                        ),
                                        children:
                                          null == k ? void 0 : k.unread_count,
                                      }),
                                    ],
                                  }),
                                  (0, s.jsx)(ej.SP, {
                                    id: 'archived',
                                    value: 'archived',
                                    className:
                                      'px-0 data-[state=active]:bg-transparent',
                                    'data-sentry-element':
                                      'TabsTrigger_Shadcn_',
                                    'data-sentry-source-file':
                                      'NotificationsPopover.tsx',
                                    children: 'Archived',
                                  }),
                                ],
                              }),
                              (0, s.jsx)(tE, {
                                activeTab: o,
                                'data-sentry-element': 'NotificationsFilter',
                                'data-sentry-source-file':
                                  'NotificationsPopover.tsx',
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, s.jsxs)('div', {
                    className: 'border-t',
                    children: [
                      g &&
                        (0, s.jsx)('div', {
                          className: 'p-4',
                          children: (0, s.jsx)(j.A, {}),
                        }),
                      y &&
                        (0, s.jsx)('div', {
                          className: 'p-4',
                          children: (0, s.jsx)(f.Z, {
                            subject: 'Failed to retrieve notifications',
                            error: h,
                          }),
                        }),
                      v &&
                        (0, s.jsx)('div', {
                          className: 'flex flex-1 h-[400px] bg-background',
                          children:
                            D.length > 0 &&
                            !(
                              'archived' === o &&
                              c.filterStatuses.includes('unread')
                            )
                              ? (0, s.jsx)(tt.Z, {
                                  items: D,
                                  ItemComponent: tC,
                                  LoaderComponent: (0, s.jsx)('div', {
                                    className: 'p-4',
                                    children: (0, s.jsx)(j.Z, {}),
                                  }),
                                  itemProps: {
                                    setRowHeight: (e, t) => {
                                      u.current &&
                                        (u.current = { ...u.current, [e]: t });
                                    },
                                    getProject: (e) =>
                                      null == x
                                        ? void 0
                                        : x.find((t) => t.ref === e),
                                    getOrganizationById: (e) =>
                                      null == p
                                        ? void 0
                                        : p.find((t) => t.id === e),
                                    getOrganizationBySlug: (e) =>
                                      null == p
                                        ? void 0
                                        : p.find((t) => t.slug === e),
                                    onUpdateNotificationStatus: (e, t) => {
                                      S({ ids: [e], status: t });
                                    },
                                    queueMarkRead: (e) => {
                                      d.current &&
                                        !d.current.includes(e) &&
                                        d.current.push(e);
                                    },
                                  },
                                  getItemSize: (e) => {
                                    var t, n;
                                    return null !==
                                      (n =
                                        null == u
                                          ? void 0
                                          : null === (t = u.current) ||
                                              void 0 === t
                                            ? void 0
                                            : t[e]) && void 0 !== n
                                      ? n
                                      : 56;
                                  },
                                  hasNextPage: b,
                                  isLoadingNextPage: N,
                                  onLoadNextPage: () => w(),
                                })
                              : (0, s.jsxs)('div', {
                                  className:
                                    'flex flex-col gap-y-4 items-center flex-grow justify-center',
                                  children: [
                                    (0, s.jsx)(e9.Z, {
                                      size: 32,
                                      className: 'text-foreground-light',
                                    }),
                                    (0, s.jsxs)('div', {
                                      className: 'flex flex-col gap-y-1',
                                      children: [
                                        (0, s.jsx)('p', {
                                          className:
                                            'text-foreground-light text-sm mx-auto text-center',
                                          children:
                                            'archived' === o
                                              ? 'No archived notifications'.concat(
                                                  c.numFiltersApplied > 0
                                                    ? ' based on the '
                                                        .concat(
                                                          c.numFiltersApplied,
                                                          ' filter'
                                                        )
                                                        .concat(
                                                          c.numFiltersApplied >
                                                            1
                                                            ? 's'
                                                            : '',
                                                          ' applied'
                                                        )
                                                    : ''
                                                )
                                              : c.numFiltersApplied > 0
                                                ? 'No notifications based on the '
                                                    .concat(
                                                      c.numFiltersApplied,
                                                      ' filter'
                                                    )
                                                    .concat(
                                                      c.numFiltersApplied > 1
                                                        ? 's'
                                                        : '',
                                                      ' applied'
                                                    )
                                                : 'All caught up',
                                        }),
                                        (0, s.jsx)('p', {
                                          className:
                                            'text-foreground-lighter text-xs w-60 mx-auto text-center',
                                          children:
                                            'archived' === o
                                              ? 'Notifications that you have previously archived will be shown here'
                                              : 'You will be notified here for any notices on your organizations and projects',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                        }),
                    ],
                  }),
                  D.length > 0 &&
                    'inbox' === o &&
                    (0, s.jsx)('div', {
                      className:
                        'flex items-center justify-center p-1.5 border-t',
                      children: (0, s.jsx)(W.z, {
                        disabled: P,
                        loading: P,
                        type: 'text',
                        icon: (0, s.jsx)(e7.Z, {}),
                        onClick: () => C(),
                        children: 'Archive all',
                      }),
                    }),
                ],
              }),
            ],
          });
        };
        let tI = () =>
          (0, s.jsx)('span', {
            className: 'text-border-stronger',
            'data-sentry-component': 'LayoutHeaderDivider',
            'data-sentry-source-file': 'LayoutHeader.tsx',
            children: (0, s.jsx)('svg', {
              viewBox: '0 0 24 24',
              width: '16',
              height: '16',
              stroke: 'currentColor',
              strokeWidth: '1',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              fill: 'none',
              shapeRendering: 'geometricPrecision',
              'data-sentry-element': 'svg',
              'data-sentry-source-file': 'LayoutHeader.tsx',
              children: (0, s.jsx)('path', {
                d: 'M16 3.549L7.12 20.600',
                'data-sentry-element': 'path',
                'data-sentry-source-file': 'LayoutHeader.tsx',
              }),
            }),
          });
        var tT = (e) => {
          let {
              customHeaderComponents: t,
              breadcrumbs: n = [],
              headerBorder: a = !0,
              showProductMenu: c = !0,
            } = e,
            d = (0, o.useRouter)(),
            { ref: u } = (0, l.UO)(),
            x = (0, ef.Vm)(),
            p = (0, w.l)(),
            { mobileMenuOpen: m, setMobileMenuOpen: h } = (0, eL.WZ)(),
            f = (null == x ? void 0 : x.is_branch_enabled) === !0,
            { data: g } = (0, e0.Gl)({ orgSlug: null == p ? void 0 : p.slug }),
            { data: j } = (0, e3.v)(
              { orgSlug: null == p ? void 0 : p.slug },
              { enabled: (null == g ? void 0 : g.usage_billing_enabled) === !1 }
            ),
            y = (0, i.useMemo)(
              () => !!j && e4((null == j ? void 0 : j.usages) || []).length > 0,
              [j]
            );
          return (0, s.jsxs)('div', {
            className: (0, _.cn)(
              'flex h-12 max-h-12 min-h-12 items-center bg-dash-sidebar',
              a ? 'border-b border-default' : ''
            ),
            'data-sentry-component': 'LayoutHeader',
            'data-sentry-source-file': 'LayoutHeader.tsx',
            children: [
              c &&
                (0, s.jsx)('div', {
                  className:
                    'flex items-center justify-center border-r flex-0 md:hidden h-full aspect-square',
                  children: (0, s.jsxs)('button', {
                    title: 'Menu dropdown button',
                    className: (0, _.cn)(
                      'group/view-toggle ml-4 flex justify-center flex-col border-none space-x-0 items-start gap-1 !bg-transparent rounded-md min-w-[30px] w-[30px] h-[30px]'
                    ),
                    onClick: () => h(!m),
                    children: [
                      (0, s.jsx)('div', {
                        className:
                          'h-px inline-block left-0 w-4 transition-all ease-out bg-foreground-lighter group-hover/view-toggle:bg-foreground p-0 m-0',
                      }),
                      (0, s.jsx)('div', {
                        className:
                          'h-px inline-block left-0 w-3 transition-all ease-out bg-foreground-lighter group-hover/view-toggle:bg-foreground p-0 m-0',
                      }),
                    ],
                  }),
                }),
              (0, s.jsxs)('div', {
                className: 'relative flex flex-1 overflow-hidden',
                children: [
                  (0, s.jsxs)('div', {
                    className:
                      'flex w-full items-center justify-between py-2 pl-1 pr-3 md:px-3 flex-nowrap overflow-x-auto no-scrollbar',
                    children: [
                      (0, s.jsxs)('div', {
                        className: 'flex items-center text-sm',
                        children: [
                          u &&
                            (0, s.jsx)(r(), {
                              href: eg.Qy ? '/projects' : '/project/'.concat(u),
                              className:
                                'mx-1 hidden md:flex items-center w-[40px] h-[40px]',
                              children: (0, s.jsx)('img', {
                                alt: 'Supabase',
                                src: ''.concat(
                                  d.basePath,
                                  '/img/supabase-logo.svg'
                                ),
                                className:
                                  'absolute h-[40px] w-6 cursor-pointer rounded',
                              }),
                            }),
                          u &&
                            (0, s.jsxs)(s.Fragment, {
                              children: [
                                (0, s.jsxs)('div', {
                                  className: 'flex items-center',
                                  children: [
                                    (0, s.jsx)(e2, {}),
                                    (0, s.jsx)(tI, {}),
                                    (0, s.jsx)(eG, {}),
                                    y &&
                                      (0, s.jsx)('div', {
                                        className: 'ml-2',
                                        children: (0, s.jsx)(r(), {
                                          href: '/org/'.concat(
                                            null == p ? void 0 : p.slug,
                                            '/usage'
                                          ),
                                          children: (0, s.jsx)(eU.C, {
                                            variant: 'destructive',
                                            children: 'Exceeding usage limits',
                                          }),
                                        }),
                                      }),
                                    x &&
                                      f &&
                                      (0, s.jsxs)(s.Fragment, {
                                        children: [
                                          (0, s.jsx)(tI, {}),
                                          (0, s.jsx)(eJ, {}),
                                        ],
                                      }),
                                  ],
                                }),
                                (0, s.jsxs)('div', {
                                  className: 'ml-3 flex items-center gap-x-3',
                                  children: [
                                    !f && (0, s.jsx)(eX, {}),
                                    (0, s.jsx)(eF, {}),
                                  ],
                                }),
                              ],
                            }),
                          (0, s.jsx)(e5, {
                            defaultValue: n,
                            'data-sentry-element': 'BreadcrumbsView',
                            'data-sentry-source-file': 'LayoutHeader.tsx',
                          }),
                        ],
                      }),
                      (0, s.jsxs)('div', {
                        className: 'flex items-center gap-x-2',
                        children: [
                          t && t,
                          eg.Qy &&
                            (0, s.jsxs)(s.Fragment, {
                              children: [
                                (0, s.jsx)(e8.v, {}),
                                (0, s.jsx)(tA, {}),
                                (0, s.jsx)(e6.Z, {}),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)('div', {
                    className:
                      'absolute md:hidden left-0 h-full w-3 bg-gradient-to-r from-background-dash-sidebar to-transparent pointer-events-none',
                  }),
                  (0, s.jsx)('div', {
                    className:
                      'absolute md:hidden right-0 h-full w-3 bg-gradient-to-l from-background-dash-sidebar to-transparent pointer-events-none',
                  }),
                ],
              }),
              !!u &&
                (0, s.jsx)('div', {
                  className: 'border-l flex-0 h-full',
                  children: (0, s.jsx)(eA, {}),
                }),
            ],
          });
        };
      },
      14075: function (e, t, n) {
        'use strict';
        n.d(t, {
          V: function () {
            return i;
          },
        });
        var s = n(28894),
          a = n(6464),
          r = n(3746);
        async function o(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: s, error: r } = await (0, a.U2)(
            '/v1/projects/{ref}/branches',
            { params: { path: { ref: n } }, signal: t }
          );
          if (r) {
            if (
              'Preview branching is not enabled for this project.' === r.message
            )
              return [];
            (0, a.S3)(r);
          }
          return s;
        }
        let i = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            r.x.list(t),
            (e) => {
              let { signal: n } = e;
              return o({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
      },
      31485: function (e, t, n) {
        'use strict';
        n.d(t, {
          Pb: function () {
            return d;
          },
          zR: function () {
            return c;
          },
        });
        var s = n(198),
          a = n(28894),
          r = n(6464),
          o = n(90817),
          i = n(59141);
        async function l(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: s, error: a } = await (0, r.U2)(
            '/platform/projects/{ref}/settings',
            { params: { path: { ref: n } }, signal: t }
          );
          return (a && (0, r.S3)(a), s);
        }
        let c = function (e) {
            let { projectRef: t } = e,
              { enabled: n = !0, ...r } =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              c = (0, o.Xo)(s.KA.TENANT_SQL_ADMIN_WRITE, '*');
            return (0, a.a)(
              i.U.settingsV2(t),
              (e) => {
                let { signal: n } = e;
                return l({ projectRef: t }, n);
              },
              {
                enabled: n && void 0 !== t,
                refetchInterval(e) {
                  var t;
                  let n =
                    null !== (t = null == e ? void 0 : e.service_api_keys) &&
                    void 0 !== t
                      ? t
                      : [];
                  return c && 0 === n.length ? 2e3 : 0;
                },
                ...r,
              }
            );
          },
          d = (e) => {
            var t, n;
            return {
              anonKey: (null !==
                (t = null == e ? void 0 : e.service_api_keys) && void 0 !== t
                ? t
                : []
              ).find((e) => 'anon' === e.tags),
              serviceKey: (null !==
                (n = null == e ? void 0 : e.service_api_keys) && void 0 !== n
                ? n
                : []
              ).find((e) => 'service_role' === e.tags),
            };
          };
      },
      7324: function (e, t, n) {
        'use strict';
        n.d(t, {
          A: function () {
            return s;
          },
        });
        let s = {
          schemas: (e) => ['projects', e, 'schemas'],
          indexes: (e, t) => ['projects', e, 'indexes', t].filter(Boolean),
          keywords: (e) => ['projects', e, 'keywords'],
          migrations: (e) => ['projects', e, 'migrations'],
          tableColumns: (e, t, n) => ['projects', e, 'table-columns', t, n],
          databaseFunctions: (e) => ['projects', e, 'database-functions'],
          entityDefinition: (e, t) => ['projects', e, 'entity-definition', t],
          entityDefinitions: (e, t) => ['projects', e, 'entity-definitions', t],
          tableDefinition: (e, t) => ['projects', e, 'table-definition', t],
          viewDefinition: (e, t) => ['projects', e, 'view-definition', t],
          backups: (e) => ['projects', e, 'database', 'backups'],
          poolingConfiguration: (e) => [
            'projects',
            e,
            'database',
            'pooling-configuration',
          ],
          indexesFromQuery: (e, t) => ['projects', e, 'indexes', { query: t }],
          indexAdvisorFromQuery: (e, t) => [
            'projects',
            e,
            'index-advisor',
            { query: t },
          ],
          tableConstraints: (e, t) => ['projects', e, 'table-constraints', t],
          foreignKeyConstraints: (e, t) => [
            'projects',
            e,
            'foreign-key-constraints',
            t,
          ],
          databaseSize: (e) => ['projects', e, 'database-size'],
          maxConnections: (e) => ['projects', e, 'max-connections'],
        };
      },
      98502: function (e, t, n) {
        'use strict';
        n.d(t, {
          Y: function () {
            return i;
          },
        });
        var s = n(28894),
          a = n(6464),
          r = n(7324);
        async function o(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: s, error: r } = await (0, a.U2)(
            '/platform/projects/{ref}/config/supavisor',
            { params: { path: { ref: n } }, signal: t }
          );
          return (r && (0, a.S3)(r), s);
        }
        let i = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            r.A.poolingConfiguration(t),
            (e) => {
              let { signal: n } = e;
              return o({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
      },
      23497: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return s;
          },
        });
        let s = {
          list: (e) => ['project', e, 'replicas'],
          statuses: (e) => ['project', e, 'replicas-statuses'],
          loadBalancers: (e) => ['project', e, 'load-balancers'],
          replicaLag: (e, t) => ['project', e, 'replica-lag', t],
        };
      },
      2343: function (e, t, n) {
        'use strict';
        n.d(t, {
          Zs: function () {
            return i;
          },
          bN: function () {
            return d;
          },
          l_: function () {
            return l;
          },
        });
        var s = n(28894),
          a = n(12436),
          r = n(6464),
          o = n(23497);
        let i = 2,
          l = 5;
        async function c(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: s, error: a } = await (0, r.U2)(
            '/platform/projects/{ref}/databases',
            { params: { path: { ref: n } }, signal: t }
          );
          return (a && (0, r.S3)(a), s);
        }
        let d = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...r } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            o.Z.list(t),
            (e) => {
              let { signal: n } = e;
              return c({ projectRef: t }, n);
            },
            { enabled: n && a.Qy && void 0 !== t, ...r }
          );
        };
      },
      21694: function (e, t, n) {
        'use strict';
        n.d(t, {
          U: function () {
            return o;
          },
          f: function () {
            return i;
          },
        });
        var s = n(97158),
          a = n(77875),
          r = n.n(a);
        let o = (e) => {
            var t;
            return r()(null !== (t = e.split('-')) && void 0 !== t ? t : []);
          },
          i = (e) => {
            var t, n;
            return null ===
              (t = r()(
                null === (n = s.q_.find((t) => t.region === e)) || void 0 === n
                  ? void 0
                  : n.name.split('(')
              )) || void 0 === t
              ? void 0
              : t.split(')')[0];
          };
      },
      9108: function (e, t, n) {
        'use strict';
        n.d(t, {
          F: function () {
            return i;
          },
        });
        var s = n(28894),
          a = n(6464),
          r = n(78596);
        async function o(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { error: s, data: r } = await (0, a.U2)(
            '/platform/projects/{ref}/billing/addons',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, a.S3)(s), r);
        }
        let i = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            r.U.addons(t),
            (e) => {
              let { signal: n } = e;
              return o({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
      },
      42764: function (e, t, n) {
        'use strict';
        n.d(t, {
          v: function () {
            return i;
          },
        });
        var s = n(28894),
          a = n(6464),
          r = n(5731);
        async function o(e, t) {
          let { orgSlug: n, projectRef: s, start: r, end: o } = e;
          if (!n) throw Error('orgSlug is required');
          let { data: i, error: l } = await (0, a.U2)(
            '/platform/organizations/{slug}/usage',
            {
              params: {
                path: { slug: n },
                query: {
                  project_ref: s,
                  start: null == r ? void 0 : r.toISOString(),
                  end: null == o ? void 0 : o.toISOString(),
                },
              },
              signal: t,
            }
          );
          return (l && (0, a.S3)(l), i);
        }
        let i = function (e) {
          let { orgSlug: t, projectRef: n, start: a, end: i } = e,
            { enabled: l = !0, ...c } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            r.Z.orgUsage(
              t,
              n,
              null == a ? void 0 : a.toISOString(),
              null == i ? void 0 : i.toISOString()
            ),
            (e) => {
              let { signal: s } = e;
              return o({ orgSlug: t, projectRef: n, start: a, end: i }, s);
            },
            { enabled: l && void 0 !== t, staleTime: 18e5, ...c }
          );
        };
      },
      1724: function (e, t, n) {
        'use strict';
        var s = n(97458),
          a = n(71607),
          r = n.n(a),
          o = n(52675),
          i = n(98601),
          l = n(62507),
          c = n(36950),
          d = n(83145),
          u = n.n(d),
          x = n(32691),
          p = n(62213),
          m = n(52983),
          h = n(12436),
          f = n(49996),
          g = n(97158),
          j = n(2343),
          y = n(21694),
          v = n(619),
          b = n(42026),
          N = n(90839),
          w = n(65092),
          k = n(47482),
          S = n(64890),
          _ = n(40577);
        t.Z = (e) => {
          var t;
          let {
              selectedDatabaseId: n,
              variant: a = 'regular',
              additionalOptions: d = [],
              onSelectId: C = r(),
              buttonProps: P,
            } = e,
            D = (0, x.useRouter)(),
            { ref: z } = (0, h.UO)(),
            [F, L] = (0, m.useState)(!1),
            [, E] = (0, p.v1)('showConnect', p.AE.withDefault(!1)),
            A = (0, v.TF)(),
            I = null != n ? n : A.selectedDatabaseId,
            {
              data: T,
              isLoading: Z,
              isSuccess: R,
            } = (0, j.bN)({ projectRef: z }),
            O = null != T ? T : [],
            B = O.sort((e, t) => (e.inserted_at > t.inserted_at ? 1 : 0)).sort(
              (e) => (e.identifier === z ? -1 : 0)
            ),
            U = O.find((e) => e.identifier === I),
            q = (0, y.f)(
              null !== (t = null == U ? void 0 : U.region) && void 0 !== t
                ? t
                : ''
            ),
            W = (0, y.U)(null != I ? I : ''),
            M = d.find((e) => e.id === I);
          return (
            (0, m.useEffect)(() => {
              n && A.setSelectedDatabaseId(n);
            }, [n]),
            (0, s.jsxs)(b.J2, {
              open: F,
              onOpenChange: L,
              modal: !1,
              'data-sentry-element': 'Popover_Shadcn_',
              'data-sentry-component': 'DatabaseSelector',
              'data-sentry-source-file': 'DatabaseSelector.tsx',
              children: [
                (0, s.jsx)(b.xo, {
                  asChild: !0,
                  'data-sentry-element': 'PopoverTrigger_Shadcn_',
                  'data-sentry-source-file': 'DatabaseSelector.tsx',
                  children: (0, s.jsxs)('div', {
                    className: 'flex cursor-pointer',
                    children: [
                      (0, s.jsx)('span', {
                        className:
                          'flex items-center text-foreground-lighter px-3 rounded-lg rounded-r-none text-xs border border-button border-r-0',
                        children: 'Source',
                      }),
                      (0, s.jsx)(N.z, {
                        type: 'default',
                        icon:
                          Z && (0, s.jsx)(o.Z, { className: 'animate-spin' }),
                        iconRight: (0, s.jsx)(i.Z, {
                          strokeWidth: 1.5,
                          size: 12,
                        }),
                        ...P,
                        className: (0, w.cn)(
                          'pr-2 rounded-l-none',
                          'connected-on-right' === a && 'rounded-r-none',
                          'connected-on-left' === a &&
                            'rounded-l-none border-l-0',
                          'connected-on-both' === a &&
                            'rounded-none border-x-0',
                          null == P ? void 0 : P.className
                        ),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'DatabaseSelector.tsx',
                        children: M
                          ? (0, s.jsx)('span', { children: M.name })
                          : (0, s.jsxs)(s.Fragment, {
                              children: [
                                (0, s.jsx)('span', {
                                  className: 'capitalize',
                                  children:
                                    Z ||
                                    (null == U ? void 0 : U.identifier) === z
                                      ? 'Primary database'
                                      : 'Read replica',
                                }),
                                ' ',
                                R &&
                                  (null == U ? void 0 : U.identifier) !== z &&
                                  (0, s.jsxs)('span', {
                                    children: ['(', q, ' - ', W, ')'],
                                  }),
                              ],
                            }),
                      }),
                    ],
                  }),
                }),
                (0, s.jsx)(b.yk, {
                  className: 'p-0 w-64',
                  side: 'bottom',
                  align: 'end',
                  'data-sentry-element': 'PopoverContent_Shadcn_',
                  'data-sentry-source-file': 'DatabaseSelector.tsx',
                  children: (0, s.jsx)(k.mY, {
                    'data-sentry-element': 'Command_Shadcn_',
                    'data-sentry-source-file': 'DatabaseSelector.tsx',
                    children: (0, s.jsxs)(k.e8, {
                      'data-sentry-element': 'CommandList_Shadcn_',
                      'data-sentry-source-file': 'DatabaseSelector.tsx',
                      children: [
                        d.length > 0 &&
                          (0, s.jsx)(k.fu, {
                            className: 'border-b',
                            children: d.map((e) =>
                              (0, s.jsx)(
                                k.di,
                                {
                                  value: e.id,
                                  className: 'cursor-pointer w-full',
                                  onSelect: () => {
                                    (A.setSelectedDatabaseId(e.id),
                                      L(!1),
                                      C(e.id));
                                  },
                                  onClick: () => {
                                    (A.setSelectedDatabaseId(e.id),
                                      L(!1),
                                      C(e.id));
                                  },
                                  children: (0, s.jsxs)('div', {
                                    className:
                                      'w-full flex items-center justify-between',
                                    children: [
                                      (0, s.jsx)('p', { children: e.name }),
                                      e.id === I &&
                                        (0, s.jsx)(l.Z, { size: 14 }),
                                    ],
                                  }),
                                },
                                e.id
                              )
                            ),
                          }),
                        (0, s.jsx)(k.fu, {
                          'data-sentry-element': 'CommandGroup_Shadcn_',
                          'data-sentry-source-file': 'DatabaseSelector.tsx',
                          children: (0, s.jsx)(S.x, {
                            className: (O || []).length > 7 ? 'h-[210px]' : '',
                            'data-sentry-element': 'ScrollArea',
                            'data-sentry-source-file': 'DatabaseSelector.tsx',
                            children:
                              null == B
                                ? void 0
                                : B.map((e) => {
                                    let t = (0, y.f)(e.region),
                                      n = (0, y.U)(e.identifier);
                                    if ('ACTIVE_HEALTHY' !== e.status) {
                                      let a = [
                                        g.hk.INIT_READ_REPLICA,
                                        g.hk.COMING_UP,
                                      ].includes(e.status)
                                        ? 'coming up'
                                        : 'not healthy';
                                      return (0, s.jsxs)(
                                        _.u,
                                        {
                                          children: [
                                            (0, s.jsx)(_.aJ, {
                                              asChild: !0,
                                              children: (0, s.jsx)('div', {
                                                className:
                                                  'px-2 py-1.5 w-full flex items-center justify-between',
                                                children: (0, s.jsxs)('p', {
                                                  className:
                                                    'text-xs text-foreground-lighter',
                                                  children: [
                                                    'Read replica (',
                                                    t,
                                                    ' - ',
                                                    n,
                                                    ')',
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, s.jsx)(_._v, {
                                              side: 'right',
                                              className: 'w-80',
                                              children: (0, s.jsx)(f.U, {
                                                className:
                                                  'text-xs text-foreground',
                                                content:
                                                  'Replica unable to accept requests as its '
                                                    .concat(
                                                      a,
                                                      '. [View infrastructure settings](/project/'
                                                    )
                                                    .concat(
                                                      z,
                                                      '/settings/infrastructure) for more information.'
                                                    ),
                                              }),
                                            }),
                                          ],
                                        },
                                        e.identifier
                                      );
                                    }
                                    return (0, s.jsx)(
                                      k.di,
                                      {
                                        value: e.identifier,
                                        className: 'cursor-pointer w-full',
                                        onSelect: () => {
                                          (A.setSelectedDatabaseId(
                                            e.identifier
                                          ),
                                            L(!1),
                                            C(e.identifier));
                                        },
                                        onClick: () => {
                                          (A.setSelectedDatabaseId(
                                            e.identifier
                                          ),
                                            L(!1),
                                            C(e.identifier));
                                        },
                                        children: (0, s.jsxs)('div', {
                                          className:
                                            'w-full flex items-center justify-between',
                                          children: [
                                            (0, s.jsx)('p', {
                                              children:
                                                e.identifier === z
                                                  ? 'Primary database'
                                                  : 'Read replica ('
                                                      .concat(t, ' - ')
                                                      .concat(n, ')'),
                                            }),
                                            e.identifier === I &&
                                              (0, s.jsx)(l.Z, { size: 16 }),
                                          ],
                                        }),
                                      },
                                      e.identifier
                                    );
                                  }),
                          }),
                        }),
                        (0, s.jsx)(k.fu, {
                          className: 'border-t',
                          'data-sentry-element': 'CommandGroup_Shadcn_',
                          'data-sentry-source-file': 'DatabaseSelector.tsx',
                          children: (0, s.jsx)(k.di, {
                            className: 'cursor-pointer w-full',
                            onSelect: () => {
                              (L(!1),
                                D.push(
                                  '/project/'.concat(
                                    z,
                                    '/settings/infrastructure'
                                  )
                                ));
                            },
                            onClick: () => L(!1),
                            'data-sentry-element': 'CommandItem_Shadcn_',
                            'data-sentry-source-file': 'DatabaseSelector.tsx',
                            children: (0, s.jsxs)(u(), {
                              href: '/project/'.concat(
                                z,
                                '/settings/infrastructure'
                              ),
                              onClick: () => {
                                (L(!1), E(null));
                              },
                              className: 'w-full flex items-center gap-2',
                              'data-sentry-element': 'Link',
                              'data-sentry-source-file': 'DatabaseSelector.tsx',
                              children: [
                                (0, s.jsx)(c.Z, {
                                  size: 14,
                                  strokeWidth: 1.5,
                                  'data-sentry-element': 'Plus',
                                  'data-sentry-source-file':
                                    'DatabaseSelector.tsx',
                                }),
                                (0, s.jsx)('p', {
                                  children: 'Create a new read replica',
                                }),
                              ],
                            }),
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
      },
      92844: function (e, t, n) {
        'use strict';
        var s = n(97458),
          a = n(45536),
          r = n(36117),
          o = n(52983),
          i = n(54056),
          l = n(65864),
          c = n(26714),
          d = n(54135);
        let u = (0, r.Z)((e, t) => ({ items: e, ...t })),
          x = (0, o.memo)((e) => {
            let { data: t, index: n, style: a } = e,
              {
                items: r,
                itemProps: o,
                ItemComponent: i,
                listRef: l,
                LoaderComponent: c,
              } = t,
              u = n < r.length ? r[n] : void 0;
            return u
              ? (0, s.jsx)('div', {
                  style: a,
                  children: (0, s.jsx)(i, {
                    index: n,
                    item: u,
                    listRef: l,
                    ...o,
                  }),
                })
              : void 0 !== c
                ? (0, s.jsx)('div', { style: a, children: c })
                : (0, s.jsx)('div', {
                    className: 'space-y-1 my-1',
                    style: a,
                    children: (0, s.jsxs)('div', {
                      className: 'flex flex-col gap-y-1',
                      children: [
                        (0, s.jsxs)('div', {
                          className:
                            'flex flex-row h-6 px-4 items-center gap-2',
                          children: [
                            (0, s.jsx)(d.O, { className: 'h-4 w-5' }),
                            (0, s.jsx)(d.O, { className: 'w-40 h-4' }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className:
                            'flex flex-row h-6 px-4 items-center gap-2',
                          children: [
                            (0, s.jsx)(d.O, { className: 'h-4 w-5' }),
                            (0, s.jsx)(d.O, { className: 'w-32 h-4' }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className:
                            'flex flex-row h-6 px-4 items-center gap-2 opacity-75',
                          children: [
                            (0, s.jsx)(d.O, { className: 'h-4 w-5' }),
                            (0, s.jsx)(d.O, { className: 'w-20 h-4' }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className:
                            'flex flex-row h-6 px-4 items-center gap-2 opacity-50',
                          children: [
                            (0, s.jsx)(d.O, { className: 'h-4 w-5' }),
                            (0, s.jsx)(d.O, { className: 'w-40 h-4' }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className:
                            'flex flex-row h-6 px-4 items-center gap-2 opacity-25',
                          children: [
                            (0, s.jsx)(d.O, { className: 'h-4 w-5' }),
                            (0, s.jsx)(d.O, { className: 'w-20 h-4' }),
                          ],
                        }),
                      ],
                    }),
                  });
          }, l.wy);
        ((x.displayName = 'Item'),
          (t.Z = (0, o.memo)(function (e) {
            let {
                items: t = [],
                itemProps: n,
                hasNextPage: a = !1,
                isLoadingNextPage: r = !1,
                getItemSize: d = () => 40,
                onLoadNextPage: p = () => {},
                ItemComponent: m = () => null,
                LoaderComponent: h,
              } = e,
              f = (0, o.useRef)(),
              g = r ? () => {} : p,
              j = (e) => !a || e < t.length,
              y = a ? t.length + 1 : t.length,
              v = u(t, {
                itemProps: n,
                ItemComponent: m,
                LoaderComponent: h,
                listRef: f,
              });
            return (0, s.jsxs)(s.Fragment, {
              children: [
                (0, s.jsx)(i.ZP, {
                  'data-sentry-element': 'AutoSizer',
                  'data-sentry-source-file': 'InfiniteList.tsx',
                  children: (e) => {
                    let { height: t, width: n } = e;
                    return (0, s.jsx)(c.Z, {
                      itemCount: y,
                      isItemLoaded: j,
                      loadMoreItems: g,
                      children: (e) => {
                        let { onItemsRendered: a, ref: r } = e;
                        return (0, s.jsx)(l.S_, {
                          ref: (e) => {
                            (r(e), (f.current = e));
                          },
                          height: null != t ? t : 0,
                          width: null != n ? n : 0,
                          itemCount: y,
                          itemData: v,
                          itemSize: d,
                          onItemsRendered: a,
                          children: x,
                        });
                      },
                    });
                  },
                }),
                (0, s.jsx)('div', {
                  style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                  },
                }),
              ],
            });
          }, a.t0)));
      },
      34730: function (e, t, n) {
        'use strict';
        var s = n(97458),
          a = n(32691),
          r = n(52983),
          o = n(9060),
          i = n(21613),
          l = n(72271),
          c = n(47482),
          d = n(65092);
        t.Z = (e) => {
          let { children: t, open: n = !1, onOpenChange: u } = e,
            x = (0, a.useRouter)(),
            { width: p } = (0, i.Z)();
          return (
            (0, r.useEffect)(() => {
              u(!1);
            }, [null == x ? void 0 : x.asPath]),
            (0, r.useEffect)(() => {
              u(!1);
            }, [p]),
            (0, s.jsx)(l.yo, {
              open: n,
              onOpenChange: u,
              'data-sentry-element': 'Sheet',
              'data-sentry-component': 'MobileSheetNav',
              'data-sentry-source-file': 'MobileSheetNav.tsx',
              children: (0, s.jsx)(l.ue, {
                id: 'mobile-sheet-content',
                showClose: !1,
                size: 'full',
                side: 'bottom',
                className: (0, d.cn)(
                  'rounded-t-lg overflow-hidden overflow-y-scroll',
                  'h-[85dvh] md:max-h-[500px] py-2'
                ),
                'data-sentry-element': 'SheetContent',
                'data-sentry-source-file': 'MobileSheetNav.tsx',
                children: (0, s.jsx)(o.SV, {
                  FallbackComponent: () => (0, s.jsx)(c.rb, {}),
                  'data-sentry-element': 'ErrorBoundary',
                  'data-sentry-source-file': 'MobileSheetNav.tsx',
                  children: t,
                }),
              }),
            })
          );
        };
      },
      49935: function (e, t, n) {
        'use strict';
        n.d(t, {
          d: function () {
            return D;
          },
        });
        var s = n(97458),
          a = n(71607),
          r = n.n(a),
          o = n(62507),
          i = n(58596),
          l = n(98809),
          c = n(52983),
          d = n(17434),
          u = n(97137),
          x = n(65092),
          p = n(90839);
        let m = (e) => ({
          hljs: {
            display: 'block',
            overflowX: 'auto',
            color: e ? '#ddd' : '#888',
          },
          'hljs-tag': { color: '#569cd6' },
          'hljs-keyword': { color: '#569cd6', fontWeight: 'normal' },
          'hljs-selector-tag': { color: '#569cd6', fontWeight: 'normal' },
          'hljs-literal': { color: '#569cd6', fontWeight: 'normal' },
          'hljs-strong': { color: '#569cd6' },
          'hljs-name': { color: '#569cd6' },
          'hljs-code': { color: '#66d9ef' },
          'hljs-class .hljs-title': { color: 'gray' },
          'hljs-attribute': { color: '#bf79db' },
          'hljs-symbol': { color: '#bf79db' },
          'hljs-regexp': { color: '#bf79db' },
          'hljs-link': { color: '#bf79db' },
          'hljs-string': { color: '#3ECF8E' },
          'hljs-bullet': { color: '#3ECF8E' },
          'hljs-subst': { color: '#3ECF8E' },
          'hljs-title': { color: '#3ECF8E', fontWeight: 'normal' },
          'hljs-section': { color: '#3ECF8E', fontWeight: 'normal' },
          'hljs-emphasis': { color: '#3ECF8E' },
          'hljs-type': { color: '#3ECF8E', fontWeight: 'normal' },
          'hljs-built_in': { color: '#3ECF8E' },
          'hljs-builtin-name': { color: '#3ECF8E' },
          'hljs-selector-attr': { color: '#3ECF8E' },
          'hljs-selector-pseudo': { color: '#3ECF8E' },
          'hljs-addition': { color: '#3ECF8E' },
          'hljs-variable': { color: '#3ECF8E' },
          'hljs-template-tag': { color: '#3ECF8E' },
          'hljs-template-variable': { color: '#3ECF8E' },
          'hljs-comment': { color: e ? '#999' : '#888' },
          'hljs-quote': { color: '#75715e' },
          'hljs-deletion': { color: '#75715e' },
          'hljs-meta': { color: '#75715e' },
          'hljs-doctag': { fontWeight: 'normal' },
          'hljs-selector-id': { fontWeight: 'normal' },
        });
        var h = n(99075),
          f = n.n(h),
          g = n(46213),
          j = n(35789),
          y = n(79839),
          v = n(51201),
          b = n(92517),
          N = n(95110),
          w = n(33303),
          k = n(99423),
          S = n(70403),
          _ = n(3457),
          C = n(83235),
          P = n(19487);
        let D = (e) => {
          var t, n, a, h;
          let {
              title: D,
              language: z,
              linesToHighlight: F = [],
              highlightBorder: L,
              styleConfig: E,
              className: A,
              wrapperClassName: I,
              value: T,
              theme: Z,
              children: R,
              hideCopy: O = !1,
              hideLineNumbers: B = !1,
              wrapLines: U = !0,
              renderer: q,
              focusable: W = !0,
              onCopyCallback: M = r(),
            } = e,
            { resolvedTheme: V } = (0, l.F)(),
            H = null == V ? void 0 : V.includes('dark'),
            Y = null != Z ? Z : m(H),
            [G, Q] = (0, c.useState)(!1),
            J = () => {
              (Q(!0),
                M(),
                setTimeout(() => {
                  Q(!1);
                }, 1e3));
            },
            K = c.Children.toArray(R),
            [X] = 1 === K.length ? K : [],
            $ =
              null !==
                (n = null != T ? T : 'string' == typeof X ? X : void 0) &&
              void 0 !== n
                ? n
                : R,
            ee =
              'string' ==
                typeof ($ =
                  null !==
                    (a =
                      null == $
                        ? void 0
                        : null === (t = $.trimEnd) || void 0 === t
                          ? void 0
                          : t.call($)) && void 0 !== a
                    ? a
                    : $) && $.length < 70
                ? 'short-inline-codeblock'
                : '',
            et = z || (A ? A.replace('language-', '') : 'js');
          ('jsx' === et && (et = 'js'),
            u.Z.registerLanguage('js', N.Z),
            u.Z.registerLanguage('ts', P.Z),
            u.Z.registerLanguage('py', _.Z),
            u.Z.registerLanguage('sql', C.Z),
            u.Z.registerLanguage('bash', g.Z),
            u.Z.registerLanguage('dart', y.Z),
            u.Z.registerLanguage('csharp', j.Z),
            u.Z.registerLanguage('json', w.Z),
            u.Z.registerLanguage('kotlin', k.Z),
            u.Z.registerLanguage('curl', f()),
            u.Z.registerLanguage('http', b.Z),
            u.Z.registerLanguage('php', S.Z),
            u.Z.registerLanguage('python', _.Z),
            u.Z.registerLanguage('go', v.Z),
            ('bash' === et || 'sh' === et) && (B = !0));
          let en = !B;
          return (0, s.jsxs)(s.Fragment, {
            children: [
              D &&
                (0, s.jsx)('div', {
                  className:
                    'text-sm rounded-t-md bg-surface-100 py-2 px-4 border border-b-0 border-default font-sans',
                  children: D,
                }),
              A
                ? (0, s.jsxs)('div', {
                    className: (0, x.cn)(
                      'group relative max-w-[90vw] md:max-w-none overflow-auto',
                      I
                    ),
                    children: [
                      (0, s.jsx)(u.Z, {
                        language: et,
                        wrapLines: U,
                        style: Y,
                        className: (0, x.cn)(
                          'code-block border border-surface p-4 w-full !my-0 !bg-surface-100 outline-none focus:border-foreground-lighter/50',
                          ''.concat(
                            D ? 'rounded-t-none rounded-b-md' : 'rounded-md'
                          ),
                          ''.concat(en ? '' : 'pl-6'),
                          A
                        ),
                        customStyle: { fontSize: 13, lineHeight: 1.4 },
                        showLineNumbers: en,
                        lineProps: (e) =>
                          F.includes(e)
                            ? {
                                style: {
                                  display: 'block',
                                  background: (
                                    null == E ? void 0 : E.highlightbackground
                                  )
                                    ? null == E
                                      ? void 0
                                      : E.highlightbackground
                                    : 'hsl(var(--background-selection))',
                                  borderLeft: L
                                    ? '1px solid '.concat(
                                        (
                                          null == E
                                            ? void 0
                                            : E.highlightBorderColor
                                        )
                                          ? null == E
                                            ? void 0
                                            : E.highlightBorderColor
                                          : 'hsl(var(--foreground-default)',
                                        ')'
                                      )
                                    : null,
                                },
                                class: 'hljs-line-highlight',
                              }
                            : {},
                        lineNumberContainerStyle: { paddingTop: '128px' },
                        lineNumberStyle: {
                          minWidth: '44px',
                          paddingLeft: '4px',
                          paddingRight: '4px',
                          marginRight: '12px',
                          color:
                            null !== (h = null == E ? void 0 : E.lineNumber) &&
                            void 0 !== h
                              ? h
                              : '#828282',
                          textAlign: 'center',
                          fontSize: 12,
                          paddingTop: '4px',
                          paddingBottom: '4px',
                        },
                        renderer: q,
                        contentEditable: W,
                        onBeforeInput: (e) => (e.preventDefault(), !1),
                        suppressContentEditableWarning: !0,
                        children: $,
                      }),
                      !O && (T || R) && A
                        ? (0, s.jsx)('div', {
                            className: [
                              'absolute right-2 top-2',
                              'opacity-0 group-opacity-100 transition',
                              ''.concat(H ? 'dark' : ''),
                            ].join(' '),
                            children: (0, s.jsx)(d.CopyToClipboard, {
                              text: T || R,
                              children: (0, s.jsx)(p.z, {
                                type: 'default',
                                className: 'px-1.5',
                                icon: G
                                  ? (0, s.jsx)(o.Z, {})
                                  : (0, s.jsx)(i.Z, {}),
                                onClick: () => J(),
                                children: G ? 'Copied' : '',
                              }),
                            }),
                          })
                        : null,
                    ],
                  })
                : (0, s.jsx)('code', { className: ee, children: T || R }),
            ],
          });
        };
      },
      11221: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return i;
          },
        });
        var s = n(97458),
          a = n(90346),
          r = n(52983),
          o = n(65092);
        let i = r.forwardRef((e, t) => {
          let {
            className: n,
            orientation: r = 'horizontal',
            decorative: i = !0,
            ...l
          } = e;
          return (0, s.jsx)(a.f, {
            ref: t,
            decorative: i,
            orientation: r,
            className: (0, o.cn)(
              'shrink-0 bg-border-muted',
              'horizontal' === r ? 'h-[1px] w-full' : 'h-full w-[1px]',
              n
            ),
            ...l,
          });
        });
        i.displayName = a.f.displayName;
      },
      54135: function (e, t, n) {
        'use strict';
        n.d(t, {
          O: function () {
            return r;
          },
        });
        var s = n(97458),
          a = n(65092);
        function r(e) {
          let { className: t, ...n } = e;
          return (0, s.jsx)('div', {
            className: (0, a.cn)('animate-pulse rounded-md bg-muted', t),
            ...n,
            'data-sentry-component': 'Skeleton',
            'data-sentry-source-file': 'skeleton.tsx',
          });
        }
      },
      92240: function (e, t, n) {
        'use strict';
        n.d(t, {
          SP: function () {
            return c;
          },
          dr: function () {
            return l;
          },
          mQ: function () {
            return i;
          },
          nU: function () {
            return d;
          },
        });
        var s = n(97458),
          a = n(77317),
          r = n(52983),
          o = n(65092);
        let i = a.fC,
          l = r.forwardRef((e, t) => {
            let { className: n, ...r } = e;
            return (0, s.jsx)(a.aV, {
              ref: t,
              className: (0, o.cn)('flex items-center border-b', n),
              ...r,
            });
          });
        l.displayName = a.aV.displayName;
        let c = r.forwardRef((e, t) => {
          let { className: n, ...r } = e;
          return (0, s.jsx)(a.xz, {
            ref: t,
            className: (0, o.cn)(
              'inline-flex items-center justify-center whitespace-nowrap py-1.5 text-sm  ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]: text-foreground-lighter texground data-[state=active]:border-foreground border-b-2 border-transparent',
              'group',
              n
            ),
            ...r,
          });
        });
        c.displayName = a.xz.displayName;
        let d = r.forwardRef((e, t) => {
          let { className: n, ...r } = e;
          return (0, s.jsx)(a.VY, {
            ref: t,
            className: (0, o.cn)(
              'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              n
            ),
            ...r,
          });
        });
        d.displayName = a.VY.displayName;
      },
    },
  ]));
