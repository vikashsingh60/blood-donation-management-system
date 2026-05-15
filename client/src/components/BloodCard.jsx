import { FaPhoneAlt, FaMapMarkerAlt, FaTint } from "react-icons/fa";
const BloodCard = ({ donor }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
      {/* Blood Group */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-red-600">
          {donor.bloodGroup}
        </h2>

        <div className="bg-red-100 p-3 rounded-full text-red-600 text-xl">
          <FaTint />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {donor.name}
      </h3>

      {/* City */}
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaMapMarkerAlt />
        <span>{donor.city}</span>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <FaPhoneAlt />
        <span>{donor.phone}</span>
      </div>

      {/* Button */}
      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">
        Request Blood
      </button>
    </div>
  );
};

export default BloodCard;