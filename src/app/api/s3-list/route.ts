import { NextResponse } from 'next/server';
import s3 from '@utils/s3';

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function GET() {
  try {
    const result = await s3
      .listObjectsV2({
        Bucket: BUCKET_NAME,
        Prefix: 'portfolio/',
      })
      .promise();

    const files =
      result.Contents?.map((obj) => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })) || [];

    return NextResponse.json({
      bucket: BUCKET_NAME,
      prefix: 'portfolio/',
      totalFiles: files.length,
      files,
    });
  } catch (error) {
    console.error('S3 리스트 조회 에러:', error);
    return NextResponse.json({ error: 'S3 리스트 조회 실패' }, { status: 500 });
  }
}
