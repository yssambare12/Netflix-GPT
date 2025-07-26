const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-gray-500 text-white p-4 px-12 text-lg bg-opacity-50 rounded-md">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-12 mx-2 text-lg bg-opacity-50 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
