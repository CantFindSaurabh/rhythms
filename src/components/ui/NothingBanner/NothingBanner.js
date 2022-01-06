import './NothingBanner.css';

import { withRouter } from 'react-router';

const NothingBanner = props => {
    return (
        <div className="NothingBanner">
            <p>Nothing To Show Here</p>
            <input type="button" onClick={props.history.goBack} value="Go Back" />
        </div>
    )
}

export default withRouter(NothingBanner);