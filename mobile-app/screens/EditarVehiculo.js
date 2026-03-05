import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarVehiculoScreen({ navigation }) {
  const [placa, setPlaca] = useState('QRO-4827');
  const [modelo, setModelo] = useState('Nissan');
  const [color, setColor] = useState('Azul');
  const [tipoAcceso, setTipoAcceso] = useState('Permanente');
  const [vigencia, setVigencia] = useState('');

  const handleGuardarCambios = () => {
    const vehiculoActualizado = { placa, modelo, color, tipoAcceso, vigencia };

    console.log('Vehículo actualizado:', vehiculoActualizado);
    alert('Cambios guardados correctamente');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e6edf2" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0b3d63" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR VEHICULO</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Placa de vehículo</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
        />

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
        />

        <Text style={styles.label}>Tipo de acceso</Text>
        <TextInput
          style={styles.input}
          value={tipoAcceso}
          onChangeText={setTipoAcceso}
          placeholder="Permanente / Suspendido"
        />

        <Text style={styles.label}>Fechas de vigencia</Text>
        <TextInput
          style={styles.input}
          value={vigencia}
          onChangeText={setVigencia}
          placeholder="Solo si es provisional"
        />

        <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7fa2c4',
    paddingVertical: 18,
    paddingHorizontal: 20,
    elevation: 4
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b3d63'
  },
  formContainer: {
    padding: 25
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 18,
    color: '#333'
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  button: {
    backgroundColor: '#0b5e8e',
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 25,
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