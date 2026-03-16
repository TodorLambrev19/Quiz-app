interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  onNewSetup: () => void;
}

export default function Result({ score, total, onRestart, onNewSetup }: Props) {
  const pct = Math.round((score / total) * 100);
  const msg = pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort!' : 'Keep practicing!';
  const sub = pct >= 80 ? 'You really know your stuff.' : pct >= 50 ? "A few more tries and you'll nail it." : 'Every quiz makes you smarter.';

  return (
    <div className="result">
      <span className="badge">Quiz Complete</span>
      <div className="result-score">{score}/{total}</div>
      <div className="result-pct">{pct}% correct</div>
      <p className="result-msg">{msg}</p>
      <p className="result-sub">{sub}</p>
      <div className="result-btns">
        <button className="restart-btn" onClick={onRestart}>Play Again</button>
        <button className="restart-btn" onClick={onNewSetup}>Change Category</button>
      </div>
    </div>
  );
}