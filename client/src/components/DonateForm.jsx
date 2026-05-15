import { useState } from "react";

import loveImg from "../assets/love.png";

import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
  FaEnvelope,
  FaVenusMars,
  FaWeight
} from "react-icons/fa";

const DonateForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    weight: "",
    lastDonationDate: ""
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    if (formData.age < 18 || formData.weight < 50) {

      alert("You are not eligible for donation");

      return;
    }

    console.log(formData);

    alert("Donation Request Submitted");

  };

  return (

    <div className="w-full max-w-[470px] mx-auto bg-white/95 backdrop-blur-md rounded-[26px] shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-red-600 text-white px-4 sm:px-5 py-4 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-2">

          <img
            src={loveImg}
            alt="love"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
          />

        </div>

        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-bold">
          Blood Donation Form
        </h2>

        <p className="text-red-100 text-xs sm:text-sm mt-1">
          Your donation can save lives.
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-3 sm:p-4 space-y-3"
      >

        {/* FULL NAME */}
        <div>

          <label className="font-semibold text-gray-700 text-sm">
            Full Name
          </label>

          <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

            <span className="px-4 text-red-500">
              <FaUser />
            </span>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base"
              required
            />

          </div>

        </div>

        {/* BLOOD + GENDER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* BLOOD */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Blood Group
            </label>

            <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

              <span className="px-4 text-red-500">
                <FaTint />
              </span>

              <select
                name="bloodGroup"
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:py-3 outline-none bg-white text-sm sm:text-base"
                required
              >

                <option value="">
                  Select
                </option>

                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>

              </select>

            </div>

          </div>

          {/* GENDER */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Gender
            </label>

            <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

              <span className="px-4 text-red-500">
                <FaVenusMars />
              </span>

              <select
                name="gender"
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:py-3 outline-none bg-white text-sm sm:text-base"
                required
              >

                <option value="">
                  Select
                </option>

                <option>Male</option>
                <option>Female</option>
                <option>Other</option>

              </select>

            </div>

          </div>

        </div>

        {/* AGE + WEIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* AGE */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Age
            </label>

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="w-full border px-3 py-2.5 sm:py-3 rounded-2xl outline-none mt-2 text-sm sm:text-base"
              required
            />

          </div>

          {/* WEIGHT */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Weight
            </label>

            <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

              <span className="px-4 text-red-500">
                <FaWeight />
              </span>

              <input
                type="number"
                name="weight"
                placeholder="Weight"
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base"
                required
              />

            </div>

          </div>

        </div>

        {/* PHONE + EMAIL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* PHONE */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Phone
            </label>

            <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

              <span className="px-4 text-red-500">
                <FaPhone />
              </span>

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base"
                required
              />

            </div>

          </div>

          {/* EMAIL */}
          <div>

            <label className="font-semibold text-gray-700 text-sm">
              Email
            </label>

            <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

              <span className="px-4 text-red-500">
                <FaEnvelope />
              </span>

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base"
              />

            </div>

          </div>

        </div>

        {/* CITY */}
        <div>

          <label className="font-semibold text-gray-700 text-sm">
            City
          </label>

          <div className="flex items-center border rounded-2xl overflow-hidden mt-2 bg-white">

            <span className="px-4 text-red-500">
              <FaMapMarkerAlt />
            </span>

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              onChange={handleChange}
              className="w-full px-3 py-2.5 sm:py-3 outline-none text-sm sm:text-base"
              required
            />

          </div>

        </div>

        {/* LAST DONATION DATE */}
        <div>

          <label className="font-semibold text-gray-700 text-sm">
            Last Donation Date (Optional)
          </label>

          <input
            type="date"
            name="lastDonationDate"
            onChange={handleChange}
            className="w-full border px-3 py-2.5 sm:py-3 rounded-2xl outline-none mt-2 text-sm sm:text-base"
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-3 rounded-2xl font-bold text-base shadow-lg"
        >
          Donate Now
        </button>

      </form>

    </div>

  );
};

export default DonateForm;