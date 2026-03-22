import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function BajaVehiculoScreen({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');

  const handleConfirmar = async () => {
  if (!matricula || !placas) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}/vehiculos/${placas}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log("Respuesta API:", data);

    alert("Vehículo dado de baja correctamente");

    setMatricula("");
    setPlacas("");

    navigation.goBack();

  } catch (error) {

    console.log("Error:", error);
    alert("Error al dar de baja el vehículo");

  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>DAR DE BAJA VEHÍCULO</Text>
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

        <Text style={styles.label}>Placas del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
          placeholder="Ingresa las placas"
          placeholderTextColor="#7A9EB1"
        />

        <TouchableOpacity onPress={handleCancelar}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirmar}>
          <Text style={styles.buttonText}>Confirmar baja</Text>
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
    resizeMode: 'contain',
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
    fontSize: 18,
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
  },
  cancelText: {
    textAlign: 'right',
    marginTop: 20,
    color: '#3d7fb5',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#0b5e8e', 
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});