import React from 'react';

import Header from './Header';
import Main from './Main';


class App extends React.Component {
  componentDidMount() {
    console.log(this.props.title);
    document.title = this.props.title;
  }

  render() {
    document.body.style.backgroundColor = '#ff6868';

    return (
        <div>
          <Header />
          <Main />
        </div>
    )
  }
}

export default App;
