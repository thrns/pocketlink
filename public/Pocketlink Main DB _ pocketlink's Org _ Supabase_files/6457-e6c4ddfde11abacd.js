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
      (e._sentryDebugIds[t] = '552cd840-925f-43c5-9882-4801bccebc8f'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-552cd840-925f-43c5-9882-4801bccebc8f'));
  } catch (e) {}
})();
('use strict');
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6457],
  {
    14460: function (e, t, s) {
      s.d(t, {
        w: function () {
          return a;
        },
      });
      var r = s(62213);
      function a() {
        return (0, r.v1)('log');
      }
    },
    93540: function (e, t, s) {
      s.d(t, {
        Z: function () {
          return ei;
        },
      });
      var r = s(97458),
        a = s(198),
        n = s(85466),
        l = s.n(n),
        o = s(98601),
        i = s(29790),
        c = s(57304),
        d = s(97224),
        u = s(50963),
        x = s(16362),
        m = s(49571),
        f = s.n(m),
        p = s(52983),
        y = s(70717),
        h = s(44914),
        g = s(63730),
        j = s(34549),
        v = s(12436),
        b = s(359),
        w = s(60277),
        N = s(14460),
        S = s(90817),
        k = s(45536),
        C = s(81514),
        T = s(65092),
        L = s(14500),
        R = s(90839),
        D = s(89429),
        E = s(58397),
        _ = s(54354);
      let z = (e) =>
        (0, r.jsxs)(E.VK, {
          'data-sentry-element': 'RowLayout',
          'data-sentry-component': 'defaultRenderCell',
          'data-sentry-source-file': 'DefaultPreviewColumnRenderer.tsx',
          children: [
            (0, r.jsx)(_.c, {
              utcTimestamp: e.row.timestamp,
              'data-sentry-element': 'TimestampInfo',
              'data-sentry-source-file': 'DefaultPreviewColumnRenderer.tsx',
            }),
            (0, r.jsx)(E.VG, {
              className: 'w-full',
              value: e.row.event_message,
              'data-sentry-element': 'TextFormatter',
              'data-sentry-source-file': 'DefaultPreviewColumnRenderer.tsx',
            }),
          ],
        });
      var Z = [
        {
          name: 'default-preview-first-column',
          key: 'default-preview-first-column',
          renderCell: z,
        },
      ];
      let P = [
          {
            name: 'auth-first-column',
            key: 'auth-first-column',
            renderCell: (e) => {
              var t;
              return e.row.level
                ? (0, r.jsxs)(E.VK, {
                    children: [
                      (0, r.jsx)(_.c, { utcTimestamp: e.row.timestamp }),
                      e.row.level && (0, r.jsx)(E.TK, { value: e.row.level }),
                      (0, r.jsx)(E.VG, {
                        className: 'w-full',
                        value: ''
                          .concat(e.row.path ? e.row.path + ' | ' : '')
                          .concat(
                            (null === (t = e.row.msg) || void 0 === t
                              ? void 0
                              : t.trim()) || e.row.event_message
                          ),
                      }),
                    ],
                  })
                : z(e);
            },
          },
        ],
        V = [
          {
            name: 'database-api-first-column',
            key: 'database-api-first-column',
            renderCell: (e) =>
              e.row.status_code || e.row.method || e.row.path
                ? (0, r.jsxs)(E.VK, {
                    children: [
                      (0, r.jsx)(_.c, { utcTimestamp: e.row.timestamp }),
                      (0, r.jsx)(E.XA, { row: e, value: e.row.status_code }),
                      (0, r.jsx)(E.VG, {
                        className: 'w-20',
                        value: e.row.method,
                      }),
                      (0, r.jsx)(E.VG, {
                        className: 'w-full',
                        value: e.row.path,
                      }),
                    ],
                  })
                : z(e),
          },
        ],
        A = [
          {
            name: 'database-postgres-first-column',
            key: 'database-postgres-first-column',
            renderCell: (e) =>
              e.row.error_severity
                ? (0, r.jsxs)(E.VK, {
                    children: [
                      (0, r.jsx)(_.c, { utcTimestamp: e.row.timestamp }),
                      (0, r.jsx)(E.TK, { value: e.row.error_severity }),
                      (0, r.jsx)(E.VG, {
                        className: 'w-full',
                        value: e.row.event_message,
                      }),
                    ],
                  })
                : z(e),
          },
        ],
        O = [
          {
            name: 'functions-edge-first-column',
            key: 'functions-edge-first-column',
            renderCell: (e) =>
              e.row.status_code || e.row.method
                ? (0, r.jsxs)(E.VK, {
                    children: [
                      (0, r.jsx)(_.c, { utcTimestamp: e.row.timestamp }),
                      (0, r.jsx)(E.XA, { row: e, value: e.row.status_code }),
                      (0, r.jsx)(E.VG, { value: e.row.method }),
                      (0, r.jsx)(E.VG, { value: e.row.id }),
                    ],
                  })
                : z(e),
          },
        ],
        M = [
          {
            name: 'functions-logs-first-column',
            key: 'functions-logs-first-column',
            renderCell: (e) =>
              e.row.event_type || e.row.level
                ? (0, r.jsxs)(E.VK, {
                    children: [
                      (0, r.jsx)(_.c, { utcTimestamp: e.row.timestamp }),
                      'uncaughtException' === e.row.event_type
                        ? (0, r.jsx)(E.TK, {
                            value: e.row.event_type,
                            uppercase: !1,
                          })
                        : (0, r.jsx)(E.TK, { value: e.row.level }),
                      (0, r.jsx)(E.VG, {
                        className: 'w-full',
                        value: e.row.event_message,
                      }),
                    ],
                  })
                : z(e),
          },
        ];
      var I = s(98686),
        F = s(857),
        B = s(92240),
        J = s(49935),
        W = s(11221),
        G = s(70114);
      let K = () =>
          (0, r.jsx)(W.Z, {
            className: 'bg-border my-1',
            'data-sentry-element': 'Separator',
            'data-sentry-component': 'LogRowSeparator',
            'data-sentry-source-file': 'DefaultPreviewSelectionRenderer.tsx',
          }),
        H = (e) => {
          let { keyName: t, value: s, dataTestId: a } = e,
            n = 'timestamp' === t || 'created_at' === t || 'updated_at' === t,
            l = 'object' == typeof s && null !== s,
            o = 'log-viewer-expanded-'.concat(t),
            [i, c] = (0, p.useState)(() => {
              try {
                var e;
                return JSON.parse(
                  null !== (e = localStorage.getItem(o)) && void 0 !== e
                    ? e
                    : 'false'
                );
              } catch (e) {
                return !1;
              }
            }),
            [d, u] = (0, p.useState)(!1);
          return ((0, p.useEffect)(() => {
            localStorage.setItem(o, JSON.stringify(i));
          }, [i, o]),
          l)
            ? (0, r.jsxs)(r.Fragment, {
                children: [
                  (0, r.jsxs)('div', {
                    className: 'flex flex-col gap-1',
                    children: [
                      (0, r.jsx)('h3', {
                        className: 'text-foreground-lighter text-sm pl-3 py-2',
                        children: t,
                      }),
                      (0, r.jsxs)('div', {
                        children: [
                          (0, r.jsx)(J.d, {
                            hideLineNumbers: !0,
                            className: (0, T.cn)(
                              '!bg-surface-300 w-full pt-1 max-w-full border-none text-xs prose-sm transition-all',
                              { 'max-h-[80px]': !i, 'max-h-[400px]': i }
                            ),
                            value: JSON.stringify(s, null, 2),
                            language: 'json',
                          }),
                          (0, r.jsx)(R.z, {
                            className: 'mt-1 w-full',
                            size: 'tiny',
                            type: 'outline',
                            onClick: () => c(!i),
                            children: i ? 'Collapse' : 'Expand',
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsx)(K, {}),
                ],
              })
            : (0, r.jsxs)(L.h_, {
                'data-sentry-element': 'DropdownMenu',
                'data-sentry-component': 'PropertyRow',
                'data-sentry-source-file':
                  'DefaultPreviewSelectionRenderer.tsx',
                children: [
                  (0, r.jsx)(L.$F, {
                    className: 'group w-full',
                    'data-testid': a,
                    'data-sentry-element': 'DropdownMenuTrigger',
                    'data-sentry-source-file':
                      'DefaultPreviewSelectionRenderer.tsx',
                    children: (0, r.jsx)('div', {
                      className: 'rounded-md w-full overflow-hidden',
                      children: (0, r.jsxs)('div', {
                        className: (0, T.cn)('flex py-2 w-full', {
                          'flex-col gap-1.5': i,
                          'items-center group-bg-surface-300 gap-4': !i,
                        }),
                        children: [
                          (0, r.jsx)('h3', {
                            className: (0, T.cn)(
                              'pl-3 text-foreground-lighter text-sm text-left'
                            ),
                            children: t,
                          }),
                          (0, r.jsx)('div', {
                            className: (0, T.cn)(
                              'text-sm flex-1 font-mono text-foreground pr-3',
                              {
                                'max-w-full text-left rounded-md p-2 bg-surface-300 text-xs w-full':
                                  i,
                                'truncate text-right': !i,
                                'text-brand-600': d,
                              }
                            ),
                            children: i
                              ? (0, r.jsx)(J.d, {
                                  value: JSON.stringify(s, null, 2),
                                })
                              : n
                                ? (0, r.jsx)(_.c, {
                                    className: 'text-sm',
                                    utcTimestamp: s,
                                  })
                                : (0, r.jsx)('div', {
                                    className: 'text-sm truncate',
                                    children: JSON.stringify(s),
                                  }),
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, r.jsxs)(L.AW, {
                    align: 'start',
                    'data-sentry-element': 'DropdownMenuContent',
                    'data-sentry-source-file':
                      'DefaultPreviewSelectionRenderer.tsx',
                    children: [
                      (0, r.jsxs)(L.Xi, {
                        onClick: () => {
                          ((0, G.v)(String(s), () => {
                            (u(!0), j.Am.success('Copied to clipboard'));
                          }),
                            setTimeout(() => {
                              u(!1);
                            }, 1e3));
                        },
                        'data-sentry-element': 'DropdownMenuItem',
                        'data-sentry-source-file':
                          'DefaultPreviewSelectionRenderer.tsx',
                        children: ['Copy ', t],
                      }),
                      !l &&
                        (0, r.jsxs)(L.Xi, {
                          onClick: () => {
                            c(!i);
                          },
                          children: [i ? 'Collapse' : 'Expand', ' value'],
                        }),
                    ],
                  }),
                  (0, r.jsx)(K, {
                    'data-sentry-element': 'LogRowSeparator',
                    'data-sentry-source-file':
                      'DefaultPreviewSelectionRenderer.tsx',
                  }),
                ],
              });
        };
      var X = (e) => {
          let { log: t } = e,
            { timestamp: s, event_message: a, metadata: n, id: l, ...o } = t;
          return (0, r.jsxs)('div', {
            'data-testid': 'log-selection',
            className: 'p-2 flex flex-col',
            'data-sentry-component': 'DefaultPreviewSelectionRenderer',
            'data-sentry-source-file': 'DefaultPreviewSelectionRenderer.tsx',
            children: [
              (null == t ? void 0 : t.id) &&
                (0, r.jsx)(H, { keyName: 'id', value: t.id }, 'id'),
              (null == t ? void 0 : t.timestamp) &&
                (0, r.jsx)(
                  H,
                  {
                    dataTestId: 'log-selection-timestamp',
                    keyName: 'timestamp',
                    value: t.timestamp,
                  },
                  'timestamp'
                ),
              (null == t ? void 0 : t.event_message) &&
                (0, r.jsx)(
                  H,
                  { keyName: 'event_message', value: t.event_message },
                  'event_message'
                ),
              (null == t ? void 0 : t.metadata) &&
                (0, r.jsx)(
                  H,
                  { keyName: 'metadata', value: t.metadata },
                  'metadata'
                ),
              Object.entries(o).map((e) => {
                let [t, s] = e;
                return (0, r.jsx)(H, { keyName: t, value: s }, t);
              }),
            ],
          });
        },
        U = s(89129),
        q = (e) => {
          let { log: t, onClose: s, queryType: a, isLoading: n, error: l } = e;
          return (0, r.jsx)('div', {
            className:
              'relative flex h-full flex-grow flex-col overflow-y-scroll bg-surface-100 border-t',
            'data-sentry-component': 'LogSelection',
            'data-sentry-source-file': 'LogSelection.tsx',
            children: (0, r.jsx)('div', {
              className: 'relative flex-grow flex flex-col h-full',
              children: (0, r.jsxs)(B.mQ, {
                defaultValue: 'details',
                className: 'flex flex-col h-full',
                'data-sentry-element': 'Tabs_Shadcn_',
                'data-sentry-source-file': 'LogSelection.tsx',
                children: [
                  (0, r.jsxs)(B.dr, {
                    className: 'px-2 pt-2',
                    'data-sentry-element': 'TabsList_Shadcn_',
                    'data-sentry-source-file': 'LogSelection.tsx',
                    children: [
                      (0, r.jsx)(B.SP, {
                        className: 'px-3',
                        value: 'details',
                        'data-sentry-element': 'TabsTrigger_Shadcn_',
                        'data-sentry-source-file': 'LogSelection.tsx',
                        children: 'Details',
                      }),
                      (0, r.jsx)(B.SP, {
                        disabled: !t,
                        className: 'px-3',
                        value: 'raw',
                        'data-sentry-element': 'TabsTrigger_Shadcn_',
                        'data-sentry-source-file': 'LogSelection.tsx',
                        children: 'Raw',
                      }),
                      (0, r.jsx)(R.z, {
                        type: 'text',
                        className:
                          'ml-auto absolute top-2 right-2 cursor-pointer transition text-foreground h-6 w-6 px-0 py-0 flex items-center justify-center',
                        onClick: s,
                        'data-sentry-element': 'Button',
                        'data-sentry-source-file': 'LogSelection.tsx',
                        children: (0, r.jsx)(I.Z, {
                          size: 14,
                          strokeWidth: 2,
                          className: 'text-foreground-lighter',
                          'data-sentry-element': 'X',
                          'data-sentry-source-file': 'LogSelection.tsx',
                        }),
                      }),
                    ],
                  }),
                  (0, r.jsx)('div', {
                    className: 'flex-1 h-full',
                    children: n
                      ? (0, r.jsx)('div', {
                          className: 'p-4',
                          children: (0, r.jsx)(U.A, {}),
                        })
                      : (0, r.jsxs)(r.Fragment, {
                          children: [
                            (0, r.jsx)(B.nU, {
                              className: 'space-y-6 h-full',
                              value: 'details',
                              children: (0, r.jsx)(
                                () =>
                                  l
                                    ? (0, r.jsx)($, { error: l })
                                    : t
                                      ? (0, r.jsx)(X, {
                                          log: t,
                                          'data-sentry-element':
                                            'DefaultPreviewSelectionRenderer',
                                          'data-sentry-component': 'LogDetails',
                                          'data-sentry-source-file':
                                            'LogSelection.tsx',
                                        })
                                      : (0, r.jsx)(Q, {}),
                                {}
                              ),
                            }),
                            (0, r.jsx)(B.nU, {
                              value: 'raw',
                              children: (0, r.jsx)(J.d, {
                                hideLineNumbers: !0,
                                language: 'json',
                                className:
                                  'prose w-full pt-0 max-w-full border-none',
                                children: JSON.stringify(t, null, 2),
                              }),
                            }),
                          ],
                        }),
                  }),
                ],
              }),
            }),
          });
        };
      function Q(e) {
        let {
          title: t = 'Select an Event',
          message: s = 'Select an Event to view the complete JSON payload',
        } = e;
        return (0, r.jsx)('div', {
          className: (0, T.cn)(
            'flex h-full w-full flex-col items-center justify-center gap-2 overflow-y-scroll text-center transition-all px-4'
          ),
          'data-sentry-component': 'LogDetailEmptyState',
          'data-sentry-source-file': 'LogSelection.tsx',
          children: (0, r.jsxs)('div', {
            className: (0, T.cn)(
              'flex w-full max-w-sm flex-col items-center justify-center gap-6 text-center transition-all delay-300 duration-500'
            ),
            children: [
              (0, r.jsxs)('div', {
                className:
                  'relative flex h-4 w-32 items-center rounded border border-control px-2',
                children: [
                  (0, r.jsx)('div', {
                    className: 'h-0.5 w-2/3 rounded-full bg-surface-300',
                  }),
                  (0, r.jsx)('div', {
                    className: 'absolute right-1 -bottom-4',
                    children: (0, r.jsx)(F.Z, {
                      size: '24',
                      strokeWidth: 1,
                      'data-sentry-element': 'MousePointerClick',
                      'data-sentry-source-file': 'LogSelection.tsx',
                    }),
                  }),
                ],
              }),
              (0, r.jsxs)('div', {
                className: 'flex flex-col gap-1',
                children: [
                  (0, r.jsx)('h3', {
                    className: 'text-sm text-foreground',
                    children: t,
                  }),
                  (0, r.jsx)('p', {
                    className: 'text-xs text-foreground-lighter',
                    children: s,
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function $(e) {
        let { error: t } = e;
        return (0, r.jsx)('pre', {
          'data-sentry-component': 'LogErrorState',
          'data-sentry-source-file': 'LogSelection.tsx',
          children: JSON.stringify(t, null, 2),
        });
      }
      var Y = s(90876);
      let ee = (e) => {
        let { error: t } = e;
        return (0, r.jsx)('div', {
          className: 'w-full prose min-w-full text-foreground text-sm',
          'data-sentry-component': 'DefaultErrorRenderer',
          'data-sentry-source-file': 'DefaultErrorRenderer.tsx',
          children: (0, r.jsx)(J.d, {
            title: 'Error fetching logs',
            language: 'json',
            hideLineNumbers: !0,
            value: 'string' == typeof t ? t : JSON.stringify(t, null, 2),
            className: 'w-full font-mono',
            'data-sentry-element': 'CodeBlock',
            'data-sentry-source-file': 'DefaultErrorRenderer.tsx',
          }),
        });
      };
      var et = s(93761),
        es = s(25843);
      let er = (0, p.createContext)({
        chevronAlign: 'left',
        justified: !0,
        type: 'default',
      });
      function ea(e) {
        let {
            children: t,
            className: s,
            onChange: a,
            openBehaviour: n = 'multiple',
            type: l = 'default',
            defaultValue: o,
            justified: i = !1,
            chevronAlign: c = 'left',
          } = e,
          d = [(0, es.Z)('accordion').variants[l].base];
        return (
          s && d.push(s),
          (0, r.jsx)(r.Fragment, {
            children: (0, r.jsx)(et.fC, {
              type: n,
              onValueChange: function (e) {
                (a && a(e), e == typeof String && e.split(' '));
              },
              defaultValue: o,
              className: d.join(' '),
              'data-sentry-element': 'unknown',
              'data-sentry-source-file': 'Accordion.tsx',
              children: (0, r.jsx)(er.Provider, {
                value: {
                  chevronAlign: c,
                  justified: i,
                  type: l,
                  defaultValue: o,
                },
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Accordion.tsx',
                children: (0, r.jsx)('div', { children: t }),
              }),
            }),
          })
        );
      }
      ea.Item = function (e) {
        let { children: t, className: s, header: a, id: n, disabled: l } = e,
          i = (0, es.Z)('accordion'),
          [c, d] = (0, p.useState)(!1),
          { type: u, justified: x, chevronAlign: m } = (0, p.useContext)(er),
          f = [i.variants[u].trigger];
        (x && f.push(i.justified), s && f.push(s));
        let y = [i.chevron.base, i.chevron.align[m]];
        return (
          c && !l && y.unshift('!rotate-180'),
          (0, r.jsxs)(et.ck, {
            value: n,
            className: i.variants[u].container,
            disabled: l,
            onClick: () => {
              d(!c);
            },
            'data-sentry-element': 'unknown',
            'data-sentry-component': 'Item',
            'data-sentry-source-file': 'Accordion.tsx',
            children: [
              (0, r.jsxs)(et.xz, {
                className: f.join(' '),
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Accordion.tsx',
                children: [
                  a,
                  !l &&
                    (0, r.jsx)(o.Z, {
                      'aria-hidden': !0,
                      className: y.join(' '),
                      strokeWidth: 2,
                    }),
                ],
              }),
              (0, r.jsx)(et.VY, {
                className: i.variants[u].content,
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'Accordion.tsx',
                children: (0, r.jsx)('div', {
                  className: i.variants[u].panel,
                  children: t,
                }),
              }),
            ],
          })
        );
      };
      var en = s(51571),
        el = (e) => {
          let { error: t, isCustomQuery: s } = e;
          return (0, r.jsxs)('div', {
            className: 'flex flex-col gap-2 text-foreground-light',
            'data-sentry-component': 'ResourcesExceededErrorRenderer',
            'data-sentry-source-file': 'ResourcesExceededErrorRenderer.tsx',
            children: [
              (0, r.jsxs)('div', {
                className: 'flex flex-col gap-1 text-sm',
                children: [
                  (0, r.jsx)('p', {
                    children:
                      'This query requires too much memory to be executed.',
                  }),
                  (0, r.jsx)('p', {
                    children: s
                      ? 'Avoid selecting entire objects and instead select specific keys using dot notation.'
                      : 'Avoid querying across a large datetime range.',
                  }),
                  !s &&
                    (0, r.jsx)('p', {
                      children:
                        'Please contact support if this error persists.',
                    }),
                ],
              }),
              (0, r.jsx)(ea, {
                className: 'text-sm',
                justified: !1,
                openBehaviour: 'multiple',
                type: 'default',
                chevronAlign: 'left',
                size: 'small',
                iconPosition: 'left',
                'data-sentry-element': 'Accordion',
                'data-sentry-source-file': 'ResourcesExceededErrorRenderer.tsx',
                children: (0, r.jsx)(ea.Item, {
                  id: '1',
                  header: 'Full error message',
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file':
                    'ResourcesExceededErrorRenderer.tsx',
                  children: (0, r.jsx)(en.Z.TextArea, {
                    size: 'tiny',
                    value: JSON.stringify(t, null, 2),
                    borderless: !0,
                    className: 'mt-4 w-full font-mono',
                    copy: !0,
                    rows: 5,
                    'data-sentry-element': 'unknown',
                    'data-sentry-source-file':
                      'ResourcesExceededErrorRenderer.tsx',
                  }),
                }),
              }),
            ],
          });
        },
        eo = s(94452),
        ei = (e) => {
          let {
              data: t = [],
              queryType: s,
              onHistogramToggle: n,
              isHistogramShowing: m,
              isLoading: E,
              isSaving: _,
              error: z,
              projectRef: I,
              onRun: F,
              onSave: B,
              hasEditorValue: J,
              className: W,
              collectionName: G,
              EmptyState: K,
              showHeader: H = !0,
              showHistogramToggle: X = !0,
              selectedLog: U,
              isSelectedLogLoading: Q,
              selectedLogError: $,
              onSelectedLogChange: et,
            } = e,
            { profile: es } = (0, C.Un)(),
            [er] = (0, N.w)(),
            { show: ea } = (0, y.av)(),
            en = (0, p.useRef)(null),
            [ei, ec] = (0, p.useState)(),
            [ed, eu] = (0, p.useState)(!1),
            [ex, em] = (0, p.useState)(null),
            ef = (0, S.Xo)(a.KA.CREATE, 'user_content', {
              resource: {
                type: 'log_sql',
                owner_id: null == es ? void 0 : es.id,
              },
              subject: { id: null == es ? void 0 : es.id },
            }),
            ep = t[0],
            ey = Object.keys(
              (function () {
                if (!ep) return {};
                let { timestamp: e, ...t } = ep;
                return e ? { timestamp: e, ...t } : ep;
              })() || {}
            ),
            eh = ey.includes('id'),
            eg = ey.includes('timestamp'),
            ej = 'logs-explorer-context-menu',
            ev = ey.map((e, t) => ({
              key: 'logs-column-'.concat(t),
              name: e,
              resizable: !0,
              renderCell: (t) => {
                let { row: s } = t;
                return (0, r.jsx)('span', {
                  onContextMenu: (e) => ea(e, { id: ej }),
                  children: eT(null == s ? void 0 : s[e]),
                });
              },
              renderHeaderCell: (t) =>
                (0, r.jsx)('div', {
                  className: 'flex items-center',
                  children: e,
                }),
              minWidth: 128,
            })),
            eb = ev;
          if (s)
            switch (s) {
              case 'warehouse':
                eb = ev;
                break;
              case 'api':
                eb = V;
                break;
              case 'database':
              case 'pg_cron':
                eb = A;
                break;
              case 'fn_edge':
                eb = O;
                break;
              case 'functions':
                eb = M;
                break;
              case 'auth':
                eb = P;
                break;
              default:
                eb = ep && (0, Y.Oy)(ep) ? Z : ev;
            }
          let ew = (0, p.useMemo)(() => JSON.stringify(t), [t]),
            [eN, eS] = (0, p.useMemo)(() => {
              let e = [...new Set(t)];
              if (!eh) return [e, {}];
              let s = e.reduce((e, t) => ((e[t.id] = t), e), {});
              return [e, s];
            }, [t, eh]),
            ek = (0, p.useMemo)(
              () =>
                eh && eg
                  ? Object.values(eS).sort((e, t) => t.timestamp - e.timestamp)
                  : eN,
              [eN, eh, eg, eS]
            ),
            eC = (0, p.useCallback)(
              (e, t) =>
                (0, r.jsx)(
                  h.X2,
                  { ...t, isRowSelected: !1, selectedCellIdx: void 0 },
                  e
                ),
              []
            ),
            eT = (e) =>
              e && 'object' == typeof e
                ? JSON.stringify(e)
                : null === e
                  ? 'NULL'
                  : String(e);
          function eL(e) {
            (em(e), null == et || et(e));
          }
          let eR = (0, p.useCallback)(
            (e) => {
              if (!ek.length || !ex) return;
              let t = ek.findIndex((e) => l()(e, ex));
              -1 !== t &&
                ('ArrowUp' === e.key && t > 0
                  ? eL(ek[t - 1])
                  : 'ArrowDown' === e.key &&
                    t < ek.length - 1 &&
                    eL(ek[t + 1]));
            },
            [ek, ex, eL]
          );
          return ((0, p.useEffect)(() => {
            ((U || Q) && eu(!0), Q || U || em(null));
          }, [U, Q]),
          (0, p.useEffect)(
            () => (
              window.addEventListener('keydown', eR),
              () => {
                window.removeEventListener('keydown', eR);
              }
            ),
            [eR]
          ),
          (0, p.useEffect)(() => {
            if (!E && !ex) {
              let e = t.find((e) => e.id === er);
              e && em(e);
            }
          }, [E]),
          t)
            ? (0, r.jsxs)('section', {
                className: 'h-full flex w-full flex-col flex-1',
                'data-sentry-component': 'LogTable',
                'data-sentry-source-file': 'LogTable.tsx',
                children: [
                  !s &&
                    (0, r.jsx)(
                      () =>
                        (0, r.jsxs)('div', {
                          className: (0, T.cn)(
                            'flex w-full items-center justify-between border-t bg-surface-100 px-5 py-2',
                            W,
                            { hidden: !H }
                          ),
                          'data-sentry-component': 'LogsExplorerTableHeader',
                          'data-sentry-source-file': 'LogTable.tsx',
                          children: [
                            (0, r.jsx)('div', {
                              className: 'flex items-center gap-2',
                              children: (0, r.jsxs)(L.h_, {
                                'data-sentry-element': 'DropdownMenu',
                                'data-sentry-source-file': 'LogTable.tsx',
                                children: [
                                  (0, r.jsx)(L.$F, {
                                    asChild: !0,
                                    'data-sentry-element':
                                      'DropdownMenuTrigger',
                                    'data-sentry-source-file': 'LogTable.tsx',
                                    children: (0, r.jsxs)(R.z, {
                                      type: 'text',
                                      iconRight: (0, r.jsx)(o.Z, { size: 14 }),
                                      'data-sentry-element': 'Button',
                                      'data-sentry-source-file': 'LogTable.tsx',
                                      children: [
                                        'Results ',
                                        t && t.length
                                          ? '('.concat(t.length, ')')
                                          : '',
                                      ],
                                    }),
                                  }),
                                  (0, r.jsxs)(L.AW, {
                                    align: 'start',
                                    'data-sentry-element':
                                      'DropdownMenuContent',
                                    'data-sentry-source-file': 'LogTable.tsx',
                                    children: [
                                      (0, r.jsxs)(L.Xi, {
                                        onClick: () => {
                                          var e;
                                          null === (e = en.current) ||
                                            void 0 === e ||
                                            e.click();
                                        },
                                        className: 'space-x-2',
                                        'data-sentry-element':
                                          'DropdownMenuItem',
                                        'data-sentry-source-file':
                                          'LogTable.tsx',
                                        children: [
                                          (0, r.jsx)(i.Z, {
                                            size: 14,
                                            'data-sentry-element': 'Download',
                                            'data-sentry-source-file':
                                              'LogTable.tsx',
                                          }),
                                          (0, r.jsx)('div', {
                                            children: 'Download CSV',
                                          }),
                                        ],
                                      }),
                                      (0, r.jsxs)(L.Xi, {
                                        onClick: () => {
                                          let e = f().unparse(t);
                                          (0, k.vQ)(e, () => {
                                            j.Am.success(
                                              'Results copied to clipboard'
                                            );
                                          });
                                        },
                                        className: 'space-x-2',
                                        'data-sentry-element':
                                          'DropdownMenuItem',
                                        'data-sentry-source-file':
                                          'LogTable.tsx',
                                        children: [
                                          (0, r.jsx)(c.Z, {
                                            size: 14,
                                            'data-sentry-element': 'Clipboard',
                                            'data-sentry-source-file':
                                              'LogTable.tsx',
                                          }),
                                          (0, r.jsx)('div', {
                                            children: 'Copy as CSV',
                                          }),
                                        ],
                                      }),
                                      (0, r.jsxs)(L.Xi, {
                                        onClick: () => {
                                          (0, k.vQ)(ew, () => {
                                            j.Am.success(
                                              'Results copied to clipboard'
                                            );
                                          });
                                        },
                                        className: 'space-x-2',
                                        'data-sentry-element':
                                          'DropdownMenuItem',
                                        'data-sentry-source-file':
                                          'LogTable.tsx',
                                        children: [
                                          (0, r.jsx)(c.Z, {
                                            size: 14,
                                            'data-sentry-element': 'Clipboard',
                                            'data-sentry-source-file':
                                              'LogTable.tsx',
                                          }),
                                          (0, r.jsx)('div', {
                                            children: 'Copy as JSON',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)('div', {
                              className: 'hidden',
                              children: (0, r.jsx)(w.Z, {
                                buttonType: 'text',
                                data: t,
                                'data-sentry-element': 'CSVButton',
                                'data-sentry-source-file': 'LogTable.tsx',
                                children: (0, r.jsx)('div', {
                                  ref: en,
                                  children: 'Download CSV',
                                }),
                              }),
                            }),
                            X &&
                              (0, r.jsx)('div', {
                                className: 'flex items-center gap-2',
                                children: (0, r.jsx)(R.z, {
                                  type: 'default',
                                  icon: m
                                    ? (0, r.jsx)(d.Z, {})
                                    : (0, r.jsx)(u.Z, {}),
                                  onClick: n,
                                  children: 'Histogram',
                                }),
                              }),
                            (0, r.jsxs)('div', {
                              className: 'space-x-2',
                              children: [
                                v.Qy &&
                                  (0, r.jsx)(b.u, {
                                    type: 'default',
                                    onClick: B,
                                    loading: _,
                                    disabled: !ef || !J,
                                    tooltip: {
                                      content: {
                                        side: 'bottom',
                                        text: ef
                                          ? void 0
                                          : 'You need additional permissions to save your query',
                                      },
                                    },
                                    children: 'Save query',
                                  }),
                                (0, r.jsx)(R.z, {
                                  title: 'run-logs-query',
                                  type: J ? 'primary' : 'alternative',
                                  disabled: !J,
                                  onClick: F,
                                  iconRight: (0, r.jsx)(x.Z, { size: 12 }),
                                  loading: E,
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'LogTable.tsx',
                                  children: 'Run',
                                }),
                              ],
                            }),
                          ],
                        }),
                      {}
                    ),
                  (0, r.jsxs)(D.pO, {
                    direction: 'horizontal',
                    'data-sentry-element': 'ResizablePanelGroup',
                    'data-sentry-source-file': 'LogTable.tsx',
                    children: [
                      (0, r.jsxs)(D.ee, {
                        defaultSize: U ? 60 : 100,
                        'data-sentry-element': 'ResizablePanel',
                        'data-sentry-source-file': 'LogTable.tsx',
                        children: [
                          (0, r.jsx)(h.ZP, {
                            role: 'table',
                            style: { height: '100%' },
                            className: (0, T.cn)(
                              'flex-1 flex-grow h-full border-0',
                              {
                                'data-grid--simple-logs': s,
                                'data-grid--logs-explorer': !s,
                              }
                            ),
                            rowHeight: 40,
                            headerRowHeight: s ? 0 : 28,
                            onSelectedCellChange: (e) => {
                              ec(e);
                            },
                            onCellClick: (e) => {
                              eL(e.row);
                            },
                            columns: eb,
                            rowClass: (e) =>
                              (0, T.cn)(
                                'font-mono tracking-tight !bg-studio !bg-surface-100 cursor-pointer',
                                {
                                  '!bg-surface-200 rdg-row--focused': l()(
                                    e,
                                    ex
                                  ),
                                }
                              ),
                            rows: ek,
                            rowKeyGetter: (e) =>
                              eh ? e.id : JSON.stringify(e),
                            renderers: {
                              renderRow: eC,
                              noRowsFallback: E
                                ? null
                                : (0, r.jsxs)(r.Fragment, {
                                    children: [
                                      0 === ek.length &&
                                        !z &&
                                        (0, r.jsx)(
                                          () => K || (0, r.jsx)(eo.i, {}),
                                          {}
                                        ),
                                      z &&
                                        (0, r.jsx)(() => {
                                          var e;
                                          if (!z) return null;
                                          let t = {
                                            isCustomQuery: !s,
                                            error: z,
                                          };
                                          return 'object' == typeof z &&
                                            (null === (e = z.error) ||
                                            void 0 === e
                                              ? void 0
                                              : e.errors.find(
                                                  (e) =>
                                                    'resourcesExceeded' ===
                                                    e.reason
                                                ))
                                            ? (0, r.jsx)(el, { ...t })
                                            : (0, r.jsx)('div', {
                                                className:
                                                  'text-foreground flex gap-2 font-mono p-4',
                                                'data-sentry-component':
                                                  'RenderErrorAlert',
                                                'data-sentry-source-file':
                                                  'LogTable.tsx',
                                                children: (0, r.jsx)(ee, {
                                                  ...t,
                                                  'data-sentry-element':
                                                    'DefaultErrorRenderer',
                                                  'data-sentry-source-file':
                                                    'LogTable.tsx',
                                                }),
                                              });
                                        }, {}),
                                    ],
                                  }),
                            },
                            'data-sentry-element': 'DataGrid',
                            'data-sentry-source-file': 'LogTable.tsx',
                          }),
                          (0, g.createPortal)(
                            (0, r.jsx)(y.v2, {
                              id: ej,
                              animation: !1,
                              children: (0, r.jsxs)(y.ck, {
                                onClick: () => {
                                  if (ei) {
                                    var e;
                                    let { row: t, column: s } = ei,
                                      r = eT(
                                        null !==
                                          (e =
                                            null == t ? void 0 : t[s.name]) &&
                                          void 0 !== e
                                          ? e
                                          : ''
                                      );
                                    (0, k.vQ)(r);
                                  }
                                },
                                children: [
                                  (0, r.jsx)(c.Z, { size: 14 }),
                                  (0, r.jsx)('span', {
                                    className: 'ml-2 text-xs',
                                    children: 'Copy cell content',
                                  }),
                                ],
                              }),
                            }),
                            document.body
                          ),
                        ],
                      }),
                      (0, r.jsx)(D.Dp, {
                        withHandle: !0,
                        'data-sentry-element': 'ResizableHandle',
                        'data-sentry-source-file': 'LogTable.tsx',
                      }),
                      ed &&
                        (0, r.jsx)(D.ee, {
                          minSize: 40,
                          defaultSize: 50,
                          children: (0, r.jsx)(q, {
                            isLoading: Q || !1,
                            projectRef: I,
                            onClose: () => {
                              (null == et || et(null), eu(!1));
                            },
                            log: U,
                            error: $,
                            queryType: s,
                            collectionName: G,
                          }),
                        }),
                    ],
                  }),
                ],
              })
            : null;
        };
    },
    2216: function (e, t, s) {
      var r = s(97458),
        a = s(85817),
        n = s(28977),
        l = s.n(n),
        o = s(52983),
        i = s(14500),
        c = s(90839),
        d = s(10611),
        u = s(89831),
        x = s(39130);
      t.Z = (e) => {
        let { to: t, from: s, onChange: n, helpers: m } = e,
          f = (0, u.PJ)(m),
          [p, y] = (0, o.useState)(t || s ? '' : f.text),
          h = m.find((e) => t === e.calcTo() && s === e.calcFrom());
        return (
          (0, o.useEffect)(() => {
            h && p !== h.text ? y(h.text) : !h && (t || s) && y('');
          }, [h, t, s]),
          (0, r.jsxs)('div', {
            className: 'flex items-center',
            'data-sentry-component': 'DatePickers',
            'data-sentry-source-file': 'Logs.DatePickers.tsx',
            children: [
              (0, r.jsxs)(i.h_, {
                'data-sentry-element': 'DropdownMenu',
                'data-sentry-source-file': 'Logs.DatePickers.tsx',
                children: [
                  (0, r.jsx)(i.$F, {
                    asChild: !0,
                    'data-sentry-element': 'DropdownMenuTrigger',
                    'data-sentry-source-file': 'Logs.DatePickers.tsx',
                    children: (0, r.jsx)(c.z, {
                      type: p ? 'secondary' : 'default',
                      icon: (0, r.jsx)(x.Z, { size: 12 }),
                      className: 'rounded-r-none',
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'Logs.DatePickers.tsx',
                      children: (0, r.jsx)('span', {
                        children: (null == h ? void 0 : h.text) || f.text,
                      }),
                    }),
                  }),
                  (0, r.jsx)(i.AW, {
                    side: 'bottom',
                    align: 'start',
                    'data-sentry-element': 'DropdownMenuContent',
                    'data-sentry-source-file': 'Logs.DatePickers.tsx',
                    children: (0, r.jsx)(i._x, {
                      onValueChange: (e) => {
                        let t = m.find((t) => t.text === e);
                        n && t && n({ to: t.calcTo(), from: t.calcFrom() });
                      },
                      value: (null == h ? void 0 : h.text) || '',
                      'data-sentry-element': 'DropdownMenuRadioGroup',
                      'data-sentry-source-file': 'Logs.DatePickers.tsx',
                      children: m.map((e) =>
                        (0, r.jsx)(
                          i.qB,
                          {
                            value: e.text,
                            disabled: e.disabled,
                            children: (0, r.jsx)('span', {
                              className: [
                                e.disabled
                                  ? 'text-foreground-light cursor-not-allowed'
                                  : '',
                              ].join(' '),
                              children: e.text,
                            }),
                          },
                          e.text
                        )
                      ),
                    }),
                  }),
                ],
              }),
              (0, r.jsx)(a.M, {
                triggerButtonClassName: 'rounded-l-none',
                triggerButtonType: h ? 'default' : 'secondary',
                triggerButtonTitle: 'Custom',
                onChange: (e) => {
                  (y(''), n && n(e));
                },
                to: p ? void 0 : t,
                from: p ? void 0 : s,
                renderFooter: (e) => {
                  let { to: t, from: s } = e;
                  if (t && s && Math.abs(l()(s).diff(l()(t), 'day')) > u.$K)
                    return (0, r.jsx)(d.b, {
                      title: '',
                      variant: 'warning',
                      className: 'mx-3 pl-2 pr-2 pt-1 pb-2',
                      children:
                        'Large ranges may result in memory errors for big projects.',
                    });
                },
                'data-sentry-element': 'DatePicker',
                'data-sentry-source-file': 'Logs.DatePickers.tsx',
              }),
            ],
          })
        );
      };
    },
    58397: function (e, t, s) {
      s.d(t, {
        TK: function () {
          return c;
        },
        VG: function () {
          return o;
        },
        VK: function () {
          return l;
        },
        XA: function () {
          return i;
        },
        wv: function () {
          return d;
        },
      });
      var r = s(97458);
      (s(66318), s(52983), s(90876));
      var a = s(44735),
        n = s(90953);
      s(28977);
      let l = (e) => {
          let { children: t } = e;
          return (0, r.jsx)('div', {
            className: 'flex h-full w-full items-center gap-4',
            'data-sentry-component': 'RowLayout',
            'data-sentry-source-file': 'LogsFormatters.tsx',
            children: t,
          });
        },
        o = (e) => {
          let { value: t, className: s } = e;
          return (0, r.jsx)('span', {
            className: 'font-mono text-xs truncate ' + s,
            'data-sentry-component': 'TextFormatter',
            'data-sentry-source-file': 'LogsFormatters.tsx',
            children: t,
          });
        },
        i = (e) => {
          let { value: t } = e;
          if (!t)
            return (0, r.jsx)('div', {
              children: (0, r.jsx)('label', {
                className: 'text-xs text-border-stronger',
                children: 'No data',
              }),
            });
          switch (t.toString().split('')[0]) {
            case '1':
            case '2':
              return (0, r.jsx)('div', {
                className: 'flex h-full items-center',
                children: (0, r.jsx)('div', {
                  className:
                    'relative flex h-6 items-center justify-center rounded border bg-surface-200 px-2 py-1 text-center',
                  children: (0, r.jsx)('label', {
                    className:
                      'block font-mono text-sm text-foreground-lighter',
                    children: t,
                  }),
                }),
              });
            case '5':
              return (0, r.jsx)('div', {
                className: 'flex h-full items-center',
                children: (0, r.jsx)('div', {
                  className:
                    'relative flex h-6 items-center justify-center rounded bg-red-400 px-2 py-1 text-center  ',
                  children: (0, r.jsx)('label', {
                    className: 'block font-mono text-sm text-red-1100',
                    children: t,
                  }),
                }),
              });
            case '4':
            case '3':
              return (0, r.jsx)('div', {
                className: 'flex h-full items-center',
                children: (0, r.jsx)('div', {
                  className:
                    'relative flex h-6 items-center justify-center rounded bg-amber-400 px-2 py-1 text-center  ',
                  children: (0, r.jsx)('label', {
                    className: 'block font-mono text-sm text-amber-1100',
                    children: t,
                  }),
                }),
              });
            default:
              return (0, r.jsx)('div', {
                className: 'flex h-full items-center',
                children: (0, r.jsx)('div', {
                  className:
                    'relative flex h-6 items-center justify-center rounded bg-surface-100 px-2 py-1 text-center  ',
                  children: (0, r.jsx)('label', {
                    className:
                      'block font-mono text-sm text-foreground-lighter',
                    children: t,
                  }),
                }),
              });
          }
        },
        c = (e) => {
          let { value: t, uppercase: s = !0 } = e;
          if (!t)
            return (0, r.jsx)('div', {
              children: (0, r.jsx)('label', {
                className: 'text-xs text-border-stronger',
                children: 'No data',
              }),
            });
          let l = t.toUpperCase(),
            o = s ? l : t,
            i = (e) => {
              let { className: t, children: s } = e;
              return (0, r.jsx)('div', {
                className: 'w-24 flex items-center h-full '.concat(t),
                'data-sentry-component': 'Layout',
                'data-sentry-source-file': 'LogsFormatters.tsx',
                children: s,
              });
            };
          switch (l) {
            case 'UNCAUGHTEXCEPTION':
            case 'PANIC':
            case 'FATAL':
            case 'ERROR':
              return (0, r.jsxs)(i, {
                className: 'gap-1',
                children: [
                  (0, r.jsx)('div', {
                    className: ' p-0.5 rounded !text-red-900',
                    children: (0, r.jsx)(a.Z, { size: 14, strokeWidth: 2 }),
                  }),
                  (0, r.jsx)('span', {
                    className: '!text-red-900 !block titlecase',
                    children: o,
                  }),
                ],
              });
            case 'INFO':
            case 'DEBUG':
              return (0, r.jsxs)(i, {
                className: 'gap-1',
                children: [
                  (0, r.jsx)('div', {
                    className: ' p-0.5 rounded !text-blue-900',
                    children: (0, r.jsx)(a.Z, { size: 14, strokeWidth: 2 }),
                  }),
                  (0, r.jsx)('span', {
                    className: '!text-blue-900 !block titlecase',
                    children: o,
                  }),
                ],
              });
            case 'LOG':
              return (0, r.jsxs)(i, {
                className: 'gap-1',
                children: [
                  (0, r.jsx)('div', {
                    className: ' p-0.5 rounded !text-blue-900',
                    children: (0, r.jsx)(n.Z, { size: 14, strokeWidth: 2 }),
                  }),
                  (0, r.jsx)('span', {
                    className: '!text-blue-900 !block titlecase',
                    children: o,
                  }),
                ],
              });
            case 'WARNING':
              return (0, r.jsxs)(i, {
                className: 'gap-1',
                children: [
                  (0, r.jsx)('div', {
                    className: ' p-0.5 rounded !text-amber-900',
                    children: (0, r.jsx)(a.Z, { size: 14, strokeWidth: 2 }),
                  }),
                  (0, r.jsx)('span', {
                    className: '!text-amber-900 !block titlecase',
                    children: o,
                  }),
                ],
              });
            default:
              return (0, r.jsx)(i, {
                children: (0, r.jsx)('div', {
                  className:
                    'relative rounded px-2 py-1 text-center h-6 flex justify-center items-center bg-surface-100',
                  children: (0, r.jsx)('label', {
                    className:
                      'block font-mono text-sm text-foreground-lighter',
                    children: o,
                  }),
                }),
              });
          }
        };
      function d(e) {
        let t = JSON.stringify(e, null, 2);
        return (t = t
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;'))
          .replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (e) {
              var t = 'number text-tomato-900';
              return (
                /^"/.test(e)
                  ? (t = /:$/.test(e)
                      ? 'key text-foreground'
                      : 'string text-brand-600')
                  : /true|false/.test(e)
                    ? (t = 'boolean text-blue-900')
                    : /null/.test(e) && (t = 'null text-amber-1100'),
                '<span class="' + t + '">' + e + '</span>'
              );
            }
          )
          .split('\n')
          .map((e) => '<span class="line text-xs">'.concat(e, '</span>'))
          .join('\n');
      }
    },
    94452: function (e, t, s) {
      s.d(t, {
        i: function () {
          return l;
        },
      });
      var r = s(97458),
        a = s(77270);
      let n = () =>
        (0, r.jsx)('div', {
          className:
            'relative flex h-4 w-32 items-center rounded border border-dashed border-stronger px-2',
          'data-sentry-component': 'EmptyStateRow',
          'data-sentry-source-file': 'LogsTableEmptyState.tsx',
        });
      function l(e) {
        let {
          title: t = 'No results found',
          description: s = 'Try another search or adjust the filters',
        } = e;
        return (0, r.jsxs)('div', {
          className:
            'flex scale-100 flex-col items-center justify-center gap-6 text-center opacity-100 h-full',
          'data-sentry-component': 'LogsTableEmptyState',
          'data-sentry-source-file': 'LogsTableEmptyState.tsx',
          children: [
            (0, r.jsxs)('div', {
              className: 'flex flex-col gap-1 relative',
              children: [
                (0, r.jsx)(n, {
                  'data-sentry-element': 'EmptyStateRow',
                  'data-sentry-source-file': 'LogsTableEmptyState.tsx',
                }),
                (0, r.jsx)(n, {
                  'data-sentry-element': 'EmptyStateRow',
                  'data-sentry-source-file': 'LogsTableEmptyState.tsx',
                }),
                (0, r.jsx)(n, {
                  'data-sentry-element': 'EmptyStateRow',
                  'data-sentry-source-file': 'LogsTableEmptyState.tsx',
                }),
                (0, r.jsx)(a.Z, {
                  size: 30,
                  className:
                    'absolute right-3 -bottom-2 text-foreground-lighter',
                  'data-sentry-element': 'Search',
                  'data-sentry-source-file': 'LogsTableEmptyState.tsx',
                }),
              ],
            }),
            (0, r.jsxs)('div', {
              className: 'flex flex-col gap-1 px-5',
              children: [
                (0, r.jsx)('h3', {
                  className: 'text-lg text-foreground',
                  children: t,
                }),
                (0, r.jsx)('p', {
                  className: 'text-sm max-w-xs text-foreground-lighter',
                  children: s,
                }),
              ],
            }),
          ],
        });
      }
    },
    60277: function (e, t, s) {
      var r = s(97458),
        a = s(29790),
        n = s(52983),
        l = s(84012),
        o = s(40577),
        i = s(90839);
      t.Z = (e) => {
        let {
            onClick: t,
            buttonType: s = 'default',
            icon: c,
            children: d,
            disabled: u,
            data: x,
            title: m,
          } = e,
          f = (0, n.useRef)(null),
          p = () => {
            var e;
            null === (e = f.current) || void 0 === e || e.link.click();
          },
          y = (0, n.useMemo)(() => {
            let e = null == x ? void 0 : x[0];
            if (!e || !x) return;
            let t = Object.keys(e);
            return x.map((e) =>
              t.reduce(
                (t, s) => (
                  'object' == typeof e[s]
                    ? (t[s] = JSON.stringify(e[s]))
                    : (t[s] = String(e[s])),
                  t
                ),
                {}
              )
            );
          }, [JSON.stringify(x)]);
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.CSVLink, {
              ref: f,
              className: 'hidden',
              data: y || [],
              filename: 'supabase_logs.csv',
              title: m,
              'data-sentry-element': 'CSVLink',
              'data-sentry-source-file': 'CSVButton.tsx',
            }),
            (0, r.jsxs)(o.u, {
              'data-sentry-element': 'Tooltip',
              'data-sentry-source-file': 'CSVButton.tsx',
              children: [
                (0, r.jsx)(o.aJ, {
                  asChild: !0,
                  'data-sentry-element': 'TooltipTrigger',
                  'data-sentry-source-file': 'CSVButton.tsx',
                  children: (0, r.jsx)(i.z, {
                    type: s,
                    icon: c || (0, r.jsx)(a.Z, {}),
                    disabled: u,
                    className: 'px-1.5',
                    onClick: (e) => {
                      (t && t(e), p());
                    },
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'CSVButton.tsx',
                    children: d,
                  }),
                }),
                (0, r.jsx)(o._v, {
                  side: 'bottom',
                  className: 'text-xs',
                  'data-sentry-element': 'TooltipContent',
                  'data-sentry-source-file': 'CSVButton.tsx',
                  children: 'Download logs as CSV',
                }),
              ],
            }),
          ],
        });
      };
    },
    66318: function (e, t, s) {
      var r = s(97458),
        a = s(62507),
        n = s(57304),
        l = s(52983),
        o = s(45536),
        i = s(90839),
        c = s(65092);
      t.Z = (e) => {
        var t;
        let {
            text: s,
            asyncText: d,
            iconOnly: u = !1,
            children: x,
            onClick: m,
            copyLabel: f = 'Copy',
            copiedLabel: p = 'Copied',
            ...y
          } = e,
          [h, g] = (0, l.useState)(!1);
        return (
          (0, l.useEffect)(() => {
            if (!h) return;
            let e = setTimeout(() => g(!1), 2e3);
            return () => clearTimeout(e);
          }, [h]),
          (0, r.jsx)(i.z, {
            onClick: async (e) => {
              let t = d ? await d() : s;
              (g(!0), await (0, o.vQ)(t), null == m || m(e));
            },
            ...y,
            className: (0, c.cn)({ 'px-1': u }, y.className),
            icon: h
              ? (0, r.jsx)(a.Z, { strokeWidth: 2, className: 'text-brand' })
              : null !== (t = y.icon) && void 0 !== t
                ? t
                : (0, r.jsx)(n.Z, {}),
            'data-sentry-element': 'Button',
            'data-sentry-component': 'CopyButton',
            'data-sentry-source-file': 'CopyButton.tsx',
            children:
              !u &&
              (0, r.jsx)(r.Fragment, { children: null != x ? x : h ? p : f }),
          })
        );
      };
    },
    9596: function (e, t, s) {
      var r = s(97458);
      t.Z = (e) => {
        let { children: t, active: s, className: a } = e;
        return (0, r.jsx)('div', {
          className: [
            a,
            'flex h-full flex-grow transition-opacity ',
            s ? 'opacity-30' : 'opacity-100',
          ].join(' '),
          'data-sentry-component': 'LoadingOpacity',
          'data-sentry-source-file': 'LoadingOpacity.tsx',
          children: t,
        });
      };
    },
    54354: function (e, t, s) {
      s.d(t, {
        c: function () {
          return j;
        },
        w: function () {
          return y;
        },
      });
      var r = s(97458),
        a = s(52983),
        n = s(40577),
        l = s(65092),
        o = s(28977),
        i = s.n(o),
        c = s(60192),
        d = s.n(c),
        u = s(13516),
        x = s.n(u),
        m = s(57304);
      (i().extend(d()), i().extend(x()));
      let f = (e) =>
          i()
            .unix(Number(e) / 1e3 / 1e3)
            .toISOString(),
        p = (e) => {
          let t = 16 === String(e).length;
          return !Number.isNaN(Number(e)) && t;
        },
        y = (e) => {
          let { utcTimestamp: t, format: s } = e,
            r = p(t) ? f(t) : t;
          return i().utc(r).local().format(s);
        },
        h = (e) => {
          let { utcTimestamp: t, format: s } = e,
            r = p(t) ? f(t) : t;
          return i().utc(r).format(s);
        },
        g = (e) => {
          let { utcTimestamp: t } = e,
            s = p(t) ? f(t) : t;
          return i().utc(s).fromNow();
        },
        j = (e) => {
          let {
              utcTimestamp: t,
              className: s,
              displayAs: o = 'local',
              format: i = 'DD MMM  HH:mm:ss',
              labelFormat: c = 'DD MMM HH:mm:ss',
            } = e,
            d = y({ utcTimestamp: t, format: i }),
            u = h({ utcTimestamp: t, format: i }),
            x = g({ utcTimestamp: t }),
            [f, p] = (0, a.useState)('start'),
            j = (0, a.useRef)(null),
            v = Intl.DateTimeFormat().resolvedOptions().timeZone;
          (0, a.useEffect)(() => {
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
              [n, o] = (0, a.useState)(!1);
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
                  navigator.clipboard.writeText(s),
                  o(!0),
                  setTimeout(() => {
                    o(!1);
                  }, 1e3));
              },
              className: (0, l.cn)(
                'relative cursor-default grid grid-cols-2 gap-2 bg-surface-100 px-2 py-1 group',
                { 'bg-surface-100': n }
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
                    n &&
                      (0, r.jsx)('span', {
                        className:
                          'absolute inset-0 flex items-center text-brand-600 bg-surface-100',
                        children: 'Copied!',
                      }),
                    (0, r.jsxs)('span', {
                      className: 'flex items-center gap-x-2',
                      children: [
                        s,
                        (0, r.jsx)(m.Z, {
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
          return (0, r.jsxs)(n.u, {
            'data-sentry-element': 'Tooltip',
            'data-sentry-component': 'TimestampInfo',
            'data-sentry-source-file': 'index.tsx',
            children: [
              (0, r.jsx)(n.aJ, {
                asChild: !0,
                ref: j,
                className: 'text-xs '.concat(
                  s,
                  ' border-b border-transparent border-dashed border-foreground-light'
                ),
                'data-sentry-element': 'TooltipTrigger',
                'data-sentry-source-file': 'index.tsx',
                children: (0, r.jsx)('span', {
                  children:
                    'local' === o
                      ? y({ utcTimestamp: t, format: c })
                      : h({ utcTimestamp: t, format: c }),
                }),
              }),
              (0, r.jsxs)(n._v, {
                align: f,
                side: 'right',
                className: 'font-mono p-0 py-1',
                'data-sentry-element': 'TooltipContent',
                'data-sentry-source-file': 'index.tsx',
                children: [
                  (0, r.jsx)(b, {
                    label: 'UTC',
                    value: u,
                    'data-sentry-element': 'TooltipRow',
                    'data-sentry-source-file': 'index.tsx',
                  }),
                  (0, r.jsx)(b, {
                    label: ''.concat(v),
                    value: d,
                    'data-sentry-element': 'TooltipRow',
                    'data-sentry-source-file': 'index.tsx',
                  }),
                  (0, r.jsx)(b, {
                    label: 'Relative',
                    value: x,
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
    10611: function (e, t, s) {
      s.d(t, {
        b: function () {
          return x;
        },
      });
      var r = s(97458),
        a = s(52983),
        n = s(25843),
        l = s(41111),
        o = s(97146),
        i = s(71770),
        c = s(90953),
        d = s(98686);
      let u = {
        danger: (0, r.jsx)(l.Z, { strokeWidth: 1.5, size: 18 }),
        success: (0, r.jsx)(o.Z, { strokeWidth: 1.5, size: 18 }),
        warning: (0, r.jsx)(i.Z, { strokeWidth: 1.5, size: 18 }),
        info: (0, r.jsx)(c.Z, { strokeWidth: 1.5, size: 18 }),
        neutral: (0, r.jsx)(r.Fragment, {}),
      };
      function x(e) {
        let {
            variant: t = 'neutral',
            className: s,
            title: l,
            withIcon: o,
            closable: i,
            children: c,
            icon: x,
            actions: m,
          } = e,
          f = (0, n.Z)('alert'),
          [p, y] = (0, a.useState)(!0),
          h = [f.base];
        (h.push(f.variant[t].base), s && h.push(s));
        let g = [f.description, f.variant[t].description],
          j = [f.close];
        return (0, r.jsx)(r.Fragment, {
          children:
            p &&
            (0, r.jsxs)('div', {
              className: h.join(' '),
              children: [
                o
                  ? (0, r.jsx)('div', {
                      className: f.variant[t].icon,
                      children: o && u[t],
                    })
                  : null,
                x && x,
                (0, r.jsxs)('div', {
                  className: 'flex flex-1 items-center justify-between',
                  children: [
                    (0, r.jsxs)('div', {
                      children: [
                        (0, r.jsx)('h3', {
                          className: [f.variant[t].header, f.header].join(' '),
                          children: l,
                        }),
                        (0, r.jsx)('div', {
                          className: g.join(' '),
                          children: c,
                        }),
                      ],
                    }),
                    m,
                  ],
                }),
                i &&
                  (0, r.jsx)('button', {
                    'aria-label': 'Close alert',
                    onClick: () => y(!1),
                    className: j.join(' '),
                    children: (0, r.jsx)(d.Z, { strokeWidth: 2, size: 16 }),
                  }),
              ],
            }),
        });
      }
    },
  },
]);
