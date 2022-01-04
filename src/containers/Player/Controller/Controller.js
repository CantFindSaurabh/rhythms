import { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import ControlPanel from './ControlPanel/ControlPanel';
import Details from './Details/Details';
import Audio from './ControlPanel/Audio/Audio';

const Controller = props => {
    useEffect(() => {
        const fetchCurrentSong = async () => {

            if (props.queue.length !== 0 && props.playingIndex !== -1) {
                let res = await fetch(process.env.REACT_APP_JIOSAAVN_API + "/song?id=" + props.queue[props.playingIndex].song_id);
                res = await res.json();

                setCurrentSongData(res);
                setIsPlaying(true);
            }
        }
        fetchCurrentSong();
    }, [props.queue, props.playingIndex])

    const [detailsVisibilityState, setDetailsVisibilityState] = useState(false);
    const [currentSongData, setCurrentSongData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTime, setSongTime] = useState(0);
    const [songVolume, setSongVolume] = useState(1.0);

    const toggleDetailsVisibility = () => {
        setDetailsVisibilityState(!detailsVisibilityState);
    }

    const updateSongTime = time => {
        setSongTime(time);
    }

    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
    }

    const changeAudioVolume = volume => {
        setSongVolume(volume);
    }

    return (
        <div className="Controller">
            <Audio volume={songVolume} currentSongData={currentSongData} isPlaying={isPlaying} updateSongTime={updateSongTime} songTime={songTime} togglePlaying={togglePlaying} />

            <Details currentSongData={currentSongData} isVisible={detailsVisibilityState} toggleVisibility={toggleDetailsVisibility} queue={props.queue} playingIndex={props.playingIndex} />
            <ControlPanel changeAudioVolume={changeAudioVolume} songTime={songTime} updateSongTime={updateSongTime} currentSongData={currentSongData} isDetailsVisible={detailsVisibilityState} toggleDetailsVisibility={toggleDetailsVisibility} isPlaying={isPlaying} togglePlaying={togglePlaying} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        queue: state.player.queue,
        playingIndex: state.player.playingIndex
    }
}

export default connect(mapStateToProps)(Controller);