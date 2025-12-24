import axios from "axios";

/**
 * Мы используем относительный путь /api/deezer.
 * Для этого в корне проекта должен быть файл vercel.json с настройкой rewrites.
 */
const api = axios.create({
  baseURL: "/api/deezer",
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для логирования ошибок — поможет понять, если API упадет
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("--- API ERROR ---");
    console.error("URL:", error.config?.url);
    console.error("Status:", error.response?.status);
    console.error("Message:", error.message);
    return Promise.reject(error);
  }
);

/**
 * Вспомогательная функция для очистки полных URL, 
 * которые иногда приходят из Deezer (например, tracklist)
 */
const cleanUrl = (fullUrl) => {
  return fullUrl.replace("https://api.deezer.com", "");
};

export async function loadTopRadioTracks() {
  try {
    const { data } = await api.get("/radio/37151/tracks?limit=100");
    if (!data?.data) throw new Error();
    return data.data;
  } catch (err) {
    throw new Error("Failed to load radio!");
  }
}

export async function loadCharts() {
  try {
    const { data } = await api.get("/chart");
    if (!data) throw new Error();
    return data;
  } catch (err) {
    throw new Error("Failed to load chart!");
  }
}

export async function loadGenres() {
  try {
    const { data } = await api.get("/genre");
    if (!data?.data) throw new Error();
    // Фильтруем жанр "All", так как он обычно дублирует данные
    return data.data.filter((genre) => genre.name.toLowerCase() !== "all");
  } catch (err) {
    throw new Error("Failed to load genres!");
  }
}

export async function loadGenre(genreId) {
  try {
    const [genreRes, radiosRes] = await Promise.all([
      api.get(`/genre/${genreId}`),
      api.get(`/genre/${genreId}/radios`),
    ]);

    const radios = radiosRes.data?.data;
    if (!genreRes.data || !radios || radios.length === 0) throw new Error();

    // Выбираем случайное радио внутри жанра
    const randomIndex = Math.floor(Math.random() * radios.length);
    const selectedRadio = radios[randomIndex];

    // Очищаем URL треклиста и делаем запрос
    const tracksRes = await api.get(cleanUrl(selectedRadio.tracklist));

    return {
      genre: genreRes.data,
      tracks: tracksRes.data?.data || [],
    };
  } catch (err) {
    throw new Error("Failed to load genre!");
  }
}

export async function loadArtist(artistId) {
  try {
    const [artistRes, tracksRes] = await Promise.all([
      api.get(`/artist/${artistId}`),
      api.get(`/artist/${artistId}/top`),
    ]);

    if (!artistRes.data || !tracksRes.data?.data) throw new Error();

    return {
      artist: artistRes.data,
      tracks: tracksRes.data.data,
    };
  } catch (err) {
    throw new Error("Failed to load artist!");
  }
}

export async function search(searchQuery) {
  try {
    const { data } = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
    if (!data?.data) throw new Error();
    return data.data;
  } catch (err) {
    throw new Error("Failed to load tracks!");
  }
}