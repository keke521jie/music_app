import requests from "../request";

// 搜索的接口
export const reqSearch = (data) => requests({ url: `/cloudsearch?keywords=${data}`, method: 'get' })