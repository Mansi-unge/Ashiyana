import React from "react";

const useProperties = () => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/residency");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useProperties;













// import React from "react";

// const useProperties = () => {
//   const [data, setData] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [isError, setIsError] = React.useState(false);

//   React.useEffect(() => {
//     fetch("http://localhost:8000/api/residency") // Replace with your backend endpoint
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Fetched Data:", data); // Logs the data to the console
//         setData(data); // Store the data
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsError(true);
//         setIsLoading(false);
//       });
//   }, []);

//   return { data, isLoading, isError };
// };

// export default useProperties;


















// // import React from "react";
// // import { useQuery } from "react-query";
// // import { getAllProperties } from "../utils/api";

// // const useProperties = () => {
// //   const { data, isLoading, isError, refetch } = useQuery(
// //     "allProperties",
// //     getAllProperties,
// //     { refetchOnWindowFocus: false }
// //   );

// //   // Return an object containing the state values
// //   return { data, isError, isLoading, refetch };
// // };

// // export default useProperties;


// // import React from "react";

// // const useProperties = () => {
// //   const [data, setData] = React.useState(null);
// //   const [isLoading, setIsLoading] = React.useState(true);
// //   const [isError, setIsError] = React.useState(false);

// //   React.useEffect(() => {
// //     fetch("http://localhost:8000/api") // Adjust backend URL/port if necessary
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         return response.json();
// //       })
// //       .then((data) => {
// //         console.log("API Response:", data);
// //         setData(data); // Set fetched data
        
// //         setIsLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //         setIsError(true);
// //         setIsLoading(false);
// //       });
// //   }, []);

// //   return { data, isLoading, isError };
// // };

// // export default useProperties;
