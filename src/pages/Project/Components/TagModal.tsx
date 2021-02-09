import config from '@/utils/config';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

const TextArea = Input.TextArea;
const AddModal = ({ tag = {}, visible, onCancel, onSubmit, loading }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        ...tag,
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
    form.resetFields();
    // form.setFieldsValue({
    //   name: undefined,
    //   phone: undefined,
    //   catalogId: undefined,
    //   id: undefined,
    // });
  };

  return (
    <Modal
      visible={visible}
      title={`${tag.id ? '编辑人员' : '新增人员'}`}
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
          label="人员名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入人员名称',
            },
            {
              pattern: config.exp,
              message: '人员名称只能包含中文字母数字、下划线',
            },
            { max: 4, message: '人员名称不能超过10个字符' },
          ]}
        >
          <Input maxLength={4} placeholder="请输入人员名称" />
        </Form.Item>
        <Form.Item
          {...config.modalFormItemLayout}
          label="手机号"
          name="phone"
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: config.phone,
              message: '手机号格式有误！',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="customerId" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
