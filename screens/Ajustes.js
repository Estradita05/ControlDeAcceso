import { View, Text, Switch, StyleSheet } from 'react-native';
import { useState } from 'react';


export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.row}>
        <Text style={styles.label}>Idioma</Text>
        <Text style={styles.value}>Español</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Datos de la cuenta</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Estado de la cuenta</Text>
          <Text style={styles.badge}>Activa</Text>
        </View>

        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={styles.label}>Historial de acceso</Text>
          <Text style={styles.badge}>Activo</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Notificaciones de acceso</Text>
          <Switch 
          value={notifications} 
          onValueChange={setNotifications} 
          trackColor={{ false: '#ccc', true: '#1E6091' }}
          thumbColor="#fff"
          />
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAF4FB', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 40,
    textAlign: 'center',
    color: '#1E3A5F'
  },
  sectionCard: { 
    backgroundColor: '#aecadc', 
    padding: 20, 
    borderRadius: 18, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E3A5F',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E6091',
  },
  badge: {
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: '600',
    color: '#fff',
    elevation: 2,
  },
});