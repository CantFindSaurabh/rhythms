import './AlbumPage.css';

import { Fragment, useEffect, useState } from 'react';

import DetailsCover from '../../cover/DetailsCover/DetailsCover';
import Backdrop from '../../ui/Backdrop/Backdrop';
import Spinner from '../../ui/Spinner/Spinner';
import SongList from '../SongList/SongList';

const AlbumPage = props => {

    const [albumData, setAlbumData] = useState(null);
    const [isFetching, setFetchingState] = useState(true);

    useEffect(() => {

        const fetchAlbum = async () => {
            let res = await fetch(process.env.REACT_APP_JIOSAAVN_API + '/album?id=' + props.match.params.id);
            res = await res.json();

            setAlbumData(res);
            setFetchingState(false);
        }

        fetchAlbum();
    }, [])

    return (
        <div className="AlbumPage">
            {
                isFetching ?
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                    :
                    < Fragment >
                        <DetailsCover image={albumData.album_image} name={albumData.album_name} artistName={albumData.album_artist} releaseYear={albumData.year} />
                        <SongList songs={albumData.songs} />
                    </Fragment>
            }
        </div >
    )
}

export default AlbumPage;