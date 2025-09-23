import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowplayingmovies);
  if (movies === null) return null;

  const featuremovies = movies[5];
  if (!featuremovies) return null;

  const { original_title, overview, id } = featuremovies;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <VideoBackground movieId={id} />

      <VideoTitle title={original_title} overview={overview} />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MainContainer;
