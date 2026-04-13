import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, SafeAreaView, StatusBar, TouchableOpacity,
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

// Categorías de reportes
const CATEGORIAS = [
  { id: 'acceso',        label: 'Problema de acceso',   icon: 'lock-open-outline' },
  { id: 'app',           label: 'Error en la app',       icon: 'bug-outline' },
  { id: 'vehiculo',      label: 'Vehículo / QR',         icon: 'car-outline' },
  { id: 'sugerencia',    label: 'Sugerencia',             icon: 'bulb-outline' },
  { id: 'otro',          label: 'Otro',                   icon: 'ellipsis-horizontal-outline' },
];

export default function ReporteProblema({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [categoria, setCategoria] = useState('acceso');
  const [asunto,    setAsunto]    = useState('');
  const [mensaje,   setMensaje]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const [enviado,   setEnviado]   = useState(false); // estado de éxito

  const validate = () => {
    const e = {};
    if (!asunto.trim() || asunto.length < 5)   e.asunto  = 'El asunto debe tener al menos 5 caracteres';
    if (!mensaje.trim() || mensaje.length < 10) e.mensaje = 'Describe el problema con más detalle (mín. 10 caracteres)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEnviar = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ categoria, asunto: asunto.trim(), mensaje: mensaje.trim() }),
      });

      if (response.ok || response.status === 201) {
        setEnviado(true); // mostrar pantalla de éxito
      } else {
        const err = await response.json().catch(() => ({}));
        setErrors({ api: err.detail || `Error del servidor (${response.status}). Intenta más tarde.` });
      }
    } catch (error) {
      setErrors({ api: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.' });
    } finally {
      setLoading(false);
    }
  };

  const handleNuevoReporte = () => {
    setEnviado(false);
    setAsunto('');
    setMensaje('');
    setCategoria('acceso');
    setErrors({});
  };

  const st = makeStyles(COLORS);

  // ── PANTALLA DE ÉXITO ────────────────────────────────────────────────────
  if (enviado) {
    return (
      <SafeAreaView style={st.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
        <Header title="Ayuda y Soporte" navigation={navigation} />
        <View style={st.successContainer}>
          <LinearGradient colors={COLORS.gradientSuccess} style={st.successIcon}>
            <Ionicons name="checkmark-circle" size={52} color="#FFFFFF" />
          </LinearGradient>
          <Text style={st.successTitle}>¡Reporte enviado!</Text>
          <Text style={st.successMsg}>
            Gracias por reportarlo. Nuestro equipo revisará tu mensaje a la brevedad posible.
          </Text>
          <GradientButton title="Enviar otro reporte" onPress={handleNuevoReporte} style={st.successBtn} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.backLink}>
            <Text style={[st.backLinkText, { color: COLORS.textSecondary }]}>Volver al menú</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── FORMULARIO ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Reportar Problema" navigation={navigation} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>

          {/* Info */}
          <LinearGradient colors={['rgba(37,99,235,0.15)', 'rgba(37,99,235,0.03)']} style={st.infoBanner}>
            <Ionicons name="headset-outline" size={20} color={COLORS.accent} />
            <Text style={st.infoText}>
              Tu reporte nos ayuda a mejorar el sistema. Descríbelo con el mayor detalle posible.
            </Text>
          </LinearGradient>

          {/* Categorías */}
          <Text style={st.sectionLabel}>Categoría</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={st.catScroll}>
            {CATEGORIAS.map(c => {
              const active = categoria === c.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => setCategoria(c.id)}
                  style={[
                    st.catChip,
                    { backgroundColor: active ? COLORS.primary : COLORS.cardBg },
                    { borderColor: active ? COLORS.primary : COLORS.border },
                  ]}
                  activeOpacity={0.8}
                >
                  <Ionicons name={c.icon} size={15} color={active ? '#FFFFFF' : COLORS.textSecondary} />
                  <Text style={[st.catChipText, { color: active ? '#FFFFFF' : COLORS.textSecondary }]}>
                    {c.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Formulario */}
          <View style={st.card}>
            <InputField
              label="Asunto"
              iconName="create-outline"
              value={asunto}
              onChangeText={v => { setAsunto(v); setErrors(e => ({ ...e, asunto: null, api: null })); }}
              placeholder="Describe brevemente el problema"
              error={errors.asunto}
            />

            {/* Textarea manual */}
            <Text style={st.fieldLabel}>Descripción detallada</Text>
            <View style={[
              st.textareaWrap,
              { borderColor: errors.mensaje ? COLORS.error : COLORS.inputBorder },
            ]}>
              <InputField
                iconName="document-text-outline"
                value={mensaje}
                onChangeText={v => { setMensaje(v); setErrors(e => ({ ...e, mensaje: null, api: null })); }}
                placeholder="Describe con detalle qué ocurrió, cuándo y qué esperabas..."
                error={null}
                style={{ marginBottom: 0 }}
              />
            </View>
            {errors.mensaje && (
              <View style={st.errorRow}>
                <Ionicons name="alert-circle-outline" size={13} color={COLORS.error} />
                <Text style={[st.errorText, { color: COLORS.error }]}>{errors.mensaje}</Text>
              </View>
            )}

            {/* Error global de API */}
            {errors.api && (
              <View style={st.apiBanner}>
                <Ionicons name="close-circle-outline" size={18} color={COLORS.error} />
                <Text style={[st.apiText, { color: COLORS.error }]}>{errors.api}</Text>
              </View>
            )}
          </View>

          <GradientButton title="Enviar Reporte" onPress={handleEnviar} loading={loading} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.cancelBtn}>
            <Text style={[st.cancelText, { color: COLORS.textSecondary }]}>Cancelar</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 20 },

  infoBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    padding: 14, borderRadius: SIZES.borderRadius,
    borderWidth: 1, borderColor: COLORS.inputBorder,
    marginBottom: 20,
  },
  infoText: { ...FONTS.subText, color: COLORS.textSecondary, flex: 1, lineHeight: 20 },

  sectionLabel: {
    ...FONTS.label, color: COLORS.textSecondary,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10,
  },
  catScroll: { marginBottom: 20 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 30, borderWidth: 1.5,
    marginRight: 8,
  },
  catChipText: { ...FONTS.caption, fontWeight: '600' },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 20, borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 20, ...SHADOWS.sm,
  },
  fieldLabel: { ...FONTS.label, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  textareaWrap: { borderWidth: 1.5, borderRadius: SIZES.borderRadius, overflow: 'hidden' },

  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  errorText: { ...FONTS.caption },

  apiBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: COLORS.errorLight,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1, borderColor: COLORS.error + '40',
    padding: 12, marginTop: 12,
  },
  apiText: { ...FONTS.subText, flex: 1, lineHeight: 20 },

  cancelBtn: { alignItems: 'center', marginTop: 16 },
  cancelText: { ...FONTS.bodyMedium },

  // Pantalla éxito
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successIcon: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 28, ...SHADOWS.glow,
  },
  successTitle: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: 12 },
  successMsg: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  successBtn: { width: '100%', marginBottom: 16 },
  backLink: { alignItems: 'center', paddingVertical: 8 },
  backLinkText: { ...FONTS.bodyMedium },
});