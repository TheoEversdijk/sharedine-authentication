import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env'})

console.log('url', process.env.SUPABASE_URL)

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// export async function getNotifyData() {
//     const { data, error } = await supabase.from('notify').select('*');
//     if (error) console.log('Query error', error);
//     else return data;
// }