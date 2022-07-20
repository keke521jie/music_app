import axios from "axios"
const requests = axios.create({
    baseURL: "http://localhost:3000", //基础路径，发请求的时候，路径中会出现api
    // baseURL: "http://152.136.253.106:3000/", //基础路径，发请求的时候，路径中会出现api
    timeout: 5000, //设置超时的时间为5s
    withCredentials: true
});

//设置请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事
requests.interceptors.request.use((config) => {
    return config // config：配置对象里headers（请求头）很重要
});
//响应拦截器
requests.interceptors.response.use((res) => {
    return res.data
        //成功的回调函数，服务器数据回来以后，响应拦截器可以检测到，做一些事情
}, (error => {
    return Promise.reject(new Error('faile'))
        //响应失败的回调函数
}))

export default requests