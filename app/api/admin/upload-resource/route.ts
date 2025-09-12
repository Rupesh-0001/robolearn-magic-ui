import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

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

    const resourcesDir = path.join(process.cwd(), 'public', 'resources');
    await fs.mkdir(resourcesDir, { recursive: true });

    const uniqueName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(resourcesDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/resources/${uniqueName}`;
    return NextResponse.json({ url: publicUrl, name: uniqueName });
  } catch (error) {
    console.error('Error uploading resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


