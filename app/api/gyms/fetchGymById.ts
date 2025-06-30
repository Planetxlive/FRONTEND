import config from '@/lib/config';
import axios from 'axios';

export default async function fetchGymById(id: string) {
  const res = await axios.get(`${config.backendUrl}gym/${id}`);
  console.log(res.data.gym);
  return res.data.gym;
}
