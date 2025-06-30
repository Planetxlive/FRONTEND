import config from '@/lib/config';
import axios from 'axios';

export default async function postComment(
  sessionId: string,
  blogId: string,
  comment: string
) {
  const res = await axios.post(
    `${config.backendUrl}blog/comment/${blogId}`,
    {
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    }
  );
  return res.data.comment;
}
