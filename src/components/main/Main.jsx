import { Outlet } from 'react-router';
import Header from './Header';
import ModalWindow from './modal/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  editFavorite,
  closeModal,
  selectModalIsVisible,
  setModalQuery,
  exitEditMode,
  selectModalIsEdit,
  selectModalEditItem,
} from '../../redux/slices/youtubeSlice';

const Main = () => {
  const isModalVisible = useSelector(selectModalIsVisible);
  const isEditMode = useSelector(selectModalIsEdit);
  const editItem = useSelector(selectModalEditItem);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(exitEditMode());
    dispatch(setModalQuery(''));
    dispatch(closeModal());
  };

  const handleSave = (formData) => {
    isEditMode
      ? dispatch(editFavorite({ ...formData, id: editItem.id }))
      : dispatch(addFavorite(formData));
    handleCancel();
  };

  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <ModalWindow
        visible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
};

export default Main;
