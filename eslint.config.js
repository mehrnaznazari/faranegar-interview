// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "public-decorated-field",
              "protected-decorated-field",
              "private-decorated-field",
              "public-readonly-field",
              "public-field",
              ["public-set", "public-get"],
              "protected-readonly-field",
              "protected-field",
              ["protected-set", "protected-get"],
              "private-readonly-field",
              "private-field",
              ["private-set", "private-get"],
              "constructor",
              "public-method",
              "protected-method",
              "private-method",
            ],
          },
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: "memberLike",
          modifiers: ["static"],
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: "memberLike",
          format: ["camelCase"],
        },
        {
          selector: "memberLike",
          modifiers: ["readonly"],
          format: ["PascalCase"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: ".*Interface$",
            match: true,
          },
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
          custom: {
            regex: ".*Type$",
            match: true,
          },
        },
        {
          selector: "enum",
          format: ["PascalCase"],
          custom: {
            regex: ".*Enum$",
            match: true,
          },
        },
      ],
      "lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "always", prev: "*", next: "method" },
            { blankLine: "always", prev: "field", next: "method" },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.component.ts", "**/*.directive.ts"],
    extends: [],
    rules: {
      "@angular-eslint/sort-lifecycle-methods": ["error"],
      "@angular-eslint/no-lifecycle-call": ["error"],
      "@angular-eslint/use-lifecycle-interface": ["error"],
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Component", "Page"],
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      ...angular.configs.templateAll,
    ],
    rules: {
      "@angular-eslint/template/i18n": "off",
      "@angular-eslint/template/attributes-order": [
        "warn",
        {
          alphabetical: true,
          order: [
            "STRUCTURAL_DIRECTIVE",
            "TEMPLATE_REFERENCE",
            "ATTRIBUTE_BINDING",
            "INPUT_BINDING",
            "TWO_WAY_BINDING",
            "OUTPUT_BINDING",
          ],
        },
      ],
    },
  }
);
