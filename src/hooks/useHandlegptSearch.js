import { useDispatch } from "react-redux";
import useSearchMovieTmdb from "./useSearchMovieTmdb";
import { addGptMovieResult } from "../utils/gptSlice";
import openai from "../utils/openai";

const useHandleGptSearch = () => {
  const dispatch = useDispatch();
  const searchMovieTmdb = useSearchMovieTmdb();

  const handlegptsearch = async (searchQuery) => {
    const gptResult = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content: `Act as a movie recommendation system. Suggest 5 movie names for the query: "${searchQuery}". Do not add any explanation—just list the 5 movie names only.`,
        },
      ],
      model: "openai/gpt-4.1",
    });

    const rawText = gptResult.choices?.[0]?.message?.content;

    const gptMovieList = rawText
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((line) => line);

    const promoseArray = gptMovieList.map((movie) => searchMovieTmdb(movie));

    const tmdbResult = await Promise.all(promoseArray);

    dispatch(
      addGptMovieResult({
        movieName: gptMovieList,
        movieSearchResult: tmdbResult,
      })
    );
  };

  return handlegptsearch;
};

export default useHandleGptSearch;
