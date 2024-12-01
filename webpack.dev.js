const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const SharpPlugin = require("responsive-loader/sharp");

module.exports = {
	devtool: "eval-cheap-module-source-map",
	entry: "./src/js/index.js",
	output: {
		filename: "[name].[hash:20].js",
		path: path.join(__dirname, "docs")
	},
	devServer: {
		port: 3000,
		contentBase: path.join(__dirname, "public"),
		before(app) {
			app.get("/api", (req, res) => {
				res.sendFile(path.join(__dirname, "data/nav.json"));
			});
		}
	},
	node: {
		fs: "empty"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
					plugins: ["@babel/plugin-proposal-class-properties"]
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							outputStyle: "expanded",
							sourceMap: true,
							sourceMapContents: true
						}
					},
					{
						loader: "import-glob-loader"
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "responsive-loader",
						options: {
							adapter: SharpPlugin
						}
					}
				]
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]"
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: true
		})
	]
};
