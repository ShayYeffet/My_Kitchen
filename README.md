# 🍳 AI Kitchen - Recipe & Drink Generator

A smart, modern web application that suggests recipes and drinks based on ingredients you have available. Perfect for reducing food waste and discovering new culinary creations!

## ✨ Features

- **Smart Ingredient Matching**: Uses fuzzy matching to find recipes even with partial ingredient names
- **Dual Mode**: Switch between food recipes and drink suggestions
- **Real-time Search**: Powered by TheMealDB and TheCocktailDB APIs
- **Match Scoring**: Shows how well each recipe matches your available ingredients
- **Quick Ingredients**: One-click addition of common ingredients
- **Recipe Details**: Complete ingredients list, step-by-step instructions, and cooking times
- **Liquid Converter**: Convert between liquid measurements for drinks (ml, oz, cups, etc.)
- **Save & Share**: Save favorite recipes and share them with others
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with a modern dark interface

## 🚀 Getting Started

### Prerequisites

- Node.js (for development server)
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-kitchen.git
cd ai-kitchen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Live Demo

🌐 **[Try AI Kitchen Live](https://your-app-name.onrender.com)**

The app is deployed on Render and ready to use!

## 🎯 How to Use

1. **Choose Mode**: Select either "Food" or "Drinks" mode
2. **Add Ingredients**: Type ingredients you have, or use quick-add buttons
3. **Set Preferences**: Optionally filter by cuisine, diet, or cooking time
4. **Generate**: Click "Find Recipes" or "Surprise Me" for random suggestions
5. **Explore**: Browse results sorted by ingredient match percentage
6. **View Details**: Click any recipe to see full ingredients and instructions
7. **Convert Liquids**: When in drinks mode, use the built-in converter for liquid measurements (oz to ml, cups to liters, etc.)
8. **Save & Share**: Save favorites or share recipes with friends

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **APIs**: TheMealDB, TheCocktailDB
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Unicode emojis for lightweight design
- **Storage**: LocalStorage for saving preferences and recipes

## 📱 Features in Detail

### Smart Matching Algorithm
- Fuzzy string matching for ingredient recognition
- Partial name matching (e.g., "tom" matches "tomatoes")
- Match percentage scoring for better results ranking

### User Experience
- Loading states and error handling
- Toast notifications for user feedback
- Responsive grid layout that adapts to screen size
- Keyboard-friendly interface

### Liquid Converter (Drinks Mode Only)
- **Liquid Volume Conversions**: ml, cc, liters, teaspoons, tablespoons, fluid ounces, cups, pints, quarts, gallons
- **Quick Reference**: Common liquid conversions at a glance (1 cup = 236.6 ml, etc.)
- **Swap Function**: Easily switch between units with one click
- **Smart Visibility**: Only appears when you're in drinks mode, keeping the food interface clean

### Data Sources
- **TheMealDB**: Free API with 1000+ recipes from around the world
- **TheCocktailDB**: Comprehensive cocktail database with detailed instructions

## 🎨 Design Philosophy

- **Minimalist**: Clean, distraction-free interface
- **Accessible**: High contrast, readable fonts, semantic HTML
- **Fast**: Optimized for quick loading and smooth interactions
- **Mobile-First**: Responsive design that works on all devices

## 🔧 Development

### Project Structure
```
ai-kitchen/
├── index.html          # Main HTML file
├── app.js             # Core application logic
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

### Key Components
- `AIKitchen` class: Main application controller
- Ingredient matching: Fuzzy search and scoring algorithms
- API integration: Async data fetching with error handling
- State management: LocalStorage persistence

## 🚀 Deployment

### Deploy to Render (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Render**:
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration
3. **Deploy**: Click "Create Web Service" and your app will be live!

### Other Deployment Options

This is a static web application that can also be deployed to:

- **Netlify**: Drag and drop the project folder or connect GitHub
- **Vercel**: Connect your Git repository for automatic deployments
- **GitHub Pages**: Enable Pages in repository settings
- **Any web server**: Upload files to public directory

### Environment Variables

No environment variables are required - the app works out of the box!

## 📋 GitHub Setup Instructions

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: AI Kitchen with liquid converter"

# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/yourusername/ai-kitchen.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select the `ai-kitchen` repository
4. Render will automatically detect the configuration from `render.yaml`
5. Click "Create Web Service"
6. Your app will be live at `https://your-app-name.onrender.com`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the amazing recipe API
- [TheCocktailDB](https://www.thecocktaildb.com/) for the cocktail database
- [Inter Font](https://rsms.me/inter/) for the beautiful typography

---

**Made with ❤️ for food lovers and home cooks everywhere!**