const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION,
});

const BUCKET = process.env.S3_BUCKET_NAME;
const S3_ROOT = 'portfolio/';
const SRC = path.resolve(__dirname, '..', 'public', 'stored');
const TARGETS = ['assets', 'data'];

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) return TARGETS;

  const invalid = args.filter((a) => !TARGETS.includes(a));
  if (invalid.length > 0) {
    console.error(`알 수 없는 대상: ${invalid.join(', ')}`);
    console.error(`사용법: npm run s3:upload [${TARGETS.join(' | ')}]`);
    process.exit(1);
  }

  return args;
}

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

async function uploadTarget(target) {
  const srcDir = path.join(SRC, target);
  const prefix = `${S3_ROOT}${target}/`;
  let count = 0;

  console.log(`\n[${target}] ${srcDir} → S3 s3://${BUCKET}/${prefix}`);

  if (!fs.existsSync(srcDir)) {
    console.log(`[${target}] 소스 디렉토리가 없습니다. 건너뜁니다.`);
    return 0;
  }

  const files = collectFiles(srcDir);

  if (files.length === 0) {
    console.log(`[${target}] 업로드할 파일이 없습니다.`);
    return 0;
  }

  for (const filePath of files) {
    const relativePath = path.relative(srcDir, filePath);
    const key = prefix + relativePath.split(path.sep).join('/');
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    await s3
      .putObject({
        Bucket: BUCKET,
        Key: key,
        Body: fs.readFileSync(filePath),
        ContentType: contentType,
      })
      .promise();

    count++;
    console.log(`  ${relativePath} → ${key}`);
  }

  return count;
}

async function upload() {
  const targets = parseArgs();
  let totalCount = 0;

  for (const target of targets) {
    totalCount += await uploadTarget(target);
  }

  console.log(`\n완료! 총 ${totalCount}개 파일 업로드됨`);
}

upload().catch((err) => {
  console.error('업로드 실패:', err.message);
  process.exit(1);
});
