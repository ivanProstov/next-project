/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;

// import { fileURLToPath } from 'url';
// import path from 'path';
// import webpack from 'webpack';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const nextConfig = {
//   reactStrictMode: true,
//   // distDir: 'build', // Измените на другую директорию
//   output: 'standalone',
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   // webpack: (config, { isServer }) => {
//   //   if (isServer) {
//   //     config.entry = () => ({
//   //       'main.js': './server.ts',
//   //     });
//   //     config.output = {
//   //       filename: '[name].js',
//   //       path: path.resolve(__dirname, 'dist'),
//   //     };
//   //     config.module.rules.push({
//   //       test: /\.tsx?$/,
//   //       use: 'ts-loader',
//   //       exclude: /node_modules/,
//   //     });
//   //     config.resolve.extensions.push('.ts', '.tsx');
//   //   } else {
//   //     config.resolve.fallback = {
//   //       zlib: 'browserify-zlib',
//   //       stream: 'stream-browserify',
//   //       util: 'util',
//   //     };
//   //     config.plugins.push(
//   //         new webpack.ProvidePlugin({
//   //           process: 'process/browser',
//   //           Buffer: ['buffer', 'Buffer'],
//   //         })
//   //     );
//   //   }
//   //   return config;
//   // },
//   // experimental: {
//   //   outputStandalone: true,
//   // },
// };
//
// export default nextConfig;
