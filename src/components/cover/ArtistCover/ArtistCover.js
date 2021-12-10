import './ArtistCover.css';
import { withRouter } from 'react-router';


const ArtistCover = (props) => {

    const openArtistPage = () => {
        props.history.push({
            pathname: '/player/home/artist/' + props.artistName,
            state: {
                artistImage: props.artistImage
            }
        })
    }

    return (
        <div className="ArtistCover" onClick={openArtistPage}>
            <div className="cover-image-container" style={{ height: props.height + "px", width: props.height + "px" }}>
                <img src={props.artistImage} alt={props.artistName} height={props.height || 150} />
                <div className="cover-image-hover" style={{ height: props.height + "px", width: props.height + "px" }} >
                    <span>↗</span>
                </div>
            </div>
            <p>{props.artistName}</p>
        </div>
    )
}

export default withRouter(ArtistCover);