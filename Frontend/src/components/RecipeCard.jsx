// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const {
    idMeal,
    strMeal,
    strCategory,
    strMealThumb,
  } = recipe;

  return (
    <Link to={`/recipe/${idMeal}`}>
      <div className="bg-white text-center p-4 border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-bold text-gray-800">{strMeal}</h2>
        <h3 className="text-sm text-gray-500">{strCategory}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard;
