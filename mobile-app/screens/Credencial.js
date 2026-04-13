import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
  SafeAreaView, StatusBar, ActivityIndicator, Animated, Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

const QR_DURATION = 60; // segundos

export default function DigitalCredential({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [usuario, setUsuario]     = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading]     = useState(true);

  // QR state
  const [qrToken, setQrToken]       = useState(null);
  const [qrLoading, setQrLoading]   = useState(true);
  const [qrError, setQrError]       = useState(false);
  const [segundos, setSegundos]     = useState(QR_DURATION);

  // Animaciones
  const barraAnim   = useRef(new Animated.Value(1)).current;
  const fadeAnim    = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef(null);
  const timerRef    = useRef(null);

  // ── Fetchs de datos de usuario e historial ────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const userRes = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUsuario(userData.usuario);
        }

        const histRes = await fetch(`${API_URL}/accesos/historial`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (histRes.ok) {
          const histData = await histRes.json();
          if (Array.isArray(histData)) {
            const recientes = histData
              .sort((a, b) => (b.id || 0) - (a.id || 0))
              .slice(0, 2)
              .map((item, index) => {
                const tipoFinal =
                  item.tipo || item.tipo_movimiento || (index % 2 === 0 ? 'entrada' : 'salida');
                return { ...item, tipo: tipoFinal, fecha: item.fecha || 'Reciente', hora: item.hora || '' };
              });
            setHistorial(recientes);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Fetch del token QR ────────────────────────────────────────────────────
  const fetchQrToken = useCallback(async () => {
    try {
      setQrLoading(true);
      setQrError(false);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/auth/qr-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al obtener token QR');
      const data = await res.json();
      setQrToken(data.qr_token);

      // Reiniciar animación de barra
      barraAnim.setValue(1);
      Animated.timing(barraAnim, {
        toValue: 0,
        duration: QR_DURATION * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Parpadeo al renovar (excepto primer carga)
      if (qrToken) {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0.2, duration: 150, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1,   duration: 300, useNativeDriver: true }),
        ]).start();
      }

      // Reiniciar contador
      setSegundos(QR_DURATION);
    } catch (err) {
      console.error(err);
      setQrError(true);
    } finally {
      setQrLoading(false);
    }
  }, [qrToken]);

  // Primer fetch + renovación automática cada 60 s
  useEffect(() => {
    fetchQrToken();

    intervalRef.current = setInterval(() => {
      fetchQrToken();
    }, QR_DURATION * 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Contador regresivo independiente (cada segundo)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSegundos(prev => (prev > 0 ? prev - 1 : QR_DURATION));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Color dinámico del contador según urgencia
  const colorContador =
    segundos > 30 ? '#27AE60' :
    segundos > 10 ? '#E67E22' : '#E74C3C';

  const barraColor =
    segundos > 30 ? '#27AE60' :
    segundos > 10 ? '#E67E22' : '#E74C3C';

  const barraWidth = barraAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0%', '100%'],
  });

  const st = makeStyles(COLORS);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Credencial Digital" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : (
          <View style={st.body}>
            <Text style={st.sectionTitle}>Tu tarjeta digital</Text>

            {/* ── TARJETA ─────────────────────────────────────────────── */}
            <View style={st.cardWrapper}>
              {/* Header */}
              <View style={st.cardHeader}>
                <Ionicons name="school" size={24} color={COLORS.white} style={{ marginRight: 10 }} />
                <Text style={st.cardUniversity}>UNIVERSIDAD POLITECNICA DE QUERETARO</Text>
              </View>

              {/* Foto + Info */}
              <View style={st.cardBody}>
                <View style={st.cardPhotoContainer}>
                  {usuario?.foto_perfil ? (
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${usuario.foto_perfil}` }}
                      style={{ width: '100%', height: '100%', borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name="person" size={70} color={COLORS.accent} />
                  )}
                </View>
                <View style={st.cardInfoContainer}>
                  <Text style={st.cardName}>{usuario?.nombre || 'CARGANDO...'}</Text>
                  <Text style={st.cardCareer}>ESTUDIANTE</Text>
                  <Text style={st.cardCareerSubtitle}>{usuario?.carrera || 'Tecnologías de la Información'}</Text>
                  <Text style={st.cardId}>MATRÍCULA: {usuario?.matricula || '--'}</Text>
                </View>
              </View>

              {/* ── SECCIÓN QR DINÁMICO ────────────────────────────── */}
              <View style={st.qrSection}>
                <View style={st.qrLabelRow}>
                  <Ionicons name="qr-code-outline" size={16} color={COLORS.primary} />
                  <Text style={st.qrLabel}>  Código de acceso dinámico</Text>
                </View>

                <Animated.View style={[st.qrWrapper, { opacity: fadeAnim }]}>
                  {qrLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{ height: 180 }} />
                  ) : qrError ? (
                    <View style={st.qrErrorContainer}>
                      <Ionicons name="wifi-outline" size={40} color="#E74C3C" />
                      <Text style={st.qrErrorText}>No se pudo generar el QR</Text>
                      <TouchableOpacity style={st.retryBtn} onPress={fetchQrToken}>
                        <Text style={st.retryText}>Reintentar</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <QRCode
                      value={qrToken || 'ERROR'}
                      size={180}
                      color="#1a1a2e"
                      backgroundColor="white"
                      ecl="M"
                    />
                  )}
                </Animated.View>

                {/* Contador y barra de progreso */}
                {!qrLoading && !qrError && (
                  <>
                    <View style={st.countdownRow}>
                      <Ionicons name="time-outline" size={14} color={colorContador} />
                      <Text style={[st.countdownText, { color: colorContador }]}>
                        {'  '}Válido por: <Text style={st.countdownBold}>{segundos}s</Text>
                      </Text>
                    </View>

                    {/* Barra de progreso animada */}
                    <View style={st.progressTrack}>
                      <Animated.View
                        style={[st.progressBar, { width: barraWidth, backgroundColor: barraColor }]}
                      />
                    </View>
                  </>
                )}
              </View>
              {/* ── FIN QR ────────────────────────────────────────────── */}

              {/* Footer */}
              <View style={st.cardFooter}>
                <Text style={st.cardFooterText}>Válida hasta: ABR 2026</Text>
              </View>
            </View>

            {/* ── HISTORIAL RECIENTE ───────────────────────────────────── */}
            <View style={st.historyContainer}>
              <View style={st.historyHeader}>
                <Text style={st.sectionTitleHistory}>Historial Reciente</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Historial')}>
                  <Text style={st.linkText}>Ver Todos</Text>
                </TouchableOpacity>
              </View>

              {historial.length === 0 ? (
                <Text style={{ textAlign: 'center', color: COLORS.textSecondary, marginTop: 10 }}>
                  No hay accesos recientes.
                </Text>
              ) : (
                historial.map((item, index) => (
                  <View key={index} style={st.historyItem}>
                    <Text style={st.iconPlaceholder}>
                      {item.tipo.toLowerCase() === 'entrada' ? '🟢' : '🔴'}
                    </Text>
                    <View style={st.historyTextInfo}>
                      <Text style={[st.historyType, { color: item.tipo?.toLowerCase() === 'entrada' ? '#1D8348' : '#C0392B' }]}>
                        {item.tipo ? item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1) : 'Desconocido'}
                      </Text>
                      <Text style={st.historyDate}>{item.fecha || 'Reciente'}  {item.hora || ''}</Text>
                    </View>
                    <View style={st.badgeContainer}>
                      <Text style={st.badgeText}>{item.estado || 'Permitido'}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.background },
  scrollContent:   { paddingBottom: 20 },
  body:            { padding: 25 },

  sectionTitle: {
    fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: COLORS.accent,
  },
  sectionTitleHistory: {
    fontWeight: 'bold', fontSize: 16, color: COLORS.accent,
  },

  // ── Tarjeta ──────────────────────────────────────────────────────────────
  cardWrapper: {
    width: '100%', marginBottom: 30, borderRadius: 15, elevation: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 5,
    backgroundColor: COLORS.white, overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: COLORS.primary, flexDirection: 'row',
    alignItems: 'center', padding: 15,
  },
  cardUniversity: {
    color: COLORS.white, fontSize: 14, fontWeight: 'bold',
    letterSpacing: 1, flex: 1,
  },
  cardBody: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  cardPhotoContainer: {
    width: 85, height: 105, backgroundColor: COLORS.background,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 10, borderWidth: 2, borderColor: COLORS.accent,
  },
  cardInfoContainer: { flex: 1, marginLeft: 15 },
  cardName: { fontSize: 17, fontWeight: '800', color: '#0A1628', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardCareer: { fontSize: 12, color: '#1D4ED8', fontWeight: '700', marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.8 },
  cardCareerSubtitle: { fontSize: 13, color: '#1e293b', fontWeight: '600', marginBottom: 4, lineHeight: 18 },
  cardId: { fontSize: 14, color: '#0A1628', fontWeight: '800', marginTop: 8, letterSpacing: 1, backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  cardFooter: { backgroundColor: '#1D4ED8', padding: 8, alignItems: 'center' },
  cardFooterText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },

  // ── Sección QR ───────────────────────────────────────────────────────────
  qrSection: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  qrLabelRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 14,
  },
  qrLabel: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  qrWrapper: {
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  qrErrorContainer: {
    height: 180, width: 180, justifyContent: 'center',
    alignItems: 'center',
  },
  qrErrorText: { color: '#E74C3C', fontSize: 13, textAlign: 'center', marginTop: 8 },
  retryBtn: {
    marginTop: 12, paddingHorizontal: 20, paddingVertical: 8,
    backgroundColor: COLORS.primary, borderRadius: 20,
  },
  retryText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  // Contador
  countdownRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 8,
  },
  countdownText: { fontSize: 13 },
  countdownBold: { fontWeight: 'bold', fontSize: 15 },

  // Barra de progreso
  progressTrack: {
    width: '80%', height: 6, backgroundColor: '#E9ECEF',
    borderRadius: 3, overflow: 'hidden', marginBottom: 4,
  },
  progressBar: { height: 6, borderRadius: 3 },

  // ── Historial ────────────────────────────────────────────────────────────
  historyContainer: {
    backgroundColor: COLORS.cardBg, borderRadius: 20, padding: 20,
    elevation: 3, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
  },
  historyHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  linkText:        { color: COLORS.primary, fontWeight: 'bold' },
  historyItem:     { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  iconPlaceholder: { fontSize: 20 },
  historyTextInfo: { flex: 1, marginLeft: 12 },
  historyType:     { fontWeight: 'bold', fontSize: 14, color: COLORS.text },
  historyDate:     { fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
  badgeContainer:  {
    backgroundColor: '#D1E6C9', paddingHorizontal: 12,
    paddingVertical: 5, borderRadius: 20,
  },
  badgeText:       { color: '#558249', fontSize: 11, fontWeight: 'bold' },
});