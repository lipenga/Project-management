// AddProject 
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import config from '@/utils/config';
import { Alert, Form, Input, Modal, Select, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

// const { RangePicker } = DatePicker;
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
        title={'新增任务'}
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
            message="欢迎您使用本系统，新建一个任务吧！"
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
            label="任务名称"
            name="task_name"
            rules={[
              {
                required: true,
                message: '请输入任务名称',
              },
            ]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>


          <Form.Item
            {...config.modalFormItemLayout}
            label="优先级"
            name="task_level"
            rules={[
              {
                required: true,
                message: '请选择优先级',
              },
            ]}
          >
            <Select placeholder="请选择优先级">
              <Select.Option value="A">高</Select.Option>
              <Select.Option value="B">中</Select.Option>
              <Select.Option value="C">低</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="所属项目"
            name="task_of_project"
            rules={[
              {

                message: '请选择所属项目',
              },
            ]}
          >
            <Select placeholder="请选择所属项目">
              {/* 鲜蘑菇类 */}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="所属里程碑"
            name="task_mileage"
            rules={[
              {

                message: '请选择所属里程碑',
              },
            ]}
          >
            <Select placeholder="请选择所属里程碑">
              {/* 鲜蘑菇类 */}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="任务类型"
            name="task_type"
            rules={[
              {

                message: '请选择任务类型',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            {...config.modalFormItemLayout}
            label="描述"
            name="projectCategoryId"
            rules={[
              {
                required: true,
                message: '描述',
              },
            ]}
          >
            <TextArea placeholder='描述' />
          </Form.Item>
          {/* <Form.Item
            {...config.modalFormItemLayout}
            label="计划开始时间"
            name="plan_end_time"
            rules={[
              {

                message: '计划开始时间',
              },
            ]}
          >
            <DatePicker


            />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="计划结算时间"
            name="plan_end_time"
            rules={[
              {

                message: '请选择计划结束时间',
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}

            />
          </Form.Item> */}
          <Form.Item
            {...config.modalFormItemLayout}
            label="预计工时"
            name="task_budget_time"
            rules={[
              {
                required: true,
                message: '请选择预计工时',
              },
            ]}
          >
            <Input type='number' placeholder='工时预计' />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="负责人"
            name="task_responsible"
            rules={[
              {

                message: '请选择负责人',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="协助人"
            name="task_helper"
            rules={[
              {

                message: '请选择协助人',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="确认人"
            name="task_ok_name"
            rules={[
              {

                message: '确认人',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="状态"
            name="task_state"
            rules={[
              {

                message: '请选择状态',
              },
            ]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="A">完成</Select.Option>
              <Select.Option value="B">进行中</Select.Option>
              <Select.Option value="C">待进行</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...config.modalFormItemLayout}
            label="附件"
            name="file_id"
            rules={[
              {

                message: '请选择附件',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>

      </Modal >
    </>
  )
}

export default AddProject