import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  
  const [search, setSearch] = useState('');
  
  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />


      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Restablecer la contraseña</Text>
      </View>

      <Text style={styles.description}>
        Ingresa tu correo o matrícula
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E3EEF6', 
    paddingHorizontal: 30,
    paddingTop: 60,
    },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerBar: {
    backgroundColor: '#7FA6C9',
    paddingVertical: 12,
    marginHorizontal: -30,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4D8C',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10,  
  },
  text: { 
    textAlign: 'center', 
    marginBottom: 20 
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 25,
    elevation: 3,
  },
  input: { 
    flex: 1,
    fontSize: 16,
  },
  button: { 
    backgroundColor: '#0A4D8C', 
    padding: 15, 
    borderRadius: 25,
    alignItems: 'center',
    elevation: 6, 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
});