import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSigninform, setIsSignInform] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInform(!isSigninform);
  };

  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/IN-en-20250707-TRIFECTA-perspective_4faa9280-a2c5-4e07-aafc-a45ce43fea09_large.jpg"
          alt="banner"
        />
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80 text-white">
        <h1 className="font-bold text-3xl py-4">
          {isSigninform ? "Sign in" : "Sign Up"}
        </h1>
        {!isSigninform && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-900"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
          {isSigninform ? "Sign in" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="py-4 cursor-pointer">
          {isSigninform
            ? "New to Netflix? Sign Up now"
            : "Already A user Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
