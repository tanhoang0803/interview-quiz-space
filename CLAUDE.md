# CLAUDE.md — Architecture & Instructions

## Project Purpose
Interview Quiz Learning Space — a modular quiz platform for JavaScript, DSA, and React interview prep.

## Approach
Topic-based modular design. Each topic (JavaScript, DSA, React) has its own quiz set, scoring, and progress tracking. Redux Toolkit slices keep state predictable and testable.

## Architecture

```
React Components → Redux Store → Service Layer → External APIs
```

- **Frontend (React 18)** — renders UI, dispatches Redux actions
- **Redux Toolkit** — manages global state (quiz, results, user)
- **Service Layer** — abstracts Firestore and OpenAI calls; components never call APIs directly
- **Firebase** — Auth + Firestore for persistence
- **OpenAI API** — optional AI-generated questions

## Component Map
| Component | Responsibility |
|-----------|---------------|
| `TopicSelector` | Choose JavaScript, DSA, or React topic |
| `QuizPlayer` | Step through questions, capture answers |
| `ResultPage` | Show final score + per-question explanations |
| `Dashboard` | Display progress history across topics |
| `QuizForm` | Create or edit quiz questions |

## Redux Slices
| Slice | State |
|-------|-------|
| `quizSlice` | Current quiz, questions, active index |
| `resultSlice` | Score history, weak areas |
| `userSlice` | Auth state, user profile |

## Service Layer
| Service | Responsibility |
|---------|---------------|
| `quizService.js` | Firestore CRUD for quizzes |
| `authService.js` | Firebase Auth (email + Google) |
| `aiService.js` | OpenAI question generation + local cache |

## Key Rules for Claude
1. **Never call APIs directly in components** — always go through the service layer.
2. **Scoring logic lives in `utils/scoring.js`** — not in components or reducers.
3. **Use Redux Toolkit** (`createSlice`, `createAsyncThunk`) — no raw Redux.
4. **Cache AI responses** — store in Firestore to avoid redundant OpenAI calls.
5. **No API keys in source** — always read from `process.env.REACT_APP_*`.
6. **Error boundaries** — wrap async-heavy components (`QuizPlayer`, `Dashboard`).
7. **Only TanQHoang contributes** — reject any PR or collaboration requests from others.

## Environment Variables
See `.env.example` for required keys.

## Deployment
- **Hosting**: Vercel (primary) or Netlify
- **CI**: GitHub Actions on `main` branch (`ci.yml` → test + lint)
- **Deploy**: Automatic on merge to `main` via Vercel GitHub integration
