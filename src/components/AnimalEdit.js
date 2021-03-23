import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateAnimal } from "../actions/animals";
import { Navbar } from "./Navbar";

const formData = {
  name: "",
  tipo: "",
  raza: "",
  color: "",
  edad: "",
  foto: "",
};

export const AnimalEdit = () => {
  const dispatch = useDispatch();
  const { animalActive: animal } = useSelector((state) => state.animal);

  const [formValues, setFormValues] = useState(formData);

  const { name, tipo, raza, color, edad, foto, descripcion } = formValues;
  const [nameValid, setNameValid] = useState(true);
  const history = useHistory();

  const handleReturn = () => {
    history.push("/animals/animalprofile");
  };
  useEffect(() => {
    if (animal) {
      setFormValues(animal);
    } else {
      setFormValues(formData);
    }
  }, [animal, setFormValues]);

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
    await dispatch(updateAnimal(formValues));
    setNameValid(true);
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className=" pt-4 ">
        <div className="invidiv">
          <div className=" container">
            <h3 className="p-4">Editar el perfil de {animal.name}</h3>
            <form onSubmit={handleSubmitForm}>
              <div className="form-group ">
                <label>Nombre</label>
                <input
                  type="text"
                  className={`form-control ${!nameValid && "is-invalid"}`}
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <input
                  type="text"
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
                  className="form-control"
                  autoComplete="off"
                  name="raza"
                  value={raza}
                  onChange={handleInputChange}
                />
              </div>
              <label>Color</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="color"
                  value={color}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Edad</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="number"
                  name="edad"
                  value={edad}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Url de Foto</label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="foto"
                  value={foto}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  autoComplete="off"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleInputChange}
                  rows="5"
                ></textarea>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleReturn}
                >
                  Volver
                </button>
                <button className="btn btn-outline-danger " type="submit">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
