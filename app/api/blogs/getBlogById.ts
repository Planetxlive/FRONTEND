import config from '@/lib/config';
import { BlogPost } from '@/types/blog';
import axios from 'axios';

// TODO: Add a blog viewing page
export default async function getBlogById(id: string): Promise<BlogPost> {
  const url = `${config.backendUrl}blog/${id}`;
  const res = await axios.get(url);
  return res.data.blog;
}
