import qs from 'qs'
import router from './router/index';
import {
    saveToken,
    saveLoginStatus,
    saveUserInfo,
    removeToken,
    removeUserInfo,
    removeLoginStatus,
    loadLoginStatus,
    loadToken,
    loadUserInfo
} from '@/utiles/cache'
import {UserService} from '@/api/api'
import wechatAuth from '@/plugins/wechatAuth'
// 设置APPID
//wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)

const whiteList = ['/404']
router.beforeEach(async (to, from, next) => {
    let res = await UserService.getweChat({})
    wechatAuth.setAppId(res.data.data.appid)
    // 在白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
        return next()
    }

    const loginStatus = loadLoginStatus()
    switch (Number(loginStatus)) {
        case 0:
            // 获取跳转地址
            wechatAuth.redirect_uri = processUrl()
            saveLoginStatus('1')

            window.location.href = wechatAuth.authUrl
            break
        case 1:
            try {
                
                wechatAuth.returnFromWechat(window.location.href)
                const code = wechatAuth.code || qs.parse(window.location.href.split('?')[1]).code as string
                console.log(code,666)
                if (code) {
                    let formDate = new FormData()
                    formDate.append('code',code)
                    
                    let r = await UserService.weChatLogin({code:code})
                    localStorage.setItem('open_id',r.data.data.openid)
                    saveLoginStatus('2')
                    next()
                } else {
                    reset()
                }
                // 通过code换取token
                // hash
                // if (process.env.NODE_ENV !== 'development' && router.mode === 'hash') {
                //   window.location.href = window.location.origin + window.location.pathname + window.location.hash
                // } else {
                //   next()
                // }

            } catch (err) {

              //  wechatAuth.returnFromWechat(window.location.href)
               // const code = wechatAuth.code
               console.log(window.location.href.includes('code'),123,qs.parse(window.location.href.split('?')[1]).code as string)
                if (window.location.href.includes('code')) {
                    let formDate = new FormData()
                    formDate.append('code',qs.parse(window.location.href.split('?')[1]).code as string)
                    
                    let r = await UserService.weChatLogin({code:qs.parse(window.location.href.split('?')[1]).code as string})
                    localStorage.setItem('open_id',r.data.data.openid)
                    saveLoginStatus('2')
                    next()
                } else {
                    reset()
                    //next()
                }
            }
            break
        case 2:
            next()
            break
        default:
            break
    }
})
function reset() {
    saveLoginStatus('0')
    wechatAuth.redirect_uri = processUrl()
    window.location.href = wechatAuth.authUrl
}
/**
 * 处理url链接
 * @returns {string}
 */
function processUrl() {
    // 本地环境换通过auth.html拿code
    if (process.env.NODE_ENV === 'development') {
        // 中间授权页地址
        let url = 'http://ydcx.qianhaoqiche.com/auth.html'
        
        const urlParams = qs.parse(window.location.href.split('?')[1])
        let redirectUrl = window.location.href
        if (urlParams.code && urlParams.state) {
            delete urlParams.code
            delete urlParams.state
            const query = qs.stringify(urlParams)
            if (query.length) {
                redirectUrl = `${window.location.href.split('?')[0]}?${query}`
            } else {
                redirectUrl = `${window.location.href.split('?')[0]}`
            }
        }
        console.log(`${url}?backUrl=${redirectUrl}`)
        
        return `${url}?backUrl=${redirectUrl}`
    }
    const url = window.location.href
    // 解决多次登录url添加重复的code与state问题
    const urlParams = qs.parse(url.split('?')[1])
    let redirectUrl = url
    if (urlParams.code && urlParams.state) {
        delete urlParams.code
        delete urlParams.state
        const query = qs.stringify(urlParams)
        if (query.length) {
            redirectUrl = `${url.split('?')[0]}?${query}`
        } else {
            redirectUrl = `${url.split('?')[0]}`
        }
    }
    return redirectUrl
}
