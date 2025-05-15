import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      alert('Erro', error.message);
    } else {
      alert('Sucesso', 'Cadastro realizado! Faça login.');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? "Cadastrando..." : "Cadastrar"} onPress={handleRegister} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  input: { width:'80%', backgroundColor:'#fff', padding:10, borderRadius:8, marginBottom:15, elevation:2 },
  link: { marginTop:20, color:'#007bff' }
});
