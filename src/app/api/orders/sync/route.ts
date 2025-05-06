import { NextResponse } from 'next/server';
import { appendToSheet, formatOrderData } from '@/lib/google/sheets';

export async function POST(request: Request) {
  try {
    const order = await request.json();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Orders!A:G'; // Adjust based on your sheet structure

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID not configured');
    }

    const formattedData = formatOrderData(order);
    await appendToSheet(spreadsheetId, range, formattedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing order with Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to sync order with Google Sheets' },
      { status: 500 }
    );
  }
} 