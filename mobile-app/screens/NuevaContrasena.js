import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar, Animated,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import InputField from '../components/InputField';

export default function NuevaContrasena({ navigation, route }) {
  const { COLORS, isDark } = useTheme();
  const { reset_token } = route.params;
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // Requisitos de contraseña
  const requirements = [
    { text: 'Mínimo 6 caracteres', met: password.length >= 6 },
    { text: 'Al menos una mayúscula (A-Z)', met: /[A-Z]/.test(password) },
    { text: 'Al menos un carácter especial (*, _...)', met: /[!@#$%^&*_\-+=]/.test(password) },
    { text: 'Las contraseñas coinciden', met: password === confirmar && confirmar.length > 0 },
  ];

  const validate = () => {
    const newErrors = {};
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*_\-+=]).{6,}$/.test(password))
      newErrors.password = 'No cumple los requisitos de seguridad';
    if (password !== confirmar) newErrors.confirmar = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleActualizar = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/nueva-contrasena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset_token, nueva_contrasena: password }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          '¡Contraseña actualizada!',
          'Tu contraseña fue cambiada exitosamente. Inicia sesión con tu nueva contraseña.',
          [{ text: 'Ir al Login', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Error', data.detail || 'No se pudo actualizar la contraseña.');
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
      <Header title="Nueva Contraseña" navigation={navigation} />

      <Animated.View style={[st.content, { opacity: fadeAnim }]}>
        {/* Ícono */}
        <LinearGradient colors={COLORS.gradientSuccess} style={st.iconCircle}>
          <Ionicons name="shield-checkmark-outline" size={38} color={COLORS.white} />
        </LinearGradient>

        <Text style={st.title}>Elige una nueva contraseña</Text>
        <Text style={st.subtitle}>Debe ser diferente a tu contraseña anterior.</Text>

        <View style={st.card}>
          <InputField
            label="Nueva contraseña"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={(v) => { setPassword(v); setErrors(e => ({ ...e, password: null })); }}
            secureTextEntry={!showPass}
            placeholder="Mín. 6 caracteres"
            autoCapitalize="none"
            error={errors.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPass(v => !v)}>
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={20} color={COLORS.textMuted}
                />
              </TouchableOpacity>
            }
          />

          <InputField
            label="Confirmar contraseña"
            iconName="lock-open-outline"
            value={confirmar}
            onChangeText={(v) => { setConfirmar(v); setErrors(e => ({ ...e, confirmar: null })); }}
            secureTextEntry={!showConfirm}
            placeholder="Repite tu contraseña"
            autoCapitalize="none"
            error={errors.confirmar}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                <Ionicons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={20} color={COLORS.textMuted}
                />
              </TouchableOpacity>
            }
          />

          {/* Checklist de requisitos */}
          {password.length > 0 && (
            <View style={st.requirementsWrap}>
              {requirements.map((req, i) => (
                <View key={i} style={st.reqRow}>
                  <Ionicons
                    name={req.met ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={req.met ? COLORS.success : COLORS.textMuted}
                  />
                  <Text style={[st.reqText, req.met && st.reqMet]}>{req.text}</Text>
                </View>
              ))}
            </View>
          )}

          <GradientButton
            title="Actualizar Contraseña"
            onPress={handleActualizar}
            loading={loading}
            variant="success"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },

  iconCircle: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
    ...SHADOWS.glow,
  },
  title: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 28 },

  card: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },

  requirementsWrap: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: SIZES.borderRadius,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
  reqRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reqText: { ...FONTS.caption, color: COLORS.textMuted },
  reqMet: { color: COLORS.success },
});
