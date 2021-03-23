import { types } from "../types/types";

const initialState = {
  animals: [],
  animalActive: null,
};

export const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.animalActive:
      return {
        ...state,
        animalActive: action.payload,
      };

    case types.animalCreate:
      return {
        ...state,
        animals: [...state.animals, action.payload],
      };
    case types.animalClearActive:
      return {
        ...state,
        animalActive: null,
      };

    case types.animalUpdate:
      return {
        ...state,
        animals: state.animals.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.animalDelete:
      return {
        ...state,
        animals: state.animals.filter((e) => e.id !== state.animalActive.id),
        animalActive: null,
      };

    case types.animalLoaded:
      return {
        ...state,
        animals: [...action.payload],
      };

    case types.animalLogout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
