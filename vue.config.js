module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    name: "KMC EpicOS",
    themeColor: "#F99D3A",
    msTileColor: "#333333",
    manifestOptions: {
      background_color: "#333333",
    },
  },
  publicPath: "/",
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
  },
};
