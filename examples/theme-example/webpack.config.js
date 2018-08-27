module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }]
  },
  resolve: {
		alias: {
			inferno: __dirname + "/node_modules/inferno/dist/index.dev.esm.js"
		}
	}
};
