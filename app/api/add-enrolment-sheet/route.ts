// app/api/add-enrollment/route.ts
export async function POST(req: Request) {
    try {
      const { name, phone, email, pricePaid, coursePrice, dateTime } = await req.json();
  
      if (!name || !phone || !email) {
        return new Response(JSON.stringify({ ok:false, error:'name/phone/email required' }), { status: 400 });
      }

      const key = 'secret-key';
  
      const url = `https://script.google.com/macros/s/AKfycbxVHS_AQocmIuhI0yE8Y1YIGaEWGtHs4xEoDTFe1aAqNrpqXlXXie65C8unWDiop2a8dQ/exec?key=${encodeURIComponent(key)}`;
  
      // Create the payload with dateTime if provided, otherwise use current time
      const payload = {
        name,
        phone,
        email,
        pricePaid,
        coursePrice,
        dateTime: dateTime || new Date().toISOString()
      };

      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        // If you see 403s, add: redirect: 'follow'
      });
  
      const json = await r.json();
      return new Response(JSON.stringify(json), { status: r.ok ? 200 : r.status });
    } catch (e: unknown) {
      return new Response(JSON.stringify({ ok:false, error:String(e) }), { status: 500 });
    }
  }
  