const path = require("path")
const webpack = require("webpack")

module.exports = {
	mode: "production",
	entry: {
		server: "./server.js"
	},
	output: {
		path: path.join(__dirname, "build"),
		publicPath: "/",
		filename: "[name].js"
	},
	target: "node",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	},
	plugins: []
}
