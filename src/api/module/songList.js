import requests from '../request'

// 获取歌单详情页的数据
export const reqGetSongListInfo = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' })

// 获取歌单的所有歌曲
export const reqGetMusicList = (data) => requests({url:`/playlist/track/all?id=${data.id}&limit=${data.trackCount}&offset=1`,method:'get'})