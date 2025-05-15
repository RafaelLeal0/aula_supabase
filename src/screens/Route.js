import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function RouteScreen() {
  const [destination, setDestination] = useState('');

  const handleRoute = () => {
    // ...adicione lógica se necessário...
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o destino"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Traçar Rota" onPress={handleRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
});