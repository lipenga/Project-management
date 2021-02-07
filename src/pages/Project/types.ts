// 类型定义

// 项目列表首页的数据
export type typeProjectTableListItem = {
  id: string;
  dataIndex: string;
  description: string;
  name: string,
  schedule: number,
  numbering: string,
  projectCategoryName: string,
  planStartTime: Date,
  planEndTime: Date,
  projectManagerName: string,
  projectState: string,

};

// 项目列表
export type ProjectCategoryTableItem = {
  key: number;  // 默认必填
  description: string;
  dataIndex: string;
  id: string;
};

// 新增项目类别
export type typeProjectCategory = {
  _id?: string,
  name: string,
  description?: string
}