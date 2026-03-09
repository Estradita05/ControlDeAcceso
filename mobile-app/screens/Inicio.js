import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function Inicio({ navigation }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Menu'); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <Text style={styles.subText}>Accesos seguros, comunidad protegida.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { 
    width: 250, 
    height: 250, 
    marginBottom: 60 
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  welcomeText: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#1C2B39', 
    marginBottom: 10 
  },
  subText: { 
    fontSize: 16, 
    color: '#6B8EAD', 
    textAlign: 'center',
    paddingHorizontal: 40
  }
});