/**
 * @author {Stelo} Pedro Soares 
 * @description Webpack projeto rubia portal admin
 */

//  modulos de dependencia
const path = require('path')
const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	// modo de aplicação | ainda não reaproveitado para controlar variaveis de ambiente
	mode: 'development',

	// entradas dos arquivos js
	entry: {
		// source: './src/App.js',
		typescript: './src/ts/index.tsx',
	},

	// saida dos arquivos js
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public'),
	},

	// 
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},

	// para source map
	devtool: 'inline-source-map',

	// devServer é o hot reload
	devServer: {
		inline: true,
		contentBase: path.join(__dirname, "public"),
		compress: true,
		port: 9000
	},

	// modulos
	module: {
		rules: [
			// entendimento de typescript e typescript syntaxe extension
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				include: path.resolve(__dirname, "src/ts"),
				exclude: /node_modules/
			},

			// entendimento de javascript e javascript syntaxe extension
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, "src"),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react']
						}
					}
				]
			},

			// entendimento de scss + configurações para bootstrap
			{
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
		]
	},
	plugins: [
		// @Google workbox para facilitar manuseio do service worker
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			// Exclude images from the precache
			exclude: [/\.(?:png|jpg|jpeg|svg)$/],

			// Define runtime caching rules.
			runtimeCaching: [
				{
					// Match any request ends with .png, .jpg, .jpeg or .svg.
					urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

					// Apply a cache-first strategy.
					handler: 'cacheFirst',

					options: {
						// Only cache 10 images.
						expiration: {
							maxEntries: 40,
						},
					},
				},
			],
		}),

		// Hack para informar ao webpack que o jquery existe e como ele se encontra no ambiente
		// Popper é um requisito do bootstrap para funcionar
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
		})
	]
}