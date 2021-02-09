// AddCategory
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import config from '@/utils/config';
import { Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
/**
 * Preset
 */

const AddCategory: React.FC<any> = ({ obj = {}, visibleS, onCancel, onSubmit, loading }) => {
  /**
   * state
   */
  const [form] = Form.useForm();

  /**
   * method
   */
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { ...values };
        if (obj.id) {
          data.id = obj.id;
        }
        onSubmit({ ...data });
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

  /**
   * effct
   */
  useEffect(() => {
    if (visibleS) {
      form.setFieldsValue({
        ...obj,
      });
    }
  }, [visibleS]);

  /**
   * componentsConfig
   */

  /**
   * render
   */
  return (
    <>
      <Modal
        visible={visibleS}
        title={!obj.id ? '添加角色' : '编辑角色'}
        onCancel={() => close()}
        confirmLoading={loading}
        afterClose={() => clear()}
        width={700}
        okText="提交"
        cancelText="取消"
        onOk={() => onOk()}
      >
        <Form form={form} layout="horizontal" name="networkForm">
          <Form.Item {...config.modalFormItemLayout} noStyle name="_id">
            <Input hidden />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入角色名称',
              },
            ]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          {/* 全局视图 */}
          <Form.Item
            {...config.modalFormItemLayout}
            label="权限"
            name="rules"
            rules={[
              {
                required: true,
                message: '请选择角色权限',
              },
            ]}
          >
            <Select mode="multiple" placeholder="请选择权限">
              <Select.Option value="View">查看</Select.Option>
              <Select.Option value="Edit">编辑</Select.Option>
              <Select.Option value="Super">超级管理员</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...config.modalFormItemLayout} label="角色描述" name="descripition">
            <TextArea placeholder="请输入角色描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategory;
