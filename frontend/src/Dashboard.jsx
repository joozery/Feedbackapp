import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaTable, 
  FaDownload, 
  FaUsers, 
  FaClipboardList,
  FaStar,
  FaLanguage
} from 'react-icons/fa';
import logo from './assets/logo.png';
import BackButton from './components/BackButton';
import LanguageToggle from './components/LanguageToggle';
import { useLanguage } from './hooks/useLanguage';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// ลงทะเบียน Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { language, toggleLanguage } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');
  const [chartType, setChartType] = useState('pie'); // 'pie' หรือ 'bar'

  // Mock data structure (แทนที่ด้วยข้อมูลจริงจาก Google Sheets)
  const mockData = {
    totalResponses: 1250,
    forms: {
      feedback: 320,
      participation: 280,
      subroom: 200,
      exhibition: 250,
      workshop: 150,
      aboutSacit: 50
    },
    satisfaction: {
      1: 45,  // ไม่พึงพอใจเลย
      2: 78,  // ไม่พึงพอใจ
      3: 156, // ปานกลาง
      4: 567, // พึงพอใจ
      5: 404  // พึงพอใจมาก
    },
    demographics: {
      education: {
        bachelor: 45,
        master: 30,
        phd: 15,
        other: 10
      },
      age: {
        under20: 15,
        '21-30': 35,
        '31-40': 25,
        '41-50': 15,
        '51-60': 8,
        over60: 2
      },
      occupation: {
        craftsman: 20,
        civil_servant: 25,
        business_owner: 15,
        academic: 20,
        student: 15,
        general_public: 5
      }
    }
  };

  // Google Sheets API Configuration
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY; // ใช้ Environment Variable
  
  // Debug: ตรวจสอบ API Key
  console.log('API Key:', API_KEY);
  console.log('Environment Variables:', import.meta.env);
  
  // ตรวจสอบว่า API Key มีค่าหรือไม่
  if (!API_KEY) {
    console.error('❌ VITE_GOOGLE_SHEETS_API_KEY ไม่ถูกตั้งค่า!');
    console.error('กรุณาตั้งค่า Environment Variable ใน Netlify Dashboard');
  } else {
    console.log('✅ API Key พร้อมใช้งาน');
  }
  const SPREADSHEETS = {
    feedback: '11CWBhfxQwoT87-G4HOSV0u7WWm7cLcH2sBmve6GwTPY',
    participation: '1my54_beZk3Blcb-IbhofkV8zmR0PliQjYLGIfv9YbNw',
    subroom: '1M5v7SExl4ycBFw7CXqv-0CLQi6tspa3cnGkp44r5hhU',
    exhibition: '1OFAJD-MzgU9VTek-D6uDUKWQ3iDRQDaJ0au6UbkmUS8',
    workshop: '1l-Io1gv-SeGd0xLEgj3qaJps5_b_f9Hmlll-MyXbOgo',
    aboutSacit: '1bgv0n5lrV6aCh7mYNHYy_sglSwfHnwV_viWezynB9Kc'
  };

  const fetchSheetData = async (spreadsheetId, sheetName) => {
    try {
      if (!API_KEY) {
        console.error(`❌ ไม่สามารถดึงข้อมูล ${sheetName} ได้ - ไม่มี API Key`);
        return [];
      }
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${API_KEY}`;
      console.log(`🔍 กำลังดึงข้อมูล ${sheetName}:`, url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${sheetName} - ได้ข้อมูล ${result.values ? result.values.length : 0} แถว`);
        return result.values || [];
      } else {
        console.error(`❌ ${sheetName} - Error ${response.status}:`, result);
        if (response.status === 403) {
          console.error('⚠️  ตรวจสอบ Google Sheets Sharing Settings');
        } else if (response.status === 400) {
          console.error('⚠️  ตรวจสอบ Spreadsheet ID หรือ Sheet Name');
        }
        return [];
      }
    } catch (error) {
      console.error(`❌ Network Error ${sheetName}:`, error);
      return [];
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // ตรวจสอบ API Key ก่อน
      if (!API_KEY) {
        console.error('❌ ไม่มี API Key - ใช้ข้อมูล Mock แทน');
        setData(mockData);
        setLoading(false);
        return;
      }
      
      console.log('🚀 เริ่มดึงข้อมูลจาก Google Sheets...');
      
      // ดึงข้อมูลจากทุก Sheet (ใช้ชื่อ Sheet ที่แท้จริง)
      const feedbackData = await fetchSheetData(SPREADSHEETS.feedback, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง
      const participationData = await fetchSheetData(SPREADSHEETS.participation, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง
      const subroomData = await fetchSheetData(SPREADSHEETS.subroom, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง
      const exhibitionData = await fetchSheetData(SPREADSHEETS.exhibition, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง
      const workshopData = await fetchSheetData(SPREADSHEETS.workshop, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง
      const aboutSacitData = await fetchSheetData(SPREADSHEETS.aboutSacit, 'Sheet1'); // หรือชื่อ Sheet ที่แท้จริง

      // คำนวณข้อมูลความพึงพอใจ
      const satisfaction = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      
      // รวมข้อมูลจากทุก Sheet - ใช้ column index ที่ถูกต้อง
      // About SACIT: Satisfaction at index 1, Participation: Satisfaction at index 5
      [...feedbackData, ...participationData, ...subroomData, ...exhibitionData, ...workshopData, ...aboutSacitData].forEach(row => {
        if (row.length > 0) {
          // ตรวจสอบ satisfaction ในหลาย column ที่เป็นไปได้
          const possibleSatisfactionIndices = [1, 5]; // About SACIT index 1, Participation index 5
          possibleSatisfactionIndices.forEach(index => {
            if (row[index] && typeof row[index] === 'string') {
              const satisfactionValue = parseInt(row[index]);
              if (!isNaN(satisfactionValue) && satisfactionValue >= 1 && satisfactionValue <= 5) {
                satisfaction[satisfactionValue]++;
              }
            }
          });
        }
      });

      // คำนวณข้อมูลประชากรศาสตร์
      const demographics = {
        education: { bachelor: 0, master: 0, phd: 0, other: 0 },
        age: { under20: 0, '21-30': 0, '31-40': 0, '41-50': 0, '51-60': 0, over60: 0 },
        occupation: { craftsman: 0, civil_servant: 0, business_owner: 0, academic: 0, student: 0, general_public: 0, other: 0 }
      };

      // วิเคราะห์ข้อมูลประชากรศาสตร์ - ใช้ column index ที่ถูกต้อง
      // About SACIT: Education at index 8, Age at index 9, Occupation at index 10
      // Participation: Education at index 2, Age at index 3, Occupation at index 4
      [...participationData, ...subroomData, ...exhibitionData, ...workshopData, ...aboutSacitData].forEach(row => {
        if (row.length > 0) {
          // ระดับการศึกษา - ตรวจสอบหลาย column
          const educationIndices = [2, 8]; // Participation index 2, About SACIT index 8
          educationIndices.forEach(index => {
            if (row[index] && typeof row[index] === 'string') {
              const cellLower = row[index].toLowerCase();
              if (cellLower.includes('bachelor') || cellLower.includes('ปริญญาตรี')) {
                demographics.education.bachelor++;
              } else if (cellLower.includes('master') || cellLower.includes('ปริญญาโท')) {
                demographics.education.master++;
              } else if (cellLower.includes('phd') || cellLower.includes('ปริญญาเอก')) {
                demographics.education.phd++;
              } else if (cellLower.includes('อื่น') || cellLower.includes('other')) {
                demographics.education.other++;
              }
            }
          });
          
          // อาชีพ - ตรวจสอบหลาย column
          const occupationIndices = [4, 10]; // Participation index 4, About SACIT index 10
          occupationIndices.forEach(index => {
            if (row[index] && typeof row[index] === 'string') {
              const cellLower = row[index].toLowerCase();
              if (cellLower.includes('craftsman') || cellLower.includes('ช่าง')) {
                demographics.occupation.craftsman++;
              } else if (cellLower.includes('civil') || cellLower.includes('ข้าราชการ')) {
                demographics.occupation.civil_servant++;
              } else if (cellLower.includes('business') || cellLower.includes('ธุรกิจ')) {
                demographics.occupation.business_owner++;
              } else if (cellLower.includes('academic') || cellLower.includes('นักวิชาการ')) {
                demographics.occupation.academic++;
              } else if (cellLower.includes('student') || cellLower.includes('นักเรียน')) {
                demographics.occupation.student++;
              } else if (cellLower.includes('general') || cellLower.includes('บุคคลทั่วไป')) {
                demographics.occupation.general_public++;
              } else if (cellLower.includes('อื่น') || cellLower.includes('other')) {
                demographics.occupation.other++;
              }
            }
          });
          
          // อายุ - ตรวจสอบหลาย column
          const ageIndices = [3, 9]; // Participation index 3, About SACIT index 9
          ageIndices.forEach(index => {
            if (row[index] && typeof row[index] === 'string') {
              const cellLower = row[index].toLowerCase();
              if (cellLower.includes('under20') || cellLower.includes('ต่ำกว่า 20')) {
                demographics.age.under20++;
              } else if (cellLower.includes('21-30')) {
                demographics.age['21-30']++;
              } else if (cellLower.includes('31-40')) {
                demographics.age['31-40']++;
              } else if (cellLower.includes('41-50')) {
                demographics.age['41-50']++;
              } else if (cellLower.includes('51-60')) {
                demographics.age['51-60']++;
              } else if (cellLower.includes('over60') || cellLower.includes('มากกว่า 60')) {
                demographics.age.over60++;
              }
            }
          });
        }
      });

      // สร้างข้อมูล Dashboard
      const dashboardData = {
        totalResponses: feedbackData.length + participationData.length + subroomData.length + 
                       exhibitionData.length + workshopData.length + aboutSacitData.length,
        forms: {
          feedback: feedbackData.length,
          participation: participationData.length,
          subroom: subroomData.length,
          exhibition: exhibitionData.length,
          workshop: workshopData.length,
          aboutSacit: aboutSacitData.length
        },
        satisfaction: satisfaction,
        demographics: demographics,
        lastUpdated: new Date().toISOString()
      };

      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching all data:', error);
      // ใช้ข้อมูล mock ถ้า API ไม่ทำงาน
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const calculateSatisfactionRate = () => {
    const total = data.satisfaction[4] + data.satisfaction[5];
    const totalAll = Object.values(data.satisfaction).reduce((a, b) => a + b, 0);
    return ((total / totalAll) * 100).toFixed(1);
  };

  // สร้างข้อมูลสำหรับกราฟแท่ง
  const getSatisfactionBarChartData = () => ({
    labels: ['ไม่พึงพอใจเลย', 'ไม่พึงพอใจ', 'ปานกลาง', 'พึงพอใจ', 'พึงพอใจมาก'],
    datasets: [
      {
        label: 'จำนวนผู้ตอบ',
        data: [
          data.satisfaction[1],
          data.satisfaction[2],
          data.satisfaction[3],
          data.satisfaction[4],
          data.satisfaction[5]
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // red-500
          'rgba(245, 158, 11, 0.8)',  // amber-500
          'rgba(156, 163, 175, 0.8)', // gray-400
          'rgba(34, 197, 94, 0.8)',   // green-500
          'rgba(59, 130, 246, 0.8)'   // blue-500
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  });

  // สร้างข้อมูลสำหรับ pie chart ระดับการศึกษา
  const getEducationPieChartData = () => ({
    labels: ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่นๆ'],
    datasets: [
      {
        data: [
          data.demographics.education.bachelor,
          data.demographics.education.master,
          data.demographics.education.phd,
          data.demographics.education.other
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // blue-500
          'rgba(147, 51, 234, 0.8)',   // purple-600
          'rgba(16, 185, 129, 0.8)',   // emerald-500
          'rgba(156, 163, 175, 0.8)'   // gray-400
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        borderWidth: 2,
      }
    ]
  });

  // สร้างข้อมูลสำหรับ pie chart อาชีพ
  const getOccupationPieChartData = () => ({
    labels: ['ช่าง', 'ข้าราชการ', 'ธุรกิจ', 'นักวิชาการ', 'นักเรียน', 'บุคคลทั่วไป', 'อื่นๆ'],
    datasets: [
      {
        data: [
          data.demographics.occupation.craftsman,
          data.demographics.occupation.civil_servant,
          data.demographics.occupation.business_owner,
          data.demographics.occupation.academic,
          data.demographics.occupation.student,
          data.demographics.occupation.general_public,
          data.demographics.occupation.other
        ],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',  // amber-500
          'rgba(59, 130, 246, 0.8)',   // blue-500
          'rgba(16, 185, 129, 0.8)',   // emerald-500
          'rgba(147, 51, 234, 0.8)',   // purple-600
          'rgba(239, 68, 68, 0.8)',    // red-500
          'rgba(34, 197, 94, 0.8)',    // green-500
          'rgba(156, 163, 175, 0.8)'   // gray-400
        ],
        borderColor: [
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        borderWidth: 2,
      }
    ]
  });

  // สร้างข้อมูลสำหรับ pie chart อายุ
  const getAgePieChartData = () => ({
    labels: ['ต่ำกว่า 20', '21-30', '31-40', '41-50', '51-60', 'มากกว่า 60'],
    datasets: [
      {
        data: [
          data.demographics.age.under20,
          data.demographics.age['21-30'],
          data.demographics.age['31-40'],
          data.demographics.age['41-50'],
          data.demographics.age['51-60'],
          data.demographics.age.over60
        ],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',   // purple-600
          'rgba(59, 130, 246, 0.8)',   // blue-500
          'rgba(16, 185, 129, 0.8)',   // emerald-500
          'rgba(245, 158, 11, 0.8)',   // amber-500
          'rgba(239, 68, 68, 0.8)',    // red-500
          'rgba(156, 163, 175, 0.8)'   // gray-400
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        borderWidth: 2,
      }
    ]
  });

  // สร้างข้อมูลสำหรับกราฟแท่งแบบประเมินแต่ละประเภท
  const getFormsBarChartData = () => ({
    labels: ['Feedback', 'Participation', 'SubRoom', 'Exhibition', 'Workshop', 'About SACIT'],
    datasets: [
      {
        label: 'จำนวนการตอบ',
        data: [
          data.forms.feedback,
          data.forms.participation,
          data.forms.subroom,
          data.forms.exhibition,
          data.forms.workshop,
          data.forms.aboutSacit
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // blue-500
          'rgba(16, 185, 129, 0.8)',   // emerald-500
          'rgba(147, 51, 234, 0.8)',   // purple-600
          'rgba(245, 158, 11, 0.8)',   // amber-500
          'rgba(239, 68, 68, 0.8)',    // red-500
          'rgba(34, 197, 94, 0.8)'     // green-500
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  });

  // สร้างข้อมูลสำหรับกราฟแท่งประชากรศาสตร์
  const getDemographicsBarChartData = () => ({
    labels: ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่นๆ'],
    datasets: [
      {
        label: 'ระดับการศึกษา',
        data: [
          data.demographics.education.bachelor,
          data.demographics.education.master,
          data.demographics.education.phd,
          data.demographics.education.other
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  });

  const getAgeBarChartData = () => ({
    labels: ['ต่ำกว่า 20', '21-30', '31-40', '41-50', '51-60', 'มากกว่า 60'],
    datasets: [
      {
        label: 'ช่วงอายุ',
        data: [
          data.demographics.age.under20,
          data.demographics.age['21-30'],
          data.demographics.age['31-40'],
          data.demographics.age['41-50'],
          data.demographics.age['51-60'],
          data.demographics.age.over60
        ],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  });

  const getOccupationBarChartData = () => ({
    labels: ['ช่าง', 'ข้าราชการ', 'ธุรกิจ', 'นักวิชาการ', 'นักเรียน', 'บุคคลทั่วไป', 'อื่นๆ'],
    datasets: [
      {
        label: 'อาชีพ',
        data: [
          data.demographics.occupation.craftsman,
          data.demographics.occupation.civil_servant,
          data.demographics.occupation.business_owner,
          data.demographics.occupation.academic,
          data.demographics.occupation.student,
          data.demographics.occupation.general_public,
          data.demographics.occupation.other
        ],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  });

  const renderSatisfactionChart = () => {
    const maxValue = Math.max(...Object.values(data.satisfaction));
    
    return (
      <div className="space-y-3">
        {Object.entries(data.satisfaction).map(([level, count]) => {
          const percentage = ((count / Object.values(data.satisfaction).reduce((a, b) => a + b, 0)) * 100).toFixed(1);
          const barWidth = (count / maxValue) * 100;
          
          return (
            <div key={level} className="flex items-center space-x-3">
              <div className="w-8 text-center font-semibold text-gray-700">
                {level}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-6 rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {count} ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDemographicsChart = (data, title) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    
    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {Object.entries(data).map(([key, value]) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-gray-700 capitalize">{key.replace('_', ' ')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-16 text-right">
                  {value} ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-indigo-800">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 p-4 font-prompt">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full">
          {/* Header */}
          <div className="flex justify-center mb-6 relative">
            <BackButton className="absolute left-0 top-1/2 transform -translate-y-1/2" />
            <LanguageToggle 
              language={language} 
              onToggle={toggleLanguage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            />
            <img src={logo} alt="SACIT Logo" className="h-20 sm:h-24 object-contain" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-2 text-center">
            SACIT Symposium 2025 - Dashboard
          </h1>
          <p className="text-lg text-indigo-700 mb-6 text-center">
            รายงานสรุปผลการประเมินความพึงพอใจ
          </p>
          
          {/* แสดงข้อความแจ้งเตือนเมื่อไม่มี API Key */}
          {!API_KEY && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    ⚠️ ข้อมูลแสดงจาก Mock Data
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>กรุณาตั้งค่า Environment Variable <code className="bg-yellow-100 px-1 rounded">VITE_GOOGLE_SHEETS_API_KEY</code> ใน Netlify Dashboard</p>
                    <p className="mt-1">ดูรายละเอียดใน <code className="bg-yellow-100 px-1 rounded">NETLIFY_DEPLOYMENT.md</code></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {[
              { id: 'overview', label: 'ภาพรวม', icon: FaChartBar },
              { id: 'satisfaction', label: 'ความพึงพอใจ', icon: FaStar },
              { id: 'demographics', label: 'ข้อมูลประชากร', icon: FaUsers },
              { id: 'forms', label: 'แบบประเมิน', icon: FaClipboardList }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Date Range Filter */}
          <div className="mb-6 text-center">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="today">วันนี้</option>
              <option value="week">สัปดาห์นี้</option>
              <option value="month">เดือนนี้</option>
            </select>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Total Responses */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-medium">รวมทั้งหมด</p>
                    <p className="text-3xl font-bold text-blue-800">{data.totalResponses}</p>
                    <p className="text-blue-600 text-sm">การตอบกลับ</p>
                  </div>
                  <FaUsers size={32} className="text-blue-600" />
                </div>
              </div>

              {/* Satisfaction Rate */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-medium">ความพึงพอใจ</p>
                    <p className="text-3xl font-bold text-green-800">{calculateSatisfactionRate()}%</p>
                    <p className="text-green-600 text-sm">พึงพอใจ-พึงพอใจมาก</p>
                  </div>
                  <FaStar size={32} className="text-green-600" />
                </div>
              </div>

              {/* Forms Completed */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 font-medium">แบบประเมิน</p>
                    <p className="text-3xl font-bold text-purple-800">6</p>
                    <p className="text-purple-600 text-sm">ประเภท</p>
                  </div>
                  <FaClipboardList size={32} className="text-purple-600" />
                </div>
              </div>

              {/* Language Usage */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 font-medium">ภาษา</p>
                    <p className="text-3xl font-bold text-orange-800">2</p>
                    <p className="text-orange-600 text-sm">ไทย/อังกฤษ</p>
                  </div>
                  <FaLanguage size={32} className="text-orange-600" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'satisfaction' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">ระดับความพึงพอใจ</h3>
                <div className="h-96">
                  <Bar 
                    data={getSatisfactionBarChartData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'ระดับความพึงพอใจของผู้ตอบแบบประเมิน'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'จำนวนผู้ตอบ'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'ระดับความพึงพอใจ'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'demographics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* ปุ่มสลับประเภทกราฟ */}
              <div className="text-center mb-6">
                <div className="inline-flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setChartType('pie')}
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      chartType === 'pie'
                        ? 'bg-white text-indigo-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📊 Pie Chart
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      chartType === 'bar'
                        ? 'bg-white text-indigo-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📈 Bar Chart
                  </button>
                </div>
              </div>

              {/* แสดงกราฟเป็น 3 card แถวเดียวกัน */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ระดับการศึกษา */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">ระดับการศึกษา</h3>
                  <div className="h-64 flex justify-center">
                    {chartType === 'pie' ? (
                      <Pie 
                        data={getEducationPieChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                            title: {
                              display: true,
                              text: 'สัดส่วนระดับการศึกษา'
                            }
                          }
                        }}
                      />
                    ) : (
                      <Bar 
                        data={getDemographicsBarChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: 'จำนวนผู้ตอบตามระดับการศึกษา'
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'จำนวนผู้ตอบ'
                              }
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* อาชีพ */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">อาชีพ</h3>
                  <div className="h-64 flex justify-center">
                    {chartType === 'pie' ? (
                      <Pie 
                        data={getOccupationPieChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                            title: {
                              display: true,
                              text: 'สัดส่วนอาชีพ'
                            }
                          }
                        }}
                      />
                    ) : (
                      <Bar 
                        data={getOccupationBarChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: 'จำนวนผู้ตอบตามอาชีพ'
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'จำนวนผู้ตอบ'
                              }
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* ช่วงอายุ */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">ช่วงอายุ</h3>
                  <div className="h-64 flex justify-center">
                    {chartType === 'pie' ? (
                      <Pie 
                        data={getAgePieChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                            title: {
                              display: true,
                              text: 'สัดส่วนช่วงอายุ'
                            }
                          }
                        }}
                      />
                    ) : (
                      <Bar 
                        data={getAgeBarChartData()}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: 'จำนวนผู้ตอบตามช่วงอายุ'
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'จำนวนผู้ตอบ'
                              }
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'forms' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">จำนวนการตอบแบบประเมินแต่ละประเภท</h3>
                <div className="h-96">
                  <Bar 
                    data={getFormsBarChartData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'จำนวนการตอบแบบประเมินแต่ละประเภท'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'จำนวนการตอบ'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'ประเภทแบบประเมิน'
                          }
                        }
                      }
                    }}
                  />
                </div>
                
                {/* แสดงข้อมูลตัวเลขเพิ่มเติม */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(data.forms).map(([form, count]) => (
                    <div key={form} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <h4 className="font-semibold text-gray-800 capitalize mb-2">
                        {form.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600">{count}</p>
                      <p className="text-sm text-gray-600">
                        {((count / data.totalResponses) * 100).toFixed(1)}% ของทั้งหมด
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Export Button */}
          <div className="mt-8 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto">
              <FaDownload size={16} />
              <span>ส่งออกรายงาน (PDF/Excel)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
