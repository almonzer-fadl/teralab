import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { workshopData, plan, imageUrl } = await request.json();

    // Mock PDF generation - in production, you'd use a library like puppeteer or jsPDF
    const pdfContent = `
      Workshop Plan PDF
      =================
      
      Plan: ${plan}
      Image URL: ${imageUrl}
      Workshop Data: ${JSON.stringify(workshopData, null, 2)}
    `;

    // Create a simple text file as PDF for testing
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="teralab-workshop-plan.pdf"'
      }
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error generating PDF',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    }, { status: 500 });
  }
}