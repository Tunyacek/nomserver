'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.supabase = void 0
require('dotenv/config')
const supabase_js_1 = require('@supabase/supabase-js')
const supabaseUrl = process.env.STORAGE_URL
const supabaseKey = process.env.SERVICE_KEY
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey)
