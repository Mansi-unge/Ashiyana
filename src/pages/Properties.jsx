import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import PropertyCard from "../components/PropertyCard";
import shuffle from "lodash/shuffle";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/residency");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProperties(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) return <div>Error loading properties.</div>;

  // Shuffle properties data
  const shuffledData = shuffle(properties);

  return (
    <div className="p-4 flex items-center flex-col gap-4">
      <Searchbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
        {shuffledData.map((card, i) => (
          <PropertyCard card={card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Properties;










// import React from "react";
// import Searchbar from "../components/Searchbar";
// import useProperties from "../hooks/useProperties";
// import PropertyCard from "../components/PropertyCard";
// import shuffle from "lodash/shuffle"; // Import shuffle from lodash

// const Properties = () => {
//   const { data, isError, isLoading } = useProperties();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (isError) return <div>Error loading properties.</div>;

//   // Shuffle properties data
//   const shuffledData = shuffle(data);

//   console.log("Shuffled Properties Data:", shuffledData);

//   return (
//     <div className="p-4 flex items-center flex-col gap-4">
//       {/* Search Bar */}
//       <Searchbar />

//       {/* Properties Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
//         {shuffledData.map((card, i) => (
//           <PropertyCard card={card} key={i} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Properties;
