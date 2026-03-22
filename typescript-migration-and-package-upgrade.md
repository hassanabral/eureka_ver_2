# Plan: Migrate to TypeScript & Upgrade All Packages

## Progress

### Phase 1: CRA to Vite + TypeScript Foundation
- [x] Install vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom
- [x] Create vite.config.ts, tsconfig.json, tsconfig.node.json
- [x] Move public/index.html to root with Vite script tag
- [x] Convert keys.js/keys_prod.js from CommonJS to ES module with import.meta.env.VITE_*
- [x] Replace all process.env.REACT_APP_* with import.meta.env.VITE_*
- [x] Remove serviceWorker.js and its registration in index.js
- [x] Remove module.hot HMR block in index.js
- [x] Update package.json scripts (remove react-scripts, add vite scripts)
- [x] Rename all .js files to .jsx for Vite compatibility (full .tsx rename deferred to Phase 2)
- [x] Verify: npm run dev starts and npm run build succeeds

### Phase 2: Convert All JS Files to TypeScript
- [ ] Define domain types in src/types/index.ts
- [ ] Define Redux types and typed hooks
- [ ] Convert utility & form components (13 files)
- [ ] Convert leaf components (~16 files)
- [ ] Convert Redux slices & actions (4 files)
- [ ] Convert page components (~18 files)
- [ ] Install type packages (@types/react-router-dom, etc.)
- [ ] Create custom declarations for react-redux-firebase, redux-firestore, revalidate
- [ ] Verify: npm run build has zero TS errors

### Phase 3: React 16 to React 18
- [ ] Update index.tsx to use createRoot
- [ ] Install react@18, react-dom@18, @types/react@18, @types/react-dom@18
- [ ] Fix StrictMode double-fire effects
- [ ] Verify: App renders correctly

### Phase 4: React Router 5 to React Router 6
- [ ] Replace Switch with Routes, update Route syntax
- [ ] Replace useHistory with useNavigate
- [ ] Replace match.params with useParams
- [ ] Remove withRouter HOC usages
- [ ] Refactor action creators to not receive history
- [ ] Remove react-router-last-location
- [ ] Verify: All routes and navigation work

### Phase 5: Firebase SDK 7 to 10 (Compat Layer)
- [ ] Update firebase imports to compat paths
- [ ] Install firebase@10
- [ ] Verify: Auth, Firestore, Storage all work

### Phase 6: Remove react-redux-firebase & redux-firestore
- [ ] Create modular Firebase init
- [ ] Create useAuth hook
- [ ] Create useFirestoreQuery hook
- [ ] Create authSlice
- [ ] Refactor postActions and userActions to modular SDK
- [ ] Refactor auth calls
- [ ] Update rootReducer
- [ ] Update PrivateRoute
- [ ] Remove react-redux-firebase, redux-firestore packages
- [ ] Verify: All Firestore interactions work

### Phase 7: Material-UI v4 to MUI v5
- [ ] Install @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
- [ ] Run MUI codemods
- [ ] Migrate createMuiTheme to createTheme
- [ ] Replace makeStyles with sx prop or styled()
- [ ] Update icon imports
- [ ] Remove @material-ui/core, @material-ui/icons
- [ ] Verify: Visual parity on every page

### Phase 8: Replace moment.js with date-fns
- [ ] Replace moment().fromNow() with formatDistanceToNow in 4 files
- [ ] Remove moment package
- [ ] Verify: Date formatting works

### Phase 9: Replace redux-form with react-hook-form
- [ ] Install react-hook-form
- [ ] Refactor 5 forms to useForm
- [ ] Refactor form input components
- [ ] Replace revalidate validators
- [ ] Remove redux-form, revalidate, FormReducer
- [ ] Verify: All forms work

### Phase 10: Replace react-redux-toastr with notistack
- [ ] Install notistack, wrap app with SnackbarProvider
- [ ] Replace toastr calls with enqueueSnackbar
- [ ] Remove react-redux-toastr, ToastrReducer
- [ ] Verify: Notifications work

### Phase 11: Upgrade Remaining Packages
- [ ] Upgrade @reduxjs/toolkit to 2.x
- [ ] Upgrade react-redux to 9.x
- [ ] Upgrade/replace CKEditor
- [ ] Replace react-html-parser with html-react-parser
- [ ] Replace react-infinite-scroller
- [ ] Replace cuid with nanoid
- [ ] Upgrade testing libraries
- [ ] Verify: Build succeeds

### Phase 12: Cloud Functions Upgrade
- [ ] Upgrade Node runtime to 20
- [ ] Upgrade firebase-admin and firebase-functions
- [ ] Update functions/index.js imports
- [ ] Verify: Functions deploy/work

### Phase 13: Final Cleanup
- [ ] Remove allowJs from tsconfig
- [ ] Enable stricter TS settings
- [ ] Eliminate remaining any types
- [ ] Update firebase.json hosting public to dist
- [ ] Update CI/CD workflow
- [ ] Verify: Final build and bundle check

---

## Context

Eureka v2 is a React/Firebase social platform (~64 JS files, ~9,300 LOC) built in 2020 with significantly outdated dependencies: React 16, Material-UI v4, Firebase 7, React Router 5, CRA 3.4, and Redux Toolkit 1.3. The project has zero TypeScript usage. Several key libraries (`react-redux-firebase`, `redux-firestore`, `moment`, `redux-form`) are unmaintained or deprecated. The Cloud Functions target Node.js 8 (EOL).

This plan migrates the entire codebase to TypeScript and upgrades all packages to current versions, done incrementally so the app stays functional at each step.

---

## Phase 1: CRA to Vite + TypeScript Foundation

CRA is deprecated; replacing it first gives us fast rebuilds for every subsequent phase and native TS support.

**Files to create/modify:**
- Create `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `.env.example`
- Modify `package.json` (scripts, remove `react-scripts`)
- Move `public/index.html` to root, add `<script type="module" src="/src/index.js">`
- Convert `src/app/config/keys.js` from CommonJS `require()` to ES module using `import.meta.env.VITE_*`
- Replace all `process.env.REACT_APP_*` with `import.meta.env.VITE_*` across the codebase
- Remove `serviceWorker.js` and its registration in `index.js`
- Remove `module.hot` HMR block in `index.js`

**Install:** `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`

**Rename initial files to `.tsx`/`.ts`:** `index.js`, `App.js`, `store.js`, `rootReducer.js`, `firebase.js` — with `allowJs: true` in tsconfig so all remaining `.js` files still work.

**Verify:** `npm run dev` starts, `npm run build` succeeds.

---

## Phase 2: Convert All JS Files to TypeScript

With `allowJs: true`, we convert incrementally in dependency order (leaves first).

**Step 1 — Define domain types** in `src/types/index.ts`:
- `Post`, `Comment`, `UserProfile`, `Tag`, `Bookmark` interfaces matching Firestore document shapes

**Step 2 — Define Redux types** in `src/app/store.ts`:
- Export `RootState`, `AppDispatch`, create typed hooks (`useAppDispatch`, `useAppSelector`) in `src/app/hooks.ts`

**Step 3 — Convert in tiers:**
1. Utilities & form components (13 files): `helpers`, `validator`, `Spinner`, `Loading`, `TextInput`, etc.
2. Leaf components (~16 files): `FeedCardButtons`, `UserCard`, `PostDetailedBody`, etc.
3. Redux slices & actions (4 files): `postSlice`, `userSlice`, `postActions`, `userActions`
4. Page components (~18 files): `FeedsPage`, `PostDetailed`, `Dashboard`, etc.
5. Root files (already done in Phase 1, now add full types)

**Type packages to install:** `@types/react-router-dom`, `@types/react-redux`, `@types/redux-form`, `@types/react-redux-toastr`, `@types/react-html-parser`, `@types/react-infinite-scroller`

**Custom declarations needed for:** `react-redux-firebase`, `redux-firestore`, `revalidate` (no `@types` exist)

**Verify:** `npm run build` has zero TS errors.

---

## Phase 3: React 16 to React 18

**Modify:**
- `src/index.tsx`: Replace `ReactDOM.render(...)` with `createRoot(document.getElementById('root')!).render(...)`; import from `react-dom/client`
- Fix Firestore `onSnapshot` listeners in `postActions.ts` — add proper cleanup for `useEffect` (React 18 StrictMode double-fires effects)

**Install:** `react@18`, `react-dom@18`, `@types/react@18`, `@types/react-dom@18`

**Verify:** App renders, no double-subscription bugs in dev mode.

---

## Phase 4: React Router 5 to React Router 6

Completely new API — this touches `App.tsx` and ~10 other files.

**Key changes:**
| v5 | v6 | Files affected |
|----|-----|----------------|
| `<Switch>` | `<Routes>` | `App.tsx` |
| `<Route component={X}>` | `<Route element={<X />}>` | `App.tsx` (7 routes) |
| `path='/(.+)'` regex | `path='/*'` with nested layout | `App.tsx` |
| `<Redirect>` | `<Navigate>` | `PrivateRoute.tsx` |
| `useHistory()` / `history.push()` | `useNavigate()` / `navigate()` | ~6 components + `postActions`, `userActions` |
| `match.params` via props | `useParams()` hook | `PostDetailed`, `UserDetailedPage` |
| `withRouter` HOC | Remove (use hooks) | `ResponsiveDrawer`, `EditPost` |

**Refactor action creators:** `postActions.ts` and `userActions.ts` currently receive `history` as a parameter. Refactor so the component calls `navigate()` after dispatching instead.

**Remove:** `react-router-last-location` (unused in code)

**Verify:** All routes render, deep-linking works, navigation works.

---

## Phase 5: Firebase SDK 7 to 10 (Compat Layer)

Upgrade Firebase but use the compat import paths so `react-redux-firebase` still works. This decouples the Firebase upgrade from the RRF removal.

**Modify `src/app/firebase.ts`:**
```typescript
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
```

**Install:** `firebase@10`

**Verify:** Auth, Firestore reads/writes, real-time listeners all work.

---

## Phase 6: Remove react-redux-firebase & redux-firestore (Highest Risk)

These unmaintained libraries are deeply integrated (used in ~20 files). Replace with direct Firebase modular SDK usage.

**Create:**
- `src/app/firebase/index.ts` — modular Firebase init (`getAuth`, `getFirestore`, `getStorage`)
- `src/app/hooks/useAuth.ts` — custom hook wrapping `onAuthStateChanged`, replacing `state.firebase.auth`, `isLoaded()`, `isEmpty()`
- `src/app/hooks/useFirestoreQuery.ts` — custom hook replacing `useFirestoreConnect` (5 usages) with direct `onSnapshot` calls using local state
- `src/features/auth/authSlice.ts` — Redux slice for auth state

**Refactor:**
- `postActions.ts` and `userActions.ts`: Replace compat Firestore calls with modular SDK (`collection()`, `doc()`, `addDoc()`, `serverTimestamp()`, etc.). Import db directly instead of receiving it as a parameter.
- Auth: Replace `firebase.login({ provider: "google", type: "popup" })` with `signInWithPopup(auth, new GoogleAuthProvider())`
- `rootReducer.ts`: Remove `firebaseReducer` and `firestoreReducer`, add `authSlice`
- `PrivateRoute.tsx`: Replace `isLoaded(auth) && !isEmpty(auth)` with new auth state check
- All 9 `useFirestore()` and 7 `useFirebase()` call sites

**Remove:** `react-redux-firebase`, `redux-firestore`

**Verify:** Test every Firestore interaction — login/logout, feed loading, post CRUD, comments/replies, likes, bookmarks, dashboard, tags, user profiles, edit profile.

---

## Phase 7: Material-UI v4 to MUI v5

**Install:** `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`

**Steps:**
1. Run MUI codemods: `npx @mui/codemod v5.0.0/preset-safe src/`
2. `createMuiTheme` -> `createTheme` in `App.tsx`
3. Migrate custom `theme.colors` to `theme.palette.custom` with module augmentation
4. Replace `makeStyles` (~15 components) with `sx` prop (simple styles) or `styled()` (complex styles like `ResponsiveDrawer`)
5. Replace deprecated `Hidden` component with responsive `sx` display props
6. Update all icon imports: `@material-ui/icons/*` -> `@mui/icons-material/*`

**Remove:** `@material-ui/core`, `@material-ui/icons`

**Verify:** Visual parity on every page, responsive behavior intact.

---

## Phase 8: Replace moment.js with date-fns

Only 4 files use `moment(x).fromNow()`. Replace with `formatDistanceToNow(x, { addSuffix: true })`.

**Files:** `FeedCard`, `PostDetailedComment`, `PostDetailedBody`, `DashboardPostCard`

**Remove:** `moment`

---

## Phase 9: Replace redux-form with react-hook-form

5 forms use `reduxForm()` HOC: `AddPost`, `EditPost`, `PostDetailedAddComment`, `PostDetailedReplyForm`, `EditProfile`.

**Steps:**
1. Install `react-hook-form` (and optionally `zod` + `@hookform/resolvers` for validation)
2. Refactor each form: remove `reduxForm()` HOC, use `useForm()` hook, replace `<Field>` with `<Controller>`
3. Refactor form input components (`TextInput`, `TextArea`, `SelectInput`, `RichEditor`) from `{ input, meta }` props to react-hook-form's `Controller` pattern
4. Replace `revalidate` validators with RHF built-in validation or zod schemas
5. Move form reset calls from action creators into components
6. Remove `FormReducer` from `rootReducer.ts`

**Remove:** `redux-form`, `revalidate`

---

## Phase 10: Replace react-redux-toastr with notistack

notistack uses MUI's Snackbar under the hood, inheriting the project theme automatically.

**Steps:**
1. Install `notistack`, wrap app with `<SnackbarProvider>`
2. Replace `toastr.success/error()` calls (~6 locations) with `enqueueSnackbar()`
3. For calls in action creators (outside React), create a ref-based global snackbar utility
4. Remove `ReduxToastr` component, `ToastrReducer`

**Remove:** `react-redux-toastr`

---

## Phase 11: Upgrade Remaining Packages

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `@reduxjs/toolkit` | 1.3.6 | 2.x | Already uses `configureStore`/`createSlice`, minimal impact |
| `react-redux` | 7.2.0 | 9.x | Better TS types, same hooks API |
| `@ckeditor/ckeditor5-*` | 19.0 | Latest | Import structure changed significantly in v40+; evaluate migration vs switching to `@tiptap/react` |
| `react-html-parser` | 2.0.2 | Replace with `html-react-parser` | Original is unmaintained |
| `react-infinite-scroller` | 1.2.4 | Replace with Intersection Observer hook or `react-infinite-scroll-component` | Only used in `FeedsPageBody` |
| `cuid` | 2.1.8 | Replace with `nanoid` | cuid is deprecated by author |
| Testing libs | 9.x / 4.x / 7.x | Latest | `@testing-library/react`, `jest-dom`, `user-event` |

---

## Phase 12: Cloud Functions Upgrade

**Modify `functions/package.json`:**
- `"node": "8"` -> `"node": "20"`
- Upgrade `firebase-admin` to latest, `firebase-functions` to latest
- Upgrade eslint and dev deps

**Modify `functions/index.js`:**
- Use `firebase-functions/v1` import for existing triggers (simplest migration)
- `admin.initializeApp(functions.config().firebase)` -> `admin.initializeApp()`
- Optionally convert to TypeScript (`functions/src/index.ts` + `functions/tsconfig.json`)

**Update `firebase.json`** if needed for new runtime.

**Verify:** Test all 8 Firestore triggers via emulator.

---

## Phase 13: Final Cleanup

- Remove `allowJs: true` from `tsconfig.json`
- Enable stricter TS settings (`noUncheckedIndexedAccess`)
- Eliminate any remaining `any` types
- Update `firebase.json` hosting `public` from `"build"` to `"dist"` (Vite output)
- Update CI/CD workflow (`.github/workflows/deploy.yml`) for Vite build + Node 20
- Run `npx vite-bundle-visualizer` to check bundle size

---

## Verification Strategy

After each phase, run:
1. `npm run dev` — app starts without errors
2. `npm run build` — production build succeeds with zero TS errors
3. Manual QA checklist:
   - Landing page renders
   - Feed loads posts
   - Google login/logout
   - Create, edit, delete post
   - Comments and replies
   - Like/unlike posts and comments
   - Bookmarks
   - Dashboard
   - Tags page
   - User profile page
   - Edit profile
   - Navigation (drawer, bottom nav on mobile)

---

## Critical Files (Most Impacted)

- `src/index.tsx` — entry point, touches Phases 1, 3, 6, 10
- `src/App.tsx` — routing + theme + styles, touches Phases 1, 4, 7
- `src/app/rootReducer.ts` — 4 of 6 reducers get removed/replaced (Phases 6, 9, 10)
- `src/features/post/postActions.ts` — largest file (365 LOC), deepest Firebase/RRF integration
- `src/features/user/userActions.ts` — auth + profile Firebase operations
- `src/app/firebase.ts` — Firebase init, rewritten in Phases 5-6
- `functions/index.js` — all 8 Cloud Function triggers
