import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, Animated, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const ESTADO_CONFIG = {
  PENDIENTE: { icon: 'time-outline',           color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  label: 'Pendiente'  },
  APROBADA:  { icon: 'checkmark-circle-outline',color: '#10B981', bg: 'rgba(16,185,129,0.12)',  label: 'Aprobada'   },
  RECHAZADA: { icon: 'close-circle-outline',    color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   label: 'Rechazada'  },
};

export default function MisSolicitudes({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchSolicitudes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/solicitudes/mis-solicitudes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(data);
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => { fetchSolicitudes(); }, [])
  );

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Mis Solicitudes" navigation={navigation} />

      {loading ? (
        <View style={st.loadingWrap}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {solicitudes.length === 0 ? (
              <View style={st.emptyWrap}>
                <Ionicons name="document-outline" size={50} color={COLORS.textMuted} />
                <Text style={st.emptyTitle}>Sin solicitudes</Text>
                <Text style={st.emptyText}>
                  Aún no has enviado ninguna solicitud de acceso provisional.
                </Text>
              </View>
            ) : (
              solicitudes.map(sol => {
                const cfg = ESTADO_CONFIG[sol.estado] || ESTADO_CONFIG.PENDIENTE;
                return (
                  <View key={sol.id} style={st.card}>
                    {/* Header de la tarjeta */}
                    <View style={st.cardHeader}>
                      <View style={[st.estatusBadge, { backgroundColor: cfg.bg, borderColor: cfg.color + '60' }]}>
                        <Ionicons name={cfg.icon} size={14} color={cfg.color} />
                        <Text style={[st.estatusText, { color: cfg.color }]}>{cfg.label}</Text>
                      </View>
                      <Text style={st.date}>
                        {sol.creado_en ? new Date(sol.creado_en).toLocaleDateString('es-MX') : ''}
                      </Text>
                    </View>

                    {/* Datos del vehículo */}
                    <View style={st.row}>
                      <Ionicons name="car-sport-outline" size={18} color={COLORS.accent} />
                      <Text style={st.placa}>{sol.placa}</Text>
                      {sol.marca ? <Text style={st.sub}>{sol.marca} {sol.modelo}</Text> : null}
                    </View>

                    {sol.color ? (
                      <Text style={st.detail}>🎨 {sol.color}</Text>
                    ) : null}

                    <Text style={st.motivo}>📝 {sol.motivo}</Text>

                    {/* Motivo de rechazo */}
                    {sol.estado === 'RECHAZADA' && sol.motivo_rechazo ? (
                      <View style={st.rechazoBanner}>
                        <Ionicons name="information-circle-outline" size={15} color={COLORS.error} />
                        <Text style={st.rechazoText}>
                          Motivo: {sol.motivo_rechazo}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })
            )}
            <View style={{ height: 30 }} />
          </Animated.View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 20 },

  emptyWrap: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyTitle: { ...FONTS.h3, color: COLORS.text },
  emptyText: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  estatusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
  },
  estatusText: { ...FONTS.caption, fontWeight: '700' },
  date: { ...FONTS.caption, color: COLORS.textMuted },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  placa: { ...FONTS.bodyMedium, color: COLORS.text, letterSpacing: 1 },
  sub: { ...FONTS.caption, color: COLORS.textSecondary },
  detail: { ...FONTS.subText, color: COLORS.textSecondary, marginBottom: 4 },
  motivo: { ...FONTS.subText, color: COLORS.textSecondary, lineHeight: 20, marginTop: 4 },

  rechazoBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)',
    borderRadius: 10, padding: 10, marginTop: 10,
  },
  rechazoText: { ...FONTS.caption, color: '#EF4444', flex: 1, lineHeight: 18 },
});
