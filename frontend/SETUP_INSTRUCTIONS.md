# Dashboard Setup Instructions

## 1. Create Environment File

Create a file named `.env` in the `frontend` directory with the following content:

```
VITE_GOOGLE_SHEETS_API_KEY=AIzaSyCDE3zd-huUp7yAZGu-wNMp4_2GcdBt2E0
```

**Important:** Make sure the file name starts with a dot (`.env`), not `env.txt` or similar.

## 2. Restart Development Server

After creating the `.env` file, you need to restart your Vite development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## 3. Test API Calls

I've created a test file `test-api.html` that you can open in your browser to test all 6 Google Sheets API calls. This will help identify which sheets are working and which ones have issues.

## 4. Check Google Sheets Sharing Settings

Make sure all 6 Google Sheets are set to "Anyone with the link can view":

1. Open each Google Sheet
2. Click "Share" button (top right)
3. Change to "Anyone with the link can view"
4. Click "Done"

## 5. Verify Spreadsheet IDs

The current Spreadsheet IDs in `Dashboard.jsx` are:

- **Feedback**: `11CWBhfxQwoT87-G4HOSV0u7WWm7cLcH2sBmve6GwTPY`
- **Participation**: `1my54_beZk3Blcb-IbhofkV8zmR0PliQjYLGIfv9YbNw`
- **SubRoom**: `1M5v7SExl4ycBFw7CXqv-0CLQi6tspa3cnGkp44r5hhU`
- **Exhibition**: `1OFAJD-MzgU9VTek-D6uDUKWQ3iDRQDaJ0au6UbkmUS8`
- **Workshop**: `1l-Io1gv-SeGd0xLEgj3qaJps5_b_f9Hmlll-MyXbOgo`
- **About SACIT**: `1bgv0n5lrV6aCh7mYNHYy_sglSwfHnwV_viWezynB9Kc`

**Please verify these IDs match your actual Google Sheets URLs.**

## 6. Expected Results

Once everything is set up correctly:
- The Dashboard should load without showing "API Key: undefined"
- You should see data being fetched from all 6 sheets
- The satisfaction and demographics charts should display real data

## 7. Troubleshooting

If you still get errors:
1. Check the browser console for specific error messages
2. Use the `test-api.html` file to test individual API calls
3. Verify the Spreadsheet IDs are correct
4. Ensure all sheets are publicly shared
5. Check that all sheets are named "Sheet1"
