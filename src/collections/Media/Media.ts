import { CollectionConfig } from 'payload/types';
// TODO: change upload location
// TODO: delete media file when form submission is deleted
const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '/public/uploads',
    staticURL: '/public/uploads',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    {
      name: 'md5Hash', // to store the MD5 hash of the file
      label: 'MD5 Hash',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
