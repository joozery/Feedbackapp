import React, { useState } from 'react';
import {
  FaSadTear, FaFrown, FaMeh, FaSmile, FaGrinStars, FaStar,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.png';
// import axios from 'axios'; // ไม่จำเป็นต้องใช้ axios ถ้าใช้ fetch

const ratingOptions = [
  { value: 1, label: 'น้อยมาก', icon: <FaSadTear size={32} className="text-red-500" /> },
  { value: 2, label: 'น้อย', icon: <FaFrown size={32} className="text-orange-400" /> },
  { value: 3, label: 'ปานกลาง', icon: <FaMeh size={32} className="text-yellow-400" /> },
  { value: 4, label: 'มาก', icon: <FaSmile size={32} className="text-green-500" /> },
  { value: 5, label: 'มากที่สุด', icon: <FaGrinStars size={32} className="text-emerald-500" /> },
];

const FeedbackForm = ({ onBack }) => {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // URL ของ Apps Script Web App ที่ Deploy แล้ว (ตรวจสอบให้แน่ใจว่าเป็น URL ล่าสุด)
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyvXqt4sahUzCvMIdQvCWkCQY6Z3RL1ntmAmu8I1x9nksIzCF6j-A95fvjgId8mQuIg/exec';


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating !== null) {
      const selected = ratingOptions.find(r => r.value === rating);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('label', selected.label);
        formData.append('type', 'feedback'); // เพิ่ม type เพื่อแยกประเภท

        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbz7iiLDZ4i1XALYUTXpRTCH74XgvF8oVjqXqmukWBcdZRSEZwelA0DztwhTlBtWsSm5/exec',
          {
            method: 'POST',
            body: formData,
            // ❌ ลบ mode: 'no-cors' ออก เพื่อให้ CORS ทำงานได้ถูกต้อง
            // ไม่ต้องใส่ headers: { 'Content-Type': 'multipart/form-data' } ด้วย
            // เพราะ fetch จะจัดการให้เองเมื่อใช้ FormData
          }
        );

        // ✅ ตรวจสอบ response ว่าสำเร็จหรือไม่
        // เนื่องจาก Apps Script Web App ส่ง { result: 'success' } กลับมา
        // ถ้า response.ok ไม่ได้แปลว่าสำเร็จเสมอไปเมื่อไม่มี CORS
        // เราควรตรวจสอบเนื้อหาของ response โดยตรง
        const result = await response.json(); // แปลง response เป็น JSON
        if (result && result.result === 'success') {
          console.log("✅ ส่งสำเร็จ");
          setSubmitted(true);
        } else {
          console.error("❌ ส่งข้อมูลไม่สำเร็จ (Response ไม่ใช่ success)", result);
          alert("เกิดข้อผิดพลาดในการส่งข้อมูล: " + (result.message || "ไม่ทราบสาเหตุ"));
        }
        
      } catch (error) {
        console.error("❌ ส่งข้อมูลไม่สำเร็จ (Network Error หรืออื่นๆ)", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล: โปรดลองอีกครั้ง");
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
        <div className="flex justify-center mb-6 relative">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              ← กลับ
            </button>
          )}
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