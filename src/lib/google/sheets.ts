import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize the Google Sheets API client
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface SheetData {
  range: string;
  values: any[][];
}

export async function readSheet(spreadsheetId: string, range: string): Promise<SheetData> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return {
      range: response.data.range || '',
      values: response.data.values || [],
    };
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    throw error;
  }
}

export async function writeSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw error;
  }
}

export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw error;
  }
}

// Helper function to format order data for Google Sheets
export function formatOrderData(order: any): any[][] {
  return [
    [
      new Date().toISOString(),
      order.id,
      order.customerName,
      order.email,
      order.total,
      order.status,
      JSON.stringify(order.items),
    ],
  ];
} 