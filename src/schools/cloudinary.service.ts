import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { configureCloudinary } from 'config/cloudinary.config';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  // Puedes añadir más propiedades si las necesitas
  [key: string]: any;
}

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    configureCloudinary(this.configService);
  }

  async uploadImage(file: Express.Multer.File, schoolId: string) {
    const folderName = `school-profiles/${schoolId}`;
    
    console.log('Uploading image to folder:', folderName);

    // Usar directamente el buffer del archivo en lugar de file.path
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          allowed_formats: ['jpg', 'png', 'jpeg'],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryResponse);
        }
      );

      uploadStream.end(file.buffer);
    });

    console.log('Uploaded image result:', result);

    return { url: result.secure_url, publicId: result.public_id };
  }

  async deleteImage(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
    return { message: 'Image deleted successfully' };
  }
}
