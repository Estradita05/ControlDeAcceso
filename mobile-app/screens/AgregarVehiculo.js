import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';

export default function AgregarVehiculoScreen({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('');

  const handleGuardar = () => {
    if (!matricula || !placa || !marca || !color || !tipoAcceso) {
      alert('Por favor completa todos los campos');
      return;
    }
    const nuevoVehiculo = { matricula, placa, marca, color, tipoAcceso };
    console.log('Vehículo guardado:', nuevoVehiculo);
    alert('Vehículo guardado correctamente');
    
    navigation.goBack();
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlaca('');
    setMarca('');
    setColor('');
    setTipoAcceso('');
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

      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>AGREGAR VEHÍCULO</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Placa del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          placeholder="Ingresa la placa"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Marca</Text>
        <TextInput
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
          placeholder="Ingresa la marca"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Ingresa el color"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Tipo de acceso</Text>
        <TextInput
          style={styles.input}
          value={tipoAcceso}
          onChangeText={setTipoAcceso}
          placeholder="Ej. Residente / Visitante"
          placeholderTextColor="#7A9EB1"
        />

        <TouchableOpacity onPress={handleCancelar}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar vehículo</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 15,
    color: '#004C8C',
  },
  input: {
    backgroundColor: '#EAF3F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cancelText: {
    textAlign: 'right',
    marginTop: 20,
    color: '#3d7fb5',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 5,
  },
  primaryButton: {
    backgroundColor: '#0054A3',
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});