import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

const menuItems = [
  { id: '1', title: 'Historial de Accesos', subtitle: 'Entradas y Salidas', icon: '🕒', route: 'Historial' },
  { id: '2', title: 'Mis Vehículos', subtitle: 'Registro Vehicular', icon: '🚗', route: 'MisVehiculos' },
  { id: '3', title: 'Mi Perfil', subtitle: 'Mis Datos', icon: '👤', route: 'Perfil' },
  { id: '4', title: 'Mi Tarjeta Digital', subtitle: 'Código de Barras', icon: '💳', route: 'Credencial' },
  { id: '5', title: 'Ayuda y Soporte', subtitle: '¿Necesitas ayuda?', icon: '🛠️', route: 'ReporteProblema' },
];

export default function Menu({ setVistaActual }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setVistaActual('Principal')} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>MENÚ PRINCIPAL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.tarjeta} 
            onPress={() => setVistaActual(item.route)}
          >
            <View style={styles.contenedorIcono}>
              <Text style={styles.emojiIcono}>{item.icon}</Text>
            </View>
            <View style={styles.contenedorTexto}>
              <Text style={styles.tituloCard}>{item.title}</Text>
              <Text style={styles.subtituloCard}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => setVistaActual('Login')}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FA', 
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86ABC8', // Azul de Perfil
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 5,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3F8',
    padding: 15,
    borderRadius: 20, 
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#0054A3', // Detalle azul
    elevation: 3,
  },
  contenedorIcono: { 
    width: 50, 
    alignItems: 'center',
  }, 
  emojiIcono: { 
    fontSize: 24 
  },
  contenedorTexto: { 
    marginLeft: 15, 
    flex: 1 
  },
  tituloCard: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#004C8C' 
  },
  subtituloCard: { 
    fontSize: 12, 
    color: '#7A9EB1' 
  },
  logoutButton: {
    backgroundColor: '#0E5A8A', // Azul de botón Perfil
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});