import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EditarPerfil({ setScreen}) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR PERFIL</Text>
      </View>

      
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/icon.png')} // Imagen local
          style={styles.profileImage}
        />
        <Text style={styles.changePhoto}>Cambiar foto de perfil</Text>
      </View>

      
      <View style={styles.form}>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          placeholder="Usuario Ejemplo"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          placeholder="usuario.ejemplo@gmail.com"
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe7ec',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7fa8c9',
    padding: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1b3b5f',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  changePhoto: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1b5e9a',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});