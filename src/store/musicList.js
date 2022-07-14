import API from '../api'

const state = {
    musicList: [{
        id: 1306507078,
        al: {
            id: "",
            name: "音乐每一天",
            picUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg95.699pic.com%2Fxsj%2F0w%2Fxa%2F1e.jpg%21%2Ffw%2F700%2Fwatermark%2Furl%2FL3hzai93YXRlcl9kZXRhaWwyLnBuZw%2Falign%2Fsoutheast&refer=http%3A%2F%2Fimg95.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655471874&t=cae8b79ba9340ede246880c98ae586d3"
        }
    }],
    playIndex: 0,
    isPlay: false,
    // 播放歌曲的当前时间
    currentTime: 0,
    duration:0,
}
const mutations = {
    UPDATEISPLAY(state, p) {
        state.isPlay = p    //p参数更改isPlay
    },
    // 更新音乐列表
    UPDATEMUSICLIST(state, newMusicList) {
        state.musicList = newMusicList
    },
    // 修改播放歌曲的索引
    UPDATEPLAYINDEX(state, newIndex) {
        state.playIndex = newIndex
    },
    // 修改歌曲当前时间currentTime
    UPDATECURRENTTIME(state, newCurrentTime) {
        state.currentTime = newCurrentTime
    },
    // 修改歌曲总时长
    UPDATEDURATION(state,newDuration){
        state.duration = newDuration
    }
}
const actions = {

}
const getters = {
    musicList: (state) => state.musicList,
    playIndex: (state) => state.playIndex,
    isPlay: (state) => state.isPlay,
    currentTime: (state) => state.currentTime,
    duration: (state) => state.duration,
    songProgress: (state) => parseInt(state.currentTime / state.duration *100)
}


export default {
    state,
    mutations,
    actions,
    getters
}