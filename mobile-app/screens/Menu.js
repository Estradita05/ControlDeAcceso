import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

const menuItems = [
  { id: '1', title: 'Historial de Accesos', sub: 'Entradas y Salidas', route: 'Historial', icon: '🕒' },
  { id: '2', title: 'Mis Vehículos', sub: 'Registro Vehicular', route: 'MisVehiculos', icon: '🚗' },
  { id: '3', title: 'Mi Perfil', sub: 'Mis Datos', route: 'Perfil', icon: '👤' },
  { id: '4', title: 'Mi Tarjeta Digital', sub: 'Código de Barras', route: 'Credencial', icon: '💳' },
  { id: '5', title: 'Ayuda y Soporte', sub: '¿Necesitas ayuda?', route: 'ReporteProblema', icon: '🛠️' },
];

export default function Menu({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <Logo size="small" style={styles.logoContainer} />

      <Header title="MENÚ PRINCIPAL" navigation={navigation} showBack={true} />

      <ScrollView contentContainerStyle={styles.scroll}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.item} 
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.itemContent}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemSubText}>{item.sub}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
    paddingBottom: 15 
  },
  scroll: { 
    padding: 25 
  },
  item: { 
    backgroundColor: COLORS.cardBg, 
    padding: 18, 
    borderRadius: 18, 
    marginBottom: 15, 
    borderLeftWidth: 6, 
    borderLeftColor: COLORS.primary, 
    elevation: 2 
  },
  itemContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  icon: { 
    fontSize: 26, 
    marginRight: 20 
  },
  itemText: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: COLORS.accent 
  },
  itemSubText: { 
    fontSize: 13, 
    color: COLORS.secondary, 
    marginTop: 2 
  },
  logoutButton: { 
    backgroundColor: COLORS.primary, 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 10, 
    alignItems: 'center' 
  },
  logoutText: { 
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});