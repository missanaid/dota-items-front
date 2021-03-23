import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewAnimal } from "../actions/animals";
import { Navbar } from "./Navbar";

const formData = {
  name: "",
  tipo: "",
  raza: "",
  color: "",
  edad: "",
  foto: "",
};

export const AnimalCreate = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(formData);

  const { name, tipo, raza, color, edad, foto, descripcion } = formValues;
  const [nameValid, setNameValid] = useState(true);
  const history = useHistory();

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      return setNameValid(false);
    }
    await dispatch(addNewAnimal(formValues));
    setNameValid(true);
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <div>
      <Navbar />

      <div className=" p-4">
        <div className="invidiv">
          <div className="container">
            <h1 className="p-4 text-center">Crear Animal</h1>
            <form onSubmit={handleSubmitForm}>
              <div className="form-group ">
                <input
                  type="text"
                  placeholder="Nombre del Animal"
                  className={`form-control ${!nameValid && "is-invalid"}`}
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tipo de Animal"
                  className="form-control"
                  autoComplete="off"
                  name="tipo"
                  value={tipo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Raza del Animal"
                  className="form-control"
                  autoComplete="off"
                  name="raza"
                  value={raza}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Color del Animal"
                  className="form-control"
                  autoComplete="off"
                  name="color"
                  value={color}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Edad del Animal"
                  className="form-control"
                  autoComplete="off"
                  type="number"
                  name="edad"
                  value={edad}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Url de Foto del Animal"
                  className="form-control"
                  autoComplete="off"
                  name="foto"
                  value={foto}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Descipción del Animal"
                  className="form-control"
                  autoComplete="off"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleInputChange}
                  rows="5"
                ></textarea>
              </div>
              <div className="vertical-center">
                <button className="btn btn-outline-danger " type="submit">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
