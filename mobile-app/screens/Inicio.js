import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';

export default function InicioScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Verificamos que la navegación exista antes de disparar
            if (navigation) {
                navigation.navigate('Login');
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Agregamos StatusBar para evitar saltos visuales al arrancar */}
            <StatusBar barStyle="dark-content" backgroundColor="#DCEAF3" />
            
            <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => navigation.navigate('Login')}
                style={styles.content}
            >
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                
                <Text style={styles.title}>¡Bienvenido!</Text>
                
                <Text style={styles.subtitle}>
                    Accesos seguros, comunidad protegida.
                </Text>
            </TouchableOpacity>
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
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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