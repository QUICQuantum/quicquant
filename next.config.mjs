import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },{
        protocol: 'https',
        hostname: 's.yimg.com',
        pathname: '/**', // Include all paths under this hostname
      },
    ],
  },
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });