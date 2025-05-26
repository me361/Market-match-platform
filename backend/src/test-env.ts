import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

console.log('Current working directory:', process.cwd());
console.log('Environment variables:');
console.log('SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.VITE_SUPABASE_KEY ? '[PRESENT]' : '[MISSING]');
console.log('PORT:', process.env.PORT); 