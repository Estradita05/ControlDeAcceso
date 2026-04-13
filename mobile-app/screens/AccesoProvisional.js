import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function AccesoProvisionalScreen({ navigation }) { 
  const { COLORS, isDark } = useTheme();
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

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Logo size="small" style={st.logoContainer} />
      <Header title="ACCESO PROVISIONAL" navigation={navigation} />

      <ScrollView contentContainerStyle={st.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={st.label}>Matrícula del usuario</Text>
        <TextInput
          style={st.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Placas del vehículo</Text>
        <TextInput
          style={st.input}
          value={placas}
          onChangeText={setPlacas}
          placeholder="Ingresa las placas"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Motivo del acceso</Text>
        <TextInput
          style={st.input}
          value={motivo}
          onChangeText={setMotivo}
          placeholder="Escribe el motivo"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Fecha de inicio</Text>
        <TextInput
          style={st.input}
          value={fechaInicio}
          onChangeText={setFechaInicio}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Fecha de fin</Text>
        <TextInput
          style={st.input}
          value={fechaFin}
          onChangeText={setFechaFin}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={COLORS.textSecondary}
        />

        <View style={st.statusRow}>
          <View style={st.statusBadge}>
            <Text style={st.statusText}>Estado: Pendiente</Text>
          </View>
        </View>

        <TouchableOpacity style={st.primaryButton} onPress={handleEnviar}>
          <Text style={st.buttonText}>Enviar solicitud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={st.secondaryButton} onPress={handleCancelar}>
          <Text style={st.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  logoContainer: { paddingTop: 30, paddingBottom: 15 },
  formContainer: { paddingHorizontal: 30, paddingBottom: 40, paddingTop: 10 },
  label: { fontSize: 14, fontWeight: '700', marginTop: 15, color: COLORS.accent },
  input: {
    backgroundColor: COLORS.cardBg, borderRadius: 15,
    paddingHorizontal: 15, paddingVertical: 12,
    marginTop: 5, color: COLORS.text,
    borderWidth: 1, borderColor: COLORS.inputBorder,
    ...SHADOWS.sm,
  },
  statusRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  statusBadge: { backgroundColor: '#F7D667', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  statusText: { fontWeight: 'bold', color: COLORS.accent },
  primaryButton: {
    backgroundColor: COLORS.primary, marginTop: 25,
    paddingVertical: 14, borderRadius: 30,
    alignItems: 'center', elevation: 3, ...SHADOWS.sm,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { alignItems: 'center', paddingVertical: 15 },
  secondaryButtonText: { color: COLORS.textSecondary, fontWeight: 'bold', fontSize: 15 },
});