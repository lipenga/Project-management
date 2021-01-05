// AddModal 网络域新增编辑的弹出层
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import config from '@/utils/config';
import { Form, Input, Modal, Select } from 'antd';
/** 
 * Preset 
 */
const { TextArea } = Input;
const { Option } = Select

const AddModal: React.FC<any> = ({ obj = {}, visibleS, onCancel, onSubmit, loading }) => {
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
        title={`添加标注`}
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
            name="id"
          >
            <Input hidden />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="标注描述"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入标注描述',
              },
            ]}
          >
            <TextArea placeholder="请输入标注描述" />
          </Form.Item>

          <Form.Item
            label="标注级别"
            {...config.modalFormItemLayout}
            name="grade"
            rules={[
              {
                required: true,
                message: '请选择标注级别',
              },
            ]}
          >
            <Select placeholder='请选择标注级别'>
              <Option value="Seriously">严重</Option>
              <Option value="General">一般</Option>
              <Option value="Effort" >警戒线</Option>
              <Option value="Complete">完成</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddModal