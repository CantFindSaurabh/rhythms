import './AlbumCover.css';

import { decode } from 'html-entities';
import { withRouter } from 'react-router';

const AlbumCover = (props) => {

    const openAlbumPage = () => {
        props.history.push('/player/home/album/' + props.id);
    }

    return (
        <div className="AlbumCover" onClick={openAlbumPage}>
            <div className="cover-image-container" style={{ height: props.height + "px", width: props.height + "px" }}>
                <img src={props.albumImage} alt={props.albumName} height={props.height || 150} />
                <div className="cover-image-hover" style={{ height: props.height + "px", width: props.height + "px" }} >
                    <span>↗</span>
                </div>
            </div>
            <p>{decode(props.albumName)}</p>
        </div >
    )
}
export default withRouter(AlbumCover);