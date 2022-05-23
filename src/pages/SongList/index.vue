<template>
    <div>
        <SongListInfo :playList="state.playList"/>
        <SongListNav :playList="state.playList"/>
        <MusicList :playList="state.playList" :musicList="state.musicList"/>
    </div>
</template>

<script>
import {reactive,onMounted} from 'vue'
import{useRoute} from 'vue-router'
import API from '../../api'
import SongListInfo from '../../components/SongList/SongListInfo.vue'
import SongListNav from '../../components/SongList/SongListNav.vue'
import MusicList from '../../components/SongList/MusicList.vue'
export default {
    name: 'SongList',
    components:{
        SongListInfo,
        SongListNav,
        MusicList
    },
    setup(){
        const state = reactive({
            playList:{},
            musicList:[]
        })
        // 获取歌单详情页的数据
        async function getSongListInfo(){
            let id = useRoute().query.id
            let result = await API.songlist.reqGetSongListInfo(id)
            if(result.code == 200){
                state.playList = result.playlist
                sessionStorage.setItem('songListInfo',JSON.stringify(state))
            }
        }
        // 获取歌单的所有歌曲信息
        async function getMusicList(){
            let id = useRoute().query.id
            const trackCount = {...state.playlist}
            const data = {id,trackCount}
            let result = await API.songlist.reqGetMusicList(data)
            if (result.code == 200){
                state.musicList = result.songs
            }
        }
        onMounted(()=>{
          getSongListInfo()   //获取歌单信息
          getMusicList()    //获取歌单的所有歌曲
        })
        return {
            state
        }
    }
};
</script>
