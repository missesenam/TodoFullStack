import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResetEmail } from "../slices/forgotPasswordSlice";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetEmail({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>
          {status === "failed" && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
