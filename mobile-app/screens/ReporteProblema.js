import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function ReporteProblema({ navigation }) {

  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEnviar = async () => {

    if (!asunto.trim() || !mensaje.trim()) {
      Alert.alert('Datos incompletos', 'Por favor completa todos los campos para enviar tu reporte.');
      return;
    }

    if (asunto.length < 5) {
      Alert.alert('Asunto demasiado corto', 'El asunto debe tener al menos 5 caracteres.');
      return;
    }

    if (mensaje.length < 10) {
      Alert.alert('Mensaje demasiado corto', 'Por favor describe el problema con más detalle (mínimo 10 caracteres).');
      return;
    }

    const reporte = {
      asunto: asunto.trim(),
      mensaje: mensaje.trim()
    };

    try {
      const response = await fetch(`${API_URL}/reportes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reporte)
      });

      if (response.ok) {
        Alert.alert('Reporte Enviado', 'Gracias por tus comentarios. Hemos recibido tu reporte correctamente.');
        setAsunto('');
        setMensaje('');
        navigation.goBack();
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert('Error de Envío', errorData.detail || 'Hubo un problema al procesar tu reporte. Por favor intenta más tarde.');
      }

    } catch (error) {
      Alert.alert("Error de Conexión", "No se pudo conectar con el servidor. Verifica tu conexión a internet.");
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >

        <Logo size="small" style={styles.logoContainer} />

        <Header title="ENVIAR MENSAJE" navigation={navigation} />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >

          <View style={styles.body}>

            <Text style={styles.mainTitle}>Reporta un problema</Text>
            <Text style={styles.subtitle}>Ayúdanos a mejorar</Text>

            <View style={styles.formGroup}>

              <Text style={styles.label}>Asunto</Text>

              <TextInput 
                style={styles.input} 
                value={asunto}
                onChangeText={setAsunto}
                placeholder="Escribe el asunto" 
                placeholderTextColor={COLORS.textSecondary}
              />

            </View>

            <View style={styles.formGroup}>

              <Text style={styles.label}>Mensaje</Text>

              <TextInput 
                style={[styles.input, styles.textArea]} 
                value={mensaje}
                onChangeText={setMensaje}
                placeholder="Describe tu problema..." 
                placeholderTextColor={COLORS.textSecondary}
                multiline
                numberOfLines={4}
              />

            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleEnviar}>
              <Text style={styles.buttonText}>Enviar un Mensaje</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
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
    backgroundColor: COLORS.background 
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  scrollContent: {
    paddingBottom: 40
  },
  body: {
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 30
  },
  formGroup: {
    width: '100%',
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 8,
    fontSize: 15
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    padding: 15,
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
    height: 120,
    textAlignVertical: 'top'
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});