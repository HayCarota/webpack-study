// console.log('实现轮播图的业务逻辑');
// console.log('实现tabs标签页的逻辑')

import './banner.js'
import './tabs.js'
import './assets/fonts/iconfont.css'
import './styles/index.css'
import './styles/index.less'
import imgUrl from './assets/images/12.png'

const theImg = document.createElement('img')
theImg.src = imgUrl
document.body.appendChild(theImg)

class App {
    static a = 123
}

console.log(App.a);