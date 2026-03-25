import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function Login({ navigation }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log ("DATA:", data);

       if (response.ok) {
        await AsyncStorage.setItem("token", data.access_token);

        console.log("TOKEN GUARDADO");

        navigation.navigate('Inicio'); 
      } else {
        Alert.alert("Error", data.detail || "Credenciales incorrectas");
      }

    } catch (error) {
      console.log("ERROR GENERAL:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerBanner}>
          <Text style={styles.headerText}>INICIAR SESIÓN</Text>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.instructionText}>Ingresa tus datos</Text>

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ejemplo@edu.mx" 
            placeholderTextColor="#A9C1D1"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            placeholderTextColor="#A9C1D1"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword} 
          />

          <TouchableOpacity onPress={() => navigation.navigate('RecuperarContrasena')}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
             onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerContainer}
            onPress={() => navigation.navigate('Registro')}
          >
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' 
  }, 
  scrollContainer: { 
    flexGrow: 1, 
    alignItems: 'center', 
    paddingTop: 60 
  },
  logo: { 
    width: 120, 
    height: 120, 
    marginBottom: 30 
  },
  headerBanner: { 
    backgroundColor: '#86ABC8', 
    width: '100%', 
    paddingVertical: 15, 
    alignItems: 'center',
    marginBottom: 20 
  },
  headerText: { 
    color: '#003B7C', 
    fontWeight: 'bold', 
    fontSize: 20, 
    letterSpacing: 1 
  },
  formContent: { 
    width: '100%', 
    paddingHorizontal: 35 
  },
  instructionText: { 
    color: '#6B8EAD', 
    textAlign: 'center', 
    marginBottom: 25, 
    fontSize: 16 
  },
  label: { 
    color: '#003B7C', 
    fontWeight: 'bold', 
    marginBottom: 8, 
    fontSize: 14 
  },
  input: { 
    backgroundColor: '#E9F1F7', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1E1EB'
  },
  forgotPassword: { 
    color: '#005696', 
    textAlign: 'right', 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textDecorationLine: 'underline' 
  },
  button: { 
    backgroundColor: '#005696', 
    padding: 18, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  registerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 25, 
    marginBottom: 20 
  },
  registerText: { 
    color: '#6B8EAD', 
    fontSize: 15 },
  registerLink: { 
    color: '#005696', 
    fontWeight: 'bold', 
    fontSize: 15, 
    textDecorationLine: 'underline' 
  }
});