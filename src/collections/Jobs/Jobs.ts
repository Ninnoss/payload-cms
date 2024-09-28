import { CollectionConfig } from 'payload/types';
import { anyone } from './access/anyone';
import { isLoggedIn } from './access/isLoggedIn';
import { handleIsActive } from './hooks/handleIsActive';
import { slugField } from '../../fields/slug';
import serializeToHTML from './hooks/serialize';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'applicationDeadline'],
  },
  access: {
    read: anyone, // anyone can see the API response of the jobs collection
    update: isLoggedIn,
    create: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'requirements',
      type: 'richText',
      required: true,
    },
    {
      name: 'requirementsHTML',
      type: 'richText', // Store the serialized HTML as a string
      admin: {
        hidden: true, // Hide this field in the admin UI
      },
    },
    {
      name: 'responsibilities',
      type: 'richText',
      required: true,
    },
    {
      name: 'responsibilitiesHTML',
      type: 'richText', // Store the serialized HTML as a string
      admin: {
        hidden: true, // Hide this field in the admin UI
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Full-Stack', value: 'full-stack' },
        { label: 'Mobile Native', value: 'mobile-native' },
        { label: 'React Native', value: 'react-native' },
        { label: 'ML', value: 'ml' },
        { label: 'Data specialist', value: 'data-specialist' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Data Engineering', value: 'data-engineering' },
        { label: 'Security', value: 'security' },
        { label: 'Game Development', value: 'game-development' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'otherDepartment',
      type: 'text',
      admin: {
        condition: (_, { department }) => department === 'other',
      },
    },
    {
      name: 'jobType',
      type: 'select',
      options: [
        { label: 'Onsite', value: 'onsite' },
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { jobType }) => jobType !== 'remote',
      },
    },
    {
      name: 'employmentType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
      required: true,
    },
    {
      name: 'salary',
      type: 'select',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
      required: true,
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills',
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.skill || 'New Skill';
          },
        },
      },
      fields: [
        {
          name: 'skill',
          type: 'text',
        },
      ],
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'This will automatically uncheck if the application deadline has passed. Also, When setting the application deadline in the future, this will automatically get checked.',
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        handleIsActive({ data, operation });

        // Serialize the rich text fields before saving
        if (data.requirements) {
          data.requirementsHTML = serializeToHTML(data.requirements);
        }
        if (data.responsibilities) {
          data.responsibilitiesHTML = serializeToHTML(data.responsibilities);
        }

        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        const updatedDoc = handleIsActive({ data: doc, operation: 'read' });
        if (updatedDoc) {
          // Keep the serialized fields updated
          if (updatedDoc.requirements) {
            updatedDoc.requirementsHTML = serializeToHTML(updatedDoc.requirements);
          }
          if (updatedDoc.responsibilities) {
            updatedDoc.responsibilitiesHTML = serializeToHTML(updatedDoc.responsibilities);
          }
          return updatedDoc;
        }
        return doc;
      },
    ],
  },
};
