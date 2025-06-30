'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, X, ArrowRight } from 'lucide-react';
import DestinationInput from './DestinationInput';
import DateSelector from './DateSelector';
import GuestRoomSelector from './GuestRoomSelector';

const SearchBox = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [rooms, setRooms] = useState(1);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);

  const handleSearch = () => {
    console.log('Search initiated with:', {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
    // Close mobile overlay after search
    setIsMobileOverlayOpen(false);
  };

  const handleDestinationClick = () => {
    setIsMobileOverlayOpen(true);
  };

  const closeMobileOverlay = () => {
    setIsMobileOverlayOpen(false);
  };

  return (
    <>
      {/* Desktop/Tablet View - Full Search Box */}
      <div className="hidden md:block">
        <Card className="bg-white rounded-xl p-4 shadow-2xl border-0">
          <div className="flex flex-row items-center gap-2">
            <div className="flex-1">
              <DestinationInput value={destination} onChange={setDestination} />
            </div>

            <div className="flex-1 flex gap-2">
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

            <div className="flex-1">
              <GuestRoomSelector
                guests={guests}
                rooms={rooms}
                onGuestsChange={setGuests}
                onRoomsChange={setRooms}
              />
            </div>

            <div className="w-auto">
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile View - Only Destination Input */}
      <div className="md:hidden">
        <Card className="bg-white rounded-xl p-4 shadow-2xl border-0">
          <div className="flex items-center gap-3">
            <div
              className="cursor-pointer group hover:scale-[1.02] transition-transform duration-200 flex-1"
              onClick={handleDestinationClick}
            >
              <div className="relative">
                <DestinationInput
                  value={destination}
                  onChange={setDestination}
                  readOnly={true}
                  placeholder="Where are you going?"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {/* <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" /> */}
                </div>
              </div>
            </div>

            <Button
              onClick={handleDestinationClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Mobile Overlay */}
      {isMobileOverlayOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMobileOverlay}
          />

          {/* Animated Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transform translate-y-full animate-slide-up">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={closeMobileOverlay}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <DestinationInput
                  value={destination}
                  onChange={setDestination}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <DateSelector
                    date={checkIn}
                    onDateChange={setCheckIn}
                    placeholder="Check-in"
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <DateSelector
                    date={checkOut}
                    onDateChange={setCheckOut}
                    placeholder="Check-out"
                    minDate={checkIn || new Date()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests & Rooms
                </label>
                <GuestRoomSelector
                  guests={guests}
                  rooms={rooms}
                  onGuestsChange={setGuests}
                  onRoomsChange={setRooms}
                />
              </div>

              <Button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;
