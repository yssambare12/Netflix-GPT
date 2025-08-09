import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGO, UserAvatar, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchVode } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              className="h-8 sm:h-10 lg:h-12 w-auto transition-all duration-300 hover:scale-105"
              src={LOGO}
              alt="Netflix GPT Logo"
            />
          </div>

          {/* User Controls Section */}
          {user && (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Language Selector */}
              {showGptSearch && (
                <select
                  className="px-3 py-2 bg-gray-800/90 border border-gray-600 text-white text-sm rounded-lg 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none
                           transition-all duration-200 hover:bg-gray-700/90 min-w-[120px]"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Action Buttons and Profile */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* GPT Search Toggle Button */}
                <button
                  onClick={handleGptSearchClick}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium 
                           rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-800 
                           transform hover:scale-105 transition-all duration-200 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {showGptSearch ? "🏠 Homepage" : "🤖 GPT Search"}
                </button>

                {/* User Profile Section */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-600">
                  <div className="relative group">
                    <img
                      alt="User Profile"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600 
                               hover:border-purple-500 transition-all duration-200 cursor-pointer
                               group-hover:scale-110"
                      src={UserAvatar}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>

                  <span className="hidden sm:block text-white font-medium text-sm lg:text-base max-w-[120px] truncate">
                    {user?.displayName}
                  </span>

                  <button
                    onClick={handleSignout}
                    className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium 
                             rounded-lg shadow-lg hover:from-red-700 hover:to-red-800 
                             transform hover:scale-105 transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
