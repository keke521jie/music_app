import requests from '../request'


// 获取home轮播图数据
export const reqGetBannerInfo = () => requests({ url: '/banner?type=2', method: 'get' })

// 获取发现好歌单的轮播数据
export const reqGetFindSongListInfo = () => requests({ url: '/personalized?limit=10', method: 'get' })