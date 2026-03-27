import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';

export default function AccesoProvisionalScreen({ navigation }) { 
  const [matricula, setMatricula] = useState('');
  const [placas, setPlacas] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleEnviar = async () => {
    if (!matricula || !placas || !motivo || !fechaInicio || !fechaFin) {
      alert("Completa todos los campos");
      return;
    }

    const solicitud = {
      matricula,
      placas,
      motivo,
      fechaInicio,
      fechaFin
    };

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/accesos/provisional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(solicitud)
      });

      if (response.ok) {
        alert('Solicitud enviada correctamente');
        navigation.navigate('Menu');
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Error al enviar la solicitud');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlacas('');
    setMotivo('');
    setFechaInicio('');
    setFechaFin('');
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

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
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>Acceso Provisional</Text>

        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
        />

        <Text style={styles.label}>Placas del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placas}
          onChangeText={setPlacas}
          placeholder="Ingresa las placas"
        />

        <Text style={styles.label}>Motivo del acceso</Text>
        <TextInput
          style={styles.input}
          value={motivo}
          onChangeText={setMotivo}
          placeholder="Escribe el motivo"
        />

        <Text style={styles.label}>Fecha de inicio</Text>
        <TextInput
          style={styles.input}
          value={fechaInicio}
          onChangeText={setFechaInicio}
          placeholder="DD/MM/AAAA"
        />

        <Text style={styles.label}>Fecha de fin</Text>
        <TextInput
          style={styles.input}
          value={fechaFin}
          onChangeText={setFechaFin}
          placeholder="DD/MM/AAAA"
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
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
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
    marginTop: 15,
    color: '#004C8C',
  },
  input: {
    backgroundColor: '#EAF3F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  statusBadge: {
    backgroundColor: '#F7D667',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#3d7fb5',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#0054A3',
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});