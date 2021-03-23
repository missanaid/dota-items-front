export const getAnimals = (animals = []) => {
  return animals.map((e) => ({
    ...e,
  }));
};
