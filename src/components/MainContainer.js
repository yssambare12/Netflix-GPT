import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowplayingmovies);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const featureMovie = movies[index];
  const { original_title, overview, id } = featureMovie;

  return (
    <div className="video-bg">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
      <h1>{original_title}</h1>
    </div>
  );
};

export default MainContainer;
