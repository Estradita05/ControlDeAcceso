import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Luis Martínez</Text>
      <Text style={styles.email}>124050109@edu.mx</Text>

      <View style={styles.card}>
        <Text>Tipo: Estudiante</Text>
        <Text>Carrera: TID</Text>
        <Text>Cuatrimestre: 5</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF4FB', alignItems: 'center', padding: 20 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  email: { marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, width: '100%', marginBottom: 20 },
  button: { backgroundColor: '#0A4D8C', padding: 15, borderRadius: 12, width: '100%', marginBottom: 10 },
  logout: { backgroundColor: '#1F6FB2', padding: 15, borderRadius: 12, width: '100%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});