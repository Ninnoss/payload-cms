import type { AccessArgs } from 'payload/config';
import { User } from 'payload/generated-types';
import { checkRole } from './checkRole';

type isAdmin = (args: AccessArgs<unknown, User>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user);
};
