# Pioneer Technical Institute — Website

Plain static site (no build step, no npm install needed) with a full
add/edit/delete control panel at `/admin` powered by Decap CMS.

## Deploy tonight (15–20 min)

1. **Create a GitHub repo** and push this whole folder to it.
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - netlify.com → "Add new site" → "Import an existing project" → pick your GitHub repo.
   - Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
   - Deploy — you'll get a live URL like `random-name-123.netlify.app` immediately.

3. **Turn on the control panel (required for /admin to work)**
   - In Netlify: Site configuration → Identity → **Enable Identity**.
   - Identity → Registration → set to **Invite only** (so random people can't sign up).
   - Identity → Services → **Enable Git Gateway**.
   - Identity → Invite users → send an invite to whoever will manage content (your boss, admin staff). They'll get an email to set a password.
   - They then log in at `yoursite.netlify.app/admin/`.

4. **Connect the custom domain**
   - Once `pioneertechnicalinstitute.ac.ug` is registered, go to Site configuration → Domain management → Add custom domain.
   - Update the domain's DNS at your registrar to point to Netlify (Netlify shows you the exact records — usually an A record or nameserver change). This can take a few hours to propagate, so do it as early as possible.
   - Netlify issues free HTTPS automatically once DNS resolves.

5. **Contact form** — already wired for Netlify Forms (`contact.html`). No setup needed; submissions show up in Netlify under Forms once the site is live.

## How the control panel works

Everything editable lives in `/admin`. Each section below is a Decap CMS
collection — full add / edit / delete, no code:

- **Site Settings** — contact numbers, address, hours, mission/vision, homepage stats
- **Staff** — add/remove staff, edit name/title/phone/photo
- **Courses** — full catalog, one entry per course. Each course has: category,
  level, duration, credential, delivery mode, a photo, an "About this
  programme" write-up, an Admission Requirements list, a "What You Will
  Learn" list, and a Career Opportunities table. Staff can add a brand-new
  course, delete one, or edit any field/photo — no code needed. Every course
  automatically gets its own detail page at `course-detail.html?slug=...`
  (linked from the Courses page and the homepage), styled like a university
  programme page: hero, About, Quick Facts, Admission Requirements, What
  You'll Learn, Career Opportunities, an Apply/Contact call-to-action, and
  Related Programmes from the same category.
- **News** — add/edit/delete news posts with photo, date, excerpt, full story
- **Gallery** — add/remove photos with captions
- **Pages** — edit the wording on the Home, About, and Admissions pages

Every save is a Git commit → Netlify rebuilds (~1 min) → site updates live.

## Known placeholders — fix before/soon after launch

- **Gallery photos** currently hotlink to the *old* site's media URLs.
  Re-upload real photos through `/admin` → Gallery as soon as possible —
  once the old site changes or goes offline those links will break.
- **News** starts empty — add the first post from `/admin` → News.
- **Staff photos** are blank — add real photos via `/admin` → Staff for
  a more finished look.
- The old site's Alumni and Success Stories pages were placeholder
  "Lorem ipsum" template content (fake names/testimonials) — this
  rebuild deliberately leaves those out. Add real alumni stories later
  once the institute has actual testimonials to share.

## Local preview (optional)

No build tools needed — just open `index.html` in a browser, or run:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`. Note: `/admin` login (Netlify Identity)
only works once deployed to Netlify — it won't work in local preview.
