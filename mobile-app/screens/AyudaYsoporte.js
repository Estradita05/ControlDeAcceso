import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function HelpScreen({ navigation }) { 
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!subject || !message) {
      Alert.alert("Error", "Por favor completa todos los campos antes de enviar.");
      return;
    }

    const payload = {
      usuario_id: 1, // This likely needs to be dynamic, but keeping original logic for now
      mensaje: `${subject}: ${message}`
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/notificaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        Alert.alert("Éxito", "Mensaje enviado correctamente");
        setSubject("");
        setMessage("");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No se pudo enviar el mensaje");
      }
    } catch (error) {
      Alert.alert("Error", "Error al enviar el mensaje");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="AYUDA Y SOPORTE" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.mainTitle}>¿Cómo podemos ayudarte?</Text>
        <Text style={styles.subtitle}>Envíanos tus dudas o comentarios</Text>

        <Text style={styles.label}>Asunto</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Ej. Error en mi registro"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Mensaje</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe tu problema con detalle..."
          placeholderTextColor={COLORS.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar Mensaje</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 15,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  textArea: {
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 15,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    marginTop: 35,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});