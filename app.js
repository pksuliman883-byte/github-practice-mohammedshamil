const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    time: 25,
    difficulty: "easy",
    description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    time: 45,
    difficulty: "medium",
    description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
    category: "curry"
  },
  {
    id: 3,
    title: "Homemade Croissants",
    time: 180,
    difficulty: "hard",
    description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
    category: "baking"
  },
  {
    id: 4,
    title: "Greek Salad",
    time: 15,
    difficulty: "easy",
    description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
    category: "salad"
  },
  {
    id: 5,
    title: "Beef Wellington",
    time: 120,
    difficulty: "hard",
    description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
    category: "meat"
  },
  {
    id: 6,
    title: "Vegetable Stir Fry",
    time: 20,
    difficulty: "easy",
    description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
    category: "vegetarian"
  },
  {
    id: 7,
    title: "Pad Thai",
    time: 30,
    difficulty: "medium",
    description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
    category: "noodles"
  },
  {
    id: 8,
    title: "Margherita Pizza",
    time: 60,
    difficulty: "medium",
    description: "Classic Italian pizza topped with fresh tomatoes, mozzarella, and basil.",
    category: "pizza"
  }
];


// Select container
const recipeContainer = document.querySelector(&#39;#recipe-container&#39;);
// Function to create HTML for one recipe card
const createRecipeCard = (recipe) =&gt; {
return `
&lt;div class=&quot;recipe-card&quot; data-id=&quot;${recipe.id}&quot;&gt;
&lt;h3&gt;${recipe.title}&lt;/h3&gt;
&lt;div class=&quot;recipe-meta&quot;&gt;
&lt;span&gt;⏱️ ${recipe.time} min&lt;/span&gt;
&lt;span class=&quot;difficulty
${recipe.difficulty}&quot;&gt;${recipe.difficulty}&lt;/span&gt;
&lt;/div&gt;
&lt;p&gt;${recipe.description}&lt;/p&gt;
&lt;/div&gt;
`;
};
// Function to render all recipes
const renderRecipes = (recipesToRender) =&gt; {
recipeContainer.innerHTML =
recipesToRender.map(createRecipeCard).join(&#39;&#39;);
};
// Initialize app
renderRecipes(recipes);