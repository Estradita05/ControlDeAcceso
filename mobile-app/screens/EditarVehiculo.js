import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image, SafeAreaView } from 'react-native';

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
    
    navigation.goBack();
  };

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
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>EDITAR VEHÍCULO</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Placa de vehículo</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Tipo de acceso</Text>
        <TextInput
          style={styles.input}
          value={tipoAcceso}
          onChangeText={setTipoAcceso}
          placeholder="Permanente / Suspendido"
          placeholderTextColor="#7A9EB1"
        />

        <Text style={styles.label}>Fechas de vigencia</Text>
        <TextInput
          style={styles.input}
          value={vigencia}
          onChangeText={setVigencia}
          placeholder="Solo si es provisional"
          placeholderTextColor="#7A9EB1"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleGuardarCambios}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
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
    fontSize: 18,
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
  primaryButton: {
    backgroundColor: '#0054A3',
    marginTop: 35,
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
    fontWeight: 'bold'
  }
});