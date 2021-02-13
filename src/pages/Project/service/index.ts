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
const getUserList = async () => {
  return http.get('/api/auth/useList');
};

// 获取项目分类列表
const getProjectCategoryMapList = async () => {
  return http.get('/api/proJectM/queryListProjectCategory');
};

// 获取项目状态table list统计
const getTatoalTableListforProject = async () => {
  return http.get('/api/projectM/getTotalforProjectType')
}


/**
 * 项目内人员列表
 */
// 获取项目组
const getAll = async () => {
  return http.get(`/api/projectM/getPorjectGroup`);
}

// 新增项目组
const saveCatalog = async (params) => {
  return http.post('/api/projectM/createPorjectGroup', { data: params });
}

// 编辑项目组
const editeProjectGroup = async (params) => {
  return http.put(`/api/projectM/editePorjectGroup?_id=${params._id}`, { data: params });
}

// 删除项目组
const delCatalog = async (params) => {
  return http.delete(`/api/projectM/deletePorjectGroup?idList=${params.join(',')}`);
}


// 新增项目内角色
const saveTag = async (params) => {
  return http.post(`/api/projectM/createProjectRoles`, { data: params });
}

// 编辑项目内角色
const editProjectGroupRole = async (params) => {
  return http.put(`/api/projectM/editeProjectRoles?_id=${params._id}`, { data: params });
}

// 删除项目内角色
const delTag = async (params) => {
  return http.delete(`/api/projectM/deleteProjectRoles?idList=${params.join(',')}`);
}

// 获取项目内角色
const tagPage = async (params) => {
  return http.get(`/api/projectM/getProjectRolesList?${qs.stringify(params)}`);
}


export {
  delCatalog, editeProjectGroup, saveCatalog, getAll,
  tagPage, delTag, editProjectGroupRole, saveTag,
  getTatoalTableListforProject,
  createProject, editeProject, getProjectList, deleteProject, getUserList, getProjectCategoryMapList,
  getLable, deleteLable, createGrade,
  createProjectCategory, editeProjectCategory, getProjectCategoryList, deleteProjectCategory
}
