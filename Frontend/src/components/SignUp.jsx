import {React,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png"

const SignUpComp = () => {
  const nevigate = useNavigate();

  // initializing credentials
  const [cred, setCred] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  //to set credentials on change of input
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const createUser = async (e) => {
    let alert = document.getElementById("alert");
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/user/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("inventoryToken", json.authtoken);
        nevigate("/");
      } else {
        alert.innerHTML = json.errors;
      }
    } catch {
      alert.innerHTML = "Internal server error.";
    }
  };
  return (
    <>
      <div className="mb-10">
        <div className="flex justify-center">
        <img
            alt=""
            className="h-24 w-24"
            src={Logo}
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already a user ?{" "}
          <Link
            to={"/login"}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={createUser} className="mt-8 space-y-6">
        <div className="">
          <div className="my-5">
            <label htmlFor={"name"} className="sr-only">
              Name
            </label>
            <input
              name="name"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Name"}
              onChange={onChange}
              required={true}
              type={"text"}
              minLength={5}
              maxLength={30}
            ></input>
          </div>
          <div className="my-5">
            <label htmlFor={"email"} className="sr-only">
              Email
            </label>
            <input
              name="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Email"}
              onChange={onChange}
              required={true}
              type={"email"}
            ></input>
          </div>
          <div className="my-5">
            <label htmlFor={"phoneNo"} className="sr-only">
              Phone
            </label>
            <input
              name="phoneNo"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Phone"}
              onChange={onChange}
              required={"true"}
              type={"tel"}
            ></input>
          </div>
          <div className="my-5">
            <label htmlFor={"password"} className="sr-only">
              Password
            </label>
            <input
              name="password"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Password"}
              minLength={8}
              onChange={onChange}
              required={"true"}
              type={"password"}
            ></input>
          </div>
        </div>
        <p
          id="alert"
          className="h-5 text-sm text-red-600 text-center -mt-6"
        ></p>
        <input type={"submit"} value={"Register"} className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
        </input>
      </form>
    </>
  );
};

export default SignUpComp;
