import crypto from 'crypto';
import { Payload } from 'payload';
import { Apply } from 'payload/generated-types';

export const handleFileUpload = async (data: Apply, files: any, payload: Payload) => {
  if (files && 'resume' in files) {
    const resume = files.resume as FileUpload;

    try {
      // Calculate MD5 hash of the file buffer
      const fileHash = crypto.createHash('md5').update(resume.data).digest('hex');

      // Check if a file with the same hash already exists in the media collection
      const existingFile = await payload.find({
        collection: 'media',
        where: {
          md5Hash: {
            equals: fileHash,
          },
        },
      });

      // If a duplicate is found, link to the existing media entry
      if (existingFile.docs.length > 0) {
        console.log('Duplicate file found, using existing media entry');
        data.resume = existingFile.docs[0].id;
      } else {
        // No duplicate found, upload the file
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            filename: resume.name,
            mimeType: resume.mimetype,
            filesize: resume.size,
            md5Hash: fileHash,
          },
          file: resume,
        });

        data.resume = mediaDoc.id;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload resume file');
    }
  }

  return data;
};

interface FileUpload {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: Function;
  md5Hash: string;
}
