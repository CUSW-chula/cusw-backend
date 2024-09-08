// eslint.config.mjs
import globals from "globals";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/array-type": ["error", { default: "array" }],

      // Additional best practices
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-const": "error",
      "no-throw-literal": "error",
      "no-return-await": "error",
      "require-await": "error",
      "no-await-in-loop": "warn",
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],
      "no-shadow": "error",
      "no-duplicate-imports": "error",
      "no-template-curly-in-string": "warn",
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["warn", 10],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
