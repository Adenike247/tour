// tour/component/Tours.tsx
import { Tour } from '@/tour/types/index';
import Image from 'next/image';
import { useState } from 'react';

interface ToursProps {
  tours: Tour[];
  onRemoveTour?: (id: string) => void;
}

export default function Tours({ tours, onRemoveTour }: ToursProps) {
  const [readMoreStates, setReadMoreStates] = useState<{ [key: string]: boolean }>({});



  const toggleReadMore = (id: string) => {
    setReadMoreStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRemoveTour = (id: string) => {
    if (onRemoveTour) {
      onRemoveTour(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-3">Our Tours</h1>
      <div className='flex justify-center'>
          <div className='w-16 rounded-2xl h-1 bg-green-500 mb-4'></div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full" // Added flex layout
          >
            <div className="relative w-full h-48 flex-shrink-0"> {/* Prevent image squishing */}
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className="text-white hover:bg-green-600 bg-green-500 py-1 px-1.5 absolute right-0 font-medium text-sm">
                {`$${tour.price}`}
              </span>
            </div>
            
            {/* Content area with flex layout */}
            <div className="p-4 flex flex-col flex-grow"> {/* Added flex layout */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {tour.name}
                </h3>
              </div>
              
              {/* Text content with flexible height */}
              <div className="flex-grow mb-4"> {/* This will grow to fill space */}
                <p className="text-gray-600">
                  {readMoreStates[tour.id] ? tour.info : `${tour.info.substring(0, 200)}...`}
                </p>
                {tour.info.length > 200 && (
                  <button
                    type="button"
                    onClick={() => toggleReadMore(tour.id)}
                    className="text-green-500 capitalize hover:text-green-600 transition-colors mt-1"
                  >
                    {readMoreStates[tour.id] ? 'show less' : 'read more'}
                  </button>
                )}
              </div>

              {/* Button pushed to bottom */}
              <button
                onClick={() => handleRemoveTour(tour.id)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 capitalize mt-auto" // Now works with flex parent
              >
                Not interested
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}