import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface SheetData {
  range: string;
  majorDimension: string;
  values: string[][];
}

interface SheetResponse {
  data: SheetData;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: {
    url: string;
    method: string;
    headers: Record<string, string>;
  };
}

interface SheetError {
  response?: {
    data: {
      error: {
        message: string;
        status: string;
      };
    };
    status: number;
    statusText: string;
  };
  message: string;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getSheetData(spreadsheetId: string, range: string): Promise<string[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    const err = error as SheetError;
    console.error('Error fetching sheet data:', err.response?.data?.error?.message || err.message);
    throw new Error('Failed to fetch sheet data');
  }
}

export async function updateSheetData(
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    const err = error as SheetError;
    console.error('Error updating sheet data:', err.response?.data?.error?.message || err.message);
    throw new Error('Failed to update sheet data');
  }
}

export async function appendSheetData(
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    const err = error as SheetError;
    console.error('Error appending sheet data:', err.response?.data?.error?.message || err.message);
    throw new Error('Failed to append sheet data');
  }
}

export async function clearSheetData(spreadsheetId: string, range: string): Promise<void> {
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
  } catch (error) {
    const err = error as SheetError;
    console.error('Error clearing sheet data:', err.response?.data?.error?.message || err.message);
    throw new Error('Failed to clear sheet data');
  }
}

// Helper function to format order data for Google Sheets
export function formatOrderData(order: Order): string[][] {
  return [
    [
      new Date().toISOString(),
      order.id,
      order.customerName,
      order.email,
      order.total.toString(),
      order.status,
      JSON.stringify(order.items),
    ],
  ];
} 