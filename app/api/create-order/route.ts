import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

interface RazorpayOrderOptions {
  amount: number;
  currency: string;
  offers?: string[];
  payment: {
    capture: string;
    capture_options: {
      automatic_expiry_period: number;
      refund_speed: string;
    };
  };
}

export async function POST(request: Request) {
  try {
    // Get parameters from request body
    const body = await request.json();
    const { amount, offer } = body;

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid amount' 
      }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: 'rzp_live_esTSJZdYt8HwVK',
      key_secret: '5DtigqfFsWAUOOeBhE2kIfoK',
    });

    // Base options
    const options: RazorpayOrderOptions = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      payment: {
        capture: "automatic",
        capture_options: {
          "automatic_expiry_period": 7200,
          "refund_speed": "normal"
        }
      }
    };

    // Add offers only if provided
    if (offer) {
      options.offers = [offer];
    }

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      success: true,
      order 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error creating order' 
    }, { status: 500 });
  }
} 