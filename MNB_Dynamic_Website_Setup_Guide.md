# MNB College Dynamic Website Setup Guide

## What was added

The existing public design was retained while the changing content was connected to PostgreSQL and a protected admin dashboard.

Admin sections:

- Home page pictures
- Gallery pictures
- Photos
- Videos
- News
- Events
- Fee structures and fee items

The administrator can add new media, replace an existing item, hide/show it, reorder it, or delete it.

## 1. Extract and open the project

Extract the ZIP, open the project folder in VS Code, and open a terminal in the same folder as `package.json`.

## 2. Install packages

```bash
npm install
```

## 3. Create the Neon PostgreSQL database

1. Sign in to Neon.
2. Create or open the database for the MNB website.
3. Open the SQL Editor.
4. Copy and run the entire file:

```text
database/schema.sql
```

This creates the media, news, events, fee structure and fee item tables. It also inserts initial records that use the images and videos already in the `public` folder.

## 4. Create Vercel Blob storage

Uploaded files cannot be saved permanently inside a running Vercel project. Vercel Blob is therefore used for persistent image, video and PDF storage.

1. Open the project in Vercel.
2. Go to **Storage**.
3. Create a **Blob** store.
4. Connect it to this project.
5. Vercel will add `BLOB_READ_WRITE_TOKEN` automatically.

For local development, copy the Blob token into `.env.local`.

## 5. Create `.env.local`

Create `.env.local` in the project root:

```env
DATABASE_URL=your_neon_postgresql_connection_string
ADMIN_PASSWORD=choose_a_strong_admin_password
BLOB_READ_WRITE_TOKEN=your_vercel_blob_read_write_token
OPENAI_API_KEY=your_openai_key_only_if_the_chatbot_uses_ai
```

Do not upload `.env.local` to GitHub.

## 6. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin login:

```text
http://localhost:3000/admin/login
```

Use the password set in `ADMIN_PASSWORD`.

## 7. Admin workflow

### Images and videos

Open `/admin/media`.

1. Select Home, Gallery, Photos or Videos.
2. To add an item, leave **Replace existing item** set to **Add to list**.
3. To replace an item, select it under **Replace existing item**.
4. Enter a title, description and display order.
5. Select the image or video.
6. Click **Add Media** or **Replace Media**.

The eye button publishes or hides an item. The red button deletes its database record.

### News

Open `/admin/news`, then click **Add News**. Published news appears at `/news` under the Notifications menu.

### Events

Open `/admin/events`, add the title, date, venue and description. Published events appear at `/events`.

### Fees

Open `/admin/fees`.

1. Create and activate a fee structure.
2. Optionally upload the official PDF.
3. Add fee items and assign each to a group such as New Students, Boarders or Day Scholars.
4. The active fee structure appears at `/admissions/fees`.

## 8. Push to GitHub

Confirm `.env.local` is ignored, then run:

```bash
git add .
git commit -m "Add dynamic website admin dashboard"
git push origin main
```

## 9. Configure Vercel environment variables

In Vercel, open **Project Settings → Environment Variables** and add:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `BLOB_READ_WRITE_TOKEN` (usually added by Blob storage)
- `OPENAI_API_KEY` only when required

Select Production, Preview and Development as appropriate, then redeploy.

## Important notes

- Uploaded media is stored in Vercel Blob; the URL and content details are stored in PostgreSQL.
- Existing files in `public` remain available and are used as fallbacks.
- Deleting a media entry removes the database record. It does not currently delete the physical Blob object, which prevents accidental permanent file loss.
- The current password-only admin login was retained to minimise design and structural changes. Use a long, unique `ADMIN_PASSWORD`.
