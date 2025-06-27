import config from '@/lib/config';
import { BlogPost } from '@/types/blog';
import axios from 'axios';

export default async function updateBlog(
  sessionId: string,
  data: Partial<BlogPost>,
  id: string
) {
  const url = `${config.backendUrl}blog/${id}`;
  const res = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });
  return res.data.data;
}
