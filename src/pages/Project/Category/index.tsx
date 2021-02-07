import config from "@/utils/config";
import { CoffeeOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, Avatar, Card, message, Popconfirm, Space } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import route from "mock/route";
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { useRequest } from "umi";
import { createProjectCategory, deleteProjectCategory, editeProjectCategory, getProjectCategoryList } from "../service";
import { typeProjectCategory } from "../types";
import AddCategory from "./AddCategory";


/** 
 * Preset 
 */


const ProjectCategory: React.FC<{}> = () => {
  /** 
   * state 
   */
  const actionRef = useRef<ActionType>();
  const [size, setSize] = useState<SizeType>('middle');
  const [sorter, setSorter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [visibleS, setVisibleS] = useState<boolean>(false);
  const [obj, setObj] = useState<boolean>(false);
  const [selectedRowKeys, setSelectRowKeys] = useState([]);

  /** 
   * method
   */
  const onTableChange = (p, f, s) => {
    setSorter(s.field || '');
    setSortOrder(s.order || '');
    setSelectRowKeys([])
  };

  const loadData = async (params) => {
    const response = await getProjectCategoryList(params);
    return {
      success: response.success,
      ...response.data,
    };
  };

  //  删除标注
  const { run: useDeleteCategory, } = useRequest(deleteProjectCategory, {
    manual: true,
    onSuccess: (res) => {
      setSelectRowKeys([])
      message.success('删除成功！')
      actionRef.current?.reload()
    }
  })

  //  编辑备注
  const { run: useEditCategory, } = useRequest(editeProjectCategory, {
    manual: true,
    onSuccess: (res) => {
      setVisibleS(false);
      message.success('编辑成功！')
      actionRef.current?.reload()
    }
  })

  //  创建标注
  const { run: useCreateCategory, } = useRequest(createProjectCategory, {
    manual: true,
    onSuccess: (res) => {
      setVisibleS(false);
      actionRef.current?.reload()
    }
  })

  const confirm = (value) => {
    useDeleteCategory([value._id])
  }

  const cancel = (e) => {
  }
  /** 
   * effct 
   */


  /** 
   * componentsConfig 
   */
  const columns: ProColumns<typeProjectCategory>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
    },
    {
      title: '分类描述',
      dataIndex: 'description',
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
        <a href="#" onClick={() => {
          setVisibleS(true)
          setObj(record)
        }}>编辑 </a>,
        <Popconfirm
          title="您确定要删除该标注？"
          onConfirm={() => { confirm(record) }}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
    },
  ];


  const props = {
    visibleS,
    loading: false,
    obj,
    onCancel: () => {
      setVisibleS(false);
      setObj(false);
    },
    onSubmit: (values: typeProjectCategory) => {
      if (values._id) {
        useEditCategory(values)
      } else {
        useCreateCategory(values)
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
        content={<h1>欢迎您：用户老李</h1>}
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
            headerTitle={
              <>
                <Button onClick={() => { setVisibleS(true) }} type="primary" size={size}>
                  <PlusOutlined />
              新增
            </Button>
              </>
            }
            rowSelection={{
              selectedRowKeys, onChange: (selectedRowKeys) => {
                setSelectRowKeys(selectedRowKeys)
              }
            }}
            tableAlertOptionRender={(selectedRowKeys, onCleanSelected) => {
              return (
                <Space size={16}>
                  <Popconfirm
                    title="是否批量删除"
                    onConfirm={() => {
                      useDeleteCategory(selectedRowKeys.selectedRowKeys)
                      actionRef.current.reload()
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <a>批量删除</a>
                  </Popconfirm>
                </Space>
              );
            }}
            tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
              <Space size={24}>
                <span>
                  已选 {selectedRowKeys.length} 项
                        <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>取消选择</a>
                </span>
              </Space>
            )}

            columns={columns}
            actionRef={actionRef}
            request={(params) => loadData(params)}
            params={{ sorter, sortOrder }}
            size={size}
            rowKey="_id"
            search={false}
            onSizeChange={(size) => setSize(size)}
            onChange={(p, f, s) => onTableChange(p, f, s)}
            pagination={config.paginationDisplay}
            scroll={{ y: 450 }}
          />
          <AddCategory {...props} />
        </Card>
      </PageContainer>
    </>
  )
}

export default ProjectCategory