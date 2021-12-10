import { connect } from 'react-redux'
import SongList from '../../../components/player/SongList/SongList'
import './Library.css'

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