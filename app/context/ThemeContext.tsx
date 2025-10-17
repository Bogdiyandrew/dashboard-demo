"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  console.log('🎨 ThemeProvider MOUNTED');
  
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    console.log('🔄 ThemeProvider useEffect - mounting');
    setMounted(true);
    const savedTheme = localStorage.getItem('shopflow-theme') as Theme;
    if (savedTheme) {
      console.log('✅ Loaded theme from localStorage:', savedTheme);
      setTheme(savedTheme);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    console.log('🎨 Applying theme:', theme);
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('shopflow-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log('🔄 Toggle theme from:', theme, 'to:', theme === 'dark' ? 'light' : 'dark');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // CRITICAL FIX: Always provide context, even before mounted
  console.log('✅ ThemeProvider rendering with theme:', theme, 'mounted:', mounted);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  console.log('🎯 useTheme called');
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.error('❌ ERROR: useTheme called outside ThemeProvider!');
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  console.log('✅ useTheme context found:', context);
  return context;
}