'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Users, Minus, Plus } from 'lucide-react';

interface Guests {
  adults: number;
  children: number;
}

interface GuestRoomSelectorProps {
  guests: Guests;
  rooms: number;
  onGuestsChange: (guests: Guests) => void;
  onRoomsChange: (rooms: number) => void;
}

const GuestRoomSelector: React.FC<GuestRoomSelectorProps> = ({
  guests,
  rooms,
  onGuestsChange,
  onRoomsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateAdults = (increment: boolean) => {
    const newAdults = increment
      ? Math.min(guests.adults + 1, 10)
      : Math.max(guests.adults - 1, 1);
    onGuestsChange({ ...guests, adults: newAdults });
  };

  const updateChildren = (increment: boolean) => {
    const newChildren = increment
      ? Math.min(guests.children + 1, 10)
      : Math.max(guests.children - 1, 0);
    onGuestsChange({ ...guests, children: newChildren });
  };

  const updateRooms = (increment: boolean) => {
    const newRooms = increment
      ? Math.min(rooms + 1, 10)
      : Math.max(rooms - 1, 1);
    onRoomsChange(newRooms);
  };

  const totalGuests = guests.adults + guests.children;
  const displayText = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-12 justify-start text-left font-normal border-gray-300 hover:border-blue-500"
        >
          <Users className="mr-3 h-4 w-4 text-gray-400" />
          <span className="truncate">{displayText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Adults</div>
              <div className="text-sm text-gray-500">Ages 13 or above</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateAdults(false)}
                disabled={guests.adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">
                {guests.adults}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateAdults(true)}
                disabled={guests.adults >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Children</div>
              <div className="text-sm text-gray-500">Ages 0-12</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateChildren(false)}
                disabled={guests.children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">
                {guests.children}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateChildren(true)}
                disabled={guests.children >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div>
              <div className="font-medium text-gray-900">Rooms</div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateRooms(false)}
                disabled={rooms <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{rooms}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateRooms(true)}
                disabled={rooms >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Done Button */}
          <div className="pt-2">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestRoomSelector;
