module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.output.publicPath = `${process.cwd()}/dist/`;
  //   }
  //   config.target = "electron-renderer";
  // },
};
