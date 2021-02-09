import http from '@/utils/request'
import qs from 'querystring'
import { typeProjectCategory } from '../../System/types'
/**
 * 项目标注
 */
// 获取指定项目的项目标注
// const getLable = async (parmas: any) => {
//   return http.get(`/api/proJectM/getRoleList?${qs.stringify(parmas)}`)
// }
const getLable = async (parmas: any) => {
  return http.get(`/api/task-m/getTaskList?${qs.stringify(parmas)}`)
}
const TaskCreat = async (parmas: any) => {
  return http.post('/api/task-m/createTask', { data: parmas })
}

// 删除项目的标注
const deleteLable = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteRole?idList=${parmas}`)
}

// 创建标注
const createGrade = async (parmas: any) => {
  return http.post('/api/proJectM/creaetRoule', { data: parmas })
}

/**
 * 项目类别
 */
//  新增类别
const createProjectCategory = async (parmas: typeProjectCategory) => {
  return http.post(`/api/proJectM/createProjectCategory`, { data: parmas })
}

//  修改类别
const editeProjectCategory = async (parmas: typeProjectCategory) => {
  return http.put(`/api/proJectM/editeProjectCategory?_id=${parmas._id}`, { data: parmas })
}

//  查询类别
const getProjectCategoryList = async (parmas: any) => {
  return http.get(`/api/proJectM/getProjectCategoryList?${qs.stringify(parmas)}`)
}

//  删除类别
const deleteProjectCategory = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteProjectCategory?idList=${parmas.join(',')} `)
}

export {
  getLable, TaskCreat, deleteLable, createGrade,
  createProjectCategory, editeProjectCategory, getProjectCategoryList, deleteProjectCategory
}