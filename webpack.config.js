var webpack = require('webpack'),
    path = require('path'),
    paths = {
      mainScript: '/app/js/app.js',
      testScript: '/spec/index.js',
      scripts: '/app/js/**/*.js',
      destroot: '/dist',
      destjs: '/dist/js',
    };

module.exports.getConfig = function(type){
  var isDev = type === 'development';
  console.log('>>>>>>>> webpack config env: ', type);
  var config = {
    entry: __dirname + paths.mainScript,
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: { presets: ['react', 'es2015'] }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { cacheDirectory: true, presets: ['react', 'es2015'] }
        }
      ],
      noParse: /node_modules\/quill\/dist/
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
  if(isDev) {
    config.devtool = 'eval';
  }
  return config;
};
