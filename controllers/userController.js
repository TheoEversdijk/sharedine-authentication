import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

/**
 * Function to sign up a user
 * @param {*} req
 * @param {*} res
 * @author Jesper Bertijn
 */
export async function signUp(req, res) {
  const { error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password
  });
  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    console.log("The account has been created.");
    res.status(200).json("The account has been created.");
  };
};

/**
 * Function to log in an existing user
 * @param {*} req
 * @param {*} res
 * @author Jesper Bertijn
 */
export async function logIn(req, res) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password
  });
  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json(data);
  };
};
