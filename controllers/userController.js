import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env' });

console.log('url', process.env.SUPABASE_URL);

// my supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function signUp(req, res) {
  console.log(req.body)
  let { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password
  });
  if(error){
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json("The account has been created.")
  }
}
