import { LocationType } from '@/hooks/location/types';
import axios from 'axios';

export default async function fetchLocation(
  location: Omit<LocationType, 'location'>
) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`;
  const res = await axios.get(url);
  console.log(res.data);
  return {
    city: res.data.address.state_district,
    country: res.data.address.country,
    state: res.data.address.state,
  };
}
