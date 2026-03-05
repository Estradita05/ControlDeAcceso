import { View, Text, StyleSheet, Image } from 'react-native';

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>¡Bienvenido!</Text>
      
      <Text style={styles.subtitle}>
        Accesos seguros, comunidad protegida.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCEAF3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: -30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2D3D',
    marginTop: -5,
  },
  subtitle: {
    fontSize: 20,
    color: '#4A6572',
    textAlign: 'center',
  },
});