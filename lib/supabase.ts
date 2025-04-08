//import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ongifgfvjdpxesfyjazv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZ2lmZ2Z2amRweGVzZnlqYXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3ODQyOTgsImV4cCI6MjA1NDM2MDI5OH0.NLpVQePNzqL0LxD92JUXkJbLKqV5pxC-o1P_Qtl7bTU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    //storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
