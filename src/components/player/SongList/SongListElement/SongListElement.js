import './SongListElement.css';

import { decode } from 'html-entities';

import heart_black from '../../../../assets/images/heart-black.png'
import heart_red from '../../../../assets/images/heart-red.png'
import playlist_icon from '../../../../assets/images/playlist.png'

const SongListElement = props => {

    let isFavorite = false;
    for (let i = 0; i < props.favorites.length; i++) {
        if (props.song.song_id === props.favorites[i].song_id) {
            isFavorite = true;
        }
    }

    let artistName = props.song.song_artist;
    if (artistName && artistName.indexOf(',') > -1) {
        artistName = artistName.substring(0, artistName.indexOf(','));
    }

    return (
        <div className={`SongListElement ${props.isCurrentlyPlaying ? "currently-playing" : ""}`} onClick={props.playSong} >
            <img src={props.song.song_image} alt="song-cover" />
            <p>{decode(props.song.song_name)}</p>
            <p>{decode(artistName)}</p>
            <p>{props.song.year}</p>

            <img src={playlist_icon} className="plus-icon" alt="plus" onClick={e => { e.stopPropagation(); props.changePlaylistModalSong(props.song) }} />
            <img className={isFavorite ? "favorite-icon-yes" : "favorite-icon-no"} src={isFavorite ? heart_red : heart_black} alt="heart" onClick={(e) => { e.stopPropagation(); isFavorite ? props.removeFromFavorites() : props.addToFavorites(); }} />
        </div>
    )
}

export default SongListElement;