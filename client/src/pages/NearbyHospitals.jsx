import React, { useEffect, useState } from "react";

import {
  FaHospital,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTint
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import heroBg from "../assets/Hero.jpeg";

const NearbyHospitals = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  // MOST POPULAR HOSPITALS
  const popularHospitals = [

    {
      id: 1,
      name: "AIIMS Gorakhpur",
      blood: "A+, B+, O+, AB+",
      city: "Gorakhpur",
      emergency: "24/7 Emergency"
    },

    {
      id: 2,
      name: "District Hospital Deoria",
      blood: "A-, B+, O-",
      city: "Deoria",
      emergency: "Emergency Support"
    },

    {
      id: 3,
      name: "KGMU Hospital",
      blood: "A+, O+, AB-",
      city: "Lucknow",
      emergency: "Advanced Trauma Care"
    },

    {
      id: 4,
      name: "Apollo Hospital",
      blood: "A+, B-, O+",
      city: "Lucknow",
      emergency: "Emergency Unit"
    },

    {
      id: 5,
      name: "Heritage Hospital",
      blood: "AB+, O+, B+",
      city: "Varanasi",
      emergency: "Blood Support"
    },

    {
      id: 6,
      name: "Metro Hospital",
      blood: "A+, O-, AB+",
      city: "Gorakhpur",
      emergency: "ICU Available"
    },

    {
      id: 7,
      name: "LifeCare Hospital",
      blood: "B+, O+, AB+",
      city: "Deoria",
      emergency: "Emergency Blood Bank"
    },

    {
      id: 8,
      name: "Max Hospital",
      blood: "A-, B+, O+",
      city: "Lucknow",
      emergency: "Trauma Center"
    },

    {
      id: 9,
      name: "Sunrise Hospital",
      blood: "AB+, O-, A+",
      city: "Gorakhpur",
      emergency: "24 Hour Emergency"
    },

    {
      id: 10,
      name: "Medanta Hospital",
      blood: "A+, B+, AB+",
      city: "Lucknow",
      emergency: "Critical Care"
    }

  ];

  // OTHER HOSPITALS
  const otherHospitals = [

    {
      id: 11,
      name: "City Hospital",
      blood: "A+, B+, O+",
      city: "Deoria"
    },

    {
      id: 12,
      name: "Sahara Hospital",
      blood: "A-, O+, B+",
      city: "Lucknow"
    },

    {
      id: 13,
      name: "HealthCare Hospital",
      blood: "AB+, O-, A+",
      city: "Gorakhpur"
    },

    {
      id: 14,
      name: "Emergency Care Hospital",
      blood: "A+, O+, B-",
      city: "Deoria"
    },

    {
      id: 15,
      name: "New Life Hospital",
      blood: "AB+, O+, A-",
      city: "Lucknow"
    }

  ];

  // AUTO SLIDER
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>

        prev === popularHospitals.length - 1
          ? 0
          : prev + 1

      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="w-full overflow-x-hidden bg-[#fff5f5] dark:bg-slate-950">

      {/* HERO SECTION */}
      <section className="relative h-[80vh] overflow-hidden">

        {/* NAVBAR */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">

          <Navbar />

        </div>

        {/* SLIDER */}
        <div
          className="flex transition-transform duration-1000 h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >

          {popularHospitals.map((hospital) => (

            <div
              key={hospital.id}
              className="min-w-full h-full relative bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroBg})`
              }}
            >

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/50" />

              {/* CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-24">

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">

                  {hospital.name}

                </h1>

                <p className="mt-6 text-white/90 text-base sm:text-xl max-w-3xl leading-relaxed">

                  {hospital.city} • {hospital.emergency}

                </p>

                <div className="mt-5 flex items-center gap-2 text-red-300 font-semibold text-lg">

                  <FaTint />

                  {hospital.blood}

                </div>

                <button className="mt-8 bg-red-600 hover:bg-red-700 transition text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3">

                  <FaPhoneAlt />

                  Contact Hospital

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MOST POPULAR HOSPITALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="text-center">

            <h2 className="text-4xl sm:text-5xl font-extrabold text-red-600">

              Most Popular Hospitals

            </h2>

            <p className="mt-4 text-gray-600 text-lg">

              Trusted emergency hospitals and blood banks.

            </p>

          </div>

          {/* HOSPITAL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">

            {popularHospitals.map((hospital) => (

              <div
                key={hospital.id}
                className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
              >

                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-4xl">

                  <FaHospital />

                </div>

                <h3 className="mt-6 text-3xl font-bold text-gray-800">

                  {hospital.name}

                </h3>

                <div className="flex items-center gap-2 mt-4 text-gray-700 text-lg">

                  <FaMapMarkerAlt />

                  {hospital.city}

                </div>

                <div className="flex items-center gap-2 mt-4 text-red-600 font-semibold text-lg">

                  <FaTint />

                  {hospital.blood}

                </div>

                <p className="mt-4 text-gray-600 text-lg">

                  {hospital.emergency}

                </p>

                <button className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">

                  <FaPhoneAlt />

                  Contact Hospital

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* OTHER HOSPITALS */}
      <section className="pb-24 px-4 sm:px-6 lg:px-10">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-14">

            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">

              Other Hospitals

            </h2>

            <p className="mt-4 text-gray-600 text-lg">

              More hospitals available for blood donation support.

            </p>

          </div>

          {/* OTHER HOSPITALS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {otherHospitals.map((hospital) => (

              <div
                key={hospital.id}
                className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
              >

                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">

                  <FaHospital />

                </div>

                <h3 className="mt-5 text-2xl font-bold text-gray-800">

                  {hospital.name}

                </h3>

                <div className="flex items-center gap-2 mt-4 text-gray-700">

                  <FaMapMarkerAlt />

                  {hospital.city}

                </div>

                <div className="flex items-center gap-2 mt-3 text-red-600 font-semibold">

                  <FaTint />

                  {hospital.blood}

                </div>

                <button className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2">

                  <FaPhoneAlt />

                  Contact

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );
};

export default NearbyHospitals;