import config from '@/lib/config';
import axios from 'axios';

// TODO: Add a form to add comment
export default async function addComment(
  token: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comment: any
) {
  const url = `${config.backendUrl}blog/comment/${id}`;
  const res = await axios.post(url, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.comment;
}
