import React from "react";
import SignUpComp from "../components/SignUp";

const SignUp = () => {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpComp />
      </div>
    </div>
  );
};

export default SignUp;
