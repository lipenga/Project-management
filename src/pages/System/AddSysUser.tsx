// AddSysUser
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import config from '@/utils/config';
import { Alert, Form, Input, Modal, Select, DatePicker, Row, Col, Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { getGolabListRole } from './service';
import { useRequest } from 'ahooks';
import { getCode, validateCode as validateCodeMethod } from '../user/login/service';

const { RangePicker } = DatePicker;
/**
 * Preset
 */

const AddSysUser: React.FC<any> = (Props) => {
  const { objectModal = {}, visible, onCancel, onSubmit, loading } = Props;
  /**
   * state
   */
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);
  const [validateCodeStatus, setValidateCodeStatus] = useState('');

  /**
   * method
   */
  // on Form  submit
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

  // getGolabListRole
  const { run: useGloabRole, loading: Sloading } = useRequest(getGolabListRole, {
    manual: true,
    onSuccess: (res) => {
      setRoleList(res);
    },
  });

  // get validate Code
  const getMessageCode = async () => {
    let email = form.getFieldValue('email');
    if (!email) {
      message.error('请输入邮箱！');
      return;
    }
    let codeStatus = await getCode(email);
    message.info('验证码已经发送请注意查收!');
  };

  /**
   * effct
   */
  useEffect(() => {
    if (visible) {
      useGloabRole(0);
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
  };

  // 自定义的表单的验证器
  const validateCode = (Props, value) => {
    let email = form.getFieldValue('email');
    return new Promise((resolve, reject) => {
      setValidateCodeStatus('validating');
      validateCodeMethod({ email: email, code: value })
        .then((result) => {
          if (result.success) {
            setValidateCodeStatus('success');
            resolve(0);
          } else {
            setValidateCodeStatus('error');
            reject('验证码有误，请重新输入！');
          }
        })
        .catch((err) => {
          reject('验证码有误，请重新输入！');
        });
    });
  };

  /**
   * render
   */
  return (
    <>
      <Modal
        visible={visible}
        title={!objectModal._id ? '添加用户' : '编辑用户'}
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
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请选择姓名',
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="角色"
            name="rule"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select placeholder="请选择角色">
              {/* 鲜蘑菇类 */}
              {roleList.map((v) => (
                <Select.Option value={v._id}>{v.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            {...config.modalFormItemLayout}
            label="手机号码"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item {...config.modalFormItemLayout} label="描述" name="description" rules={[]}>
            <TextArea placeholder="请输入描述" />
          </Form.Item>

          <Form.Item
            labelCol={{ offset: 4 }}
            label="验证码"
            extra="我们必须确认您的身份是可以得到验证的！"
          >
            <Row gutter={8}>
              <Col span={13}>
                <Form.Item
                  name="captcha"
                  hasFeedback
                  validateStatus={validateCodeStatus}
                  控制是否验证通过的状态
                  rules={[
                    { required: true, message: '请输入验证码！' },
                    { validateTrigger: 'onChange', validator: validateCode },
                  ]}
                >
                  <Input placeholder="请输入验证码" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Button type="primary" onClick={getMessageCode}>
                  获取验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSysUser;
