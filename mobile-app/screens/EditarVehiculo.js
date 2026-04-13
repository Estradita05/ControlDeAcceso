import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ScrollView, SafeAreaView, StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function EditarVehiculo({ route, navigation }) {
  const { COLORS, isDark } = useTheme();
  const { vehiculo } = route.params;

  const [placas, setPlacas] = useState(vehiculo.placa);
  const [modelo, setModelo] = useState(vehiculo.modelo);
  const [color, setColor] = useState(vehiculo.color);

  const handleActualizar = async () => {
    if (!placas || !modelo || !color) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos/${vehiculo.id}`, {
        method: 'PUT', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ placa: placas, modelo, color })
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Vehículo actualizado correctamente');
        navigation.goBack(); 
      } else {
        Alert.alert('Error', 'No se pudo actualizar en el servidor');
      }
    } catch (error) {
      Alert.alert('Error', 'Fallo de conexión con el servidor');
    }
  };

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      
      <Logo size="small" style={st.logoContainer} />

      <Header title="EDITAR VEHÍCULO" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.formContainer}>
        
        <Text style={st.label}>Placa del vehículo</Text>
        <TextInput 
          style={st.input} 
          value={placas} 
          onChangeText={setPlacas} 
          placeholder="Ej: ABC-1234"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Marca / Modelo</Text>
        <TextInput 
          style={st.input} 
          value={modelo} 
          onChangeText={setModelo} 
          placeholder="Ej: Nissan Sentra"
          placeholderTextColor={COLORS.textSecondary}
        />

        <Text style={st.label}>Color</Text>
        <TextInput 
          style={st.input} 
          value={color} 
          onChangeText={setColor} 
          placeholder="Ej: Rojo"
          placeholderTextColor={COLORS.textSecondary}
        />

        <View style={st.buttonSpacer} />

        <TouchableOpacity style={st.primaryButton} onPress={handleActualizar}>
          <Text style={st.primaryButtonText}>Actualizar vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={st.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={st.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: { 
    paddingTop: 30, 
    paddingBottom: 15 
  },
  formContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 40 
  },
  label: { 
    color: COLORS.accent, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    marginLeft: 5, 
    fontSize: 15 
  },
  input: { 
    backgroundColor: COLORS.cardBg, 
    paddingVertical: 14,
    paddingHorizontal: 20, 
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  buttonSpacer: {
    height: 20,
  },
  primaryButton: { 
    backgroundColor: COLORS.primary, 
    paddingVertical: 16,
    borderRadius: 30, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginBottom: 15,
  }, 
  primaryButtonText: { 
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  secondaryButton: { 
    alignItems: 'center', 
    paddingVertical: 10,
  },
  secondaryButtonText: { 
    color: COLORS.textSecondary, 
    fontWeight: 'bold', 
    fontSize: 15 
  },
});