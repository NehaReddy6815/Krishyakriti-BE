Database helpers

This folder contains helper scripts to connect to MongoDB and seed or import initial data used by the backend.

Files of interest
- `db.js` - helper to connect to MongoDB using `process.env.MONGO_URI`.
- `seed.js` - inserts default `Resource` documents (used by `/api/learn`).
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

Import your own resources from `backend/database/data.json`:

1. Replace `backend/database/data.json` with your array of resource objects. Each item should include at least `title` and `slug`.
2. Run:

```powershell
cd backend
npm run import
```

Insert farmer contact data

The `farmerData.js` script contains an array of farmer records and inserts them via the `Farmer` model. The script expects each item to include `farmerId`, `name`, and optionally `location` and `phone`.

To run it:

```powershell
cd backend
node database/farmerData.js
```

Notes about the `Farmer` model
- The `Farmer` schema includes a numeric `farmerId` (unique) and `phone` is indexed. The model also adds timestamps for `createdAt`/`updatedAt`.
- If you plan to re-run `farmerData.js` repeatedly, consider modifying the script to upsert by `farmerId` or clear the collection first to avoid duplicate key errors.

Verification

Check DB connection and content with:

```powershell
# DB status
curl http://localhost:5000/api/dbstatus

# List resources (will come from DB if connected)
curl http://localhost:5000/api/learn

# Check resources via helper script
cd backend
node database/check.js
```

If you want, I can add a `npm run farmers` script to `backend/package.json` to run the farmer import and an idempotent upsert workflow. Let me know.
