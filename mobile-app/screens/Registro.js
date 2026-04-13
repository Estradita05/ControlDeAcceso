import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  StatusBar, Alert, Animated, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import InputField from '../components/InputField';

// ── Roles disponibles ──────────────────────────────────────────────────────
const ROLES = [
  { id: 'estudiante', label: 'Estudiante', icon: 'school-outline', desc: 'Alumno inscrito en la institución' },
  { id: 'maestro',    label: 'Maestro',    icon: 'book-outline',   desc: 'Docente o catedrático' },
  { id: 'servicios',  label: 'Servicios',  icon: 'storefront-outline', desc: 'Cafetería, OXXO, limpieza, etc.' },
];

export default function Registro({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [nombre,    setNombre]    = useState('');
  const [matricula, setMatricula] = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [carrera,   setCarrera]   = useState('');
  const [rol,       setRol]       = useState('estudiante'); // default
  const [showPass,  setShowPass]  = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const validate = () => {
    const e = {};
    if (!nombre.trim())    e.nombre = 'El nombre es obligatorio';
    if (!matricula.trim()) e.matricula = 'La matrícula / ID es obligatorio';
    if (!email.trim()) {
      e.email = 'El correo es obligatorio';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.mx$/i.test(email)) {
      e.email = 'Debe ser un correo institucional (@...edu.mx)';
    }
    if (!password) {
      e.password = 'La contraseña es obligatoria';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*_\-+=]).{6,}$/.test(password)) {
      e.password = 'Mín. 6 caracteres, 1 mayúscula y 1 especial';
    }
    if (password !== confirmar) e.confirmar = 'Las contraseñas no coinciden';
    if (!carrera.trim())   e.carrera = 'Este campo es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula, nombre, email, password, carrera, rol }),
      });
      const data = await response.json();
      if (response.status === 201) {
        // Redirigir a verificación de correo en lugar del login
        navigation.navigate('VerificarEmail', { email });
      } else {
        Alert.alert('Error', data.detail || 'No se pudo crear la cuenta');
      }
    } catch {
      Alert.alert('Sin conexión', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const st = makeStyles(COLORS);

  // Etiqueta dinámica para "carrera" según el rol
  const carreraLabel = rol === 'maestro' ? 'Departamento / Materia'
    : rol === 'servicios' ? 'Servicio o área (ej. Cafetería, Limpieza)'
    : 'Carrera';
  const carreraPlaceholder = rol === 'maestro' ? 'Ej. Matemáticas / Ing. de Software'
    : rol === 'servicios' ? 'Ej. OXXO, Cafetería, Intendencia'
    : 'Ej. Ing. en Tecnologías de la Información';

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Crear Cuenta" navigation={navigation} />

      <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* ── Selector de rol ── */}
          <Text style={st.sectionLabel}>¿Quién eres?</Text>
          <View style={st.roleRow}>
            {ROLES.map(r => {
              const active = rol === r.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => setRol(r.id)}
                  activeOpacity={0.8}
                  style={[st.roleCard, active && st.roleCardActive]}
                >
                  {active && (
                    <LinearGradient colors={COLORS.gradientPrimary} style={st.roleCardBg} />
                  )}
                  <Ionicons
                    name={r.icon}
                    size={22}
                    color={active ? '#FFFFFF' : COLORS.textSecondary}
                  />
                  <Text style={[st.roleLabel, active && st.roleLabelActive]}>{r.label}</Text>
                  <Text style={[st.roleDesc, active && st.roleDescActive]} numberOfLines={2}>{r.desc}</Text>
                  {active && (
                    <View style={st.roleCheck}>
                      <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Formulario ── */}
          <View style={st.card}>
            <InputField
              label="Nombre completo"
              iconName="person-outline"
              value={nombre}
              onChangeText={v => { setNombre(v); setErrors(e => ({ ...e, nombre: null })); }}
              placeholder="Ej. María Rodríguez López"
              error={errors.nombre}
            />
            <InputField
              label="Matrícula / ID"
              iconName="id-card-outline"
              value={matricula}
              onChangeText={v => { setMatricula(v); setErrors(e => ({ ...e, matricula: null })); }}
              keyboardType="default"
              placeholder="Ej. 1240XXXXX"
              error={errors.matricula}
            />
            <InputField
              label="Correo institucional"
              iconName="mail-outline"
              value={email}
              onChangeText={v => { setEmail(v); setErrors(e => ({ ...e, email: null })); }}
              keyboardType="email-address"
              placeholder="usuario@upq.edu.mx"
              autoCapitalize="none"
              error={errors.email}
            />
            <InputField
              label={carreraLabel}
              iconName="briefcase-outline"
              value={carrera}
              onChangeText={v => { setCarrera(v); setErrors(e => ({ ...e, carrera: null })); }}
              placeholder={carreraPlaceholder}
              error={errors.carrera}
            />
            <InputField
              label="Contraseña"
              iconName="lock-closed-outline"
              value={password}
              onChangeText={v => { setPassword(v); setErrors(e => ({ ...e, password: null })); }}
              secureTextEntry={!showPass}
              placeholder="Mín. 6 caracteres"
              autoCapitalize="none"
              error={errors.password}
              rightIcon={
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={20} color={COLORS.textMuted}
                  onPress={() => setShowPass(v => !v)}
                />
              }
            />
            <InputField
              label="Confirmar contraseña"
              iconName="shield-checkmark-outline"
              value={confirmar}
              onChangeText={v => { setConfirmar(v); setErrors(e => ({ ...e, confirmar: null })); }}
              secureTextEntry={!showConf}
              placeholder="Repite tu contraseña"
              autoCapitalize="none"
              error={errors.confirmar}
              rightIcon={
                <Ionicons
                  name={showConf ? 'eye-off-outline' : 'eye-outline'}
                  size={20} color={COLORS.textMuted}
                  onPress={() => setShowConf(v => !v)}
                />
              }
            />
          </View>

          <GradientButton title="Crear Cuenta" onPress={handleRegister} loading={loading} />
          <View style={{ height: 30 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 20 },

  sectionLabel: {
    ...FONTS.label, color: COLORS.textSecondary,
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 12,
  },

  roleRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  roleCard: {
    flex: 1, borderRadius: SIZES.borderRadius,
    padding: 12, alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1.5, borderColor: COLORS.border,
    overflow: 'hidden', position: 'relative',
    minHeight: 100,
    ...SHADOWS.sm,
  },
  roleCardActive: { borderColor: 'transparent' },
  roleCardBg: { ...StyleSheet.absoluteFillObject },
  roleLabel: { ...FONTS.caption, color: COLORS.textSecondary, fontWeight: '700', marginTop: 6 },
  roleLabelActive: { color: '#FFFFFF' },
  roleDesc: { ...FONTS.caption, fontSize: 10, color: COLORS.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 13 },
  roleDescActive: { color: 'rgba(255,255,255,0.8)' },
  roleCheck: { position: 'absolute', top: 6, right: 6 },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 20,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.sm,
  },
});