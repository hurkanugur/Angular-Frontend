export const environment = {
  production: false,
  
  // FastAPI backend URL
  apiUrl: 'http://localhost:8000',

  // Default theme for the app
  defaultTheme: 'blue',
  isDefaultDarkMode: false,

  // Default language for the app
  defaultLanguage: 'en',

  // Feature flags
  features: {
    enableDeepLearningStats: true,
    enableMultiLanguage: true,
    enableThemeSwitching: true
  }
};
