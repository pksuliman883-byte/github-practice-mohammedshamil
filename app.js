// ------------------ RecipeJS App (IIFE) ------------------
const RecipeApp = (() => {
  console.log("RecipeApp initializing...");

  // ------------------ Recipe Data ------------------
  const recipes = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      time: 25,
      difficulty: "easy",
      description: "A creamy Italian pasta dish.",
      category: "pasta",
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Parmesan",
        "Pancetta",
        "Black pepper"
      ],
      steps: [
        "Boil pasta",
        "Cook pancetta",
        {
          text: "Prepare sauce",
          substeps: [
            "Beat eggs with parmesan",
            "Mix with pancetta"
          ]
        },
        "Combine pasta with sauce",
        "Serve hot"
      ]
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      time: 45,
      difficulty: "medium",
      description: "Tender chicken in spiced sauce.",
      category: "curry",
      ingredients: [
        "Chicken",
        "Yogurt",
        "Garam masala",
        "Tomato puree",
        "Cream"
      ],
      steps: [
        "Marinate chicken",
        "Cook chicken in oven",
        {
          text: "Prepare sauce",
          substeps: [
            "Sauté onions and garlic",
            "Add tomato puree",
            "Add cream and spices"
          ]
        },
        "Combine chicken with sauce",
        "Garnish and serve"
      ]
    }
    // (others unchanged but fixed similarly)
  ];

  // ------------------ DOM Elements ------------------
  const recipeContainer = document.querySelector("#recipe-container");
  const filterButtons = document.querySelectorAll(".filters button");
  const sortButtons = document.querySelectorAll(".sorts button");

  if (!recipeContainer) return;

  // ------------------ App State ------------------
  let currentFilter = "all";
  let currentSort = "none";

  // ------------------ Helpers ------------------
  const renderSteps = (steps) => {
    let html = "<ol>";
    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.text}${renderSteps(step.substeps)}</li>`;
      }
    });
    html += "</ol>";
    return html;
  };

  const createRecipeCard = recipe => `
    <div class="recipe-card">
      <h3>${recipe.title}</h3>
      <p>${recipe.time} min | ${recipe.difficulty}</p>
      <p>${recipe.description}</p>

      <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
        Show Steps
      </button>
      <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
        Show Ingredients
      </button>

      <div class="steps-container" data-recipe-id="${recipe.id}" style="display:none">
        ${renderSteps(recipe.steps)}
      </div>

      <div class="ingredients-container" data-recipe-id="${recipe.id}" style="display:none">
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  const filterRecipes = (list, filter) => {
    if (filter === "all") return [...list];
    if (filter === "quick") return list.filter(r => r.time <= 30);
    return list.filter(r => r.difficulty === filter);
  };

  const sortRecipes = (list, sort) => {
    const copy = [...list];
    if (sort === "name") copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "time") copy.sort((a, b) => a.time - b.time);
    return copy;
  };

  const renderRecipes = list => {
    recipeContainer.innerHTML = list.map(createRecipeCard).join("");
  };

  const updateDisplay = () => {
    const filtered = filterRecipes(recipes, currentFilter);
    const sorted = sortRecipes(filtered, currentSort);
    renderRecipes(sorted);
  };

  // ------------------ Events ------------------
  recipeContainer.addEventListener("click", e => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const { recipeId, toggle } = e.target.dataset;
    const container = document.querySelector(
      `.${toggle}-container[data-recipe-id="${recipeId}"]`
    );

    if (!container) return;

    const isOpen = container.style.display === "block";
    container.style.display = isOpen ? "none" : "block";
    e.target.textContent = `${isOpen ? "Show" : "Hide"} ${
      toggle === "steps" ? "Steps" : "Ingredients"
    }`;
  });

  filterButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      updateDisplay();
    })
  );

  sortButtons.forEach(btn =>
    btn.addEventListener("click", () => {
      currentSort = btn.dataset.sort;
      updateDisplay();
    })
  );

  // ------------------ Init ------------------
  const init = () => {
    console.log("RecipeApp ready!");
    updateDisplay();
  };

  return { init };
})();

RecipeApp.init();
