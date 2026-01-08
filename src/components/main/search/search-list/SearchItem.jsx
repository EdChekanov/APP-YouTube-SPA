import { formatViews } from '../../../../utils/formatViews';

const SearchItem = ({ imgSrc, title, channelName, views }) => {
  return (
    <div className="search-item">
      <img src={imgSrc} alt="preview-img" />
      <div className="info">
        <p className="title">{title}</p>
        <p className="channel">{channelName}</p>
        <p className="views">{formatViews(views)} просмотров</p>
      </div>
    </div>
  );
};

export default SearchItem;
