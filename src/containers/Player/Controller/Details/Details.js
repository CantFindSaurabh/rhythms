import './Details.css';

import { Fragment } from 'react';

import DetailsCover from '../../../../components/cover/DetailsCover/DetailsCover';
import SongList from '../../../../components/player/SongList/SongList';


const Details = props => {

    const detailsStyle = {
        transform: "translateY(0%)"
    }

    // navbar is not visible so reducing the top padding
    if (window.scrollY > 200) {
        detailsStyle.padding = "20px 0 70px 0"
    }

    // Stopping body scroll when details are visible
    if (props.isVisible) {
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = 'scroll';
    }

    return (
        <div className="Details" style={props.isVisible ? detailsStyle : null}>
            {
                !props.currentSongData ? null :
                    <Fragment>
                        {
                            window.innerWidth < 550 ? null :
                                <DetailsCover image={props.currentSongData.song_image} name={props.currentSongData.song_name} artistName={props.currentSongData.song_artist} releaseYear={props.currentSongData.year} />
                        }
                        <SongList songs={props.queue} currentSongData={props.currentSongData} />
                    </Fragment>
            }
        </div>
    )
}

export default Details;