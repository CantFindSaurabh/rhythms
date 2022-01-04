import './Library.css'

import { connect } from 'react-redux'

import SongList from '../../../components/player/SongList/SongList'

const Library = props => {
    return (
        <div className="Library">
            <SongList songs={props.favorites} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favorites: state.user.favorites
    }
}

export default connect(mapStateToProps)(Library);