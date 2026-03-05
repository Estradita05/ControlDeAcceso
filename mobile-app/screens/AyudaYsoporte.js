import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpScreen({ navigation }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!subject || !message) {
      alert('Por favor completa todos los campos antes de enviar.');
      return;
    }
    alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />

      {/* 1. SECCIÓN DEL LOGO (FIXED) */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 2. BARRA DE TÍTULO AZUL */}
      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>ENVIAR MENSAJE</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.mainTitle}>Reporta un problema</Text>
        <Text style={styles.subtitle}>Ayúdanos a mejorar</Text>

        <Text style={styles.label}>Asunto</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Ej. Error en mi registro"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Mensaje</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe tu problema con detalle..."
          placeholderTextColor="#7A9EB1"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar Mensaje</Text>
        </TouchableOpacity>

        {/* Espacio extra para el teclado */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    backgroundColor: '#F0F6FA',
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleBar: {
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
    marginBottom: 5,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004C8C',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4F7EA8',
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004C8C',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EAF3F8',
    padding: 15,
    borderRadius: 15,
    fontSize: 14,
    color: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  textArea: {
    backgroundColor: '#EAF3F8',
    padding: 15,
    borderRadius: 15,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  primaryButton: {
    backgroundColor: '#0054A3',
    marginTop: 35,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});