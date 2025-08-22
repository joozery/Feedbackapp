function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // รับข้อมูลจาก Workshop Satisfaction Form
  const timestamp = new Date();
  const selected_workshops = e.parameter.selected_workshops;
  const satisfaction = e.parameter.satisfaction;
  const satisfaction_label = e.parameter.satisfaction_label;
  const benefits = e.parameter.benefits;
  const other_benefit = e.parameter.other_benefit;
  const suggestions = e.parameter.suggestions;
  const education_level = e.parameter.education_level;
  const age = e.parameter.age;
  const occupation = e.parameter.occupation;
  
  // บันทึกข้อมูลลงใน Google Sheets
  sheet.appendRow([
    timestamp, 
    selected_workshops, 
    satisfaction, 
    satisfaction_label, 
    benefits, 
    other_benefit, 
    suggestions, 
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
    .createTextOutput("Workshop Satisfaction Form - Ready")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
} 