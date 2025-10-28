'use client';
import Tours from '@/tour/component/Tours';
import Loading from '@/tour/Loading';
import { Tour } from '@/tour/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const url = 'https://www.course-api.com/react-tours-project';
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const toursData: Tour[] = await response.json();
      setTours(toursData);
    } catch (error) {
      console.log(error);
      setError('Failed to load tours');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  // const handleRemove=(id:string)=>{
  // setTours((prevTours)=>prevTours.filter((tour)=> tour.id !== id))
  // }
  // Works but can have stale state issues
  const handleRemove = (id: string) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>

        <button
          onClick={fetchTours}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  if (tours.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">No Tours Left</h2>

        <button
          className=" bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 capitalize mt-auto"
          onClick={() => fetchTours()}
        >
          Refresh
        </button>
      </div>
    );
  }
  return (
    <section>
      <Tours tours={tours} onRemoveTour={handleRemove} />
    </section>
  );
}
