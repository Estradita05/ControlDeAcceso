import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SIZES } from '../theme';

export default function Logo({ size = 'medium', style }) {
  let dimension = SIZES.logoHeader;

  if (size === 'large') dimension = SIZES.logoSplash;
  if (size === 'medium') dimension = SIZES.logoLogin;
  if (size === 'small') dimension = SIZES.logoHeader;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: dimension, height: dimension }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
