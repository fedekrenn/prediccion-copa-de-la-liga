# Testing conventions

This folder is organized by test scope:

- `tests/routes/*.routes.test.ts`: route-level tests (HTTP contract and status codes).
- `tests/use-cases/*.use-case.test.ts`: business orchestration tests.
- `tests/utils/*.utils.test.ts`: utility/helper function tests.
- `tests/data/*`: shared mock data.

Naming conventions:

- Route tests: `*.routes.test.ts`
- Use-case tests: `*.use-case.test.ts`
- Utility tests: `*.utils.test.ts`
