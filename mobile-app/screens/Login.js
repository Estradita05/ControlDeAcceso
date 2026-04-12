import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';

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

      const data = await response.json();

       if (response.ok) {
        await AsyncStorage.setItem("token", data.access_token);
        navigation.navigate('Inicio'); 
      } else {
        Alert.alert("Error", data.detail || "Credenciales incorrectas");
      }

    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo size="medium" style={styles.logo} />

        <View style={styles.headerBanner}>
          <Text style={styles.headerText}>INICIAR SESIÓN</Text>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.instructionText}>Ingresa tus datos institucional</Text>

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ejemplo@edu.mx" 
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            placeholderTextColor={COLORS.textSecondary}
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
    backgroundColor: COLORS.background 
  }, 
  scrollContainer: { 
    flexGrow: 1, 
    alignItems: 'center', 
    paddingTop: 60 
  },
  logo: { 
    marginBottom: 30 
  },
  headerBanner: { 
    backgroundColor: COLORS.secondary, 
    width: '100%', 
    paddingVertical: 15, 
    alignItems: 'center',
    marginBottom: 20 
  },
  headerText: { 
    color: COLORS.accent, 
    fontWeight: 'bold', 
    fontSize: 20, 
    letterSpacing: 1 
  },
  formContent: { 
    width: '100%', 
    paddingHorizontal: 35 
  },
  instructionText: { 
    color: COLORS.textSecondary, 
    textAlign: 'center', 
    marginBottom: 25, 
    fontSize: 16 
  },
  label: { 
    color: COLORS.accent, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    fontSize: 14 
  },
  input: { 
    backgroundColor: COLORS.inputBg, 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder
  },
  forgotPassword: { 
    color: COLORS.primary, 
    textAlign: 'right', 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textDecorationLine: 'underline' 
  },
  button: { 
    backgroundColor: COLORS.primary, 
    padding: 18, 
    borderRadius: 30, 
    alignItems: 'center',
  },
  buttonText: { 
    color: COLORS.white, 
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
    color: COLORS.textSecondary, 
    fontSize: 15 
  },
  registerLink: { 
    color: COLORS.primary, 
    fontWeight: 'bold', 
    fontSize: 15, 
    textDecorationLine: 'underline' 
  }
});