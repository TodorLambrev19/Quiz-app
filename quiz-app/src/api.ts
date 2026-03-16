import type { ApiResponse, Question, QuizConfig } from './types';

function decode(str: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export async function fetchQuestions(config: QuizConfig): Promise<Question[]> {
  const url = `https://opentdb.com/api.php?amount=10&category=${config.category}&difficulty=${config.difficulty}&type=multiple`;
  const res = await fetch(url);
  const data: ApiResponse = await res.json();

  if (data.response_code !== 0) {
    throw new Error('No questions available for this category.');
  }

  return data.results.map((q) => ({
    question: decode(q.question),
    correct: decode(q.correct_answer),
    options: shuffle([q.correct_answer, ...q.incorrect_answers].map(decode)),
  }));
}