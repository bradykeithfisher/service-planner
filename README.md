# ✦ Service Planner

Plan worship services from your Planning Center library, with AI song suggestions.

**Live app:** `https://YOUR-USERNAME.github.io/service-planner`

---

## Setup (one-time, ~10 minutes)

### 1. Create a GitHub repo

1. Create a new repo called `service-planner` on GitHub
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/service-planner.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**, set source to **Deploy from branch**, branch `main`, folder `/docs`. Save.

---

### 2. Deploy the Supabase Edge Function

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Log in: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_ID`
4. Deploy the function:
   ```bash
   supabase functions deploy planning-center
   ```

---

### 3. Add Planning Center secrets to Supabase

1. Go to your Supabase project → **Edge Functions → Secrets** (or use CLI):
   ```bash
   supabase secrets set PCO_APP_ID=your_app_id PCO_SECRET=your_secret
   ```
2. Get your credentials from Planning Center:
   - Go to https://api.planningcenteronline.com/oauth/applications
   - Click **Personal Access Tokens → New Token**
   - Copy the **Application ID** and **Secret**

---

### 4. Configure the frontend

1. Go to your Supabase project → **Settings → API**
2. Copy your **Project URL** and **anon/public key**
3. Edit `docs/config.js`:
   ```js
   window.PLANNER_CONFIG = {
     supabaseUrl:     "https://xxxx.supabase.co",
     supabaseAnonKey: "eyJhbGci...",
   };
   ```
4. Commit and push:
   ```bash
   git add docs/config.js
   git commit -m "Add Supabase config"
   git push
   ```

GitHub Pages will redeploy in ~30 seconds. Visit your Pages URL and click **Load My Library**.

---

## Using the app

- **Browse** — search songs by title, author, or theme. Filter by topic chips (auto-generated from your song tags in Planning Center).
- **AI Suggestions** — type a sermon topic and get 5–7 song recommendations pulled from your actual library.
- **Set Builder** — click songs to add them to your service set. Name it, then copy to clipboard.

---

## Security notes

- Your Planning Center credentials live only in Supabase Secrets — never in the frontend code.
- The Supabase anon key is public by design (it only grants access to your Edge Function, not your database).
- The app only reads your Planning Center song library (read-only API calls).
