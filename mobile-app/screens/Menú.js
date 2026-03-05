import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const menuItems = [
  { id: '1', title: 'Historial de Accesos', subtitle: 'Entradas y Salidas', icon: '🕒' },
  { id: '2', title: 'Mis Vehículos', subtitle: 'Registro Vehicular', icon: '🚗' },
  { id: '3', title: 'Mi Perfil', subtitle: 'Mis Datos', icon: '👤' },
  { id: '4', title: 'Mi Tarjeta Digital', subtitle: 'Código de Barras', icon: '💳' },
  { id: '5', title: 'Ayuda y Soporte', subtitle: '¿Necesitas ayuda?', icon: '🛠️' },
  { id: '6', title: 'Ajustes de Seguridad', subtitle: '¿Necesitas ayuda?', icon: '🔒' },
];

export default function MainMenu() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.header}>
       <Image
                 source={require('../assets/logo.png')} style={styles.logo} /> 
      </View>
      
      <View style={styles.headerRibbon}>
        <Text style={styles.headerTitle}>MENÚ PRINCIPAL</Text>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuCard} activeOpacity={0.8}>
            <View style={styles.cardLeftIndicator} />
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 15 },
  logo: { width: 110, height: 110, resizeMode: 'contain' },
  headerRibbon: { backgroundColor: '#8AB4DF', width: '100%', paddingVertical: 12, alignItems: 'center', marginBottom: 25 },
  headerTitle: { color: '#004A8F', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
  menuList: { paddingHorizontal: 25 },
  menuCard: { flexDirection: 'row', backgroundColor: '#F0F6FC', borderRadius: 12, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4, overflow: 'hidden' },
  cardLeftIndicator: { width: 6, height: '100%', backgroundColor: '#004A8F', position: 'absolute', left: 0 },
  iconContainer: { width: 50, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#D0E0F0', paddingRight: 5, marginLeft: 15, marginRight: 15, paddingVertical: 15 },
  icon: { fontSize: 26 },
  textContainer: { flex: 1, paddingVertical: 15 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, color: '#000' },
  cardSubtitle: { fontSize: 11, color: '#7A91A6', marginTop: 2 },
});