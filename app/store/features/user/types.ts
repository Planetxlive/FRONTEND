type User = {
    id: string;
    name: string;
    whatsappMobile?: string;
    mobile: string;
    role: string;
    state?: string;
    city?: string;
    longitude: number;
    latitude: number;
    coverURL: string;
}

export type { User };