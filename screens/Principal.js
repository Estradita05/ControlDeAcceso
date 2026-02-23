import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Inicio from './Inicio';
import Login from './Login';
import RestablecerContraseña from './RestablecerContraseña';
import Menú from './Menú';
import Credencial from './Credencial';
import Notificaciones from './Notificaciones';
import Historial from './Historial';
import MisVehiculos from './MisVehiculos';
import AgregarVehiculo from './AgregarVehiculo';
import AccesoProvisional from './AccesoProvisional';
import EditarVehiculo from './EditarVehiculo';
import BajaVehiculo from './BajaVehiculo';
import Perfil from './Perfil';
import Ajustes from './Ajustes';
import AyudaYsoporte from './AyudaYsoporte';
import EditarPerfil from './EditarPerfil';
import ReporteProblema from './ReporteProblema';
export default function Principal() {

    const [screen, setScreen] = useState('Principal');

    switch (screen) {
        case 'Inicio':
            return <Inicio/>;
        case 'Login':
            return <Login/>;
        case 'RestablecerContraseña':  
            return <RestablecerContraseña/>;  
        case 'Menú':
            return <Menú/>;
        case 'Credencial': 
            return <Credencial/>;  
        case 'Notificaciones':
            return <Notificaciones/>;
        case 'Historial':
            return <Historial/>;
        case 'MisVehiculos':
            return <MisVehiculos/>;
        case 'AgregarVehiculo':
            return <AgregarVehiculo/>;
        case 'AccesoProvisional':
            return <AccesoProvisional/>;
        case 'EditarVehiculo':
            return <EditarVehiculo/>;
        case 'BajaVehiculo':
            return <BajaVehiculo/>;
        case 'Perfil':
            return <Perfil/>;
        case 'Ajustes':
            return <Ajustes/>;
        case 'AyudaYsoporte':
            return <AyudaYsoporte/>;
        case 'EditarPerfil':
            return <EditarPerfil/>; 
        case 'ReporteProblema':
            return <ReporteProblema/>;                                     
        default:
            return (
                <View style={styles.container}>
                 <Text style={styles.titulo}>Control de Acceso</Text>
                 <View style={styles.contenedorBotones}>
                     <Button color="#0c0c0c" title="Inicio" onPress={() => setScreen('Inicio')}/>
                     <Button color="#0c0c0c" title="Login" onPress={() => setScreen('Login')}/>
                     <Button color="#0c0c0c" title="Restablecer Contraseña" onPress={() => setScreen('RestablecerContraseña')}/>
                     <Button color="#0c0c0c" title="Menú" onPress={() => setScreen('Menú')}/>
                     <Button color="#0c0c0c" title="Credencial" onPress={() => setScreen('Credencial')}/>
                     <Button color="#0c0c0c" title="Notificaciones" onPress={() => setScreen('Notificaciones')}/>
                     <Button color="#0c0c0c" title="Historial" onPress={() => setScreen('Historial')}/>
                     <Button color="#0c0c0c" title="Mis Vehiculos" onPress={() => setScreen('MisVehiculos')}/>
                     <Button color="#0c0c0c" title="Agregar Vehiculo" onPress={() => setScreen('AgregarVehiculo')}/>
                     <Button color="#0c0c0c" title="Acceso Provisional" onPress={() => setScreen('AccesoProvisional')}/>
                     <Button color="#0c0c0c" title="Editar Vehiculo" onPress={() => setScreen('EditarVehiculo')}/>
                     <Button color="#0c0c0c" title="Baja Vehiculo" onPress={() => setScreen('BajaVehiculo')}/>
                     <Button color="#0c0c0c" title="Perfil" onPress={() => setScreen('Perfil')}/>
                     <Button color="#0c0c0c" title="Ajustes" onPress={() => setScreen('Ajustes')}/>
                     <Button color="#0c0c0c" title="Ayuda y Soporte" onPress={() => setScreen('AyudaYsoporte')}/>
                     <Button color="#0c0c0c" title="Editar Perfil" onPress={() => setScreen('EditarPerfil')}/>
                    <Button color="#0c0c0c" title="Reportar Problema" onPress={() => setScreen('ReporteProblema')}/>
                   
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0065c4',
  },
  titulo: {
    color: 'BLACK',
    fontSize: 20,
    fontFamily: 'Time New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    marginTop: 32,
  },
  contenedorBotones: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 5,
    alignItems: 'center',
  }
});