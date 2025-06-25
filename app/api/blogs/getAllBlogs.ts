import config from '@/lib/config';
import axios from 'axios';

// TODO: create a blog type and list all of them
export default async function getAllBlogs() {
  const url = `${config.backendUrl}blog/`;
  const res = await axios.get(url);
  return res.data.data;
}
