import React from 'react';
import { withRouter } from 'react-router-dom';


const Back = ({ history }) => (
    <button onClick={history.goBack} className={"btn btn-primary"}>Back to previous page</button>
);

export default withRouter(Back);
