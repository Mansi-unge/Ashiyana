import React from "react";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
const Properties = () => {

  const {data , isError , isLoading } = useProperties() ;
  console.log(data) ;
  return (
    <div className="flex justify-center p-4">
      <Searchbar/>
    </div>
  );
};

export default Properties;
