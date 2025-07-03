const webpack = require("webpack");
const path = require("path");
const {version} = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const banner = `/*!
 * BlueprintJS v${version}
 * https://github.com/FireController1847/BlueprintJS
 *
 * Copyright (c) ${new Date().getFullYear()} FireController#1847
 * Released under the GNU General Public License v3.0
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Date: ${new Date().toISOString()}
 */`;
const common = {
    entry: "./src/blueprint.webpack.js",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            }
        ]
    }
};
module.exports = [
    // 🔹 Unminified version
    {
        ...common,
        mode: "development",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: `blueprintjs-${version}.js`
        },
        optimization: {
            minimize: false
        },
        devtool: "source-map",
        plugins: [
            new webpack.BannerPlugin({
                banner,
                raw: true
            })
        ]
    },

    // 🔹 Minified version
    {
        ...common,
        mode: "production",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: `blueprintjs-${version}.min.js`
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true
                        },
                        mangle: true
                    }
                })
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: () => `/*! BlueprintJS v${version} | (c) ${new Date().getFullYear()} FireController#1847 | Released under the GNU GPL v3.0 | https://www.gnu.org/licenses/gpl-3.0.en.html */\n;`,
                raw: true
            })
        ]
    }
];