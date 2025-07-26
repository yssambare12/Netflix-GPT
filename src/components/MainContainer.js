import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowplayingmovies);
  if (movies === null) return;

  const featuremovies = movies[0];
  console.log(featuremovies);

  const { original_title, overview, id } = featuremovies;

  return (
    <div className="video-bg">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieID={id} />
      <h1>{original_title}</h1>
    </div>
  );
};

export default MainContainer;
