import { useEffect, useState } from 'react';
import { LocationType } from './types';
import fetchLocation from '@/app/api/location/fetchLocation';

export default function useLocation(): LocationType {
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState({
    city: undefined,
    country: undefined,
    state: undefined,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          const location = await fetchLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
          setLocation({
            city: location.city,
            state: location.state,
            country: location.country,
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Cant get location');
    }
  }, []);

  return {
    longitude,
    latitude,
    location,
  };
}
