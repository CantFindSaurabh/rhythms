import { Fragment, useEffect, useState } from 'react';
import DetailsCover from '../../cover/DetailsCover/DetailsCover';
import Backdrop from '../../ui/Backdrop/Backdrop';
import Spinner from '../../ui/Spinner/Spinner';
import SongList from '../SongList/SongList';
import './ArtistPage.css';

const ArtistPage = props => {

    const [artistData, setArtistData] = useState(null);
    const [isFetching, setFetchingState] = useState(true);

    useEffect(() => {

        const fetchAlbum = async () => {
            let res = await fetch(process.env.REACT_APP_JIOSAAVN_API + '/search?song=' + encodeURIComponent(props.match.params.id));
            res = await res.json();
            console.log(props);

            setArtistData(res);
            setFetchingState(false);
        }

        fetchAlbum();
    }, [])

    return (
        <div className="ArtistPage">
            {
                isFetching ?
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                    :
                    < Fragment >
                        <DetailsCover image={props.location.state.artistImage} name={props.match.params.id} />
                        <SongList songs={artistData} />
                    </Fragment>
            }
        </div >
    )
}

export default ArtistPage;