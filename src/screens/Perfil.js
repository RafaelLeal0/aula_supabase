import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Perfil = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>Nome: Usuário Exemplo</Text>
      <Text style={styles.label}>Email: exemplo@email.com</Text>
      {/* Campos estáticos, sem autenticação */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Perfil;