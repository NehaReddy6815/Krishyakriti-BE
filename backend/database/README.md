Database helpers

This folder contains helper scripts to connect to MongoDB and seed or import initial data used by the backend.

Files of interest
- `db.js` - helper to connect to MongoDB using `process.env.MONGO_URI`.
- `seed.js` - inserts default `Resource` documents (used by `/api/learn`).
- `import.js` - reads `backend/database/data.json` and upserts resources into the `resources` collection.
- `data.json` - example file you can replace with your own resource array for import.
- `farmerData.js` - script to insert farmer contact data (uses `Farmer` model).
- `check.js` - simple script to print existing `Resource` documents for verification.
- `loadResources.js` - loads every JSON file in `database/data/` into the `resources` collection (clears existing resources first).
- `import.js` - reads `backend/database/data.json` and upserts resources into the `resources` collection.
- `data.json` - example file you can replace with your own resource array for import.
- `farmerData.js` - script to insert farmer contact data (uses `Farmer` model).
- `check.js` - simple script to print existing `Resource` documents for verification.

How to configure
1. Copy `.env.example` from the `backend` folder to `backend/.env` and set `MONGO_URI`.

Commands

Install dependencies (from `backend`):

```powershell
cd backend
npm install
```

Seed the default resources (only if you want the three sample Learn resources):

```powershell
cd backend
npm run seed
```

Load all JSON files located in `backend/database/data/` into the DB (this will delete current `resources` collection first):

```powershell
# Database helpers

This folder contains helper scripts to connect to MongoDB and load or import content used by the backend APIs.

## Files of interest
- `db.js` — helper to connect to MongoDB using `process.env.MONGO_URI`.
- `seed.js` — legacy seeder that inserts three sample `Resource` documents.
- `loadResources.js` — loads every JSON file in `database/data/` into the `resources` collection. It clears the collection first.
- `import.js` — imports an array of resources from `database/data.json` and upserts by `slug` (keeps existing resources and updates or inserts new ones).
- `data/` — directory containing JSON resource files you added (e.g. `multicropping.json`, `agroforestry.json`, `market.json`).
- `farmerData.js` — script to insert farmer contact data (uses the `Farmer` model). The script currently inserts records as provided; consider upsert if you re-run it.
- `check.js` — quick script to print existing `Resource` documents for verification.

## New: JSON resource files
You added three resource files in `database/data/`:

- `multicropping.json`
- `agroforestry.json`
- `market.json`

Each file should contain a single JSON object with the following recommended fields (the loader will insert whatever fields are present):

- `slug` (string, required): unique identifier used in URLs (e.g. `multicropping`).
- `title` (string, required): display title.
- `summary` (string): short summary shown on lists/cards.
- `content` (string): HTML or plain text body.
- `sections` (array): optional array of { heading, text } objects for structured content.
- `tags` (array of strings): optional tags for filtering/search.
- `resources` (array): optional list of related links/objects.
- `createdAt` / `updatedAt` (ISO strings): optional timestamps; otherwise Mongo will add timestamps if schema supports them.

Example (from `multicropping.json`):

```json
{
	"slug": "multicropping",
	"title": "Multicropping",
	"summary": "Growing two or more crops in the same field",
	"content": "Multicropping is the practice...",
	"sections": [{ "heading": "Types of Multicropping", "text": "1. Intercropping..." }],
	"tags": ["crop rotation", "intercropping"]
}
```

## Loader behavior (`loadResources.js`)

- Connects to MongoDB using `MONGO_URI` from `backend/.env`.
- Reads all `.json` files from `backend/database/data/`.
- Deletes all documents in the `resources` collection (`Resource.deleteMany({})`).
- Inserts each JSON object as a new `Resource` document.

**Important:** `loadResources.js` clears the `resources` collection before inserting files. Use this for full replacement loads. If you prefer to preserve existing content or update only changed files, use `import.js` (upsert) or I can change `loadResources.js` to upsert by `slug`.

## How to use

1. Add or edit resource JSON files under `backend/database/data/` — each file should be a single JSON object as described above.
2. Ensure `backend/.env` contains a valid `MONGO_URI` (copy `.env.example` and set the value).
3. Install dependencies and run the loader:

```powershell
cd backend
npm install
npm run load:resources
```

## Other helper commands

- `npm run seed` — run the legacy `seed.js` (inserts three sample resources).
- `npm run import` — import from `backend/database/data.json` (array) and upsert by `slug`.
- `npm run farmers` — insert `farmerData.js` records (use carefully if duplicating).

## Verification

After loading, verify via API or helper scripts:

```powershell
# Check DB status
curl http://localhost:5000/api/dbstatus

# List resources (served from DB if connected)
curl http://localhost:5000/api/learn

# Get a single resource by slug
curl http://localhost:5000/api/learn/multicropping

# Or inspect directly with the helper
cd backend
node database/check.js
```

If you want, I can:

- Change `loadResources.js` to upsert by `slug` instead of clearing the collection.
- Make `farmerData.js` idempotent (upsert by `farmerId`).
- Add validation to resource files before load (required fields check) and produce a dry-run mode.

Tell me which option you prefer and I will implement it.
