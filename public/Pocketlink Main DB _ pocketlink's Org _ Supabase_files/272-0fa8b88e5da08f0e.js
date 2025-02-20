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
      (e._sentryDebugIds[t] = 'daff5e3d-3786-44cd-a15a-90c5cf2681d8'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-daff5e3d-3786-44cd-a15a-90c5cf2681d8'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [272],
  {
    97158: function (e, t, a) {
      a.d(t, {
        B: function () {
          return l;
        },
        F2: function () {
          return d;
        },
        G2: function () {
          return h;
        },
        LZ: function () {
          return m;
        },
        Y4: function () {
          return i;
        },
        _J: function () {
          return u;
        },
        hk: function () {
          return c;
        },
        nK: function () {
          return o;
        },
        q_: function () {
          return p;
        },
      });
      var s = a(68258),
        r = a(37756),
        n = a(51477);
      let o = 660,
        i = 50,
        l = 20,
        c = {
          ...r.S,
          INIT_READ_REPLICA: 'INIT_READ_REPLICA',
          INIT_READ_REPLICA_FAILED: 'INIT_READ_REPLICA_FAILED',
        },
        d = {
          SOUTHEAST_ASIA: [103.8, 1.37],
          NORTHEAST_ASIA: [139.42, 35.41],
          NORTHEAST_ASIA_2: [126.98, 37.56],
          CENTRAL_CANADA: [-73.6, 45.5],
          WEST_US: [-121.96, 37.35],
          EAST_US: [-78.45, 38.13],
          WEST_EU: [-8, 53],
          WEST_EU_2: [-0.1, 51],
          CENTRAL_EU: [8, 50],
          SOUTH_ASIA: [72.88, 19.08],
          OCEANIA: [151.2, -33.86],
          SOUTH_AMERICA: [-46.38, -23.34],
          CENTRAL_EU_2: [8.54, 47.45],
          EAST_US_2: [-83, 39.96],
          NORTH_EU: [17.91, 59.65],
          WEST_EU_3: [2.35, 48.86],
        },
        u = { SOUTHEAST_ASIA: [103.8, 1.37] },
        p = Object.keys(n.Wp)
          .map((e) => ({
            key: e,
            name:
              null === n.Wp || void 0 === n.Wp ? void 0 : n.Wp[e].displayName,
            region: null === n.Wp || void 0 === n.Wp ? void 0 : n.Wp[e].code,
            coordinates: d[e],
          }))
          .filter((e) => void 0 !== e.coordinates),
        h = {
          [s.Vb.Requested]: 'Requesting replica instance',
          [s.Vb.Started]: 'Launching replica instance',
          [s.Vb.LaunchedReadReplicaInstance]: 'Initiating replica setup',
          [s.Vb.InitiatedReadReplicaSetup]: 'Downloading base backup',
          [s.Vb.DownloadedBaseBackup]: 'Replaying WAL archives',
          [s.Vb.ReplayedWalArchives]: 'Completing set up',
          [s.Vb.CompletedReadReplicaSetup]: 'Completed',
        },
        m = {
          [s.Bm.ReadReplicaInstanceLaunchFailed]: 'Failed to launch replica',
          [s.Bm.InitiateReadReplicaSetupFailed]: 'Failed to initiate replica',
          [s.Bm.DownloadBaseBackupFailed]: 'Failed to download backup',
          [s.Bm.ReplayWalArchivesFailed]: 'Failed to replay WAL archives',
          [s.Bm.CompleteReadReplicaSetupFailed]: 'Failed to set up replica',
        };
    },
    28034: function (e, t, a) {
      a.d(t, {
        v: function () {
          return R;
        },
      });
      var s = a(97458),
        r = a(52983),
        n = a(42026),
        o = a(90839),
        i = a(64305),
        l = a(98686),
        c = a(79617),
        d = a(68890),
        u = a(5643),
        p = a(83145),
        h = a.n(p),
        m = a(32691),
        f = a(34549),
        g = a(12436),
        x = a(30457),
        y = a(64618),
        b = a(6464);
      async function v(e) {
        let { message: t, pathname: a, projectRef: s, organizationSlug: r } = e,
          { data: n, error: o } = await (0, b.v_)('/platform/feedback/send', {
            body: {
              message: t,
              category: 'Feedback',
              tags: ['dashboard-feedback'],
              projectRef: s,
              organizationSlug: r,
              pathname: a,
            },
          });
        return (o && (0, b.S3)(o), n);
      }
      let j = function () {
        let { onError: e, ...t } =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return (0, y.D)((e) => v(e), {
          async onError(t, a, s) {
            void 0 === e
              ? f.Am.error('Failed to submit feedback: '.concat(t.message))
              : e(t, a, s);
          },
          ...t,
        });
      };
      var k = a(82288),
        w = a(75541),
        S = a(45536),
        I = a(51571),
        _ = a(14500),
        C = a(34112);
      let N = (e) => {
          let t = 'image/png',
            a = atob(e.substr('data:'.concat(t, ';base64,').length)),
            s = [];
          for (let e = 0; e < a.length; e += 1024) {
            let t = a.slice(e, e + 1024),
              r = Array(t.length);
            for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
            let n = new Uint8Array(r);
            s.push(n);
          }
          return new Blob(s, { type: t });
        },
        A = async (e, t) => {
          let a = (0, C.eI)(
              'https://obuldanrptloktxcffvn.supabase.co',
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9idWxkYW5ycHRsb2t0eGNmZnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MTQ2ODUsImV4cCI6MjAzNDE5MDY4NX0.NFt49g6DFkc1X5khCzN5p01iAVo2TMxlx88cY1V0E2M',
              {
                auth: {
                  persistSession: !1,
                  autoRefreshToken: !1,
                  multiTab: !1,
                  detectSessionInUrl: !1,
                  localStorage: {
                    getItem: (e) => void 0,
                    setItem: (e, t) => {},
                    removeItem: (e) => {},
                  },
                },
              }
            ),
            s = N(t),
            r = ''.concat(e || 'no-project', '/').concat((0, S.k$)(), '.png'),
            { data: n, error: o } = await a.storage
              .from('feedback-attachments')
              .upload(r, s, { cacheControl: '3600' });
          if (o) {
            console.error('Failed to upload:', o);
            return;
          }
          if (n) {
            let { data: e } = await a.storage
              .from('feedback-attachments')
              .createSignedUrls([n.path], 31536e4);
            return null == e ? void 0 : e[0].signedUrl;
          }
        };
      var E = (e) => {
          let {
              feedback: t,
              screenshot: a,
              onClose: n,
              setFeedback: p,
              setScreenshot: y,
            } = e,
            b = 'feedback_content',
            v = 'screenshot',
            C = (0, m.useRouter)(),
            { ref: E, slug: R } = (0, g.UO)(),
            F = (0, w.l)(),
            L = (0, r.useRef)(null),
            [T, P] = (0, r.useState)(!1),
            [D, U] = (0, r.useState)(!1),
            { mutate: z } = (0, k.a)(),
            { mutate: B } = j({
              onSuccess: () => {
                (p(''),
                  y(void 0),
                  localStorage.removeItem(b),
                  localStorage.removeItem(v),
                  f.Am.success(
                    'Feedback sent. Thank you!\n\nPlease be aware that we do not provide responses to feedback. If you require assistance or a reply, consider submitting a support ticket.',
                    { duration: 8e3 }
                  ),
                  P(!1));
              },
              onError: (e) => {
                (f.Am.error('Failed to submit feedback: '.concat(e.message)),
                  P(!1));
              },
            });
          ((0, r.useEffect)(() => {
            let e = localStorage.getItem(b);
            e && p(e);
            let t = localStorage.getItem(v);
            t && y(t);
          }, []),
            (0, r.useEffect)(() => {
              localStorage.setItem(b, t);
            }, [t]),
            (0, r.useEffect)(() => {
              a && localStorage.setItem(v, a);
            }, [a]));
          let H = () => {
              (p(''),
                y(void 0),
                localStorage.removeItem(b),
                localStorage.removeItem(v));
            },
            W = async () => {
              (U(!0),
                await (0, S.Vs)(100),
                (0, i.YM)(document.body, {
                  filter: function (e) {
                    var t;
                    return (
                      !(
                        (null !== (t = null == e ? void 0 : e.children) &&
                        void 0 !== t
                          ? t
                          : []
                        ).length > 0
                      ) || 'feedback-widget' !== e.children[0].id
                    );
                  },
                })
                  .then((e) => {
                    (localStorage.setItem(v, e), y(e));
                  })
                  .catch(() => f.Am.error('Failed to capture screenshot'))
                  .finally(() => {
                    U(!1);
                  }));
            },
            Z = async (e) => {
              e.persist();
              let [t] = e.target.files || e.dataTransfer.items,
                a = new FileReader();
              ((a.onload = function (e) {
                var t;
                let a =
                  null === (t = e.target) || void 0 === t ? void 0 : t.result;
                'string' == typeof a && (y(a), localStorage.setItem(v, a));
              }),
                a.readAsDataURL(t),
                (e.target.value = ''));
            },
            M = async () => {
              let [e] = await navigator.clipboard.read();
              if (void 0 === a && 'image/png' === e.types[0]) {
                let t = await e.getType('image/png'),
                  a = new FileReader();
                ((a.onload = function (e) {
                  var t;
                  let a =
                    null === (t = e.target) || void 0 === t ? void 0 : t.result;
                  'string' == typeof a && (y(a), localStorage.setItem(v, a));
                }),
                  a.readAsDataURL(t));
              }
            },
            O = async () => {
              if (0 === t.length && void 0 !== a)
                return f.Am.error('Please include a message in your feedback.');
              if (t.length > 0) {
                P(!0);
                let e = a ? await A(E, a) : void 0;
                B({
                  projectRef: E,
                  organizationSlug: R,
                  message:
                    void 0 !== e
                      ? ''.concat(t, '\n\nAttachments:\n').concat(e)
                      : t,
                  pathname: C.asPath,
                });
              }
              return n();
            };
          return (0, s.jsxs)('div', {
            id: 'feedback-widget',
            className: 'text-area-text-sm',
            'data-sentry-component': 'FeedbackWidget',
            'data-sentry-source-file': 'FeedbackWidget.tsx',
            children: [
              (0, s.jsx)(I.Z.TextArea, {
                className: 'w-80 p-3',
                size: 'small',
                placeholder:
                  'Ideas on how to improve this page. Use the Support Form for technical issues.',
                rows: 5,
                value: t,
                onChange: (e) => p(e.target.value),
                onPaste: M,
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'FeedbackWidget.tsx',
              }),
              (0, s.jsx)('div', { className: 'w-full h-px bg-border' }),
              (0, s.jsxs)('div', {
                className: 'w-80 space-y-3 px-3 py-2 pb-4',
                children: [
                  (0, s.jsxs)('div', {
                    className: 'flex justify-between space-x-2',
                    children: [
                      (0, s.jsx)(o.z, {
                        type: 'default',
                        onClick: () => {
                          (H(), n());
                        },
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'FeedbackWidget.tsx',
                        children: 'Cancel',
                      }),
                      (0, s.jsxs)('div', {
                        className: 'flex items-center space-x-2',
                        children: [
                          (0, s.jsx)(o.z, {
                            type: 'default',
                            onClick: H,
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'FeedbackWidget.tsx',
                            children: 'Clear',
                          }),
                          void 0 !== a
                            ? (0, s.jsx)('div', {
                                style: {
                                  backgroundImage: 'url("'.concat(a, '")'),
                                },
                                onClick: () => {
                                  let e = N(a),
                                    t = URL.createObjectURL(e);
                                  window.open(t, '_blank');
                                },
                                className:
                                  'cursor-pointer rounded h-[26px] w-[30px] border border-control relative bg-cover bg-center bg-no-repeat',
                                children: (0, s.jsx)('button', {
                                  className:
                                    'cursor-pointer rounded-full bg-red-900 h-3 w-3 flex items-center justify-center absolute -top-1 -right-1',
                                  onClick: (e) => {
                                    (e.stopPropagation(), y(void 0));
                                  },
                                  children: (0, s.jsx)(l.Z, {
                                    size: 8,
                                    strokeWidth: 3,
                                  }),
                                }),
                              })
                            : (0, s.jsxs)(_.h_, {
                                children: [
                                  (0, s.jsx)(_.$F, {
                                    asChild: !0,
                                    children: (0, s.jsx)(o.z, {
                                      type: 'default',
                                      disabled: D,
                                      loading: D,
                                      className: 'px-2 py-1.5',
                                      children: (0, s.jsx)(c.Z, { size: 14 }),
                                    }),
                                  }),
                                  (0, s.jsxs)(_.AW, {
                                    side: 'bottom',
                                    align: 'end',
                                    children: [
                                      (0, s.jsxs)(
                                        _.Xi,
                                        {
                                          className: 'flex gap-2',
                                          onSelect: () => {
                                            L.current && L.current.click();
                                          },
                                          children: [
                                            (0, s.jsx)(d.Z, { size: 14 }),
                                            'Upload screenshot',
                                          ],
                                        },
                                        'upload-screenshot'
                                      ),
                                      (0, s.jsxs)(
                                        _.Xi,
                                        {
                                          className: 'flex gap-2',
                                          onSelect: () => W(),
                                          children: [
                                            (0, s.jsx)(u.Z, { size: 14 }),
                                            'Capture screenshot',
                                          ],
                                        },
                                        'capture-screenshot'
                                      ),
                                    ],
                                  }),
                                ],
                              }),
                          (0, s.jsx)('input', {
                            type: 'file',
                            ref: L,
                            className: 'hidden',
                            accept: 'image/png',
                            onChange: Z,
                          }),
                          (0, s.jsx)(o.z, {
                            disabled: 0 === t.length || T,
                            loading: T,
                            onClick: () => {
                              (O(),
                                z({
                                  action: x.b.SEND_FEEDBACK_BUTTON_CLICKED,
                                  groups: {
                                    project: E,
                                    organization: null == F ? void 0 : F.slug,
                                  },
                                }));
                            },
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'FeedbackWidget.tsx',
                            children: 'Send feedback',
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsxs)('p', {
                    className: 'text-xs text-foreground-light',
                    children: [
                      'Have a technical issue? Contact',
                      ' ',
                      (0, s.jsx)(h(), {
                        href: '/support/new',
                        'data-sentry-element': 'Link',
                        'data-sentry-source-file': 'FeedbackWidget.tsx',
                        children: (0, s.jsx)('span', {
                          className:
                            'cursor-pointer text-brand transition-colors text-brand-600',
                          children: 'Supabase support',
                        }),
                      }),
                      ' ',
                      'or',
                      ' ',
                      (0, s.jsx)('a', {
                        href: 'https://supabase.com/docs',
                        target: '_blank',
                        rel: 'noreferrer',
                        children: (0, s.jsx)('span', {
                          className:
                            'cursor-pointer text-brand transition-colors text-brand-600',
                          children: 'browse our docs',
                        }),
                      }),
                      '.',
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        R = () => {
          let [e, t] = (0, r.useState)(!1),
            [a, i] = (0, r.useState)(''),
            [l, c] = (0, r.useState)();
          return (0, s.jsxs)(n.J2, {
            modal: !1,
            open: e,
            onOpenChange: (e) => {
              (t(e), e || c(void 0));
            },
            'data-sentry-element': 'Popover_Shadcn_',
            'data-sentry-component': 'FeedbackDropdown',
            'data-sentry-source-file': 'FeedbackDropdown.tsx',
            children: [
              (0, s.jsx)(n.xo, {
                asChild: !0,
                'data-sentry-element': 'PopoverTrigger_Shadcn_',
                'data-sentry-source-file': 'FeedbackDropdown.tsx',
                children: (0, s.jsx)(o.z, {
                  asChild: !0,
                  onClick: () => t((e) => !e),
                  type: 'outline',
                  'data-sentry-element': 'Button',
                  'data-sentry-source-file': 'FeedbackDropdown.tsx',
                  children: (0, s.jsx)('span', {
                    className: 'hidden md:flex',
                    children: 'Feedback',
                  }),
                }),
              }),
              (0, s.jsx)(n.yk, {
                side: 'bottom',
                align: 'end',
                className: 'w-full p-0',
                'data-sentry-element': 'PopoverContent_Shadcn_',
                'data-sentry-source-file': 'FeedbackDropdown.tsx',
                children: (0, s.jsx)(E, {
                  onClose: () => t(!1),
                  feedback: a,
                  setFeedback: i,
                  screenshot: l,
                  setScreenshot: c,
                  'data-sentry-element': 'FeedbackWidget',
                  'data-sentry-source-file': 'FeedbackDropdown.tsx',
                }),
              }),
            ],
          });
        };
    },
    59141: function (e, t, a) {
      a.d(t, {
        U: function () {
          return s;
        },
      });
      let s = {
        pgBouncerStatus: (e) => ['projects', e, 'pgbouncer'],
        settings: (e) => ['projects', e, 'settings'],
        settingsV2: (e) => ['projects', e, 'settings-v2'],
        api: (e) => ['projects', e, 'settings', 'api'],
        postgrest: (e) => ['projects', e, 'postgrest'],
        jwtSecretUpdatingStatus: (e) => [
          'projects',
          e,
          'jwt-secret-updating-status',
        ],
        storage: (e) => ['projects', e, 'storage'],
        upgradeEligibility: (e) => ['projects', e, 'upgrade-eligibility'],
        upgradeStatus: (e) => ['projects', e, 'upgrade-status'],
        diskAttributes: (e) => ['projects', e, 'disk-attributes'],
        diskBreakdown: (e) => ['projects', e, 'disk-breakdown'],
        diskUtilization: (e) => ['projects', e, 'disk-utilization'],
        projectCreationPostgresVersions: (e, t, a) => [
          'projects',
          e,
          t,
          a,
          'available-creation-versions',
        ],
        projectUnpausePostgresVersions: (e) => [
          'projects',
          e,
          'available-unpause-versions',
        ],
        diskAutoscaleConfig: (e) => ['projects', e, 'disk-autoscale-config'],
      };
    },
    41846: function (e, t, a) {
      var s = a(97458),
        r = a(96056),
        n = a(87132),
        o = a(11757),
        i = a(28899),
        l = a(49475),
        c = a(52580),
        d = a(47623),
        u = a.n(d),
        p = a(83145),
        h = a.n(p),
        m = a(32691),
        f = a(50588),
        g = a(30457),
        x = a(359),
        y = a(82288),
        b = a(75541),
        v = a(42026),
        j = a(90839),
        k = a(4526),
        w = a(88971);
      t.Z = () => {
        var e;
        let t = (0, m.useRouter)(),
          { project: a } = (0, w.d2)(),
          d = (0, b.l)(),
          { mutate: p } = (0, y.a)(),
          S =
            null !== (e = null == a ? void 0 : a.parent_project_ref) &&
            void 0 !== e
              ? e
              : t.query.ref;
        return (0, s.jsxs)(v.J2, {
          'data-sentry-element': 'Popover_Shadcn_',
          'data-sentry-component': 'HelpPopover',
          'data-sentry-source-file': 'HelpPopover.tsx',
          children: [
            (0, s.jsx)(v.xo, {
              asChild: !0,
              'data-sentry-element': 'PopoverTrigger_Shadcn_',
              'data-sentry-source-file': 'HelpPopover.tsx',
              children: (0, s.jsx)(x.u, {
                id: 'help-popover-button',
                type: 'text',
                className: 'px-1',
                icon: (0, s.jsx)(r.Z, {
                  size: 16,
                  strokeWidth: 1.5,
                  className: 'text-foreground-light',
                }),
                tooltip: { content: { side: 'bottom', text: 'Help' } },
                onClick: () => {
                  p({
                    action: g.b.HELP_BUTTON_CLICKED,
                    groups: {
                      project: null == a ? void 0 : a.ref,
                      organization: null == d ? void 0 : d.slug,
                    },
                  });
                },
                'data-sentry-element': 'ButtonTooltip',
                'data-sentry-source-file': 'HelpPopover.tsx',
              }),
            }),
            (0, s.jsxs)(v.yk, {
              className: 'w-[400px] space-y-4 p-0 py-5',
              align: 'end',
              side: 'bottom',
              'data-sentry-element': 'PopoverContent_Shadcn_',
              'data-sentry-source-file': 'HelpPopover.tsx',
              children: [
                (0, s.jsxs)('div', {
                  className: 'mb-5 space-y-4 px-5',
                  children: [
                    (0, s.jsx)('h5', {
                      className: 'text-foreground',
                      children: 'Need help with your project?',
                    }),
                    (0, s.jsx)('p', {
                      className: 'text-sm text-foreground-lighter',
                      children:
                        'For issues with your project hosted on supabase.com, or other inquiries about our hosted services.',
                    }),
                    (0, s.jsxs)('div', {
                      className: 'space-x-1',
                      children: [
                        (0, s.jsx)(j.z, {
                          asChild: !0,
                          type: 'default',
                          icon: (0, s.jsx)(n.Z, {}),
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'HelpPopover.tsx',
                          children: (0, s.jsx)(h(), {
                            href: 'https://supabase.com/docs/guides/platform/troubleshooting',
                            target: '_blank',
                            rel: 'noreferrer',
                            'data-sentry-element': 'Link',
                            'data-sentry-source-file': 'HelpPopover.tsx',
                            children: 'Troubleshooting',
                          }),
                        }),
                        (0, s.jsx)(j.z, {
                          asChild: !0,
                          type: 'text',
                          size: 'tiny',
                          icon: (0, s.jsx)(o.Z, {}),
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'HelpPopover.tsx',
                          children: (0, s.jsx)(h(), {
                            href: 'https://supabase.com/docs/',
                            target: '_blank',
                            rel: 'noreferrer',
                            'data-sentry-element': 'Link',
                            'data-sentry-source-file': 'HelpPopover.tsx',
                            children: 'Docs',
                          }),
                        }),
                        (0, s.jsx)(j.z, {
                          asChild: !0,
                          type: 'text',
                          size: 'tiny',
                          icon: (0, s.jsx)(i.Z, {}),
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'HelpPopover.tsx',
                          children: (0, s.jsx)(h(), {
                            href: 'https://status.supabase.com/',
                            target: '_blank',
                            rel: 'noreferrer',
                            'data-sentry-element': 'Link',
                            'data-sentry-source-file': 'HelpPopover.tsx',
                            children: 'Supabase Status',
                          }),
                        }),
                      ],
                    }),
                    (0, s.jsx)('p', {
                      className: 'text-sm text-foreground-lighter',
                      children:
                        'Expected response time is based on your billing plan. Projects on paid plans are prioritized.',
                    }),
                    (0, s.jsx)('div', {
                      children: (0, s.jsx)(j.z, {
                        asChild: !0,
                        type: 'default',
                        icon: (0, s.jsx)(l.Z, {}),
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'HelpPopover.tsx',
                        children: (0, s.jsx)(h(), {
                          href: '/support/new'.concat(
                            S ? '?ref='.concat(S) : ''
                          ),
                          'data-sentry-element': 'Link',
                          'data-sentry-source-file': 'HelpPopover.tsx',
                          children: 'Contact Support',
                        }),
                      }),
                    }),
                  ],
                }),
                (0, s.jsx)(k.Z.Separator, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'HelpPopover.tsx',
                }),
                (0, s.jsxs)('div', {
                  className: 'mb-4 space-y-2',
                  children: [
                    (0, s.jsxs)('div', {
                      className: 'mb-4 px-5',
                      children: [
                        (0, s.jsx)('h5', {
                          className: 'mb-2',
                          children: 'Reach out to the community',
                        }),
                        (0, s.jsx)('p', {
                          className: 'text-sm text-foreground-lighter',
                          children:
                            'For other support, including questions on our client libraries, advice, or best practices.',
                        }),
                      ],
                    }),
                    (0, s.jsx)('div', {
                      className: 'px-5',
                      children: (0, s.jsx)('div', {
                        className:
                          'relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 ',
                        style: { background: '#404EED' },
                        children: (0, s.jsxs)('a', {
                          href: 'https://discord.supabase.com',
                          target: '_blank',
                          rel: 'noreferrer',
                          className: 'dark block cursor-pointer',
                          children: [
                            (0, s.jsx)(u(), {
                              className: 'absolute left-0 top-0 opacity-50',
                              src: ''.concat(
                                t.basePath,
                                '/img/support/discord-bg-small.jpg'
                              ),
                              layout: 'fill',
                              objectFit: 'cover',
                              alt: 'discord illustration header',
                              'data-sentry-element': 'Image',
                              'data-sentry-source-file': 'HelpPopover.tsx',
                            }),
                            (0, s.jsx)(j.z, {
                              type: 'secondary',
                              icon: (0, s.jsx)(f.Z, {
                                src: ''.concat(
                                  t.basePath,
                                  '/img/discord-icon.svg'
                                ),
                                className: 'h-4 w-4',
                              }),
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'HelpPopover.tsx',
                              children: (0, s.jsx)('span', {
                                style: { color: '#404EED' },
                                children: 'Join Discord server',
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                    (0, s.jsx)('div', {
                      className: 'px-5',
                      children: (0, s.jsx)('div', {
                        className:
                          'relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 ',
                        children: (0, s.jsxs)('a', {
                          href: 'https://github.com/supabase/supabase/discussions',
                          target: '_blank',
                          rel: 'noreferrer',
                          className: 'block cursor-pointer',
                          children: [
                            (0, s.jsx)(u(), {
                              className: 'absolute left-0 top-0 opacity-50',
                              src: ''.concat(
                                t.basePath,
                                '/img/support/github-bg.jpg?v-1'
                              ),
                              layout: 'fill',
                              objectFit: 'cover',
                              alt: 'discord illustration header',
                              'data-sentry-element': 'Image',
                              'data-sentry-source-file': 'HelpPopover.tsx',
                            }),
                            (0, s.jsx)(j.z, {
                              type: 'secondary',
                              icon: (0, s.jsx)(c.Z, {}),
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'HelpPopover.tsx',
                              children: 'GitHub Discussions',
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
        });
      };
    },
    6146: function (e, t, a) {
      var s = a(97458),
        r = a(65092),
        n = a(40577);
      t.Z = function (e) {
        let {
          organization: t,
          showTooltip: a = !0,
          tooltipText:
            o = 'This organization is managed by Vercel Marketplace.',
          size: i = 'small',
        } = e;
        if ('vercel-marketplace' === t.managed_by) {
          let e = (0, s.jsx)('svg', {
            className: (0, r.cn)(
              'small' === i && 'w-2.5 h-2.5',
              'medium' === i && 'w-3.5 h-3.5',
              'large' === i && 'w-5 h-5'
            ),
            viewBox: '0 0 76 65',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, s.jsx)('path', {
              d: 'M37.5274 0L75.0548 65H0L37.5274 0Z',
              fill: 'hsl(var(--foreground-default) / 1)',
            }),
          });
          return a
            ? (0, s.jsxs)(n.u, {
                children: [
                  (0, s.jsx)(n.aJ, {
                    asChild: !0,
                    children: (0, s.jsx)('div', {
                      className: (0, r.cn)(
                        'bg-surface-100 dark:bg-surface-200 border rounded flex items-center justify-center bg-surface-400 dark:bg-surface-400 border-stronger flex-shrink-0',
                        'small' === i && 'h-5 w-5',
                        'medium' === i && 'w-7 h-7',
                        'large' === i && 'w-10 h-10'
                      ),
                      children: e,
                    }),
                  }),
                  (0, s.jsx)(n._v, { children: o }),
                ],
              })
            : (0, s.jsx)('div', {
                className: (0, r.cn)(
                  'bg-surface-100 dark:bg-surface-200 border rounded flex items-center justify-center flex-shrink-0',
                  'small' === i && 'h-5 w-5',
                  'medium' === i && 'w-7 h-7',
                  'large' === i && 'w-10 h-10'
                ),
                children: e,
              });
        }
        return null;
      };
    },
    77060: function (e, t, a) {
      a.d(t, {
        c: function () {
          return c;
        },
      });
      var s = a(97458),
        r = a(29901),
        n = a(46417),
        o = a(16402),
        i = a(52983),
        l = a(65092);
      let c = (0, i.memo)((e) => {
        let {
            size: t = 24,
            loading: a = !1,
            className: c,
            allowHoverEffect: d = !1,
          } = e,
          u = Math.max(1, t / 46),
          p = (0, i.useRef)(null),
          [h, m] = (0, i.useState)(!1),
          f = (0, r.c)(0),
          g = (0, r.c)(0),
          x = (0, n.q)(f, { stiffness: 300, damping: 30 }),
          y = (0, n.q)(g, { stiffness: 300, damping: 30 });
        return (0, s.jsxs)('div', {
          className: (0, l.cn)(
            'text-brand-600 flex justify-center items-center relative',
            c
          ),
          style: { width: t, height: t, position: 'relative' },
          'data-sentry-component': 'AiIconAnimationComponent',
          'data-sentry-source-file': 'ai-icon-animation.tsx',
          children: [
            (0, s.jsx)('div', {
              ref: p,
              className: 'absolute flex items-center justify-center',
              style: { width: 2 * t, height: 2 * t, left: -t / 2, top: -t / 2 },
              onMouseMove: (e) => {
                if (!d || !p.current) return;
                let t = p.current.getBoundingClientRect(),
                  a = t.left + t.width / 2,
                  s = t.top + t.height / 2,
                  r = e.clientX - a,
                  n = e.clientY - s;
                (f.set(r / 5), g.set(n / 5));
              },
              onMouseEnter: () => m(!0),
              onMouseLeave: () => {
                (m(!1), f.set(0), g.set(0));
              },
            }),
            (0, s.jsxs)(o.E.svg, {
              width: t,
              height: t,
              viewBox: '0 0 46 46',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
              'data-sentry-element': 'unknown',
              'data-sentry-source-file': 'ai-icon-animation.tsx',
              children: [
                (0, s.jsx)(o.E.path, {
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                  d: 'M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: u,
                  animate: a ? 'loading' : h ? 'hover' : 'rest',
                  variants: {
                    rest: { rotate: 0 },
                    loading: { rotate: 360 },
                     { rotate: 10 },
                  },
                  transition: {
                    duration: 2,
                    repeat: a ? 1 / 0 : 0,
                    ease: 'circInOut',
                    type: 'spring',
                    stiffness: 60,
                    damping: 10,
                  },
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'ai-icon-animation.tsx',
                }),
                (0, s.jsx)(o.E.path, {
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                  d: 'M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: u,
                  variants: {
                    rest: { scale: 1, x: 0, y: 0 },
                    loading: { scale: [1, 1.1, 1], x: 0, y: 0 },
                     { scale: 1.1 },
                  },
                  animate: h ? 'hover' : a ? 'loading' : 'rest',
                  style: { x: x, y: y },
                  transition: {
                    duration: 2,
                    repeat: a ? 1 / 0 : 0,
                    ease: 'easeInOut',
                  },
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'ai-icon-animation.tsx',
                }),
              ],
            }),
          ],
        });
      });
    },
  },
]);
