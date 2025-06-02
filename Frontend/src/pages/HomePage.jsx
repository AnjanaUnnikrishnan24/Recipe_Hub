import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getRandomRecipe } from '../api/recipeApi';
import introBanner from '../assets/images/introBanner.jpg';

const HomePage = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const promises = Array.from({ length: 6 }, () => getRandomRecipe());
      const recipes = await Promise.all(promises);
      setRandomRecipes(recipes);
    };

    fetchRandomRecipes();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-[190px]">
        <section className="relative bg-orange-500 h-[80vh] flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-orange-200 bg-opacity-50 z-0"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to TastyBites</h1>
            <p className="text-xl max-w-2xl mx-auto drop-shadow-md">
              Discover trending recipes and timeless classics to satisfy every craving.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-xl transition">
              Explore Recipes
            </button>
          </div>
        </section>

        <section className="py-12 px-4 md:px-16 bg-orange-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-orange-700">About TastyBites</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              TastyBites is your go-to destination for mouthwatering recipes from around the world.
              Whether you're a seasoned chef or just starting out in the kitchen, we offer a wide range
              of recipes to suit every taste and skill level. Our mission is to inspire cooking at home
              with easy-to-follow instructions and fresh ideas. Dive into culinary adventures with us!
            </p>
          </div>
        </section>

        <section className="py-12 px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-700">Trending Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {randomRecipes.map((recipe) => (
              <div key={recipe.idMeal} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{recipe.strMeal}</h3>
                  <p className="text-sm text-gray-600 mb-4">{recipe.strCategory} | {recipe.strArea}</p>
                  <a
                    href={`/recipe/${recipe.idMeal}`}
                    className="text-orange-600 hover:text-orange-800 font-medium"
                  >
                    View Recipe →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="py-12 px-4 md:px-16 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">Contact Us</h2>
            <p className="text-center text-gray-600 mb-10">
              We'd love to hear your feedback, suggestions, or questions. Fill out the form below and we'll get back to you!
            </p>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                <input type="email" id="email" name="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea id="message" name="message" rows="4"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required ></textarea>
              </div>

              <div className="text-center">
                <button type="submit"
                  className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition mb-20"
                > Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default HomePage;
