# Supabase Database Setup Instructions

## Quick Setup Steps

### 1. Execute Database Schema
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `rhsuwkpbrjfliqrghizr`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the entire contents of `database/schema.sql`
5. Click **Run** to execute the SQL

### 2. Verify Tables Created
Go to **Table Editor** and confirm these tables exist:
- `rsvp` - for storing RSVP responses
- `blessings` - for storing wedding blessings

### 3. Test Real-time Features
In **Table Editor**, go to `blessings` table:
1. Click on the **Replication** tab
2. Ensure **Real-time** is enabled for inserts

### 4. Update Environment Variables (If Needed)
If you need to get fresh credentials:
1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY`

## Testing the Integration

### Test RSVP Form
1. Go to http://localhost:3000
2. Navigate to the RSVP section
3. Fill out and submit the form
4. Check Supabase Table Editor → `rsvp` table for new entries

### Test Blessings Form
1. Navigate to the Blessings section
2. Submit a blessing
3. Verify it appears in real-time on the page
4. Check Supabase Table Editor → `blessings` table

### Test Admin Dashboard
1. Go to http://localhost:3000/admin
2. Login with password: `uchamail2025`
3. Verify RSVP stats and blessing management work

## Troubleshooting

### If Forms Don't Submit
1. Check browser console for errors
2. Verify environment variables in `.env.local`
3. Check Supabase RLS policies are created correctly
4. Ensure tables have proper permissions

### If Real-time Updates Don't Work
1. Verify real-time is enabled on `blessings` table
2. Check browser network tab for websocket connections
3. Ensure RLS policies allow SELECT operations

### Common Issues
- **CORS errors**: Verify Supabase URL is correct
- **403 Forbidden**: Check RLS policies
- **404 API errors**: Ensure API routes are in correct folders
- **Real-time not working**: Enable replication on tables

## Database Schema Overview

```sql
-- RSVP Table Structure
rsvp:
- id (UUID, primary key)
- name (VARCHAR, required)
- guest_count (INTEGER, 1 or 2)
- attendance (VARCHAR, 'hadir' or 'tidak')
- created_at (TIMESTAMP)

-- Blessings Table Structure  
blessings:
- id (UUID, primary key)
- name (VARCHAR, required)
- message (TEXT, required)
- is_approved (BOOLEAN, default true)
- created_at (TIMESTAMP)
```

## Next Steps After Database Setup
1. ✅ Database schema created
2. ✅ Test forms in browser
3. ✅ Verify admin dashboard
4. 🔜 Add wedding audio file
5. 🔜 Finalize content and deploy
