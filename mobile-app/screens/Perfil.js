import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function ProfileScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data.usuario);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="PERFIL" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            {usuario?.foto_perfil ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${usuario.foto_perfil}` }}
                style={{ width: 110, height: 110, borderRadius: 55 }}
              />
            ) : (
              <Ionicons name="person" size={65} color={COLORS.white} />
            )}
          </View>

          <Text style={styles.name}>{usuario?.nombre || 'Cargando...'}</Text>
          <Text style={styles.email}>{usuario?.email || 'Cargando...'}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditarPerfil')}
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del usuario</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Estudiante</Text>
            <Text style={styles.value}>{usuario?.id || '--'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Carrera</Text>
            <Text style={styles.value}>Tecnologías de la información</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cuatrimestre</Text>
            <Text style={styles.value}>5</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  email: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 4,
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 25,
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.accent,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    paddingBottom: 5,
  },
  label: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  value: {
    fontWeight: '500',
    color: COLORS.accent,
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    marginTop: 30,
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
