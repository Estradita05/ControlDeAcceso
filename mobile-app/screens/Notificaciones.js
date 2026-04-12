import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function NotificationsScreen({ navigation }) { 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <Logo size="small" style={styles.logoContainer} />

      <Header title="NOTIFICACIONES" navigation={navigation} />

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
          <MaterialIcons name="block" size={32} color={COLORS.error} />
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
          <Ionicons name="log-out-outline" size={32} color={COLORS.error} />
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
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
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
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 15,
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
    color: COLORS.accent,
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.accent,
  },
});