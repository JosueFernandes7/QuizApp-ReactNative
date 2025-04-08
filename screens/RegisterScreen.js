import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { saveUser, getUser } from '../utils/userStorage';

export default function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStoredUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        navigation.replace('Quiz', storedUser);
      } else {
        setIsLoading(false);
      }
    };
    checkStoredUser();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const startQuiz = async () => {
    if (!userName || !userEmail) {
      Alert.alert('Campos ausentes', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(userEmail)) {
      Alert.alert('E-mail inválido', 'Por favor preencha um e-mail válido.');
      return;
    }

    const user = { name: userName, email: userEmail };
    await saveUser(user);
    navigation.replace('Quiz', user);
  };

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => setUserName(text.trimStart())}
        placeholder="Seu nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userEmail}
        onChangeText={(text) => setUserEmail(text.trimStart())}
        placeholder="Seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Começar Quiz" onPress={startQuiz} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    fontSize: 16,
  },
});
