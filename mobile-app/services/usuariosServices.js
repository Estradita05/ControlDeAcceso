import api from "./api";

// READ
export const obtenerUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

// CREATE
export const crearUsuario = async (usuario) => {
  const response = await api.post("/usuarios", usuario);
  return response.data;
};

// UPDATE
export const actualizarUsuario = async (id, usuario) => {
  const response = await api.put(`/usuarios/${id}`, usuario);
  return response.data;
};

// DELETE
export const eliminarUsuario = async (id) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
};