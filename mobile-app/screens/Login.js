import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';

export default function LoginScreen({ navigation }) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            alert('Por favor, ingresa tus credenciales');
            return;
        }
        navigation.navigate('Menu'); 
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0F6FA" />
            
            <Image
                source={require('../assets/logo.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
            
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>INICIAR SESIÓN</Text>
            </View>

            <Text style={styles.subtitle}>Ingresa tus datos</Text>

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@edu.mx"
                placeholderTextColor="#7A9EB1"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
secureTextEntry={true}              
  placeholder="********"
                placeholderTextColor="#7A9EB1"
            />

            <TouchableOpacity onPress={() => navigation.navigate('ReporteProblema')}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F6FA', 
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    logo: {
        width: 170,
        height: 170,
        alignSelf: 'center',
        marginBottom: 10,
    },
    headerBar: {
        backgroundColor: '#86ABC8',
        paddingVertical: 12,
        marginHorizontal: -30,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004C8C',
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 16,
        color: '#4F7EA8',
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '700',
        color: '#004C8C',
    },
    input: {
        backgroundColor: '#EAF3F8', 
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        color: '#333',
        elevation: 2,
    },
    link: {
        color: '#004C8C',
        textAlign: 'right',
        marginBottom: 40,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#0054A3',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});