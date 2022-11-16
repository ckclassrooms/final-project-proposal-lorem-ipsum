import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://vrqbhnfvavcnxlbsjxlr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycWJobmZ2YXZjbnhsYnNqeGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTYzNDMsImV4cCI6MTk4Mzg3MjM0M30.3sqMYuQClmvFluxbPXFwXSaHoY296RoJFK9f7v-cwXg"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)