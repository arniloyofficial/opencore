import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wwnzgiowlbwrfubggbqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bnpnaW93bGJ3cmZ1YmdnYnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDY1MzgsImV4cCI6MjA4ODM4MjUzOH0.ndPn-80VQlmgaougis7I8aj3I75Y9PnPHPvmJaxjc60';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);