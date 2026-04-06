import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Groq API — free tier, llama-3.1-8b-instant
// Get your free key at: https://console.groq.com
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const AI_CACHE_COLLECTION = 'aiQuestions';
const MAX_QUESTIONS = 10;

const callGroq = async (topic, difficulty) => {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) throw new Error('Groq API key not configured. Add REACT_APP_GROQ_API_KEY to .env');

  const prompt = `Generate ${MAX_QUESTIONS} multiple-choice interview questions about ${topic} at ${difficulty} difficulty level.
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
      temperature: 0.6,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Groq API error ${response.status}: ${err.error?.message ?? 'unknown'}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();

  // Strip markdown code fences if the model wrapped the JSON
  const json = content.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(json);
};

export const aiService = {
  getCachedQuestions: async (topic) => {
    const ref = doc(db, AI_CACHE_COLLECTION, topic);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    return snapshot.data().questions;
  },

  saveToCache: async (topic, questions) => {
    const ref = doc(db, AI_CACHE_COLLECTION, topic);
    await setDoc(ref, { questions, updatedAt: serverTimestamp() });
  },

  generateQuestions: async (topic, difficulty = 'intermediate') => {
    const cached = await aiService.getCachedQuestions(topic);
    if (cached) return cached;

    const questions = await callGroq(topic, difficulty);
    await aiService.saveToCache(topic, questions);
    return questions;
  },
};
