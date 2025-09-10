import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = configService.getOrThrow<string>('AWS_S3_BUCKET');

    this.client = new S3Client({
      region: configService.getOrThrow<string>('AWS_S3_REGION'),
    });
  }

  async upload(key: string, file: Buffer, mimeType: string) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ACL: 'public-read',
        ContentType: mimeType,
      }),
    );

    return { key };
  }

  async delete(key: string) {
    const result = await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );

    return result.DeleteMarker;
  }
}
