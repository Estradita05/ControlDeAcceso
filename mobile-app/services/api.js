const API_URL = "http://192.168.0.143:5000";

export const api = {

  getVehiculos: async () => {
    const res = await fetch(`${API_URL}/vehiculos`);
    return res.json();
  },

  crearVehiculo: async (vehiculo) => {
    const res = await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehiculo)
    });
    return res.json();
  },

  crearUsuario: async (usuario) => {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
    return res.json();
  }

};