import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SIZES } from '../theme';
import { useTheme } from '../context/ThemeContext';

/**
 * Input reutilizable con ícono, label y estado de error.
 * Responde al tema oscuro/claro via ThemeContext.
 */
export default function InputField({
  label,
  iconName,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholder = '',
  error,
  rightIcon,
  style,
  autoCapitalize = 'sentences',
  editable = true,
}) {
  const { COLORS } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? COLORS.error : COLORS.inputBorder,
      error ? COLORS.error : COLORS.inputBorderFocus,
    ],
  });

  const iconColor = error ? COLORS.error : focused ? COLORS.accent : COLORS.textMuted;

  return (
    <View style={[{ marginBottom: 18 }, style]}>
      {label ? (
        <Text style={[
          styles.label,
          { color: error ? COLORS.error : focused ? COLORS.accent : COLORS.textSecondary },
        ]}>
          {label}
        </Text>
      ) : null}

      <Animated.View style={[
        styles.inputWrapper,
        { borderColor, backgroundColor: COLORS.inputBg },
      ]}>
        {iconName && (
          <Ionicons name={iconName} size={20} color={iconColor} style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, { color: COLORS.text }, !iconName && styles.inputNoIcon]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
          editable={editable}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>

      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle-outline" size={13} color={COLORS.error} />
          <Text style={[styles.errorText, { color: COLORS.error }]}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...FONTS.label,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.borderRadius,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 2,
    minHeight: 54,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    ...FONTS.body,
    paddingVertical: 14,
  },
  inputNoIcon: { paddingLeft: 4 },
  rightIcon: { marginLeft: 8 },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },
  errorText: { ...FONTS.caption },
});
