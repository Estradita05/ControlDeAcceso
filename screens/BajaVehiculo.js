import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function BajaVehiculoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>DAR DE BAJA VEHÍCULO</Text>

      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://tu-link-del-logo.png' }} 
            style={styles.logo}
          />
          <Text style={styles.subTitle}>Dar de baja vehículo</Text>
        </View>

        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ej. 122043XXX"
          placeholderTextColor="#A9C2D1"
        />

        
        <Text style={styles.label}>Placas del vehículo</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ej. UKP-XXX-X"
          placeholderTextColor="#A9C2D1"
        />

        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmar baja</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Versión 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#EAF4FB', 
    padding: 30,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222', 
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 25, 
    borderRadius: 20, 
    width: '100%',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    backgroundColor: '#E1EFF7', 
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D1E4F0'
  },
  cancelButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
  },
  cancelText: {
    color: '#0A4D8C',
    fontSize: 14,
  },
  button: { 
    backgroundColor: '#0A4D8C', 
    padding: 18, 
    borderRadius: 15,
    width: '100%',
    elevation: 3
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  },
  footer: { 
    textAlign: 'center', 
    marginTop: 30, 
    color: '#555' 
  },
});