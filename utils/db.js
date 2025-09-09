import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; // Replace with your Supabase URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;