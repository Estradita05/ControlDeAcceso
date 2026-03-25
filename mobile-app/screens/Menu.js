import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';

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
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>❮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MENÚ PRINCIPAL</Text>
      </View>

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
    backgroundColor: '#F0F6FA' 
  },
  logoContainer: { 
    alignItems: 'center', 
    paddingVertical: 25 
  },
  logo: { 
    width: 90, 
    height: 90 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#86ABC8', 
    paddingVertical: 12,
    paddingHorizontal: 15
  },
  backButton: { 
    paddingRight: 10 
  },
  backIcon: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#003B7C' 
  },
  headerTitle: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#003B7C', 
    marginRight: 30 
  },
  scroll: { 
    padding: 25 
  },
  item: { 
    backgroundColor: '#EAF3F8', 
    padding: 18, 
    borderRadius: 18, 
    marginBottom: 15, 
    borderLeftWidth: 6, 
    borderLeftColor: '#0054A3', 
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
    color: '#003B7C' 
  },
  itemSubText: { 
    fontSize: 13, 
    color: '#86ABC8', 
    marginTop: 2 
  },
  logoutButton: { 
    backgroundColor: '#005696', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 10, 
    alignItems: 'center' 
  },
  logoutText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});