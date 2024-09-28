import { CollectionConfig } from 'payload/types';
import { admins } from '../Users/access/admins';
import { customApplyEndpoint } from './customApplyEndpoint';
import { deleteAssociatedMedia } from './hooks/deleteAssociatedMedia';

const FormSubmissions: CollectionConfig = {
  slug: 'apply', // Set the API endpoint to `/apply`
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  access: {
    create: () => true, // Allow anyone to apply to jobs (create form submissions)
    read: admins,
  },
  hooks: {
    afterDelete: [deleteAssociatedMedia],
  },
  endpoints: [
    {
      path: '/',
      method: 'post',
      handler: customApplyEndpoint,
    },
  ],
  fields: [
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'linkedin',
      label: 'LinkedIn Profile',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'website',
      label: 'Personal Website',
      type: 'text',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'englishLevel',
      label: 'English Level',
      type: 'radio',
      options: [
        {
          label: 'Beginner',
          value: 'beginner',
        },
        {
          label: 'Intermediate',
          value: 'intermediate',
        },
        {
          label: 'Advanced',
          value: 'advanced',
        },
      ],
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'startDate',
      label: 'Date Available to Start Work',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'about',
      label: 'About',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'resume',
      label: 'Upload Resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default FormSubmissions;
