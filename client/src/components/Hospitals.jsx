const hospitals = [
  {
    name: "City Care Hospital",
    location: "Delhi",
    units: 32,
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400"
  },
  {
    name: "Life Line Hospital",
    location: "Mumbai",
    units: 28,
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400"
  },
  {
    name: "Green Valley Hospital",
    location: "Bangalore",
    units: 45,
    img: "https://images.unsplash.com/photo-1588776814546-ec7e73f3d3a9?w=400"
  },
  {
    name: "Hope Medical Center",
    location: "Kolkata",
    units: 22,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400"
  }
];

const Hospitals = () => {
  return (
    <div className="px-10 py-16 bg-gray-50">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Hospitals & Blood Banks
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">

        {hospitals.map((h, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            {/* Image */}
            <img
              src={h.img}
              alt={h.name}
              className="rounded-lg h-40 w-full object-cover"
            />

            {/* Info */}
            <h3 className="mt-3 font-bold text-lg">{h.name}</h3>
            <p className="text-gray-500 text-sm">{h.location}</p>

            {/* Blood units */}
            <p className="mt-2 text-red-500 font-semibold">
              {h.units} Units Available
            </p>

            {/* Button */}
            <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Contact
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Hospitals;