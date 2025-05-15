import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ltvaordftwqqniupfdto.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dmFvcmRmdHdxcW5pdXBmZHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzI4OTksImV4cCI6MjA2Mjg0ODg5OX0.UIIXh9WnKekeUc8O_8wQ5-PbOswR-tA-JQowreZ5xpE"

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
        "Supabase URL ou chave não estão configurados corretamente!"
    );
}