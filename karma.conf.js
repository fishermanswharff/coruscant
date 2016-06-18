var travis = process.env.TRAVIS;

module.exports = function(config) {
  config.set({
    autowatch: true,
    basePath: __dirname,
    browsers: [travis ? 'PhantomJS' : 'Chrome'],
    coverageReporter: {
      reporters: [
        {
          type: 'lcovonly',
          dir: 'coverage',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    },
    files: ['spec/**/*.spec.js'],
    frameworks: ['jasmine'],
    // reporters: ['nyan', 'spec', 'failed', 'coverage'],
    reporters: ['nyan','failed','coverage'],
    singleRun: false,
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    preprocessors: {
      'spec/**/*.spec.js': ['webpack'],
      'spec/support/*.js': ['webpack']
    },
    webpack: {
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
        ]
      },
      console: false,
      global: true,
      process: true,
      Buffer: true,
      __filename: "mock",
      __dirname: "mock",
      setImmediate: true
    },
    webpackMiddleware: {
      noInfo: true
    },
  });
}
