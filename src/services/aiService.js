import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const AI_CACHE_COLLECTION = 'aiQuestions';
const MAX_QUESTIONS = 10;

const callOpenAI = async (topic, difficulty) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const prompt = `Generate ${MAX_QUESTIONS} multiple-choice interview questions about ${topic} at ${difficulty} difficulty level.
Return a JSON array where each item has: text, options (array of 4 strings), answer (index 0-3), explanation.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);

  const data = await response.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
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

    const questions = await callOpenAI(topic, difficulty);
    await aiService.saveToCache(topic, questions);
    return questions;
  },
};
