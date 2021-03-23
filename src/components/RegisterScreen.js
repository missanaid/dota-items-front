import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { iniciarRegistro } from "../actions/auth";
import { useForm } from "../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formValues, setFormValues] = useForm({
    name: "Anaid",
    email: "anaid@gmail.com",
    password: "123456",
    password2: "123456",
  });
  const { name, email, password, password2 } = formValues;

  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(iniciarRegistro(name, email, password));
  };
  const handleRoute = () => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="mt-4">
        <h1>Register</h1>
        <br />
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={setFormValues}
            />
          </div>
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
          <div className="mb-3">
            <label className="form-label"> Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={setFormValues}
            />
          </div>
          <div className="pt-4">
            <button type="submit" className="btn btn-outline-danger">
              Registrarse
            </button>
            <div className="pt-2">
              <p>
                Ya tengo una cuenta.{" "}
                <span className="register-link" onClick={handleRoute}>
                  Iniciar Sesión
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
