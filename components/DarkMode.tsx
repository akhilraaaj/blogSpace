"use client"
import { FaMoon, FaSun } from 'react-icons/fa';
import useDarkMode from './useDarkMode';

const DarkModeButton = () => {
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode();

  if (!mounted) {
    return null;
  }

  return (
    <button className='absolute right-4 bottom-4' onClick={toggleDarkMode}>
      {isDarkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default DarkModeButton;
