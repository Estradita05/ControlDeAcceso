import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function AgregarVehiculo({ navigation }) {
  const [placas, setPlacas] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const handleGuardar = async () => {
    if (!placas || !modelo || !color) {
      Alert.alert('Error', 'Por favor, llena todos los campos');
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          placa: placas,
          modelo: modelo,
          color: color
        })
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Vehículo registrado correctamente');
        navigation.goBack(); 
      } else {
        let errorMsg = 'No se pudo guardar en el servidor';
        try {
          const errorData = await response.json();
          if (errorData.detail) errorMsg = errorData.detail;
        } catch (e) {}
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      Alert.alert('Error', 'No hay conexión con el servidor (Docker)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} 
        style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} 
        style={styles.backButton}>
          <Text style={styles.backIcon}>❮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AGREGAR VEHÍCULO</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        
        <Text style={styles.label}>Placa del vehículo</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: ABC-123-A" 
          value={placas} 
          onChangeText={setPlacas} 
        />

        <Text style={styles.label}>Marca / Modelo</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Nissan Sentra" 
          value={modelo} 
          onChangeText={setModelo} 
        />

        <Text style={styles.label}>Color</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Blanco" 
          value={color} 
          onChangeText={setColor} 
        />

        <TouchableOpacity style={styles.cancelarButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelarText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleGuardar}>
          <Text style={styles.primaryButtonText}>Guardar vehículo</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' 
  },
  logoContainer: 
  { alignItems: 'center', 
    paddingVertical: 15 
  },
  logo: { 
    width: 80, 
    height: 80 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#86ABC8', 
    paddingVertical: 12, 
    paddingHorizontal: 15 
  },
  backButton: { 
    padding: 5 
  },
  backIcon: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#003B7C' 
  },
  headerTitle: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#003B7C' 
  },
  formContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 40 
  },
  label: { 
    color: '#003B7C', 
    fontWeight: 'bold', 
    marginBottom: 5, 
    marginLeft: 5, 
    fontSize: 15 
  },
  input: { 
    backgroundColor: '#EAF3F8', 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    borderRadius: 30, 
    marginBottom: 15 
  },
  cancelarButton: { 
    alignItems: 'flex-end', 
    marginBottom: 15, 
    marginRight: 10 
  },
  cancelarText: { 
    color: '#005696', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  primaryButton: { 
    backgroundColor: '#005696', 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center' 
  }, 
  primaryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});