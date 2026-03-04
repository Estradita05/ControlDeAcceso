import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function AgregarVehiculoScreen() {
  const [matricula, setMatricula] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [tipoAcceso, setTipoAcceso] = useState('');

  const handleGuardar = () => {
    if (!matricula || !placa || !marca || !color || !tipoAcceso) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoVehiculo = { matricula, placa, marca, color, tipoAcceso
    };

    console.log('Vehículo guardado:', nuevoVehiculo);
    alert('Vehículo guardado correctamente');

    setMatricula('');
    setPlaca('');
    setMarca('');
    setColor('');
    setTipoAcceso('');
  };

  const handleCancelar = () => {
    setMatricula('');
    setPlaca('');
    setMarca('');
    setColor('');
    setTipoAcceso('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6edf2" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agregar Vehículos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Matrícula del usuario</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ingresa la matrícula"
        />

        <Text style={styles.label}>Placa del vehículo</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          placeholder="Ingresa la placa"
        />

        <Text style={styles.label}>Marca</Text>
        <TextInput
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
          placeholder="Ingresa la marca"
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Ingresa el color"
        />

        <Text style={styles.label}>Tipo de acceso</Text>
        <TextInput
          style={styles.input}
          value={tipoAcceso}
          onChangeText={setTipoAcceso}
          placeholder="Ej. Residente / Visitante"
        />

        <TouchableOpacity onPress={handleCancelar}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar vehículo</Text>
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
  cancelText: {
    textAlign: 'right',
    marginTop: 20,
    color: '#3d7fb5',
    fontSize: 14
  },
  button: {
    backgroundColor: '#0b5e8e',
    marginTop: 15,
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
