import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const TOTAL_QUESTIONS = 10;
const RECYCLE_MIN = 3;
const RECYCLE_MAX = 5;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const callGroq = async (topic, difficulty, count, excludeTexts = []) => {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) throw new Error('Groq API key not configured. Add REACT_APP_GROQ_API_KEY to .env');

  const exclusionNote = excludeTexts.length > 0
    ? `\n\nIMPORTANT: Do NOT generate questions about any of these topics already covered:\n${excludeTexts.map((t, i) => `${i + 1}. ${t}`).join('\n')}\nAll ${count} questions must have completely new content.`
    : '';

  const prompt = `Generate exactly ${count} multiple-choice interview questions about ${topic} at ${difficulty} difficulty level.${exclusionNote}

Return ONLY a valid JSON array with no extra text. Each item must have:
- "text": the question string
- "options": array of exactly 4 answer strings
- "answer": integer index 0-3 of the correct option
- "explanation": string explaining why the correct answer is right`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Groq API error ${response.status}: ${err.error?.message ?? 'unknown'}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  const json = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(json);
};

// Fetch all questions from previous AI-generated quizzes for this topic
const getExistingAIQuestions = async (topic) => {
  const q = query(collection(db, 'quizzes'), where('topic', '==', topic));
  const snapshot = await getDocs(q);
  const pool = [];
  snapshot.docs.forEach((d) => {
    const data = d.data();
    if (data.source === 'ai' && Array.isArray(data.questions)) {
      pool.push(...data.questions);
    }
  });
  return pool;
};

export const aiService = {
  generateQuestions: async (topic, difficulty = 'intermediate') => {
    // 1. Pool all questions from previous AI sets for this topic
    const existing = await getExistingAIQuestions(topic);

    // 2. Pick 3-5 to recycle (only if enough exist)
    const recycleCount = existing.length >= RECYCLE_MIN
      ? Math.floor(Math.random() * (RECYCLE_MAX - RECYCLE_MIN + 1)) + RECYCLE_MIN
      : 0;
    const recycled = shuffle(existing).slice(0, recycleCount);

    // 3. Generate the remaining new questions, excluding all known question texts
    const newCount = TOTAL_QUESTIONS - recycleCount;
    const existingTexts = existing.map((q) => q.text);
    const newQuestions = await callGroq(topic, difficulty, newCount, existingTexts);

    // 4. Combine recycled + new, shuffle into one 10-question set
    return shuffle([...recycled, ...newQuestions]);
  },
};
