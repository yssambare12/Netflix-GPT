import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import Header from "./Header";

const Browse = () => {
  const getNowPlayingMovide = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?age=1",
      API_OPTIONS
    );

    const json = await data.json();

    console.log(json.results);
  };

  useEffect(() => {
    getNowPlayingMovide();
  }, []);

  return (
    <div>
      <Header />
      <h1>Browse</h1>
    </div>
  );
};

export default Browse;
