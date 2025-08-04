import React, { useState } from 'react';
import {
  FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars, FaStar,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.png';

const satisfactionOptions = [
  { value: 1, label: 'ไม่พึงพอใจเลย', icon: <FaSadTear size={32} className="text-red-500" /> },
  { value: 2, label: 'ไม่พึงพอใจ', icon: <FaFrown size={32} className="text-orange-400" /> },
  { value: 3, label: 'ปานกลาง', icon: <FaMeh size={32} className="text-yellow-400" /> },
  { value: 4, label: 'พึงพอใจ', icon: <FaSmile size={32} className="text-green-500" /> },
  { value: 5, label: 'พึงพอใจมาก', icon: <FaGrinStars size={32} className="text-emerald-500" /> },
];

const workshopOptions = [
  'การสร้างสรรค์ผลงานด้วยเทคนิค "ลายรดน้ำ"',
  'การสร้างสรรค์ผลงานด้วยเทคนิค "การใช้รักสีและการประดับเปลือกไข่แบบเวียดนาม"',
  'การสร้างสรรค์ผลงานด้วยเทคนิค "การเขียนลายเครื่องเขินล้านนา"',
  'การสร้างสรรค์ผลงานด้วยเทคนิค "Maki-e Japanese Urushi"',
];

const benefitOptions = [
  'องค์ความรู้และประสบการณ์การทำงานเครื่องรัก',
  'โอกาสในการสร้างเครือข่าย/พบปะผู้เชี่ยวชาญ',
  'กรณีศึกษา/การประยุกต์งานใช้จริงที่ได้เรียนรู้',
  'การแลกเปลี่ยนวัฒนธรรมระหว่างผู้เข้าร่วมงาน',
];

const educationOptions = [
  { value: 'bachelor', label: 'ปริญญาตรี / Bachelor Degrees' },
  { value: 'master', label: 'ปริญญาโท / Master Degrees' },
  { value: 'phd', label: 'ปริญญาเอก / Ph.D. (Doctor of Philosophy)' },
  { value: 'other', label: 'อื่นๆ / Other' },
];

const ageOptions = [
  { value: 'under20', label: 'ต่ำกว่า 20 ปี (Under 20 years old)' },
  { value: '21-30', label: 'ระหว่าง 21 - 30 ปี (Between 21 and 30 years old)' },
  { value: '31-40', label: 'ระหว่าง 31 - 40 ปี (Between 31 and 40 years old)' },
  { value: '41-50', label: 'ระหว่าง 41 - 50 ปี (Between 41 and 50 years old)' },
  { value: '51-60', label: 'ระหว่าง 51 - 60 ปี (Between 51 and 60 years old)' },
  { value: 'over60', label: 'มากกว่า 60 ปี (Over 60 years old)' },
];

const occupationOptions = [
  { value: 'craftsman', label: 'ผู้สร้างสรรค์งานศิลปหัตถกรรม (Craftsman or Artisan)' },
  { value: 'civil_servant', label: 'ข้าราชการ / เจ้าหน้าที่ของรัฐ (Civil Servant or Government Official)' },
  { value: 'business_owner', label: 'ธุรกิจส่วนตัว (Business Owner)' },
  { value: 'academic', label: 'นักวิชาการ (Academic)' },
  { value: 'student', label: 'นักเรียน / นักศึกษา (Student)' },
  { value: 'general_public', label: 'บุคคลทั่วไป (General Public)' },
  { value: 'other', label: 'อื่น ๆ (Others)' },
];

const WorkshopForm = ({ onBack }) => {
  const [educationLevel, setEducationLevel] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [workshops, setWorkshops] = useState([]);
  const [satisfaction, setSatisfaction] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [otherBenefit, setOtherBenefit] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWorkshopChange = (workshop) => {
    setWorkshops(prev => 
      prev.includes(workshop) 
        ? prev.filter(w => w !== workshop)
        : [...prev, workshop]
    );
  };

  const handleBenefitChange = (benefit) => {
    setBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (educationLevel && age && occupation && workshops.length > 0 && satisfaction !== null) {
      const selected = satisfactionOptions.find(r => r.value === satisfaction);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('education_level', educationLevel);
        formData.append('age', age);
        formData.append('occupation', occupation);
        formData.append('workshops', workshops.join('; '));
        formData.append('satisfaction', satisfaction);
        formData.append('satisfaction_label', selected.label);
        formData.append('benefits', benefits.join('; '));
        formData.append('other_benefit', otherBenefit);
        formData.append('suggestions', suggestions);
        formData.append('type', 'workshop');

        const response = await fetch(
          'YOUR_WORKSHOP_SCRIPT_URL', // ใส่ URL ของ Google Apps Script สำหรับ WorkshopForm
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
    <motion.div
      className="min-h-screen bg-gradient-to-br from-teal-100 to-teal-300 p-4 font-prompt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* ✅ LOGO */}
          <div className="flex justify-center mb-6 relative">
            {onBack && (
              <button
                onClick={onBack}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                ← กลับ
              </button>
            )}
            <img src={logo} alt="SACIT Logo" className="h-20 sm:h-24 object-contain" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-teal-800 mb-2 text-center">
            SACIT Symposium 2025
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-1 text-center">
            Crafting Sustainability across ASEAN and Beyond
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            ณ สถาบันส่งเสริมศิลปหัตถกรรมไทย (องค์การมหาชน) อำเภอบางไทร จังหวัดพระนครศรีอยุธยา
          </p>
          <p className="text-base font-semibold text-teal-800 mb-6 text-center">
            สำหรับการร่วมกิจกรรม Workshop ภายในงาน
          </p>

          <AnimatePresence>
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* ข้อ 1: กิจกรรม Workshop ที่เข้าร่วม */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    1. กิจกรรม Workshop ที่ท่านได้เข้าร่วม
                  </h3>
                  <div className="space-y-3">
                    {workshopOptions.map((workshop, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={workshops.includes(workshop)}
                          onChange={() => handleWorkshopChange(workshop)}
                          className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{workshop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ข้อ 2: ความพึงพอใจโดยรวม */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    2. โดยรวมแล้ว ท่านรู้สึกพึงพอใจกับประสบการณ์ที่ได้รับจากร่วมกิจกรรม Workshop ภายในงาน
                    SACIT Symposium 2025 ในระดับใด?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
                    {satisfactionOptions.map((option) => (
                      <motion.label
                        key={option.value}
                        className="flex flex-col items-center cursor-pointer text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                              ? 'border-teal-600 scale-105'
                              : 'border-transparent opacity-80'
                          }`}
                        >
                          {option.icon}
                        </div>
                        <div className="mt-2 text-xs sm:text-sm font-medium text-gray-700">
                          {option.value}. {option.label}
                        </div>
                        <div className="flex gap-[2px] mt-1 justify-center">
                          {renderStars(option.value)}
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* ข้อ 3: สิ่งที่ได้รับ */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    3. สิ่งที่ท่านได้รับจากร่วมกิจกรรม Workshop ในครั้งนี้?
                    <span className="text-sm font-normal text-gray-600"> (เลือกตอบได้มากกว่า 1 ข้อ)</span>
                  </h3>
                  <div className="space-y-3">
                    {benefitOptions.map((benefit, index) => (
                      <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={benefits.includes(benefit)}
                          onChange={() => handleBenefitChange(benefit)}
                          className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{benefit}</span>
                      </label>
                    ))}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={benefits.includes('อื่น ๆ')}
                        onChange={() => handleBenefitChange('อื่น ๆ')}
                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-gray-700">อื่น ๆ (โปรดระบุ):</span>
                      <input
                        type="text"
                        value={otherBenefit}
                        onChange={(e) => setOtherBenefit(e.target.value)}
                        placeholder="ระบุ..."
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* ข้อ 4: ข้อเสนอแนะ */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    4. ท่านมีข้อเสนอแนะเพิ่มเติม เพื่อพัฒนาการจัดงานกิจกรรม Workshop SACIT Symposium 2025
                    ในครั้งต่อไปหรือไม่?
                    <span className="text-sm font-normal text-gray-600"> (กรุณาแสดงความคิดเห็นของท่าน)</span>
                  </h3>
                  <textarea
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="กรุณาแสดงความคิดเห็นของท่าน..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                {/* ข้อมูลส่วนตัว */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    ข้อมูลส่วนตัว / Personal Information
                  </h3>
                  
                  {/* ระดับการศึกษา */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-gray-700">ระดับการศึกษา / Education Level *</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {educationOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="education"
                            value={option.value}
                            checked={educationLevel === option.value}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                          />
                          <span className="text-gray-700 text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* อายุ */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-gray-700">อายุ / Age *</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ageOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="age"
                            value={option.value}
                            checked={age === option.value}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                          />
                          <span className="text-gray-700 text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* อาชีพ */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">อาชีพ / Occupation *</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {occupationOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="occupation"
                            value={option.value}
                            checked={occupation === option.value}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                          />
                          <span className="text-gray-700 text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-base font-semibold transition disabled:opacity-50"
                  disabled={!educationLevel || !age || !occupation || workshops.length === 0 || satisfaction === null || loading}
                >
                  {loading ? "กำลังส่ง..." : "ส่งแบบประเมิน"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="thankyou"
                className="text-center text-green-600 text-lg font-semibold mt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ขอบคุณสำหรับการตอบแบบประเมินค่ะ 🙏
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkshopForm; 