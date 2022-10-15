import { ArrowParens, TrailingComma } from 'projen/lib/javascript/prettier';

const { awscdk, TextFile } = require('projen');

const cdkVersion = '2.46.0';
const nodejsVersion = 'v16.17.1';
const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];
const deps = [`aws-cdk-lib@${cdkVersion}`, 'constructs@10.0.5', `@aws-cdk/aws-lambda-go-alpha@${cdkVersion}-alpha.0`];

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'mlops-infrastructure',
  projenrcTs: true,
  // Deps
  deps: deps,
  devDeps: ['@types/jest', '@types/node', 'eslint-config-prettier', 'eslint-plugin-prettier', 'prettier'],
  // Testing & Linting
  codeCov: true,
  eslint: true,
  docsDirectory: 'docs',
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.ALWAYS,
      singleQuote: true,
    },
  },
  // Ignore files
  gitignore: commonIgnore,
  npmignore: commonIgnore,
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.synth();
