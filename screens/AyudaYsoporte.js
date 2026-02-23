import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayuda y Soporte</Text>

      <View style={styles.card}>
        <Text>¿Cómo solicitar una placa temporal?</Text>
        <Text>¿Cómo dar de baja una placa?</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar un mensaje</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Versión 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF4FB', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20 },
  button: { backgroundColor: '#0A4D8C', padding: 15, borderRadius: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: 30, color: '#555' },
});