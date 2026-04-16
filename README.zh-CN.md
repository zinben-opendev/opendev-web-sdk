# @opendev/sdk

**文档语言：** 默认以英文 [`README.md`](README.md) 为准；本页为简体中文补充。

> OpenDev SDK 面向 JavaScript/TypeScript，基于 **Kotlin/Wasm** 的客户端（认证、支付、存储等）。**默认文档语言为英文。**

## 技术栈与语言

| 方面 | 说明 |
|------|------|
| **SDK 源码实现**（不在本包源码树内） | **Kotlin Multiplatform**，主要为 **`wasmJs`**，编译为 **WebAssembly**（`.wasm`）及 **JavaScript** 胶水（`.mjs` / `.js`）。 |
| **发布产物** | **`.wasm`**、**`.mjs`**、**`.d.ts`**（TypeScript 声明）及 **`package.json`** 的 `main` / `module` / `types`。 |
| **集成方应用** | 浏览器中的 **TypeScript** 或 **JavaScript**，需支持 **WebAssembly**。 |

## 从 GitHub 安装（无 npm registry 时）

固定 tag（例如 `v2.0.0`）：

```bash
npm install github:zinben-opendev/opendev-web-sdk#v2.0.0
```

入口模块与类型声明位于包内 `kotlin/`（见 `package.json` 的 `main` / `module` / `types`）。

## 功能概要

- 认证：Google、Facebook、Apple、微信等（以渠道配置为准）
- 支付与同步能力（以实际导出 API 为准）
- WebAssembly 运行时

## 快速开始

请参阅英文 [`README.md`](README.md) 中的 `initialize` / `login` 示例与 TypeScript 类型说明。

## 从 `@walknote.dev/sdk` 迁移

若曾使用旧 scope，请卸载并改用 `@opendev/sdk` 或上述 **GitHub** 依赖形式；import 路径改为 `@opendev/sdk`。（`@walknote.dev` 为历史 npm scope，小写；对外应用品牌仍为 **Walknote**。）

## 相关平台

- Android / Desktop / iOS 分发见组织内各 **opendev-*-sdk** 仓库及主仓 **`Docs/01-SDK/SDK_GITHUB_BINARIES_DISTRIBUTION.md`**。

## 许可证

MIT — 见 [LICENSE](LICENSE)。
