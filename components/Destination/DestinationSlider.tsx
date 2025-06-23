"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Calendar, Users, Hotel } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookingDialog from './BookingDialog';
import Image from 'next/image';

interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  duration: string;
  capacity: string;
  description: string;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Santorini Luxury Resort",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    duration: "Per night",
    capacity: "2-4 guests",
    description: "Luxury resort with stunning caldera views and infinity pools"
  },
  {
    id: 2,
    name: "Bali Beach Hotel",
    location: "Seminyak, Bali",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    duration: "Per night",
    capacity: "1-6 guests",
    description: "Beachfront hotel with traditional Balinese architecture"
  },
  {
    id: 3,
    name: "Swiss Alpine Lodge",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "Per night",
    capacity: "2-8 guests",
    description: "Mountain lodge with panoramic Alpine views"
  },
  {
    id: 4,
    name: "Tokyo Grand Hotel",
    location: "Shibuya, Tokyo",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    duration: "Per night",
    capacity: "1-4 guests",
    description: "Modern luxury hotel in the heart of Tokyo"
  },
  {
    id: 5,
    name: "Maldives Water Villa",
    location: "Malé, Maldives",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    duration: "Per night",
    capacity: "2-4 guests",
    description: "Overwater villa with direct ocean access"
  },
  {
    id: 6,
    name: "Iceland Ice Hotel",
    location: "Reykjavik, Iceland",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    duration: "Per night",
    capacity: "2-6 guests",
    description: "Unique ice hotel with Northern Lights viewing"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${star <= rating
            ? 'fill-yellow-400 text-yellow-400'
            : star - 0.5 <= rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'text-gray-300'
            } transition-colors duration-200`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-muted-foreground">
        {rating}
      </span>
    </div>
  );
};

const HotelCard: React.FC<{ hotel: Hotel; onBookNow: (hotel: Hotel) => void }> = ({ hotel, onBookNow }) => {
  return (
    <div className="group relative transition-all duration-500 h-full">
      <Card className="overflow-hidden bg-white shadow-xl transition-all duration-500 border border-transparent group-hover:border-purple-500 rounded-2xl h-full flex flex-col">
        <div className="relative overflow-hidden">
          <div className="w-full h-64 object-cover rounded-t-2xl relative">
            <Image
              src={hotel.image}
              alt={hotel.name}
              className="object-cover"
              fill
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl" />

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <div className="flex items-center">
              <Hotel size={16} className="mr-1 text-primary" />
              <span className="text-sm font-medium text-primary">Hotel</span>
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <StarRating rating={hotel.rating} />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center text-white">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm font-medium">{hotel.location}</span>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {hotel.name}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-1">
            {hotel.description}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{hotel.duration}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{hotel.capacity}</span>
            </div>
          </div>

          <button
            onClick={() => onBookNow(hotel)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg mt-auto"
          >
            Book
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

const DestinationSlider: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl -z-10" />

      <div className="p-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {hotels.map((hotel) => (
              <CarouselItem key={hotel.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <HotelCard hotel={hotel} onBookNow={handleBookNow} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      <div className="text-center mt-12">
        <button className="bg-white shadow-lg hover:shadow-xl border border-gray-200 px-8 py-3 rounded-full font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white">
          View All Hotels
        </button>
      </div>

      <BookingDialog
        hotel={selectedHotel}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default DestinationSlider;
