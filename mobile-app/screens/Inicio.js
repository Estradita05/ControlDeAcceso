import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';

export default function Inicio({ navigation }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Menu'); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      
      <Logo size="large" style={styles.logo} />

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
    backgroundColor: COLORS.background, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logo: { 
    marginBottom: 60 
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  welcomeText: { 
    fontSize: 52, 
    fontWeight: 'bold', 
    color: COLORS.accent, 
    marginBottom: 2 
  },
  subText: { 
    fontSize: 16, 
    color: COLORS.textSecondary, 
    textAlign: 'center',
    paddingHorizontal: 40
  }
});