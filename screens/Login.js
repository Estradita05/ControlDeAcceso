import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIAR SESIÓN</Text>

      <TextInput style={styles.input} placeholder="Correo Electrónico" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />

      <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF4FB', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#CFE3F8', padding: 12, borderRadius: 10, marginBottom: 12 },
  link: { color: '#0A4D8C', textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#0A4D8C', padding: 15, borderRadius: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});