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
  const { error } = await supabase.auth
    .signUp({
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
  const { data, error } = await supabase.auth
    .signInWithPassword({
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

/**
 * Retrieve all users from the Profiles table
 * @param {*} req 
 * @param {*} res 
 */
export async function getUsers(req, res) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json(data);
  };
};

/**
 * Retrieves a specific user from the Profiles table
 * @param {*} req 
 * @param {*} res 
 */
export async function getSpecificUser(req, res) {
  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', req.params.id);
  console.log(data);
  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json(data[0]);
  };
};

/**
 * Uploads an image to the Supabase Storage bucket
 * @param {*} req 
 * @param {*} res 
 */
export async function uploadImage(req, res) {
  const { data } = await supabase.storage
    .from('storage')
    .upload('public/avatar1.png', req.body.image);
  console.log(data);
  if (data) {
    res.json('Image added to profile');
  } else {
    res.status(304);
    res.json('Image could not be added to the profile');
  }
}

/**
 * Checks if the user is validated or not
 * @param {*} req
 * @param {*} res
 * @returns User object if validated=false
 * @returns Empty array if validated=true
 * @author Jesper Bertijn
 */
export async function checkValidated(req, res) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.body.id)
    .is('validated', false);
  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json(data);
  };
};

/**
 * Function to set username and profile picture
 * @param {*} req 
 * @param {*} res 
 */
export async function verify(req, res) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      username: req.body.username,
      avatar: req.body.avatar,
      validated: (true)
    })
    .eq('id', req.body.id)

  if (error) {
    console.log(error.status, error.message);
    res.status(error.status).json(error.message);
  } else {
    res.status(200).json(data);
  };
};