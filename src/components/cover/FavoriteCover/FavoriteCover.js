import './FavoriteCover.css';

import { withRouter } from 'react-router';

import heart_icon from '../../../assets/images/heart-red.png'

const FavoriteCover = props => {

    const redirectToFavoritePage = () => {
        props.history.push('/player/library/favorite')
    }

    return (
        <div className="FavoriteCover" onClick={redirectToFavoritePage}>
            <img src={heart_icon} alt="favorite" />
        </div>
    )
}

export default withRouter(FavoriteCover);