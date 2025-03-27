import React from "react";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json(); 
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
