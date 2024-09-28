import { Payload } from 'payload';
import { Apply } from 'payload/generated-types';

export const checkForDuplicateSubmission = async (data: Apply, payload: Payload) => {
  const { email, firstName, lastName, jobTitle, linkedin } = data;

  if (email && firstName && lastName && linkedin && jobTitle) {
    // Query the FormSubmissions collection for existing records with matching fields
    const existingSubmission = await payload.find({
      collection: 'apply',
      where: {
        email: { equals: email },
        firstName: { equals: firstName },
        lastName: { equals: lastName },
        linkedin: { equals: linkedin },
        jobTitle: { equals: jobTitle },
      },
    });
    // If a submission with the same values exists, throw error
    if (existingSubmission.docs.length > 0) {
      throw new Error('Submission already received.');
    }
  }
};
