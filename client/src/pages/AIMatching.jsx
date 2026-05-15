import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  FaRobot,
  FaUserFriends,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint
} from "react-icons/fa";

const AIMatching = () => {

  const [matchedDonors, setMatchedDonors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMatchedDonors();

  }, []);

  // FETCH MATCHED DONORS
  const fetchMatchedDonors = async () => {

    try {

      const requestId =
        localStorage.getItem("requestId");

      // API CALL
      const res = await axios.get(

        `http://localhost:5000/api/match/${requestId}`

      );

      setMatchedDonors(res.data.donors || []);

    } catch (error) {

      console.log(error);

      // DEMO DATA
      setMatchedDonors([

        {
          _id: 1,
          name: "Rahul Singh",
          bloodGroup: "A+",
          city: "Delhi",
          distance: "2 KM",
          match: "98%",
          phone: "9876543210"
        },

        {
          _id: 2,
          name: "Aman Verma",
          bloodGroup: "A+",
          city: "Noida",
          distance: "4 KM",
          match: "95%",
          phone: "9876543211"
        },

        {
          _id: 3,
          name: "Rohit Sharma",
          bloodGroup: "A+",
          city: "Ghaziabad",
          distance: "5 KM",
          match: "92%",
          phone: "9876543212"
        }

      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#fff5f5] px-4 sm:px-6 lg:px-10 py-10">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">

        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 text-5xl shadow-lg">

          <FaRobot />

        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-800">

          AI Blood Matching

        </h1>

        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">

          Smart AI system finds the nearest and most suitable blood donors instantly.

        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="flex justify-center items-center mt-20">

          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>

        </div>

      ) : (

        <>
          {/* MATCHED DONORS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">

            {matchedDonors.length > 0 ? (

              matchedDonors.map((donor) => (

                <div
                  key={donor._id}
                  className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
                >

                  {/* ICON */}
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-4xl">

                    <FaUserFriends />

                  </div>

                  {/* NAME */}
                  <h2 className="mt-6 text-2xl font-bold text-gray-800">

                    {donor.name}

                  </h2>

                  {/* BLOOD */}
                  <div className="flex items-center gap-2 mt-4 text-red-600 font-semibold text-lg">

                    <FaTint />

                    {donor.bloodGroup}

                  </div>

                  {/* CITY */}
                  <div className="flex items-center gap-2 mt-3 text-gray-700">

                    <FaMapMarkerAlt />

                    {donor.city}

                  </div>

                  {/* DISTANCE */}
                  <p className="mt-3 text-gray-700">

                    Distance:
                    <span className="font-semibold ml-2">

                      {donor.distance}

                    </span>

                  </p>

                  {/* MATCH */}
                  <p className="mt-3 text-gray-700">

                    Match Accuracy:
                    <span className="text-green-600 font-bold ml-2">

                      {donor.match}

                    </span>

                  </p>

                  {/* BUTTON */}
                  <button className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2">

                    <FaPhoneAlt />

                    Contact Donor

                  </button>

                </div>

              ))

            ) : (

              <div className="col-span-full text-center text-gray-600 text-xl">

                No matched donors found.

              </div>

            )}

          </div>
        </>

      )}

    </div>

  );
};

export default AIMatching;