// src/tour/Loading.tsx
import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Image 
          src="/tube-spinner.svg" 
          alt="Loading..." 
          width={120} 
          height={120}
          className="mx-auto mb-4"
        />
        <div className="text-xl text-gray-600">Loading tours...</div>
      </div>
    </main>
  );
};

export default Loading;