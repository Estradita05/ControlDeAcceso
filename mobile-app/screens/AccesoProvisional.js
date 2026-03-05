import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

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

    setMatricula('');
    setPlacas('');
    setMotivo('');
    setFechaInicio('');
    setFechaFin('');
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlacas('');
    setMotivo('');
    setFechaInicio('');
    setFechaFin('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6edf2" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Acceso Provisional</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar solicitud</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6edf2'
  },
  header: {
    backgroundColor: '#7fa2c4',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b3d63'
  },
  formContainer: {
    padding: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 15,
    color: '#333'
  },
  input: {
    backgroundColor: '#dbe6ef',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  statusBadge: {
    backgroundColor: '#f2c94c',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusText: {
    fontWeight: 'bold',
    color: '#7a5c00'
  },
  cancelText: {
    color: '#3d7fb5',
    fontSize: 14
  },
  button: {
    backgroundColor: '#0b5e8e',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
