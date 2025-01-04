import React, { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Properties from "./pages/Properties";
import IndividualProperty from "./pages/IndividualProperty";
import AddProperty from "./pages/AddProperty";
import { QueryClient, QueryClientProvider } from "react-query";  // Import QueryClient and QueryClientProvider
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  // Create QueryClient instance
  const queryClient = new QueryClient();
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* Wrap the app with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
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
                  <Route path="/add-property" element={<AddProperty />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
