import path from "path";
import babelPluginMacros from "babel-plugin-macros";
import babelPluginStyledComponent from "babel-plugin-styled-components";
import babelSyntaxTypescript from "@babel/plugin-syntax-typescript";
// The folders containing files importing twin.macro

/**
 * @param {import("next").NextConfig} nextConfig
 */
export function withTwin(nextConfig) {
  const includeDirs = [
    path.resolve("src", "components"),
    path.resolve("src", "pages"),
    path.resolve("src", "styles"),
  ];
  return {
    ...nextConfig,
    /**
     * @param {{ module: { rules?: any; }; resolve: { fallback: any; }; }} config
     * @param {import("next/dist/server/config-shared").WebpackConfigContext} options
     */
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includeDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "babel-loader",
            options: {
              sourceMaps: dev,
              plugins: [
                babelPluginMacros,
                [babelPluginStyledComponent, { ssr: true, displayName: true }],
                [babelSyntaxTypescript, { isTSX: true }],
              ],
            },
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
}
