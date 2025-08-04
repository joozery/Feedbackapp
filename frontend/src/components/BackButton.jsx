import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../data/translations';

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key, subKey = null) => getTranslation(language, key, subKey);

  return (
    <button
      onClick={() => navigate('/')}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors ${className}`}
    >
      ← {t('back')}
    </button>
  );
};

export default BackButton; 