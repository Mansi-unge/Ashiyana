import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );

  // Return an object containing the state values
  return { data, isError, isLoading, refetch };
};

export default useProperties;
