import React from 'react';
import { CURRENT } from './renderAuthorize';
// eslint-disable-next-line import/no-cycle
import PromiseRender from './PromiseRender';
import { deepFind } from '@/utils/utils.ts'
import { history, } from 'umi';
import { NorthIsLandObj } from '@/TypeConstant/stroge'

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: string | string[]) => IAuthorityType);

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority  // 权限判定是否进行权限判定
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K,
): T | K | React.ReactNode => {

  // 初始化本地持久数据存储
  if (!JSON.parse(localStorage.getItem('NorthIsLandObj') || 'false')) {
    localStorage.setItem('NorthIsLandObj', JSON.stringify(NorthIsLandObj))
  }

  /**
 * 场景判断
 * 1. token没有时，也没有登录时，authority是undefined 
 *  authority = undefined， &&，  currentAuthority = []  方案2 
 * 
 * 2. 用户登录了，正常的操作 token 有值。authority真诚  
 * authority = undefined，currentAuthority 是当前登录的角色权限数组 target正常  Exception = null  
 * 注意，您必须把默认的页面的权限都开放出去否则会引起bug，这个/默认页应该是所有类型的用户都可以浏览的，这应该作为一种设计理念
 * 
 * 3. 用户登录了，但是不是它所具有的访问权限
 *  解决方案：方案1
 * 
 * 解决方案 要么跳转回 默认页面 ，要么跳转去登录页
 */


  let CrunterRouters = JSON.parse(window.localStorage.getItem('NorthIsLandObj') || '[]')

  if (!CrunterRouters.token || CrunterRouters.token == '') {
    history.push('/user/login',)
    return <> </>
  }

  // if (!deepFind(CrunterRouters, (v) => v.path == history.location?.pathname, 'children')) {
  //   history.push('/',)
  //   return target
  // }

  // Retirement authority, return target; 正常走流程
  if (!authority) {
    return target;
  }

  // 数组处理
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />;
  }
  // Function 处理
  if (typeof authority === 'function') {
    const bool = authority(currentAuthority);
    // 函数执行后返回值是 Promise
    if (bool instanceof Promise) {
      return <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />;
    }
    if (bool) {
      return target;
    }
    return Exception;
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

function check<T, K>(authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
  return checkPermissions<T, K>(authority, CURRENT, target, Exception);
}

export default check;
