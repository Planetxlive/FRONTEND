"use server"
import { randomUUID } from 'crypto';
import envConfig from "@/lib/config"
import s3 from './s3client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async function uploadImage(file: File) {

  try {
    const name = file.name.replaceAll(" ", "_")
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.toLowerCase().split(".")[
        file.name.toLowerCase().split(".").length - 1
      ];
    const key = `uploads/${randomUUID()}-${name}`;

    const command = new PutObjectCommand({
      Bucket: envConfig.bucketName,
      Key: key,
      Body: buffer,
      ContentType: `image/${fileExtension}`
    });

    await s3.send(command);

    const url = `${envConfig.baseUrl}${key}`;
    console.log(`urls: ${url}`)
    return {
        url,
        error: null
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
        url: null,
        error: err
    }
  }
}
