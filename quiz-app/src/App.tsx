import { useState } from 'react';
import type { Question, Screen, QuizConfig } from './types';
import { fetchQuestions } from './api';
import Setup from './components/Setup';
import QuizQuestion from './components/QuizQuestion';
import Result from './components/Result';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [config, setConfig] = useState<QuizConfig>({ category: 9, difficulty: 'medium' });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const startQuiz = async () => {
    setScreen('loading');
    setError('');
    try {
      const data = await fetchQuestions(config);
      setQuestions(data);
      setCurrent(0);
      setScore(0);
      setAnswered(false);
      setSelectedIdx(null);
      setScreen('quiz');
    } catch (e) {
      setError('Could not load questions. Please try again.');
      setScreen('setup');
    }
  };

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedIdx(idx);
    if (questions[current].options[idx] === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelectedIdx(null);
    } else {
      setScreen('result');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <span className="logo">QuizApp</span>
      </header>

      <main className="main">
        <div className="card">
          {screen === 'setup' && (
            <>
              {error && <p className="error">{error}</p>}
              <Setup config={config} onChange={setConfig} onStart={startQuiz} />
            </>
          )}
          {screen === 'loading' && <p className="loader">Fetching questions...</p>}
          {screen === 'quiz' && questions.length > 0 && (
            <QuizQuestion
              question={questions[current]}
              questionNumber={current + 1}
              total={questions.length}
              score={score}
              answered={answered}
              selectedIdx={selectedIdx}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}
          {screen === 'result' && (
            <Result
              score={score}
              total={questions.length}
              onRestart={startQuiz}
              onNewSetup={() => setScreen('setup')}
            />
          )}
        </div>
      </main>
    </div>
  );
}