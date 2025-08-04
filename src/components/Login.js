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
    <div className="relative min-h-screen">
      <div className="relative z-20">
        <Header />
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src={BGImage}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80 text-white z-10 rounded-md flex flex-col"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSigninform ? "Sign in" : "Sign Up"}
        </h1>
        {!isSigninform && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full bg-gray-900"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <input
          type="text"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <p className="text-red-600 font-bold">{errorMassage}</p>
        <button
          onClick={handlebuttonClick}
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
        >
          {isSigninform ? "Sign in" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="py-4 cursor-pointer">
          {isSigninform
            ? "New to Netflix ? Sign Up now."
            : "Already A user ? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
