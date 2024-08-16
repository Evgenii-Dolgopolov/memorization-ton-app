import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import airbnbConfig from "eslint-config-airbnb-base";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...fixupConfigRules(pluginReact.configs.recommended).rules,
      ...airbnbConfig.rules,
    },
  },
  pluginJs.configs.recommended,
];
