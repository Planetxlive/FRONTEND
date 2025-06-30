import config from '@/lib/config';
import axios from 'axios';

export default async function fetchAllGyms() {
  const res = await axios.get(`${config.backendUrl}gym`);
  return res.data.data.gyms;
}
