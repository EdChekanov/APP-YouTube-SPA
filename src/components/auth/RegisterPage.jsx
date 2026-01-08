import '../../styles/AuthPage.scss';
import { Form, Input, Button, Card, Select, InputNumber, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetValue,
  selectError,
  selectLoading,
  selectValue,
} from '../../redux/slices/authSlice';
import { register } from '../../redux/api/authApi';
import { useEffect } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectValue);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onFinish = (values) => {
    dispatch(register(values));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(resetValue());
      navigate('/login');
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
            <h2 className="text">Регистрация</h2>
          </div>
          <Form
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Введите имя пользователя!' },
                { min: 3, message: 'Минимум 3 символа' },
                {
                  pattern: /^[a-zA-Z0-9_-]+$/,
                  message: 'Только буквы, цифры, _, -',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Имя пользователя"
                size="large"
              />
            </Form.Item>

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
              rules={[
                { required: true, message: 'Введите пароль!' },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Минимум 8 символов: 1 заглавная, 1 строчная, 1 цифра, 1 спецсимвол (@$!%*?&)',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль (минимум 8 символов)"
                size="large"
                visibilityToggle
              />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Выберите пол!' }]}
              className="genderField"
            >
              <Select placeholder="Пол" size="large">
                <Select.Option value="male">Мужской</Select.Option>
                <Select.Option value="female">Женский</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="age"
              rules={[
                { required: true, message: 'Введите возраст!' },
                {
                  type: 'number',
                  min: 13,
                  max: 100,
                  message: 'Возраст 13-100 лет',
                },
              ]}
              className="ageField"
            >
              <InputNumber
                min={13}
                max={100}
                placeholder="Возраст"
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>

          <button
            className="authPage-redirectBtn"
            type="button"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
