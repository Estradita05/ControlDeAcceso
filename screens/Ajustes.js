import { View, Text, Switch, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <View style={styles.card}>
        <Text>Idioma</Text>
        <Text>Español</Text>
      </View>

      <View style={styles.cardRow}>
        <Text>Notificaciones</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF4FB', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15 },
  cardRow: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});