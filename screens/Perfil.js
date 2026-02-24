import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={26} color="#0E2A47" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Icon name="person" size={60} color="#fff" />
        </View>

        <Text style={styles.name}>Montserrath Martínez</Text>
        <Text style={styles.email}>124050385@edu.mx</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del usuario</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Estudiante</Text>
          <Text style={styles.value}>124050136</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Carrera</Text>
          <Text style={styles.value}>TIID214</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cuatrimestre</Text>
          <Text style={styles.value}>5</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F8',
  },
  header: {
    height: 90,
    backgroundColor: '#7FA2C9',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E2A47',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#0E5A8A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#DCEAF3',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#333',
  },
  value: {
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#0E5A8A',
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});