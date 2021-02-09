import { Request, Response } from 'express';


const getProjectRlist = (req: Request, res: Response) => {
  res.json(
    {
      "success": true, "code": "C000000",
      "codeMessage": "请求成功",
      "data": [
        { "id": "bf698312e05b0f7d384b2cfe21536eaa", "name": "华融湘江银行", "creatTime": "2021-02-01T10:14:27.000+0800" }]
    }
  )
};

const getProjectRUser = (req: Request, res: Response) => {
  res.json(
    {
      "success": true, "code": "C000000",
      "codeMessage": "请求成功",
      "data": {
        "total": 2, "current": 1, "pageSize": 10, "totalPage": 1,
        "data": [
          { "id": "27942b210c74140b6ca2ce41c328eda2", "phone": "18374734505", "name": "蒋欢蒋欢", "customerId": "bf698312e05b0f7d384b2cfe21536eaa", "creatTime": "2021-02-02T11:17:55.000+0800" },
          { "id": "de5eced71c4964b627c673bc11ffa455", "phone": "18573339223", "name": "王亮", "customerId": "bf698312e05b0f7d384b2cfe21536eaa", "creatTime": "2021-02-01T10:15:06.000+0800" }],
        "extraData": null
      }
    }
  )
};

export default {
  'GET /mock/ProjectRlist': getProjectRlist,
  'GET /mock/ProjectRUser': getProjectRUser,
};
