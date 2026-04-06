import React, { useState } from 'react';
import { seedDatabase } from '../../utils/seedData';

const SeedPage = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [log, setLog] = useState([]);

  const handleSeed = async () => {
    setStatus('loading');
    setLog([]);
    try {
      const originalLog = console.log;
      console.log = (...args) => {
        setLog((prev) => [...prev, args.join(' ')]);
        originalLog(...args);
      };
      await seedDatabase();
      console.log = originalLog;
      setStatus('done');
    } catch (err) {
      setLog((prev) => [...prev, 'ERROR: ' + err.message]);
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '80px auto', padding: 24, fontFamily: 'monospace' }}>
      <h2>Seed Database</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Populates Firestore with starter quizzes (JavaScript, DSA, React).<br />
        <strong>Run once, then delete this page.</strong>
      </p>

      <button
        onClick={handleSeed}
        disabled={status === 'loading' || status === 'done'}
        style={{
          padding: '12px 28px',
          background: status === 'done' ? '#38a169' : '#4a6cf7',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          fontSize: '1rem',
          fontWeight: 700,
          cursor: status === 'loading' || status === 'done' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'idle' && 'Seed Firestore'}
        {status === 'loading' && 'Seeding...'}
        {status === 'done' && 'Done!'}
        {status === 'error' && 'Retry'}
      </button>

      {log.length > 0 && (
        <pre style={{
          marginTop: 24,
          background: '#1a1a2e',
          color: '#a0f0a0',
          padding: 16,
          borderRadius: 10,
          fontSize: '0.85rem',
          lineHeight: 1.7,
        }}>
          {log.join('\n')}
        </pre>
      )}

      {status === 'done' && (
        <p style={{ marginTop: 16, color: '#38a169', fontWeight: 600 }}>
          Quizzes seeded! Go to <a href="/">Home</a> and pick a topic.
        </p>
      )}
    </div>
  );
};

export default SeedPage;
