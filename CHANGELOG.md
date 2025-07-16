# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.1] - 2025-07-16

### Added

- GitHub Actions CI/CD pipeline for automated testing and deployment
- Automated npm publishing on git tags
- Automated dependency updates via GitHub Actions
- Code quality checks and security scanning
- Automated Storybook deployment to GitHub Pages
- Logger utility for better debugging and development experience

### Changed

- Improved build process with webpack optimization
- Enhanced TypeScript configuration and declarations
- Updated security dependencies
- Updated Code Quality workflow to use ESLint for console detection

### Fixed

- Fixed null canvas reference issues in legacy component
- Fixed TypeScript compilation errors
- Fixed ESLint configuration for modern JavaScript
- Fixed console statements to use logger utility with NODE_ENV guards
- Fixed GitHub CI/CD workflow failures

## [0.6.0] - 2025-01-16

### Added

- Modern React 18+ support with new JSX transform
- Comprehensive Jest testing with React Testing Library
- TypeScript definitions for all components and hooks
- Modern CI/CD pipeline with GitHub Actions
- Automated security scanning and code quality tools
- Enhanced package exports for better tree-shaking

### Changed

- **BREAKING**: Minimum Node.js requirement to 16+
- **BREAKING**: Modernized to React 18+ with new JSX transform
- Migrated to Webpack 5 and Babel 7
- Updated all dependencies to latest versions
- Zero npm audit vulnerabilities

### Fixed

- Canvas reference null checks in legacy component
- TypeScript compilation errors
- ESLint configuration issues
- Build process optimization

## [0.5.21] - Previous releases

See README.md for historical changelog information.
