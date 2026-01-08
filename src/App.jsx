import { Routes, Route, Outlet } from 'react-router';
import './App.scss';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Main from './components/main/Main';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './components/main/favorites/Favorites';
import Search from './components/main/search/Search';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from './redux/slices/youtubeSlice';

function App() {
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.setItem(`favorites_${token}`, JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Упс... Ничего не найдено</h1>} />
    </Routes>
  );
}

export default App;
