class AIKitchen {
    constructor() {
        this.state = {
            mode: 'food',
            ingredients: [],
            results: [],
            selectedRecipe: null,
            loading: false,
            theme: 'dark',
            timer: null,
            timerSeconds: 0,
            timerRunning: false
        };
        
        this.quickIngredients = {
            food: [
                'chicken', 'beef', 'fish', 'eggs', 'rice', 'pasta', 'potatoes',
                'onions', 'garlic', 'tomatoes', 'cheese', 'milk', 'flour', 'oil'
            ],
            drinks: [
                'vodka', 'rum', 'gin', 'whiskey', 'lime', 'lemon', 'orange juice',
                'cranberry juice', 'soda water', 'tonic', 'mint', 'sugar', 'ice'
            ]
        };
        
        // Kosher dietary laws - non-kosher ingredients to filter out
        this.nonKosherIngredients = [
            // Pork products
            'pork', 'bacon', 'ham', 'prosciutto', 'pancetta', 'chorizo', 'sausage',
            // Shellfish
            'shrimp', 'lobster', 'crab', 'oyster', 'clam', 'mussel', 'scallop', 'crawfish',
            // Other non-kosher seafood
            'eel', 'catfish', 'shark', 'swordfish',
            // Mixed meat and dairy indicators
            'cheeseburger', 'meat and cheese', 'beef and cheese', 'chicken parmesan'
        ];
        
        // Ingredients that indicate meat and dairy mixing (not kosher)
        this.meatAndDairyMixing = [
            'parmesan', 'mozzarella', 'cheddar', 'cheese', 'cream', 'butter', 'milk'
        ];
        
        // Developer's favorite recipes
        this.elCaminoRecipe = {
            id: 'dev-choice-el-camino',
            title: 'El Camino',
            image: 'https://preview.redd.it/k6w3agfzbl561.jpg?width=1080&crop=smart&auto=webp&s=2105dba42e5e0eeb8f8a599157cd2236cfa6b7f5',
            ingredients: [
                { name: 'Rye whiskey', measure: '1 oz', full: '1 oz Rye whiskey' },
                { name: 'Mezcal', measure: '1 oz', full: '1 oz Mezcal' },
                { name: 'Bénédictine', measure: '½ oz', full: '½ oz Bénédictine' },
                { name: 'Peychaud\'s bitters', measure: '4 dashes', full: '4 dashes Peychaud\'s bitters' }
            ],
            instructions: [
                'Combine all ingredients in a mixing glass',
                'Add ice and stir with a barspoon until well chilled',
                'Strain over one large ice cube into an Old Fashioned glass',
                'Express orange peel oils over the drink and drop in as garnish',
                'Serve immediately'
            ],
            meta: {
                category: 'Classic Cocktail',
                alcoholic: 'Alcoholic',
                glass: 'Old Fashioned',
                time: 3,
                servings: 1,
                difficulty: 'Intermediate',
                flavor: 'Smoky, Herbal, Complex'
            },
            matchScore: 100,
            isDeveloperChoice: true
        };

        this.chineseCornSoupRecipe = {
            id: 'dev-choice-chinese-corn-soup',
            title: 'Chinese Corn Soup by Chef Israel Aharoni',
            image: 'https://d3o5sihylz93ps.cloudfront.net/app/uploads/2018/09/14190011/homeubuntureleasesrelease_20180906092839migrationtmp1536239829-thCYJw.jpg',
            ingredients: [
                { name: 'Oil', measure: '3 tbsp', full: '3 tbsp Oil' },
                { name: 'Chili pepper', measure: '1 medium', full: '1 medium Chili pepper, finely chopped' },
                { name: 'Ginger root', measure: '2 cm', full: '2 cm Fresh ginger root, grated' },
                { name: 'Chicken stock', measure: '5 cups', full: '5 cups Chicken stock (or 3 tbsp chicken soup powder + 1L boiling water)' },
                { name: 'Corn', measure: '1 bag', full: '1 frozen bag corn or 2 big cans canned corn' },
                { name: 'Chicken breast', measure: '300g', full: '300g Chicken breast, sliced thin' },
                { name: 'Soy sauce', measure: '3 tbsp', full: '3 tbsp Soy sauce' },
                { name: 'White sugar', measure: '1 tbsp', full: '1 tbsp White sugar' },
                { name: 'Fine salt', measure: '0.5 tbsp', full: '0.5 tbsp Fine salt' },
                { name: 'Black pepper', measure: '0.25 tbsp', full: '0.25 tbsp Ground black pepper' },
                { name: 'Eggs', measure: '2 large', full: '2 large eggs, beaten' },
                { name: 'Cornflour', measure: '1 tbsp', full: '1 tbsp Cornflour + 3 tbsp water' },
                { name: 'Green onions', measure: '2 stalks', full: '2 Green onion stalks, chopped' },
                { name: 'Sesame oil', measure: '1 tbsp', full: '1 tbsp Sesame oil for serving' }
            ],
            instructions: [
                'Finely chop the chili pepper. Peel and grate the ginger using a microplane',
                'Heat oil in a large pot and lightly sauté the chili and ginger',
                'Add the chicken stock to the pot and stir',
                'Add the corn kernels to the pot',
                'Add soy sauce and sugar, season with salt and pepper, cook for about 10 minutes',
                'Slice chicken into thin strips, add to pot and cook for 1 minute',
                'In a small bowl, mix cornflour with 3 tablespoons water',
                'Slowly add cornflour mixture to pot while stirring until desired thickness',
                'Beat eggs in a small bowl and pour into pot in thin stream while whisking with fork',
                'Turn off heat immediately after adding eggs',
                'Chop green onions and sprinkle on top',
                'Add a few drops of sesame oil and serve in bowls',
                'Chef\'s tip: Blend part of soup with immersion blender for thicker texture if desired'
            ],
            meta: {
                cuisine: 'Chinese',
                category: 'Soup',
                time: 25,
                servings: 4,
                difficulty: 'Easy',
                chef: 'Israel Aharoni'
            },
            matchScore: 100,
            isDeveloperChoice: true
        };
        
        // Common ingredient suggestions for smart autocomplete
        this.commonIngredients = [
            'chicken breast', 'ground beef', 'salmon', 'shrimp', 'eggs', 'tofu',
            'rice', 'pasta', 'quinoa', 'bread', 'potatoes', 'sweet potatoes',
            'onions', 'garlic', 'tomatoes', 'bell peppers', 'carrots', 'broccoli',
            'spinach', 'mushrooms', 'zucchini', 'cucumber', 'avocado',
            'cheese', 'milk', 'butter', 'cream', 'yogurt', 'mozzarella',
            'olive oil', 'coconut oil', 'soy sauce', 'vinegar', 'lemon juice',
            'salt', 'pepper', 'garlic powder', 'paprika', 'cumin', 'oregano',
            'basil', 'thyme', 'rosemary', 'parsley', 'cilantro'
        ];

        // Liquid unit conversion data
        this.liquidUnits = {
            'ml': { name: 'Milliliters (ml)', factor: 1 },
            'cc': { name: 'Cubic Centimeters (cc)', factor: 1 },
            'l': { name: 'Liters (l)', factor: 1000 },
            'tsp': { name: 'Teaspoons (tsp)', factor: 4.92892 },
            'tbsp': { name: 'Tablespoons (tbsp)', factor: 14.7868 },
            'fl-oz': { name: 'Fluid Ounces (fl oz)', factor: 29.5735 },
            'cup': { name: 'Cups', factor: 236.588 },
            'pint': { name: 'Pints (pt)', factor: 473.176 },
            'quart': { name: 'Quarts (qt)', factor: 946.353 },
            'gallon': { name: 'Gallons (gal)', factor: 3785.41 }
        };

        this.liquidConversionHints = [
            '1 cup = 236.6 ml',
            '1 fl oz = 29.6 ml', 
            '1 tbsp = 14.8 ml',
            '1 tsp = 4.9 ml',
            '3 tsp = 1 tbsp'
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateQuickIngredients();
        this.updateFilters();
        this.initUnitConverter();
        this.initLiquidConverterVisibility();
        this.loadSavedState();
        this.initTheme();
    }

    bindEvents() {
        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMode(e.target.dataset.mode);
            });
        });

        // Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateRecipes();
        });

        // Surprise button
        document.getElementById('surpriseBtn').addEventListener('click', () => {
            this.surpriseMe();
        });

        // Developer's Choice button
        document.getElementById('developerChoiceBtn').addEventListener('click', () => {
            this.showDeveloperChoice();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Ingredients input with smart suggestions
        document.getElementById('ingredientsInput').addEventListener('input', (e) => {
            this.updateIngredients(e.target.value);
            this.showSmartSuggestions(e.target.value);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateRecipes();
            } else if (e.key === 'Escape') {
                this.clearIngredients();
            }
        });

        // Timer controls
        document.getElementById('pauseTimer')?.addEventListener('click', () => {
            this.toggleTimer();
        });
        
        document.getElementById('resetTimer')?.addEventListener('click', () => {
            this.resetTimer();
        });
        
        document.getElementById('closeTimer')?.addEventListener('click', () => {
            this.closeTimer();
        });

        // Ingredients input
        document.getElementById('ingredientsInput').addEventListener('input', (e) => {
            this.updateIngredients(e.target.value);
        });

        // Quick ingredients
        document.getElementById('quickIngredients').addEventListener('click', (e) => {
            if (e.target.classList.contains('ingredient-tag')) {
                this.addQuickIngredient(e.target.textContent);
            }
        });

        // Liquid converter events
        document.getElementById('fromValue').addEventListener('input', () => {
            this.convertLiquids();
        });

        document.getElementById('fromUnit').addEventListener('change', () => {
            this.convertLiquids();
        });

        document.getElementById('toUnit').addEventListener('change', () => {
            this.convertLiquids();
        });

        document.getElementById('swapUnits').addEventListener('click', () => {
            this.swapLiquidUnits();
        });
    }

    setMode(mode) {
        this.state.mode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        document.getElementById('detailsTitle').textContent = 
            mode === 'food' ? '📖 Recipe Details' : '🍹 Drink Details';
        
        // Update button text immediately
        const btn = document.getElementById('generateBtn');
        const btnText = btn.querySelector('.btn-text');
        btnText.textContent = mode === 'food' ? 'Find Recipes' : 'Find Drinks';
        
        // Update developer's choice note
        const developerNote = document.getElementById('developerNote');
        if (developerNote) {
            developerNote.textContent = mode === 'food' ? 'My favorite soup recipe' : 'My favorite cocktail';
        }
        
        // Show/hide liquid converter based on mode
        const liquidConverterSection = document.querySelector('.liquid-converter-section');
        if (liquidConverterSection) {
            liquidConverterSection.style.display = mode === 'drinks' ? 'block' : 'none';
        }
        
        this.updateQuickIngredients();
        this.updateFilters();
        this.clearResults();
        this.saveState();
    }

    updateQuickIngredients() {
        const container = document.getElementById('quickIngredients');
        const ingredients = this.quickIngredients[this.state.mode];
        
        container.innerHTML = ingredients.map(ingredient => 
            `<span class="ingredient-tag">${ingredient}</span>`
        ).join('');
    }

    updateFilters() {
        const container = document.getElementById('filtersContainer');
        
        if (this.state.mode === 'food') {
            container.innerHTML = `
                <div class="filter-group">
                    <label for="dietSelect">Dietary</label>
                    <select class="filter-select" id="dietSelect">
                        <option value="any">Any Diet</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="kosher">Kosher</option>
                        <option value="gluten-free">Gluten Free</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                    </select>
                </div>
            `;
        } else {
            // Drinks mode - alcoholic filter
            container.innerHTML = `
                <div class="filter-group">
                    <label for="alcoholicSelect">Alcohol Content</label>
                    <select class="filter-select" id="alcoholicSelect">
                        <option value="any">Any</option>
                        <option value="alcoholic">Alcoholic</option>
                        <option value="non alcoholic">Non-Alcoholic</option>
                        <option value="optional alcohol">Optional Alcohol</option>
                    </select>
                </div>
            `;
        }
    }

    addQuickIngredient(ingredient) {
        const input = document.getElementById('ingredientsInput');
        const current = input.value.trim();
        const ingredients = current ? current.split(',').map(s => s.trim()) : [];
        
        if (!ingredients.includes(ingredient)) {
            ingredients.push(ingredient);
            input.value = ingredients.join(', ');
            this.updateIngredients(input.value);
        }
    }

    updateIngredients(value) {
        this.state.ingredients = value
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 0);
        
        this.saveState();
    }

    async generateRecipes() {
        if (this.state.ingredients.length === 0) {
            this.showToast('Please enter some ingredients first!', 'warning');
            return;
        }

        this.setLoading(true);
        this.showLoadingSkeletons();
        
        try {
            let recipes;
            if (this.state.mode === 'food') {
                recipes = await this.fetchFoodRecipes();
            } else {
                recipes = await this.fetchDrinkRecipes();
            }
            
            this.state.results = recipes;
            this.renderResults();
            
            if (recipes.length > 0) {
                this.selectRecipe(recipes[0]);
                this.showToast(`Found ${recipes.length} ${this.state.mode === 'food' ? 'recipes' : 'drinks'}!`);
            } else {
                this.showToast('No recipes found. Try different ingredients!', 'warning');
            }
        } catch (error) {
            console.error('Error generating recipes:', error);
            this.showToast('Something went wrong. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async fetchFoodRecipes() {
        const recipes = [];
        
        // Fetch from TheMealDB
        for (const ingredient of this.state.ingredients.slice(0, 3)) {
            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
                );
                const data = await response.json();
                
                if (data.meals) {
                    for (const meal of data.meals.slice(0, 5)) {
                        const details = await this.fetchMealDetails(meal.idMeal);
                        if (details) {
                            const recipe = this.mapMealToRecipe(details);
                            const matchData = this.calculateMatchScore(recipe.ingredients);
                            recipe.matchScore = matchData.percentage;
                            recipe.matchData = matchData;
                            recipes.push(recipe);
                        }
                    }
                }
            } catch (error) {
                console.error(`Error fetching recipes for ${ingredient}:`, error);
            }
        }
        
        // Remove duplicates and sort by match score
        const uniqueRecipes = recipes.filter((recipe, index, self) => 
            index === self.findIndex(r => r.id === recipe.id)
        );
        
        // Apply dietary filters
        const filteredRecipes = this.applyDietaryFilters(uniqueRecipes);
        
        return filteredRecipes
            .sort((a, b) => {
                // First priority: More total matches
                if (a.matchData.totalMatches !== b.matchData.totalMatches) {
                    return b.matchData.totalMatches - a.matchData.totalMatches;
                }
                // Second priority: Higher percentage
                if (a.matchScore !== b.matchScore) {
                    return b.matchScore - a.matchScore;
                }
                // Third priority: More exact matches
                return b.matchData.exactMatches - a.matchData.exactMatches;
            })
            .slice(0, 12);
    }

    async fetchDrinkRecipes() {
        const drinks = [];
        
        // Fetch from TheCocktailDB
        for (const ingredient of this.state.ingredients.slice(0, 3)) {
            try {
                const response = await fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
                );
                const data = await response.json();
                
                if (data.drinks) {
                    for (const drink of data.drinks.slice(0, 5)) {
                        const details = await this.fetchDrinkDetails(drink.idDrink);
                        if (details) {
                            const recipe = this.mapDrinkToRecipe(details);
                            const matchData = this.calculateMatchScore(recipe.ingredients);
                            recipe.matchScore = matchData.percentage;
                            recipe.matchData = matchData;
                            drinks.push(recipe);
                        }
                    }
                }
            } catch (error) {
                console.error(`Error fetching drinks for ${ingredient}:`, error);
            }
        }
        
        // Remove duplicates and sort by match score
        const uniqueDrinks = drinks.filter((drink, index, self) => 
            index === self.findIndex(d => d.id === drink.id)
        );
        
        // Apply dietary filters (drinks are generally kosher unless they contain non-kosher ingredients)
        const filteredDrinks = this.applyDietaryFilters(uniqueDrinks);
        
        return filteredDrinks
            .sort((a, b) => {
                // First priority: More total matches
                if (a.matchData.totalMatches !== b.matchData.totalMatches) {
                    return b.matchData.totalMatches - a.matchData.totalMatches;
                }
                // Second priority: Higher percentage
                if (a.matchScore !== b.matchScore) {
                    return b.matchScore - a.matchScore;
                }
                // Third priority: More exact matches
                return b.matchData.exactMatches - a.matchData.exactMatches;
            })
            .slice(0, 12);
    }

    async fetchMealDetails(id) {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error(`Error fetching meal details for ${id}:`, error);
            return null;
        }
    }

    async fetchDrinkDetails(id) {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await response.json();
            return data.drinks ? data.drinks[0] : null;
        } catch (error) {
            console.error(`Error fetching drink details for ${id}:`, error);
            return null;
        }
    }

    mapMealToRecipe(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient.trim(),
                    measure: measure ? measure.trim() : '',
                    full: measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
                });
            }
        }

        const instructions = meal.strInstructions
            ? meal.strInstructions.split(/\r?\n+/).map(s => s.trim()).filter(Boolean)
            : [];

        return {
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb || `https://source.unsplash.com/400x300/?${encodeURIComponent(meal.strMeal)}`,
            ingredients,
            instructions,
            meta: {
                cuisine: meal.strArea || 'International',
                category: meal.strCategory || 'Main Course',
                time: this.estimateTime(instructions.length),
                servings: 4,
                difficulty: this.calculateDifficulty(instructions.length, ingredients.length),
                method: this.detectCookingMethod(instructions.join(' '))
            }
        };
    }

    mapDrinkToRecipe(drink) {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient.trim(),
                    measure: measure ? measure.trim() : '',
                    full: measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
                });
            }
        }

        const instructions = drink.strInstructions
            ? drink.strInstructions.split(/\r?\n+/).map(s => s.trim()).filter(Boolean)
            : [];

        return {
            id: drink.idDrink,
            title: drink.strDrink,
            image: drink.strDrinkThumb || `https://source.unsplash.com/400x300/?${encodeURIComponent(drink.strDrink)}`,
            ingredients,
            instructions,
            meta: {
                category: drink.strCategory || 'Cocktail',
                alcoholic: drink.strAlcoholic || 'Unknown',
                glass: drink.strGlass || 'Glass',
                time: 5,
                servings: 1,
                difficulty: 'Easy',
                method: 'Mixed'
            }
        };
    }

    calculateMatchScore(recipeIngredients) {
        const userIngredients = this.state.ingredients;
        let matches = 0;
        let exactMatches = 0;
        
        for (const ingredient of recipeIngredients) {
            const name = ingredient.name.toLowerCase();
            let foundMatch = false;
            
            for (const ui of userIngredients) {
                if (name.includes(ui) || ui.includes(name)) {
                    matches++;
                    exactMatches++;
                    foundMatch = true;
                    break;
                } else if (this.fuzzyMatch(name, ui)) {
                    matches++;
                    foundMatch = true;
                    break;
                }
            }
        }
        
        // Calculate percentage based on recipe ingredients
        const percentage = Math.round((matches / recipeIngredients.length) * 100);
        
        // Store additional data for better sorting
        return {
            percentage,
            exactMatches,
            totalMatches: matches,
            totalIngredients: recipeIngredients.length
        };
    }

    fuzzyMatch(str1, str2) {
        const threshold = 0.7;
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length >= threshold;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    applyDietaryFilters(recipes) {
        let filteredRecipes = recipes;
        
        if (this.state.mode === 'food') {
            // Apply dietary filter
            const dietFilter = document.getElementById('dietSelect')?.value || 'any';
            if (dietFilter !== 'any') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    switch (dietFilter) {
                        case 'kosher':
                            return this.isKosher(recipe);
                        case 'vegetarian':
                            return this.isVegetarian(recipe);
                        case 'vegan':
                            return this.isVegan(recipe);
                        case 'gluten-free':
                            return this.isGlutenFree(recipe);
                        default:
                            return true;
                    }
                });
            }
        } else {
            // Apply alcoholic filter for drinks
            const alcoholicFilter = document.getElementById('alcoholicSelect')?.value || 'any';
            if (alcoholicFilter !== 'any') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    const alcoholic = recipe.meta.alcoholic?.toLowerCase() || '';
                    return alcoholic.includes(alcoholicFilter.toLowerCase());
                });
            }
        }
        
        return filteredRecipes;
    }

    isKosher(recipe) {
        const allIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
        const title = recipe.title.toLowerCase();
        const instructions = recipe.instructions.join(' ').toLowerCase();
        const fullText = `${allIngredients} ${title} ${instructions}`;
        
        // Check for explicitly non-kosher ingredients
        for (const nonKosher of this.nonKosherIngredients) {
            if (fullText.includes(nonKosher.toLowerCase())) {
                return false;
            }
        }
        
        // Check for meat and dairy mixing
        const hasMeat = this.containsMeat(fullText);
        const hasDairy = this.containsDairy(fullText);
        
        // If it has both meat and dairy, it's not kosher
        if (hasMeat && hasDairy) {
            return false;
        }
        
        return true;
    }

    containsMeat(text) {
        const meatKeywords = [
            'beef', 'chicken', 'turkey', 'lamb', 'veal', 'duck', 'goose',
            'meat', 'steak', 'ground beef', 'chicken breast', 'thigh'
        ];
        return meatKeywords.some(meat => text.includes(meat));
    }

    containsDairy(text) {
        const dairyKeywords = [
            'cheese', 'milk', 'cream', 'butter', 'yogurt', 'sour cream',
            'parmesan', 'mozzarella', 'cheddar', 'ricotta', 'cottage cheese'
        ];
        return dairyKeywords.some(dairy => text.includes(dairy));
    }

    isVegetarian(recipe) {
        const allIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
        const title = recipe.title.toLowerCase();
        const fullText = `${allIngredients} ${title}`;
        
        const meatKeywords = [
            'beef', 'chicken', 'pork', 'fish', 'turkey', 'lamb', 'veal', 'duck',
            'meat', 'bacon', 'ham', 'sausage', 'shrimp', 'lobster', 'crab'
        ];
        
        return !meatKeywords.some(meat => fullText.includes(meat));
    }

    isVegan(recipe) {
        if (!this.isVegetarian(recipe)) return false;
        
        const allIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
        const title = recipe.title.toLowerCase();
        const fullText = `${allIngredients} ${title}`;
        
        const animalProducts = [
            'cheese', 'milk', 'cream', 'butter', 'egg', 'honey', 'yogurt'
        ];
        
        return !animalProducts.some(product => fullText.includes(product));
    }

    isGlutenFree(recipe) {
        const allIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase()).join(' ');
        const title = recipe.title.toLowerCase();
        const fullText = `${allIngredients} ${title}`;
        
        const glutenIngredients = [
            'flour', 'wheat', 'bread', 'pasta', 'noodles', 'barley', 'rye',
            'soy sauce', 'beer', 'breadcrumb'
        ];
        
        return !glutenIngredients.some(gluten => fullText.includes(gluten));
    }

    showSmartSuggestions(input) {
        const container = document.getElementById('inputSuggestions');
        const words = input.toLowerCase().split(',').map(s => s.trim());
        const currentWord = words[words.length - 1];
        
        if (currentWord.length < 2) {
            container.style.display = 'none';
            return;
        }

        const suggestions = this.commonIngredients
            .filter(ingredient => 
                ingredient.toLowerCase().includes(currentWord) && 
                !words.slice(0, -1).includes(ingredient.toLowerCase())
            )
            .slice(0, 5);

        if (suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-ingredient="${suggestion}">${suggestion}</div>`
        ).join('');
        
        container.style.display = 'block';

        // Add click handlers
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const ingredient = item.dataset.ingredient;
                const newWords = [...words.slice(0, -1), ingredient];
                document.getElementById('ingredientsInput').value = newWords.join(', ') + ', ';
                this.updateIngredients(newWords.join(', '));
                container.style.display = 'none';
            });
        });
    }

    clearIngredients() {
        document.getElementById('ingredientsInput').value = '';
        this.updateIngredients('');
        document.getElementById('inputSuggestions').style.display = 'none';
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        document.getElementById('themeToggle').textContent = this.state.theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', this.state.theme);
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.state.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    startTimer(minutes) {
        this.state.timerSeconds = minutes * 60;
        this.state.timerRunning = true;
        document.getElementById('timerModal').style.display = 'flex';
        this.updateTimerDisplay();
        
        this.state.timer = setInterval(() => {
            if (this.state.timerRunning && this.state.timerSeconds > 0) {
                this.state.timerSeconds--;
                this.updateTimerDisplay();
                
                if (this.state.timerSeconds === 0) {
                    this.timerComplete();
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.state.timerSeconds / 60);
        const seconds = this.state.timerSeconds % 60;
        document.getElementById('timerDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    toggleTimer() {
        this.state.timerRunning = !this.state.timerRunning;
        document.getElementById('pauseTimer').textContent = this.state.timerRunning ? 'Pause' : 'Resume';
    }

    resetTimer() {
        this.state.timerSeconds = 0;
        this.state.timerRunning = false;
        this.updateTimerDisplay();
        document.getElementById('pauseTimer').textContent = 'Pause';
    }

    closeTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.state.timer = null;
        }
        this.state.timerRunning = false;
        document.getElementById('timerModal').style.display = 'none';
    }

    timerComplete() {
        this.state.timerRunning = false;
        document.getElementById('pauseTimer').textContent = 'Pause';
        this.showToast('⏰ Timer finished! Your dish should be ready!', 'success');
        
        // Play notification sound (if supported)
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('AI Kitchen Timer', {
                body: 'Your cooking timer has finished!',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍳</text></svg>'
            });
        }
    }

    showLoadingSkeletons() {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = Array(6).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-image loading-skeleton"></div>
                <div class="skeleton-text loading-skeleton"></div>
                <div class="skeleton-text short loading-skeleton"></div>
            </div>
        `).join('');
    }

    showDeveloperChoice() {
        // Clear ingredients input
        document.getElementById('ingredientsInput').value = '';
        this.updateIngredients('');
        
        // Show different recipe based on current mode
        if (this.state.mode === 'food') {
            this.state.results = [this.chineseCornSoupRecipe];
            this.renderResults();
            this.selectRecipe(this.chineseCornSoupRecipe);
            this.showToast("🍲 Here's the developer's favorite Chinese corn soup by Chef Israel Aharoni!", 'success');
        } else {
            this.state.results = [this.elCaminoRecipe];
            this.renderResults();
            this.selectRecipe(this.elCaminoRecipe);
            this.showToast("🥃 Here's the developer's favorite cocktail - El Camino!", 'success');
        }
    }

    estimateTime(instructionCount) {
        if (instructionCount <= 3) return 15;
        if (instructionCount <= 6) return 30;
        if (instructionCount <= 10) return 45;
        return 60;
    }

    calculateDifficulty(instructionCount, ingredientCount) {
        const complexity = instructionCount + (ingredientCount * 0.5);
        if (complexity <= 8) return 'easy';
        if (complexity <= 15) return 'medium';
        return 'hard';
    }

    detectCookingMethod(instructions) {
        const text = instructions.toLowerCase();
        if (text.includes('bake') || text.includes('oven')) return 'baked';
        if (text.includes('fry') || text.includes('oil')) return 'fried';
        if (text.includes('grill')) return 'grilled';
        if (text.includes('steam')) return 'steamed';
        if (text.includes('roast')) return 'roasted';
        if (text.includes('sauté') || text.includes('pan')) return 'sautéed';
        return 'mixed';
    }

    renderResults() {
        const container = document.getElementById('resultsContainer');
        
        if (this.state.results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">😔</div>
                    <p>No ${this.state.mode} found with those ingredients</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.state.results.map(recipe => `
            <div class="recipe-card ${recipe.isDeveloperChoice ? 'developer-choice' : ''}" data-id="${recipe.id}">
                ${recipe.image ? `<img src="${recipe.image}" alt="${this.escapeHtml(recipe.title)}" class="recipe-image ${recipe.isDeveloperChoice ? (this.state.mode === 'drinks' ? 'developer-choice-drink' : 'developer-choice-food') : ''}" loading="lazy">` : ''}
                <h3>${this.escapeHtml(recipe.title)} ${recipe.isDeveloperChoice ? '⭐' : ''}</h3>
                <div class="recipe-meta">
                    ${recipe.isDeveloperChoice 
                        ? `<span class="developer-badge">Developer's Choice</span>`
                        : `<span class="match-score">${recipe.matchScore}% match</span>`
                    }
                    <span class="difficulty-badge difficulty-${recipe.meta.difficulty}">${recipe.meta.difficulty}</span>
                    <span>⏱️ ${recipe.meta.time} min</span>
                    ${this.state.mode === 'food' 
                        ? `<span>🍽️ ${recipe.meta.cuisine}</span>`
                        : `<span>🥃 ${recipe.meta.category}</span>`
                    }
                </div>
            </div>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const recipe = this.state.results.find(r => r.id === id);
                if (recipe) {
                    this.selectRecipe(recipe);
                }
            });
        });
    }

    selectRecipe(recipe) {
        this.state.selectedRecipe = recipe;
        
        // Update selected state in UI
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.id === recipe.id);
        });
        
        this.renderRecipeDetails();
        this.saveState();
    }

    renderRecipeDetails() {
        const recipe = this.state.selectedRecipe;
        if (!recipe) return;

        const container = document.getElementById('recipeDetails');
        const userIngredients = this.state.ingredients;
        
        container.innerHTML = `
            <div class="recipe-header">
                <div>
                    <h3 class="recipe-title">${this.escapeHtml(recipe.title)}</h3>
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.meta.time} min</span>
                        <span>👥 ${recipe.meta.servings} ${recipe.meta.servings === 1 ? 'serving' : 'servings'}</span>
                        ${this.state.mode === 'food' 
                            ? `<span>🌍 ${recipe.meta.cuisine}</span>`
                            : `<span>🥃 ${recipe.meta.category}</span>`
                        }
                    </div>
                </div>
                <div class="recipe-actions">
                    <button class="recipe-timer" onclick="app.startTimer(${recipe.meta.time})">⏰ Timer</button>
                </div>
            </div>
            
            <h4>📝 Ingredients</h4>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ingredient => {
                    const hasIngredient = userIngredients.some(ui => 
                        ingredient.name.toLowerCase().includes(ui) || 
                        ui.includes(ingredient.name.toLowerCase()) ||
                        this.fuzzyMatch(ingredient.name.toLowerCase(), ui)
                    );
                    return `
                        <li>
                            <div class="ingredient-check">${hasIngredient ? '✓' : ''}</div>
                            <span>${this.escapeHtml(ingredient.full)}</span>
                        </li>
                    `;
                }).join('')}
            </ul>
            
            <h4>👨‍🍳 Instructions</h4>
            <ol class="instructions-list">
                ${recipe.instructions.map(instruction => `
                    <li>${this.escapeHtml(instruction)}</li>
                `).join('')}
            </ol>
        `;
    }

    surpriseMe() {
        let surpriseIngredients;
        
        if (this.state.mode === 'food') {
            const dietFilter = document.getElementById('dietSelect')?.value || 'any';
            
            if (dietFilter === 'vegan') {
                surpriseIngredients = [
                    ['chickpeas', 'tahini', 'lemon', 'garlic'],
                    ['tofu', 'soy sauce', 'ginger', 'vegetables'],
                    ['lentils', 'tomatoes', 'onions', 'spices'],
                    ['quinoa', 'vegetables', 'olive oil', 'herbs'],
                    ['pasta', 'tomatoes', 'basil', 'olive oil'],
                    ['rice', 'beans', 'peppers', 'onions'],
                    ['mushrooms', 'garlic', 'herbs', 'potatoes'],
                    ['avocado', 'lime', 'cilantro', 'tomatoes']
                ];
            } else if (dietFilter === 'vegetarian') {
                surpriseIngredients = [
                    ['eggs', 'cheese', 'spinach', 'herbs'],
                    ['pasta', 'tomatoes', 'basil', 'parmesan'],
                    ['rice', 'vegetables', 'cheese', 'herbs'],
                    ['potatoes', 'cheese', 'onions', 'herbs'],
                    ['mushrooms', 'cream', 'garlic', 'herbs'],
                    ['chickpeas', 'yogurt', 'spices', 'onions'],
                    ['quinoa', 'vegetables', 'feta', 'olive oil'],
                    ['lentils', 'tomatoes', 'cheese', 'herbs']
                ];
            } else if (dietFilter === 'kosher') {
                surpriseIngredients = [
                    ['chicken', 'garlic', 'lemon', 'herbs'],
                    ['beef', 'onions', 'potatoes', 'herbs'],
                    ['fish', 'dill', 'lemon', 'vegetables'],
                    ['rice', 'vegetables', 'olive oil', 'herbs'],
                    ['chickpeas', 'tahini', 'lemon', 'garlic'],
                    ['potatoes', 'onions', 'herbs', 'oil'],
                    ['quinoa', 'vegetables', 'herbs', 'olive oil'],
                    ['lentils', 'tomatoes', 'onions', 'spices']
                ];
            } else if (dietFilter === 'gluten-free') {
                surpriseIngredients = [
                    ['chicken', 'rice', 'vegetables', 'herbs'],
                    ['fish', 'quinoa', 'lemon', 'vegetables'],
                    ['beef', 'potatoes', 'carrots', 'herbs'],
                    ['eggs', 'cheese', 'vegetables', 'herbs'],
                    ['rice', 'beans', 'peppers', 'onions'],
                    ['quinoa', 'vegetables', 'olive oil', 'herbs'],
                    ['potatoes', 'cheese', 'onions', 'herbs'],
                    ['chickpeas', 'vegetables', 'spices', 'olive oil']
                ];
            } else {
                // Default food combinations (any diet)
                surpriseIngredients = [
                    ['chicken', 'garlic', 'lemon', 'herbs'],
                    ['beef', 'onions', 'potatoes', 'carrots'],
                    ['pasta', 'tomatoes', 'basil', 'cheese'],
                    ['rice', 'vegetables', 'ginger'],
                    ['eggs', 'flour', 'oil'],
                    ['salmon', 'dill', 'lemon', 'asparagus'],
                    ['chickpeas', 'tahini', 'lemon', 'garlic'],
                    ['eggplant', 'tomatoes', 'onions', 'herbs']
                ];
            }
        } else {
            // Drinks mode - respect alcoholic filter
            const alcoholicFilter = document.getElementById('alcoholicSelect')?.value || 'any';
            
            if (alcoholicFilter === 'non alcoholic') {
                surpriseIngredients = [
                    ['orange juice', 'cranberry juice', 'soda water'],
                    ['lemon juice', 'sugar', 'mint', 'soda water'],
                    ['apple juice', 'cinnamon', 'ginger'],
                    ['pineapple juice', 'coconut milk', 'lime'],
                    ['ginger beer', 'lime', 'mint'],
                    ['tomato juice', 'celery', 'lemon', 'worcestershire sauce']
                ];
            } else {
                // Default alcoholic combinations
                surpriseIngredients = [
                    ['vodka', 'cranberry juice', 'lime'],
                    ['rum', 'mint', 'lime', 'sugar'],
                    ['gin', 'tonic', 'lime'],
                    ['whiskey', 'lemon', 'honey'],
                    ['tequila', 'lime', 'salt'],
                    ['champagne', 'orange juice']
                ];
            }
        }
        
        const selected = surpriseIngredients[Math.floor(Math.random() * surpriseIngredients.length)];
        
        document.getElementById('ingredientsInput').value = selected.join(', ');
        this.updateIngredients(selected.join(', '));
        this.generateRecipes();
    }



    setLoading(loading) {
        this.state.loading = loading;
        const btn = document.getElementById('generateBtn');
        const btnText = btn.querySelector('.btn-text');
        
        if (loading) {
            btn.disabled = true;
            btnText.innerHTML = '<span class="loading"></span> Searching...';
        } else {
            btn.disabled = false;
            btnText.textContent = this.state.mode === 'food' ? 'Find Recipes' : 'Find Drinks';
        }
    }

    clearResults() {
        this.state.results = [];
        this.state.selectedRecipe = null;
        
        document.getElementById('resultsContainer').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <p>Enter some ingredients to get started!</p>
            </div>
        `;
        
        document.getElementById('recipeDetails').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👨‍🍳</div>
                <p>Select a ${this.state.mode === 'food' ? 'recipe' : 'drink'} to see the details</p>
            </div>
        `;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveState() {
        const state = {
            mode: this.state.mode,
            ingredients: this.state.ingredients,
            selectedRecipeId: this.state.selectedRecipe?.id,
            theme: this.state.theme
        };
        localStorage.setItem('aiKitchenState', JSON.stringify(state));
    }

    loadSavedState() {
        try {
            const saved = localStorage.getItem('aiKitchenState');
            if (saved) {
                const state = JSON.parse(saved);
                if (state.mode) {
                    this.setMode(state.mode);
                }
                if (state.ingredients?.length) {
                    document.getElementById('ingredientsInput').value = state.ingredients.join(', ');
                    this.updateIngredients(state.ingredients.join(', '));
                }
                if (state.theme) {
                    this.state.theme = state.theme;
                }
            }
        } catch (error) {
            console.error('Error loading saved state:', error);
        }
    }

    // Liquid Converter Methods
    initUnitConverter() {
        this.updateLiquidUnits();
        this.updateLiquidConversions();
        this.convertLiquids();
    }

    initLiquidConverterVisibility() {
        // Hide liquid converter initially (starts in food mode)
        const liquidConverterSection = document.querySelector('.liquid-converter-section');
        if (liquidConverterSection) {
            liquidConverterSection.style.display = 'none';
        }
    }

    updateLiquidUnits() {
        const fromSelect = document.getElementById('fromUnit');
        const toSelect = document.getElementById('toUnit');
        
        // Clear existing options
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        // Add liquid unit options
        Object.keys(this.liquidUnits).forEach(unitKey => {
            const unit = this.liquidUnits[unitKey];
            const fromOption = new Option(unit.name, unitKey);
            const toOption = new Option(unit.name, unitKey);
            fromSelect.add(fromOption);
            toSelect.add(toOption);
        });
        
        // Set default selections (ml to fl-oz for common conversion)
        fromSelect.value = 'ml';
        toSelect.value = 'fl-oz';
    }

    convertLiquids() {
        const fromValue = parseFloat(document.getElementById('fromValue').value) || 0;
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;
        const resultElement = document.getElementById('toValue');
        
        if (!fromUnit || !toUnit) {
            resultElement.textContent = '0';
            return;
        }
        
        const fromFactor = this.liquidUnits[fromUnit].factor;
        const toFactor = this.liquidUnits[toUnit].factor;
        
        // Convert to base unit (ml) then to target unit
        const baseValue = fromValue * fromFactor;
        const result = baseValue / toFactor;
        
        // Format result nicely
        if (result === 0) {
            resultElement.textContent = '0';
        } else if (result < 0.01) {
            resultElement.textContent = result.toExponential(2);
        } else if (result < 1) {
            resultElement.textContent = result.toFixed(3);
        } else if (result < 100) {
            resultElement.textContent = result.toFixed(2);
        } else {
            resultElement.textContent = Math.round(result * 100) / 100;
        }
    }

    convertTemperature(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
            default:
                celsius = value;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'fahrenheit':
                return celsius * 9/5 + 32;
            case 'kelvin':
                return celsius + 273.15;
            default:
                return celsius;
        }
    }

    updateLiquidConversions() {
        const container = document.getElementById('quickConversions');
        
        container.innerHTML = `
            <h5>Quick Reference</h5>
            <div class="conversion-hints">
                ${this.liquidConversionHints.map(hint => `<div>${hint}</div>`).join('')}
            </div>
        `;
    }

    swapLiquidUnits() {
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        const fromValue = document.getElementById('fromValue');
        const toValue = document.getElementById('toValue');
        
        // Swap the unit selections
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        
        // Swap the values
        const tempValue = fromValue.value;
        fromValue.value = toValue.textContent;
        
        // Convert with new values
        this.convertLiquids();
    }
}

// Initialize the app
const app = new AIKitchen();

// Make app globally available for inline event handlers
window.app = app;