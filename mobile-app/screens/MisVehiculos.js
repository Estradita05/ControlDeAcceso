import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

export default function MisVehiculos({ navigation }) {
  const { COLORS, isDark } = useTheme();
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

  const st = makeStyles(COLORS);

  const renderItem = ({ item, index }) => (
    <View style={st.card}>
      <View style={st.cardLeft}>
        <Text style={st.carIcon}>🚗</Text>
      </View>
      
      <View style={st.cardRight}>
        <Text style={st.cardTitle}>Vehículo {index + 1}</Text>
        <Text style={st.cardText}>Marca / Modelo: {item.modelo}</Text>
        <Text style={st.cardText}>Color: {item.color}</Text>
        <Text style={st.cardText}>Placa: {item.placa}</Text>
        
        <View style={st.cardFooter}>
          <View style={st.badgeActivo}>
            <Text style={st.badgeTextActivo}>Activo</Text>
          </View>
          
          <View style={st.actionButtons}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditarVehiculo', { vehiculo: item })}
              style={st.editButton}
            >
              <Text style={st.editText}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleEliminar(item.id)}>
              <Text style={st.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      <Header title="Mis Vehículos" navigation={navigation} />

      <FlatList 
        data={vehiculos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={st.listContainer}
        ListEmptyComponent={<Text style={st.emptyText}>No hay vehículos registrados</Text>}
      />

      {/* Botones Inferiores */}
      <View style={st.bottomButtons}>
        <TouchableOpacity style={st.primaryButton} onPress={() => navigation.navigate('AgregarVehiculo')}>
          <Text style={st.primaryButtonText}>+ Agregar vehículo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[st.primaryButton, { backgroundColor: '#B45309' }]}
          onPress={() => navigation.navigate('SolicitudAcceso')}
        >
          <Text style={st.primaryButtonText}>Solicitar acceso provisional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={st.secondaryButton}
          onPress={() => navigation.navigate('MisSolicitudes')}
        >
          <Text style={st.secondaryButtonText}>Ver mis solicitudes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
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
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});