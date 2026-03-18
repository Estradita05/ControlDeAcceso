import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';

export default function Registro({ navigation }) { 
  return (
    <SafeAreaView style={styles.container}>
      
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
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.backArrow}>{'❮'}</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>REGISTRAR USUARIO</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>

          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Alexis Hernández" 
          />

          <Text style={styles.label}>Matrícula / ID</Text>
          <TextInput 
            style={styles.input} 
            placeholder="1240XXXXX" 
            keyboardType="numeric" 
          />

          <Text style={styles.label}>Correo Institucional</Text>
          <TextInput 
            style={styles.input} 
            placeholder="usuario@edu.mx" 
            keyboardType="email-address" 
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            placeholder="********" 
            secureTextEntry={true} 
          />

        </View>

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.registerText}>Crear Cuenta</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F0F6FA' 
  },

  logoContainer: { 
    alignItems: 'center', 
    paddingTop: 30, 
    paddingBottom: 15 
  },

  logo: { 
    width: 90, 
    height: 90 
  },

  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#86ABC8',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  backButton: { 
    padding: 5 
  },

  backArrow: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#003B7C' 
  },

  titleText: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#003B7C' 
  },

  scrollContent: { 
    paddingHorizontal: 25, 
    paddingTop: 20 
  },

  card: {
    backgroundColor: '#EAF3F8',
    padding: 20,
    borderRadius: 20, 
    elevation: 3,
    borderLeftWidth: 6, 
    borderLeftColor: '#0054A3'
  },

  label: { 
    color: '#003B7C', 
    fontWeight: 'bold', 
    marginBottom: 5, 
    marginTop: 10 
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1E1EB',
  },

  registerButton: {
    backgroundColor: '#005696', 
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 30, 
    alignItems: 'center',
  },

  registerText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});