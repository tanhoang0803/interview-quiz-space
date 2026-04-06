# Contributing

## Access Policy
This repository is **private and closed**. Only **TanQHoang** is permitted to contribute.

- No external pull requests will be reviewed or merged.
- No forks for contribution purposes.
- No external collaborators will be added.

## For TanQHoang — Workflow

### Branching
- `main` — production-ready code, protected
- `feature/<name>` — new features
- `fix/<name>` — bug fixes
- `chore/<name>` — tooling, deps, CI changes

### Commit Convention
```
feat: add Google login support
fix: correct scoring for partial answers
chore: update Firebase SDK to v10
docs: update README installation steps
```

### Before Committing
1. Run `npm test` — all tests must pass
2. Run `npm run build` — build must succeed
3. No `.env` files committed — check with `git status`

### Secrets
Add all API keys as GitHub repository secrets:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`
- `REACT_APP_OPENAI_API_KEY` (optional)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
