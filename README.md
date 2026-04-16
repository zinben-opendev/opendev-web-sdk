# @opendev/sdk

**Documentation:** English (default) · [简体中文](README.zh-CN.md)

> OpenDev SDK for JavaScript/TypeScript — Kotlin/Wasm multiplatform client (authentication, payments, storage). **Default documentation language is English.**

## Technical stack (languages)

| Aspect | What this package / repo contains |
|--------|-----------------------------------|
| **SDK implementation (source, not in this repo)** | **Kotlin Multiplatform** — primarily **`wasmJs`** output compiled to **WebAssembly** (`.wasm`) with **JavaScript** module glue (`.mjs` / `.js`). |
| **Shipped artifacts** | **`.wasm`**, **`.mjs`**, generated **`.d.ts`** (TypeScript declarations), and **`package.json`** entry points (`main` / `module` / `types`). |
| **Typical consumer apps** | **TypeScript** or **JavaScript** in browsers with **WebAssembly** support. |

[![npm version](https://badge.fury.io/js/%40opendev%2Fsdk.svg)](https://badge.fury.io/js/%40opendev%2Fsdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🔐 **Authentication**: Support for Google, Facebook, Apple, and WeChat sign-in
- 💳 **Payment Processing**: Integrated payment solutions
- 🔄 **Data Synchronization**: Efficient cloud data sync
- 🔒 **Security**: AES-256-GCM encryption
- ⚡ **WebAssembly**: High-performance Kotlin/Wasm runtime
- 📦 **Cross-Platform**: Part of Kotlin Multiplatform SDK

## Installation

### From npm registry

```bash
npm install @opendev/sdk
# or
yarn add @opendev/sdk
# or
pnpm add @opendev/sdk
```

### From GitHub (prebuilt `kotlin/` binaries on tag)

Pin a release tag (example `v2.0.0`):

```bash
npm install github:zinben-opendev/opendev-web-sdk#v2.0.0
```

See **`Docs/01-SDK/SDK_GITHUB_BINARIES_DISTRIBUTION.md`** in the Walknote monorepo for the full distribution process.

## Quick Start

### Initialize SDK

```javascript
import { OpenDevSDK, Environment } from '@opendev/sdk';

// Initialize the SDK
const config = {
  cdnBaseUrl: 'https://cdn.example.com/sdk',
  cdnToken: 'your-token',
  channelKey: 'google_global',
  environment: Environment.STAGING
};

await OpenDevSDK.initialize(config);
```

### Authentication

```javascript
// Google Sign-In
try {
  const user = await OpenDevSDK.login('GOOGLE');
  console.log('Logged in user:', user.id);
} catch (error) {
  console.error('Login failed:', error);
}

// Get current user
const currentUser = OpenDevSDK.getCurrentUser();

// Logout
await OpenDevSDK.logout();
```

### TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { OpenDevSDK, PlatformConfig, User, Environment, LoginMethod } from '@opendev/sdk';

const config: PlatformConfig = {
  cdnBaseUrl: 'https://cdn.example.com/sdk',
  cdnToken: 'your-token',
  environment: Environment.PRODUCTION
};

const user: User = await OpenDevSDK.login(LoginMethod.GOOGLE);
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 89+ |
| Firefox | 89+ |
| Safari | 15+ |
| Edge | 89+ |

> Note: Requires WebAssembly support

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `cdnBaseUrl` | string | Yes | Base URL for SDK resources |
| `cdnToken` | string | Yes | Authentication token for CDN |
| `channelKey` | string | No | Channel identifier |
| `environment` | Environment | Yes | Runtime environment |

## API Reference

### OpenDevSDK

| Method | Description |
|--------|-------------|
| `initialize(config)` | Initialize the SDK with configuration |
| `login(method)` | Authenticate user with specified method |
| `logout()` | Sign out current user |
| `getCurrentUser()` | Get currently authenticated user |
| `isInitialized()` | Check if SDK is initialized |

### Types

```typescript
interface PlatformConfig {
  cdnBaseUrl: string;
  cdnToken: string;
  channelKey?: string;
  environment: Environment;
}

interface User {
  id: string;
  username?: string;
  email?: string;
  avatar?: string;
}

enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION'
}

enum LoginMethod {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  APPLE = 'APPLE',
  WECHAT = 'WECHAT'
}
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Migrating from `@walknote.dev/sdk`

Change the dependency and import path:

```bash
npm uninstall @walknote.dev/sdk
npm install @opendev/sdk
```

```diff
- import { OpenDevSDK, Environment } from '@walknote.dev/sdk';
+ import { OpenDevSDK, Environment } from '@opendev/sdk';
```

After publishing `@opendev/sdk`, maintainers may deprecate the legacy scope:

```bash
npm deprecate @walknote.dev/sdk@"< 2" "Moved to @opendev/sdk; update your dependency and imports."
```

## Related Packages

- **Android SDK**: Available on Maven Central as `io.github.zinben-opendev:opendev-android-sdk`
- **iOS SDK**: Available on CocoaPods as `OpenDevSDK`
- **Desktop SDK**: Available on Maven Central as `io.github.zinben-opendev:opendev-desktop-sdk`

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contact

- Email: contact@zinben.com
- GitHub: [@zinben-opendev](https://github.com/zinben-opendev)
- Issues: [GitHub Issues](https://github.com/zinben-opendev/opendev-web-sdk/issues)
