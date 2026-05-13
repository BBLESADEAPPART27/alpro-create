import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type Configuration = {
  base: string;
  protein: string;
  toppings: string[];   // multiple toppings now
  flavor: string;
  created_at?: string;
};

export async function saveConfiguration(config: Configuration) {
  if (!supabase) {
    console.warn('Supabase not configured — skipping save.');
    return { ok: false, reason: 'not_configured' };
  }
  try {
    // We store toppings as a single text field (comma-joined) for backward
    // compatibility with the original table schema. Run the migration in
    // supabase.sql if you want a proper text[] column.
    const { error } = await supabase.from('configurations').insert([
      {
        base: config.base,
        protein: config.protein,
        topping: config.toppings.join(','),
        flavor: config.flavor,
      },
    ]);
    if (error) throw error;
    return { ok: true };
  } catch (e) {
    console.error('Supabase save error:', e);
    return { ok: false, reason: 'error' };
  }
}
