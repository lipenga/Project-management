import config from '@/utils/config';
import { Card, Select } from 'antd';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getUserList } from '../service';

const AddModal = ({ tag = {}, visible, onCancel, onSubmit, loading }) => {

  const [form] = Form.useForm();
  const [initValueData, setInitValue] = useState({
    UserList: [],
    loading: true,
  });


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
  };

  const initValue = async () => {
    // 获取项目分类列表,获取人员项目
    let res = await getUserList();

    setInitValue({
      UserList: res,
      loading: false,
    });
  };


  useEffect(() => {
    initValue()
  }, [])

  return (
    <Modal
      visible={visible}
      title={`${tag._id ? '编辑人员' : '新增人员'}`}
      onCancel={() => close()}
      confirmLoading={loading}
      afterClose={() => clear()}
      width={700}
      okText="提交"
      cancelText="取消"
      onOk={() => onOk()}
    >
      <Card bordered={false} loading={initValueData.loading}>
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
                pattern: config.exp1,
                message: '人员名称只能包含中文字母数字、下划线',
              },
            ]}
          >
            <Input placeholder="请输入人员名称" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="角色下成员"
            name="emptyIds"
            rules={[
              {
                required: true,
                message: '请选择成员',
              },
            ]}
          >
            <Select placeholder="请选择成员">
              {initValueData.UserList?.map((v) => {
                return (
                  <Select.Option value={v._id} key={v._id}>
                    {v.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="角色描述"
            name="descriptin"
            rules={[
            ]}
          >
            <Input.TextArea placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item name="_id" noStyle>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item name="originGroupId" noStyle>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default AddModal;
