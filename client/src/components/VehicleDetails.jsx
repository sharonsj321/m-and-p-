import React from "react";

const VehicleDetails = () => {
  const vehicles = [
    { id: 1, type: "Truck", capacity: "5 Tons", status: "Available" },
    { id: 2, type: "Mini Truck", capacity: "2 Tons", status: "In Transit" },
  ];

  return (
    <div>
      <h2>Vehicle Details</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.type} - {vehicle.capacity} - {vehicle.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleDetails;
