import React from "react";
import data from "../utils/Slider";

const Recidencies = () => {
  return (
    <section className=" ms-[10vw] mt-[10vh]">
      {/* Heading Section */}
      <div className="text-center">
        <h1 className="text-orange-400 font-bold text-3xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-5xl">
          Popular Residencies
        </h1>
      </div>

      <div className="p-8  flex overflow-hidden flex-wrap gap-6">
          {data.map((card, i) => (
            <div key={i}>
              <div className=" rounded-lg  gap-2 m-auto transition-all ease-in-out max-w-max flex flex-col p-4 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(136,160,255,0.46)]   hover:drop-shadow-xl
               ">
                <img
                  src={card.image}
                  alt={`Residency ${i + 1}`}
                  className="w-[100%] max-w-60  h-44 object-cover"
                />
                <span className="text-xl font-semibold">
                  <span>{card.price}</span>
                </span>

                <span className="text-2xl">
                  {card.name}
                </span>
                <span className="text-sm w-60">
                  {card.detail}
                </span>
              </div>
              </div>
          ))}
      </div>
    </section>
  );
};

export default Recidencies;

