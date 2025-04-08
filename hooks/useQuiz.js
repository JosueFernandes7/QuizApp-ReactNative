import { useState } from 'react';

export function useQuiz(questions, onFinish) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const answer = (selected) => {
    const isCorrect = selected === questions[index].correct;
    const newScore = isCorrect ? score + 1 : score;

    if (index + 1 < questions.length) {
      setScore(newScore);
      setIndex(index + 1);
    } else {
      onFinish(newScore);
    }
  };

  return {
    currentQuestion: questions[index],
    index,
    answer,
  };
}
