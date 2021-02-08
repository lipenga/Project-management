// AddProject 
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import config from '@/utils/config';
import { Alert, Form, Input, Modal, Select, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const { RangePicker } = DatePicker;
/** 
 * Preset 
 */

const AddProject: React.FC<any> = (Props) => {
  const { objectModal = {}, visible, onCancel, onSubmit, loading } = Props
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
        if (objectModal.id) {
          data.id = objectModal.id
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
    if (visible) {
      form.setFieldsValue({
        ...objectModal,
      });
    }
  }, [visible]);


  /** 
   * componentsConfig 
   */

  //  禁选时间
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }


  /** 
   * render
   */
  return (
    <>
      <Modal
        visible={visible}
        title={!objectModal.id ? '添加项目' : '编辑项目'}
        onCancel={() => close()}
        confirmLoading={loading}
        afterClose={() => clear()}
        width={700}
        okText="提交"
        cancelText="取消"
        onOk={() => onOk()}
      >
        <Form form={form} layout="horizontal" name="networkForm">

          <Alert
            message="欢迎您使用本系统，新建一个项目吧。"
            type="info"
            showIcon
            style={{ marginBottom: 10 }}
          />


          <Form.Item
            {...config.modalFormItemLayout}
            noStyle
            name="id"
          >
            <Input hidden />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="项目编号"
            name="numbering"
            rules={[]}
          >
            <Input placeholder="请输入项目编号" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="项目类型"
            name="projectCategoryId"
            rules={[
              {
                required: true,
                message: '请选择项目类型',
              },
            ]}
          >
            <Select placeholder="请选择项目类型">
              {/* 鲜蘑菇类 */}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="计划起始时间"
            name="times"
            rules={[
              {
                required: true,
                message: '请选择计划起始时间',
              },
            ]}
          >
            <RangePicker
              disabledDate={disabledDate}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="项目经理"
            name="projectManagerId"
            rules={[
              {
                required: true,
                message: '请选择项目经理',
              },
            ]}
          >
            <Select placeholder="请选择项目经理">
              {/* 鲜蘑菇类 */}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="项目描述"
            name="description"
            rules={[]}
          >
            <TextArea placeholder="项目描述" />
          </Form.Item>

        </Form>

      </Modal>
    </>
  )
}

export default AddProject