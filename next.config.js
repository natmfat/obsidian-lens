/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // future: {
    //     webpack5: true,
    // },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
        };

        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader",
        });

        return config;
    },
};

module.exports = nextConfig;
