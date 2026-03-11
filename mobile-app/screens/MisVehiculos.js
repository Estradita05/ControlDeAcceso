import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

const MisVehiculos = ({ navigation }) => {

  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {

    const obtenerVehiculos = async () => {

      try {

        const response = await fetch("http://192.168.0.143:5000/vehiculos");
        const data = await response.json();

        setVehiculos(data);

      } catch (error) {

        console.log("Error obteniendo vehículos:", error);

      }

    };

    obtenerVehiculos();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      
      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>MIS VEHÍCULOS</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {vehiculos.map((vehiculo, index) => (

          <View key={index} style={styles.card}>

            <View style={styles.cardLeftBorder} />

            <View style={styles.cardContent}>

              <View style={styles.cardBody}>

                <View style={styles.iconContainer}>
                  <Text style={styles.carIcon}>🚘</Text>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.vehicleTitle}>Vehículo</Text>
                  <Text style={styles.vehicleDetail}>Marca / Modelo: {vehiculo.modelo}</Text>
                  <Text style={styles.vehicleDetail}>Placa: {vehiculo.placa}</Text>
                </View>

              </View>

              <View style={styles.cardFooter}>

                <View style={[styles.badge, styles.badgeActivo]}>
                  <Text style={styles.badgeActivoText}>Activo</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('EditarVehiculo')}>
                  <Text style={styles.linkText}>Ver detalles</Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>

        ))}

        <View style={styles.buttonsContainer}>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AgregarVehiculo')}
          >
            <Text style={styles.buttonText}>Agregar vehículo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AccesoProvisional')}
          >
            <Text style={styles.buttonText}>
              Solicitar acceso{'\n'}provisional
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default MisVehiculos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FA',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#F0F6FA',
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86ABC8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#EAF3F8',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  cardLeftBorder: {
    width: 10,
    backgroundColor: '#0054A3',
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardBody: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  carIcon: {
    fontSize: 40,
  },
  infoContainer: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  vehicleDetail: {
    fontSize: 13,
    color: '#296A91',
    marginBottom: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeActivo: {
    backgroundColor: '#D1E6C9',
  },
  badgeActivoText: {
    color: '#558249',
    fontWeight: 'bold',
    fontSize: 14,
  },
  linkText: {
    color: '#002C4E',
    fontWeight: '800',
    fontSize: 14,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#0054A3',
    width: '70%',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
