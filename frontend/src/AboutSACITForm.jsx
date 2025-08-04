import React, { useState } from 'react';
import {
  FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars, FaStar,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import { useLanguage } from './hooks/useLanguage';
import LanguageToggle from './components/LanguageToggle';
import BackButton from './components/BackButton';
import { getTranslation } from './data/translations';

const satisfactionOptions = [
  { value: 1, icon: <FaSadTear size={32} className="text-red-500" /> },
  { value: 2, icon: <FaFrown size={32} className="text-orange-400" /> },
  { value: 3, icon: <FaMeh size={32} className="text-yellow-400" /> },
  { value: 4, icon: <FaSmile size={32} className="text-green-500" /> },
  { value: 5, icon: <FaGrinStars size={32} className="text-emerald-500" /> },
];

const craftCollectionOptions = [
  {
    category: 'Master Craft',
    reasons: {
      th: [
        'เป็นงานหัตถศิลป์ที่แสดงถึงความเป็นเลิศเชิงช่าง (Craftsmanship)',
        'เป็นงานหัตถศิลป์ที่แสดงถึงการสืบสานมรดกภูมิปัญญาดั้งเดิมในแต่ละท้องถิ่น (Authenticity)'
      ],
      en: [
        'Craftsmanship - Handicrafts that demonstrate excellence in craftsmanship',
        'Authenticity - Handicrafts that demonstrate the inheritance of traditional wisdom in each locality'
      ]
    }
  },
  {
    category: 'Trendy Craft',
    reasons: {
      th: [
        'เป็นงานศิลปหัตถกรรมที่มีศักภาพในการเข้าถึงตลาด สอดคล้องกับรสนิยมของคนในยุคปัจจุบัน (Marketability)',
        'เป็นงานศิลปหัตถกรรมที่แสดงออกถึงนวัตกรรมและความคิดสร้างสรรค์ (Innovation & Creativity)'
      ],
      en: [
        'Marketability - Crafts with potential to reach the market, aligned with current tastes',
        'Innovation & Creativity - Crafts that demonstrate innovation and creativity'
      ]
    }
  },
  {
    category: 'Conscious Craft',
    reasons: {
      th: [
        'เป็นงานศิลปหัตถกรรมที่แสดงออกถึงนวัตกรรมและความคิดสร้างสรรค์ (Innovation & Creativity)',
        'เป็นงานศิลปหัตถกรรมที่คำนึงถึงสิ่งแวดล้อม ตั้งแต่กระบวนการได้มาซึ่งวัตถุดิบ กระบวนการสร้างสรรค์ และการคำนึงถึงการใช้งานและผลกระทบในระยะยาว (Sustainability)'
      ],
      en: [
        'Innovation & Creativity - Crafts that demonstrate innovation and creativity',
        'Sustainability - Crafts that consider the environment from raw material sourcing to creation process and long-term usage impact'
      ]
    }
  }
];

const AboutSACITForm = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [satisfaction, setSatisfaction] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [otherBenefit, setOtherBenefit] = useState('');
  const [selectedCraftCategory, setSelectedCraftCategory] = useState('');
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [educationLevel, setEducationLevel] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get translations
  const t = (key, subKey = null) => getTranslation(language, key, subKey);

  const handleBenefitChange = (benefit) => {
    setBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const handleCraftCategoryChange = (category) => {
    setSelectedCraftCategory(category);
    setSelectedReasons([]); // Reset reasons when category changes
  };

  const handleReasonChange = (reason) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (satisfaction !== null && educationLevel && age && occupation) {
      const selected = satisfactionOptions.find(r => r.value === satisfaction);
      const satisfactionLabel = t('satisfaction', satisfaction);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('satisfaction', satisfaction);
        formData.append('satisfaction_label', satisfactionLabel);
        formData.append('benefits', benefits.join('; '));
        formData.append('other_benefit', otherBenefit);
        formData.append('selected_craft_category', selectedCraftCategory);
        formData.append('selected_reasons', selectedReasons.join('; '));
        formData.append('education_level', educationLevel);
        formData.append('age', age);
        formData.append('occupation', occupation);

        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxA52NythTcthriVXy_J2Q8pRHWdHPAsxl1FEqqP1dOUuZZhGuF3loZQcQoOc6ZyOqAiQ/exec',
          {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
          }
        );
        
        console.log("✅ ส่งสำเร็จ");
        setSubmitted(true);
      } catch (error) {
        console.error("❌ ส่งข้อมูลไม่สำเร็จ", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStars = (count) => {
    return [...Array(count)].map((_, idx) => (
      <FaStar key={idx} className="text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 p-4 font-prompt">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full">
          {/* LOGO */}
          <div className="flex justify-center mb-6 relative">
            <BackButton className="absolute left-0 top-1/2 transform -translate-y-1/2" />
            <LanguageToggle 
              language={language} 
              onToggle={toggleLanguage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            />
            <img src={logo} alt="SACIT Logo" className="h-20 sm:h-24 object-contain" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-2 text-center">
            SACIT Symposium 2025
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-1 text-center">
            Crafting Sustainability across ASEAN and Beyond
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            {t('location')}
          </p>
          <p className="text-base font-semibold text-indigo-800 mb-6 text-center">
            {t('title')}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ข้อ 1: ความพึงพอใจโดยรวม */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('q1')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
                  {satisfactionOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex flex-col items-center cursor-pointer text-center"
                    >
                      <input
                        type="radio"
                        name="satisfaction"
                        value={option.value}
                        className="hidden"
                        onChange={() => setSatisfaction(option.value)}
                      />
                      <div
                        className={`rounded-full border-4 p-2 sm:p-3 transition-all duration-300 ${
                          satisfaction === option.value
                            ? 'border-indigo-600 scale-105'
                            : 'border-transparent opacity-80'
                        }`}
                      >
                        {option.icon}
                      </div>
                      <div className="mt-2 text-xs sm:text-sm font-medium text-gray-700">
                        {option.value}. {t('satisfaction', option.value)}
                      </div>
                      <div className="flex gap-[2px] mt-1 justify-center">
                        {renderStars(option.value)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* ข้อ 2: สิ่งที่ได้รับ */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('q2')}
                  <span className="text-sm font-normal text-gray-600">
                    {t('q2Note')}
                  </span>
                </h3>
                <div className="space-y-3">
                  {(t('benefits') || []).map((benefit, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.includes(benefit)}
                        onChange={() => handleBenefitChange(benefit)}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </label>
                  ))}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={benefits.includes(t('other'))}
                      onChange={() => handleBenefitChange(t('other'))}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">
                      {t('otherSpecify')}
                    </span>
                    <input
                      type="text"
                      value={otherBenefit}
                      onChange={(e) => setOtherBenefit(e.target.value)}
                      placeholder={t('specify')}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* ข้อ 3: SACIT Craft Collection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('q3')}
                </h3>
                <div className="space-y-6">
                  {craftCollectionOptions.map((craft, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center space-x-3 cursor-pointer mb-3">
                        <input
                          type="radio"
                          name="craft_category"
                          value={craft.category}
                          checked={selectedCraftCategory === craft.category}
                          onChange={() => handleCraftCategoryChange(craft.category)}
                          className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-lg font-semibold text-gray-800">{craft.category}</span>
                      </label>
                      
                                              {selectedCraftCategory === craft.category && (
                          <div className="ml-8 space-y-2">
                            <p className="text-sm text-gray-600 mb-3">{t('because')}</p>
                            {craft.reasons[language].map((reason, reasonIndex) => (
                              <label key={reasonIndex} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedReasons.includes(reason)}
                                  onChange={() => handleReasonChange(reason)}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-gray-700 text-sm">{reason}</span>
                              </label>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ข้อมูลส่วนตัว */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('personalInfo')}
                </h3>
                
                {/* ระดับการศึกษา */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-700">
                    {language === 'th' ? 'ระดับการศึกษา / Education Level *' : 'Education Level / ระดับการศึกษา *'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(t('education') || {}).map(([value, label]) => (
                      <label key={value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="education"
                          value={value}
                          checked={educationLevel === value}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* อายุ */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-700">
                    {language === 'th' ? 'อายุ / Age *' : 'Age / อายุ *'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(t('age') || {}).map(([value, label]) => (
                      <label key={value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="age"
                          value={value}
                          checked={age === value}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* อาชีพ */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">
                    {language === 'th' ? 'อาชีพ / Occupation *' : 'Occupation / อาชีพ *'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(t('occupation') || {}).map(([value, label]) => (
                      <label key={value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="occupation"
                          value={value}
                          checked={occupation === value}
                          onChange={(e) => setOccupation(e.target.value)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-base font-semibold transition disabled:opacity-50"
                disabled={satisfaction === null || !educationLevel || !age || !occupation || loading}
              >
                {loading ? t('sending') : t('submit')}
              </button>
            </form>
          ) : (
            <div className="text-center text-green-600 text-lg font-semibold mt-6">
              {t('thankYou')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSACITForm; 