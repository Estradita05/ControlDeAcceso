import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function Registro({ navigation }) { 
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!nombre || !matricula || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos (incluyendo la matrícula)");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.mx$/i;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "El correo debe ser institucional (ej. usuario@institucion.edu.mx)");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%\^&*_\-\+=]).+$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "La contraseña debe incluir al menos una mayúscula y un carácter especial (ej. *, _)");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: matricula,
          nombre: nombre,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("¡Éxito!", "Usuario registrado correctamente. Ahora inicia sesión.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", data.detail || "No se pudo registrar el usuario");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Logo size="small" style={styles.logoContainer} />

      <Header title="REGISTRAR USUARIO" navigation={navigation} />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>

          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Alexis Hernández" 
            placeholderTextColor={COLORS.textSecondary}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Matrícula / ID</Text>
          <TextInput 
            style={styles.input} 
            placeholder="1240XXXXX" 
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric" 
            value={matricula}
            onChangeText={setMatricula}
          />

          <Text style={styles.label}>Correo Institucional</Text>
          <TextInput 
            style={styles.input} 
            placeholder="usuario@edu.mx" 
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
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

        </View>

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>Crear Cuenta</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: { 
    paddingTop: 30, 
    paddingBottom: 15 
  },
  scrollContent: { 
    paddingHorizontal: 25, 
    paddingTop: 20 
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 20, 
    elevation: 3,
    borderLeftWidth: 6, 
    borderLeftColor: COLORS.primary
  },
  label: { 
    color: COLORS.accent, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    marginTop: 10 
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    color: COLORS.text
  },
  registerButton: {
    backgroundColor: COLORS.primary, 
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 30, 
    alignItems: 'center',
  },
  registerText: { 
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});