export interface Gym {
  id: string;
  userId: string;
  gymName: string;
  locationLatitude: number;
  locationLongitude: number;
  locationName?: string; // Display name for location
  yearOfGym: number;
  description: string;
  photos: string[];
  videos: string[];
  lockerFacility: boolean;
  timing: {
    [key: string]: { open: string; close: string };
  };
  categories: string[];
  rateCard?: string;
  website?: string;
  services: string[];
  benefits: string[];
  pricing: {
    [key: string]: string | number;
  };
  amenities: string[];
  availableSports: string[];
  strengthEquipments: string[];
  cardioEquipments: string[];
  rules: string[];
  gender: string;
  counsellingServices: {
    available: boolean;
    types: string[];
  };
  socialMediaLinks: {
    [key: string]: string;
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
