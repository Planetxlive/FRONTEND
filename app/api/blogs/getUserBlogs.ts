import config from '@/lib/config';
import axios from 'axios';

// TODO: make a page to list user blogs
export default async function getUserBlogs(token: string) {
  const url = `${config.backendUrl}blog/user`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data.data)
  return res.data.data.blogs;
}
