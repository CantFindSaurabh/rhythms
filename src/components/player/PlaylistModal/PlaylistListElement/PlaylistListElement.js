import './PlaylistListElement.css';

import plus_icon from '../../../../assets/images/plus.png';
import minus_icon from '../../../../assets/images/minus.png';

const PlaylistListElement = props => {

    let song = props.playlist.songs.find(song => {
        return song.song_id === props.song.song_id
    })

    const clickHandler = () => {
        if (song) {
            props.removeSongFromPlaylist(props.playlist._id, props.song.song_id, props.authToken)
        }
        else {
            props.addSongToPlaylist(props.playlist._id, props.song, props.authToken);
        }
    }


    return (
        <li className={`PlaylistListElement ${song ? "songPresent" : ""}`} onClick={clickHandler}>
            <p>•</p>
            <p>{props.playlist.title}</p>
            <img src={song ? minus_icon : plus_icon} alt="add/remove to playlist" />
        </li>
    )
}

export default PlaylistListElement;