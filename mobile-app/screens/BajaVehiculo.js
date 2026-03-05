import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';

export default function BajaVehiculoScreen() {
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');

  const handleConfirmar = () => {
    if (!matricula || !placas) {
      alert('Completa todos los campos');
      return;
    }

    alert('Vehículo dado de baja correctamente'); // Muestra la alerta de exito
    setMatricula('');
    setPlacas('');
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlacas('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#dfe9ef" />

      <ScrollView contentContainerStyle={styles.content}>
        
        <Image
          source={require('../assets/logo.png')} // Ajusta la ruta si es necesario
          style={styles.logo}
        />

        <Text style={styles.title}>Dar de baja vehículo</Text> // Título de la pantalla 

        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
        />

        <Text style={styles.label}>Placas del vehículo</Text>  // Etiqueta para el campo de placas
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
        />

        <TouchableOpacity onPress={handleCancelar}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
          <Text style={styles.buttonText}>Confirmar baja</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe9ef'
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2b2b2b',
    marginBottom: 25
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#1f1f1f',
    marginBottom: 8,
    marginTop: 15
  },
  input: {
    width: '100%',
    backgroundColor: '#cfdbe3',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    marginBottom: 10
  },
  cancelText: {
    alignSelf: 'flex-end',
    color: '#4a8fc2',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 25
  },
  button: {
    backgroundColor: '#0b5e8e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
