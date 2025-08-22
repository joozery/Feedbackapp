// Google Apps Script สำหรับ FeedbackForm เท่านั้น
// ใช้สำหรับแบบประเมินความพึงพอใจงาน

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  const timestamp = new Date();
  const type = 'feedback'; // ฟิกซ์เป็น feedback
  
  // ข้อมูลจากแบบประเมินความพึงพอใจงาน
  const rating = e.parameter.rating;
  const label = e.parameter.label;
  
  // เพิ่มข้อมูลลง Sheet
  sheet.appendRow([
    timestamp, 
    type, 
    rating, 
    label
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
