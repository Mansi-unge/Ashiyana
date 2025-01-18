import React, { useState, useEffect } from "react";
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
import ValueSkeleton from "../skeletons/ValueSkeleton";

const MyValue = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ValueSkeleton />;
  }

  return (
    <section className="flex lg:flex-row flex-col justify-between px-6 lg:px-[12%] gap-8 my-20">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 lg:text-left text-center">
        <h1 className="text-orange-400 font-bold text-3xl">Our Value</h1>
        <h1 className="text-blue-900 font-bold text-4xl lg:text-5xl">
          Value We Give To You
        </h1>
        <p className="text-gray-600">
          "At <b>ASHIYANA</b>, our values define who we are and guide everything we do. We are
          dedicated to providing exceptional service, building lasting relationships, and creating
          spaces that inspire and enrich lives. Together, let's turn your dreams into reality."
        </p>
        <img
          src="/values.jpg"
          alt="Our Values"
          className="rounded-full w-full max-w-[250px] lg:max-w-[600px] lg:mx-0 hidden lg:block"
        />
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2">
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
                  <span className="border-2 p-1 shadow-lg rounded-full">
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

export default MyValue;
