import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";

const webpackConfig = {
  entry: "./src/index",

  output: {
    uniqueName: 'explore',
    publicPath: 'auto',
  },

  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  resolve: {
    extensions: ['', '.ts', '.tsx', '.css', '...'],
  },

  module: {
    rules: [
      {
        test: /\.(?:tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
            }
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "explore",
      exposes: {
        './Header': './src/Header.tsx',
        './Footer': './src/Footer.tsx',
        './Recommendations': './src/Recommendations.tsx',
        './StorePicker': './src/StorePicker.tsx',
      },
      remotes: {
        'checkout': 'checkout@http://localhost:3001/mf-manifest.json'
      },
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default webpackConfig;
