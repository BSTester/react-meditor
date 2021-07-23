const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次构建清除上一次打包出来的文件
const plugins = [new CleanWebpackPlugin()]
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2',  // 包需要被module.exports，这就要用到common
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  externals: [nodeExternals()], // nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。
  plugins,
};