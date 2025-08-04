# คู่มือการใช้งานระบบแปลภาษา (Translation System Guide)

## ภาพรวม
ระบบแปลภาษาที่สร้างขึ้นใช้การสลับระหว่างภาษาไทยและอังกฤษแบบเรียบง่าย โดยไม่ต้องใช้ API แปลภาษาจากภายนอก

## โครงสร้างไฟล์

### 1. `src/hooks/useLanguage.js`
- Custom hook สำหรับจัดการการสลับภาษา
- บันทึกการตั้งค่าภาษาใน localStorage
- ฟังก์ชัน `toggleLanguage()` สำหรับสลับภาษา

### 2. `src/components/LanguageToggle.jsx`
- คอมโพเนนต์ปุ่มสลับภาษา
- แสดงไอคอนและข้อความ "TH" หรือ "EN"

### 3. `src/data/translations.js`
- ไฟล์เก็บข้อมูลการแปลภาษาไทยและอังกฤษ
- ใช้ฟังก์ชัน `getTranslation()` สำหรับดึงข้อมูล

## วิธีการใช้งาน

### 1. เพิ่มระบบแปลภาษาในคอมโพเนนต์

```jsx
import { useLanguage } from './hooks/useLanguage';
import LanguageToggle from './components/LanguageToggle';
import { getTranslation } from './data/translations';

const MyComponent = () => {
  const { language, toggleLanguage } = useLanguage();
  
  // Helper function สำหรับดึงข้อมูลแปลภาษา
  const t = (key, subKey = null) => getTranslation(language, key, subKey);
  
  return (
    <div>
      {/* ปุ่มสลับภาษา */}
      <LanguageToggle language={language} onToggle={toggleLanguage} />
      
      {/* ข้อความที่แปลได้ */}
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};
```

### 2. เพิ่มข้อมูลแปลภาษาใหม่

ในไฟล์ `src/data/translations.js`:

```javascript
export const translations = {
  th: {
    // ข้อมูลภาษาไทย
    title: 'หัวข้อภาษาไทย',
    description: 'คำอธิบายภาษาไทย'
  },
  en: {
    // ข้อมูลภาษาอังกฤษ
    title: 'English Title',
    description: 'English Description'
  }
};
```

### 3. การใช้งานกับข้อมูลแบบ Object

```javascript
// ในไฟล์ translations.js
export const translations = {
  th: {
    options: {
      option1: 'ตัวเลือกที่ 1',
      option2: 'ตัวเลือกที่ 2'
    }
  },
  en: {
    options: {
      option1: 'Option 1',
      option2: 'Option 2'
    }
  }
};

// ในคอมโพเนนต์
const optionText = t('options', 'option1'); // จะได้ "ตัวเลือกที่ 1" หรือ "Option 1"
```

## ข้อดีของระบบนี้

1. **ไม่ต้องใช้ API ภายนอก** - ประหยัดค่าใช้จ่ายและไม่ต้องกังวลเรื่อง rate limit
2. **เร็ว** - ไม่ต้องรอการแปลจากเซิร์ฟเวอร์
3. **แม่นยำ** - ข้อมูลแปลภาษาถูกต้องและสอดคล้องกับบริบท
4. **ง่ายต่อการจัดการ** - แก้ไขข้อมูลแปลภาษาได้ง่ายในไฟล์เดียว
5. **รองรับการขยาย** - เพิ่มภาษาอื่นได้ง่าย

## การขยายระบบ

### เพิ่มภาษาอื่น
```javascript
export const translations = {
  th: { /* ภาษาไทย */ },
  en: { /* ภาษาอังกฤษ */ },
  zh: { /* ภาษาจีน */ }, // เพิ่มใหม่
  ja: { /* ภาษาญี่ปุ่น */ } // เพิ่มใหม่
};
```

### เพิ่มฟีเจอร์ใหม่
- การแปลแบบ Dynamic (ใช้ API แปลภาษา)
- การบันทึกการตั้งค่าภาษาในฐานข้อมูล
- การตรวจจับภาษาของเบราว์เซอร์

## ตัวอย่างการใช้งานในฟอร์มอื่น

สำหรับฟอร์มอื่นๆ สามารถใช้ระบบเดียวกันนี้ได้ โดย:

1. Import hooks และ components ที่จำเป็น
2. เพิ่มข้อมูลแปลภาษาใน `translations.js`
3. ใช้ฟังก์ชัน `t()` แทนข้อความแบบ hardcode

```jsx
// ตัวอย่างใน FeedbackForm.jsx
const FeedbackForm = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = (key, subKey = null) => getTranslation(language, key, subKey);
  
  return (
    <div>
      <LanguageToggle language={language} onToggle={toggleLanguage} />
      <h1>{t('feedbackTitle')}</h1>
      {/* เนื้อหาอื่นๆ */}
    </div>
  );
};
``` 