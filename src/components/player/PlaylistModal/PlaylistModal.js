import './PlaylistModal.css';

import { connect } from 'react-redux'
import { Fragment, useState } from 'react';

import Backdrop from '../../ui/Backdrop/Backdrop'
import PlaylistListElement from './PlaylistListElement/PlaylistListElement';

import { changePlaylistModalSong } from '../../../store/actions/player';
import { addSongToPlaylist, createNewPlaylist, removeSongFromPlaylist } from '../../../store/actions/user';
import Spinner from '../../ui/Spinner/Spinner';


const PlaylistModal = props => {

    const [newPlaylistName, setNewPlaylistName] = useState("")

    const createNewPlaylist = e => {
        e.preventDefault();

        if (newPlaylistName.length === 0) {
            return;
        }
        const newPlaylistTitle = newPlaylistName.toLowerCase();

        const sameNamePlaylist = props.userPlaylists.find(playlist => {
            return playlist.title === newPlaylistTitle
        })

        if (sameNamePlaylist) {
            return;
        }

        props.createNewPlaylist(newPlaylistTitle, props.authToken);

        setNewPlaylistName("");
    }

    if (!props.songToUpdate) {
        return null;
    }

    return (
        <Backdrop zIndex="450" clickHandler={props.changePlaylistModalSong.bind(null, null)}>
            <ul className="PlaylistModal" onClick={e => e.stopPropagation()}>
                {
                    props.isUpdatingPlaylistModal ? <Spinner /> :
                        <Fragment>
                            <button className="close-playlist-modal-btn" onClick={props.changePlaylistModalSong.bind(null, null)}>x</button>


                            <form onSubmit={createNewPlaylist}>
                                <input type="text" placeholder="New Playlist" value={newPlaylistName} onChange={e => { setNewPlaylistName(e.target.value) }} />
                                <button type="submit">+</button>
                            </form>

                            {
                                props.userPlaylists.map(playlist => <PlaylistListElement playlist={playlist} song={props.songToUpdate} key={playlist._id} authToken={props.authToken} addSongToPlaylist={props.addSongToPlaylist} removeSongFromPlaylist={props.removeSongFromPlaylist} />)
                            }
                        </Fragment>
                }
            </ul >
        </Backdrop>
    )
}

const mapStateToProps = state => {
    return {
        userPlaylists: state.user.playlists,
        songToUpdate: state.player.playlistModalSong,
        authToken: state.user.token,
        isUpdatingPlaylistModal: state.player.isUpdatingPlaylistModal
    }
}

const mapActionsToProps = dispatch => {
    return {
        changePlaylistModalSong: song => dispatch(changePlaylistModalSong(song)),
        createNewPlaylist: (title, token) => dispatch(createNewPlaylist(title, token)),
        addSongToPlaylist: (playlistId, song, token) => dispatch(addSongToPlaylist(playlistId, song, token)),
        removeSongFromPlaylist: (playlistId, songId, token) => dispatch(removeSongFromPlaylist(playlistId, songId, token))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PlaylistModal);