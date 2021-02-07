// 微前端的集成化 ，乾坤配置

// import React from 'react';
// import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { history } from 'umi';
// import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
// import { queryCurrent } from './services/user';
// import defaultSettings from '../config/defaultSettings';
// import config from '@/utils/config';

// export async function getInitialState(): Promise<{
//   currentUser?: any;
//   settings?: LayoutSettings;
//   privileges?: [any];
//   menu?: any;
// }> {
//   // 如果是登录页面，不执行
//   if (history.location.pathname !== '/user/login') {
//     try {
//       const response = await queryCurrent();
//       const privileges: any = [];
//       let firstMenu = undefined;
//       const tree = (data = []) => {
//         data.map((item: any) => {
//           const hasChild = item.children && item.children.length > 0;
//           if (item.type === 'MENU') {
//             privileges.push({
//               name: item.name,
//               code: item.href,
//             });
//             if (!firstMenu) {
//               firstMenu = item.href;
//             }
//           }
//           if (item.type === 'BUTTON') {
//             privileges.push({
//               name: item.name,
//               code: item.permissionKey,
//             });
//           }
//           if (hasChild) {
//             tree(item.children);
//           }
//         });
//       };
//       const menus = response.data.menus;

//       const myMenu =
//         menus.filter((i: any) => {
//           return i.serviceId === config.appId;
//         })[0] || {};
//       tree(myMenu.children);
//       //history.push(firstMenu || '/');
//       return {
//         currentUser: response.data,
//         privileges,
//         settings: defaultSettings,
//         menu: myMenu.children || [],
//       };
//     } catch (error) {
//       history.push('/user/login');
//     }
//   }
//   return {
//     settings: defaultSettings,
//   };
// }

// export const layout = ({
//   initialState,
// }: {
//   initialState: { settings?: LayoutSettings; currentUser?: any; menu?: any };
// }): BasicLayoutProps => {
//   const menuDataRender = (menuList: any = []) => {
//     return menuList
//       .filter((item: any) => item.type === 'MENU')
//       .map((item: any) => {
//         const hasChild = item.children && item.children.length > 0;
//         const localItem = {
//           id: item.id,
//           name: item.name,
//           path: item.href,
//           icon: item.icon,
//           children: hasChild ? menuDataRender(item.children) : [],
//         };
//         return localItem;
//       });
//   };
//   const { menu = [] } = initialState;

//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     footerRender: () => <Footer />,
//     breadcrumbRender: (route) => {
//       route?.map((r) => {
//         return {
//           ...r,
//           path: r.path = r.path.replace('/' + config.appId, ''),
//         };
//       });
//       return route;
//     },
//     onPageChange: () => {
//       // 如果没有登录，重定向到 login
//       const isLogin = localStorage.getItem('TCLOUD-AUTH-HEADER');
//       if (!isLogin && history.location.pathname !== '/user/login') {
//         history.push('/user/login');
//       }
//     },
//     menuDataRender: () => menuDataRender(menu),
//     menuHeaderRender: undefined,
//     formatMessage: undefined,
//     iconfontUrl: '/icons/font_icon.js',
//     ...initialState?.settings,
//   };
// };
