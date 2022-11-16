import React from 'react'
import { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme ] = useState(localStorage.getItem('theme') || 'light');
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        { children }
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext);


export default ThemeProvider;
