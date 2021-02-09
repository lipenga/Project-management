import http from '@/utils/request';
import qs from 'querystring';
import { typeProjectCategory } from '../types';
/**
 * 项目标注
 */
// 获取指定项目的项目标注
const getLable = async (parmas: any) => {
  return http.get(`/api/proJectM/getRoleList?${qs.stringify(parmas)}`);
};

// 删除项目的标注
const deleteLable = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteRole?idList=${parmas}`);
};

// 创建标注
const createGrade = async (parmas: any) => {
  return http.post('/api/proJectM/creaetRoule', { data: parmas });
};

/**
 * 项目类别
 */
//  新增类别
const createProjectCategory = async (parmas: typeProjectCategory) => {
  return http.post(`/api/proJectM/createProjectCategory`, { data: parmas });
};

//  修改类别
const editeProjectCategory = async (parmas: typeProjectCategory) => {
  return http.put(`/api/proJectM/editeProjectCategory?_id=${parmas._id}`, { data: parmas });
};

//  查询类别
const getProjectCategoryList = async (parmas: any) => {
  return http.get(`/api/proJectM/getProjectCategoryList?${qs.stringify(parmas)}`);
};

//  删除类别
const deleteProjectCategory = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteProjectCategory?idList=${parmas.join(',')} `);
};

/**
 * 项目列表
 */
//  新增项目基础信息
const createProject = async (parmas: typeProjectCategory) => {
  return http.post(`/api/proJectM/createProject`, { data: parmas });
};

//  修改项目基础信息
const editeProject = async (parmas: any) => {
  return http.put(`/api/proJectM/editeProject?_id=${parmas._id}`, { data: parmas });
};

//  查询项目列表
const getProjectList = async (parmas: any) => {
  return http.get(`/api/proJectM/getProjectList?${qs.stringify(parmas)}`);
};

//  删除项目
const deleteProject = async (parmas: any) => {
  return http.delete(`/api/proJectM/deleteProject?idList=${parmas.join(',')} `);
};

// 获取人员列表
const getUserList = () => {
  return http.get('/api/auth/useList');
};

// 获取项目分类列表
const getProjectCategoryMapList = () => {
  return http.get('/api/proJectM/queryListProjectCategory');
};

/**
 * 项目内人员列表
 */
// 获取所有项目内人员
export async function getAll() {
  return http.get('/api/csi-auth-provider/customer/list');
}

// 新增客户
export async function saveCatalog(params) {
  return http('/api/csi-auth-provider/customer/saveOrUpdate', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// 删除客户
export async function delCatalog(id) {
  return http(`/api/csi-auth-provider/customer/delete?id=${id}`, {
    method: 'DELETE',
  });
}

// 删除人员  等待对接
export async function delTag(id) {
  return http(`/api/csi-auth-provider/customerUser/delete?id=${id}`, {
    method: 'DELETE',
  });
}

// 新增/编辑人员 等待对接
export async function saveTag(params) {
  return http('/api/csi-auth-provider/customerUser/saveOrUpdate', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// 获取客户下的人员列表 等待对接
export async function tagPage(params) {
  return http(`/api/csi-auth-provider/customerUser/page?${qs.stringify(params)}`);
}

// /**
//  * 项目列表
//  */
// //  新增项目基础信息
// const createProject = async (parmas: typeProjectCategory) => {
//   return http.post(`/api/proJectM/createProject`, { data: parmas })
// }

// //  修改项目基础信息
// const editeProject = async (parmas: any) => {
//   return http.put(`/api/proJectM/editeProject?_id=${parmas._id}`, { data: parmas })
// }

// //  查询项目列表
// const getProjectList = async (parmas: any) => {
//   return http.get(`/api/proJectM/getProjectList?${qs.stringify(parmas)}`)
// }

// //  删除项目
// const deleteProject = async (parmas: any) => {
//   return http.delete(`/api/proJectM/deleteProject?idList=${parmas.join(',')} `)
// }

// // 获取人员列表
// const getUserList = () => {
//   return http.get('/api/auth/useList')
// }

// // 获取项目分类列表
// const getProjectCategoryMapList = () => {
//   return http.get('/api/proJectM/queryListProjectCategory')
// }


// /**
//  * 项目内人员列表
//  */
// // 获取所有项目内人员
// export async function getAll() {
//   return http.get('/api/csi-auth-provider/customer/list');
// }

// // 新增客户
// export async function saveCatalog(params) {
//   return http('/api/csi-auth-provider/customer/saveOrUpdate', {
//     method: 'POST',
//     body: JSON.stringify(params),
//   });
// }

// // 删除客户
// export async function delCatalog(id) {
//   return http(`/api/csi-auth-provider/customer/delete?id=${id}`, {
//     method: 'DELETE',
//   });
// }

// // 删除人员  等待对接
// export async function delTag(id) {
//   return http(`/api/csi-auth-provider/customerUser/delete?id=${id}`, {
//     method: 'DELETE',
//   });
// }

// // 新增/编辑人员 等待对接
// export async function saveTag(params) {
//   return http('/api/csi-auth-provider/customerUser/saveOrUpdate', {
//     method: 'POST',
//     body: JSON.stringify(params),
//   });
// }

// // 获取客户下的人员列表 等待对接
// export async function tagPage(params) {
//   return http(`/api/csi-auth-provider/customerUser/page?${qs.stringify(params)}`);
// }



export {

  createProject, editeProject, getProjectList, deleteProject, getUserList, getProjectCategoryMapList,
  getLable, deleteLable, createGrade,
  createProjectCategory, editeProjectCategory, getProjectCategoryList, deleteProjectCategory
}
