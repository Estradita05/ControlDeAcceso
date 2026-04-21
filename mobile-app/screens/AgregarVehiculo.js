import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

// ── Placa format: ABC-111-A ─────────────────────────────────────────────
// Mask auto-inserts hyphens while blocking invalid characters
const formatPlaca = (raw) => {
  // Remove everything that is not a letter or digit
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  let result = '';
  for (let i = 0; i < clean.length && i < 7; i++) {
    if (i < 3) {
      // positions 0-2: letters only
      if (/[A-Z]/.test(clean[i])) result += clean[i];
    } else if (i < 6) {
      // positions 3-5: digits only
      if (/[0-9]/.test(clean[i])) result += clean[i];
    } else {
      // position 6: letter only
      if (/[A-Z]/.test(clean[i])) result += clean[i];
    }
  }
  // Insert hyphens: ABC-111-A -> after 3rd and 6th char
  if (result.length > 3) result = result.slice(0, 3) + '-' + result.slice(3);
  if (result.length > 7) result = result.slice(0, 7) + '-' + result.slice(7);
  return result;
};

const isValidPlaca = (p) => /^[A-Z]{3}-[0-9]{3}-[A-Z]$/.test(p);

export default function AgregarVehiculo({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [placas, setPlacas] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [placaError, setPlacaError] = useState('');

  const handlePlacaChange = (text) => {
    const formatted = formatPlaca(text);
    setPlacas(formatted);
    if (placaError) setPlacaError('');
  };

  const handleGuardar = async () => {
    if (!placas || !modelo || !color) {
      Alert.alert('Error', 'Por favor, llena todos los campos');
      return;
    }
    if (!isValidPlaca(placas)) {
      setPlacaError('Formato inválido. Usa: ABC-111-A');
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

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      
      <Logo size="small" style={st.logoContainer} />

      <Header title="AGREGAR VEHÍCULO" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.formContainer}>
        
        <Text style={st.label}>Placa del vehículo</Text>
        <TextInput 
          style={[st.input, placaError ? st.inputError : null]} 
          placeholder="Ej: ABC-111-A" 
          placeholderTextColor={COLORS.textSecondary}
          value={placas} 
          onChangeText={handlePlacaChange}
          autoCapitalize="characters"
          maxLength={9}
          keyboardType="default"
        />
        {!!placaError && <Text style={st.errorText}>{placaError}</Text>}
        <Text style={st.hint}>Formato: 3 letras - 3 números - 1 letra</Text>

        <Text style={st.label}>Marca / Modelo</Text>
        <TextInput 
          style={st.input} 
          placeholder="Ej: Nissan Sentra" 
          placeholderTextColor={COLORS.textSecondary}
          value={modelo} 
          onChangeText={setModelo} 
        />

        <Text style={st.label}>Color</Text>
        <TextInput 
          style={st.input} 
          placeholder="Ej: Blanco" 
          placeholderTextColor={COLORS.textSecondary}
          value={color} 
          onChangeText={setColor} 
        />

        <View style={st.buttonSpacer} />

        <TouchableOpacity style={st.primaryButton} onPress={handleGuardar}>
          <Text style={st.primaryButtonText}>Guardar vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={st.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={st.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: { 
    paddingTop: 30, 
    paddingBottom: 15 
  },
  formContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 40 
  },
  label: { 
    color: COLORS.accent, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    marginLeft: 5, 
    fontSize: 15 
  },
  input: { 
    backgroundColor: COLORS.cardBg, 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    borderRadius: 15, 
    marginBottom: 6,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  inputError: {
    borderColor: COLORS.error || '#ef4444',
  },
  errorText: {
    color: COLORS.error || '#ef4444',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 4,
  },
  hint: {
    color: COLORS.textMuted || COLORS.textSecondary,
    fontSize: 11,
    marginLeft: 5,
    marginBottom: 14,
    fontStyle: 'italic',
  },
  buttonSpacer: {
    height: 20,
  },
  primaryButton: { 
    backgroundColor: COLORS.primary, 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginBottom: 15,
  }, 
  primaryButtonText: { 
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