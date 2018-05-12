const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './demo',
		styles: './src/style/styles.scss'
	},
	output: {
		path: path.resolve('./demo/dist/'),
		filename: '[name].js'
	},
	mode: 'development',
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./demo/index.html')
		})
	]
};