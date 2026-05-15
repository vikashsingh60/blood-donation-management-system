import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useEffect, useState } from "react";

const EmergencyRoute = () => {
  const [directions, setDirections] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const donorLocation = {
    lat: 26.7606,
    lng: 83.3732,
  };

  const hospitalLocation = {
    lat: 26.755,
    lng: 83.37,
  };

  useEffect(() => {
    if (!mapReady || loadError) return;
    if (!window.google?.maps) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: donorLocation,
        destination: hospitalLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      },
    );
  }, [mapReady, loadError]);

  return (
    <div className="min-h-screen bg-red-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-3xl bg-white shadow-2xl p-8 dark:bg-slate-900/90">
          <h1 className="text-4xl font-bold text-red-600">Emergency Response</h1>
          <p className="mt-3 text-gray-600 dark:text-slate-300 max-w-2xl">
            This emergency dashboard shows the nearest donor-hospital route, live alert status, and quick actions to raise a priority blood request.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 p-6 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">Nearest Donor</p>
              <h2 className="mt-4 text-2xl font-semibold">Rahul Singh</h2>
              <p className="mt-2 text-gray-600 dark:text-slate-300">A+ • Available now</p>
              <p className="mt-4 text-sm">Distance: 2 KM</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">Emergency Hospital</p>
              <h2 className="mt-4 text-2xl font-semibold">City Trauma Center</h2>
              <p className="mt-2 text-gray-600 dark:text-slate-300">Emergency blood bank on standby</p>
              <p className="mt-4 text-sm">Contact: +91 98765 43210</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">Priority Status</p>
              <h2 className="mt-4 text-2xl font-semibold">High Priority</h2>
              <p className="mt-2 text-gray-600 dark:text-slate-300">Fast donor matching and routing for urgent cases.</p>
              <p className="mt-4 text-sm">Match Accuracy: 98%</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-3xl overflow-hidden bg-white shadow-2xl min-h-[560px] dark:bg-slate-900/90">
            {loadError ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-gray-600 dark:text-slate-300">
                <p className="text-xl font-semibold">Map loading failed</p>
                <p>Check your Google Maps API key or network connection, then refresh the page.</p>
              </div>
            ) : (
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
                onLoad={() => setMapReady(true)}
                onError={() => setLoadError(true)}
              >
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={donorLocation}
                  zoom={13}
                  options={{ disableDefaultUI: true, zoomControl: true }}
                >
                  <Marker position={donorLocation} />
                  <Marker position={hospitalLocation} />
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </LoadScript>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900/90">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Emergency Action</h2>
              <p className="mt-4 text-gray-600 dark:text-slate-300">
                Use ABHA-based patient information to raise urgent blood requests. This view helps teams route the nearest compatible donor to the hospital faster.
              </p>
              <ul className="mt-6 space-y-3 text-gray-600 dark:text-slate-300">
                <li>• Real-time donor-hospital routing</li>
                <li>• Priority matching based on blood group and distance</li>
                <li>• Live emergency status and contact information</li>
              </ul>
              <a
                href="/emergency-request"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
              >
                Create Emergency Request
              </a>
            </div>

            <div className="rounded-3xl bg-red-600 p-6 shadow-2xl text-white">
              <h3 className="text-2xl font-semibold">Need urgent help?</h3>
              <p className="mt-3 text-sm text-red-100/90">
                Patients with ABHA can quickly access emergency blood matching. Use this dashboard to monitor live route updates and hospital readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRoute;
