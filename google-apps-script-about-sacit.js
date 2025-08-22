function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // รับข้อมูลจาก About SACIT Form
  const timestamp = new Date();
  const satisfaction = e.parameter.satisfaction;
  const satisfaction_label = e.parameter.satisfaction_label;
  const benefits = e.parameter.benefits;
  const other_benefit = e.parameter.other_benefit;
  const selected_craft_category = e.parameter.selected_craft_category;
  const selected_reasons = e.parameter.selected_reasons;
  const education_level = e.parameter.education_level;
  const age = e.parameter.age;
  const occupation = e.parameter.occupation;
  
  // บันทึกข้อมูลลงใน Google Sheets
  sheet.appendRow([
    timestamp, 
    satisfaction, 
    satisfaction_label, 
    benefits, 
    other_benefit, 
    selected_craft_category, 
    selected_reasons, 
    education_level, 
    age, 
    occupation
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput("About SACIT Form - Ready")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
} 