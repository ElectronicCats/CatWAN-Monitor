module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000000,
              fallback: "file-loader",
              name: "images/[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  externals: {
    serialport: true
  }
};
