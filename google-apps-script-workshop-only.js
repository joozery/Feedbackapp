// Google Apps Script สำหรับ WorkshopForm เท่านั้น
// ใช้สำหรับแบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  const timestamp = new Date();
  const type = 'workshop'; // ฟิกซ์เป็น workshop
  
  // ข้อมูลจากแบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop
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
