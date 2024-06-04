import { createManyCategories, getCategoriestIn } from "./@actions/categories";

const getCategoriesToAdd = async (initial: string[]) => {
  const categoriesIn = await getCategoriestIn(initial);
  return initial.filter((curr, order) => {
    return !categoriesIn.find((cat) => cat.libelle === curr);
  });
};

const syncCategories = async (initial: string[]) => {
    console.log("syncCategories")
  const categoriesToAdd = await getCategoriesToAdd(initial);
  await createManyCategories(categoriesToAdd);
};

export { createManyCategories, syncCategories };
