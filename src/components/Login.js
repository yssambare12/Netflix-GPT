import { useRef, useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BGImage } from "../utils/constants";

const Login = () => {
  const [isSigninform, setIsSignInform] = useState(true);
  const [errorMassage, seterrorMassage] = useState();

  const email = useRef();
  const password = useRef();
  const name = useRef();

  const toggleSignInForm = () => {
    setIsSignInform(!isSigninform);
  };

  const handlebuttonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);

    const massage = checkValidData(
      email.current.value,
      password.current.value
      // nameValue
    );
    seterrorMassage(massage);

    if (massage) return;
    if (!isSigninform) {
      //sign up login
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/91533131?v=4",
          })
            .then(() => {
              // Profile updated!
            })
            .catch((error) => {
              seterrorMassage(error.massage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMassage(error + "-" + errorMassage);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMassage(errorCode + "-" + errorMassage);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="relative z-30">
        <Header />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BGImage}
          alt="Netflix Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Form Card */}
          <div className="bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden">
            {/* Form Header */}
            <div className="px-8 pt-8 pb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {isSigninform ? "Welcome Back" : "Join Netflix"}
              </h1>
              <p className="text-gray-400 text-sm lg:text-base">
                {isSigninform
                  ? "Sign in to continue your journey"
                  : "Create your account to get started"}
              </p>
            </div>

            {/* Form Body */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="px-8 pb-8 space-y-6"
            >
              {/* Name Field (Sign Up Only) */}
              {!isSigninform && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Full Name
                  </label>
                  <input
                    ref={name}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-red-500 focus:border-transparent transition-all duration-200
                             hover:bg-gray-800/70"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Email Address
                </label>
                <input
                  ref={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-red-500 focus:border-transparent transition-all duration-200
                           hover:bg-gray-800/70"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Password
                </label>
                <input
                  ref={password}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-red-500 focus:border-transparent transition-all duration-200
                           hover:bg-gray-800/70"
                />
              </div>

              {/* Error Message */}
              {errorMassage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm font-medium">
                    {errorMassage}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handlebuttonClick}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                         text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 
                         transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                {isSigninform ? "Sign In" : "Create Account"}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-black/90 text-gray-400">or</span>
                </div>
              </div>

              {/* Toggle Form */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">
                  {isSigninform
                    ? "New to Netflix?"
                    : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={toggleSignInForm}
                  className="text-red-500 hover:text-red-400 font-medium transition-colors duration-200 
                           hover:underline focus:outline-none"
                >
                  {isSigninform ? "Sign up now" : "Sign in now"}
                </button>
              </div>

              {/* Additional Links (Sign In Only) */}
              {isSigninform && (
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-400">
                    <input type="checkbox" className="mr-2 rounded" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-400 transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
