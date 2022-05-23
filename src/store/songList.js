import API from '../api'

export const songList = {
    state: () => ({
        // 歌单详情页的数据  
        playlist:{},
    }),
    mutations: {
        GETSONGLISTINFO(state,data){
            state.playlist = data
        }
    },
    actions: {
        // 获取歌单详情页的数据
        async getSongListInfo({commit},id) {
            let result = await API.songlist.reqGetSongListInfo(id)
            if (result.code == 200) {
                commit('GETSONGLISTINFO',result.playlist)
            }
        }
    },
    getters: {}
}
