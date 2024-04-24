"use client";
import React, { useState } from "react";

const Trips = () => {
  // Sample data for demonstration
  const drivingTrips = [
    {
      departure: "2023-04-24T10:00:00",
      origin: "New York, NY",
      destination: "Boston, MA",
      riders: 2,
      rideRequests: [
        { userName: "John Doe", spots: 1 },
        { userName: "Jane Smith", spots: 2 },
      ],
    },
    {
      departure: "2023-04-25T14:30:00",
      origin: "Chicago, IL",
      destination: "Los Angeles, CA",
      riders: 4,
      rideRequests: [{ userName: "Bob Johnson", spots: 3 }],
    },
  ];

  const ridingTrips = [
    {
      departure: "2023-04-26T09:15:00",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      requestStatus: "Pending",
    },
    {
      departure: "2023-04-27T16:45:00",
      origin: "San Francisco, CA",
      destination: "Seattle, WA",
      requestStatus: "Approved",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleManageTrip = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <h2 className="text-[30px] font-medium">Driving</h2>
      <p className="mb-4 text-gray-600">
        This section displays the trips you are driving. You can manage rider
        requests and update trip details here.
      </p>
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Departure</th>
            <th className="px-4 py-2 text-left">Origin</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Riders</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {drivingTrips.map((trip, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2">
                {new Date(trip.departure).toLocaleString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>
              <td className="px-4 py-2">{trip.origin}</td>
              <td className="px-4 py-2">{trip.destination}</td>
              <td className="px-4 py-2">{trip.riders}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-[12px] hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                  onClick={() => handleManageTrip(trip)}
                >
                  Manage Trip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="border-[2px] border-black bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-medium mb-4">Ride Requests</h3>
            <p className="mb-4">
              Use this dialog to approve or deny requests made by other users.
            </p>
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">User Name</th>
                  <th className="px-4 py-2 text-left">Spots</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTrip.rideRequests.map((request, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2">{request.userName}</td>
                    <td className="px-4 py-2">{request.spots}</td>
                    <td className="px-4 py-2">
                      <div>
                        <button className="bg-green-500 text-white text-[12px] py-1 px-3 rounded-md mr-2">
                          Approve
                        </button>
                        <button className="bg-yellow-500 text-white text-[12px] py-1 px-3 rounded-md mr-2">
                          Ignore
                        </button>
                        <button className="bg-red-500 text-white text-[12px] py-1 px-3 rounded-md">
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-gray-500 text-white text-[12px] py-1 px-3 rounded-md mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-[30px] font-medium mt-8">Riding</h2>
      <p className="mb-4 text-gray-600">
        This section shows the trips you have requested to ride with others. You
        can track the status of your requests here.
      </p>
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Departure</th>
            <th className="px-4 py-2 text-left">Origin</th>
            <th className="px-4 py-2 text-left">Destination</th>
            <th className="px-4 py-2 text-left">Request Status</th>
          </tr>
        </thead>
        <tbody>
          {ridingTrips.map((trip, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2">
                {new Date(trip.departure).toLocaleString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>
              <td className="px-4 py-2">{trip.origin}</td>
              <td className="px-4 py-2">{trip.destination}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-[12px] rounded-full ${
                    trip.requestStatus === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {trip.requestStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trips;