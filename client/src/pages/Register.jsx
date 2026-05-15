import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "donor",

    // Common
    name: "",
    email: "",
    phone: "",
    password: "",

    // Donor
    bloodGroup: "",
    age: "",
    lastDonationDate: "",

    // Patient
    abhaNumber: "",
    healthDetails: "",
    bloodRequirement: "",

    // Hospital
    hospitalName: "",
    hospitalType: "",
    hospitalLicense: "",
    address: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData);

    try {
      const response = await API.post(
        "/api/auth/register",
        formData
      );

      console.log("Success:", response.data);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log("Full Error:", error);

      console.log("Response Data:", error.response?.data);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-slate-300">
            Register for Blood Donation System
          </p>
        </div>

        {/* Emergency */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-slate-300">
            Patients can register with ABHA for faster emergency matching.
          </p>

          <Link
            to="/emergency"
            className="text-red-600 font-semibold hover:text-red-400"
          >
            Create an emergency request
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <select
            name="role"
            className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
          </select>

          {/* Common Fields */}
          {formData.role !== "hospital" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.name}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.email}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
            value={formData.password}
            required
          />

          {/* Patient Fields */}
          {formData.role === "patient" && (
            <>
              <input
                type="text"
                name="abhaNumber"
                placeholder="ABHA Card Number"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.abhaNumber}
                required
              />

              <input
                type="text"
                name="healthDetails"
                placeholder="Health Details / Disease"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.healthDetails}
                required
              />

              <select
                name="bloodRequirement"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.bloodRequirement}
                required
              >
                <option value="">Required Blood Group</option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>

                <option value="B+">B+</option>
                <option value="B-">B-</option>

                <option value="O+">O+</option>
                <option value="O-">O-</option>

                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </>
          )}

          {/* Donor Fields */}
          {formData.role === "donor" && (
            <>
              <select
                name="bloodGroup"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.bloodGroup}
                required
              >
                <option value="">Select Blood Group</option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>

                <option value="B+">B+</option>
                <option value="B-">B-</option>

                <option value="O+">O+</option>
                <option value="O-">O-</option>

                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.age}
                min="18"
                required
              />

              <input
                type="date"
                name="lastDonationDate"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.lastDonationDate}
              />
            </>
          )}

          {/* Hospital Fields */}
          {formData.role === "hospital" && (
            <>
              <input
                type="text"
                name="hospitalName"
                placeholder="Hospital Name"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.hospitalName}
                required
              />

              <select
                name="hospitalType"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.hospitalType}
                required
              >
                <option value="">Select Type</option>

                <option value="private">Private</option>

                <option value="government">
                  Government
                </option>

                <option value="aiims">
                  AIIMS / Medical College
                </option>
              </select>

              <input
                type="text"
                name="hospitalLicense"
                placeholder="License Number"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.hospitalLicense}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.address}
                required
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleChange}
                value={formData.contactNumber}
                required
              />
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white p-4 rounded-2xl font-semibold text-lg shadow-lg"
          >
            Register
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;