import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, Image, ScrollView, SafeAreaView 
} from 'react-native';

export default function EditarVehiculo({ route, navigation }) {
  // 1. Recibimos los datos exactos del vehículo que elegiste en la pantalla anterior
  const { vehiculo } = route.params;

  // 2. Llenamos los inputs automáticamente con esa información
  const [placas, setPlacas] = useState(vehiculo.placas);
  const [modelo, setModelo] = useState(vehiculo.modelo);
  const [color, setColor] = useState(vehiculo.color);

  // 3. Apuntamos a la IP apuntando al ID específico del vehículo
  const API_URL = `http://10.16.35.204:8000/vehiculos/${vehiculo.id}`;

  const handleActualizar = async () => {
    if (!placas || !modelo || !color) {
      Alert.alert('Error', 'No puedes dejar campos vacíos');
      return;
    }

    try {
      // Usamos el método PUT que creamos en FastAPI
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placas, modelo, color })
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Vehículo actualizado correctamente');
        navigation.goBack(); // Te regresa a la lista automáticamente
      } else {
        Alert.alert('Error', 'No se pudo actualizar en el servidor');
      }
    } catch (error) {
      Alert.alert('Error', 'Fallo de conexión con Docker');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logotipo Superior */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Franja de Título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>❮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDITAR VEHÍCULO</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        
        <Text style={styles.label}>Placa del vehículo</Text>
        <TextInput style={styles.input} value={placas} onChangeText={setPlacas} />

        <Text style={styles.label}>Marca</Text>
        <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

        <Text style={styles.label}>Color</Text>
        <TextInput style={styles.input} value={color} onChangeText={setColor} />

        <TouchableOpacity style={styles.cancelarButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelarText}>Cancelar</Text>
        </TouchableOpacity>

        {/* Botón en tono contrastante para diferenciarlo del de "Agregar" */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleActualizar}>
          <Text style={styles.primaryButtonText}>Actualizar vehículo</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F6FA' },
  logoContainer: { alignItems: 'center', paddingVertical: 15 },
  logo: { width: 80, height: 80 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#86ABC8', paddingVertical: 12, paddingHorizontal: 15 },
  backButton: { padding: 5 },
  backIcon: { fontSize: 22, fontWeight: 'bold', color: '#003B7C' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003B7C' },
  formContainer: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 40 },
  label: { color: '#003B7C', fontWeight: 'bold', marginBottom: 5, marginLeft: 5, fontSize: 15 },
  input: { backgroundColor: '#EAF3F8', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 30, marginBottom: 15 },
  cancelarButton: { alignItems: 'flex-end', marginBottom: 15, marginRight: 10 },
  cancelarText: { color: '#005696', fontWeight: 'bold', fontSize: 15 },
  primaryButton: { backgroundColor: '#E5A900', paddingVertical: 16, borderRadius: 30, alignItems: 'center' }, // Color mostaza/dorado para la acción de editar
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});