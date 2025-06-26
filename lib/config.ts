import { ConfigType } from './types';

const config: ConfigType = {
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8000/api/v1/',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  region: process.env.AWS_REGION || "",
  bucketName: process.env.AWS_BUCKET_NAME || "",
  baseUrl: process.env.S3_BASE_URL || "",
};

export default config;
