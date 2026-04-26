const LINK_BACKEND = "http://localhost:8000";

export const isAuthenticated = async () => {
  try {
    const LINK_ME = LINK_BACKEND + "/users/me"
    const res = await fetch(LINK_ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    console.log(res)
    console.log(res.ok)
    return res.ok;
  } catch (error) {
    return false;
  }
};



export const iniciar_sesion = async (email, password) => {
  try {
    const LINK_LOGIN = LINK_BACKEND + "/auth/login"
    const response = await fetch(LINK_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    // opcional: si el backend devuelve info
    const data = await response.json();
    console.log("Login exitoso:", data);

    return response.ok;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error al iniciar sesión");
    return false;
  }
};


export const logout = async () => {
  try{
    const LINK_LOGOUT = LINK_BACKEND + "/auth/logout"
    const res = await fetch(LINK_LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

    return res.ok;
  } catch (error) {
    alert("Error al cerrar sesión");
    return false;
  }
}