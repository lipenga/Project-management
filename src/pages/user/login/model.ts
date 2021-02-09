import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from './service';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
import { NorthIsLandObj } from '@/TypeConstant/stroge'

export function setAuthority(value: any) {

  // 登录之后设置权限
  const { access_token, user } = value
  const { rule = [] } = user
  let authority = rule?.rules

  localStorage.setItem('NorthIsLandObj', JSON.stringify({
    ...NorthIsLandObj,
    token: access_token || '',
    authority: authority
  }))

  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    console.log('error', error);
  }
  return authority;
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'View' | 'Edit' | 'Super';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = ''
      try {
        response = yield call(fakeAccountLogin, payload);
      } catch (error) {
        console.log('error', error);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response?.access_token) {
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params as { redirect: string };

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        message.error('登录错误')
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;