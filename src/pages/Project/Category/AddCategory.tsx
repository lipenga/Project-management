// AddCategory
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
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
        const data = { ...values }
        if (obj.id) {
          data.id = obj.id
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
        title={!obj.id ? '添加类别' : '编辑类别'}
        onCancel={() => close()}
        confirmLoading={loading}
        afterClose={() => clear()}
        width={700}
        okText="提交"
        cancelText="取消"
        onOk={() => onOk()}
      >
        <Form form={form} layout="horizontal" name="networkForm">
          <Form.Item
            {...config.modalFormItemLayout}
            noStyle
            name="_id"
          >
            <Input hidden />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入类别名称',
              },
            ]}
          >
            <Input placeholder="请输入类别名称" />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="类别描述"
            name="description">
            <TextArea placeholder="请输入类别描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddCategory