function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // รับข้อมูลจาก Feedback Form (แบบประเมินความพึงพอใจงาน)
  const timestamp = new Date();
  const rating = e.parameter.rating;
  const label = e.parameter.label;
  
  // บันทึกข้อมูลลงใน Google Sheets
  sheet.appendRow([timestamp, rating, label]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput("Feedback Form - Ready")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
} 