import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import data from "../utils/Slider";

const Recidencies = () => {
  return (
    <section className=" w-[80vw] ms-[10vw] mt-[10vh]">
      {/* Heading Section */}
      <div>
        <h1 className="text-orange-400 font-bold text-2xl">Best Choices</h1>
        <h1 className="text-blue-900 font-bold text-4xl">
          Popular Residencies
        </h1>
      </div>

      {/* Swiper Section */}
      <div className="p-4">
        <Swiper
          spaceBetween={20} // Adjust spacing between slides
          slidesPerView={3} // Number of visible slides
          navigation
          pagination={{ clickable: true }}
        >
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className=" rounded-lg  gap-2 m-auto transition-all ease-in-out max-w-max flex flex-col p-4 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(136,160,255,0.46)]">
                <img
                  src={card.image}
                  alt={`Residency ${i + 1}`}
                  className="w-[100%] max-w-60  h-48 object-cover"
                />
                <span className="text-xl font-semibold">
                  <span>$</span>
                  <span>{card.price}</span>
                </span>

                <span className="text-2xl">
                  {card.name}
                </span>
                <span className="text- w-60">
                  {card.detail}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recidencies;
