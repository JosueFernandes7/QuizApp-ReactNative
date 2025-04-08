import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { questions } from '../data/questions';
import { getRandomQuestions } from '../utils/randomizeQuestions';
import { useQuiz } from '../hooks/useQuiz';
import QuizQuestion from '../components/QuizQuestion';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const NUMBER_OF_QUESTIONS = 5;

export default function QuizScreen({ navigation, route }) {
  const { name, email } = route.params;
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const progress = useSharedValue(0);

  // Sort new questions when goes to a new screen
  useEffect(() => {
    const selected = getRandomQuestions(questions, NUMBER_OF_QUESTIONS);
    setShuffledQuestions(selected);
  }, []);

  const totalQuestions = shuffledQuestions.length;

  const finishQuiz = (score) => {
    navigation.replace('Result', { name, email, score, total: totalQuestions });
  };

  const { currentQuestion, index, answer } = useQuiz(shuffledQuestions, finishQuiz);

  // Update the progress bar
  useEffect(() => {
    if (totalQuestions > 0) {
      progress.value = withTiming((index + 1) / totalQuestions, { duration: 500 });
    }
  }, [index, totalQuestions]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (shuffledQuestions.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressInner, animatedStyle]} />
      </View>

      <Text style={styles.counter}>
        Questão {index + 1} de {totalQuestions}
      </Text>

      <QuizQuestion question={currentQuestion} onAnswer={answer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressInner: {
    height: '100%',
    backgroundColor: '#6200EE',
  },
  counter: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
});
