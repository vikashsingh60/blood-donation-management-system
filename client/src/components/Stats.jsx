import {
  FaTint,
  FaUsers,
  FaHospital,
  FaBullhorn,
  FaMapMarkerAlt
} from "react-icons/fa";

const Stats = () => {
  const data = [
    {
      icon: <FaTint className="text-red-600 text-3xl" />,
      number: "12,458",
      label: "Units available",
      accent: "bg-red-50"
    },
    {
      icon: <FaUsers className="text-purple-600 text-3xl" />,
      number: "8,362",
      label: "Verified donors",
      accent: "bg-purple-50"
    },
    {
      icon: <FaHospital className="text-pink-600 text-3xl" />,
      number: "1,245",
      label: "Partner hospitals",
      accent: "bg-pink-50"
    },
    {
      icon: <FaBullhorn className="text-orange-500 text-3xl" />,
      number: "312",
      label: "Active requests",
      accent: "bg-orange-50"
    },
    {
      icon: <FaTint className="text-blue-600 text-3xl" />,
      number: "O+",
      label: "Top blood group",
      accent: "bg-blue-50"
    },
    {
      icon: <FaMapMarkerAlt className="text-emerald-600 text-3xl" />,
      number: "Gorakhpur, UP",
      label: "Service region",
      accent: "bg-emerald-50"
    }
  ];

  return (
    <section className="relative z-30 -mt-16 md:-mt-24 px-4 pb-10">
      <div className="max-w-7xl mx-auto rounded-[40px] bg-white/95 backdrop-blur-xl border border-red-100 p-6 shadow-2xl md:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Quick stats</p>
          <h3 className="mt-4 text-3xl font-bold text-slate-900">Real-time blood support metrics</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
            Track available units, trusted donors, hospital partners, and local coverage at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-200 bg-slate-50/80 p-6 transition hover:-translate-y-1 hover:border-red-200 hover:bg-white/90"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl ${item.accent}`}>
                {item.icon}
              </div>
              <div className="mt-5">
                <h2 className="text-4xl font-bold text-slate-900">{item.number}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
