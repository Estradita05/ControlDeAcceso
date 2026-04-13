import React, { useEffect, useState } from 'react';
import {StyleSheet,Text,View,SafeAreaView,FlatList,TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { FONTS, SIZES } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

const HistorialAccesos = ({ navigation }) => { 
  const { COLORS, isDark } = useTheme();
  const [accesos, setAccesos] = useState([]);

  useEffect(() => {
    const obtenerAccesos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_URL}/accesos/historial`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const accesosFormateados = data
              .filter(item => item && typeof item === 'object')
              .map((item, index) => {
                // Use real fields from backend: tipo, fecha, hora
                const tipoFinal = item.tipo || item.tipo_movimiento || (index % 2 === 0 ? 'entrada' : 'salida');
                return {
                  id: index.toString(),
                  tipo: tipoFinal,
                  fecha: item.fecha || "Hoy",
                  hora: item.hora || "",
                  estado: item.estado || "Permitido",
                  color: tipoFinal.toLowerCase() === "entrada" ? "green" : "red"
                };
              });
            setAccesos(accesosFormateados);
          } else {
            setAccesos([]);
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    obtenerAccesos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={st.historyItem}>
      <View style={st.iconContainer}>
        <Text style={[st.iconArrow, { color: item.color === 'green' ? '#1D8348' : '#C0392B' }]}>
          {item.color === 'green' ? '➡' : '⬅'}
        </Text>
      </View>
      
      <View style={st.textContainer}>
        <Text style={[st.typeText, { color: item.color === 'green' ? '#1D8348' : '#C0392B' }]}>
          {item.tipo?.toUpperCase() || 'DESCONOCIDO'}
        </Text>
        <Text style={st.dateTimeText}>
          {item.fecha}    {item.hora}
        </Text>
      </View>
      
      <View style={st.badgeContainer}>
        <Text style={st.badgeText}>{item.estado}</Text>
      </View>
    </View>
  );

  const st = makeStyles(COLORS);

  return (
    <SafeAreaView style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />

      <Logo size="small" style={st.logoContainer} />
      
      <Header title="HISTORIAL DE ACCESOS" navigation={navigation} />

      <FlatList
        data={accesos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={st.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const makeStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
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
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
    color: COLORS.accent,
  },
  dateTimeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
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