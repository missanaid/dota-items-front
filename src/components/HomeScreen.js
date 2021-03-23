import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { animalSetActive, cargarAnimales } from "../actions/animals";
import { Navbar } from "./Navbar";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  // const { uid } = useSelector((state) => state.auth);

  const { animals } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(cargarAnimales());
  }, [dispatch]);

  const handleActive = (e) => {
    dispatch(animalSetActive(e));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="text-center pt-3">Mis Animalitos</h2>
        <div className="row  ">
          {animals.map((a) => (
            <div className="col-lg-6 col-12 mt-4  " key={a.id} {...a}>
              <div className="pb-5  ">
                <div className="card  ">
                  <Link to="/animals/animalprofile">
                    <img
                      className="img-fluid pointer "
                      src={a.foto}
                      alt={a.name}
                      onClick={handleActive.bind(this, a)}
                    />
                  </Link>
                  <div className="card-body ">
                    <h5 className="card-title ">{a.name}</h5>
                    <p className="card-text ">{a.descripcion}</p>
                    <div className="vertical-center">
                      <Link
                        to="/animals/animalprofile"
                        className="btn btn-dark "
                        onClick={handleActive.bind(this, a)}
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="add-form">
          <Link
            to="/animals/createanimal"
            className=" float-right pb-4 add-style"
          >
            <p>Agregar Animal</p>
            <i className="fas fa-plus-square vertical-center fa-2x "></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
