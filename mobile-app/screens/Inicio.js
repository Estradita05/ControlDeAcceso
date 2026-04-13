import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { FONTS, SIZES } from '../theme';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';

export default function Inicio({ navigation }) {
  const { COLORS, isDark } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Menu'); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  const st = makeStyles(COLORS);

  return (
    <View style={st.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      
      <Logo size="large" style={st.logo} />

      <View style={st.textContainer}>
        <Text style={st.welcomeText}>¡Bienvenido!</Text>
        <Text style={st.subText}>Accesos seguros, comunidad protegida.</Text>
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
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