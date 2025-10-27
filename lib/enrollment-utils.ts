// Utility functions for enrollment operations

export async function addToEnrollmentSheet(data: {
  name: string;
  phone: string;
  email: string;
  pricePaid: number;
  coursePrice: number;
  dateTime?: string;
  courseName?: string;
}) {
  try {
    const key = 'secret-key';
    const url = `https://script.google.com/macros/s/AKfycbxVHS_AQocmIuhI0yE8Y1YIGaEWGtHs4xEoDTFe1aAqNrpqXlXXie65C8unWDiop2a8dQ/exec?key=${encodeURIComponent(key)}`;
    
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      pricePaid: data.pricePaid,
      coursePrice: data.coursePrice,
      dateTime: data.dateTime || new Date().toISOString(),
      courseName: data.courseName || 'Course'
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed to add to enrollment sheet: ${JSON.stringify(result)}`);
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error adding to enrollment sheet:', error);
    throw error;
  }
} 