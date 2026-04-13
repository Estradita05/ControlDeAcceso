import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Image, ScrollView, SafeAreaView, ActivityIndicator, Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GradientButton from '../components/GradientButton';

export default function ProfileScreen({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const st = makeStyles(COLORS);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPerfil();
  }, []);

  const fetchPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No se encontró el token de acceso');
      
      const response = await fetch(`${API_URL}/auth/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsuario(data.usuario);
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      } else {
        throw new Error('Error al obtener los datos del servidor');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', e.message || 'No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={st.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
        <Header title="Mi Perfil" navigation={navigation} />
        <View style={st.loadingWrap}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={st.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const initials = usuario?.nombre
    ? usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'US';

  const infoRows = [
    { label: 'Matrícula', value: usuario?.matricula || '—', icon: 'school-outline' },
    { label: 'Correo', value: usuario?.email || '—', icon: 'mail-outline' },
    { label: 'Carrera', value: usuario?.carrera || 'No registrada', icon: 'book-outline' },
  ];


  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Mi Perfil" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient colors={['#0F172A', '#1A2540']} style={st.hero}>
          <View style={st.avatarWrap}>
            {usuario?.foto_perfil ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${usuario.foto_perfil}` }}
                style={st.avatarImage}
              />
            ) : (
              <LinearGradient colors={COLORS.gradientPrimary} style={st.avatarGradient}>
                <Text style={st.avatarText}>{initials}</Text>
              </LinearGradient>
            )}
            {/* Anillo decorativo */}
            <View style={st.avatarRing} />
          </View>

          <Text style={st.name}>{usuario?.nombre || 'Usuario'}</Text>
          <View style={st.badgeWrap}>
            <LinearGradient colors={['rgba(37,99,235,0.3)', 'rgba(59,130,246,0.1)']} style={st.badge}>
              <Ionicons name="school-outline" size={13} color={COLORS.accent} />
              <Text style={st.badgeText}>Estudiante</Text>
            </LinearGradient>
          </View>
        </LinearGradient>

        <Animated.View style={[st.content, { opacity: fadeAnim }]}>
          {/* Datos */}
          <View style={st.card}>
            <Text style={st.sectionTitle}>Información Personal</Text>
            {infoRows.map((row, i) => (
              <View key={i} style={[st.row, i < infoRows.length - 1 && st.rowBorder]}>
                <View style={st.rowIcon}>
                  <Ionicons name={row.icon} size={16} color={COLORS.accent} />
                </View>
                <View style={st.rowBody}>
                  <Text style={st.rowLabel}>{row.label}</Text>
                  <Text style={st.rowValue}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Acciones */}
          <GradientButton
            title="Editar Perfil"
            onPress={() => navigation.navigate('EditarPerfil')}
            style={st.editBtn}
          />

          <GradientButton
            title="Cerrar Sesión"
            variant="danger"
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              navigation.navigate('Login');
            }}
            style={st.logoutBtn}
          />

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { ...FONTS.subText, color: COLORS.textSecondary },

  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20 },
  avatarWrap: { position: 'relative', marginBottom: 16 },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarGradient: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 36, fontWeight: '800', color: COLORS.white },
  avatarRing: {
    position: 'absolute', top: -4, left: -4,
    width: 108, height: 108, borderRadius: 54,
    borderWidth: 2, borderColor: COLORS.inputBorderFocus,
    opacity: 0.6,
  },
  name: { ...FONTS.h2, color: COLORS.text, marginBottom: 10 },
  badgeWrap: { alignItems: 'center' },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: COLORS.inputBorder,
  },
  badgeText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '600' },

  content: { paddingHorizontal: 22, paddingTop: 20 },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadiusLg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    ...SHADOWS.sm,
  },
  sectionTitle: { ...FONTS.label, color: COLORS.textSecondary, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: COLORS.accentGlow,
    alignItems: 'center', justifyContent: 'center',
  },
  rowBody: { flex: 1 },
  rowLabel: { ...FONTS.caption, color: COLORS.textSecondary, marginBottom: 2 },
  rowValue: { ...FONTS.bodyMedium, color: COLORS.text },

  editBtn: { marginBottom: 12 },
  logoutBtn: {},
});
