import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout } from '../auth/actions';
import { Link } from 'react-router-dom'; //Route ?
import Error from './Error';
import styles from './Header.css';
import logo from '../../assets/images/logo-2.svg';

class Header extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() { 
    const { user } = this.props;

    return (
      <header className={styles.header}>
        { user && <span>Welcome, {user.name}</span> }
        <nav>
          {/* TODO: add logo as home */}
          <Link to="/"><img className="logo" src={logo}/></Link>
          { user
            ? <Fragment>
              <Link to="/find">Find a Pet</Link>
              <Link to="/post">Post Pet</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/" onClick={this.handleLogout}>Logout</Link>

            </Fragment>
            :
            <Fragment>
              <Link to="/get-started">Get Started</Link>
              <Link to="/auth">Signin</Link>
            </Fragment> 
          }
        </nav>
        <Error/>
        <hr/>
      </header>
    );
  }
}
 
export default connect(
  state => ({ user: getUser(state) }),
  { logout }
)(Header);