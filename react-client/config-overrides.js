const {
  override,
  addWebpackAlias,
  removeModuleScopePlugin,
  babelInclude,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([path.resolve("src"), path.resolve("../ckeditor5")]),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src", "components"),
    "@config": path.resolve(__dirname, "src", "config"),
    "@contexts": path.resolve(__dirname, "src", "contexts"),
    "@data": path.resolve(__dirname, "src", "data"),
    "@hooks": path.resolve(__dirname, "src", "hooks"),
    "@pages": path.resolve(__dirname, "src", "pages"),
    "@services": path.resolve(__dirname, "src", "services"),
    "@styles": path.resolve(__dirname, "src", "styles"),
    "@utils": path.resolve(__dirname, "src", "utils"),
    "ckeditor5-custom-build": path.resolve(__dirname, "../ckeditor5"),
  })
);
