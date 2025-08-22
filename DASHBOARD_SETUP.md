# 📊 คู่มือการตั้งค่า Dashboard สำหรับ SACIT Feedback App

## 🎯 ภาพรวม
Dashboard นี้จะแสดงรายงานสรุปผลการประเมินความพึงพอใจจากฟอร์มต่างๆ ในรูปแบบกราฟและสถิติ

## 🚀 การติดตั้ง

### 1. สร้าง Google Apps Script
1. ไปที่ [Google Apps Script](https://script.google.com/)
2. สร้างโปรเจคใหม่
3. เปลี่ยนชื่อเป็น "SACIT Dashboard API"
4. คัดลอกโค้ดจาก `google-apps-script-dashboard.js` ไปวาง
5. บันทึกโปรเจค

### 2. Deploy เป็น Web App
1. คลิก "Deploy" → "New deployment"
2. เลือก "Web app"
3. ตั้งค่า:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. คลิก "Deploy"
5. คัดลอก URL ที่ได้ (จะใช้สำหรับเรียก API)

### 3. อัปเดต Dashboard.jsx
แทนที่ URL ใน `Dashboard.jsx`:

```javascript
// แทนที่ URL นี้ด้วย URL ที่ได้จาก Google Apps Script
const DASHBOARD_API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(DASHBOARD_API_URL);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // ใช้ข้อมูล mock ถ้า API ไม่ทำงาน
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

## 📋 โครงสร้างข้อมูลที่คาดหวัง

### Response Format
```json
{
  "totalResponses": 1250,
  "forms": {
    "feedback": 320,
    "participation": 280,
    "subroom": 200,
    "exhibition": 250,
    "workshop": 150,
    "aboutSacit": 50
  },
  "satisfaction": {
    "1": 45,
    "2": 78,
    "3": 156,
    "4": 567,
    "5": 404
  },
  "demographics": {
    "education": {
      "bachelor": 45,
      "master": 30,
      "phd": 15,
      "other": 10
    },
    "age": {
      "under20": 15,
      "21-30": 35,
      "31-40": 25,
      "41-50": 15,
      "51-60": 8,
      "over60": 2
    },
    "occupation": {
      "craftsman": 20,
      "civil_servant": 25,
      "business_owner": 15,
      "academic": 20,
      "student": 15,
      "general_public": 5,
      "other": 0
    }
  },
  "lastUpdated": "2025-01-20T10:30:00.000Z"
}
```

## 🔧 การปรับแต่ง

### 1. เพิ่มฟอร์มใหม่
ใน `getFormsData()` function:
```javascript
const forms = {
  feedback: 0,
  participation: 0,
  subroom: 0,
  exhibition: 0,
  workshop: 0,
  aboutSacit: 0,
  newForm: 0  // เพิ่มฟอร์มใหม่
};
```

### 2. เพิ่มข้อมูลประชากรศาสตร์
ใน `getDemographicsData()` function:
```javascript
const demographics = {
  education: { /* ... */ },
  age: { /* ... */ },
  occupation: { /* ... */ },
  newCategory: {  // เพิ่มหมวดหมู่ใหม่
    option1: 0,
    option2: 0
  }
};
```

### 3. ปรับแต่ง UI
ใน `Dashboard.jsx`:
- เปลี่ยนสี theme
- เพิ่ม/ลบ tabs
- ปรับขนาดกราฟ
- เพิ่มฟิลเตอร์ใหม่

## 📊 ฟีเจอร์ที่มี

### 1. ภาพรวม (Overview)
- จำนวนการตอบกลับทั้งหมด
- อัตราความพึงพอใจ
- จำนวนประเภทฟอร์ม
- การใช้งานภาษา

### 2. ความพึงพอใจ (Satisfaction)
- กราฟแท่งแสดงระดับความพึงพอใจ 1-5
- เปอร์เซ็นต์แต่ละระดับ
- สีไล่ระดับจากแดง (ไม่พึงพอใจ) ไปเขียว (พึงพอใจมาก)

### 3. ข้อมูลประชากรศาสตร์ (Demographics)
- ระดับการศึกษา
- ช่วงอายุ
- อาชีพ
- แสดงเป็นกราฟแท่งแนวนอน

### 4. แบบประเมิน (Forms)
- จำนวนการตอบแต่ละประเภทฟอร์ม
- เปอร์เซ็นต์เทียบกับทั้งหมด
- แสดงในรูปแบบ grid cards

## 🎨 การปรับแต่ง Theme

### สีหลัก
```css
/* Indigo theme */
--primary: #4f46e5;
--primary-light: #818cf8;
--primary-dark: #3730a3;

/* สามารถเปลี่ยนเป็นสีอื่นได้ */
--primary: #059669;  /* Green */
--primary: #dc2626;  /* Red */
--primary: #7c3aed;  /* Purple */
```

### ฟอนต์
```css
/* ใช้ Prompt font จาก Google Fonts */
font-family: 'Prompt', sans-serif;
```

## 📱 Responsive Design
- **Mobile**: 1 คอลัมน์
- **Tablet**: 2 คอลัมน์
- **Desktop**: 3-4 คอลัมน์

## 🚨 การแก้ไขปัญหา

### 1. CORS Error
ตรวจสอบว่า Google Apps Script มี CORS headers ถูกต้อง

### 2. ข้อมูลไม่แสดง
- ตรวจสอบ URL API
- ตรวจสอบ console errors
- ใช้ข้อมูล mock เป็น fallback

### 3. กราฟไม่แสดง
- ตรวจสอบโครงสร้างข้อมูล
- ตรวจสอบ console errors
- ตรวจสอบ CSS classes

## 🔄 การอัปเดตข้อมูล
ข้อมูลจะอัปเดตอัตโนมัติเมื่อ:
- เปิดหน้า Dashboard
- เปลี่ยน tabs
- เปลี่ยน date range filter

## 📈 การส่งออกรายงาน
ปุ่ม "ส่งออกรายงาน" พร้อมใช้งาน (ต้องเพิ่มฟังก์ชัน export PDF/Excel)

## 🎯 การพัฒนาต่อ
- เพิ่มกราฟแบบอื่น (Pie chart, Line chart)
- เพิ่มการเปรียบเทียบช่วงเวลา
- เพิ่มการส่งออกรายงาน
- เพิ่มการแจ้งเตือนเมื่อมีข้อมูลใหม่
