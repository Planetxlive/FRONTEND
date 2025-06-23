'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Users, Minus, Plus, Hotel } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
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

interface BookingDialogProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  hotel,
  isOpen,
  onClose,
}) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setIsToCalendarOpen] = useState(false);

  const handleGuestCountChange = (increment: boolean) => {
    setGuestCount(prev =>
      increment ? Math.min(prev + 1, 20) : Math.max(prev - 1, 1)
    );
  };

  const handleRoomCountChange = (increment: boolean) => {
    setRoomCount(prev =>
      increment ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1)
    );
  };

  const handleBooking = () => {
    if (!fromDate || !toDate || !hotel) return;

    console.log('Booking details:', {
      hotel: hotel.name,
      fromDate,
      toDate,
      guestCount,
      roomCount,
    });

    onClose();
  };

  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book Your Stay
          </DialogTitle>
          <DialogDescription className="text-base">
            Reserve your room at {hotel.name}, {hotel.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Hotel Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 object-cover rounded-lg relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  className="object-cover"
                  fill
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-muted-foreground">{hotel.location}</p>
                <div className="flex items-center mt-1">
                  <Hotel size={16} className="mr-1 text-primary" />
                  <span className="text-primary font-medium">Luxury Hotel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            {/* Check-in */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in Date</label>
              <Popover
                open={isFromCalendarOpen}
                onOpenChange={setIsFromCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !fromDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={date => {
                      setFromDate(date);
                      setIsFromCalendarOpen(false);
                    }}
                    disabled={date => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out Date</label>
              <Popover
                open={isToCalendarOpen}
                onOpenChange={setIsToCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !toDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={date => {
                      setToDate(date);
                      setIsToCalendarOpen(false);
                    }}
                    disabled={date => date < (fromDate || new Date())}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Guests</label>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleGuestCountChange(false)}
                  disabled={guestCount <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[3ch] text-center font-medium">
                  {guestCount}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleGuestCountChange(true)}
                  disabled={guestCount >= 20}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Rooms</label>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Hotel className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRoomCountChange(false)}
                  disabled={roomCount <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[3ch] text-center font-medium">
                  {roomCount}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRoomCountChange(true)}
                  disabled={roomCount >= 10}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!fromDate || !toDate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Book My Trip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
