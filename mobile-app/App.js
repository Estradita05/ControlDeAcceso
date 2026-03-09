import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de pantallas
import Login from './screens/Login';
import Inicio from './screens/Inicio';
import Registro from './screens/Registro';
import Menu from './screens/Menu';
import Perfil from './screens/Perfil';
import MisVehiculos from './screens/MisVehiculos';
import AgregarVehiculo from './screens/AgregarVehiculo';
import EditarVehiculo from './screens/EditarVehiculo';
import BajaVehiculo from './screens/BajaVehiculo';
import Notificaciones from './screens/Notificaciones';
import Historial from './screens/Historial';
import Credencial from './screens/Credencial';
import AccesoProvisional from './screens/AccesoProvisional';
import Ajustes from './screens/Ajustes';
import ReporteProblema from './screens/ReporteProblema';
import RestablecerContrasena from './screens/RestablecerContrasena';
import EditarPerfil from './screens/EditarPerfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="MisVehiculos" component={MisVehiculos} />
        <Stack.Screen name="AgregarVehiculo" component={AgregarVehiculo} />
        <Stack.Screen name="EditarVehiculo" component={EditarVehiculo} />
        <Stack.Screen name="BajaVehiculo" component={BajaVehiculo} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Credencial" component={Credencial} />
        <Stack.Screen name="AccesoProvisional" component={AccesoProvisional} />
        <Stack.Screen name="Ajustes" component={Ajustes} />
        <Stack.Screen name="ReporteProblema" component={ReporteProblema} />
        <Stack.Screen name="RecuperarContrasena" component={RestablecerContrasena} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}