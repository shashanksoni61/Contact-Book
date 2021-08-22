import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import authContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, logout, user } = useContext(authContext);

  const logoutHandler = () => {
    logout();
  };
  const authLinks = (
    <Fragment>
      <li>{user && `Hello ${user.name}`}</li>
      <li>
        <a href='#!' onClick={logoutHandler}>
          <i className='fas fa-sign-out-alt'>
            <span className='hide-sm'>Logout</span>
          </i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Book',
  icon: 'fas fa-id-card-alt',
};
export default Navbar;
