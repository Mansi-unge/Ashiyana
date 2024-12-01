import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import data from "../utils/accordian";
import { IoIosArrowDown } from "react-icons/io";

const Value = () => {
  return (
    <section className="flex justify-between p-6 mx-[12%] gap-8">
      {/* Left side */}
      <div className="w-[45%] flex flex-col justify-center space-y-4 ">
        <h1 className="text-orange-400 font-bold text-3xl">Our Value</h1>
        <h1 className="text-blue-900 font-bold text-5xl">Value We Give To You</h1>
        <p>
          "At <b>ASHIYANA</b>, our values define who we are and guide everything we do. We are
          dedicated to providing exceptional service, building lasting relationships, and creating
          spaces that inspire and enrich lives. Together, let's turn your dreams into reality."
        </p>
        <img src="/values.jpg" alt=""  className="rounded-full"/>
      </div>

      {/* Right side */}
      <div className="w-[45%]">
        <Accordion
          allowMultipleExpanded={false}
          preExpanded={[0]}
          className="border-0"
        >
          {data.map((item, i) => (
            <AccordionItem
              key={i}
              uuid={i}
              className="border rounded-lg mb-4 p-4 shadow-blue-200 shadow-md"
            >
              <AccordionItemHeading>
                <AccordionItemButton className="flex justify-between items-center text-lg font-semibold">
                  {item.title}
                  <span className="border-2 p-1 shadow-lg">
                  <IoIosArrowDown className="text-2xl font-extrabold" />

                  </span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-gray-500">{item.description}</p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Value;
