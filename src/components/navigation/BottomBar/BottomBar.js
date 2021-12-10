import './BottomBar.css';

import { NavLink } from 'react-router-dom';

import homeIcon from '../../../assets/images/home.png';
import searchIcon from '../../../assets/images/search.png';
import libraryIcon from '../../../assets/images/library.png';

const BottomBar = () => {
    return (
        <div className="BottomBar">
            <NavLink to="/player/home" activeClassName="active-img-icon">
                <img src={homeIcon} alt="home-icon" />
            </NavLink>

            <NavLink to="/player/browse" activeClassName="active-img-icon">
                <img src={searchIcon} alt="search-icon" />
            </NavLink>

            <NavLink to="/player/library" activeClassName="active-img-icon">
                <img src={libraryIcon} alt="user-icon" />
            </NavLink>
        </div>
    )
}

export default BottomBar;