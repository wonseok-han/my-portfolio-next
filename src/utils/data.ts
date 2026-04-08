import fs from 'fs';
import path from 'path';
import s3 from '@utils/s3';

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const IS_LOCAL = process.env.NODE_ENV === 'development';

/**
 * 로컬 개발 시 public/stored에서, 배포 시 S3에서 JSON 데이터를 읽어온다.
 */
export async function getJsonData<T>(filename: string): Promise<T> {
  const s3Key = `portfolio/data/${filename}`;

  if (IS_LOCAL) {
    const filePath = path.join(process.cwd(), 'public', 'stored', 'data', filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  }

  const data = await s3
    .getObject({ Bucket: BUCKET_NAME, Key: s3Key })
    .promise();
  return JSON.parse(data.Body!.toString()) as T;
}

/**
 * 로컬 개발 시 /stored/assets/ 경로를, 배포 시 /api/images/ 경로를 반환한다.
 */
export function getImageBasePath(): string {
  return IS_LOCAL ? '/stored/assets' : '/api/images/assets';
}
