import { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/../src/core/$1',
    '^@nest-modules/(.*)$': '<rootDir>/../src/nest-modules/$1',
  },
  testEnvironment: 'node',
  coverageProvider: 'v8',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./jest-setup.ts'],
};

export default config;
