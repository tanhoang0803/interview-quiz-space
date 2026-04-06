import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const resultService = {
  saveResult: async (uid, result) => {
    const ref = collection(db, 'users', uid, 'results');
    await addDoc(ref, { ...result, createdAt: serverTimestamp() });
  },

  getHistory: async (uid) => {
    const ref = collection(db, 'users', uid, 'results');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  getWeakAreas: (history, topic) => {
    const topicResults = history.filter((r) => r.topic === topic);
    const wrongCounts = {};
    topicResults.forEach((result) => {
      result.breakdown.forEach((item) => {
        if (!item.isCorrect) {
          wrongCounts[item.questionIndex] =
            (wrongCounts[item.questionIndex] || 0) + 1;
        }
      });
    });
    return Object.entries(wrongCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([index, count]) => ({ questionIndex: Number(index), wrongCount: count }));
  },
};
