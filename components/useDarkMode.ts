"use client"
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const useDarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'acid' : 'dark');
  };

  return { isDarkMode: theme === 'dark', toggleDarkMode, mounted };
};

export default useDarkMode;
