const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { optimize } = require("webpack");
const { join } = require("path");
let prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  // Add plugins that reduce the size of the app in production
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(), //Merge chunks
    new optimize.OccurrenceOrderPlugin() //on by default: https://webpack.js.org/migrate/3/#occurrenceorderplugin-is-now-on-by-default
  );
}
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: {
    app: join(__dirname, "src/app/index.tsx"),
    contentscript: join(__dirname, "src/contentscript/contentscript.ts"),
    background: join(__dirname, "src/background/background.ts")
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    ...prodPlugins,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
};
