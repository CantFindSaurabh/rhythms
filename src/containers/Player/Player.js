import './Player.css';

import { Redirect, Route, Switch } from 'react-router';

import Layout from '../Layout/Layout';
import Home from './Home/Home';
import Controller from './Controller/Controller';
import AlbumPage from '../../components/player/AlbumPage/AlbumPage';
import ArtistPage from '../../components/player/ArtistPage/ArtistPage';
import Browse from './Browse/Browse';
import Library from './Library/Library';
import PlaylistModal from '../../components/player/PlaylistModal/PlaylistModal';

const Player = () => {
    return (
        <div className="Player">
            <Layout>
                <Switch>
                    <Route path="/player/home" exact component={Home} />
                    <Route path="/player/browse" exact component={Browse} />
                    <Route path="/player/library" component={Library} />
                    <Route path='/player/home/album/:id' exact component={AlbumPage} />
                    <Route path='/player/home/artist/:id' exact component={ArtistPage} />
                    <Redirect to="/player/home" />
                </Switch>
                <Controller />

                <PlaylistModal />
            </Layout>
        </div>
    )
}

export default Player;