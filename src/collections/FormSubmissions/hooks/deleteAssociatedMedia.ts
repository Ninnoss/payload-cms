import { Apply } from 'payload/generated-types';
import { PayloadRequest } from 'payload/types';

export const deleteAssociatedMedia = async ({ doc, req }: { doc: Apply; req: PayloadRequest }) => {
  try {
    // Check if doc.resume is an object or just an ID
    const mediaId = typeof doc.resume === 'object' ? doc.resume.id : doc.resume;

    // Delete the associated media (resume) if it exists
    if (mediaId) {
      await req.payload.delete({
        collection: 'media',
        id: mediaId,
      });
      console.log(`Deleted media file with ID: ${mediaId}`);
    }
  } catch (error) {
    console.error('Error deleting associated media file:', error);
  }
};
