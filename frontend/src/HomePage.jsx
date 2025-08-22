import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaUsers, FaChalkboardTeacher, FaPalette, FaTools, FaBuilding } from 'react-icons/fa';
import logo from './assets/logo.png';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-300 p-4 font-prompt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-4xl w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* ✅ LOGO */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="SACIT Logo" className="h-24 sm:h-28 object-contain" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-6 text-center">
          SACIT Symposium 2025
        </h1>
        <p className="mb-8 text-gray-700 text-center text-lg sm:text-xl leading-relaxed">
          กรุณาเลือกแบบประเมินที่ต้องการตอบ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* แบบประเมินความพึงพอใจงาน */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/feedback')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaClipboardList size={48} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-purple-800 mb-3 text-center">
              แบบประเมินความพึงพอใจงาน
            </h2>
            <p className="text-purple-700 text-center leading-relaxed">
              ประเมินความพึงพอใจต่อการจัดงาน SACIT Symposium 2025
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>

          {/* แบบประเมินความพึงพอใจในการเข้าร่วมงาน */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/participation')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaUsers size={48} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-3 text-center">
              แบบประเมินการเข้าร่วมงาน
            </h2>
            <p className="text-blue-700 text-center leading-relaxed">
              ประเมินความพึงพอใจและสิ่งที่ได้รับจากกิจกรรมในห้องประชุมใหญ่
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>

          {/* แบบประเมินการเข้าร่วมงานในห้องประชุมย่อย */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 cursor-pointer hover:border-green-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/subroom')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaChalkboardTeacher size={48} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-3 text-center">
              แบบประเมินการเข้าร่วมงานในห้องประชุมย่อย
            </h2>
            <p className="text-green-700 text-center leading-relaxed">
              ประเมินความพึงพอใจและสิ่งที่ได้รับจากกิจกรรมในห้องประชุมย่อย
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>

          {/* แบบประเมินการชมนิทรรศการหลัก */}
          <motion.div
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 cursor-pointer hover:border-orange-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/exhibition')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaPalette size={48} className="text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-orange-800 mb-3 text-center">
              แบบประเมินการชมนิทรรศการหลัก
            </h2>
            <p className="text-orange-700 text-center leading-relaxed">
              ประเมินความพึงพอใจและสิ่งที่ได้รับจากนิทรรศการ "Lacquer Legacy"
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>

          {/* แบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop */}
          <motion.div
            className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border-2 border-teal-200 cursor-pointer hover:border-teal-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/workshop-satisfaction')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaTools size={48} className="text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-teal-800 mb-3 text-center">
              แบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop
            </h2>
            <p className="text-teal-700 text-center leading-relaxed">
              ประเมินความพึงพอใจและสิ่งที่ได้รับจากกิจกรรม Workshop ภายในงาน
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>

          {/* แบบประเมินความพึงพอใจในการเยี่ยมชมนิทรรศการ About SACIT */}
          <motion.div
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border-2 border-indigo-200 cursor-pointer hover:border-indigo-400 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/about-sacit')}
          >
            <div className="flex items-center justify-center mb-4">
              <FaBuilding size={48} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-indigo-800 mb-3 text-center">
              แบบประเมินความพึงพอใจในการเยี่ยมชมนิทรรศการ About SACIT
            </h2>
            <p className="text-indigo-700 text-center leading-relaxed">
              ประเมินความพึงพอใจและสิ่งที่ได้รับจากนิทรรศการเกี่ยวกับองค์กร
            </p>
            <div className="mt-4 text-center">
              <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold">
                เลือกแบบประเมินนี้
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Button */}
        <div className="mt-8 text-center">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 ดูรายงานสรุป (Dashboard)
          </motion.button>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2025 SACIT Symposium. All rights reserved.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage; 