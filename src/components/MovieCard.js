import { ImageCDN } from "../utils/constants";

const MovieCard = ({ posterPaths }) => {
  // const { title } = moviesData;

  return (
    <div className="w-48 pr-4">
      <img src={ImageCDN + posterPaths} alt="postet" />
      {/* <h3>{title}</h3> */}
    </div>
  );
};

export default MovieCard;
