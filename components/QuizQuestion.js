import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuizQuestion({ question, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (index) => {
    if (selectedOption !== null) return; // Prevent multiple answers
    setSelectedOption(index);

    setTimeout(() => {
      onAnswer(index);
      setSelectedOption(null); // reset after answer
    }, 1000); // give time to show feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>

      {question.options.map((option, index) => {
        let backgroundColor = '#eee';

        if (selectedOption !== null) {
          if (index === question.correct) {
            backgroundColor = '#8BC34A'; // green for correct
          } else if (index === selectedOption) {
            backgroundColor = '#F44336'; // red for wrong
          }
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, { backgroundColor }]}
            onPress={() => handleSelect(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
