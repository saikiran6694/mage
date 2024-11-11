module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      console.log("webpackConfig:", JSON.stringify(webpackConfig));

      // Modify the output paths for JS and CSS files
      //   webpackConfig.output.filename = 'your-folder-name/js/[name].[contenthash:8].js';
      webpackConfig.output.filename = "js/[name].[contenthash:8].js";
      //   webpackConfig.output.chunkFilename = 'your-folder-name/js/[name].[contenthash:8].chunk.js';
      webpackConfig.output.chunkFilename = "js/[name].[contenthash:8].chunk.js";

      //   webpackConfig.output.assetModuleFilename = "static/media/[name].[hash][ext]";
      // webpackConfig.output.assetModuleFilename = "resources/[name].[hash][ext]";
      webpackConfig.output.assetModuleFilename =
        "etc.clientlibs/acs/clientlibs/clientlib-aina/resources/[name].[hash][ext]";

      // Modify the rules for handling CSS files
      //   webpackConfig.module.rules.forEach((rule) => {
      //     if (rule.oneOf) {
      //       rule.oneOf.forEach((subRule) => {
      //         if (subRule.test && subRule.test.toString().includes('css')) {
      //           if (subRule.use && subRule.use.length > 0) {
      //             subRule.use.forEach((loader) => {
      //               if (loader.loader && loader.loader.includes('mini-css-extract-plugin')) {
      //                 loader.options.publicPath = '../';
      //               }
      //             });
      //           }
      //         }
      //       });
      //     }
      //   });
      for (const plugin of webpackConfig?.plugins || []) {
        const cssImportCheck = "static/css/[name]";
        if (plugin?.options?.filename?.includes(cssImportCheck)) {
          plugin.options.filename = plugin.options.filename.replace(
            `static/css`,
            `css`
          );
        }
        if (plugin?.options?.chunkFilename?.includes(cssImportCheck)) {
          plugin.options.chunkFilename = plugin.options.chunkFilename.replace(
            `static/css`,
            `css`
          );
        }
      }

      for (const oneOfJson of webpackConfig?.module?.rules?.[0]?.oneOf || []) {
        for (const useJson of oneOfJson?.use || []) {
          if (useJson.loader && useJson.loader.includes("file-loader")) {
            // Modify the name option to change the output directory for media files
            //   useJson.options.name = 'your-folder-name/media/[name].[hash:8].[ext]';
            // useJson.options.name = 'resources/[name].[hash:8].[ext]';
            useJson.options.name =
              "etc.clientlibs/chatbot/clientlibs/clientlib-chat/resources/[name].[hash:8].[ext]";
          }
        }
      }

      // const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      // console.log('webpackConfig.module.rules:', JSON.stringify(webpackConfig.module.rules))

      // if (oneOfRule) {
      //     // console.log('oneOfRule:', oneOfRule)
      //   oneOfRule.oneOf.forEach((rule) => {
      //     //   console.log('oneOfRule.oneOf.forEach ~ rule.loader:', rule.loader)
      //     if (rule.loader && rule.loader.includes('file-loader')) {
      //       // Modify the name option to change the output directory for media files
      //     //   rule.options.name = 'your-folder-name/media/[name].[hash:8].[ext]';
      //       rule.options.name = 'resources/media/[name].[hash:8].[ext]';
      //     }
      //   });
      // }

      return webpackConfig;
    },
  },
};
