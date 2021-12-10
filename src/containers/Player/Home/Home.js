import './Home.css';
import { useEffect } from 'react';
import Backdrop from '../../../components/ui/Backdrop/Backdrop';
import Spinner from '../../../components/ui/Spinner/Spinner';
import * as actions from '../../../store/actions/player';
import { connect } from 'react-redux';
import DoubleLineContainer from '../../../components/scrollableContainers/DoubleLineContainer/DoubleLineContainer';
import SingleLineContainer from '../../../components/scrollableContainers/SingleLineContainer/SingleLineContainer';

const Home = (props) => {

    useEffect(() => {
        if (props.homeData === null) {
            props.fetchHomeData(props.authToken);
        }
    }, [])

    if (props.isFetching || props.homeData == null) {
        return (
            <Backdrop>
                <Spinner />
            </Backdrop>
        )
    }

    return (
        <div className="Home">
            <DoubleLineContainer height="150" type="song" title="Trending Now" first={props.homeData.newReleases.hindi} second={props.homeData.newReleases.punjabi} />
            <SingleLineContainer height="130" type="artist" title="Artists" elements={props.homeData.artists} />
            <SingleLineContainer height="150" type="album" title="Top Albums" elements={props.homeData.albums} />
            <SingleLineContainer height="180" type="song" title="Top Tracks of 2015" elements={props.homeData.top2015} />
            <SingleLineContainer height="180" type="song" title="Top Tracks of 2010" elements={props.homeData.top2010} />
            <SingleLineContainer height="180" type="song" title="Retro Songs" elements={props.homeData.old} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        homeData: state.player.homeData,
        isFetching: state.player.isFetching,
        authToken: state.user.token
    }
}
const mapActionsToProps = (dispatch) => {
    return {
        fetchHomeData: token => dispatch(actions.fetchHomeData(token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Home);