import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function AccesoProvisionalScreen({ navigation }) { 
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleEnviar = async () => {
    if (!matricula || !placas || !motivo || !fechaInicio || !fechaFin) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const solicitud = {
      matricula,
      placas,
      motivo,
      fechaInicio,
      fechaFin
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/accesos/provisional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(solicitud)
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Solicitud enviada correctamente');
        navigation.navigate('Menu');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Error al enviar la solicitud');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
    }
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlacas('');
    setMotivo('');
    setFechaInicio('');
    setFechaFin('');
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="ACCESO PROVISIONAL" navigation={navigation} />

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

        <Text style={styles.label}>Motivo del acceso</Text>
        <TextInput
          style={styles.input}
          value={motivo}
          onChangeText={setMotivo}
          placeholder="Escribe el motivo"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={styles.label}>Fecha de inicio</Text>
        <TextInput
          style={styles.input}
          value={fechaInicio}
          onChangeText={setFechaInicio}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={styles.label}>Fecha de fin</Text>
        <TextInput
          style={styles.input}
          value={fechaFin}
          onChangeText={setFechaFin}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.textSecondary}
        />

        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Estado: Pendiente</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar solicitud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelar}>
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
    paddingTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 15,
    color: COLORS.accent,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 5,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  statusBadge: {
    backgroundColor: '#F7D667',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});