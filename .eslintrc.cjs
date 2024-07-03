/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import-x/recommended",
    "plugin:import-x/typescript",
  ],
  settings: {
    "import-x/resolver": {
      typescript: true,
      node: true,
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "dist-electron"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "import-x/no-unresolved": "error",
    "import-x/no-default-export": "error",
    "import-x/order": "error",
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: ["key", "dangerouslySetInnerHTML", "ref"],
      },
    ],
    "object-shorthand": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "no-console": ["error", { allow: ["info", "error"] }],
  },
  overrides: [
    {
      files: ["src/App.tsx", "vite.config.ts"],
      rules: {
        "import-x/no-default-export": "off",
      },
    },
  ],
};
