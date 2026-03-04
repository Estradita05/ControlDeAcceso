import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7FA2C9" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ENVIAR MENSAJE</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.logoContainer}>
        <Icon name="shield-checkmark" size={90} color="#1E6091" />
      </View>

      <Text style={styles.mainTitle}>Reporta un problema</Text>
      <Text style={styles.subtitle}>Ayúdanos a mejorar</Text>

      <Text style={styles.label}>Asunto</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={[styles.label, { marginTop: 15 }]}>Mensaje</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Describe tu problema..."
        placeholderTextColor="#9E9E9E"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar un Mensaje</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginBottom: 25,
  },
  label: {
    marginLeft: 25,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#D9E3EC',
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },
  textArea: {
    backgroundColor: '#D9E3EC',
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 15,
    height: 110,
    textAlignVertical: 'top',
    elevation: 4,
  },
  button: {
    backgroundColor: '#0D4D73',
    marginHorizontal: 60,
    marginTop: 30,
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});