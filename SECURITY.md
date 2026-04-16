# Security policy

## Supported versions

This repository distributes **prebuilt OpenDev SDK binaries** tagged as **`vX.Y.Z`**. Security-sensitive metadata fixes may land on the **latest** tag for a given minor line; always **pin the tag** you ship and verify **`CHECKSUMS.sha256`**.

## Reporting a vulnerability

**Do not** use public GitHub issues for **undisclosed** security vulnerabilities.

Send email to **contact@zinben.com** with subject **`[security]`** and include:

- Repository name (for example `opendev-ios-sdk`)
- **Git tag** or commit you depend on
- Short impact summary and reproduction hints (if any)

We aim to acknowledge within **5 business days** (best effort). These repos contain **compiled artifacts** only; SDK **source** maintenance follows the upstream Kotlin Multiplatform release process under **zinben-opendev**.

## Safe integration

- Pin an exact **`:tag` / `#vX.Y.Z`** and verify **`CHECKSUMS.sha256`** after download.
- Never commit **CDN tokens**, signing keys, or channel secrets to application repositories.
- Review **`sbom/`** for third-party versions you inherit at link time.
