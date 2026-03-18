import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, FlatList, 
  Alert, Image, SafeAreaView 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function MisVehiculos({ navigation }) {
  const [vehiculos, setVehiculos] = useState([]);

  // Tu IP conectada a Docker (Intacta)
  const API_URL = 'http://10.16.35.204:8000/vehiculos';

  const fetchVehiculos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setVehiculos(data);
    } catch (error) {
      console.log('Error fetch:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchVehiculos();
    }, [])
  );

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        Alert.alert('Eliminado', 'Vehículo dado de baja');
        fetchVehiculos(); 
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.carIcon}>🚗</Text>
      </View>
      
      <View style={styles.cardRight}>
        <Text style={styles.cardTitle}>Vehículo {index + 1}</Text>
        <Text style={styles.cardText}>Marca / Modelo: {item.modelo}</Text>
        <Text style={styles.cardText}>Color: {item.color}</Text>
        <Text style={styles.cardText}>Placa: {item.placas}</Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.badgeActivo}>
            <Text style={styles.badgeTextActivo}>Activo</Text>
          </View>
          
          {/* Fila de acciones: Editar y Eliminar */}
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditarVehiculo', { vehiculo: item })}>
              <Text style={{ color: '#E5A900', fontWeight: 'bold', fontSize: 14 }}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>MIS VEHÍCULOS</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Lista de Tarjetas */}
      <FlatList 
        data={vehiculos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay vehículos registrados</Text>}
      />

      {/* Botones Inferiores */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AgregarVehiculo')}>
          <Text style={styles.primaryButtonText}>Agregar vehículo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('AccesoProvisional')}
        >
          <Text style={styles.primaryButtonText}>Solicitar acceso provisional</Text>
        </TouchableOpacity>
      </View>
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
  listContainer: { padding: 20 },
  emptyText: { textAlign: 'center', color: '#6B8EAD', marginTop: 20 },
  card: { backgroundColor: '#EAF3F8', borderRadius: 15, flexDirection: 'row', padding: 15, marginBottom: 15, borderLeftWidth: 6, borderLeftColor: '#005696' },
  cardLeft: { justifyContent: 'center', marginRight: 15 },
  carIcon: { fontSize: 40 },
  cardRight: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  cardText: { fontSize: 13, color: '#005696', marginBottom: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  badgeActivo: { backgroundColor: '#D5E8D4', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15 },
  badgeTextActivo: { color: '#4B8A4B', fontWeight: 'bold', fontSize: 12 },
  deleteText: { color: '#C83232', fontWeight: 'bold', fontSize: 14 },
  bottomButtons: { paddingHorizontal: 20, paddingBottom: 30 },
  primaryButton: { backgroundColor: '#005696', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});