import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>INICIAR SESIÓN</Text>
      </View>

      <Text style={styles.subtitle}>Ingresa tus datos</Text>

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3EEF6',
    paddingHorizontal: 30,
    paddingTop: 60,
  },

  logo: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginBottom: -15,
  },

  headerBar: {
    backgroundColor: '#7FA6C9',
    paddingVertical: 12,
    marginHorizontal: -30,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4D8C',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: '#3A3A3A',
  },

  label: {
    marginBottom: 15,
    fontSize: 14,
    color: '#1b1a1a',
  },

  input: {
    backgroundColor: '#8FB3D9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  link: {
    color: '#0A4D8C',
    textAlign: 'right',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#0A4D8C',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});