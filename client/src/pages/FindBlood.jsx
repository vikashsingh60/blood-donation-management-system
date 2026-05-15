import { useEffect, useState } from "react";
import axios from "axios";
import { FaTint, FaSearch } from "react-icons/fa";

import Navbar from "../components/Navbar";
import BloodCard from "../components/BloodCard";

import heroBg from "../assets/Hero.jpeg";

const FindBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonors = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/users/find-donors?bloodGroup=${bloodGroup}&city=${city}`
      );

      setDonors(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Background */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 pt-32 px-4 pb-10">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center justify-center gap-4">
                <FaTint className="text-red-500" />
                Find Blood Donors
              </h1>

              <p className="text-gray-200 mt-4 text-lg md:text-xl">
                Search verified blood donors instantly during emergencies.
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 mb-14">
              <div className="grid md:grid-cols-3 gap-5">

                {/* Blood Group */}
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="bg-white/90 text-gray-800 p-4 rounded-2xl outline-none font-medium"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                {/* City */}
                <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-white/90 text-gray-800 p-4 rounded-2xl outline-none font-medium"
                />

                {/* Search Button */}
                <button
                  onClick={fetchDonors}
                  className="bg-red-600 hover:bg-red-700 transition duration-300 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 py-4"
                >
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center text-white text-2xl font-semibold">
                Loading Donors...
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {donors.length > 0 ? (
                  donors.map((donor) => (
                    <BloodCard key={donor._id} donor={donor} />
                  ))
                ) : (
                  <div className="col-span-full text-center text-white text-3xl font-medium">
                    No Donors Found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindBlood;