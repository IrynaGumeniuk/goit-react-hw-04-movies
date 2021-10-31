const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4085c26bf8f6ac0c7d46ef73dd860fe3';

async function apiService(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 Not found'));
}

export function getTrendingFilms() {
  return apiService(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function getFilmsBySearchQuery(query) {
  return apiService(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`,
  );
}

export function getFullFilmInfo(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`);
}

export function getMovieCredits(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}/credits?api_key=${API_KEY}`);
}

export function getMovieReviews(filmId) {
  return apiService(`${BASE_URL}/movie/${filmId}/reviews?api_key=${API_KEY}`);
}
