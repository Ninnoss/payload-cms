import { Payload } from 'payload';
import { checkForDuplicateSubmission } from './hooks/checkForDuplicateSubmission';
import { handleFileUpload } from './hooks/handleFileUpload';

export const customApplyEndpoint = async (req: any, res: any, next: any) => {
  const payload: Payload = req.payload;

  try {
    // Check for duplicate submission, if this throws, we skip file upload creating new submission and go to catch
    await checkForDuplicateSubmission(req.body, payload);

    // If no duplicate, proceed with file upload
    const dataWithFile = await handleFileUpload(req.body, req.files, payload);

    // Create the submission
    const submission = await payload.create({
      collection: 'apply',
      data: dataWithFile,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      // submission,
    });
  } catch (error) {
    if (error.message === 'Submission already received.') {
      res.status(409).json({ error: error.message });
    } else if (error.message === 'Failed to upload resume file') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
