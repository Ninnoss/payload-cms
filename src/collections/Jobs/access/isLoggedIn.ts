import { Access } from 'payload/types';

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user);
};
