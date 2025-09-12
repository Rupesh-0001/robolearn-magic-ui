import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const originalName = file.name || 'resource.zip';
    const isZip = originalName.toLowerCase().endsWith('.zip');
    if (!isZip) {
      return NextResponse.json({ error: 'Only .zip files are allowed' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `lesson-resources/${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const { url } = await put(key, buffer, {
      access: 'public',
      contentType: 'application/zip'
    });

    return NextResponse.json({ url, name: originalName });
  } catch (error) {
    console.error('Error uploading resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


