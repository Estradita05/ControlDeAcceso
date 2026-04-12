import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../theme';

export default function Header({ title, navigation, showBack = true }) {
  return (
    <View style={styles.container}>
      {showBack && navigation ? (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>❮</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      
      <Text style={styles.titleText}>{title.toUpperCase()}</Text>
      
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    height: SIZES.headerHeight,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  backButton: {
    padding: 10,
    width: 40,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  spacer: {
    width: 40,
  },
});
