# 포트폴리오

* 내 경력, 프로젝트를 정리해놓은 포트폴리오 사이트
* https://wonseok-han.dev

## 개발 환경

* **NodeJS:** `v22.11.0` (LTS)
* **PackageManager:** `npm`
* **DataStorage:** `S3`

## Getting Started

### 환경변수

```plaintext
S3_BUCKET_ACCESS_KEY=
S3_BUCKET_SECRET_ACCESS_KEY=
S3_AWS_REGION=
S3_BUCKET_NAME=
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
