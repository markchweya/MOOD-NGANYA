import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import vueA11y from "eslint-plugin-vuejs-accessibility";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

const sharedRules = {
  "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
  "@typescript-eslint/consistent-type-imports": "error",
};

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: sharedRules,
  },
  {
    files: ["**/*.vue"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...pluginVue.configs["flat/recommended"],
      ...vueA11y.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      ...sharedRules,
      "vue/multi-word-component-names": "off",
      // Optional props are typed `T | undefined` by TypeScript; no runtime default needed.
      "vue/require-default-prop": "off",
      // The wordmark renders role="img" with an aria-label, which names the heading.
      "vuejs-accessibility/heading-has-content": ["error", { accessibleChildren: ["Wordmark"] }],
    },
  },
  prettier,
);
