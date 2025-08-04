import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState('th'); // 'th' or 'en'

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'th' ? 'en' : 'th';
    changeLanguage(newLanguage);
  };

  return {
    language,
    changeLanguage,
    toggleLanguage,
    isThai: language === 'th',
    isEnglish: language === 'en'
  };
}; 