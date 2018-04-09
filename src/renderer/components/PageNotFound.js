import React from 'react';

import Header from './Header';


class PageNotFound extends React.Component {
  render() {
    return (
        <div>
          <Header/>
          <p>
            Unable to locate the requested page
          </p>
        </div>
    )
  }
}


export default PageNotFound;
