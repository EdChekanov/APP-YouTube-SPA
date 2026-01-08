import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const youtubeApi = axios.create({
  baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
