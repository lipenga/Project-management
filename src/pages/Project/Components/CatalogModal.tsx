import config from '@/utils/config';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
const AddModal = ({ catalog = {}, visible, onCancel, onSubmit, loading }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        ...catalog,
      });
    }
  }, [visible]);
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const close = () => {
    clear();
    onCancel();
  };
  const clear = () => {
    // form.setFieldsValue({
    //   name: undefined,
    //   id: '',
    // });
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title={`${catalog._id ? '编辑项目组' : '新增项目组'}`}
      onCancel={() => close()}
      confirmLoading={loading}
      afterClose={() => clear()}
      width={700}
      okText="提交"
      cancelText="取消"
      onOk={() => onOk()}
    >
      <Form form={form} layout="horizontal" name="deptForm">
        <Form.Item
          {...config.modalFormItemLayout}
          label="项目组名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入项目组名称',
            },
            {
              pattern: config?.exp1,
              message: '项目组名称只能包含中文字母数字、下划线',
            },
            { max: 15, message: '项目组名称不能超过15个字符' },
          ]}
        >
          <Input placeholder="请输入客户名称" />
        </Form.Item>

        <Form.Item
          {...config.modalFormItemLayout}
          label="组描述"
          name="descriptin"
          rules={[
            {
              required: true,
              message: '请输入组描述',
            },
          ]}
        >
          <Input.TextArea placeholder="请输入组描述" />
        </Form.Item>

        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
