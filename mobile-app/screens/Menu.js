import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';

const menuItems = [
  { id: '1', title: 'Historial de Accesos', subtitle: 'Entradas y Salidas', icon: '🕒', route: 'Historial' },
  { id: '2', title: 'Mis Vehículos', subtitle: 'Registro Vehicular', icon: '🚗', route: 'MisVehiculos' },
  { id: '3', title: 'Mi Perfil', subtitle: 'Mis Datos', icon: 'Perfil' }, // Cambiado a 'Perfil' para coincidir con App.js
  { id: '4', title: 'Mi Tarjeta Digital', subtitle: 'Código de Barras', icon: '💳', route: 'Credencial' }, // Se agregó route
  { id: '5', title: 'Ayuda y Soporte', subtitle: '¿Necesitas ayuda?', icon: '🛠️', route: 'AyudaYsoporte' },
  { id: '6', title: 'Ajustes de Seguridad', subtitle: 'Configuración', icon: '🔒', route: 'Ajustes' },
];

export default function MainMenu({ navigation }) { 
  
  // Función de navegación segura
  const handleNavigation = (routeName) => {
    if (routeName) {
      navigation.navigate(routeName);
    } else {
      console.warn("Ruta no definida para este item");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ajustado para que el StatusBar coincida con el fondo */}
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')} 
            style={styles.logo} 
          /> 
        </View>
        
        <View style={styles.headerRibbon}>
          <Text style={styles.headerTitle}>MENÚ PRINCIPAL</Text>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => handleNavigation(item.route)} 
            >
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

          {/* Botón de Cerrar Sesión con estilo destacado */}
          <TouchableOpacity 
            style={[styles.menuCard, { backgroundColor: '#FFEBEE', marginTop: 10 }]} 
            onPress={() => navigation.navigate('Login')}
          >
            <View style={[styles.cardLeftIndicator, { backgroundColor: '#D32F2F' }]} />
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🚪</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.cardTitle, { color: '#D32F2F' }]}>Cerrar Sesión</Text>
              <Text style={styles.cardSubtitle}>Salir de la cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' // Cambiado de blanco a azul claro institucional
  },
  header: { 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 15 
  },
  logo: { 
    width: 110, 
    height: 110, 
    resizeMode: 'contain' 
  },
  headerRibbon: { 
    backgroundColor: '#86ABC8', // Azul medio de tu paleta
    width: '100%', 
    paddingVertical: 12, 
    alignItems: 'center', 
    marginBottom: 25,
    elevation: 2 
  },
  headerTitle: { 
    color: '#004A8F', 
    fontWeight: '800', 
    fontSize: 14, 
    letterSpacing: 0.5 
  },
  menuList: { 
    paddingHorizontal: 25 
  },
  menuCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    marginBottom: 16, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3, 
    overflow: 'hidden' 
  },
  cardLeftIndicator: { 
    width: 6, 
    height: '100%', 
    backgroundColor: '#004A8F', 
    position: 'absolute', 
    left: 0 
  },
  iconContainer: { 
    width: 60, 
    alignItems: 'center', 
    borderRightWidth: 1, 
    borderRightColor: '#E1F5FE', 
    marginLeft: 10, 
    paddingVertical: 15 
  },
  icon: { 
    fontSize: 26 
  },
  textContainer: { 
    flex: 1, 
    paddingLeft: 15, 
    paddingVertical: 15 
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 15, 
    color: '#004A8F' 
  },
  cardSubtitle: { 
    fontSize: 11, 
    color: '#7A91A6', 
    marginTop: 2 
  },
});