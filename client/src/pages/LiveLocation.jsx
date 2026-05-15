import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const donors = [
  { name: "Ravi Kumar", blood: "A+", distance: "4 KM", phone: "9876543210" },
  { name: "Anita Singh", blood: "O-", distance: "7 KM", phone: "9123456780" },
  { name: "Suresh Yadav", blood: "B+", distance: "2 KM", phone: "9988776655" },
];

const LiveLocation = () => {
  return (
    <div className="min-h-screen bg-[#fff5f5] p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
        Live Location Tracking
      </h1>

      {/* MAP */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaMapMarkerAlt className="text-red-600 text-2xl" />
          <h2 className="text-2xl font-bold">Nearby Donors Map</h2>
        </div>
        <div className="w-full h-[350px] rounded-2xl overflow-hidden">
          <iframe
            title="map"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAP_KEY&q=hospital`}
          ></iframe>
        </div>
      </div>

      {/* DONORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800">{donor.name}</h3>
            <p className="mt-3 text-lg text-red-600 font-semibold">
              Blood Group: {donor.blood}
            </p>
            <p className="mt-2 text-gray-600">Distance: {donor.distance}</p>
            <a href={`tel:${donor.phone}`}>
              <button className="mt-5 bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-2xl flex items-center gap-2">
                <FaPhoneAlt />
                Contact Donor
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveLocation;
