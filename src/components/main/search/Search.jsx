import { useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectValue,
} from '../../../redux/slices/youtubeSlice';
import SearchInput from './SearchInput';
import SearchList from './search-list/SearchList';
import { Spin } from 'antd';

const Search = () => {
  const videos = useSelector(selectValue);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (error) {
    return <h2>Ошибка: {error.response.data.message}</h2>;
  }

  return (
    <>
      {isLoading && (
        <div className="spinner-overlay">
          <Spin size="large" />
        </div>
      )}
      <div className={videos ? 'search-result' : 'search'}>
        <SearchInput />
        {videos && <SearchList />}
      </div>
    </>
  );
};

export default Search;
