import '../../styles/AuthPage.scss';
import { Form, Input, Button, Card, Spin } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetValue,
  selectError,
  selectLoading,
  selectValue,
} from '../../redux/slices/authSlice';
import { login } from '../../redux/api/authApi';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectValue);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(resetValue());
      navigate('/');
    }
  });

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
      <div className="authPage">
        <Card className="authCard">
          <div className="title">
            <img src="/youtube.svg" alt="logo" width="20%" draggable="false" />
            <h2 className="text">Вход</h2>
          </div>
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Введите email!' },
                { type: 'email', message: 'Неверный формат email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Введите пароль!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль"
                size="large"
                visibilityToggle // Опция показа/скрытия пароля
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Войти
              </Button>
            </Form.Item>
          </Form>
          <button
            className="authPage-redirectBtn"
            type="button"
            onClick={() => navigate('/registration')}
          >
            Зарегистрироваться
          </button>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
