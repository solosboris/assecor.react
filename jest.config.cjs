/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',           // important for React DOM testing
  roots: ['<rootDir>/tests'],          // where your test files are
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // load jest-dom matchers
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',          // compile TS/TSX files
  },
};