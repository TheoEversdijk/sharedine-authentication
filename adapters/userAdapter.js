import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

console.log('url', process.env.SUPABASE_URL);

// my supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

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

export async function addNewData(user) {
  console.log('user:', user.username);
  const { data, error } = await supabase.from('users').insert([
    {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  ]);
  if (error) console.log('query error', error);
  else return data;
}

export async function editUserData(id, user) {
  console.log('user:', user.username);
  const { data, error } = await supabase.from('users').update([
    {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  ]).eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeUserData(id) {
  console.log('removing id:', id);
  const { data, error } = await supabase.from('users').delete().eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}