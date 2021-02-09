// AddProject
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import config from '@/utils/config';
import { Alert, Form, Input, Modal, Select, DatePicker, Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useRequest } from 'ahooks';
import { getProjectCategoryMapList, getUserList } from './service';
import { message } from 'antd';

const { RangePicker } = DatePicker;
/**
 * Preset
 */

const AddProject: React.FC<any> = (Props) => {
  const { objectModal = {}, visible, onCancel, onSubmit, loading } = Props;
  /**
   * state
   */
  const [form] = Form.useForm();
  const [initValueData, setInitValue] = useState({
    UserList: [],
    ProjectList: [],
    loading: true,
  });

  /**
   * method
   */
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { ...values };
        if (objectModal._id) {
          data._id = objectModal._id;
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

  const initValue = async () => {
    // 获取项目分类列表,获取人员项目
    let res = await getUserList();
    let res1 = await getProjectCategoryMapList();

    setInitValue({
      UserList: res,
      ProjectList: res1,
      loading: false,
    });
  };

  /**
   * effct
   */
  useEffect(() => {

    if (visible) {
      initValue();

      form.setFieldsValue({
        ...objectModal,
        times: [
          objectModal.planStartTime ? moment(objectModal.planStartTime) : undefined,
          objectModal.planEndTime ? moment(objectModal.planEndTime) : undefined,
        ],
      });
    }
  }, [visible]);

  /**
   * componentsConfig
   */

  //  禁选时间
  const disabledDate = (current: any) => {
    return current && current < moment().endOf('day');
  };

  /**
   * render
   */
  return (
    <>
      <Modal
        visible={visible}
        title={!objectModal._id ? '添加项目' : '编辑项目'}
        onCancel={() => close()}
        confirmLoading={loading}
        afterClose={() => clear()}
        width={700}
        okText="提交"
        cancelText="取消"
        onOk={() => onOk()}
      >
        <Card loading={initValueData.loading} bordered={false}>
          <Form form={form} layout="horizontal" name="networkForm">
            <Alert
              message="欢迎您使用本系统，新建一个项目吧。"
              type="info"
              showIcon
              style={{ marginBottom: 10 }}
            />

            <Form.Item {...config.modalFormItemLayout} noStyle name="planStartTime">
              <Input hidden />
            </Form.Item>

            <Form.Item {...config.modalFormItemLayout} noStyle name="planEndTime">
              <Input hidden />
            </Form.Item>

            <Form.Item {...config.modalFormItemLayout} noStyle name="_id">
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

            <Form.Item {...config.modalFormItemLayout} label="项目编号" name="numbering" rules={[]}>
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
              <Select mode="multiple" placeholder="请选择项目类型">
                {initValueData.ProjectList?.map((v) => {
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
                onChange={(res) => {
                  console.log('res', res);
                  form.setFieldsValue({
                    planStartTime: moment(res[0]).format('x'),
                    planEndTime: moment(res[1]).format('x'),
                  });
                }}
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
              label="项目描述"
              name="projectIntroduction"
              rules={[]}
            >
              <TextArea placeholder="项目描述" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default AddProject;
