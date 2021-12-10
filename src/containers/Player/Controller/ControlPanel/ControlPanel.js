import { Fragment } from 'react';
import './ControlPanel.css';
import { decode } from 'html-entities';
import { updatePlayingIndex } from '../../../../store/actions/player'
import { connect } from 'react-redux';

import play from '../../../../assets/images/play-button.png';
import pause from '../../../../assets/images/pause.png';
import next from '../../../../assets/images/next.png';
import previous from '../../../../assets/images/previous.png';
import expand from '../../../../assets/images/expand.png';
import shrink from '../../../../assets/images/shrink.png';
import speaker from '../../../../assets/images/speaker.png';

const ControlPanel = props => {

    let artistName;
    if (props.currentSongData) {
        artistName = props.currentSongData.song_artist;

        if (artistName.indexOf(',') > -1) {
            artistName = artistName.substring(0, artistName.indexOf(','));
        }
    }

    const stopEventPropagation = e => {
        e.stopPropagation();
    }

    return (
        <div className="ControlPanel" onClick={window.innerWidth < 550 && props.currentSongData && !props.isDetailsVisible ? props.toggleDetailsVisibility : null}>

            <input className="styled-slider" type="range" min="0" max={props.currentSongData ? props.currentSongData.song_duration : 0} value={[props.songTime]} onInput={e => { props.updateSongTime(e.target.value) }} style={{ width: "100%" }} />

            <div className="song-details" style={window.innerWidth < 550 && props.isDetailsVisible ? { flex: "1" } : null}>
                {
                    props.isDetailsVisible || !props.currentSongData ? null :
                        <Fragment>
                            <img className="song-cover" src={props.currentSongData.song_image} alt="Song Cover" style={props.isPlaying ? { animation: "spin 15s linear infinite" } : null} />
                            <div>
                                <span className="song-name">
                                    {decode(props.currentSongData.song_name)}
                                </span>
                                <br />
                                <span className="artist-name">
                                    {decode(artistName)}
                                </span>
                            </div>
                        </Fragment>
                }
            </div>


            <div className="main-controls" onClick={stopEventPropagation} style={window.innerWidth < 550 && props.isDetailsVisible ? { flex: "2" } : null}>
                {
                    window.innerWidth > 550 || props.isDetailsVisible ?
                        <button onClick={props.updatePlayingIndex.bind(this, props.playingIndex - 1)}>
                            <img src={previous} alt="previous" />
                        </button>
                        : null
                }
                <button disabled={!props.currentSongData} onClick={props.togglePlaying}>
                    <img src={props.isPlaying ? pause : play} alt="play-pause" className="play-pause-btn" />
                </button>
                {
                    window.innerWidth > 550 || props.isDetailsVisible ?
                        <button onClick={props.updatePlayingIndex.bind(this, props.playingIndex + 1)}>
                            <img src={next} alt="next" />
                        </button>
                        : null
                }
            </div>

            {
                <div className="extra-controls" onClick={stopEventPropagation}>
                    {
                        window.innerWidth < 550 ? null :
                            <Fragment>
                                <img src={speaker} alt="volume" />
                                <input type="range" className="volume-seeker" min="0.0" max="1.0" step="0.1" defaultValue="1.0" onInput={(e) => { props.changeAudioVolume(e.target.value) }} />
                            </Fragment>
                    }


                    <button disabled={!props.currentSongData} onClick={props.toggleDetailsVisibility}>
                        <img src={props.isDetailsVisible ? shrink : expand} alt="expand-shrink" className="expand-shrink-btn" />
                    </button>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        playingIndex: state.player.playingIndex
    }
}

const mapActionsToProps = dispatch => {
    return {
        updatePlayingIndex: index => dispatch(updatePlayingIndex(index))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(ControlPanel);