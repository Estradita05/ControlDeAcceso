import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EditarPerfil({ setScreen }) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7FA2C9" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('profile')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR PERFIL</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.avatarCircle}>
          <Icon name="person" size={60} color="#000" />
        </View>
        <Text style={styles.changePhoto}>Cambiar foto de perfil</Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          placeholder="Usuario Ejemplo"
          placeholderTextColor="#8c8c8c"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="Usuario.ejemplo@gmail.com"
          placeholderTextColor="#8c8c8c"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Cambiar contraseña</Text>

        <Text style={styles.label}>Contraseña Actual</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={passwordActual}
          onChangeText={setPasswordActual}
        />

        <Text style={styles.label}>Nueva Contraseña</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={passwordNueva}
          onChangeText={setPasswordNueva}
        />

        <Text style={styles.label}>Confirmar Contraseña Nueva</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE7EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7FA2C9',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1B3B5F',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhoto: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  form: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#E5E5E5',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    elevation: 4,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#000',
    marginVertical: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    marginTop: 25,
    backgroundColor: '#0D4D73',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});