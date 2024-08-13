import HtmlWebpackPlugin from 'html-webpack-plugin';
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
      uniqueName: 'app',
      publicPath: '/',
    },

    devServer: {
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true
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
        name: "app",
        exposes: {
          "./Loading": "./src/Loading.tsx",
        },
        remotes: {
          "explore": mode === "production" ?
            `explore@${host}/explore/mf-manifest.json` : "explore@http://localhost:3001/mf-manifest.json",
          "checkout": mode === "production" ?
            `checkout@${host}/checkout/mf-manifest.json` : "checkout@http://localhost:3002/mf-manifest.json",
          "decide": mode === "production"?
            `decide@${host}/decide/mf-manifest.json` : "decide@http://localhost:3003/mf-manifest.json",
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
};

