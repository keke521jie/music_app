
/**
 * MusicDetail组件的仓库
*/
import API from "../api"

const state = {
    c: {}
}
const mutations = {
    GETMUSICLYRIC(state, musicLyric) {
        state.Lyric = musicLyric
    }
}
const actions = {
    // 获取歌词数据
    async getMusicLyric({ commit }, id) {
        let result = await API.footerPlay.reqGetMusicLyric(id)
        if (result.code == 200) {
            commit('GETMUSICLYRIC', result)
        }
    }
}
const getters = {
    lrc(state) {
        return state.Lyric.lrc.lyric
    },
    lyric(state) {
        return state.Lyric.tlyric.lyric
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}