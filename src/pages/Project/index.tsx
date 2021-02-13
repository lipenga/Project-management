// Project
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import {
  Avatar, Button, Card, Descriptions, Popconfirm, Space, Input,
} from 'antd';
import { history, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  createProject, deleteProject, editeProject,
  getProjectList, getTatoalTableListforProject
} from './service';
import config from '@/utils/config';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { typeProjectTableListItem } from './types';
import { PlusOutlined } from '@ant-design/icons';
import AddProject from './AddProject';
import { message } from 'antd';
/**
 * Preset
 */

const { Search } = Input;

const Project: React.FC<{}> = () => {
  /**
   * state
   */
  const actionRef = useRef();
  const [Tablist, setTablist] = useState<any>([])
  const [size, setSize] = useState<SizeType>('middle');
  const [sorter, setSorter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>('3')
  const [mProjectProps, setMProjectProps] = useState<any>({
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
    const response = await getProjectList(params);
    return {
      success: response.success,
      ...response.data,
    };
  };

  // 新增项目基础信息
  const { run: useCreateProject, loading: CpLoading } = useRequest(createProject, {
    manual: true,
    onSuccess: () => {
      message.success('新增成功');
      actionRef.current.reload();
    },
  });

  // 编辑项目基础信息
  const { run: useEditProject, loading: EpLoading } = useRequest(editeProject, {
    manual: true,
    onSuccess: () => {
      message.success('编辑成功');
      actionRef.current.reload();
    },
  });

  // 删除项目基础信息
  const { run: useDeleteProject, loading: DpLoading } = useRequest(deleteProject, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current.reload();
    },
  });

  // 获取项目状态数数据统计
  const { run: useGetTableList, loading: Tlaoding } = useRequest(getTatoalTableListforProject, {
    manual: true,
    onSuccess: (res) => {
      setTablist(
        [
          {
            tab: `进行中（${res.runing}）`,
            key: '3',
          },
          {
            tab: `我创建的（${res.myCreate}）`,
            key: '4',
          },
          {
            tab: `已延期（${res.extension}）`,
            key: '1',
          },
          {
            tab: `未开始（${res.notStarted}）`,
            key: '0',
          },
          {
            tab: `全部（${res.all}）`,
            key: '2',
          },
        ]
      )
    },
  });


  /**
   * effct
   */
  useEffect(() => {
    useGetTableList()
  }, [])

  /**
   * componentsConfig
   */

  // 顶部提示
  const content = (
    <Descriptions size="small" column={2}>
      <Descriptions.Item span={2} label="介绍">
        欢迎使用NID项目管理平台，开始创建一个项目吧！
      </Descriptions.Item>
    </Descriptions>
  );

  // 表格列
  const columns: ProColumns<typeProjectTableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
      render: (dom, row) => {
        return <a href="#" onClick={() => {
          history.push({
            pathname: '/project/detail',
            query: {
              ...row,
              _id: row!._id,
            },
          });
        }}>
          {row.name}
        </a>
      }
    },
    {
      title: '进度',
      dataIndex: 'schedule',
      hideInSearch: true,
    },
    {
      title: '编号',
      dataIndex: 'numbering',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '项目类型',
      dataIndex: 'projectCategoryName',
      hideInSearch: true,
    },
    {
      title: '计划开始时间',
      dataIndex: 'planStartTime',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '计划结束时间',
      dataIndex: 'planEndTime',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '项目经理',
      dataIndex: 'projectManagerName',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'projectState',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      width: 300,
      valueType: 'option',
      render: (_, record) => [
        <a
          href="#"
          key="edit"
          onClick={() => {
            setMProjectProps({
              visible: true,
              objectModal: record,
            });
          }}
        >
          编辑
        </a>,
        <a href="#" key="ok">
          完成
        </a>,
        <a href="#" key="stop">
          终止
        </a>,
        <a href="#" key="ed">
          暂停
        </a>,
        <a href="#" key="res">
          延期
        </a>,
        <Popconfirm
          key="delete"
          title="您确定要删除该标注？"
          onConfirm={() => {
            useDeleteProject([record._id]);
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

  // 新增项目按钮
  const NewProject: React.FC<any> = () => {
    return (
      <>
        <Button
          onClick={() => {
            setMProjectProps({ visible: true, objectModal: {} });
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

  // modal对话框属性
  const addProjectProps = {
    ...mProjectProps,
    loading: false,
    onCancel: () => {
      setMProjectProps({
        visible: false,
        objectModal: {},
      });
    },
    onSubmit: (values: any) => {
      if (values._id) {
        useEditProject(values);
      } else {
        useCreateProject(values);
      }
    },
  };
  /**
   * render
   */
  return (
    <>
      <PageContainer
        fixedHeader
        content={content}
        tabList={Tablist}
        tabActiveKey={activeKey}
        onTabChange={(key) => {
          setActiveKey(key)
        }}
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
            params={{ sorter, sortOrder, projectState: activeKey }}
            size={size}
            rowKey="_id"
            search={false}
            onSizeChange={(size: SizeType) => setSize(size)}
            onChange={(p, f, s) => onTableChange(p, f, s)}
            pagination={config.paginationDisplay}
            scroll={{ y: 450, x: 1920 }}
            toolBarRender={() => [<Search key="search" placeholder="按名称查询" />]}
          />
        </Card>
        <AddProject {...addProjectProps} />
      </PageContainer>
    </>
  );
};

export default Project;
