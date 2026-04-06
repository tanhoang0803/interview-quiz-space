# AuthAgent

Manages Firebase authentication.

## Responsibilities
- Email/password login and registration
- Google OAuth login
- Session management (persist auth state)
- Logout

## Tools
- `authService.loginWithEmail(email, password)`
- `authService.registerWithEmail(email, password)`
- `authService.loginWithGoogle()`
- `authService.logout()`
- `authService.getCurrentUser()`

## Rules
- Auth state is synced to Redux `userSlice` via `onAuthStateChanged`
- Never store passwords or tokens in Redux or localStorage
