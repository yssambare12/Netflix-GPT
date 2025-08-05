import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGO, UserAvatar } from "../utils/constants";
import { Link } from "react-router-dom";
import { toggleGptSearchVode } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showgptSearch);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // User is signed in
        const { uid, email, displayName, photoURL } = user.uid;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when componenet is unmount.
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchVode());
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 m-2 bg-purple-800 text-white rounded"
          >
            {showGptSearch ? "Homepage" : "Gpt Search"}
          </button>
          <img alt="userprofile" width={45} height={45} src={UserAvatar} />
          <span className="text-white font-semibold">{user?.displayName}</span>
          <button
            onClick={handleSignout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
