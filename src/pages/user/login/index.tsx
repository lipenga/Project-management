import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect, history } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import LoginFrom from './components/Login';
import { useRequest } from 'ahooks'
import { registing } from './service'

const { Tab, UserName, Password, Mobile, Captcha, Submit, Email } = LoginFrom;

interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { submitting } = props;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');  // 登录还是注册

  const handleSubmit = (values: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        type,
      },
    });
  };

  // 进行注册
  const { run: useRegiste, loading: Reloading } = useRequest(registing, {
    manual: true,
    onSuccess: (res) => {
      message.success('注册成功！')
      history.push('/')
    }
  })

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={(a, b, c, d) => {
        console.log('a,b,c,d', a, b, c, d);
        if (a.email) {
          a.rule = '5fdda5dfbdef57391ca93070' // 硬编码
          useRegiste(a)
        } else {
          handleSubmit(a)
        }
      }
      }>
        <Tab key="account" tab="用户登录">
          <UserName
            name="username"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="用户注册">

          <UserName
            name="username"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <UserName
            name="phoneNumber"
            placeholder="手机号"
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
          />

          <Mobile
            name="email"
            placeholder="邮箱"
            rules={[
              {
                required: true,
                message: '邮箱',
              },
            ]}
          />

          <Captcha
            style={{ marginBottom: -50 }}
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Submit style={{ marginTop: -20 }} loading={submitting || Reloading}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
