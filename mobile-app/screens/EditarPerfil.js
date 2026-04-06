import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import * as ImagePicker from 'expo-image-picker';

export default function EditarPerfil({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const seleccionarImagen = () => {
    Alert.alert(
      "Foto de perfil",
      "Elige una opción",
      [
        { text: "Cámara", onPress: tomarFoto },
        { text: "Galería", onPress: escogerGaleria },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const tomarFoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requieren permisos de cámara para continuar");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });
    if (!result.canceled) {
      setFotoPerfil(result.assets[0].base64);
    }
  };

  const escogerGaleria = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se requieren permisos de galería para continuar");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });
    if (!result.canceled) {
      setFotoPerfil(result.assets[0].base64);
    }
  };

  const handleSave = async () => {

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    if (correo) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.mx$/i;
      if (!emailRegex.test(correo)) {
        alert("El correo debe ser institucional (ej. usuario@institucion.edu.mx)");
        return;
      }
    }

    if (passwordNueva) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%\^&*_\-\+=]).+$/;
      if (!passwordRegex.test(passwordNueva)) {
        alert("La contraseña debe incluir al menos una mayúscula y un carácter especial (ej. *, _)");
        return;
      }
      if (passwordNueva !== confirmarPassword) {
        alert("Las nuevas contraseñas no coinciden");
        return;
      }
    }

    const payload = {
      nombre: nombre,
    };

    if (correo) {
      payload.email = correo;
    }

    if (passwordNueva) {
      payload.password = passwordNueva;
    }

    if (fotoPerfil) {
      payload.foto_perfil = fotoPerfil;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/usuarios/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (correo) {
          Alert.alert("Éxito", "Cambios guardados. Por favor inicia sesión nuevamente con tu nuevo correo.");
          await AsyncStorage.removeItem("token");
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } else {
          Alert.alert("Éxito", "Cambios guardados exitosamente");
          navigation.goBack();
        }
      } else {
        alert(data.detail || "Error al actualizar");
      }

    } catch (error) {
      console.log("Error:", error);
      alert("Error de conexión al servidor");
    }
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
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>EDITAR PERFIL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.avatarCircle} onPress={seleccionarImagen}>
            {fotoPerfil ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${fotoPerfil}` }} 
                style={{ width: 100, height: 100, borderRadius: 50 }} 
              />
            ) : (
              <Icon name="person" size={60} color="#fff" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={seleccionarImagen}>
            <Text style={styles.changePhoto}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder="Usuario Ejemplo"
            placeholderTextColor="#7A9EB1"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="Usuario.ejemplo@gmail.com"
            placeholderTextColor="#7A9EB1"
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Cambiar contraseña</Text>

          <Text style={styles.label}>Contraseña Actual</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={passwordActual}
            onChangeText={setPasswordActual}
          />

          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={passwordNueva}
            onChangeText={setPasswordNueva}
          />

          <Text style={styles.label}>Confirmar Contraseña Nueva</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={confirmarPassword}
            onChangeText={setConfirmarPassword}
          />

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' 
  },
  logoContainer: { 
    alignItems: 'center', 
    paddingTop: 30, 
    paddingBottom: 15, 
    backgroundColor: '#F0F6FA' 
  },
  logo: { 
    width: 120, 
    height: 120 
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
    marginBottom: 5,
  },
  backButton: { 
    padding: 5 
  },
  backArrow: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  titleText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#004C8C' 
  },
  imageContainer: { 
    alignItems: 'center', 
    marginTop: 20 
  },
  avatarCircle: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  changePhoto: { 
    marginTop: 12, 
    fontWeight: '700', 
    fontSize: 15, 
    color: '#004C8C', 
    textDecorationLine: 'underline' 
  },
  form: { 
    paddingHorizontal: 30, 
    marginTop: 10 
  },
  label: { 
    marginTop: 15, 
    fontWeight: '700', 
    fontSize: 14, 
    color: '#004C8C' 
  },
  input: {
    backgroundColor: '#EAF3F8', borderRadius: 15,
    paddingHorizontal: 15, paddingVertical: 12,
    marginTop: 5, fontSize: 14, color: '#333',
    elevation: 3, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  divider: { 
    height: 1.5, 
    backgroundColor: '#86ABC8', 
    marginVertical: 25, 
    opacity: 0.5 
  },
  sectionTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#004C8C', 
    marginBottom: 5 
  },
  primaryButton: {
    marginTop: 35, 
    backgroundColor: '#0054A3',
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 },
});