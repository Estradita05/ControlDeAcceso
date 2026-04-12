import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function DigitalCredential({ navigation }) { 
  const [usuario, setUsuario] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        
        // Fetch User Info
        const userRes = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUsuario(userData.usuario);
        }

        // Fetch Access History
        const histRes = await fetch(`${API_URL}/accesos/historial`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (histRes.ok) {
          const histData = await histRes.json();
          if (Array.isArray(histData)) {
            // Sort descending based on ID and get top 2
            const recientes = histData
              .sort((a, b) => (b.id || 0) - (a.id || 0))
              .slice(0, 2)
              .map((item, index) => {
                const tipoFinal = item.tipo || item.tipo_movimiento || (index % 2 === 0 ? 'entrada' : 'salida');
                return {
                  ...item,
                  tipo: tipoFinal,
                  fecha: item.fecha || 'Reciente',
                  hora: item.hora || ''
                };
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <Logo size="small" style={styles.logoContainer} />

      <Header title="CREDENCIAL DIGITAL" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Tu tarjeta digital</Text>

            <View style={styles.cardWrapper}>
              <View style={styles.cardHeader}>
                <Ionicons name="school" size={24} color={COLORS.white} style={{marginRight: 10}} />
                <Text style={styles.cardUniversity}>UNIVERSIDAD POLITECNICA DE QUERETARO</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardPhotoContainer}>
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
                <View style={styles.cardInfoContainer}>
                  <Text style={styles.cardName}>{usuario?.nombre || 'CARGANDO...'}</Text>
                  <Text style={styles.cardCareer}>ESTUDIANTE</Text>
                  <Text style={styles.cardCareerSubtitle}>Tecnologías de la Información</Text>
                  <Text style={styles.cardId}>MATRÍCULA: {usuario?.matricula || '--'}</Text>
                </View>
              </View>
              <View style={styles.barcodeContainer}>
                {usuario?.matricula ? (
                  <Image 
                    source={{ uri: `https://bwipjs-api.metafloor.com/?bcid=code128&text=${usuario.matricula}&scale=3&height=16&includetext=true` }} 
                    style={styles.barcodeImage} 
                    resizeMode="contain"
                  />
                ) : (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                )}
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>Válida hasta: ABR 2026</Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.sectionTitleHistory}>Historial Reciente</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Historial')}>
                  <Text style={styles.linkText}>Ver Todos</Text>
                </TouchableOpacity>
              </View>

              {historial.length === 0 ? (
                <Text style={{ textAlign: 'center', color: COLORS.textSecondary, marginTop: 10 }}>No hay accesos recientes.</Text>
              ) : (
                historial.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.iconPlaceholder}>
                      {item.tipo.toLowerCase() === 'entrada' ? '🟢' : '🔴'}
                    </Text>
                    <View style={styles.historyTextInfo}>
                      <Text style={[styles.historyType, { color: item.tipo?.toLowerCase() === 'entrada' ? '#1D8348' : '#C0392B' }]}>
                        {item.tipo ? (item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)) : 'Desconocido'}
                      </Text>
                      <Text style={styles.historyDate}>{item.fecha || 'Reciente'}  {item.hora || ''}</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{item.estado || 'Permitido'}</Text>
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  body: { 
    padding: 25 
  },
  sectionTitle: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginBottom: 15,
    color: COLORS.accent,
  },
  sectionTitleHistory: {
    fontWeight: 'bold', 
    fontSize: 16, 
    color: COLORS.accent,
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 30,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardUniversity: {
    color: COLORS.white,
    fontSize: 14, // Slightly smaller to fit Better
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  cardPhotoContainer: {
    width: 85,
    height: 105,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  cardInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    textTransform: 'uppercase',
  },
  cardCareer: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardCareerSubtitle: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 5,
  },
  cardId: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardFooter: {
    backgroundColor: COLORS.secondary,
    padding: 8,
    alignItems: 'center',
  },
  cardFooterText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  barcodeContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
  },
  barcodeImage: {
    width: '95%',
    height: 90,
  },
  historyContainer: { 
    backgroundColor: COLORS.cardBg, 
    borderRadius: 20, 
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  historyHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20 
  },
  linkText: { 
    color: COLORS.primary, 
    fontWeight: 'bold' 
  },
  historyItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 18 
  },
  iconPlaceholder: {
    fontSize: 20,
  },
  historyTextInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  historyType: { 
    fontWeight: 'bold', 
    fontSize: 14,
    color: COLORS.text,
  },
  historyDate: { 
    fontSize: 12, 
    color: COLORS.textSecondary,
    marginTop: 3 
  },
  badgeContainer: { 
    backgroundColor: '#D1E6C9', 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  badgeText: { 
    color: '#558249', 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
});