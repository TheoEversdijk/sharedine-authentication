import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

console.log('url', process.env.REACT_APP_SUPABASE_URL);

// my supabase client
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

export async function getUsersData() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.log('query error', error);
    else return data;
  }

export async function getUserData(id) {
  console.log('👀 for id:', id);
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

export async function addNewData() {

}