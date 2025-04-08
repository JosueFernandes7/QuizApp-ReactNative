export function getRandomQuestions(allQuestions, amount = 10) {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, amount);
  }
  