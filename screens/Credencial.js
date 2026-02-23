import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function DigitalCredential() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} /> 
      </View>

      <View style={styles.headerRibbon}>
        <TouchableOpacity style={styles.backButtonContainer}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credencial digital</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Tu tarjeta digital</Text>
        {/* Aquí va la imagen real de tu tarjeta */}
        <Image source={require('../assets/credencial.jpeg')} style={styles.idCard} />

        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Historial de Accesos</Text>
            <TouchableOpacity><Text style={styles.linkText}>Ver Todos</Text></TouchableOpacity>
          </View>

          <View style={styles.historyItem}>
            <Text style={styles.historyIconGreen}>➔</Text>
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Entrada</Text>
              <Text style={styles.historyDate}>19/02/2026  07:15 AM.</Text>
            </View>
            <View style={styles.badgeContainer}><Text style={styles.badgeText}>Permitido</Text></View>
          </View>

          <View style={styles.historyItem}>
            <Text style={styles.historyIconRed}>➔</Text>
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Salida</Text>
              <Text style={styles.historyDate}>18/02/2026  06:32 PM.</Text>
            </View>
            <View style={styles.badgeContainer}><Text style={styles.badgeText}>Permitido</Text></View>
          </View>

          <View style={styles.historyItem}>
            <Text style={styles.historyIconGreen}>➔</Text>
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Entrada</Text>
              <Text style={styles.historyDate}>18/02/2026  07:08 AM.</Text>
            </View>
            <View style={styles.badgeContainer}><Text style={styles.badgeText}>Permitido</Text></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 10 },
  logo: { width: 90, height: 90, resizeMode: 'contain' },
  headerRibbon: { backgroundColor: '#8AB4DF', width: '100%', paddingVertical: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  backButtonContainer: { position: 'absolute', left: 20, zIndex: 1 },
  backButton: { fontSize: 24, fontWeight: '900', color: '#000' },
  headerTitle: { color: '#004A8F', fontWeight: '800', fontSize: 14 },
  body: { padding: 25 },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, color: '#000', marginBottom: 15 },
  idCard: { width: '85%', container: 100, borderRadius: 15, marginBottom: 25, resizeMode: 'contain' },
  historyContainer: { backgroundColor: '#F0F6FC', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  linkText: { color: '#0084FF', fontWeight: '600', fontSize: 12 },
  historyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  historyIconGreen: { fontSize: 20, color: '#4CAF50', marginRight: 15 },
  historyIconRed: { fontSize: 20, color: '#F44336', marginRight: 15, transform: [{ rotate: '180deg' }] },
  historyTextInfo: { flex: 1 },
  historyType: { fontWeight: 'bold', color: '#000', fontSize: 13 },
  historyDate: { fontSize: 11, color: '#6A8299', marginTop: 2 },
  badgeContainer: { backgroundColor: '#DDF0D7', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  badgeText: { color: '#5A9B4B', fontSize: 11, fontWeight: 'bold' },
});