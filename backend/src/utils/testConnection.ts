import { supabase } from '../lib/supabase';

async function testConnection() {
  try {
    const { data, error } = await supabase.from('products').select('id');
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log(`Found ${data.length} products in the database.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Failed to connect to Supabase:', error.message);
    } else {
      console.error('❌ Failed to connect to Supabase:', 'An unknown error occurred');
    }
    process.exit(1);
  }
}

testConnection(); 