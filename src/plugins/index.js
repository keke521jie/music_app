import { Swipe, SwipeItem, Popup, Progress } from 'vant';
let plugins = [Swipe, SwipeItem, Popup,Progress]
export default function getVant(app) {
    plugins.forEach(item => {
        return app.use(item)
    })
}