# Contributing to Task Reminder

👍 First off, thanks for taking the time to contribute!

## Getting Started

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface, if applicable

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable
2. You may merge the Pull Request once you have the sign-off of one other developer

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Include proper type definitions
- Follow the existing code style
- Use interfaces over types when possible

### React Components
- Use functional components with hooks
- Keep components small and focused
- Document props using TypeScript interfaces
- Use proper component file naming: `ComponentName.tsx`

### CSS/Tailwind
- Follow the existing class naming convention
- Use Tailwind utility classes when possible
- Keep custom CSS to a minimum

## Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: feat, fix, docs, style, refactor, test, or chore
```

## Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-name`
- Documentation branches: `docs/doc-name`
- Style branches: `style/style-name`

## Testing Guidelines

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include integration tests when applicable
- Maintain test coverage above 80%

## Documentation

- Update documentation for any new features
- Include JSDoc comments for functions
- Update API documentation if endpoints change
- Keep README.md up to date

## Questions?

Don't hesitate to ask questions by creating an issue.