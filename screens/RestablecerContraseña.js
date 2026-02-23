import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResetPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <Text style={styles.text}>Ingresa tu correo o matrícula</Text>

      <TextInput style={styles.input} placeholder="Buscar" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF4FB', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  text: { textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#0A4D8C', padding: 15, borderRadius: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});