declare namespace NodeJS {
  interface ProcessEnv {
    readonly S3_BUCKET_ACCESS_KEY: string;
    readonly S3_BUCKET_SECRET_ACCESS_KEY: string;
    readonly S3_AWS_REGION: string;
    readonly S3_BUCKET_NAME: string;
  }
}
