import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';

const Login = props => {
  const { login, error, clearErrors, isAuthenticated } =
    useContext(authContext);
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error !== null && error !== undefined) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const formInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      return setAlert('Please fill in all fields', 'danger');
    }
    login({ email, password });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={formSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={formInput}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={formInput}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
