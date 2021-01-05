// Project
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { Avatar, Button, Card, Descriptions, Popconfirm, Result, Space, Input, Statistic } from 'antd'
import { history, Link, useRequest } from 'umi'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { getLable } from './service'
import config from '@/utils/config'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ProjectTableListItem } from './types'


/** 
 * Preset 
 */
const { Search } = Input

const Project: React.FC<{}> = () => {
  /** 
   * state 
   */
  const actionRef = useRef();
  const [size, setSize] = useState<SizeType>('middle');
  const [sorter, setSorter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const [visibleS, setVisibleS] = useState<boolean>(false);
  const [obj, setObj] = useState<boolean>(false);


  /** 
  * method
  */
  const onTableChange = (p, f, s) => {
    setSorter(s.field || '');
    setSortOrder(s.order || '');
  };

  const loadData = async (params) => {
    const response = await getLable(params);
    return {
      success: response.success,
      ...response.data,
    };
  };




  /** 
   * effct 
   */



  /** 
   * componentsConfig 
   */
  const content = (
    <Descriptions size="small" column={2}>
      <Descriptions.Item span={2} label="介绍">欢迎使用NID项目管理平台，开始创建一个项目吧！</Descriptions.Item>
    </Descriptions>
  );

  // 表格列
  const columns: ProColumns<ProjectTableListItem>[] = [
    {
      title: '标识描述',
      dataIndex: 'description',
      ellipsis: true,
      width: 200,
    },
    {
      title: '级别',
      dataIndex: 'grade',
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
        <Popconfirm
          title="您确定要删除该标注？"
          onConfirm={() => { }}
          onCancel={() => { }}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];


  /** 
   * render
   */
  return (
    <>
      <PageContainer
        fixedHeader
        content={content}
        tabList={[
          {
            tab: '进行中（2）',
            key: '1',
          },
          {
            tab: '我创建的（0）',
            key: '2',
          },
          {
            tab: '已延期（24）',
            key: '3',
          },
          {
            tab: '未开始（15）',
            key: '4',
          },
          {
            tab: '全部（15）',
            key: '5',
          },
        ]}
        extraContent={
          <Space size={24}>
            <Avatar
              shape="square"
              size="large"
              style={{ width: 110, height: 110, marginRight: 75 }} src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
          </Space>
        }
      >
        <Card>
          <ProTable
            columns={columns}
            actionRef={actionRef}
            request={(params) => loadData(params)}
            params={{ sorter, sortOrder }}
            size={size}
            rowKey="id"
            search={false}
            onSizeChange={(size: SizeType) => setSize(size)}
            onChange={(p, f, s) => onTableChange(p, f, s)}
            pagination={config.paginationDisplay}
            scroll={{ y: 450 }}
            toolBarRender={() => [
              <Search placeholder="按名称查询" />
            ]}
          />
        </Card>
      </PageContainer>
      <Button type='primary' onClick={() => {
        history.push({
          pathname: '/project/detail',
          query: {
            id: '1',
          },
        });
      }}>点击我前往详情页面</Button>
    </>
  )
}

export default Project