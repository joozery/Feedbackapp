import React, { useState } from 'react';
import {
  FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars, FaStar,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.png';
import axios from 'axios'; // ⬅️ เพิ่มตรงนี้

const ratingOptions = [
  { value: 1, label: 'น้อยมาก', icon: <FaSadTear size={32} className="text-red-500" /> },
  { value: 2, label: 'น้อย', icon: <FaFrown size={32} className="text-orange-400" /> },
  { value: 3, label: 'ปานกลาง', icon: <FaMeh size={32} className="text-yellow-400" /> },
  { value: 4, label: 'มาก', icon: <FaSmile size={32} className="text-green-500" /> },
  { value: 5, label: 'มากที่สุด', icon: <FaGrinStars size={32} className="text-emerald-500" /> },
];

const FeedbackForm = () => {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating !== null) {
      const selected = ratingOptions.find(r => r.value === rating);
      setLoading(true);
      try {
        const response = await axios.post(
          'https://script.google.com/macros/s/AKfycbyhdMEiKMxZyqdwqZRCaiie0nUCstvsMEPAF-haCJf6hqb0pAakaDc_htofmlT0Ekza/exec',
          {
            rating: rating,
            label: selected.label,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("✅ ส่งสำเร็จ", response.data);
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4 font-prompt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-3xl w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* ✅ LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="SACIT Logo" className="h-20 sm:h-24 object-contain" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4 text-center">
          แบบประเมินความพึงพอใจ
        </h1>
        <p className="mb-6 text-gray-700 text-center text-base sm:text-lg leading-relaxed">
          งาน <strong>SACIT Symposium 2025</strong> ที่จัดในครั้งนี้ ท่านมีความพึงพอใจมากน้อยเพียงใด?
        </p>

        <AnimatePresence>
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
                {ratingOptions.map((option) => (
                  <motion.label
                    key={option.value}
                    className="flex flex-col items-center cursor-pointer text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={option.value}
                      className="hidden"
                      onChange={() => setRating(option.value)}
                    />
                    <div
                      className={`rounded-full border-4 p-2 sm:p-3 transition-all duration-300 ${
                        rating === option.value
                          ? 'border-purple-600 scale-105'
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

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-base font-semibold transition disabled:opacity-50 mt-4"
                disabled={rating === null || loading}
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
    </motion.div>
  );
};

export default FeedbackForm;
