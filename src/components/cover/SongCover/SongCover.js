import './SongCover.css';

import { decode } from 'html-entities';

const SongCover = props => {
    return (
        <div className="SongCover" onClick={props.playSong}>
            <div className="cover-image-container" style={{ height: props.height + "px", width: props.height + "px" }}>
                <img src={props.songImage} alt="Song Cover" height={props.height || 150} />
                <div className="cover-image-hover" style={{ height: props.height + "px", width: props.height + "px" }} >
                    <span>▶</span>
                </div>
            </div>
            <p>{decode(props.songName)}</p>
        </div >
    )
}

export default SongCover;