'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.uploadFile = exports.createBucket = void 0
const supabase_js_1 = require('@supabase/supabase-js')
const supabase = (0, supabase_js_1.createClient)(
  'https://zuaxdbxtwsgsjecmzbds.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YXhkYnh0d3Nnc2plY216YmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MDg2NzYsImV4cCI6MjAyMTE4NDY3Nn0.mRlipJTuWw0iDWOjX-RpwjOBKxQfKUGBcziMWdbE_RI'
)
async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('images', {
    public: true,
  })
  if (error) {
    console.error('Error creating bucket:', error.message)
  } else {
    console.log('Bucket created successfully:', data)
  }
}
exports.createBucket = createBucket
async function uploadFile(file) {
  const { data, error } = await supabase.storage.from('images').upload('file_path', file)
  if (error) {
    console.error('Error uploading file:', error.message)
  } else {
    console.log('File uploaded successfully:', data)
  }
}
exports.uploadFile = uploadFile
