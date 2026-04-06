import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { getStaticQuizById } from '../data/staticQuizzes';

const QUIZZES_COLLECTION = 'quizzes';

export const quizService = {
  getQuizzesByTopic: async (topic) => {
    const q = query(
      collection(db, QUIZZES_COLLECTION),
      where('topic', '==', topic)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  getQuizById: async (id) => {
    if (id.startsWith('static-')) {
      const quiz = getStaticQuizById(id);
      if (!quiz) throw new Error(`Static quiz ${id} not found`);
      return quiz;
    }
    const ref = doc(db, QUIZZES_COLLECTION, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) throw new Error(`Quiz ${id} not found`);
    return { id: snapshot.id, ...snapshot.data() };
  },

  createQuiz: async (data) => {
    const ref = await addDoc(collection(db, QUIZZES_COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  },

  updateQuiz: async (id, data) => {
    const ref = doc(db, QUIZZES_COLLECTION, id);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  },

  deleteQuiz: async (id) => {
    const ref = doc(db, QUIZZES_COLLECTION, id);
    await deleteDoc(ref);
  },

  getAllQuizzes: async () => {
    const topics = ['javascript', 'dsa', 'react'];
    const results = await Promise.all(
      topics.map((t) =>
        getDocs(query(collection(db, QUIZZES_COLLECTION), where('topic', '==', t)))
          .then((snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      )
    );
    return results.flat();
  },
};
