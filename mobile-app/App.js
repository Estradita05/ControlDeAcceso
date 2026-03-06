import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importarpantallas
import InicioScreen from './screens/Inicio';
import LoginScreen from './screens/Login';
import MenuScreen from './screens/Menu';
import CredencialScreen from './screens/Credencial';
import MisVehiculosScreen from './screens/MisVehiculos';
import AgregarVehiculoScreen from './screens/AgregarVehiculo';
import EditarVehiculoScreen from './screens/EditarVehiculo';
import PerfilScreen from './screens/Perfil';
import AjustesScreen from './screens/Ajustes';
import HistorialScreen from './screens/Historial';
import NotificacionesScreen from './screens/Notificaciones';
import AccesoProvisionalScreen from './screens/AccesoProvisional';
import ReporteProblemaScreen from './screens/ReporteProblema';
import EditarPerfilScreen from './screens/EditarPerfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio" 
screenOptions={{ headerShown: false }}      >
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Credencial" component={CredencialScreen} />
        <Stack.Screen name="MisVehiculos" component={MisVehiculosScreen} />
        <Stack.Screen name="AgregarVehiculo" component={AgregarVehiculoScreen} />
        <Stack.Screen name="EditarVehiculo" component={EditarVehiculoScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Ajustes" component={AjustesScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
        <Stack.Screen name="AccesoProvisional" component={AccesoProvisionalScreen} />
        <Stack.Screen name="ReporteProblema" component={ReporteProblemaScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}