import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
  Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import GradientButton from '../components/GradientButton';
import InputField from '../components/InputField';

export default function Login({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animaciones de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('token', data.access_token);
        navigation.navigate('Inicio');
      } else if (response.status === 403 && data.detail === 'CORREO_NO_VERIFICADO') {
        // Correo sin verificar — ofrecer reenvío
        Alert.alert(
          '📧 Correo no verificado',
          'Debes verificar tu correo antes de iniciar sesión. ¿Deseas que te reenviemos el código?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Reenviar código',
              onPress: () => navigation.navigate('VerificarEmail', { email }),
            },
          ]
        );
      } else {
        Alert.alert('Error de acceso', data.detail || 'Credenciales incorrectas');
      }
    } catch {
      Alert.alert('Sin conexión', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const styles = makeStyles(COLORS);

  return (
    <LinearGradient colors={COLORS.gradientDark} style={styles.bg}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Animated.View style={[styles.logoWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Logo size="medium" />
            <Text style={styles.appName}>Control de Acceso</Text>
            <Text style={styles.subtitle}>Plataforma Institucional</Text>
          </Animated.View>

          <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {/* Decoración top */}
            <LinearGradient
              colors={['rgba(37,99,235,0.8)', 'transparent']}
              style={styles.cardTopBar}
            />

            <Text style={styles.cardTitle}>Iniciar Sesión</Text>
            <Text style={styles.cardSubtitle}>Ingresa tus datos institucionales</Text>

            <InputField
              label="Correo Electrónico"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="usuario@edu.mx"
              autoCapitalize="none"
            />

            <InputField
              label="Contraseña"
              iconName="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••"
              autoCapitalize="none"
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('RecuperarContrasena')}
              style={styles.forgotWrap}
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <GradientButton
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={loading}
              style={styles.btn}
            />

            <TouchableOpacity
              style={styles.registerWrap}
              onPress={() => navigation.navigate('Registro')}
            >
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  bg: { flex: 1 },
  scroll: { flexGrow: 1, paddingTop: 60, paddingHorizontal: 22, paddingBottom: 40 },

  logoWrap: { alignItems: 'center', marginBottom: 32 },
  appName: { ...FONTS.h2, color: COLORS.text, marginTop: 12 },
  subtitle: { ...FONTS.subText, color: COLORS.textSecondary, marginTop: 4 },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  cardTopBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 4,
  },
  cardTitle: { ...FONTS.h2, color: COLORS.text, marginBottom: 4, marginTop: 8 },
  cardSubtitle: { ...FONTS.subText, color: COLORS.textSecondary, marginBottom: 24 },

  forgotWrap: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { ...FONTS.subText, color: COLORS.accent, fontWeight: '600' },

  btn: { marginBottom: 20 },

  registerWrap: { flexDirection: 'row', justifyContent: 'center' },
  registerText: { ...FONTS.subText, color: COLORS.textSecondary },
  registerLink: { ...FONTS.subText, color: COLORS.accent, fontWeight: '700' },
});