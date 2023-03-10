const qs = require('qs')
// 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
const SCOPES = ['snsapi_base', 'snsapi_userinfo']
interface parsedUrlType {
  code:string,
  state:string
}
class VueWechatAuthPlugin {
  private appid:string | null
  private scope:string
  private _code:string | null
  private _redirect_uri:string | null
  constructor() {
    this.appid = null
    this.redirect_uri = ''
    this.scope = SCOPES[1]
    this._code = null
    this._redirect_uri = null
    this.state = ''
  }

  static makeState() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    )
  }
  setAppId(appid:string) {
    this.appid = appid
  }
  set redirect_uri(redirect_uri:string) {
    this._redirect_uri = encodeURIComponent(redirect_uri)
  }
  get redirect_uri():string {
    return this._redirect_uri as string
  }
  get state() {
    return localStorage.getItem('wechat_auth:state') as string
  }
  set state(state:string) {
    localStorage.setItem('wechat_auth:state', state)
  }
  get authUrl() {
    if (this.appid === null) {
      throw new Error('appid must not be null')
    }
    if (this.redirect_uri === null) {
      throw new Error('redirect uri must not be null')
    }
    this.state = VueWechatAuthPlugin.makeState()
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`
  }
  returnFromWechat(redirect_uri:any) {
    
    let baseWithSearch = redirect_uri.split('#')[0]
    let parsedUrl:parsedUrlType = {
      code:'',
      state:''
    }
    // 本地环境
    if (process.env.NODE_ENV === 'development') {
      parsedUrl = qs.parse(redirect_uri.split('?')[1]) as parsedUrlType
      this.state = ''
      this._code = parsedUrl.code
    } else {
      parsedUrl = qs.parse(baseWithSearch.split('?')[1])
      if (this.state === null || !this.state) {
        throw new Error("You did't set state")
      }
      if (parsedUrl.state === this.state) {
        this.state = ''
        this._code = parsedUrl.code
      } else {
        this.state = ''
        throw new Error(`Wrong state: ${parsedUrl.state}`)
      }
    }
  }
  get code() {
    if (this._code === null) {
      throw new Error('Not get the code from wechat server!')
    }
    const code = this._code
    this._code = null
    // console.log('code: ' + code)
    return code
  }
}
const vueWechatAuthPlugin = new VueWechatAuthPlugin()

export default vueWechatAuthPlugin
