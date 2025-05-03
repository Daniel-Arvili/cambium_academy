/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  },
  images: {
    domains: [
      "images.unsplash.com",       
      "media.istockphoto.com",
      "plus.unsplash.com",
      "drive.google.com",
      "upload.wikimedia.org",
      "docs.google.com",
      "facialix.com",
    ],
  },
}

module.exports = nextConfig 