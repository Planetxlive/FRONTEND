import config from '@/lib/config';
import axios from 'axios';

export default async function fetchCommentsByBlogId(id: string) {
  const res = await axios.get(`${config.backendUrl}blog/comment/${id}`);
  console.log(res.data);
  return res.data.comments;
}
