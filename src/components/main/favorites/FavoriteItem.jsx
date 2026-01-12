import { Button } from 'antd';
import {
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../../redux/api/youtubeApi';
import { useNavigate } from 'react-router';
import {
  deleteFavorite,
  enterEditMode,
  openModal,
  setQuery,
} from '../../../redux/slices/youtubeSlice';

const FavoriteItem = ({ title, item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const runHandle = () => {
    navigate('/');
    dispatch(setQuery(item.query));
    dispatch(
      getVideos({
        query: item.query,
        videoCounts: item.maxResults,
        sort: item.sort,
      })
    );
  };

  const editHandle = () => {
    dispatch(enterEditMode(item));
    dispatch(openModal());
  };

  const deleteHandle = () => {
    dispatch(deleteFavorite(item.id));
  };

  return (
    <>
      <div className="favorite-item">
        <p className="title">{title}</p>
        <div className="controls">
          <Button type="default" onClick={runHandle}>
            <PlayCircleOutlined />
          </Button>
          <Button type="default" onClick={editHandle}>
            <EditOutlined />
          </Button>
          <Button type="default" onClick={deleteHandle}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FavoriteItem;
