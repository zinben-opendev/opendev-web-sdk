# Changelog

All notable changes to `@opendev/sdk` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-04-14

### Changed

- **BREAKING**: NPM package renamed from `@walknote.dev/sdk` to **`@opendev/sdk`** to align OpenDev SDK branding.
- TypeScript ambient module updated to `declare module '@opendev/sdk'` (update all `import '…'` paths).

### Migration

- Replace `npm install @walknote.dev/sdk` with `npm install @opendev/sdk`.
- Replace imports from `@walknote.dev/sdk` with `@opendev/sdk`.
- Publishing requires an NPM org or user scope **`opendev`** with publish rights (create at https://www.npmjs.com/org/create if needed; if the slug is unavailable, choose another scope and update `package.json` accordingly).

## [1.0.0] - 2024-12-18

### Added

- Initial release on NPM as **`@walknote.dev/sdk@1.0.0`** for JavaScript/TypeScript
- WebAssembly (Kotlin/Wasm) runtime support
- Authentication support:
  - Google Sign-In
  - Facebook Login
  - Apple Sign-In
  - WeChat Login
- Payment processing integration
- Data synchronization with cloud services
- AES-256-GCM encryption for secure data handling
- Dynamic configuration management
- Full TypeScript type definitions
- Browser support: Chrome 89+, Firefox 89+, Safari 15+, Edge 89+
- Built with Kotlin Multiplatform for cross-platform compatibility

### Technical Details

- Runtime: WebAssembly (Kotlin/Wasm)
- Bundle format: ES Module + CommonJS
- Node.js requirement: >= 16.0.0
