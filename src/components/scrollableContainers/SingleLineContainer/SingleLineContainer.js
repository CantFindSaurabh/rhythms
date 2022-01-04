import './SingleLineContainer.css';

import { connect } from 'react-redux';

import AlbumCover from '../../cover/AlbumCover/AlbumCover';
import ArtistCover from '../../cover/ArtistCover/ArtistCover';
import SongCover from '../../cover/SongCover/SongCover';

import { updatePlayingQueue } from '../../../store/actions/player';

const SingleLineContainer = props => {
    return (
        <div className="SingleLineContainer">
            <p>{props.title}</p>
            <div>
                {
                    props.elements.map((element, index) => {
                        if (props.type === 'song') {
                            return <SongCover key={element.song_id} id={element.song_id} songImage={element.song_image} songName={element.song_name} height={props.height} playSong={props.updateQueue.bind(this, props.elements, index)} />
                        }
                        else if (props.type === 'artist') {
                            return <ArtistCover key={element.name} artistImage={element.imgSrc} artistName={element.name} height={props.height} />
                        }
                        else if (props.type === 'album') {
                            return <AlbumCover key={element.album_id} id={element.album_id} albumImage={element.album_image} albumName={element.album_name} height={props.height} />
                        }
                        else {
                            return null;
                        }
                    })
                }
            </div>
        </div>
    )
}

const mapActionsToProps = dispatch => {
    return {
        updateQueue: (songs, index) => dispatch(updatePlayingQueue(songs, index))
    }
}

export default connect(null, mapActionsToProps)(SingleLineContainer);