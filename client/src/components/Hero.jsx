import Navbar from "./Navbar";
import heroBg from "../assets/Hero.jpeg";
import { motion } from "framer-motion";

import Heartbeat from "../assets/heartbeat.png";
import Pulse from "../assets/cardiogram.png";

import SafeIcon from "../assets/saveblood.png";
import UsersIcon from "../assets/public-health.png";
import TimeIcon from "../assets/presence.png";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans">

      {/* Background */}
      <img
        src={heroBg}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt="background"
      />

      <Navbar />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-24 pb-16">

        {/* 🔴 TOP HEARTBEAT */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={Pulse} className="w-10 opacity-50" />
          <img src={Heartbeat} className="w-8" />
          <img src={Pulse} className="w-10 opacity-50" />
        </div>

        {/* SMALL TEXT */}
        <p className="text-[11px] md:text-sm tracking-[0.35em] text-gray-500 uppercase mb-3">
          Every Drop Counts
        </p>

        {/* HEADING */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-[#1A2E35] leading-tight tracking-tight">
          DONATE
        </h1>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-red-600 leading-[0.9] mb-6 tracking-tight">
          YOUR BLOOD
        </h1>

        {/* TAGLINE (LIGHT UNDERLINE FIX) */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-gray-200"></div>

          <p className="text-sm md:text-lg text-gray-600 uppercase tracking-wide">
            Save a life,{" "}
            <span className="text-red-600 font-semibold">be a hero</span>
          </p>

          <div className="h-[1px] w-12 bg-gray-200"></div>
        </div>

        {/* 🔥 FEATURES (PERFECT ALIGNMENT FIX) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">

          {[
            {
              icon: SafeIcon,
              title: "SAFE DONATION",
              desc: "100% safe and hygienic process",
            },
            {
              icon: UsersIcon,
              title: "SAVE LIVES",
              desc: "Your blood can bring someone back to life",
            },
            {
              icon: TimeIcon,
              title: "BE THERE",
              desc: "Available when someone needs it most",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center max-w-[220px] mx-auto"
            >
              {/* ICON */}
              <img
                src={item.icon}
                alt=""
                className="w-12 h-12 object-contain mb-3"
              />

              {/* TITLE */}
              <p className="text-red-600 font-semibold text-[14px] tracking-wide">
                {item.title}
              </p>

              {/* DESCRIPTION (FIXED SPACING) */}
              <p className="text-[12px] text-gray-500 mt-1 leading-relaxed px-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;