import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen({ navigation }) { 
  
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (!search) {
      alert('Por favor ingresa tu correo o matrícula');
      return;
    }
    alert('Si el usuario existe, se enviarán instrucciones a su correo institucional.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.headerBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>RESTABLECER CONTRASEÑA</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Ingresa tu correo o matrícula para buscar tu cuenta.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#004C8C" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Buscar usuario..."
            placeholderTextColor="#7A9EB1"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA', 
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86ABC8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  description: {
    marginBottom: 30,
    fontSize: 16,
    color: '#4F7EA8',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  input: { 
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: { 
    backgroundColor: '#0054A3', 
    padding: 15, 
    borderRadius: 25,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold' 
  },
});