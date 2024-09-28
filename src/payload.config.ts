import path from 'path';

import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import Users from './collections/Users/Users';
import { Jobs } from './collections/Jobs/Jobs';
import FormSubmissions from './collections/FormSubmissions/FormSubmissions';
import Media from './collections/Media/Media';
import { allowedOrigins } from './utils/allowedOrigins';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_EXTERNAL_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },

  cors: allowedOrigins,
  editor: slateEditor({}),
  collections: [Users, Jobs, FormSubmissions, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, file upload limit
    },
  },
  // global rate limits
  rateLimit: {
    window: 15 * 60 * 1000, // 15 minutes,
    max: 500,
    trustProxy: true,
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
