import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function ResetPasswordScreen({ navigation }) { 
  
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    if (!search) {
      Alert.alert('Error', 'Por favor ingresa tu correo o matrícula');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/recuperar_contrasena`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ busqueda: search })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Si el usuario existe, se enviarán instrucciones a su correo.');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.detail || "Hubo un error al procesar tu solicitud.");
      }
    } catch (error) {
      Alert.alert('Error', "Error al conectar con el servidor.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="RESTABLECER CONTRASEÑA" navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.description}>
          Ingresa tu correo o matrícula para buscar tu cuenta.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.accent} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Buscar usuario..."
            placeholderTextColor={COLORS.textSecondary}
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
    backgroundColor: COLORS.background, 
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  description: {
    marginBottom: 30,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
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
    color: COLORS.text,
  },
  button: { 
    backgroundColor: COLORS.primary, 
    padding: 15, 
    borderRadius: 25,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
  },
  buttonText: { 
    color: COLORS.white, 
    fontSize: 16,
    fontWeight: 'bold' 
  },
});