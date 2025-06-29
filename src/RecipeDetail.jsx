import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals ? data.meals[0] : null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setIsLoading(false);
      });
  }, [id]);

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measurement = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measurement} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (isLoading) return <p>Loading recipe...</p>;
  if (!meal) return <p>Recipe not found.</p>;

  return (
    <div className="recipeDetails">
      <Link to="/" className="back-to-page">← Back to Search</Link>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>

      <h3>Instructions</h3>
      <p>{meal.strInstructions}</p>

      <h3>Ingredients</h3>
      <ul>
        {getIngredients(meal).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;
