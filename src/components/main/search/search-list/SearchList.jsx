import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLastQuery,
  selectValue,
  selectView,
  setView,
} from '../../../../redux/slices/youtubeSlice';
import SearchItem from './SearchItem';

const SearchList = () => {
  const data = useSelector(selectValue);
  const lastQuery = useSelector(selectLastQuery);
  const view = useSelector(selectView);

  const dispatch = useDispatch();

  return (
    <div className="search-list">
      <div className="top-panel">
        <p className="info">
          Видео по запросу <b>"{lastQuery.trim()}"</b>{' '}
          <span>{data.pageInfo.totalResults}</span>
        </p>
        <div className="view">
          <Button
            className={view === 'list' && 'active'}
            type="text"
            icon={<UnorderedListOutlined />}
            onClick={() => dispatch(setView('list'))}
          ></Button>
          <Button
            className={view === 'thumbnails' && 'active'}
            type="text"
            icon={<AppstoreOutlined />}
            onClick={() => dispatch(setView('thumbnails'))}
          ></Button>
        </div>
      </div>
      <ul className={`search-items ${view}`}>
        {data.items.map((video) => (
          <li key={video.id.videoId}>
            <SearchItem
              imgSrc={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
              channelName={video.snippet.channelTitle}
              views={video.views}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
