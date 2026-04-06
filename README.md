# Interview Quiz Learning Space

[![CI](https://github.com/tanhoang0803/interview-quiz-space/actions/workflows/ci.yml/badge.svg)](https://github.com/tanhoang0803/interview-quiz-space/actions/workflows/ci.yml)
[![Deploy](https://github.com/tanhoang0803/interview-quiz-space/actions/workflows/deploy.yml/badge.svg)](https://github.com/tanhoang0803/interview-quiz-space/actions/workflows/deploy.yml)

## Live Demo
**[https://interview-quiz-space.vercel.app](https://interview-quiz-space.vercel.app)**

## Overview
A free learning platform for practicing interview questions in:
- JavaScript fundamentals
- Data Structures & Algorithms (DSA) in JavaScript
- React concepts

## Why It Matters
This project helps learners prepare for technical interviews by combining **quizzes, scoring logic, and progress tracking**. It's designed to be small but realistic, with a senior-level architecture mindset.

## Features
- Quizzes on JavaScript, DSA, and React
- Instant scoring with explanations
- Progress tracking dashboard
- Firebase authentication (email/password + Google)
- AI-generated practice questions via Groq (llama-3.1-8b-instant, free tier)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Redux Toolkit |
| Auth & Storage | Firebase (Auth + Firestore) |
| AI Assist | Groq API — llama-3.1-8b-instant (free tier) |
| Hosting | Vercel (free tier) |
| CI/CD | GitHub Actions |

## Project Structure
```
src/
├── components/
│   ├── TopicSelector/    # Choose JavaScript, DSA, or React
│   ├── QuizPlayer/       # Take quizzes
│   ├── ResultPage/       # Score + explanations
│   ├── Dashboard/        # Progress tracking
│   └── QuizForm/         # Create/edit quizzes
├── store/
│   ├── slices/
│   │   ├── quizSlice.js   # Quiz data
│   │   ├── resultSlice.js # Scores and history
│   │   └── userSlice.js   # Authentication state
│   └── index.js
├── services/
│   ├── quizService.js    # CRUD with Firestore
│   ├── authService.js    # Firebase login
│   └── aiService.js      # Groq AI question generation
├── firebase/
│   └── config.js
├── data/
│   └── questions/        # Seed question banks
└── utils/
    └── scoring.js        # Scoring logic
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tanhoang0803/interview-quiz-space.git
cd interview-quiz-space
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` from the template:
```bash
cp .env.example .env
# Fill in your Firebase and Groq keys
```

4. Run the app:
```bash
npm start
```

5. Build for production:
```bash
npm run build
```

## Rules
- Repository: [tanhoang0803/interview-quiz-space](https://github.com/tanhoang0803/interview-quiz-space.git)
- **Sole contributor: TanQHoang** (`hoangquoctan.1996@gmail.com`)
- No external collaborators, forks, or pull requests accepted.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
Private — all rights reserved by TanQHoang.
