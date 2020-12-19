import http from '@/utils/request'


const test = async () => {
  return http.get('/api/grole/getRoleList')
}

export {
  test
}