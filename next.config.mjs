/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.stripe.com'],
  },
  env: {
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASS: process.env.MONGODB_PASS,
    MONGODB_CLUSTER: process.env.MONGODB_CLUSTER,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  webpack: (config, { isServer }) => {
    // Add a rule for handling images
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images',
            outputPath: 'static/images',
            name: '[name].[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
