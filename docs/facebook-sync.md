# Facebook → News sync

New posts on the school's Facebook Page are imported once a day as news items in Sanity, and appear on `/news` and the home page.

The sync is **off** until the environment variables below are set. Until then `/api/facebook-sync` returns `{ "skipped": true }` and changes nothing.

## How it works

1. A Vercel cron job (`vercel.json`) calls `/api/facebook-sync` every day at 05:00 UTC (07:00 SAST).
2. The route reads the Page's latest posts through the official Facebook Graph API.
3. Each post that isn't imported yet becomes a Sanity `news` document:
   - **Title:** the first sentence of the post
   - **Excerpt:** the next ~200 characters
   - **Body:** the full post text
   - **Cover image:** the post photo, uploaded to Sanity
   - **Category:** "Announcement"
   - **Link:** a "View this post on Facebook" link to the original post
4. The news pages are refreshed.

Posts without text are skipped. Set `FACEBOOK_SYNC_HASHTAG` (e.g. `#nuus`) to import only posts that contain that hashtag.

## Editing imported posts

Imported posts are normal news items in `/admin`. Staff can change the title, category, text or image, and the sync will not overwrite those changes.

To remove an imported post from the website, tick **Hide from Website**. Don't delete it: a deleted post is imported again on the next run.

Edits made on Facebook after a post has been imported are not synced.

## Setup

### 1. Sanity write token
1. Go to [sanity.io/manage](https://www.sanity.io/manage), open the project, then **API → Tokens → Add API token**.
2. Choose **Editor** permissions.
3. Save the token as `SANITY_API_WRITE_TOKEN`.

### 2. Facebook Page token (needs a Page admin)
1. Go to [developers.facebook.com](https://developers.facebook.com/), click **My Apps → Create App** and choose the **Business** type.
2. In **Graph API Explorer**, select the app and click **Get Page Access Token**. Log in as a Page admin and grant `pages_show_list`, `pages_read_engagement` and `pages_read_user_content`.
3. Make the token long-lived:
   - Exchange the short-lived *user* token for a long-lived one:
     `GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-token}`
   - Then call `GET /me/accounts?access_token={long-lived-user-token}`.
   - The `access_token` returned for the school Page **does not expire**. Save it as `FACEBOOK_PAGE_ACCESS_TOKEN`.
   - Save that Page's `id` as `FACEBOOK_PAGE_ID`.
4. The app can stay in Development mode, so no App Review is needed. This works because the token belongs to a Page admin who has a role on the app.

The Page token stops working if that admin changes their Facebook password, loses their admin role, or removes the app. If that happens, repeat step 2.

### 3. Vercel
1. In **Settings → Environment Variables**, add `SANITY_API_WRITE_TOKEN`, `FACEBOOK_PAGE_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN` and `CRON_SECRET` (any long random string).
2. Optionally add `FACEBOOK_SYNC_HASHTAG` and `FACEBOOK_SYNC_LIMIT`.
3. Redeploy. Cron jobs only run on production deployments.

### 4. Test it
Run the sync once by hand:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.co.za/api/facebook-sync
```

The response shows how many posts were checked and imported. Check the news items in `/admin`.

## Notes
- Vercel's Hobby plan allows one cron run per day. On Pro you can change the schedule in `vercel.json`, e.g. `"0 * * * *"` for hourly.
- The first run imports up to `FACEBOOK_SYNC_LIMIT` recent posts (default 10).
