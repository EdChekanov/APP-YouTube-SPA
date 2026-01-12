import { createAsyncThunk } from '@reduxjs/toolkit';
import { youtubeApi } from '../../api/axios';

export const getVideos = createAsyncThunk(
  'youtube/getVideos',
  async ({ query, videoCounts = 12, sort = 'relevance' }, thunkAPI) => {
    if (!query.trim()) return null;

    try {
      // 1. Поиск видео
      const searchResponse = await youtubeApi.get('/search', {
        params: {
          q: query,
          part: 'snippet',
          type: 'video',
          maxResults: videoCounts,
          order: sort,
        },
      });

      const videoIds = searchResponse.data.items
        .map((item) => item.id.videoId)
        .join(',');

      // 2. Статистика в том же thunk (последовательный запрос)
      if (videoIds) {
        const statsResponse = await youtubeApi.get('/videos', {
          params: {
            id: videoIds,
            part: 'statistics',
          },
        });

        // Объединяем данные
        const videosWithStats = searchResponse.data.items.map(
          (item, index) => ({
            ...item,
            views: statsResponse.data.items[index]?.statistics.viewCount || 0,
          })
        );

        return thunkAPI.fulfillWithValue({
          ...searchResponse.data,
          items: videosWithStats,
        });
      }

      return thunkAPI.fulfillWithValue(searchResponse.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
