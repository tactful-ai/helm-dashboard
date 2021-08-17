const path = require('path');

module.exports = [
    {
        entry: './src/renderer.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: { configFile: "tsconfig.json" }
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        target: "electron-renderer",
        output: {
            filename: 'renderer.js',
            path: path.resolve(__dirname, 'dist/'),
        },
    }, {
        entry: './src/main.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: { configFile: "tsconfig.json" }
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        target: "electron-main",
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist/'),
        },
  
    }, {
        entry: './src/preload.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: { configFile: "tsconfig.json" }
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        target: "electron-preload",
        output: {
            filename: 'preload.js',
            path: path.resolve(__dirname, 'dist/'),
        },
    },
];