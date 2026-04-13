import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DARK_COLORS, FONTS, SHADOWS } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function GradientButton({
  title,
  onPress,
  colors,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const { COLORS } = useTheme();

  const gradientColors = colors || (
    variant === 'danger'   ? COLORS.gradientDanger :
    variant === 'success'  ? COLORS.gradientSuccess :
    COLORS.gradientPrimary
  );

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.outlineButton, { borderColor: COLORS.inputBorderFocus }, style]}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.accent} size="small" />
        ) : (
          <Text style={[styles.outlineText, { color: COLORS.accent }, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.wrapper, disabled && styles.disabled, style]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={disabled ? ['#374151', '#4B5563'] : gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  gradient: {
    paddingVertical: 17,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FONTS.button,
    color: '#FFFFFF',
  },
  disabled: {
    opacity: 0.5,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  outlineText: {
    ...FONTS.button,
  },
});
