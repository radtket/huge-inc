const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SharpPlugin = require("responsive-loader/sharp");
const cssnano = require("cssnano");

const buildPath = path.resolve(__dirname, "public");

module.exports = {
	devtool: "source-map",
	entry: "./src/js/index.js",
	output: {
		filename: "[name].[hash:20].js",
		path: buildPath
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
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
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
			inject: "body"
		}),
		new CleanWebpackPlugin(buildPath),
		new FaviconsWebpackPlugin({
			logo: "./src/images/branding/favicon.svg",
			prefix: "icons-[hash]/",
			persistentCache: true,
			inject: true,
			background: "#ec008c",
			title: "HUGE | NavExercise",

			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: true,
				yandex: false,
				windows: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: "styles.[contenthash].css"
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: {
				map: {
					inline: false
				},
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		})
	]
};
