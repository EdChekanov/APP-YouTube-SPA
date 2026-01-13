import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { logout } from '../../redux/slices/authSlice';
import { resetValue } from '../../redux/slices/youtubeDataSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="header">
      <img src="/youtube.svg" alt="logo" width="40vw" draggable="false" />
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Поиск
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Избранное
        </NavLink>
      </nav>
      <button
        className="logout-btn"
        onClick={() => {
          dispatch(logout());
          navigate('/login');
          dispatch(resetValue());
        }}
      >
        Выйти
      </button>
    </header>
  );
};

export default Header;
