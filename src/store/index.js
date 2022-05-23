import { createStore } from 'vuex'
import { songList } from './songList'
import musicList from './musicList'
import musicDetail from './musicDetail'


export default createStore({
    modules: {
        songList,
        musicList,
        musicDetail
    }
})
