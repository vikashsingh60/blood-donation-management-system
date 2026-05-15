import { useEffect, useState } from "react";

import axios from "axios";

const MatchedDonors = () => {

  const [donors, setDonors] = useState([]);

  useEffect(() => {

    fetchDonors();

  }, []);

  const fetchDonors = async () => {

    try {

      const requestId =
        localStorage.getItem("requestId");

      if (!requestId) {

        console.log("No Request ID Found");

        return;

      }

      const res = await axios.get(

        `http://localhost:5000/api/match/${requestId}`

      );

      setDonors(res.data.donors || []);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-red-50 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">

        Matched Donors

      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {donors.length > 0 ? (

          donors.map((donor) => (

            <div
              key={donor._id}
              className="bg-white shadow-lg rounded-2xl p-5"
            >

              <h2 className="text-xl font-bold">

                {donor.name}

              </h2>

              <p className="mt-2">

                Blood Group:
                <span className="text-red-600 font-semibold ml-2">

                  {donor.bloodGroup}

                </span>

              </p>

              <p className="mt-2">

                City:
                <span className="ml-2">

                  {donor.city}

                </span>

              </p>

            </div>

          ))

        ) : (

          <div className="text-gray-600 text-lg">

            No matched donors found.

          </div>

        )}

      </div>

    </div>

  );

};

export default MatchedDonors;