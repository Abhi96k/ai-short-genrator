import React from "react";
import Image from "next/image";

function SelectStyle() {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Cosmic",
      image: "/cosmic.jpg",
    },
    {
      name: "WaterColor",
      image: "/watercolor.jpg",
    },
    {
      name: "GTA",
      image: "/gta.jpg",
    },
    {
      name: "Historical",
      image: "/historic.jpg",
    },
  ];

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your Video Style</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div className="relative">
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="h-48 object-cover rounded-lg w-full"
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
