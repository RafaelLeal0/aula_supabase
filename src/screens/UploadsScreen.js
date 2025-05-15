import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { supabase } from '../supabaseClient';

const BUCKET = 'fotos-perfil';

const UploadsScreen = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100 });
    if (error) {
      Alert.alert('Erro', 'Não foi possível listar arquivos');
      setLoading(false);
      return;
    }
    setFiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async (mediaType) => {
    let pickerResult;
    if (mediaType === 'image') {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
    }
    if (pickerResult.cancelled) return;

    setLoading(true);
    const uri = pickerResult.assets ? pickerResult.assets[0].uri : pickerResult.uri;
    const fileName = uri.split('/').pop();
    const fileType = mediaType === 'image' ? 'image/jpeg' : 'video/mp4';

    const response = await fetch(uri);
    const blob = await response.blob();

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, blob, {
      contentType: fileType,
      upsert: true,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro', 'Falha ao enviar arquivo');
    } else {
      fetchFiles();
      Alert.alert('Sucesso', 'Arquivo enviado!');
    }
  };

  const renderItem = ({ item }) => {
    const url = supabase.storage.from(BUCKET).getPublicUrl(item.name).data.publicUrl;
    if (item.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return (
        <View style={styles.mediaBox}>
          <Image source={{ uri: url }} style={styles.media} resizeMode="cover" />
          <Text style={styles.fileName}>{item.name}</Text>
        </View>
      );
    }
    if (item.name.match(/\.(mp4|mov|avi|webm)$/i)) {
      return (
        <View style={styles.mediaBox}>
          <Video
            source={{ uri: url }}
            style={styles.media}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
          <Text style={styles.fileName}>{item.name}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploads</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => uploadFile('image')}>
          <Text style={styles.buttonText}>Upload Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => uploadFile('video')}>
          <Text style={styles.buttonText}>Upload Vídeo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Imagens e Vídeos Enviados:</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={files}
          keyExtractor={item => item.id ? item.id.toString() : item.name}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color:'#000'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mediaBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  media: {
    width: 220,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  fileName: {
    marginTop: 5,
    color:'#333',
    fontSize: 13,
    maxWidth: 220,
    textAlign: 'center'
  }
});

export default UploadsScreen;
