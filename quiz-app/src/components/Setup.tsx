import type { Category, Difficulty, QuizConfig } from '../types';

const CATEGORIES: Category[] = [
  { id: 9,  name: 'General Knowledge' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Computers' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
];

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

interface Props {
  config: QuizConfig;
  onChange: (config: QuizConfig) => void;
  onStart: () => void;
}

export default function Setup({ config, onChange, onStart }: Props) {
  return (
    <div className="setup">
      <h2>Quiz Setup</h2>
      <p className="subtitle">Choose a category and difficulty</p>

      <div className="section-label">Category</div>
      <div className="cat-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${config.category === cat.id ? 'selected' : ''}`}
            onClick={() => onChange({ ...config, category: cat.id })}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="section-label">Difficulty</div>
      <div className="diff-row">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            className={`diff-btn ${config.difficulty === d ? 'selected' : ''}`}
            onClick={() => onChange({ ...config, difficulty: d })}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <button className="start-btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
}