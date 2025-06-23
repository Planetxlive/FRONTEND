'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import DestinationInput from './DestinationInput';
import DateSelector from './DateSelector';
import GuestRoomSelector from './GuestRoomSelector';

const SearchBox = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    console.log('Search initiated with:', {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
  };

  return (
    <Card className="bg-white rounded-xl p-4 shadow-2xl border-0">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2">
        <div className="w-full md:flex-1">
          <DestinationInput value={destination} onChange={setDestination} />
        </div>

        <div className="w-full md:flex-1 flex flex-col sm:flex-row gap-3 sm:gap-2">
          <div className="flex-1">
            <DateSelector
              date={checkIn}
              onDateChange={setCheckIn}
              placeholder="Check-in"
              minDate={new Date()}
            />
          </div>
          <div className="flex-1">
            <DateSelector
              date={checkOut}
              onDateChange={setCheckOut}
              placeholder="Check-out"
              minDate={checkIn || new Date()}
            />
          </div>
        </div>

        <div className="w-full md:flex-1">
          <GuestRoomSelector
            guests={guests}
            rooms={rooms}
            onGuestsChange={setGuests}
            onRoomsChange={setRooms}
          />
        </div>

        <div className="w-full md:w-auto">
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchBox;
