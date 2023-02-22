import qs from 'qs'
import router from './router/idnex';
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
} from '@/utils/cache'


import wechatAuth from '@/plugins/wechatAuth'
// 设置APPID
//wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)
wechatAuth.setAppId('wx9d555f7ac9a5e73a')

const whiteList = ['/404']
router.beforeEach(async (to, from, next) => {
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
                const code = wechatAuth.code
                console.log(wechatAuth.authUrl)

                if (code) {
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

                wechatAuth.returnFromWechat(window.location.href)
                const code = wechatAuth.code
                if (code) {
                    saveLoginStatus('2')
                    next()
                } else {
                    reset()
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
        let url = 'http://1111.51lookup.top/auth.html'
        return `${url}?backUrl=${window.location.href}`
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
