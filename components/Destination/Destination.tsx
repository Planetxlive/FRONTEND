'use client';

import SectionHeading from '../Helper/SectionHeading';
import DestinationSlider from './DestinationSlider';

const Destination = () => {
  return (
    <div className="pt-20 pb-20">
      <SectionHeading
        heading="Exploring Popular Destinations"
        sub="Discover amazing places around the world with our handpicked travel experiences"
      />
      <div className="mt-14 w-[90%] mx-auto">
        <DestinationSlider />
      </div>
    </div>
  );
};

export default Destination;
