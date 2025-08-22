function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // รับข้อมูลจาก SubRoom Form
  const timestamp = new Date();
  const education_level = e.parameter.education_level;
  const age = e.parameter.age;
  const occupation = e.parameter.occupation;
  const satisfaction = e.parameter.satisfaction;
  const satisfaction_label = e.parameter.satisfaction_label;
  const benefits = e.parameter.benefits;
  const other_benefit = e.parameter.other_benefit;
  const suggestions = e.parameter.suggestions;
  
  // บันทึกข้อมูลลงใน Google Sheets
  sheet.appendRow([
    timestamp, 
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
    .createTextOutput("SubRoom Form - Ready")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
} 