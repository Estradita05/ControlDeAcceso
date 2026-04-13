import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  Animated, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, ScrollView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';

const OTP_LENGTH = 6;

export default function VerificarEmail({ navigation, route }) {
  const { email } = route.params;
  const { COLORS, isDark } = useTheme();
  const [codigo, setCodigo] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef([]);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    startCountdown();
    setTimeout(() => inputRefs.current[0]?.focus(), 500);
  }, []);

  const startCountdown = () => {
    setCountdown(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newCodigo = [...codigo];
    newCodigo[index] = digit;
    setCodigo(newCodigo);
    setError('');
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificar = async () => {
    const codigoStr = codigo.join('');
    if (codigoStr.length < OTP_LENGTH) {
      setError('Ingresa el código completo de 6 dígitos');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/verificar-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: codigoStr }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          '✅ ¡Cuenta verificada!',
          'Tu correo fue verificado exitosamente. Ahora puedes iniciar sesión.',
          [{ text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') }]
        );
      } else if (response.status === 429) {
        setError(data.detail);
        setCodigo(Array(OTP_LENGTH).fill(''));
      } else {
        setError(data.detail || 'Código incorrecto o expirado.');
        setCodigo(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    try {
      await fetch(`${API_URL}/auth/reenviar-verificacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setCodigo(Array(OTP_LENGTH).fill(''));
      setError('');
      startCountdown();
      Alert.alert('Código reenviado', 'Revisa tu correo electrónico.');
    } catch {
      setError('No se pudo reenviar el código.');
    }
  };

  const emailHidden = email.replace(/(.{2}).+(@.+)/, '$1***$2');
  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Verificar Correo" navigation={navigation} showBack={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={st.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[st.content, { opacity: fadeAnim }]}>
            {/* Ícono */}
            <LinearGradient colors={COLORS.gradientSuccess} style={st.iconCircle}>
              <Ionicons name="mail-open-outline" size={40} color="#FFFFFF" />
            </LinearGradient>

            <Text style={st.title}>Verifica tu correo</Text>
            <Text style={st.subtitle}>
              Enviamos un código de 6 dígitos a{'\n'}
              <Text style={st.emailHighlight}>{emailHidden}</Text>
              {'\n'}Expira en 10 minutos.
            </Text>

            <View style={st.card}>
              {/* Cajas OTP */}
              <View style={st.otpRow}>
                {codigo.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={ref => inputRefs.current[i] = ref}
                    style={[st.otpBox, digit && st.otpBoxFilled, i === 2 && st.otpSep]}
                    value={digit}
                    onChangeText={text => handleChange(text, i)}
                    onKeyPress={e => handleKeyPress(e, i)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectionColor={COLORS.success}
                  />
                ))}
              </View>

              {error ? (
                <View style={st.errorRow}>
                  <Ionicons name="alert-circle-outline" size={14} color={COLORS.error} />
                  <Text style={st.errorText}>{error}</Text>
                </View>
              ) : null}

              <GradientButton
                title="Verificar Cuenta"
                onPress={handleVerificar}
                loading={loading}
                variant="success"
                style={st.btn}
              />

              <TouchableOpacity onPress={handleReenviar} disabled={!canResend} style={st.resendWrap}>
                <Text style={[st.resendText, !canResend && st.resendDisabled]}>
                  {canResend ? '¿No llegó? Reenviar código' : `Reenviar en ${countdown}s`}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  iconCircle: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24, ...SHADOWS.glow,
  },
  title: { ...FONTS.h2, color: COLORS.text, textAlign: 'center', marginBottom: 12 },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  emailHighlight: { color: COLORS.success, fontWeight: '700' },

  card: {
    width: '100%', backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg, padding: 22,
    borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.sm,
  },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20 },
  otpBox: {
    width: 46, height: 58, borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5, borderColor: COLORS.inputBorder,
    fontSize: 24, fontWeight: '800', color: COLORS.text,
  },
  otpBoxFilled: { borderColor: COLORS.success, backgroundColor: 'rgba(16,185,129,0.08)' },
  otpSep: { marginRight: 6 },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14 },
  errorText: { ...FONTS.caption, color: COLORS.error, flex: 1 },
  btn: { marginBottom: 16 },
  resendWrap: { alignItems: 'center' },
  resendText: { ...FONTS.subText, color: COLORS.accent, fontWeight: '600' },
  resendDisabled: { color: COLORS.textMuted },
});
