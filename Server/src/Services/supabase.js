const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase project's details
const SUPABASE_URL = 'https://smjuexdrwfrpsntlkkvg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtanVleGRyd2ZycHNudGxra3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NDU2NzUsImV4cCI6MjA0OTMyMTY3NX0.qLi7jTw-reOBlombho83gE7_j1djP6d8yhvj-mYR1Bc';

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


module.exports = { supabase };