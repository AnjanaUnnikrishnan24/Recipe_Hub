import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api/recipeApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons';

const DetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(undefined);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
        setRecipe(null);
      }
    };
    fetchRecipe();
  }, [id]);

  if (recipe === undefined) {
    return (
      <>
        <Navbar />
        <main className="pt-[180px] text-center text-gray-600 text-xl">Loading recipe...</main>
        <Footer />
      </>
    );
  }

  if (recipe === null) {
    return (
      <>
        <Navbar />
        <main className="pt-[180px] text-center text-red-600 text-xl">Recipe not found.</main>
        <Footer />
      </>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-[180px] px-4 md:px-16 py-12">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-100 object-fill" />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-orange-700 mb-4">{recipe.strMeal}</h1>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {recipe.strCategory} | <strong>Area:</strong> {recipe.strArea}
            </p>
            

            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 mb-6">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <p className="text-orange-600 text-2xl font-semibold mb-6"><strong>Instructions:</strong> </p>
            <p>{recipe.strInstructions}</p>

            {recipe.strYoutube && (
              <div className="mt-8">
                <h3 className="text-xl font-medium text-orange-600 mb-2">Watch on YouTube</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-64 md:h-96 rounded-lg"
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
          
        </div>

        <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Share this recipe</h3>
              <div className="flex justify-center gap-6 text-2xl">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://www.pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faPinterestP} />
                </a>
              </div>
            </div>
      </main>
      <Carousel />
      <Footer />
    </>
  );
};

export default DetailsPage;
