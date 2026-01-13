import { HeartOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/slices/uiSlice';
import { selectQuery, setQuery } from '../../../redux/slices/youtubeDataSlice';

import { getVideos } from '../../../redux/api/youtubeApi';

const SearchInput = () => {
  const query = useSelector(selectQuery);

  const dispatch = useDispatch();

  const handleSearch = () => dispatch(getVideos({ query: query }));
  const handleSave = () => dispatch(openModal());

  return (
    <>
      <h2 className="title">Поиск видео</h2>
      <div className="search-input">
        <Input
          placeholder="Что хотите посмотреть?"
          size="large"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          suffix={<HeartOutlined onClick={handleSave} />}
        />
        <Button type="primary" size="large" block onClick={handleSearch}>
          Найти
        </Button>
      </div>
    </>
  );
};

export default SearchInput;
