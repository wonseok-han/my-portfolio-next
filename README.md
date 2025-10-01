# 포트폴리오

* 내 경력, 프로젝트를 정리해놓은 포트폴리오 사이트
* https://wonseok-han.dev

## 개발 환경

* **NodeJS:** `v22.11.0` (LTS)
* **PackageManager:** `npm`
* **DataStorage:** `S3`
* **Mail**: `Resend`

## Getting Started

### 환경변수

```plaintext
CONTACT_EMAIL=your-email
RESEND_API_KEY=your-resend-api-key
S3_BUCKET_ACCESS_KEY=your-s3-bucket-access-key
S3_BUCKET_SECRET_ACCESS_KEY=your-s3-bucket-secret-key
S3_AWS_REGION=your-s3-aws-region
S3_BUCKET_NAME=your-s3-bucket-name
```

### 실행

```bash
# Module Install
npm install

# Server start
npm run dev
```

### 배포

* Build 명령 후 생성되는 .next 폴더로 배포합니다.

```bash
# Build
npm run build
```

### 배포환경

* [**vercel**](https://vercel.com/)

## 참고

- https://resend.com/onboarding