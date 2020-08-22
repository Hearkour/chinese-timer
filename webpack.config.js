// const webpack = require('webpack');
// const uglifyjs = require('uglifyjs');
// const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./dump/empty.js",
    output: {
        filename: 'dump/created.js',
        path: path.resolve(__dirname, './'),
    },
};
// module.exports = {
//     optimization: {
//         minimizer: [
//             new TerserPlugin({
//                 cache: true,
//                 parallel: true,
//                 terserOptions: {
//                     warnings: false,
//                     compress: {
//                         warnings: false,
//                         unused: true,
//                     },
//                     ecma: 6,
//                     mangle: true,
//                     unused: true,
//                 },
//                 sourceMap: true,
//             }),
//         ],
//     },
// };
