import React, {useEffect} from "react";
import {View, Button} from "react-native";

import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario
} from "../services/usuariosService";

export default function Usuarios(){

  useEffect(()=>{
    cargarUsuarios();
  },[]);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    console.log(data);
  };

  const agregarUsuario = async () => {
    await crearUsuario({
      nombre: "Pilar",
      rol: "Admin"
    });
  };

  const borrarUsuario = async () => {
    await eliminarUsuario(1);
  };

  return(
    <View>
      <Button title="Ver Usuarios" onPress={cargarUsuarios}/>
      <Button title="Agregar Usuario" onPress={agregarUsuario}/>
      <Button title="Eliminar Usuario" onPress={borrarUsuario}/>
    </View>
  );
}