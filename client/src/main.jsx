import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SplashScreen from './SplashScreen.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SplashScreen>
        <App />
      </SplashScreen>
    </ThemeProvider>
  </React.StrictMode>,
)
