import React from "react";

const Failed = () => {
  return (
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
  )
}

export default Failed;