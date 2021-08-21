import React, { useContext, useEffect, useState } from 'react';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Register = props => {
  const { setAlert } = useContext(alertContext);
  const { register, error, clearErrors, isAuthenticated } =
    useContext(authContext);

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
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const formInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      return setAlert('Plase Enter All fields', 'danger');
    } else if (password !== password2) {
      return setAlert('Passwords do not match', 'danger');
    }
    register({
      name,
      email,
      password,
    });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={formSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            required
            value={name}
            onChange={formInput}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            required
            value={email}
            onChange={formInput}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={formInput}
            required
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={formInput}
            required
            // minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
