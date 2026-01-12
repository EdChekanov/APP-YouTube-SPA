import { Routes, Route, Outlet } from 'react-router';
import './App.scss';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Main from './components/main/Main';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './components/main/favorites/Favorites';
import Search from './components/main/search/Search';

function App() {
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
