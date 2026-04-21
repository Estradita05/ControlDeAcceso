import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import * as ImagePicker from 'expo-image-picker';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function EditarPerfil({ navigation }) {
  const { COLORS, isDark } = useTheme();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [carrera, setCarrera] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/auth/perfil`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setNombre(data.usuario.nombre || '');
          setCorreo(data.usuario.email || '');
          setCarrera(data.usuario.carrera || '');
          setMatricula(data.usuario.matricula || '');
          setFotoPerfil(data.usuario.foto_perfil || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

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
      Alert.alert("Error", "Se requieren permisos de cámara para continuar");
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
      Alert.alert("Error", "Se requieren permisos de galería para continuar");
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
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }

    if (correo) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.mx$/i;
      if (!emailRegex.test(correo)) {
        Alert.alert("Error", "El correo debe ser institucional (ej. usuario@institucion.edu.mx)");
        return;
      }
    }

    if (passwordNueva) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%\^&*_\-\+=]).+$/;
      if (!passwordRegex.test(passwordNueva)) {
        Alert.alert("Error", "La contraseña debe incluir al menos una mayúscula y un carácter especial (ej. *, _)");
        return;
      }
      if (passwordNueva !== confirmarPassword) {
        Alert.alert("Error", "Las nuevas contraseñas no coinciden");
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

    if (carrera) {
      payload.carrera = carrera;
    }

    if (matricula) {
      payload.matricula = matricula;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/auth/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (correo || passwordNueva) {
          const message = correo 
            ? "Cambios guardados. Por favor inicia sesión nuevamente con tu nuevo correo."
            : "Contraseña actualizada. Por favor inicia sesión nuevamente.";
          
          Alert.alert("Seguridad", message);
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
        Alert.alert("Error", data.detail || "Error al actualizar");
      }
    } catch (error) {
      Alert.alert("Error", "Error de conexión al servidor");
    }
  };

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Logo size="small" style={st.logoContainer} />
      <Header title="EDITAR PERFIL" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={st.imageContainer}>
          <TouchableOpacity style={st.avatarCircle} onPress={seleccionarImagen}>
            {fotoPerfil ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${fotoPerfil}` }} 
                style={{ width: 100, height: 100, borderRadius: 50 }} 
              />
            ) : (
              <Ionicons name="person" size={60} color={COLORS.white} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={seleccionarImagen}>
            <Text style={st.changePhoto}>Cambiar foto de perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={st.form}>
          <Text style={st.label}>Nombre</Text>
          <TextInput
            placeholder="Usuario Ejemplo"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={st.label}>Correo electrónico</Text>
          <TextInput
            placeholder="Usuario.ejemplo@gmail.com"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={st.label}>Carrera</Text>
          <TextInput
            placeholder="Ej. Ing. en Tecnologías de la Información"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={carrera}
            onChangeText={setCarrera}
          />

          <Text style={st.label}>Matrícula / ID</Text>
          <TextInput
            placeholder="Ej. 124050XXX"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={matricula}
            onChangeText={setMatricula}
            keyboardType="default"
          />

          <View style={st.divider} />

          <Text style={st.sectionTitle}>Cambiar contraseña</Text>

          <Text style={st.label}>Contraseña Actual</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="********"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={passwordActual}
            onChangeText={setPasswordActual}
          />

          <Text style={st.label}>Nueva Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="********"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={passwordNueva}
            onChangeText={setPasswordNueva}
          />

          <Text style={st.label}>Confirmar Contraseña Nueva</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="********"
            placeholderTextColor={COLORS.textSecondary}
            style={st.input}
            value={confirmarPassword}
            onChangeText={setConfirmarPassword}
          />

          <TouchableOpacity style={st.primaryButton} onPress={handleSave}>
            <Text style={st.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  logoContainer: { paddingTop: 30, paddingBottom: 15 },
  imageContainer: { alignItems: 'center', marginTop: 20 },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.accent, 
    justifyContent: 'center', alignItems: 'center', 
    elevation: 5, ...SHADOWS.sm,
  },
  changePhoto: { 
    marginTop: 12, fontWeight: '700', fontSize: 15, 
    color: COLORS.accent, textDecorationLine: 'underline' 
  },
  form: { paddingHorizontal: 30, marginTop: 10 },
  label: { marginTop: 15, fontWeight: '700', fontSize: 14, color: COLORS.accent },
  input: {
    backgroundColor: COLORS.cardBg, borderRadius: 15,
    paddingHorizontal: 15, paddingVertical: 12,
    marginTop: 5, fontSize: 14, color: COLORS.text,
    elevation: 3, ...SHADOWS.sm,
    borderWidth: 1, borderColor: COLORS.border,
  },
  divider: { 
    height: 1.5, backgroundColor: COLORS.border, 
    marginVertical: 25, opacity: 0.5 
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, color: COLORS.accent, marginBottom: 5 },
  primaryButton: {
    marginTop: 35, backgroundColor: COLORS.primary,
    padding: 15, borderRadius: 12, alignItems: 'center',
    elevation: 5, ...SHADOWS.md,
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});