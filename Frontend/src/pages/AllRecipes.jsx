import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { searchRecipe, allCategories } from '../api/recipeApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchRecipes = async (query = '') => {
    const data = await searchRecipe(query);
    setRecipes(data || []);
  };

  const fetchCategories = async () => {
    const data = await allCategories();
    setCategories(data || []);
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchRecipes(value);
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === '') {
      fetchRecipes();
    } else {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="px-6 py-10 max-w-7xl mx-auto ">
      <h1 className="text-4xl font-black text-center text-red-550 drop-shadow-md mt-20 mb-10"> All Recipes </h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-10">
        <input type="text" placeholder="Search recipes by name..." value={searchTerm} onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select value={selectedCategory} onChange={handleCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AllRecipes;
