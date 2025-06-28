import { User } from '@/types/user';
import config from '@/lib/config';
import axios from 'axios';

export default async function createUser(
  sessionToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<User> {
  const res = await axios.post(`${config.backendUrl}auth/sync-user`, data, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  console.log(res);
  return res.data.user;
}
