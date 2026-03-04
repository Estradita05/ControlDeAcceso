import { View, Text, Switch, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7FA2C9" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.row}>
        <Text style={styles.label}>Idioma</Text>
        <View style={styles.selectBox}>
        <Text style={styles.value}>Español</Text>
        <Icon name="chevron-down" size={16} color="#333" />
        </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Datos de la cuenta</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Estado de la cuenta</Text>
          <View style={styles.selectBox}>
          <Text style={styles.badge}>Activa</Text>
        </View>
        </View>

        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={styles.label}>Historial de acceso</Text>
          <View style={styles.selectBox}>
            <Text style={styles.value}>Activo</Text>
            <Icon name="chevron-down" size={16} color="#333" />
          </View>
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
    backgroundColor: '#E6EEF5', 
  },
  header: {
    backgroundColor: '#7FA2C9',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  sectionCard: { 
    backgroundColor: '#B7CADB',
    marginHorizontal: 20,
    marginTop: 20, 
    padding: 20, 
    borderRadius: 20, 
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
    color: '#000',
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
  },

  selectText: {
    marginRight: 5,
    fontSize: 14,
    color: '#333',
  },
});