function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // รับข้อมูลจาก FormData
  const type = e.parameter.type || 'unknown';
  const timestamp = new Date();
  
  if (type === 'participation') {
    // ข้อมูลจากแบบประเมินการเข้าร่วมงาน
    const education_level = e.parameter.education_level;
    const age = e.parameter.age;
    const occupation = e.parameter.occupation;
    const satisfaction = e.parameter.satisfaction;
    const satisfaction_label = e.parameter.satisfaction_label;
    const benefits = e.parameter.benefits;
    const other_benefit = e.parameter.other_benefit;
    const suggestions = e.parameter.suggestions;
    
    sheet.appendRow([timestamp, type, education_level, age, occupation, satisfaction, satisfaction_label, benefits, other_benefit, suggestions]);
    
  } else if (type === 'exhibition') {
    // ข้อมูลจากแบบประเมินการชมนิทรรศการหลัก
    const education_level = e.parameter.education_level;
    const age = e.parameter.age;
    const occupation = e.parameter.occupation;
    const satisfaction = e.parameter.satisfaction;
    const satisfaction_label = e.parameter.satisfaction_label;
    const benefits = e.parameter.benefits;
    const other_benefit = e.parameter.other_benefit;
    const suggestions = e.parameter.suggestions;
    
    sheet.appendRow([timestamp, type, education_level, age, occupation, satisfaction, satisfaction_label, benefits, other_benefit, suggestions]);
    
  } else if (type === 'workshop_satisfaction') {
    // ข้อมูลจากแบบประเมินความพึงพอใจในการเข้าร่วมกิจกรรม Workshop
    const selected_workshops = e.parameter.selected_workshops;
    const satisfaction = e.parameter.satisfaction;
    const satisfaction_label = e.parameter.satisfaction_label;
    const benefits = e.parameter.benefits;
    const other_benefit = e.parameter.other_benefit;
    const suggestions = e.parameter.suggestions;
    const education_level = e.parameter.education_level;
    const age = e.parameter.age;
    const occupation = e.parameter.occupation;
    
    sheet.appendRow([timestamp, type, selected_workshops, satisfaction, satisfaction_label, benefits, other_benefit, suggestions, education_level, age, occupation]);
    
  } else if (type === 'subroom') {
    // ข้อมูลจากแบบประเมินการเข้าร่วมงานในห้องประชุมย่อย
    const education_level = e.parameter.education_level;
    const age = e.parameter.age;
    const occupation = e.parameter.occupation;
    const satisfaction = e.parameter.satisfaction;
    const satisfaction_label = e.parameter.satisfaction_label;
    const benefits = e.parameter.benefits;
    const other_benefit = e.parameter.other_benefit;
    const suggestions = e.parameter.suggestions;
    
    sheet.appendRow([timestamp, type, education_level, age, occupation, satisfaction, satisfaction_label, benefits, other_benefit, suggestions]);
    
  } else {
    // ข้อมูลจากแบบประเมินความพึงพอใจงาน (เดิม)
    const rating = e.parameter.rating;
    const label = e.parameter.label;
    
    sheet.appendRow([timestamp, type, rating, label, '', '', '', '', '', '']);
  }

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