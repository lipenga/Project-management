// System
import config from '@/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { Button, Card, Popconfirm } from 'antd';
import { Avatar, Space, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { registing } from '../user/login/service';
import AddSysUser from './AddSysUser';
import { deleteUser, editUser, getUseAll } from './service';

/**
 * Preset
 */
const { Search } = Input;

const System: React.FC<{}> = () => {
  /**
   * state
   */
  const actionRef = useRef();
  const [size, setSize] = useState<SizeType>('middle');
  const [sorter, setSorter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [useProps, setUserProps] = useState<any>({
    visible: false,
    objectModal: {},
  });

  /**
   * method
   */
  const onTableChange = (p, f, s) => {
    setSorter(s.field || '');
    setSortOrder(s.order || '');
  };

  const loadData = async (params) => {
    const response = await getUseAll(params);
    return {
      success: response.success,
      ...response.data,
    };
  };

  // 用户注册
  const { run: useRegisting, loading: ResLoading } = useRequest(registing, {
    manual: true,
    onSuccess: (res) => {
      message.success('注册成功');
      actionRef.current.reload();
      setUserProps({
        visible: false,
        objectModal: {},
      });
    },
  });

  // 删除人员
  const { run: useDelete, loading: Dloading } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current.reload();
    },
  });

  // 编辑人员
  const { run: useEditGuser, loading: ELoading } = useRequest(editUser, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      setUserProps({
        visible: false,
        objectModal: {},
      });
      actionRef.current.reload();
    },
  });

  /**
   * effct
   */

  /**
   * componentsConfig
   */
  // 新增成员按钮
  const NewProject: React.FC<any> = () => {
    return (
      <>
        <Button
          onClick={() => {
            setUserProps({ visible: true, objectModal: {} });
          }}
          type="primary"
          size={size}
        >
          <PlusOutlined />
          新增
        </Button>
      </>
    );
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      ellipsis: true,
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'rule',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 200,
      hideInSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '电话号码',
      dataIndex: 'phoneNumber',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      dataIndex: 'brith',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      width: 150,
      valueType: 'option',
      render: (_, record) => [
        <a
          href="#"
          key="edit"
          onClick={() => {
            setUserProps({ visible: true, objectModal: record });
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="您确定要删除该人员吗？"
          onConfirm={() => {
            useDelete([record._id]);
          }}
          onCancel={() => { }}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // modal对话框属性
  const addProjectProps = {
    ...useProps,
    loading: false,
    onCancel: () => {
      setUserProps({
        visible: false,
        objectModal: {},
      });
    },
    onSubmit: (values: any) => {
      if (values._id) {
        useEditGuser(values);
      } else {
        useRegisting(values);
      }
    },
  };

  /**
   * render
   */
  return (
    <PageContainer
      fixedHeader
      content={<h1>欢迎您：用户老李</h1>}
      extraContent={
        <Space size={24}>
          <Avatar
            shape="square"
            size="large"
            style={{ width: 110, height: 110, marginRight: 75 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </Space>
      }
    >
      <Card>
        <ProTable
          headerTitle={<NewProject />}
          columns={columns}
          actionRef={actionRef}
          request={(params) => loadData(params)}
          params={{ sorter, sortOrder }}
          size={size}
          rowKey="_id"
          search={false}
          onSizeChange={(size: SizeType) => setSize(size)}
          onChange={(p, f, s) => onTableChange(p, f, s)}
          pagination={config.paginationDisplay}
          scroll={{ y: 450, x: 1920 }}
          toolBarRender={() => [<Search key="search" placeholder="按名" />]}
        />
        <AddSysUser {...addProjectProps} />
      </Card>
    </PageContainer>
  );
};

export default System;
