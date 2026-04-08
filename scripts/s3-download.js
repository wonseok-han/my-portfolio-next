const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION,
});

const BUCKET = process.env.S3_BUCKET_NAME;
const S3_ROOT = 'portfolio/';
const DEST = path.resolve(__dirname, '..', 'public', 'stored');
const TARGETS = ['assets', 'data'];

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) return TARGETS;

  const invalid = args.filter((a) => !TARGETS.includes(a));
  if (invalid.length > 0) {
    console.error(`알 수 없는 대상: ${invalid.join(', ')}`);
    console.error(`사용법: npm run s3:download [${TARGETS.join(' | ')}]`);
    process.exit(1);
  }

  return args;
}

async function downloadTarget(target) {
  const prefix = `${S3_ROOT}${target}/`;
  const destDir = path.join(DEST, target);
  let continuationToken;
  let count = 0;

  console.log(`\n[${target}] S3 s3://${BUCKET}/${prefix} → ${destDir}`);

  do {
    const list = await s3
      .listObjectsV2({
        Bucket: BUCKET,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
      .promise();

    if (!list.Contents || list.Contents.length === 0) {
      if (count === 0) console.log(`[${target}] 다운로드할 파일이 없습니다.`);
      break;
    }

    for (const obj of list.Contents) {
      if (obj.Key.endsWith('/')) continue;

      const relativePath = obj.Key.replace(prefix, '');
      const destPath = path.join(destDir, relativePath);

      fs.mkdirSync(path.dirname(destPath), { recursive: true });

      const data = await s3
        .getObject({ Bucket: BUCKET, Key: obj.Key })
        .promise();
      fs.writeFileSync(destPath, data.Body);

      count++;
      console.log(`  ${relativePath}`);
    }

    continuationToken = list.IsTruncated
      ? list.NextContinuationToken
      : undefined;
  } while (continuationToken);

  return count;
}

async function download() {
  const targets = parseArgs();
  let totalCount = 0;

  for (const target of targets) {
    totalCount += await downloadTarget(target);
  }

  console.log(`\n완료! 총 ${totalCount}개 파일 다운로드됨 → ${DEST}`);
}

download().catch((err) => {
  console.error('다운로드 실패:', err.message);
  process.exit(1);
});
