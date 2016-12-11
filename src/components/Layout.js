import React, {PropTypes} from 'react';

import Nav from './Nav';

const Layout = (props) => {
  return (
    <div className="app-container">
      <Nav loggedIn={props.loggedIn} logout={props.logout} />
      <div className="app-content">
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
}

export default Layout
