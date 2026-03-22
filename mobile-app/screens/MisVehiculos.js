import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function MisVehiculos({ navigation }) {
  const [vehiculos, setVehiculos] = useState([]);

  // Usando API_URL de config.js

  const fetchVehiculos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const data = await response.json();
      console.log("TOKEN:", token);
      console.log("VEHÍCULOS:", data);
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
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer " + token
        }
      });

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
        <Text style={styles.cardText}>Placa: {item.placa}</Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.badgeActivo}>
            <Text style={styles.badgeTextActivo}>Activo</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditarVehiculo', { vehiculo: item })}
              style={styles.editButton}
            >
              <Text style={styles.editText}>Editar</Text>
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
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>❮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MIS VEHÍCULOS</Text>
        <View style={{ width: 30 }} />
      </View>

      
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
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  editText: { color: '#E5A900', fontWeight: 'bold', fontSize: 14 },
  deleteText: { color: '#C83232', fontWeight: 'bold', fontSize: 14 },
  bottomButtons: { paddingHorizontal: 20, paddingBottom: 30 },
  primaryButton: { backgroundColor: '#005696', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});