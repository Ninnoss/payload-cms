import { User } from 'payload/generated-types';
import type { CollectionConfig } from 'payload/types';
import { adminsAndUser } from './access/adminAndUser';
import { admins } from './access/admins';
import { checkRole } from './access/checkRole';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
    hidden: ({ user }) => !checkRole(['admin'], user as unknown as User), // Hide the users collection from non-admin users
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    // admin: ({ req: { user } }) => checkRole(['admin'], user), // this will limit the admin dashboard to the passed role
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      // access control on the roles field
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
};

export default Users;
