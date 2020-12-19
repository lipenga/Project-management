import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);


/**
* 递归路由查询其下的表单
* @param {Array} arr 你要搜索的数组
* @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
* @param {String} children 子数组的key
*/
export const deepFind = (arr: any, condition: any, children: any) => {
  // 即将返回的数组
  let main = []
  // 用try方案方便直接中止所有递归的程序
  try {
    // 开始轮询
    (function poll(arr, level) {
      // 如果传入非数组
      if (!Array.isArray(arr)) return
      // 遍历数组
      for (let i = 0; i < arr.length; i++) {
        // 获取当前项
        const item = arr[i]
        // 先占位预设值
        main[level] = item
        // 检验是否已经找到了
        const isFind = condition && condition(item, i, level) || false
        // 如果已经找到了
        if (isFind) {
          // 直接抛出错误中断所有轮询
          throw Error
          // 如果存在children，那么深入递归
        } else if (children && item[children] && item[children].length) {
          poll(item[children], level + 1)
          // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
        } else if (i === arr.length - 1) {
          // 删除占位预设值
          main.length = main.length - 1
        }
      }
    })(arr, 0)
    // 使用try/catch是为了中止所有轮询中的任务
  } catch (err) { }
  // 返回最终数组
  return main[main.length - 1]
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


