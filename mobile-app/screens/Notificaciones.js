import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>

      
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>

        
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.mainTitle}>Notificaciones</Text>

        
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

        <View style={styles.notificationItem}>
          <MaterialIcons name="lock" size={32} color="#F44336" />
          <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>Cuenta bloqueada</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Título:</Text> Cuenta bloqueada{"\n"}
              <Text style={styles.bold}>Mensaje:</Text> Tu cuenta ha sido bloqueada por múltiples intentos fallidos.{"\n"}
              <Text style={styles.bold}>Acción:</Text> Contacta a soporte.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3EEF6',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  closeButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    backgroundColor: '#E53935',
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 90,
    height: 90,
  },

  mainTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#000',
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 15,
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