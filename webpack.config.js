var webpack = require('webpack'),
    path = require('path'),
    paths = {
      mainScript: `${__dirname}/app/js/app.js`,
      scripts: `${__dirname}/app/js/**/*.js`,
      destroot: `${__dirname}/dist`,
      destjs: `${__dirname}/dist/js`,
    };

module.exports.getConfig = function(type){
  console.log('>>>>>>>>>>>>>>>>>>>>> webpackConfig environment: ', type);
  var isDev = type === 'development';
  var config = {
    entry: paths.mainScript,
    output: {
      path: paths.destjs,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
        }
      ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(type)
        }
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
  if(isDev) {
    config.devtool = 'eval';
  }
  return config;
};
