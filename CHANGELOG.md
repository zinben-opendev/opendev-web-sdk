# Changelog

All notable changes to `@opendev/sdk` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.6] - 2026-05-18

### Fixed

- **Payment mall**: format server prices for `CNY` / `JPY` with correct decimals (e.g. `CNY 0.12` instead of `CNY 12` when the API returns minor-unit-aligned amounts).
- **Purchasability**: honor optional `paymentEnabled` from `GET /v1/payment/products` before falling back to `product_tier` / `one_time` heuristics.

### Changed

- `PaymentProductDTO` includes optional `paymentEnabled` (Kotlin / Wasm consumers).
- Prebuilt artifacts published to GitHub dist repos: `opendev-android-sdk`, `opendev-ios-sdk`, `opendev-desktop-sdk`, `opendev-web-sdk` tag **`v2.0.6`**.

### Notes

- Requires OpenDev backend that exposes enabled tiers as `payment_product` with canonical tier prices (webapp deploy **≥ 20260518**).

## [2.0.5] - 2026-05-17

### Added

- Subscription iteration (W1–W8): entitlements / subscriptions HTTP APIs, `checkout/init` idempotency, strict IAP verify/finish, mall subscription UI aligned with OpenDev entitlements.
- GitHub dist tag **`v2.0.5`** (npm package version).

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
