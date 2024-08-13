import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";

export default (
  env,
  argv
) => {
  const { host } = env;
  const { mode } = argv;

  const webpackConfig = {
    mode,

    entry: "./src/index",

    output: {
      uniqueName: 'explore',
      publicPath: 'auto',
    },

    devServer: {
      port: 3001,
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
          './App': './src/App.tsx',
        },
        remotes: {
          'checkout': mode === "production" ?
            `checkout@${host}/checkout/mf-manifest.json` : "checkout@http://localhost:3002/mf-manifest.json",
          'app': mode === "production" ?
            `app@${host}/mf-manifest.json` : 'app@http://localhost:3000/mf-manifest.json',
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true
          },
          'react-router-dom': {
            singleton: true
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };

  return webpackConfig;
}

