import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';

export default function ReporteProblema() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.headerRibbon}>
        <TouchableOpacity><Text style={styles.backButton}>{"<"}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>ENVIAR MENSAJE</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.body}>
       <Image
                 source={require('../assets/logo.png')} style={styles.logo} /> 
        <Text style={styles.title}>Reporta un problema</Text>
        <Text style={styles.subtitle}>Ayúdanos a mejorar</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Asunto</Text>
          <TextInput style={styles.input} placeholder="" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mensaje</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Describe tu problema..." 
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Enviar un Mensaje</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerRibbon: { backgroundColor: '#89B4E3', marginTop: 40, width: '100%', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  headerTitle: { color: '#003366', fontWeight: 'bold', fontSize: 16 },
  body: { padding: 30, alignItems: 'center' },
  logo: { width: 80, height: 80, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#000', marginBottom: 30 },
  formGroup: { width: '100%', marginBottom: 20 },
  label: { fontWeight: 'bold', color: '#000', marginBottom: 8 },
  input: { backgroundColor: '#E8F1F8', borderRadius: 10, padding: 15, fontSize: 14, color: '#333' },
  textArea: { height: 100, textAlignVertical: 'top' },
  primaryButton: { backgroundColor: '#005596', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, width: '100%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});