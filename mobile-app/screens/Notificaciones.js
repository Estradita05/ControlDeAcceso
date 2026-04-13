import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const TIPO_ICON = {
  success: { icon: 'checkmark-circle', color: '#10B981' },
  error:   { icon: 'close-circle',     color: '#EF4444' },
  info:    { icon: 'information-circle',color: '#3B82F6' },
};

export default function Notificaciones({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [notis, setNotis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotis = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/notificaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNotis(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchNotis(); }, []));

  const marcarLeida = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_URL}/notificaciones/${id}/leer`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotis(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
    } catch {}
  };

  const marcarTodas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_URL}/notificaciones/leer-todas`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotis(prev => prev.map(n => ({ ...n, leida: true })));
    } catch {}
  };

  const sinLeer = notis.filter(n => !n.leida).length;
  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Notificaciones" navigation={navigation} />

      {/* Header acciones */}
      <View style={st.topBar}>
        {sinLeer > 0 ? (
          <View style={st.badge}>
            <Text style={st.badgeText}>{sinLeer} sin leer</Text>
          </View>
        ) : <View />}
        {sinLeer > 0 && (
          <TouchableOpacity onPress={marcarTodas} style={st.markAll}>
            <Ionicons name="checkmark-done-outline" size={16} color={COLORS.accent} />
            <Text style={st.markAllText}>Marcar todas</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={st.center}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={st.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchNotis(); }} tintColor={COLORS.accent} />}
        >
          {notis.length === 0 ? (
            <View style={st.emptyWrap}>
              <Ionicons name="notifications-off-outline" size={50} color={COLORS.textMuted} />
              <Text style={st.emptyTitle}>Sin notificaciones</Text>
              <Text style={st.emptyText}>Aquí aparecerán las respuestas a tus solicitudes y avisos del sistema.</Text>
            </View>
          ) : (
            notis.map(n => {
              const cfg = TIPO_ICON[n.tipo] || TIPO_ICON.info;
              return (
                <TouchableOpacity
                  key={n.id}
                  onPress={() => !n.leida && marcarLeida(n.id)}
                  activeOpacity={0.85}
                  style={[st.card, n.leida && st.cardRead]}
                >
                  <View style={[st.iconWrap, { backgroundColor: cfg.color + '20' }]}>
                    <Ionicons name={cfg.icon} size={24} color={cfg.color} />
                  </View>
                  <View style={st.body}>
                    <Text style={[st.titulo, n.leida && st.tituloRead]}>{n.titulo}</Text>
                    <Text style={[st.mensaje, n.leida && st.mensajeRead]}>{n.mensaje}</Text>
                    <Text style={st.fecha}>
                      {n.creado_en ? new Date(n.creado_en).toLocaleString('es-MX') : ''}
                    </Text>
                  </View>
                  {!n.leida && <View style={st.unreadDot} />}
                </TouchableOpacity>
              );
            })
          )}
          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  badge: { backgroundColor: COLORS.accentGlow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  markAll: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  markAllText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '600' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: 16, paddingBottom: 30 },

  emptyWrap: { alignItems: 'center', paddingTop: 70, gap: 14 },
  emptyTitle: { ...FONTS.h3, color: COLORS.text },
  emptyText: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 30 },

  card: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  cardRead: { opacity: 0.6 },
  iconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1 },
  titulo: { ...FONTS.bodyMedium, color: COLORS.text, marginBottom: 3 },
  tituloRead: { fontWeight: '400' },
  mensaje: { ...FONTS.subText, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 5 },
  mensajeRead: { color: COLORS.textMuted },
  fecha: { ...FONTS.caption, color: COLORS.textMuted },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, marginTop: 4 },
});