# Contributing to moleculer-browser

## Issue Contributions

When opening new issues or commenting on existing issues on this repository
please make sure discussions are related to concrete technical issues.

Try to be *friendly* and explain correctly how we can reproduce your issue.

## Code Contributions

This document will guide you through the contribution process.

### Step 1: Fork

Fork the project [on GitHub](https://github.com/icebob/moleculer-browser) and check out your copy locally.

```bash
$ git clone git@github.com:username/moleculer-browser.git
$ cd moleculer-browser
$ npm install
$ git remote add upstream git://github.com/icebob/moleculer-browser.git
```

### Step 2: Branch

Create a feature branch and start hacking:

```bash
$ git checkout -b my-feature-branch -t origin/main
```

### Step 3: Test

Bug fixes and features **should come with tests**. We use [Vitest](https://vitest.dev/) with [Playwright](https://playwright.dev/) for browser testing.

```bash
$ npm test
```

### Step 4: Lint

Make sure the linter is happy and that all tests pass. Please, do not submit
patches that fail either check.

We use [standard](https://standardjs.com/)

### Step 5: Commit

Writing good commit logs is important. A commit log should describe what
changed and why.

### Step 6: Push

```bash
$ git push origin my-feature-branch
```

### Step 7: Make a pull request ;)
