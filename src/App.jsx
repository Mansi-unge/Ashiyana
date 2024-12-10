



import React, { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Properties from "./pages/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndividualProperty from "./pages/IndividualProperty";
import UserDetailContext from "./context/userDetailContext";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  const queryClient = new QueryClient();
  const [userDetails , setUserDetails ] = useState({
    favoutrites : [],
    bookings : [] ,
    token : []
  })

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}> {/* Use UserDetailProvider here */}                                                
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <video autoPlay loop muted style={{ maxWidth: "100%" }}>
                    <source src="/loading_animation.mp4" type="video/mp4" />
                    Your dream home is loading! Stay tuned for an exclusive experience. 🏡
                  </video>
                </div>
              }
            >
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Website />} />
                  <Route path="/Properties">
                    <Route index element={<Properties />} />
                    <Route path=":propertyid" element={<IndividualProperty />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </MantineProvider>
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;



// import React, { Suspense } from 'react';
// import './App.css';
// import Website from './pages/Website';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Properties from './pages/Properties';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import IndividualProperty from './pages/IndividualProperty';
// import userDetailContext from './context/userDetailContext';
// // Import MantineProvider
// import { MantineProvider } from '@mantine/core';
// import { useState } from 'react';
// import { UserDetailProvider } from "./context/userDetailContext";
// import '@mantine/core/styles.css';

// function App() {
//   // Initialize the QueryClient for react-query
//   const queryClient = new QueryClient();

  

//   const [userDetails , setUserDetail] = useState({
//     favourites: [] ,
//     bookings : [] , 
//     token : null
//   })

//   return (
//     <userDetailProvider value={{userDetails , setUserDetail} }>
//     <QueryClientProvider client={queryClient}>
//       {/* Wrap the whole app with MantineProvider */}
//       <MantineProvider withGlobalStyles withNormalizeCSS>
//         <BrowserRouter>
//           <Suspense
//             fallback={
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   height: '100vh',
//                 }}
//               >
//                 <video autoPlay loop muted style={{ maxWidth: '100%' }}>
//                   <source src="/loading_animation.mp4" type="video/mp4" />
//                   Your dream home is loading! Stay tuned for an exclusive experience. 🏡
//                 </video>
//               </div>
//             }
//           >
//             <Routes>
//               {/* Wrap routes with Layout component */}
//               <Route element={<Layout />}>
//                 <Route path="/" element={<Website />} />
                
//                 <Route path="/Properties">
//                   <Route index element={<Properties />} />
//                   <Route path=":propertyid" element={<IndividualProperty />} />
                  
//                 </Route>
//               </Route>
//             </Routes>
//           </Suspense>
//         </BrowserRouter>
//         <ToastContainer />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </MantineProvider>
//     </QueryClientProvider>
//     </userDetailProvider>
//   );
// }

// export default App;
