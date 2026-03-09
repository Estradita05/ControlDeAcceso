import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function DigitalCredential({ navigation }) { 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
        />
      </View>

      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>CREDENCIAL DIGITAL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Tu tarjeta digital</Text>

          <Image 
            source={require('../assets/credencial.jpeg')} 
            style={styles.idCard} 
          />

          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionTitleHistory}>Historial de Accesos</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Historial')}>
                <Text style={styles.linkText}>Ver Todos</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.historyItem}>
              <Text style={styles.iconPlaceholder}>🟢</Text>
              <View style={styles.historyTextInfo}>
                <Text style={styles.historyType}>Entrada</Text>
                <Text style={styles.historyDate}>19/02/2026  07:15 AM</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Permitido</Text>
              </View>
            </View>

            <View style={styles.historyItem}>
              <Text style={styles.iconPlaceholder}>🔴</Text>
              <View style={styles.historyTextInfo}>
                <Text style={styles.historyType}>Salida</Text>
                <Text style={styles.historyDate}>18/02/2026  06:32 PM</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Permitido</Text>
              </View>
            </View>
          </View>
        </View>
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
  idCard: { 
    width: '100%', 
    height: 200,
    borderRadius: 18,
    marginBottom: 30,
    resizeMode: 'cover',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
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