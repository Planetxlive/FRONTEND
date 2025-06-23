interface LocationType {
  longitude?: number;
  latitude?: number;
  location: {
    city?: string;
    state?: string;
    country?: string;
  };
}

export type { LocationType };
