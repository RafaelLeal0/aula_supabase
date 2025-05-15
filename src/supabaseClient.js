import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qbcjwexklcsvbaryqkoh.supabase.co'; // Substitua pelo seu valor real
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiY2p3ZXhrbGNzdmJhcnlxa29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDc4NjAsImV4cCI6MjA2Mjg4Mzg2MH0.FxVvlM0uUkmehZtc0PYvbqrpkBfsWp8C-sIhvcg7_SQ'; // Substitua pelo seu valor real
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Certifique-se de que SUPABASE_URL e SUPABASE_ANON_KEY estão definidos.');
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
