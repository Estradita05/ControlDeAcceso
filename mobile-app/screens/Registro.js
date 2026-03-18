import { crearUsuario } from "../services/api";

const registrar = async () => {

 const usuario = {
   nombre: nombre,
   correo: correo,
   password: password,
   rol: "usuario"
 };

 const res = await crearUsuario(usuario);

 console.log(res);
};