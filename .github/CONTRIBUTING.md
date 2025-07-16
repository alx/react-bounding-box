# Contributing to React Bounding Box

Thank you for your interest in contributing to React Bounding Box! This document provides guidelines and information about contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and professional in all interactions.

## Development Setup

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-bounding-box.git
   cd react-bounding-box
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a new branch for your feature:
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lintfix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run build` - Build the project
- `npm run storybook` - Start Storybook development server

### Making Changes

1. **Write Tests**: Add tests for any new functionality
2. **Follow Code Style**: Run `npm run lint` and fix any issues
3. **Type Safety**: Ensure TypeScript compilation passes with `npm run type-check`
4. **Documentation**: Update documentation if needed
5. **Test Your Changes**: Run the full test suite with `npm test`

### Commit Guidelines

We follow [Conventional Commits](https://conventionalcommits.org/) for commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add support for custom box styling
fix: resolve null canvas reference issue
docs: update README with new examples
```

## Pull Request Process

1. **Update Documentation**: Ensure any new features are documented
2. **Add Tests**: Include tests for new functionality
3. **Check CI**: Ensure all CI checks pass
4. **Fill PR Template**: Complete the pull request template
5. **Review Process**: Be responsive to feedback during review

### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Tests added for new functionality
- [ ] All tests pass locally
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Related issues referenced

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

- Use Jest and React Testing Library
- Test both functionality and edge cases
- Follow existing test patterns
- Aim for high test coverage

### Test Structure

```javascript
describe('Component', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle edge cases', () => {
    // Test edge cases
  });
});
```

## Code Style

### ESLint Configuration

The project uses ESLint with specific rules. Run `npm run lint` to check your code.

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Export types for public APIs

### Formatting

- Use Prettier for code formatting
- Run `npm run format` to format code
- Use meaningful variable names
- Keep functions small and focused

## Debugging

### Common Issues

1. **Canvas Reference Issues**: Check for null canvas references
2. **TypeScript Errors**: Run `npm run type-check` to identify issues
3. **Test Failures**: Check test output for specific error messages

### Debugging Tools

- Use React Developer Tools
- Browser DevTools for canvas debugging
- Jest debugging for test issues

## Release Process

Releases are automated through GitHub Actions:

1. Create a new tag: `git tag v1.0.0`
2. Push the tag: `git push origin v1.0.0`
3. GitHub Actions will automatically publish to npm

## Getting Help

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Ask questions in issue discussions
- Review the documentation and README

## Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── constants/       # Constants and defaults
├── stories/             # Storybook stories
├── dist/               # Build output
└── .github/            # GitHub workflows and templates
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to React Bounding Box! 🎉
