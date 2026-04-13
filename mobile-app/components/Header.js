import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SIZES, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';

/**
 * Header reutilizable — responde al tema oscuro/claro.
 * Props:
 *  - title: string
 *  - navigation: objeto de navegación
 *  - showBack: bool (default true)
 *  - rightAction: JSX opcional
 */
export default function Header({ title, navigation, showBack = true, rightAction }) {
  const { COLORS } = useTheme();

  return (
    <LinearGradient colors={COLORS.gradientHeader} style={styles.container}>
      <View style={styles.inner}>
        {showBack && navigation ? (
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.06)' }]}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        <Text style={[styles.title, { color: COLORS.text }]} numberOfLines={1}>
          {title}
        </Text>

        {rightAction ? (
          <View style={styles.rightAction}>{rightAction}</View>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
      <View style={[styles.bottomLine, { backgroundColor: COLORS.inputBorder }]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2, ...SHADOWS.sm },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SIZES.headerHeight,
    paddingHorizontal: 12,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  title: {
    ...FONTS.h3,
    flex: 1, textAlign: 'center',
    letterSpacing: 1.5, textTransform: 'uppercase',
  },
  spacer: { width: 40 },
  rightAction: { width: 40, alignItems: 'center' },
  bottomLine: { height: 1, opacity: 0.5 },
});
