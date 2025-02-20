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
      (e._sentryDebugIds[t] = '11107ba9-1786-4aaa-ac38-482e07a568d0'),
      (e._sentryDebugIdIdentifier =
        'sentry-dbid-11107ba9-1786-4aaa-ac38-482e07a568d0'));
  } catch (e) {}
})(),
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [245],
    {
      98820: function (e, t, n) {
        'use strict';
        n.d(t, {
          B: function () {
            return s;
          },
          l: function () {
            return a;
          },
        });
        let a = [
            {
              language: 'JavaScript',
              officialSupport: !0,
              releaseState: void 0,
              docsUrl:
                'https://supabase.com/docs/reference/javascript/installing',
              gitUrl: 'https://github.com/supabase/supabase-js',
            },
            {
              language: 'Flutter',
              officialSupport: !0,
              releaseState: void 0,
              docsUrl: 'https://supabase.com/docs/reference/dart/installing',
              gitUrl: 'https://github.com/supabase/supabase-flutter',
            },
            {
              language: 'Python',
              officialSupport: !0,
              releaseState: 'Alpha',
              docsUrl:
                'https://supabase.com/docs/reference/python/initializing',
              gitUrl: 'https://github.com/supabase/supabase-py',
            },
            {
              language: 'C#',
              officialSupport: !1,
              releaseState: void 0,
              docsUrl: 'https://supabase.com/docs/reference/csharp/installing',
              gitUrl: 'https://github.com/supabase-community/supabase-csharp',
              altIconName: 'c-sharp',
            },
            {
              language: 'Swift',
              officialSupport: !0,
              releaseState: void 0,
              docsUrl: 'https://supabase.com/docs/reference/swift/initializing',
              gitUrl: 'https://github.com/supabase/supabase-swift',
            },
            {
              language: 'Kotlin',
              officialSupport: !1,
              releaseState: void 0,
              docsUrl: 'https://supabase.com/docs/reference/kotlin/installing',
              gitUrl: 'https://github.com/supabase-community/supabase-kt',
            },
          ],
          s = [
            {
              framework: 'Svelte',
              title: 'Svelte kanban board',
              description:
                'A Trello clone using Supabase as the storage system.',
              url: 'https://github.com/joshnuss/supabase-kanban',
              type: 'app',
            },
            {
              framework: 'nextjs',
              title: 'Next.js Realtime chat app',
              description:
                'Next.js Slack clone app using Supabase realtime subscriptions',
              url: 'https://github.com/supabase/supabase/tree/master/examples/slack-clone/nextjs-slack-clone',
              type: 'app',
            },
            {
              framework: 'nextjs',
              title: 'Next.js Subscription and Auth',
              description:
                'The all-in-one starter kit for high-performance SaaS applications.',
              url: 'https://github.com/vercel/nextjs-subscription-payments',
              type: 'app',
            },
            {
              framework: 'Expo',
              title: 'Expo Starter',
              description: 'Template bottom tabs with auth flow (Typescript)',
              url: 'https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow',
              type: 'mobile',
            },
            {
              framework: 'NestJS',
              title: 'NestJS example',
              description: 'NestJS example using Supabase Auth',
              url: 'https://github.com/hiro1107/nestjs-supabase-auth',
              type: 'app',
            },
            {
              framework: 'React',
              title: 'React realtime chat app',
              description:
                'Example app of real-time chat using supabase realtime api',
              url: 'https://github.com/shwosner/realtime-chat-supabase-react',
              type: 'app',
            },
            {
              framework: 'nextjs',
              title: 'Next.js todo list app',
              description: 'Next.js todo list example',
              url: 'https://github.com/supabase/supabase/tree/master/examples/todo-list/nextjs-todo-list',
              type: 'app',
            },
            {
              framework: 'Svelte',
              title: 'Svelte todo list app',
              description: 'Sveltejs todo with TailwindCSS and Snowpack',
              url: 'https://github.com/supabase/supabase/tree/master/examples/todo-list/sveltejs-todo-list',
              type: 'app',
            },
            {
              framework: 'Flutter',
              title: 'Flutter chat app',
              description: 'A Flutter chat app built with supabase-flutter',
              url: 'https://github.com/supabase-community/flutter-chat',
              type: 'mobile',
            },
            {
              framework: 'Swift',
              title: 'Swift user management app',
              description: 'Swift user management app using supabase-swift',
              url: 'https://github.com/supabase/supabase-swift/tree/main/Examples/UserManagement',
              type: 'mobile',
            },
            {
              framework: 'Swift',
              title: 'Swift Slack Clone',
              description: 'Swift Slack clone app using supabase-swift',
              url: 'https://github.com/supabase/supabase-swift/tree/main/Examples/SlackClone',
              type: 'mobile',
            },
            {
              framework: 'Flutter',
              title: 'Flutter MFA app',
              description: 'A Flutter app demonstrating how to implement MFA',
              url: 'https://github.com/supabase/supabase/tree/master/examples/auth/flutter-mfa',
            },
            {
              framework: 'NuxtJS',
              title: 'NuxtJS todo list app',
              description: 'NuxtJS todo app example',
              url: 'https://github.com/nuxt-modules/supabase/tree/main/demo',
            },
          ];
      },
      44840: function (e, t, n) {
        'use strict';
        n.d(t, {
          $C: function () {
            return r;
          },
          Tu: function () {
            return o;
          },
          _x: function () {
            return i;
          },
          eg: function () {
            return s;
          },
          su: function () {
            return a;
          },
        });
        let a = {
            name: 'New Query',
            description: '',
            type: 'sql',
            visibility: 'user',
            content: {
              schema_version: '1.0',
              content_id: '',
              sql: 'this is a test',
              favorite: !1,
            },
          },
          s =
            '\n-- Supabase AI is experimental and may produce incorrect answers\n-- Always verify the output before executing\n'.trim(),
          r = 'Untitled query',
          i = [RegExp('^(.*;)?\\s*(drop|delete|truncate)\\s', 'is')],
          o = [
            { value: -1, label: 'No limit' },
            { value: 100, label: '100 rows' },
            { value: 500, label: '500 rows' },
            { value: 1e3, label: '1,000 rows' },
          ];
      },
      69072: function (e, t, n) {
        'use strict';
        n.d(t, {
          o: function () {
            return a;
          },
        });
        let a = [
          {
            id: 1,
            type: 'template',
            title: 'Create table',
            description:
              'Basic table template. Change "table_name" to the name you prefer.',
            sql: "create table table_name (\n  id bigint generated by default as identity primary key,\n  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,\n  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,\n  data jsonb,\n  name text\n);",
          },
          {
            id: 2,
            type: 'template',
            title: 'Add view',
            description:
              'Template to add a view. Make sure to change the table and column names to ones that already exist.',
            sql: 'CREATE VIEW countries_view AS\nSELECT id, continent\nFROM countries;',
          },
          {
            id: 3,
            type: 'template',
            title: 'Add column',
            description:
              'Template to add a column. Make sure to change the name and type.',
            sql: 'alter table table_name\nadd column new_column_name data_type;',
          },
          {
            id: 4,
            type: 'template',
            title: 'Add comments',
            description:
              'Templates to add a comment to either a table or a column.',
            sql: "comment on table table_name is 'Table description';\ncomment on column table_name.column_name is 'Column description';",
          },
          {
            id: 5,
            type: 'template',
            title: 'Show extensions',
            description:
              'Get a list of extensions in your database and status.',
            sql: 'select\n  name, comment, default_version, installed_version\nfrom\n  pg_available_extensions\norder by\n  name asc;',
          },
          {
            id: 6,
            type: 'template',
            title: 'Show version',
            description: 'Get your Postgres version.',
            sql: "select * from\n  (select version()) as version,\n  (select current_setting('server_version_num')) as version_number;",
          },
          {
            id: 7,
            type: 'template',
            title: 'Show active connections',
            description: 'Get the number of active and max connections.',
            sql: "select * from\n(select count(pid) as active_connections FROM pg_stat_activity where state = 'active') active_connections,\n(select setting as max_connections from pg_settings where name = 'max_connections') max_connections;",
          },
          {
            id: 8,
            type: 'template',
            title: 'Automatically update timestamps',
            description: 'Update a column timestamp on every update.',
            sql: '\ncreate extension if not exists moddatetime schema extensions;\n\n-- assuming the table name is "todos", and a timestamp column "updated_at"\n-- this trigger will set the "updated_at" column to the current timestamp for every update\ncreate trigger\n  handle_updated_at before update\non todos\nfor each row execute\n  procedure moddatetime(updated_at);\n  '.trim(),
          },
          {
            id: 9,
            type: 'template',
            title: 'Increment field value',
            description:
              'Update a field with incrementing value using stored procedure.',
            sql: "\ncreate function increment(row_id int)\nreturns void as\n$$\n  update table_name\n  set field_name = field_name + 1\n  where id = row_id;\n$$\nlanguage sql volatile;\n\n-- you can call the function from your browser with supabase-js\n-- const { data, error } = await supabase.rpc('increment', { row_id: 2 })\n  ".trim(),
          },
          {
            id: 10,
            type: 'template',
            title: 'pg_stat_statements report',
            description:
              'Select from pg_stat_statements and view recent queries',
            sql: '-- pg_stat_statements report\n\n-- A limit of 100 has been added below\n\nselect\n    auth.rolname,\n    statements.query,\n    statements.calls,\n    -- -- Postgres 13, 14\n    statements.total_exec_time + statements.total_plan_time as total_time,\n    statements.min_exec_time + statements.min_plan_time as min_time,\n    statements.max_exec_time + statements.max_plan_time as max_time,\n    statements.mean_exec_time + statements.mean_plan_time as mean_time,\n    -- -- Postgres <= 12\n    -- total_time,\n    -- min_time,\n    -- max_time,\n    -- mean_time,\n    statements.rows / statements.calls as avg_rows,\n    statements.wal_bytes,\n    statements.wal_records\n  from pg_stat_statements as statements\n    inner join pg_authid as auth on statements.userid = auth.oid\n  order by\n    total_time desc\n  limit\n    100;',
          },
          {
            id: 11,
            type: 'quickstart',
            title: 'Colors',
            description:
              'Create a table with a list of colors and their hex values.',
            sql: "-- Information from Wikipedia \"List of Colors\"\nCREATE TYPE public.color_source AS ENUM (\n    '99COLORS_NET',\n    'ART_PAINTS_YG07S',\n    'BYRNE',\n    'CRAYOLA',\n    'CMYK_COLOR_MODEL',\n    'COLORCODE_IS',\n    'COLORHEXA',\n    'COLORXS',\n    'CORNELL_UNIVERSITY',\n    'COLUMBIA_UNIVERSITY',\n    'DUKE_UNIVERSITY',\n    'ENCYCOLORPEDIA_COM',\n    'ETON_COLLEGE',\n    'FANTETTI_AND_PETRACCHI',\n    'FINDTHEDATA_COM',\n    'FERRARIO_1919',\n    'FEDERAL_STANDARD_595',\n    'FLAG_OF_INDIA',\n    'FLAG_OF_SOUTH_AFRICA',\n    'GLAZEBROOK_AND_BALDRY',\n    'GOOGLE',\n    'HEXCOLOR_CO',\n    'ISCC_NBS',\n    'KELLY_MOORE',\n    'MATTEL',\n    'MAERZ_AND_PAUL',\n    'MILK_PAINT',\n    'MUNSELL_COLOR_WHEEL',\n    'NATURAL_COLOR_SYSTEM',\n    'PANTONE',\n    'PLOCHERE',\n    'POURPRE_COM',\n    'RAL',\n    'RESENE',\n    'RGB_COLOR_MODEL',\n    'THOM_POOLE',\n    'UNIVERSITY_OF_ALABAMA',\n    'UNIVERSITY_OF_CALIFORNIA_DAVIS',\n    'UNIVERSITY_OF_CAMBRIDGE',\n    'UNIVERSITY_OF_NORTH_CAROLINA',\n    'UNIVERSITY_OF_TEXAS_AT_AUSTIN',\n    'X11_WEB',\n    'XONA_COM'\n);\n\ncreate table public.colors (\n  id bigint generated by default as identity primary key,\n  name text,\n  hex text not null,\n  red int2,\n  green int2,\n  blue int2,\n  hue int2,\n  sat_hsl int2,\n  light_hsl int2,\n  sat_hsv int2,\n  val_hsv int2,\n  source color_source\n);\n\ncomment on table colors is 'Full list of colors (based on various sources)';\ncomment on column colors.name is 'Name of the color';\ncomment on column colors.hex is 'Hex tripliets of the color for HTML web colors';\ncomment on column colors.red is 'Red in RGB (%)';\ncomment on column colors.green is 'Green in RGB (%)';\ncomment on column colors.blue is 'Blue in RGB (%)';\ncomment on column colors.hue is 'Hue in HSL (\xb0)';\ncomment on column colors.sat_hsl is 'Saturation in HSL (%)';\ncomment on column colors.light_hsl is 'Light in HSL (%)';\ncomment on column colors.sat_hsv is 'Saturation in HSV (%)';\ncomment on column colors.val_hsv is 'Value in HSV (%)';\ncomment on column colors.source is 'Source of information on the color';\n\ninsert into public.colors (name, hex, red, green, blue, hue, sat_hsl, light_hsl, sat_hsv, val_hsv, source) values\n  ('Absolute Zero', '#0048BA', 0, 28, 73, 217, 100, 37, 100, 73, 'CRAYOLA'),\n  ('Acid green', '#B0BF1A', 69, 75, 10, 65, 76, 43, 76, 75, 'ART_PAINTS_YG07S'),\n  ('Aero', '#7CB9E8', 49, 73, 91, 206, 70, 70, 47, 91, 'MAERZ_AND_PAUL'),\n  ('African violet', '#B284BE', 70, 52, 75, 288, 31, 63, 31.5, '75', 'PANTONE'),\n  ('Air superiority blue', '#72A0C1', 45, 63, 76, 205, 39, 60, 41, 76, 'FEDERAL_STANDARD_595'),\n  ('Alice blue', '#F0F8FF', 94, 97, 100, 208, 100, 97, 6, 100, 'X11_WEB'),\n  ('Alizarin', '#DB2D43', 86, 18, 26, 352, 71, 52, 79, 86, 'MAERZ_AND_PAUL'),\n  ('Alloy orange', '#C46210', 77, 38, 6, 27, 85, 42, 92, 77, 'CRAYOLA'),\n  ('Almond', '#EED9C4', 93, 85, 77, 30, 55, 85, 18, 93, 'CRAYOLA'),\n  ('Amaranth deep purple', '#9F2B68', 62, 17, 41, 328, 57, 40, 73, 62, 'MAERZ_AND_PAUL'),\n  ('Amaranth pink', '#F19CBB', 95, 61, 73, 338, 75, 78, 35, 95, 'MAERZ_AND_PAUL'),\n  ('Amaranth purple', '#AB274F', 67, 15, 31, 342, 63, 41, 77, 67, 'MAERZ_AND_PAUL'),\n  ('Amazon', '#3B7A57', 23, 48, 34, 147, 35, 36, 52, 48, 'XONA_COM'),\n  ('Amber', '#FFBF00', 100, 75, 0, 45, 100, 50, 100, 100, 'RGB_COLOR_MODEL'),\n  ('Amethyst', '#9966CC', 60, 40, 80, 270, 50, 60, 50, 80, 'X11_WEB'),\n  ('Android green', '#3DDC84', 24, 86, 53, 148, 69, 55, 72, 86, 'GOOGLE'),\n  ('Antique brass', '#C88A65', 78, 54, 40, 22, 47, 59, 49, 78, 'CRAYOLA'),\n  ('Antique bronze', '#665D1E', 40, 36, 12, 53, 55, 26, 71, 40, 'ISCC_NBS'),\n  ('Antique fuchsia', '#915C83', 57, 36, 51, 316, 22, 46, 37, 57, 'PLOCHERE'),\n  ('Antique ruby', '#841B2D', 52, 11, 18, 350, 66, 31, 80, 52, 'ISCC_NBS'),\n  ('Antique white', '#FAEBD7', 98, 92, 84, 34, 78, 91, 14, 98, 'X11_WEB'),\n  ('Apricot', '#FBCEB1', 98, 81, 69, 24, 90, 84, 29, 98, 'MAERZ_AND_PAUL'),\n  ('Aqua', '#00FFFF', 0, 100, 100, 180, 100, 50, 100, 100, 'X11_WEB'),\n  ('Aquamarine', '#7FFFD4', 50, 100, 83, 160, 100, 75, 50, 100, 'X11_WEB'),\n  ('Arctic lime', '#D0FF14', 82, 100, 8, 72, 100, 54, 92, 100, 'CRAYOLA'),\n  ('Artichoke green', '#4B6F44', 29, 44, 27, 110, 24, 35, 39, 44, 'PANTONE'),\n  ('Arylide yellow', '#E9D66B', 91, 84, 42, 51, 74, 67, 54, 91, 'COLORHEXA'),\n  ('Ash gray', '#B2BEB5', 70, 75, 71, 135, 9, 72, 6, 75, 'ISCC_NBS'),\n  ('Atomic tangerine', '#FF9966', 100, 60, 40, 20, 100, 70, 60, 100, 'CRAYOLA'),\n  ('Aureolin', '#FDEE00', 99, 93, 0, 56, 100, 50, 100, 99, 'X11_WEB'),\n  ('Azure', '#007FFF', 0, 50, 100, 210, 100, 50, 100, 100, 'RGB_COLOR_MODEL'),\n  ('Azure (X11/web color)', '#F0FFFF', 94, 100, 100, 180, 100, 97, 6, 100, 'X11_WEB'),\n  ('Baby blue', '#89CFF0', 54, 81, 94, 199, 77, 74, 43, 94, 'MAERZ_AND_PAUL'),\n  ('Baby blue eyes', '#A1CAF1', 63, 79, 95, 209, 74, 79, 33, 95, 'PLOCHERE'),\n  ('Baby pink', '#F4C2C2', 96, 76, 76, 0, 69, 86, 20, 96, 'ISCC_NBS'),\n  ('Baby powder', '#FEFEFA', 100, 100, 98, 60, 67, 99, 2, 100, 'CRAYOLA'),\n  ('Baker-Miller pink', '#FF91AF', 100, 57, 69, 344, 100, 78, 43, 100, 'BYRNE'),\n  ('Banana Mania', '#FAE7B5', 98, 91, 71, 43, 87, 85, 28, 98, 'CRAYOLA'),\n  ('Barbie Pink', '#DA1884', 85, 9, 52, 327, 80, 48, 89, 85, 'MATTEL'),\n  ('Barn red', '#7C0A02', 49, 4, 1, 4, 97, 25, 98, 49, 'MILK_PAINT'),\n  ('Battleship grey', '#848482', 52, 52, 51, 60, 1, 51, 2, 52, 'ISCC_NBS'),\n  ('Beau blue', '#BCD4E6', 74, 83, 90, 206, 46, 82, 18, 90, 'PLOCHERE'),\n  ('Beaver', '#9F8170', 62, 51, 44, 22, 20, 53, 30, 62, 'CRAYOLA'),\n  ('Beige', '#F5F5DC', 96, 96, 86, 60, 56, 91, 10, 96, 'X11_WEB'),\n  ('B''dazzled blue', '#2E5894', 18, 35, 58, 215, 53, 38, 69, 58, 'CRAYOLA'),\n  ('Big dip o''ruby', '#9C2542', 61, 15, 26, 345, 62, 38, 76, 61, 'CRAYOLA'),\n  ('Bisque', '#FFE4C4', 100, 89, 77, 33, 100, 88, 23, 100, 'X11_WEB'),\n  ('Bistre', '#3D2B1F', 24, 17, 12, 24, 33, 18, 49, 24, '99COLORS_NET'),\n  ('Bistre brown', '#967117', 59, 44, 9, 43, 73, 34, 85, 59, 'ISCC_NBS'),\n  ('Bitter lemon', '#CAE00D', 79, 88, 5, 66, 89, 47, 94, 88, 'XONA_COM'),\n  ('Black', '#000000', 0, 0, 0, 0, 0, 0, 0, 0, 'RGB_COLOR_MODEL'),\n  ('Black bean', '#3D0C02', 24, 5, 1, 10, 94, 12, 97, 24, 'XONA_COM'),\n  ('Black coral', '#54626F', 33, 38, 44, 209, 14, 38, 24, 44, 'CRAYOLA'),\n  ('Black olive', '#3B3C36', 23, 24, 21, 70, 5, 22, 10, 24, 'RAL'),\n  ('Black Shadows', '#BFAFB2', 75, 69, 70, 349, 11, 72, 8, 75, 'CRAYOLA'),\n  ('Blanched almond', '#FFEBCD', 100, 92, 80, 36, 100, 90, 20, 100, 'X11_WEB'),\n  ('Blast-off bronze', '#A57164', 65, 44, 39, 12, 27, 52, 39, 65, 'CRAYOLA'),\n  ('Bleu de France', '#318CE7', 19, 55, 91, 210, 79, 55, 79, 91, 'POURPRE_COM'),\n  ('Blizzard blue', '#ACE5EE', 67, 90, 93, 188, 66, 80, 28, 93, 'CRAYOLA'),\n  ('Blood red', '#660000', 40, 0, 0, 0, 100, 20, 100, 40, 'THOM_POOLE'),\n  ('Blue', '#0000FF', 0, 0, 100, 240, 100, 50, 100, 100, 'X11_WEB'),\n  ('Blue (Crayola)', '#1F75FE', 12, 46, 100, 217, 99, 56, 88, 100, 'CRAYOLA'),\n  ('Blue (Munsell)', '#0093AF', 0, 58, 69, 190, 100, 34, 100, 69, 'MUNSELL_COLOR_WHEEL'),\n  ('Blue (NCS)', '#0087BD', 0, 53, 74, 197, 100, 37, 100, 74, 'NATURAL_COLOR_SYSTEM'),\n  ('Blue (Pantone)', '#0018A8', 0, 9, 66, 231, 100, 33, 100, 66, 'PANTONE'),\n  ('Blue (pigment)', '#333399', 20, 20, 60, 240, 50, 40, 67, 60, 'CMYK_COLOR_MODEL'),\n  ('Blue bell', '#A2A2D0', 64, 64, 82, 240, 33, 73, 22, 82, 'CRAYOLA'),\n  ('Blue-gray (Crayola)', '#6699CC', 40, 60, 80, 210, 50, 60, 50, 80, 'CRAYOLA'),\n  ('Blue jeans', '#5DADEC', 36, 68, 93, 206, 79, 65, 61, 93, 'CRAYOLA'),\n  ('Blue sapphire', '#126180', 7, 38, 50, 197, 75, 29, 86, 50, 'PANTONE'),\n  ('Blue-violet', '#8A2BE2', 54, 17, 89, 271, 76, 53, 81, 89, 'X11_WEB'),\n  ('Blue yonder', '#5072A7', 31, 45, 65, 217, 35, 48, 52, 65, 'PANTONE'),\n  ('Bluetiful', '#3C69E7', 24, 41, 91, 224, 78, 57, 74, 91, 'CRAYOLA'),\n  ('Blush', '#DE5D83', 87, 36, 51, 342, 66, 62, 58, 87, 'CRAYOLA'),\n  ('Bole', '#79443B', 47, 27, 23, 9, 34, 35, 51, 47, 'ISCC_NBS'),\n  ('Bone', '#E3DAC9', 89, 85, 79, 39, 32, 84, 11, 89, 'KELLY_MOORE'),\n  ('Brick red', '#CB4154', 80, 25, 33, 352, 57, 53, 68, 80, 'CRAYOLA'),\n  ('Bright lilac', '#D891EF', 85, 57, 94, 285, 75, 75, 39, 94, 'CRAYOLA'),\n  ('Bright yellow (Crayola)', '#FFAA1D', 100, 67, 11, 37, 100, 56, 89, 100, 'CRAYOLA'),\n  ('British racing green', '#004225', 0, 26, 15, 154, 100, 13, 100, 26, 'COLORHEXA'),\n  ('Bronze', '#CD7F32', 80, 50, 20, 30, 61, 50, 76, 80, 'MAERZ_AND_PAUL'),\n  ('Brown', '#964B00', 59, 29, 0, 30, 100, 29, 100, 59, 'COLORXS'),\n  ('Brown sugar', '#AF6E4D', 69, 43, 30, 20, 39, 49, 56, 69, 'CRAYOLA'),\n  ('Bud green', '#7BB661', 48, 71, 38, 102, 37, 55, 47, 71, 'PANTONE'),\n  ('Buff', '#FFC680', 100, 78, 50, 33, 100, 75, 50, 100, 'MAERZ_AND_PAUL'),\n  ('Burgundy', '#800020', 50, 0, 13, 345, 100, 25, 100, 50, 'MAERZ_AND_PAUL'),\n  ('Burlywood', '#DEB887', 87, 72, 53, 34, 57, 70, 39, 87, 'X11_WEB'),\n  ('Burnished brown', '#A17A74', 63, 48, 45, 8, 19, 54, 28, 63, 'CRAYOLA'),\n  ('Burnt orange', '#CC5500', 80, 33, 0, 25, 100, 40, 100, 80, 'UNIVERSITY_OF_TEXAS_AT_AUSTIN'),\n  ('Burnt sienna', '#E97451', 91, 45, 32, 14, 78, 62, 65, 91, 'FERRARIO_1919'),\n  ('Burnt umber', '#8A3324', 54, 20, 14, 9, 59, 34, 74, 54, 'XONA_COM'),\n  ('Byzantine', '#BD33A4', 74, 20, 64, 311, 58, 47, 73, 74, 'MAERZ_AND_PAUL'),\n  ('Byzantium', '#702963', 44, 16, 39, 311, 46, 30, 63, 44, 'ISCC_NBS'),\n  ('Cadet blue', '#5F9EA0', 37, 62, 63, 182, 26, 50, 41, 63, 'X11_WEB'),\n  ('Cadet grey', '#91A3B0', 57, 64, 69, 205, 16, 63, 18, 69, 'ISCC_NBS'),\n  ('Cadmium green', '#006B3C', 0, 42, 24, 154, 100, 21, 100, 42, 'ISCC_NBS'),\n  ('Cadmium orange', '#ED872D', 93, 53, 18, 28, 84, 55, 81, 93, 'ISCC_NBS'),\n  ('Caf\xe9 au lait', '#A67B5B', 65, 48, 36, 26, 30, 50, 45, 65, 'ISCC_NBS'),\n  ('Caf\xe9 noir', '#4B3621', 29, 21, 13, 30, 39, 21, 56, 29, 'ISCC_NBS'),\n  ('Cambridge blue', '#A3C1AD', 64, 76, 68, 140, 20, 70, 16, 76, 'UNIVERSITY_OF_CAMBRIDGE'),\n  ('Camel', '#C19A6B', 76, 60, 42, 33, 41, 59, 45, 76, 'ISCC_NBS'),\n  ('Cameo pink', '#EFBBCC', 94, 73, 80, 340, 62, 84, 22, 94, 'ISCC_NBS'),\n  ('Canary', '#FFFF99', 100, 100, 60, 60, 100, 80, 40, 100, 'CRAYOLA'),\n  ('Canary yellow', '#FFEF00', 100, 94, 0, 56, 100, 50, 100, 100, 'CMYK_COLOR_MODEL'),\n  ('Candy pink', '#E4717A', 89, 44, 48, 355, 68, 67, 50, 89, 'ISCC_NBS'),\n  ('Cardinal', '#C41E3A', 77, 12, 23, 350, 74, 44, 85, 77, 'MAERZ_AND_PAUL'),\n  ('Caribbean green', '#00CC99', 0, 80, 60, 165, 100, 40, 100, 80, 'CRAYOLA'),\n  ('Carmine', '#960018', 59, 0, 9, 350, 100, 29, 100, 59, 'POURPRE_COM'),\n  ('Carmine (M&P)', '#D70040', 84, 0, 25, 342, 100, 42, 100, 84, 'MAERZ_AND_PAUL'),\n  ('Carnation pink', '#FFA6C9', 100, 65, 79, 336, 100, 83, 35, 100, 'CRAYOLA'),\n  ('Carnelian', '#B31B1B', 70, 11, 11, 0, 74, 40, 85, 70, 'CORNELL_UNIVERSITY'),\n  ('Carolina blue', '#56A0D3', 34, 63, 83, 204, 59, 58, 59, 83, 'UNIVERSITY_OF_NORTH_CAROLINA'),\n  ('Carrot orange', '#ED9121', 93, 57, 13, 33, 85, 53, 86, 93, 'MAERZ_AND_PAUL'),\n  ('Catawba', '#703642', 44, 21, 26, 348, 35, 33, 52, 44, 'MAERZ_AND_PAUL'),\n  ('Cedar Chest', '#C95A49', 79, 35, 29, 8, 54, 54, 64, 79, 'CRAYOLA'),\n  ('Celadon', '#ACE1AF', 67, 88, 69, 123, 47, 78, 24, 88, 'ENCYCOLORPEDIA_COM'),\n  ('Celeste', '#B2FFFF', 70, 100, 100, 180, 100, 85, 30, 100, 'FANTETTI_AND_PETRACCHI'),\n  ('Cerise', '#DE3163', 87, 19, 39, 343, 72, 53, 78, 87, 'MAERZ_AND_PAUL'),\n  ('Cerulean', '#007BA7', 0, 48, 65, 196, 100, 33, 100, 65, 'MAERZ_AND_PAUL'),\n  ('Cerulean blue', '#2A52BE', 16, 32, 75, 224, 64, 46, 78, 75, 'MAERZ_AND_PAUL'),\n  ('Cerulean frost', '#6D9BC3', 43, 61, 76, 208, 42, 60, 44, 76, 'CRAYOLA'),\n  ('Cerulean (Crayola)', '#1DACD6', 11, 67, 84, 194, 76, 48, 86, 84, 'CRAYOLA'),\n  ('Cerulean (RGB)', '#0040FF', 0, 25, 100, 225, 100, 50, 100, 100, null),\n  ('Champagne', '#F7E7CE', 97, 91, 81, 37, 72, 89, 17, 97, 'MAERZ_AND_PAUL'),\n  ('Champagne pink', '#F1DDCF', 95, 87, 81, 25, 55, 88, 14, 95, 'PANTONE'),\n  ('Charcoal', '#36454F', 21, 27, 31, 204, 19, 26, 32, 31, 'ISCC_NBS'),\n  ('Charm pink', '#E68FAC', 90, 56, 67, 340, 64, 73, 38, 90, 'PLOCHERE'),\n  ('Chartreuse (web)', '#80FF00', 50, 100, 0, 90, 100, 50, 100, 100, 'RGB_COLOR_MODEL'),\n  ('Cherry blossom pink', '#FFB7C5', 100, 72, 77, 348, 100, 86, 28, 100, 'MAERZ_AND_PAUL'),\n  ('Chestnut', '#954535', 58, 27, 21, 10, 48, 40, 64, 58, 'MAERZ_AND_PAUL'),\n  ('Chili red', '#E23D28', 89, 24, 16, 5, 76, 52, 183, 125, 'FLAG_OF_SOUTH_AFRICA'),\n  ('China pink', '#DE6FA1', 87, 44, 63, 333, 63, 65, 50, 87, 'PLOCHERE'),\n  ('Chinese red', '#AA381E', 67, 22, 12, 11, 70, 39, 82, 67, 'ISCC_NBS'),\n  ('Chinese violet', '#856088', 52, 38, 53, 296, 17, 46, 29, 53, 'PANTONE'),\n  ('Chinese yellow', '#FFB200', 100, 70, 0, 42, 100, 50, 100, 100, 'ISCC_NBS'),\n  ('Chocolate (traditional)', '#7B3F00', 48, 25, 0, 31, 100, 24, 100, 48, 'MAERZ_AND_PAUL'),\n  ('Chocolate (web)', '#D2691E', 82, 41, 12, 25, 75, 47, 86, 82, 'X11_WEB'),\n  ('Cinereous', '#98817B', 60, 51, 48, 12, 12, 54, 19, 60, 'MAERZ_AND_PAUL'),\n  ('Cinnabar', '#E34234', 89, 26, 20, 5, 76, 55, 77, 89, 'MAERZ_AND_PAUL'),\n  ('Cinnamon Satin', '#CD607E', 80, 38, 49, 343, 52, 59, 53, 80, 'CRAYOLA'),\n  ('Citrine', '#E4D00A', 89, 82, 4, 54, 92, 47, 96, 89, 'MAERZ_AND_PAUL'),\n  ('Citron', '#9FA91F', 62, 66, 12, 64, 69, 39, 82, 66, 'XONA_COM'),\n  ('Claret', '#7F1734', 50, 9, 20, 343, 69, 29, 82, 50, 'XONA_COM'),\n  ('Coffee', '#6F4E37', 44, 31, 22, 25, 34, 33, 50, 44, 'ISCC_NBS'),\n  ('Columbia Blue', '#B9D9EB', 73, 85, 92, 202, 56, 82, 21, 92, 'COLUMBIA_UNIVERSITY'),\n  ('Congo pink', '#F88379', 97, 51, 47, 5, 90, 72, 51, 97, 'ISCC_NBS'),\n  ('Cool grey', '#8C92AC', 55, 57, 67, 229, 16, 61, 19, 67, 'ISCC_NBS'),\n  ('Copper', '#B87333', 72, 45, 20, 29, 57, 46, 72, 72, 'MAERZ_AND_PAUL'),\n  ('Copper (Crayola)', '#DA8A67', 85, 54, 40, 18, 61, 63, 53, 85, 'CRAYOLA'),\n  ('Copper penny', '#AD6F69', 68, 44, 41, 5, 29, 55, 39, 68, 'CRAYOLA'),\n  ('Copper red', '#CB6D51', 80, 43, 32, 14, 54, 56, 60, 80, 'ISCC_NBS'),\n  ('Copper rose', '#996666', 60, 40, 40, 0, 20, 50, 33, 60, '99COLORS_NET'),\n  ('Coquelicot', '#FF3800', 100, 22, 0, 13, 100, 50, 100, 100, 'COLORHEXA'),\n  ('Coral', '#FF7F50', 100, 50, 31, 16, 100, 66, 69, 100, 'X11_WEB'),\n  ('Coral pink', '#F88379', 97, 51, 47, 5, 90, 72, 51, 97, 'ISCC_NBS'),\n  ('Cordovan', '#893F45', 54, 25, 27, 355, 37, 39, 54, 54, 'PANTONE'),\n  ('Corn', '#FBEC5D', 98, 93, 36, 54, 95, 68, 63, 98, 'MAERZ_AND_PAUL'),\n  ('Cornflower blue', '#6495ED', 39, 58, 93, 219, 79, 66, 58, 93, 'X11_WEB'),\n  ('Cornsilk', '#FFF8DC', 100, 97, 86, 48, 100, 93, 14, 100, 'X11_WEB'),\n  ('Cosmic cobalt', '#2E2D88', 18, 18, 53, 241, 50, 36, 67, 53, 'CRAYOLA'),\n  ('Cosmic latte', '#FFF8E7', 100, 97, 91, 43, 100, 95, 9, 100, 'GLAZEBROOK_AND_BALDRY'),\n  ('Coyote brown', '#81613C', 51, 38, 24, 32, 37, 37, 52, 51, 'COLORCODE_IS'),\n  ('Cotton candy', '#FFBCD9', 100, 74, 85, 334, 100, 87, 26, 100, 'CRAYOLA'),\n  ('Cream', '#FFFDD0', 100, 99, 82, 57, 100, 91, 18, 100, 'MAERZ_AND_PAUL'),\n  ('Crimson', '#DC143C', 86, 8, 24, 348, 83, 47, 91, 86, 'X11_WEB'),\n  ('Crimson (UA)', '#9E1B32', 62, 11, 20, 349, 71, 36, 83, 62, 'UNIVERSITY_OF_ALABAMA'),\n  ('Cultured Pearl', '#F5F5F5', 96, 96, 96, 0, 0, 96, 0, 96, 'CRAYOLA'),\n  ('Cyan', '#00FFFF', 0, 100, 100, 180, 100, 50, 100, 100, 'X11_WEB'),\n  ('Cyan (process)', '#00B7EB', 0, 72, 92, 193, 100, 46, 100, 92, 'CMYK_COLOR_MODEL'),\n  ('Cyber grape', '#58427C', 35, 26, 49, 263, 31, 37, 47, 49, 'CRAYOLA'),\n  ('Cyber yellow', '#FFD300', 100, 83, 0, 50, 100, 50, 100, 100, 'PANTONE'),\n  ('Cyclamen', '#F56FA1', 96, 44, 63, 338, 87, 70, 54, 96, 'CRAYOLA'),\n  ('Dandelion', '#FED85D', 100, 85, 36, 46, 99, 68, 63, 100, 'CRAYOLA'),\n  ('Dark brown', '#654321', 40, 26, 13, 30, 51, 26, 67, 40, 'X11_WEB'),\n  ('Dark byzantium', '#5D3954', 36, 22, 33, 315, 24, 29, 39, 36, 'ISCC_NBS'),\n  ('Dark cyan', '#008B8B', 0, 55, 55, 180, 100, 27, 100, 55, 'X11_WEB'),\n  ('Dark electric blue', '#536878', 33, 41, 47, 206, 18, 40, 31, 47, 'ISCC_NBS'),\n  ('Dark goldenrod', '#B8860B', 72, 53, 4, 43, 89, 38, 94, 72, 'X11_WEB'),\n  ('Dark green (X11)', '#006400', 0, 39, 0, 120, 100, 20, 100, 39, 'X11_WEB'),\n  ('Dark jungle green', '#1A2421', 10, 14, 13, 162, 16, 12, 28, 14, 'ISCC_NBS'),\n  ('Dark khaki', '#BDB76B', 74, 72, 42, 56, 38, 58, 43, 74, 'X11_WEB'),\n  ('Dark lava', '#483C32', 28, 24, 20, 27, 18, 24, 31, 28, 'ISCC_NBS'),\n  ('Dark liver (horses)', '#543D37', 33, 24, 22, 12, 21, 27, 35, 33, 'UNIVERSITY_OF_CALIFORNIA_DAVIS'),\n  ('Dark magenta', '#8B008B', 55, 0, 55, 300, 100, 27, 100, 55, 'X11_WEB'),\n  ('Dark olive green', '#556B2F', 33, 42, 18, 82, 39, 30, 56, 42, 'X11_WEB'),\n  ('Dark orange', '#FF8C00', 100, 55, 0, 33, 100, 50, 100, 100, 'X11_WEB'),\n  ('Dark orchid', '#9932CC', 60, 20, 80, 280, 61, 50, 75, 80, 'X11_WEB'),\n  ('Dark purple', '#301934', 19, 10, 20, 291, 35, 15, 51, 20, 'ISCC_NBS'),\n  ('Dark red', '#8B0000', 55, 0, 0, 0, 100, 27, 100, 55, 'X11_WEB'),\n  ('Dark salmon', '#E9967A', 91, 59, 48, 15, 72, 70, 48, 91, 'X11_WEB'),\n  ('Dark sea green', '#8FBC8F', 56, 74, 56, 120, 25, 65, 24, 74, 'X11_WEB'),\n  ('Dark sienna', '#3C1414', 24, 8, 8, 0, 50, 16, 67, 24, 'ISCC_NBS'),\n  ('Dark sky blue', '#8CBED6', 55, 75, 84, 199, 47, 69, 35, 84, 'PANTONE'),\n  ('Dark slate blue', '#483D8B', 28, 24, 55, 248, 39, 39, 56, 55, 'X11_WEB'),\n  ('Dark slate gray', '#2F4F4F', 18, 31, 31, 180, 25, 25, 41, 31, 'X11_WEB'),\n  ('Dark spring green', '#177245', 9, 45, 27, 150, 66, 27, 80, 45, 'X11_WEB'),\n  ('Dark turquoise', '#00CED1', 0, 81, 82, 181, 100, 41, 100, 82, 'X11_WEB'),\n  ('Dark violet', '#9400D3', 58, 0, 83, 282, 100, 41, 100, 83, 'X11_WEB'),\n  ('Davy''s grey', '#555555', 33, 33, 33, 0, 0, 33, 0, 33, 'ISCC_NBS'),\n  ('Deep cerise', '#DA3287', 85, 20, 53, 330, 69, 53, 77, 85, 'CRAYOLA'),\n  ('Deep champagne', '#FAD6A5', 98, 84, 65, 35, 90, 81, 34, 98, 'ISCC_NBS'),\n  ('Deep chestnut', '#B94E48', 73, 31, 28, 3, 45, 50, 61, 73, 'CRAYOLA'),\n  ('Deep jungle green', '#004B49', 0, 29, 29, 178, 100, 15, 100, 29, 'ISCC_NBS'),\n  ('Deep pink', '#FF1493', 100, 8, 58, 328, 100, 54, 92, 100, 'X11_WEB'),\n  ('Deep saffron', '#FF9933', 100, 60, 20, 30, 100, 60, 80, 100, 'FLAG_OF_INDIA'),\n  ('Deep sky blue', '#00BFFF', 0, 75, 100, 195, 100, 50, 100, 100, 'X11_WEB'),\n  ('Deep Space Sparkle', '#4A646C', 29, 39, 42, 194, 19, 36, 31, 42, 'CRAYOLA'),\n  ('Deep taupe', '#7E5E60', 49, 37, 38, 356, 15, 43, 25, 49, 'PANTONE'),\n  ('Denim', '#1560BD', 8, 38, 74, 213, 80, 41, 89, 74, 'CRAYOLA'),\n  ('Denim blue', '#2243B6', 13, 26, 71, 227, 69, 42, 81, 71, 'CRAYOLA'),\n  ('Desert', '#C19A6B', 76, 60, 42, 33, 41, 59, 45, 76, 'ISCC_NBS'),\n  ('Desert sand', '#EDC9AF', 93, 79, 69, 25, 63, 81, 26, 93, 'CRAYOLA'),\n  ('Dim gray', '#696969', 41, 41, 41, 0, 0, 41, 0, 41, 'X11_WEB'),\n  ('Dodger blue', '#1E90FF', 12, 56, 100, 210, 100, 56, 88, 100, 'X11_WEB'),\n  ('Drab dark brown', '#4A412A', 29, 25, 16, 43, 28, 23, 43, 29, 'PANTONE'),\n  ('Duke blue', '#00009C', 0, 0, 61, 240, 100, 31, 100, 61, 'DUKE_UNIVERSITY'),\n  ('Dutch white', '#EFDFBB', 94, 87, 73, 42, 62, 84, 22, 94, 'RESENE'),\n  ('Ebony', '#555D50', 33, 36, 31, 97, 8, 34, 14, 36, 'MAERZ_AND_PAUL'),\n  ('Ecru', '#C2B280', 76, 70, 50, 45, 35, 63, 34, 76, 'ISCC_NBS'),\n  ('Eerie black', '#1B1B1B', 11, 11, 11, 0, 0, 11, 0, 11, 'CRAYOLA'),\n  ('Eggplant', '#614051', 38, 25, 32, 329, 21, 32, 34, 38, 'CRAYOLA'),\n  ('Eggshell', '#F0EAD6', 94, 92, 84, 46, 46, 89, 11, 94, 'ISCC_NBS'),\n  ('Electric lime', '#CCFF00', 80, 100, 0, 72, 100, 50, 100, 100, 'CRAYOLA'),\n  ('Electric purple', '#BF00FF', 75, 0, 100, 285, 100, 50, 100, 100, 'X11_WEB'),\n  ('Electric violet', '#8F00FF', 56, 0, 100, 274, 100, 50, 100, 100, 'ISCC_NBS'),\n  ('Emerald', '#50C878', 31, 78, 47, 140, 52, 55, 60, 78, 'MAERZ_AND_PAUL'),\n  ('Eminence', '#6C3082', 42, 19, 51, 284, 46, 35, 63, 51, 'XONA_COM'),\n  ('English lavender', '#B48395', 71, 51, 58, 338, 25, 61, 27, 71, 'PANTONE'),\n  ('English red', '#AB4B52', 67, 29, 32, 356, 39, 48, 56, 67, 'ISCC_NBS'),\n  ('English vermillion', '#CC474B', 80, 28, 29, 358, 57, 54, 65, 80, 'CRAYOLA'),\n  ('English violet', '#563C5C', 34, 24, 36, 289, 21, 30, 35, 36, 'ISCC_NBS'),\n  ('Erin', '#00FF40', 0, 100, 25, 135, 100, 50, 100, 100, 'MAERZ_AND_PAUL'),\n  ('Eton blue', '#96C8A2', 59, 78, 64, 134, 31, 69, 25, 78, 'ETON_COLLEGE'),\n  ('Fallow', '#C19A6B', 76, 60, 42, 33, 41, 59, 45, 76, 'ISCC_NBS'),\n  ('Falu red', '#801818', 50, 9, 9, 0, 68, 30, 81, 50, 'COLORHEXA'),\n  ('Fandango', '#B53389', 71, 20, 54, 320, 56, 46, 72, 71, 'MAERZ_AND_PAUL'),\n  ('Fandango pink', '#DE5285', 87, 32, 52, 338, 68, 60, 63, 87, 'PANTONE'),\n  ('Fawn', '#E5AA70', 90, 67, 44, 30, 69, 67, 51, 90, 'X11_WEB'),\n  ('Fern green', '#4F7942', 31, 47, 26, 106, 29, 37, 45, 47, 'MAERZ_AND_PAUL'),\n  ('Field drab', '#6C541E', 42, 33, 12, 42, 57, 27, 72, 42, 'ISCC_NBS'),\n  ('Fiery rose', '#FF5470', 100, 33, 44, 350, 100, 67, 67, 100, 'CRAYOLA'),\n  ('Finn', '#683068', 41, 19, 41, 300, 37, 30, 54, 41, 'HEXCOLOR_CO'),\n  ('Firebrick', '#B22222', 70, 13, 13, 0, 68, 42, 81, 70, 'X11_WEB'),\n  ('Fire engine red', '#CE2029', 81, 13, 16, 357, 73, 47, 84, 81, 'FINDTHEDATA_COM'),\n  ('Flame', '#E25822', 89, 35, 13, 17, 77, 51, 85, 89, 'ISCC_NBS'),\n  ('Flax', '#EEDC82', 93, 86, 51, 50, 76, 72, 45, 93, 'MAERZ_AND_PAUL'),\n  ('Flirt', '#A2006D', 64, 0, 43, 320, 100, 32, 100, 64, 'XONA_COM'),\n  ('Floral white', '#FFFAF0', 100, 98, 94, 40, 100, 97, 6, 100, 'X11_WEB'),\n  ('Forest green (web)', '#228B22', 13, 55, 13, 120, 61, 34, 76, 55, 'X11_WEB'),\n  ('French beige', '#A67B5B', 65, 48, 36, 26, 30, 50, 45, 65, 'ISCC_NBS'),\n  ('French bistre', '#856D4D', 52, 43, 30, 34, 27, 41, 42, 52, 'POURPRE_COM'),\n  ('French blue', '#0072BB', 0, 45, 73, 203, 100, 37, 100, 73, 'MAERZ_AND_PAUL'),\n  ('French fuchsia', '#FD3F92', 99, 25, 57, 334, 98, 62, 75, 99, 'POURPRE_COM'),\n  ('French lilac', '#86608E', 53, 38, 56, 290, 19, 47, 32, 56, 'ISCC_NBS'),\n  ('French lime', '#9EFD38', 62, 99, 22, 89, 98, 61, 78, 99, 'POURPRE_COM'),\n  ('French mauve', '#D473D4', 83, 45, 83, 300, 53, 64, 46, 83, 'POURPRE_COM'),\n  ('French pink', '#FD6C9E', 99, 42, 62, 339, 97, 71, 57, 99, 'POURPRE_COM'),\n  ('French raspberry', '#C72C48', 78, 17, 28, 349, 64, 48, 78, 78, 'POURPRE_COM'),\n  ('French sky blue', '#77B5FE', 47, 71, 100, 212, 99, 73, 53, 100, 'POURPRE_COM'),\n  ('French violet', '#8806CE', 53, 2, 81, 279, 94, 42, 97, 81, 'POURPRE_COM'),\n  ('Frostbite', '#E936A7', 91, 21, 65, 322, 80, 56, 77, 91, 'CRAYOLA'),\n  ('Fuchsia', '#FF00FF', 100, 0, 100, 300, 100, 50, 100, 100, 'X11_WEB'),\n  ('Fuchsia (Crayola)', '#C154C1', 76, 33, 76, 300, 47, 54, 56, 76, 'CRAYOLA'),\n  ('Fulvous', '#E48400', 89, 52, 0, 35, 100, 45, 100, 89, '99COLORS_NET'),\n  ('Fuzzy Wuzzy', '#87421F', 53, 26, 12, 20, 63, 33, 77, 53, 'CRAYOLA');\n".trim(),
          },
          {
            id: 12,
            type: 'quickstart',
            title: 'Slack Clone',
            description: 'Build a basic slack clone with Row Level Security.',
            sql: "\n--\n-- For use with https://github.com/supabase/supabase/tree/master/examples/slack-clone/nextjs-slack-clone\n\n-- Custom types\ncreate type public.app_permission as enum ('channels.delete', 'messages.delete');\ncreate type public.app_role as enum ('admin', 'moderator');\ncreate type public.user_status as enum ('ONLINE', 'OFFLINE');\n\n-- USERS\ncreate table public.users (\n  id          uuid not null primary key, -- UUID from auth.users\n  username    text,\n  status      user_status default 'OFFLINE'::public.user_status\n);\ncomment on table public.users is 'Profile data for each user.';\ncomment on column public.users.id is 'References the internal Supabase Auth user.';\n\n-- CHANNELS\ncreate table public.channels (\n  id            bigint generated by default as identity primary key,\n  inserted_at   timestamp with time zone default timezone('utc'::text, now()) not null,\n  slug          text not null unique,\n  created_by    uuid references public.users not null\n);\ncomment on table public.channels is 'Topics and groups.';\n\n-- MESSAGES\ncreate table public.messages (\n  id            bigint generated by default as identity primary key,\n  inserted_at   timestamp with time zone default timezone('utc'::text, now()) not null,\n  message       text,\n  user_id       uuid references public.users not null,\n  channel_id    bigint references public.channels on delete cascade not null\n);\ncomment on table public.messages is 'Individual messages sent by each user.';\n\n-- USER ROLES\ncreate table public.user_roles (\n  id        bigint generated by default as identity primary key,\n  user_id   uuid references public.users on delete cascade not null,\n  role      app_role not null,\n  unique (user_id, role)\n);\ncomment on table public.user_roles is 'Application roles for each user.';\n\n-- ROLE PERMISSIONS\ncreate table public.role_permissions (\n  id           bigint generated by default as identity primary key,\n  role         app_role not null,\n  permission   app_permission not null,\n  unique (role, permission)\n);\ncomment on table public.role_permissions is 'Application permissions for each role.';\n\n-- authorize with role-based access control (RBAC)\ncreate function public.authorize(\n  requested_permission app_permission,\n  user_id uuid\n)\nreturns boolean as\n$$\n  declare\n    bind_permissions int;\n  begin\n    select\n      count(*)\n    from public.role_permissions\n    inner join public.user_roles on role_permissions.role = user_roles.role\n    where\n      role_permissions.permission = authorize.requested_permission and\n      user_roles.user_id = authorize.user_id\n    into bind_permissions;\n\n    return bind_permissions > 0;\n  end;\n$$\nlanguage plpgsql security definer;\n\n-- Secure the tables\nalter table public.users\n  enable row level security;\nalter table public.channels\n  enable row level security;\nalter table public.messages\n  enable row level security;\nalter table public.user_roles\n  enable row level security;\nalter table public.role_permissions\n  enable row level security;\n\ncreate policy \"Allow logged-in read access\" on public.users\n  for select using (auth.role() = 'authenticated');\ncreate policy \"Allow individual insert access\" on public.users\n  for insert with check ((select auth.uid()) = id);\ncreate policy \"Allow individual update access\" on public.users\n  for update using ( (select auth.uid()) = id );\ncreate policy \"Allow logged-in read access\" on public.channels\n  for select using (auth.role() = 'authenticated');\ncreate policy \"Allow individual insert access\" on public.channels\n  for insert with check ((select auth.uid()) = created_by);\ncreate policy \"Allow individual delete access\" on public.channels\n  for delete using ((select auth.uid()) = created_by);\ncreate policy \"Allow authorized delete access\" on public.channels\n  for delete using (authorize('channels.delete', auth.uid()));\ncreate policy \"Allow logged-in read access\" on public.messages\n  for select using (auth.role() = 'authenticated');\ncreate policy \"Allow individual insert access\" on public.messages\n  for insert with check ((select auth.uid()) = user_id);\ncreate policy \"Allow individual update access\" on public.messages\n  for update using ((select auth.uid()) = user_id);\ncreate policy \"Allow individual delete access\" on public.messages\n  for delete using ((select auth.uid()) = user_id);\ncreate policy \"Allow authorized delete access\" on public.messages\n  for delete using (authorize('messages.delete', auth.uid()));\ncreate policy \"Allow individual read access\" on public.user_roles\n  for select using ((select auth.uid()) = user_id);\n\n-- Send \"previous data\" on change\nalter table public.users\n  replica identity full;\nalter table public.channels\n  replica identity full;\nalter table public.messages\n  replica identity full;\n\n-- inserts a row into public.users and assigns roles\ncreate function public.handle_new_user()\nreturns trigger\nset search_path = ''\nas $$\n  declare is_admin boolean;\n  begin\n    insert into public.users (id, username)\n    values (new.id, new.email);\n\n    select count(*) = 1 from auth.users into is_admin;\n\n    if position('+supaadmin@' in new.email) > 0 then\n      insert into public.user_roles (user_id, role) values (new.id, 'admin');\n    elsif position('+supamod@' in new.email) > 0 then\n      insert into public.user_roles (user_id, role) values (new.id, 'moderator');\n    end if;\n\n    return new;\n  end;\n$$ language plpgsql security definer;\n\n-- trigger the function every time a user is created\ncreate trigger on_auth_user_created\n  after insert on auth.users\n  for each row execute procedure public.handle_new_user();\n\n/**\n * REALTIME SUBSCRIPTIONS\n * Only allow realtime listening on public tables.\n */\n\nbegin;\n  -- remove the realtime publication\n  drop publication if exists supabase_realtime;\n\n  -- re-create the publication but don't enable it for any tables\n  create publication supabase_realtime;\ncommit;\n\n-- add tables to the publication\nalter publication supabase_realtime add table public.channels;\nalter publication supabase_realtime add table public.messages;\nalter publication supabase_realtime add table public.users;\n\n-- DUMMY DATA\ninsert into public.users (id, username)\nvalues\n    ('8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e', 'supabot');\n\ninsert into public.channels (slug, created_by)\nvalues\n    ('public', '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'),\n    ('random', '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e');\n\ninsert into public.messages (message, channel_id, user_id)\nvalues\n    ('Hello World \uD83D\uDC4B', 1, '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'),\n    ('Perfection is attained, not when there is nothing more to add, but when there is nothing left to take away.', 2, '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e');\n\ninsert into public.role_permissions (role, permission)\nvalues\n    ('admin', 'channels.delete'),\n    ('admin', 'messages.delete'),\n    ('moderator', 'messages.delete');\n".trim(),
          },
          {
            id: 13,
            type: 'quickstart',
            title: 'Todo List',
            description: 'Build a basic todo list with Row Level Security.',
            sql: '\n--\n-- For use with:\n-- https://github.com/supabase/supabase/tree/master/examples/todo-list/sveltejs-todo-list or\n-- https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/todo-list\n--\n\ncreate table todos (\n  id bigint generated by default as identity primary key,\n  user_id uuid references auth.users not null,\n  task text check (char_length(task) > 3),\n  is_complete boolean default false,\n  inserted_at timestamp with time zone default timezone(\'utc\'::text, now()) not null\n);\nalter table todos enable row level security;\ncreate policy "Individuals can create todos." on todos for\n    insert with check (auth.uid() = user_id);\ncreate policy "Individuals can view their own todos. " on todos for\n    select using ((select auth.uid()) = user_id);\ncreate policy "Individuals can update their own todos." on todos for\n    update using ((select auth.uid()) = user_id);\ncreate policy "Individuals can delete their own todos." on todos for\n    delete using ((select auth.uid()) = user_id);\n'.trim(),
          },
          {
            id: 14,
            type: 'quickstart',
            title: 'Stripe Subscriptions',
            description:
              'Starter template for the Next.js Stripe Subscriptions Starter.',
            sql: "\n/**\n* USERS\n* Note: This table contains user data. Users should only be able to view and update their own data.\n*/\ncreate table users (\n  -- UUID from auth.users\n  id uuid references auth.users not null primary key,\n  full_name text,\n  avatar_url text,\n  -- The customer's billing address, stored in JSON format.\n  billing_address jsonb,\n  -- Stores your customer's payment instruments.\n  payment_method jsonb\n);\nalter table users\n  enable row level security;\ncreate policy \"Can view own user data.\" on users\n  for select using ((select auth.uid()) = id);\ncreate policy \"Can update own user data.\" on users\n  for update using ((select auth.uid()) = id);\n\n/**\n* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.\n*/\ncreate function public.handle_new_user()\nreturns trigger\nset search_path = ''\nas $$\n  begin\n    insert into public.users (id, full_name, avatar_url)\n    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');\n    return new;\n  end;\n$$\nlanguage plpgsql security definer;\n\ncreate trigger on_auth_user_created\n  after insert on auth.users\n  for each row\n    execute procedure public.handle_new_user();\n\n/**\n* CUSTOMERS\n* Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.\n*/\ncreate table customers (\n  -- UUID from auth.users\n  id uuid references auth.users not null primary key,\n  -- The user's customer ID in Stripe. User must not be able to update this.\n  stripe_customer_id text\n);\nalter table customers enable row level security;\n-- No policies as this is a private table that the user must not have access to.\n\n/**\n* PRODUCTS\n* Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.\n*/\ncreate table products (\n  -- Product ID from Stripe, e.g. prod_1234.\n  id text primary key,\n  -- Whether the product is currently available for purchase.\n  active boolean,\n  -- The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.\n  name text,\n  -- The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.\n  description text,\n  -- A URL of the product image in Stripe, meant to be displayable to the customer.\n  image text,\n  -- Set of key-value pairs, used to store additional information about the object in a structured format.\n  metadata jsonb\n);\nalter table products\n  enable row level security;\ncreate policy \"Allow public read-only access.\" on products\n  for select using (true);\n\n/**\n* PRICES\n* Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.\n*/\ncreate type pricing_type as enum ('one_time', 'recurring');\ncreate type pricing_plan_interval as enum ('day', 'week', 'month', 'year');\ncreate table prices (\n  -- Price ID from Stripe, e.g. price_1234.\n  id text primary key,\n  -- The ID of the prduct that this price belongs to.\n  product_id text references products,\n  -- Whether the price can be used for new purchases.\n  active boolean,\n  -- A brief description of the price.\n  description text,\n  -- The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for \xa5100, a zero-decimal currency).\n  unit_amount bigint,\n  -- Three-letter ISO currency code, in lowercase.\n  currency text check (char_length(currency) = 3),\n  -- One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.\n  type pricing_type,\n  -- The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.\n  interval pricing_plan_interval,\n  -- The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.\n  interval_count integer,\n  -- Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).\n  trial_period_days integer,\n  -- Set of key-value pairs, used to store additional information about the object in a structured format.\n  metadata jsonb\n);\nalter table prices\n  enable row level security;\ncreate policy \"Allow public read-only access.\" on prices\n  for select using (true);\n\n/**\n* SUBSCRIPTIONS\n* Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.\n*/\ncreate type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');\ncreate table subscriptions (\n  -- Subscription ID from Stripe, e.g. sub_1234.\n  id text primary key,\n  user_id uuid references auth.users not null,\n  -- The status of the subscription object, one of subscription_status type above.\n  status subscription_status,\n  -- Set of key-value pairs, used to store additional information about the object in a structured format.\n  metadata jsonb,\n  -- ID of the price that created this subscription.\n  price_id text references prices,\n  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.\n  quantity integer,\n  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.\n  cancel_at_period_end boolean,\n  -- Time at which the subscription was created.\n  created timestamp with time zone default timezone('utc'::text, now()) not null,\n  -- Start of the current period that the subscription has been invoiced for.\n  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,\n  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.\n  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,\n  -- If the subscription has ended, the timestamp of the date the subscription ended.\n  ended_at timestamp with time zone default timezone('utc'::text, now()),\n  -- A date in the future at which the subscription will automatically get canceled.\n  cancel_at timestamp with time zone default timezone('utc'::text, now()),\n  -- If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.\n  canceled_at timestamp with time zone default timezone('utc'::text, now()),\n  -- If the subscription has a trial, the beginning of that trial.\n  trial_start timestamp with time zone default timezone('utc'::text, now()),\n  -- If the subscription has a trial, the end of that trial.\n  trial_end timestamp with time zone default timezone('utc'::text, now())\n);\nalter table subscriptions\n  enable row level security;\ncreate policy \"Can only view own subs data.\" on subscriptions\n  for select using ((select auth.uid()) = user_id);\n\n/**\n * REALTIME SUBSCRIPTIONS\n * Only allow realtime listening on public tables.\n */\ndrop publication if exists supabase_realtime;\ncreate publication supabase_realtime\n  for table products, prices;\n".trim(),
          },
          {
            id: 15,
            type: 'quickstart',
            title: 'User Management Starter',
            description:
              'Sets up a public Profiles table which you can access with your API.',
            sql: "\n-- Create a table for public profiles\ncreate table profiles (\n  id uuid references auth.users on delete cascade not null primary key,\n  updated_at timestamp with time zone,\n  username text unique,\n  full_name text,\n  avatar_url text,\n  website text,\n\n  constraint username_length check (char_length(username) >= 3)\n);\n-- Set up Row Level Security (RLS)\n-- See https://supabase.com/docs/guides/auth/row-level-security for more details.\nalter table profiles\n  enable row level security;\n\ncreate policy \"Public profiles are viewable by everyone.\" on profiles\n  for select using (true);\n\ncreate policy \"Users can insert their own profile.\" on profiles\n  for insert with check ((select auth.uid()) = id);\n\ncreate policy \"Users can update own profile.\" on profiles\n  for update using ((select auth.uid()) = id);\n\n-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.\n-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.\ncreate function public.handle_new_user()\nreturns trigger\nset search_path = ''\nas $$\nbegin\n  insert into public.profiles (id, full_name, avatar_url)\n  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');\n  return new;\nend;\n$$ language plpgsql security definer;\ncreate trigger on_auth_user_created\n  after insert on auth.users\n  for each row execute procedure public.handle_new_user();\n\n-- Set up Storage!\ninsert into storage.buckets (id, name)\n  values ('avatars', 'avatars');\n\n-- Set up access controls for storage.\n-- See https://supabase.com/docs/guides/storage#policy-examples for more details.\ncreate policy \"Avatar images are publicly accessible.\" on storage.objects\n  for select using (bucket_id = 'avatars');\n\ncreate policy \"Anyone can upload an avatar.\" on storage.objects\n  for insert with check (bucket_id = 'avatars');\n".trim(),
          },
          {
            id: 16,
            type: 'quickstart',
            title: 'NextAuth Schema Setup',
            description:
              'Sets up a the Schema and Tables for the NextAuth Supabase Adapter.',
            sql: '\n--\n-- Name: next_auth; Type: SCHEMA;\n--\nCREATE SCHEMA next_auth;\n\nGRANT USAGE ON SCHEMA next_auth TO service_role;\nGRANT ALL ON SCHEMA next_auth TO postgres;\n\n--\n-- Create users table\n--\nCREATE TABLE IF NOT EXISTS next_auth.users\n(\n    id uuid NOT NULL DEFAULT gen_random_uuid(),\n    name text,\n    email text,\n    "emailVerified" timestamp with time zone,\n    image text,\n    CONSTRAINT users_pkey PRIMARY KEY (id),\n    CONSTRAINT email_unique UNIQUE (email)\n);\n\nGRANT ALL ON TABLE next_auth.users TO postgres;\nGRANT ALL ON TABLE next_auth.users TO service_role;\n\n--- uid() function to be used in RLS policies\nCREATE FUNCTION next_auth.uid() RETURNS uuid\n    LANGUAGE sql STABLE\n    AS $$\n  select\n    coalesce(\n        nullif(current_setting(\'request.jwt.claim.sub\', true), \'\'),\n        (nullif(current_setting(\'request.jwt.claims\', true), \'\')::jsonb ->> \'sub\')\n    )::uuid\n$$;\n\n--\n-- Create sessions table\n--\nCREATE TABLE IF NOT EXISTS  next_auth.sessions\n(\n    id uuid NOT NULL DEFAULT gen_random_uuid(),\n    expires timestamp with time zone NOT NULL,\n    "sessionToken" text NOT NULL,\n    "userId" uuid,\n    CONSTRAINT sessions_pkey PRIMARY KEY (id),\n    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),\n    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")\n        REFERENCES  next_auth.users (id) MATCH SIMPLE\n        ON UPDATE NO ACTION\n        ON DELETE CASCADE\n);\n\nGRANT ALL ON TABLE next_auth.sessions TO postgres;\nGRANT ALL ON TABLE next_auth.sessions TO service_role;\n\n--\n-- Create accounts table\n--\nCREATE TABLE IF NOT EXISTS  next_auth.accounts\n(\n    id uuid NOT NULL DEFAULT gen_random_uuid(),\n    type text NOT NULL,\n    provider text NOT NULL,\n    "providerAccountId" text NOT NULL,\n    refresh_token text,\n    access_token text,\n    expires_at bigint,\n    token_type text,\n    scope text,\n    id_token text,\n    session_state text,\n    oauth_token_secret text,\n    oauth_token text,\n    "userId" uuid,\n    CONSTRAINT accounts_pkey PRIMARY KEY (id),\n    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),\n    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")\n        REFERENCES  next_auth.users (id) MATCH SIMPLE\n        ON UPDATE NO ACTION\n        ON DELETE CASCADE\n);\n\nGRANT ALL ON TABLE next_auth.accounts TO postgres;\nGRANT ALL ON TABLE next_auth.accounts TO service_role;\n\n--\n-- Create verification_tokens table\n--\nCREATE TABLE IF NOT EXISTS  next_auth.verification_tokens\n(\n    identifier text,\n    token text,\n    expires timestamp with time zone NOT NULL,\n    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),\n    CONSTRAINT token_unique UNIQUE (token),\n    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)\n);\n\nGRANT ALL ON TABLE next_auth.verification_tokens TO postgres;\nGRANT ALL ON TABLE next_auth.verification_tokens TO service_role;\n'.trim(),
          },
          {
            id: 17,
            type: 'template',
            title: 'Most frequently invoked',
            description: 'Most frequently called queries in your database.',
            sql: '-- Most frequently called queries\n\n-- A limit of 100 has been added below\n\nselect\n    auth.rolname,\n    statements.query,\n    statements.calls,\n    -- -- Postgres 13, 14, 15\n    statements.total_exec_time + statements.total_plan_time as total_time,\n    statements.min_exec_time + statements.min_plan_time as min_time,\n    statements.max_exec_time + statements.max_plan_time as max_time,\n    statements.mean_exec_time + statements.mean_plan_time as mean_time,\n    -- -- Postgres <= 12\n    -- total_time,\n    -- min_time,\n    -- max_time,\n    -- mean_time,\n    statements.rows / statements.calls as avg_rows\n\n  from pg_stat_statements as statements\n    inner join pg_authid as auth on statements.userid = auth.oid\n  order by\n    statements.calls desc\n  limit\n    100;',
          },
          {
            id: 18,
            type: 'template',
            title: 'Most time consuming',
            description: 'Aggregate time spent on a query type.',
            sql: "-- Most time consuming queries\n\n-- A limit of 100 has been added below\n\nselect\n    auth.rolname,\n    statements.query,\n    statements.calls,\n    statements.total_exec_time + statements.total_plan_time as total_time,\n    to_char(((statements.total_exec_time + statements.total_plan_time)/sum(statements.total_exec_time + statements.total_plan_time) over()) * 100, 'FM90D0') || '%' as prop_total_time\n  from pg_stat_statements as statements\n    inner join pg_authid as auth on statements.userid = auth.oid\n  order by\n    total_time desc\n  limit\n    100;",
          },
          {
            id: 19,
            type: 'template',
            title: 'Slowest execution time',
            description: 'Slowest queries based on max execution time.',
            sql: '-- Slowest queries by max execution time\n\n-- A limit of 100 has been added below\n\nselect\n    auth.rolname,\n    statements.query,\n    statements.calls,\n    -- -- Postgres 13, 14, 15\n    statements.total_exec_time + statements.total_plan_time as total_time,\n    statements.min_exec_time + statements.min_plan_time as min_time,\n    statements.max_exec_time + statements.max_plan_time as max_time,\n    statements.mean_exec_time + statements.mean_plan_time as mean_time,\n    -- -- Postgres <= 12\n    -- total_time,\n    -- min_time,\n    -- max_time,\n    -- mean_time,\n    statements.rows / statements.calls as avg_rows\n  from pg_stat_statements as statements\n    inner join pg_authid as auth on statements.userid = auth.oid\n  order by\n    max_time desc\n  limit\n    100;',
          },
          {
            id: 20,
            type: 'template',
            title: 'Hit rate',
            description: 'See your cache and index hit rate.',
            sql: "-- Cache and index hit rate\n\nselect\n    'index hit rate' as name,\n    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio\n  from pg_statio_user_indexes\n  union all\n  select\n    'table hit rate' as name,\n    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio\n  from pg_statio_user_tables;",
          },
          {
            id: 21,
            type: 'quickstart',
            title: 'OpenAI Vector Search',
            description: 'Template for the Next.js OpenAI Doc Search Starter.',
            sql: '\n-- Enable pg_vector extension\ncreate extension if not exists vector with schema public;\n\n-- Create tables\ncreate table "public"."nods_page" (\n  id bigserial primary key,\n  parent_page_id bigint references public.nods_page,\n  path text not null unique,\n  checksum text,\n  meta jsonb,\n  type text,\n  source text\n);\nalter table "public"."nods_page" enable row level security;\n\ncreate table "public"."nods_page_section" (\n  id bigserial primary key,\n  page_id bigint not null references public.nods_page on delete cascade,\n  content text,\n  token_count int,\n  embedding vector(1536),\n  slug text,\n  heading text\n);\nalter table "public"."nods_page_section" enable row level security;\n\n-- Create embedding similarity search functions\ncreate or replace function match_page_sections(embedding vector(1536), match_threshold float, match_count int, min_content_length int)\nreturns table (id bigint, page_id bigint, slug text, heading text, content text, similarity float)\nlanguage plpgsql\nas $$\n#variable_conflict use_variable\nbegin\n  return query\n  select\n    nods_page_section.id,\n    nods_page_section.page_id,\n    nods_page_section.slug,\n    nods_page_section.heading,\n    nods_page_section.content,\n    (nods_page_section.embedding <#> embedding) * -1 as similarity\n  from nods_page_section\n\n  -- We only care about sections that have a useful amount of content\n  where length(nods_page_section.content) >= min_content_length\n\n  -- The dot product is negative because of a Postgres limitation, so we negate it\n  and (nods_page_section.embedding <#> embedding) * -1 > match_threshold\n\n  -- OpenAI embeddings are normalized to length 1, so\n  -- cosine similarity and dot product will produce the same results.\n  -- Using dot product which can be computed slightly faster.\n  --\n  -- For the different syntaxes, see https://github.com/pgvector/pgvector\n  order by nods_page_section.embedding <#> embedding\n\n  limit match_count;\nend;\n$$;\n\ncreate or replace function get_page_parents(page_id bigint)\nreturns table (id bigint, parent_page_id bigint, path text, meta jsonb)\nlanguage sql\nas $$\n  with recursive chain as (\n    select *\n    from nods_page\n    where id = page_id\n\n    union all\n\n    select child.*\n      from nods_page as child\n      join chain on chain.parent_page_id = child.id\n  )\n  select id, parent_page_id, path, meta\n  from chain;\n$$;\n'.trim(),
          },
          {
            id: 22,
            type: 'template',
            title: 'Replication status report',
            description:
              'See the status of your replication slots and replication lag.',
            sql: "-- Replication status report\n\nSELECT\n  s.slot_name,\n  s.active,\n  COALESCE(r.state, 'N/A') as state,\n  COALESCE(r.client_addr, null) as replication_client_address,\n  GREATEST(0, ROUND((redo_lsn-restart_lsn)/1024/1024/1024, 2)) as replication_lag_gb\nFROM pg_control_checkpoint(), pg_replication_slots s\nLEFT JOIN pg_stat_replication r ON (r.pid = s.active_pid);\n",
          },
          {
            id: 23,
            type: 'quickstart',
            title: 'LangChain',
            description:
              'LangChain is a popular framework for working with AI, Vectors, and embeddings.',
            sql: "\n-- Enable the pgvector extension to work with embedding vectors\ncreate extension vector;\n\n-- Create a table to store your documents\ncreate table documents (\n  id bigserial primary key,\n  content text, -- corresponds to Document.pageContent\n  metadata jsonb, -- corresponds to Document.metadata\n  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed\n);\n\n-- Create a function to search for documents\ncreate function match_documents (\n  query_embedding vector(1536),\n  match_count int default null,\n  filter jsonb DEFAULT '{}'\n) returns table (\n  id bigint,\n  content text,\n  metadata jsonb,\n  similarity float\n)\nlanguage plpgsql\nas $$\n#variable_conflict use_column\nbegin\n  return query\n  select\n    id,\n    content,\n    metadata,\n    1 - (documents.embedding <=> query_embedding) as similarity\n  from documents\n  where metadata @> filter\n  order by documents.embedding <=> query_embedding\n  limit match_count;\nend;\n$$;\n".trim(),
          },
          {
            id: 24,
            type: 'template',
            title: 'Install dbdev',
            description:
              'dbdev is a client for installing Trusted Language Extensions (TLE) into your database.',
            sql: "\n/*---------------------\n---- install dbdev ----\n-----------------------\nRequires:\n  - pg_tle: https://github.com/aws/pg_tle\n  - pgsql-http: https://github.com/pramsey/pgsql-http\n\nWarning:\nRestoring a logical backup of a database with a TLE installed can fail.\nFor this reason, dbdev should only be used with databases with physical backups enabled.\n*/\ncreate extension if not exists http with schema extensions;\ncreate extension if not exists pg_tle;\nselect pgtle.uninstall_extension_if_exists('supabase-dbdev');\ndrop extension if exists \"supabase-dbdev\";\nselect\n    pgtle.install_extension(\n        'supabase-dbdev',\n        resp.contents ->> 'version',\n        'PostgreSQL package manager',\n        resp.contents ->> 'sql'\n    )\nfrom http(\n    (\n        'GET',\n        'https://api.database.dev/rest/v1/'\n        || 'package_versions?select=sql,version'\n        || '&package_name=eq.supabase-dbdev'\n        || '&order=version.desc'\n        || '&limit=1',\n        array[\n            ('apiKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s')::http_header\n        ],\n        null,\n        null\n    )\n) x,\nlateral (\n    select\n        ((row_to_json(x) -> 'content') #>> '{}')::json -> 0\n) resp(contents);\ncreate extension \"supabase-dbdev\";\nselect dbdev.install('supabase-dbdev');\ndrop extension if exists \"supabase-dbdev\";\ncreate extension \"supabase-dbdev\";\n".trim(),
          },
          {
            id: 25,
            type: 'template',
            title: 'Large objects',
            description:
              'List large objects (tables/indexes) in your database.',
            sql: "SELECT\n    SCHEMA_NAME,\n    relname,\n    table_size\n  FROM\n    (SELECT\n      pg_catalog.pg_namespace.nspname AS SCHEMA_NAME,\n      relname,\n      pg_relation_size(pg_catalog.pg_class.oid) AS table_size\n    FROM pg_catalog.pg_class\n    JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid\n    ) t\n  WHERE SCHEMA_NAME NOT LIKE 'pg_%'\n  ORDER BY table_size DESC\n  LIMIT 25".trim(),
          },
          {
            id: 26,
            type: 'template',
            title: 'Limit MFA verification attempts to one in 2 seconds',
            description:
              'Create an Auth hook that limits the number of failed MFA verification attempts to one in 2 seconds.',
            sql: "\ncreate function public.hook_mfa_verification_attempt(event jsonb)\n  returns jsonb\n  language plpgsql\nas $$\n  declare\n    last_failed_at timestamp;\n  begin\n    if event->'valid' is true then\n      -- code is valid, accept it\n      return jsonb_build_object('decision', 'continue');\n    end if;\n\n    select last_failed_at into last_failed_at\n      from public.mfa_failed_verification_attempts\n      where\n        user_id = (event->'user_id')::uuid\n          and\n        factor_id = event->'factor_id';\n\n    if last_failed_at is not null and now() - last_failed_at < interval '2 seconds' then\n      -- last attempt was done too quickly\n      return jsonb_build_object(\n        'error', jsonb_build_object(\n          'http_code', 429,\n          'message',   'Please wait a moment before trying again.'\n        )\n      );\n    end if;\n\n    -- record this failed attempt\n    insert into public.mfa_failed_verification_attempts\n      (\n        user_id,\n        factor_id,\n        last_refreshed_at\n      )\n      values\n      (\n        event->'user_id',\n        event->'factor_id',\n        now()\n      )\n      on conflict do update\n        set last_refreshed_at = now();\n\n    -- finally let Supabase Auth do the default behavior for a failed attempt\n    return jsonb_build_object('decision', 'continue');\n  end;\n$$;\n\n-- Assign appropriate permissions and revoke access\ngrant execute\n  on function public.hook_mfa_verification_attempt\n  to supabase_auth_admin;\n\ngrant all\n  on table public.mfa_failed_verification_attempts\n  to supabase_auth_admin;\n\nrevoke execute\n  on function public.hook_mfa_verification_attempt\n  from authenticated, anon, public;\n\nrevoke all\n  on table public.mfa_failed_verification_attempts\n  from authenticated, anon, public;\n\ngrant usage on schema public to supabase_auth_admin;".trim(),
          },
          {
            id: 27,
            type: 'template',
            title: 'Add Auth Hook (Password Verification Attempt)',
            description:
              'Create an Auth Hook that limits number of failed password verification attempts to one in 10 seconds',
            sql: "\ncreate function public.hook_password_verification_attempt(event jsonb)\nreturns jsonb\nlanguage plpgsql\nas $$\n  declare\n    last_failed_at timestamp;\n  begin\n    if event->'valid' is true then\n      -- password is valid, accept it\n      return jsonb_build_object('decision', 'continue');\n    end if;\n\n    select last_failed_at into last_failed_at\n      from public.password_failed_verification_attempts\n      where\n        user_id = (event->'user_id')::uuid;\n\n    if last_failed_at is not null and now() - last_failed_at < interval '10 seconds' then\n      -- last attempt was done too quickly\n      return jsonb_build_object(\n        'error', jsonb_build_object(\n          'http_code', 429,\n          'message',   'Please wait a moment before trying again.'\n        )\n      );\n    end if;\n\n    -- record this failed attempt\n    insert into public.password_failed_verification_attempts\n      (\n        user_id,\n        last_failed_at\n      )\n      values\n      (\n        event->'user_id',\n        now()\n      )\n      on conflict do update\n        set last_failed_at = now();\n\n    -- finally let Supabase Auth do the default behavior for a failed attempt\n    return jsonb_build_object('decision', 'continue');\n  end;\n$$;\n\n-- Assign appropriate permissions\ngrant execute\n  on function public.hook_password_verification_attempt\n  to supabase_auth_admin;\n\ngrant all\n  on table public.password_failed_verification_attempts\n  to supabase_auth_admin;\n\nrevoke execute\n  on function public.hook_password_verification_attempt\n  from authenticated, anon, public;\n\nrevoke all\n  on table public.password_failed_verification_attempts\n  from authenticated, anon, public;\n\ngrant usage on schema public to supabase_auth_admin;".trim(),
          },
          {
            id: 28,
            type: 'template',
            title: 'Add Auth Hook (Custom Access Token)',
            description:
              'Create an Auth Hook to add custom claims to your Auth Token',
            sql: "\n-- Assumes that there is an is_admin flag on the profiles table.\ncreate or replace function public.custom_access_token_hook(event jsonb)\nreturns jsonb\nlanguage plpgsql\nas $$\n  declare\n    claims jsonb;\n    is_admin boolean;\n  begin\n    -- Check if the user is marked as admin in the profiles table\n    select is_admin into is_admin from profiles where user_id = (event->>'user_id')::uuid;\n\n    -- Proceed only if the user is an admin\n    if is_admin then\n      claims := event->'claims';\n\n      -- Check if 'user_metadata' exists in claims\n      if jsonb_typeof(claims->'user_metadata') is null then\n        -- If 'user_metadata' does not exist, create an empty object\n        claims := jsonb_set(claims, '{user_metadata}', '{}');\n      end if;\n\n      -- Set a claim of 'admin'\n      claims := jsonb_set(claims, '{user_metadata, admin}', 'true');\n\n      -- Update the 'claims' object in the original event\n      event := jsonb_set(event, '{claims}', claims);\n    end if;\n\n    -- Return the modified or original event\n    return event;\n  end;\n$$;\n\ngrant execute\n  on function public.custom_access_token_hook\n  to supabase_auth_admin;\n\nrevoke execute\n  on function public.custom_access_token_hook\n  from authenticated, anon, public;\n\ngrant usage on schema public to supabase_auth_admin;".trim(),
          },
          {
            id: 29,
            type: 'template',
            title: 'Add Auth Hook (General)',
            description: 'Create an Auth Hook',
            sql: '\ncreate or replace function public.custom_access_token_hook(event jsonb)\nreturns jsonb\nlanguage plpgsql\nas $$\ndeclare\n  -- Insert variables here\nbegin\n  -- Insert logic here\n  return event;\nend;\n$$;\n-- Permissions for the hook\ngrant execute on function public.custom_access_token_hook to supabase_auth_admin;\nrevoke execute on function public.custom_access_token_hook from authenticated, anon, public;\n    ',
          },
        ];
      },
      22851: function (e, t, n) {
        'use strict';
        var a, s;
        (n.d(t, {
          U: function () {
            return a;
          },
        }),
          ((s = a || (a = {})).Modification = 'modification'),
          (s.Addition = 'addition'),
          (s.NewSnippet = 'new-snippet'));
      },
      76689: function (e, t, n) {
        'use strict';
        n.d(t, {
          BJ: function () {
            return m;
          },
          EF: function () {
            return p;
          },
          GS: function () {
            return u;
          },
          YI: function () {
            return c;
          },
          c6: function () {
            return h;
          },
          kL: function () {
            return l;
          },
          mw: function () {
            return i;
          },
          se: function () {
            return f;
          },
          tA: function () {
            return o;
          },
          wI: function () {
            return r;
          },
          y4: function () {
            return d;
          },
        });
        var a = n(45536),
          s = n(44840);
        n(22851);
        let r = (e) => {
          let {
            id: t,
            name: n,
            sql: a,
            owner_id: r,
            project_id: i,
            folder_id: o,
          } = e;
          return {
            ...s.su,
            id: t,
            owner_id: r,
            project_id: i,
            name: n,
            folder_id: o,
            favorite: !1,
            inserted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            content: {
              ...s.su.content,
              content_id: null != t ? t : '',
              sql: null != a ? a : '',
            },
          };
        };
        function i(e) {
          let t = (0, a.hj)(e);
          return s._x.some((e) => e.test(t));
        }
        function o(e) {
          let t = RegExp(
            '(?:^|;)\\s*update\\s+(?:"[\\w.]+"\\."[\\w.]+"|[\\w.]+)\\s+set\\s+[\\w\\W]+?(?!\\s*where\\s)',
            'is'
          );
          return e
            .split(';')
            .filter((e) => e.trim().toLowerCase().startsWith('update'))
            .some((e) => t.test(e) && !/where\s/i.test(e));
        }
        let l = function (e, t) {
            let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return '\n'
              .concat(n ? 'npx ' : '', 'supabase snippets download ')
              .concat(e, ' |\n')
              .concat(n ? 'npx ' : '', 'supabase migration new ')
              .concat(t, '\n')
              .trim();
          },
          c = function (e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return '\n'
              .concat(t ? 'npx ' : '', 'supabase snippets download ')
              .concat(e, ' >> \\\n  supabase/seed.sql\n')
              .trim();
          },
          d = function (e, t) {
            let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return '\n'
              .concat(n ? 'npx ' : '', 'supabase snippets download ')
              .concat(e, ' > \\\n  ')
              .concat(t, '.sql\n')
              .trim();
          },
          u = (e) => {
            let t = e.modified.replace(s.eg, '').trim();
            return { original: e.original, modified: ''.concat(t) };
          },
          p = (e) => {
            let t = e.original.replace(s.eg, '').trim(),
              n = e.modified.replace(s.eg, '').trim();
            return {
              original: e.original,
              modified: (t ? t + '\n\n' : '') + n,
            };
          },
          m = (e) => ({ original: '', modified: e.modified }),
          h = function (e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              n = e.trim().replaceAll('\n', ' ').replaceAll(/\s+/g, ' '),
              a = Array(...n.matchAll(/[a-zA-Z]*[0-9]*[;]+/g)),
              s = n.lastIndexOf(';'),
              r = n.includes('--'),
              i = a.length > 1 || (s > 0 && s !== n.length - 1),
              o =
                t > 0 &&
                !r &&
                !i &&
                n.toLowerCase().startsWith('select') &&
                !n.toLowerCase().match(/fetch\s+first/i) &&
                !n.match(/limit$/i) &&
                !n.match(/limit;$/i) &&
                !n.match(/limit [0-9]* offset [0-9]*[;]?$/i) &&
                !n.match(/limit [0-9]*[;]?$/i);
            return { cleanedSql: n, appendAutoLimit: o };
          },
          f = function (e) {
            let t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              { cleanedSql: n, appendAutoLimit: a } = h(e, t);
            return a
              ? n.endsWith(';')
                ? e.replace(/[;]+$/, ' limit '.concat(t, ';'))
                : ''.concat(e, ' limit ').concat(t, ';')
              : e;
          };
      },
      97008: function (e, t, n) {
        'use strict';
        n.d(t, {
          Yx: function () {
            return f;
          },
          iM: function () {
            return x;
          },
        });
        var a = n(198),
          s = n(32691),
          r = n(52983),
          i = n(34549),
          o = n(12436),
          l = n(88971),
          c = n(90817),
          d = n(45536),
          u = n(81514),
          p = n(49825),
          m = n(22851),
          h = n(76689);
        function f() {
          let [e, t] = (0, r.useState)(),
            [n, a] = (0, r.useState)(),
            [s, i] = (0, r.useState)(),
            [o, l] = (0, r.useState)(!1),
            c = !!e,
            d = (0, r.useMemo)(() => {
              if (!e) return { original: '', modified: '' };
              switch (n) {
                case m.U.Modification:
                  return (0, h.GS)(e);
                case m.U.Addition:
                  return (0, h.EF)(e);
                case m.U.NewSnippet:
                  return (0, h.BJ)(e);
                default:
                  return { original: '', modified: '' };
              }
            }, [n, e]),
            u = (0, r.useCallback)(() => {
              (t(void 0), i(void 0), a(void 0));
            }, []);
          return {
            sourceSqlDiff: e,
            setSourceSqlDiff: t,
            selectedDiffType: n,
            setSelectedDiffType: a,
            pendingTitle: s,
            setPendingTitle: i,
            isAcceptDiffLoading: o,
            setIsAcceptDiffLoading: l,
            isDiffOpen: c,
            defaultSqlDiff: d,
            closeDiff: u,
          };
        }
        let g = {
          isOpen: !1,
          selection: '',
          beforeSelection: '',
          afterSelection: '',
          startLineNumber: 0,
          endLineNumber: 0,
        };
        function x() {
          let [e, t] = (0, r.useState)(g),
            [n, a] = (0, r.useState)('');
          return (
            (0, r.useEffect)(() => {
              e.isOpen || a('');
            }, [e.isOpen]),
            {
              promptState: e,
              setPromptState: t,
              promptInput: n,
              setPromptInput: a,
              resetPrompt: () => {
                (t(g), a(''));
              },
            }
          );
        }
        t.ZP = () => {
          let e = (0, s.useRouter)(),
            { ref: t } = (0, o.UO)(),
            { profile: n } = (0, u.Un)(),
            { project: r } = (0, l.d2)(),
            m = (0, p.B0)(),
            f = (0, c.Xo)(a.KA.CREATE, 'user_content', {
              resource: { type: 'sql', owner_id: null == n ? void 0 : n.id },
              subject: { id: null == n ? void 0 : n.id },
            });
          return {
            newQuery: async function (a, s) {
              let o =
                !(arguments.length > 2) ||
                void 0 === arguments[2] ||
                arguments[2];
              if (!t) return console.error('Project ref is required');
              if (!r) return console.error('Project is required');
              if (!n) return console.error('Profile is required');
              if (!f) {
                (0, i.Am)(
                  'Your queries will not be saved as you do not have sufficient permissions'
                );
                return;
              }
              try {
                let i = (0, h.wI)({
                  id: (0, d.k$)(),
                  name: s,
                  sql: a,
                  owner_id: null == n ? void 0 : n.id,
                  project_id: null == r ? void 0 : r.id,
                });
                if (
                  (m.addSnippet({ projectRef: t, snippet: i }),
                  m.addNeedsSaving(i.id),
                  !o)
                )
                  return i.id;
                e.push('/project/'.concat(t, '/sql/').concat(i.id));
                return;
              } catch (e) {
                i.Am.error('Failed to create new query: '.concat(e.message));
                return;
              }
            },
          };
        };
      },
      73652: function (e, t, n) {
        'use strict';
        (n.d(t, {
          De: function () {
            return r;
          },
          Dk: function () {
            return s;
          },
          mU: function () {
            return i;
          },
        }),
          n(26600),
          n(33715),
          n(98775),
          n(55855),
          n(7324),
          n(31118),
          n(65568));
        let a = [
            'count(',
            'sum(',
            'avg(',
            'min(',
            'max(',
            'coalesce(',
            'nullif(',
            'current_timestamp',
            'current_date',
            'length(',
            'lower(',
            'upper(',
            'trim(',
            'substring(',
            'to_char(',
            'to_date(',
            'extract(',
            'date(',
            'date_trunc(',
            'string_agg(',
            'in (',
          ],
          s = (e) => {
            let t = e.toLowerCase().replaceAll('\n', ' ');
            return t.includes('create function') ||
              t.includes('create or replace function')
              ? 'functions'
              : t.includes('create policy') || t.includes('alter policy')
                ? 'rls-policies'
                : void 0;
          },
          r = (e) =>
            (
              e
                .trim()
                .toLowerCase()
                .match(/\w+\s*\(/g) || []
            ).some((e) => !a.some((t) => e.trim().toLowerCase() === t)),
          i = (e) => {
            let t = e.trim().toLowerCase();
            if (!t.startsWith('select')) return !1;
            let n = ['created', 'inserted', 'updated', 'deleted', 'truncate'];
            return !(
              [
                'insert',
                'update',
                'delete',
                'alter',
                'drop',
                'create',
                'replace',
              ].some(
                (e) =>
                  !n.some((n) => t.includes(n) && n.includes(e)) &&
                  t.includes(e)
              ) || r(t)
            );
          };
      },
      15705: function (e, t, n) {
        'use strict';
        n.d(t, {
          x: function () {
            return a;
          },
        });
        let a = {
          is_readonly_mode_enabled: {
            bannerContent: {
              warning: {
                title:
                  'Your project is currently in read-only mode and is no longer accepting write requests',
                description:
                  'You will need to manually override read-only mode and reduce the disk size to below 95%',
              },
              critical: {
                title:
                  'Your project is currently in read-only mode and is no longer accepting write requests',
                description:
                  'You will need to manually override read-only mode and reduce the disk size to below 95%',
              },
            },
            cardContent: {
              warning: {
                title: 'Project is in read-only mode',
                description: 'Database is no longer accepting write requests.',
              },
              critical: {
                title: 'Project is in read-only mode',
                description: 'Database is no longer accepting write requests.',
              },
            },
            docsUrl:
              'https://supabase.com/docs/guides/platform/database-size#disabling-read-only-mode',
            buttonText: 'View Compute and Disk',
            metric: 'read_only',
          },
          disk_io_exhaustion: {
            bannerContent: {
              warning: {
                title:
                  'Your project is about to deplete its Disk IO Budget, and may become unresponsive once fully exhausted',
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
              critical: {
                title:
                  'Your project has depleted its Disk IO Budget, and may become unresponsive',
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
            },
            cardContent: {
              warning: {
                title: 'Project is depleting its Disk IO Budget',
                description: 'It may become unresponsive if fully exhausted',
              },
              critical: {
                title: 'Project has depleted its Disk IO Budget',
                description: 'It may become unresponsive',
              },
            },
            docsUrl:
              'https://supabase.com/docs/guides/troubleshooting/exhaust-disk-io',
            buttonText: 'Check usage',
            metric: 'disk_io',
          },
          disk_space_exhaustion: {
            bannerContent: {
              warning: {
                title:
                  'Your project is about to exhaust its available disk space, and may become unresponsive once fully exhausted',
                description:
                  'You can opt to increase your disk size up to 200GB on the database settings page.',
              },
              critical: {
                title:
                  'Your project has exhausted its available disk space, and may become unresponsive',
                description:
                  'You can opt to increase your disk size up to 200GB on the database settings page.',
              },
            },
            cardContent: {
              warning: {
                title: 'Project is exhausting its available disk space',
                description: 'It may become unresponsive if fully exhausted',
              },
              critical: {
                title: 'Project has exhausted its available disk space',
                description: 'It may become unresponsive',
              },
            },
            docsUrl:
              'https://supabase.com/docs/guides/platform/database-size#disk-management',
            buttonText: void 0,
            metric: 'disk_space',
          },
          cpu_exhaustion: {
            bannerContent: {
              warning: {
                title:
                  'Your project is currently facing high CPU usage, and its performance is affected',
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
              critical: {
                title:
                  "Your project's CPU usage is at 100% and its performance is affected",
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
            },
            cardContent: {
              warning: {
                title: 'Project has high CPU usage',
                description: 'Performance is affected',
              },
              critical: {
                title: 'Project CPU usage is at 100%',
                description: 'Performance is affected',
              },
            },
            docsUrl:
              'https://supabase.com/docs/guides/troubleshooting/high-cpu-usage',
            buttonText: 'Check usage',
            metric: 'cpu',
          },
          memory_and_swap_exhaustion: {
            bannerContent: {
              warning: {
                title:
                  'Your project is currently facing high memory usage, and its performance is affected',
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
              critical: {
                title:
                  "Your project's memory usage is at 100%, and its performance is affected",
                description:
                  'You will need to optimize your performance or upgrade your compute. Check the usage page for more recent and detailed statistics.',
              },
            },
            cardContent: {
              warning: {
                title: 'Project has high memory usage',
                description: 'Performance is affected',
              },
              critical: {
                title: 'Project memory usage is at 100%',
                description: 'Performance is affected',
              },
            },
            docsUrl:
              'https://supabase.com/docs/guides/troubleshooting/exhaust-ram',
            buttonText: 'Check usage',
            metric: 'ram',
          },
          auth_rate_limit_exhaustion: {
            bannerContent: {
              warning: {
                title:
                  'Your project has exceeded email rate limits in the past 24 hours and may not reliably send auth related emails to users',
                description:
                  'Set up a custom SMTP and adjust rate limits where necessary to ensure that emails are sent out reliably.',
              },
              critical: { title: void 0, description: void 0 },
            },
            cardContent: {
              warning: {
                title: 'Your project has exceeded email rate limits',
                description:
                  'You will need to set up a custom SMTP provider and adjust rate limits where necessary',
              },
              critical: { title: void 0, description: void 0 },
            },
            docsUrl:
              'https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits',
            buttonText: 'Enable Custom SMTP',
            metric: 'auth_email_rate_limit',
          },
          multiple_resource_warnings: {
            bannerContent: {
              warning: {
                title:
                  'Your project is currently exhausting multiple resources, and its performance is affected',
                description:
                  "Check which resources are reaching their threshold on your project's usage page.",
              },
              critical: {
                title:
                  'Your project has exhausted multiple resources, and its performance is affected',
                description:
                  "Check which resources have reached their threshold on your project's usage page.",
              },
            },
            cardContent: {
              warning: {
                title: 'Project is exhausting multiple resources',
                description: 'Performance is affected.',
              },
              critical: {
                title: 'Project has exhausted multiple resources',
                description: 'Performance is affected.',
              },
            },
            docsUrl: void 0,
            buttonText: 'Check usage',
            metric: null,
          },
        };
      },
      46482: function (e, t, n) {
        'use strict';
        n.d(t, {
          L: function () {
            return s;
          },
        });
        var a = n(15705);
        let s = (e, t, n) => {
          var s, r;
          if ('is_readonly_mode_enabled' === t)
            return a.x.is_readonly_mode_enabled.cardContent.warning;
          let i = e[t];
          if ('string' == typeof i)
            return null === (r = a.x[t]) || void 0 === r
              ? void 0
              : null === (s = r[n]) || void 0 === s
                ? void 0
                : s[i];
        };
      },
      26600: function (e, t, n) {
        'use strict';
        n.d(t, {
          o: function () {
            return a;
          },
        });
        let a = {
          users: (e, t) => ['projects', e, 'users', ...(t ? [t] : [])],
          usersInfinite: (e, t) => [
            'projects',
            e,
            'users-infinite',
            ...(t ? [t].filter(Boolean) : []),
          ],
          usersCount: (e, t) => [
            'projects',
            e,
            'users-count',
            ...(t ? [t].filter(Boolean) : []),
          ],
          authConfig: (e) => ['projects', e, 'auth-config'],
          accessToken: () => ['access-token'],
        };
      },
      20763: function (e, t, n) {
        'use strict';
        n.d(t, {
          J: function () {
            return d;
          },
        });
        var a = n(36457),
          s = n(64618),
          r = n(34549),
          i = n(6464),
          o = n(71207),
          l = n(3746);
        async function c(e) {
          let { projectRef: t, branchName: n, gitBranch: a, region: s } = e,
            { data: r, error: o } = await (0, i.v_)(
              '/v1/projects/{ref}/branches',
              {
                params: { path: { ref: t } },
                body: { branch_name: n, git_branch: a, region: s },
              }
            );
          return (o && (0, i.S3)(o), r);
        }
        let d = function () {
          let {
              onSuccess: e,
              onError: t,
              ...n
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            i = (0, a.NL)();
          return (0, s.D)((e) => c(e), {
            async onSuccess(t, n, a) {
              let { projectRef: s } = n;
              (await i.invalidateQueries(l.x.list(s)),
                await i.invalidateQueries(o.i.detail(s)),
                await i.invalidateQueries(o.i.list()),
                await (null == e ? void 0 : e(t, n, a)));
            },
            async onError(e, n, a) {
              void 0 === t
                ? r.Am.error('Failed to create branch: '.concat(e.message))
                : t(e, n, a);
            },
            ...n,
          });
        };
      },
      9132: function (e, t, n) {
        'use strict';
        n.d(t, {
          t: function () {
            return c;
          },
        });
        var a = n(68258),
          s = n(36457),
          r = n(28894),
          i = n(6464),
          o = n(59141);
        async function l(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: s } = await (0, i.U2)(
            '/platform/props/project/{ref}/jwt-secret-update-status',
            { params: { path: { ref: n } }, signal: t }
          );
          s && (0, i.S3)(s);
          let r = a.jwtSecretUpdateStatus;
          return r
            ? {
                changeTrackingId: r.change_tracking_id,
                jwtSecretUpdateError: r.error,
                jwtSecretUpdateProgress: r.progress,
                jwtSecretUpdateStatus: r.status,
              }
            : null;
        }
        let c = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...i } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            c = (0, s.NL)();
          return (0, r.a)(
            o.U.jwtSecretUpdatingStatus(t),
            (e) => {
              let { signal: n } = e;
              return l({ projectRef: t }, n);
            },
            {
              enabled: n && void 0 !== t,
              refetchInterval(e) {
                if (!e) return !1;
                let { jwtSecretUpdateStatus: t } = e;
                return t === a.JwtSecretUpdateStatus.Updating && 1e3;
              },
              onSuccess() {
                c.invalidateQueries(o.U.postgrest(t));
              },
              ...i,
            }
          );
        };
      },
      23035: function (e, t, n) {
        'use strict';
        n.d(t, {
          s: function () {
            return o;
          },
        });
        var a = n(28894),
          s = n(6464),
          r = n(59141);
        async function i(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/platform/projects/{ref}/config/postgrest',
            { params: { path: { ref: n } }, signal: t }
          );
          return (r && (0, s.S3)(r), a);
        }
        let o = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            r.U.postgrest(t),
            (e) => {
              let { signal: n } = e;
              return i({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...s }
          );
        };
      },
      81933: function (e, t, n) {
        'use strict';
        n.d(t, {
          D: function () {
            return d;
          },
        });
        var a = n(28894),
          s = n(12436),
          r = n(6464),
          i = n(62432),
          o = n(1940),
          l = n(59141);
        async function c(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: s } = await (0, r.U2)(
            '/v1/projects/{ref}/upgrade/eligibility',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, r.S3)(s), a);
        }
        let d = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...r } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            d = (0, i.N$)(t);
          return (0, a.a)(
            l.U.upgradeEligibility(t),
            (e) => {
              let { signal: n } = e;
              return c({ projectRef: t }, n);
            },
            {
              enabled:
                n &&
                void 0 !== d &&
                d.status === o.S.ACTIVE_HEALTHY &&
                void 0 !== t &&
                s.Qy,
              ...r,
            }
          );
        };
      },
      92907: function (e, t, n) {
        'use strict';
        n.d(t, {
          h: function () {
            return d;
          },
        });
        var a = n(68258),
          s = n(36457),
          r = n(28894),
          i = n(6464),
          o = n(37756),
          l = n(59141);
        async function c(e, t) {
          let { projectRef: n, trackingId: a } = e;
          if (!n) throw Error('projectRef is required');
          let s = {};
          a && (s.tracking_id = a);
          let { data: r, error: o } = await (0, i.U2)(
            '/v1/projects/{ref}/upgrade/status',
            { params: { path: { ref: n }, query: s }, signal: t }
          );
          return (o && (0, i.S3)(o), r);
        }
        let d = function (e) {
          let { projectRef: t, projectStatus: n, trackingId: i } = e,
            { enabled: d = !0, ...u } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            p = (0, s.NL)();
          return (0, r.a)(
            l.U.upgradeStatus(t),
            (e) => {
              let { signal: n } = e;
              return c({ projectRef: t, trackingId: i }, n);
            },
            {
              enabled: d && void 0 !== t,
              refetchInterval(e) {
                var t, s;
                return (
                  !!e &&
                  ((n === o.S.UPGRADING &&
                    (null === (t = e.databaseUpgradeStatus) || void 0 === t
                      ? void 0
                      : t.status) !== a.h.Upgrading) ||
                    (null === (s = e.databaseUpgradeStatus) || void 0 === s
                      ? void 0
                      : s.status) === a.h.Upgrading) &&
                  5e3
                );
              },
              onSuccess(e) {
                var n;
                (null === (n = e.databaseUpgradeStatus) || void 0 === n
                  ? void 0
                  : n.status) === a.h.Upgraded &&
                  p.invalidateQueries(l.U.upgradeEligibility(t));
              },
              ...u,
            }
          );
        };
      },
      52521: function (e, t, n) {
        'use strict';
        n.d(t, {
          R: function () {
            return c;
          },
          T: function () {
            return l;
          },
        });
        var a = n(36457),
          s = n(64618),
          r = n(34549),
          i = n(6464),
          o = n(84437);
        async function l(e, t) {
          let { projectRef: n, payload: a } = e,
            { data: s, error: r } = await (0, i.gz)(
              '/platform/projects/{ref}/content',
              {
                params: { path: { ref: n } },
                body: a,
                headers: { Version: '2' },
                signal: t,
              }
            );
          return (r && (0, i.S3)(r), s);
        }
        let c = function () {
          let {
              onError: e,
              onSuccess: t,
              invalidateQueriesOnSuccess: n = !0,
              ...i
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            c = (0, a.NL)();
          return (0, s.D)((e) => l(e), {
            async onSuccess(e, a, s) {
              let { projectRef: r } = a;
              (n && (await c.invalidateQueries(o.$.allContentLists(r))),
                await (null == t ? void 0 : t(e, a, s)));
            },
            async onError(t, n, a) {
              void 0 === e
                ? r.Am.error('Failed to insert content: '.concat(t.message))
                : e(t, n, a);
            },
            ...i,
          });
        };
      },
      84437: function (e, t, n) {
        'use strict';
        n.d(t, {
          $: function () {
            return a;
          },
        });
        let a = {
          allContentLists: (e) => ['projects', e, 'content'],
          infiniteList: (e, t) => ['projects', e, 'content-infinite', t],
          list: (e, t) => ['projects', e, 'content', t],
          sqlSnippets: (e, t) =>
            ['projects', e, 'content', 'sql', t].filter(Boolean),
          folders: (e, t) =>
            ['projects', e, 'content', 'folders', t].filter(Boolean),
          folderContents: (e, t, n) =>
            ['projects', e, 'content', 'folders', t, n].filter(Boolean),
          resource: (e, t) => ['projects', e, 'content', t],
          count: (e, t, n) =>
            ['projects', e, 'content', 'count', t, n].filter(Boolean),
        };
      },
      85843: function (e, t, n) {
        'use strict';
        n.d(t, {
          P: function () {
            return c;
          },
          b: function () {
            return l;
          },
        });
        var a = n(36457),
          s = n(64618),
          r = n(34549),
          i = n(6464),
          o = n(84437);
        async function l(e, t) {
          let { projectRef: n, name: a, parentId: s } = e,
            r = { name: a };
          s && (r.parentId = s);
          let { data: o, error: l } = await (0, i.v_)(
            '/platform/projects/{ref}/content/folders',
            { params: { path: { ref: n } }, body: r, signal: t }
          );
          if (l) throw (0, i.S3)(l);
          return o;
        }
        let c = function () {
          let {
              onError: e,
              onSuccess: t,
              invalidateQueriesOnSuccess: n = !0,
              ...i
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            c = (0, a.NL)();
          return (0, s.D)((e) => l(e), {
            async onSuccess(e, a, s) {
              let { projectRef: r } = a;
              (n && (await c.invalidateQueries(o.$.folders(r))),
                await (null == t ? void 0 : t(e, a, s)));
            },
            async onError(t, n, a) {
              void 0 === e
                ? r.Am.error('Failed to create folder: '.concat(t.message))
                : e(t, n, a);
            },
            ...i,
          });
        };
      },
      79600: function (e, t, n) {
        'use strict';
        n.d(t, {
          z: function () {
            return l;
          },
        });
        var a = n(28894),
          s = n(6464),
          r = n(37756),
          i = n(29449);
        async function o(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/v1/projects/{ref}/custom-hostname',
            { params: { path: { ref: n } }, signal: t }
          );
          if (r) {
            var i, o;
            if (
              null === (i = r.message) || void 0 === i
                ? void 0
                : i.includes('not allowed to set up custom domain')
            )
              return { customDomain: null, status: '0_not_allowed' };
            if (
              null === (o = r.message) || void 0 === o
                ? void 0
                : o.includes('custom hostname configuration')
            )
              return { customDomain: null, status: '0_no_hostname_configured' };
            (0, s.S3)(r);
          }
          return { customDomain: a.data.result, status: a.status };
        }
        let l = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            i.A.list(t),
            (e) => {
              let { signal: n } = e;
              return o({ projectRef: t }, n);
            },
            { enabled: n && r.Qy && void 0 !== t, ...s }
          );
        };
      },
      29449: function (e, t, n) {
        'use strict';
        n.d(t, {
          A: function () {
            return a;
          },
        });
        let a = { list: (e) => ['projects', e, 'custom-domains'] };
      },
      33715: function (e, t, n) {
        'use strict';
        n.d(t, {
          o: function () {
            return a;
          },
        });
        let a = { list: (e) => ['projects', e, 'database-extensions'] };
      },
      98775: function (e, t, n) {
        'use strict';
        n.d(t, {
          R: function () {
            return a;
          },
        });
        let a = {
          list: (e, t) =>
            ['projects', e, 'database-policies', t].filter(Boolean),
        };
      },
      56819: function (e, t, n) {
        'use strict';
        n.d(t, {
          E: function () {
            return a;
          },
        });
        let a = { databaseRoles: (e) => ['projects', e, 'database-roles'] };
      },
      55855: function (e, t, n) {
        'use strict';
        n.d(t, {
          D: function () {
            return a;
          },
        });
        let a = {
          list: (e) => ['projects', e, 'database-triggers'],
          resource: (e, t) => ['projects', e, 'resources', t],
        };
      },
      37564: function (e, t, n) {
        'use strict';
        n.d(t, {
          s: function () {
            return o;
          },
        });
        var a = n(64618),
          s = n(34549),
          r = n(6464);
        async function i(e) {
          let { ref: t, backup: n } = e,
            { data: a, error: s } = await (0, r.v_)(
              '/platform/database/{ref}/backups/download',
              {
                params: { path: { ref: t } },
                body: {
                  id: n.id,
                  inserted_at: n.inserted_at,
                  project_id: n.project_id,
                  data: {},
                  s3_bucket: 'deprecated',
                  s3_path: 'deprecated',
                  status: 'deprecated',
                },
              }
            );
          return (s && (0, r.S3)(s), a);
        }
        let o = function () {
          let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, a.D)((e) => i(e), {
            async onSuccess(t, n, a) {
              await (null == e ? void 0 : e(t, n, a));
            },
            async onError(e, n, a) {
              void 0 === t
                ? s.Am.error('Failed to download backup: '.concat(e.message))
                : t(e, n, a);
            },
            ...n,
          });
        };
      },
      58015: function (e, t, n) {
        'use strict';
        n.d(t, {
          Q1: function () {
            return c;
          },
          XL: function () {
            return d;
          },
          jc: function () {
            return u;
          },
        });
        var a = n(49437),
          s = n(28894),
          r = n(25878),
          i = n(7324);
        let o = a.Z.schemas.list();
        async function l(e, t) {
          let { projectRef: n, connectionString: a } = e,
            { result: s } = await (0, r.R)(
              {
                projectRef: n,
                connectionString: a,
                sql: o.sql,
                queryKey: ['schemas'],
              },
              t
            );
          return s;
        }
        let c = function (e) {
          let { projectRef: t, connectionString: n } = e,
            { enabled: a = !0, ...r } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, s.a)(
            i.A.schemas(t),
            (e) => {
              let { signal: a } = e;
              return l({ projectRef: t, connectionString: n }, a);
            },
            { enabled: a && void 0 !== t, ...r }
          );
        };
        function d(e, t) {
          return e.invalidateQueries(i.A.schemas(t));
        }
        function u(e, t) {
          let { projectRef: n, connectionString: a } = t;
          return e.fetchQuery(i.A.schemas(n), (e) => {
            let { signal: t } = e;
            return l({ projectRef: n, connectionString: a }, t);
          });
        }
      },
      13672: function (e, t, n) {
        'use strict';
        n.d(t, {
          a: function () {
            return o;
          },
        });
        var a = n(28894),
          s = n(6464);
        let r = (e) => ['projects', e, 'docs'];
        async function i(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/platform/projects/{ref}/api/rest',
            { params: { path: { ref: n } }, signal: t }
          );
          return (r && (0, s.S3)(r), a);
        }
        let o = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            r(t),
            (e) => {
              let { signal: n } = e;
              return i({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...s }
          );
        };
      },
      88020: function (e, t, n) {
        'use strict';
        n.d(t, {
          J: function () {
            return l;
          },
        });
        var a = n(28894),
          s = n(6464),
          r = n(37756),
          i = n(23240);
        async function o(e, t) {
          let { projectRef: n, slug: a } = e;
          if (!n) throw Error('projectRef is required');
          if (!a) throw Error('slug is required');
          let { data: r, error: i } = await (0, s.U2)(
            '/v1/projects/{ref}/functions/{function_slug}',
            { params: { path: { ref: n, function_slug: a } }, signal: t }
          );
          return (i && (0, s.S3)(i), r);
        }
        let l = function (e) {
          let { projectRef: t, slug: n } = e,
            { enabled: s = !0, ...l } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            i.f.detail(t, n),
            (e) => {
              let { signal: a } = e;
              return o({ projectRef: t, slug: n }, a);
            },
            { enabled: r.Qy && s && void 0 !== t && void 0 !== n, ...l }
          );
        };
      },
      7429: function (e, t, n) {
        'use strict';
        n.d(t, {
          I: function () {
            return l;
          },
        });
        var a = n(28894),
          s = n(6464),
          r = n(37756),
          i = n(23240);
        async function o(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/v1/projects/{ref}/functions',
            { params: { path: { ref: n } }, signal: t }
          );
          return (r && (0, s.S3)(r), a);
        }
        let l = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            i.f.list(t),
            (e) => {
              let { signal: n } = e;
              return o({ projectRef: t }, n);
            },
            { enabled: r.Qy && n && void 0 !== t, ...s }
          );
        };
      },
      23240: function (e, t, n) {
        'use strict';
        n.d(t, {
          f: function () {
            return a;
          },
        });
        let a = {
          list: (e) => ['projects', e, 'edge-functions'],
          detail: (e, t) => ['projects', e, 'edge-function', t],
        };
      },
      14520: function (e, t, n) {
        'use strict';
        n.d(t, {
          C: function () {
            return a;
          },
        });
        let a = {
          list: (e, t) => ['projects', e, 'entity-types', ...(t ? [t] : [])],
        };
      },
      31118: function (e, t, n) {
        'use strict';
        n.d(t, {
          P: function () {
            return a;
          },
        });
        let a = { list: (e) => ['projects', e, 'enumerated-types'] };
      },
      5162: function (e, t, n) {
        'use strict';
        n.d(t, {
          s: function () {
            return o;
          },
        });
        var a = n(64618),
          s = n(34549),
          r = n(6464);
        async function i(e, t) {
          let { connectionId: n, branchName: a } = e,
            { data: s, error: i } = await (0, r.U2)(
              '/platform/integrations/github/branches/{connectionId}/{branchName}',
              {
                params: { path: { connectionId: n, branchName: a } },
                signal: t,
              }
            );
          return (i && (0, r.S3)(i), s);
        }
        let o = function () {
          let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, a.D)((e) => i(e), {
            async onSuccess(t, n, a) {
              await (null == e ? void 0 : e(t, n, a));
            },
            async onError(e, n, a) {
              void 0 === t
                ? s.Am.error(
                    'Failed to check Github branch: '.concat(e.message)
                  )
                : t(e, n, a);
            },
            ...n,
          });
        };
      },
      14913: function (e, t, n) {
        'use strict';
        n.d(t, {
          H: function () {
            return o;
          },
        });
        var a = n(28894),
          s = n(6464);
        let r = (e) => ['projects', e, 'open-api-spec'];
        async function i(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/platform/projects/{ref}/api/rest',
            { params: { path: { ref: n } }, signal: t }
          );
          r && (0, s.S3)(r);
          let i = a.definitions
              ? Object.entries(a.definitions).map((e) => {
                  let [t, n] = e;
                  return {
                    ...n,
                    name: t,
                    fields: Object.entries(n.properties || {}).map((e) => {
                      let [t, n] = e;
                      return { ...n, name: t };
                    }),
                  };
                })
              : [],
            o = a.paths
              ? Object.entries(a.paths)
                  .map((e) => {
                    let [t, n] = e;
                    return { ...n, path: t, name: t.replace('/rpc/', '') };
                  })
                  .filter((e) => e.path.includes('/rpc'))
                  .sort((e, t) => e.name.localeCompare(t.name))
              : [];
          return { data: a, tables: i, functions: o };
        }
        let o = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            r(t),
            (e) => {
              let { signal: n } = e;
              return i({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...s }
          );
        };
      },
      35303: function (e, t, n) {
        'use strict';
        n.d(t, {
          J: function () {
            return s;
          },
        });
        var a = n(6464);
        async function s(e, t) {
          let { ref: n, included_schemas: s } = e;
          if (!n) throw Error('Project ref is required');
          let { data: r, error: i } = await (0, a.U2)(
            '/v1/projects/{ref}/types/typescript',
            {
              params: { path: { ref: n }, query: { included_schemas: s } },
              signal: t,
            }
          );
          return (i && (0, a.S3)(i), r);
        }
        n(71207);
      },
      66802: function (e, t, n) {
        'use strict';
        n.d(t, {
          r: function () {
            return f;
          },
        });
        var a = n(36457),
          s = n(64618),
          r = n(34549),
          i = n(33715),
          o = n(98775),
          l = n(56819),
          c = n(55855),
          d = n(7324),
          u = n(14520),
          p = n(31118),
          m = n(65568),
          h = n(25878);
        let f = function () {
            let {
                onSuccess: e,
                onError: t,
                ...n
              } = arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
              i = (0, a.NL)();
            return (0, s.D)((e) => (0, h.R)(e), {
              async onSuccess(t, n, a) {
                let { contextualInvalidation: s, sql: r, projectRef: o } = n;
                if (s && o) {
                  let e = g(o, r);
                  (console.log({ invalidationKeys: e }),
                    await Promise.all(e.map((e) => i.invalidateQueries(e))));
                }
                await (null == e ? void 0 : e(t, n, a));
              },
              async onError(e, n, a) {
                void 0 === t
                  ? r.Am.error('Failed to execute SQL: '.concat(e.message))
                  : t(e, n, a);
              },
              ...n,
            });
          },
          g = (e, t) => {
            let n = [],
              a = t.toLowerCase();
            return (
              (a.includes('create table') ||
                a.includes('alter table') ||
                a.includes('drop table')) &&
                (n.push(u.C.list(e)), n.push(m.W.list(e))),
              (a.includes('create schema') ||
                a.includes('alter schema') ||
                a.includes('drop schema')) &&
                n.push(d.A.schemas(e)),
              (a.includes('create function') ||
                a.includes('alter function') ||
                a.includes('drop function')) &&
                n.push(d.A.databaseFunctions(e)),
              (a.includes('create trigger') ||
                a.includes('alter trigger') ||
                a.includes('drop trigger')) &&
                n.push(c.D.list(e)),
              (a.includes('create policy') ||
                a.includes('alter policy') ||
                a.includes('drop policy')) &&
                n.push(o.R.list(e)),
              (a.includes('create type') ||
                a.includes('alter type') ||
                a.includes('drop type')) &&
                n.push(p.P.list(e)),
              (a.includes('create role') ||
                a.includes('alter role') ||
                a.includes('drop role')) &&
                n.push(l.E.databaseRoles(e)),
              (a.includes('create index') || a.includes('drop index')) &&
                n.push(d.A.indexes(e)),
              (a.includes('create extension') ||
                a.includes('drop extension')) &&
                n.push(i.o.list(e)),
              n
            );
          };
      },
      25878: function (e, t, n) {
        'use strict';
        n.d(t, {
          R: function () {
            return i;
          },
        });
        var a = n(6464);
        n(62432);
        var s = n(37756),
          r = n(99492);
        async function i(e, t, n) {
          var i, o, l;
          let {
            projectRef: c,
            connectionString: d,
            sql: u,
            queryKey: p,
            handleError: m,
            isRoleImpersonationEnabled: h = !1,
          } = e;
          if (!c) throw Error('projectRef is required');
          if (new Blob([u]).size > 0.98 * s.MB)
            throw Error('Query is too large to be run via the SQL Editor');
          let f = new Headers(n);
          d && f.set('x-connection-encrypted', d);
          let { data: g, error: x } = await (0, a.v_)(
            '/platform/pg-meta/{ref}/query',
            {
              signal: t,
              params: {
                header: { 'x-connection-encrypted': null != d ? d : '' },
                path: { ref: c },
                query: {
                  key:
                    null !==
                      (o =
                        null == p
                          ? void 0
                          : p
                              .filter(
                                (e) =>
                                  'string' == typeof e || 'number' == typeof e
                              )
                              .join('-')) && void 0 !== o
                      ? o
                      : '',
                },
              },
              body: { query: u },
              headers: f,
            }
          );
          if (x) {
            if (
              h &&
              'object' == typeof x &&
              null !== x &&
              'error' in x &&
              'formattedError' in x
            ) {
              let e = x,
                t = /LINE (\d+):/im,
                [, n] = null !== (l = t.exec(e.error)) && void 0 !== l ? l : [],
                a = Number(n);
              (isNaN(a) ||
                (e = {
                  ...e,
                  error: e.error.replace(t, 'LINE '.concat(a - r.Yc, ':')),
                  formattedError: e.formattedError.replace(
                    t,
                    'LINE '.concat(a - r.Yc, ':')
                  ),
                }),
                (x = e));
            }
            if (void 0 !== m) return m(x);
            (0, a.S3)(x);
          }
          return h &&
            Array.isArray(g) &&
            (null == g
              ? void 0
              : null === (i = g[0]) || void 0 === i
                ? void 0
                : i[r.$y]) === 1
            ? { result: [] }
            : { result: g };
        }
        n(52791);
      },
      52791: function (e, t, n) {
        'use strict';
        n.d(t, {
          M: function () {
            return a;
          },
        });
        let a = {
          query: (e, t) => ['projects', e, 'query', ...t],
          ongoingQueries: (e) => ['projects', e, 'ongoing-queries'],
        };
      },
      82218: function (e, t, n) {
        'use strict';
        n.d(t, {
          K: function () {
            return c;
          },
        });
        var a = n(28894),
          s = n(6464),
          r = n(62432),
          i = n(37756),
          o = n(21922);
        async function l(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: r } = await (0, s.U2)(
            '/platform/storage/{ref}/buckets',
            { params: { path: { ref: n } }, signal: t }
          );
          return (r && (0, s.S3)(r), a);
        }
        let c = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...s } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            c = (0, r.Vm)(),
            d = (null == c ? void 0 : c.status) === i.S.ACTIVE_HEALTHY;
          return (0, a.a)(
            o.m.buckets(t),
            (e) => {
              let { signal: n } = e;
              return l({ projectRef: t }, n);
            },
            {
              enabled: n && void 0 !== t && d,
              ...s,
              retry: (e, t) =>
                !(
                  'object' == typeof t &&
                  null !== t &&
                  t.message.startsWith('Tenant config') &&
                  t.message.endsWith('not found')
                ) && e < 3,
            }
          );
        };
      },
      21922: function (e, t, n) {
        'use strict';
        n.d(t, {
          m: function () {
            return a;
          },
        });
        let a = {
          buckets: (e) => ['projects', e, 'buckets'],
          archive: (e) => ['projects', e, 'archive'],
        };
      },
      65568: function (e, t, n) {
        'use strict';
        n.d(t, {
          W: function () {
            return a;
          },
        });
        let a = {
          list: (e, t, n) => ['projects', e, 'tables', t, n].filter(Boolean),
        };
      },
      79581: function (e, t, n) {
        'use strict';
        n.d(t, {
          AF: function () {
            return p;
          },
          Bj: function () {
            return u;
          },
          Lk: function () {
            return d;
          },
          o_: function () {
            return m;
          },
        });
        var a = n(28894),
          s = n(36457),
          r = n(71635),
          i = n.n(r),
          o = n(52983),
          l = n(6464),
          c = n(65568);
        async function d(e, t) {
          let {
            projectRef: n,
            connectionString: a,
            schema: s,
            includeColumns: r = !1,
            sortByProperty: o = 'name',
          } = e;
          if (!n) throw Error('projectRef is required');
          let c = new Headers();
          a && c.set('x-connection-encrypted', a);
          let d = { include_columns: ''.concat(r) };
          s && (d.included_schemas = s);
          let { data: u, error: p } = await (0, l.U2)(
            '/platform/pg-meta/{ref}/tables',
            {
              params: {
                header: { 'x-connection-encrypted': a },
                path: { ref: n },
                query: d,
              },
              headers: c,
              signal: t,
            }
          );
          return (!Array.isArray(u) && p && (0, l.S3)(p), Array.isArray(u) && o)
            ? i()(u, (e) => e[o])
            : u;
        }
        let u = function (e) {
          let {
              projectRef: t,
              connectionString: n,
              schema: s,
              includeColumns: r,
            } = e,
            { enabled: i = !0, ...o } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, a.a)(
            c.W.list(t, s, r),
            (e) => {
              let { signal: a } = e;
              return d(
                {
                  projectRef: t,
                  connectionString: n,
                  schema: s,
                  includeColumns: r,
                },
                a
              );
            },
            { enabled: i && void 0 !== t, ...o }
          );
        };
        function p(e) {
          let { projectRef: t, connectionString: n } = e,
            a = (0, s.NL)();
          return (0, o.useCallback)(
            (e, s) =>
              a.fetchQuery({
                queryKey: c.W.list(t, e, s),
                queryFn: (a) => {
                  let { signal: r } = a;
                  return d(
                    {
                      projectRef: t,
                      connectionString: n,
                      schema: e,
                      includeColumns: s,
                    },
                    r
                  );
                },
              }),
            [n, t, a]
          );
        }
        function m(e) {
          let { projectRef: t, connectionString: n } = e,
            a = (0, s.NL)();
          return (0, o.useCallback)(
            (e, s) =>
              a.prefetchQuery({
                queryKey: c.W.list(t, e, s),
                queryFn: (a) => {
                  let { signal: r } = a;
                  return d(
                    {
                      projectRef: t,
                      connectionString: n,
                      schema: e,
                      includeColumns: s,
                    },
                    r
                  );
                },
              }),
            [n, t, a]
          );
        }
      },
      86007: function (e, t, n) {
        'use strict';
        n.d(t, {
          q: function () {
            return l;
          },
        });
        var a = n(28894),
          s = n(12436),
          r = n(6464),
          i = n(5731);
        async function o(e) {
          let { data: t, error: n } = await (0, r.U2)(
            '/platform/projects-resource-warnings',
            { signal: e }
          );
          return (n && (0, r.S3)(n), t);
        }
        let l = function () {
          let { enabled: e = !0, ...t } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (0, a.a)(
            i.Z.resourceWarnings(),
            (e) => {
              let { signal: t } = e;
              return o(t);
            },
            { enabled: s.Qy && e, staleTime: 18e5, ...t }
          );
        };
      },
      87313: function (e, t, n) {
        'use strict';
        n.d(t, {
          l: function () {
            return r;
          },
        });
        var a = n(92261),
          s = n(37756);
        function r(e) {
          let [t, n] = (0, a.l)(s.dA.SQL_EDITOR_AI_SCHEMA(e), ['public']);
          return e ? [t, n] : [[], () => {}];
        }
      },
      37462: function (e, t, n) {
        'use strict';
        n.d(t, {
          _: function () {
            return s;
          },
        });
        var a = n(28053);
        let s = (e) => {
          try {
            return (0, a.WU)(e, {
              language: 'postgresql',
              keywordCase: 'lower',
            });
          } catch (t) {
            return e;
          }
        };
      },
      99492: function (e, t, n) {
        'use strict';
        n.d(t, {
          $y: function () {
            return i;
          },
          Jh: function () {
            return o;
          },
          Wn: function () {
            return u;
          },
          Yc: function () {
            return r;
          },
        });
        var a = n(45536);
        function s(e, t) {
          let n = new Date();
          n.setTime(n.getTime() + 36e5);
          let s = Math.floor(n.getTime() / 1e3),
            r = Math.floor(Date.now() / 1e3);
          if ('authenticated' === t.role) {
            var i, o, l;
            if ('native' === t.userType && t.user) {
              let n = t.user;
              return {
                aal: null !== (i = t.aal) && void 0 !== i ? i : 'aal1',
                amr: [{ method: 'password', timestamp: r }],
                app_metadata: n.raw_app_meta_data,
                aud: 'authenticated',
                email: n.email,
                exp: s,
                iat: r,
                iss: 'https://'.concat(e, '.supabase.co/auth/v1'),
                phone: n.phone,
                role: null !== (o = n.role) && void 0 !== o ? o : t.role,
                session_id: (0, a.k$)(),
                sub: n.id,
                user_metadata: n.raw_user_meta_data,
                is_anonymous: n.is_anonymous,
              };
            }
            if ('external' === t.userType && t.externalAuth)
              return {
                aal: null !== (l = t.aal) && void 0 !== l ? l : 'aal1',
                aud: 'authenticated',
                exp: s,
                iat: r,
                role: 'authenticated',
                session_id: (0, a.k$)(),
                sub: t.externalAuth.sub,
                ...t.externalAuth.additionalClaims,
              };
          }
          return { iss: 'supabase', ref: e, role: t.role, iat: r, exp: s };
        }
        let r = 11,
          i = 'ROLE_IMPERSONATION_NO_RESULTS';
        function o(e, t) {
          var n;
          let { projectRef: a, role: r } = t;
          if (void 0 === r) return e;
          let o =
            'postgrest' === r.type
              ? (function (e, t) {
                  let n = s(e, t);
                  return "\n    select set_config('role', '"
                    .concat(
                      t.role,
                      "', true),\n           set_config('request.jwt.claims', '"
                    )
                    .concat(
                      JSON.stringify(n).replaceAll("'", "''"),
                      "', true),\n           set_config('request.method', 'POST', true),\n           set_config('request.path', '/impersonation-example-request-path', true),\n           set_config('request.headers', '{\"accept\": \"*/*\"}', true);\n  "
                    )
                    .trim();
                })(a, r)
              : ((n = r.role), "\n    set local role '".concat(n, "';\n  "));
          return '\n    '
            .concat(
              o,
              '\n\n    -- If the users sql returns no rows, pg-meta will\n    -- fallback to returning the result of the impersonation sql.\n    select 1 as "'
            )
            .concat(i, '";\n\n    ')
            .concat(e, '\n  ');
        }
        function l(e) {
          return new TextEncoder().encode(e);
        }
        function c(e) {
          return btoa(
            String.fromCharCode(
              ...new Uint8Array('string' == typeof e ? l(e) : e)
            )
          )
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
        async function d(e, t) {
          let n =
              c(l(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))) +
              '.' +
              c(l(JSON.stringify(e))),
            a = c(
              new Uint8Array(
                await window.crypto.subtle.sign(
                  { name: 'HMAC' },
                  await window.crypto.subtle.importKey(
                    'raw',
                    l(t),
                    { name: 'HMAC', hash: 'SHA-256' },
                    !1,
                    ['sign', 'verify']
                  ),
                  l(n)
                )
              )
            );
          return ''.concat(n, '.').concat(a);
        }
        function u(e, t, n) {
          return d(s(e, n), t);
        }
      },
      49825: function (e, t, n) {
        'use strict';
        n.d(t, {
          pB: function () {
            return v;
          },
          Gd: function () {
            return _;
          },
          Fy: function () {
            return w;
          },
          B0: function () {
            return j;
          },
        });
        var a = n(77837),
          s = n.n(a),
          r = n(67997),
          i = n.n(r),
          o = n(34549),
          l = n(28622),
          c = n(34653),
          d = n(17338),
          u = n(52521),
          p = n(84437),
          m = n(85843),
          h = n(6464);
        async function f(e, t) {
          let { projectRef: n, id: a, name: s, parentId: r } = e,
            i = { name: s };
          r && (i.parentId = r);
          let { data: o, error: l } = await (0, h.r$)(
            '/platform/projects/{ref}/content/folders/{id}',
            { params: { path: { ref: n, id: a } }, body: i, signal: t }
          );
          if (l) throw (0, h.S3)(l);
          return o;
        }
        var g = n(54559),
          x = n(52983);
        let y = 'new-folder',
          b = (0, l.sj)({
            folders: {},
            snippets: {},
            results: {},
            needsSaving: (0, d.Yr)([]),
            savingStates: {},
            limit: 100,
            lastUpdatedFolderName: '',
            diffContent: void 0,
            get allFolderNames() {
              return Object.values(b.folders).map((e) => e.folder.name);
            },
            setDiffContent: (e, t) => (b.diffContent = { sql: e, diffType: t }),
            addSnippet: (e) => {
              let { projectRef: t, snippet: n } = e;
              b.snippets[n.id] ||
                ((b.snippets[n.id] = {
                  projectRef: t,
                  splitSizes: [50, 50],
                  snippet: n,
                }),
                (b.results[n.id] = []),
                (b.savingStates[n.id] = 'IDLE'));
            },
            updateSnippet: (e) => {
              let { id: t, snippet: n, skipSave: a = !1 } = e;
              b.snippets[t] &&
                ((b.snippets[t].snippet = { ...b.snippets[t].snippet, ...n }),
                a || b.needsSaving.set(t, !0));
            },
            setSnippet: (e, t) => {
              let n = b.snippets[t.id];
              n
                ? n.snippet.content ||
                  ((n.snippet.content = t.content),
                  b.needsSaving.set(n.snippet.id, !0))
                : b.addSnippet({ projectRef: e, snippet: t });
            },
            setSql: (e, t) => {
              var n;
              let a =
                null === (n = b.snippets[e]) || void 0 === n
                  ? void 0
                  : n.snippet;
              (null == a ? void 0 : a.content) &&
                ((a.content.sql = t), b.needsSaving.set(e, !1));
            },
            renameSnippet: (e) => {
              var t;
              let { id: n, name: a, description: s } = e,
                r =
                  null === (t = b.snippets[n]) || void 0 === t
                    ? void 0
                    : t.snippet;
              r &&
                ((r.name = a), (r.description = s), b.needsSaving.set(n, !0));
            },
            removeSnippet: (e) => {
              let { [e]: t, ...n } = b.snippets;
              b.snippets = n;
              let { [e]: a, ...s } = b.results;
              ((b.results = s), b.needsSaving.delete(e));
            },
            addFolder: (e) => {
              let { projectRef: t, folder: n } = e;
              b.folders[n.id] ||
                (b.folders[n.id] = { projectRef: t, folder: n });
            },
            addNewFolder: (e) => {
              let { projectRef: t } = e;
              b.folders[y] = {
                projectRef: t,
                status: 'editing',
                folder: {
                  id: y,
                  name: '',
                  owner_id: -1,
                  project_id: -1,
                  parent_id: null,
                },
              };
            },
            editFolder: (e) => {
              b.folders[e].status = 'editing';
            },
            saveFolder: (e) => {
              let { id: t, name: n } = e,
                a = b.folders[t],
                s = a.folder.name !== n;
              if ('new-folder' === t && b.allFolderNames.includes(n))
                return (
                  b.removeFolder(t),
                  o.Am.error('This folder name already exists')
                );
              if (s && b.allFolderNames.includes(n))
                return (
                  (a.status = 'idle'),
                  o.Am.error('This folder name already exists')
                );
              let r = a.folder.name.slice();
              ((a.status = s ? 'saving' : 'idle'),
                (a.folder.id = t),
                (a.folder.name = n),
                s && ((b.lastUpdatedFolderName = r), b.needsSaving.set(t, !0)));
            },
            removeFolder: (e) => {
              let { [e]: t, ...n } = b.folders;
              b.folders = n;
            },
            setLimit: (e) => (b.limit = e),
            addNeedsSaving: (e) => b.needsSaving.set(e, !0),
            addFavorite: (e) => {
              let t = b.snippets[e];
              t && ((t.snippet.favorite = !0), b.needsSaving.set(e, !0));
            },
            removeFavorite: (e) => {
              let t = b.snippets[e];
              t.snippet &&
                ((t.snippet.favorite = !1), b.needsSaving.set(e, !0));
            },
            addResult: (e, t, n) => {
              b.results[e] && b.results[e].unshift({ rows: t, autoLimit: n });
            },
            addResultError: (e, t, n) => {
              b.results[e] &&
                b.results[e].unshift({ rows: [], error: t, autoLimit: n });
            },
            resetResult: (e) => {
              b.results[e] && (b.results[e] = []);
            },
          }),
          v = () => (0, l.CO)(b),
          j = (e) => (0, c.R)(b, e),
          _ = (e) => {
            let t = j();
            return (0, x.useMemo)(
              () =>
                Object.values(t.folders)
                  .filter((t) => t.projectRef === e)
                  .map((e) => e.folder),
              [e, t.folders]
            );
          },
          w = (e) => {
            let t = j();
            return (0, x.useMemo)(
              () =>
                Object.values(t.snippets)
                  .filter((t) => t.projectRef === e)
                  .map((e) => e.snippet),
              [e, t.snippets]
            );
          };
        async function N(e, t, n) {
          let a =
            !(arguments.length > 3) || void 0 === arguments[3] || arguments[3];
          try {
            if (
              ((b.savingStates[e] = 'UPDATING'),
              await (0, u.T)({ projectRef: t, payload: n }),
              a)
            ) {
              let e = (0, g.g)();
              await Promise.all([
                e.invalidateQueries(p.$.count(t, 'sql')),
                e.invalidateQueries(p.$.sqlSnippets(t)),
                e.invalidateQueries(p.$.folders(t)),
              ]);
            }
            b.savingStates[e] = 'IDLE';
          } catch (t) {
            b.savingStates[e] = 'UPDATING_FAILED';
          }
        }
        let C = i()((e) => s()(N, 1e3)),
          S = function (e, t, n) {
            let a =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            return C(e)(e, t, n, a);
          };
        async function A(e, t, n) {
          try {
            if (e === y) {
              let e = await (0, m.b)({ projectRef: t, name: n });
              (o.Am.success('Successfully created folder'),
                b.removeFolder(y),
                (b.folders[e.id] = {
                  projectRef: t,
                  status: 'idle',
                  folder: e,
                }));
            } else
              (await f({ projectRef: t, id: e, name: n }),
                o.Am.success('Successfully updated folder'),
                (b.folders[e].status = 'idle'));
          } catch (t) {
            if (
              (o.Am.error('Failed to save folder: '.concat(t.message)),
              t.message.includes('create'))
            )
              b.removeFolder(e);
            else if (
              t.message.includes('update') &&
              b.lastUpdatedFolderName.length > 0
            ) {
              let t = b.folders[e];
              ((t.status = 'idle'), (t.folder.name = b.lastUpdatedFolderName));
            }
          } finally {
            b.lastUpdatedFolderName = '';
          }
        }
        ((0, d.mW)(b, { name: 'sqlEditorStateV2', enabled: !0 }),
          (0, l.Ld)(b.needsSaving, () => {
            let e = v();
            e.needsSaving.forEach((t, n) => {
              let a = e.snippets[n],
                s = e.folders[n];
              if (a) {
                let {
                  name: e,
                  description: s,
                  visibility: r,
                  project_id: i,
                  owner_id: l,
                  folder_id: c,
                  content: d,
                  favorite: u,
                } = a.snippet;
                'project' === r && c
                  ? o.Am.error('Shared snippet cannot be within a folder')
                  : (S(
                      n,
                      a.projectRef,
                      {
                        id: n,
                        type: 'sql',
                        name: null != e ? e : 'Untitled',
                        description: null != s ? s : '',
                        visibility: null != r ? r : 'user',
                        project_id: null != i ? i : 0,
                        owner_id: l,
                        folder_id: null != c ? c : void 0,
                        content: {
                          ...d,
                          content_id: n,
                          favorite: null != u && u,
                        },
                      },
                      t
                    ),
                    b.needsSaving.delete(n));
              } else
                s &&
                  (A(n, s.projectRef, s.folder.name), b.needsSaving.delete(n));
            });
          }));
      },
      77842: function (e, t, n) {
        'use strict';
        var a = n(97458),
          s = n(73565),
          r = n(90839),
          i = n(37756),
          o = n(11757),
          l = n(14035);
        t.Z = (e) => {
          let {
            language: t,
            officialSupport: n,
            docsUrl: c,
            gitUrl: d,
            altIconName: u,
          } = e;
          return (0, a.jsxs)('div', {
            className: 'flex items-start md:space-x-6',
            'data-sentry-component': 'ClientLibrary',
            'data-sentry-source-file': 'ClientLibrary.tsx',
            children: [
              (0, a.jsx)('img', {
                src: ''
                  .concat(i.GW, '/img/libraries/')
                  .concat(
                    u
                      ? ''.concat(u, '-icon.svg')
                      : ''.concat(t.toLowerCase(), '-icon.svg')
                  ),
                alt: ''.concat(t, ' logo'),
                width: '21',
                className: 'hidden md:block',
              }),
              (0, a.jsxs)('div', {
                className: 'space-y-4',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      (0, a.jsx)('img', {
                        src: ''
                          .concat(i.GW, '/img/libraries/')
                          .concat(
                            u
                              ? ''.concat(u, '-icon.svg')
                              : ''.concat(t.toLowerCase(), '-icon.svg')
                          ),
                        alt: ''.concat(t, ' logo'),
                        width: '21',
                        className: 'block md:hidden',
                      }),
                      (0, a.jsxs)('h5', {
                        className:
                          'flex items-center gap-2 text-base text-foreground',
                        children: [
                          t,
                          ' ',
                          !n &&
                            (0, a.jsx)(s.C, {
                              variant: 'brand',
                              children: 'Community',
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)('div', {
                    className: 'flex gap-2',
                    children: [
                      c &&
                        (0, a.jsx)('a', {
                          href: c,
                          target: '_blank',
                          rel: 'noreferrer',
                          children: (0, a.jsx)(r.z, {
                            icon: (0, a.jsx)(o.Z, {}),
                            type: 'default',
                            children: 'Docs',
                          }),
                        }),
                      (0, a.jsx)('a', {
                        href: d,
                        target: '_blank',
                        rel: 'noreferrer',
                        children: (0, a.jsxs)(r.z, {
                          icon: (0, a.jsx)(l.Z, {}),
                          type: 'default',
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'ClientLibrary.tsx',
                          children: [
                            (0, a.jsx)('span', {
                              className: 'hidden md:inline',
                              children: 'See',
                            }),
                            ' GitHub',
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
      },
      29599: function (e, t, n) {
        'use strict';
        var a = n(97458),
          s = n(91587),
          r = n(98809),
          i = n(83145),
          o = n.n(i),
          l = n(12436),
          c = n(30457),
          d = n(82288),
          u = n(75541),
          p = n(37756);
        t.Z = (e) => {
          let { framework: t, title: n, description: i, url: m } = e,
            { resolvedTheme: h } = (0, r.F)(),
            { ref: f } = (0, l.UO)(),
            g = (0, u.l)(),
            { mutate: x } = (0, d.a)();
          return (0, a.jsx)(o(), {
            href: m,
            target: '_blank',
            rel: 'noreferrer',
            onClick: () => {
              var e;
              return x({
                action: c.b.EXAMPLE_PROJECT_CARD_CLICKED,
                properties: { cardTitle: n },
                groups: {
                  project: null != f ? f : 'Unknown',
                  organization:
                    null !== (e = null == g ? void 0 : g.slug) && void 0 !== e
                      ? e
                      : 'Unknown',
                },
              });
            },
            'data-sentry-element': 'Link',
            'data-sentry-component': 'ExampleProject',
            'data-sentry-source-file': 'ExampleProject.tsx',
            children: (0, a.jsxs)('div', {
              className:
                'group relative border bg-surface-100 border-overlay flex h-32 flex-row rounded-md p-4 bg-overlay-hover transition duration-150 ease-in-out',
              children: [
                (0, a.jsx)('div', {
                  className: 'mr-4 flex flex-col',
                  children: (0, a.jsx)('img', {
                    className: 'transition-all group-scale-110',
                    src: ''
                      .concat(p.GW, '/img/libraries/')
                      .concat(t.toLowerCase())
                      .concat(
                        ['expo', 'nextjs'].includes(t.toLowerCase()) &&
                          (null == h ? void 0 : h.includes('dark'))
                          ? '-dark'
                          : '',
                        '-icon.svg'
                      ),
                    alt: ''.concat(t, ' logo'),
                    width: 26,
                    height: 26,
                  }),
                }),
                (0, a.jsxs)('div', {
                  className: 'w-4/5 space-y-2',
                  children: [
                    (0, a.jsx)('h5', {
                      className: 'text-foreground',
                      children: n,
                    }),
                    (0, a.jsx)('p', {
                      className: 'text-sm text-foreground-light',
                      children: i,
                    }),
                  ],
                }),
                (0, a.jsx)('div', {
                  className:
                    ' absolute right-4 top-3 text-foreground-lighter transition-all duration-200 group-right-3 group-text-foreground ',
                  children: (0, a.jsx)(s.Z, {
                    'data-sentry-element': 'ChevronRight',
                    'data-sentry-source-file': 'ExampleProject.tsx',
                  }),
                }),
              ],
            }),
          });
        };
      },
      8561: function (e, t, n) {
        'use strict';
        n.d(t, {
          b: function () {
            return l;
          },
        });
        var a = n(97458),
          s = n(52675),
          r = n(83736),
          i = n(40577),
          o = n(65092);
        let l = (e) => {
          var t, n;
          let {
              icon: l,
              label: c,
              actions: d,
              loading: u = !1,
              draggable: p = !1,
              showDragHandle: m = !1,
              tooltip: h,
              onDragStart: f,
              children: g,
            } = e,
            x = Array.isArray(g)
              ? g.filter(Boolean).filter((e) => !!e.props.children).length > 0
              : !!g;
          return (0, a.jsxs)('div', {
            draggable: p,
            unselectable: p ? 'on' : void 0,
            onDragStart: f,
            className:
              'h-full flex flex-col overflow-hidden bg-surface-100 border-overlay relative rounded border ',
            'data-sentry-component': 'ReportBlockContainer',
            'data-sentry-source-file': 'ReportBlockContainer.tsx',
            children: [
              (0, a.jsxs)(i.u, {
                'data-sentry-element': 'Tooltip',
                'data-sentry-source-file': 'ReportBlockContainer.tsx',
                children: [
                  (0, a.jsx)(i.aJ, {
                    asChild: !0,
                    'data-sentry-element': 'TooltipTrigger',
                    'data-sentry-source-file': 'ReportBlockContainer.tsx',
                    children: (0, a.jsxs)('div', {
                      className: (0, o.cn)(
                        'grid-item-drag-handle flex py-1 pl-3 pr-1 items-center gap-2 z-10 shrink-0 group',
                        p && 'cursor-move'
                      ),
                      children: [
                        (0, a.jsx)('div', {
                          className: (0, o.cn)(
                            m &&
                              'transition-opacity opacity-100 group-opacity-0'
                          ),
                          children: u
                            ? (0, a.jsx)(s.Z, {
                                size:
                                  null !==
                                    (n =
                                      null == l
                                        ? void 0
                                        : null === (t = l.props) || void 0 === t
                                          ? void 0
                                          : t.size) && void 0 !== n
                                    ? n
                                    : 16,
                                className:
                                  'text-foreground-lighter animate-spin',
                              })
                            : l,
                        }),
                        m &&
                          (0, a.jsx)('div', {
                            className:
                              'absolute left-3 top-2.5 z-10 opacity-0 transition-opacity group-opacity-100',
                            children: (0, a.jsx)(r.Z, {
                              size: 16,
                              strokeWidth: 1.5,
                            }),
                          }),
                        (0, a.jsx)('h3', {
                          title: c,
                          className:
                            'text-xs font-medium text-foreground-light flex-1 truncate',
                          children: c,
                        }),
                        (0, a.jsx)('div', {
                          className: 'flex items-center',
                          children: d,
                        }),
                      ],
                    }),
                  }),
                  h &&
                    (0, a.jsx)(i._v, {
                      asChild: !0,
                      side: 'bottom',
                      children: h,
                    }),
                ],
              }),
              (0, a.jsx)('div', {
                className: (0, o.cn)(
                  'flex flex-col flex-grow items-center justify-center',
                  x && 'border-t'
                ),
                children: g,
              }),
            ],
          });
        };
      },
      8959: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return b;
          },
        });
        var a = n(97458),
          s = n(57304),
          r = n(95793),
          i = n(52983),
          o = n(44914),
          l = n(18810),
          c = n(45536),
          d = n(94669),
          u = n(65092),
          p = n(4938),
          m = n(49996),
          h = n(5186),
          f = n(75308),
          g = n(72271);
        let x = (e) => {
          let { column: t, value: n, visible: s, onClose: r } = e,
            [o, l] = (0, i.useState)('view'),
            c =
              null === n
                ? ''
                : 'object' == typeof n
                  ? JSON.stringify(n, null, '	')
                  : String(n),
            d = 'string' == typeof n;
          return (
            (0, i.useEffect)(() => {
              s && l('view');
            }, [s]),
            (0, a.jsx)(g.yo, {
              open: s,
              onOpenChange: () => r(),
              'data-sentry-element': 'Sheet',
              'data-sentry-component': 'CellDetailPanel',
              'data-sentry-source-file': 'CellDetailPanel.tsx',
              children: (0, a.jsxs)(g.ue, {
                size: 'lg',
                className: 'flex flex-col gap-0',
                'data-sentry-element': 'SheetContent',
                'data-sentry-source-file': 'CellDetailPanel.tsx',
                children: [
                  (0, a.jsx)(g.Tu, {
                    className: 'py-2.5',
                    'data-sentry-element': 'SheetHeader',
                    'data-sentry-source-file': 'CellDetailPanel.tsx',
                    children: (0, a.jsxs)(g.bC, {
                      className: 'flex items-center justify-between pr-7',
                      'data-sentry-element': 'SheetTitle',
                      'data-sentry-source-file': 'CellDetailPanel.tsx',
                      children: [
                        (0, a.jsxs)('p', {
                          className: 'truncate',
                          children: [
                            'Viewing cell details on column: ',
                            (0, a.jsx)('code', {
                              className: 'text-sm',
                              children: t,
                            }),
                          ],
                        }),
                        d &&
                          (0, a.jsx)(f.Z, {
                            options: ['MD', 'view'],
                            activeOption: o,
                            borderOverride: 'border-muted',
                            onClickOption: l,
                          }),
                      ],
                    }),
                  }),
                  'view' === o
                    ? (0, a.jsx)('div', {
                        className: 'relative h-full',
                        children: (0, a.jsx)(h.Z, {
                          isReadOnly: !0,
                          id: 'sql-editor-expand-cell',
                          language: 'json',
                          value: c,
                          placeholder: null === n ? 'NULL' : void 0,
                          options: { wordWrap: 'off', contextmenu: !1 },
                        }),
                      })
                    : (0, a.jsx)('div', {
                        className:
                          'flex-grow py-4 px-4 bg-default overflow-y-auto',
                        children: (0, a.jsx)(m.U, {
                          remarkPlugins: [p.Z],
                          className: '!max-w-full markdown-body',
                          content: c,
                        }),
                      }),
                ],
              }),
            })
          );
        };
        function y(e) {
          return null === e
            ? ''
            : 'object' == typeof e || Array.isArray(e)
              ? JSON.stringify(e)
              : e;
        }
        var b = (e) => {
          var t, n, p;
          let { rows: m } = e,
            [h, f] = (0, i.useState)(!1),
            [g, b] = (0, i.useState)(),
            v = () => {
              if (g) {
                var e, t;
                let { rowIdx: n, column: a } = g,
                  s = a.key,
                  r = y(
                    null !==
                      (t =
                        null === (e = m[n]) || void 0 === e ? void 0 : e[s]) &&
                      void 0 !== t
                      ? t
                      : ''
                  );
                (0, c.vQ)(r);
              }
            };
          (0, l.aL)(
            {
              'Command+c': (e) => {
                (e.stopPropagation(), v());
              },
              'Control+c': (e) => {
                (e.stopPropagation(), v());
              },
            },
            ['INPUT', 'TEXTAREA']
          );
          let j = (e, t) =>
              (0, a.jsxs)(d.xV, {
                modal: !1,
                'data-sentry-element': 'ContextMenu_Shadcn_',
                'data-sentry-component': 'formatter',
                'data-sentry-source-file': 'Results.tsx',
                children: [
                  (0, a.jsx)(d.W4, {
                    asChild: !0,
                    'data-sentry-element': 'ContextMenuTrigger_Shadcn_',
                    'data-sentry-source-file': 'Results.tsx',
                    children: (0, a.jsx)('div', {
                      className: (0, u.cn)(
                        'flex items-center h-full font-mono text-xs w-full whitespace-pre',
                        null === t[e] && 'text-foreground-lighter'
                      ),
                      children: null === t[e] ? 'NULL' : JSON.stringify(t[e]),
                    }),
                  }),
                  (0, a.jsxs)(d.h_, {
                    onCloseAutoFocus: (e) => e.stopPropagation(),
                    'data-sentry-element': 'ContextMenuContent_Shadcn_',
                    'data-sentry-source-file': 'Results.tsx',
                    children: [
                      (0, a.jsxs)(d.Zo, {
                        className: 'gap-x-2',
                        onSelect: () => {
                          var n;
                          let a = y(
                            null !== (n = t[e]) && void 0 !== n ? n : ''
                          );
                          (0, c.vQ)(a);
                        },
                        onFocusCapture: (e) => e.stopPropagation(),
                        'data-sentry-element': 'ContextMenuItem_Shadcn_',
                        'data-sentry-source-file': 'Results.tsx',
                        children: [
                          (0, a.jsx)(s.Z, {
                            size: 14,
                            'data-sentry-element': 'Clipboard',
                            'data-sentry-source-file': 'Results.tsx',
                          }),
                          'Copy cell content',
                        ],
                      }),
                      (0, a.jsxs)(d.Zo, {
                        className: 'gap-x-2',
                        onSelect: () => f(!0),
                        onFocusCapture: (e) => e.stopPropagation(),
                        'data-sentry-element': 'ContextMenuItem_Shadcn_',
                        'data-sentry-source-file': 'Results.tsx',
                        children: [
                          (0, a.jsx)(r.Z, {
                            size: 14,
                            'data-sentry-element': 'Expand',
                            'data-sentry-source-file': 'Results.tsx',
                          }),
                          'View cell content',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            _ = (e) =>
              (0, a.jsx)('div', {
                className:
                  'flex h-full items-center justify-center font-mono text-xs',
                'data-sentry-component': 'columnRender',
                'data-sentry-source-file': 'Results.tsx',
                children: e,
              }),
            w = Object.keys(
              null !== (n = null == m ? void 0 : m[0]) && void 0 !== n ? n : []
            ).map((e, t) => {
              let n = m
                .map((t) => String(t[e]).length)
                .reduce((e, t) => Math.max(e, t), 0);
              return {
                idx: t,
                key: e,
                name: e,
                resizable: !0,
                parent: void 0,
                level: 0,
                width: Math.max(Math.min(8.25 * n, 500), 100),
                minWidth: 100,
                maxWidth: void 0,
                draggable: !1,
                frozen: !1,
                sortable: !1,
                isLastFrozenColumn: !1,
                renderCell: (t) => {
                  let { row: n } = t;
                  return j(e, n);
                },
                renderHeaderCell: () => _(e),
              };
            });
          return (0, a.jsx)(a.Fragment, {
            children:
              0 === m.length
                ? (0, a.jsx)('div', {
                    className:
                      'bg-table-header-light [[data-theme*=dark]_&]:bg-table-header-dark',
                    children: (0, a.jsx)('p', {
                      className:
                        'm-0 border-0 px-4 py-3 font-mono text-sm text-foreground-light',
                      children: 'Success. No rows returned',
                    }),
                  })
                : (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsx)(o.ZP, {
                        columns: w,
                        rows: m,
                        className: 'h-full flex-grow border-t-0',
                        rowClass: () => '[&>.rdg-cell]:items-center',
                        onSelectedCellChange: b,
                      }),
                      (0, a.jsx)(x, {
                        column:
                          null !== (p = null == g ? void 0 : g.column.name) &&
                          void 0 !== p
                            ? p
                            : '',
                        value:
                          null == g
                            ? void 0
                            : null === (t = g.row) || void 0 === t
                              ? void 0
                              : t[g.column.name],
                        visible: h,
                        onClose: () => f(!1),
                      }),
                    ],
                  }),
          });
        };
      },
      29589: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return w;
          },
        });
        var a = n(97458),
          s = n(198),
          r = n(32691),
          i = n(52983),
          o = n(34549),
          l = n(25420),
          c = n(88971),
          d = n(24247),
          u = n(36457),
          p = n(64618),
          m = n(6464),
          h = n(71207),
          f = n(61365);
        async function g(e) {
          let { projectRef: t } = e,
            { data: n, error: a } = await (0, m.IV)(
              '/platform/projects/{ref}',
              { params: { path: { ref: t } } }
            );
          return (a && (0, m.S3)(a), n);
        }
        let x = function () {
          let {
              onSuccess: e,
              onError: t,
              ...n
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            a = (0, u.NL)();
          return (0, p.D)((e) => g(e), {
            async onSuccess(t, n, s) {
              (await a.invalidateQueries(h.i.list()),
                n.organizationSlug &&
                  a.invalidateQueries(
                    f.O.freeProjectLimitCheck(n.organizationSlug)
                  ),
                await (null == e ? void 0 : e(t, n, s)));
            },
            async onError(e, n, a) {
              void 0 === t
                ? o.Am.error('Failed to delete project: '.concat(e.message))
                : t(e, n, a);
            },
            ...n,
          });
        };
        var y = n(69951),
          b = n(90817),
          v = n(75541),
          j = n(51571),
          _ = n(60827),
          w = (e) => {
            var t, n;
            let { visible: u, onClose: p } = e,
              m = (0, r.useRouter)(),
              { project: h } = (0, c.d2)(),
              f = (0, v.l)(),
              g = null == h ? void 0 : h.ref,
              { data: w } = (0, y.Gl)({ orgSlug: null == f ? void 0 : f.slug }),
              N =
                'free' ===
                (null !==
                  (n =
                    null == w
                      ? void 0
                      : null === (t = w.plan) || void 0 === t
                        ? void 0
                        : t.id) && void 0 !== n
                  ? n
                  : 'free'),
              [C, S] = (0, i.useState)(''),
              [A, k] = (0, i.useState)([]),
              { mutate: E, isLoading: R } = x({
                onSuccess: async () => {
                  if (!N)
                    try {
                      await L({
                        projectRef: g,
                        message: C,
                        reasons: A.reduce(
                          (e, t) => ''.concat(e, '- ').concat(t, '\n'),
                          ''
                        ),
                        exitAction: 'delete',
                      });
                    } catch (e) {}
                  (o.Am.success(
                    'Successfully deleted '.concat(null == h ? void 0 : h.name)
                  ),
                    m.push('/projects'));
                },
              }),
              { mutateAsync: L, isLoading: I } = (0, d.S)(),
              T = R || I;
            ((0, i.useEffect)(() => {
              u && (k([]), S(''));
            }, [u]),
              (0, b.Xo)(s.KA.UPDATE, 'projects', {
                resource: { project_id: null == h ? void 0 : h.id },
              }));
            let O = (e) => {
              k(
                void 0 === A.find((t) => t === e)
                  ? A.concat([e])
                  : A.filter((t) => t !== e)
              );
            };
            async function P() {
              if (void 0 !== h) {
                if (!N && 0 === A.length)
                  return o.Am.error(
                    'Please select at least one reason for deleting your project'
                  );
                E({
                  projectRef: h.ref,
                  organizationSlug: null == f ? void 0 : f.slug,
                });
              }
            }
            return (0, a.jsx)(a.Fragment, {
              children: (0, a.jsx)(_.Z, {
                visible: u,
                loading: T,
                size: N ? 'small' : 'medium',
                title: 'Confirm deletion of '.concat(
                  null == h ? void 0 : h.name
                ),
                variant: 'destructive',
                alert: {
                  title: N
                    ? 'This action cannot be undone.'
                    : 'This will permanently delete the '.concat(
                        null == h ? void 0 : h.name
                      ),
                  description: N
                    ? ''
                    : 'All project data will be lost, and cannot be undone',
                },
                text: N
                  ? 'This will permanently delete the '.concat(
                      null == h ? void 0 : h.name,
                      ' project and all of its data.'
                    )
                  : void 0,
                confirmPlaceholder: 'Type the project name in here',
                confirmString: (null == h ? void 0 : h.name) || '',
                confirmLabel: 'I understand, delete this project',
                onConfirm: P,
                onCancel: () => {
                  T || p();
                },
                'data-sentry-element': 'TextConfirmModal',
                'data-sentry-source-file': 'DeleteProjectModal.tsx',
                children:
                  !N &&
                  (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsxs)('div', {
                        className: 'space-y-1',
                        children: [
                          (0, a.jsx)('h4', {
                            className: 'text-base',
                            children: 'Help us improve.',
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              'We always strive to improve Supabase as much as we can. Please let us know the reasons you are deleting your project so that we can improve in the future.',
                          }),
                        ],
                      }),
                      (0, a.jsxs)('div', {
                        className: 'space-y-4 pt-4',
                        children: [
                          (0, a.jsx)('div', {
                            className: 'flex flex-wrap gap-2',
                            'data-toggle': 'buttons',
                            children: l.Y.map((e) => {
                              let t = A.find((t) => t === e);
                              return (0, a.jsxs)(
                                'label',
                                {
                                  className: [
                                    'flex cursor-pointer items-center space-x-2 rounded-md py-1',
                                    'pl-2 pr-3 text-center text-sm  transition-all duration-100',
                                    ''.concat(
                                      t
                                        ? ' bg-foreground text-background opacity-100 bg-opacity-75'
                                        : ' bg-border-strong text-foreground opacity-25 opacity-50'
                                    ),
                                  ].join(' '),
                                  children: [
                                    (0, a.jsx)('input', {
                                      type: 'checkbox',
                                      name: 'options',
                                      value: e,
                                      className: 'hidden',
                                      onClick: (e) => O(e.target.value),
                                    }),
                                    (0, a.jsx)('div', { children: e }),
                                  ],
                                },
                                e
                              );
                            }),
                          }),
                          (0, a.jsx)('div', {
                            className: 'text-area-text-sm',
                            children: (0, a.jsx)(j.Z.TextArea, {
                              name: 'message',
                              label: 'Anything else that we can improve on?',
                              rows: 3,
                              value: C,
                              onChange: (e) => S(e.target.value),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
              }),
            });
          };
      },
      12684: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return o;
          },
        });
        var a = n(97458),
          s = n(12436),
          r = n(63621),
          i = n(63278);
        t.C = () => {
          var e;
          let { ref: t } = (0, s.UO)(),
            { data: n, isLoading: l } = (0, i.Sy)(),
            c =
              'default' !== t
                ? null == n
                  ? void 0
                  : null === (e = n.find((e) => e.ref === t)) || void 0 === e
                    ? void 0
                    : e.name
                : 'Welcome to your project';
          return (0, a.jsxs)('div', {
            className: 'w-full mx-auto my-16 space-y-16 max-w-7xl',
            'data-sentry-component': 'LoadingState',
            'data-sentry-source-file': 'LoadingState.tsx',
            children: [
              (0, a.jsx)('div', {
                className: 'flex items-center mx-6 space-x-6',
                children: l
                  ? (0, a.jsx)(r.Z, { className: 'h-9 w-40' })
                  : (0, a.jsx)('h1', { className: 'text-3xl', children: c }),
              }),
              (0, a.jsx)('div', {
                className: 'mx-6',
                children: (0, a.jsx)(o, {
                  'data-sentry-element': 'ProjectUsageLoadingState',
                  'data-sentry-source-file': 'LoadingState.tsx',
                }),
              }),
              (0, a.jsxs)('div', {
                className: 'mx-6 space-y-4',
                children: [
                  (0, a.jsx)(r.Z, {
                    className: 'w-40 h-7',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                  (0, a.jsx)(r.Z, {
                    className: 'w-full h-32',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                ],
              }),
            ],
          });
        };
        let o = () =>
          (0, a.jsxs)('div', {
            className: 'space-y-4',
            'data-sentry-component': 'ProjectUsageLoadingState',
            'data-sentry-source-file': 'LoadingState.tsx',
            children: [
              (0, a.jsx)(r.Z, {
                className: 'w-40 h-7',
                'data-sentry-element': 'ShimmeringLoader',
                'data-sentry-source-file': 'LoadingState.tsx',
              }),
              (0, a.jsxs)('div', {
                className: 'flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8',
                children: [
                  (0, a.jsx)(r.Z, {
                    className: 'w-full h-[304px]',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                  (0, a.jsx)(r.Z, {
                    className: 'w-full h-[304px]',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                  (0, a.jsx)(r.Z, {
                    className: 'w-full h-[304px]',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                  (0, a.jsx)(r.Z, {
                    className: 'w-full h-[304px]',
                    'data-sentry-element': 'ShimmeringLoader',
                    'data-sentry-source-file': 'LoadingState.tsx',
                  }),
                ],
              }),
            ],
          });
      },
      15731: function (e, t, n) {
        'use strict';
        n.d(t, {
          $: function () {
            return el;
          },
        });
        var a = n(97458),
          s = n(78751),
          r = n(198),
          i = n(36457),
          o = n(28977),
          l = n.n(o),
          c = n(81879),
          d = n(4839),
          u = n(83145),
          p = n.n(u),
          m = n(52983),
          h = n(86848),
          f = n(34549),
          g = n(5394),
          x = n(12436),
          y = n(5529),
          b = n(359),
          v = n(28894),
          j = n(6464),
          _ = n(59141);
        async function w(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: s } = await (0, j.U2)(
            '/platform/projects/{ref}/restore/versions',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, j.S3)(s), a);
        }
        let N = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, v.a)(
            _.U.projectUnpausePostgresVersions(t),
            (e) => {
              let { signal: n } = e;
              return w({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
        var C = n(99997),
          S = n(71207);
        async function A(e, t) {
          let { ref: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: a, error: s } = await (0, j.U2)(
            '/platform/projects/{ref}/pause/status',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, j.S3)(s), a);
        }
        let k = function (e) {
          let { ref: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, v.a)(
            S.i.pauseStatus(t),
            (e) => {
              let { signal: n } = e;
              return A({ ref: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
        var E = n(64618);
        async function R(e) {
          let { ref: t, postgresEngine: n, releaseChannel: a } = e,
            { data: s, error: r } = await (0, j.v_)(
              '/platform/projects/{ref}/restore',
              {
                params: { path: { ref: t } },
                body: { postgres_engine: n, release_channel: a },
              }
            );
          return (r && (0, j.S3)(r), s);
        }
        let L = function () {
          let {
            onSuccess: e,
            onError: t,
            ...n
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return (0, E.D)((e) => R(e), {
            async onSuccess(t, n, a) {
              await (null == e ? void 0 : e(t, n, a));
            },
            async onError(e, n, a) {
              void 0 === t
                ? f.Am.error('Failed to restore project: '.concat(e.message))
                : t(e, n, a);
            },
            ...n,
          });
        };
        var I = n(63278),
          T = n(69951),
          O = n(90817),
          P = n(75541),
          B = n(21786),
          F = n(37756),
          z = n(10947),
          D = n(90839),
          U = n(42155),
          M = n(49142),
          Z = n(22714),
          q = n(73565),
          W = n(78366),
          Y = n(89129),
          H = n(29790),
          G = n(98601),
          V = n(85071),
          X = n(37564),
          K = n(21922);
        let $ = async (e) => {
          let { projectRef: t } = e;
          if (!t) throw Error('projectRef is required');
          let { data: n, error: a } = await (0, j.v_)(
            '/platform/storage/{ref}/archive',
            { params: { path: { ref: t } } }
          );
          return (a && (0, j.S3)(a), n);
        };
        async function Q(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('projectRef is required');
          let { data: a, error: s } = await (0, j.U2)(
            '/platform/storage/{ref}/archive',
            { params: { path: { ref: n } }, signal: t }
          );
          if (s) {
            var r;
            if (
              null == s
                ? void 0
                : null === (r = s.message) || void 0 === r
                  ? void 0
                  : r.includes('Storage archive not found')
            )
              return { fileUrl: void 0 };
            (0, j.S3)(s);
          }
          return a;
        }
        let J = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, v.a)(
            K.m.archive(t),
            (e) => {
              let { signal: n } = e;
              return Q({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
        var ee = n(1846),
          et = n(7756),
          en = n(14500),
          ea = n(88971);
        let es = () => {
            var e, t;
            let { ref: n } = (0, x.UO)(),
              { project: s } = (0, ea.d2)(),
              [r, o] = (0, m.useState)(),
              [l, c] = (0, m.useState)(!1),
              u =
                null == s
                  ? void 0
                  : null === (e = s.dbVersion) || void 0 === e
                    ? void 0
                    : e.replace('supabase-postgres-', ''),
              p = (0, B.P)('enforceNinetyDayUnpauseExpiry'),
              h = (0, B.P)('enableNinetyDayStorageDownload'),
              { data: g } = k(
                { ref: n },
                {
                  enabled:
                    (null == s ? void 0 : s.status) === F.S.INACTIVE && p,
                }
              ),
              y = null == g ? void 0 : g.latest_downloadable_backup_id,
              { data: b } = J(
                { projectRef: n },
                {
                  refetchInterval: l,
                  refetchOnWindowFocus: !1,
                  onSuccess: (e) => {
                    e.fileUrl &&
                      !1 !== l &&
                      (f.Am.success('Downloading storage objects', { id: r }),
                      o(void 0),
                      c(!1),
                      N(e.fileUrl));
                  },
                }
              ),
              v = null == b ? void 0 : b.fileUrl,
              { mutate: j } = (0, X.s)({
                onSuccess: (e) => {
                  let { fileUrl: t } = e,
                    n = document.createElement('a');
                  ((n.href = t),
                    document.body.appendChild(n),
                    n.click(),
                    document.body.removeChild(n));
                },
              }),
              { mutate: _ } = (function () {
                let {
                    onSuccess: e,
                    onError: t,
                    ...n
                  } = arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                  a = (0, i.NL)();
                return (0, E.D)((e) => $(e), {
                  async onSuccess(t, n, s) {
                    let { projectRef: r } = n;
                    (await a.invalidateQueries(K.m.archive(r)),
                      await (null == e ? void 0 : e(t, n, s)));
                  },
                  async onError(e, n, a) {
                    void 0 === t
                      ? f.Am.error(
                          'Failed to create storage archive: '.concat(e.message)
                        )
                      : t(e, n, a);
                  },
                  ...n,
                });
              })({
                onSuccess: () => {
                  (o(
                    f.Am.loading(
                      'Retrieving storage archive. This may take a few minutes depending on the size of your storage objects.'
                    )
                  ),
                    c(5e3));
                },
              }),
              w = () => {
                if (void 0 === n)
                  return console.error('Project ref is required');
                if (!y) return f.Am.error('No backups available for download');
                let e = f.Am.loading('Fetching database backup');
                j(
                  {
                    ref: n,
                    backup: {
                      id: y,
                      project_id: -1,
                      inserted_at: '',
                      isPhysicalBackup: !1,
                      status: {},
                    },
                  },
                  {
                    onSuccess: () => {
                      f.Am.success('Downloading database backup', { id: e });
                    },
                  }
                );
              },
              N = (e) => {
                let t = document.createElement('a');
                ((t.href = e),
                  document.body.appendChild(t),
                  t.click(),
                  document.body.removeChild(t));
              },
              C = () => {
                v
                  ? (f.Am.success('Downloading storage objects'), N(v))
                  : _({ projectRef: n });
              };
            return (0, a.jsxs)(z.bZ, {
              variant: 'warning',
              'data-sentry-element': 'Alert_Shadcn_',
              'data-sentry-component': 'PauseDisabledState',
              'data-sentry-source-file': 'PauseDisabledState.tsx',
              children: [
                (0, a.jsx)(et.aN, {
                  'data-sentry-element': 'WarningIcon',
                  'data-sentry-source-file': 'PauseDisabledState.tsx',
                }),
                (0, a.jsx)(z.Cd, {
                  'data-sentry-element': 'AlertTitle_Shadcn_',
                  'data-sentry-source-file': 'PauseDisabledState.tsx',
                  children: 'Project cannot be restored through the dashboard',
                }),
                (0, a.jsxs)(z.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'PauseDisabledState.tsx',
                  children: [
                    'This project has been paused for over',
                    ' ',
                    (0, a.jsxs)('span', {
                      className: 'text-foreground',
                      children: [
                        null !==
                          (t =
                            null == g
                              ? void 0
                              : g.max_days_till_restore_disabled) &&
                        void 0 !== t
                          ? t
                          : 90,
                        ' days',
                      ],
                    }),
                    ' ',
                    'and cannot be restored through the dashboard. However, your data remains intact and can be downloaded as a backup.',
                  ],
                }),
                (0, a.jsxs)(z.X, {
                  className: 'flex items-center gap-x-2 mt-3',
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'PauseDisabledState.tsx',
                  children: [
                    (0, a.jsxs)(en.h_, {
                      'data-sentry-element': 'DropdownMenu',
                      'data-sentry-source-file': 'PauseDisabledState.tsx',
                      children: [
                        (0, a.jsx)(en.$F, {
                          asChild: !0,
                          'data-sentry-element': 'DropdownMenuTrigger',
                          'data-sentry-source-file': 'PauseDisabledState.tsx',
                          children: (0, a.jsx)(D.z, {
                            type: 'default',
                            icon: (0, a.jsx)(H.Z, {}),
                            iconRight: (0, a.jsx)(G.Z, {}),
                            'data-sentry-element': 'Button',
                            'data-sentry-source-file': 'PauseDisabledState.tsx',
                            children: 'Download backups',
                          }),
                        }),
                        (0, a.jsxs)(en.AW, {
                          className: 'w-56',
                          align: 'start',
                          'data-sentry-element': 'DropdownMenuContent',
                          'data-sentry-source-file': 'PauseDisabledState.tsx',
                          children: [
                            (0, a.jsxs)(V._, {
                              className: 'gap-x-2',
                              disabled: !y,
                              onClick: () => w(),
                              tooltip: {
                                content: {
                                  side: 'right',
                                  text: 'No backups available, please reach out via support for assistance',
                                },
                              },
                              'data-sentry-element': 'DropdownMenuItemTooltip',
                              'data-sentry-source-file':
                                'PauseDisabledState.tsx',
                              children: [
                                (0, a.jsx)(ee.vo, {
                                  size: 16,
                                  'data-sentry-element': 'Database',
                                  'data-sentry-source-file':
                                    'PauseDisabledState.tsx',
                                }),
                                'Database backup (PG: ',
                                u,
                                ')',
                              ],
                            }),
                            (0, a.jsxs)(V._, {
                              className: 'gap-x-2',
                              disabled: !h,
                              onClick: () => C(),
                              tooltip: {
                                content: {
                                  side: 'right',
                                  text: 'This feature is not available yet, please reach out to support for assistance',
                                },
                              },
                              'data-sentry-element': 'DropdownMenuItemTooltip',
                              'data-sentry-source-file':
                                'PauseDisabledState.tsx',
                              children: [
                                (0, a.jsx)(ee.Ke, {
                                  size: 16,
                                  'data-sentry-element': 'Storage',
                                  'data-sentry-source-file':
                                    'PauseDisabledState.tsx',
                                }),
                                'Storage objects',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(D.z, {
                      asChild: !0,
                      type: 'default',
                      icon: (0, a.jsx)(d.Z, {}),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'PauseDisabledState.tsx',
                      children: (0, a.jsx)('a', {
                        target: '_blank',
                        rel: 'noreferrer',
                        href: 'https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects#time-limits',
                        children: 'More information',
                      }),
                    }),
                  ],
                }),
              ],
            });
          },
          er = () =>
            (0, a.jsxs)(z.bZ, {
              'data-sentry-element': 'Alert_Shadcn_',
              'data-sentry-component': 'RestorePaidPlanProjectNotice',
              'data-sentry-source-file': 'RestorePaidPlanProjectNotice.tsx',
              children: [
                (0, a.jsx)(et.aN, {
                  'data-sentry-element': 'WarningIcon',
                  'data-sentry-source-file': 'RestorePaidPlanProjectNotice.tsx',
                }),
                (0, a.jsx)(z.Cd, {
                  'data-sentry-element': 'AlertTitle_Shadcn_',
                  'data-sentry-source-file': 'RestorePaidPlanProjectNotice.tsx',
                  children:
                    'Project will count towards compute usage once restored',
                }),
                (0, a.jsx)(z.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'RestorePaidPlanProjectNotice.tsx',
                  children:
                    'For every hour your instance is active, we will bill you based on the compute size of your project.',
                }),
                (0, a.jsx)(z.X, {
                  className: 'mt-3',
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'RestorePaidPlanProjectNotice.tsx',
                  children: (0, a.jsx)(D.z, {
                    asChild: !0,
                    type: 'default',
                    icon: (0, a.jsx)(d.Z, {}),
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file':
                      'RestorePaidPlanProjectNotice.tsx',
                    children: (0, a.jsx)('a', {
                      href: 'https://supabase.com/docs/guides/platform/manage-your-usage/compute',
                      target: '_blank',
                      rel: 'noreferrer',
                      children: 'More information',
                    }),
                  }),
                }),
              ],
            }),
          ei = (e) => {
            let { postgres_engine: t, release_channel: n } = e;
            return ''.concat(t, '|').concat(n);
          },
          eo = (e) => {
            let [t, n] = e.split('|');
            return { postgresEngine: t, releaseChannel: n };
          },
          el = (e) => {
            var t, n, o, u, v;
            let { product: j } = e,
              { ref: _ } = (0, x.UO)(),
              w = (0, i.NL)(),
              { project: S } = (0, ea.d2)(),
              A = (0, P.l)(),
              E = (0, B.P)('enforceNinetyDayUnpauseExpiry'),
              R = (0, B.P)('disableProjectVersionSelection'),
              H = (0, B.O)('proBenefitWording'),
              G = null == A ? void 0 : A.slug,
              { data: V } = (0, T.Gl)({ orgSlug: G }),
              {
                data: X,
                error: K,
                isError: $,
                isSuccess: Q,
                isLoading: J,
              } = k(
                { ref: _ },
                {
                  enabled:
                    (null == S ? void 0 : S.status) === F.S.INACTIVE && E,
                }
              ),
              ee =
                null !==
                  (o =
                    null !==
                      (n =
                        null == X
                          ? void 0
                          : X.remaining_days_till_restore_disabled) &&
                    void 0 !== n
                      ? n
                      : null == X
                        ? void 0
                        : X.max_days_till_restore_disabled) && void 0 !== o
                  ? o
                  : 0,
              et =
                (null == V
                  ? void 0
                  : null === (t = V.plan) || void 0 === t
                    ? void 0
                    : t.id) === 'free',
              en = E && Q && !X.can_restore,
              { data: el } = (0, C.u)({ slug: G }, { enabled: et }),
              { data: ec } = N({ projectRef: null == S ? void 0 : S.ref }),
              ed = (null == ec ? void 0 : ec.available_versions) || [],
              eu = (el || []).length > 0,
              [ep, em] = (0, m.useState)(!1),
              [eh, ef] = (0, m.useState)(!1),
              { mutate: eg, isLoading: ex } = L({
                onSuccess: (e, t) => {
                  ((0, I.k7)(w, t.ref, F.S.RESTORING),
                    f.Am.success('Restoring project'));
                },
              }),
              ey = (0, O.Xo)(
                r.KA.INFRA_EXECUTE,
                'queue_jobs.projects.initialize_or_resume'
              ),
              eb = async (e) => {
                if (!S)
                  return f.Am.error('Unable to restore: project is required');
                if (R) eg({ ref: S.ref });
                else {
                  let { postgresVersionSelection: t } = e,
                    n = eo(t);
                  eg({
                    ref: S.ref,
                    releaseChannel: n.releaseChannel,
                    postgresEngine: n.postgresEngine,
                  });
                }
              },
              ev = g.z.object({ postgresVersionSelection: g.z.string() }),
              ej = (0, h.cI)({
                resolver: (0, s.F)(ev),
                mode: 'onChange',
                defaultValues: { postgresVersionSelection: '' },
              });
            return (
              (0, m.useEffect)(() => {
                let e = (null == ec ? void 0 : ec.available_versions[0])
                  ? ei(null == ec ? void 0 : ec.available_versions[0])
                  : '';
                ej.setValue('postgresVersionSelection', e);
              }, [ec, ej]),
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)('div', {
                    className: 'space-y-4',
                    children: (0, a.jsx)('div', {
                      className: 'w-full mx-auto mb-8 md:mb-16 max-w-7xl',
                      children: (0, a.jsx)('div', {
                        className:
                          'mx-6 flex md:h-[500px] items-center justify-center rounded border border-overlay bg-surface-100 p-4 md:p-8',
                        children: (0, a.jsxs)('div', {
                          className: 'grid w-[550px] gap-4',
                          children: [
                            (0, a.jsx)('div', {
                              className:
                                'mx-auto flex max-w-[300px] items-center justify-center space-x-4 lg:space-x-8',
                              children: (0, a.jsx)(c.Z, {
                                className: 'text-foreground-light',
                                size: 50,
                                strokeWidth: 1.5,
                                'data-sentry-element': 'PauseCircle',
                                'data-sentry-source-file':
                                  'ProjectPausedState.tsx',
                              }),
                            }),
                            (0, a.jsxs)('div', {
                              className: 'flex flex-col gap-y-2',
                              children: [
                                (0, a.jsxs)('div', {
                                  className: 'flex flex-col gap-y-1',
                                  children: [
                                    (0, a.jsxs)('p', {
                                      className: 'text-center',
                                      children: [
                                        'The project "',
                                        null !==
                                          (u = null == S ? void 0 : S.name) &&
                                        void 0 !== u
                                          ? u
                                          : '',
                                        '" is currently paused.',
                                      ],
                                    }),
                                    (0, a.jsxs)('p', {
                                      className:
                                        'text-sm text-foreground-light text-center',
                                      children: [
                                        "All of your project's data is still intact, but your project is inaccessible while paused.",
                                        ' ',
                                        void 0 !== j
                                          ? (0, a.jsxs)(a.Fragment, {
                                              children: [
                                                'Restore this project to access the',
                                                ' ',
                                                (0, a.jsx)('span', {
                                                  className: 'text-brand',
                                                  children: j,
                                                }),
                                                ' page',
                                              ],
                                            })
                                          : 'Restore this project and get back to building!',
                                      ],
                                    }),
                                  ],
                                }),
                                E &&
                                  (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      J && (0, a.jsx)(Y.A, {}),
                                      $ &&
                                        (0, a.jsx)(y.Z, {
                                          error: K,
                                          subject:
                                            'Failed to retrieve pause status',
                                        }),
                                      Q &&
                                        (0, a.jsx)(a.Fragment, {
                                          children: en
                                            ? (0, a.jsx)(es, {})
                                            : et
                                              ? (0, a.jsxs)(a.Fragment, {
                                                  children: [
                                                    (0, a.jsx)('p', {
                                                      className:
                                                        'text-sm text-foreground-light text-center',
                                                      children:
                                                        'variant-a' === H
                                                          ? 'Upgrade to Pro plan to prevent future pauses and use Pro features like branching, compute upgrades, and daily backups.'
                                                          : 'To prevent future pauses, consider upgrading to Pro.',
                                                    }),
                                                    (0, a.jsxs)(z.bZ, {
                                                      children: [
                                                        (0, a.jsxs)(z.Cd, {
                                                          children: [
                                                            'Project can be restored through the dashboard within the next',
                                                            ' ',
                                                            ee,
                                                            ' day',
                                                            ee > 1 ? 's' : '',
                                                          ],
                                                        }),
                                                        (0, a.jsxs)(z.X, {
                                                          children: [
                                                            'Free projects cannot be restored through the dashboard if they are paused for more than',
                                                            ' ',
                                                            (0, a.jsxs)(
                                                              'span',
                                                              {
                                                                className:
                                                                  'text-foreground',
                                                                children: [
                                                                  null == X
                                                                    ? void 0
                                                                    : X.max_days_till_restore_disabled,
                                                                  ' days',
                                                                ],
                                                              }
                                                            ),
                                                            '. The latest that your project can be restored is by',
                                                            ' ',
                                                            (0, a.jsx)('span', {
                                                              className:
                                                                'text-foreground',
                                                              children: l()()
                                                                .utc()
                                                                .add(
                                                                  null !==
                                                                    (v =
                                                                      X.remaining_days_till_restore_disabled) &&
                                                                    void 0 !== v
                                                                    ? v
                                                                    : 0,
                                                                  'day'
                                                                )
                                                                .format(
                                                                  'DD MMM YYYY'
                                                                ),
                                                            }),
                                                            '. However, your database backup and Storage objects will still be available for download thereafter.',
                                                          ],
                                                        }),
                                                        (0, a.jsx)(z.X, {
                                                          className: 'mt-3',
                                                          children: (0, a.jsx)(
                                                            D.z,
                                                            {
                                                              asChild: !0,
                                                              type: 'default',
                                                              icon: (0, a.jsx)(
                                                                d.Z,
                                                                {}
                                                              ),
                                                              children: (0,
                                                              a.jsx)('a', {
                                                                target:
                                                                  '_blank',
                                                                rel: 'noreferrer',
                                                                href: 'https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects#time-limits',
                                                                children:
                                                                  'More information',
                                                              }),
                                                            }
                                                          ),
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                })
                                              : (0, a.jsx)(er, {}),
                                        }),
                                    ],
                                  }),
                                !E && !et && (0, a.jsx)(er, {}),
                              ],
                            }),
                            (!E || (Q && !en)) &&
                              (0, a.jsxs)('div', {
                                className:
                                  'flex items-center justify-center gap-4',
                                children: [
                                  (0, a.jsx)(b.u, {
                                    size: 'tiny',
                                    type: 'default',
                                    disabled: !ey,
                                    onClick: () => {
                                      ey
                                        ? eu
                                          ? ef(!0)
                                          : em(!0)
                                        : f.Am.error(
                                            'You do not have the required permissions to restore this project'
                                          );
                                    },
                                    tooltip: {
                                      content: {
                                        side: 'bottom',
                                        text: ey
                                          ? void 0
                                          : 'You need additional permissions to resume this project',
                                      },
                                    },
                                    children: 'Restore project',
                                  }),
                                  et
                                    ? (0, a.jsx)(D.z, {
                                        asChild: !0,
                                        type: 'primary',
                                        children: (0, a.jsx)(p(), {
                                          href: '/org/'.concat(
                                            G,
                                            '/billing?panel=subscriptionPlan&source=projectPausedStateRestore'
                                          ),
                                          children: 'Upgrade to Pro',
                                        }),
                                      })
                                    : (0, a.jsx)(D.z, {
                                        asChild: !0,
                                        type: 'default',
                                        children: (0, a.jsx)(p(), {
                                          href: '/project/'.concat(
                                            _,
                                            '/settings/general'
                                          ),
                                          children: 'View project settings',
                                        }),
                                      }),
                                ],
                              }),
                          ],
                        }),
                      }),
                    }),
                  }),
                  (0, a.jsx)(U.Z, {
                    hideFooter: !0,
                    visible: ep,
                    size: 'small',
                    title: 'Restore this project',
                    description:
                      "Confirm to restore this project? Your project's data will be restored to when it was initially paused.",
                    onCancel: () => em(!1),
                    header: 'Restore this project',
                    'data-sentry-element': 'Modal',
                    'data-sentry-source-file': 'ProjectPausedState.tsx',
                    children: (0, a.jsx)(M.l0, {
                      ...ej,
                      'data-sentry-element': 'Form_Shadcn_',
                      'data-sentry-source-file': 'ProjectPausedState.tsx',
                      children: (0, a.jsxs)('form', {
                        onSubmit: ej.handleSubmit(eb),
                        children: [
                          !R &&
                            (0, a.jsx)(U.Z.Content, {
                              children: (0, a.jsx)('div', {
                                className: 'space-y-2',
                                children: (0, a.jsx)(M.Wi, {
                                  control: ej.control,
                                  name: 'postgresVersionSelection',
                                  render: (e) => {
                                    let { field: t } = e;
                                    return (0, a.jsx)(W.E, {
                                      label:
                                        'Select the version of Postgres to restore to',
                                      children: (0, a.jsx)(M.NI, {
                                        children: (0, a.jsxs)(Z.Ph, {
                                          value: t.value,
                                          onValueChange: t.onChange,
                                          disabled: ed.length <= 1,
                                          children: [
                                            (0, a.jsx)(Z.i4, {
                                              className:
                                                '[&>:nth-child(1)]:w-full [&>:nth-child(1)]:flex [&>:nth-child(1)]:items-start',
                                              children: (0, a.jsx)(Z.ki, {
                                                placeholder:
                                                  'Select a Postgres version',
                                              }),
                                            }),
                                            (0, a.jsx)(Z.Bw, {
                                              children: (0, a.jsx)(Z.DI, {
                                                children: ed.map((e) => {
                                                  var t;
                                                  let n =
                                                    null ===
                                                      (t =
                                                        e.version.split(
                                                          'supabase-postgres-'
                                                        )[1]) || void 0 === t
                                                      ? void 0
                                                      : t.replace(
                                                          '-orioledb',
                                                          ''
                                                        );
                                                  return (0, a.jsx)(
                                                    Z.Ql,
                                                    {
                                                      value: ei(e),
                                                      className:
                                                        'w-full [&>:nth-child(2)]:w-full',
                                                      children: (0, a.jsxs)(
                                                        'div',
                                                        {
                                                          className:
                                                            'flex flex-row items-center justify-between w-full',
                                                          children: [
                                                            (0, a.jsx)('span', {
                                                              className:
                                                                'text-foreground',
                                                              children: n,
                                                            }),
                                                            (0, a.jsxs)('div', {
                                                              children: [
                                                                'ga' !==
                                                                  e.release_channel &&
                                                                  (0, a.jsx)(
                                                                    q.C,
                                                                    {
                                                                      variant:
                                                                        'warning',
                                                                      className:
                                                                        'mr-1 capitalize',
                                                                      children:
                                                                        e.release_channel,
                                                                    }
                                                                  ),
                                                                e.postgres_engine.includes(
                                                                  'oriole-preview'
                                                                ) &&
                                                                  (0, a.jsxs)(
                                                                    'span',
                                                                    {
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          a.jsx)(
                                                                            q.C,
                                                                            {
                                                                              variant:
                                                                                'warning',
                                                                              className:
                                                                                'mr-1',
                                                                              children:
                                                                                'OrioleDB',
                                                                            }
                                                                          ),
                                                                          (0,
                                                                          a.jsx)(
                                                                            q.C,
                                                                            {
                                                                              variant:
                                                                                'warning',
                                                                              className:
                                                                                'mr-1',
                                                                              children:
                                                                                'Preview',
                                                                            }
                                                                          ),
                                                                        ],
                                                                    }
                                                                  ),
                                                              ],
                                                            }),
                                                          ],
                                                        }
                                                      ),
                                                    },
                                                    ei(e)
                                                  );
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                    });
                                  },
                                }),
                              }),
                            }),
                          (0, a.jsxs)(U.Z.Content, {
                            className:
                              'flex items-center space-x-2 justify-end',
                            'data-sentry-element': 'unknown',
                            'data-sentry-source-file': 'ProjectPausedState.tsx',
                            children: [
                              (0, a.jsx)(D.z, {
                                type: 'default',
                                disabled: ex,
                                onClick: () => em(!1),
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'ProjectPausedState.tsx',
                                children: 'Cancel',
                              }),
                              (0, a.jsx)(D.z, {
                                htmlType: 'submit',
                                loading: ex,
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'ProjectPausedState.tsx',
                                children: 'Confirm restore',
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsxs)(U.Z, {
                    hideFooter: !0,
                    visible: eh,
                    size: 'medium',
                    header:
                      'Your organization has members who have exceeded their free project limits',
                    onCancel: () => ef(!1),
                    'data-sentry-element': 'Modal',
                    'data-sentry-source-file': 'ProjectPausedState.tsx',
                    children: [
                      (0, a.jsxs)(U.Z.Content, {
                        className: 'space-y-2',
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'ProjectPausedState.tsx',
                        children: [
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              'The following members have reached their maximum limits for the number of active free plan projects within organizations where they are an administrator or owner:',
                          }),
                          (0, a.jsx)('ul', {
                            className:
                              'pl-5 text-sm list-disc text-foreground-light',
                            children: (el || []).map((e, t) =>
                              (0, a.jsxs)(
                                'li',
                                {
                                  children: [
                                    e.username || e.primary_email,
                                    ' (Limit: ',
                                    e.free_project_limit,
                                    ' free projects)',
                                  ],
                                },
                                'member-'.concat(t)
                              )
                            ),
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              "These members will need to either delete, pause, or upgrade one or more of these projects before you're able to unpause this project.",
                          }),
                        ],
                      }),
                      (0, a.jsx)(U.Z.Separator, {
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'ProjectPausedState.tsx',
                      }),
                      (0, a.jsx)(U.Z.Content, {
                        'data-sentry-element': 'unknown',
                        'data-sentry-source-file': 'ProjectPausedState.tsx',
                        children: (0, a.jsx)(D.z, {
                          htmlType: 'button',
                          type: 'default',
                          onClick: () => ef(!1),
                          block: !0,
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'ProjectPausedState.tsx',
                          children: 'Understood',
                        }),
                      }),
                    ],
                  }),
                ],
              })
            );
          };
      },
      60245: function (e, t, n) {
        'use strict';
        n.d(t, {
          $: function () {
            return n7;
          },
          Z: function () {
            return ae;
          },
        });
        var a = n(97458),
          s = n(12436),
          r = n(52983),
          i = n(12472),
          o = n(90839),
          l = n(31485),
          c = n(79600),
          d = n(86186),
          u = n(35808),
          p = n(49996),
          m = (e) => {
            var t;
            let {
                apikey: n,
                endpoint: r,
                selectedLanguage: i,
                snippet: o,
                children: l,
              } = e,
              { ref: c } = (0, s.UO)(),
              d =
                null === (t = o[i]) || void 0 === t
                  ? void 0
                  : t.call(o, n, r).replaceAll('[ref]', null != c ? c : '');
            return (0, a.jsxs)('div', {
              id: o.key,
              className: 'space-y-4 py-6 pb-2 last:pb-6',
              'data-sentry-component': 'ContentSnippet',
              'data-sentry-source-file': 'ContentSnippet.tsx',
              children: [
                (0, a.jsxs)('div', {
                  className: 'px-4 space-y-4',
                  children: [
                    (0, a.jsx)('h2', {
                      className: 'doc-heading',
                      children: o.title,
                    }),
                    void 0 !== o.description &&
                      (0, a.jsx)('div', {
                        className: 'doc-section',
                        children: (0, a.jsx)('article', {
                          className: 'text text-sm text-foreground-light',
                          children: (0, a.jsx)(p.U, {
                            className: 'max-w-none',
                            content: o.description.replaceAll(
                              '[ref]',
                              null != c ? c : '_'
                            ),
                          }),
                        }),
                      }),
                  ],
                }),
                l,
                void 0 !== d &&
                  (0, a.jsx)('div', {
                    className: 'px-4 codeblock-container',
                    children: (0, a.jsx)('div', {
                      className: 'bg rounded p-2',
                      children: (0, a.jsx)(u.c, { className: i, children: d }),
                    }),
                  }),
              ],
            });
          };
        let h = [
            { name: 'Connect', key: 'introduction' },
            { name: 'User Management', key: 'user-management' },
            { name: 'Tables & Views', key: 'entities' },
            { name: 'Stored Procedures', key: 'stored-procedures' },
            { name: 'Storage', key: 'storage' },
            { name: 'Edge Functions', key: 'edge-functions' },
            { name: 'Realtime', key: 'realtime' },
          ],
          f = {
            init: {
              key: 'introduction',
              category: 'introduction',
              title: 'Connect to your project',
              description:
                "Projects have a RESTful endpoint that you can use with your project's API key to query and manage your database. Put these keys in your .env file.",
              js: (e, t) =>
                "\nimport { createClient } from '@supabase/supabase-js'\n\nconst supabaseUrl = '".concat(
                  t,
                  "'\nconst supabaseKey = process.env.SUPABASE_KEY\nconst supabase = createClient(supabaseUrl, supabaseKey)"
                ),
              bash: () => '# No client library required for Bash.',
            },
            clientApiKeys: {
              key: 'client-api-keys',
              category: 'introduction',
              title: 'Client API Keys',
              description:
                'Client keys allow "anonymous access" to your database, until the user has logged in. After logging in, the keys will switch to the user\'s own login token.\n\nIn this documentation, we will refer to the key using the name `SUPABASE_KEY`. You can find the `anon` key in the [API settings](/project/[ref]/settings/api) page.',
              js: (e, t) =>
                "\nconst SUPABASE_KEY = '"
                  .concat(e, "'\nconst SUPABASE_URL = '")
                  .concat(
                    t,
                    "'\nconst supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);"
                  ),
              bash: (e, t) => ''.concat(e),
            },
            serviceApiKeys: {
              key: 'service-keys',
              category: 'introduction',
              title: 'Service Keys',
              description:
                'Service keys have *FULL* access to your data, bypassing any security policies. Be VERY careful where you expose these keys. They should only be used on a server and never on a client or browser.\n\nIn this documentation, we refer to the key using the name `SERVICE_KEY`. You can find the `service_role` key above or in the [API settings](/project/[ref]/settings/api) page.',
              js: (e, t) =>
                "\nconst SUPABASE_KEY = '"
                  .concat(e, "'\nconst SUPABASE_URL = 'https://")
                  .concat(
                    t,
                    "'\nconst supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);"
                  ),
              bash: (e, t) => ''.concat(e),
            },
            userManagement: {
              key: 'user-management',
              category: 'user-management',
              title: 'Introduction',
              description:
                'Supabase makes it easy to manage your users.\n\n  Supabase assigns each user a unique ID. You can reference this ID anywhere in your database. For example, you might create a `profiles` table references the user using a `user_id` field.\n\n  Supabase already has built in the routes to sign up, login, and log out for managing users in your apps and websites.',
              js: void 0,
              bash: void 0,
            },
            signUp: {
              key: 'sign-up',
              category: 'user-management',
              title: 'Sign up',
              description:
                'Allow your users to sign up and create a new account\n\n  After they have signed up, all interactions using the Supabase client will be performed as "that user".',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signUp({\n  email: 'someone@email.com',\n  password: 'some-secure-password'\n})",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/signup\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "email": "someone@email.com",\n  "password": "some-secure-password"\n}\''
                  ),
            },
            emailLogin: {
              key: 'email-login',
              category: 'user-management',
              title: 'Log in with Email/Password',
              description:
                '\nIf an account is created, users can login to your app.\n\nAfter they have logged in, all interactions using the Supabase JS client will be performed as "that user".',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signInWithPassword({\n  email: 'someone@email.com',\n  password: 'some-secure-password'\n})\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(
                    t,
                    '/auth/v1/token?grant_type=password\' \\\n-H "apikey: '
                  )
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "email": "someone@email.com",\n  "password": "some-secure-password"\n}\'\n    '
                  ),
            },
            magicLinkLogin: {
              key: 'magic-link-login',
              category: 'user-management',
              title: 'Log in with Magic Link via Email',
              description:
                '\nSend a user a passwordless link which they can use to redeem an access_token.\n\nAfter they have clicked the link, all interactions using the Supabase JS client will be performed as "that user".',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signInWithOtp({\n  email: 'someone@email.com'\n})\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/magiclink\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "email": "someone@email.com"\n}\'\n    '
                  ),
            },
            phoneLogin: {
              key: 'phone-log-in',
              category: 'user-management',
              title: 'Sign up with Phone/Password',
              description:
                '\nA phone number can be used instead of an email as a primary account confirmation mechanism.\n\nThe user will receive a mobile OTP via sms with which they can verify that they control the phone number.\n\nYou must enter your own twilio credentials on the auth settings page to enable sms confirmations.',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signUp({\n  phone: '+13334445555',\n  password: 'some-password'\n})\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/signup\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "phone": "+13334445555",\n  "password": "some-password"\n}\'\n    '
                  ),
            },
            smsLogin: {
              key: 'sms-otp-log-in',
              category: 'user-management',
              title: 'Login via SMS OTP',
              description:
                '\nSMS OTPs work like magic links, except you have to provide an interface for the user to verify the 6 digit number they receive.\n\nYou must enter your own twilio credentials on the auth settings page to enable SMS-based Logins.',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signInWithOtp({\n  phone: '+13334445555'\n})\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/otp\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "phone": "+13334445555"\n}\'\n    '
                  ),
            },
            smsVerify: {
              key: 'sms-verify',
              category: 'user-management',
              title: 'Verify an SMS OTP',
              description:
                '\nOnce the user has received the OTP, have them enter it in a form and send it for verification\n\nYou must enter your own twilio credentials on the auth settings page to enable SMS-based OTP verification.',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.verifyOtp({\n  phone: '+13334445555',\n  token: '123456',\n  type: 'sms'\n})\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/verify\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "type": "sms",\n  "phone": "+13334445555",\n  "token": "123456"\n}\'\n    '
                  ),
            },
            oauthLogin: {
              key: 'oauth-login',
              category: 'user-management',
              title: 'Log in with Third Party OAuth',
              description:
                '\nUsers can log in with Third Party OAuth like Google, Facebook, GitHub, and more. You must first enable each of these in the Auth Providers settings [here](https://supabase.com).\n\nView all the available [Third Party OAuth providers](https://supabase.com).\n\nAfter they have logged in, all interactions using the Supabase JS client will be performed as "that user".\n\nGenerate your Client ID and secret from: [Google](https://console.developers.google.com/apis/credentials), [Github](https://github.com/settings/applications/new), [Gitlab](https://gitlab.com/oauth/applications), [Facebook](https://developers.facebook.com/apps), and [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud).',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.signInWithOAuth({\n  provider: 'github'\n})\n    ",
              bash: (e, t) => 'No available command',
            },
            user: {
              key: 'get-user',
              category: 'user-management',
              title: 'Get user',
              description: 'Get the JSON object for the logged in user.',
              js: (e, t) =>
                '\nconst { data: { user } } = await supabase.auth.getUser()\n    ',
              bash: (e, t) =>
                "\ncurl -X GET '"
                  .concat(t, '/auth/v1/user\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Authorization: Bearer USER_TOKEN"\n    '
                  ),
            },
            forgotPassWordEmail: {
              key: 'forgot-password-email',
              category: 'user-management',
              title: 'Forgot password / email',
              description:
                'Sends the user a log in link via email. Once logged in you should direct the user to a new password form. And use "Update User" below to save the new password.',
              js: (e, t) =>
                '\nconst { data, error } = await supabase.auth.resetPasswordForEmail(email)\n    ',
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/recover\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n"email": "someone@email.com"\n}\'\n'
                  ),
            },
            updateUser: {
              key: 'update-user',
              category: 'user-management',
              title: 'Update User',
              description:
                'Update the user with a new email or password. Each key (email, password, and data) is optional.',
              js: (e, t) =>
                '\nconst { data, error } = await supabase.auth.updateUser({\n  email: "new@email.com",\n  password: "new-password",\n  data: { hello: \'world\' }\n})\n    ',
              bash: (e, t) =>
                "\ncurl -X PUT '"
                  .concat(t, '/auth/v1/user\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Authorization: Bearer <USERS-ACCESS-TOKEN>" \\\n-H "Content-Type: application/json" \\\n-d \'{\n"email": "someone@email.com",\n"password": "new-password",\n"data": {\n  "key": "value"\n}\n}\'\n'
                  ),
            },
            logout: {
              key: 'log-out',
              category: 'user-management',
              title: 'Log out',
              description:
                'After calling log out, all interactions using the Supabase JS client will be "anonymous".',
              js: (e, t) =>
                '\nconst { error } = await supabase.auth.signOut()\n    ',
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/logout\' \\\n-H "apikey: ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer USER_TOKEN"\n    '
                  ),
            },
            emailInvite: {
              key: 'email-invite',
              category: 'user-management',
              title: 'Invite user over email',
              description:
                '\nSend a user a passwordless link which they can use to sign up and log in.\n\nAfter they have clicked the link, all interactions using the Supabase JS client will be performed as "that user".\n\nThis endpoint requires you use the `service_role_key` when initializing the client, and should only be invoked from the server, never from the client.',
              js: (e, t) =>
                "\nconst { data, error } = await supabase.auth.api.inviteUserByEmail('someone@email.com')\n    ",
              bash: (e, t) =>
                "\ncurl -X POST '"
                  .concat(t, '/auth/v1/invite\' \\\n-H "apikey: ')
                  .concat(e, '" \\\n-H "Authorization: Bearer ')
                  .concat(
                    e,
                    '" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "email": "someone@email.com"\n}\'\n    '
                  ),
            },
            storage: {
              key: 'storage',
              category: 'storage',
              title: 'Introduction',
              description:
                'Supabase Storage makes it simple to upload and serve files of any size, providing a robust framework for file access controls.\n\nYou can use Supabase Storage to store images, videos, documents, and any other file type. Serve your assets with a global CDN to reduce latency from over 285 cities globally. Supabase Storage includes a built-in image optimizer, so you can resize and compress your media files on the fly.',
              js: void 0,
              bash: void 0,
            },
            edgeFunctions: {
              key: 'edge-function',
              category: 'edge-functions',
              title: 'Introduction',
              description:
                '\nEdge Functions are server-side TypeScript functions, distributed globally at the edge—close to your users. They can be used for listening to webhooks or integrating your Supabase project with third-parties like Stripe. Edge Functions are developed using Deno, which offers a few benefits to you as a developer:\n',
              js: void 0,
              bash: void 0,
            },
            edgeFunctionsPreReq: {
              key: 'edge-function-pre-req',
              category: 'edge-functions',
              title: 'Pre-requisites',
              description:
                '\nFollow the steps to prepare your Supabase project on your local machine.\n\n- Install the Supabase [CLI](https://supabase.com/docs/guides/cli).\n- [Login to the CLI](https://supabase.com/docs/reference/cli/usage#supabase-login) using the command: `supabase login`..\n- [Initialize Supabase](https://supabase.com/docs/guides/getting-started/local-development#getting-started) inside your project using the command: `supabase init`..\n- [Link to your Remote Project](https://supabase.com/docs/reference/cli/usage#supabase-link) using the command `supabase link --project-ref [ref]`..\n- Setup your environment: Follow the steps [here](https://supabase.com/docs/guides/functions/quickstart#setting-up-your-environment).\n',
              js: void 0,
              bash: void 0,
            },
            createEdgeFunction: {
              key: 'create-edge-function',
              category: 'edge-functions',
              title: 'Create an Edge Function',
              description:
                '\nCreate a Supabase Edge Function locally via the Supabase CLI.\n',
              js: () => '// Create an edge function via the Supabase CLI',
              bash: () => '\nsupabase functions new hello-world\n',
            },
            deployEdgeFunction: {
              key: 'deploy-edge-function',
              category: 'edge-functions',
              title: 'Deploy an Edge Function',
              description:
                '\nDeploy a Supabase Edge Function to your Supabase project via the Supabase CLI.\n',
              js: () => '// Deploy an edge function via the Supabase CLI',
              bash: () =>
                'supabase functions deploy hello-world --project-ref [ref]\n',
            },
            entitiesIntroduction: {
              key: 'entities-introduction',
              category: 'entities',
              title: 'Introduction',
              description:
                "\nAll views and tables in the `public` schema, and those accessible by the active database role for a request are available for querying via the API.\n\nIf you don't want to expose tables in your API, simply add them to a different schema (not the `public` schema).\n",
              js: void 0,
              bash: void 0,
            },
            generatingTypes: {
              key: 'generating-types',
              category: 'entities',
              title: 'Generating Types',
              description:
                '\nSupabase APIs are generated from your database, which means that we can use database introspection to generate type-safe API definitions.\n\nYou can generate types from your database either through the [Supabase CLI](https://supabase.com/docs/guides/database/api/generating-types), or by downloading the types file via the button on the right and importing it in your application within `src/index.ts`.\n',
              js: void 0,
              bash: void 0,
            },
            graphql: {
              key: 'graphql',
              category: 'entities',
              title: 'GraphQL vs PostgREST',
              description:
                '\nIf you have a GraphQL background, you might be wondering if you can fetch your data in a single round-trip. The answer is yes! The syntax is very similar. This example shows how you might achieve the same thing with Apollo GraphQL and Supabase.\n\nStill want GraphQL?\nIf you still want to use GraphQL, you can. Supabase provides you with a full Postgres database, so as long as your middleware can connect to the database then you can still use the tools you love. You can find the database connection details [in the settings](/project/[ref]/settings/database).\n',
              js: (e, t) =>
                "\n// With Apollo GraphQL\nconst { loading, error, data } = useQuery(gql`\n  query GetDogs {\n    dogs {\n      id\n      breed\n      owner {\n        id\n        name\n      }\n    }\n  }\n    `)\n\n// With Supabase\nconst { data, error } = await supabase\n  .from('dogs')\n  .select(`\n      id, breed,\n      owner (id, name)\n  `)\n",
              bash: (e, t) =>
                "\n// With Apollo GraphQL\nconst { loading, error, data } = useQuery(gql`\n  query GetDogs {\n    dogs {\n      id\n      breed\n      owner {\n        id\n        name\n      }\n    }\n  }\n    `)\n\n// With Supabase\nconst { data, error } = await supabase\n  .from('dogs')\n  .select(`\n      id, breed,\n      owner (id, name)\n  `)\n    ",
            },
            storedProceduresIntroduction: {
              key: 'stored-procedures-introduction',
              category: 'stored-procedures',
              title: 'Introduction',
              description:
                "\nAll of your database stored procedures are available on your API. This means you can build your logic directly into the database (if you're brave enough)!\n\nThe API endpoint supports POST (and in some cases GET) to execute the function.\n",
              js: void 0,
              bash: void 0,
            },
            realtime: {
              key: 'realtime-introduction',
              category: 'realtime',
              title: 'Introduction',
              description:
                '\nSupabase provides a globally distributed cluster of Realtime servers that enable the following functionality:\n\n- [Broadcast](https://supabase.com/docs/guides/realtime/broadcast): Send ephemeral messages from client to clients with low latency.\n- [Presence](https://supabase.com/docs/guides/realtime/presence): Track and synchronize shared state between clients.\n- [Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes): Listen to Postgres database changes and send them to authorized clients.\n',
              js: void 0,
              bash: void 0,
            },
            subscribeChannel: {
              key: 'subscribe-to-channel',
              category: 'realtime',
              title: 'Subscribe to channel',
              description:
                '\nCreates an event handler that listens to changes.\n\n- By default, Broadcast and Presence are enabled for all projects.\n- By default, listening to database changes is disabled for new projects due to database performance and security concerns. You can turn it on by managing Realtime\'s [replication](https://supabase.com/docs/guides/api#realtime-api-overview).\n- You can receive the "previous" data for updates and deletes by setting the table\'s `REPLICA IDENTITY` to `FULL` (e.g., `ALTER TABLE your_table REPLICA IDENTITY FULL;`).\n- Row level security is not applied to delete statements. When RLS is enabled and replica identity is set to full, only the primary key is sent to clients.\n',
              js: () =>
                "\nsupabase\n  .channel('any')\n  .on('broadcast', { event: 'cursor-pos' }, payload => {\n    console.log('Cursor position received!', payload)\n  })\n  .subscribe((status) => {\n    if (status === 'SUBSCRIBED') {\n      channel.send({\n        type: 'broadcast',\n        event: 'cursor-pos',\n        payload: { x: Math.random(), y: Math.random() },\n      })\n    }\n  })\n    ",
              bash: () =>
                '# Realtime streams are only supported by our client libraries',
            },
            unsubscribeChannel: {
              key: 'unsubscribe-channel',
              category: 'realtime',
              title: 'Unsubscribe from a channel',
              description:
                "\nUnsubscribes and removes Realtime channel from Realtime client.\n\nRemoving a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.\n",
              js: () => 'supabase.removeChannel(myChannel)',
              bash: () =>
                '# Realtime streams are only supported by our client libraries',
            },
            unsubscribeChannels: {
              key: 'unsubscribe-channels',
              category: 'realtime',
              title: 'Unsubscribe from all channels',
              description:
                "\nUnsubscribes and removes all Realtime channels from Realtime client.\n\nRemoving a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.\n",
              js: () => 'supabase.removeChannels()',
              bash: () =>
                '# Realtime streams are only supported by our client libraries',
            },
            retrieveAllChannels: {
              key: 'unsubscribe-channel',
              category: 'realtime',
              title: 'Unsubscribe from a channel',
              description: '\nReturns all Realtime channels.\n',
              js: () => 'const channels = supabase.getChannels()',
              bash: () =>
                '# Realtime streams are only supported by our client libraries',
            },
          },
          g = {
            rpcSingle: {
              key: 'invoke-function',
              title: 'Invoke function',
              category: 'stored-procedures',
              description: void 0,
              docsUrl: 'https://supabase.com/docs/reference/javascript/rpc',
              code: (e) => {
                let {
                    rpcName: t,
                    rpcParams: n,
                    endpoint: a,
                    apiKey: s,
                    showBearer: r = !0,
                  } = e,
                  i = n.map((e) => '"'.concat(e.name, '": "value"')).join(', '),
                  o = !n.length,
                  l = o
                    ? ''
                    : ', {'.concat(
                        n.length
                          ? n
                              .map((e) => '\n    '.concat(e.name))
                              .join(', ')
                              .concat('\n  ')
                          : '',
                        '}'
                      );
                return [
                  {
                    key: 'rpc-single',
                    title: void 0,
                    bash: "\n  curl -X POST '"
                      .concat(a, '/rest/v1/rpc/')
                      .concat(t, "' \\")
                      .concat(
                        o ? '' : "\n-d '{ ".concat(i, " }' \\"),
                        '\n  -H "Content-Type: application/json" \\\n  -H "apikey: '
                      )
                      .concat(s, '" ')
                      .concat(
                        r
                          ? '\\\n  -H "Authorization: Bearer '.concat(s, '"')
                          : '',
                        '\n        '
                      ),
                    js: "\nlet { data, error } = await supabase\n  .rpc('"
                      .concat(t, "'")
                      .concat(
                        l,
                        ')\n\nif (error) console.error(error)\nelse console.log(data)\n        '
                      ),
                  },
                ];
              },
            },
            readRows: {
              key: 'read-rows',
              title: 'Read rows',
              category: 'entities',
              docsUrl: 'https://supabase.com/docs/reference/javascript/select',
              description:
                'To read rows in this table, use the `select` method.',
              code: (e) => {
                let { resourceId: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'read-all-rows',
                    title: 'Read all rows',
                    bash: "\ncurl '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '?select=*\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '"\n          '),
                    js: '\nlet { data: '
                      .concat(t, ", error } = await supabase\n  .from('")
                      .concat(t, "')\n  .select('*')\n          "),
                  },
                  {
                    key: 'read-specific-columns',
                    title: 'Read specific columns',
                    bash: "\ncurl '"
                      .concat(n, '/rest/v1/')
                      .concat(
                        t,
                        '?select=some_column,other_column\' \\\n-H "apikey: '
                      )
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '"\n          '),
                    js: '\nlet { data: '
                      .concat(t, ", error } = await supabase\n  .from('")
                      .concat(
                        t,
                        "')\n  .select('some_column,other_column')\n  "
                      ),
                  },
                  {
                    key: 'read-foreign-tables',
                    title: 'Read referenced tables',
                    bash: "\ncurl '"
                      .concat(n, '/rest/v1/')
                      .concat(
                        t,
                        '?select=some_column,other_table(foreign_key)\' \\\n-H "apikey: '
                      )
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '"\n          '),
                    js: '\nlet { data: '
                      .concat(t, ", error } = await supabase\n  .from('")
                      .concat(
                        t,
                        "')\n  .select(`\n    some_column,\n    other_table (\n      foreign_key\n    )\n  `)\n          "
                      ),
                  },
                  {
                    key: 'with-pagination',
                    title: 'With pagination',
                    bash: "\ncurl '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '?select=*\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '" \\\n-H "Range: 0-9"\n          '),
                    js: '\nlet { data: '
                      .concat(t, ", error } = await supabase\n  .from('")
                      .concat(
                        t,
                        "')\n  .select('*')\n  .range(0, 9)\n          "
                      ),
                  },
                ];
              },
            },
            filtering: {
              key: 'filter-rows',
              category: 'entities',
              title: 'Filtering',
              description: 'Supabase provides a wide range of filters',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/using-filters',
              code: (e) => {
                let { resourceId: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'with-filtering',
                    title: 'With filtering',
                    bash: "\ncurl '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '?id=eq.1&select=*\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '" \\\n-H "Range: 0-9"\n        '),
                    js: '\nlet { data: '
                      .concat(t, ", error } = await supabase\n  .from('")
                      .concat(
                        t,
                        "')\n  .select(\"*\")\n\n  // Filters\n  .eq('column', 'Equal to')\n  .gt('column', 'Greater than')\n  .lt('column', 'Less than')\n  .gte('column', 'Greater than or equal to')\n  .lte('column', 'Less than or equal to')\n  .like('column', '%CaseSensitive%')\n  .ilike('column', '%CaseInsensitive%')\n  .is('column', null)\n  .in('column', ['Array', 'Values'])\n  .neq('column', 'Not equal to')\n\n  // Arrays\n  .contains('array_column', ['array', 'contains'])\n  .containedBy('array_column', ['contained', 'by'])\n          "
                      ),
                  },
                ];
              },
            },
            insertRows: {
              key: 'insert-rows',
              category: 'entities',
              title: 'Insert rows',
              description:
                '\n`insert` lets you insert into your tables. You can also insert in bulk and do UPSERT.\n\n`insert` will also return the replaced values for UPSERT.\n',
              docsUrl: 'https://supabase.com/docs/reference/javascript/insert',
              code: (e) => {
                let { resourceId: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'insert-a-row',
                    title: 'Insert a row',
                    bash: "\ncurl -X POST '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(
                        a,
                        '" \\\n-H "Content-Type: application/json" \\\n-H "Prefer: return=minimal" \\\n-d \'{ "some_column": "someValue", "other_column": "otherValue" }\'\n          '
                      ),
                    js: "\nconst { data, error } = await supabase\n  .from('".concat(
                      t,
                      "')\n  .insert([\n    { some_column: 'someValue', other_column: 'otherValue' },\n  ])\n  .select()\n          "
                    ),
                  },
                  {
                    key: 'insert-many-rows',
                    title: 'Insert many rows',
                    bash: "\ncurl -X POST '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(
                        a,
                        '" \\\n-H "Content-Type: application/json" \\\n-d \'[{ "some_column": "someValue" }, { "other_column": "otherValue" }]\'\n          '
                      ),
                    js: "\nconst { data, error } = await supabase\n  .from('".concat(
                      t,
                      "')\n  .insert([\n    { some_column: 'someValue' },\n    { some_column: 'otherValue' },\n  ])\n  .select()\n          "
                    ),
                  },
                  {
                    key: 'upsert-matching-rows',
                    title: 'Upsert matching rows',
                    bash: "\ncurl -X POST '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(
                        a,
                        '" \\\n-H "Content-Type: application/json" \\\n-H "Prefer: resolution=merge-duplicates" \\\n-d \'{ "some_column": "someValue", "other_column": "otherValue" }\'\n          '
                      ),
                    js: "\nconst { data, error } = await supabase\n  .from('".concat(
                      t,
                      "')\n  .upsert({ some_column: 'someValue' })\n  .select()\n          "
                    ),
                  },
                ];
              },
            },
            updateRows: {
              key: 'update-rows',
              category: 'entities',
              title: 'Update rows',
              description:
                '\n`update` lets you update rows. `update` will match all rows by default. You can update specific rows using horizontal filters, e.g. `eq`, `lt`, and `is`.\n\n`update` will also return the replaced values for UPDATE.\n',
              docsUrl: 'https://supabase.com/docs/reference/javascript/update',
              code: (e) => {
                let { resourceId: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'update-matching-rows',
                    title: 'Update matching rows',
                    bash: "\ncurl -X PATCH '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '?some_column=eq.someValue\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(
                        a,
                        '" \\\n-H "Content-Type: application/json" \\\n-H "Prefer: return=minimal" \\\n-d \'{ "other_column": "otherValue" }\'\n          '
                      ),
                    js: "\nconst { data, error } = await supabase\n  .from('".concat(
                      t,
                      "')\n  .update({ other_column: 'otherValue' })\n  .eq('some_column', 'someValue')\n  .select()\n          "
                    ),
                  },
                ];
              },
            },
            deleteRows: {
              key: 'delete-rows',
              category: 'entities',
              title: 'Delete rows',
              description:
                '\n`delete` lets you delete rows. `delete` will match all rows by default, so remember to specify your filters!\n',
              docsUrl: 'https://supabase.com/docs/reference/javascript/delete',
              code: (e) => {
                let { resourceId: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'delete-matching-rows',
                    title: 'Delete matching rows',
                    bash: "\ncurl -X DELETE '"
                      .concat(n, '/rest/v1/')
                      .concat(t, '?some_column=eq.someValue\' \\\n-H "apikey: ')
                      .concat(a, '" \\\n-H "Authorization: Bearer ')
                      .concat(a, '"\n          '),
                    js: "\nconst { error } = await supabase\n  .from('".concat(
                      t,
                      "')\n  .delete()\n  .eq('some_column', 'someValue')\n          "
                    ),
                  },
                ];
              },
            },
            subscribeChanges: {
              key: 'subscribe-changes',
              category: 'entities',
              title: 'Subscribe to changes',
              description:
                '\nSupabase provides realtime functionality and broadcasts database changes to authorized users depending on Row Level Security (RLS) policies.\n',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/subscribe',
              code: (e) => {
                let { resourceId: t } = e;
                return [
                  {
                    key: 'subscribe-all-events',
                    title: 'Subscribe to all events',
                    bash: '# Realtime streams are only supported by our client libraries',
                    js: "\nconst channels = supabase.channel('custom-all-channel')\n  .on(\n    'postgres_changes',\n    { event: '*', schema: 'public', table: '".concat(
                      t,
                      "' },\n    (payload) => {\n      console.log('Change received!', payload)\n    }\n  )\n  .subscribe()"
                    ),
                  },
                  {
                    key: 'subscribe-to-inserts',
                    title: 'Subscribe to inserts',
                    bash: '# Realtime streams are only supported by our client libraries',
                    js: "\nconst channels = supabase.channel('custom-insert-channel')\n  .on(\n    'postgres_changes',\n    { event: 'INSERT', schema: 'public', table: '".concat(
                      t,
                      "' },\n    (payload) => {\n      console.log('Change received!', payload)\n    }\n  )\n  .subscribe()"
                    ),
                  },
                  {
                    key: 'subscribe-to-updates',
                    title: 'Subscribe to updates',
                    bash: '# Realtime streams are only supported by our client libraries',
                    js: "\nconst channels = supabase.channel('custom-update-channel')\n  .on(\n    'postgres_changes',\n    { event: 'UPDATE', schema: 'public', table: '".concat(
                      t,
                      "' },\n    (payload) => {\n      console.log('Change received!', payload)\n    }\n  )\n  .subscribe()"
                    ),
                  },
                  {
                    key: 'subscribe-to-deletes',
                    title: 'Subscribe to deletes',
                    bash: '# Realtime streams are only supported by our client libraries',
                    js: "\nconst channels = supabase.channel('custom-delete-channel')\n  .on(\n    'postgres_changes',\n    { event: 'DELETE', schema: 'public', table: '".concat(
                      t,
                      "' },\n    (payload) => {\n      console.log('Change received!', payload)\n    }\n  )\n  .subscribe()"
                    ),
                  },
                  {
                    key: 'subscribe-to-specific-rows',
                    title: 'Subscribe to specific rows',
                    bash: '# Realtime streams are only supported by our client libraries',
                    js: "\nconst channels = supabase.channel('custom-filter-channel')\n  .on(\n    'postgres_changes',\n    { event: '*', schema: 'public', table: '".concat(
                      t,
                      "', filter: 'some_column=eq.some_value' },\n    (payload) => {\n      console.log('Change received!', payload)\n    }\n  )\n  .subscribe()"
                    ),
                  },
                ];
              },
            },
            uploadFile: {
              key: 'upload-file',
              category: 'storage',
              title: 'Upload a file',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-upload',
              description:
                '\nUpload a file to an existing bucket. RLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: only `insert` when you are uploading new files and `select`, `insert`, and `update` when you are upserting files.\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-upload-file',
                    title: void 0,
                    bash: "\ncurl -X POST '"
                      .concat(a, '/storage/v1/object/')
                      .concat(
                        t,
                        "/folder/avatar1.png' \\\n-H 'Content-Type: image/png' \\\n-H \"Authorization: Bearer "
                      )
                      .concat(
                        n,
                        "\" \\\n--data-binary @/path/to/your/file'\n-H 'Content-Type: multipart/form-data' \\\n-H \"Authorization: Bearer "
                      )
                      .concat(
                        n,
                        "\" \\\n--data-raw $'your_file_data'\n        "
                      ),
                    js: "\nconst avatarFile = event.target.files[0]\nconst { data, error } = await supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .upload('folder/avatar1.png', avatarFile, {\n    cacheControl: '3600',\n    upsert: false\n  })\n"
                    ),
                  },
                ];
              },
            },
            deleteFiles: {
              key: 'delete-files',
              category: 'storage',
              title: 'Delete files',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-remove',
              description:
                '\nDelete files within the bucket. RLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: `delete` and `select`\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-delete-files',
                    title: void 0,
                    bash: "\ncurl -X DELETE '"
                      .concat(a, '/storage/v1/object/')
                      .concat(
                        t,
                        '\' \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer '
                      )
                      .concat(
                        n,
                        '" \\\n-d \'{ "prefixes": ["file_name", "another_file_name"] }\'\n'
                      ),
                    js: "\nconst { data, error } = await supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .remove(['folder/avatar1.png'])\n        "
                    ),
                  },
                ];
              },
            },
            listFiles: {
              key: 'list-files',
              category: 'storage',
              title: 'List all files',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-list',
              description:
                '\nList all files within the bucket. RLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: `select`\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-list-files',
                    title: void 0,
                    bash: "\ncurl -X POST '"
                      .concat(a, '/storage/v1/object/list/')
                      .concat(
                        t,
                        '\' \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer '
                      )
                      .concat(
                        n,
                        '" \\\n-d \'{ "limit": 100, "offset": 0, "prefix": "", "sortBy": { "column": "name", "order": "asc" } }\''
                      ),
                    js: "\nconst { data, error } = await supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .list('folder', {\n    limit: 100,\n    offset: 0,\n    sortBy: { column: 'name', order: 'asc' },\n  })\n        "
                    ),
                  },
                ];
              },
            },
            downloadFile: {
              key: 'download-file',
              category: 'storage',
              title: 'Download a file',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-download',
              description:
                '\nDownloads a file from a private bucket. For public buckets, make a request to the URL returned from getPublicUrl instead. RLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: `select`\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-download-file',
                    title: void 0,
                    bash: "\ncurl -X GET '"
                      .concat(a, '/storage/v1/object/')
                      .concat(
                        t,
                        '/folder/avatar1.png\' \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer '
                      )
                      .concat(n, '" \\\n--output avatar1.png\n'),
                    js: "\nconst { data, error } = await supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .download('folder/avatar1.png')\n      "
                    ),
                  },
                ];
              },
            },
            createSignedURL: {
              key: 'create-signed-url',
              category: 'storage',
              title: 'Create a signed URL',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-createsignedurl',
              description:
                '\nCreate a signed URL which can be used to share a file for a fixed amount of time. RLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: `select`\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-create-signed-url',
                    title: void 0,
                    bash: "\ncurl -X POST '"
                      .concat(a, '/storage/v1/object/sign/')
                      .concat(
                        t,
                        '/folder/avatar1.png\' \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer '
                      )
                      .concat(n, '" \\\n-d \'{ "expiresIn": 60 }\'\n        '),
                    js: "\nconst { data, error } = await supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .createSignedUrl('folder/avatar1.png', 60)\n        "
                    ),
                  },
                ];
              },
            },
            retrievePublicURL: {
              key: 'retrieve-public-url',
              category: 'storage',
              title: 'Retrieve public URL',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/storage-from-getpublicurl',
              description:
                '\nA simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.\n\nThis function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.\n\nThe bucket needs to be set to public, either via `updateBucket()` or by going to Storage on supabase.com/dashboard, clicking the overflow menu on a bucket and choosing "Make public"\n\nRLS policy permissions required:\n- `buckets` table permissions: none\n- `objects` table permissions: none\n',
              code: (e) => {
                let { name: t, apikey: n, endpoint: a } = e;
                return [
                  {
                    key: 'storage-retrieve-public-url',
                    title: void 0,
                    bash: '\n# No bash command available.\n# You can construct the public URL by concatenating the bucket URL with the path to the asset\n# e.g '
                      .concat(a, '/storage/v1/object/public/')
                      .concat(t, '/folder/avatar1.png'),
                    js: "\nconst { data } = supabase\n  .storage\n  .from('".concat(
                      t,
                      "')\n  .getPublicUrl('folder/avatar1.png')\n        "
                    ),
                  },
                ];
              },
            },
            invokeEdgeFunction: {
              key: 'invoke-edge-function',
              category: 'edge-functions',
              title: 'Invoke an edge function',
              docsUrl:
                'https://supabase.com/docs/reference/javascript/functions-invoke',
              description:
                "\nInvokes a Supabase Edge Function. Requires an Authorization header, and invoke params generally match the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) spec.\n\nWhen you pass in a body to your function, we automatically attach the `Content-Type` header for `Blob`, `ArrayBuffer`, `File`, `FormData` and `String`. If it doesn't match any of these types we assume the payload is `json`, serialize it and attach the `Content-Type` header as `application/json`. You can override this behavior by passing in a `Content-Type` header of your own.\n\nResponses are automatically parsed as `json`, `blob` and `form-data` depending on the `Content-Type` header sent by your function. Responses are parsed as `text` by default.\n",
              code: (e) => {
                let { name: t, endpoint: n, apikey: a } = e;
                return [
                  {
                    key: 'invoke-edge-function',
                    title: void 0,
                    bash: "\ncurl --request POST '"
                      .concat(n, '/functions/v1/')
                      .concat(t, "' \\\n--header 'Authorization: Bearer ")
                      .concat(
                        a,
                        "' \\\n--header 'Content-Type: application/json' \\\n--data '{ \"name\": \"Functions\" }'\n        "
                      ),
                    js: "\nconst { data, error } = await supabase\n  .functions\n  .invoke('".concat(
                      t,
                      "', {\n    body: { foo: 'bar' }\n  })"
                    ),
                  },
                ];
              },
            },
          };
        var x = (e) => {
            let { language: t } = e;
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.edgeFunctions,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'EdgeFunctions.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.edgeFunctionsPreReq,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'EdgeFunctions.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.createEdgeFunction,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'EdgeFunctions.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.deployEdgeFunction,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'EdgeFunctions.tsx',
                }),
              ],
            });
          },
          y = n(34549),
          b = n(67096),
          v = n(23035),
          j = n(35303),
          _ = n(29790),
          w = (e) => {
            let { language: t } = e,
              { ref: n } = (0, s.UO)(),
              [i, l] = (0, r.useState)(!1),
              { data: c } = (0, v.s)({ projectRef: n }),
              d = async () => {
                try {
                  l(!0);
                  let e = await (0, j.J)({
                      ref: n,
                      included_schemas: null == c ? void 0 : c.db_schema,
                    }),
                    t = document.createElement('a');
                  (t.setAttribute(
                    'href',
                    'data:text/plain;charset=utf-8,' +
                      encodeURIComponent(e.types)
                  ),
                    t.setAttribute('download', 'supabase.ts'),
                    (t.style.display = 'none'),
                    document.body.appendChild(t),
                    t.click(),
                    document.body.removeChild(t),
                    y.Am.success(
                      'Successfully generated types! File is being downloaded'
                    ));
                } catch (e) {
                  y.Am.error('Failed to generate types: '.concat(e.message));
                } finally {
                  l(!1);
                }
              };
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.entitiesIntroduction,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Entities.tsx',
                }),
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsx)(m, {
                      selectedLanguage: t,
                      snippet: f.generatingTypes,
                      'data-sentry-element': 'ContentSnippet',
                      'data-sentry-source-file': 'Entities.tsx',
                    }),
                    (0, a.jsxs)('div', {
                      className: 'flex items-center gap-x-2 px-4 mt-3',
                      children: [
                        (0, a.jsx)(b.G, {
                          href: 'https://supabase.com/docs/guides/database/api/generating-types',
                          'data-sentry-element': 'DocsButton',
                          'data-sentry-source-file': 'Entities.tsx',
                        }),
                        (0, a.jsx)(o.z, {
                          type: 'default',
                          disabled: i,
                          loading: i,
                          icon: (0, a.jsx)(_.Z, { strokeWidth: 1.5 }),
                          onClick: d,
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'Entities.tsx',
                          children: 'Generate and download types',
                        }),
                      ],
                    }),
                    (0, a.jsx)('p', {
                      className: 'text-xs text-foreground-light px-4 mt-2',
                      children:
                        'Remember to re-generate and download this file as you make changes to your tables.',
                    }),
                  ],
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.graphql,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Entities.tsx',
                }),
              ],
            });
          },
          N = n(51571),
          C = n(45536),
          S = n(58596),
          A = (e) => {
            var t, n, i, c, d;
            let { showKeys: u, language: p, apikey: h, endpoint: g } = e,
              { ref: x } = (0, s.UO)(),
              { data: y } = (0, l.zR)({ projectRef: x }),
              [b, v] = (0, r.useState)();
            (0, r.useEffect)(() => {
              void 0 !== b && setTimeout(() => v(void 0), 2e3);
            }, [b]);
            let j =
                null ===
                  (t = (
                    null !== (i = null == y ? void 0 : y.service_api_keys) &&
                    void 0 !== i
                      ? i
                      : []
                  ).find((e) => 'anon' === e.tags)) || void 0 === t
                  ? void 0
                  : t.api_key,
              _ =
                null !==
                  (d =
                    null ===
                      (n = (
                        null !==
                          (c = null == y ? void 0 : y.service_api_keys) &&
                        void 0 !== c
                          ? c
                          : []
                      ).find((e) => 'service_role' === e.tags)) || void 0 === n
                      ? void 0
                      : n.api_key) && void 0 !== d
                  ? d
                  : 'SUPABASE_CLIENT_SERVICE_KEY';
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(m, {
                  selectedLanguage: p,
                  apikey: h,
                  endpoint: g,
                  snippet: f.init,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Introduction.tsx',
                  children: (0, a.jsxs)('div', {
                    className: 'px-4 space-y-6',
                    children: [
                      (0, a.jsxs)('div', {
                        className: 'flex space-x-4 mt-8',
                        children: [
                          (0, a.jsx)('p', {
                            className: 'text-sm w-40',
                            children: 'Project URL',
                          }),
                          (0, a.jsx)(N.Z, {
                            disabled: !0,
                            readOnly: !0,
                            copy: !0,
                            size: 'small',
                            value: g,
                            className: 'w-full',
                            'data-sentry-element': 'Input',
                            'data-sentry-source-file': 'Introduction.tsx',
                          }),
                        ],
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex space-x-4',
                        children: [
                          (0, a.jsx)('p', {
                            className: 'text-sm w-40',
                            children: 'Client API key',
                          }),
                          (0, a.jsx)(N.Z, {
                            disabled: !0,
                            readOnly: !0,
                            size: 'small',
                            value: u
                              ? h
                              : 'Reveal API keys via dropdown in the header',
                            className: 'w-full',
                            descriptionText:
                              'This key is safe to use in a browser if you have enabled Row Level Security (RLS) for your tables and configured policies.',
                            actions: [
                              (0, a.jsx)(
                                o.z,
                                {
                                  type: 'default',
                                  icon: (0, a.jsx)(S.Z, {}),
                                  onClick: () => {
                                    (v('anon'),
                                      (0, C.vQ)(
                                        null != j
                                          ? j
                                          : 'SUPABASE_CLIENT_ANON_KEY'
                                      ));
                                  },
                                  children: 'anon' === b ? 'Copied' : 'Copy',
                                },
                                'copy'
                              ),
                            ],
                            'data-sentry-element': 'Input',
                            'data-sentry-source-file': 'Introduction.tsx',
                          }),
                        ],
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex space-x-4',
                        children: [
                          (0, a.jsx)('p', {
                            className: 'text-sm w-40 mb-16',
                            children: 'Service key',
                          }),
                          (0, a.jsx)(N.Z, {
                            disabled: !0,
                            readOnly: !0,
                            size: 'small',
                            value: u
                              ? null != _
                                ? _
                                : 'SUPABASE_CLIENT_SERVICE_KEY'
                              : 'Reveal API keys via dropdown in the header',
                            className: 'w-full',
                            descriptionText: (0, a.jsxs)('p', {
                              children: [
                                'This key has the ability to bypass Row Level Security.',
                                ' ',
                                (0, a.jsx)('span', {
                                  className: 'text-amber-900',
                                  children: 'Never share it publicly.',
                                }),
                              ],
                            }),
                            actions: [
                              (0, a.jsx)(
                                o.z,
                                {
                                  type: 'default',
                                  icon: (0, a.jsx)(S.Z, {}),
                                  onClick: () => {
                                    (v('service'), (0, C.vQ)(_));
                                  },
                                  children: 'service' === b ? 'Copied' : 'Copy',
                                },
                                'copy'
                              ),
                            ],
                            'data-sentry-element': 'Input',
                            'data-sentry-source-file': 'Introduction.tsx',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: p,
                  apikey: h,
                  endpoint: g,
                  snippet: f.clientApiKeys,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Introduction.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: p,
                  apikey: u ? _ : 'SUPABASE_CLIENT_SERVICE_KEY',
                  endpoint: g,
                  snippet: f.serviceApiKeys,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Introduction.tsx',
                }),
              ],
            });
          },
          k = (e) => {
            let { language: t } = e;
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.realtime,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Realtime.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.subscribeChannel,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Realtime.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.unsubscribeChannel,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Realtime.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.unsubscribeChannels,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Realtime.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.retrieveAllChannels,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'Realtime.tsx',
                }),
              ],
            });
          },
          E = (e) => {
            let { language: t } = e;
            return (0, a.jsx)(a.Fragment, {
              children: (0, a.jsx)(m, {
                selectedLanguage: t,
                snippet: f.storage,
                'data-sentry-element': 'ContentSnippet',
                'data-sentry-source-file': 'Storage.tsx',
              }),
            });
          },
          R = (e) => {
            let { language: t } = e;
            return (0, a.jsx)(a.Fragment, {
              children: (0, a.jsx)(m, {
                selectedLanguage: t,
                snippet: f.storedProceduresIntroduction,
                'data-sentry-element': 'ContentSnippet',
                'data-sentry-source-file': 'StoredProcedures.tsx',
              }),
            });
          },
          L = (e) => {
            let { language: t, apikey: n, endpoint: s } = e;
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  snippet: f.userManagement,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.signUp,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.emailLogin,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.magicLinkLogin,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.phoneLogin,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.smsLogin,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.smsVerify,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.oauthLogin,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.user,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.forgotPassWordEmail,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.updateUser,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.logout,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
                (0, a.jsx)(m, {
                  selectedLanguage: t,
                  apikey: n,
                  endpoint: s,
                  snippet: f.emailInvite,
                  'data-sentry-element': 'ContentSnippet',
                  'data-sentry-source-file': 'UserManagement.tsx',
                }),
              ],
            });
          },
          I = n(73565),
          T = n(82218),
          O = (e) => {
            let { selectedLanguage: t, snippet: n, codeSnippets: r } = e,
              { ref: i } = (0, s.UO)();
            return (0, a.jsxs)('div', {
              id: n.key,
              className: 'space-y-4 py-6',
              'data-sentry-component': 'ResourceContent',
              'data-sentry-source-file': 'ResourceContent.tsx',
              children: [
                (0, a.jsxs)('div', {
                  className: 'px-4 space-y-2',
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        (0, a.jsx)('h2', {
                          className: 'doc-heading',
                          children: n.title,
                        }),
                        void 0 !== n.docsUrl &&
                          (0, a.jsx)(b.G, { abbrev: !1, href: n.docsUrl }),
                      ],
                    }),
                    void 0 !== n.description &&
                      (0, a.jsx)('div', {
                        className: 'doc-section',
                        children: (0, a.jsx)('article', {
                          className: 'text text-sm text-foreground-light',
                          children: (0, a.jsx)(p.U, {
                            className: 'max-w-none',
                            content: n.description.replaceAll(
                              '[ref]',
                              null != i ? i : '_'
                            ),
                          }),
                        }),
                      }),
                  ],
                }),
                r.map((e) =>
                  (0, a.jsxs)(
                    'div',
                    {
                      className: 'px-4 space-y-2',
                      children: [
                        (0, a.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children: e.title,
                        }),
                        (0, a.jsx)('div', {
                          className: 'codeblock-container',
                          children: (0, a.jsx)('div', {
                            className: 'bg rounded p-2',
                            children: (0, a.jsx)(u.c, {
                              className: t,
                              children: e[t],
                            }),
                          }),
                        }),
                      ],
                    },
                    e.key
                  )
                ),
              ],
            });
          },
          P = (e) => {
            let { language: t, apikey: n, endpoint: r } = e,
              { ref: i } = (0, s.UO)(),
              o = (0, d.WZ)(),
              { data: l } = (0, T.K)({ projectRef: i }),
              c = o.activeDocsSection[1],
              u = (null != l ? l : []).find((e) => e.name === c),
              p = null == u ? void 0 : u.allowed_mime_types,
              m = null == u ? void 0 : u.file_size_limit;
            return void 0 === u
              ? null
              : (0, a.jsxs)('div', {
                  className: 'divide-y',
                  'data-sentry-component': 'Bucket',
                  'data-sentry-source-file': 'Bucket.tsx',
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'space-y-1 px-4 py-4',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex items-center space-x-2',
                          children: [
                            (0, a.jsx)('h2', {
                              className: 'text-xl',
                              children: u.name,
                            }),
                            (0, a.jsx)(I.C, {
                              variant: u.public ? 'warning' : 'default',
                              'data-sentry-element': 'Badge',
                              'data-sentry-source-file': 'Bucket.tsx',
                              children: u.public ? 'Public' : 'Private',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          className: 'text-sm text-foreground-light',
                          children: [
                            'Allowed MIME types:',
                            ' ',
                            null === p
                              ? 'All types are allowed'
                              : 0 === (null != p ? p : []).length
                                ? 'No types are allowed'
                                : (null != p ? p : []).length > 1
                                  ? (null != p ? p : []).join(', ')
                                  : 'Unknown',
                          ],
                        }),
                        (0, a.jsxs)('p', {
                          className: 'text-sm text-foreground-light',
                          children: [
                            'Max file size limit:',
                            ' ',
                            null === m ? 'No limit' : ''.concat((0, C.td)(m)),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: t,
                      snippet: g.uploadFile,
                      codeSnippets: g.uploadFile.code({
                        name: c,
                        apikey: n,
                        endpoint: r,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Bucket.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: t,
                      snippet: g.deleteFiles,
                      codeSnippets: g.deleteFiles.code({
                        name: c,
                        apikey: n,
                        endpoint: r,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Bucket.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: t,
                      snippet: g.listFiles,
                      codeSnippets: g.listFiles.code({
                        name: c,
                        apikey: n,
                        endpoint: r,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Bucket.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: t,
                      snippet: g.downloadFile,
                      codeSnippets: g.downloadFile.code({
                        name: c,
                        apikey: n,
                        endpoint: r,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Bucket.tsx',
                    }),
                    u.public
                      ? (0, a.jsx)(O, {
                          selectedLanguage: t,
                          snippet: g.retrievePublicURL,
                          codeSnippets: g.retrievePublicURL.code({
                            name: c,
                            apikey: n,
                            endpoint: r,
                          }),
                        })
                      : (0, a.jsx)(O, {
                          selectedLanguage: t,
                          snippet: g.createSignedURL,
                          codeSnippets: g.createSignedURL.code({
                            name: c,
                            apikey: n,
                            endpoint: r,
                          }),
                        }),
                  ],
                });
          },
          B = n(7429),
          F = (e) => {
            let { language: t, apikey: n = 'API_KEY', endpoint: r } = e,
              { ref: i } = (0, s.UO)(),
              o = (0, d.WZ)(),
              { data: l } = (0, B.I)({ projectRef: i }),
              c = o.activeDocsSection[1],
              u = (null != l ? l : []).find((e) => e.name === c);
            return void 0 === u
              ? null
              : (0, a.jsxs)('div', {
                  className: 'divide-y',
                  'data-sentry-component': 'Bucket',
                  'data-sentry-source-file': 'EdgeFunction.tsx',
                  children: [
                    (0, a.jsx)('div', {
                      className: 'space-y-1 px-4 py-4',
                      children: (0, a.jsx)('div', {
                        className: 'flex items-center space-x-2',
                        children: (0, a.jsx)('h2', {
                          className: 'text-xl',
                          children: u.name,
                        }),
                      }),
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: t,
                      snippet: g.invokeEdgeFunction,
                      codeSnippets: g.invokeEdgeFunction.code({
                        name: c,
                        endpoint: ''.concat(r),
                        apikey: n,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'EdgeFunction.tsx',
                    }),
                  ],
                });
          },
          z = n(57006),
          D = n(13672);
        let U = (e) => {
            {
              let t = document.getElementById(e);
              t && t.scrollIntoView({ behavior: 'smooth' });
            }
          },
          M = (e) => {
            let t = e.lastIndexOf('Note:\nThis is a Primary Key.<pk/>'),
              n = e.lastIndexOf('Note:\nThis is a Foreign Key to'),
              a = e;
            return (
              t >= 0 && (a = a.substring(0, t)),
              n >= 0 && (a = a.substring(0, n)),
              a
            );
          };
        var Z = n(37756),
          q = n(21821),
          W = n(98601),
          Y = n(42026),
          H = n(47482),
          G = (e) => {
            let { simplifiedVersion: t = !1 } = e,
              n = (0, d.WZ)(),
              [s, i] = (0, r.useState)(!1),
              l = (e) => {
                (n.setDocsLanguage(e), i(!1));
              };
            return (0, a.jsx)('div', {
              className: 'flex items-center gap-x-2',
              'data-sentry-component': 'LanguageSelector',
              'data-sentry-source-file': 'LanguageSelector.tsx',
              children: (0, a.jsxs)(Y.J2, {
                modal: !1,
                open: s,
                onOpenChange: i,
                'data-sentry-element': 'Popover_Shadcn_',
                'data-sentry-source-file': 'LanguageSelector.tsx',
                children: [
                  (0, a.jsx)(Y.xo, {
                    asChild: !0,
                    'data-sentry-element': 'PopoverTrigger_Shadcn_',
                    'data-sentry-source-file': 'LanguageSelector.tsx',
                    children: (0, a.jsx)(o.z, {
                      type: 'default',
                      className: t ? 'px-1' : '',
                      icon: t
                        ? 'js' === n.docsLanguage
                          ? (0, a.jsx)('img', {
                              src: ''.concat(
                                Z.GW,
                                '/img/libraries/javascript-icon.svg'
                              ),
                              alt: 'javascript logo',
                              width: '14',
                            })
                          : (0, a.jsx)(q.Z, { size: 14, strokeWidth: 2.5 })
                        : void 0,
                      iconRight:
                        !t && (0, a.jsx)(W.Z, { size: 14, strokeWidth: 2 }),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'LanguageSelector.tsx',
                      children: t
                        ? void 0
                        : 'Language: '.concat(
                            'js' === n.docsLanguage ? 'Javascript' : 'Bash'
                          ),
                    }),
                  }),
                  (0, a.jsx)(Y.yk, {
                    className: 'p-0 w-24',
                    side: 'bottom',
                    align: 'end',
                    'data-sentry-element': 'PopoverContent_Shadcn_',
                    'data-sentry-source-file': 'LanguageSelector.tsx',
                    children: (0, a.jsx)(H.mY, {
                      'data-sentry-element': 'Command_Shadcn_',
                      'data-sentry-source-file': 'LanguageSelector.tsx',
                      children: (0, a.jsx)(H.e8, {
                        'data-sentry-element': 'CommandList_Shadcn_',
                        'data-sentry-source-file': 'LanguageSelector.tsx',
                        children: (0, a.jsxs)(H.fu, {
                          'data-sentry-element': 'CommandGroup_Shadcn_',
                          'data-sentry-source-file': 'LanguageSelector.tsx',
                          children: [
                            (0, a.jsx)(H.di, {
                              className: 'cursor-pointer',
                              onSelect: () => l('js'),
                              onClick: () => l('js'),
                              'data-sentry-element': 'CommandItem_Shadcn_',
                              'data-sentry-source-file': 'LanguageSelector.tsx',
                              children: (0, a.jsx)('p', {
                                children: 'Javascript',
                              }),
                            }),
                            (0, a.jsx)(H.di, {
                              className: 'cursor-pointer',
                              onSelect: () => l('bash'),
                              onClick: () => l('bash'),
                              'data-sentry-element': 'CommandItem_Shadcn_',
                              'data-sentry-source-file': 'LanguageSelector.tsx',
                              children: (0, a.jsx)('p', { children: 'Bash' }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  }),
                ],
              }),
            });
          },
          V = (e) => {
            var t, n;
            let { language: i, apikey: o = '', endpoint: l = '' } = e,
              { ref: c } = (0, s.UO)(),
              u = (0, d.WZ)().activeDocsSection[1],
              { data: p, refetch: m } = (0, D.a)({ projectRef: c }),
              h =
                null == p
                  ? void 0
                  : null === (t = p.definitions) || void 0 === t
                    ? void 0
                    : t[u],
              f =
                void 0 !== h
                  ? Object.entries(h.properties).map((e) => {
                      var t;
                      let [n, a] = e;
                      return {
                        ...a,
                        id: n,
                        required: (null !==
                          (t = null == h ? void 0 : h.required) && void 0 !== t
                          ? t
                          : []
                        ).includes(n),
                      };
                    })
                  : [];
            return ((0, r.useEffect)(() => {
              void 0 !== u && m();
            }, [u]),
            void 0 === u)
              ? null
              : (0, a.jsxs)('div', {
                  className: 'divide-y relative',
                  'data-sentry-component': 'Entity',
                  'data-sentry-source-file': 'Entity.tsx',
                  children: [
                    (0, a.jsxs)('div', {
                      className:
                        'flex items-center justify-between px-4 py-4 sticky top-0 bg-surface-100 z-10 border-b ',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex flex-col gap-y-1',
                          children: [
                            (0, a.jsx)('h2', {
                              className: 'text-xl',
                              children: u,
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                null !==
                                  (n = null == h ? void 0 : h.description) &&
                                void 0 !== n
                                  ? n
                                  : 'No description available',
                            }),
                          ],
                        }),
                        (0, a.jsx)(G, {
                          'data-sentry-element': 'LanguageSelector',
                          'data-sentry-source-file': 'Entity.tsx',
                        }),
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'space-y-2 px-4 py-4 !border-t-0',
                      children: [
                        (0, a.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children: 'Columns',
                        }),
                        (0, a.jsx)(z.Z, {
                          head: [
                            (0, a.jsx)(z.Z.th, { children: 'Name' }, 'name'),
                            (0, a.jsx)(
                              z.Z.th,
                              { children: 'Format' },
                              'format'
                            ),
                            (0, a.jsx)(z.Z.th, { children: 'Type' }, 'type'),
                            (0, a.jsx)(
                              z.Z.th,
                              { children: 'Description' },
                              'description'
                            ),
                          ],
                          body: f.map((e) => {
                            var t;
                            let n = (function (e, t) {
                              if (
                                void 0 === e &&
                                ('jsonb' === t || 'json' === t)
                              )
                                return 'json';
                              switch (e) {
                                case 'string':
                                  return 'string';
                                case 'integer':
                                case 'number':
                                  return 'number';
                                case 'json':
                                  return 'json';
                                case 'boolean':
                                  return 'boolean';
                                default:
                                  return e;
                              }
                            })(e.type, e.format);
                            return (0, a.jsxs)(
                              z.Z.tr,
                              {
                                children: [
                                  (0, a.jsx)(z.Z.td, {
                                    title: e.id,
                                    children: e.id,
                                  }),
                                  (0, a.jsx)(z.Z.td, {
                                    title: e.format,
                                    children: (0, a.jsx)('p', {
                                      className: 'truncate',
                                      children: e.format,
                                    }),
                                  }),
                                  (0, a.jsx)(z.Z.td, { title: n, children: n }),
                                  (0, a.jsx)(z.Z.td, {
                                    title: e.description,
                                    children: M(
                                      null !== (t = e.description) &&
                                        void 0 !== t
                                        ? t
                                        : ''
                                    ).trim(),
                                  }),
                                ],
                              },
                              e.id
                            );
                          }),
                          'data-sentry-element': 'Table',
                          'data-sentry-source-file': 'Entity.tsx',
                        }),
                      ],
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.readRows,
                      codeSnippets: g.readRows.code({
                        resourceId: u,
                        endpoint: l,
                        apikey: o,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.filtering,
                      codeSnippets: g.filtering.code({
                        resourceId: u,
                        endpoint: l,
                        apikey: o,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.insertRows,
                      codeSnippets: g.insertRows.code({
                        resourceId: u,
                        endpoint: l,
                        apikey: o,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.updateRows,
                      codeSnippets: g.updateRows.code({
                        resourceId: u,
                        endpoint: l,
                        apikey: o,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.deleteRows,
                      codeSnippets: g.deleteRows.code({
                        resourceId: u,
                        endpoint: l,
                        apikey: o,
                      }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                    (0, a.jsx)(O, {
                      selectedLanguage: i,
                      snippet: g.subscribeChanges,
                      codeSnippets: g.subscribeChanges.code({ resourceId: u }),
                      'data-sentry-element': 'ResourceContent',
                      'data-sentry-source-file': 'Entity.tsx',
                    }),
                  ],
                });
          },
          X = n(14913);
        let K = (e) => {
          var t, n;
          let { language: i } = e,
            { ref: o } = (0, s.UO)(),
            l = (0, d.WZ)(),
            { data: c, refetch: u } = (0, D.a)({ projectRef: o }),
            { data: p, refetch: m } = (0, X.H)({ projectRef: o }),
            h =
              null !== (n = null == p ? void 0 : p.functions) && void 0 !== n
                ? n
                : [],
            f = l.activeDocsSection[1],
            x = h.find((e) => e.name === f),
            {
              post: { parameters: y },
            } = null != x ? x : {},
            b = null == c ? void 0 : c.paths[null == x ? void 0 : x.path],
            v =
              null == b
                ? void 0
                : null === (t = b.post) || void 0 === t
                  ? void 0
                  : t.summary,
            j = Object.entries(
              y && y[0] && y[0].schema && y[0].schema.properties
                ? y[0].schema.properties
                : {}
            )
              .map((e) => {
                let [t, n] = e;
                return {
                  name: t,
                  ...n,
                  required: y[0].schema.required.includes(t),
                };
              })
              .filter((e) => !!e.name);
          return ((0, r.useEffect)(() => {
            void 0 !== f && (u(), m());
          }, [f]),
          void 0 === x)
            ? null
            : (0, a.jsxs)('div', {
                className: 'divide-y',
                'data-sentry-component': 'RPC',
                'data-sentry-source-file': 'RPC.tsx',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'space-y-1 px-4 py-4',
                    children: [
                      (0, a.jsx)('h2', {
                        className: 'text-xl',
                        children: x.name,
                      }),
                      (0, a.jsx)('p', {
                        className: 'text-sm text-foreground-light',
                        children: null != v ? v : 'No description available',
                      }),
                    ],
                  }),
                  (0, a.jsxs)('div', {
                    className: 'space-y-2 px-4 py-4',
                    children: [
                      (0, a.jsx)('p', {
                        className: 'text-sm text-foreground-light',
                        children: 'Function arguments',
                      }),
                      (0, a.jsx)(z.Z, {
                        head: [
                          (0, a.jsx)(z.Z.th, { children: 'Name' }, 'name'),
                          (0, a.jsx)(z.Z.th, { children: 'Format' }, 'format'),
                          (0, a.jsx)(z.Z.th, { children: 'Type' }, 'type'),
                          (0, a.jsx)(z.Z.th, {}, 'required'),
                        ],
                        body: j.map((e) =>
                          (0, a.jsxs)(
                            z.Z.tr,
                            {
                              children: [
                                (0, a.jsx)(z.Z.td, {
                                  title: e.name,
                                  children: (0, a.jsx)('p', {
                                    className:
                                      'font-mono text-xs text-foreground truncate',
                                    children: e.name,
                                  }),
                                }),
                                (0, a.jsx)(z.Z.td, {
                                  title: e.format,
                                  children: e.format,
                                }),
                                (0, a.jsx)(z.Z.td, {
                                  title: e.type,
                                  children: e.type,
                                }),
                                (0, a.jsx)(z.Z.td, {
                                  children: e.required
                                    ? (0, a.jsx)(I.C, {
                                        variant: 'warning',
                                        children: 'Required',
                                      })
                                    : (0, a.jsx)(I.C, {
                                        variant: 'default',
                                        children: 'Optional',
                                      }),
                                }),
                              ],
                            },
                            e.name
                          )
                        ),
                        'data-sentry-element': 'Table',
                        'data-sentry-source-file': 'RPC.tsx',
                      }),
                    ],
                  }),
                  (0, a.jsx)(O, {
                    selectedLanguage: i,
                    snippet: g.rpcSingle,
                    codeSnippets: g.rpcSingle.code({
                      rpcName: f,
                      rpcParams: j,
                      endpoint: 'endpoint',
                      apiKey: 'apiKey',
                      showBearer: !0,
                    }),
                    'data-sentry-element': 'ResourceContent',
                    'data-sentry-source-file': 'RPC.tsx',
                  }),
                ],
              });
        };
        var $ = n(83145),
          Q = n.n($),
          J = n(50588),
          ee = n(71147),
          et = n(11757),
          en = n(99889);
        let ea = () =>
          (0, a.jsx)('div', {
            className: 'border-t !mt-3 pb-1 mx-3',
            'data-sentry-component': 'Separator',
            'data-sentry-source-file': 'FirstLevelNav.tsx',
          });
        var es = () => {
            var e, t;
            let { ref: n } = (0, s.UO)(),
              i = (0, d.WZ)(),
              {
                projectAuthAll: l,
                projectStorageAll: c,
                projectEdgeFunctionAll: u,
                realtimeAll: p,
              } = (0, ee.N)([
                'project_auth:all',
                'project_storage:all',
                'project_edge_function:all',
                'realtime:all',
              ]),
              m = h.filter((e) =>
                'user-management' === e.key
                  ? l
                  : 'storage' === e.key
                    ? c
                    : 'edge-functions' === e.key
                      ? u
                      : 'realtime' !== e.key || p
              ),
              { data: g } = (0, X.H)({ projectRef: n }),
              x =
                null !== (e = null == g ? void 0 : g.tables) && void 0 !== e
                  ? e
                  : [],
              y =
                null !== (t = null == g ? void 0 : g.functions) && void 0 !== t
                  ? t
                  : [],
              { data: b } = (0, T.K)({ projectRef: n }),
              { data: v } = (0, B.I)({ projectRef: n });
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)('div', {
                  className: 'px-2 py-4  border-b',
                  children: m.map((e) => {
                    let t = i.activeDocsSection[0] === e.key,
                      n = Object.values(f).filter((t) => t.category === e.key);
                    return (0, a.jsxs)(
                      r.Fragment,
                      {
                        children: [
                          (0, a.jsx)('div', {
                            className:
                              'cursor-pointer text-sm py-2 px-3 rounded-md transition '.concat(
                                t ? 'bg-surface-300' : ''
                              ),
                            onClick: () => i.setActiveDocsSection([e.key]),
                            children: e.name,
                          }),
                          t &&
                            n.length > 0 &&
                            (0, a.jsxs)('div', {
                              className: 'space-y-2 py-2',
                              children: [
                                n.map((t) =>
                                  (0, a.jsx)(
                                    'p',
                                    {
                                      title: t.title,
                                      className:
                                        'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                                      onClick: () => {
                                        (i.setActiveDocsSection([e.key]),
                                          U(t.key));
                                      },
                                      children: t.title,
                                    },
                                    t.key
                                  )
                                ),
                                'entities' === e.key &&
                                  (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      x.length > 0 && (0, a.jsx)(ea, {}),
                                      x.map((t) =>
                                        (0, a.jsx)(
                                          'p',
                                          {
                                            title: t.name,
                                            className:
                                              'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                                            onClick: () =>
                                              i.setActiveDocsSection([
                                                e.key,
                                                t.name,
                                              ]),
                                            children: t.name,
                                          },
                                          t.name
                                        )
                                      ),
                                    ],
                                  }),
                                'stored-procedures' === e.key &&
                                  (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      y.length > 0 && (0, a.jsx)(ea, {}),
                                      y.map((t) =>
                                        (0, a.jsx)(
                                          'p',
                                          {
                                            title: t.name,
                                            className:
                                              'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                                            onClick: () =>
                                              i.setActiveDocsSection([
                                                e.key,
                                                t.name,
                                              ]),
                                            children: t.name,
                                          },
                                          t.name
                                        )
                                      ),
                                    ],
                                  }),
                                'storage' === e.key &&
                                  (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      (null != b ? b : []).length > 0 &&
                                        (0, a.jsx)(ea, {}),
                                      (null != b ? b : []).map((t) =>
                                        (0, a.jsx)(
                                          'p',
                                          {
                                            title: t.name,
                                            className:
                                              'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                                            onClick: () =>
                                              i.setActiveDocsSection([
                                                e.key,
                                                t.name,
                                              ]),
                                            children: t.name,
                                          },
                                          t.name
                                        )
                                      ),
                                    ],
                                  }),
                                'edge-functions' === e.key &&
                                  (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      (null != v ? v : []).length > 0 &&
                                        (0, a.jsx)(ea, {}),
                                      (null != v ? v : []).map((t) =>
                                        (0, a.jsx)(
                                          'p',
                                          {
                                            title: t.name,
                                            className:
                                              'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                                            onClick: () =>
                                              i.setActiveDocsSection([
                                                e.key,
                                                t.name,
                                              ]),
                                            children: t.name,
                                          },
                                          t.name
                                        )
                                      ),
                                    ],
                                  }),
                              ],
                            }),
                        ],
                      },
                      e.key
                    );
                  }),
                }),
                (0, a.jsxs)('div', {
                  className: 'px-2 py-4 border-b',
                  children: [
                    (0, a.jsx)(o.z, {
                      block: !0,
                      asChild: !0,
                      type: 'text',
                      size: 'small',
                      icon: (0, a.jsx)(J.Z, {
                        src: ''.concat(Z.GW, '/img/graphql.svg'),
                        style: {
                          width: ''.concat(16, 'px'),
                          height: ''.concat(16, 'px'),
                        },
                        className: 'text-foreground',
                        preProcessor: (e) =>
                          e.replace(
                            /svg/,
                            'svg class="m-auto text-color-inherit"'
                          ),
                      }),
                      onClick: () => i.setShowProjectApiDocs(!1),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'FirstLevelNav.tsx',
                      children: (0, a.jsx)(Q(), {
                        className: '!justify-start',
                        href: '/project/'.concat(n, '/api/graphiql'),
                        'data-sentry-element': 'Link',
                        'data-sentry-source-file': 'FirstLevelNav.tsx',
                        children: 'GraphiQL',
                      }),
                    }),
                    (0, a.jsx)(o.z, {
                      block: !0,
                      asChild: !0,
                      type: 'text',
                      size: 'small',
                      icon: (0, a.jsx)(et.Z, {}),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'FirstLevelNav.tsx',
                      children: (0, a.jsx)(Q(), {
                        href: 'https://supabase.com/docs/guides/graphql',
                        target: '_blank',
                        rel: 'noreferrer',
                        className: '!justify-start',
                        'data-sentry-element': 'Link',
                        'data-sentry-source-file': 'FirstLevelNav.tsx',
                        children: 'GraphQL guide',
                      }),
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  className: 'px-2 py-4',
                  children: [
                    (0, a.jsx)(o.z, {
                      block: !0,
                      asChild: !0,
                      type: 'text',
                      size: 'small',
                      icon: (0, a.jsx)(en.Z, {}),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'FirstLevelNav.tsx',
                      children: (0, a.jsx)(Q(), {
                        href: 'https://supabase.com/docs',
                        target: '_blank',
                        rel: 'noreferrer',
                        className: '!justify-start',
                        'data-sentry-element': 'Link',
                        'data-sentry-source-file': 'FirstLevelNav.tsx',
                        children: 'Documentation',
                      }),
                    }),
                    (0, a.jsx)(o.z, {
                      block: !0,
                      asChild: !0,
                      type: 'text',
                      size: 'small',
                      icon: (0, a.jsx)(et.Z, {}),
                      'data-sentry-element': 'Button',
                      'data-sentry-source-file': 'FirstLevelNav.tsx',
                      children: (0, a.jsx)(Q(), {
                        href: 'https://supabase.com/docs/guides/api',
                        target: '_blank',
                        rel: 'noreferrer',
                        className: '!justify-start',
                        'data-sentry-element': 'Link',
                        'data-sentry-source-file': 'FirstLevelNav.tsx',
                        children: 'REST guide',
                      }),
                    }),
                  ],
                }),
              ],
            });
          },
          er = n(10947),
          ei = n(99163),
          eo = n(68422),
          el = n(10839),
          ec = () => {
            var e, t;
            let { ref: n } = (0, s.UO)(),
              i = (0, d.WZ)(),
              [l, c] = (0, r.useState)(!1),
              u = (0, ei.cg)(),
              { data: p } = (0, X.H)({ projectRef: n }),
              m =
                null !== (e = null == p ? void 0 : p.tables) && void 0 !== e
                  ? e
                  : [],
              h =
                null !== (t = null == p ? void 0 : p.functions) && void 0 !== t
                  ? t
                  : [],
              [f, x] = i.activeDocsSection,
              { data: y } = (0, T.K)({ projectRef: n }),
              { data: v } = (0, B.I)({ projectRef: n }),
              j = (null != y ? y : []).find((e) => e.name === x),
              _ = {
                entities: {
                  title: 'Tables & Views',
                  options: m,
                  docsUrl:
                    'https://supabase.com/docs/reference/javascript/select',
                },
                'stored-procedures': {
                  title: 'Stored Procedures',
                  options: h,
                  docsUrl: 'https://supabase.com/docs/reference/javascript/rpc',
                },
                storage: {
                  title: 'Storage',
                  options: null != y ? y : [],
                  docsUrl:
                    'https://supabase.com/docs/reference/javascript/storage-createbucket',
                },
                'edge-functions': {
                  title: 'Edge Functions',
                  options: null != v ? v : [],
                  docsUrl:
                    'https://supabase.com/docs/reference/javascript/functions-invoke',
                },
              },
              w = (e) => {
                (i.setActiveDocsSection([i.activeDocsSection[0], e]), c(!1));
              },
              N = Object.values(g).filter(
                (e) => e.category === i.activeDocsSection[0]
              );
            return (0, a.jsxs)('div', {
              className: 'py-4',
              'data-sentry-component': 'SecondLevelNav',
              'data-sentry-source-file': 'SecondLevelNav.tsx',
              children: [
                (0, a.jsxs)('div', {
                  className: 'px-4 flex items-center space-x-2 mb-2',
                  children: [
                    u &&
                      (0, a.jsx)(o.z, {
                        type: 'text',
                        icon: (0, a.jsx)(eo.Z, {}),
                        className: 'px-1',
                        onClick: () =>
                          i.setActiveDocsSection([i.activeDocsSection[0]]),
                      }),
                    (0, a.jsx)('p', {
                      className: 'text-sm text-foreground-light capitalize',
                      children: _[f].title,
                    }),
                  ],
                }),
                (0, a.jsxs)(Y.J2, {
                  open: l,
                  onOpenChange: c,
                  modal: !1,
                  'data-sentry-element': 'Popover_Shadcn_',
                  'data-sentry-source-file': 'SecondLevelNav.tsx',
                  children: [
                    (0, a.jsx)(Y.xo, {
                      asChild: !0,
                      'data-sentry-element': 'PopoverTrigger_Shadcn_',
                      'data-sentry-source-file': 'SecondLevelNav.tsx',
                      children: (0, a.jsx)('div', {
                        className: 'px-4',
                        children: (0, a.jsx)(o.z, {
                          block: !0,
                          type: 'default',
                          size: 'small',
                          className: '[&>span]:w-full',
                          'data-sentry-element': 'Button',
                          'data-sentry-source-file': 'SecondLevelNav.tsx',
                          children: (0, a.jsx)('div', {
                            children: (0, a.jsxs)('div', {
                              className:
                                'flex items-center justify-between w-full',
                              children: [
                                (0, a.jsx)('p', {
                                  children: i.activeDocsSection[1],
                                }),
                                (0, a.jsx)('div', {
                                  children: (0, a.jsx)(el.Z, {
                                    className: 'rotate-90',
                                    strokeWidth: 1.5,
                                    size: 12,
                                    'data-sentry-element': 'Code',
                                    'data-sentry-source-file':
                                      'SecondLevelNav.tsx',
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                      }),
                    }),
                    (0, a.jsx)(Y.yk, {
                      className: 'p-0 w-60',
                      side: 'bottom',
                      align: 'center',
                      'data-sentry-element': 'PopoverContent_Shadcn_',
                      'data-sentry-source-file': 'SecondLevelNav.tsx',
                      children: (0, a.jsx)(H.mY, {
                        'data-sentry-element': 'Command_Shadcn_',
                        'data-sentry-source-file': 'SecondLevelNav.tsx',
                        children: (0, a.jsx)(H.e8, {
                          'data-sentry-element': 'CommandList_Shadcn_',
                          'data-sentry-source-file': 'SecondLevelNav.tsx',
                          children: (0, a.jsx)(H.fu, {
                            'data-sentry-element': 'CommandGroup_Shadcn_',
                            'data-sentry-source-file': 'SecondLevelNav.tsx',
                            children: _[f].options.map((e) =>
                              (0, a.jsx)(
                                H.di,
                                {
                                  className: 'cursor-pointer',
                                  onSelect: () => w(e.name),
                                  onClick: () => w(e.name),
                                  children: (0, a.jsx)('p', {
                                    children: e.name,
                                  }),
                                },
                                e.name
                              )
                            ),
                          }),
                        }),
                      }),
                    }),
                  ],
                }),
                (0, a.jsx)('div', {
                  className: 'px-2 py-4 space-y-2',
                  children: N.map((e) =>
                    'storage' === f &&
                    void 0 !== j &&
                    ((!j.public && 'retrieve-public-url' === e.key) ||
                      (j.public && 'create-signed-url' === e.key))
                      ? null
                      : (0, a.jsx)(
                          'p',
                          {
                            title: e.title,
                            className:
                              'text-sm text-foreground-light px-4 text-foreground transition cursor-pointer',
                            onClick: () => U(e.key),
                            children: e.title,
                          },
                          e.key
                        )
                  ),
                }),
                (0, a.jsx)('div', {
                  className: 'px-4 py-4 border-t space-y-2',
                  children: (0, a.jsxs)(er.bZ, {
                    className: 'p-3',
                    'data-sentry-element': 'Alert_Shadcn_',
                    'data-sentry-source-file': 'SecondLevelNav.tsx',
                    children: [
                      (0, a.jsx)(er.Cd, {
                        'data-sentry-element': 'AlertTitle_Shadcn_',
                        'data-sentry-source-file': 'SecondLevelNav.tsx',
                        children: (0, a.jsx)('p', {
                          className: 'text-xs',
                          children: "Unable to find what you're looking for?",
                        }),
                      }),
                      (0, a.jsxs)(er.X, {
                        className: 'space-y-1',
                        'data-sentry-element': 'AlertDescription_Shadcn_',
                        'data-sentry-source-file': 'SecondLevelNav.tsx',
                        children: [
                          (0, a.jsx)('p', {
                            className: 'text-xs !leading-normal',
                            children:
                              'The API methods shown here are only the commonly used ones to get you started building quickly.',
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-xs !leading-normal',
                            children:
                              'Head over to our docs site for the full API documentation.',
                          }),
                          (0, a.jsx)(b.G, {
                            className: '!mt-2',
                            href: _[f].docsUrl,
                            'data-sentry-element': 'DocsButton',
                            'data-sentry-source-file': 'SecondLevelNav.tsx',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
          ed = () => {
            var e, t, n, u, p, m;
            let { ref: h } = (0, s.UO)(),
              f = (0, d.WZ)(),
              g =
                2 === f.activeDocsSection.length &&
                'entities' === f.activeDocsSection[0],
              [y, b] = (0, r.useState)(!1),
              v = f.docsLanguage,
              { data: j } = (0, l.zR)({ projectRef: h }),
              { data: _ } = (0, c.z)({ projectRef: h }),
              { anonKey: N } = (0, l.Pb)(j),
              C =
                y &&
                null !== (p = null == N ? void 0 : N.api_key) &&
                void 0 !== p
                  ? p
                  : 'SUPABASE_CLIENT_ANON_KEY',
              S =
                null !==
                  (m =
                    null == j
                      ? void 0
                      : null === (e = j.app_config) || void 0 === e
                        ? void 0
                        : e.protocol) && void 0 !== m
                  ? m
                  : 'https',
              I =
                null == j
                  ? void 0
                  : null === (t = j.app_config) || void 0 === t
                    ? void 0
                    : t.endpoint,
              T =
                (null == _
                  ? void 0
                  : null === (n = _.customDomain) || void 0 === n
                    ? void 0
                    : n.status) === 'active'
                  ? 'https://'.concat(
                      null === (u = _.customDomain) || void 0 === u
                        ? void 0
                        : u.hostname
                    )
                  : ''.concat(S, '://').concat(null != I ? I : '');
            return (0, a.jsx)(i.ZP, {
              hideFooter: !0,
              size: 'xxlarge',
              className: 'max-w-5xl',
              visible: f.showProjectApiDocs,
              onCancel: () => f.setShowProjectApiDocs(!1),
              'data-sentry-element': 'SidePanel',
              'data-sentry-component': 'ProjectAPIDocs',
              'data-sentry-source-file': 'ProjectAPIDocs.tsx',
              children: (0, a.jsxs)('div', {
                className: 'flex items-start h-full',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'w-72 border-r h-full',
                    children: [
                      (0, a.jsxs)('div', {
                        className:
                          'border-b px-4 py-2 flex items-center justify-between',
                        children: [
                          (0, a.jsx)('h4', { children: 'API Docs' }),
                          (0, a.jsxs)('div', {
                            className: 'flex items-center space-x-1',
                            children: [
                              !g && (0, a.jsx)(G, { simplifiedVersion: !0 }),
                              (0, a.jsx)(o.z, {
                                type: 'default',
                                onClick: () => b(!y),
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file': 'ProjectAPIDocs.tsx',
                                children: y ? 'Hide keys' : 'Show keys',
                              }),
                            ],
                          }),
                        ],
                      }),
                      1 === f.activeDocsSection.length
                        ? (0, a.jsx)(es, {})
                        : (0, a.jsx)(ec, {}),
                    ],
                  }),
                  (0, a.jsxs)('div', {
                    className:
                      'flex-1 divide-y space-y-4 max-h-screen overflow-auto',
                    children: [
                      'introduction' === f.activeDocsSection[0] &&
                        (0, a.jsx)(A, {
                          showKeys: y,
                          language: v,
                          apikey: C,
                          endpoint: T,
                        }),
                      'user-management' === f.activeDocsSection[0] &&
                        (0, a.jsx)(L, { language: v, apikey: C, endpoint: T }),
                      'realtime' === f.activeDocsSection[0] &&
                        (0, a.jsx)(k, { language: v }),
                      'storage' === f.activeDocsSection[0] &&
                        (0, a.jsx)(a.Fragment, {
                          children:
                            void 0 !== f.activeDocsSection[1]
                              ? (0, a.jsx)(P, {
                                  language: v,
                                  apikey: C,
                                  endpoint: T,
                                })
                              : (0, a.jsx)(E, { language: v }),
                        }),
                      'edge-functions' === f.activeDocsSection[0] &&
                        (0, a.jsx)(a.Fragment, {
                          children:
                            void 0 !== f.activeDocsSection[1]
                              ? (0, a.jsx)(F, {
                                  language: v,
                                  apikey: C,
                                  endpoint: T,
                                })
                              : (0, a.jsx)(x, { language: v }),
                        }),
                      'entities' === f.activeDocsSection[0] &&
                        (0, a.jsx)(a.Fragment, {
                          children:
                            void 0 !== f.activeDocsSection[1]
                              ? (0, a.jsx)(V, {
                                  language: v,
                                  apikey: C,
                                  endpoint: T,
                                })
                              : (0, a.jsx)(w, { language: v }),
                        }),
                      'stored-procedures' === f.activeDocsSection[0] &&
                        (0, a.jsx)(a.Fragment, {
                          children:
                            void 0 !== f.activeDocsSection[1]
                              ? (0, a.jsx)(K, { language: v })
                              : (0, a.jsx)(R, { language: v }),
                        }),
                    ],
                  }),
                ],
              }),
            });
          },
          eu = n(65092),
          ep = n(198),
          em = n(42019),
          eh = n(16402),
          ef = n(59171),
          eg = n(77875),
          ex = n.n(eg),
          ey = n(90953),
          eb = n(98686),
          ev = n(26063),
          ej = n(70029),
          e_ = n(32691),
          ew = n(39303),
          eN = n(30457),
          eC = n(45437),
          eS = n(89636),
          eA = n(69072),
          ek = n(28894),
          eE = n(6464),
          eR = n(77025);
        let eL = () => ['api-key'];
        async function eI(e) {
          let t;
          let n = await (0, eE.oT)(),
            a = await fetch(''.concat(Z.GW, '/api/ai/sql/check-api-key'), {
              headers: n,
              signal: e,
            });
          try {
            t = await a.json();
          } catch (e) {}
          if (!a.ok) throw new eR.V(null == t ? void 0 : t.message, a.status);
          return t;
        }
        let eT = function () {
          let { enabled: e = !0, ...t } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (0, ek.a)(
            eL(),
            (e) => {
              let { signal: t } = e;
              return eI(t);
            },
            { enabled: !Z.Qy && e, ...t }
          );
        };
        var eO = n(58351),
          eP = n(69951),
          eB = n(79581),
          eF = n(82288),
          ez = n(90817),
          eD = n(18293),
          eU = n(75541),
          eM = n(62432),
          eZ = n(21786),
          eq = n(38872),
          eW = n(49825),
          eY = n(77060),
          eH = n(40577),
          eG = n(33526),
          eV = n(89129),
          eX = n(52675),
          eK = n(16196);
        let e$ = (0, r.forwardRef)((e, t) => {
          let { className: n, value: s, ...i } = e,
            o = (0, r.useRef)(null);
          return (
            (0, r.useImperativeHandle)(t, () => o.current),
            (0, r.useEffect)(() => {
              if (o) {
                if (o.current && !s) o.current.style.height = '40px';
                else if (o && o.current) {
                  o.current.style.height = 'auto';
                  let e = o.current.scrollHeight + 'px';
                  o.current.style.height = e;
                }
              }
            }, [s, o]),
            (0, a.jsx)(eK.K, {
              ref: o,
              rows: 1,
              'aria-expanded': !1,
              className: (0, eu.cn)(
                'transition-all resize-none leading-6 box-border',
                n
              ),
              value: s,
              ...i,
            })
          );
        });
        e$.displayName = 'ExpandingTextArea';
        let eQ = r.forwardRef((e, t) => {
          let {
              loading: n = !1,
              disabled: i = !1,
              value: o = '',
              textAreaRef: l,
              commandsOpen: c = !1,
              icon: d = null,
              onValueChange: u,
              setCommandsOpen: p,
              onSubmit: m,
              placeholder: h,
              ...f
            } = e,
            g = (0, r.useRef)(null),
            x = (0, r.useRef)(null),
            y = (0, s.Gc)('md');
          return (0, a.jsxs)('form', {
            id: 'assistant-chat',
            ref: g,
            ...f,
            onSubmit: m,
            className: (0, eu.cn)('relative', f.className),
            children: [
              d &&
                (0, a.jsx)('div', {
                  className: (0, eu.cn)(
                    'absolute',
                    'top-2 left-2',
                    'ml-1 w-6 h-6 rounded-full bg-dbnew'
                  ),
                  children: d,
                }),
              (0, a.jsx)(e$, {
                ref: l,
                autoFocus: y,
                disabled: i,
                className: (0, eu.cn)(
                  d ? 'pl-12' : '',
                  'text-sm pr-10 rounded-[18px]'
                ),
                placeholder: h,
                spellCheck: !1,
                value: o,
                onChange: (e) => u(e),
                onKeyDown: (e) => {
                  ('Enter' !== e.key ||
                    13 !== e.keyCode ||
                    e.shiftKey ||
                    c ||
                    (e.preventDefault(), x.current && x.current.click()),
                    'Enter' === e.key && c && p && p(!1));
                },
              }),
              (0, a.jsxs)('div', {
                className: 'absolute right-1.5 top-1.5 flex gap-3 items-center',
                children: [
                  n &&
                    (0, a.jsx)(eX.Z, {
                      size: 22,
                      className: 'animate-spin w-7 h-7 text-muted',
                      strokeWidth: 1,
                    }),
                  (0, a.jsx)('button', {
                    ref: x,
                    type: 'submit',
                    className: (0, eu.cn)(
                      'transition-all',
                      'flex items-center justify-center w-7 h-7 border border-control rounded-full mr-0.5 p-1.5 background-alternative',
                      o ? 'text-default opacity-100' : 'text-muted opacity-50',
                      n && 'hidden'
                    ),
                    children: (0, a.jsx)('svg', {
                      width: '16',
                      height: '16',
                      viewBox: '0 0 16 16',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                      children: (0, a.jsx)('path', {
                        fillRule: 'evenodd',
                        clipRule: 'evenodd',
                        d: 'M13.5 3V2.25H15V3V10C15 10.5523 14.5522 11 14 11H3.56062L5.53029 12.9697L6.06062 13.5L4.99996 14.5607L4.46963 14.0303L1.39641 10.9571C1.00588 10.5666 1.00588 9.93342 1.39641 9.54289L4.46963 6.46967L4.99996 5.93934L6.06062 7L5.53029 7.53033L3.56062 9.5H13.5V3Z',
                        fill: 'currentColor',
                      }),
                    }),
                  }),
                ],
              }),
            ],
          });
        });
        eQ.displayName = 'AssistantChatFormComponent';
        let eJ = (0, r.memo)(eQ);
        var e0 = n(32002),
          e1 = (e) => {
            let { rows: t, columns: n, count: s } = e,
              r = {
                hidden: { opacity: 0 },
                visible: {
                  opacity: [1, 0.5, 1],
                  transition: {
                    repeat: 1 / 0,
                    duration: 0.5,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  },
                },
              };
            return (0, a.jsx)('div', {
              className: 'relative w-full h-full',
              style: {
                maskImage: 'linear-gradient(to bottom, black, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black, transparent)',
              },
              'data-sentry-component': 'DotGrid',
              'data-sentry-source-file': 'DotGrid.tsx',
              children: (0, a.jsx)(eh.E.div, {
                className:
                  'grid w-full h-full justify-between items-space-between items-start',
                style: {
                  gridTemplateColumns: 'repeat('.concat(n, ', 1px)'),
                  gridTemplateRows: 'repeat('.concat(t, ', 1fr)'),
                  rowGap: 'auto',
                },
                variants: {
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                  },
                },
                initial: 'hidden',
                animate: 'visible',
                'aria-label': 'Grid of '
                  .concat(t * n, ' dots, ')
                  .concat(s, ' highlighted'),
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'DotGrid.tsx',
                children: Array.from({ length: t * n }).map((e, t) =>
                  (0, a.jsx)(
                    eh.E.div,
                    {
                      variants: r,
                      className: 'w-[1px] h-[1px] rounded-full bg-foreground',
                    },
                    t
                  )
                ),
              }),
            });
          },
          e2 = n(77089),
          e4 = n(40177),
          e5 = n(52114);
        function e3(e) {
          let { setMessages: t, onSendMessage: n } = e,
            s = (e) => {
              n(e);
            };
          return (0, a.jsx)('div', {
            className:
              'w-full p-5 flex flex-col grow shrink-0 justify-end overflow-auto',
            'data-sentry-component': 'AIOnboarding',
            'data-sentry-source-file': 'AIOnboarding.tsx',
            children: (0, a.jsxs)('div', {
              className: 'shrink-0',
              children: [
                (0, a.jsxs)(eh.E.div, {
                  initial: { x: -10, opacity: 0 },
                  animate: { x: 0, opacity: 1 },
                  transition: { delay: 0 },
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'AIOnboarding.tsx',
                  children: [
                    (0, a.jsx)('p', {
                      className: 'text-base mb-2',
                      children: 'How can I assist you?',
                    }),
                    (0, a.jsx)('p', {
                      className: 'text-sm text-foreground-lighter mb-4',
                      children:
                        'I can help you build and manage your database by writing SQL or supabase-js, set up policies, functions or triggers, and query your data - ask me anything.',
                    }),
                  ],
                }),
                (0, a.jsxs)(eh.E.div, {
                  'data-sentry-element': 'unknown',
                  'data-sentry-source-file': 'AIOnboarding.tsx',
                  children: [
                    (0, a.jsx)(eh.E.div, {
                      initial: { x: -10, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                      transition: { delay: 0 },
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'AIOnboarding.tsx',
                      children: (0, a.jsxs)(e5.GZ, {
                        className: 'border-b border-muted py-3',
                        'data-sentry-element': 'InnerSideMenuCollapsible',
                        'data-sentry-source-file': 'AIOnboarding.tsx',
                        children: [
                          (0, a.jsx)(e5.Qn, {
                            className: 'px-0 -mx-3',
                            title: 'Tables',
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleTrigger',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                          }),
                          (0, a.jsx)(e5.rt, {
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleContent',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'mt-3 mb-1 space-y-1',
                              children: [
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e2.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      "Create a table of countries and a table of cities. The cities table should have a country column that's a foreign key to the countries table."
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Create a new table',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(ev.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Give me a list of new users from the auth.users table who signed up in the past week'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Query your data',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e4.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Give me a chart showing the number of new sign ups in the auth.users table per day over the last week'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Chart your data',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsx)(eh.E.div, {
                      initial: { x: -10, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                      transition: { delay: 0.1 },
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'AIOnboarding.tsx',
                      children: (0, a.jsxs)(e5.GZ, {
                        className: 'border-b border-muted py-3',
                        'data-sentry-element': 'InnerSideMenuCollapsible',
                        'data-sentry-source-file': 'AIOnboarding.tsx',
                        children: [
                          (0, a.jsx)(e5.Qn, {
                            className: 'px-0 -mx-3',
                            title: 'RLS Policies',
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleTrigger',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                          }),
                          (0, a.jsx)(e5.rt, {
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleContent',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'mt-3 mb-1 space-y-1',
                              children: [
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e2.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Suggest some database RLS policies I can add to my public schema'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Suggest RLS policies',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(ev.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Generate some examples of database RLS policies'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Examples of RLS policies',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e4.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s('What are database RLS policies'),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'What are RLS policies?',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsx)(eh.E.div, {
                      initial: { x: -10, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                      transition: { delay: 0.2 },
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'AIOnboarding.tsx',
                      children: (0, a.jsxs)(e5.GZ, {
                        className: 'border-b border-muted py-3',
                        'data-sentry-element': 'InnerSideMenuCollapsible',
                        'data-sentry-source-file': 'AIOnboarding.tsx',
                        children: [
                          (0, a.jsx)(e5.Qn, {
                            className: 'px-0 -mx-3',
                            title: 'Functions',
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleTrigger',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                          }),
                          (0, a.jsx)(e5.rt, {
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleContent',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'mt-3 mb-1 space-y-1',
                              children: [
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e2.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Suggest some database functions I can add to my public schema'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Suggest database functions',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(ev.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Generate some examples of database functions'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Examples of database functions',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e4.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s('What are database functions'),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'What are database functions?',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsx)(eh.E.div, {
                      initial: { x: -10, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                      transition: { delay: 0.3 },
                      'data-sentry-element': 'unknown',
                      'data-sentry-source-file': 'AIOnboarding.tsx',
                      children: (0, a.jsxs)(e5.GZ, {
                        className: 'py-3',
                        'data-sentry-element': 'InnerSideMenuCollapsible',
                        'data-sentry-source-file': 'AIOnboarding.tsx',
                        children: [
                          (0, a.jsx)(e5.Qn, {
                            className: 'px-0 -mx-3',
                            title: 'Triggers',
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleTrigger',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                          }),
                          (0, a.jsx)(e5.rt, {
                            'data-sentry-element':
                              'InnerSideMenuCollapsibleContent',
                            'data-sentry-source-file': 'AIOnboarding.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'mt-3 mb-1 space-y-1',
                              children: [
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e2.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Suggest some database triggers I can add to my public schema'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Suggest database Triggers',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(ev.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s(
                                      'Generate some examples of database triggers'
                                    ),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'Examples of database triggers',
                                }),
                                (0, a.jsx)(o.z, {
                                  size: 'small',
                                  icon: (0, a.jsx)(e4.Z, {
                                    strokeWidth: 1.5,
                                    size: 16,
                                  }),
                                  type: 'text',
                                  className: 'w-full justify-start py-1 h-auto',
                                  onClick: () =>
                                    s('What are database triggers'),
                                  'data-sentry-element': 'Button',
                                  'data-sentry-source-file': 'AIOnboarding.tsx',
                                  children: 'What are database triggers?',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        }
        var e6 = n(37393),
          e8 = n(49935),
          e9 = (e) => {
            let { onRemove: t, ...n } = e,
              [s, i] = (0, r.useState)(!1),
              l = n.value || n.children,
              c = s
                ? l
                : (null == l ? void 0 : l.substring(0, l.indexOf('\n'))) || l;
            return (0, a.jsx)('div', {
              className: 'relative',
              'data-sentry-component': 'CollapsibleCodeBlock',
              'data-sentry-source-file': 'CollapsibleCodeBlock.tsx',
              children: (0, a.jsxs)('div', {
                className: (0, eu.cn)(
                  'flex items-center gap-1 p-1 bg-surface-100 border border-default w-full overflow-hidden',
                  'rounded-md'
                ),
                children: [
                  (0, a.jsx)(o.z, {
                    type: 'text',
                    size: 'tiny',
                    className: 'w-6 h-6',
                    onClick: () => i(!s),
                    icon: s
                      ? (0, a.jsx)(e6.Z, { size: 14 })
                      : (0, a.jsx)(W.Z, { size: 14 }),
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'CollapsibleCodeBlock.tsx',
                  }),
                  (0, a.jsx)('div', {
                    className:
                      'flex-1 shrink-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
                    children: (0, a.jsx)(e8.d, {
                      ...n,
                      value: c,
                      hideCopy: !0,
                      className: (0, eu.cn)(
                        'block !bg-transparent max-h-32 max-w-full !py-0 !px-0 !border-t-0 prose dark:prose-dark border-0 text-foreground !rounded-none w-full text-wrap whitespace-pre-wrap',
                        '[&>code]:m-0 [&>code>span]:flex border-t-0 [&>code>span]:flex-wrap [&>code]:block [&>code>span]:text-foreground text-wrap whitespace-pre-wrap',
                        n.className
                      ),
                      'data-sentry-element': 'CodeBlock',
                      'data-sentry-source-file': 'CollapsibleCodeBlock.tsx',
                    }),
                  }),
                  t &&
                    (0, a.jsx)(o.z, {
                      type: 'text',
                      size: 'tiny',
                      className: 'shrink-0 w-6 h-6',
                      onClick: t,
                      icon: (0, a.jsx)(eb.Z, { size: 14 }),
                    }),
                ],
              }),
            });
          },
          e7 = n(73981),
          te = n(87831),
          tt = n(4938),
          tn = n(35136),
          ta = n(7756),
          ts = n(81514);
        function tr(e) {
          let {
              value: t,
              delay: n = 500,
              fallback: s = (0, a.jsx)('div', {
                className: 'text-sm',
                children: 'Loading...',
              }),
              children: i,
            } = e,
            [o, l] = (0, r.useState)(!1),
            c = (0, r.useRef)(),
            d = (0, r.useRef)(t),
            u = (0, r.useRef)(!0);
          return (
            (0, r.useEffect)(
              () => (
                (u.current || d.current !== t) &&
                  (l(!1),
                  (d.current = t),
                  c.current && clearTimeout(c.current),
                  (c.current = setTimeout(() => {
                    (l(!0), (u.current = !1));
                  }, n))),
                () => {
                  c.current && clearTimeout(c.current);
                }
              ),
              [t, n]
            ),
            o ? i : s
          );
        }
        var ti = n(24996),
          to = n(73652),
          tl = n(36457),
          tc = n(64618),
          td = n(23240);
        async function tu(e) {
          let { projectRef: t, metadata: n, files: a } = e;
          if (!t) throw Error('projectRef is required');
          let { data: s, error: r } = await (0, eE.v_)(
            '/v1/projects/{ref}/functions/deploy',
            {
              params: { path: { ref: t }, query: { slug: n.name } },
              body: { file: a, metadata: n },
              bodySerializer(e) {
                let t = new FormData();
                return (
                  t.append('metadata', JSON.stringify(e.metadata)),
                  e.file.forEach((e) => {
                    let n = new Blob([e.content], { type: 'text/plain' });
                    t.append('file', n, e.name);
                  }),
                  t
                );
              },
            }
          );
          return (r && (0, eE.S3)(r), s);
        }
        let tp = function () {
          let {
              onSuccess: e,
              onError: t,
              ...n
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            a = (0, tl.NL)();
          return (0, tc.D)((e) => tu(e), {
            async onSuccess(t, n, s) {
              let { projectRef: r } = n;
              (await Promise.all([a.invalidateQueries(td.f.list(r))]),
                await (null == e ? void 0 : e(t, n, s)));
            },
            async onError(e, n, a) {
              void 0 === t
                ? y.Am.error(
                    'Failed to deploy edge function: '.concat(e.message)
                  )
                : t(e, n, a);
            },
            ...n,
          });
        };
        var tm = n(8561),
          th = n(88020);
        let tf = (e) => {
            var t;
            let {
                label: n,
                code: i,
                functionName: c,
                actions: d,
                showCode: u = !1,
                tooltip: p,
              } = e,
              { ref: m } = (0, s.UO)(),
              [h, f] = (0, r.useState)(!1),
              [g, x] = (0, r.useState)(!1),
              { data: b } = (0, l.zR)({ projectRef: m }),
              { data: v } = (0, th.J)({ projectRef: m, slug: c }),
              { mutateAsync: j, isLoading: _ } = tp({
                onSuccess: () => {
                  (f(!0), y.Am.success('Successfully deployed edge function'));
                },
              }),
              w = async () => {
                if (i && !_ && m) {
                  if (v) return x(!0);
                  try {
                    await j({
                      projectRef: m,
                      metadata: {
                        entrypoint_path: 'index.ts',
                        name: c,
                        verify_jwt: !0,
                      },
                      files: [{ name: 'index.ts', content: i }],
                    });
                  } catch (e) {
                    y.Am.error(
                      'Failed to deploy function: '.concat(
                        e instanceof Error ? e.message : 'Unknown error'
                      )
                    );
                  }
                }
              },
              N = 'Function URL not available',
              C =
                null == b
                  ? void 0
                  : null === (t = b.app_config) || void 0 === t
                    ? void 0
                    : t.endpoint;
            if (C) {
              let e = 'https://'.concat(C),
                t = e ? new URL(e).hostname.split('.').pop() : 'co';
              N =
                m && c && t
                  ? 'https://'
                      .concat(m, '.supabase.')
                      .concat(t, '/functions/v1/')
                      .concat(c)
                  : 'Function URL will be available after deployment';
            }
            return (0, a.jsxs)(tm.b, {
              tooltip: p,
              icon: (0, a.jsx)(el.Z, {
                size: 16,
                strokeWidth: 1.5,
                className: 'text-foreground-muted',
              }),
              label: n,
              actions:
                m && c
                  ? (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(o.z, {
                          type: 'outline',
                          size: 'tiny',
                          loading: _,
                          disabled: !m,
                          onClick: w,
                          children: _ ? 'Deploying...' : 'Deploy',
                        }),
                        d,
                      ],
                    })
                  : null,
              'data-sentry-element': 'ReportBlockContainer',
              'data-sentry-component': 'EdgeFunctionBlock',
              'data-sentry-source-file': 'EdgeFunctionBlock.tsx',
              children: [
                g &&
                  m &&
                  c &&
                  (0, a.jsxs)(eG.J, {
                    type: 'warning',
                    className:
                      'mb-0 rounded-none border-0 border-b shrink-0 bg-background-100',
                    children: [
                      (0, a.jsxs)('p', {
                        children: [
                          'An edge function with the name "',
                          c,
                          '" already exists.',
                        ],
                      }),
                      (0, a.jsx)('p', {
                        className: 'text-foreground-light',
                        children:
                          'Deploying will replace the existing function. Are you sure you want to proceed?',
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex justify-stretch mt-2 gap-2',
                        children: [
                          (0, a.jsx)(o.z, {
                            type: 'outline',
                            size: 'tiny',
                            className: 'w-full flex-1',
                            onClick: () => x(!1),
                            children: 'Cancel',
                          }),
                          (0, a.jsx)(o.z, {
                            type: 'danger',
                            size: 'tiny',
                            className: 'w-full flex-1',
                            onClick: async () => {
                              x(!1);
                              try {
                                await j({
                                  projectRef: m,
                                  metadata: {
                                    entrypoint_path: 'index.ts',
                                    name: c,
                                    verify_jwt: !0,
                                  },
                                  files: [{ name: 'index.ts', content: i }],
                                });
                              } catch (e) {
                                y.Am.error(
                                  'Failed to deploy function: '.concat(
                                    e instanceof Error
                                      ? e.message
                                      : 'Unknown error'
                                  )
                                );
                              }
                            },
                            children: 'Replace function',
                          }),
                        ],
                      }),
                    ],
                  }),
                (0, a.jsx)('div', {
                  className: 'shrink-0 w-full max-h-96 overflow-y-auto',
                  children: (0, a.jsx)(e8.d, {
                    hideLineNumbers: !0,
                    wrapLines: !1,
                    value: i,
                    language: 'typescript',
                    className: (0, eu.cn)(
                      'max-w-none block !bg-transparent !py-3 !px-3.5 prose dark:prose-dark border-0 text-foreground !rounded-none w-full',
                      '[&>code]:m-0 [&>code>span]:text-foreground'
                    ),
                    'data-sentry-element': 'CodeBlock',
                    'data-sentry-source-file': 'EdgeFunctionBlock.tsx',
                  }),
                }),
                (_ || h) &&
                  (0, a.jsx)('div', {
                    className: 'p-4 w-full border-t bg-surface-75 text-xs',
                    children: _
                      ? (0, a.jsx)('p', {
                          className: 'text-foreground-light',
                          children: 'Deploying function...',
                        })
                      : (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsxs)('p', {
                              className: 'text-foreground-light mb-2',
                              children: [
                                'The',
                                ' ',
                                (0, a.jsx)(Q(), {
                                  className: 'text-foreground',
                                  href: '/project/'
                                    .concat(m, '/functions/')
                                    .concat(c, '/details'),
                                  children: 'new function',
                                }),
                                ' ',
                                'is now live at:',
                              ],
                            }),
                            (0, a.jsx)(e8.d, {
                              language: 'bash',
                              hideLineNumbers: !0,
                              value: N,
                              className: 'text-xs p-2',
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-foreground-light mt-4 mb-2',
                              children:
                                'To download and work on this function locally, use the CLI command:',
                            }),
                            (0, a.jsx)(e8.d, {
                              hideLineNumbers: !0,
                              language: 'bash',
                              value: 'supabase functions download '.concat(c),
                              className: 'text-xs p-2',
                            }),
                          ],
                        }),
                  }),
              ],
            });
          },
          tg = (0, r.memo)((e) => {
            let { children: t } = e;
            return (0, a.jsx)('ol', {
              className: 'flex flex-col gap-y-4',
              children: t,
            });
          });
        tg.displayName = 'OrderedList';
        let tx = (0, r.memo)((e) => {
          let { children: t } = e;
          return (0, a.jsx)('li', { className: '[&>pre]:mt-2', children: t });
        });
        tx.displayName = 'ListItem';
        let ty = (0, r.memo)((e) => {
          let { children: t } = e;
          return (0, a.jsx)('h3', { className: 'underline', children: t });
        });
        ty.displayName = 'Heading3';
        let tb = (0, r.memo)((e) => {
          let { className: t, children: n } = e;
          return (0, a.jsx)('code', {
            className: (0, eu.cn)('text-xs', t),
            children: n,
          });
        });
        tb.displayName = 'InlineCode';
        let tv = (0, r.memo)((e) => {
          let { href: t, children: n } = e;
          return (0, a.jsx)('a', {
            target: '_blank',
            rel: 'noopener noreferrer',
            href: t,
            className:
              'underline transition underline-offset-2 decoration-foreground-lighter decoration-foreground text-foreground',
            children: n,
          });
        });
        tv.displayName = 'Link';
        let tj = (0, r.memo)((e) => {
          let {
            sql: t,
            title: n,
            xAxis: s,
            yAxis: r,
            isChart: i,
            isLoading: o,
            isDraggable: l,
            runQuery: c,
            onRunQuery: d,
            onDragStart: u,
            onUpdateChartConfig: p,
          } = e;
          return (0, a.jsx)(tr, {
            delay: 500,
            value: t,
            fallback: (0, a.jsx)('div', {
              className:
                'bg-surface-100 border-overlay rounded border  px-3 py-2 text-xs',
              children: 'Writing SQL...',
            }),
            children: (0, a.jsx)(ti.L, {
              lockColumns: !0,
              label: n,
              sql: t,
              chartConfig: {
                type: 'bar',
                cumulative: !1,
                xKey: null != s ? s : '',
                yKey: null != r ? r : '',
                view: i ? 'chart' : 'table',
              },
              tooltip: l
                ? (0, a.jsxs)('div', {
                    className: 'flex items-center gap-x-2',
                    children: [
                      (0, a.jsx)(I.C, {
                        variant: 'success',
                        className: 'text-xs rounded px-1',
                        children: 'NEW',
                      }),
                      (0, a.jsx)('p', {
                        children:
                          'Drag to add this chart into your custom report',
                      }),
                    ],
                  })
                : void 0,
              showSql: !i,
              isChart: i,
              isLoading: o,
              draggable: l,
              runQuery: c,
              onRunQuery: d,
              onDragStart: u,
              onUpdateChartConfig: p,
            }),
          });
        });
        tj.displayName = 'MemoizedQueryBlock';
        let t_ = (0, r.createContext)({ isLoading: !1 }),
          tw = {
            ol: tg,
            li: tx,
            h3: ty,
            code: tb,
            a: tv,
            pre: (e) => {
              var t;
              let { children: n } = e,
                s = (0, e_.useRouter)(),
                { profile: i } = (0, ts.Un)(),
                { isLoading: o, readOnly: l } = (0, r.useContext)(t_),
                { mutate: c } = (0, eF.a)(),
                d = (0, eZ.P)('reportsV2'),
                u = (0, ez.Xo)(ep.KA.CREATE, 'user_content', {
                  resource: {
                    type: 'sql',
                    owner_id: null == i ? void 0 : i.id,
                  },
                  subject: { id: null == i ? void 0 : i.id },
                }),
                p = (0, r.useRef)({
                  view: 'table',
                  type: 'bar',
                  xKey: '',
                  yKey: '',
                  cumulative: !1,
                }),
                m =
                  (null === (t = n[0].props.className) || void 0 === t
                    ? void 0
                    : t.replace('language-', '')) || 'sql',
                h = n[0].props.children[0],
                f = h.match(/--\s*props:\s*(\{[^}]+\})/),
                g = (0, r.useMemo)(() => (f ? JSON.parse(f[1]) : {}), [f]),
                { xAxis: x, yAxis: y } = g,
                b = g.title || ('edge' === m ? 'Edge Function' : 'SQL Query'),
                v = 'true' === g.isChart,
                j = 'true' === g.runQuery,
                _ = h.replace(/--\s*props:\s*\{[^}]+\}/, '').trim(),
                w = d && u && s.pathname.endsWith('/reports/[id]');
              (0, r.useEffect)(() => {
                p.current = {
                  ...p.current,
                  view: v ? 'chart' : 'table',
                  xKey: null != x ? x : '',
                  yKey: null != y ? y : '',
                };
              }, [g]);
              let N = async (e) => {
                var t;
                c({
                  action: eN.b.ASSISTANT_SUGGESTION_RUN_QUERY_CLICKED,
                  properties: {
                    queryType: e,
                    ...('mutation' === e
                      ? {
                          category:
                            null !== (t = (0, to.Dk)(_)) && void 0 !== t
                              ? t
                              : 'unknown',
                        }
                      : {}),
                  },
                });
              };
              return (0, a.jsx)('div', {
                className: 'w-auto -ml-[36px] overflow-x-hidden',
                'data-sentry-component': 'MarkdownPre',
                'data-sentry-source-file': 'MessageMarkdown.tsx',
                children:
                  'edge' === m
                    ? (0, a.jsx)(tf, {
                        label: b,
                        code: _,
                        functionName: g.name || 'my-function',
                        showCode: !l,
                      })
                    : 'sql' === m
                      ? l
                        ? (0, a.jsx)(e9, {
                            value: _,
                            language: 'sql',
                            hideLineNumbers: !0,
                          })
                        : (0, a.jsx)(tj, {
                            sql: _,
                            title: b,
                            xAxis: x,
                            yAxis: y,
                            isChart: v,
                            isLoading: o,
                            isDraggable: w,
                            runQuery: j,
                            onRunQuery: N,
                            onUpdateChartConfig: (e) => {
                              let { chartConfig: t } = e;
                              p.current = { ...p.current, ...t };
                            },
                            onDragStart: (e) => {
                              e.dataTransfer.setData(
                                'application/json',
                                JSON.stringify({
                                  label: b,
                                  sql: _,
                                  config: p.current,
                                })
                              );
                            },
                          })
                      : (0, a.jsx)(e8.d, {
                          hideLineNumbers: !0,
                          value: _,
                          language: m,
                          className: (0, eu.cn)(
                            'max-h-96 max-w-none block border rounded !bg-transparent !py-3 !px-3.5 prose dark:prose-dark text-foreground',
                            '[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap [&>code]:block [&>code>span]:text-foreground'
                          ),
                        }),
              });
            },
          },
          tN = function (e) {
            let {
                role: t,
                content: n,
                isLoading: s,
                readOnly: i,
                children: o,
                action: l = null,
                variant: c = 'default',
              } = e,
              d = 'user' === t,
              u = (0, r.useMemo)(() => ({ ...tn.t, ...tw }), []);
            return n
              ? (0, a.jsx)(t_.Provider, {
                  value: { isLoading: s, readOnly: i },
                  children: (0, a.jsxs)('div', {
                    className: (0, eu.cn)(
                      'mb-5 text-foreground-light text-sm',
                      d && 'text-foreground',
                      'warning' === c && 'bg-warning-200'
                    ),
                    children: [
                      o,
                      'warning' === c &&
                        (0, a.jsx)(ta.aN, { className: 'w-6 h-6' }),
                      l,
                      (0, a.jsxs)('div', {
                        className: 'flex gap-4 w-auto overflow-hidden',
                        children: [
                          d
                            ? (0, a.jsx)('figure', {
                                className:
                                  'w-5 h-5 shrink-0 bg-foreground rounded-full flex items-center justify-center',
                                children: (0, a.jsx)(e7.Z, {
                                  size: 16,
                                  strokeWidth: 1.5,
                                  className: 'text-background',
                                }),
                              })
                            : (0, a.jsx)(eY.c, {
                                size: 20,
                                className: 'text-foreground-muted shrink-0',
                              }),
                          (0, a.jsx)(te.D, {
                            className:
                              'space-y-5 flex-1 [&>*>code]:text-xs [&>*>*>code]:text-xs min-w-0 [&_li]:space-y-4',
                            remarkPlugins: [tt.Z],
                            components: u,
                            children: n,
                          }),
                        ],
                      }),
                    ],
                  }),
                })
              : null;
          },
          tC = (0, r.memo)((e) => {
            let { message: t, isLoading: n } = e;
            return (0, a.jsx)(
              tN,
              {
                role: t.role,
                content: t.content,
                readOnly: 'user' === t.role,
                isLoading: n,
              },
              t.id
            );
          });
        tC.displayName = 'MemoizedMessage';
        let tS = (e) => {
            var t, n, s, i, l, c, u, m, h;
            let {
                id: f,
                initialMessages: g,
                className: x,
                onResetConversation: b,
              } = e,
              v = (0, e_.useRouter)(),
              j = (0, eM.Vm)(),
              _ = (0, eD.C)(),
              w = (0, eU.l)(),
              { id: N } = (0, ew.UO)(),
              C = (0, ew.WN)(),
              S = _ || !Z.Qy,
              A = (0, eZ.P)('disableAssistantPrompts'),
              { snippets: k } = (0, eW.B0)(),
              {
                aiAssistantPanel: E,
                setAiAssistantPanel: R,
                saveLatestMessage: L,
              } = (0, d.WZ)(),
              { open: I, initialInput: T, sqlSnippets: O, suggestions: P } = E,
              B = (0, r.useRef)(null),
              {
                ref: F,
                isSticky: z,
                scrollToEnd: D,
              } = (function () {
                let { enabled: e = !0 } =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  [t, n] = (0, r.useState)(null),
                  [a, s] = (0, r.useState)(!0),
                  i = (0, r.useRef)(!0),
                  o = (0, r.useRef)(),
                  l = (0, r.useCallback)((e) => {
                    e && n(e);
                  }, []),
                  c = (0, r.useCallback)(() => {
                    t &&
                      ((i.current = !0),
                      s(!0),
                      t.scrollTo({ top: t.scrollHeight, behavior: 'smooth' }));
                  }, [t]);
                return (
                  (0, r.useEffect)(() => {
                    let n;
                    if (!t || !e) return;
                    let a = new ResizeObserver(() => {
                        (clearTimeout(n),
                          (n = setTimeout(() => {
                            void 0 !== o.current &&
                              t.scrollHeight !== o.current &&
                              ((o.current = t.scrollHeight), i.current && c());
                          }, 100)));
                      }),
                      r = () => {
                        let e =
                          10 >
                          Math.abs(
                            t.scrollHeight - t.scrollTop - t.clientHeight
                          );
                        ((i.current = e), s(e));
                      };
                    return (
                      Array.from(t.children).forEach((e) => {
                        a.observe(e);
                      }),
                      t.addEventListener('scroll', r),
                      () => {
                        (clearTimeout(n),
                          a.disconnect(),
                          t.removeEventListener('scroll', r));
                      }
                    );
                  }, [t, e, c]),
                  { ref: l, isSticky: a, scrollToEnd: c }
                );
              })(),
              [U, M] = (0, r.useState)(T),
              [q, W] = (0, r.useState)(),
              [Y, H] = (0, r.useState)(),
              [G, V] = (0, r.useState)(!1),
              { data: X } = eT(),
              K = Z.Qy || !!(null == X ? void 0 : X.hasKey),
              $ = v.pathname.includes('/sql/[id]'),
              Q = k[null != N ? N : ''],
              J =
                null == Q
                  ? void 0
                  : null === (n = Q.snippet) || void 0 === n
                    ? void 0
                    : null === (t = n.content) || void 0 === t
                      ? void 0
                      : t.sql,
              { data: ee } = (0, eP.Gl)({
                orgSlug: null == w ? void 0 : w.slug,
              }),
              et = (0, eC.$w)(ee),
              { data: en, isLoading: ea } = (0, eB.Bj)({
                projectRef: null == j ? void 0 : j.ref,
                connectionString: null == j ? void 0 : j.connectionString,
                schema: 'public',
              }),
              es = null == en ? void 0 : en.find((e) => e.id.toString() === N),
              er =
                null !== (h = null == C ? void 0 : C.get('schema')) &&
                void 0 !== h
                  ? h
                  : 'public',
              { ref: ei } = (0, ew.UO)(),
              eo = (0, eU.l)(),
              { mutate: el } = (0, eF.a)(),
              {
                messages: ec,
                isLoading: ed,
                append: eg,
                setMessages: ek,
              } = (0, em.RJ)({
                id: f,
                api: ''.concat(Z.GW, '/api/ai/sql/generate-v3'),
                maxSteps: 5,
                initialMessages: g,
                body: {
                  includeSchemaMetadata: S,
                  projectRef: null == j ? void 0 : j.ref,
                  connectionString: null == j ? void 0 : j.connectionString,
                  schema: er,
                  table: null == es ? void 0 : es.name,
                },
                onFinish: (e) => L(e),
              }),
              eR = (0, ez.Xo)(ep.KA.UPDATE, 'organizations'),
              { mutate: eL, isLoading: eI } = (0, eO.k)(),
              eX = (0, r.useMemo)(
                () => [...ec, ...(void 0 !== q && void 0 !== Y ? [Y] : [])],
                [ec, q, Y]
              ),
              eK = (0, r.useMemo)(
                () =>
                  eX.map((e) =>
                    (0, a.jsx)(
                      tC,
                      {
                        message: e,
                        isLoading: ed && e.id === eX[eX.length - 1].id,
                      },
                      e.id
                    )
                  ),
                [eX, ed]
              ),
              e$ = eX.length > 0,
              eQ = async (e) => {
                var t, n, a;
                let s = { role: 'user', createdAt: new Date(), content: e };
                (eg(s, {
                  headers: {
                    Authorization:
                      null !==
                        (t = (await (0, eE.oT)()).get('Authorization')) &&
                      void 0 !== t
                        ? t
                        : '',
                  },
                }),
                  R({ sqlSnippets: void 0, messages: [...eX, s] }),
                  M(''),
                  W(void 0),
                  H(s),
                  e.includes('Help me to debug')
                    ? el({
                        action: eN.b.ASSISTANT_DEBUG_SUBMITTED,
                        groups: {
                          project: null != ei ? ei : 'Unknown',
                          organization:
                            null !== (n = null == eo ? void 0 : eo.slug) &&
                            void 0 !== n
                              ? n
                              : 'Unknown',
                        },
                      })
                    : el({
                        action: eN.b.ASSISTANT_PROMPT_SUBMITTED,
                        groups: {
                          project: null != ei ? ei : 'Unknown',
                          organization:
                            null !== (a = null == eo ? void 0 : eo.slug) &&
                            void 0 !== a
                              ? a
                              : 'Unknown',
                        },
                      }));
              },
              e2 = async () => {
                var e;
                if (!eR)
                  return y.Am.error(
                    'You do not have the required permissions to update this organization'
                  );
                if (!(null == w ? void 0 : w.slug))
                  return console.error('Organization slug is required');
                let t =
                    null !== (e = null == w ? void 0 : w.opt_in_tags) &&
                    void 0 !== e
                      ? e
                      : [],
                  n = t.includes(Z.PV.AI_SQL) ? t : [...t, Z.PV.AI_SQL];
                eL(
                  { slug: null == w ? void 0 : w.slug, opt_in_tags: n },
                  {
                    onSuccess: () => {
                      (y.Am.success('Successfully opted-in'), V(!1));
                    },
                  }
                );
              };
            return (
              (0, r.useEffect)(() => {
                (!ed && B.current && B.current.focus(), z && setTimeout(D, 0));
              }, [ed, z, D, eX]),
              (0, r.useEffect)(() => {
                (M(T),
                  B.current &&
                    (B.current.focus(),
                    B.current.setSelectionRange(T.length, T.length)));
              }, [T]),
              (0, r.useEffect)(() => {
                (O && 0 !== O.length) || R({ suggestions: void 0 });
              }, [O, P, R]),
              (0, r.useEffect)(() => {
                I && $ && J && R({ sqlSnippets: [J] });
              }, [I, $, J]),
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsxs)('div', {
                    className: (0, eu.cn)('flex flex-col h-full', x),
                    children: [
                      (0, a.jsxs)('div', {
                        ref: F,
                        className: (0, eu.cn)(
                          'flex-grow overflow-auto flex flex-col'
                        ),
                        children: [
                          (0, a.jsxs)('div', {
                            className: 'z-30 sticky top-0',
                            children: [
                              (0, a.jsxs)('div', {
                                className:
                                  'border-b flex items-center bg gap-x-3 px-5 h-[46px]',
                                children: [
                                  (0, a.jsx)(eY.c, {
                                    allowHoverEffect: !0,
                                    'data-sentry-element': 'AiIconAnimation',
                                    'data-sentry-source-file':
                                      'AIAssistant.tsx',
                                  }),
                                  (0, a.jsx)('div', {
                                    className: 'text-sm flex-1',
                                    children: 'Assistant',
                                  }),
                                  (0, a.jsxs)('div', {
                                    className: 'flex gap-4 items-center',
                                    children: [
                                      (0, a.jsxs)(eH.u, {
                                        'data-sentry-element': 'Tooltip',
                                        'data-sentry-source-file':
                                          'AIAssistant.tsx',
                                        children: [
                                          (0, a.jsx)(eH.aJ, {
                                            asChild: !0,
                                            'data-sentry-element':
                                              'TooltipTrigger',
                                            'data-sentry-source-file':
                                              'AIAssistant.tsx',
                                            children: (0, a.jsx)(ey.Z, {
                                              size: 14,
                                              className:
                                                'text-foreground-light',
                                              'data-sentry-element': 'Info',
                                              'data-sentry-source-file':
                                                'AIAssistant.tsx',
                                            }),
                                          }),
                                          (0, a.jsxs)(eH._v, {
                                            className: 'w-80',
                                            'data-sentry-element':
                                              'TooltipContent',
                                            'data-sentry-source-file':
                                              'AIAssistant.tsx',
                                            children: [
                                              'The Assistant is in Alpha and your prompts might be rate limited.',
                                              ' ',
                                              S
                                                ? 'Project metadata is being shared to improve Assistant responses.'
                                                : 'Project metadata is not being shared. Opt in to improve Assistant responses.',
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsxs)('div', {
                                        className: 'flex gap-2',
                                        children: [
                                          (e$ || P || O) &&
                                            (0, a.jsx)(o.z, {
                                              type: 'default',
                                              disabled: ed,
                                              onClick: b,
                                              children: 'Reset',
                                            }),
                                          (0, a.jsx)(o.z, {
                                            type: 'default',
                                            className: 'w-7',
                                            onClick: () => {
                                              R({ open: !1 });
                                            },
                                            icon: (0, a.jsx)(eb.Z, {}),
                                            'data-sentry-element': 'Button',
                                            'data-sentry-source-file':
                                              'AIAssistant.tsx',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              !S &&
                                w &&
                                (0, a.jsx)(eG.J, {
                                  type: 'default',
                                  title: 'Project metadata is not shared',
                                  description: et
                                    ? 'Your organization has the HIPAA addon and will not send any project metadata with your prompts.'
                                    : 'The Assistant can improve the quality of the answers if you send project metadata along with your prompts. Opt into sending anonymous data to share your schema and table definitions.',
                                  className:
                                    'border-0 border-b rounded-none bg-background',
                                  children:
                                    !et &&
                                    (0, a.jsx)(o.z, {
                                      type: 'default',
                                      className: 'w-fit mt-4',
                                      onClick: () => V(!0),
                                      children: 'Update AI settings',
                                    }),
                                }),
                            ],
                          }),
                          !e$ &&
                            (0, a.jsx)('div', {
                              className: 'h-48 flex-0 m-8',
                              children: (0, a.jsx)(e1, {
                                rows: 10,
                                columns: 10,
                                count: 33,
                              }),
                            }),
                          e$
                            ? (0, a.jsxs)('div', {
                                className: 'w-full p-5',
                                children: [
                                  eK,
                                  ((null === (s = ex()(eX)) || void 0 === s
                                    ? void 0
                                    : s.role) === 'user' ||
                                    (null === (l = ex()(eX)) || void 0 === l
                                      ? void 0
                                      : null === (i = l.content) || void 0 === i
                                        ? void 0
                                        : i.length) === 0) &&
                                    (0, a.jsxs)('div', {
                                      className:
                                        'flex gap-4 w-auto overflow-hidden',
                                      children: [
                                        (0, a.jsx)(eY.c, {
                                          size: 20,
                                          className:
                                            'text-foreground-muted shrink-0',
                                        }),
                                        (0, a.jsxs)('div', {
                                          className:
                                            'text-foreground-lighter text-sm flex gap-1.5 items-center',
                                          children: [
                                            (0, a.jsx)('span', {
                                              children: 'Thinking',
                                            }),
                                            (0, a.jsxs)('div', {
                                              className: 'flex gap-1',
                                              children: [
                                                (0, a.jsx)(eh.E.span, {
                                                  animate: {
                                                    opacity: [0, 1, 0],
                                                  },
                                                  transition: {
                                                    duration: 1.5,
                                                    repeat: 1 / 0,
                                                    delay: 0,
                                                  },
                                                  children: '.',
                                                }),
                                                (0, a.jsx)(eh.E.span, {
                                                  animate: {
                                                    opacity: [0, 1, 0],
                                                  },
                                                  transition: {
                                                    duration: 1.5,
                                                    repeat: 1 / 0,
                                                    delay: 0.3,
                                                  },
                                                  children: '.',
                                                }),
                                                (0, a.jsx)(eh.E.span, {
                                                  animate: {
                                                    opacity: [0, 1, 0],
                                                  },
                                                  transition: {
                                                    duration: 1.5,
                                                    repeat: 1 / 0,
                                                    delay: 0.6,
                                                  },
                                                  children: '.',
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  (0, a.jsx)('div', { className: 'h-1' }),
                                ],
                              })
                            : P
                              ? (0, a.jsxs)('div', {
                                  className:
                                    'w-full h-full px-8 py-0 flex flex-col flex-1 justify-end',
                                  children: [
                                    (0, a.jsx)('h3', {
                                      className:
                                        'text-foreground-light font-mono text-sm uppercase mb-3',
                                      children: 'Suggestions',
                                    }),
                                    P.title &&
                                      (0, a.jsx)('p', { children: P.title }),
                                    (0, a.jsx)('div', {
                                      className: '-mx-3 mt-4 mb-12',
                                      children:
                                        null == P
                                          ? void 0
                                          : null === (c = P.prompts) ||
                                              void 0 === c
                                            ? void 0
                                            : c.map((e, t) =>
                                                (0, a.jsx)(
                                                  o.z,
                                                  {
                                                    size: 'small',
                                                    icon: (0, a.jsx)(ev.Z, {
                                                      strokeWidth: 1.5,
                                                      size: 16,
                                                    }),
                                                    type: 'text',
                                                    className:
                                                      'w-full justify-start py-1 h-auto',
                                                    onClick: () => {
                                                      (M(e),
                                                        B.current &&
                                                          (B.current.focus(),
                                                          B.current.setSelectionRange(
                                                            T.length,
                                                            T.length
                                                          )));
                                                    },
                                                    children: e,
                                                  },
                                                  'suggestion-'.concat(t)
                                                )
                                              ),
                                    }),
                                  ],
                                })
                              : ea
                                ? (0, a.jsx)('div', {
                                    className:
                                      'w-full h-full flex-1 flex flex-col justify-end items-start p-5',
                                    children: (0, a.jsx)(eV.A, {
                                      className: 'w-4/5',
                                    }),
                                  })
                                : (null === (u = null != en ? en : []) ||
                                    void 0 === u
                                      ? void 0
                                      : u.length) > 0
                                  ? (0, a.jsx)(e3, {
                                      setMessages: ek,
                                      onSendMessage: eQ,
                                    })
                                  : (0, a.jsxs)('div', {
                                      className:
                                        'w-full flex flex-col justify-end flex-1 h-full p-5',
                                      children: [
                                        (0, a.jsx)('h2', {
                                          className: 'text-base mb-2',
                                          children: 'Welcome to Supabase!',
                                        }),
                                        (0, a.jsx)('p', {
                                          className:
                                            'text-sm text-foreground-lighter mb-6',
                                          children:
                                            'This is the Supabase assistant which will help you create, debug and modify tables, policies, functions and more. You can even use it to query your data using just your words. It looks like we have a blank canvas though, so what are you looking to build? Here are some ideas.',
                                        }),
                                        (0, a.jsxs)('div', {
                                          className: 'flex flex-wrap gap-2',
                                          children: [
                                            (0, a.jsx)(o.z, {
                                              onClick: () =>
                                                M(
                                                  'Generate a database schema for ...'
                                                ),
                                              className: 'rounded-full',
                                              children: 'Generate a ...',
                                            }),
                                            eA.o
                                              .filter(
                                                (e) => 'quickstart' === e.type
                                              )
                                              .map((e) =>
                                                (0, a.jsx)(
                                                  eH.pn,
                                                  {
                                                    children: (0, a.jsxs)(
                                                      eH.u,
                                                      {
                                                        children: [
                                                          (0, a.jsx)(eH.aJ, {
                                                            asChild: !0,
                                                            children: (0,
                                                            a.jsx)(o.z, {
                                                              type: 'outline',
                                                              className:
                                                                'rounded-full',
                                                              onClick: () => {
                                                                ek([
                                                                  {
                                                                    id: (0,
                                                                    eq.Z)(),
                                                                    role: 'user',
                                                                    createdAt:
                                                                      new Date(
                                                                        Date.now() -
                                                                          3e3
                                                                      ),
                                                                    content:
                                                                      e.description,
                                                                  },
                                                                  {
                                                                    id: (0,
                                                                    eq.Z)(),
                                                                    role: 'assistant',
                                                                    createdAt:
                                                                      new Date(),
                                                                    content:
                                                                      'Sure! I can help you with that. Here is a starting point you can run directly or customize further. Would you like to make any changes?  \n\n```sql\n-- props: {"title": "'
                                                                        .concat(
                                                                          e.title,
                                                                          '"}\n'
                                                                        )
                                                                        .concat(
                                                                          e.sql,
                                                                          '\n```'
                                                                        ),
                                                                  },
                                                                ]);
                                                              },
                                                              children: e.title,
                                                            }),
                                                          }),
                                                          (0, a.jsx)(eH._v, {
                                                            children: (0,
                                                            a.jsx)('p', {
                                                              children:
                                                                e.description,
                                                            }),
                                                          }),
                                                        ],
                                                      }
                                                    ),
                                                  },
                                                  e.title
                                                )
                                              ),
                                          ],
                                        }),
                                      ],
                                    }),
                        ],
                      }),
                      (0, a.jsx)(ef.M, {
                        'data-sentry-element': 'AnimatePresence',
                        'data-sentry-source-file': 'AIAssistant.tsx',
                        children:
                          !z &&
                          (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsx)(eh.E.div, {
                                initial: { opacity: 0 },
                                animate: { opacity: 1 },
                                exit: { opacity: 0 },
                                className: 'pointer-events-none z-10 -mt-24',
                                children: (0, a.jsx)('div', {
                                  className:
                                    'h-24 w-full bg-gradient-to-t from-background to-transparent',
                                }),
                              }),
                              (0, a.jsx)(eh.E.div, {
                                className:
                                  'absolute bottom-20 left-1/2 -translate-x-1/2',
                                variants: {
                                  hidden: { y: 5, opacity: 0 },
                                  show: { y: 0, opacity: 1 },
                                },
                                transition: { duration: 0.1 },
                                initial: 'hidden',
                                animate: 'show',
                                exit: 'hidden',
                                children: (0, a.jsx)(o.z, {
                                  type: 'default',
                                  className: 'rounded-full w-8 h-8 p-1.5',
                                  onClick: () => {
                                    (D(), B.current && B.current.focus());
                                  },
                                  children: (0, a.jsx)(ej.Z, { size: 16 }),
                                }),
                              }),
                            ],
                          }),
                      }),
                      (0, a.jsxs)('div', {
                        className: 'p-5 pt-0 z-20 relative',
                        children: [
                          O &&
                            O.length > 0 &&
                            (0, a.jsx)('div', {
                              className: 'mb-2',
                              children: O.map((e, t) =>
                                (0, a.jsx)(
                                  e9,
                                  {
                                    hideLineNumbers: !0,
                                    value: e,
                                    onRemove: () => {
                                      let e = [...O];
                                      (e.splice(t, 1), R({ sqlSnippets: e }));
                                    },
                                    className: 'text-xs',
                                  },
                                  t
                                )
                              ),
                            }),
                          A &&
                            (0, a.jsx)(eG.J, {
                              showIcon: !1,
                              type: 'default',
                              title: 'Assistant has been temporarily disabled',
                              description:
                                "We're currently looking into getting it back online",
                            }),
                          !K &&
                            (0, a.jsx)(eG.J, {
                              type: 'default',
                              title: 'OpenAI API key not set',
                              description: (0, a.jsx)(p.U, {
                                content:
                                  'Add your `OPENAI_API_KEY` to your environment variables to use the AI Assistant.',
                              }),
                            }),
                          (0, a.jsx)(eJ, {
                            textAreaRef: B,
                            className: (0, eu.cn)(
                              'z-20 [&>textarea]:text-base [&>textarea]:md:text-sm [&>textarea]:border-1 [&>textarea]:rounded-md [&>textarea]:!outline-none [&>textarea]:!ring-offset-0 [&>textarea]:!ring-0'
                            ),
                            loading: ed,
                            disabled: !K || A || ed,
                            placeholder: e$
                              ? 'Reply to the assistant...'
                              : (null === (m = null != O ? O : []) ||
                                  void 0 === m
                                    ? void 0
                                    : m.length) > 0
                                ? 'Ask a question or make a change...'
                                : 'Chat to Postgres...',
                            value: U,
                            onValueChange: (e) => M(e.target.value),
                            onSubmit: (e) => {
                              (e.preventDefault(),
                                S
                                  ? (eQ(
                                      [
                                        U,
                                        (null == O
                                          ? void 0
                                          : O.map(
                                              (e) => '```sql\n' + e + '\n```'
                                            ).join('\n')) || '',
                                      ]
                                        .filter(Boolean)
                                        .join('\n\n')
                                    ),
                                    D())
                                  : eQ(U));
                            },
                            'data-sentry-element': 'AssistantChatForm',
                            'data-sentry-source-file': 'AIAssistant.tsx',
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)(e0.Z, {
                    visible: G,
                    size: 'large',
                    title: 'Confirm sending anonymous data to OpenAI',
                    confirmLabel: 'Confirm',
                    onCancel: () => V(!1),
                    onConfirm: e2,
                    loading: eI,
                    'data-sentry-element': 'ConfirmationModal',
                    'data-sentry-source-file': 'AIAssistant.tsx',
                    children: [
                      (0, a.jsx)('p', {
                        className: 'text-sm text-foreground-light',
                        children:
                          'By opting into sending anonymous data, Supabase AI can improve the answers it shows you. This is an organization-wide setting, and affects all projects in your organization.',
                      }),
                      (0, a.jsx)(eS.Z, {
                        'data-sentry-element': 'OptInToOpenAIToggle',
                        'data-sentry-source-file': 'AIAssistant.tsx',
                      }),
                    ],
                  }),
                ],
              })
            );
          },
          tA = () => {
            var e;
            let { aiAssistantPanel: t, resetAiAssistantPanel: n } = (0, d.WZ)(),
              [s, i] = (0, r.useState)(
                (null === (e = t.messages) || void 0 === e
                  ? void 0
                  : e.length) > 0
                  ? t.messages
                  : void 0
              ),
              { open: o } = t,
              [l, c] = (0, r.useState)(() => (0, C.k$)());
            return o
              ? (0, a.jsx)(tS, {
                  initialMessages: s,
                  id: l,
                  className: (0, eu.cn)(
                    'w-full h-[100dvh] md:h-full max-h-[100dvh]'
                  ),
                  onResetConversation: () => {
                    (c((0, C.k$)()), i(void 0), n());
                  },
                  'data-sentry-element': 'AIAssistant',
                  'data-sentry-component': 'AIAssistantPanel',
                  'data-sentry-source-file': 'AIAssistantPanel.tsx',
                })
              : null;
          };
        var tk = n(87313),
          tE = n(42155),
          tR = n(50416),
          tL = n(62507),
          tI = n(58015),
          tT = n(64890);
        let tO = (e) => {
          let {
              className: t,
              disabled: n = !1,
              size: s = 'tiny',
              showError: i = !0,
              selectedSchemas: l = [],
              excludedSchemas: c = [],
              label: d,
              onSelectSchemas: u,
            } = e,
            [p, m] = (0, r.useState)(!1),
            h = (0, eM.Vm)(),
            {
              data: f,
              isLoading: g,
              isSuccess: x,
              isError: y,
              error: b,
              refetch: v,
            } = (0, tI.Q1)({
              projectRef: null == h ? void 0 : h.ref,
              connectionString: null == h ? void 0 : h.connectionString,
            }),
            j = (f || [])
              .filter((e) => !c.includes(e.name))
              .sort((e, t) => e.name.localeCompare(t.name)),
            _ = (e) => {
              l.includes(e)
                ? u(l.filter((t) => t !== e))
                : u([...l, e].sort((e, t) => e.localeCompare(t)));
            };
          return (0, a.jsxs)('div', {
            className: t,
            'data-sentry-component': 'SchemaComboBox',
            'data-sentry-source-file': 'SchemaComboBox.tsx',
            children: [
              g &&
                (0, a.jsx)(o.z, {
                  type: 'default',
                  className: 'justify-start',
                  block: !0,
                  size: s,
                  loading: !0,
                  children: 'Loading schemas...',
                }),
              i &&
                y &&
                (0, a.jsxs)(er.bZ, {
                  variant: 'warning',
                  className: '!px-3 !py-3',
                  children: [
                    (0, a.jsx)(er.Cd, {
                      className: 'text-xs text-amber-900',
                      children: 'Failed to load schemas',
                    }),
                    (0, a.jsxs)(er.X, {
                      className: 'text-xs mb-2 break-words',
                      children: ['Error: ', null == b ? void 0 : b.message],
                    }),
                    (0, a.jsx)(o.z, {
                      type: 'default',
                      size: 'tiny',
                      onClick: () => v(),
                      children: 'Reload schemas',
                    }),
                  ],
                }),
              x &&
                (0, a.jsxs)(Y.J2, {
                  open: p,
                  onOpenChange: m,
                  modal: !1,
                  children: [
                    (0, a.jsx)(Y.xo, {
                      asChild: !0,
                      children: (0, a.jsx)(o.z, {
                        size: s,
                        disabled: n,
                        type: 'default',
                        className: 'w-full [&>span]:w-full',
                        iconRight: (0, a.jsx)(tR.Z, {
                          className: 'text-foreground-muted',
                          strokeWidth: 2,
                          size: 14,
                        }),
                        children: (0, a.jsx)('div', {
                          className: 'w-full flex',
                          children: (0, a.jsx)('p', {
                            className: 'text-foreground',
                            children: d,
                          }),
                        }),
                      }),
                    }),
                    (0, a.jsx)(Y.yk, {
                      className: 'p-0 w-56',
                      side: 'bottom',
                      align: 'start',
                      children: (0, a.jsxs)(H.mY, {
                        children: [
                          (0, a.jsx)(H.sZ, { placeholder: 'Find schema...' }),
                          (0, a.jsxs)(H.e8, {
                            children: [
                              (0, a.jsx)(H.rb, {
                                children: 'No schemas found',
                              }),
                              (0, a.jsx)(H.fu, {
                                children: (0, a.jsx)(tT.x, {
                                  className:
                                    (j || []).length > 7 ? 'h-[210px]' : '',
                                  children:
                                    null == j
                                      ? void 0
                                      : j.map((e) =>
                                          (0, a.jsxs)(
                                            H.di,
                                            {
                                              className:
                                                'cursor-pointer flex items-center justify-between space-x-2 w-full',
                                              onSelect: () => _(e.name),
                                              onClick: () => _(e.name),
                                              children: [
                                                (0, a.jsx)('span', {
                                                  children: e.name,
                                                }),
                                                l.includes(e.name) &&
                                                  (0, a.jsx)(tL.Z, {
                                                    className: 'text-brand',
                                                    strokeWidth: 2,
                                                    size: 16,
                                                  }),
                                              ],
                                            },
                                            e.id
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
            ],
          });
        };
        var tP = () => {
            let e = (0, d.WZ)(),
              t = (0, eU.l)(),
              n = (0, eD.C)(),
              s = (0, eM.Vm)(),
              [r, i] = (0, tk.l)(null == s ? void 0 : s.ref),
              l = n || !Z.Qy;
            return (0, a.jsx)(tE.Z, {
              hideFooter: !0,
              header: 'Supabase AI Settings',
              visible: e.showAiSettingsModal,
              onCancel: () => e.setShowAiSettingsModal(!1),
              'data-sentry-element': 'Modal',
              'data-sentry-component': 'AISettingsModal',
              'data-sentry-source-file': 'AISettingsModal.tsx',
              children: (0, a.jsxs)(tE.Z.Content, {
                className: 'flex flex-col items-start justify-between gap-y-4',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'AISettingsModal.tsx',
                children: [
                  (0, a.jsxs)('div', {
                    className: 'flex flex-col justify-between gap-y-2 text-sm',
                    children: [
                      (0, a.jsx)('p', {
                        className: 'text-foreground-light',
                        children: 'Schemas metadata to be shared with OpenAI',
                      }),
                      (0, a.jsx)(tO, {
                        size: 'small',
                        label:
                          l && r.length > 0
                            ? ''
                                .concat(r.length, ' schema')
                                .concat(r.length > 1 ? 's' : '', ' selected')
                            : 'No schemas selected',
                        disabled: Z.Qy && !n,
                        selectedSchemas: r,
                        onSelectSchemas: i,
                        'data-sentry-element': 'SchemaComboBox',
                        'data-sentry-source-file': 'AISettingsModal.tsx',
                      }),
                      (0, a.jsx)('p', {
                        className: 'text-foreground-lighter',
                        children:
                          'Metadata includes table names, column names and their corresponding data types in the request. This will generate queries that are more relevant to your project.',
                      }),
                    ],
                  }),
                  Z.Qy &&
                    !n &&
                    t &&
                    (0, a.jsxs)(er.bZ, {
                      variant: 'warning',
                      children: [
                        (0, a.jsx)(ta.aN, {}),
                        (0, a.jsx)(er.Cd, {
                          children:
                            'Your organization does not allow sending anonymous data to OpenAI',
                        }),
                        (0, a.jsx)(er.X, {
                          children:
                            "This option is only available if your organization has opted-in to sending anonymous data to OpenAI. You may configure your opt-in preferences through your organization's settings.",
                        }),
                        (0, a.jsx)(er.X, {
                          className: 'mt-3',
                          children: (0, a.jsx)(o.z, {
                            asChild: !0,
                            type: 'default',
                            children: (0, a.jsx)(Q(), {
                              target: '_blank',
                              rel: 'noreferrer',
                              href: '/org/'.concat(t.slug, '/general'),
                              className: 'flex flex-row gap-1 items-center',
                              children: 'Head to organization settings',
                            }),
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            });
          },
          tB = n(60153),
          tF = n(71770),
          tz = n(4839),
          tD = n(86007),
          tU = n(15705),
          tM = n(46482);
        let tZ = () => {
          var e, t, n, r, i, l;
          let { ref: c } = (0, s.UO)(),
            d = (0, e_.useRouter)(),
            { data: u } = (0, tD.q)(),
            p =
              null === (e = null != u ? u : []) || void 0 === e
                ? void 0
                : e.find((e) => e.project === c),
            m =
              void 0 !== p
                ? p.is_readonly_mode_enabled
                  ? ['is_readonly_mode_enabled']
                  : Object.keys(p).filter(
                      (e) =>
                        'project' !== e &&
                        'is_readonly_mode_enabled' !== e &&
                        null !== p[e]
                    )
                : [],
            h = void 0 !== p && m.some((e) => 'critical' === p[e]),
            f = m.includes('is_readonly_mode_enabled') || h,
            g = void 0 !== p ? (0, tM.L)(p, m[0], 'bannerContent') : void 0,
            x =
              m.length > 1
                ? tU.x.multiple_resource_warnings.bannerContent[
                    h ? 'critical' : 'warning'
                  ].title
                : null == g
                  ? void 0
                  : g.title,
            y =
              m.length > 1
                ? tU.x.multiple_resource_warnings.bannerContent[
                    h ? 'critical' : 'warning'
                  ].description
                : null == g
                  ? void 0
                  : g.description,
            b =
              m.length > 1
                ? tU.x.multiple_resource_warnings.docsUrl
                : null === (t = tU.x[m[0]]) || void 0 === t
                  ? void 0
                  : t.docsUrl,
            v =
              m.length > 1
                ? tU.x.multiple_resource_warnings.metric
                : null === (n = tU.x[m[0]]) || void 0 === n
                  ? void 0
                  : n.metric,
            j = {
              undefined: void 0,
              null: '/project/[ref]/settings/[infra-path]',
              disk_space: '/project/[ref]/settings/compute-and-disk',
              read_only: '/project/[ref]/settings/compute-and-disk',
              auth_email_rate_limit: '/project/[ref]/settings/auth',
              auth_restricted_email_sending: '/project/[ref]/settings/auth',
              default: (e) => '/project/[ref]/settings/[infra-path]#'.concat(e),
            },
            _ =
              null ===
                (i = ((e) => {
                  let t =
                    j[void 0 === e ? 'undefined' : null === e ? 'null' : e] ||
                    j.default(e);
                  return 'function' == typeof t ? t(e) : t;
                })(v)) || void 0 === i
                ? void 0
                : null ===
                      (r = i.replace('[ref]', null != c ? c : 'default')) ||
                    void 0 === r
                  ? void 0
                  : r.replace('[infra-path]', 'infrastructure'),
            w =
              m.length > 1
                ? tU.x.multiple_resource_warnings.buttonText
                : null === (l = tU.x[m[0]]) || void 0 === l
                  ? void 0
                  : l.buttonText,
            N = 0 === m.length,
            C =
              (d.pathname.endsWith('/usage') ||
                d.pathname.endsWith('/infrastructure')) &&
              !m.includes('is_readonly_mode_enabled'),
            S =
              d.pathname.endsWith('settings/compute-and-disk') &&
              m.includes('is_readonly_mode_enabled'),
            A = tU.x[m[0]],
            k = null == A ? void 0 : A.restrictToRoutes,
            E =
              void 0 === k ||
              k.some((e) =>
                '/project/[ref]' === e
                  ? '/project/[ref]' === d.pathname
                  : d.pathname.startsWith(e)
              );
          return N || void 0 === g || C || S || !E
            ? null
            : (0, a.jsxs)(er.bZ, {
                variant: f ? 'destructive' : 'warning',
                className: (0, eu.cn)(
                  'flex items-center justify-between',
                  'border-0 border-r-0 rounded-none [&>svg]:left-6 px-6 [&>svg]:w-[26px] [&>svg]:h-[26px]'
                ),
                'data-sentry-element': 'Alert_Shadcn_',
                'data-sentry-component': 'ResourceExhaustionWarningBanner',
                'data-sentry-source-file':
                  'ResourceExhaustionWarningBanner.tsx',
                children: [
                  (0, a.jsx)(tF.Z, {
                    'data-sentry-element': 'AlertTriangle',
                    'data-sentry-source-file':
                      'ResourceExhaustionWarningBanner.tsx',
                  }),
                  (0, a.jsxs)('div', {
                    className: '',
                    children: [
                      (0, a.jsx)(er.Cd, {
                        'data-sentry-element': 'AlertTitle_Shadcn_',
                        'data-sentry-source-file':
                          'ResourceExhaustionWarningBanner.tsx',
                        children: x,
                      }),
                      (0, a.jsx)(er.X, {
                        'data-sentry-element': 'AlertDescription_Shadcn_',
                        'data-sentry-source-file':
                          'ResourceExhaustionWarningBanner.tsx',
                        children: y,
                      }),
                    ],
                  }),
                  (0, a.jsxs)('div', {
                    className: 'flex items-center gap-x-2',
                    children: [
                      void 0 !== b &&
                        (0, a.jsx)(o.z, {
                          asChild: !0,
                          type: 'default',
                          icon: (0, a.jsx)(tz.Z, {}),
                          children: (0, a.jsx)('a', {
                            href: b,
                            target: '_blank',
                            rel: 'noreferrer',
                            children: 'Learn more',
                          }),
                        }),
                      void 0 !== _ &&
                        (0, a.jsx)(o.z, {
                          asChild: !0,
                          type: 'default',
                          children: (0, a.jsx)(Q(), {
                            href: _,
                            children: null != w ? w : 'Check',
                          }),
                        }),
                    ],
                  }),
                ],
              });
        };
        var tq = n(58326),
          tW = n(50878),
          tY = n.n(tW),
          tH = n(619),
          tG = n(89429),
          tV = n(34730),
          tX = n(78751),
          tK = n(86848),
          t$ = n(5394),
          tQ = n(26877),
          tJ = n(5529),
          t0 = n(63621),
          t1 = n(20763),
          t2 = n(81933),
          t4 = n(5162),
          t5 = n(987),
          t3 = n(9108),
          t6 = n(60025),
          t8 = n(82364),
          t9 = n(49142),
          t7 = n(359),
          ne = () => {
            let { ref: e } = (0, s.UO)(),
              t = (0, d.WZ)(),
              n = (0, ez.Xo)(ep.KA.BILLING_WRITE, 'stripe.subscriptions');
            return (0, a.jsxs)(er.bZ, {
              className:
                'rounded-none px-7 py-6 [&>svg]:top-6 [&>svg]:left-6 !border-t-0 !border-l-0 !border-r-0',
              'data-sentry-element': 'Alert_Shadcn_',
              'data-sentry-component': 'BranchingPITRNotice',
              'data-sentry-source-file': 'BranchingPITRNotice.tsx',
              children: [
                (0, a.jsx)(er.Cd, {
                  className: 'text-base',
                  'data-sentry-element': 'AlertTitle_Shadcn_',
                  'data-sentry-source-file': 'BranchingPITRNotice.tsx',
                  children:
                    'We strongly encourage enabling Point in Time Recovery (PITR)',
                }),
                (0, a.jsx)(er.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'BranchingPITRNotice.tsx',
                  children:
                    'This is to ensure that you can always recover data if you make a "bad migration". For example, if you accidentally delete a column or some of your production data.',
                }),
                n
                  ? (0, a.jsx)(o.z, {
                      size: 'tiny',
                      type: 'default',
                      className: 'mt-4',
                      children: (0, a.jsx)(Q(), {
                        href: '/project/'.concat(
                          e,
                          '/settings/addons?panel=pitr'
                        ),
                        onClick: () => t.setShowEnableBranchingModal(!1),
                        children: 'Enable PITR add-on',
                      }),
                    })
                  : (0, a.jsx)(t7.u, {
                      disabled: !0,
                      size: 'tiny',
                      type: 'default',
                      className: 'mt-4',
                      tooltip: {
                        content: {
                          side: 'bottom',
                          text: 'You need additional permissions to amend subscriptions',
                        },
                      },
                      children: 'Enable PITR add-on',
                    }),
              ],
            });
          },
          nt = n(44735),
          nn = () => {
            let e = (0, d.WZ)(),
              t = (0, eU.l)();
            return (0, a.jsxs)(er.bZ, {
              className:
                'rounded-none px-7 py-6 [&>svg]:top-6 [&>svg]:left-6 border-0 border-y',
              'data-sentry-element': 'Alert_Shadcn_',
              'data-sentry-component': 'BranchingPlanNotice',
              'data-sentry-source-file': 'BranchingPlanNotice.tsx',
              children: [
                (0, a.jsx)(nt.Z, {
                  'data-sentry-element': 'AlertCircleIcon',
                  'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                }),
                (0, a.jsx)(er.Cd, {
                  'data-sentry-element': 'AlertTitle_Shadcn_',
                  'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                  children:
                    'Database branching is only available on the Pro Plan and above',
                }),
                (0, a.jsx)(er.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                  children:
                    "Go to your organization's billing settings and upgrade your plan to enable branching for this project",
                }),
                (0, a.jsx)(er.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                  children: (0, a.jsx)(o.z, {
                    size: 'tiny',
                    type: 'default',
                    className: 'mt-4',
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                    children: (0, a.jsx)(Q(), {
                      href: '/org/'.concat(
                        null == t ? void 0 : t.slug,
                        '/billing?panel=subscriptionPlan&source=enableBranchingButton'
                      ),
                      onClick: () => e.setShowEnableBranchingModal(!1),
                      'data-sentry-element': 'Link',
                      'data-sentry-source-file': 'BranchingPlanNotice.tsx',
                      children: 'Upgrade to Pro',
                    }),
                  }),
                }),
              ],
            });
          },
          na = () => {
            let { ref: e } = (0, s.UO)(),
              t = (0, d.WZ)();
            return (0, a.jsxs)(er.bZ, {
              className:
                'rounded-none px-7 py-6 [&>svg]:top-6 [&>svg]:left-6 !border-t-0 !border-l-0 !border-r-0',
              'data-sentry-element': 'Alert_Shadcn_',
              'data-sentry-component': 'BranchingPostgresVersionNotice',
              'data-sentry-source-file': 'BranchingPostgresVersionNotice.tsx',
              children: [
                (0, a.jsx)(nt.Z, {
                  'data-sentry-element': 'AlertCircleIcon',
                  'data-sentry-source-file':
                    'BranchingPostgresVersionNotice.tsx',
                }),
                (0, a.jsx)(er.Cd, {
                  className: 'text-base',
                  'data-sentry-element': 'AlertTitle_Shadcn_',
                  'data-sentry-source-file':
                    'BranchingPostgresVersionNotice.tsx',
                  children:
                    'Your project needs to be on Postgres 15 to enable branching',
                }),
                (0, a.jsx)(er.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file':
                    'BranchingPostgresVersionNotice.tsx',
                  children:
                    "Head over to your project's infrastructure settings to upgrade to the latest version of Postgres before enabling branching.",
                }),
                (0, a.jsx)(er.X, {
                  'data-sentry-element': 'AlertDescription_Shadcn_',
                  'data-sentry-source-file':
                    'BranchingPostgresVersionNotice.tsx',
                  children: (0, a.jsx)(o.z, {
                    size: 'tiny',
                    type: 'default',
                    className: 'mt-4',
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file':
                      'BranchingPostgresVersionNotice.tsx',
                    children: (0, a.jsx)(Q(), {
                      href: '/project/'.concat(e, '/settings/infrastructure'),
                      onClick: () => t.setShowEnableBranchingModal(!1),
                      'data-sentry-element': 'Link',
                      'data-sentry-source-file':
                        'BranchingPostgresVersionNotice.tsx',
                      children: 'Head to project settings',
                    }),
                  }),
                }),
              ],
            });
          },
          ns = n(47342),
          nr = n(13806),
          ni = n(56740),
          no = (e) => {
            var t, n, r, i, l;
            let { form: c, isChecking: d, isValid: u, githubConnection: p } = e,
              { ref: m } = (0, s.UO)(),
              h = (0, eU.l)(),
              f = (0, nr.x5)();
            function g() {
              f.setGithubConnectionsOpen(!0);
            }
            return (0, a.jsx)('div', {
              className: 'border-t border-b',
              'data-sentry-component': 'GithubRepositorySelection',
              'data-sentry-source-file': 'GithubRepositorySelection.tsx',
              children: (0, a.jsx)(tE.Z.Content, {
                className: 'px-7',
                'data-sentry-element': 'unknown',
                'data-sentry-source-file': 'GithubRepositorySelection.tsx',
                children: (0, a.jsxs)('div', {
                  className: 'py-6',
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'flex items-center space-x-2',
                      children: [
                        (0, a.jsx)('p', { children: 'Git Connection' }),
                        (0, a.jsx)(I.C, {
                          variant: 'warning',
                          'data-sentry-element': 'Badge',
                          'data-sentry-source-file':
                            'GithubRepositorySelection.tsx',
                          children: 'Required',
                        }),
                      ],
                    }),
                    (0, a.jsx)('p', {
                      className: 'text-sm text-foreground-light !mb-4',
                      children:
                        void 0 !== p
                          ? 'Your database preview branches will be based on the branches in the following repository that your project is connected with:'
                          : 'Your database preview branches will be based on the branches in the Git repository that your project is connected with.',
                    }),
                    p
                      ? (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsx)('ul', {
                              className: 'mb-3',
                              children: (0, a.jsx)(ns.jA, {
                                type: 'GitHub',
                                connection: {
                                  id: String(p.id),
                                  added_by: {
                                    id: String(
                                      null === (t = p.user) || void 0 === t
                                        ? void 0
                                        : t.id
                                    ),
                                    primary_email:
                                      null !==
                                        (i =
                                          null === (n = p.user) || void 0 === n
                                            ? void 0
                                            : n.primary_email) && void 0 !== i
                                        ? i
                                        : '',
                                    username:
                                      null !==
                                        (l =
                                          null === (r = p.user) || void 0 === r
                                            ? void 0
                                            : r.username) && void 0 !== l
                                        ? l
                                        : '',
                                  },
                                  foreign_project_id: String(p.repository.id),
                                  supabase_project_ref: p.project.ref,
                                  organization_integration_id: 'unused',
                                  inserted_at: p.inserted_at,
                                  updated_at: p.updated_at,
                                  metadata: { name: p.repository.name },
                                },
                                showNode: !1,
                                actions: (0, a.jsx)(o.z, {
                                  type: 'default',
                                  onClick: () => g(),
                                  children: 'Configure connection',
                                }),
                                orientation: 'horizontal',
                              }),
                            }),
                            (0, a.jsx)(t9.Wi, {
                              control: c.control,
                              name: 'branchName',
                              render: (e) => {
                                let { field: t } = e;
                                return (0, a.jsxs)(t9.xJ, {
                                  className: 'flex flex-col gap-y-1 relative',
                                  children: [
                                    (0, a.jsx)('label', {
                                      className:
                                        'text-sm text-foreground-light',
                                      children: 'Choose your production branch',
                                    }),
                                    (0, a.jsx)(t9.NI, {
                                      children: (0, a.jsx)(ni.I, {
                                        ...t,
                                        placeholder: 'e.g main',
                                      }),
                                    }),
                                    (0, a.jsx)('div', {
                                      className: 'absolute top-9 right-3',
                                      children: d
                                        ? (0, a.jsx)(eX.Z, {
                                            size: 14,
                                            className: 'animate-spin',
                                          })
                                        : u
                                          ? (0, a.jsx)(tL.Z, {
                                              size: 14,
                                              className: 'text-brand',
                                              strokeWidth: 2,
                                            })
                                          : null,
                                    }),
                                    (0, a.jsx)(t9.zG, {}),
                                  ],
                                });
                              },
                            }),
                          ],
                        })
                      : (0, a.jsx)(ns.FP, {
                          showNode: !1,
                          onClick: () => g(),
                          orgSlug: null == h ? void 0 : h.slug,
                        }),
                  ],
                }),
              }),
            });
          },
          nl = () => {
            var e, t, n, i, l;
            let { ref: c } = (0, s.UO)(),
              u = (0, d.WZ)(),
              p = (0, eU.l)(),
              [m, h] = (0, r.useState)(!1);
            (0, ez.Xo)(ep.KA.CREATE, 'preview_branches');
            let {
                data: f,
                error: g,
                isLoading: x,
                isSuccess: v,
                isError: j,
              } = (0, t5.q)({ organizationId: null == p ? void 0 : p.id }),
              {
                data: _,
                error: w,
                isLoading: N,
                isError: C,
                isSuccess: S,
              } = (0, t2.D)({ projectRef: c }),
              A =
                Number(
                  null !==
                    (n =
                      null ===
                        (e = ex()(
                          null !==
                            (t =
                              null == _
                                ? void 0
                                : _.current_app_version.split('-')) &&
                            void 0 !== t
                            ? t
                            : []
                        )) || void 0 === e
                        ? void 0
                        : e.split('.')[0]) && void 0 !== n
                    ? n
                    : 0
                ) >= 15,
              { data: k } = (0, eP.Gl)({
                orgSlug: null == p ? void 0 : p.slug,
              }),
              E = (null == k ? void 0 : k.plan.id) === 'free',
              { data: R } = (0, t3.F)({ projectRef: c }),
              L =
                void 0 !==
                (null !== (i = null == R ? void 0 : R.selected_addons) &&
                void 0 !== i
                  ? i
                  : []
                ).find((e) => 'pitr' === e.type),
              I = null == f ? void 0 : f.find((e) => e.project.ref === c),
              [T, O] =
                null !==
                  (l = null == I ? void 0 : I.repository.name.split('/')) &&
                void 0 !== l
                  ? l
                  : [],
              { mutateAsync: P, isLoading: B } = (0, t4.s)({
                onError: () => {},
              }),
              { mutate: F, isLoading: z } = (0, t1.J)({
                onSuccess: () => {
                  (y.Am.success('Successfully created new branch'),
                    u.setShowEnableBranchingModal(!1));
                },
              }),
              D = 'enable-branching-form',
              U = t$.Ry({
                branchName: t$
                  .Z_()
                  .refine(
                    (e) => e.length > 1,
                    'Please enter a branch name from '.concat(T, '/').concat(O)
                  )
                  .refine(async (e) => {
                    try {
                      if (e.length > 0) {
                        if (!(null == I ? void 0 : I.id))
                          throw Error('No GitHub connection found');
                        (await P({ connectionId: I.id, branchName: e }), h(!0));
                      }
                      return !0;
                    } catch (e) {
                      return (h(!1), !1);
                    }
                  }, 'Unable to find branch from '.concat(T, '/').concat(O)),
              }),
              M = (0, tK.cI)({
                mode: 'onBlur',
                reValidateMode: 'onChange',
                resolver: (0, tX.F)(U),
                defaultValues: { branchName: '' },
              }),
              Z = v && S,
              q = M.getValues('branchName').length > 0 && !B && m;
            return (
              (0, r.useEffect)(() => {
                M && u.showEnableBranchingModal && (h(!1), M.reset());
              }, [M, u.showEnableBranchingModal]),
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsx)(tE.Z, {
                    hideFooter: !0,
                    visible: u.showEnableBranchingModal,
                    onCancel: () => u.setShowEnableBranchingModal(!1),
                    className: 'block',
                    size: 'medium',
                    hideClose: !0,
                    'data-sentry-element': 'Modal',
                    'data-sentry-source-file': 'EnableBranchingModal.tsx',
                    children: (0, a.jsx)(t9.l0, {
                      ...M,
                      'data-sentry-element': 'Form_Shadcn_',
                      'data-sentry-source-file': 'EnableBranchingModal.tsx',
                      children: (0, a.jsxs)('form', {
                        id: D,
                        onSubmit: M.handleSubmit((e) => {
                          if (!c)
                            return console.error('Project ref is required');
                          F({
                            projectRef: c,
                            branchName: e.branchName,
                            gitBranch: e.branchName,
                          });
                        }),
                        onChange: () => h(!1),
                        children: [
                          (0, a.jsxs)(tE.Z.Content, {
                            className:
                              'flex items-center justify-between space-x-4',
                            'data-sentry-element': 'unknown',
                            'data-sentry-source-file':
                              'EnableBranchingModal.tsx',
                            children: [
                              (0, a.jsxs)('div', {
                                className: 'flex items-center gap-x-4',
                                children: [
                                  (0, a.jsx)(t6.Z, {
                                    strokeWidth: 2,
                                    size: 20,
                                    'data-sentry-element': 'GitBranch',
                                    'data-sentry-source-file':
                                      'EnableBranchingModal.tsx',
                                  }),
                                  (0, a.jsxs)('div', {
                                    children: [
                                      (0, a.jsx)('p', {
                                        className: 'text-foreground',
                                        children: 'Enable database branching',
                                      }),
                                      (0, a.jsx)('p', {
                                        className:
                                          'text-sm text-foreground-light',
                                        children:
                                          'Manage environments in Supabase',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsx)(b.G, {
                                href: 'https://supabase.com/docs/guides/platform/branching',
                                'data-sentry-element': 'DocsButton',
                                'data-sentry-source-file':
                                  'EnableBranchingModal.tsx',
                              }),
                            ],
                          }),
                          (x || N) &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)(tE.Z.Separator, {}),
                                (0, a.jsx)(tE.Z.Content, {
                                  className: 'px-7 py-6',
                                  children: (0, a.jsx)(t0.A, {}),
                                }),
                                (0, a.jsx)(tE.Z.Separator, {}),
                              ],
                            }),
                          (j || C) &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                (0, a.jsx)(tE.Z.Separator, {}),
                                (0, a.jsx)(tE.Z.Content, {
                                  className: 'px-7 py-6',
                                  children: j
                                    ? (0, a.jsx)(tJ.Z, {
                                        error: g,
                                        subject:
                                          'Failed to retrieve connections',
                                      })
                                    : C
                                      ? (0, a.jsx)(tJ.Z, {
                                          error: w,
                                          subject:
                                            'Failed to retrieve Postgres version',
                                        })
                                      : null,
                                }),
                                (0, a.jsx)(tE.Z.Separator, {}),
                              ],
                            }),
                          Z &&
                            (0, a.jsxs)(a.Fragment, {
                              children: [
                                E
                                  ? (0, a.jsx)(nn, {})
                                  : A
                                    ? (0, a.jsxs)(a.Fragment, {
                                        children: [
                                          (0, a.jsx)(no, {
                                            form: M,
                                            isChecking: B,
                                            isValid: q,
                                            githubConnection: I,
                                          }),
                                          !L && (0, a.jsx)(ne, {}),
                                        ],
                                      })
                                    : (0, a.jsx)(na, {}),
                                (0, a.jsxs)(tE.Z.Content, {
                                  className: 'py-6 flex flex-col gap-3',
                                  children: [
                                    (0, a.jsx)('p', {
                                      className:
                                        'text-sm text-foreground-light',
                                      children:
                                        'Please keep in mind the following:',
                                    }),
                                    (0, a.jsxs)('div', {
                                      className: 'flex flex-row gap-4',
                                      children: [
                                        (0, a.jsx)('div', {
                                          children: (0, a.jsx)('figure', {
                                            className:
                                              'w-10 h-10 rounded-md bg-info-200 border border-info-400 flex items-center justify-center',
                                            children: (0, a.jsx)(t8.Z, {
                                              className: 'text-info',
                                              size: 20,
                                              strokeWidth: 2,
                                            }),
                                          }),
                                        }),
                                        (0, a.jsxs)('div', {
                                          className: 'flex flex-col gap-y-1',
                                          children: [
                                            (0, a.jsx)('p', {
                                              className:
                                                'text-sm text-foreground',
                                              children:
                                                'Preview branches are billed $0.32 per day',
                                            }),
                                            (0, a.jsx)('p', {
                                              className:
                                                'text-sm text-foreground-light',
                                              children:
                                                'This cost will continue for as long as the branch has not been removed.',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)('div', {
                                      className: 'flex flex-row gap-4 mt-2',
                                      children: [
                                        (0, a.jsx)('div', {
                                          children: (0, a.jsx)('figure', {
                                            className:
                                              'w-10 h-10 rounded-md bg-info-200 border border-info-400 flex items-center justify-center',
                                            children: (0, a.jsx)(ev.Z, {
                                              className: 'text-info',
                                              size: 20,
                                              strokeWidth: 2,
                                            }),
                                          }),
                                        }),
                                        (0, a.jsxs)('div', {
                                          className: 'flex flex-col gap-y-1',
                                          children: [
                                            (0, a.jsx)('p', {
                                              className:
                                                'text-sm text-foreground',
                                              children:
                                                'Migrations are applied from your GitHub repository',
                                            }),
                                            (0, a.jsxs)('p', {
                                              className:
                                                'text-sm text-foreground-light',
                                              children: [
                                                'Migration files in your ',
                                                (0, a.jsx)('code', {
                                                  className: 'text-xs',
                                                  children: './supabase',
                                                }),
                                                ' ',
                                                'directory will run on both Preview Branches and Production when pushing and merging branches.',
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(tE.Z.Separator, {}),
                              ],
                            }),
                          (0, a.jsxs)(tE.Z.Content, {
                            className: 'flex items-center gap-3',
                            'data-sentry-element': 'unknown',
                            'data-sentry-source-file':
                              'EnableBranchingModal.tsx',
                            children: [
                              (0, a.jsx)(o.z, {
                                size: 'medium',
                                block: !0,
                                disabled: z,
                                type: 'default',
                                onClick: () =>
                                  u.setShowEnableBranchingModal(!1),
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'EnableBranchingModal.tsx',
                                children: 'Cancel',
                              }),
                              (0, a.jsx)(o.z, {
                                block: !0,
                                size: 'medium',
                                form: D,
                                disabled: !Z || z || !q,
                                loading: z,
                                type: 'primary',
                                htmlType: 'submit',
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'EnableBranchingModal.tsx',
                                children: 'I understand, enable branching',
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, a.jsx)(tQ.Z, {
                    projectRef: c,
                    'data-sentry-element': 'SidePanelGitHubRepoLinker',
                    'data-sentry-source-file': 'EnableBranchingModal.tsx',
                  }),
                ],
              })
            );
          },
          nc = n(77842),
          nd = n(29599),
          nu = n(98820),
          np = n(54070),
          nm = n(80108),
          nh = n(63278),
          nf = n(37870),
          ng = n(94289),
          nx = () => {
            let { ref: e } = (0, s.UO)(),
              t = (0, eM.Vm)(),
              n = (0, tl.NL)(),
              i = (0, r.useRef)();
            async function l() {
              if (!t) return;
              let a = await (0, nf.GC)(
                ''.concat(Z.T5, '/projects/').concat(t.ref, '/status'),
                { timeout: 2e3 }
              );
              if (a && !a.error) {
                let { status: t } = a;
                t === Z.S.ACTIVE_HEALTHY &&
                  (clearInterval(i.current),
                  e && (await (0, nm.H0)(n, e)),
                  await (0, nh.fr)(n));
              }
            }
            return ((0, r.useEffect)(
              () => (
                (i.current = window.setInterval(l, 4e3)),
                () => {
                  clearInterval(i.current);
                }
              ),
              []
            ),
            void 0 === t)
              ? null
              : (0, a.jsxs)('div', {
                  className:
                    'mx-auto my-8 md:my-16 w-full md:max-w-7xl items-center justify-center',
                  'data-sentry-component': 'BuildingState',
                  'data-sentry-source-file': 'BuildingState.tsx',
                  children: [
                    (0, a.jsxs)('div', {
                      className: 'px-4 md:px-6 flex flex-col space-y-16',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'w-full flex flex-col gap-4',
                          children: [
                            (0, a.jsxs)('div', {
                              className:
                                'w-full flex flex-col md:flex-row items-start md:items-center gap-3',
                              children: [
                                (0, a.jsx)('h1', {
                                  className: 'text-3xl text-foreground',
                                  children: null == t ? void 0 : t.name,
                                }),
                                (0, a.jsx)(I.C, {
                                  variant: 'default',
                                  className: 'bg-surface-100 bg-opacity-100',
                                  'data-sentry-element': 'Badge',
                                  'data-sentry-source-file':
                                    'BuildingState.tsx',
                                  children: (0, a.jsxs)('div', {
                                    className: 'flex items-center gap-2',
                                    children: [
                                      (0, a.jsx)(eX.Z, {
                                        className: 'animate-spin',
                                        size: 12,
                                        'data-sentry-element': 'Loader2',
                                        'data-sentry-source-file':
                                          'BuildingState.tsx',
                                      }),
                                      (0, a.jsx)('span', {
                                        children:
                                          t.status === Z.S.UNKNOWN
                                            ? 'Initiating project set up'
                                            : 'Setting up project',
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                            (0, a.jsxs)('div', {
                              children: [
                                (0, a.jsxs)('p', {
                                  className: 'text-sm text-foreground-light',
                                  children: [
                                    ' ',
                                    'We are provisioning your database and API endpoints',
                                  ],
                                }),
                                (0, a.jsx)('p', {
                                  className: 'text-sm text-foreground-light',
                                  children: ' This may take a few minutes',
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsxs)('div', {
                            className: 'w-full grid grid-cols-12 gap-12',
                            children: [
                              (0, a.jsxs)('div', {
                                className:
                                  'w-full col-span-12 space-y-12 lg:col-span-4',
                                children: [
                                  (0, a.jsxs)('div', {
                                    children: [
                                      (0, a.jsx)('h4', {
                                        className: 'text-base text-foreground',
                                        children: 'While you wait',
                                      }),
                                      (0, a.jsx)(ny, {
                                        description: (0, a.jsxs)('p', {
                                          className:
                                            'text-sm text-foreground-light',
                                          children: [
                                            'Browse the Supabase',
                                            ' ',
                                            (0, a.jsx)(Q(), {
                                              href: 'https://supabase.com/docs',
                                              className:
                                                'mb-0 text-brand transition-colors text-brand-600',
                                              target: '_blank',
                                              rel: 'noreferrer',
                                              children: 'documentation',
                                            }),
                                            '.',
                                          ],
                                        }),
                                        'data-sentry-element': 'ChecklistItem',
                                        'data-sentry-source-file':
                                          'BuildingState.tsx',
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)('div', {
                                    children: [
                                      (0, a.jsx)('h4', {
                                        className: 'text-base text-foreground',
                                        children: 'Not working?',
                                      }),
                                      (0, a.jsx)(ny, {
                                        description: (0, a.jsx)('p', {
                                          className:
                                            'text-sm text-foreground-light',
                                          children:
                                            'Try refreshing after a couple of minutes.',
                                        }),
                                        'data-sentry-element': 'ChecklistItem',
                                        'data-sentry-source-file':
                                          'BuildingState.tsx',
                                      }),
                                      (0, a.jsx)('ul', {
                                        children: (0, a.jsx)(ny, {
                                          description: (0, a.jsxs)(a.Fragment, {
                                            children: [
                                              (0, a.jsx)('p', {
                                                className:
                                                  'mb-4 text-sm text-foreground-light',
                                                children:
                                                  "If your dashboard hasn't connected within 2 minutes, you can open a support ticket.",
                                              }),
                                              (0, a.jsx)(o.z, {
                                                asChild: !0,
                                                type: 'default',
                                                children: (0, a.jsx)(Q(), {
                                                  href: '/support/new',
                                                  children:
                                                    'Contact support team',
                                                }),
                                              }),
                                            ],
                                          }),
                                          'data-sentry-element':
                                            'ChecklistItem',
                                          'data-sentry-source-file':
                                            'BuildingState.tsx',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)('div', {
                                className: 'col-span-12  lg:col-span-8',
                                children: [
                                  (0, a.jsx)(np.D, {
                                    'data-sentry-element': 'DisplayApiSettings',
                                    'data-sentry-source-file':
                                      'BuildingState.tsx',
                                  }),
                                  (0, a.jsx)(np.m, {
                                    'data-sentry-element':
                                      'DisplayConfigSettings',
                                    'data-sentry-source-file':
                                      'BuildingState.tsx',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    t.status === Z.S.COMING_UP &&
                      (0, a.jsxs)('div', {
                        className: 'mx-auto my-16 w-full max-w-7xl space-y-16',
                        children: [
                          (0, a.jsxs)('div', {
                            className: 'space-y-8',
                            children: [
                              (0, a.jsx)('div', {
                                className: 'mx-6',
                                children: (0, a.jsx)('h4', {
                                  className: 'text-lg',
                                  children: 'Client libraries',
                                }),
                              }),
                              (0, a.jsx)('div', {
                                className:
                                  'grid grid-cols-2 gap-x-8 gap-y-8 md:gap-12 mx-6 mb-12 md:grid-cols-3',
                                children: nu.l.map((e) =>
                                  (0, a.jsx)(nc.Z, { ...e }, e.language)
                                ),
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className: 'space-y-8',
                            children: [
                              (0, a.jsx)('div', {
                                className: 'mx-6',
                                children: (0, a.jsx)('h5', {
                                  children: 'Example projects',
                                }),
                              }),
                              (0, a.jsx)('div', {
                                className:
                                  'mx-6 grid gap-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3',
                                children: nu.B.map((e) =>
                                  (0, a.jsx)(nd.Z, { ...e }, e.url)
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                  ],
                });
          };
        let ny = (e) => {
          let { description: t } = e;
          return (0, a.jsxs)('li', {
            className: 'my-3 flex flex-wrap space-x-3',
            'data-sentry-component': 'ChecklistItem',
            'data-sentry-source-file': 'BuildingState.tsx',
            children: [
              (0, a.jsx)('div', {
                className: 'mt-0.5',
                children: (0, a.jsx)(ng.Z, {
                  className: 'text-foreground-lighter',
                  size: 14,
                  'data-sentry-element': 'ArrowRight',
                  'data-sentry-source-file': 'BuildingState.tsx',
                }),
              }),
              (0, a.jsx)('div', { className: 'flex-1', children: t }),
            ],
          });
        };
        var nb = n(88658);
        async function nv(e, t) {
          if (void 0 === e) return !1;
          let { timeout: n } = null != t ? t : {};
          return nj(e, n);
        }
        async function nj(e, t) {
          let { error: n } = await (0, nf.pu)(
            ''.concat(Z.T5, '/projects/').concat(e, '/api/rest'),
            [],
            { timeout: null != t ? t : 2e3 }
          );
          return void 0 === n;
        }
        var n_ = n(5295),
          nw = n(44619),
          nN = n(58967),
          nC = (e) => {
            let { project: t } = e,
              { ref: n } = (0, s.UO)(),
              i = (0, tl.NL)(),
              l = (0, r.useRef)();
            (0, r.useEffect)(() => {
              if (t.restUrl)
                return (
                  (l.current = window.setInterval(c, 4e3)),
                  () => {
                    clearInterval(l.current);
                  }
                );
            }, [t]);
            let c = async () => {
              (await nv(t.ref)) &&
                (clearInterval(l.current),
                (0, nh.Ob)(i, t.ref, 'ONLINE'),
                await (0, nm.H0)(i, t.ref));
            };
            return (0, a.jsx)(a.Fragment, {
              children: (0, a.jsx)('div', {
                className: 'mx-auto my-16 w-full max-w-7xl space-y-16',
                children: (0, a.jsxs)('div', {
                  className: 'mx-6 space-y-16',
                  children: [
                    (0, a.jsxs)('div', {
                      className:
                        'flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6',
                      children: [
                        (0, a.jsx)('h1', {
                          className: 'text-3xl',
                          children: t.name,
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsx)(I.C, {
                            variant: 'brand',
                            'data-sentry-element': 'Badge',
                            'data-sentry-source-file': 'ConnectingState.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'flex items-center gap-2',
                              children: [
                                (0, a.jsx)(n_.Z, {
                                  className: 'animate-spin',
                                  size: 12,
                                  'data-sentry-element': 'Loader',
                                  'data-sentry-source-file':
                                    'ConnectingState.tsx',
                                }),
                                (0, a.jsx)('span', {
                                  children: 'Connecting to project',
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsx)('div', {
                      className:
                        'flex h-[500px] items-center justify-center rounded border border-overlay bg-surface-100 p-8',
                      children: (0, a.jsxs)('div', {
                        className: 'w-[440px] space-y-4',
                        children: [
                          (0, a.jsxs)('div', {
                            className:
                              'mx-auto flex max-w-[300px] items-center justify-center',
                            children: [
                              (0, a.jsx)('div', {
                                children: (0, a.jsx)('div', {
                                  className:
                                    'flex items-center justify-center w-12 h-12 rounded-md border',
                                  children: (0, a.jsx)(nw.Z, {
                                    className: 'text-foreground-light',
                                    size: 30,
                                    strokeWidth: 1.5,
                                    'data-sentry-element': 'Monitor',
                                    'data-sentry-source-file':
                                      'ConnectingState.tsx',
                                  }),
                                }),
                              }),
                              (0, a.jsx)(nb.Z, {
                                active: !0,
                                'data-sentry-element': 'ShimmerLine',
                                'data-sentry-source-file':
                                  'ConnectingState.tsx',
                              }),
                              (0, a.jsx)('div', {
                                children: (0, a.jsx)('div', {
                                  className:
                                    'flex items-center justify-center w-12 h-12 rounded-md border',
                                  children: (0, a.jsx)(nN.Z, {
                                    className: 'text-foreground-light',
                                    size: 30,
                                    strokeWidth: 1.5,
                                    'data-sentry-element': 'Server',
                                    'data-sentry-source-file':
                                      'ConnectingState.tsx',
                                  }),
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className: 'space-y-1',
                            children: [
                              (0, a.jsxs)('p', {
                                className: 'text-center',
                                children: ['Connecting to ', t.name],
                              }),
                              (0, a.jsx)('p', {
                                className:
                                  'text-center text-sm text-foreground-light',
                                children:
                                  "If you are unable to connect after a few minutes, check your project's health to verify if it's running into any resource constraints.",
                              }),
                            ],
                          }),
                          (0, a.jsxs)('div', {
                            className:
                              'flex items-center justify-center space-x-2',
                            children: [
                              (0, a.jsx)(o.z, {
                                asChild: !0,
                                type: 'default',
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'ConnectingState.tsx',
                                children: (0, a.jsx)(Q(), {
                                  href: '/project/'.concat(
                                    n,
                                    '/settings/infrastructure'
                                  ),
                                  'data-sentry-element': 'Link',
                                  'data-sentry-source-file':
                                    'ConnectingState.tsx',
                                  children: 'Check database health',
                                }),
                              }),
                              (0, a.jsx)(o.z, {
                                asChild: !0,
                                type: 'default',
                                icon: (0, a.jsx)(tz.Z, { strokeWidth: 1.5 }),
                                'data-sentry-element': 'Button',
                                'data-sentry-source-file':
                                  'ConnectingState.tsx',
                                children: (0, a.jsx)(Q(), {
                                  href: 'https://supabase.com/docs/guides/platform/troubleshooting#unable-to-connect-to-your-supabase-project',
                                  className: 'translate-y-[1px]',
                                  'data-sentry-element': 'Link',
                                  'data-sentry-source-file':
                                    'ConnectingState.tsx',
                                  children: 'Troubleshooting',
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
            });
          },
          nS = n(12684),
          nA = n(15731),
          nk = n(68846),
          nE = n(74304),
          nR = n(29589),
          nL = n(37564),
          nI = n(7324);
        async function nT(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: a, error: s } = await (0, eE.U2)(
            '/platform/database/{ref}/backups/downloadable-backups',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, eE.S3)(s), a);
        }
        let nO = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, ek.a)(
            nI.A.backups(t),
            (e) => {
              let { signal: n } = e;
              return nT({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
        var nP = n(14500),
          nB = n(88971),
          nF = () => {
            var e;
            let { ref: t } = (0, s.UO)(),
              { project: n } = (0, nB.d2)(),
              [i, l] = (0, r.useState)(!1),
              { data: c } = nO({ projectRef: t }),
              d =
                null !== (e = null == c ? void 0 : c.backups) && void 0 !== e
                  ? e
                  : [],
              { mutate: u, isLoading: p } = (0, nL.s)({
                onSuccess: (e) => {
                  let { fileUrl: t } = e,
                    n = document.createElement('a');
                  ((n.href = t),
                    document.body.appendChild(n),
                    n.click(),
                    document.body.removeChild(n));
                },
              });
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)('div', {
                  className: 'flex items-center justify-center h-full',
                  children: (0, a.jsx)('div', {
                    className:
                      'bg-surface-100 border border-overlay rounded-md w-3/4 lg:w-1/2',
                    children: (0, a.jsxs)('div', {
                      className: 'space-y-6 pt-6',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex px-8 space-x-8',
                          children: [
                            (0, a.jsx)('div', {
                              className: 'mt-1',
                              children: (0, a.jsx)(ta.ku, {
                                className: 'w-5 h-5',
                                'data-sentry-element': 'CriticalIcon',
                                'data-sentry-source-file':
                                  'PauseFailedState.tsx',
                              }),
                            }),
                            (0, a.jsxs)('div', {
                              className: 'space-y-1',
                              children: [
                                (0, a.jsx)('p', {
                                  children:
                                    'Something went wrong while pausing your project',
                                }),
                                (0, a.jsx)('p', {
                                  className: 'text-sm text-foreground-light',
                                  children:
                                    "Your project's data is intact, but your project is inaccessible due to the failure while pausing. Please contact support for assistance.",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className:
                            'border-t border-overlay flex items-center justify-end gap-x-2 py-4 px-8',
                          children: [
                            (0, a.jsx)(o.z, {
                              asChild: !0,
                              type: 'default',
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file': 'PauseFailedState.tsx',
                              children: (0, a.jsx)(Q(), {
                                href: '/support/new?category=Database_unresponsive&ref='.concat(
                                  null == n ? void 0 : n.ref,
                                  '&subject=Restoration%20failed%20for%20project'
                                ),
                                'data-sentry-element': 'Link',
                                'data-sentry-source-file':
                                  'PauseFailedState.tsx',
                                children: 'Contact support',
                              }),
                            }),
                            (0, a.jsx)(t7.u, {
                              type: 'default',
                              icon: (0, a.jsx)(_.Z, {}),
                              loading: p,
                              disabled: 0 === d.length,
                              tooltip: {
                                content: {
                                  side: 'bottom',
                                  text:
                                    0 === d.length
                                      ? 'No available backups to download'
                                      : void 0,
                                },
                              },
                              onClick: () =>
                                t
                                  ? 0 === d.length
                                    ? console.error(
                                        'No available backups to download'
                                      )
                                    : void u({ ref: t, backup: d[0] })
                                  : console.error('Project ref is required'),
                              'data-sentry-element': 'ButtonTooltip',
                              'data-sentry-source-file': 'PauseFailedState.tsx',
                              children: 'Download backup',
                            }),
                            (0, a.jsxs)(nP.h_, {
                              'data-sentry-element': 'DropdownMenu',
                              'data-sentry-source-file': 'PauseFailedState.tsx',
                              children: [
                                (0, a.jsx)(nP.$F, {
                                  'data-sentry-element': 'DropdownMenuTrigger',
                                  'data-sentry-source-file':
                                    'PauseFailedState.tsx',
                                  children: (0, a.jsx)(o.z, {
                                    type: 'default',
                                    className: 'px-1.5',
                                    icon: (0, a.jsx)(nk.Z, {}),
                                    'data-sentry-element': 'Button',
                                    'data-sentry-source-file':
                                      'PauseFailedState.tsx',
                                  }),
                                }),
                                (0, a.jsx)(nP.AW, {
                                  className: 'w-72',
                                  align: 'end',
                                  'data-sentry-element': 'DropdownMenuContent',
                                  'data-sentry-source-file':
                                    'PauseFailedState.tsx',
                                  children: (0, a.jsxs)(nP.Xi, {
                                    onClick: () => l(!0),
                                    className: 'items-start gap-x-2',
                                    'data-sentry-element': 'DropdownMenuItem',
                                    'data-sentry-source-file':
                                      'PauseFailedState.tsx',
                                    children: [
                                      (0, a.jsx)('div', {
                                        className: 'translate-y-0.5',
                                        children: (0, a.jsx)(nE.Z, {
                                          size: 14,
                                          'data-sentry-element': 'Trash',
                                          'data-sentry-source-file':
                                            'PauseFailedState.tsx',
                                        }),
                                      }),
                                      (0, a.jsxs)('div', {
                                        className: '',
                                        children: [
                                          (0, a.jsx)('p', {
                                            children: 'Delete project',
                                          }),
                                          (0, a.jsx)('p', {
                                            className:
                                              'text-foreground-lighter',
                                            children:
                                              'Project cannot be restored once it is deleted',
                                          }),
                                        ],
                                      }),
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
                }),
                (0, a.jsx)(nR.Z, {
                  visible: i,
                  onClose: () => l(!1),
                  'data-sentry-element': 'DeleteProjectModal',
                  'data-sentry-source-file': 'PauseFailedState.tsx',
                }),
              ],
            });
          },
          nz = n(71207);
        async function nD(e, t) {
          let { projectRef: n } = e;
          if (!n) throw Error('Project ref is required');
          let { data: a, error: s } = await (0, eE.U2)(
            '/platform/projects/{ref}/status',
            { params: { path: { ref: n } }, signal: t }
          );
          return (s && (0, eE.S3)(s), a);
        }
        let nU = function (e) {
          let { projectRef: t } = e,
            { enabled: n = !0, ...a } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return (0, ek.a)(
            nz.i.status(t),
            (e) => {
              let { signal: n } = e;
              return nD({ projectRef: t }, n);
            },
            { enabled: n && void 0 !== t, ...a }
          );
        };
        var nM = n(17432),
          nZ = (e) => {
            let { project: t } = e,
              { ref: n } = (0, s.UO)(),
              i = (0, tl.NL)(),
              [o, l] = (0, r.useState)(!1);
            return (
              nU(
                { projectRef: n },
                {
                  enabled: o,
                  refetchInterval: (e) =>
                    (null == e ? void 0 : e.status) !== Z.S.INACTIVE && 2e3,
                  onSuccess: async (e) => {
                    e.status === Z.S.INACTIVE &&
                      (n && (await (0, nm.H0)(i, n)), await (0, nh.fr)(i));
                  },
                }
              ),
              (0, r.useEffect)(() => {
                setTimeout(() => l(!0), 4e3);
              }, []),
              (0, a.jsx)('div', {
                className: 'mx-auto my-16 w-full max-w-7xl space-y-16',
                'data-sentry-component': 'PausingState',
                'data-sentry-source-file': 'PausingState.tsx',
                children: (0, a.jsxs)('div', {
                  className: 'mx-6 space-y-16',
                  children: [
                    (0, a.jsxs)('div', {
                      className:
                        'flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6',
                      children: [
                        (0, a.jsx)('h1', {
                          className: 'text-3xl',
                          children: t.name,
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsx)(I.C, {
                            'data-sentry-element': 'Badge',
                            'data-sentry-source-file': 'PausingState.tsx',
                            children: (0, a.jsxs)('div', {
                              className: 'flex items-center gap-2',
                              children: [
                                (0, a.jsx)(n_.Z, {
                                  className: 'animate-spin',
                                  size: 12,
                                  'data-sentry-element': 'Loader',
                                  'data-sentry-source-file': 'PausingState.tsx',
                                }),
                                (0, a.jsx)('span', {
                                  children: 'Pausing project',
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsx)('div', {
                      className: 'mx-auto mt-8 mb-16 w-full max-w-7xl',
                      children: (0, a.jsx)('div', {
                        className:
                          'flex h-[500px] items-center justify-center rounded border border-overlay bg-surface-100 p-8',
                        children: (0, a.jsxs)('div', {
                          className: 'grid w-[380px] gap-4',
                          children: [
                            (0, a.jsxs)('div', {
                              className: 'relative mx-auto max-w-[300px]',
                              children: [
                                (0, a.jsx)('div', {
                                  className:
                                    'absolute flex h-full w-full items-center justify-center',
                                  children: (0, a.jsx)(n_.Z, {
                                    className: 'animate-spin',
                                    size: 20,
                                    strokeWidth: 2,
                                    'data-sentry-element': 'Loader',
                                    'data-sentry-source-file':
                                      'PausingState.tsx',
                                  }),
                                }),
                                (0, a.jsx)(nM.Z, {
                                  className: 'text-foreground-lighter',
                                  size: 50,
                                  strokeWidth: 1.5,
                                  'data-sentry-element': 'Circle',
                                  'data-sentry-source-file': 'PausingState.tsx',
                                }),
                              ],
                            }),
                            (0, a.jsxs)('p', {
                              className: 'text-center',
                              children: ['Pausing ', t.name],
                            }),
                            (0, a.jsx)('p', {
                              className:
                                'text-center text-sm text-foreground-light',
                              children:
                                'You may restore your project anytime thereafter, and your data will be restored to when it was initially paused.',
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
              })
            );
          },
          nq = (e) => {
            let { title: t, children: n } = e;
            return (0, a.jsxs)('div', {
              id: 'spec-click-target',
              className:
                'hide-scrollbar flex flex-col w-full h-full bg-dash-sidebar border-default ',
              'data-sentry-component': 'ProductMenuBar',
              'data-sentry-source-file': 'ProductMenuBar.tsx',
              children: [
                (0, a.jsx)('div', {
                  className:
                    'border-default flex max-h-12 items-center border-b px-6',
                  style: { minHeight: '3rem' },
                  children: (0, a.jsx)('h4', {
                    className: 'text-lg',
                    children: t,
                  }),
                }),
                (0, a.jsx)('div', {
                  className: 'flex-grow overflow-y-auto',
                  children: n,
                }),
              ],
            });
          };
        let nW = () => {
          let { ref: e } = (0, s.UO)();
          return (
            (0, nm.ix)(
              { ref: e },
              {
                refetchInterval: (e) =>
                  (null == e ? void 0 : e.status) !== Z.S.ACTIVE_HEALTHY && 4e3,
              }
            ),
            (0, a.jsx)('div', {
              className: 'flex items-center justify-center h-full',
              'data-sentry-component': 'ResizingState',
              'data-sentry-source-file': 'ResizingState.tsx',
              children: (0, a.jsx)('div', {
                className:
                  'bg-surface-100 border border-overlay rounded-md w-3/4 lg:w-1/2',
                children: (0, a.jsx)('div', {
                  className: 'space-y-6 py-6',
                  children: (0, a.jsxs)('div', {
                    className: 'flex px-8 space-x-8',
                    children: [
                      (0, a.jsx)('div', {
                        className: 'mt-1',
                        children: (0, a.jsx)(eX.Z, {
                          className: 'animate-spin text-foreground-light',
                          size: 18,
                          'data-sentry-element': 'Loader2',
                          'data-sentry-source-file': 'ResizingState.tsx',
                        }),
                      }),
                      (0, a.jsxs)('div', {
                        className: 'flex flex-col gap-1',
                        children: [
                          (0, a.jsx)('p', {
                            children: 'Resizing Project Compute size',
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              'Your project is being restarted to apply compute size changes.',
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              'This can take a few minutes. Project will be offline while it is being restarted.',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            })
          );
        };
        var nY = () => {
            let { ref: e } = (0, s.UO)();
            return (
              (0, nm.ix)(
                { ref: e },
                {
                  refetchInterval: (e) =>
                    (null == e ? void 0 : e.status) !== Z.S.ACTIVE_HEALTHY &&
                    4e3,
                }
              ),
              (0, a.jsx)('div', {
                className: 'flex items-center justify-center h-full',
                'data-sentry-component': 'RestartingState',
                'data-sentry-source-file': 'RestartingState.tsx',
                children: (0, a.jsx)('div', {
                  className:
                    'bg-surface-100 border border-overlay rounded-md w-3/4 lg:w-1/2',
                  children: (0, a.jsx)('div', {
                    className: 'space-y-6 py-6',
                    children: (0, a.jsxs)('div', {
                      className: 'flex px-8 space-x-8',
                      children: [
                        (0, a.jsx)('div', {
                          className: 'mt-1',
                          children: (0, a.jsx)(eX.Z, {
                            className: 'animate-spin',
                            size: 18,
                            'data-sentry-element': 'Loader2',
                            'data-sentry-source-file': 'RestartingState.tsx',
                          }),
                        }),
                        (0, a.jsxs)('div', {
                          className: 'space-y-1',
                          children: [
                            (0, a.jsx)('p', { children: 'Restarting...' }),
                            (0, a.jsx)('p', {
                              className: 'text-sm text-foreground-light',
                              children:
                                'Restarting can take a few minutes. Your project will be offline while it restarts.',
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              })
            );
          },
          nH = () => {
            var e;
            let { ref: t } = (0, s.UO)(),
              { project: n } = (0, nB.d2)(),
              [i, l] = (0, r.useState)(!1),
              { data: c } = nO({ projectRef: t }),
              d =
                null !== (e = null == c ? void 0 : c.backups) && void 0 !== e
                  ? e
                  : [],
              { mutate: u, isLoading: p } = (0, nL.s)({
                onSuccess: (e) => {
                  let { fileUrl: t } = e,
                    n = document.createElement('a');
                  ((n.href = t),
                    document.body.appendChild(n),
                    n.click(),
                    document.body.removeChild(n));
                },
              });
            return (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)('div', {
                  className: 'flex items-center justify-center h-full',
                  children: (0, a.jsx)('div', {
                    className:
                      'bg-surface-100 border border-overlay rounded-md w-3/4 lg:w-1/2',
                    children: (0, a.jsxs)('div', {
                      className: 'space-y-6 pt-6',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex px-8 space-x-8',
                          children: [
                            (0, a.jsx)('div', {
                              className: 'mt-1',
                              children: (0, a.jsx)(ta.ku, {
                                className: 'w-5 h-5',
                                'data-sentry-element': 'CriticalIcon',
                                'data-sentry-source-file':
                                  'RestoreFailedState.tsx',
                              }),
                            }),
                            (0, a.jsxs)('div', {
                              className: 'space-y-1',
                              children: [
                                (0, a.jsx)('p', {
                                  children:
                                    'Something went wrong while restoring your project',
                                }),
                                (0, a.jsx)('p', {
                                  className: 'text-sm text-foreground-light',
                                  children:
                                    "Your project's data is intact, but your project is inaccessible due to the restoration failure. Please contact support for assistance.",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className:
                            'border-t border-overlay flex items-center justify-end py-4 px-8 gap-x-2',
                          children: [
                            (0, a.jsx)(o.z, {
                              asChild: !0,
                              type: 'default',
                              'data-sentry-element': 'Button',
                              'data-sentry-source-file':
                                'RestoreFailedState.tsx',
                              children: (0, a.jsx)(Q(), {
                                href: '/support/new?category=Database_unresponsive&ref='.concat(
                                  null == n ? void 0 : n.ref,
                                  '&subject=Restoration%20failed%20for%20project'
                                ),
                                'data-sentry-element': 'Link',
                                'data-sentry-source-file':
                                  'RestoreFailedState.tsx',
                                children: 'Contact support',
                              }),
                            }),
                            (0, a.jsx)(t7.u, {
                              type: 'default',
                              icon: (0, a.jsx)(_.Z, {}),
                              loading: p,
                              disabled: 0 === d.length,
                              tooltip: {
                                content: {
                                  side: 'bottom',
                                  text:
                                    0 === d.length
                                      ? 'No available backups to download'
                                      : void 0,
                                },
                              },
                              onClick: () =>
                                t
                                  ? 0 === d.length
                                    ? console.error(
                                        'No available backups to download'
                                      )
                                    : void u({ ref: t, backup: d[0] })
                                  : console.error('Project ref is required'),
                              'data-sentry-element': 'ButtonTooltip',
                              'data-sentry-source-file':
                                'RestoreFailedState.tsx',
                              children: 'Download backup',
                            }),
                            (0, a.jsxs)(nP.h_, {
                              'data-sentry-element': 'DropdownMenu',
                              'data-sentry-source-file':
                                'RestoreFailedState.tsx',
                              children: [
                                (0, a.jsx)(nP.$F, {
                                  'data-sentry-element': 'DropdownMenuTrigger',
                                  'data-sentry-source-file':
                                    'RestoreFailedState.tsx',
                                  children: (0, a.jsx)(o.z, {
                                    type: 'default',
                                    className: 'px-1.5',
                                    icon: (0, a.jsx)(nk.Z, {}),
                                    'data-sentry-element': 'Button',
                                    'data-sentry-source-file':
                                      'RestoreFailedState.tsx',
                                  }),
                                }),
                                (0, a.jsx)(nP.AW, {
                                  className: 'w-72',
                                  align: 'end',
                                  'data-sentry-element': 'DropdownMenuContent',
                                  'data-sentry-source-file':
                                    'RestoreFailedState.tsx',
                                  children: (0, a.jsxs)(nP.Xi, {
                                    onClick: () => l(!0),
                                    className: 'items-start gap-x-2',
                                    'data-sentry-element': 'DropdownMenuItem',
                                    'data-sentry-source-file':
                                      'RestoreFailedState.tsx',
                                    children: [
                                      (0, a.jsx)('div', {
                                        className: 'translate-y-0.5',
                                        children: (0, a.jsx)(nE.Z, {
                                          size: 14,
                                          'data-sentry-element': 'Trash',
                                          'data-sentry-source-file':
                                            'RestoreFailedState.tsx',
                                        }),
                                      }),
                                      (0, a.jsxs)('div', {
                                        className: '',
                                        children: [
                                          (0, a.jsx)('p', {
                                            children: 'Delete project',
                                          }),
                                          (0, a.jsx)('p', {
                                            className:
                                              'text-foreground-lighter',
                                            children:
                                              'Project cannot be restored once it is deleted',
                                          }),
                                        ],
                                      }),
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
                }),
                (0, a.jsx)(nR.Z, {
                  visible: i,
                  onClose: () => l(!1),
                  'data-sentry-element': 'DeleteProjectModal',
                  'data-sentry-source-file': 'RestoreFailedState.tsx',
                }),
              ],
            });
          },
          nG = n(97146),
          nV = () => {
            var e;
            let { ref: t } = (0, s.UO)(),
              n = (0, tl.NL)(),
              { project: i } = (0, nB.d2)(),
              l = (0, r.useRef)(),
              [c, d] = (0, r.useState)(!1),
              [u, p] = (0, r.useState)(!1),
              { data: m } = nO({ projectRef: t }),
              h =
                null !== (e = null == m ? void 0 : m.backups) && void 0 !== e
                  ? e
                  : [],
              { mutate: f, isLoading: g } = (0, nL.s)({
                onSuccess: (e) => {
                  let { fileUrl: t } = e,
                    n = document.createElement('a');
                  ((n.href = t),
                    document.body.appendChild(n),
                    n.click(),
                    document.body.removeChild(n));
                },
              });
            async function x() {
              if (!i) return;
              let e = await (0, nf.GC)(
                ''.concat(Z.T5, '/projects/').concat(i.ref, '/status'),
                { timeout: 2e3 }
              );
              if (e && !e.error) {
                let { status: a } = e;
                a === Z.S.ACTIVE_HEALTHY
                  ? (clearInterval(l.current), p(!0))
                  : n.invalidateQueries(nz.i.detail(t));
              }
            }
            let y = async () => {
              if (!i) return console.error('Project is required');
              (d(!0), t && (await (0, nm.H0)(n, t)));
            };
            return (
              (0, r.useEffect)(
                () => (
                  (l.current = window.setInterval(x, 4e3)),
                  () => clearInterval(l.current)
                ),
                []
              ),
              (0, a.jsx)('div', {
                className: 'flex items-center justify-center h-full',
                'data-sentry-component': 'RestoringState',
                'data-sentry-source-file': 'RestoringState.tsx',
                children: (0, a.jsx)('div', {
                  className:
                    'bg-surface-100 border border-overlay rounded-md w-3/4 lg:w-1/2',
                  children: u
                    ? (0, a.jsxs)('div', {
                        className: 'space-y-6 pt-6',
                        children: [
                          (0, a.jsxs)('div', {
                            className: 'flex px-8 space-x-8',
                            children: [
                              (0, a.jsx)('div', {
                                className: 'mt-1',
                                children: (0, a.jsx)(nG.Z, {
                                  className: 'text-brand',
                                  size: 18,
                                  strokeWidth: 2,
                                }),
                              }),
                              (0, a.jsxs)('div', {
                                className: 'space-y-1',
                                children: [
                                  (0, a.jsx)('p', {
                                    children: 'Restoration complete!',
                                  }),
                                  (0, a.jsx)('p', {
                                    className: 'text-sm text-foreground-light',
                                    children:
                                      'Your project has been successfully restored and is now back online.',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsx)('div', {
                            className:
                              'border-t border-overlay flex items-center justify-end py-4 px-8',
                            children: (0, a.jsx)(o.z, {
                              disabled: c,
                              loading: c,
                              onClick: y,
                              children: 'Return to project',
                            }),
                          }),
                        ],
                      })
                    : (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsx)('div', {
                            className: 'space-y-6 py-6',
                            children: (0, a.jsxs)('div', {
                              className: 'flex px-8 space-x-8',
                              children: [
                                (0, a.jsx)('div', {
                                  className: 'mt-1',
                                  children: (0, a.jsx)(n_.Z, {
                                    className: 'animate-spin',
                                    size: 18,
                                  }),
                                }),
                                (0, a.jsxs)('div', {
                                  className: 'space-y-1',
                                  children: [
                                    (0, a.jsx)('p', {
                                      children: 'Restoration in progress',
                                    }),
                                    (0, a.jsx)('p', {
                                      className:
                                        'text-sm text-foreground-light',
                                      children:
                                        'Restoration can take from a few minutes up to several hours depending on the size of your database. Your project will be offline while the restoration is running.',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, a.jsxs)('div', {
                            className:
                              'border-t border-overlay flex items-center justify-end py-4 px-8 gap-x-2',
                            children: [
                              (0, a.jsx)(o.z, {
                                asChild: !0,
                                type: 'default',
                                children: (0, a.jsx)(Q(), {
                                  href: '/support/new?category=Database_unresponsive&ref='.concat(
                                    null == i ? void 0 : i.ref,
                                    '&subject=Restoration%20failed%20for%20project'
                                  ),
                                  children: 'Contact support',
                                }),
                              }),
                              (0, a.jsx)(t7.u, {
                                type: 'default',
                                icon: (0, a.jsx)(_.Z, {}),
                                loading: g,
                                disabled: 0 === h.length,
                                tooltip: {
                                  content: {
                                    side: 'bottom',
                                    text:
                                      0 === h.length
                                        ? 'No available backups to download'
                                        : void 0,
                                  },
                                },
                                onClick: () =>
                                  t
                                    ? 0 === h.length
                                      ? console.error(
                                          'No available backups to download'
                                        )
                                      : void f({ ref: t, backup: h[0] })
                                    : console.error('Project ref is required'),
                                children: 'Download backup',
                              }),
                            ],
                          }),
                        ],
                      }),
                }),
              })
            );
          },
          nX = n(68258),
          nK = n(28977),
          n$ = n.n(nK),
          nQ = n(65858),
          nJ = n(1707),
          n0 = n(38232),
          n1 = n(52053),
          n2 = n(92907);
        let n4 = [
          {
            key: nX.L9.Started,
            initial: 'Prepare new server',
            progress: 'Preparing new server',
            completed: 'Prepared new server',
          },
          {
            key: nX.L9.LaunchedUpgradedInstance,
            initial: 'Prepare new server for migration',
            progress: 'Preparing new server for migration',
            completed: 'New server ready for migration',
          },
          {
            key: nX.L9.DetachedVolumeFromUpgradedInstance,
            initial: 'Execute pre-upgrade checks',
            progress: 'Executing pre-upgrade checks',
            completed: 'Completed pre-upgrade checks',
          },
          {
            key: nX.L9.AttachedVolumeToOriginalInstance,
            initial: 'Shut down API services',
            progress: 'Shutting down API services',
            completed: 'Completed shutting down API services',
          },
          {
            key: nX.L9.InitiatedDataUpgrade,
            initial: 'Migrate to new database',
            progress: 'Migrating to new database',
            completed: 'Completed migration to new database',
          },
          {
            key: nX.L9.CompletedDataUpgrade,
            initial: 'Execute database migration',
            progress: 'Executing database migration',
            completed: 'Completed database migration',
          },
          {
            key: nX.L9.DetachedVolumeFromOriginalInstance,
            initial: 'Update database extensions',
            progress: 'Updating database extensions',
            completed: 'Updated database extensions',
          },
          {
            key: nX.L9.AttachedVolumeToUpgradedInstance,
            initial: 'Optimize database',
            progress: 'Optimizing database',
            completed: 'Completed optimization of database',
          },
        ];
        var n5 = () => {
          var e;
          let { ref: t } = (0, s.UO)(),
            n = (0, n1.useSearchParams)(),
            i = (0, tl.NL)(),
            { project: l } = (0, nB.d2)(),
            [c, d] = (0, r.useState)(!1),
            [u, p] = (0, r.useState)(!1),
            { data: m } = (0, n2.h)(
              {
                projectRef: t,
                projectStatus: null == l ? void 0 : l.status,
                trackingId: n.get('trackingId'),
              },
              { enabled: Z.Qy }
            ),
            {
              initiated_at: h,
              status: f,
              progress: g,
              target_version: x,
              error: y,
            } = null !== (e = null == m ? void 0 : m.databaseUpgradeStatus) &&
            void 0 !== e
              ? e
              : {},
            b = Number((g || '').split('_')[0]),
            v = f === nX.h.Failed,
            j = f === nX.h.Upgraded,
            _ = f === nX.h.Upgrading && g === nX.L9.CompletedUpgrade,
            w = n$()
              .utc(null != h ? h : 0)
              .format('DD MMM YYYY HH:mm:ss'),
            N = n$()
              .utc(null != h ? h : 0)
              .local()
              .format('DD MMM YYYY HH:mm:ss (ZZ)'),
            C = async () => {
              (d(!0), t && (await (0, nm.H0)(i, t)));
            },
            S = 'Upgrade information:%0A• Initiated at: '
              .concat(h, '%0A• Target Version: ')
              .concat(x, '%0A• Error: ')
              .concat(y);
          return (0, a.jsx)('div', {
            className: 'w-full mx-auto my-16 space-y-16 max-w-7xl',
            'data-sentry-component': 'UpgradingState',
            'data-sentry-source-file': 'UpgradingState.tsx',
            children: (0, a.jsxs)('div', {
              className: 'mx-6 space-y-16',
              children: [
                (0, a.jsx)('div', {
                  className:
                    'flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6',
                  children: (0, a.jsx)('h1', {
                    className: 'text-3xl',
                    children: null == l ? void 0 : l.name,
                  }),
                }),
                (0, a.jsx)('div', {
                  className: 'w-full mx-auto mt-8 mb-16 max-w-7xl',
                  children: (0, a.jsx)('div', {
                    className:
                      'flex h-[500px] items-center justify-center rounded border border-muted bg-surface-100 p-8',
                    children: j
                      ? (0, a.jsxs)('div', {
                          className: 'grid gap-4',
                          children: [
                            (0, a.jsx)('div', {
                              className: 'relative mx-auto max-w-[300px]',
                              children: (0, a.jsx)(nG.Z, {
                                className: 'text-brand',
                                size: 40,
                                strokeWidth: 1.5,
                              }),
                            }),
                            (0, a.jsxs)('div', {
                              className: 'space-y-2',
                              children: [
                                (0, a.jsx)('p', {
                                  className: 'text-center',
                                  children: 'Upgrade completed!',
                                }),
                                (0, a.jsxs)('p', {
                                  className:
                                    'mt-4 text-center text-sm text-foreground-light w-[300px] mx-auto',
                                  children: [
                                    'Your project has been successfully upgraded to Postgres ',
                                    x,
                                    ' and is now back online.',
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)('div', {
                              className: 'mx-auto',
                              children: (0, a.jsx)(o.z, {
                                loading: c,
                                disabled: c,
                                onClick: C,
                                children: 'Return to project',
                              }),
                            }),
                          ],
                        })
                      : v
                        ? (0, a.jsxs)('div', {
                            className: 'grid gap-4',
                            children: [
                              (0, a.jsx)('div', {
                                className: 'relative mx-auto max-w-[300px]',
                                children: (0, a.jsx)(nt.Z, {
                                  className: 'text-amber-900',
                                  size: 40,
                                  strokeWidth: 1.5,
                                }),
                              }),
                              (0, a.jsxs)('div', {
                                className: 'space-y-2',
                                children: [
                                  (0, a.jsx)('p', {
                                    className: 'text-center',
                                    children:
                                      'We ran into an issue while upgrading your project',
                                  }),
                                  (0, a.jsx)('p', {
                                    className:
                                      'mt-4 text-center text-sm text-foreground-light w-full md:w-[450px] mx-auto',
                                    children:
                                      'Your project is back online and its data is not affected. Please reach out to us via our support form for assistance with the upgrade.',
                                  }),
                                ],
                              }),
                              (0, a.jsxs)('div', {
                                className:
                                  'flex items-center mx-auto space-x-2',
                                children: [
                                  (0, a.jsx)(o.z, {
                                    asChild: !0,
                                    type: 'default',
                                    children: (0, a.jsx)(Q(), {
                                      href: '/support/new?category=Database_unresponsive&ref='
                                        .concat(t, '&subject=')
                                        .concat(
                                          'Upgrade%20failed%20for%20project',
                                          '&message='
                                        )
                                        .concat(S),
                                      target: '_blank',
                                      rel: 'noreferrer',
                                      children: 'Contact support',
                                    }),
                                  }),
                                  (0, a.jsx)(o.z, {
                                    loading: c,
                                    disabled: c,
                                    onClick: C,
                                    children: 'Return to project',
                                  }),
                                ],
                              }),
                            ],
                          })
                        : (0, a.jsxs)('div', {
                            className: 'grid w-[480px] gap-4',
                            children: [
                              (0, a.jsxs)('div', {
                                className: 'relative mx-auto max-w-[300px]',
                                children: [
                                  (0, a.jsx)('div', {
                                    className:
                                      'absolute flex items-center justify-center w-full h-full',
                                    children: (0, a.jsx)(nQ.Z, {
                                      className: 'animate-spin',
                                      size: 20,
                                      strokeWidth: 2,
                                    }),
                                  }),
                                  (0, a.jsx)(nM.Z, {
                                    className: 'text-foreground-lighter',
                                    size: 50,
                                    strokeWidth: 1.5,
                                  }),
                                ],
                              }),
                              (0, a.jsxs)('div', {
                                className: 'space-y-2',
                                children: [
                                  _
                                    ? (0, a.jsxs)('div', {
                                        children: [
                                          (0, a.jsx)('p', {
                                            className: 'text-center',
                                            children:
                                              'Performing a full backup',
                                          }),
                                          (0, a.jsx)('p', {
                                            className:
                                              'text-sm text-center text-foreground-light',
                                            children:
                                              'Upgrade is now complete, and your project is online. A full backup is now being performed to ensure that there is a proper base backup available post-upgrade. This can take from a few minutes up to several hours depending on the size of your database.',
                                          }),
                                        ],
                                      })
                                    : (0, a.jsxs)('div', {
                                        children: [
                                          (0, a.jsx)('p', {
                                            className: 'text-center',
                                            children: 'Upgrading in progress',
                                          }),
                                          (0, a.jsx)('p', {
                                            className:
                                              'text-sm text-center text-foreground-light',
                                            children:
                                              'Upgrades can take from a few minutes up to several hours depending on the size of your database. Your project will be offline while it is being upgraded.',
                                          }),
                                        ],
                                      }),
                                  (0, a.jsxs)('div', {
                                    className:
                                      '!mt-4 !mb-2 py-3 px-4 transition-all overflow-hidden border rounded relative',
                                    style: { maxHeight: u ? '500px' : '110px' },
                                    children: [
                                      u
                                        ? (0, a.jsx)(nJ.Z, {
                                            size: 14,
                                            strokeWidth: 2,
                                            className:
                                              'absolute z-10 cursor-pointer top-3 right-3',
                                            onClick: () => p(!1),
                                          })
                                        : (0, a.jsx)(n0.Z, {
                                            size: 14,
                                            strokeWidth: 2,
                                            className:
                                              'absolute z-10 cursor-pointer top-3 right-3',
                                            onClick: () => p(!0),
                                          }),
                                      (0, a.jsx)('div', {
                                        className: 'space-y-2 transition-all',
                                        style: {
                                          translate: u
                                            ? '0px 0px'
                                            : '0px '.concat(
                                                -(
                                                  (b - 2 <= 0
                                                    ? 0
                                                    : b > 6
                                                      ? 5
                                                      : b - 2) * 28
                                                ),
                                                'px'
                                              ),
                                        },
                                        children: n4.map((e, t) => {
                                          let n = e.key === g,
                                            s = b > t;
                                          return (0, a.jsxs)(
                                            'div',
                                            {
                                              className:
                                                'flex items-center space-x-4',
                                              children: [
                                                n
                                                  ? (0, a.jsx)('div', {
                                                      className:
                                                        'flex items-center justify-center w-5 h-5 rounded-full',
                                                      children: (0, a.jsx)(
                                                        n_.Z,
                                                        {
                                                          size: 20,
                                                          className:
                                                            'animate-spin text-foreground-light',
                                                          strokeWidth: 2,
                                                        }
                                                      ),
                                                    })
                                                  : s
                                                    ? (0, a.jsx)('div', {
                                                        className:
                                                          'flex items-center justify-center w-5 h-5 border rounded-full bg-brand border-brand',
                                                        children: (0, a.jsx)(
                                                          tL.Z,
                                                          {
                                                            size: 12,
                                                            className:
                                                              'text-white',
                                                            strokeWidth: 3,
                                                          }
                                                        ),
                                                      })
                                                    : (0, a.jsx)('div', {
                                                        className:
                                                          'flex items-center justify-center w-5 h-5 border rounded-full bg-overlay-hover',
                                                      }),
                                                (0, a.jsx)('p', {
                                                  className: 'text-sm '.concat(
                                                    n
                                                      ? 'text-foreground'
                                                      : s
                                                        ? 'text-foreground-light'
                                                        : 'text-foreground-lighter',
                                                    ' text-foreground transition'
                                                  ),
                                                  children: n
                                                    ? e.progress
                                                    : s
                                                      ? e.completed
                                                      : e.initial,
                                                }),
                                              ],
                                            },
                                            e.key
                                          );
                                        }),
                                      }),
                                    ],
                                  }),
                                  void 0 !== h &&
                                    (0, a.jsxs)(eH.u, {
                                      children: [
                                        (0, a.jsx)(eH.aJ, {
                                          children: (0, a.jsxs)('p', {
                                            className:
                                              'text-sm text-center text-foreground-light',
                                            children: [
                                              'Started on: ',
                                              w,
                                              ' (UTC)',
                                            ],
                                          }),
                                        }),
                                        (0, a.jsx)(eH._v, {
                                          side: 'bottom',
                                          children: N,
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                  }),
                }),
              ],
            }),
          });
        };
        let n3 = [
            '/project/[ref]/settings/general',
            '/project/[ref]/settings/database',
            '/project/[ref]/settings/storage',
            '/project/[ref]/settings/infrastructure',
            '/project/[ref]/settings/addons',
          ],
          n6 = [
            '/project/[ref]/branches',
            '/project/[ref]/database/backups/scheduled',
            '/project/[ref]/database/backups/pitr',
            '/project/[ref]/settings/addons',
          ],
          n8 = [
            '/project/[ref]/reports',
            '/project/[ref]/settings/general',
            '/project/[ref]/settings/database',
            '/project/[ref]/settings/infrastructure',
            '/project/[ref]/settings/addons',
          ],
          n9 = (0, r.forwardRef)((e, t) => {
            let {
                title: n,
                isLoading: i = !1,
                isBlocking: o = !0,
                product: l = '',
                productMenu: c,
                children: u,
                hideHeader: p = !1,
                hideIconBar: m = !1,
                selectedTable: h,
                resizableSidebar: f = !1,
              } = e,
              g = (0, e_.useRouter)(),
              [x, y] = (0, r.useState)(!1),
              { ref: b } = (0, s.UO)(),
              v = (0, eU.l)(),
              j = (0, eM.Vm)(),
              {
                aiAssistantPanel: _,
                setAiAssistantPanel: w,
                mobileMenuOpen: N,
                setMobileMenuOpen: C,
              } = (0, d.WZ)(),
              { open: S } = _,
              A = null == j ? void 0 : j.name,
              k = null == v ? void 0 : v.name,
              E = (null == j ? void 0 : j.status) === Z.S.INACTIVE,
              R =
                !j ||
                j.status === Z.S.ACTIVE_HEALTHY ||
                (j.status === Z.S.COMING_UP &&
                  g.pathname.includes('/project/[ref]/settings')),
              L =
                '/project/[ref]' === g.pathname ||
                g.pathname.includes('/project/[ref]/settings');
            return (
              (0, r.useEffect)(() => {
                y(!0);
              }, []),
              (0, r.useEffect)(() => {
                let e = (e) => {
                  !e.metaKey ||
                    'i' !== e.key ||
                    e.altKey ||
                    e.shiftKey ||
                    (w({ open: !S }), e.preventDefault(), e.stopPropagation());
                };
                return (
                  window.addEventListener('keydown', e),
                  () => window.removeEventListener('keydown', e)
                );
              }, [S]),
              (0, a.jsxs)(a.Fragment, {
                children: [
                  (0, a.jsxs)(tY(), {
                    children: [
                      (0, a.jsx)('title', {
                        children: n
                          ? ''.concat(n, ' | Supabase')
                          : h
                            ? ''
                                .concat(h, ' | ')
                                .concat(A, ' | ')
                                .concat(k, ' | Supabase')
                            : A
                              ? ''.concat(A, ' | ').concat(k, ' | Supabase')
                              : k
                                ? ''.concat(k, ' | Supabase')
                                : 'Supabase',
                      }),
                      (0, a.jsx)('meta', {
                        name: 'description',
                        content: 'Supabase Studio',
                      }),
                    ],
                  }),
                  (0, a.jsx)('div', {
                    className: 'flex flex-row h-full w-full',
                    children: (0, a.jsxs)(tG.pO, {
                      className: '',
                      direction: 'horizontal',
                      autoSaveId: 'project-layout',
                      children: [
                        R &&
                          c &&
                          (0, a.jsx)(tG.ee, {
                            order: 1,
                            maxSize: 33,
                            defaultSize: 1,
                            id: 'panel-left',
                            className: (0, eu.cn)(
                              'hidden md:block',
                              'transition-all duration-[120ms]',
                              f ? 'min-w-64 max-w-[32rem]' : 'min-w-64 max-w-64'
                            ),
                            children: (0, a.jsx)(ef.M, {
                              initial: !1,
                              children: (0, a.jsx)(eh.E.div, {
                                initial: {
                                  width: 0,
                                  opacity: 0,
                                  height: '100%',
                                },
                                animate: {
                                  width: 'auto',
                                  opacity: 1,
                                  height: '100%',
                                },
                                exit: { width: 0, opacity: 0, height: '100%' },
                                className: 'h-full',
                                transition: { duration: 0.12 },
                                children: (0, a.jsx)(at, {
                                  isLoading: i,
                                  isBlocking: o,
                                  productMenu: c,
                                  children: (0, a.jsx)(nq, {
                                    title: l,
                                    children: c,
                                  }),
                                }),
                              }),
                            }),
                          }),
                        R &&
                          c &&
                          (0, a.jsx)(tG.Dp, {
                            withHandle: !0,
                            disabled: !f,
                            className: 'hidden md:block',
                          }),
                        (0, a.jsx)(tG.ee, {
                          order: 2,
                          id: 'panel-right',
                          className: 'h-full flex flex-col w-full',
                          children: (0, a.jsxs)(tG.pO, {
                            className:
                              'h-full w-full overflow-x-hidden flex-1 flex flex-row gap-0',
                            direction: 'horizontal',
                            autoSaveId: 'project-layout-content',
                            children: [
                              (0, a.jsx)(tG.ee, {
                                id: 'panel-content',
                                className: (0, eu.cn)(
                                  'w-full xl:min-w-[600px] bg-dash-sidebar'
                                ),
                                children: (0, a.jsx)('main', {
                                  className:
                                    'h-full flex flex-col flex-1 w-full overflow-y-auto overflow-x-hidden',
                                  ref: t,
                                  children:
                                    E && !L
                                      ? (0, a.jsx)('div', {
                                          className:
                                            'mx-auto my-16 w-full h-full max-w-7xl flex items-center',
                                          children: (0, a.jsx)('div', {
                                            className: 'w-full',
                                            children: (0, a.jsx)(nA.$, {
                                              product: l,
                                            }),
                                          }),
                                        })
                                      : (0, a.jsxs)(an, {
                                          isLoading: i,
                                          isBlocking: o,
                                          children: [(0, a.jsx)(tZ, {}), u],
                                        }),
                                }),
                              }),
                              x &&
                                _.open &&
                                (0, a.jsxs)(a.Fragment, {
                                  children: [
                                    (0, a.jsx)(tG.Dp, { withHandle: !0 }),
                                    (0, a.jsx)(tG.ee, {
                                      id: 'panel-assistant',
                                      className: (0, eu.cn)(
                                        'border-l xl:border-l-0 bg fixed z-40 md:absolute md:z-0 right-0 top-0 md:top-[48px] bottom-0 xl:relative xl:top-0',
                                        'w-screen h-[100dvh] md:h-auto md:w-auto md:min-w-[400px] max-w-[500px]',
                                        '2xl:min-w-[500px] 2xl:max-w-[600px]'
                                      ),
                                      children: (0, a.jsx)(tA, {}),
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(nl, {}),
                  (0, a.jsx)(tP, {}),
                  (0, a.jsx)(ed, {}),
                  (0, a.jsx)(tV.Z, { open: N, onOpenChange: C, children: c }),
                ],
              })
            );
          });
        n9.displayName = 'ProjectLayout';
        let n7 = (0, tq.Q)(n9);
        var ae = n9;
        let at = (e) => {
            let {
                isLoading: t,
                isBlocking: n = !0,
                productMenu: a,
                children: s,
              } = e,
              r = (0, e_.useRouter)(),
              i = (0, eM.Vm)(),
              o = !n3.includes(r.pathname);
            return n ? (!t && a && (!o || (o && void 0 !== i)) ? s : null) : s;
          },
          an = (e) => {
            let { isLoading: t, isBlocking: n = !0, children: i } = e,
              o = (0, e_.useRouter)(),
              { ref: l } = (0, s.UO)(),
              c = (0, tH.TF)(),
              d = (0, eM.Vm)(),
              u = o.pathname.includes('/project/[ref]/settings'),
              p = '/project/[ref]/settings/vault' === o.pathname,
              m = o.pathname.includes('/project/[ref]/database/backups'),
              h = (!u && !n6.includes(o.pathname)) || p,
              f = !n8.includes(o.pathname),
              g = !n3.includes(o.pathname),
              x = (null == d ? void 0 : d.status) === Z.S.RESTARTING,
              y = (null == d ? void 0 : d.status) === Z.S.RESIZING,
              b = (null == d ? void 0 : d.status) === Z.S.UPGRADING,
              v = (null == d ? void 0 : d.status) === Z.S.RESTORING,
              j = (null == d ? void 0 : d.status) === Z.S.RESTORE_FAILED,
              _ =
                (null == d ? void 0 : d.status) === Z.S.COMING_UP ||
                (null == d ? void 0 : d.status) === Z.S.UNKNOWN,
              w =
                (null == d ? void 0 : d.status) === Z.S.GOING_DOWN ||
                (null == d ? void 0 : d.status) === Z.S.PAUSING,
              N = (null == d ? void 0 : d.status) === Z.S.PAUSE_FAILED,
              C = (null == d ? void 0 : d.postgrestStatus) === 'OFFLINE';
            return ((0, r.useEffect)(() => {
              l && c.setSelectedDatabaseId(l);
            }, [l]),
            n && (t || (g && void 0 === d)))
              ? o.pathname.endsWith('[ref]')
                ? (0, a.jsx)(nS.C, {})
                : (0, a.jsx)(tB.Z, {})
              : x && !m
                ? (0, a.jsx)(nY, {})
                : y && !m
                  ? (0, a.jsx)(nW, {})
                  : b && !m
                    ? (0, a.jsx)(n5, {})
                    : w
                      ? (0, a.jsx)(nZ, { project: d })
                      : N
                        ? (0, a.jsx)(nF, {})
                        : f && C
                          ? (0, a.jsx)(nC, { project: d })
                          : h && v
                            ? (0, a.jsx)(nV, {})
                            : j && !m
                              ? (0, a.jsx)(nH, {})
                              : h && _
                                ? (0, a.jsx)(nx, {})
                                : (0, a.jsx)(
                                    r.Fragment,
                                    { children: i },
                                    null == d ? void 0 : d.ref
                                  );
          };
      },
      5186: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return y;
          },
        });
        var a = n(97458),
          s = n(85229),
          r = n(88469),
          i = n.n(r),
          o = n(71607),
          l = n.n(o),
          c = n(52983),
          d = n(49996),
          u = n(62432),
          p = n(37462),
          m = n(45536),
          h = n(65092),
          f = n(60153);
        let g = (e) => {
            e.changeViewZones((e) => {
              e.addZone({
                afterLineNumber: 0,
                heightInPx: 4,
                domNode: document.createElement('div'),
              });
            });
          },
          x = {
            runQuery: { enabled: !1, callback: l() },
            explainCode: { enabled: !1, callback: l() },
            formatDocument: { enabled: !0, callback: l() },
            placeholderFill: { enabled: !0 },
            closeAssistant: { enabled: !1, callback: l() },
          };
        var y = (e) => {
          let {
              id: t,
              language: n,
              defaultValue: r,
              autofocus: o = !0,
              isReadOnly: y = !1,
              hideLineNumbers: b = !1,
              className: v,
              loading: j,
              options: _,
              value: w,
              placeholder: N,
              actions: C = x,
              editorRef: S,
              onInputChange: A = l(),
            } = e,
            k = (0, s.useMonaco)(),
            E = (0, u.Vm)(),
            R = (0, c.useRef)(),
            L = (0, c.useRef)(),
            I = S || L,
            T = (0, c.useRef)(),
            {
              runQuery: O,
              placeholderFill: P,
              formatDocument: B,
              explainCode: F,
              closeAssistant: z,
            } = { ...x, ...C },
            D = void 0 !== N && 0 === (null != w ? w : '').trim().length,
            [U, M] = (0, c.useState)(D),
            Z = i()(
              {
                tabSize: 2,
                fontSize: 13,
                readOnly: y,
                minimap: { enabled: !1 },
                wordWrap: 'on',
                fixedOverflowWidgets: !0,
                contextmenu: !0,
                lineNumbers: b ? 'off' : void 0,
                glyphMargin: !b && void 0,
                lineNumbersMinChars: b ? 0 : 4,
                folding: !b && void 0,
                scrollBeyondLastLine: !1,
              },
              _
            ),
            q = async (e, t) => {
              ((I.current = e),
                (T.current = t),
                g(e),
                (R.current = e.createContextKey('hasValue', !1)),
                R.current.set(void 0 !== w && w.trim().length > 0),
                M(D),
                P.enabled &&
                  e.addCommand(
                    t.KeyCode.Tab,
                    () => {
                      e.executeEdits('source', [
                        {
                          identifier: 'add-placeholder',
                          range: new t.Range(1, 1, 1, 1),
                          text: (null != N ? N : '')
                            .split('\n\n')
                            .join('\n')
                            .replaceAll('*', '')
                            .replaceAll('&nbsp;', ' '),
                        },
                      ]);
                    },
                    '!hasValue'
                  ),
                O.enabled &&
                  e.addAction({
                    id: 'run-query',
                    label: 'Run Query',
                    keybindings: [t.KeyMod.CtrlCmd + t.KeyCode.Enter],
                    contextMenuGroupId: 'operation',
                    contextMenuOrder: 0,
                    run: () => {
                      var e, t;
                      let n = (null == I ? void 0 : I.current)
                        .getModel()
                        .getValueInRange(
                          null == I
                            ? void 0
                            : null === (e = I.current) || void 0 === e
                              ? void 0
                              : e.getSelection()
                        );
                      O.callback(
                        n ||
                          (null == I
                            ? void 0
                            : null === (t = I.current) || void 0 === t
                              ? void 0
                              : t.getValue())
                      );
                    },
                  }),
                F.enabled &&
                  e.addAction({
                    id: 'explain-code',
                    label: 'Explain Code',
                    contextMenuGroupId: 'operation',
                    contextMenuOrder: 1,
                    run: () => {
                      var e;
                      let t = (null == I ? void 0 : I.current)
                        .getModel()
                        .getValueInRange(
                          null == I
                            ? void 0
                            : null === (e = I.current) || void 0 === e
                              ? void 0
                              : e.getSelection()
                        );
                      F.callback(t);
                    },
                  }),
                z.enabled &&
                  e.addAction({
                    id: 'close-assistant',
                    label: 'Close Assistant',
                    keybindings: [t.KeyMod.CtrlCmd + t.KeyCode.KeyI],
                    run: () => z.callback(),
                  }));
              let n = e.getModel();
              if (n) {
                let t = n.getPositionAt((null != w ? w : '').length);
                e.setPosition(t);
              }
              (await (0, m.Vs)(500), o && (null == e || e.focus()));
            };
          return (
            (0, c.useEffect)(() => {
              M(D);
            }, [D]),
            (0, c.useEffect)(() => {
              if (P.enabled && void 0 !== I.current && void 0 !== T.current) {
                let e = I.current,
                  t = T.current;
                e.addCommand(
                  t.KeyCode.Tab,
                  () => {
                    e.executeEdits('source', [
                      {
                        identifier: 'add-placeholder',
                        range: new t.Range(1, 1, 1, 1),
                        text: (null != N ? N : '  ')
                          .split('\n\n')
                          .join('\n')
                          .replaceAll('*', '')
                          .replaceAll('&nbsp;', ''),
                      },
                    ]);
                  },
                  '!hasValue'
                );
              }
            }, [N, P.enabled]),
            (0, c.useEffect)(() => {
              if (k && E && B.enabled) {
                let e = k.languages.registerDocumentFormattingEditProvider(
                  'pgsql',
                  {
                    async provideDocumentFormattingEdits(e) {
                      let t = e.getValue(),
                        n = (0, p._)(t);
                      return (
                        B.callback(n),
                        [{ range: e.getFullModelRange(), text: n }]
                      );
                    },
                  }
                );
                return () => e.dispose();
              }
            }, [k, E, B.enabled]),
            (0, a.jsxs)(a.Fragment, {
              children: [
                (0, a.jsx)(s.default, {
                  path: t,
                  theme: 'supabase',
                  className: (0, h.cn)(v, 'monaco-editor'),
                  value: null != w ? w : void 0,
                  language: n,
                  defaultValue: null != r ? r : void 0,
                  loading: j || (0, a.jsx)(f.Z, {}),
                  options: Z,
                  onMount: q,
                  onChange: (e) => {
                    (R.current.set((null != e ? e : '').length > 0),
                      M(!e),
                      A(e));
                  },
                  'data-sentry-element': 'Editor',
                  'data-sentry-source-file': 'CodeEditor.tsx',
                }),
                void 0 !== N &&
                  (0, a.jsx)('div', {
                    className: (0, h.cn)(
                      'monaco-placeholder absolute top-[3px] left-[57px] text-sm pointer-events-none font-mono',
                      '[&>div>p]:text-foreground-lighter [&>div>p]:!m-0 tracking-tighter',
                      U ? 'block' : 'hidden'
                    ),
                    children: (0, a.jsx)(d.U, { content: N }),
                  }),
              ],
            })
          );
        };
      },
      61393: function (e, t, n) {
        'use strict';
        var a = n(97458),
          s = n(198),
          r = n(68258),
          i = n(12436),
          o = n(18186),
          l = n(9132),
          c = n(31485),
          d = n(90817),
          u = n(21786),
          p = n(44735),
          m = n(52675),
          h = n(51571);
        t.Z = (e) => {
          var t;
          let { legacy: n, showNotice: f = !0 } = e,
            { ref: g } = (0, i.UO)(),
            x = (0, u.P)('newApiKeys'),
            {
              data: y,
              isError: b,
              isLoading: v,
            } = (0, c.zR)({ projectRef: g }),
            { data: j, isError: _, isLoading: w } = (0, l.t)({ projectRef: g }),
            N = null == j ? void 0 : j.jwtSecretUpdateStatus,
            C = (0, d.Xo)(s.KA.READ, 'service_api_keys'),
            S = void 0 === N || N === r.JwtSecretUpdateStatus.Updated,
            A =
              null !== (t = null == y ? void 0 : y.service_api_keys) &&
              void 0 !== t
                ? t
                : [],
            k = 0 === A.length;
          return (0, a.jsx)(a.Fragment, {
            children: (0, a.jsxs)(o.Z, {
              title:
                !n &&
                (0, a.jsxs)('div', {
                  className: 'space-y-3',
                  children: [
                    (0, a.jsx)('h5', {
                      className: 'text-base',
                      children: 'Project API Keys',
                    }),
                    (0, a.jsxs)('p', {
                      className: 'text-sm text-foreground-light',
                      children: [
                        'Your API is secured behind an API gateway which requires an API Key for every request.',
                        (0, a.jsx)('br', {}),
                        'You can use the keys below in the Supabase client libraries.',
                        (0, a.jsx)('br', {}),
                      ],
                    }),
                  ],
                }),
              'data-sentry-element': 'Panel',
              'data-sentry-source-file': 'DisplayApiSettings.tsx',
              children: [
                b || _
                  ? (0, a.jsxs)('div', {
                      className:
                        'flex items-center justify-center py-8 space-x-2',
                      children: [
                        (0, a.jsx)(p.Z, { size: 16, strokeWidth: 1.5 }),
                        (0, a.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children: b
                            ? 'Failed to retrieve API keys'
                            : 'Failed to update JWT secret',
                        }),
                      ],
                    })
                  : k || v || w
                    ? (0, a.jsxs)('div', {
                        className:
                          'flex items-center justify-center py-8 space-x-2',
                        children: [
                          (0, a.jsx)(m.Z, {
                            className: 'animate-spin',
                            size: 16,
                            strokeWidth: 1.5,
                          }),
                          (0, a.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children:
                              v || k
                                ? 'Retrieving API keys'
                                : 'JWT secret is being updated',
                          }),
                        ],
                      })
                    : A.map((e, t) => {
                        var s, i;
                        return (0, a.jsx)(
                          o.Z.Content,
                          {
                            className:
                              t >= 1 &&
                              'border-t border-panel-border-interior-light [[data-theme*=dark]_&]:border-panel-border-interior-dark',
                            children: (0, a.jsx)(h.Z, {
                              readOnly: !0,
                              disabled: !0,
                              layout: 'horizontal',
                              className: 'input-mono',
                              label: (0, a.jsxs)(a.Fragment, {
                                children: [
                                  null === (s = e.tags) || void 0 === s
                                    ? void 0
                                    : s.split(',').map((e, t) =>
                                        (0, a.jsx)(
                                          'code',
                                          {
                                            className: 'text-xs text-code',
                                            children: e,
                                          },
                                          ''.concat(e).concat(t)
                                        )
                                      ),
                                  'service_role' === e.tags &&
                                    (0, a.jsx)(a.Fragment, {
                                      children: (0, a.jsx)('code', {
                                        className:
                                          'text-xs text-code !bg-destructive !text-white !border-destructive',
                                        children: 'secret',
                                      }),
                                    }),
                                  'anon' === e.tags &&
                                    (0, a.jsx)('code', {
                                      className: 'text-xs text-code',
                                      children: 'public',
                                    }),
                                ],
                              }),
                              copy: C && S,
                              reveal: 'anon' !== e.tags && C && S,
                              value: C
                                ? N === r.JwtSecretUpdateStatus.Failed
                                  ? 'JWT secret update failed, new API key may have issues'
                                  : N === r.JwtSecretUpdateStatus.Updating
                                    ? 'Updating JWT secret...'
                                    : null !==
                                          (i =
                                            null == e ? void 0 : e.api_key) &&
                                        void 0 !== i
                                      ? i
                                      : 'You need additional permissions to view API keys'
                                : 'You need additional permissions to view API keys',
                              onChange: () => {},
                              descriptionText:
                                'service_role' === e.tags
                                  ? 'This key has the ability to bypass Row Level Security. Never share it publicly. If leaked, generate a new JWT secret immediately. ' +
                                    (n
                                      ? 'Prefer using Publishable API keys instead.'
                                      : '')
                                  : 'This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies. ' +
                                    (n
                                      ? 'Prefer using Secret API keys instead.'
                                      : ''),
                            }),
                          },
                          e.api_key
                        );
                      }),
                f
                  ? x
                    ? (0, a.jsx)(o.Z.Notice, {
                        className: 'border-t',
                        title: 'API keys have moved',
                        badgeLabel: 'Changelog',
                        description:
                          ' \n  `anon` and `service_role` API keys can now be replaced with `publishable` and `secret` API keys.   \n  ',
                        href: 'https://github.com/orgs/supabase/discussions/29260',
                        buttonText: 'Read the announcement',
                      })
                    : (0, a.jsx)(o.Z.Notice, {
                        className: 'border-t',
                        title: 'New API keys coming Q4 2024',
                        description:
                          '\n`anon` and `service_role` API keys will be changing to `publishable` and `secret` API keys.    \n',
                        href: 'https://github.com/orgs/supabase/discussions/29260',
                        buttonText: 'Read the announcement',
                      })
                  : null,
              ],
            }),
          });
        };
      },
      54070: function (e, t, n) {
        'use strict';
        n.d(t, {
          D: function () {
            return a.Z;
          },
          m: function () {
            return h;
          },
        });
        var a = n(61393),
          s = n(97458),
          r = n(68258),
          i = n(44735),
          o = n(5295),
          l = n(12436),
          c = n(18186),
          d = n(9132),
          u = n(23035),
          p = n(31485),
          m = n(51571),
          h = () => {
            var e, t, n, a;
            let { ref: h } = (0, l.UO)(),
              {
                data: g,
                isLoading: x,
                isError: y,
              } = (0, p.zR)({ projectRef: h }),
              { data: b, isError: v } = (0, u.s)({ projectRef: h }),
              {
                data: j,
                isError: _,
                isLoading: w,
              } = (0, d.t)({ projectRef: h }),
              N = null == j ? void 0 : j.jwtSecretUpdateStatus,
              C = void 0 === N || N === r.JwtSecretUpdateStatus.Updated,
              S =
                null !== (n = null == b ? void 0 : b.jwt_secret) && void 0 !== n
                  ? n
                  : '',
              A =
                null !==
                  (a =
                    null == g
                      ? void 0
                      : null === (e = g.app_config) || void 0 === e
                        ? void 0
                        : e.protocol) && void 0 !== a
                  ? a
                  : 'https',
              k =
                null == g
                  ? void 0
                  : null === (t = g.app_config) || void 0 === t
                    ? void 0
                    : t.endpoint,
              E = k ? ''.concat(A, '://').concat(k) : '-';
            return (0, s.jsx)(f, {
              'data-sentry-element': 'ConfigContentWrapper',
              'data-sentry-component': 'DisplayConfigSettings',
              'data-sentry-source-file': 'DisplayConfigSettings.tsx',
              children:
                y || v || _
                  ? (0, s.jsxs)('div', {
                      className:
                        'flex items-center justify-center py-8 space-x-2',
                      children: [
                        (0, s.jsx)(i.Z, { size: 16, strokeWidth: 1.5 }),
                        (0, s.jsx)('p', {
                          className: 'text-sm text-foreground-light',
                          children:
                            y || v
                              ? 'Failed to retrieve configuration'
                              : 'Failed to update JWT secret',
                        }),
                      ],
                    })
                  : x || v || w
                    ? (0, s.jsxs)('div', {
                        className:
                          'flex items-center justify-center py-8 space-x-2',
                        children: [
                          (0, s.jsx)(o.Z, {
                            className: 'animate-spin',
                            size: 16,
                            strokeWidth: 1.5,
                          }),
                          (0, s.jsx)('p', {
                            className: 'text-sm text-foreground-light',
                            children: x
                              ? 'Retrieving API keys'
                              : 'JWT secret is being updated',
                          }),
                        ],
                      })
                    : (0, s.jsxs)(s.Fragment, {
                        children: [
                          (0, s.jsx)(c.Z.Content, {
                            children: (0, s.jsx)(m.Z, {
                              label: 'URL',
                              readOnly: !0,
                              copy: !0,
                              disabled: !0,
                              className: 'input-mono',
                              value: E,
                              descriptionText:
                                'A RESTful endpoint for querying and managing your database.',
                              layout: 'horizontal',
                            }),
                          }),
                          (0, s.jsx)(c.Z.Content, {
                            className:
                              'border-t border-panel-border-interior-light [[data-theme*=dark]_&]:border-panel-border-interior-dark',
                            children: (0, s.jsx)(m.Z, {
                              label: 'JWT Secret',
                              readOnly: !0,
                              copy: C,
                              reveal: C,
                              disabled: !0,
                              value:
                                N === r.JwtSecretUpdateStatus.Failed
                                  ? 'JWT secret update failed'
                                  : N === r.JwtSecretUpdateStatus.Updating
                                    ? 'Updating JWT secret...'
                                    : S,
                              className: 'input-mono',
                              descriptionText:
                                'Used to decode your JWTs. You can also use this to mint your own JWTs.',
                              layout: 'horizontal',
                            }),
                          }),
                        ],
                      }),
            });
          };
        let f = (e) => {
          let { children: t } = e;
          return (0, s.jsx)(c.Z, {
            title: (0, s.jsx)('div', {
              className: 'space-y-3',
              children: (0, s.jsx)('h5', {
                className: 'text-base',
                children: 'Project Configuration',
              }),
            }),
            'data-sentry-element': 'Panel',
            'data-sentry-component': 'ConfigContentWrapper',
            'data-sentry-source-file': 'DisplayConfigSettings.tsx',
            children: t,
          });
        };
      },
      24996: function (e, t, n) {
        'use strict';
        n.d(t, {
          _: function () {
            return er;
          },
          L: function () {
            return ei;
          },
        });
        var a = n(97458),
          s = n(10839),
          r = n(16362),
          i = n(52983),
          o = n(72309),
          l = n(35495),
          c = n(21706),
          d = n(3276),
          u = n(34549),
          p = n(12436),
          m = n(8561),
          h = n(8959),
          f = n(88971),
          g = n(66802);
        let x = (e) => {
          let t;
          if (!e) return [];
          let n = /@set\s+(\w+)(?::([^=]+))?\s*=\s*([^;\n]+)/g,
            a = {};
          for (; null !== (t = n.exec(e)); ) {
            let e, n;
            let [s, r, i, o] = t;
            if (!r || !(null == o ? void 0 : o.trim())) continue;
            let l = null == i ? void 0 : i.trim();
            (l &&
              (l.includes('|')
                ? ((n = l.split('|').map((e) => e.trim())), (e = 'enum'))
                : (e = l.trim())),
              (a[r] = { value: o.trim(), type: e, possibleValues: n }));
          }
          let s = /:(\w+)/g,
            r = {},
            i = new Set();
          for (; null !== (t = s.exec(e)); ) {
            let [e, n] = t;
            ((r[n] = (r[n] || 0) + 1), i.add(n));
          }
          return Array.from(i).map((e) => {
            var t, n, s, i;
            return {
              name: e,
              value:
                (null === (t = a[e]) || void 0 === t ? void 0 : t.value) || '',
              defaultValue:
                null === (n = a[e]) || void 0 === n ? void 0 : n.value,
              type: null === (s = a[e]) || void 0 === s ? void 0 : s.type,
              possibleValues:
                null === (i = a[e]) || void 0 === i ? void 0 : i.possibleValues,
              occurrences: r[e],
            };
          });
        };
        var y = n(3671),
          b = n(65092),
          v = n(90839),
          j = n(49935),
          _ = n(18079),
          w = n(33526),
          N = n(89129),
          C = n(73652),
          S = n(359),
          A = n(3558),
          k = n(84297),
          E = n(67297),
          R = n(42026),
          L = n(22912),
          I = n(87404);
        let T = (0, n(31706).j)(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:bg-surface-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background bg-surface-200 bg-surface-300 px-3 py-1 h-auto text-foreground transition-all',
          {
            variants: {
              variant: {
                default: 'bg-transparent',
                outline:
                  'bg-transparent border border-control bg-accent text-accent-foreground',
              },
              size: { default: 'h-10 px-3', sm: 'h-9 px-2.5', lg: 'h-11 px-5' },
            },
            defaultVariants: { variant: 'default', size: 'default' },
          }
        );
        i.forwardRef((e, t) => {
          let { className: n, variant: s, size: r, ...i } = e;
          return (0, a.jsx)(I.f, {
            ref: t,
            className: (0, b.cn)(T({ variant: s, size: r, className: n })),
            ...i,
          });
        }).displayName = I.f.displayName;
        let O = i.createContext({ size: 'default', variant: 'default' }),
          P = i.forwardRef((e, t) => {
            let { className: n, variant: s, size: r, children: i, ...o } = e;
            return (0, a.jsx)(L.fC, {
              ref: t,
              className: (0, b.cn)('flex items-center justify-center gap-1', n),
              ...o,
              children: (0, a.jsx)(O.Provider, {
                value: { variant: s, size: r },
                children: i,
              }),
            });
          });
        P.displayName = L.fC.displayName;
        let B = i.forwardRef((e, t) => {
          let { className: n, children: s, variant: r, size: o, ...l } = e,
            c = i.useContext(O);
          return (0, a.jsx)(L.ck, {
            ref: t,
            className: (0, b.cn)(
              T({ variant: c.variant || r, size: c.size || o }),
              n
            ),
            ...l,
            children: s,
          });
        });
        B.displayName = L.ck.displayName;
        var F = n(22714),
          z = n(36155),
          D = n(61893);
        let U = (e) => {
          let {
            columns: t,
            view: n,
            isChart: s,
            lockColumns: r = !1,
            chartConfig: i,
            changeView: o,
            updateChartConfig: l,
          } = e;
          return (0, a.jsxs)(R.J2, {
            modal: !1,
            'data-sentry-element': 'Popover_Shadcn_',
            'data-sentry-component': 'BlockViewConfiguration',
            'data-sentry-source-file': 'BlockViewConfiguration.tsx',
            children: [
              (0, a.jsx)(R.xo, {
                asChild: !0,
                'data-sentry-element': 'PopoverTrigger_Shadcn_',
                'data-sentry-source-file': 'BlockViewConfiguration.tsx',
                children: (0, a.jsx)(S.u, {
                  id: 'help-popover-button',
                  type: 'text',
                  className: 'px-1',
                  icon: (0, a.jsx)(A.Z, { size: 14 }),
                  tooltip: { content: { side: 'bottom', text: 'View data' } },
                  'data-sentry-element': 'ButtonTooltip',
                  'data-sentry-source-file': 'BlockViewConfiguration.tsx',
                }),
              }),
              (0, a.jsx)(R.yk, {
                side: 'bottom',
                align: 'center',
                className: 'w-[240px] p-3',
                'data-sentry-element': 'PopoverContent_Shadcn_',
                'data-sentry-source-file': 'BlockViewConfiguration.tsx',
                children: (0, a.jsxs)('form', {
                  className: 'grid gap-2',
                  children: [
                    (0, a.jsxs)(P, {
                      type: 'single',
                      value: n,
                      className: 'w-full',
                      onValueChange: (e) => {
                        e && o(e);
                      },
                      'data-sentry-element': 'ToggleGroup',
                      'data-sentry-source-file': 'BlockViewConfiguration.tsx',
                      children: [
                        (0, a.jsxs)(B, {
                          className: 'w-full',
                          value: 'table',
                          'aria-label': 'Show as table',
                          'data-sentry-element': 'ToggleGroupItem',
                          'data-sentry-source-file':
                            'BlockViewConfiguration.tsx',
                          children: [
                            (0, a.jsx)(k.Z, {
                              className: 'h-4 w-4',
                              'data-sentry-element': 'Table',
                              'data-sentry-source-file':
                                'BlockViewConfiguration.tsx',
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-xs ml-2',
                              children: 'As table',
                            }),
                          ],
                        }),
                        (0, a.jsxs)(B, {
                          className: 'w-full',
                          value: 'chart',
                          'aria-label': 'Show as chart',
                          'data-sentry-element': 'ToggleGroupItem',
                          'data-sentry-source-file':
                            'BlockViewConfiguration.tsx',
                          children: [
                            (0, a.jsx)(E.Z, {
                              className: 'h-4 w-4',
                              'data-sentry-element': 'BarChart2',
                              'data-sentry-source-file':
                                'BlockViewConfiguration.tsx',
                            }),
                            (0, a.jsx)('p', {
                              className: 'text-xs ml-2',
                              children: 'As chart',
                            }),
                          ],
                        }),
                      ],
                    }),
                    s &&
                      i &&
                      (0, a.jsxs)(a.Fragment, {
                        children: [
                          (0, a.jsxs)(F.Ph, {
                            disabled: r,
                            value: null == i ? void 0 : i.xKey,
                            onValueChange: (e) => l({ ...i, xKey: e }),
                            children: [
                              (0, a.jsxs)(F.i4, {
                                className: 'text-left',
                                children: [
                                  'X Axis ',
                                  (null == i ? void 0 : i.xKey) &&
                                    '- '.concat(i.xKey),
                                ],
                              }),
                              (0, a.jsx)(F.Bw, {
                                children: (0, a.jsx)(F.DI, {
                                  children: t.map((e) =>
                                    (0, a.jsx)(
                                      F.Ql,
                                      { value: e, children: e },
                                      e
                                    )
                                  ),
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)(F.Ph, {
                            disabled: r,
                            value: null == i ? void 0 : i.yKey,
                            onValueChange: (e) => l({ ...i, yKey: e }),
                            children: [
                              (0, a.jsxs)(F.i4, {
                                className: 'text-left',
                                children: [
                                  'Y Axis ',
                                  (null == i ? void 0 : i.yKey) &&
                                    '- '.concat(i.yKey),
                                ],
                              }),
                              (0, a.jsx)(F.Bw, {
                                children: (0, a.jsx)(F.DI, {
                                  children: t.map((e) =>
                                    (0, a.jsx)(
                                      F.Ql,
                                      { value: e, children: e },
                                      e
                                    )
                                  ),
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsx)('div', {
                            className:
                              '*:flex *:gap-2 *:items-center grid gap-2 *:text-foreground-light *:p-1.5 *:pl-0',
                            children: (0, a.jsxs)(z._, {
                              htmlFor: 'cumulative',
                              children: [
                                (0, a.jsx)(D.X, {
                                  id: 'cumulative',
                                  checked: null == i ? void 0 : i.cumulative,
                                  onClick: () =>
                                    l({
                                      ...i,
                                      cumulative: !(null == i
                                        ? void 0
                                        : i.cumulative),
                                    }),
                                }),
                                'Cumulative',
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
        var M = n(3977),
          Z = n(32691),
          q = n(30457),
          W = n(22851),
          Y = n(97008),
          H = n(82288),
          G = n(83145),
          V = n.n(G),
          X = n(49825),
          K = n(14500),
          $ = n(75541);
        let Q = (e) => {
          let { id: t, sql: n, title: s } = e,
            r = (0, Z.useRouter)(),
            { ref: i } = (0, p.UO)(),
            { newQuery: o } = (0, Y.ZP)(),
            l = (0, X.B0)(),
            c = r.pathname.includes('/sql'),
            d = r.pathname.endsWith('/sql'),
            u = { content: { side: 'bottom', text: 'Edit in SQL Editor' } },
            m = (0, $.l)(),
            { mutate: h } = (0, H.a)(),
            f = () => {
              n && (c ? l.setDiffContent(n, W.U.Addition) : o(n, s));
            };
          return void 0 !== t
            ? (0, a.jsx)(S.u, {
                asChild: !0,
                type: 'text',
                size: 'tiny',
                className: 'w-7 h-7',
                icon: (0, a.jsx)(M.Z, { size: 14 }),
                tooltip: u,
                children: (0, a.jsx)(V(), {
                  href: '/project/'.concat(i, '/sql/').concat(t),
                }),
              })
            : !c || d
              ? (0, a.jsx)(S.u, {
                  type: 'text',
                  size: 'tiny',
                  className: 'w-7 h-7',
                  icon: (0, a.jsx)(M.Z, { size: 14 }),
                  onClick: () => {
                    var e;
                    (f(),
                      h({
                        action: q.b.ASSISTANT_EDIT_IN_SQL_EDITOR_CLICKED,
                        properties: { isInSQLEditor: c, isInNewSnippet: d },
                        groups: {
                          project: null != i ? i : 'Unknown',
                          organization:
                            null !== (e = null == m ? void 0 : m.slug) &&
                            void 0 !== e
                              ? e
                              : 'Unknown',
                        },
                      }));
                  },
                  tooltip: u,
                  'data-sentry-element': 'ButtonTooltip',
                  'data-sentry-component': 'EditQueryButton',
                  'data-sentry-source-file': 'EditQueryButton.tsx',
                })
              : (0, a.jsxs)(K.h_, {
                  'data-sentry-element': 'DropdownMenu',
                  'data-sentry-component': 'EditQueryButton',
                  'data-sentry-source-file': 'EditQueryButton.tsx',
                  children: [
                    (0, a.jsx)(K.$F, {
                      asChild: !0,
                      'data-sentry-element': 'DropdownMenuTrigger',
                      'data-sentry-source-file': 'EditQueryButton.tsx',
                      children: (0, a.jsx)(S.u, {
                        type: 'text',
                        size: 'tiny',
                        disabled: !n,
                        className: 'w-7 h-7',
                        icon: (0, a.jsx)(M.Z, { size: 14 }),
                        tooltip: n
                          ? u
                          : { content: { side: 'bottom', text: void 0 } },
                        'data-sentry-element': 'ButtonTooltip',
                        'data-sentry-source-file': 'EditQueryButton.tsx',
                      }),
                    }),
                    !!n &&
                      (0, a.jsxs)(K.AW, {
                        className: 'w-36',
                        children: [
                          (0, a.jsx)(K.Xi, {
                            onClick: () => l.setDiffContent(n, W.U.Addition),
                            children: 'Insert code',
                          }),
                          (0, a.jsx)(K.Xi, {
                            onClick: () =>
                              l.setDiffContent(n, W.U.Modification),
                            children: 'Replace code',
                          }),
                          (0, a.jsx)(K.Xi, {
                            onClick: () => l.setDiffContent(n, W.U.NewSnippet),
                            children: 'Create new snippet',
                          }),
                        ],
                      }),
                  ],
                });
        };
        var J = n(8093),
          ee = n(54944),
          et = n(85817),
          en = n(56740);
        let ea = (e) => {
            let {
                parameters: t,
                parameterValues: n = {},
                onSubmit: s,
                onChange: r,
              } = e,
              [o, l] = (0, i.useState)(
                t.reduce((e, t) => {
                  var a, s;
                  return {
                    ...e,
                    [t.name]:
                      null !==
                        (s =
                          null !== (a = n[t.name]) && void 0 !== a
                            ? a
                            : t.defaultValue) && void 0 !== s
                        ? s
                        : '',
                  };
                }, {})
              );
            (0, i.useEffect)(() => {
              l(
                t.reduce((e, t) => {
                  var a, s;
                  return {
                    ...e,
                    [t.name]:
                      null !==
                        (s =
                          null !== (a = n[t.name]) && void 0 !== a
                            ? a
                            : t.defaultValue) && void 0 !== s
                        ? s
                        : '',
                  };
                }, {})
              );
            }, [t, n]);
            let c = (e, t) => {
                let n = { ...o, [e]: t };
                (l(n), null == r || r(n));
              },
              d = (e) => {
                var t, s;
                let r =
                  null !==
                    (s =
                      null !== (t = o[e.name]) && void 0 !== t
                        ? t
                        : n[e.name]) && void 0 !== s
                    ? s
                    : '';
                return 'date' === e.type
                  ? r && !isNaN(new Date(r).getTime())
                    ? (0, a.jsx)(et.M, {
                        selectsRange: !1,
                        from: r,
                        to: r,
                        onChange: (t) => {
                          t && t.to ? c(e.name, t.to) : c(e.name, '');
                        },
                        children: (0, a.jsx)('span', {
                          children: r
                            ? (0, J.default)(new Date(r), 'dd MMM')
                            : 'Pick a date',
                        }),
                      })
                    : (0, a.jsx)(en.I, {
                        size: 'tiny',
                        value: r,
                        onChange: (t) => c(e.name, t.target.value),
                      })
                  : 'enum' === e.type && e.possibleValues
                    ? (0, a.jsxs)(F.Ph, {
                        value: r,
                        onValueChange: (t) => c(e.name, t),
                        children: [
                          (0, a.jsx)(F.i4, {
                            className: 'h-8',
                            children: (0, a.jsx)(F.ki, {
                              placeholder: 'Select value',
                            }),
                          }),
                          (0, a.jsx)(F.Bw, {
                            children: e.possibleValues.map((e) =>
                              (0, a.jsx)(F.Ql, { value: e, children: e }, e)
                            ),
                          }),
                        ],
                      })
                    : (0, a.jsx)(en.I, {
                        size: 'tiny',
                        value: r,
                        onChange: (t) => c(e.name, t.target.value),
                        'data-sentry-element': 'Input_Shadcn_',
                        'data-sentry-component': 'renderInput',
                        'data-sentry-source-file': 'ParametersPopover.tsx',
                      });
              };
            return (0, a.jsxs)(R.J2, {
              modal: !1,
              'data-sentry-element': 'Popover_Shadcn_',
              'data-sentry-component': 'ParametersPopover',
              'data-sentry-source-file': 'ParametersPopover.tsx',
              children: [
                (0, a.jsx)(R.xo, {
                  asChild: !0,
                  'data-sentry-element': 'PopoverTrigger_Shadcn_',
                  'data-sentry-source-file': 'ParametersPopover.tsx',
                  children: (0, a.jsx)(v.z, {
                    icon: (0, a.jsx)(ee.Z, { size: 14 }),
                    type: 'text',
                    size: 'tiny',
                    className: 'w-7 h-7',
                    'data-sentry-element': 'Button',
                    'data-sentry-source-file': 'ParametersPopover.tsx',
                  }),
                }),
                (0, a.jsx)(R.yk, {
                  side: 'bottom',
                  align: 'end',
                  className: 'w-[300px] p-4',
                  'data-sentry-element': 'PopoverContent_Shadcn_',
                  'data-sentry-source-file': 'ParametersPopover.tsx',
                  children: (0, a.jsxs)('div', {
                    className: 'space-y-4',
                    children: [
                      (0, a.jsx)('div', {
                        className: 'space-y-2',
                        children: t.map((e) =>
                          (0, a.jsxs)(
                            'div',
                            {
                              className: 'grid gap-2',
                              children: [
                                (0, a.jsxs)(z._, {
                                  className: 'flex items-center gap-2',
                                  children: [
                                    e.name,
                                    e.occurrences > 1 &&
                                      (0, a.jsxs)('span', {
                                        className:
                                          'text-xs text-foreground-light',
                                        children: [
                                          '(used ',
                                          e.occurrences,
                                          ' times)',
                                        ],
                                      }),
                                  ],
                                }),
                                d(e),
                              ],
                            },
                            e.name
                          )
                        ),
                      }),
                      s &&
                        (0, a.jsx)('div', {
                          className: 'flex justify-end',
                          children: (0, a.jsx)(v.z, {
                            type: 'primary',
                            size: 'tiny',
                            onClick: () => s(o),
                            children: 'Apply changes',
                          }),
                        }),
                    ],
                  }),
                }),
              ],
            });
          },
          es = (e, t) => {
            var n;
            return (
              null == e
                ? void 0
                : null === (n = e.rows) || void 0 === n
                  ? void 0
                  : n.length
            )
              ? e.rows.reduce((e, n) => {
                  let a = e[e.length - 1] || {};
                  return [
                    ...e,
                    { ...n, [t.yKey]: (a[t.yKey] || 0) + n[t.yKey] },
                  ];
                }, [])
              : [];
          },
          er = {
            type: 'bar',
            cumulative: !1,
            xKey: '',
            yKey: '',
            showLabels: !1,
            showGrid: !1,
            view: 'table',
          },
          ei = (e) => {
            let {
                id: t,
                label: n,
                sql: A,
                chartConfig: k = er,
                maxHeight: E = 250,
                queryHeight: R,
                parameterValues: L,
                actions: I,
                showSql: T = !1,
                isChart: O = !1,
                isLoading: P = !1,
                runQuery: B = !1,
                lockColumns: F = !1,
                draggable: z = !1,
                isRefreshing: D = !1,
                disableRunIfMutation: M = !1,
                noResultPlaceholder: Z = null,
                tooltip: q,
                onRunQuery: W,
                onSetParameter: Y,
                onUpdateChartConfig: H,
                onDragStart: G,
              } = e,
              { ref: V } = (0, p.UO)(),
              { project: X } = (0, f.d2)(),
              [K, $] = (0, i.useState)(k),
              { xKey: J, yKey: ee, view: et = 'table' } = K,
              [en, ei] = (0, i.useState)(T),
              [eo, el] = (0, i.useState)(),
              [ec, ed] = (0, i.useState)({}),
              [eu, ep] = (0, i.useState)(),
              em = (0, i.useMemo)(() => (A ? x(A) : []), [A]),
              eh = (0, C.mU)(null != A ? A : ''),
              { mutate: ef, isLoading: eg } = (0, g.r)({
                onSuccess: (e) => el(e.result),
              }),
              ex = () => {
                if (A && !P) {
                  if (!eh)
                    return ep(
                      (0, C.De)(A) ? 'hasUnknownFunctions' : 'hasWriteOperation'
                    );
                  try {
                    ef({
                      projectRef: V,
                      connectionString: null == X ? void 0 : X.connectionString,
                      sql: A,
                    });
                  } catch (e) {
                    u.Am.error('Failed to execute query: '.concat(e.message));
                  }
                }
              };
            return (
              (0, i.useEffect)(() => {
                $(k);
              }, [k]),
              (0, i.useEffect)(() => {
                A && Y && Y(x(A));
              }, [A]),
              (0, i.useEffect)(() => {
                A && !P && B && (0, C.mU)(A) && X && ex();
              }, [A, P, B, X]),
              (0, i.useEffect)(() => {
                D && ex();
              }, [D]),
              (0, a.jsxs)(m.b, {
                draggable: z,
                showDragHandle: z,
                tooltip: q,
                loading: eg,
                onDragStart: (e) => (null == G ? void 0 : G(e)),
                icon: (0, a.jsx)(y.KK, {
                  size: 18,
                  strokeWidth: 1.5,
                  className: (0, b.cn)(
                    'transition-colors fill-foreground-muted group-aria-selected:fill-foreground',
                    'w-5 h-5 shrink-0 grow-0 -ml-0.5'
                  ),
                }),
                label: n,
                actions: (0, a.jsxs)(a.Fragment, {
                  children: [
                    (0, a.jsx)(S.u, {
                      type: 'text',
                      size: 'tiny',
                      className: 'w-7 h-7',
                      icon: (0, a.jsx)(s.Z, { size: 14 }),
                      onClick: () => ei(!en),
                      tooltip: {
                        content: {
                          side: 'bottom',
                          text: en ? 'Hide query' : 'Show query',
                        },
                      },
                    }),
                    eo &&
                      (0, a.jsxs)(a.Fragment, {
                        children: [
                          em.length > 0 &&
                            (0, a.jsx)(ea, {
                              parameters: em,
                              parameterValues: ec,
                              onSubmit: ed,
                            }),
                          O &&
                            (0, a.jsx)(U, {
                              view: et,
                              isChart: O,
                              lockColumns: F,
                              chartConfig: K,
                              columns: Object.keys(eo[0] || {}),
                              changeView: (e) => {
                                (H && H({ chartConfig: { view: e } }),
                                  $({ ...K, view: e }));
                              },
                              updateChartConfig: (e) => {
                                (H && H({ chartConfig: e }), $(e));
                              },
                            }),
                        ],
                      }),
                    (0, a.jsx)(Q, { id: t, title: n, sql: A }),
                    (eh || (!eh && !M)) &&
                      (0, a.jsx)(S.u, {
                        type: 'text',
                        size: 'tiny',
                        className: 'w-7 h-7',
                        icon: (0, a.jsx)(r.Z, { size: 14 }),
                        loading: eg || P,
                        disabled: P,
                        onClick: () => {
                          (ex(),
                            A && (0, C.mU)(A) && (null == W || W('select')));
                        },
                        tooltip: {
                          content: {
                            side: 'bottom',
                            className: 'max-w-56 text-center',
                            text: eg
                              ? (0, a.jsx)('p', {
                                  children:
                                    'Query is running. You may cancel ongoing queries via the [SQL Editor](/project/'.concat(
                                      V,
                                      '/sql?viewOngoingQueries=true).'
                                    ),
                                })
                              : 'Run query',
                          },
                        },
                      }),
                    I,
                  ],
                }),
                'data-sentry-element': 'ReportBlockContainer',
                'data-sentry-component': 'QueryBlock',
                'data-sentry-source-file': 'QueryBlock.tsx',
                children: [
                  !!eu &&
                    (0, a.jsxs)(w.J, {
                      type: 'warning',
                      className:
                        'mb-0 rounded-none border-0 shrink-0 bg-background-100',
                      children: [
                        (0, a.jsxs)('p', {
                          children: [
                            'hasWriteOperation' === eu
                              ? 'This query contains write operations.'
                              : 'This query involves running a function.',
                            ' ',
                            'Are you sure you want to execute it?',
                          ],
                        }),
                        (0, a.jsx)('p', {
                          className: 'text-foreground-light',
                          children:
                            'Make sure you are not accidentally removing something important.',
                        }),
                        (0, a.jsxs)('div', {
                          className: 'flex justify-stretch mt-2 gap-2',
                          children: [
                            (0, a.jsx)(v.z, {
                              type: 'outline',
                              size: 'tiny',
                              className: 'w-full flex-1',
                              onClick: () => ep(void 0),
                              children: 'Cancel',
                            }),
                            (0, a.jsx)(v.z, {
                              type: 'danger',
                              size: 'tiny',
                              disabled: !A,
                              className: 'w-full flex-1',
                              onClick: () => {
                                A &&
                                  (ep(void 0),
                                  ef({
                                    projectRef: V,
                                    connectionString:
                                      null == X ? void 0 : X.connectionString,
                                    sql: A,
                                  }),
                                  null == W || W('mutation'));
                              },
                              children: 'Run',
                            }),
                          ],
                        }),
                      ],
                    }),
                  eg &&
                    void 0 === eo &&
                    (0, a.jsx)('div', {
                      className: 'p-3 w-full',
                      children: (0, a.jsx)(N.Z, {}),
                    }),
                  en &&
                    (0, a.jsx)('div', {
                      className: (0, b.cn)(
                        'shrink-0 w-full max-h-96 overflow-y-auto',
                        { 'border-b': void 0 !== eo }
                      ),
                      style: { height: R ? ''.concat(R, 'px') : void 0 },
                      children: (0, a.jsx)(j.d, {
                        hideLineNumbers: !0,
                        wrapLines: !1,
                        value: A,
                        language: 'sql',
                        className: (0, b.cn)(
                          'max-w-none block !bg-transparent !py-3 !px-3.5 prose dark:prose-dark border-0 text-foreground !rounded-none w-full',
                          '[&>code]:m-0 [&>code>span]:text-foreground'
                        ),
                      }),
                    }),
                  'chart' === et && void 0 !== eo
                    ? (0, a.jsx)(a.Fragment, {
                        children:
                          0 === (null != eo ? eo : []).length
                            ? (0, a.jsx)('div', {
                                className:
                                  'flex w-full h-full items-center justify-center',
                                children: (0, a.jsx)('p', {
                                  className: 'text-foreground-light text-xs',
                                  children: 'No results returned from query',
                                }),
                              })
                            : J && ee
                              ? (0, a.jsx)('div', {
                                  className: (0, b.cn)('flex-1 w-full'),
                                  children: (0, a.jsx)(_.BO, {
                                    className: 'aspect-auto px-3 py-2',
                                    config: {},
                                    style: {
                                      height: E ? ''.concat(E, 'px') : void 0,
                                      minHeight: E
                                        ? ''.concat(E, 'px')
                                        : void 0,
                                    },
                                    children: (0, a.jsxs)(o.v, {
                                      accessibilityLayer: !0,
                                      margin: { left: 0, right: 0 },
                                      data: K.cumulative
                                        ? es({ rows: null != eo ? eo : [] }, K)
                                        : eo,
                                      children: [
                                        (0, a.jsx)(l.q, { vertical: !1 }),
                                        (0, a.jsx)(c.K, {
                                          dataKey: J,
                                          tickLine: !1,
                                          axisLine: !1,
                                          tickMargin: 8,
                                          minTickGap: 32,
                                        }),
                                        (0, a.jsx)(_.h7, {
                                          content: (0, a.jsx)(_.dg, {
                                            className: 'w-[150px]',
                                          }),
                                        }),
                                        (0, a.jsx)(d.$, {
                                          dataKey: ee,
                                          fill: 'var(--chart-1)',
                                          radius: 4,
                                        }),
                                      ],
                                    }),
                                  }),
                                })
                              : (0, a.jsx)('div', {
                                  className:
                                    'flex w-full h-full items-center justify-center',
                                  children: (0, a.jsx)('p', {
                                    className: 'text-foreground-light text-xs',
                                    children:
                                      'Select columns for the X and Y axes',
                                  }),
                                }),
                      })
                    : (0, a.jsx)(a.Fragment, {
                        children: eo
                          ? (0, a.jsx)('div', {
                              className: (0, b.cn)(
                                'flex-1 w-full overflow-auto relative'
                              ),
                              style: {
                                maxHeight: E ? ''.concat(E, 'px') : void 0,
                              },
                              children: (0, a.jsx)(h.Z, { rows: eo }),
                            })
                          : eg
                            ? null
                            : Z,
                      }),
                ],
              })
            );
          };
      },
      75308: function (e, t, n) {
        'use strict';
        var a = n(97458),
          s = n(65092);
        t.Z = (e) => {
          let {
              options: t,
              width: n = 50,
              activeOption: r,
              onClickOption: i,
              borderOverride: o = 'border-stronger',
            } = e,
            l = (e) =>
              'absolute top-0 z-1 text-xs inline-flex h-full items-center justify-center font-medium\n    '.concat(
                e ? 'text-foreground-light text-foreground' : 'text-foreground',
                ' text-foreground focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue\n    transition ease-in-out duration-150'
              );
          return (0, a.jsxs)('div', {
            className: 'relative border '.concat(o, ' rounded-md h-7'),
            style: { padding: 1, width: (n + 1) * 2 },
            'data-sentry-component': 'TwoOptionToggle',
            'data-sentry-source-file': 'TwoOptionToggle.tsx',
            children: [
              (0, a.jsx)('span', {
                style: {
                  width: n,
                  translate: r === t[1] ? '0px' : ''.concat(n - 2, 'px'),
                },
                'aria-hidden': 'true',
                className: (0, s.cn)(
                  'z-0 inline-block rounded h-full bg-overlay-hover shadow transform',
                  'transition-all ease-in-out border border-strong'
                ),
              }),
              t.map((e, t) =>
                (0, a.jsx)(
                  'span',
                  {
                    style: { width: n + 1 },
                    className: '\n              '
                      .concat(
                        r === e ? 'text-foreground' : 'text-foreground-light',
                        '\n              '
                      )
                      .concat(
                        0 === t ? 'right-0' : 'left-0',
                        '\n              '
                      )
                      .concat(
                        l(r === e),
                        '\n              cursor-pointer\n            '
                      ),
                    onClick: () => i(e),
                    children: (0, a.jsx)('span', {
                      className: (0, s.cn)(
                        'capitalize text-foreground',
                        r === e ? 'text-foreground' : 'text-foreground-light'
                      ),
                      children: e,
                    }),
                  },
                  'toggle_'.concat(t)
                )
              ),
            ],
          });
        };
      },
      60827: function (e, t, n) {
        'use strict';
        var a = n(97458),
          s = n(78751),
          r = n(52983),
          i = n(86848),
          o = n(36210),
          l = n(65092),
          c = n(49142),
          d = n(56740),
          u = n(90839),
          p = n(5394),
          m = n(33526);
        let h = (0, r.forwardRef)((e, t) => {
          let {
              title: n,
              size: h = 'small',
              onConfirm: f,
              visible: g,
              onCancel: x,
              loading: y,
              cancelLabel: b = 'Cancel',
              confirmLabel: v = 'Submit',
              confirmPlaceholder: j,
              confirmString: _,
              alert: w,
              input: N,
              label: C,
              description: S,
              formMessage: A,
              text: k,
              children: E,
              blockDeleteButton: R = !0,
              variant: L = 'default',
              ...I
            } = e,
            T = p.z.object({
              confirmValue: p.z.literal(_, {
                required_error: 'Value entered does not match.',
              }),
            }),
            O = (0, i.cI)({
              resolver: (0, s.F)(T),
              defaultValues: { confirmValue: '' },
            });
          return (
            (0, r.useEffect)(() => {
              _ && O.reset();
            }, [_]),
            (0, a.jsx)(o.Vq, {
              open: g,
              ...I,
              onOpenChange: () => {
                g && x();
              },
              children: (0, a.jsxs)(o.cZ, {
                ref: t,
                className: 'p-0 gap-0 pb-5 !block',
                size: h,
                children: [
                  (0, a.jsx)(o.fK, {
                    className: (0, l.cn)('border-b'),
                    padding: 'small',
                    children: (0, a.jsx)(o.$N, { className: '', children: n }),
                  }),
                  w &&
                    (0, a.jsx)(m.J, {
                      type: L,
                      label: w.title,
                      description: w.description,
                      className:
                        'border-r-0 border-l-0 rounded-none -mt-px [&_svg]:ml-0.5 mb-0',
                      ...(null == w ? void 0 : w.base),
                    }),
                  E &&
                    (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(o.VO, { padding: 'small', children: E }),
                        (0, a.jsx)(o.P3, {}),
                      ],
                    }),
                  void 0 !== k &&
                    (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(o.VO, {
                          className: 'p-5',
                          padding: 'small',
                          children: (0, a.jsx)('p', {
                            className: 'text-foreground-light text-sm',
                            children: k,
                          }),
                        }),
                        (0, a.jsx)(o.P3, {}),
                      ],
                    }),
                  (0, a.jsx)(c.l0, {
                    ...O,
                    children: (0, a.jsxs)('form', {
                      autoComplete: 'off',
                      onSubmit: O.handleSubmit(function (e) {
                        f();
                      }),
                      className: 'px-5 flex flex-col gap-2 pt-3',
                      children: [
                        (0, a.jsx)(c.Wi, {
                          control: O.control,
                          name: 'confirmValue',
                          render: (e) => {
                            let { field: t } = e;
                            return (0, a.jsxs)(c.xJ, {
                              className: 'flex flex-col gap-y-1',
                              children: [
                                (0, a.jsxs)(c.lX, {
                                  ...C,
                                  children: [
                                    'Type',
                                    ' ',
                                    (0, a.jsx)('span', {
                                      className:
                                        'text-foreground break-all whitespace-pre',
                                      children: _,
                                    }),
                                    ' ',
                                    'to confirm.',
                                  ],
                                }),
                                (0, a.jsx)(c.NI, {
                                  children: (0, a.jsx)(d.I, {
                                    autoComplete: 'off',
                                    placeholder: j,
                                    ...N,
                                    ...t,
                                  }),
                                }),
                                (0, a.jsx)(c.pf, { ...S }),
                                (0, a.jsx)(c.zG, { ...A }),
                              ],
                            });
                          },
                        }),
                        (0, a.jsxs)('div', {
                          className: 'flex gap-2',
                          children: [
                            !R &&
                              (0, a.jsx)(u.z, {
                                size: 'medium',
                                block: !0,
                                type: 'default',
                                disabled: y,
                                onClick: x,
                                children: b,
                              }),
                            (0, a.jsx)(u.z, {
                              block: !0,
                              size: 'medium',
                              type:
                                'destructive' === L
                                  ? 'danger'
                                  : 'warning' === L
                                    ? 'warning'
                                    : 'primary',
                              htmlType: 'submit',
                              loading: y,
                              disabled: y,
                              className: 'truncate',
                              children: v,
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
        });
        ((h.displayName = 'TextConfirmModal'), (t.Z = h));
      },
      52114: function (e, t, n) {
        'use strict';
        n.d(t, {
          Cf: function () {
            return A;
          },
          DS: function () {
            return j;
          },
          G: function () {
            return _;
          },
          GZ: function () {
            return x;
          },
          IR: function () {
            return S;
          },
          Qn: function () {
            return y;
          },
          ZY: function () {
            return C;
          },
          nM: function () {
            return w;
          },
          nn: function () {
            return N;
          },
          qs: function () {
            return v;
          },
          rt: function () {
            return b;
          },
        });
        var a = n(97458),
          s = n(91587),
          r = n(52675),
          i = n(77270),
          o = n(77918),
          l = n(83145),
          c = n.n(l),
          d = n(52983),
          u = n(51e3),
          p = n(65092),
          m = n(3671),
          h = n(56740),
          f = n(14500),
          g = n(40577);
        let x = (0, d.forwardRef)((e, t) => {
            let { ...n } = e;
            return (0, a.jsx)(u.zF, {
              ref: t,
              ...n,
              className: (0, p.cn)('w-full px-2 group', n.className),
            });
          }),
          y = (0, d.forwardRef)((e, t) => {
            let { ...n } = e;
            return (0, a.jsxs)(u.wy, {
              ref: t,
              ...n,
              className: (0, p.cn)(
                'w-full flex gap-1 items-center group px-3 text-sm  font-mono uppercase text-lighter tracking-wide',
                n.className
              ),
              children: [
                (0, a.jsx)(s.Z, {
                  className:
                    'transition-all text-foreground-muted group-data-[state=open]:rotate-90',
                  size: 16,
                  strokeWidth: 1.5,
                }),
                (0, a.jsx)('span', {
                  className: 'group-not-disabled:text-foreground',
                  children: n.title,
                }),
              ],
            });
          }),
          b = (0, d.forwardRef)((e, t) => {
            let { ...n } = e;
            return (0, a.jsx)(u.Fw, {
              ref: t,
              ...n,
              className: (0, p.cn)('w-full flex flex-col gap-0', n.className),
            });
          }),
          v = (0, d.forwardRef)((e, t) =>
            (0, a.jsx)('div', {
              ref: t,
              ...e,
              className: (0, p.cn)('h-px bg-border-muted', e.className),
            })
          ),
          j = (0, d.forwardRef)((e, t) => {
            let { className: n, isActive: s, forceHoverState: r, ...i } = e;
            return (0, a.jsx)(c(), {
              ref: t,
              ...i,
              'aria-current': s,
              className: (0, p.cn)(
                'text-sm',
                'h-7 pl-3 pr-2',
                'flex items-center justify-between rounded-md group relative',
                s ? 'bg-selection' : 'bg-surface-200',
                r && 'bg-surface-200',
                s ? 'text-foreground' : 'text-foreground-light text-foreground',
                n
              ),
            });
          }),
          _ = (0, d.forwardRef)((e, t) => {
            let {
              isActive: n = !0,
              forceHoverState: s,
              isPreview: r,
              isOpened: i = !0,
              ...o
            } = e;
            return (0, a.jsxs)(c(), {
              ref: t,
              ...o,
              'aria-current': n,
              className: (0, p.cn)(
                (0, m.RK)({
                  isSelected: n && !r,
                  isOpened: i && !r,
                  isPreview: r,
                }),
                'px-4',
                o.className
              ),
              children: [
                !r &&
                  n &&
                  (0, a.jsx)('div', {
                    className: 'absolute left-0 h-full w-0.5 bg-foreground',
                  }),
                o.children,
              ],
            });
          }),
          w = (0, d.forwardRef)((e, t) =>
            (0, a.jsx)('div', {
              ref: t,
              ...e,
              className: (0, p.cn)('flex px-2 gap-2 items-center', e.className),
            })
          ),
          N = (0, d.forwardRef)((e, t) => {
            let { children: n, isLoading: s = !1, ...o } = e;
            return (0, a.jsxs)('label', {
              htmlFor: o.name,
              className: 'relative w-full',
              children: [
                (0, a.jsx)('span', {
                  className: 'sr-only',
                  children: o['aria-labelledby'],
                }),
                (0, a.jsx)(h.I, {
                  ref: t,
                  type: 'text',
                  className: (0, p.cn)(
                    'h-[32px] md:h-[28px] w-full',
                    'text-base md:text-xs',
                    'pl-7',
                    'pr-7',
                    'w-full',
                    'rounded',
                    o.className
                  ),
                  ...o,
                }),
                n,
                s
                  ? (0, a.jsx)(r.Z, {
                      className:
                        'animate-spin absolute left-2 text-foreground-muted',
                      style: { top: 7 },
                      size: 14,
                      strokeWidth: 1.5,
                    })
                  : (0, a.jsx)(i.Z, {
                      className: 'absolute left-2 top-2 text-foreground-muted',
                      size: 14,
                      strokeWidth: 1.5,
                    }),
              ],
            });
          }),
          C = (0, d.forwardRef)((e, t) => {
            let {
              value: n,
              onValueChange: s,
              contentClassName: r,
              triggerClassName: i,
              ...l
            } = e;
            return (0, a.jsxs)(f.h_, {
              modal: !1,
              children: [
                (0, a.jsxs)(g.u, {
                  delayDuration: 0,
                  children: [
                    (0, a.jsx)(f.$F, {
                      asChild: !0,
                      className: (0, p.cn)(
                        'absolute right-1 top-[.4rem] md:top-[.3rem]',
                        'text-foreground transition-colors text-foreground data-[state=open]:text-foreground',
                        i
                      ),
                      children: (0, a.jsx)(g.aJ, {
                        children: (0, a.jsx)(o.Z, { size: 18, strokeWidth: 1 }),
                      }),
                    }),
                    (0, a.jsx)(g._v, { side: 'bottom', children: 'Sort By' }),
                  ],
                }),
                (0, a.jsx)(f.AW, {
                  side: 'bottom',
                  align: 'end',
                  className: (0, p.cn)('w-48', r),
                  children: (0, a.jsx)(f._x, {
                    value: n,
                    onValueChange: s,
                    children: l.children,
                  }),
                }),
              ],
            });
          }),
          S = (0, d.forwardRef)((e, t) => (0, a.jsx)(f.qB, { ref: t, ...e })),
          A = (0, d.forwardRef)((e, t) => {
            let {
              illustration: n,
              title: s,
              description: r,
              actions: i,
              ...o
            } = e;
            return (0, a.jsx)('div', {
              ref: t,
              ...o,
              className: (0, p.cn)(
                'border border-muted bg-surface-100 dark:bg-surface-75 flex flex-col gap-y-3 items-center justify-center rounded-md px-5 py-4',
                o.className
              ),
              children: (0, a.jsxs)('div', {
                className: 'w-full flex flex-col gap-y-1 items-center',
                children: [
                  n,
                  s &&
                    (0, a.jsx)('p', {
                      className: 'text-xs text-foreground-light',
                      children: s,
                    }),
                  r &&
                    (0, a.jsx)('p', {
                      className: 'text-xs text-foreground-lighter text-center',
                      children: r,
                    }),
                  i && (0, a.jsx)('div', { className: 'mt-2', children: i }),
                  o.children,
                ],
              }),
            });
          });
      },
      35808: function (e, t, n) {
        'use strict';
        n.d(t, {
          c: function () {
            return u;
          },
        });
        var a = n(97458),
          s = n(98809),
          r = n(38703),
          i = n(52983),
          o = n(90839),
          l = n(65092),
          c = n(70114);
        !(function (e) {
          let t = [
              /\b(?:async|sync|yield)\*/,
              /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/,
            ],
            n = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,
            a = {
              pattern: RegExp(n + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
              lookbehind: !0,
              inside: {
                namespace: {
                  pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
                  inside: { punctuation: /\./ },
                },
              },
            };
          ((e.languages.dart = e.languages.extend('clike', {
            'class-name': [
              a,
              {
                pattern: RegExp(n + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),
                lookbehind: !0,
                inside: a.inside,
              },
            ],
            keyword: t,
            operator:
              /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
          })),
            e.languages.insertBefore('dart', 'string', {
              'string-literal': {
                pattern:
                  /r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,
                greedy: !0,
                inside: {
                  interpolation: {
                    pattern:
                      /((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
                    lookbehind: !0,
                    inside: {
                      punctuation: /^\$\{?|\}$/,
                      expression: {
                        pattern: /[\s\S]+/,
                        inside: e.languages.dart,
                      },
                    },
                  },
                  string: /[\s\S]+/,
                },
              },
              string: void 0,
            }),
            e.languages.insertBefore('dart', 'class-name', {
              metadata: { pattern: /@\w+/, alias: 'function' },
            }),
            e.languages.insertBefore('dart', 'class-name', {
              generics: {
                pattern:
                  /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                inside: {
                  'class-name': a,
                  keyword: t,
                  punctuation: /[<>(),.:]/,
                  operator: /[?&|]/,
                },
              },
            }));
        })(r.p1);
        let d = { defaultLanguage: 'js' },
          u = (e) => {
            var t;
            let {
                children: n,
                parentClassName: u,
                className: p,
                showCopy: m = !0,
              } = e,
              { resolvedTheme: h } = (0, s.F)(),
              [f, g] = (0, i.useState)(!1),
              x = (0, i.useRef)(null),
              y = [];
            (0, i.useEffect)(() => {
              if (!f) return;
              let e = setTimeout(() => g(!1), 2e3);
              return () => clearTimeout(e);
            }, [f]);
            let b = p && p.replace(/language-/, '');
            !b && d.defaultLanguage && (b = d.defaultLanguage);
            let v = (e) => {
              (0, c.v)(e, () => g(!0));
            };
            return (0, a.jsx)(r.y$, {
              theme: 'dark' === h ? r.np.nightOwl : r.np.nightOwlLight,
              code:
                null !== (t = null == n ? void 0 : n.trim()) && void 0 !== t
                  ? t
                  : '',
              language: b,
              'data-sentry-element': 'Highlight',
              'data-sentry-component': 'SimpleCodeBlock',
              'data-sentry-source-file': 'SimpleCodeBlock.tsx',
              children: (e) => {
                let {
                  className: t,
                  tokens: s,
                  getLineProps: r,
                  getTokenProps: i,
                } = e;
                return (0, a.jsxs)('div', {
                  className: 'Code codeBlockWrapper group',
                  children: [
                    (0, a.jsx)('pre', {
                      ref: x,
                      className: (0, l.cn)('codeBlock', t, u),
                      children: s.map((e, t) => {
                        let n = r({ line: e, key: t });
                        return (
                          y.includes(t + 1) &&
                            (n.className = ''.concat(
                              n.className,
                              ' docusaurus-highlight-code-line'
                            )),
                          (0, a.jsx)(
                            'div',
                            {
                              ...n,
                              children: e.map((e, t) =>
                                (0, a.jsx)(
                                  'span',
                                  { ...i({ token: e, key: t }) },
                                  t
                                )
                              ),
                            },
                            t
                          )
                        );
                      }),
                    }),
                    m &&
                      (0, a.jsx)('div', {
                        className:
                          'invisible absolute right-0 top-0 opacity-0 transition-opacity group-visible group-opacity-100',
                        children: (0, a.jsx)(o.z, {
                          size: 'tiny',
                          type: 'default',
                          onClick: () => v(n),
                          children: f ? 'Copied' : 'Copy',
                        }),
                      }),
                  ],
                });
              },
            });
          };
      },
      3671: function (e, t, n) {
        'use strict';
        n.d(t, {
          A7: function () {
            return f;
          },
          KK: function () {
            return g;
          },
          LQ: function () {
            return m;
          },
          RK: function () {
            return h;
          },
        });
        var a = n(97458),
          s = n(52675),
          r = n(91587),
          i = n(47181),
          o = n(11598),
          l = n(52983),
          c = n(33597),
          d = n(65092),
          u = n(56740),
          p = n(31706);
        let m = c.ZP,
          h = (0, p.j)(
            'group relative transition-colors h-[28px] flex items-center gap-3 text-sm cursor-pointer select-none text-foreground-light bg-control aria-expanded:bg-control data-[state=open]:bg-control',
            {
              variants: {
                isSelected: {
                  true: 'text-foreground !bg-selection',
                  false: '',
                },
                isOpened: { true: 'bg-control', false: '' },
                isPreview: { true: 'bg-control text-foreground', false: '' },
              },
            }
          ),
          f = (0, l.forwardRef)((e, t) => {
            let {
                level: n = 1,
                levelPadding: i = 56,
                isExpanded: o = !1,
                isOpened: c = !1,
                isBranch: p = !1,
                isSelected: m = !1,
                isPreview: f = !1,
                isLoading: y = !1,
                xPadding: b = 16,
                name: v = '',
                icon: j,
                isEditing: _ = !1,
                onEditSubmit: w,
                ...N
              } = e,
              [C, S] = (0, l.useState)(v),
              A = (0, l.useRef)(null);
            return (
              (0, l.useEffect)(() => {
                let e = (e) => {
                  A.current &&
                    !A.current.contains(e.target) &&
                    (null == w || w(C));
                };
                return (
                  _ && document.addEventListener('mousedown', e),
                  () => {
                    _ && document.removeEventListener('mousedown', e);
                  }
                );
              }, [_]),
              (0, l.useEffect)(() => {
                if (_) {
                  var e;
                  null === (e = A.current) || void 0 === e || e.focus();
                } else S(v);
              }, [_]),
              (0, l.useEffect)(() => {
                y || S(v);
              }, [y]),
              (0, a.jsxs)('div', {
                ref: t,
                'aria-selected': m,
                'aria-expanded': !_ && o,
                ...N,
                className: (0, d.cn)(
                  h({ isSelected: m, isOpened: c, isPreview: f })
                ),
                style: {
                  paddingLeft: 1 !== n || p ? (n ? i * (n - 1) + b + 0 : i) : b,
                  ...N.style,
                },
                'data-treeview-is-branch': p,
                'data-treeview-level': n,
                children: [
                  n &&
                    n > 1 &&
                    (0, a.jsx)('div', {
                      style: { left: (i / 2 + 4) * (n - 1) + b },
                      className:
                        'absolute h-full w-px group-data-[treeview-is-branch=false]:bg-border-strong',
                    }),
                  m &&
                    (0, a.jsx)('div', {
                      className: 'absolute left-0 h-full w-0.5 bg-foreground',
                    }),
                  p
                    ? (0, a.jsxs)(a.Fragment, {
                        children: [
                          y
                            ? (0, a.jsx)(s.Z, {
                                className: (0, d.cn)(
                                  'text-foreground-muted animate-spin'
                                ),
                                size: 14,
                              })
                            : (0, a.jsx)(r.Z, {
                                className: (0, d.cn)(
                                  'text-foreground-muted',
                                  'group-aria-selected:text-foreground-light',
                                  'group-aria-expanded:text-foreground-light',
                                  'transition-transform duration-200',
                                  'group-aria-expanded:rotate-90'
                                ),
                                size: 14,
                              }),
                          (0, a.jsx)(x, {
                            className: (0, d.cn)(
                              'transition-colors',
                              ' text-foreground-muted',
                              'group-aria-selected:text-foreground-light',
                              'group-aria-expanded:text-foreground-light'
                            ),
                            isOpen: o,
                            size: 16,
                            strokeWidth: 1.5,
                          }),
                        ],
                      })
                    : j ||
                      (0, a.jsx)(g, {
                        className: (0, d.cn)(
                          'transition-colors',
                          'fill-foreground-muted',
                          'group-aria-selected:fill-foreground',
                          'w-5 h-5 shrink-0',
                          '-ml-0.5'
                        ),
                        size: 16,
                        strokeWidth: 1.5,
                      }),
                  (0, a.jsx)('span', {
                    className: (0, d.cn)(_ && 'hidden', 'truncate text-sm'),
                    title: v,
                    children: v,
                  }),
                  (0, a.jsx)('form', {
                    autoFocus: !0,
                    onSubmit: (e) => {
                      (e.preventDefault(), null == w || w(C));
                    },
                    className: (0, d.cn)(!_ && 'hidden'),
                    children: (0, a.jsx)(u.I, {
                      ref: A,
                      onChange: (e) => {
                        S(e.target.value);
                      },
                      onKeyDownCapture: (e) => {
                        'Enter' === e.key
                          ? null == w || w(C)
                          : 'Escape' === e.key
                            ? (S(v), null == w || w(v))
                            : e.stopPropagation();
                      },
                      className: 'block w-full text-sm px-2 py-1 h-7 w',
                      value: C,
                    }),
                  }),
                ],
              })
            );
          }),
          g = (0, l.forwardRef)((e, t) =>
            (0, a.jsxs)('svg', {
              viewBox: '0 0 24 24',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
              ...e,
              children: [
                (0, a.jsxs)('g', {
                  clipPath: 'url(#clip0_1018_49117)',
                  children: [
                    (0, a.jsx)('path', {
                      d: 'M20.8457 14.4531V15.6348H17.8916V14.4531H20.8457ZM18.3311 8.52539V15.6348H16.9004V8.52539H18.3311Z',
                    }),
                    (0, a.jsx)('path', {
                      d: 'M13.6865 14.5508L15.3857 16.084L14.4873 16.9092L12.8271 15.376L13.6865 14.5508ZM15.3564 11.5283V12.6318C15.3564 13.1429 15.2962 13.5938 15.1758 13.9844C15.0553 14.3717 14.8812 14.6956 14.6533 14.9561C14.4255 15.2132 14.1553 15.4069 13.8428 15.5371C13.5303 15.6673 13.1836 15.7324 12.8027 15.7324C12.4219 15.7324 12.0736 15.6673 11.7578 15.5371C11.4453 15.4069 11.1751 15.2132 10.9473 14.9561C10.7227 14.6956 10.5469 14.3717 10.4199 13.9844C10.2962 13.5938 10.2344 13.1429 10.2344 12.6318V11.5283C10.2344 11.0173 10.2962 10.568 10.4199 10.1807C10.5436 9.79329 10.7178 9.47103 10.9424 9.21387C11.1702 8.95345 11.4404 8.75814 11.7529 8.62793C12.0654 8.49447 12.4121 8.42773 12.793 8.42773C13.1771 8.42773 13.5254 8.49447 13.8379 8.62793C14.1504 8.75814 14.4206 8.95345 14.6484 9.21387C14.8796 9.47103 15.0553 9.79329 15.1758 10.1807C15.2962 10.568 15.3564 11.0173 15.3564 11.5283ZM13.9307 12.6318V11.5186C13.9307 11.1833 13.9062 10.8952 13.8574 10.6543C13.8086 10.4134 13.7354 10.2165 13.6377 10.0635C13.5433 9.91048 13.4245 9.79818 13.2812 9.72656C13.1413 9.65495 12.9785 9.61914 12.793 9.61914C12.6107 9.61914 12.4479 9.65495 12.3047 9.72656C12.1647 9.79818 12.0475 9.91048 11.9531 10.0635C11.8587 10.2165 11.7855 10.4134 11.7334 10.6543C11.6846 10.8952 11.6602 11.1833 11.6602 11.5186V12.6318C11.6602 12.9704 11.6846 13.2601 11.7334 13.501C11.7822 13.7419 11.8538 13.9404 11.9482 14.0967C12.0459 14.2497 12.1647 14.3636 12.3047 14.4385C12.4479 14.5101 12.6139 14.5459 12.8027 14.5459C12.985 14.5459 13.1462 14.5101 13.2861 14.4385C13.4294 14.3636 13.5482 14.2497 13.6426 14.0967C13.7402 13.9437 13.8118 13.7467 13.8574 13.5059C13.9062 13.2617 13.9307 12.9704 13.9307 12.6318Z',
                    }),
                    (0, a.jsx)('path', {
                      d: 'M7.47266 13.7646C7.47266 13.6377 7.46126 13.5221 7.43848 13.418C7.41569 13.3138 7.36686 13.2178 7.29199 13.1299C7.22038 13.042 7.11458 12.9541 6.97461 12.8662C6.83789 12.7783 6.65885 12.6872 6.4375 12.5928C6.17383 12.4821 5.91829 12.3649 5.6709 12.2412C5.4235 12.1143 5.20052 11.9678 5.00195 11.8018C4.80339 11.6357 4.64551 11.4404 4.52832 11.2158C4.41439 10.988 4.35742 10.721 4.35742 10.415C4.35742 10.1156 4.41113 9.84375 4.51855 9.59961C4.62923 9.35547 4.78548 9.14714 4.9873 8.97461C5.18913 8.79883 5.42513 8.66374 5.69531 8.56934C5.96875 8.47493 6.27311 8.42773 6.6084 8.42773C7.06413 8.42773 7.45801 8.52214 7.79004 8.71094C8.12533 8.89974 8.38411 9.15853 8.56641 9.4873C8.75195 9.81608 8.84473 10.1937 8.84473 10.6201H7.41895C7.41895 10.4183 7.38965 10.2409 7.33105 10.0879C7.27572 9.93164 7.1862 9.80957 7.0625 9.72168C6.9388 9.63379 6.7793 9.58984 6.58398 9.58984C6.40169 9.58984 6.25033 9.62728 6.12988 9.70215C6.0127 9.77376 5.9248 9.87305 5.86621 10C5.81087 10.1237 5.7832 10.2637 5.7832 10.4199C5.7832 10.5371 5.81087 10.6429 5.86621 10.7373C5.9248 10.8285 6.00456 10.9115 6.10547 10.9863C6.20638 11.0579 6.3252 11.1279 6.46191 11.1963C6.60189 11.2646 6.75488 11.3314 6.9209 11.3965C7.24316 11.5234 7.52799 11.6634 7.77539 11.8164C8.02279 11.9661 8.22949 12.1354 8.39551 12.3242C8.56152 12.5098 8.68685 12.7197 8.77148 12.9541C8.85612 13.1885 8.89844 13.4554 8.89844 13.7549C8.89844 14.0511 8.84635 14.3213 8.74219 14.5654C8.64128 14.8063 8.49316 15.0146 8.29785 15.1904C8.10254 15.363 7.86654 15.4964 7.58984 15.5908C7.31641 15.6852 7.01042 15.7324 6.67188 15.7324C6.3431 15.7324 6.03223 15.6868 5.73926 15.5957C5.44629 15.5013 5.1875 15.3597 4.96289 15.1709C4.74154 14.9788 4.56738 14.7363 4.44043 14.4434C4.31348 14.1471 4.25 13.7972 4.25 13.3936H5.68066C5.68066 13.6084 5.70182 13.7923 5.74414 13.9453C5.78646 14.0951 5.85156 14.2155 5.93945 14.3066C6.02734 14.3945 6.13477 14.4613 6.26172 14.5068C6.39193 14.5492 6.54004 14.5703 6.70605 14.5703C6.89486 14.5703 7.0446 14.5345 7.15527 14.4629C7.26921 14.3913 7.35059 14.2952 7.39941 14.1748C7.44824 14.0544 7.47266 13.9176 7.47266 13.7646Z',
                    }),
                    (0, a.jsx)('path', {
                      fillRule: 'evenodd',
                      clipRule: 'evenodd',
                      d: 'M20.5 5.73438H4.5C3.11929 5.73438 2 6.85366 2 8.23438V16.5039C2 17.8846 3.11929 19.0039 4.5 19.0039H20.5C21.8807 19.0039 23 17.8846 23 16.5039V8.23438C23 6.85366 21.8807 5.73438 20.5 5.73438ZM4.5 4.23438C2.29086 4.23438 0.5 6.02524 0.5 8.23438V16.5039C0.5 18.713 2.29086 20.5039 4.5 20.5039H20.5C22.7091 20.5039 24.5 18.713 24.5 16.5039V8.23438C24.5 6.02524 22.7091 4.23438 20.5 4.23438H4.5Z',
                    }),
                  ],
                }),
                (0, a.jsx)('defs', {
                  children: (0, a.jsx)('clipPath', {
                    id: 'clip0_1018_49117',
                    children: (0, a.jsx)('rect', {
                      width: '24',
                      height: '24',
                      transform: 'translate(0.5 0.269531)',
                    }),
                  }),
                }),
              ],
            })
          ),
          x = (0, l.forwardRef)((e, t) => {
            let { isOpen: n, ...s } = e,
              r = n ? i.Z : o.Z;
            return (0, a.jsx)(r, { ref: t, ...s });
          });
      },
      18079: function (e, t, n) {
        'use strict';
        n.d(t, {
          BO: function () {
            return p;
          },
          dg: function () {
            return f;
          },
          h7: function () {
            return h;
          },
        });
        var a = n(97458),
          s = n(52983),
          r = n(59301),
          i = n(98178),
          o = n(71557),
          l = n(65092);
        let c = { light: '', dark: '.dark' },
          d = s.createContext(null);
        function u() {
          let e = s.useContext(d);
          if (!e)
            throw Error('useChart must be used within a <ChartContainer />');
          return e;
        }
        let p = s.forwardRef((e, t) => {
          let { id: n, className: i, children: o, config: c = {}, ...u } = e,
            p = s.useId(),
            h = 'chart-'.concat(n || p.replace(/:/g, ''));
          return (0, a.jsx)(d.Provider, {
            value: { config: c },
            children: (0, a.jsxs)('div', {
              'data-chart': h,
              ref: t,
              className: (0, l.cn)(
                "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-foreground-muted [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
                i
              ),
              ...u,
              children: [
                (0, a.jsx)(m, { id: h, config: c }),
                (0, a.jsx)(r.h, { children: o }),
              ],
            }),
          });
        });
        p.displayName = 'Chart';
        let m = (e) => {
            let { id: t, config: n } = e,
              s = Object.entries(n).filter((e) => {
                let [t, n] = e;
                return n.theme || n.color;
              });
            return s.length
              ? (0, a.jsx)('style', {
                  dangerouslySetInnerHTML: {
                    __html: Object.entries(c)
                      .map((e) => {
                        let [n, a] = e;
                        return '\n'
                          .concat(a, ' [data-chart=')
                          .concat(t, '] {\n')
                          .concat(
                            s
                              .map((e) => {
                                var t;
                                let [a, s] = e,
                                  r =
                                    (null === (t = s.theme) || void 0 === t
                                      ? void 0
                                      : t[n]) || s.color;
                                return r
                                  ? '  --color-'.concat(a, ': ').concat(r, ';')
                                  : null;
                              })
                              .join('\n'),
                            '\n}\n'
                          );
                      })
                      .join('\n'),
                  },
                  'data-sentry-component': 'ChartStyle',
                  'data-sentry-source-file': 'chart.tsx',
                })
              : null;
          },
          h = i.u,
          f = s.forwardRef((e, t) => {
            let {
                active: n,
                payload: r,
                className: i,
                indicator: o = 'dot',
                hideLabel: c = !1,
                hideIndicator: d = !1,
                label: p,
                labelFormatter: m,
                labelSuffix: h,
                labelClassName: f,
                formatter: x,
                color: y,
                nameKey: b,
                labelKey: v,
              } = e,
              { config: j } = u(),
              _ = s.useMemo(() => {
                var e;
                if (c || !(null == r ? void 0 : r.length)) return null;
                let [t] = r,
                  n = ''.concat(v || t.dataKey || t.name || 'value'),
                  s = g(j, t, n),
                  i =
                    v || 'string' != typeof p
                      ? null == s
                        ? void 0
                        : s.label
                      : (null === (e = j[p]) || void 0 === e
                          ? void 0
                          : e.label) || p;
                return m
                  ? (0, a.jsx)('div', {
                      className: (0, l.cn)('font-medium', f),
                      children: m(i, r),
                    })
                  : i
                    ? (0, a.jsx)('div', {
                        className: (0, l.cn)('font-medium', f),
                        children: i,
                      })
                    : null;
              }, [p, m, r, c, f, j, v]);
            if (!n || !(null == r ? void 0 : r.length)) return null;
            let w = 1 === r.length && 'dot' !== o;
            return (0, a.jsxs)('div', {
              ref: t,
              className: (0, l.cn)(
                'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg px-2.5 py-1.5 text-xs ',
                i
              ),
              children: [
                w ? null : _,
                (0, a.jsx)('div', {
                  className: 'grid gap-1.5',
                  children: r.map((e, t) => {
                    let n = ''.concat(b || e.name || e.dataKey || 'value'),
                      s = g(j, e, n),
                      r = y || e.payload.fill || e.color;
                    return (0, a.jsx)(
                      'div',
                      {
                        className: (0, l.cn)(
                          'flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-foreground-muted',
                          'dot' === o && 'items-center'
                        ),
                        children:
                          x &&
                          (null == e ? void 0 : e.value) !== void 0 &&
                          e.name
                            ? x(e.value, e.name, e, t, e.payload)
                            : (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (null == s ? void 0 : s.icon)
                                    ? (0, a.jsx)(s.icon, {})
                                    : !d &&
                                      (0, a.jsx)('div', {
                                        className: (0, l.cn)(
                                          'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                                          {
                                            'h-2.5 w-2.5': 'dot' === o,
                                            'w-1': 'line' === o,
                                            'w-0 border-[1.5px] border-dashed bg-transparent':
                                              'dashed' === o,
                                            'my-0.5': w && 'dashed' === o,
                                          }
                                        ),
                                        style: {
                                          '--color-bg': r,
                                          '--color-border': r,
                                        },
                                      }),
                                  (0, a.jsxs)('div', {
                                    className: (0, l.cn)(
                                      'flex flex-1 justify-between leading-none',
                                      w ? 'items-end' : 'items-center'
                                    ),
                                    children: [
                                      (0, a.jsxs)('div', {
                                        className: 'grid gap-1.5',
                                        children: [
                                          w ? _ : null,
                                          (0, a.jsx)('span', {
                                            className: 'text-foreground-light',
                                            children:
                                              (null == s ? void 0 : s.label) ||
                                              e.name,
                                          }),
                                        ],
                                      }),
                                      e.value &&
                                        (0, a.jsxs)('span', {
                                          className:
                                            'font-mono font-medium tabular-nums text-foreground',
                                          children: [
                                            e.value.toLocaleString(),
                                            h,
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                      },
                      e.dataKey
                    );
                  }),
                }),
              ],
            });
          });
        function g(e, t, n) {
          if ('object' != typeof t || null === t) return;
          let a =
              'payload' in t &&
              'object' == typeof t.payload &&
              null !== t.payload
                ? t.payload
                : void 0,
            s = n;
          return (
            n in t && 'string' == typeof t[n]
              ? (s = t[n])
              : a && n in a && 'string' == typeof a[n] && (s = a[n]),
            s in e ? e[s] : e[n]
          );
        }
        ((f.displayName = 'ChartTooltip'),
          o.D,
          (s.forwardRef((e, t) => {
            let {
                className: n,
                hideIcon: s = !1,
                payload: r,
                verticalAlign: i = 'bottom',
                nameKey: o,
              } = e,
              { config: c } = u();
            return (null == r ? void 0 : r.length)
              ? (0, a.jsx)('div', {
                  ref: t,
                  className: (0, l.cn)(
                    'flex items-center justify-center gap-4',
                    'top' === i ? 'pb-3' : 'pt-3',
                    n
                  ),
                  children: r.map((e) => {
                    let t = ''.concat(o || e.dataKey || 'value'),
                      n = g(c, e, t);
                    return (0, a.jsxs)(
                      'div',
                      {
                        className: (0, l.cn)(
                          'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-foreground-muted'
                        ),
                        children: [
                          (null == n ? void 0 : n.icon) && !s
                            ? (0, a.jsx)(n.icon, {})
                            : (0, a.jsx)('div', {
                                className: 'h-2 w-2 shrink-0 rounded-[2px]',
                                style: { background: e.color },
                              }),
                          null == n ? void 0 : n.label,
                        ],
                      },
                      e.value
                    );
                  }),
                })
              : null;
          }).displayName = 'ChartLegend'));
      },
      94669: function (e, t, n) {
        'use strict';
        n.d(t, {
          W4: function () {
            return u;
          },
          Zo: function () {
            return m;
          },
          h_: function () {
            return p;
          },
          uP: function () {
            return h;
          },
          xV: function () {
            return d;
          },
        });
        var a = n(97458),
          s = n(73188),
          r = n(91587),
          i = n(62507),
          o = n(17432),
          l = n(52983),
          c = n(65092);
        let d = s.fC,
          u = s.xz;
        (s.ZA,
          s.Uv,
          s.Tr,
          s.Ee,
          (l.forwardRef((e, t) => {
            let { className: n, inset: i, children: o, ...l } = e;
            return (0, a.jsxs)(s.fF, {
              ref: t,
              className: (0, c.cn)(
                'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-selection focus:text-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                i && 'pl-8',
                n
              ),
              ...l,
              children: [o, (0, a.jsx)(r.Z, { className: 'ml-auto h-4 w-4' })],
            });
          }).displayName = s.fF.displayName),
          (l.forwardRef((e, t) => {
            let { className: n, ...r } = e;
            return (0, a.jsx)(s.tu, {
              ref: t,
              className: (0, c.cn)(
                'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-overlay p-1 text-foreground-light  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                n
              ),
              ...r,
            });
          }).displayName = s.tu.displayName));
        let p = l.forwardRef((e, t) => {
          let { className: n, ...r } = e;
          return (0, a.jsx)(s.Uv, {
            children: (0, a.jsx)(s.VY, {
              ref: t,
              className: (0, c.cn)(
                'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-overlay p-1 text-foreground-light  animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                n
              ),
              ...r,
            }),
          });
        });
        p.displayName = s.VY.displayName;
        let m = l.forwardRef((e, t) => {
          let { className: n, inset: r, ...i } = e;
          return (0, a.jsx)(s.ck, {
            ref: t,
            className: (0, c.cn)(
              'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-selection focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              r && 'pl-8',
              n
            ),
            ...i,
          });
        });
        ((m.displayName = s.ck.displayName),
          (l.forwardRef((e, t) => {
            let { className: n, children: r, checked: o, ...l } = e;
            return (0, a.jsxs)(s.oC, {
              ref: t,
              className: (0, c.cn)(
                'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-xs outline-none focus:bg-selection focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                n
              ),
              checked: o,
              ...l,
              children: [
                (0, a.jsx)('span', {
                  className:
                    'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                  children: (0, a.jsx)(s.wU, {
                    children: (0, a.jsx)(i.Z, { className: 'h-4 w-4' }),
                  }),
                }),
                r,
              ],
            });
          }).displayName = s.oC.displayName),
          (l.forwardRef((e, t) => {
            let { className: n, children: r, ...i } = e;
            return (0, a.jsxs)(s.Rk, {
              ref: t,
              className: (0, c.cn)(
                'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-xs outline-none focus:bg-selection focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                n
              ),
              ...i,
              children: [
                (0, a.jsx)('span', {
                  className:
                    'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                  children: (0, a.jsx)(s.wU, {
                    children: (0, a.jsx)(o.Z, {
                      className: 'h-2 w-2 fill-current',
                    }),
                  }),
                }),
                r,
              ],
            });
          }).displayName = s.Rk.displayName),
          (l.forwardRef((e, t) => {
            let { className: n, inset: r, ...i } = e;
            return (0, a.jsx)(s.__, {
              ref: t,
              className: (0, c.cn)(
                'px-2 py-1.5 text-xs text-foreground-light',
                r && 'pl-8',
                n
              ),
              ...i,
            });
          }).displayName = s.__.displayName));
        let h = l.forwardRef((e, t) => {
          let { className: n, ...r } = e;
          return (0, a.jsx)(s.Z0, {
            ref: t,
            className: (0, c.cn)('-mx-1 my-1 h-px bg-border', n),
            ...r,
          });
        });
        h.displayName = s.Z0.displayName;
      },
      89429: function (e, t, n) {
        'use strict';
        n.d(t, {
          Dp: function () {
            return c;
          },
          ee: function () {
            return l;
          },
          pO: function () {
            return o;
          },
        });
        var a = n(97458),
          s = n(85650),
          r = n(18006),
          i = n(65092);
        let o = (e) => {
            let { className: t, ...n } = e;
            return (0, a.jsx)(r.eh, {
              className: (0, i.cn)(
                'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
                t
              ),
              ...n,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'ResizablePanelGroup',
              'data-sentry-source-file': 'resizable.tsx',
            });
          },
          l = r.s_,
          c = (e) => {
            let { withHandle: t, className: n, ...o } = e;
            return (0, a.jsx)(r.OT, {
              className: (0, i.cn)(
                'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
                'data-[resize-handle-state=drag]:bg-border-strong',
                'group',
                'transition-colors',
                n
              ),
              ...o,
              'data-sentry-element': 'unknown',
              'data-sentry-component': 'ResizableHandle',
              'data-sentry-source-file': 'resizable.tsx',
              children:
                t &&
                (0, a.jsx)('div', {
                  className: (0, i.cn)(
                    'z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border focus:bg-surface-400',
                    'opacity-0 transition-opacity duration-200',
                    'group-data-[resize-handle-state=hover]:opacity-100',
                    'bg-surface-400',
                    'group-data-[resize-handle-state=drag]:opacity-100',
                    'group-data-[resize-handle-state=drag]:bg-foreground-muted'
                  ),
                  children: (0, a.jsx)(s.Z, { className: 'h-2.5 w-2.5' }),
                }),
            });
          };
      },
      16196: function (e, t, n) {
        'use strict';
        n.d(t, {
          K: function () {
            return o;
          },
        });
        var a = n(97458),
          s = n(52983),
          r = n(65092);
        let i = ['bg-control'],
          o = s.forwardRef((e, t) => {
            let { className: n, ...s } = e;
            return (0, a.jsx)('textarea', {
              className: (0, r.cn)(
                'flex min-h-10 w-full rounded-md border border-control bg-control px-3 py-2 text-base md:text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:opacity-50',
                ...i,
                n
              ),
              ref: t,
              ...s,
            });
          });
        o.displayName = 'TextArea';
      },
      35136: function (e, t, n) {
        'use strict';
        n.d(t, {
          t: function () {
            return c;
          },
        });
        var a = n(97458),
          s = n(49935),
          r = n(51650),
          i = n.n(r),
          o = n(65092);
        let l = (e) =>
            (0, a.jsx)('span', {
              className: (0, o.cn)('next-image--dynamic-fill', e.className),
              'data-sentry-component': 'NextImageHandler',
              'data-sentry-source-file': 'index.tsx',
              children: (0, a.jsx)(i(), {
                ...e,
                className: 'rounded-md border',
                layout: 'fill',
                'data-sentry-element': 'Image',
                'data-sentry-source-file': 'index.tsx',
              }),
            }),
          c = {
            mono: (e) =>
              (0, a.jsx)('code', {
                className: 'text-sm',
                children: e.children,
              }),
            code: (e) => (0, a.jsx)(s.d, { ...e }),
            img: (e) => l(e),
            Image: (e) => l(e),
          };
      },
      49437: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return T;
          },
        });
        var a = {};
        (n.r(a),
          n.d(a, {
            create: function () {
              return N;
            },
            list: function () {
              return v;
            },
            pgFunctionArrayZod: function () {
              return y;
            },
            pgFunctionCreateZod: function () {
              return _;
            },
            pgFunctionDeleteZod: function () {
              return A;
            },
            pgFunctionOptionalZod: function () {
              return b;
            },
            pgFunctionUpdateZod: function () {
              return C;
            },
            pgFunctionZod: function () {
              return x;
            },
            remove: function () {
              return k;
            },
            retrieve: function () {
              return j;
            },
            update: function () {
              return S;
            },
          }));
        var s = n(89140);
        let r =
          '\n-- Can\'t use pg_authid here since some managed Postgres providers don\'t expose it\n-- https://github.com/supabase/postgres-meta/issues/212\n\nselect\n  r.oid as id,\n  rolname as name,\n  rolsuper as "isSuperuser",\n  rolcreatedb as "canCreateDb",\n  rolcreaterole as "canCreateRole",\n  rolinherit as "inheritRole",\n  rolcanlogin as "canLogin",\n  rolreplication as "isReplicationRole",\n  rolbypassrls as "canBypassRls",\n  (\n    select\n      count(*)\n    from\n      pg_stat_activity\n    where\n      r.rolname = pg_stat_activity.usename\n  ) as "activeConnections",\n  case when rolconnlimit = -1 then current_setting(\'max_connections\') :: int8\n       else rolconnlimit\n  end as "connectionLimit",\n  rolvaliduntil as "validUntil",\n  coalesce(r_config.role_configs, \'{}\') as config\nfrom\n  pg_roles r\n  left join (\n    select\n      oid,\n      jsonb_object_agg(param, value) filter (where param is not null) as role_configs\n    from\n      (\n        select\n          oid,\n          (string_to_array(unnest(rolconfig), \'=\'))[1] as param,\n          (string_to_array(unnest(rolconfig), \'=\'))[2] as value\n        from\n          pg_roles\n      ) as _\n    group by\n      oid\n  ) r_config on r_config.oid = r.oid\n';
        var i = n(5394);
        let o = i.z.object({
            id: i.z.number(),
            name: i.z.string(),
            isSuperuser: i.z.boolean(),
            canCreateDb: i.z.boolean(),
            canCreateRole: i.z.boolean(),
            inheritRole: i.z.boolean(),
            canLogin: i.z.boolean(),
            isReplicationRole: i.z.boolean(),
            canBypassRls: i.z.boolean(),
            activeConnections: i.z.number(),
            connectionLimit: i.z.number(),
            validUntil: i.z.union([i.z.string(), i.z.null()]),
            config: i.z.record(i.z.string(), i.z.string()),
          }),
          l = i.z.array(o),
          c = i.z.optional(o),
          d = ['information_schema', 'pg_catalog', 'pg_toast'],
          u =
            "\n-- Adapted from information_schema.schemata\n\nselect\n  n.oid as id,\n  n.nspname as name,\n  u.rolname as owner\nfrom\n  pg_namespace n,\n  pg_roles u\nwhere\n  n.nspowner = u.oid\n  and (\n    pg_has_role(n.nspowner, 'USAGE')\n    or has_schema_privilege(n.oid, 'CREATE, USAGE')\n  )\n  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')\n  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')\n",
          p = i.z.object({
            id: i.z.number(),
            name: i.z.string(),
            owner: i.z.string(),
          }),
          m = i.z.array(p),
          h = i.z.optional(p);
        function f(e, t, n) {
          return (n && (t = n.concat(null != t ? t : [])),
          null == e ? void 0 : e.length)
            ? 'IN ('.concat(e.map(s.i0).join(','), ')')
            : (null == t ? void 0 : t.length)
              ? 'NOT IN ('.concat(t.map(s.i0).join(','), ')')
              : '';
        }
        let g =
            "\n-- CTE with sane arg_modes, arg_names, and arg_types.\n-- All three are always of the same length.\n-- All three include all args, including OUT and TABLE args.\nwith functions as (\n  select\n    *,\n    -- proargmodes is null when all arg modes are IN\n    coalesce(\n      p.proargmodes,\n      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])\n    ) as arg_modes,\n    -- proargnames is null when all args are unnamed\n    coalesce(\n      p.proargnames,\n      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])\n    ) as arg_names,\n    -- proallargtypes is null when all arg modes are IN\n    coalesce(p.proallargtypes, p.proargtypes) as arg_types,\n    array_cat(\n      array_fill(false, array[pronargs - pronargdefaults]),\n      array_fill(true, array[pronargdefaults])) as arg_has_defaults\n  from\n    pg_proc as p\n  where\n    p.prokind = 'f'\n)\nselect\n  f.oid as id,\n  n.nspname as schema,\n  f.proname as name,\n  l.lanname as language,\n  case\n    when l.lanname = 'internal' then ''\n    else f.prosrc\n  end as definition,\n  case\n    when l.lanname = 'internal' then f.prosrc\n    else pg_get_functiondef(f.oid)\n  end as complete_statement,\n  coalesce(f_args.args, '[]') as args,\n  pg_get_function_arguments(f.oid) as argument_types,\n  pg_get_function_identity_arguments(f.oid) as identity_argument_types,\n  f.prorettype as return_type_id,\n  pg_get_function_result(f.oid) as return_type,\n  nullif(rt.typrelid, 0) as return_type_relation_id,\n  f.proretset as is_set_returning_function,\n  case\n    when f.provolatile = 'i' then 'IMMUTABLE'\n    when f.provolatile = 's' then 'STABLE'\n    when f.provolatile = 'v' then 'VOLATILE'\n  end as behavior,\n  f.prosecdef as security_definer,\n  f_config.config_params as config_params\nfrom\n  functions f\n  left join pg_namespace n on f.pronamespace = n.oid\n  left join pg_language l on f.prolang = l.oid\n  left join pg_type rt on rt.oid = f.prorettype\n  left join (\n    select\n      oid,\n      jsonb_object_agg(param, value) filter (where param is not null) as config_params\n    from\n      (\n        select\n          oid,\n          (string_to_array(unnest(proconfig), '='))[1] as param,\n          (string_to_array(unnest(proconfig), '='))[2] as value\n        from\n          functions\n      ) as t\n    group by\n      oid\n  ) f_config on f_config.oid = f.oid\n  left join (\n    select\n      oid,\n      jsonb_agg(jsonb_build_object(\n        'mode', t2.mode,\n        'name', name,\n        'type_id', type_id,\n        -- Cast null into false boolean\n        'has_default', COALESCE(has_default, false)\n      )) as args\n    from\n      (\n        select\n          oid,\n          unnest(arg_modes) as mode,\n          unnest(arg_names) as name,\n          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume\n          -- integer, we need to cast it to be properly parsed\n          unnest(arg_types)::int8 as type_id,\n          unnest(arg_has_defaults) as has_default\n        from\n          functions\n      ) as t1,\n      lateral (\n        select\n          case\n            when t1.mode = 'i' then 'in'\n            when t1.mode = 'o' then 'out'\n            when t1.mode = 'b' then 'inout'\n            when t1.mode = 'v' then 'variadic'\n            else 'table'\n          end as mode\n      ) as t2\n    group by\n      t1.oid\n  ) f_args on f_args.oid = f.oid\n",
          x = i.z.object({
            id: i.z.number(),
            schema: i.z.string(),
            name: i.z.string(),
            language: i.z.string(),
            definition: i.z.string(),
            complete_statement: i.z.string(),
            args: i.z.array(
              i.z.object({
                mode: i.z.union([
                  i.z.literal('in'),
                  i.z.literal('out'),
                  i.z.literal('inout'),
                  i.z.literal('variadic'),
                  i.z.literal('table'),
                ]),
                name: i.z.string(),
                type_id: i.z.number(),
                has_default: i.z.boolean(),
              })
            ),
            argument_types: i.z.string(),
            identity_argument_types: i.z.string(),
            return_type_id: i.z.number(),
            return_type: i.z.string(),
            return_type_relation_id: i.z.union([i.z.number(), i.z.null()]),
            is_set_returning_function: i.z.boolean(),
            behavior: i.z.union([
              i.z.literal('IMMUTABLE'),
              i.z.literal('STABLE'),
              i.z.literal('VOLATILE'),
            ]),
            security_definer: i.z.boolean(),
            config_params: i.z.union([
              i.z.record(i.z.string(), i.z.string()),
              i.z.null(),
            ]),
          }),
          y = i.z.array(x),
          b = i.z.optional(x);
        function v() {
          let {
              includeSystemSchemas: e = !1,
              includedSchemas: t,
              excludedSchemas: n,
              limit: a,
              offset: s,
            } = arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : {},
            r = '\n    with f as (\n      '.concat(
              g,
              '\n    )\n    select\n      f.*\n    from f\n  '
            ),
            i = f(t, n, e ? void 0 : d);
          return (
            i && (r += ' where schema '.concat(i)),
            a && (r = ''.concat(r, ' limit ').concat(a)),
            s && (r = ''.concat(r, ' offset ').concat(s)),
            { sql: r, zod: y }
          );
        }
        function j(e) {
          let { id: t, name: n, schema: a = 'public', args: r = [] } = e;
          if (t)
            return {
              sql: '\n      with f as (\n        '
                .concat(
                  g,
                  '\n      )\n      select\n        f.*\n      from f where id = '
                )
                .concat((0, s.i0)(t), ';'),
              zod: b,
            };
          if (n && a && r)
            return {
              sql: 'with f as (\n      '
                .concat(
                  g,
                  '\n    )\n    select\n      f.*\n    from f join pg_proc as p on id = p.oid where schema = '
                )
                .concat((0, s.i0)(a), ' and name = ')
                .concat((0, s.i0)(n), ' and p.proargtypes::text = ')
                .concat(
                  r.length
                    ? "(\n          select string_agg(type_oid::text, ' ') from (\n            select (\n              split_args.arr[\n                array_length(\n                  split_args.arr,\n                  1\n                )\n              ]::regtype::oid\n            ) as type_oid from (\n              select string_to_array(\n                unnest(\n                  array[".concat(
                        r.map(s.i0),
                        "]\n                ),\n                ' '\n              ) as arr\n            ) as split_args\n          ) args\n        )"
                      )
                    : (0, s.i0)('')
                ),
              zod: b,
            };
          throw Error('Must provide either id or name and schema');
        }
        let _ = i.z.object({
          name: i.z.string(),
          definition: i.z.string(),
          args: i.z.array(i.z.string()).optional(),
          behavior: i.z.enum(['IMMUTABLE', 'STABLE', 'VOLATILE']).optional(),
          config_params: i.z.record(i.z.string(), i.z.string()).optional(),
          schema: i.z.string().optional(),
          language: i.z.string().optional(),
          return_type: i.z.string().optional(),
          security_definer: i.z.boolean().optional(),
        });
        function w(e) {
          let {
              name: t,
              schema: n,
              args: a,
              definition: r,
              return_type: i,
              language: o,
              behavior: l,
              security_definer: c,
              config_params: d,
            } = e,
            { replace: u = !1 } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return '\n    CREATE '
            .concat(u ? 'OR REPLACE' : '', ' FUNCTION ')
            .concat((0, s.yR)(n), '.')
            .concat((0, s.yR)(t), '(')
            .concat(
              (null == a ? void 0 : a.join(', ')) || '',
              ')\n    RETURNS '
            )
            .concat(i, '\n    AS ')
            .concat((0, s.i0)(r), '\n    LANGUAGE ')
            .concat(o, '\n    ')
            .concat(l, '\n    CALLED ON NULL INPUT\n    ')
            .concat(c ? 'SECURITY DEFINER' : 'SECURITY INVOKER', '\n    ')
            .concat(
              d
                ? Object.entries(d)
                    .map((e) => {
                      let [t, n] = e;
                      return 'SET '
                        .concat(t, ' ')
                        .concat(
                          'FROM CURRENT' === n
                            ? 'FROM CURRENT'
                            : 'TO ' + ('""' === n ? "''" : n)
                        );
                    })
                    .join('\n')
                : '',
              ';\n  '
            );
        }
        function N(e) {
          let {
            name: t,
            schema: n = 'public',
            args: a = [],
            definition: s,
            return_type: r = 'void',
            language: o = 'sql',
            behavior: l = 'VOLATILE',
            security_definer: c = !1,
            config_params: d = {},
          } = e;
          return {
            sql: w({
              name: t,
              schema: n,
              args: a,
              definition: s,
              return_type: r,
              language: o,
              behavior: l,
              security_definer: c,
              config_params: d,
            }),
            zod: i.z.void(),
          };
        }
        let C = i.z.object({
          name: i.z.string().optional(),
          schema: i.z.string().optional(),
          definition: i.z.string().optional(),
        });
        function S(e, t) {
          var n;
          let { name: a, schema: r, definition: o } = t,
            l = e.argument_types.split(', '),
            c = e.identity_argument_types,
            d =
              'string' == typeof o
                ? w(
                    {
                      ...e,
                      definition: o,
                      args: l,
                      config_params:
                        null !== (n = e.config_params) && void 0 !== n ? n : {},
                    },
                    { replace: !0 }
                  )
                : '',
            u =
              a && a !== e.name
                ? 'ALTER FUNCTION '
                    .concat((0, s.yR)(e.schema), '.')
                    .concat((0, s.yR)(e.name), '(')
                    .concat(c, ') RENAME TO ')
                    .concat((0, s.yR)(a), ';')
                : '',
            p =
              r && r !== e.schema
                ? 'ALTER FUNCTION '
                    .concat((0, s.yR)(e.schema), '.')
                    .concat((0, s.yR)(a || e.name), '(')
                    .concat(c, ')  SET SCHEMA ')
                    .concat((0, s.yR)(r), ';')
                : '';
          return {
            sql: '\n    DO LANGUAGE plpgsql $$\n    BEGIN\n      IF '
              .concat(
                'string' == typeof o ? 'TRUE' : 'FALSE',
                ' THEN\n        '
              )
              .concat(
                d,
                '\n\n        IF (\n          SELECT id\n          FROM ('
              )
              .concat(g, ') AS f\n          WHERE f.schema = ')
              .concat((0, s.i0)(e.schema), '\n          AND f.name = ')
              .concat(
                (0, s.i0)(e.name),
                '\n          AND f.identity_argument_types = '
              )
              .concat((0, s.i0)(c), '\n        ) != ')
              .concat(
                e.id,
                ' THEN\n          RAISE EXCEPTION \'Cannot find function "'
              )
              .concat(e.schema, '"."')
              .concat(e.name, '"(')
              .concat(c, ")';\n        END IF;\n      END IF;\n\n      ")
              .concat(u, '\n\n      ')
              .concat(p, '\n    END;\n    $$;\n  '),
            zod: i.z.void(),
          };
        }
        let A = i.z.object({ cascade: i.z.boolean().default(!1).optional() });
        function k(e) {
          let { cascade: t = !1 } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return {
            sql: 'DROP FUNCTION '
              .concat((0, s.yR)(e.schema), '.')
              .concat((0, s.yR)(e.name), '\n  (')
              .concat(e.identity_argument_types, ')\n  ')
              .concat(t ? 'CASCADE' : 'RESTRICT', ';'),
            zod: i.z.void(),
          };
        }
        let E =
            "\n-- Despite the name `table_privileges`, this includes other kinds of relations:\n-- views, matviews, etc. \"Relation privileges\" just doesn't roll off the tongue.\n--\n-- For each relation, get its relacl in a jsonb format,\n-- e.g.\n--\n-- '{postgres=arwdDxt/postgres}'\n--\n-- becomes\n--\n-- [\n--   {\n--     \"grantee\": \"postgres\",\n--     \"grantor\": \"postgres\",\n--     \"is_grantable\": false,\n--     \"privilege_type\": \"INSERT\"\n--   },\n--   ...\n-- ]\nselect\n  c.oid as relation_id,\n  nc.nspname as schema,\n  c.relname as name,\n  case\n    when c.relkind = 'r' then 'table'\n    when c.relkind = 'v' then 'view'\n    when c.relkind = 'm' then 'materialized_view'\n    when c.relkind = 'f' then 'foreign_table'\n    when c.relkind = 'p' then 'partitioned_table'\n  end as kind,\n  coalesce(\n    jsonb_agg(\n      jsonb_build_object(\n        'grantor', grantor.rolname,\n        'grantee', grantee.rolname,\n        'privilege_type', _priv.privilege_type,\n        'is_grantable', _priv.is_grantable\n      )\n    ) filter (where _priv is not null),\n    '[]'\n  ) as privileges\nfrom pg_class c\njoin pg_namespace as nc\n  on nc.oid = c.relnamespace\nleft join lateral (\n  select grantor, grantee, privilege_type, is_grantable\n  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))\n) as _priv on true\nleft join pg_roles as grantor\n  on grantor.oid = _priv.grantor\nleft join (\n  select\n    pg_roles.oid,\n    pg_roles.rolname\n  from pg_roles\n  union all\n  select\n    (0)::oid as oid, 'PUBLIC'\n) as grantee (oid, rolname)\n  on grantee.oid = _priv.grantee\nwhere c.relkind in ('r', 'v', 'm', 'f', 'p')\n  and not pg_is_other_temp_schema(c.relnamespace)\n  and (\n    pg_has_role(c.relowner, 'USAGE')\n    or has_table_privilege(\n      c.oid,\n      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'\n      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end\n    )\n    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')\n  )\ngroup by\n  c.oid,\n  nc.nspname,\n  c.relname,\n  c.relkind\n",
          R = i.z.object({
            relation_id: i.z.number(),
            schema: i.z.string(),
            name: i.z.string(),
            kind: i.z.union([
              i.z.literal('table'),
              i.z.literal('view'),
              i.z.literal('materialized_view'),
              i.z.literal('foreign_table'),
              i.z.literal('partitioned_table'),
            ]),
            privileges: i.z.array(
              i.z.object({
                grantor: i.z.string(),
                grantee: i.z.string(),
                privilege_type: i.z.union([
                  i.z.literal('SELECT'),
                  i.z.literal('INSERT'),
                  i.z.literal('UPDATE'),
                  i.z.literal('DELETE'),
                  i.z.literal('TRUNCATE'),
                  i.z.literal('REFERENCES'),
                  i.z.literal('TRIGGER'),
                  i.z.literal('MAINTAIN'),
                ]),
                is_grantable: i.z.boolean(),
              })
            ),
          }),
          L = i.z.array(R),
          I = i.z.optional(R);
        var T = {
          roles: {
            list: function () {
              let {
                  includeDefaultRoles: e = !1,
                  limit: t,
                  offset: n,
                } = arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
                a = '\nwith\n  roles as ('.concat(
                  r,
                  ')\nselect\n  *\nfrom\n  roles\nwhere\n  true\n'
                );
              return (
                e || (a += " and not pg_catalog.starts_with(name, 'pg_')"),
                t && (a += ' limit '.concat(t)),
                n && (a += ' offset '.concat(n)),
                { sql: a, zod: l }
              );
            },
            retrieve: function (e) {
              let { id: t, name: n } = e;
              return t
                ? {
                    sql: ''
                      .concat(r, ' where r.oid = ')
                      .concat((0, s.i0)(t), ';'),
                    zod: c,
                  }
                : {
                    sql: ''
                      .concat(r, ' where rolname = ')
                      .concat((0, s.i0)(n), ';'),
                    zod: c,
                  };
            },
            create: function (e) {
              let {
                name: t,
                isSuperuser: n = !1,
                canCreateDb: a = !1,
                canCreateRole: r = !1,
                inheritRole: i = !0,
                canLogin: o = !1,
                isReplicationRole: l = !1,
                canBypassRls: c = !1,
                connectionLimit: d = -1,
                password: u,
                validUntil: p,
                memberOf: m = [],
                members: h = [],
                admins: f = [],
                config: g = {},
              } = e;
              return {
                sql: '\ncreate role '
                  .concat((0, s.yR)(t), '\n  ')
                  .concat(n ? 'superuser' : '', '\n  ')
                  .concat(a ? 'createdb' : '', '\n  ')
                  .concat(r ? 'createrole' : '', '\n  ')
                  .concat(i ? '' : 'noinherit', '\n  ')
                  .concat(o ? 'login' : '', '\n  ')
                  .concat(l ? 'replication' : '', '\n  ')
                  .concat(c ? 'bypassrls' : '', '\n  connection limit ')
                  .concat(d, '\n  ')
                  .concat(
                    void 0 === u ? '' : 'password '.concat((0, s.i0)(u)),
                    '\n  '
                  )
                  .concat(
                    void 0 === p ? '' : 'valid until '.concat((0, s.i0)(p)),
                    '\n  '
                  )
                  .concat(
                    0 === m.length
                      ? ''
                      : 'in role '.concat(m.map(s.yR).join(',')),
                    '\n  '
                  )
                  .concat(
                    0 === h.length ? '' : 'role '.concat(h.map(s.yR).join(',')),
                    '\n  '
                  )
                  .concat(
                    0 === f.length
                      ? ''
                      : 'admin '.concat(f.map(s.yR).join(',')),
                    '\n  ;\n'
                  )
                  .concat(
                    Object.entries(g)
                      .map((e) => {
                        let [n, a] = e;
                        return 'alter role '
                          .concat((0, s.yR)(t), ' set ')
                          .concat((0, s.yR)(n), ' = ')
                          .concat((0, s.i0)(a), ';');
                      })
                      .join('\n'),
                    '\n'
                  ),
              };
            },
            update: function (e, t) {
              let { id: n, name: a } = e,
                {
                  name: r,
                  isSuperuser: i,
                  canCreateDb: o,
                  canCreateRole: l,
                  inheritRole: c,
                  canLogin: d,
                  isReplicationRole: u,
                  canBypassRls: p,
                  connectionLimit: m,
                  password: h,
                  validUntil: f,
                } = t;
              return {
                sql: '\ndo $$\ndeclare\n  id oid := '
                  .concat(
                    void 0 === n
                      ? ''.concat((0, s.i0)(a), '::regrole')
                      : (0, s.i0)(n),
                    ";\n  old record;\nbegin\n  select * into old from pg_roles where oid = id;\n  if old is null then\n    raise exception 'Cannot find role with id %', id;\n  end if;\n\n  execute(format('alter role %I\n    "
                  )
                  .concat(
                    void 0 === i ? '' : i ? 'superuser' : 'nosuperuser',
                    '\n    '
                  )
                  .concat(
                    void 0 === o ? '' : o ? 'createdb' : 'nocreatedb',
                    '\n    '
                  )
                  .concat(
                    void 0 === l ? '' : l ? 'createrole' : 'nocreaterole',
                    '\n    '
                  )
                  .concat(
                    void 0 === c ? '' : c ? 'inherit' : 'noinherit',
                    '\n    '
                  )
                  .concat(void 0 === d ? '' : d ? 'login' : 'nologin', '\n    ')
                  .concat(
                    void 0 === u ? '' : u ? 'replication' : 'noreplication',
                    '\n    '
                  )
                  .concat(
                    void 0 === p ? '' : p ? 'bypassrls' : 'nobypassrls',
                    '\n    '
                  )
                  .concat(
                    void 0 === m
                      ? ''
                      : 'connection limit '.concat((0, s.i0)(m)),
                    '\n    '
                  )
                  .concat(
                    void 0 === h ? '' : 'password '.concat((0, s.i0)(h)),
                    '\n    '
                  )
                  .concat(
                    void 0 === f ? '' : 'valid until '.concat((0, s.i0)(f)),
                    "\n  ', old.rolname));\n\n  "
                  )
                  .concat(
                    void 0 === r
                      ? ''
                      : "\n  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.\n  if new_name != old.nspname then\n    execute(format('alter role %I rename to ".concat(
                          (0, s.yR)(r),
                          ";', old.nspname));\n  end if;\n  "
                        ),
                    '\nend\n$$;\n'
                  ),
              };
            },
            remove: function (e) {
              let { id: t, name: n } = e,
                { ifExists: a = !1 } =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              return {
                sql: '\ndo $$\ndeclare\n  id oid := '
                  .concat(
                    void 0 === t
                      ? ''.concat((0, s.i0)(n), '::regrole')
                      : (0, s.i0)(t),
                    ";\n  old record;\nbegin\n  select * into old from pg_roles where oid = id;\n  if old is null then\n    raise exception 'Cannot find role with id %', id;\n  end if;\n\n  execute(format('drop role "
                  )
                  .concat(
                    a ? 'if exists' : '',
                    " %I;', old.rolname));\nend\n$$;\n"
                  ),
              };
            },
            zod: o,
          },
          schemas: {
            list: function () {
              let {
                  includeSystemSchemas: e = !1,
                  limit: t,
                  offset: n,
                } = arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
                a = u;
              return (
                e ||
                  (a = ''
                    .concat(a, ' and not (n.nspname in (')
                    .concat(d.map(s.i0).join(','), '))')),
                t && (a = ''.concat(a, ' limit ').concat(t)),
                n && (a = ''.concat(a, ' offset ').concat(n)),
                { sql: a, zod: m }
              );
            },
            retrieve: function (e) {
              let { id: t, name: n } = e;
              return t
                ? {
                    sql: ''
                      .concat(u, ' and n.oid = ')
                      .concat((0, s.i0)(t), ';'),
                    zod: h,
                  }
                : {
                    sql: ''
                      .concat(u, ' and n.nspname = ')
                      .concat((0, s.i0)(n), ';'),
                    zod: h,
                  };
            },
            create: function (e) {
              let { name: t, owner: n } = e;
              return {
                sql: 'create schema '
                  .concat((0, s.yR)(t), '\n  ')
                  .concat(
                    void 0 === n ? '' : 'authorization '.concat((0, s.yR)(n)),
                    ';\n'
                  ),
              };
            },
            update: function (e, t) {
              let { id: n, name: a } = e,
                { name: r, owner: i } = t;
              return {
                sql: '\ndo $$\ndeclare\n  id oid := '
                  .concat(
                    void 0 === n
                      ? ''.concat((0, s.i0)(a), '::regnamespace')
                      : (0, s.i0)(n),
                    ';\n  old record;\n  new_name text := '
                  )
                  .concat(
                    void 0 === r ? null : (0, s.i0)(r),
                    ';\n  new_owner text := '
                  )
                  .concat(
                    void 0 === i ? null : (0, s.i0)(i),
                    ";\nbegin\n  select * into old from pg_namespace where oid = id;\n  if old is null then\n    raise exception 'Cannot find schema with id %', id;\n  end if;\n\n  if new_owner is not null then\n    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));\n  end if;\n\n  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.\n  if new_name is not null and new_name != old.nspname then\n    execute(format('alter schema %I rename to %I;', old.nspname, new_name));\n  end if;\nend\n$$;\n"
                  ),
              };
            },
            remove: function (e) {
              let { id: t, name: n } = e,
                { cascade: a = !1 } =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              return {
                sql: '\ndo $$\ndeclare\n  id oid := '
                  .concat(
                    void 0 === t
                      ? ''.concat((0, s.i0)(n), '::regnamespace')
                      : (0, s.i0)(t),
                    ';\n  old record;\n  cascade bool := '
                  )
                  .concat(
                    (0, s.i0)(a),
                    ";\nbegin\n  select * into old from pg_namespace where oid = id;\n  if old is null then\n    raise exception 'Cannot find schema with id %', id;\n  end if;\n\n  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));\nend\n$$;\n"
                  ),
              };
            },
            zod: p,
          },
          functions: a,
          tablePrivileges: {
            list: function () {
              let {
                  includeSystemSchemas: e = !1,
                  includedSchemas: t,
                  excludedSchemas: n,
                  limit: a,
                  offset: s,
                } = arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
                r = '\nwith table_privileges as ('.concat(
                  E,
                  ')\nselect *\nfrom table_privileges\n'
                ),
                i = f(t, n, e ? void 0 : d);
              return (
                i && (r += ' where schema '.concat(i)),
                a && (r += ' limit '.concat(a)),
                s && (r += ' offset '.concat(s)),
                { sql: r, zod: L }
              );
            },
            retrieve: function (e) {
              let { id: t, name: n, schema: a = 'public' } = e;
              return t
                ? {
                    sql: '\nwith table_privileges as ('
                      .concat(
                        E,
                        ')\nselect *\nfrom table_privileges\nwhere table_privileges.relation_id = '
                      )
                      .concat((0, s.i0)(t), ';'),
                    zod: I,
                  }
                : {
                    sql: '\nwith table_privileges as ('
                      .concat(
                        E,
                        ')\nselect *\nfrom table_privileges\nwhere table_privileges.schema = '
                      )
                      .concat((0, s.i0)(a), '\n  and table_privileges.name = ')
                      .concat((0, s.i0)(n), '\n'),
                    zod: I,
                  };
            },
            grant: function (e) {
              return {
                sql: '\ndo $$\nbegin\n'.concat(
                  e
                    .map((e) => {
                      let {
                        privilegeType: t,
                        relationId: n,
                        grantee: a,
                        isGrantable: r,
                      } = e;
                      return "execute format('grant "
                        .concat(t, ' on table %s to ')
                        .concat(
                          'public' === a.toLowerCase()
                            ? 'public'
                            : (0, s.yR)(a),
                          ' '
                        )
                        .concat(r ? 'with grant option' : '', "', ")
                        .concat(n, '::regclass);');
                    })
                    .join('\n'),
                  '\nend $$;\n'
                ),
              };
            },
            revoke: function (e) {
              return {
                sql: '\ndo $$\nbegin\n'.concat(
                  e
                    .map((e) => {
                      let { privilegeType: t, relationId: n, grantee: a } = e;
                      return "execute format('revoke "
                        .concat(t, ' on table %s from ')
                        .concat(
                          'public' === a.toLowerCase()
                            ? 'public'
                            : (0, s.yR)(a),
                          "', "
                        )
                        .concat(n, '::regclass);');
                    })
                    .join('\n'),
                  '\nend $$;\n'
                ),
              };
            },
            zod: R,
          },
        };
      },
      89140: function (e, t, n) {
        'use strict';
        n.d(t, {
          WU: function () {
            return l;
          },
          yR: function () {
            return i;
          },
          i0: function () {
            return o;
          },
        });
        let a = new Set([
          'AES128',
          'AES256',
          'ALL',
          'ALLOWOVERWRITE',
          'ANALYSE',
          'ANALYZE',
          'AND',
          'ANY',
          'ARRAY',
          'AS',
          'ASC',
          'ASYMMETRIC',
          'AUTHORIZATION',
          'BACKUP',
          'BETWEEN',
          'BINARY',
          'BLANKSASNULL',
          'BOTH',
          'BYTEDICT',
          'CASE',
          'CAST',
          'CHECK',
          'COLLATE',
          'COLUMN',
          'CONSTRAINT',
          'CREATE',
          'CREDENTIALS',
          'CROSS',
          'CURRENT_CATALOG',
          'CURRENT_DATE',
          'CURRENT_ROLE',
          'CURRENT_TIME',
          'CURRENT_TIMESTAMP',
          'CURRENT_USER',
          'CURRENT_USER_ID',
          'DEFAULT',
          'DEFERRABLE',
          'DEFLATE',
          'DEFRAG',
          'DELTA',
          'DELTA32K',
          'DESC',
          'DISABLE',
          'DISTINCT',
          'DO',
          'ELSE',
          'EMPTYASNULL',
          'ENABLE',
          'ENCODE',
          'ENCRYPT',
          'ENCRYPTION',
          'END',
          'EXCEPT',
          'EXPLICIT',
          'FALSE',
          'FETCH',
          'FOR',
          'FOREIGN',
          'FREEZE',
          'FROM',
          'FULL',
          'GLOBALDICT256',
          'GLOBALDICT64K',
          'GRANT',
          'GROUP',
          'GZIP',
          'HAVING',
          'IDENTITY',
          'IGNORE',
          'ILIKE',
          'IN',
          'INITIALLY',
          'INNER',
          'INTERSECT',
          'INTO',
          'IS',
          'ISNULL',
          'JOIN',
          'LATERAL',
          'LEADING',
          'LEFT',
          'LIKE',
          'LIMIT',
          'LOCALTIME',
          'LOCALTIMESTAMP',
          'LUN',
          'LUNS',
          'LZO',
          'LZOP',
          'MINUS',
          'MOSTLY13',
          'MOSTLY32',
          'MOSTLY8',
          'NATURAL',
          'NEW',
          'NOT',
          'NOTNULL',
          'NULL',
          'NULLS',
          'OFF',
          'OFFLINE',
          'OFFSET',
          'OLD',
          'ON',
          'ONLY',
          'OPEN',
          'OR',
          'ORDER',
          'OUTER',
          'OVERLAPS',
          'PARALLEL',
          'PARTITION',
          'PERCENT',
          'PLACING',
          'PRIMARY',
          'RAW',
          'READRATIO',
          'RECOVER',
          'REFERENCES',
          'REJECTLOG',
          'RESORT',
          'RESTORE',
          'RETURNING',
          'RIGHT',
          'SELECT',
          'SESSION_USER',
          'SIMILAR',
          'SOME',
          'SYMMETRIC',
          'SYSDATE',
          'SYSTEM',
          'TABLE',
          'TAG',
          'TDES',
          'TEXT255',
          'TEXT32K',
          'THEN',
          'TO',
          'TOP',
          'TRAILING',
          'TRUE',
          'TRUNCATECOLUMNS',
          'UNION',
          'UNIQUE',
          'USER',
          'USING',
          'VARIADIC',
          'VERBOSE',
          'WALLET',
          'WHEN',
          'WHERE',
          'WINDOW',
          'WITH',
          'WITHOUT',
        ]);
        function s(e) {
          return e.replace('T', ' ').replace('Z', '+00');
        }
        function r(e, t, n) {
          let a = '';
          for (let [s, r] of ((a += e ? ' (' : '('), t.entries()))
            a += (0 === s ? '' : ', ') + n(r);
          return a + ')';
        }
        function i(e) {
          if (null == e)
            throw Error('SQL identifier cannot be null or undefined');
          if (!1 === e) return '"f"';
          if (!0 === e) return '"t"';
          if (e instanceof Date) return '"'.concat(s(e.toISOString()), '"');
          if (Array.isArray(e)) {
            let t = [];
            for (let n of e) {
              if (!0 === Array.isArray(n))
                throw TypeError(
                  'Nested array to grouped list conversion is not supported for SQL identifier'
                );
              t.push(i(n));
            }
            return t.toString();
          }
          if (e === Object(e))
            throw Error('SQL identifier cannot be an object');
          let t = String(e).slice(0);
          if (
            !0 === /^[_a-z][\d$_a-z]*$/.test(t) &&
            !1 == !!a.has(t.toUpperCase())
          )
            return t;
          let n = '"';
          for (let e of t) n += '"' === e ? e + e : e;
          return n + '"';
        }
        function o(e) {
          let t,
            n = '';
          if (null == e) return 'NULL';
          if ('bigint' == typeof e) return BigInt(e).toString();
          if (e === Number.POSITIVE_INFINITY) return "'Infinity'";
          if (e === Number.NEGATIVE_INFINITY) return "'-Infinity'";
          if (Number.isNaN(e)) return "'NaN'";
          if ('number' == typeof e) return Number(e).toString();
          if (!1 === e) return "'f'";
          if (!0 === e) return "'t'";
          if (e instanceof Date) return "'".concat(s(e.toISOString()), "'");
          if (Array.isArray(e)) {
            let t = [];
            for (let [n, a] of e.entries())
              !0 === Array.isArray(a) ? t.push(r(0 !== n, a, o)) : t.push(o(a));
            return t.toString();
          }
          e === Object(e)
            ? ((t = 'jsonb'), (n = JSON.stringify(e)))
            : (n = String(e).slice(0));
          let a = !1,
            i = "'";
          for (let e of n)
            "'" === e
              ? (i += e + e)
              : '\\' === e
                ? ((i += e + e), (a = !0))
                : (i += e);
          return (
            (i += "'"),
            !0 === a && (i = 'E'.concat(i)),
            t && (i += '::'.concat(t)),
            i
          );
        }
        function l(e) {
          for (
            var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), a = 1;
            a < t;
            a++
          )
            n[a - 1] = arguments[a];
          return (function (e, t) {
            let n = 0,
              a = '%(%|(\\d+\\$)?[',
              l = RegExp((a += 'ILs])'), 'g');
            return e.replace(l, (e, a) => {
              if ('%' === a) return '%';
              let l = n,
                c = a.split('$');
              if (
                (c.length > 1 &&
                  ((l = Number.parseInt(c[0], 10) - 1), (a = c[1])),
                l < 0)
              )
                throw Error('specified argument 0 but arguments start at 1');
              if (l > t.length - 1) throw Error('too few arguments');
              return ((n = l + 1), 'I' === a)
                ? i(t[l])
                : 'L' === a
                  ? o(t[l])
                  : 's' === a
                    ? (function e(t) {
                        if (null == t) return '';
                        if (!1 === t) return 'f';
                        if (!0 === t) return 't';
                        if (t instanceof Date) return s(t.toISOString());
                        if (Array.isArray(t)) {
                          let n = [];
                          for (let [a, s] of t.entries())
                            null != s &&
                              (!0 === Array.isArray(s)
                                ? n.push(r(0 !== a, s, e))
                                : n.push(e(s)));
                          return n.toString();
                        }
                        return t === Object(t)
                          ? JSON.stringify(t)
                          : String(t).toString().slice(0);
                      })(t[l])
                    : void 0;
            });
          })(e, n);
        }
      },
      60153: function (e, t, n) {
        'use strict';
        n.d(t, {
          Z: function () {
            return i;
          },
        });
        var a = n(97458),
          s = n(55130),
          r = n.n(s),
          i = () =>
            (0, a.jsx)('div', {
              className:
                'w-full h-full flex flex-col items-center justify-center',
              'data-sentry-component': 'LogoLoader',
              'data-sentry-source-file': 'LogoLoader.tsx',
              children: (0, a.jsx)('div', {
                children: (0, a.jsx)('svg', {
                  width: '60',
                  height: '62',
                  viewBox: '0 0 60 62',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                  className: r().loading,
                  'data-sentry-element': 'svg',
                  'data-sentry-source-file': 'LogoLoader.tsx',
                  children: (0, a.jsx)('path', {
                    d: 'M30.2571 4.12811L30.257 4.12389C30.2133 1.21067 26.5349 -0.034778 24.7224 2.24311L1.76109 31.0996C-1.21104 34.8348 1.45637 40.34 6.23131 40.34H29.4845L29.7563 58.4432C29.8 61.3564 33.4783 62.6016 35.2908 60.324L34.8996 60.0127L35.2908 60.324L58.2521 31.4674C61.2241 27.7322 58.5568 22.227 53.782 22.227H30.3762L30.2571 4.12811Z',
                    stroke: 'hsl(var(--brand-default))',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    'data-sentry-element': 'path',
                    'data-sentry-source-file': 'LogoLoader.tsx',
                  }),
                }),
              }),
            });
      },
      70114: function (e, t, n) {
        'use strict';
        n.d(t, {
          v: function () {
            return i;
          },
        });
        var a = n(71607),
          s = n.n(a),
          r = n(34549);
        let i = async function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : s();
          if (window.document.hasFocus()) {
            var n;
            if (
              null === (n = navigator.clipboard) || void 0 === n
                ? void 0
                : n.write
            ) {
              let n = new ClipboardItem({
                'text/plain': Promise.resolve(e).then(
                  (e) => new Blob([e], { type: 'text/plain' })
                ),
              });
              navigator.clipboard.write([n]).then(t);
            } else
              Promise.resolve(e)
                .then((e) => {
                  var t;
                  return null === (t = navigator.clipboard) || void 0 === t
                    ? void 0
                    : t.writeText(e);
                })
                .then(t);
          } else r.Am.error('Unable to copy to clipboard');
        };
      },
      55130: function (e) {
        e.exports = {
          loading: 'loading-anim_loading__rDN7u',
          dash: 'loading-anim_dash__HIPR0',
        };
      },
    },
  ]));
