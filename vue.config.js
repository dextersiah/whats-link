module.exports = {
  configureWebpack: {
    optimization: {
      minimize: true,
      usedExports: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/registerServiceWorker.js",
    },
  },
};
