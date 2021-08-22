module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript/base',
  ],
  rules: {
    "no-console": "off",
  },
  ignorePatterns: ['/src/typeorm/migrations/*.ts', '/src/typeorm/seeds/*.ts'],
};
