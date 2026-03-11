import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';


const HistorialAccesos = ({ navigation }) => { 
  const [accesos, setAccesos] = useState([]);

  useEffect(() => {

  const obtenerAccesos = async () => {

    try {

      const response = await fetch("http://192.168.0.143:5000/accesos");
      const data = await response.json();

      const accesosFormateados = data.map((item, index) => ({
        id: index.toString(),
        tipo: item.tipo_movimiento,
        fecha: "Hoy",
        hora: "",
        estado: "Permitido",
        color: item.tipo_movimiento === "entrada" ? "green" : "red"
      }));

      setAccesos(accesosFormateados);

    } catch (error) {

      console.log("Error:", error);

    }

  };

  obtenerAccesos();

}, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.iconContainer}>
        <Text style={[styles.iconArrow, { color: item.color === 'green' ? '#1D8348' : '#C0392B' }]}>
          {item.color === 'green' ? '➡]' : '➡['}
        </Text>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.typeText}>{item.tipo}</Text>
        <Text style={styles.dateTimeText}>
          {item.fecha}    {item.hora}
        </Text>
      </View>
      
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.estado}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} /> 
      </View>
      
      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>HISTORIAL DE ACCESOS</Text>
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={accesos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArrow: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: -2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  typeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  dateTimeText: {
    fontSize: 14,
    color: '#296A91',
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: '#D1E6C9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: '#558249',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HistorialAccesos;