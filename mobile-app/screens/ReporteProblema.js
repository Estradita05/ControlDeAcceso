import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';

export default function ReporteProblema({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
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
          {/* 3. CUERPO DEL REPORTE */}
          <View style={styles.body}>
            <Text style={styles.mainTitle}>Reporta un problema</Text>
            <Text style={styles.subtitle}>Ayúdanos a mejorar</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Asunto</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Escribe el asunto" 
                placeholderTextColor="#7A9EB1"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mensaje</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Describe tu problema..." 
                placeholderTextColor="#7A9EB1"
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Enviar un Mensaje</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' 
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
    marginBottom: 10,
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
    color: '#004C8C', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  scrollContent: {
    paddingBottom: 40,
  },
  body: { 
    paddingHorizontal: 30, 
    paddingTop: 20,
    alignItems: 'center' 
  },
  mainTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#004C8C', 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#4F7EA8', 
    marginBottom: 30 
  },
  formGroup: { 
    width: '100%', 
    marginBottom: 20 
  },
  label: { 
    fontWeight: 'bold', 
    color: '#004C8C', 
    marginBottom: 8,
    fontSize: 15
  },
  input: { 
    backgroundColor: '#EAF3F8', 
    borderRadius: 15, 
    padding: 15, 
    fontSize: 14, 
    color: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  textArea: { 
    height: 120, 
    textAlignVertical: 'top' 
  },
  primaryButton: { 
    backgroundColor: '#0054A3', 
    paddingVertical: 15, 
    borderRadius: 12, 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});