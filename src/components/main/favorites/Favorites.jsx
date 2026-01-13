import { useSelector } from 'react-redux';
import { selectFavorites } from '../../../redux/slices/favoritesSlice';
import FavoriteItem from './FavoriteItem';

const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <>
      <h2 className="favorites-title">Избранное</h2>
      <ul className="favorites">
        {favorites.map((item) => (
          <li key={item.id}>
            <FavoriteItem title={item.title} item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favorites;
