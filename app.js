// ------------------ RecipeJS App (IIFE) ------------------
const RecipeApp = (() => {
    // ------------------ Data ------------------
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish.",
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
                    substeps: ["Beat eggs", "Mix with cheese"]
                },
                "Combine and serve"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken in spiced sauce.",
            ingredients: ["Chicken", "Yogurt", "Spices"],
            steps: ["Marinate chicken", "Cook sauce", "Combine"]
        }
    ];

    // ------------------ State ------------------
    let currentFilter = "all";
    let currentSort = "none";
    let searchQuery = "";
    let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
    let debounceTimer;

    // ------------------ DOM ------------------
    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filters button");
    const sortButtons = document.querySelectorAll(".sorts button");
    const searchInput = document.querySelector("#search-input");
    const clearSearchBtn = document.querySelector("#clear-search");
    const recipeCount = document.querySelector("#recipe-count");

    // ------------------ Helpers ------------------
    const renderSteps = (steps) =>
        `<ol>${steps
            .map(step =>
                typeof step === "string"
                    ? `<li>${step}</li>`
                    : `<li>${step.text}${renderSteps(step.substeps)}</li>`
            )
            .join("")}</ol>`;

    const createRecipeCard = (recipe) => `
        <div class="recipe-card">
            <button class="favorite-btn" data-id="${recipe.id}">
                ${favorites.includes(recipe.id) ? "❤️" : "🤍"}
            </button>
            <h3>${recipe.title}</h3>
            <p>${recipe.time} min | ${recipe.difficulty}</p>
            <p>${recipe.description}</p>

            <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                Show Steps
            </button>
            <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                Show Ingredients
            </button>

            <div class="steps-container" data-id="${recipe.id}">
                ${renderSteps(recipe.steps)}
            </div>

            <div class="ingredients-container" data-id="${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    const filterBySearch = (list) =>
        list.filter(r =>
            r.title.toLowerCase().includes(searchQuery) ||
            r.description.toLowerCase().includes(searchQuery) ||
            r.ingredients.some(i => i.toLowerCase().includes(searchQuery))
        );

    const filterRecipes = (list) => {
        if (currentFilter === "favorites") {
            return list.filter(r => favorites.includes(r.id));
        }
        if (currentFilter === "quick") {
            return list.filter(r => r.time <= 30);
        }
        if (currentFilter === "all") {
            return list;
        }
        return list.filter(r => r.difficulty === currentFilter);
    };

    const sortRecipes = (list) => {
        if (currentSort === "name") {
            return [...list].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
        if (currentSort === "time") {
            return [...list].sort((a, b) => a.time - b.time);
        }
        return list;
    };

    const updateDisplay = () => {
        let output = filterBySearch(recipes);
        output = filterRecipes(output);
        output = sortRecipes(output);

        recipeContainer.innerHTML = output.map(createRecipeCard).join("");
        recipeCount.textContent = `Showing ${output.length} of ${recipes.length} recipes`;
    };

    // ------------------ Events ------------------
    recipeContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("favorite-btn")) {
            const id = Number(e.target.dataset.id);
            favorites = favorites.includes(id)
                ? favorites.filter(f => f !== id)
                : [...favorites, id];

            localStorage.setItem(
                "recipeFavorites",
                JSON.stringify(favorites)
            );
            updateDisplay();
        }
    });

    searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        clearSearchBtn.style.display = e.target.value ? "block" : "none";

        debounceTimer = setTimeout(() => {
            searchQuery = e.target.value.toLowerCase();
            updateDisplay();
        }, 300);
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        updateDisplay();
    });

    filterButtons.forEach(btn =>
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            updateDisplay();
        })
    );

    sortButtons.forEach(btn =>
        btn.addEventListener("click", () => {
            sortButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentSort = btn.dataset.sort;
            updateDisplay();
        })
    );

    return { init: updateDisplay };
})();

RecipeApp.init();
