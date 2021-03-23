import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { iniciarSesion } from "../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formValues, setFormValues] = useForm({
    email: "ariadna@gmail.com",
    password: "123456",
  });
  const { email, password } = formValues;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(iniciarSesion(email, password));
  };
  const handleRoute = () => {
    history.push("/register");
  };
  return (
    <div className="m-5">
      <div className="container">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={setFormValues}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={setFormValues}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="btn btn-outline-danger">
              Ingresar
            </button>
            <div className="pt-2">
              <p>
                ¿No tienes una cuenta?{" "}
                <span className="register-link" onClick={handleRoute}>
                  Registrate
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
