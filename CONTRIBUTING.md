# Contributing to The Coding Ledger

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behavior to the project maintainers.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/solomonmboni/blog/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues and PRs to avoid duplication
2. Open a feature request issue with:
   - Clear description of the feature
   - Use cases and rationale
   - Any implementation ideas

### Pull Requests

1. Fork the repository
2. Create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (for backend)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection string
npm run prisma:generate
npm run prisma:push
npm run dev
```

## Project Structure

```
frontend/
├── app/           # Next.js app router
├── components/    # React components
├── public/        # Static assets
└── package.json

backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── index.ts
├── package.json
└── prisma/
```

## Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and reasonably sized

### Commit Convention

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code refactoring

## Pull Request Process

1. Ensure all tests pass
2. Update README.md with details of changes if needed
3. Update the version numbers in package.json to the new version
4. Request review from maintainers
5. Address review feedback

Thank you for contributing!