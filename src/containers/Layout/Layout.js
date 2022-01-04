import { Fragment } from 'react';

import BottomBar from '../../components/navigation/BottomBar/BottomBar';
import NavBar from '../../components/navigation/NavBar/NavBar';

const Layout = props => {
    return (
        <Fragment>
            <NavBar />
            {
                window.innerWidth < 550 ? <BottomBar /> : null
            }
            {
                props.children
            }
        </Fragment>
    )
}

export default Layout;