# CI/CD Setup Guide

This guide explains how to set up the CI/CD pipeline for react-bounding-box.

## Prerequisites

1. **GitHub Repository**: Ensure your repository is on GitHub
2. **npm Account**: You need an npm account for publishing
3. **GitHub Secrets**: Configure required secrets

## Required GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions, and add:

### 1. NPM_TOKEN

- Go to [npm](https://www.npmjs.com/)
- Login to your account
- Go to Access Tokens → Generate New Token
- Select "Automation" type
- Copy the token and add it as `NPM_TOKEN` in GitHub Secrets

### 2. GITHUB_TOKEN

- This is automatically provided by GitHub Actions
- No manual setup required

### 3. CODECOV_TOKEN (Optional)

- Go to [Codecov](https://codecov.io/)
- Link your GitHub account
- Add your repository
- Copy the token and add it as `CODECOV_TOKEN` in GitHub Secrets

## Workflow Files

The following workflow files are included:

### 1. `.github/workflows/ci-cd.yml`

Main CI/CD pipeline that:

- Runs on every push and PR
- Validates code quality
- Runs tests
- Builds the package
- Publishes to npm on tags

### 2. `.github/workflows/code-quality.yml`

Additional quality checks:

- Prettier formatting
- Console statement detection
- TODO/FIXME comment detection
- Bundle size analysis

### 3. `.github/workflows/dependency-update.yml`

Automated dependency management:

- Runs weekly on Mondays
- Updates dependencies
- Creates pull requests for updates

### 4. `.github/workflows/release.yml`

Manual release management:

- Triggered via GitHub Actions UI
- Handles version bumping
- Creates tags and releases

## Publishing Process

### Method 1: Tag-based Publishing (Recommended)

1. **Update version in package.json**:

   ```bash
   npm version patch  # or minor, major
   ```

2. **Push the tag**:

   ```bash
   git push origin v1.0.0
   ```

3. **Automatic publishing**: GitHub Actions will automatically publish to npm

### Method 2: Manual Release Workflow

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Release Management" workflow
4. Click "Run workflow"
5. Select version type (patch/minor/major)
6. Click "Run workflow"

## Branch Protection

Recommended branch protection rules for `main` branch:

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators

## Environment Configuration

### Production Environment

For sensitive operations, configure a production environment:

1. Go to Settings → Environments
2. Create "production" environment
3. Add deployment protection rules
4. Configure environment secrets if needed

## Monitoring and Notifications

### Slack Notifications (Optional)

Add Slack webhook URL as `SLACK_WEBHOOK_URL` secret to get notifications:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    channel: '#deployments'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Email Notifications

GitHub will automatically send email notifications for:

- Failed workflows
- Successful releases
- Security alerts

## Troubleshooting

### Common Issues

1. **npm publish fails**: Check NPM_TOKEN is valid and has publish permissions
2. **Tests fail**: Ensure all tests pass locally before pushing
3. **Build fails**: Check for TypeScript errors and missing dependencies
4. **Security audit fails**: Run `npm audit fix` locally

### Debug Steps

1. **Check workflow logs**: Go to Actions tab → Select failed workflow → View logs
2. **Test locally**: Run all commands locally to reproduce issues
3. **Check secrets**: Ensure all required secrets are configured
4. **Verify permissions**: Check npm token has correct permissions

## Security Considerations

1. **Never commit secrets**: Use GitHub Secrets for sensitive data
2. **Use minimal permissions**: Give tokens only necessary permissions
3. **Regular updates**: Keep dependencies updated via automated workflow
4. **Monitor alerts**: Review security alerts and dependabot PRs

## Performance Optimization

1. **Caching**: Dependencies are cached for faster builds
2. **Parallel jobs**: Tests and builds run in parallel
3. **Conditional execution**: Jobs only run when necessary
4. **Artifact sharing**: Build artifacts are shared between jobs

## Maintenance

### Regular Tasks

1. **Review dependency updates**: Weekly automated PRs
2. **Monitor workflow performance**: Check execution times
3. **Update workflows**: Keep GitHub Actions up to date
4. **Review security alerts**: Address vulnerabilities promptly

### Annual Tasks

1. **Audit permissions**: Review token permissions
2. **Update Node.js version**: Keep runtime current
3. **Review workflow efficiency**: Optimize slow steps
4. **Update documentation**: Keep this guide current

## Support

For issues with the CI/CD setup:

1. Check the workflow logs first
2. Review this documentation
3. Open an issue with workflow details
4. Check GitHub Actions community for common solutions

---

This setup provides a robust, automated CI/CD pipeline that ensures code quality, security, and reliable releases.
