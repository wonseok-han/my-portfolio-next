import { NextResponse } from 'next/server';
import s3 from '@utils/s3';

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const FILE_KEY = 'portfolio/careers.json';

export async function GET() {
  try {
    const data = await s3
      .getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY })
      .promise();
    const jsonData: CompanyProps[] = JSON.parse(data.Body!.toString());

    return NextResponse.json(jsonData.sort((a, b) => (a.key < b.key ? 1 : -1)));
  } catch (error) {
    console.error('S3 getObject Error:', error);
    return NextResponse.json({ error: 'getObject Error' }, { status: 500 });
  }
}
