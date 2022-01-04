import { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updatePlayingIndex } from "../../../../../store/actions/player";


const Audio = props => {
    const audioRef = useRef();

    useEffect(() => {

        let timeFunction = null;

        if (props.currentSongData) {
            if (props.isPlaying && audioRef.current.paused) {
                audioRef.current.play();
            }
            else if (!props.isPlaying && !audioRef.current.paused) {
                audioRef.current.pause();
            }

            if (!isNaN(audioRef.current.currentTime) && !timeFunction) {
                timeFunction = setInterval(() => {
                    if (audioRef.current != null) {
                        props.updateSongTime(Math.floor(audioRef.current.currentTime));
                    }
                }, 1000);
            }
            else {
                clearInterval(timeFunction);
            }

            if (audioRef.current.currentTime !== 0 && Math.abs(audioRef.current.currentTime - props.songTime) > 2) {
                audioRef.current.currentTime = props.songTime;
            }

            if (audioRef.current.volume !== props.volume) {
                audioRef.current.volume = props.volume
            }
        }

        return () => {
            if ((!props.isUserAuthenticated) && timeFunction) {
                clearInterval(timeFunction);
            }
        }
    })

    useEffect(() => {
        if (props.currentSongData && props.songTime >= Math.floor(audioRef.current.duration)) {
            props.updatePlayingIndex(props.playingIndex + 1);
        }
    }, [props.songTime])

    return (
        <Fragment>
            {
                props.currentSongData ? <audio ref={audioRef} src={props.currentSongData.download_links[0]} /> : null
            }
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        playingIndex: state.player.playingIndex,
        isUserAuthenticated: state.user.isAuthenticated
    }
}
const mapActionToProps = dispatch => {
    return {
        updatePlayingIndex: playingIndex => dispatch(updatePlayingIndex(playingIndex))
    }
}

export default connect(mapStateToProps, mapActionToProps)(Audio);