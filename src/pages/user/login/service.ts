// 不需要权限
import http from 'umi-request'

// 登录
const fakeAccountLogin = async (params: any) => {
  return http('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}


// 获取验证码
const getCode = async (params: any) => {
  return http.get(`/api/loging/getVerify?email=${params}`)
}

// 校验验证码
const validateCode = async (params: any) => {
  return http.post(`/api/loging/getVerify`, { data: params })
}

// 注册
const registing = async (params: any) => {
  return http.post(`/api/loging/register?code=${params.captcha}`, { data: params })
}


// 待清理
const getFakeCaptcha = async (mobile: string) => {
  return http(`/api/login/captcha?mobile=${mobile}`);
}


export {
  fakeAccountLogin, getCode, validateCode, registing,
  getFakeCaptcha,
}