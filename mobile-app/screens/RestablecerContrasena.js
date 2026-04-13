import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';
import InputField from '../components/InputField';

export default function RecuperarContrasena({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const handleSolicitar = async () => {
    setError('');
    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresa un correo válido');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/solicitar-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        // Ir a la pantalla de verificación, pasar el email
        navigation.navigate('VerificarCodigo', { email });
      } else {
        setError(data.detail || 'No se encontró ese correo en el sistema.');
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Recuperar Contraseña" navigation={navigation} />

      <Animated.View style={[st.content, { opacity: fadeAnim }]}>
        {/* Ícono ilustrativo */}
        <LinearGradient colors={COLORS.gradientPrimary} style={st.iconCircle}>
          <Ionicons name="key-outline" size={40} color={COLORS.white} />
        </LinearGradient>

        <Text style={st.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={st.subtitle}>
          Ingresa el correo con el que te registraste y te enviaremos un código de 6 dígitos para restablecerla.
        </Text>

        <View style={st.card}>
          <InputField
            label="Correo Electrónico"
            iconName="mail-outline"
            value={email}
            onChangeText={(v) => { setEmail(v); setError(''); }}
            keyboardType="email-address"
            placeholder="tu@correo.edu.mx"
            autoCapitalize="none"
            error={error}
          />

          <GradientButton
            title="Enviar Código"
            onPress={handleSolicitar}
            loading={loading}
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

  title: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: 12 },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },

  card: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
});