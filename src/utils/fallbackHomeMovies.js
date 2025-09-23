import store from "./storeRef";

function pick(arr, count) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, Math.max(0, count));
}

function buildFallbackFromState(state) {
  const now = state.movies?.nowplayingmovies || [];
  const popular = state.movies?.popularMovies || [];
  const upcoming = state.movies?.upcomingMovies || [];
  const top = state.movies?.topRatedMovies || [];

  const sections = [];

  if (now.length)
    sections.push({ title: "Now Playing", movies: pick(now, 20) });
  if (popular.length)
    sections.push({ title: "Popular", movies: pick(popular, 20) });
  if (upcoming.length)
    sections.push({ title: "Upcoming", movies: pick(upcoming, 20) });
  if (top.length) sections.push({ title: "Top Rated", movies: pick(top, 20) });

  return sections;
}

const fallbackHomeMovies = (() => {
  try {
    const state = store?.getState ? store.getState() : {};
    const built = buildFallbackFromState(state);
    if (built.length) return built;
  } catch {}
  return [];
})();

export default fallbackHomeMovies;
