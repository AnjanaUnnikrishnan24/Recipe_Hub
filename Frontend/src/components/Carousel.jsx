import React, { useEffect, useState } from "react";
import { getRandomRecipe } from "../api/recipeApi";

const Carousel = () => {
  const [meals, setMeals] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  useEffect(() => {
    const fetchRandomMeals = async () => {
      const randomMeals = [];
      const fetchRandomMeals = async () => {
        try {
          const mealPromises = Array.from({ length: 15 }, () => getRandomRecipe());
          const results = await Promise.all(mealPromises);
          const filteredMeals = results.filter(meal => meal !== null);  
          setMeals(filteredMeals);
        } catch (error) {
          console.error("Failed to fetch random meals:", error);
        }
      };
      setMeals(randomMeals);
    };

    fetchRandomMeals();
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + visibleCount < meals.length ? prev + visibleCount : 0
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev - visibleCount >= 0 ? prev - visibleCount : Math.max(0, meals.length - visibleCount)
    );
  };

  const visibleMeals = meals.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-6">More Recipes...</h2>

      {meals.length >= visibleCount ? (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="text-3xl font-bold hover:text-orange-600"
          >
            ‹
          </button>

          <div className="flex gap-4 overflow-x-auto">
            {visibleMeals.map((meal, index) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-xl shadow-md p-3 w-52 shrink-0"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-md font-semibold">{meal.strMeal}</h3>
                <p className="text-xs text-gray-500">{meal.strCategory}</p>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-3xl font-bold hover:text-orange-600"
          >
            ›
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Loading more...</p>
      )}
    </div>
  );
};

export default Carousel;
