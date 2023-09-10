const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_S5pSWTGYjkEcNWjCUXxge61iZsKgBPcKKXivR6TYBMVvWZIRPPbdM3uzPuyudxT3';

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds?api_key=${API_KEY}`;
  return fetchUrl(url);
}
export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
  return fetchUrl(url);
}

function fetchUrl(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json(); // промис
  });
}
