import './Browse.css';
import SingleLineContainer from '../../../components/scrollableContainers/SingleLineContainer/SingleLineContainer';
import { useState } from 'react';
import { Fragment } from 'react';
import Backdrop from '../../../components/ui/Backdrop/Backdrop';
import Spinner from '../../../components/ui/Spinner/Spinner';

import search from '../../../assets/images/search.png'

const Browse = props => {

    const [resultData, setResultData] = useState({
        songs: [],
        albums: [],
        isFetching: false
    })

    const [searchQuery, setSearchQuery] = useState("");

    const updateSearchQuery = e => {
        setSearchQuery(e.target.value);
    }

    const fetchQueryData = async e => {

        e.preventDefault();

        if (searchQuery.length === 0) {
            return;
        }

        // For hiding keyboard on mobile
        e.target.focus();

        setResultData({
            ...resultData,
            isFetching: true
        })

        //Fetching Songs
        let res = await fetch(process.env.REACT_APP_JIOSAAVN_API + '/search?song=' + encodeURIComponent(searchQuery));
        const songs = await res.json();

        //Fetching Albums
        res = await fetch(process.env.REACT_APP_JIOSAAVN_API + '/search?album=' + encodeURIComponent(searchQuery));
        const albums = await res.json();

        setResultData({
            ...resultData,
            songs,
            albums,
            isFetching: false
        })
    }

    return (
        <div className="Browse">
            <form onSubmit={fetchQueryData} className="search-box">
                <input value={searchQuery} onChange={updateSearchQuery} autoFocus />
                <button type="submit" onClick={fetchQueryData} >
                    <img src={search} alt="search icon" />
                </button>
            </form>

            {
                resultData.isFetching ?
                    <Backdrop>
                        <Spinner />
                    </Backdrop>
                    :
                    <Fragment>
                        {
                            resultData.songs.length === 0 ? null :
                                <SingleLineContainer height="180" type="song" title="Songs" elements={resultData.songs} />
                        }
                        {
                            resultData.albums.length === 0 ? null :
                                <SingleLineContainer height="180" type="album" title="Albums" elements={resultData.albums} />
                        }
                    </Fragment>
            }
        </div>

    )
}

export default Browse;