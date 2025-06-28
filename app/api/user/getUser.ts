import { User } from '@/types/user';
import config from '@/lib/config';
import axios from 'axios';

export default async function getUser(sessionToken: string): Promise<User> {
  const url = `${config.backendUrl}user`;
  console.log(url);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  console.log(res);
  return res.data.user;
}
