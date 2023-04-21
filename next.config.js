/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  
  
  nextConfig,
  env:{
    NEXT_PROJECT_ID:process.env.NEXT_PROJECT_ID,
    NEXT_Project_Secret_Key:process.env.NEXT_Project_Secret_Key
  }
}
