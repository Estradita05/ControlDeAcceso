import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function MisVehiculos({ navigation }) {
  const [vehiculos, setVehiculos] = useState([]);

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

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmación de Baja",
      "¿Estás seguro de que deseas eliminar este vehículo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar eliminación", 
          onPress: () => procesarEliminacion(id),
          style: "destructive"
        }
      ]
    );
  };

  const procesarEliminacion = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/vehiculos/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Vehículo dado de baja correctamente');
        fetchVehiculos(); 
      } else {
        Alert.alert('Error', 'No se pudo eliminar el vehículo');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión al servidor');
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
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <Logo size="small" style={styles.logoContainer} />

      <Header title="MIS VEHÍCULOS" navigation={navigation} />

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
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: { 
    paddingTop: 30, 
    paddingBottom: 15 
  },
  listContainer: { 
    padding: 20 
  },
  emptyText: { 
    textAlign: 'center', 
    color: COLORS.textSecondary, 
    marginTop: 20 
  },
  card: { 
    backgroundColor: COLORS.cardBg, 
    borderRadius: 15, 
    flexDirection: 'row', 
    padding: 15, 
    marginBottom: 15, 
    borderLeftWidth: 6, 
    borderLeftColor: COLORS.primary,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  cardLeft: { 
    justifyContent: 'center', 
    marginRight: 15 
  },
  carIcon: { 
    fontSize: 40 
  },
  cardRight: { 
    flex: 1 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.accent, 
    marginBottom: 5 
  },
  cardText: { 
    fontSize: 13, 
    color: COLORS.text, 
    marginBottom: 2 
  },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },
  badgeActivo: { 
    backgroundColor: '#D5E8D4', 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 15 
  },
  badgeTextActivo: { 
    color: '#4B8A4B', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
  actionButtons: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15 
  },
  editText: { 
    color: '#E5A900', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  deleteText: { 
    color: COLORS.error, 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  bottomButtons: { 
    paddingHorizontal: 20, 
    paddingBottom: 30 
  },
  primaryButton: { 
    backgroundColor: COLORS.primary, 
    paddingVertical: 16, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  primaryButtonText: { 
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});