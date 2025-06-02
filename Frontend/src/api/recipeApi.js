import axios from "axios";

export const searchRecipe = async (query) => {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  return response.data.meals;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export const getRandomRecipe = async () => {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
  return response.data.meals[0];
};

export const allCategories = async () => {
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  return response.data.categories;
};
