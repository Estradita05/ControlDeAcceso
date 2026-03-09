import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) { 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
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
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>NOTIFICACIONES</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.notificationItem}>
          <Ionicons name="shield-checkmark" size={32} color="#4CAF50" />
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Acceso permitido</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Título:</Text> Acceso autorizado{"\n"}
              <Text style={styles.bold}>Mensaje:</Text> Tu ingreso al campus fue registrado correctamente.{"\n"}
              <Text style={styles.bold}>Fecha y hora:</Text> 20/02/2026 – 07:12 a.m.
            </Text>
          </View>
        </View>

        <View style={styles.notificationItem}>
          <MaterialIcons name="block" size={32} color="#E53935" />
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Acceso denegado</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Título:</Text> Acceso denegado{"\n"}
              <Text style={styles.bold}>Mensaje:</Text> Se intentó ingresar con un vehículo no autorizado.{"\n"}
              <Text style={styles.bold}>Acción sugerida:</Text> Revisa tus datos o contacta a seguridad.
            </Text>
          </View>
        </View>

        <View style={styles.notificationItem}>
          <Ionicons name="log-out-outline" size={32} color="#E53935" />
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Salida registrada</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Título:</Text> Salida registrada{"\n"}
              <Text style={styles.bold}>Mensaje:</Text> Tu salida del campus fue registrada con éxito.{"\n"}
              <Text style={styles.bold}>Fecha y hora:</Text> 20/02/2026 – 13:45 p.m.
            </Text>
          </View>
        </View>

        <View style={styles.notificationItem}>
          <FontAwesome5 name="clock" size={28} color="#C9A227" />
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Recordatorio</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Título:</Text> Acceso próximo a vencer{"\n"}
              <Text style={styles.bold}>Mensaje:</Text> Tu permiso provisional vence hoy a las 23:59 hrs.
            </Text>
          </View>
        </View>

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
    backgroundColor: '#F0F6FA',
  },
  logo: {
    width: 120,
    height: 120,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: '#4F7EA8',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
});