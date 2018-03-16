const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer')();

const config = {
	entry: {
		main: [
			'./src/main.js',
			'./src/specificity.scss',
		],
	},
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	devtool: process.env.WEBPACK_SERVE ? '#eval-source-map' : '#source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: !process.env.WEBPACK_SERVE,
						},
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [
								autoprefixer,
							],
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
						],
					},
				},
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		],
	},
	plugins: [
		// Clean the 'dist' folder before building
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
};

if (process.env.WEBPACK_SERVE) {
	config.serve = {
		dev: {
			publicPath: '/dist/',
		},
	};
}

module.exports = config;
