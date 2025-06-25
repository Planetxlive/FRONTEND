'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Save,
  X,
  MapPin,
  Calendar,
  Users,
  Dumbbell,
  Clock,
  DollarSign,
  Shield,
  Image as ImageIcon,
  Globe,
  Instagram,
  Facebook,
  Loader2,
} from 'lucide-react';
import { Gym } from '@/types/gym';
import ImageUpload from '@/components/blog/ImageUpload';

interface GymEditorProps {
  initialData?: Gym;
  onSubmit: (data: Omit<Gym, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
}

export default function GymEditor({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  submitButtonText,
}: GymEditorProps) {
  const [formData, setFormData] = useState({
    userId: 'user-1', // In real app, get from auth
    gymName: '',
    locationLatitude: 0,
    locationLongitude: 0,
    locationName: '',
    yearOfGym: new Date().getFullYear(),
    description: '',
    photos: [] as string[],
    videos: [] as string[],
    lockerFacility: false,
    timing: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '6:00 AM - 8:00 PM',
      sunday: '7:00 AM - 6:00 PM',
    },
    categories: [] as string[],
    rateCard: '',
    website: '',
    services: [] as string[],
    benefits: [] as string[],
    pricing: {
      monthly: '',
      quarterly: '',
      yearly: '',
    },
    amenities: [] as string[],
    availableSports: [] as string[],
    strengthEquipments: [] as string[],
    cardioEquipments: [] as string[],
    rules: [] as string[],
    gender: 'Mixed',
    counsellingServices: {
      available: false,
      types: [] as string[],
    },
    socialMediaLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
    },
    isDeleted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newPhoto, setNewPhoto] = useState('');
  // const [newVideo, setNewVideo] = useState('');
  const [newService, setNewService] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newSport, setNewSport] = useState('');
  const [newStrengthEquipment, setNewStrengthEquipment] = useState('');
  const [newCardioEquipment, setNewCardioEquipment] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newCategory, setNewCategory] = useState('');
  // const [newCounsellingType, setNewCounsellingType] = useState('');

  // Loading states
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  // const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState<string | null>(null);

  const predefinedCategories = [
    'Fitness',
    'Bodybuilding',
    'Cardio',
    'Strength Training',
    'CrossFit',
    'Yoga',
    'Pilates',
    'Martial Arts',
    'Boxing',
    'Swimming',
    'Zumba',
    'Functional Training',
    'Weight Loss',
    'Powerlifting',
    'Calisthenics',
  ];

  const predefinedSports = [
    'Basketball',
    'Badminton',
    'Table Tennis',
    'Squash',
    'Tennis',
    'Volleyball',
    'Football',
    'Cricket',
    'Swimming',
    'Boxing',
    'Martial Arts',
    'Wrestling',
    'Gymnastics',
    'Rock Climbing',
  ];

  const predefinedAmenities = [
    'Parking',
    'WiFi',
    'Air Conditioning',
    'Music System',
    'TV',
    'Water Cooler',
    'Towel Service',
    'Protein Bar',
    'Juice Bar',
    'Steam Room',
    'Sauna',
    'Massage',
    'Personal Training',
    'Group Classes',
    'Nutritionist',
    'Medical Checkup',
  ];

  const predefinedStrengthEquipment = [
    'Dumbbells',
    'Barbells',
    'Weight Plates',
    'Cable Machine',
    'Smith Machine',
    'Power Rack',
    'Bench Press',
    'Incline Bench',
    'Decline Bench',
    'Lat Pulldown Machine',
    'Seated Row Machine',
    'Chest Press Machine',
    'Shoulder Press Machine',
    'Leg Press Machine',
    'Squat Rack',
    'Deadlift Platform',
    'Kettlebell Rack',
    'Resistance Bands',
    'Medicine Balls',
    'Foam Rollers',
    'Pull-up Bar',
    'Dip Bars',
    'Trap Bar',
    'EZ Curl Bar',
    'Olympic Bar',
    'Safety Bars',
  ];

  const predefinedCardioEquipment = [
    'Treadmill',
    'Elliptical Trainer',
    'Stationary Bike',
    'Recumbent Bike',
    'Upright Bike',
    'Rowing Machine',
    'StairMaster',
    'Arc Trainer',
    'Cross Trainer',
    'Spin Bike',
    'Assault Bike',
    'VersaClimber',
    "Jacob's Ladder",
    'Ski Erg',
    'Rower',
    'Air Bike',
    'Mountain Climber',
    'Stepper',
    'Climber',
    'Glider',
  ];

  const predefinedServices = [
    'Personal Training',
    'Group Classes',
    'Fitness Assessment',
    'Body Composition Analysis',
    'Nutrition Consultation',
    'Recovery Sessions',
    'Sports Massage',
    'Physical Therapy',
    'Yoga Classes',
    'Pilates Classes',
    'Zumba Classes',
    'HIIT Classes',
    'Strength Training Programs',
    'Cardio Programs',
    'Weight Loss Programs',
    'Muscle Building Programs',
    'Senior Fitness',
    'Pre/Post Natal Training',
    'Sports Specific Training',
    'Rehabilitation Programs',
    'Online Coaching',
    'Meal Planning',
    'Supplement Guidance',
    'Fitness Equipment Training',
  ];

  const predefinedBenefits = [
    '24/7 Access',
    'Free Parking',
    'Locker Rooms',
    'Shower Facilities',
    'Towel Service',
    'Free WiFi',
    'Air Conditioning',
    'Music System',
    'TV Screens',
    'Water Dispenser',
    'Protein Shake Bar',
    'Juice Bar',
    'Steam Room',
    'Sauna',
    'Massage Services',
    'Childcare Services',
    'Free Guest Passes',
    'Referral Discounts',
    'Corporate Memberships',
    'Student Discounts',
    'Senior Discounts',
    'Family Packages',
    'No Joining Fee',
    'No Contract',
    'Flexible Payment Plans',
    'Free Fitness Assessment',
    'Free Personal Training Session',
    'Free Group Classes',
    'Free Nutrition Consultation',
  ];

  useEffect(() => {
    if (initialData) {
      setIsLoadingData(true);
      // Simulate loading time for better UX
      setTimeout(() => {
        setFormData({
          userId: initialData.userId,
          gymName: initialData.gymName,
          locationLatitude: initialData.locationLatitude,
          locationLongitude: initialData.locationLongitude,
          locationName: initialData.locationName || '',
          yearOfGym: initialData.yearOfGym,
          description: initialData.description,
          photos: initialData.photos,
          videos: initialData.videos,
          lockerFacility: initialData.lockerFacility,
          timing: {
            monday: initialData.timing.monday || '6:00 AM - 10:00 PM',
            tuesday: initialData.timing.tuesday || '6:00 AM - 10:00 PM',
            wednesday: initialData.timing.wednesday || '6:00 AM - 10:00 PM',
            thursday: initialData.timing.thursday || '6:00 AM - 10:00 PM',
            friday: initialData.timing.friday || '6:00 AM - 10:00 PM',
            saturday: initialData.timing.saturday || '6:00 AM - 8:00 PM',
            sunday: initialData.timing.sunday || '7:00 AM - 6:00 PM',
          },
          categories: initialData.categories,
          rateCard: initialData.rateCard || '',
          website: initialData.website || '',
          services: initialData.services,
          benefits: initialData.benefits,
          pricing: {
            monthly: String(initialData.pricing.monthly || ''),
            quarterly: String(initialData.pricing.quarterly || ''),
            yearly: String(initialData.pricing.yearly || ''),
          },
          amenities: initialData.amenities,
          availableSports: initialData.availableSports,
          strengthEquipments: initialData.strengthEquipments,
          cardioEquipments: initialData.cardioEquipments,
          rules: initialData.rules,
          gender: initialData.gender,
          counsellingServices: initialData.counsellingServices,
          socialMediaLinks: {
            facebook: initialData.socialMediaLinks.facebook || '',
            instagram: initialData.socialMediaLinks.instagram || '',
            twitter: initialData.socialMediaLinks.twitter || '',
            website: initialData.socialMediaLinks.website || '',
          },
          isDeleted: initialData.isDeleted,
        });
        setIsLoadingData(false);
      }, 500);
    }
  }, [initialData]);

  const handleInputChange = (
    field: string,
    value: number | string | boolean
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNestedChange = (
    parent: string,
    field: string,
    value: number | string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as Record<
          string,
          string | number | boolean
        >),
        [field]: value,
      },
    }));
  };

  const addToArray = async (
    field: string,
    value: string,
    setter: (value: string) => void
  ) => {
    const fieldValue = formData[field as keyof typeof formData];
    if (
      value.trim() &&
      Array.isArray(fieldValue) &&
      !fieldValue.includes(value.trim())
    ) {
      setIsAddingItem(field);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));

      setFormData(prev => ({
        ...prev,
        [field]: [
          ...(prev[field as keyof typeof prev] as string[]),
          value.trim(),
        ],
      }));
      setter('');
      setIsAddingItem(null);
    }
  };

  const removeFromArray = async (field: string, index: number) => {
    setIsAddingItem(field);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 200));

    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
    setIsAddingItem(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.gymName.trim()) newErrors.gymName = 'Gym name is required';
    if (!formData.locationName.trim())
      newErrors.locationName = 'Location name is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (formData.categories.length === 0)
      newErrors.categories = 'At least one category is required';
    if (formData.photos.length === 0)
      newErrors.photos = 'At least one photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {isLoadingData && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-gray-700 font-medium">Loading gym data...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Dumbbell className="w-6 h-6 text-emerald-500" />
            <span>Basic Information</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gym Name */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gym Name *
              </label>
              <input
                type="text"
                value={formData.gymName}
                onChange={e => handleInputChange('gymName', e.target.value)}
                placeholder="Enter gym name"
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 text-lg font-medium ${
                  errors.gymName
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
              />
              {errors.gymName && (
                <p className="text-red-500 text-sm mt-2">{errors.gymName}</p>
              )}
            </div>

            {/* Location Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location Name *
              </label>
              <input
                type="text"
                value={formData.locationName}
                onChange={e =>
                  handleInputChange('locationName', e.target.value)
                }
                placeholder="e.g., Downtown Mumbai, Sector 15 Gurgaon"
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 font-medium ${
                  errors.locationName
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
              />
              {errors.locationName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.locationName}
                </p>
              )}
            </div>

            {/* Year of Gym */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Year Established
              </label>
              <input
                type="number"
                value={formData.yearOfGym}
                onChange={e =>
                  handleInputChange('yearOfGym', parseInt(e.target.value))
                }
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all duration-200 font-medium"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Users className="w-4 h-4 inline mr-2" />
                Gender Policy
              </label>
              <select
                value={formData.gender}
                onChange={e => handleInputChange('gender', e.target.value)}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all duration-200 font-medium appearance-none"
              >
                <option value="Mixed">Mixed</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
              </select>
            </div>

            {/* Locker Facility */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Facilities
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="lockerFacility"
                  checked={formData.lockerFacility}
                  onChange={e =>
                    handleInputChange('lockerFacility', e.target.checked)
                  }
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label
                  htmlFor="lockerFacility"
                  className="text-gray-700 font-medium"
                >
                  Locker Facility Available
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Describe your gym, facilities, and what makes it special..."
                rows={4}
                className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none transition-all duration-200 resize-none font-light leading-relaxed ${
                  errors.description
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-emerald-500" />
            <span>Photos *</span>
          </h2>

          <div className="space-y-6">
            <ImageUpload
              value={newPhoto}
              onChange={setNewPhoto}
              error={errors.photos}
            />

            {newPhoto && (
              <button
                type="button"
                onClick={async () => {
                  setIsAddingPhoto(true);
                  await addToArray('photos', newPhoto, setNewPhoto);
                  setIsAddingPhoto(false);
                }}
                disabled={isAddingPhoto}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAddingPhoto ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <span>Add Photo</span>
                )}
              </button>
            )}

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={photo}
                      alt={`Gym photo ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromArray('photos', index)}
                      disabled={isAddingItem === 'photos'}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'photos' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Categories *
          </h2>

          <div className="space-y-6">
            <div className="flex space-x-3">
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              >
                <option value="">Select a category</option>
                {predefinedCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  addToArray('categories', newCategory, setNewCategory)
                }
                disabled={isAddingItem === 'categories'}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAddingItem === 'categories' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <span>Add</span>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {formData.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium"
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('categories', index)}
                    disabled={isAddingItem === 'categories'}
                    className="text-emerald-500 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingItem === 'categories' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </span>
              ))}
            </div>
            {errors.categories && (
              <p className="text-red-500 text-sm">{errors.categories}</p>
            )}
          </div>
        </div>

        {/* Timing */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Clock className="w-6 h-6 text-emerald-500" />
            <span>Operating Hours</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData.timing).map(([day, time]) => {
              // Parse the time string to get start and end times
              const [startTime, endTime] = (time as string).split(' - ');

              // Convert 12-hour format to 24-hour format for time inputs
              const convertTo24Hour = (timeStr: string) => {
                const [time, period] = timeStr.split(' ');
                const [hours, minutes] = time.split(':');
                let hour = parseInt(hours);

                if (period === 'PM' && hour !== 12) {
                  hour += 12;
                } else if (period === 'AM' && hour === 12) {
                  hour = 0;
                }

                return `${hour.toString().padStart(2, '0')}:${minutes}`;
              };

              const convertTo12Hour = (timeStr: string) => {
                const [hours, minutes] = timeStr.split(':');
                const hour = parseInt(hours);
                const period = hour >= 12 ? 'PM' : 'AM';
                const displayHour =
                  hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                return `${displayHour}:${minutes} ${period}`;
              };

              const startTime24 = convertTo24Hour(startTime);
              const endTime24 = convertTo24Hour(endTime);

              return (
                <div key={day} className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 capitalize">
                    {day}
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Open
                      </label>
                      <input
                        type="time"
                        value={startTime24}
                        onChange={e => {
                          const newStartTime24 = e.target.value;
                          const newStartTime12 =
                            convertTo12Hour(newStartTime24);
                          const newTimeString = `${newStartTime12} - ${endTime}`;
                          handleNestedChange('timing', day, newTimeString);
                        }}
                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Close
                      </label>
                      <input
                        type="time"
                        value={endTime24}
                        onChange={e => {
                          const newEndTime24 = e.target.value;
                          const newEndTime12 = convertTo12Hour(newEndTime24);
                          const newTimeString = `${startTime} - ${newEndTime12}`;
                          handleNestedChange('timing', day, newTimeString);
                        }}
                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Time Presets */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Quick Presets
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const preset = {
                    monday: '6:00 AM - 10:00 PM',
                    tuesday: '6:00 AM - 10:00 PM',
                    wednesday: '6:00 AM - 10:00 PM',
                    thursday: '6:00 AM - 10:00 PM',
                    friday: '6:00 AM - 10:00 PM',
                    saturday: '6:00 AM - 8:00 PM',
                    sunday: '7:00 AM - 6:00 PM',
                  };
                  setFormData(prev => ({ ...prev, timing: preset }));
                }}
                className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors duration-200"
              >
                Standard Gym Hours
              </button>
              <button
                type="button"
                onClick={() => {
                  const preset = {
                    monday: '5:00 AM - 11:00 PM',
                    tuesday: '5:00 AM - 11:00 PM',
                    wednesday: '5:00 AM - 11:00 PM',
                    thursday: '5:00 AM - 11:00 PM',
                    friday: '5:00 AM - 11:00 PM',
                    saturday: '6:00 AM - 10:00 PM',
                    sunday: '6:00 AM - 10:00 PM',
                  };
                  setFormData(prev => ({ ...prev, timing: preset }));
                }}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
              >
                Extended Hours
              </button>
              <button
                type="button"
                onClick={() => {
                  const preset = {
                    monday: '8:00 AM - 8:00 PM',
                    tuesday: '8:00 AM - 8:00 PM',
                    wednesday: '8:00 AM - 8:00 PM',
                    thursday: '8:00 AM - 8:00 PM',
                    friday: '8:00 AM - 8:00 PM',
                    saturday: '9:00 AM - 6:00 PM',
                    sunday: '9:00 AM - 4:00 PM',
                  };
                  setFormData(prev => ({ ...prev, timing: preset }));
                }}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors duration-200"
              >
                Business Hours
              </button>
              <button
                type="button"
                onClick={() => {
                  const preset = {
                    monday: '12:00 AM - 11:59 PM',
                    tuesday: '12:00 AM - 11:59 PM',
                    wednesday: '12:00 AM - 11:59 PM',
                    thursday: '12:00 AM - 11:59 PM',
                    friday: '12:00 AM - 11:59 PM',
                    saturday: '12:00 AM - 11:59 PM',
                    sunday: '12:00 AM - 11:59 PM',
                  };
                  setFormData(prev => ({ ...prev, timing: preset }));
                }}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
              >
                Always Open
              </button>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-emerald-500" />
            <span>Pricing Plans</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Monthly (₹)
              </label>
              <input
                type="number"
                value={formData.pricing.monthly}
                onChange={e =>
                  handleNestedChange('pricing', 'monthly', e.target.value)
                }
                placeholder="Monthly price"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quarterly (₹)
              </label>
              <input
                type="number"
                value={formData.pricing.quarterly}
                onChange={e =>
                  handleNestedChange('pricing', 'quarterly', e.target.value)
                }
                placeholder="Quarterly price"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Yearly (₹)
              </label>
              <input
                type="number"
                value={formData.pricing.yearly}
                onChange={e =>
                  handleNestedChange('pricing', 'yearly', e.target.value)
                }
                placeholder="Yearly price"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Sports & Equipment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Sports */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Available Sports
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newSport}
                  onChange={e => setNewSport(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a sport</option>
                  {predefinedSports.map(sport => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray('availableSports', newSport, setNewSport)
                  }
                  disabled={isAddingItem === 'availableSports'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'availableSports' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.availableSports.map((sport, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{sport}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('availableSports', index)}
                      disabled={isAddingItem === 'availableSports'}
                      className="text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'availableSports' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Amenities
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newAmenity}
                  onChange={e => setNewAmenity(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select an amenity</option>
                  {predefinedAmenities.map(amenity => (
                    <option key={amenity} value={amenity}>
                      {amenity}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray('amenities', newAmenity, setNewAmenity)
                  }
                  disabled={isAddingItem === 'amenities'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'amenities' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('amenities', index)}
                      disabled={isAddingItem === 'amenities'}
                      className="text-purple-500 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'amenities' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strength Equipment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Strength Equipment
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newStrengthEquipment}
                  onChange={e => setNewStrengthEquipment(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select strength equipment</option>
                  {predefinedStrengthEquipment
                    .filter(item => !formData.strengthEquipments.includes(item))
                    .map(equipment => (
                      <option key={equipment} value={equipment}>
                        {equipment}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray(
                      'strengthEquipments',
                      newStrengthEquipment,
                      setNewStrengthEquipment
                    )
                  }
                  disabled={isAddingItem === 'strengthEquipments'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'strengthEquipments' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.strengthEquipments.map((equipment, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{equipment}</span>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromArray('strengthEquipments', index)
                      }
                      disabled={isAddingItem === 'strengthEquipments'}
                      className="text-orange-500 hover:text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'strengthEquipments' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cardio Equipment */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Cardio Equipment
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newCardioEquipment}
                  onChange={e => setNewCardioEquipment(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select cardio equipment</option>
                  {predefinedCardioEquipment
                    .filter(item => !formData.cardioEquipments.includes(item))
                    .map(equipment => (
                      <option key={equipment} value={equipment}>
                        {equipment}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray(
                      'cardioEquipments',
                      newCardioEquipment,
                      setNewCardioEquipment
                    )
                  }
                  disabled={isAddingItem === 'cardioEquipments'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'cardioEquipments' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.cardioEquipments.map((equipment, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{equipment}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('cardioEquipments', index)}
                      disabled={isAddingItem === 'cardioEquipments'}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'cardioEquipments' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Services
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newService}
                  onChange={e => setNewService(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  {predefinedServices
                    .filter(item => !formData.services.includes(item))
                    .map(service => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray('services', newService, setNewService)
                  }
                  disabled={isAddingItem === 'services'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'services' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('services', index)}
                      disabled={isAddingItem === 'services'}
                      className="text-green-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'services' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Benefits
            </h3>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <select
                  value={newBenefit}
                  onChange={e => setNewBenefit(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select a benefit</option>
                  {predefinedBenefits
                    .filter(item => !formData.benefits.includes(item))
                    .map(benefit => (
                      <option key={benefit} value={benefit}>
                        {benefit}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    addToArray('benefits', newBenefit, setNewBenefit)
                  }
                  disabled={isAddingItem === 'benefits'}
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAddingItem === 'benefits' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <span>{benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('benefits', index)}
                      disabled={isAddingItem === 'benefits'}
                      className="text-teal-500 hover:text-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingItem === 'benefits' ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social Media */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Globe className="w-6 h-6 text-emerald-500" />
            <span>Contact & Social Media</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={e => handleInputChange('website', e.target.value)}
                placeholder="https://your-gym-website.com"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rate Card URL
              </label>
              <input
                type="url"
                value={formData.rateCard}
                onChange={e => handleInputChange('rateCard', e.target.value)}
                placeholder="Link to pricing/rate card"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Facebook className="w-4 h-4 inline mr-2" />
                Facebook
              </label>
              <input
                type="url"
                value={formData.socialMediaLinks.facebook}
                onChange={e =>
                  handleNestedChange(
                    'socialMediaLinks',
                    'facebook',
                    e.target.value
                  )
                }
                placeholder="Facebook page URL"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Instagram className="w-4 h-4 inline mr-2" />
                Instagram
              </label>
              <input
                type="url"
                value={formData.socialMediaLinks.instagram}
                onChange={e =>
                  handleNestedChange(
                    'socialMediaLinks',
                    'instagram',
                    e.target.value
                  )
                }
                placeholder="Instagram profile URL"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="w-6 h-6 text-emerald-500" />
            <span>Gym Rules</span>
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newRule}
                onChange={e => setNewRule(e.target.value)}
                placeholder="e.g., No outside food allowed, Clean equipment after use"
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => addToArray('rules', newRule, setNewRule)}
                disabled={isAddingItem === 'rules'}
                className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAddingItem === 'rules' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <span>Add Rule</span>
                )}
              </button>
            </div>

            <div className="space-y-2">
              {formData.rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600 font-bold">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromArray('rules', index)}
                    disabled={isAddingItem === 'rules'}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                  >
                    {isAddingItem === 'rules' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{submitButtonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
