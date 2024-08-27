import React from 'react';

import salonIcon from '../Assets/salon-icon.png';
import laundryIcon from '../Assets/laundry-icon.png';
import canteenIcon from '../Assets/canteen-icon.png';
import cycleIcon from '../Assets/cycle-icon.png';
import backgroundImage from '../Assets/backg-img.jpg'; // Ensure this image is high quality

export default function Home() {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content Container */}
      <div className="relative z-10 p-8 lg:p-16">
        {/* Header */}
        <header className="text-center mb-12 lg:mb-24">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">Campus Connect</h1>
          <p className="text-lg lg:text-2xl">Your Hub for Campus Services</p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Laundry Box */}
          <div 
            className="flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300 hover:bg-opacity-90"
            onClick={() => window.location.href = 'laundry-website-url'}
          >
            <img src={laundryIcon} alt="Laundry" className="w-24 h-24 mb-4 transition-transform transform hover:rotate-6 duration-300" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Laundry</h2>
            <p className="text-sm text-gray-900 text-center">
              Convenient and quick laundry services at your fingertips.
            </p>
          </div>
          {/* Canteen Box */}
          <div 
            className="flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300 hover:bg-opacity-90"
            onClick={() => window.location.href = 'canteen-website-url'}
          >
            <img src={canteenIcon} alt="Canteen" className="w-24 h-24 mb-4 transition-transform transform hover:rotate-6 duration-300" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Canteen</h2>
            <p className="text-sm text-gray-900 text-center">
              Delicious and nutritious meals served daily.
            </p>
          </div>
          {/* Salon Box */}
          <div 
            className="flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300 hover:bg-opacity-90"
            onClick={() => window.location.href = 'salon-website-url'}
          >
            <img src={salonIcon} alt="Salon" className="w-24 h-24 mb-4 transition-transform transform hover:rotate-6 duration-300" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Saloon</h2>
            <p className="text-sm text-gray-900 text-center">
              Get a fresh look at our campus salon.
            </p>
          </div>
          {/* Cycle Booking Box */}
          <div 
            className="flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300 hover:bg-opacity-90"
            onClick={() => window.location.href = 'cycle-booking-website-url'}
          >
            <img src={cycleIcon} alt="Cycle Booking" className="w-24 h-24 mb-4 transition-transform transform hover:rotate-6 duration-300" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Cycle Booking</h2>
            <p className="text-sm text-gray-900 text-center">
              Easily book a cycle for your campus commute.
            </p>
          </div>
        </main>

        {/* Interactive Section */}
        <section className="mt-12 lg:mt-24 text-center">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4">Get In Touch</h3>
          <p className="text-lg mb-4">
            If you have any questions or face issues with the website, feel free to contact us.
          </p>
          <a 
            href="mailto:lnmiitcampusconnect@gmail.com" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}
