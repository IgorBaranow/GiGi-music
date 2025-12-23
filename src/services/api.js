import axios from "axios";


const PROXY_URL = "https://corsproxy.io/?"; 
const API_BASE_URL = "https://api.deezer.com";

axios.defaults.baseURL = PROXY_URL + API_BASE_URL;

const API_CHART_URL = "/chart";
const API_SEARCH_URL = "/search";
const API_ALL_GENRES_URL = "/genre";
const API_ALL_ARTISTS_URL = "/artist";
const API_TOP_TRACKS_RADIO_URL = "/radio/37151/tracks";

export async function loadTopRadioTracks() {
  try {
    const data = await axios(`${API_TOP_TRACKS_RADIO_URL}?limit=100`);

    if (!data?.data?.data) throw Error();

    return data.data.data;
  } catch (err) {
    throw Error("Failed to load radio!");
  }
}

export async function loadCharts() {
  try {
    const data = await axios(API_CHART_URL);

    if (!data?.data) throw Error();

    return data.data;
  } catch (err) {
    throw Error("Failed to load chart!");
  }
}

export async function loadGenres() {
  try {
    const data = await axios.get(API_ALL_GENRES_URL);
    if (!data?.data?.data) throw Error();
    return data.data.data.filter((genre) => genre.name.toLowerCase() !== "all");
  } catch (err) {
    throw Error("Failed to load genres!");
  }
}
export async function loadGenre(genreId) {
  try {
    const [genreData, radiosData] = await Promise.all([
      axios.get(`${API_ALL_GENRES_URL}/${genreId}`),
      axios.get(`${API_ALL_GENRES_URL}/${genreId}/radios`),
    ]);

    if (!genreData?.data || !radiosData?.data?.data) throw Error();

    const radios = radiosData.data.data;
    console.log(radios);
    console.log(radiosData);
    const randomIndex = Math.floor(Math.random() * radios.length);
    const tracksData = await axios(radios[randomIndex].tracklist.replace(API_BASE_URL, ""));

    return {
      genre: genreData.data,
      tracks: tracksData.data.data,
    };
  } catch (err) {
    console.log(err);
    throw Error("Failed to load genre!");
  }
}

export async function loadArtist(artistId) {
  try {
    const [artistData, tracksData] = await Promise.all([
      axios.get(`${API_ALL_ARTISTS_URL}/${artistId}`),
      axios.get(`${API_ALL_ARTISTS_URL}/${artistId}/top`),
    ]);

    if (!artistData?.data || !tracksData?.data?.data) throw Error();

    return {
      artist: artistData.data,
      tracks: tracksData.data.data,
    };
  } catch (err) {
    console.log(err);
    throw Error("Failed to load artist!");
  }
}

export async function search(searchQuery) {
  try {
    const data = await axios.get(`${API_SEARCH_URL}?q=${searchQuery}`);
    if (!data?.data?.data) throw Error();
    return data.data.data;
  } catch (err) {
    throw Error("Failed to load tracks!");
  }
}
