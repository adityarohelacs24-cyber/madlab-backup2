# Backend Setup Guide - Supabase Integration

## Current Status
- ✅ Frontend code updated to use Supabase backend
- ✅ Local fallback data complete and working
- ❌ **Supabase database NOT yet configured**
- ❌ **Blank page error**: App crashes when trying to render reactions without complete data structure

## The Problem
The `ReactionCard` component was failing because:
1. The Supabase `reactions` table either doesn't exist or is empty
2. The `products` column (which contains rich content) is NULL
3. The component tried to access `content.observations.observation` which was undefined

## Solution: Set Up Supabase Backend

### Step 1: Create the Database Table

Go to your Supabase dashboard (https://supabase.co/) and run this SQL in the SQL Editor:

```sql
-- Create reactions table with proper JSONB columns
CREATE TABLE reactions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  group_number INT,
  category TEXT NOT NULL,
  reactants TEXT,
  
  -- JSONB columns for rich educational content
  products JSONB,  -- Full ReactionContent object with observations, confirmatoryTest, equation, theory
  observations JSONB,  -- Array of ReactionStep objects for animations
  equations TEXT,
  precautions TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_reactions_category ON reactions(category);
CREATE INDEX idx_reactions_group ON reactions(group_number);
CREATE INDEX idx_reactions_category_group ON reactions(category, group_number);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access (adjust as needed)
CREATE POLICY "Allow public read" ON reactions
  FOR SELECT
  USING (true);
```

### Step 2: Seed the Database

#### **Option A: Use the In-App Seed Button (Easiest)**

1. Open the app at `http://localhost:5173`
2. Sign in
3. Look for the blue **"Seed Database"** banner at the top
4. Click **"Seed Reactions to DB"** button
5. Wait for the operation to complete
6. The app will automatically refresh and load the data

#### **Option B: Seed via Code (Manual)**

If the button doesn't work, you can manually run the seed function:

1. Open the browser console while on the app (F12)
2. Run this command:
   ```javascript
   import { seedReactions } from './lib/seedReactions.ts';
   await seedReactions();
   ```

#### **Option C: Seed via Supabase Dashboard (Advanced)**

If you want to manually insert data, export the JSON from [src/app/data/saltAnalysisData.ts](src/app/data/saltAnalysisData.ts) and use the Supabase Data Editor.

### Step 3: Verify Data Was Inserted

1. Go to Supabase Dashboard → Your Project
2. Click **Table Editor** → **reactions**
3. You should see reactions with:
   - `title`: "Lead - Pb²⁺", "Silver - Ag⁺", etc.
   - `category`: "cation" or "anion" or "organic"
   - `group_number`: 1-6 for cations
   - `products`: Complex JSONB object with full content structure
   - `observations`: Array of reaction steps

### Step 4: Test the App

1. Refresh the app: `http://localhost:5173`
2. Sign in
3. Click a chemistry group (e.g., "Group I")
4. Verify reaction cards load with:
   - ✅ Observations & Inference
   - ✅ Confirmatory Tests
   - ✅ Equations (Molecular & Ionic)
   - ✅ Theory & JEE Notes
   - ✅ Common Mistakes

## Data Structure Reference

### ReactionContent (stored in `products` column)
```typescript
{
  observations: {
    observation: "White crystalline precipitate forms...",
    inference: "Group I cation present...",
    explanation: "This is because..."
  },
  confirmatoryTest: {
    procedure: ["Step 1...", "Step 2..."],
    observation: "Yellow precipitate forms...",
    conclusion: "Confirmed presence of Pb²⁺"
  },
  equation: {
    molecular: "Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃",
    ionic: "Pb²⁺ + 2I⁻ → PbI₂↓"
  },
  theory: {
    principle: "Lead iodide has low solubility...",
    mechanism: "Ion-pair formation leads to...",
    observationReason: "Yellow color indicates...",
    examPoints: ["Key point 1", "Key point 2"],
    commonMistakes: ["Common mistake 1", "Common mistake 2"],
    mnemonic: "Optional mnemonic for memory"
  }
}
```

## Fixes Applied

✅ Added defensive null checks in `ReactionCard.tsx`:
- Optional chaining (`?.`) for all nested content properties
- Conditional rendering checks before accessing undefined properties
- Component now gracefully handles incomplete data

This prevents crashes when:
- Backend returns partially populated data
- Database table doesn't exist yet
- Columns are NULL or missing

## If You Still See Blank Pages

### 1. Check Console for Errors (F12)
Look for error messages that indicate:
- Network failures connecting to Supabase
- Data structure mismatches
- Missing environment variables

### 2. Verify Environment Setup
Check [.env.local](.env.local) contains:
```
VITE_SUPABASE_URL=https://udacwpgoizsunwblhqvs.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_PVqQgsm73lv1J6yxnH3CdQ_T-gepyag
```

### 3. Check Network Tab (F12 → Network)
- Look for requests to `supabase.co`
- Verify they return status 200 with data
- If getting 401/403: permission issue with RLS policies

### 4. Verify usingDB Flag
In the browser console, check:
```javascript
// Should show if using backend data
document.querySelector('button')?.textContent?.includes('Seed Database')
```
If it shows "Seed Database" button, app is still falling back to local data.

## Data Source Priority

The app uses this logic:
```
IF Supabase loaded AND no error AND has reactions
  → Use database (usingDB = true)
ELSE
  → Use local fallback (usingDB = false)
```

**Local fallback is a safety net** but for full functionality you need the database seeded.

## Next Steps

1. ✅ **Create table** (SQL above)
2. ✅ **Seed data** (use in-app button or Option B)
3. ✅ **Verify data** (check Supabase table editor)
4. ✅ **Test app** (refresh and sign in)
5. ✅ **Check console** for any errors (F12)

Questions? Check the [Guidelines.md](guidelines/Guidelines.md) for architecture overview.
