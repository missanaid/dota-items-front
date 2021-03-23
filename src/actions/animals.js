import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { getAnimals } from "../helpers/getAnimals";
import { types } from "../types/types";

export const addNewAnimal = (animal) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("animals", animal, "POST");
      const body = await resp.json();
      if (body.ok) {
        animal.id = body.animal.id;
        animal.user = {
          _id: uid,
          name: name,
        };
        dispatch(animalAddNew(animal));
        Swal.fire("Agregar Animal", "Se ha Agregado correctamente", "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error al crear el Animal", "error");
    }
  };
};

export const updateAnimal = (animal) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`animals/${animal.id}`, animal, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(animalUpdated(animal));
        Swal.fire(
          "Perfil Actualizado",
          "Se ha actualizado correctamente",
          "success"
        );
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error al actualizar", "error");
    }
  };
};
const animalUpdated = (animal) => ({
  type: types.animalUpdate,
  payload: animal,
});

export const cargarAnimales = () => {
  return async (dispatch, getState) => {
    // const { uid } = getState().auth;
    try {
      const resp = await fetchConToken("animals");
      const body = await resp.json();

      const animals = getAnimals(body.animals);
      dispatch(animalLoaded(animals));

      // for (let i = 0; i < animals.length; i++) {
      //   const userId = animals[i].user._id;
      //   if (userId === uid) {
      //     const usuario = animals.filter((animal) => animal.user._id === uid);
      //     console.log("b");
      //   } else {
      //     console.log("a");
      //     // Swal.fire({
      //     //   title: "Información",
      //     //   text: "No tienes ningún Animalito :c Crea Uno!",
      //     //   icon: "info",
      //     //   confirmButtonColor: "#17C300",
      //     //   confirmButtonText: "OK",
      //     // });
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
};
const animalLoaded = (animals) => ({
  type: types.animalLoaded,
  payload: animals,
});

const animalAddNew = (animal) => ({
  type: types.animalCreate,
  payload: animal,
});

export const animalSetActive = (animal) => ({
  type: types.animalActive,
  payload: animal,
});

export const deleteAnimal = (id) => {
  return async (dispatch) => {
    try {
      await Swal.fire({
        title: "Eliminar",
        text: "¿Estás seguro de eliminar este Animal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#17C300",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado!", "Se ha eliminado el Animal", "success");
          const resp = fetchConToken(`animals/${id}`, {}, "DELETE");
          const body = resp.json();
          if (body.ok) {
            dispatch(animalDeleted());
          } else {
            Swal.fire("Error", body.msg, "error");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const animalDeleted = () => ({ type: types.animalDelete });

export const animalsLogout = () => ({ type: types.animalLogout });
