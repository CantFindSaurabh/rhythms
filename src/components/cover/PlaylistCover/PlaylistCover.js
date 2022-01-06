import './PlaylistCover.css';

import { withRouter } from 'react-router';

const PlaylistCover = props => {

    const redirectToPlaylistPage = () => {
        props.history.push({
            pathname: "/player/library/playlist",
            state: {
                playlistId: props.playlist._id
            }
        })
    }
    const getImage = index => {
        if (index < props.playlist.songs.length) {
            return props.playlist.songs[index].song_image;
        }
        return "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80";
    }

    return (
        <div className="PlaylistCover" onClick={redirectToPlaylistPage}>
            <img src={getImage(0)} className="PlaylistCover-image" alt="playlist-cover" />
            <img src={getImage(1)} className="PlaylistCover-image" alt="playlist-cover" />
            <p>{props.playlist.title}</p>
            <img src={getImage(2)} className="PlaylistCover-image" alt="playlist-cover" />
            <img src={getImage(3)} className="PlaylistCover-image" alt="playlist-cover" />
        </div>
    )
}

export default withRouter(PlaylistCover);