import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.STORAGE_URL as string
const supabaseKey = process.env.SERVICE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)
