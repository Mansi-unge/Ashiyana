import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

function Login({ closeLoginPage, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:8000/api/user/login", {
          email,
          password,
        });

        if (response.status === 200) {
          setSuccessMessage("Login successful!");
          setErrorMessage("");
          setIsLoggedIn(true); // Update parent state to show Profile component
          closeLoginPage(); // Close the login modal
        }
      } else {
        // Sign-up logic
        const response = await axios.post("http://localhost:8000/api/users/create", {
          email,
          name: email.split("@")[0],
          password,
          image: "default-image.jpg",
        });

        if (response.status === 201) {
          setSuccessMessage("Account created successfully! Please log in.");
          setErrorMessage("");
          setIsLogin(true); // Switch to Login mode
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
       <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center overflow-y-auto">
      {/* Modal Background */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-2xl p-12 bg-gradient-to-r from-[#1a2d62] to-[#3b4e78] rounded-lg shadow-lg transform transition duration-300 hover:scale-105 z-10">
        <button
          className="absolute top-4 right-4 text-white"
          onClick={closeLoginPage}
        >
          X
        </button>
        <div className="flex justify-center p-4 mb-8">
          <img src="/footer logo.png" alt="Logo" />
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  {confirmPasswordVisible ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Error/Success Messages */}
        {errorMessage && (
          <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-4 text-center">{successMessage}</div>
        )}

        {/* Toggle between Login and Sign Up */}
        <div className="mt-4 text-center text-white">
          {isLogin ? (
            <span>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:text-blue-600"
              >
                Sign up here
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:text-blue-600"
              >
                Login here
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;









// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import axios from "axios";

// function Login({ closeLoginPage, setIsLoggedIn }) {
//   const [isLogin, setIsLogin] = useState(true);
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  // const toggleConfirmPasswordVisibility = () => {
  //   setConfirmPasswordVisible(!confirmPasswordVisible);
  // };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage("Email and Password are required.");
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       if (isLogin) {
//         const response = await axios.post("http://localhost:8000/api/user/login", {
//           email,
//           password,
//         });

//         if (response.status === 200) {
//           const { accessToken, refreshToken } = response.data;

//           // Store tokens in localStorage (or sessionStorage)
//           localStorage.setItem("accessToken", accessToken); // Store access token in localStorage
//           localStorage.setItem("refreshToken", refreshToken); // Store refresh token in localStorage (or HttpOnly cookie for better security)

//           setSuccessMessage("Login successful!");
//           setErrorMessage("");
//           setIsLoggedIn(true); // Update parent state to show Profile component
//           closeLoginPage(); // Close the login modal
//         }
//       } else {
//         // Sign-up logic
//         const response = await axios.post("http://localhost:8000/api/users/create", {
//           email,
//           name: email.split("@")[0],
//           password,
//           image: "default-image.jpg",
//         });

//         if (response.status === 201) {
//           setSuccessMessage("Account created successfully! Please log in.");
//           setErrorMessage("");
//           setIsLogin(true); // Switch to Login mode
//         }
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
    // <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center overflow-y-auto">
    //   {/* Modal Background */}
    //   <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm"></div>

    //   <div className="relative w-full max-w-2xl p-12 bg-gradient-to-r from-[#1a2d62] to-[#3b4e78] rounded-lg shadow-lg transform transition duration-300 hover:scale-105 z-10">
    //     <button
    //       className="absolute top-4 right-4 text-white"
    //       onClick={closeLoginPage}
    //     >
    //       X
    //     </button>
    //     <div className="flex justify-center p-4 mb-8">
    //       <img src="/footer logo.png" alt="Logo" />
    //     </div>

    //     {/* Form */}
    //     <form className="space-y-6" onSubmit={handleSubmit}>
    //       {/* Email Input */}
    //       <div>
    //         <label htmlFor="email" className="text-sm font-medium text-white">
    //           Email Address
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           placeholder="Enter your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>

    //       {/* Password Input */}
    //       <div>
    //         <label htmlFor="password" className="text-sm font-medium text-white">
    //           Password
    //         </label>
    //         <div className="relative">
    //           <input
    //             type={passwordVisible ? "text" : "password"}
    //             id="password"
    //             name="password"
    //             className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             placeholder="Enter your password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />
    //           <button
    //             type="button"
    //             onClick={togglePasswordVisibility}
    //             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
    //           >
    //             {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    //           </button>
    //         </div>
    //       </div>

    //       {/* Confirm Password for Signup */}
    //       {!isLogin && (
    //         <div>
    //           <label
    //             htmlFor="confirmPassword"
    //             className="text-sm font-medium text-white"
    //           >
    //             Confirm Password
    //           </label>
    //           <div className="relative">
    //             <input
    //               type={confirmPasswordVisible ? "text" : "password"}
    //               id="confirmPassword"
    //               name="confirmPassword"
    //               className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //               placeholder="Confirm your password"
    //               value={confirmPassword}
    //               onChange={(e) => setConfirmPassword(e.target.value)}
    //               required
    //             />
    //             <button
    //               type="button"
    //               onClick={toggleConfirmPasswordVisibility}
    //               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
    //             >
    //               {confirmPasswordVisible ? (
    //                 <AiOutlineEyeInvisible />
    //               ) : (
    //                 <AiOutlineEye />
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       )}

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition duration-200"
    //       >
    //         {isLogin ? "Login" : "Sign Up"}
    //       </button>
    //     </form>

    //     {/* Error/Success Messages */}
    //     {errorMessage && (
    //       <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
    //     )}
    //     {successMessage && (
    //       <div className="text-green-500 mt-4 text-center">{successMessage}</div>
    //     )}

    //     {/* Toggle between Login and Sign Up */}
    //     <div className="mt-4 text-center text-white">
    //       {isLogin ? (
    //         <span>
    //           Don't have an account?{" "}
    //           <button
    //             onClick={() => setIsLogin(false)}
    //             className="text-blue-400 hover:text-blue-600"
    //           >
    //             Sign up here
    //           </button>
    //         </span>
    //       ) : (
    //         <span>
    //           Already have an account?{" "}
    //           <button
    //             onClick={() => setIsLogin(true)}
    //             className="text-blue-400 hover:text-blue-600"
    //           >
    //             Login here
    //           </button>
    //         </span>
    //       )}
    //     </div>
    //   </div>
    // </div>
//   );
// }

// export default Login;
