import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, StatusBar, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  { id: '1', title: 'Historial', sub: 'Entradas y salidas', route: 'Historial', iconName: 'time-outline', gradient: ['#1D4ED8', '#3B82F6'] },
  { id: '2', title: 'Mis Vehículos', sub: 'Gestión vehicular', route: 'MisVehiculos', iconName: 'car-sport-outline', gradient: ['#0891B2', '#06B6D4'] },
  { id: '3', title: 'Mi Perfil', sub: 'Datos personales', route: 'Perfil', iconName: 'person-circle-outline', gradient: ['#7C3AED', '#A78BFA'] },
  { id: '4', title: 'Credencial Digital', sub: 'QR y código de barras', route: 'Credencial', iconName: 'card-outline', gradient: ['#0D9488', '#2DD4BF'] },
  { id: '5', title: 'Ayuda y Soporte', sub: '¿Necesitas ayuda?', route: 'ReporteProblema', iconName: 'headset-outline', gradient: ['#B45309', '#F59E0B'] },
  { id: '6', title: 'Ajustes', sub: 'Tema, idioma y cuenta', route: 'Ajustes', iconName: 'settings-outline', gradient: ['#4B5563', '#6B7280'] },
];

export default function Menu({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [primerNombre, setPrimerNombre] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      // Intentar obtener el perfil real para mostrar el primer nombre
      const res = await fetch(`${API_URL}/auth/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const nombre = data?.usuario?.nombre || '';
        // Extraer solo el primer nombre
        setPrimerNombre(nombre.split(' ')[0]);
      }
    } catch { }
  };

  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir', style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const styles = makeStyles(COLORS);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />

      {/* Header */}
      <LinearGradient colors={COLORS.gradientHeader} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarLetter}>
              {primerNombre ? primerNombre[0].toUpperCase() : '?'}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>
              {primerNombre ? `¡Hola, ${primerNombre}! 👋` : 'Bienvenido 👋'}
            </Text>
            <Text style={styles.headerSub}>Menú Principal</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerLine} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.85}
              style={styles.cardWrap}
            >
              <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconBox}>
                <Ionicons name={item.iconName} size={24} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: { paddingBottom: 4 },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  avatarSmall: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(96,165,250,0.2)',
    borderWidth: 1.5, borderColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarLetter: { ...FONTS.bodyMedium, color: COLORS.accent, fontWeight: '800' },
  headerText: { flex: 1 },
  greeting: { ...FONTS.bodyMedium, color: COLORS.text },
  headerSub: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 },
  logoutIcon: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: COLORS.errorLight,
    alignItems: 'center', justifyContent: 'center',
  },
  headerLine: { height: 1, backgroundColor: COLORS.border },

  scroll: { padding: 20 },

  cardWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: COLORS.border,
    gap: 14, ...SHADOWS.sm,
  },
  iconBox: { width: 48, height: 48, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1 },
  cardTitle: { ...FONTS.bodyMedium, color: COLORS.text },
  cardSub: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.errorLight,
    borderWidth: 1, borderColor: COLORS.error + '40',
    borderRadius: SIZES.borderRadius,
    paddingVertical: 14, marginTop: 8,
  },
  logoutBtnText: { ...FONTS.bodyMedium, color: COLORS.error },
});