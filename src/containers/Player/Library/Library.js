import './Library.css'

import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Route } from 'react-router'

import SongList from '../../../components/player/SongList/SongList'
import FavoriteCover from '../../../components/cover/FavoriteCover/FavoriteCover'
import PlaylistCover from '../../../components/cover/PlaylistCover/PlaylistCover'
import NothingBanner from '../../../components/ui/NothingBanner/NothingBanner'
import Backdrop from '../../../components/ui/Backdrop/Backdrop'
import Spinner from '../../../components/ui/Spinner/Spinner'
import { deletePlaylist } from '../../../store/actions/user'

const Library = props => {

    if (props.isUpdating) {
        return (
            <Backdrop>
                <Spinner />
            </Backdrop>
        )
    }

    const defaultContent = (
        <Fragment>
            <FavoriteCover />
            {
                props.playlists.map(playlist => <PlaylistCover playlist={playlist} key={"playlistCover" + playlist._id} deletePlaylist={props.deletePlaylist.bind(null, playlist._id, props.authToken)} />)
            }
        </Fragment>
    )

    const renderSongListWithPlaylistId = (routerProps) => {
        const playlist = props.playlists.find(playlist => playlist._id === routerProps.location.state.playlistId);

        if (playlist.songs.length === 0) {
            return <NothingBanner />
        }

        return <SongList songs={playlist.songs} />
    }

    const renderFavorite = (routerProps) => {
        if (props.favorites.length === 0) {
            return <NothingBanner />
        }

        return <SongList songs={props.favorites} />
    }

    return (
        <div className="Library">
            <Route path='/player/library' exact render={() => defaultContent} />
            <Route path='/player/library/favorite' exact render={renderFavorite} />
            <Route path='/player/library/playlist' exact render={renderSongListWithPlaylistId} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favorites: state.user.favorites,
        playlists: state.user.playlists,
        isUpdating: state.player.isFetching,
        authToken: state.user.token
    }
}

const mapActionsToProps = dispatch => {
    return {
        deletePlaylist: (playlistId, authToken) => dispatch(deletePlaylist(playlistId, authToken))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Library);