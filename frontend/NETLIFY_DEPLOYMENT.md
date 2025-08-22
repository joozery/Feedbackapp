# Netlify Deployment Guide

## ปัญหาที่พบ: ข้อมูลไม่ขึ้นใน Netlify

### สาเหตุหลัก:
1. **Environment Variables ไม่ถูกโหลดใน Production**
2. **Google Sheets API Key ไม่ถูกต้อง**
3. **CORS Issues ใน Production**

## วิธีแก้ไข:

### 1. ตั้งค่า Environment Variables ใน Netlify

1. ไปที่ Netlify Dashboard
2. เลือก Project ของคุณ
3. ไปที่ **Site settings** → **Environment variables**
4. เพิ่ม Environment Variable:
   - **Key**: `VITE_GOOGLE_SHEETS_API_KEY`
   - **Value**: `AIzaSyCDE3zd-huUp7yAZGu-wNMp4_2GcdBt2E0`
5. คลิก **Save**

### 2. ตรวจสอบ Google Sheets Sharing Settings

ให้แน่ใจว่า Google Sheets ทั้ง 6 ตัวตั้งค่าเป็น:
- **"Anyone with the link can view"**

### 3. ตรวจสอบ Spreadsheet IDs

ตรวจสอบว่า Spreadsheet IDs ใน `Dashboard.jsx` ตรงกับ Google Sheets จริงๆ

### 4. Redeploy

หลังจากตั้งค่า Environment Variables แล้ว:
1. ไปที่ **Deploys** tab
2. คลิก **Trigger deploy** → **Deploy site**

### 5. ตรวจสอบ Console Logs

เปิด Browser Developer Tools → Console เพื่อดู:
- API Key ถูกโหลดหรือไม่
- Error messages จาก Google Sheets API

## การ Debug เพิ่มเติม:

### ตรวจสอบ Network Tab:
1. เปิด Developer Tools → Network
2. Refresh หน้า Dashboard
3. ดู Google Sheets API calls
4. ตรวจสอบ Response status และ error messages

### ตรวจสอบ Environment Variables:
ใน Console ควรเห็น:
```
API Key: AIzaSyCDE3zd-huUp7yAZGu-wNMp4_2GcdBt2E0
Environment Variables: {VITE_GOOGLE_SHEETS_API_KEY: "AIzaSyCDE3zd-huUp7yAZGu-wNMp4_2GcdBt2E0", ...}
```

### หากยังไม่ได้:
1. ตรวจสอบว่า Google Sheets API เปิดใช้งานแล้ว
2. ตรวจสอบ API Key ถูกต้อง
3. ตรวจสอบ Quota ของ Google Sheets API
