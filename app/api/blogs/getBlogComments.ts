import config from '@/lib/config';
import axios from 'axios';

// TODO: make a page to view comments
export default async function getBlogComments(token: string, id: string) {
  const url = `${config.backendUrl}blog/comment/${id}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.comments;
}
