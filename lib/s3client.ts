import envConfig from '@/lib/config';
import { S3Client } from '@aws-sdk/client-s3';

console.log(envConfig)

const s3 = new S3Client({
    region: envConfig.region,
    credentials: {
        accessKeyId: envConfig.accessKeyId,
        secretAccessKey: envConfig.secretAccessKey,
    },
});

export default s3;