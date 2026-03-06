import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) { 
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
        <Text style={styles.titleText}>PERFIL</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Icon name="person" size={65} color="#fff" />
          </View>

          <Text style={styles.name}>Montserrath Estrada</Text>
          <Text style={styles.email}>124050385@edu.mx</Text>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditarPerfil')} 
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del usuario</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Estudiante</Text>
            <Text style={styles.value}>124050385</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Carrera</Text>
            <Text style={styles.value}>Tecnologías de la información</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Cuatrimestre</Text>
            <Text style={styles.value}>5</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
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
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C8C',
  },
  email: {
    fontSize: 14,
    color: '#4F7EA8',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#0E5A8A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 4,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#EAF3F8',
    marginHorizontal: 25,
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004C8C',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D1E1EB',
    paddingBottom: 5,
  },
  label: {
    color: '#555',
    fontWeight: '600',
  },
  value: {
    fontWeight: '500',
    color: '#004C8C',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#0E5A8A',
    marginTop: 30,
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});