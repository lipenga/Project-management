import { Request, Response } from 'express';
import * as Mockjs from 'mockjs'
const random = Mockjs.Random
// 基础数据
const base = {
  code: 200,
  success: true
}

const getLable = (req: Request, res: Response) => {
  res.send(
    Mockjs.mock(
      {
        "success": true,
        "code": "C000000",
        "codeMessage": "请求成功",
        "data": {
          "total": 4,
          "current": 1,
          "pageSize": 5,
          "totalPage": 1,
          "data|8": [
            {
              "id|+1": 8,
              "grade": "Seriously",
              "description": '描述阿萨德阿萨阿萨啊sad撒大声地 是傻屌傻屌是  三大是撒是是 但是的是的撒 但是三大啊是的'
            }
          ]
        }
      }
    )
  )
};

const deleteLable = (req: Request, res: Response) => {
  res.send(
    Mockjs.mock(
      {
        "success": true,
        "code": "C000000",
        "codeMessage": "请求成功",
        "data": {
          'message': '删除成功！'
        }
      }
    )
  )
};
const createGrade = (req: Request, res: Response) => {
  res.send(
    Mockjs.mock(
      {
        "success": true,
        "code": "C000000",
        "codeMessage": "请求成功",
        "data": {
          'message': '创建成功！'
        }
      }
    )
  )
};

export default {
  'GET /mock/label': getLable,
  'GET /mock/deleteLable': deleteLable,
  'GET /mock/createGrade': createGrade,
};
