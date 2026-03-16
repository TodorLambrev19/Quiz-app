import type { Question } from '../types';

interface Props {
  question: Question;
  questionNumber: number;
  total: number;
  score: number;
  answered: boolean;
  selectedIdx: number | null;
  onAnswer: (idx: number) => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  total,
  score,
  answered,
  selectedIdx,
  onAnswer,
  onNext,
}: Props) {
  const progress = ((questionNumber - 1) / total) * 100;
  const isCorrect = selectedIdx !== null && question.options[selectedIdx] === question.correct;

  return (
    <div className="quiz">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="meta">
        <span className="badge">Question {questionNumber} of {total}</span>
        <span className="score-pill">Score: {score}</span>
      </div>

      <p className="question">{question.question}</p>

      <div className="options">
        {question.options.map((opt, i) => {
          let cls = '';
          if (answered) {
            if (opt === question.correct) cls = 'correct';
            else if (i === selectedIdx) cls = 'wrong';
          }
          return (
            <button
              key={i}
              className={`opt-btn ${cls}`}
              onClick={() => onAnswer(i)}
              disabled={answered}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <p className={`feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`}>
          {isCorrect ? 'Correct!' : `Correct answer: ${question.correct}`}
        </p>
      )}

      <button className="next-btn" onClick={onNext} disabled={!answered}>
        {questionNumber < total ? 'Next Question' : 'See Results'}
      </button>
    </div>
  );
}