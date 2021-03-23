import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { animalsLogout } from "./animals";

export const iniciarSesion = (email, password) => {
  return async (dispatch) => {
    const res = await fetchSinToken("auth", { email, password }, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(
        iniciar({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      throw new Error("Ha ocurrido un error con la autenticación.");
    }
  };
};

export const iniciarRegistro = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetchSinToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await res.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(
        iniciar({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      throw new Error("Ha ocurrido un error al registrarse.");
    }
  };
};

export const iniciarChecking = () => {
  return async (dispatch) => {
    const res = await fetchConToken("auth/renew");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);

      dispatch(
        iniciar({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinalizado());
    }
  };
};

const checkingFinalizado = () => ({
  type: types.authCheckingFinalizado,
});

const iniciar = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const iniciarLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(animalsLogout());
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
