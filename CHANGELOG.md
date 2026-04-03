# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Upgraded Moleculer from 0.14 to 0.15.0
- Upgraded Rollup from 2.x to 4.x with modernized plugin stack
- Replaced Jest + Puppeteer with Vitest + Playwright for browser testing
- Updated ESLint config to ES2022
- Replaced `os.*` replace hacks with proper `src/shims/os.js` module
- Added `perf_hooks` and `glob` shims
- Updated module alias list for Moleculer 0.15 (cbor serializer, debugging middlewares)
- Removed Travis CI, cleaned up documentation

### Fixed
- Browser compatibility issues with `os.hostname()` replacement
- `FormattedLogger` alias crash (ConsoleLogger extends it)
- ESLint errors across the codebase

## [0.0.3] - 2019-07-24
### Fixed
- Outdated events module.

## 0.0.2 - 2019-07-23
### Added
- Initial code.

[Unreleased]: https://github.com/icebob/moleculer-browser/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/icebob/moleculer-browser/compare/v0.0.2...v0.0.3
