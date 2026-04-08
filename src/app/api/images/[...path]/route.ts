import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import s3 from '@utils/s3';

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const IS_LOCAL = process.env.NODE_ENV === 'development';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const imagePath = segments.join('/');

    if (IS_LOCAL) {
      const filePath = path.join(process.cwd(), 'public', 'stored', imagePath);
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: '이미지를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      const buffer = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentTypeMap: Record<string, string> = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
      };

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentTypeMap[ext] || 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }

    const key = `portfolio/${imagePath}`;
    const data = await s3
      .getObject({ Bucket: BUCKET_NAME, Key: key })
      .promise();

    const contentType = data.ContentType || 'image/png';
    const buffer = data.Body as Buffer;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error: unknown) {
    console.error('이미지 로딩 오류:', (error as { message?: string }).message);
    return NextResponse.json(
      { error: '이미지를 찾을 수 없습니다.' },
      { status: 404 }
    );
  }
}
