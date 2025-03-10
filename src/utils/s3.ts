import AWS from 'aws-sdk';

// 환경 변수 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION,
});

export default s3;
