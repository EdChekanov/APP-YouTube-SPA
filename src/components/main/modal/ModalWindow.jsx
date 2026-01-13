import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModalEditItem,
  selectModalIsEdit,
  selectModalQuery,
  setModalQuery,
} from '../../../redux/slices/uiSlice';
import { selectLastQuery } from '../../../redux/slices/youtubeDataSlice';
import { useEffect } from 'react';

const ModalWindow = ({ visible, onCancel, onSave }) => {
  const isEditMode = useSelector(selectModalIsEdit);
  const editItem = useSelector(selectModalEditItem);

  const modalQuery = useSelector(selectModalQuery);
  const lastQuery = useSelector(selectLastQuery);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const cancelHandle = () => {
    form.resetFields();
    setModalQuery('');
    onCancel();
  };

  const onFinish = (values) => {
    console.log('Сохраненные данные:', values);
    onSave(values);
    form.resetFields();
  };

  useEffect(() => {
    if (editItem) dispatch(setModalQuery(editItem.query));
    if (visible) {
      form.resetFields();
      form.setFieldsValue({
        query: modalQuery || lastQuery,
        name: editItem?.title || '',
        count: editItem?.maxResults || 12,
        sort: editItem?.sort || 'relevance',
      });
    }
  }, [dispatch, editItem, visible, modalQuery, lastQuery, form]);

  return (
    <Modal
      title="Сохранить запрос"
      open={visible}
      onCancel={cancelHandle}
      footer={null}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Запрос" name="query" shouldUpdate>
          <Input placeholder="Введите запрос" disabled={!isEditMode} />
        </Form.Item>

        <Form.Item
          label="Название запроса"
          name="name"
          rules={[{ required: true, message: 'Введите название!' }]}
        >
          <Input placeholder="Название запроса" />
        </Form.Item>

        <Form.Item label="Сортировка" name="sort" initialValue="relevance">
          <Select style={{ width: '100%' }} placeholder="Выберите сортировку">
            <Select.Option value="relevance">По релевантности</Select.Option>
            <Select.Option value="date">По дате</Select.Option>
            <Select.Option value="rating">По рейтингу</Select.Option>
            <Select.Option value="title">По названию</Select.Option>
            <Select.Option value="viewCount">По просмотрам</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Максимальное количество" name="count">
          <InputNumber min={0} max={50} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <div
            className="btn-group"
            style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}
          >
            <Button onClick={onCancel}>Не сохранять</Button>
            <Button type="primary" onClick={handleOk}>
              Сохранить
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalWindow;
