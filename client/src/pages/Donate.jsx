import Navbar from "../components/Navbar";
import DonateForm from "../components/DonateForm";

import heroBg from "../assets/Hero.jpeg";

import {
  FaMapMarkedAlt,
  FaUserFriends,
  FaBell,
  FaHeartbeat,
  FaHospital
} from "react-icons/fa";

const Donate = () => {

  return (

    <div className="w-full overflow-x-hidden bg-white dark:bg-slate-950">

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-center lg:bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* NAVBAR */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">

          <Navbar />

        </div>

        {/* MAIN CONTAINER */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 pb-14">

          {/* HERO CONTENT */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center min-h-[80vh]">

            {/* LEFT SIDE */}
            <div className="text-white xl:pr-10">

              {/* BADGE */}
              <span className="inline-block bg-red-500/20 backdrop-blur-md border border-red-300/30 px-5 py-2 rounded-full text-sm font-semibold">

                Save Lives Today

              </span>

              {/* HEADING */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">

                Donate Blood <br />

                <span className="text-red-400">
                  Save Lives
                </span>

              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 text-white text-base sm:text-lg leading-relaxed max-w-2xl">

                Join our blood donation community and help patients
                during emergencies with instant donor support,
                AI matching and live blood tracking.

              </p>

              {/* FEATURE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

                {/* LIVE LOCATION */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-5">

                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-xl">

                    <FaMapMarkedAlt />

                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    Live Location
                  </h3>

                  <p className="mt-3 text-white/90 leading-relaxed">

                    Detect nearby donors and hospitals instantly.

                  </p>

                </div>

                {/* AI MATCHING */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-5">

                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-xl">

                    <FaUserFriends />

                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    AI Matching
                  </h3>

                  <p className="mt-3 text-white/90 leading-relaxed">

                    Smart AI instantly finds matching donors.

                  </p>

                </div>

                {/* EMERGENCY */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-5">

                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-xl">

                    <FaBell />

                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    Emergency
                  </h3>

                  <p className="mt-3 text-white/90 leading-relaxed">

                    Fast emergency blood request support.

                  </p>

                </div>

                {/* HOSPITALS */}
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-5">

                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white text-xl">

                    <FaHospital />

                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    Hospitals
                  </h3>

                  <p className="mt-3 text-white/90 leading-relaxed">

                    Connected hospital network for emergencies.

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center xl:justify-end">

              <div className="w-full max-w-[470px] mt-6 xl:mt-0">

                <DonateForm />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* DONATION COUNT SECTION */}
      <section className="bg-[#fff7f7] py-16 px-4 sm:px-6 lg:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* DONATIONS */}
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 text-4xl">

                <FaHeartbeat />

              </div>

              <h2 className="mt-6 text-5xl font-extrabold text-red-600">

                12,580+

              </h2>

              <p className="mt-3 text-lg text-gray-700">

                Blood Donations

              </p>

            </div>

            {/* HOSPITALS */}
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-extrabold text-red-600">

                250+

              </h2>

              <p className="mt-3 text-lg text-gray-700">

                Connected Hospitals

              </p>

            </div>

            {/* DONORS */}
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

              <h2 className="text-5xl font-extrabold text-red-600">

                8,900+

              </h2>

              <p className="mt-3 text-lg text-gray-700">

                Active Donors

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
};

export default Donate;