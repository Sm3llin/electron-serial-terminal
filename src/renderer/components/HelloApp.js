import React from 'react';

import Header from './Header';
import Back from './Back';


class HelloApp extends React.Component {
  componentDidMount() {
    console.log(this.props.title);
    document.title = this.props.title;
  }

  render() {
    document.body.style.backgroundColor = '#8aee6c';

    return (
        <div>
          <Header />
          <p>
            Hello.
          </p>
          <Back />
        </div>
    )
  }
}

export default HelloApp;
