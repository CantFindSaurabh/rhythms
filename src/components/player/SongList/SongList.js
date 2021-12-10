import './SongList.css';
import { connect } from 'react-redux';
import SongListElement from './SongListElement/SongListElement';
import { updatePlayingQueue } from '../../../store/actions/player'
import { addToFavorites, removeFromFavorites } from '../../../store/actions/user'

const SongList = props => {

    return (
        <div className="SongList">
            {
                props.songs.map((song, index) => <SongListElement song={song} key={song.song_id} isCurrentlyPlaying={props.currentSongData ? props.currentSongData.song_id === song.song_id ? true : false : null} playSong={props.updateQueueAndPlayingIndex.bind(null, props.songs, index)} favorites={props.favorites} addToFavorites={props.addToFavorites.bind(null, song, props.token)} removeFromFavorites={props.removeFromFavorites.bind(null, song, props.token)} />)
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favorites: state.user.favorites,
        token: state.user.token
    }
}

const mapActionsToProps = dispatch => {
    return {
        updateQueueAndPlayingIndex: (queue, index) => dispatch(updatePlayingQueue(queue, index)),
        addToFavorites: (song, token) => dispatch(addToFavorites(song, token)),
        removeFromFavorites: (song, token) => dispatch(removeFromFavorites(song, token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(SongList);