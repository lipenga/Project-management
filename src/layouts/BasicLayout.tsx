/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, Dispatch, history, } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';


import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.png';
import { getMatchMenu } from '@umijs/route-utils'
import { NorthIsLandObj } from '@/TypeConstant/stroge'

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="您还未登录哦，先去登录吧！"
    extra={
      <Button type="primary">
        <Link to="/user/login">前往登录</Link>
      </Button>
    }
  />
);


export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */
// 检查权限  这个是重点！控制着左边菜单列表
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });


const defaultFooterDom = (
  <>
    <DefaultFooter
      copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  </>
);


const BasicLayout: React.FC<BasicLayoutProps> = (props) => {

  useEffect(() => {
    window.reloadAuthorized()
  }, [])
  const {
    dispatch,
    children,
    settings,  // layout的设置
    location = {  // 当前应用的位置
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {  // 当菜单折叠的时候 去获取权限 基本上没什么调用屌用
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  // 只要你的路径发生了变化就去验证你的权限 
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  /**
   *  详细见proLLyout react-intl 的 formatMessage 方法 (data: { id: any; defaultMessage?: string }) => string;  说白了中文化
   */
  const { formatMessage } = useIntl();

  return (
    <>
      <ProLayout
        logo={logo}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}

        onMenuHeaderClick={() => history.push('/')}

        menuItemRender={(menuItemProps, defaultDom) => {  // 子菜单的渲染方式辅助用
          // 查看是否跳转路由 代码的健壮性 
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}

        // breadcrumbRender={(routers = []) => [  // 面包屑
        //   {
        //     path: '/',
        //     breadcrumbName: formatMessage({
        //       id: 'menu.home',
        //     }),
        //   },
        //   ...routers,
        // ]}

        itemRender={(route, params, routes, paths) => {  // 面包屑的渲染函数
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
              <span>{route.breadcrumbName}</span>
            );
        }}

        // 底部 版权渲染器
        footerRender={() => defaultFooterDom}
        menuDataRender={(a,) => {
          return menuDataRender(a)
          // try {
          //   let data = menuDataRender(a,)
          //   // localStorage.setItem('NorthIsLandObj', JSON.stringify({ ...NorthIsLandObj, routerConfig: data }))
          //   return menuDataRender(a)
          // } catch (error) {
          //   console.log('error==>', error);
          //   return menuDataRender(a,)
          // }

        }}

        rightContentRender={() => <RightContent />}  // 个人中心操控制器

        postMenuData={(menuData) => {
          // 在显示内容页前对菜单数据进行查看，修改不会触发重新渲染，menuData菜单数据
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        {/* 页面基的权限控制器 */}
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>

      {/* <SettingDrawer // 主题和样式设置器
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      /> */}
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);


