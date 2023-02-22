import Axios from '@/utiles/serve'
import { HttpResponse } from '@/@type/HttpResponse'
import qs from 'qs'

//封装User类型的接口方法
export class UserService {
  /**
   * @description 查询User的信息
   * @param {number} teamId - 所要查询的团队ID
   * @return {HttpResponse} result
   */
  static async surveyor(params:any) {
    return Axios('/admin/login/surveyor', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  static async matter(params:any) {
    return Axios('/admin/login/matter', {
      method: 'post',
      responseType: 'json',
      params: {
        ...params
      },
    })
  }
  static async limits(params:any) {
    return Axios('/admin/login/limits', {
      method: 'post',
      responseType: 'json',
      data: params,
      headers:{'Content-Type':'multipart/form-data'}
    })
  }
  
  static async addkcinfo(params:any) {
    return Axios('/admin/login/addkcinfo', {
      method: 'post',
      responseType: 'json',
      
      data: params,
    })
  }
  
  static async getweChat(params:any) {
    return Axios('/admin/login/getweChat', {
      method: 'get',
      responseType: 'json',
      
      data: params,
    })
  }
  static async weChatLogin(params:any) {
    return Axios('/admin/login/weChatLogin', {
      method: 'get',
      responseType: 'json',
      
      params: params,
    })
  }

  static async upload(params:any) {
    return Axios('/admin/login/upload', {
      method: 'post',
      responseType: 'json',
      
      data: params,
    })
  }
  static async adduser(params:any) {
    return Axios('/admin/login/adduser', {
      method: 'post',
      responseType: 'json',
      
      data: params,
    })
  }
  
  static async register(params:any) {
    return Axios('/admin/login/register', {
      method: 'post',
      responseType: 'json',
      
      data: params,
    })
  }  
  static async addimages(params:any) {
    return Axios('/admin/login/addimages', {
      method: 'post',
      responseType: 'json',
      
      data: params,
    })
  } 

}