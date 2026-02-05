# AI Coding Agent Instructions for Fix_U_Car Backend

## Project Overview
Fix_U_Car backend is a Node.js service. This is an early-stage project focused on building a car repair/maintenance service API.

## Project Structure

Currently minimal structure:
- `package.json` - Node.js project configuration and dependencies
- `.git/` - Git repository for version control

**Future expected structure** (as development progresses):
- `src/` - Source code
- `tests/` - Test files
- `config/` - Configuration files
- `controllers/` - Route handlers
- `models/` - Data models
- `routes/` - API route definitions
- `middleware/` - Express/framework middleware

## Development Setup

```bash
# Install dependencies
npm install

# Run tests (currently stub)
npm test
```

## Key Development Principles

### 1. Framework & Architecture
- **Expected Framework**: Express.js (common Node.js choice for REST APIs)
- **API Style**: RESTful endpoints for car service management
- **Database**: To be determined (likely MongoDB, PostgreSQL, or similar)

### 2. Naming Conventions
- **Files**: Use kebab-case for file names (e.g., `user-controller.js`)
- **Variables/Functions**: Use camelCase (e.g., `getUserById()`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Classes**: Use PascalCase (e.g., `CarService`)

### 3. Code Organization Patterns
- **Separation of Concerns**: Keep route definitions, business logic, and data access separate
- **Error Handling**: Use consistent error handling middleware and meaningful error messages
- **Validation**: Validate input data at route level before processing

### 4. Dependencies & Versions
Once dependencies are added, refer to `package-lock.json` for exact versions. Keep `package.json` focused on direct dependencies only.

## Testing Strategy

Currently no test framework configured. When implementing:
- Use Jest or Mocha (popular Node.js test runners)
- Aim for unit tests for business logic
- Include integration tests for API endpoints
- Update `npm test` script accordingly

## Common Workflows

### Adding a New Feature
1. Create feature branch from `develop` (current branch shown in git)
2. Create/modify route handlers in appropriate controller file
3. Add validation and error handling
4. Write tests for new functionality
5. Submit pull request with description

### Code Review Focus Areas
- Proper error handling and status codes
- Input validation for all endpoints
- Consistent naming and structure
- Test coverage for new code

## Git Workflow
- **Main branch**: `main` (production-ready)
- **Development branch**: `develop` (current branch)
- **Feature branches**: Create from `develop`, PR back to `develop`
- Commits should be clear and descriptive

## Important Notes for AI Agents

1. **Project is in early stages** - Many conventions and structure decisions are not yet established. Propose sensible defaults if uncertain.
2. **File creation** - New files should follow the expected structure conventions outlined above.
3. **Dependencies** - Check `package.json` before suggesting new packages. Avoid adding unnecessary dependencies.
4. **Error Handling** - Always include proper error handling in new code
5. **Validation** - Validate all user inputs at API boundaries

## Related Files to Reference
- [package.json](package.json) - Project metadata and dependencies
- `.git/` - Repository history and branch information

