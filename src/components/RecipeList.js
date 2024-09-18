import React from 'react';
import recipes from '../data/recipes';

function RecipeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <p className="text-gray-700">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;