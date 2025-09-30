import { NextRequest, NextResponse } from 'next/server';
import s3 from '@utils/s3';

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const imagePath = path.join('/');
    const key = `portfolio/${imagePath}`; // portfolio + /assets/skills/spring.png

    console.log('=== 이미지 API 디버깅 ===');
    console.log('요청 경로:', path);
    console.log('이미지 경로:', imagePath);
    console.log('S3 요청 키:', key);
    console.log('S3 버킷명:', BUCKET_NAME);

    const data = await s3
      .getObject({ Bucket: BUCKET_NAME, Key: key })
      .promise();

    // 이미지 타입 감지
    const contentType = data.ContentType || 'image/png';

    // Buffer를 Uint8Array로 변환
    const buffer = data.Body as Buffer;
    const uint8Array = new Uint8Array(buffer);

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // 1년 캐시
      },
    });
  } catch (error: unknown) {
    console.error('=== S3 에러 상세 정보 ===');
    console.error('에러 타입:', error?.constructor?.name);
    console.error('에러 코드:', (error as { code?: string }).code);
    console.error('에러 메시지:', (error as { message?: string }).message);
    console.error('S3 요청 키:', `portfolio${(await params).path.join('/')}`);

    return NextResponse.json(
      { error: '이미지를 찾을 수 없습니다.' },
      { status: 404 }
    );
  }
}
