import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteAnimal } from "../actions/animals";
import { useForm } from "../hooks/useForm";
import { Navbar } from "./Navbar";

export const AnimalProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { animalActive: animal } = useSelector((state) => state.animal);
  const [formValues] = useForm(animal);
  const { name, tipo, raza, color, edad, foto, descripcion } = formValues;

  //   history.push("/animals/editAnimal");
  const handleReturn = () => {
    history.push("/");
  };

  const handleEdit = () => {
    history.push("/animals/editAnimal");
  };

  const handleDelete = (id) => {
    dispatch(deleteAnimal(id));
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="invidiv">
          <h1 className="text-center p-4">Perfil</h1>
          <img
            onClick={handleEdit.bind(this, animal)}
            className="img-fluid onhover maxx"
            src={foto}
            alt={name}
          />
          <div className="contenedor">
            <div className="p-4">
              <h3>Nombre:</h3>
              <h5>{name}</h5>
              <h3>Tipo:</h3>
              <h5>{tipo}</h5>
              <h3>Raza:</h3>
              <h5>{raza}</h5>
              <h3>Color:</h3>
              <h5>{color}</h5>
              <h3>Edad:</h3>
              <h5>Tiene {edad} año/s </h5>
              <h3>Descripción:</h3>
              <h5>{descripcion}</h5>
            </div>

            <div className="pt-3 pb-4 d-flex justify-content-between">
              <button className="btn btn-outline-danger" onClick={handleReturn}>
                Volver
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={handleEdit.bind(this, animal)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-danger "
                onClick={handleDelete.bind(this, animal.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
