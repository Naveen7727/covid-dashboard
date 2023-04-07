import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";


export default function BasicDemo() {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { name: "New york", code: "ny" },
    { name: "Rome", code: "Rm" },
    { name: "London", cod: "LDN" },
    { name: "Istanbul", code: "IST" },
  ];

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
      />
    </div>
  );
}
