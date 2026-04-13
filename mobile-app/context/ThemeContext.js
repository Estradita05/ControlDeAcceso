import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DARK_COLORS, LIGHT_COLORS } from '../theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true); // oscuro por defecto

  // Cargar preferencia guardada al iniciar
  useEffect(() => {
    AsyncStorage.getItem('theme_preference').then(val => {
      if (val !== null) setIsDark(val === 'dark');
    });
  }, []);

  const toggleTheme = async () => {
    const newVal = !isDark;
    setIsDark(newVal);
    await AsyncStorage.setItem('theme_preference', newVal ? 'dark' : 'light');
  };

  const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook para usar el tema en cualquier pantalla */
export function useTheme() {
  return useContext(ThemeContext);
}
