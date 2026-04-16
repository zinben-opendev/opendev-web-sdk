# Contributing

## What this repository is

**Prebuilt binaries** (XCFramework, AAR, JAR, Wasm/JS) and metadata produced by the OpenDev SDK **Kotlin Multiplatform** build. It is **not** the primary source tree.

## How to contribute

| Change type | Where to go |
|-------------|-------------|
| **SDK behaviour, APIs, or platform code** | Upstream **Kotlin Multiplatform** sources and release tooling (maintainers); not drive-by binary replacement PRs here. |
| **Documentation** (`README`, this file, `SECURITY.md`) | Open a **GitHub Issue** first for visible mistakes; small typo PRs welcome after maintainer visibility. |
| **Release layout / staging / CI** | Walknote monorepo `scripts/sdk-publishing/` and `Docs/01-SDK/SDK_GITHUB_BINARIES_DISTRIBUTION.md` (maintainer-facing). |

## Pull requests that replace binaries

PRs that only replace `.aar` / `.jar` / `.wasm` / XCFramework slices **without** a linked, reproducible build from the official pipeline will be **closed**. Use the documented **tag + checksum** workflow instead.
