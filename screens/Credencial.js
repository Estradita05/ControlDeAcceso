import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DigitalCredential() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      
      <View style={styles.headerRibbon}>
        <TouchableOpacity style={styles.backButtonContainer}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credencial digital</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Tu tarjeta digital</Text>

        <Image 
          source={require('../assets/credencial.jpeg')} 
          style={styles.idCard} 
        />

        
        <View style={styles.historyContainer}>
          
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Historial de Accesos</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          
          <View style={styles.historyItem}>
            <Ionicons name="log-in-outline" size={22} color="#4CAF50" />
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Entrada</Text>
              <Text style={styles.historyDate}>19/02/2026  07:15 AM</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Permitido</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <Ionicons name="log-out-outline" size={22} color="#F44336" />
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Salida</Text>
              <Text style={styles.historyDate}>18/02/2026  06:32 PM</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Permitido</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <Ionicons name="log-in-outline" size={22} color="#4CAF50" />
            <View style={styles.historyTextInfo}>
              <Text style={styles.historyType}>Entrada</Text>
              <Text style={styles.historyDate}>18/02/2026  07:08 AM</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Permitido</Text>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E3EEF6' 
  },

  header: { 
    alignItems: 'center', 
    marginTop: 50, 
    marginBottom: 10 
  },

  logo: { 
    width: 100, 
    height: 100, 
    resizeMode: 'contain' 
  },

  headerRibbon: { 
    backgroundColor: '#7FA6C9', 
    paddingVertical: 14, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  backButtonContainer: { 
    position: 'absolute', 
    left: 20 
  },

  headerTitle: { 
    color: '#004A8F', 
    fontWeight: 'bold', 
    fontSize: 16 
  },

  body: { 
    padding: 25 
  },

  sectionTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginBottom: 15 
  },

  idCard: { 
    width: '100%', 
    height: 190,
    borderRadius: 18,
    marginBottom: 30,
    resizeMode: 'cover',
    elevation: 6,
  },

  historyContainer: { 
    backgroundColor: '#F0F6FC', 
    borderRadius: 20, 
    padding: 20,
    elevation: 5,
  },

  historyHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },

  linkText: { 
    color: '#0084FF', 
    fontWeight: '600' 
  },

  historyItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 18 
  },

  historyTextInfo: { 
    flex: 1, 
    marginLeft: 12 
  },

  historyType: { 
    fontWeight: 'bold', 
    fontSize: 14 
  },

  historyDate: { 
    fontSize: 12, 
    color: '#6A8299',
    marginTop: 3 
  },

  badgeContainer: { 
    backgroundColor: '#DDF0D7', 
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 20 
  },

  badgeText: { 
    color: '#5A9B4B', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
});