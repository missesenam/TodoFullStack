// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/signin",
//         { email, password },
//         { withCredentials: true }
//       );
//       console.log("Login successful:", res.data);
//       toast.success("Login successful!");

//       setTimeout(() => navigate("/todolist"), 1000);
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Something went wrong. Try again.";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Login
//         </h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-800 mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-800 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <div className="flex items-center justify-between my-5">
//           <label className="flex items-center space-x-2 text-sm text-gray-700">
//             <input
//               type="checkbox"
//               name="keepSignedIn"
//               className="form-checkbox h-4 w-4 text-blue-600"
//             />
//             <span>Keep me signed in</span>
//           </label>
//           <Link
//             to="/forgotpassword"
//             className="text-sm text-red-500 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <p className="text-sm text-center text-gray-700 mt-4">
//           Don't have an account?{" "}
//           <Link to="/" className="text-blue-600 hover:underline">
//             Sign Up here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/LogInSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful!");
    } else {
      toast.error(result.payload);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/todolist");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-between my-5">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Keep me signed in</span>
          </label>
          <Link
            to="/forgotpassword"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <p className="text-sm text-center text-gray-700 mt-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
