import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  render() {
    return (
        <header>
          <h1>Welcome to my React homepage</h1>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/hello'>Hello</Link></li>
            </ul>
          </nav>
        </header>
    )
  }
}

export default Header;
