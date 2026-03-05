import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>AJUSTES</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Idioma</Text>
            <View style={styles.selectBox}>
              <Text style={styles.value}>Español</Text>
              <Icon name="chevron-down" size={16} color="#004C8C" />
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
              <Icon name="chevron-down" size={16} color="#004C8C" />
            </View>
          </View>
        </View>

        {/* 5. NOTIFICACIONES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Notificaciones de acceso</Text>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
              trackColor={{ false: '#D1D1D1', true: '#86ABC8' }}
              thumbColor={notifications ? '#004C8C' : '#F4F4F4'}
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
    backgroundColor: '#F0F6FA', 
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#F0F6FA',
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#86ABC8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 5,
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  sectionCard: { 
    backgroundColor: '#EAF3F8', 
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
    color: '#004C8C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1E1EB',
  },
  value: {
    marginRight: 8,
    fontSize: 14,
    color: '#004C8C',
    fontWeight: '500',
  },
  badgeContainer: {
    backgroundColor: '#D1E6C9', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    color: '#558249',
    fontWeight: 'bold',
    fontSize: 13,
  },
});