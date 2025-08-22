// Google Apps Script สำหรับ Dashboard
// ใช้ดึงข้อมูลจาก Google Sheets และส่งกลับเป็น JSON

function doGet(e) {
  try {
    // ดึงข้อมูลจาก Google Sheets
    const data = getDashboardData();
    
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: true, 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function doPost(e) {
  try {
    // ดึงข้อมูลจาก Google Sheets
    const data = getDashboardData();
    
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: true, 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

function getDashboardData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // ข้อมูลรวมทั้งหมด
  const totalResponses = getTotalResponses(spreadsheet);
  
  // ข้อมูลแต่ละฟอร์ม
  const formsData = getFormsData(spreadsheet);
  
  // ข้อมูลความพึงพอใจ
  const satisfactionData = getSatisfactionData(spreadsheet);
  
  // ข้อมูลประชากรศาสตร์
  const demographicsData = getDemographicsData(spreadsheet);
  
  return {
    totalResponses: totalResponses,
    forms: formsData,
    satisfaction: satisfactionData,
    demographics: demographicsData,
    lastUpdated: new Date().toISOString()
  };
}

function getTotalResponses(spreadsheet) {
  let total = 0;
  
  // นับจากทุก sheet
  const sheets = spreadsheet.getSheets();
  sheets.forEach(sheet => {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) { // มีข้อมูล (ไม่นับ header)
      total += (lastRow - 1);
    }
  });
  
  return total;
}

function getFormsData(spreadsheet) {
  const forms = {
    feedback: 0,
    participation: 0,
    subroom: 0,
    exhibition: 0,
    workshop: 0,
    aboutSacit: 0
  };
  
  // นับจากแต่ละ Sheet แยกกัน
  const sheets = spreadsheet.getSheets();
  sheets.forEach(sheet => {
    const sheetName = sheet.getName().toLowerCase();
    const lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      // นับตามชื่อ Sheet
      if (sheetName.includes('feedback') || sheetName.includes('ความพึงพอใจงาน')) {
        forms.feedback = lastRow - 1;
      } else if (sheetName.includes('participation') || sheetName.includes('ห้องย่อย')) {
        forms.participation = lastRow - 1;
      } else if (sheetName.includes('subroom') || sheetName.includes('นิทรรศการหลัก')) {
        forms.subroom = lastRow - 1;
      } else if (sheetName.includes('exhibition') || sheetName.includes('workshop')) {
        forms.exhibition = lastRow - 1;
      } else if (sheetName.includes('workshop') || sheetName.includes('โซน workshop')) {
        forms.workshop = lastRow - 1;
      } else if (sheetName.includes('about') || sheetName.includes('ภาพรวมงาน')) {
        forms.aboutSacit = lastRow - 1;
      }
    }
  });
  
  return forms;
}

function getSatisfactionData(spreadsheet) {
  const satisfaction = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  // ดึงข้อมูลความพึงพอใจจากทุก Sheet
  const sheets = spreadsheet.getSheets();
  sheets.forEach(sheet => {
    const sheetName = sheet.getName().toLowerCase();
    const lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
      
      data.forEach(row => {
        // หาคอลัมน์ที่มีข้อมูลความพึงพอใจ (rating, satisfaction)
        row.forEach((cell, colIndex) => {
          if (typeof cell === 'number' && cell >= 1 && cell <= 5) {
            satisfaction[cell]++;
          }
        });
      });
    }
  });
  
  return satisfaction;
}

function getDemographicsData(spreadsheet) {
  const demographics = {
    education: {
      bachelor: 0,
      master: 0,
      phd: 0,
      other: 0
    },
    age: {
      under20: 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-60': 0,
      over60: 0
    },
    occupation: {
      craftsman: 0,
      civil_servant: 0,
      business_owner: 0,
      academic: 0,
      student: 0,
      general_public: 0,
      other: 0
    }
  };
  
  // ดึงข้อมูลประชากรศาสตร์จากทุก Sheet
  const sheets = spreadsheet.getSheets();
  sheets.forEach(sheet => {
    const sheetName = sheet.getName().toLowerCase();
    const lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
      
      data.forEach(row => {
        // หาคอลัมน์ที่มีข้อมูลระดับการศึกษา
        row.forEach(cell => {
          if (typeof cell === 'string') {
            const cellLower = cell.toLowerCase();
            
            // ระดับการศึกษา
            if (cellLower.includes('bachelor') || cellLower.includes('ปริญญาตรี')) {
              demographics.education.bachelor++;
            } else if (cellLower.includes('master') || cellLower.includes('ปริญญาโท')) {
              demographics.education.master++;
            } else if (cellLower.includes('phd') || cellLower.includes('ปริญญาเอก')) {
              demographics.education.phd++;
            } else if (cellLower.includes('อื่น') || cellLower.includes('other')) {
              demographics.education.other++;
            }
            
            // อาชีพ
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
        
        // อายุ (หาจากคอลัมน์ที่มีข้อมูลอายุ)
        row.forEach((cell, colIndex) => {
          if (typeof cell === 'string') {
            const cellLower = cell.toLowerCase();
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
      });
    }
  });
  
  return demographics;
}

// ฟังก์ชันสำหรับทดสอบ
function testDashboard() {
  const data = getDashboardData();
  console.log(JSON.stringify(data, null, 2));
  return data;
}
