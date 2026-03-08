import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';

// IMPORTACIÓN DE TUS INTERFACES (Verifica que no tengan acentos los archivos)
import InicioScreen from './Inicio';
import LoginScreen from './Login';
import RestablecerContrasenaScreen from './RestablecerContrasena';
import MenuScreen from './Menu';
import CredencialScreen from './Credencial';
import NotificacionesScreen from './Notificaciones';
import HistorialScreen from './Historial';
import MisVehiculosScreen from './MisVehiculos';
import AgregarVehiculoScreen from './AgregarVehiculo';
import AccesoProvisionalScreen from './AccesoProvisional';
import EditarPerfilScreen from './EditarPerfil';
import PerfilScreen from './Perfil';
import AjustesScreen from './Ajustes';
import ReporteProblemaScreen from './ReporteProblema';
import RegistroScreen from './Registro';
import BajaVehiculoScreen from './BajaVehiculo';
import EditarVehiculoScreen from './EditarVehiculo'; 

export default function Principal() {
  const [vistaActual, setVistaActual] = useState('Principal');

  if (vistaActual === 'Inicio') return <InicioScreen />;
  if (vistaActual === 'Login') return <LoginScreen />;
  if (vistaActual === 'Registro') return <RegistroScreen setVistaActual={setVistaActual} />;
  if (vistaActual === 'RestablecerContrasena') return <RestablecerContrasenaScreen />;
  if (vistaActual === 'Menu') return <MenuScreen />;
  if (vistaActual === 'Credencial') return <CredencialScreen />;
  if (vistaActual === 'Notificaciones') return <NotificacionesScreen />;
  if (vistaActual === 'Historial') return <HistorialScreen />;
  if (vistaActual === 'MisVehiculos') return <MisVehiculosScreen />;
  if (vistaActual === 'AgregarVehiculo') return <AgregarVehiculoScreen />;
  if (vistaActual === 'AccesoProvisional') return <AccesoProvisionalScreen />;
  if (vistaActual === 'EditarPerfil') return <EditarPerfilScreen />;
  if (vistaActual === 'Perfil') return <PerfilScreen />;
  if (vistaActual === 'Ajustes') return <AjustesScreen />;
  if (vistaActual === 'ReporteProblema') return <ReporteProblemaScreen />;
  if (vistaActual === 'BajaVehiculo') return <BajaVehiculoScreen setVistaActual={setVistaActual} />;
  if (vistaActual === 'EditarVehiculo') return <EditarVehiculoScreen setVistaActual={setVistaActual} />;

  const pantallas = [
    { t: 'Baja de Vehículo', r: 'BajaVehiculo' },
    { t: 'Editar Vehículo', r: 'EditarVehiculo' },
    { t: 'Inicio', r: 'Inicio' },
    { t: 'Login', r: 'Login' },
    { t: 'Registrar Usuario', r: 'Registro' },
    { t: 'Restablecer Contraseña', r: 'RestablecerContrasena' },
    { t: 'Menú', r: 'Menu' },
    { t: 'Credencial', r: 'Credencial' },
    { t: 'Notificaciones', r: 'Notificaciones' },
    { t: 'Historial', r: 'Historial' },
    { t: 'Mis Vehículos', r: 'MisVehiculos' },
    { t: 'Agregar Vehículo', r: 'AgregarVehiculo' },
    { t: 'Acceso Provisional', r: 'AccesoProvisional' },
    { t: 'Editar Perfil', r: 'EditarPerfil' },
    { t: 'Perfil', r: 'Perfil' },
    { t: 'Ajustes', r: 'Ajustes' },
    { t: 'Ayuda y Soporte', r: 'ReporteProblema' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <StatusBar hidden={true} />
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.headerTitle}>Control de Acceso</Text>
      <View style={styles.separator} />

      {pantallas.map((item, i) => (
        <TouchableOpacity key={i} style={styles.button} onPress={() => setVistaActual(item.r)}>
          <Text style={styles.buttonText}>{item.t}</Text>
        </TouchableOpacity>
      ))}
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1877F2' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 20 },
  
  logo: {
    width: 180, 
    height: 180,
    alignSelf: 'center',
    marginBottom: -20,
  },
  
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 10 },
  separator: { height: 1, backgroundColor: '#000', width: '60%', alignSelf: 'center', marginBottom: 20 },
  button: { paddingVertical: 14, alignItems: 'center' },
  buttonText: { fontSize: 18, color: '#000', fontWeight: '500', textAlign: 'center' },
});