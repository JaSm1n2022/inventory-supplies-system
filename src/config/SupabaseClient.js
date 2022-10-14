import { createClient } from '@supabase/supabase-js';
//const REACT_APP_SUPABASE_URL="https://acwocotrngkeaxtzdzfz.supabase.co";
//const REACT_APP_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjd29jb3RybmdrZWF4dHpkemZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxOTE2NjUsImV4cCI6MTk4MDc2NzY2NX0.Z8ixIc4aPw4B-ilPHB7Rw0-p8gD07EqoaWxAOtA_72I";
const supabaseUrl =  process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;
console.log('[SUPA]',supabaseUrl);
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);