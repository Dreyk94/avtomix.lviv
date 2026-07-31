import { createClient } from "@supabase/supabase-js";

// Ці два значення беруться зі змінних середовища Vercel:
//   VITE_SUPABASE_URL      — URL вашого проєкту Supabase
//   VITE_SUPABASE_ANON_KEY — публічний (anon) ключ проєкту
// Обидва можна безпечно використовувати в браузері — доступ обмежується
// правилами Row Level Security (RLS), які налаштовані в базі даних.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
