import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../supabaseClient';
import { useUser } from '../userContext';

const Perfil = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState(user ? user.email : '');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    let emailError = null;

    // Atualiza o e-mail no Auth do Supabase
    if (email !== user.email) {
      const { data, error } = await supabase.auth.updateUser({ email });
      emailError = error;

      if (!error && data?.user) {
        setUser(data.user);

        // Atualiza também o e-mail na tabela "Usuários"
        const { error: dbError } = await supabase
          .from('Usuários')
          .update({ usuário_de_email: email })
          .eq('id_usuário', data.user.id);

        if (dbError) {
          emailError = dbError;
        }
      }
    }

    setLoading(false);

    if (emailError) {
      Alert.alert('Erro', emailError.message);
    } else {
      Alert.alert('Sucesso', 'Email atualizado!');
      setEditing(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Faça login para ver o perfil</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>ID: {user.id}</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={editing}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {editing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
          <Text style={styles.buttonText}>Editar Email</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color:'#000'
  },
  input: {
    width: 250,
    backgroundColor: '#f0f0f0',
    color: '#000',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    width: 180,
  },
  buttonText: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center'
  }
});

export default Perfil;
