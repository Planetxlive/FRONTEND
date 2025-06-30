import Image from 'next/image';

const screenshots = [
  {
    title: 'View Traveller Profiles',
    subtitle: "See who's going!",
    image: '/images/u1.png',
    bg: 'bg-amber-400',
  },
  {
    title: "Join your hostel's Chat",
    subtitle: 'Chat with travellers 14 days before check-in',
    image: '/images/u2.png',
    bg: 'bg-cyan-400',
  },
  {
    title: 'RSVP to Linkups',
    subtitle: 'Explore and hang out with travellers.',
    image: '/images/u3.png',
    bg: 'bg-blue-600',
  },
  {
    title: 'RSVP to Linkups',
    subtitle: 'Explore and hang out with travellers.',
    image: '/images/u3.png',
    bg: 'bg-blue-600',
  },
];

export default function ScreenshotSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div
        className="flex flex-col md:flex-row gap-6 justify-center items-stretch md:overflow-visible overflow-x-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex md:flex-row flex-row md:w-full w-max gap-6 md:gap-6 snap-x snap-mandatory">
          {screenshots.map((shot, idx) => (
            <div
              key={idx}
              className={`relative flex-shrink-0 flex-1 md:min-w-0 min-w-[80vw] max-w-xs rounded-2xl p-6 flex flex-col items-center shadow-lg ${shot.bg} snap-center`}
              style={{ minHeight: 480 }}
            >
              <div
                className="absolute left-0 top-0 -translate-y-1/4 -translate-x-1/8 z-10"
                style={{ transform: 'translate(-12px, -24px) rotate(-3deg)' }}
              >
                <div className="bg-white rounded-md px-6 py-3 shadow-md">
                  <h3 className="font-bold text-2xl text-black mb-1 leading-tight">
                    {shot.title}
                  </h3>
                  <p className="text-black text-base leading-tight">
                    {shot.subtitle}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center mb-4 mt-12">
                <div className=" rounded-3xl p-2 w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={shot.image}
                    alt={shot.title}
                    width={200}
                    height={400}
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
