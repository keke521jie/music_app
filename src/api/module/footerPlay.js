import requests from "../request"

// 获取最新推荐音乐列表
export const reqGetNewMusicList = () => requests({ url: '/personalized/newsong', method: 'get' })

// 获取歌词
export const reqGetMusicLyric = (data) => requests({ url: `/lyric?id=${data}`, method: 'get' })

// 获取歌曲评论
export const reqSongCommentary = (data) => requests({ url: `/comment/music?id=${data.id}&limit=${data.limit}`, method: 'get' })