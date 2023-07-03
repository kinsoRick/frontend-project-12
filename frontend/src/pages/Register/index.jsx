import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import SecurityIllustration from '../../assets/security.svg';
import RegisterForm from '../../components/Forms/RegisterForm';
import './index.scss';
import AuthContext from '../../contexts/AuthContext';

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: '100vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const Register = () => {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const register = (values) => {
    const { username, password } = values;
    setError(null);

    axios
      .post('/api/v1/signup', { username, password }).then((res) => {
        setToken(res.data.token);
        setUsername(res.data.username);

        navigate('/');
      })
      .catch((err) => {
        if (err.response?.data?.statusCode === 409) {
          setError(t('nicknameOwned'));
          toast.error(t('nicknameOwned'));
        }
      });
  };

  return (
    <div style={background}>
      <nav className="nav-pane">
        <div className="nav-content">
          <a href="/">Hexlet Chat</a>
        </div>
      </nav>

      <main className="container">
        <div className="pane grid-form">
          <div className="left-box">
            <img
              alt="Illustration login"
              src={SecurityIllustration}
              style={{
                height: 'auto',
                width: '90%',
                opacity: 0.7,
              }}
            />
          </div>

          <div className="right-box">
            <h1>{t('toRegister')}</h1>
            <RegisterForm onSubmit={register} error={error} />
            <span>
              { t('haveAccount')}
              <a href="/login">
                {' '}
                {t('goLogin')}
              </a>
            </span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Register;
