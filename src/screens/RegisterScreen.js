import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.passwordHint}>A senha deve ter pelo menos 8 dígitos.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:32, color:'#000', fontWeight:'bold', marginBottom:30 },
  input: { width:'100%', backgroundColor:'#f0f0f0', color:'#000', padding:12, borderRadius:12, marginBottom:20, fontSize:16 },
  button: { backgroundColor:'#000', paddingVertical:12, paddingHorizontal:40, borderRadius:12, width:'100%' },
  buttonText: { color:'#fff', fontWeight:'bold', fontSize:16, textAlign:'center' },
  link: { marginTop:20, color:'#555', fontSize:14 },
  passwordHint: { color: '#888', fontSize: 13, marginBottom: 10, alignSelf: 'flex-start' }
});
