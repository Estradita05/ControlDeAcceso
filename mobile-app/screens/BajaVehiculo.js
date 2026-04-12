import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function BajaVehiculoScreen({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');

  const handleConfirmar = () => {
    if (!matricula || !placas) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    Alert.alert(
      "Confirmación de Baja",
      "¿Estás seguro de que deseas eliminar este vehículo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar eliminación", 
          onPress: procesarBaja,
          style: "destructive"
        }
      ]
    );
  };

  const procesarBaja = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos/${placas}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        Alert.alert("Éxito", "Vehículo dado de baja correctamente");
        setMatricula("");
        setPlacas("");
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert("Error", data.detail || "No se pudo dar de baja el vehículo");
      }
    } catch (error) {
      Alert.alert("Error", "Error al dar de baja el vehículo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="DAR DE BAJA VEHÍCULO" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={styles.label}>Placas del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
          placeholder="Ingresa las placas"
          placeholderTextColor={COLORS.textSecondary}
        />

        <View style={styles.buttonSpacer} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleConfirmar}>
          <Text style={styles.buttonText}>Confirmar baja</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
        
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
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 15,
    color: COLORS.accent,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  buttonSpacer: {
    height: 30,
  },
  primaryButton: {
    backgroundColor: COLORS.error, 
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    marginBottom: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15
  },
});