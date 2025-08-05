import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  const handlegptsearch = async () => {
    console.log(searchtext.current.value);

    const queryPrompt = `Act as a movie recommendation system. Suggest 5 movie names for the query: "${searchtext.current.value}". Do not add any explanation—just list the 5 movie names only.`;

    // need to solve limit issue for api
    const gptResult = await openai.responses.create({
      model: "gpt-4o",
      // instructions: searchtext.current.value,
      input: queryPrompt,
    });

    console.log(gptResult.output_text);
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
