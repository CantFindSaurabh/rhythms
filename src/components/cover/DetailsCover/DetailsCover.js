import './DetailsCover.css';
import { decode } from 'html-entities';

const DetailsCover = props => {

    let artistName = props.artistName;

    if (artistName && artistName.indexOf(',') > -1) {
        artistName = artistName.substring(0, artistName.indexOf(','));
    }

    return (
        <div className="DetailsCover">
            <img src={props.image} alt="cover" />
            <div>
                <p className="name">{decode(props.name)}</p>
                <p>{decode(artistName)}</p>
                <p>{props.releaseYear}</p>
            </div>
        </div>
    )
}

export default DetailsCover;