export default {
  appId: '/',
  title: '',
  paginationDisplay: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
    pageSize: 5,
    current: 1,
    pageSizeOptions: [5, 10, 20, 50, 100],
  },
  modalFormItemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }, // 表单布局
  modalFormItemLayout2: {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    }
  }, // 表单布局
  modalFormItemLayout3: {
    labelCol: {
      span: 3
    },
    wrapperCol: {
      span: 21
    }
  }, // 表单布局
  modalFormItemLayout4: {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  }, // 表单布局
  exp1: /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/, //字母数字下划线中文
  exp2: /^[A-Za-z0-9_]+$/, //字母数字下划线
  exp3: /^[a-zA-Z][a-zA-Z0-9_]*$/,
  exp4: /^[0-9A-Za-z]+$/, //字母数字
  exp5: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, //字母数字汉字
  exp6: /^[0-9]*[1-9][0-9]*$/,//正整数
  phone: /^1[123456789]\d{9}$/, //手机号码
  //ip地址加子网验证 入192.168.10.1/24
  ipMaskExp: /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9]|0)\/([0-9]|[1-2][0-9]|3[0-2])$/,
  //IP地址验证
  ipExp: /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9]|0)$/,
  //dns验证
  isDns: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9])$/,
  //网关验证
  isGateway: /^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/,
  editColor: '#87d068',
  deleteColor: '#f50',
  otherColor: '#108ee9',
  disabledColor: '#BEBEBE',
  successColor: '#87d068',
  failColor: '#f50',
}
