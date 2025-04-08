import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { clearUser } from "../utils/userStorage";

const FEEDBACK_TABLE = [
  { min: 100, message: "Perfeito! Você mandou muito bem!" },
  { min: 80, message: "Excelente!" },
  { min: 60, message: "Bom, mas dá pra melhorar." },
  { min: 40, message: "Estude mais e tente novamente!" },
  { min: 0, message: "Ops... vamos treinar mais um pouco?" },
];

export default function ResultScreen({ route, navigation }) {
  const { name, email, score, total } = route.params;

  const handleRetry = () => {
    navigation.replace("Quiz", { name, email });
  };

  const handleLogout = async () => {
    await clearUser();
    navigation.replace("Register");
  };

  const getFeedback = () => {
    const percentage = (score / total) * 100;

    const feedback = FEEDBACK_TABLE.find(({ min }) => percentage >= min);
    return feedback?.message || "";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz finalizado 🎉</Text>
      <Text style={styles.text}>Nome: {name}</Text>
      <Text style={styles.text}>E-mail: {email}</Text>
      <Text style={styles.text}>
        Pontuação: {score} / {total}
      </Text>

      <Text style={styles.feedback}>{getFeedback()}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Tente Novamente" onPress={handleRetry} />
        <Button title="Sair" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  feedback: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#333",
    marginTop: 24,
    marginBottom: 32,
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: 20,
    gap: 12,
  },
});
