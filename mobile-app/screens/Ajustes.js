import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../theme';
import Logo from '../components/Logo';
import Header from '../components/Header';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />

      <Logo size="small" style={styles.logoContainer} />

      <Header title="AJUSTES" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Idioma</Text>
            <View style={styles.selectBox}>
              <Text style={styles.value}>Español</Text>
              <Icon name="chevron-down" size={16} color={COLORS.accent} />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Datos de la cuenta</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Estado de la cuenta</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Activa</Text>
            </View>
          </View>

          <View style={[styles.row, { marginTop: 15 }]}>
            <Text style={styles.label}>Historial de acceso</Text>
            <View style={styles.selectBox}>
              <Text style={styles.value}>Activo</Text>
              <Icon name="chevron-down" size={16} color={COLORS.accent} />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Notificaciones de acceso</Text>
            <Switch 
              value={notifications} 
              onValueChange={(val) => setNotifications(val)} 
              trackColor={{ false: '#D1D1D1', true: COLORS.secondary }}
              thumbColor={notifications ? COLORS.primary : '#F4F4F4'}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  logoContainer: { 
    paddingTop: 30, 
    paddingBottom: 15 
  },
  sectionCard: { 
    backgroundColor: COLORS.cardBg, 
    marginHorizontal: 20,
    marginTop: 20, 
    padding: 20, 
    borderRadius: 20, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: COLORS.accent 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  label: { 
    fontSize: 15, 
    color: COLORS.text, 
    fontWeight: '600'
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  value: { 
    marginRight: 8, 
    fontSize: 14, 
    color: COLORS.accent, 
    fontWeight: '500' 
  },
  badgeContainer: { 
    backgroundColor: '#D1E6C9', 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    borderRadius: 15 
  },
  badgeText: { 
    color: '#558249', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
});