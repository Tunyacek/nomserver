'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.storageClient = void 0
const storage_js_1 = require('@supabase/storage-js')
const storage_url = process.env.STORAGE_URL || ''
const service_key = process.env.SERVICE_KEY || ''
exports.storageClient = new storage_js_1.StorageClient(storage_url, {
  apikey: service_key,
  Authorization: `Bearer ${service_key}`,
})
