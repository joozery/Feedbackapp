# 🔧 คู่มือการติดตั้ง Google Apps Script แยกสำหรับแต่ละฟอร์ม

## 🎯 ภาพรวม
การแยก Google Apps Script แต่ละฟอร์มจะทำให้:
- จัดการข้อมูลได้ง่ายขึ้น
- Dashboard อ่านข้อมูลได้แม่นยำ
- แก้ไขปัญหาได้ง่าย
- แต่ละฟอร์มมี URL แยกกัน

## 📋 ไฟล์ที่ต้องสร้าง

### 1. **ParticipationForm Script**
- ไฟล์: `google-apps-script-participation-only.js`
- ใช้สำหรับ: แบบประเมินการเข้าร่วมงาน
- URL ในฟอร์ม: `/participation`

### 2. **FeedbackForm Script**
- ไฟล์: `google-apps-script-feedback-only.js`
- ใช้สำหรับ: แบบประเมินความพึงพอใจงาน
- URL ในฟอร์ม: `/feedback`

### 3. **SubRoomForm Script**
- ไฟล์: `google-apps-script-subroom-only.js`
- ใช้สำหรับ: แบบประเมินการเข้าร่วมงานในห้องประชุมย่อย
- URL ในฟอร์ม: `/subroom`

### 4. **ExhibitionForm Script**
- ไฟล์: `google-apps-script-exhibition-only.js`
- ใช้สำหรับ: แบบประเมินการชมนิทรรศการหลัก
- URL ในฟอร์ม: `/exhibition`

### 5. **WorkshopForm Script**
- ไฟล์: `google-apps-script-workshop-only.js`
- ใช้สำหรับ: แบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop
- URL ในฟอร์ม: `/workshop-satisfaction`

### 6. **AboutSACITForm Script**
- ไฟล์: `google-apps-script-about-sacit-only.js`
- ใช้สำหรับ: แบบประเมินความพึงพอใจในการเยี่ยมชมนิทรรศการ About SACIT
- URL ในฟอร์ม: `/about-sacit`

## 🚀 ขั้นตอนการติดตั้ง

### ขั้นตอนที่ 1: สร้าง Google Apps Script แต่ละตัว
1. ไปที่ [Google Apps Script](https://script.google.com/)
2. สร้างโปรเจคใหม่สำหรับแต่ละฟอร์ม
3. ตั้งชื่อโปรเจคให้ชัดเจน เช่น:
   - "SACIT Participation Form API"
   - "SACIT Feedback Form API"
   - "SACIT SubRoom Form API"
   - "SACIT Exhibition Form API"
   - "SACIT Workshop Form API"
   - "SACIT About SACIT Form API"

### ขั้นตอนที่ 2: คัดลอกโค้ด
1. คัดลอกโค้ดจากไฟล์ที่สร้างให้แล้ว
2. วางในโปรเจคที่สร้าง
3. บันทึกโปรเจค

### ขั้นตอนที่ 3: Deploy เป็น Web App
1. คลิก "Deploy" → "New deployment"
2. เลือก "Web app"
3. ตั้งค่า:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. คลิก "Deploy"
5. คัดลอก URL ที่ได้

### ขั้นตอนที่ 4: อัปเดต URL ในฟอร์ม
แทนที่ URL ในแต่ละฟอร์ม:

#### ParticipationForm.jsx
```javascript
const response = await fetch(
  'YOUR_PARTICIPATION_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

#### FeedbackForm.jsx
```javascript
const response = await fetch(
  'YOUR_FEEDBACK_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

#### SubRoomForm.jsx
```javascript
const response = await fetch(
  'YOUR_SUBROOM_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

#### ExhibitionForm.jsx
```javascript
const response = await fetch(
  'YOUR_EXHIBITION_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

#### WorkshopSatisfactionForm.jsx
```javascript
const response = await fetch(
  'YOUR_WORKSHOP_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

#### AboutSACITForm.jsx
```javascript
const response = await fetch(
  'YOUR_ABOUT_SACIT_SCRIPT_URL_HERE',
  {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }
);
```

## 📊 โครงสร้าง Google Sheets

### Sheet: Participation
| Timestamp | Type | Education Level | Age | Occupation | Satisfaction | Satisfaction Label | Benefits | Other Benefit | Suggestions |
|-----------|------|-----------------|-----|------------|--------------|-------------------|----------|---------------|-------------|
| 2025-01-20 | participation | bachelor | 21-30 | student | 5 | พึงพอใจมาก | ... | ... | ... |

### Sheet: Feedback
| Timestamp | Type | Rating | Label |
|-----------|------|--------|-------|
| 2025-01-20 | feedback | 5 | มากที่สุด |

### Sheet: SubRoom
| Timestamp | Type | Education Level | Age | Occupation | Satisfaction | Satisfaction Label | Benefits | Other Benefit | Suggestions |
|-----------|------|-----------------|-----|------------|--------------|-------------------|----------|---------------|-------------|
| 2025-01-20 | subroom | master | 31-40 | academic | 4 | พึงพอใจ | ... | ... | ... |

### Sheet: Exhibition
| Timestamp | Type | Education Level | Age | Occupation | Satisfaction | Satisfaction Label | Benefits | Other Benefit | Suggestions |
|-----------|------|-----------------|-----|------------|--------------|-------------------|----------|---------------|-------------|
| 2025-01-20 | exhibition | phd | 41-50 | craftsman | 5 | พึงพอใจมาก | ... | ... | ... |

### Sheet: Workshop
| Timestamp | Type | Education Level | Age | Occupation | Satisfaction | Satisfaction Label | Benefits | Other Benefit | Suggestions |
|-----------|------|-----------------|-----|------------|--------------|-------------------|----------|---------------|-------------|
| 2025-01-20 | workshop | bachelor | 21-30 | student | 4 | พึงพอใจ | ... | ... | ... |

### Sheet: About SACIT
| Timestamp | Type | Satisfaction | Satisfaction Label | Benefits | Other Benefit | Craft Category | Reasons | Education Level | Age | Occupation |
|-----------|------|--------------|-------------------|----------|---------------|----------------|---------|-----------------|-----|------------|
| 2025-01-20 | about-sacit | 5 | พึงพอใจมาก | ... | ... | Master Craft | ... | master | 31-40 | academic |

## 🔍 การทดสอบ

### 1. ทดสอบแต่ละฟอร์ม
- ส่งข้อมูลจากแต่ละฟอร์ม
- ตรวจสอบว่าเข้าสู่ Google Sheets ถูกต้อง
- ตรวจสอบว่า URL ถูกต้อง

### 2. ทดสอบ Dashboard
- เข้าไปที่ `/dashboard`
- ตรวจสอบว่าข้อมูลแสดงถูกต้อง
- ตรวจสอบว่ากราฟแสดงถูกต้อง

## 🚨 การแก้ไขปัญหา

### 1. CORS Error
- ตรวจสอบว่า Google Apps Script มี CORS headers
- ตรวจสอบว่า `mode: 'no-cors'` ถูกต้อง

### 2. ข้อมูลไม่เข้าสู่ Sheets
- ตรวจสอบ URL ในฟอร์ม
- ตรวจสอบสิทธิ์การเข้าถึง Google Apps Script
- ตรวจสอบ console errors

### 3. Dashboard ไม่แสดงข้อมูล
- ตรวจสอบชื่อ Sheet ใน Google Sheets
- ตรวจสอบโครงสร้างข้อมูล
- ตรวจสอบ Google Apps Script Dashboard

## ✅ ข้อดีของการแยก Script

1. **จัดการง่าย**: แต่ละฟอร์มมี Script แยกกัน
2. **แก้ไขง่าย**: แก้ไขฟอร์มใดไม่กระทบฟอร์มอื่น
3. **Debug ง่าย**: หาปัญหาได้เร็ว
4. **Dashboard แม่นยำ**: อ่านข้อมูลจาก Sheet แยกกัน
5. **ความปลอดภัย**: แต่ละฟอร์มมีสิทธิ์แยกกัน

## 🎯 ขั้นตอนต่อไป

1. **Deploy Google Apps Script** ทั้งหมด
2. **อัปเดต URL** ในทุกฟอร์ม
3. **ทดสอบ** การส่งข้อมูล
4. **ทดสอบ** Dashboard
5. **ปรับแต่ง** UI/UX ตามต้องการ
