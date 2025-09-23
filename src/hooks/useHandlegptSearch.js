import { useDispatch } from "react-redux";
import useSearchMovieTmdb from "./useSearchMovieTmdb";
import { addGptMovieResult } from "../utils/gptSlice";
import openai from "../utils/openai";

const useHandleGptSearch = () => {
  const dispatch = useDispatch();
  const searchMovieTmdb = useSearchMovieTmdb();

  const handlegptsearch = async (searchQuery) => {
    try {
      const gptResult = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful movie recommender." },
          {
            role: "user",
            content: `Suggest 5 movie titles for: "${searchQuery}". Respond with only the 5 titles, one per line.`,
          },
        ],
        // Use GitHub Models id if running via GitHub Models, else OpenAI model id
        model: "gpt-4o-mini",
      });

      const rawText = gptResult.choices?.[0]?.message?.content || "";

      const gptMovieList = rawText
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((line) => line);

      if (!gptMovieList.length) {
        throw new Error("No titles returned by AI");
      }

      const promiseArray = gptMovieList.map((movie) => searchMovieTmdb(movie));
      const tmdbResult = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieName: gptMovieList,
          movieSearchResult: tmdbResult,
        })
      );
    } catch (error) {
      console.error("GPT search failed:", error);
      dispatch(
        addGptMovieResult({
          movieName: [],
          movieSearchResult: [],
          error: error?.message || "Search failed. Check your API key.",
        })
      );
      throw error; // rethrow so UI can optionally show a toast
    }
  };

  return handlegptsearch;
};

export default useHandleGptSearch;
