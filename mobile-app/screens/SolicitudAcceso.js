import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import InputField from '../components/InputField';

// ── Placa format: ABC-111-A ─────────────────────────────────────────────
const formatPlaca = (raw) => {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  let result = '';
  for (let i = 0; i < clean.length && i < 7; i++) {
    if (i < 3) {
      if (/[A-Z]/.test(clean[i])) result += clean[i];
    } else if (i < 6) {
      if (/[0-9]/.test(clean[i])) result += clean[i];
    } else {
      if (/[A-Z]/.test(clean[i])) result += clean[i];
    }
  }
  if (result.length > 3) result = result.slice(0, 3) + '-' + result.slice(3);
  if (result.length > 7) result = result.slice(0, 7) + '-' + result.slice(7);
  return result;
};

const isValidPlaca = (p) => /^[A-Z]{3}-[0-9]{3}-[A-Z]$/.test(p);

export default function SolicitudAcceso({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [placa,   setPlaca]   = useState('');
  const [marca,   setMarca]   = useState('');
  const [modelo,  setModelo]  = useState('');
  const [color,   setColor]   = useState('');
  const [motivo,  setMotivo]  = useState('');
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const validate = () => {
    const e = {};
    if (!placa.trim()) {
      e.placa = 'La placa es obligatoria';
    } else if (!isValidPlaca(placa)) {
      e.placa = 'Formato inválido. Usa: ABC-111-A';
    }
    if (!motivo.trim()) e.motivo = 'El motivo es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEnviar = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          placa: placa.toUpperCase().trim(),
          marca: marca.trim() || null,
          modelo: modelo.trim() || null,
          color: color.trim() || null,
          motivo: motivo.trim(),
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        Alert.alert(
          '📋 Solicitud enviada',
          'El guardia revisará tu solicitud a la brevedad. Te notificaremos el resultado.',
          [{ text: 'Ver mis solicitudes', onPress: () => navigation.navigate('MisSolicitudes') }]
        );
        setPlaca(''); setMarca(''); setModelo(''); setColor(''); setMotivo('');
      } else {
        Alert.alert('Error', data.detail || 'No se pudo enviar la solicitud.');
      }
    } catch {
      Alert.alert('Sin conexión', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Acceso Provisional" navigation={navigation} />

      <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <LinearGradient colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.03)']} style={st.infoBanner}>
            <Ionicons name="information-circle-outline" size={20} color="#F59E0B" />
            <Text style={st.infoText}>
              Ingresa los datos de tu vehículo. El guardia de seguridad aprobará o rechazará tu solicitud.
            </Text>
          </LinearGradient>

          <View style={st.card}>
            <Text style={st.sectionLabel}>Datos del Vehículo</Text>
            <InputField
              label="Placa *" iconName="car-outline"
              value={placa}
              onChangeText={v => {
                const formatted = formatPlaca(v);
                setPlaca(formatted);
                setErrors(e => ({ ...e, placa: null }));
              }}
              placeholder="ABC-111-A" autoCapitalize="characters"
              maxLength={9}
              error={errors.placa}
            />
            <InputField label="Marca" iconName="business-outline" value={marca} onChangeText={setMarca} placeholder="Ej. Nissan, Toyota" />
            <InputField label="Modelo" iconName="car-sport-outline" value={modelo} onChangeText={setModelo} placeholder="Ej. Sentra, Corolla" />
            <InputField label="Color" iconName="color-palette-outline" value={color} onChangeText={setColor} placeholder="Ej. Gris metálico" />
            <InputField
              label="Motivo *" iconName="create-outline"
              value={motivo} onChangeText={v => { setMotivo(v); setErrors(e => ({ ...e, motivo: null })); }}
              placeholder="¿Por qué necesitas acceso provisional?" error={errors.motivo}
            />
          </View>

          <GradientButton title="Enviar Solicitud" onPress={handleEnviar} loading={loading} colors={['#B45309', '#F59E0B']} />
          <View style={{ height: 30 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 20 },
  infoBanner: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap: 10,
    padding: 14, 
    borderRadius: SIZES.borderRadius,
    borderWidth: 1, 
    borderColor: 'rgba(245,158,11,0.3)', 
    marginBottom: 20,
  },
  infoText: { 
    ...FONTS.subText, 
    color: COLORS.textSecondary, 
    flex: 1, 
    lineHeight: 20 },
  card: {
    backgroundColor: COLORS.cardBg, borderRadius: SIZES.borderRadiusLg,
    padding: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20, ...SHADOWS.sm,
  },
  sectionLabel: {
    ...FONTS.label, color: COLORS.textSecondary,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14,
  },
});
