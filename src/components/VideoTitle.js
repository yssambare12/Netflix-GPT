const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] px-36 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">
        {overview.split(" ").slice(0, 18).join(" ")}...
      </p>

      <div>
        <button className="bg-gray-500 bg-white text-black p-4 px-12 text-lg hover:bg-opacity-60 rounded-md">
          ▶ Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-12 mx-2 text-lg bg-opacity-50 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
