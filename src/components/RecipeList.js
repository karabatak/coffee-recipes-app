import React from 'react';
import recipes from '../data/recipes';

function RecipeList() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <img src={recipe.image} alt={recipe.name} className="w-full h-85 object-cover" />
          <div className="p-4">
            <h2 className="text-3xl font-semibold mb-2">{recipe.name}</h2>
            <p className="text-xl text-gray-700">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;