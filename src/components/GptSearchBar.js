import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await data.json();

    return json;

    console.log("tmdb movie ++" + json);

    // console.log(json);
  };

  const handlegptsearch = async () => {
    // console.log(searchtext.current.value);

    const gptResult = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content: `Act as a movie recommendation system. Suggest 5 movie names for the query: "${searchtext.current.value}". Do not add any explanation—just list the 5 movie names only.`,
        },
      ],
      model: "openai/gpt-4.1",
    });

    // console.log(gptResult.output_text);

    // const gptMovieList = gptResult.output_text?.choices[0]?.message?.content;
    // console.log(gptMovieList);

    // console.log(gptResult);
    const rawText = gptResult.choices?.[0]?.message?.content;

    const gptMovieList = rawText
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((line) => line);

    // console.log(gptMovieList);

    const promoseArray = gptMovieList.map((movie) => searchMovieTmdb(movie));

    const tmdbResult = await Promise.all(promoseArray);

    // console.log(tmdbResult);

    dispatch(
      addGptMovieResult({
        movieName: gptMovieList,
        movieSearchResult: tmdbResult,
      })
    );
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-1/2 bg-black grid grid-cols-12"
      >
        <input
          type="text"
          ref={searchtext}
          className="p-4 m-4  col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handlegptsearch}
          className=" col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
