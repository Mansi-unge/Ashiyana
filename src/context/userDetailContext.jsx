import { createContext } from "react";
const UserDetailContext = createContext()

export default UserDetailContext




// import React, { createContext, useState } from "react";

// export const userDetailContext = createContext();

// export const UserDetailProvider = ({ children }) => {
//   const [userDetails, setUserDetails] = useState(null);

//   return (
//     <userDetailContext.Provider value={{ userDetails, setUserDetails }}>
//       {children}
//     </userDetailContext.Provider>
//   );
// };






// import React from "react";
// import { createContext , useState } from "react";


// const userDetailContext = createContext()
// export const UserDetailProvider = ({ children }) => {
//   const [userDetails, setUserDetails] = useState({});

//   return (
//       <userDetailContext.Provider value={{ userDetails, setUserDetails }}>
//           {children}
//       </userDetailContext.Provider>
//   );
// };

// export default userDetailContext