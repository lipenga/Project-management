import http from '@/utils/request';
import qs from 'qs';

/**
 * 全局的成员管理
 */
// 新增全局成员
const createUse = async (parmas: any) => {
  return http.post(`/api/loging/register`, { data: parmas });
};

// 查询全局成员
const getUseAll = async (parmas: any) => {
  return http.get(`/api/loging/getUseList?${qs.stringify(parmas)}`);
};

// 编辑全局成员
const editUser = async (parmas: any) => {
  return http.post(`/api/edit?_id=${parmas._id}`, { data: parmas });
};

// 删除全局成员
const deleteUser = async (parmas: any) => {
  return http.delete(`/api/deleteUserModal?idList=${parmas.join(',')}`);
};

// 角色相关
// 获取全局的角色列表
const getGolabListRole = async (parmas: any) => {
  return http.get(`/api/grole/querySysRoleList`);
};

/**
 * 全局的角色管理
 */

//  创建角色
const createRole = async (parmas: any) => {
  return http.post(`/api/grole/creaetRoule`, { data: parmas });
};

// 查询角色
const queryRolePage = async (parmas: any) => {
  return http.get(`/api/grole/getRoleList?${qs.stringify(parmas)}`);
};

// 删除角色
const deleteRole = async (parmas: any) => {
  return http.delete(`/api/grole/deleteRole?idList=${parmas.join(',')}`);
};

// 编辑角色
const editRole = async (parmas: any) => {
  return http.put(`/api/grole/editRole?_id=${parmas._id}`, { data: parmas });
};

export {
  createUse,
  getUseAll,
  editUser,
  deleteUser,
  getGolabListRole,
  createRole,
  queryRolePage,
  deleteRole,
  editRole,
};
