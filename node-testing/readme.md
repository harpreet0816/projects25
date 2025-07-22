npm install --save-dev ts-jest @jest/globals @types/express
npm install supertest @types/supertest
npm install express

ts-jest and @jest/globals: Required for running Jest tests with TypeScript.
@types/express: TypeScript type definitions for Express.
supertest: A library for testing HTTP servers, including Express apps.
@types/supertest: TypeScript type definitions for Supertest.
express: The Express web framework.

Initialize Jest configuration:
npx ts-jest config:init