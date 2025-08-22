// Google Apps Script สำหรับ ExhibitionForm เท่านั้น
// ใช้สำหรับแบบประเมินการชมนิทรรศการหลัก

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  const timestamp = new Date();
  const type = 'exhibition'; // ฟิกซ์เป็น exhibition
  
  // ข้อมูลจากแบบประเมินการชมนิทรรศการหลัก
  const education_level = e.parameter.education_level;
  const age = e.parameter.age;
  const occupation = e.parameter.occupation;
  const satisfaction = e.parameter.satisfaction;
  const satisfaction_label = e.parameter.satisfaction_label;
  const benefits = e.parameter.benefits;
  const other_benefit = e.parameter.other_benefit;
  const suggestions = e.parameter.suggestions;
  
  // เพิ่มข้อมูลลง Sheet
  sheet.appendRow([
    timestamp, 
    type, 
    education_level, 
    age, 
    occupation, 
    satisfaction, 
    satisfaction_label, 
    benefits, 
    other_benefit, 
    suggestions
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput("ready")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
