import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';

export default function AccesoProvisionalScreen() {
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleEnviar = () => {
    if (!matricula || !placas || !motivo || !fechaInicio || !fechaFin) {
      alert('Completa todos los campos');
      return;
    }

    const solicitud = {
      matricula,
      placas,
      motivo,
      fechaInicio,
      fechaFin,
      estado: 'Pendiente'
    };

    console.log('Solicitud enviada:', solicitud);
    alert('Solicitud enviada correctamente');

    handleCancelar();
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlacas('');
    setMotivo('');
    setFechaInicio('');
    setFechaFin('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ajuste de StatusBar para que combine con el fondo */}
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />

      {/* 1. SECCIÓN DEL LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 2. BARRA DE TÍTULO AZUL CON FLECHA */}
      <View style={styles.titleBar}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>ACCESO PROVISIONAL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      {/* 3. FORMULARIO DENTRO DE SCROLLVIEW */}
      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Placas del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
          placeholder="Ingresa las placas"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Motivo del acceso</Text>
        <TextInput
          style={styles.input}
          value={motivo}
          onChangeText={setMotivo}
          placeholder="Escribe el motivo"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Fecha de inicio</Text>
        <TextInput
          style={styles.input}
          value={fechaInicio}
          onChangeText={setFechaInicio}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Fecha de fin</Text>
        <TextInput
          style={styles.input}
          value={fechaFin}
          onChangeText={setFechaFin}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#7A9EB1"
        />

        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Pendiente</Text>
          </View>

          <TouchableOpacity onPress={handleCancelar}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar solicitud</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
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
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 15,
    color: '#004C8C',
  },
  input: {
    backgroundColor: '#EAF3F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  statusBadge: {
    backgroundColor: '#F7D667', // El mismo amarillo de tu pantalla de vehículos
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#966D00',
  },
  cancelText: {
    color: '#3d7fb5',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#0054A3',
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});