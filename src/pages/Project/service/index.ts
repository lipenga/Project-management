import http from '@/utils/request'
import qs from 'querystring'

// 获取指定项目的项目标注
const getLable = async (parmas: any) => {
  return http.get(`/api/proJectM/getRoleList?${qs.stringify(parmas)}`)
}

// 删除项目的标注
const deleteLable = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteRole?idList=${parmas}`)
}

// 创建标注
const createGrade = async (parmas: any) => {
  return http.post('/api/proJectM/creaetRoule', { data: parmas })
}


export { getLable, deleteLable, createGrade }