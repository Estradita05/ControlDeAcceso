import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

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
          // Sort descending based on ID and get top 2
          const recientes = histData.sort((a, b) => b.id - a.id).slice(0, 2);
          setHistorial(recientes);
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
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.titleBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>CREDENCIAL DIGITAL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#005696" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Tu tarjeta digital</Text>

            <View style={styles.cardWrapper}>
              <View style={styles.cardHeader}>
                <Ionicons name="school" size={24} color="#FFF" style={{marginRight: 10}} />
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
                    <Ionicons name="person" size={70} color="#004C8C" />
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
                  <ActivityIndicator size="small" color="#005696" />
                )}
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>Válida hasta: ABR 2026</Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.sectionTitleHistory}>Historial de Accesos</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Historial')}>
                  <Text style={styles.linkText}>Ver Todos</Text>
                </TouchableOpacity>
              </View>

              {historial.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#666', marginTop: 10 }}>No hay accesos recientes.</Text>
              ) : (
                historial.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.iconPlaceholder}>
                      {item.tipo.toLowerCase() === 'entrada' ? '🟢' : '🔴'}
                    </Text>
                    <View style={styles.historyTextInfo}>
                      <Text style={styles.historyType}>
                        {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                      </Text>
                      <Text style={styles.historyDate}>{item.fecha}  {item.hora}</Text>
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
    backgroundColor: '#F0F6FA' 
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#F0F6FA',
  },
  logo: { 
    width: 120, 
    height: 120, 
    resizeMode: 'contain' 
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86ABC8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C8C',
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
    color: '#004C8C',
  },
  sectionTitleHistory: {
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#004C8C',
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
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#003B7C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardUniversity: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  cardPhotoContainer: {
    width: 85,
    height: 105,
    backgroundColor: '#F0F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#004C8C',
  },
  cardInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003B7C',
    textTransform: 'uppercase',
  },
  cardCareer: {
    fontSize: 13,
    color: '#86ABC8',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardCareerSubtitle: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  cardId: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardFooter: {
    backgroundColor: '#86ABC8',
    padding: 8,
    alignItems: 'center',
  },
  cardFooterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  barcodeContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF',
  },
  barcodeImage: {
    width: '95%',
    height: 90,
  },
  historyContainer: { 
    backgroundColor: '#EAF3F8', 
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
    color: '#0084FF', 
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
    color: '#000',
  },
  historyDate: { 
    fontSize: 12, 
    color: '#4F7EA8',
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