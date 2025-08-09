import { ImageCDN } from "../utils/constants";

const MovieCard = ({ posterPaths, movieId, onClick }) => {
  // const { title } = moviesData;
  if (!posterPaths) {
    return null;
  }

  const handleClick = () => {
    if (onClick && movieId) {
      onClick(movieId);
    }
  };

  return (
    <div className="w-48 pr-4 cursor-pointer" onClick={handleClick}>
      <img src={ImageCDN + posterPaths} alt="poster" />
      {/* <h3>{title}</h3> */}
    </div>
  );
};

export default MovieCard;
