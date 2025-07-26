import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBackground = ({ movieID }) => {
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/1087192/videos",
      API_OPTIONS
    );

    const json = await data.json();

    const filterData = json.results.filter((video) => video.type == "Trailer");
    const Trailer = filterData.length ? filterData[0] : json.results[0];

    console.log(Trailer);
  };

  useEffect(() => {
    getMovieVideo();
  }, []);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/OWEq2Pf8qpk?si=tHvBYVH9-Hn_ULQ-"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
